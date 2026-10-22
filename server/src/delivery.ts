/**
 * How the asset server puts bytes on the wire: compression, cache validation,
 * and batched cast files.
 *
 * ⚠ WHY THIS EXISTS: loading was only ever slow on REMOTE deployments. Locally
 * a round trip is ~0 ms, so a request waterfall and uncompressed text cost
 * nothing and the problem does not reproduce. MEASURED with 100 ms of simulated
 * latency (`VMK_SIM_LATENCY_MS`, assets.ts): the first boot made 1,826 requests
 * for 56 MB and was still downloading at 67 s. Three things dominated:
 *
 *   - nothing was compressed: 19 MB of unminified JS, ~1 MB furnimap XML, the
 *     cast indexes (gzip takes `client.js` from 2.9 MB to 161 KB);
 *   - nothing was cached: every response was `no-store`, so every reload paid
 *     for all of it again, content-hashed JS included;
 *   - 1,547 bitmaps arrived as one request each, over HTTP/1.1's six
 *     connections — at 100 ms per round trip that alone is ~25 s of waiting.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { readFileSync, statSync, watch, type Stats } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { join, normalize } from "node:path";
import { brotliCompressSync, constants as zlib, gzipSync } from "node:zlib";

/* ---------------------------------------------------------------- compression */

/** Text-like types worth compressing. PNG/MP3/JPEG/packs are already compressed. */
export function isCompressible(contentType: string): boolean {
  return /^(text\/|application\/(javascript|json|xml|wasm))/.test(contentType);
}

type Encoding = "br" | "gzip";

/**
 * ⚠ THE REAL SHOCKWAVE PLUGIN MUST GET UNCOMPRESSED BYTES.
 *
 * It downloads through NPAPI/ActiveX, which reports the stream length from
 * `Content-Length` — the COMPRESSED size — while handing the plugin the
 * browser-decoded body. MEASURED in Basilisk: `external_texts.txt` arrived as
 * 61.62 KB transferred / 244.58 KB decoded, the plugin judged every download
 * a failure, re-requested it with another cache-buster, and sat on a black
 * screen after the logo — never reaching its casts. Same family as the
 * chunked-encoding note in `serveFile` (assets.ts).
 *
 * The plugin only runs in legacy plugin browsers, and the TS client never
 * does, so the browser's User-Agent separates them: Basilisk / Pale Moon
 * (Goanna) for NPAPI, MSIE / Trident for ActiveX.
 */
const SHOCKWAVE_BROWSER = /\b(Basilisk|PaleMoon|Goanna|MSIE|Trident)\b/;

function pickEncoding(req: IncomingMessage | undefined): Encoding | null {
  if (SHOCKWAVE_BROWSER.test(String(req?.headers["user-agent"] ?? ""))) return null;
  const accepted = String(req?.headers["accept-encoding"] ?? "");
  if (/\bbr\b/.test(accepted)) return "br";
  if (/\bgzip\b/.test(accepted)) return "gzip";
  return null;
}

/**
 * Compressed bodies, keyed by file identity (path + size + mtime) so an edited
 * file is never served from a stale entry. Bounded by bytes, oldest out first.
 */
const compressedCache = new Map<string, Buffer>();
let compressedBytes = 0;
const COMPRESSED_CACHE_LIMIT = 256 * 1024 * 1024;

function compress(body: Buffer, encoding: Encoding): Buffer {
  return encoding === "br"
    // Quality 5: ~gzip-9 speed with a better ratio. 11 takes seconds on a 3 MB
    // chunk, and the first player to ask would wait for it.
    ? brotliCompressSync(body, { params: { [zlib.BROTLI_PARAM_QUALITY]: 5, [zlib.BROTLI_PARAM_SIZE_HINT]: body.length } })
    : gzipSync(body, { level: 6 });
}

function compressedFor(cacheKey: string | null, body: Buffer, encoding: Encoding): Buffer {
  if (!cacheKey) return compress(body, encoding);
  const key = `${encoding}:${cacheKey}`;
  const hit = compressedCache.get(key);
  if (hit) {
    // Refresh recency.
    compressedCache.delete(key);
    compressedCache.set(key, hit);
    return hit;
  }
  const out = compress(body, encoding);
  compressedCache.set(key, out);
  compressedBytes += out.length;
  for (const [old, buf] of compressedCache) {
    if (compressedBytes <= COMPRESSED_CACHE_LIMIT) break;
    compressedCache.delete(old);
    compressedBytes -= buf.length;
  }
  return out;
}

/**
 * Write a whole-buffer response, compressed when the client accepts it and it
 * pays. Always sends `Content-Length` (see serveFile on why that matters).
 */
export function writeBody(
  res: ServerResponse,
  status: number,
  headers: Record<string, string>,
  body: Buffer,
  cacheKey: string | null = null,
): void {
  const type = headers["Content-Type"] ?? "";
  const encoding = body.length >= 1024 && isCompressible(type) ? pickEncoding(res.req) : null;
  let out = body;
  const extra: Record<string, string> = {};
  if (isCompressible(type)) extra.Vary = "Accept-Encoding";
  if (encoding) {
    const packed = compressedFor(cacheKey, body, encoding);
    if (packed.length < body.length) {
      out = packed;
      extra["Content-Encoding"] = encoding;
    }
  }
  res.writeHead(status, { ...headers, ...extra, "Content-Length": String(out.length) });
  res.end(res.req?.method === "HEAD" ? undefined : out);
}

/* ----------------------------------------------------------- cache validation */

export function etagOf(stat: Stats): string {
  return `W/"${stat.size.toString(36)}-${Math.floor(stat.mtimeMs).toString(36)}"`;
}

/** True (and a 304 sent) when the client's copy is current. */
export function notModified(req: IncomingMessage | undefined, res: ServerResponse, etag: string, headers: Record<string, string>): boolean {
  const sent = req?.headers["if-none-match"];
  if (!sent || !sent.split(/\s*,\s*/).includes(etag)) return false;
  res.writeHead(304, { ...headers, ETag: etag });
  res.end();
  return true;
}

/* ---------------------------------------------------------------- cast batches */

/**
 * `GET /casts/<key>/_batch?f=<file>|<file>|…` — several of one cast's
 * `bitmaps/` files in ONE response, in the `bitmaps.pack` format the client
 * already reads (tools/pack-cast-bitmaps.mjs):
 *
 *   "VPK1", uint32le headerLength, JSON {"files": {"bitmaps/<f>": [offset, length]}}, data
 *
 * Files that do not exist are left out of the index; the client treats a
 * missing entry exactly like a 404. Names are bare file names inside
 * `bitmaps/`, so a request cannot reach anything else in the cast directory or
 * outside it.
 */
export function serveCastBatch(req: IncomingMessage, res: ServerResponse, castsRoot: string, castKey: string, list: string): void {
  const cors = { "Access-Control-Allow-Origin": "*" };
  if (!/^[\w.-]+$/.test(castKey)) {
    res.writeHead(400, cors).end("bad cast");
    return;
  }
  const dir = join(castsRoot, castKey, "bitmaps");
  const names = [...new Set(list.split("|").filter(Boolean))];
  if (names.length === 0 || names.length > 2000) {
    res.writeHead(400, cors).end("bad list");
    return;
  }
  const index: Record<string, [number, number]> = {};
  const chunks: Buffer[] = [];
  const validators: string[] = [];
  let offset = 0;
  for (const name of names) {
    if (name.includes("/") || name.includes("\\") || name.startsWith(".") || normalize(name) !== name) continue;
    const file = join(dir, name);
    let stat: Stats;
    try {
      stat = statSync(file);
    } catch {
      continue;
    }
    if (!stat.isFile()) continue;
    const bytes = readFileSync(file);
    index[`bitmaps/${name}`] = [offset, bytes.length];
    chunks.push(bytes);
    validators.push(name, String(stat.size), String(Math.floor(stat.mtimeMs)));
    offset += bytes.length;
  }
  const etag = `W/"b${hash(validators.join("|"))}"`;
  const cache = { ...cors, "Cache-Control": "no-cache", ETag: etag };
  if (notModified(req, res, etag, cache)) return;
  const header = Buffer.from(JSON.stringify({ files: index }), "utf8");
  const prefix = Buffer.alloc(8);
  prefix.write("VPK1", 0, "ascii");
  prefix.writeUInt32LE(header.length, 4);
  writeBody(res, 200, { ...cache, "Content-Type": "application/octet-stream" }, Buffer.concat([prefix, header, ...chunks]));
}

/* ------------------------------------------------------------ cast versions */

/**
 * A version for ALL of one cast's bitmaps, sent with its `manifest.tsv` as
 * `X-Cast-Version` and folded into that file's ETag.
 *
 * ⚠ WHY: the client keeps bitmaps in the Cache API under `<url>?cv=<version>`
 * (boot-client.ts `cachedArt`) so a warm reload asks for nothing it already
 * has. Batches cannot be HTTP-cached usefully — which files share a batch
 * depends on timing, so the URLs rarely repeat (MEASURED: a warm reload still
 * moved 20 MB, all of it batches). A per-file cache is only safe if it can
 * NEVER serve stale art, so the version covers every bitmap's name, size and
 * mtime: re-extraction, a release's PNG recompression or a single hand-edited
 * file all change it. Neither the manifest's nor bitmaps.tsv's own ETag would
 * notice a recompressed PNG.
 *
 * Statting the largest cast (1,346 files) takes ~70 ms, so the result is kept
 * per cast and dropped by a recursive watch on the casts root. If that watch
 * cannot be set up or fails, no version is sent at all and the client simply
 * does not cache — correct, just slower.
 */
const castVersions = new Map<string, Promise<string | null>>();
let watchedRoot: string | null = null;
let watchFailed = false;

function watchCasts(castsRoot: string): void {
  if (watchedRoot === castsRoot || watchFailed) return;
  try {
    const watcher = watch(castsRoot, { recursive: true }, (_event, file) => {
      // No file name (e.g. an overflowed event buffer): forget everything.
      const key = file ? String(file).split(/[\\/]/)[0] : null;
      if (key) castVersions.delete(key);
      else castVersions.clear();
    });
    watcher.on("error", () => {
      watchFailed = true;
      castVersions.clear();
      watcher.close();
    });
    watchedRoot = castsRoot;
  } catch {
    watchFailed = true;
  }
}

export function castArtVersion(castsRoot: string, castKey: string): Promise<string | null> {
  watchCasts(castsRoot);
  if (watchFailed || !/^[\w.-]+$/.test(castKey)) return Promise.resolve(null);
  const known = castVersions.get(castKey);
  if (known) return known;
  const computing = (async (): Promise<string | null> => {
    const dir = join(castsRoot, castKey, "bitmaps");
    let names: string[];
    try {
      names = (await readdir(dir)).sort();
    } catch {
      return "none";
    }
    const parts = await Promise.all(names.map(async (name) => {
      try {
        const s = await stat(join(dir, name));
        return `${name}:${s.size}:${Math.floor(s.mtimeMs)}`;
      } catch {
        return name;
      }
    }));
    return hash(parts.join("|"));
  })().catch(() => null);
  castVersions.set(castKey, computing);
  // A failed computation must not stick.
  void computing.then((v) => { if (v === null && castVersions.get(castKey) === computing) castVersions.delete(castKey); });
  return computing;
}

/** FNV-1a, base 36 — an ETag only has to change when its input does. */
function hash(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36) + text.length.toString(36);
}
