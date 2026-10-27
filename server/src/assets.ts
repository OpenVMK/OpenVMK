/**
 * Local HTTP server for LibreShockwave WASM player + VMKShockwave archive.
 *
 * Serves:
 *   /player/*     — LibreShockwave nightly WASM dist + vmk-player.html
 *   /shockwave/*  — VMKShockwave files (casts, DCRs, external_texts)
 *   /file.php     — OpenVMK cast-delivery shim (logs + best-effort lookup)
 */
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import {
  appendFileSync,
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { join, extname, normalize, resolve } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import {
  DEV_MODE,
  SESSION_COOKIE,
  authenticate,
  clearSessionCookie,
  currentUser,
  issueTicketFor,
  parseCookies,
  readFormBody,
  redirect,
  setSessionCookie,
} from "./auth.js";
import { createTicket, databasePath, deleteSession, getUserByTicket, getUserByUsername, pruneExpired } from "./db.js";
import { seasonFromEnv, seasonalCasts } from "./seasons.js";
import { ARCHIVE, castExtracted, downloadFile } from "./paths.js";
import { publicUrls, withPublicUrls } from "./public-url.js";
import { clientIp, trustedProxies } from "./client-ip.js";
import { banPage, handleHk, warmHk } from "./hk.js";
import { bridgeSecret, logLogin } from "./staff-db.js";
import { castArtVersion, etagOf, isCompressible, notModified, serveCastBatch, writeBody } from "./delivery.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const WASM_DIST = join(ROOT, "tools", "shockwave", "wasm", "dist");
const VMK_PLAYER = join(ROOT, "tools", "shockwave", "vmk-player.html");

/**
 * The TypeScript client: `npx vite build --config client/vite.config.ts`.
 *
 * This is what `/play` serves. The Shockwave plugin page stays at `/client` for
 * A/B comparison, and the LibreShockwave WASM player stays at `/player/` — it is
 * still the reference implementation to check behaviour against, and the
 * toolchain under `tools/` is what produced the transpiled Lingo and the
 * extracted casts in the first place.
 */
const CLIENT_DIST = join(ROOT, "client", "dist");

/**
 * The client's game data, served rather than bundled.
 *
 * ⚠ 126 MB of extracted casts. The Vite build deliberately excludes it
 * (`publicDir: false`), so these directories must be reachable at the same paths
 * the client asks for in dev: `/core`, `/casts`, `/fonts`.
 */
const CLIENT_ASSETS = join(ROOT, "client", "assets");
const SHIMS = join(ROOT, "tools", "shockwave", "shims");
const LOADING_SCREEN = join(SHIMS, "loading-screen.json");
/** The Shockwave archive. Optional — a release ships without it (see paths.ts). */
const SHOCKWAVE = ARCHIVE;
const REF = join(SHOCKWAVE, "ref");
const GETSEC_UUID = "e640c26f-9cec-4f0b-8b30-0675a9cf640a";
const GAME_SERVER = process.env.VMK_GAME_SERVER ?? "http://127.0.0.1:8080";
/**
 * Serve a different cast in place of vmk_core/core.cct without touching the
 * archive. The shipped core.cct is a later re-save (Director 10.1#11) whose
 * script bytecode does not disassemble; the Disney originals (10.0#188) are
 * alongside it as core.old.cct / core.new.cct.
 *   $env:VMK_CORE_CAST = "vmk_core/core.old.cct"
 * Accepts a path relative to VMK_SHOCKWAVE, or an absolute path.
 *
 * ⚠ DEFAULTED ON PURPOSE. This used to be "", so a bare `npm start` served the
 * re-saved core and the client came up BLACK — with nothing on the wire to say
 * why. That cost two sessions. The default is the value every run has wanted;
 * set the variable only to deviate from it, and if the file is missing the
 * resolver still falls back to the archive copy with a warning.
 */
const CORE_CAST_OVERRIDE = process.env.VMK_CORE_CAST ?? "vmk_core/core.old.cct";
/**
 * Disney's runtime config (external.variables.txt). The archive ships only
 * external_texts.txt, so the client had no variables to load and its core
 * thread stalled in the "load_variables" state. Recovered from the Wayback
 * capture of homepage/download/external_variables_931 (2008-01-07).
 *   $env:VMK_EXTERNAL_VARS = "assets/external_variables_931.txt"
 * Relative paths resolve against the repo root, then VMK_SHOCKWAVE.
 *
 * ⚠ DEFAULTED ON PURPOSE — see VMK_CORE_CAST above. Unset, this file is never
 * served, the client never sends CMD.LOGIN, and it stalls silently after
 * `2002 _Hello`. `assets/external_variables_casts.txt` is the file every run
 * has wanted (it carries our CastList edits, e.g. the nav.shortcut.4 fix).
 */
const EXTERNAL_VARS_OVERRIDE =
  process.env.VMK_EXTERNAL_VARS ?? "assets/external_variables_casts.txt";
/**
 * Extra file root searched before the archive. The mirrored archive never had
 * the UI/code casts: the archived build served them from a directory outside the web root
 * via one-time tokens. They were recovered from VMKShockwave/files.zip and live
 * under assets/overlay/7a684fb5-.../<md5>.cct, which is what cast.entry.N
 * points at.
 *   $env:VMK_OVERLAY_DIR = "assets/overlay"
 * Relative paths resolve against the repo root, then VMK_SHOCKWAVE.
 */
const OVERLAY_OVERRIDE = process.env.VMK_OVERLAY_DIR ?? "assets/overlay";
/**
 * Casts we have MODIFIED, searched before everything else.
 *
 * Kept separate from `assets/overlay` on purpose: the overlay holds recovered
 * ORIGINALS, and a patched file sitting next to them is indistinguishable from
 * an original a session later. Anything here shadows the archive copy by exact
 * relative path, so the pristine file is never touched and reverting is just
 * deleting (or renaming) the patch.
 *
 * ⚠ Do NOT leave spare/backup `.cct` files in here — the basename fallback in
 * resolveArchiveFile can match them. Park those in tools/shockwave/cast-patches/.
 *   $env:VMK_PATCH_DIR = "assets/patches"
 */
const PATCH_OVERRIDE = process.env.VMK_PATCH_DIR ?? "assets/patches";

/**
 * The furniture map served at `/fm/<n>`, newest variant first.
 *
 * `_LoadMapFile` walks `furnituremap_url.1`, `.2`, … until one is missing, so
 * the numbering here is the client's own paging scheme. Only index 1 resolves
 * today; add more entries (and the matching variables) to widen coverage.
 */
function furnimapFile(index: number): string | null {
  const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
  // `_LoadMapFile` walks the numbered variables until one is missing and MERGES
  // every file it finds — `_FileLoadCallback` only sets `m_bReady` once the last
  // has parsed — so adding a page widens coverage rather than replacing it.
  //
  // ⚠ DO NOT ADD THE ARCHIVE'S OTHER FURNIMAP VARIANTS. It holds several under
  // confusingly similar names, and measured purely on codes ADDED over pages
  // 1+2 (1,086 codes) they look worth serving:
  //
  //   furnituremaps.0-99_3          557 codes, +41  (558-573, 1600-1615, 1700-1715)
  //   furnituremaps - Copy.0-99_2   318 codes, +15  (85, 88, 250-257, 4001-4005)
  //   furnituremaps                 455 codes,  +0
  //   furnituremaps.0-99_2.save.1   495 codes,  +0
  //
  // Serving them BREAKS ROOMS, and that table is exactly why the trap works:
  // counting new codes says nothing about the codes a variant REDEFINES. These
  // are different eras of the same file, not disjoint pages, so `- Copy` also
  // rewrites 41 and 81 — which page 1 already defines correctly — with sprite
  // names that no longer exist in those items' casts. The client reports
  // "Item graphics member not present: item_41_01_7_2_0" and the furniture
  // vanishes from the room.
  //
  // Before adding a page, diff the codes it OVERLAPS against the pages already
  // served and confirm the sprite names still resolve — a variant is only safe
  // if it is strictly additive.
  //
  // ⚠ Numbering must stay CONTIGUOUS from 1 — the client stops at the first
  // gap. Keep this in step with `furnituremap_url.*` in the external variables
  // AND with furnimapPaths() in furni-footprint.ts, or the server and client
  // disagree about which items have blocks.
  const candidates: Record<number, string[]> = {
    1: [downloadFile("furnituremaps.0-99_2") ?? ""],
    2: [join(repoRoot, "assets", "furnimaps", "furnimaps_consolidated.xml")],
  };
  return (candidates[index] ?? []).find((p) => existsSync(p)) ?? null;
}

const PORT = Number(process.env.VMK_SHOCKWAVE_PORT ?? 5199);
// The Shockwave pages' (/client, /player) origin. The TS client's addresses come
// per request from public-url.ts. `||`: docker-compose passes an unset value as "".
const PUBLIC_ORIGIN = process.env.VMK_PUBLIC_ORIGIN?.trim().replace(/\/+$/, "") || `http://127.0.0.1:${PORT}`;
const LOADING_URL = process.env.VMK_LOADING_URL ?? `${PUBLIC_ORIGIN}/vmk/loading.php`;
const LOADING_STATIC = process.env.VMK_LOADING_STATIC ?? "";
/** GetSec, for the fan-server Shockwave builds only — same switch as the game server's. */
const SHOCKWAVE_GETSEC = process.env.VMK_SHOCKWAVE_GETSEC === "1";

/** 1×1 PNG placeholder for missing archive CDN images */
const PLACEHOLDER_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".wasm": "application/wasm",
  ".dcr": "application/x-director",
  ".cct": "application/x-director",
  ".cst": "application/octet-stream",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  // Cast indexes (manifest/bitmaps.tsv). Typed as text so they are compressed.
  ".tsv": "text/tab-separated-values; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".xml": "text/xml; charset=utf-8",
  ".php": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  // Extracted cast audio. Served as octet-stream these are a coin flip: some
  // browsers sniff an <audio src> and play it anyway, others refuse outright,
  // so the failure would be per-browser and look like a playback bug.
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

/** Lazy index: md5(filenameWithoutExt) -> absolute .cct path */
let castHashIndex: Map<string, string> | null = null;

function buildCastHashIndex(): Map<string, string> {
  const index = new Map<string, string>();
  const stack = [SHOCKWAVE];
  while (stack.length) {
    const dir = stack.pop()!;
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      continue;
    }
    for (const name of entries) {
      const full = join(dir, name);
      let st;
      try {
        st = statSync(full);
      } catch {
        continue;
      }
      if (st.isDirectory()) {
        if (name === "Backup" || name === "node_modules") continue;
        stack.push(full);
      } else if (name.endsWith(".cct")) {
        const base = name.slice(0, -4);
        const hash = createHash("md5").update(base).digest("hex");
        if (!index.has(hash)) index.set(hash, full);
      }
    }
  }
  return index;
}

function getCastHashIndex(): Map<string, string> {
  if (!castHashIndex) castHashIndex = buildCastHashIndex();
  return castHashIndex;
}

function send(res: ServerResponse, status: number, body: string | Buffer, type?: string) {
  writeBody(res, status, {
    "Content-Type": type ?? "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    // Same reasoning as serveFile: this server exists to be edited between
    // reloads. Without these the /client page was cached by the browser, so
    // edits to it produced no request at all -- the log showed the movie being
    // fetched with no preceding `GET /client`, and two rounds of testing ran
    // against a stale page. serveFile has had these since an equivalent
    // incident with external_variables.txt.
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",
  }, typeof body === "string" ? Buffer.from(body, "utf8") : body);
}

function isFile(filePath: string): boolean {
  try {
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/**
 * How long the client may cache a file.
 *
 * ⚠ The default stays `no-store`, and that default is load-bearing: this server
 * is edited constantly, and browser caching of external_variables.txt once
 * pinned the client to a stale config for a whole run of experiments — every
 * edit appeared to do nothing, producing byte-identical logs and several wrong
 * conclusions. Do not widen this casually.
 *
 * Avatar clothing casts are the one exception, and they earn it. `vmk_clothes/`
 * holds archive binaries we never patch, and the catalogue re-fetches the same
 * ones on every page turn — measured at 3-4 downloads of each `vmk_avatar_*.cct`
 * in a single browsing session. That matters beyond wasted bytes: the client's
 * clothing grid has a race in `CCatalogClothesView._EventProc`, where the
 * next/previous page buttons call `UpdatePreview` WITHOUT the
 * `m_bLoadingThumbnails` guard that the grid-click branch has. Paging before the
 * thumbnails finish starts a second load over the first and can take the client
 * down. We cannot patch the client, but every re-download we avoid narrows the
 * window in which a click can land badly.
 *
 * The TTL is deliberately short: long enough to cover a shopping session, short
 * enough that swapping a cast shows up on the next reload rather than requiring
 * a cache purge. `VMK_CACHE_CASTS=off` restores no-store everywhere.
 */
const CAST_CACHE_SECONDS = Number(process.env.VMK_CACHE_CASTS_TTL ?? 300);
const CACHE_CASTS = process.env.VMK_CACHE_CASTS !== "off";

function cacheHeaders(filePath: string): Record<string, string> {
  const cacheable = CACHE_CASTS && /[\\/]vmk_clothes[\\/].*\.cct$/i.test(filePath);
  if (!cacheable) {
    return { "Cache-Control": "no-store, no-cache, must-revalidate", Pragma: "no-cache" };
  }
  return { "Cache-Control": `public, max-age=${CAST_CACHE_SECONDS}` };
}

/**
 * How the CLIENT's own files may be cached — `/casts`, `/core`, `/fonts` and
 * the built `/assets` chunks. Everything else keeps `cacheHeaders` above.
 *
 * - `revalidate`: `no-cache` + ETag. The browser keeps a copy but asks every
 *   time, and gets a body-less 304 while the file is unchanged. Never stale —
 *   an edited or re-extracted file has a new size/mtime and so a new ETag —
 *   which keeps the guarantee the `no-store` default above exists for, while a
 *   reload stops re-downloading megabytes of unchanged art.
 * - `immutable`: Vite names every built chunk by its content hash, so a given
 *   URL can never change; a rebuild produces new URLs. Cached for a year.
 */
type ClientCache = "revalidate" | "immutable";

function clientCacheHeaders(policy: ClientCache): Record<string, string> {
  return { "Cache-Control": policy === "immutable" ? "public, max-age=31536000, immutable" : "no-cache" };
}

/**
 * `castVersion`: a cast's `manifest.tsv` also carries its art version
 * (delivery.ts `castArtVersion`), in a header AND in the ETag, so a version
 * change can never be answered with a 304 that keeps the old header.
 */
function serveFile(res: ServerResponse, filePath: string, policy?: ClientCache, castVersion?: string | null) {
  if (!isFile(filePath)) {
    send(res, 404, `Not found: ${filePath}`);
    return;
  }
  const ext = extname(filePath).toLowerCase();
  const type = MIME[ext] ?? "application/octet-stream";
  const stat = statSync(filePath);
  const versioned: Record<string, string> = castVersion
    ? { "X-Cast-Version": castVersion, "Access-Control-Expose-Headers": "X-Cast-Version" }
    : {};
  const etag = castVersion ? etagOf(stat).replace(/"$/, `-${castVersion}"`) : etagOf(stat);
  const caching = policy ? { ...clientCacheHeaders(policy), ...versioned, ETag: etag } : cacheHeaders(filePath);
  if (policy && notModified(res.req, res, caching.ETag, { "Access-Control-Allow-Origin": "*", ...caching })) return;
  // Text, JSON and JS go out compressed — read whole, compressed once per
  // version of the file and cached (delivery.ts). Binary art streams as before.
  if (isCompressible(type) && stat.size <= 64 * 1024 * 1024) {
    writeBody(
      res,
      200,
      { "Content-Type": type, "Access-Control-Allow-Origin": "*", ...caching },
      readFileSync(filePath),
      `${filePath}|${stat.size}|${stat.mtimeMs}`,
    );
    return;
  }
  // Content-Length matters, and its absence is invisible under LibreShockwave.
  // Without it Node falls back to `Transfer-Encoding: chunked`; `fetch()` (and
  // therefore the WASM player) handles that transparently, but the real Adobe
  // Shockwave plugin does a *progressive* download of .dcr/.cct and needs the
  // size up front. Chunked responses made it re-request the movie and its casts
  // in a loop (framework_disney.dcr -> empty.cct -> core.cct, repeating) and
  // never reach the stage where it loads external_variables.txt.
  const size = stat.size;
  res.writeHead(200, {
    "Content-Type": type,
    "Content-Length": String(size),
    "Access-Control-Allow-Origin": "*",
    ...caching,
  });
  const stream = createReadStream(filePath);
  // Unhandled stream 'error' events are fatal in Node and would kill the server.
  stream.on("error", (err) => {
    console.log(`[serve] read failed ${filePath}:`, err);
    res.destroy();
  });
  // ⚠ A cast whose response never COMPLETES is the inventory spinner, and until
  // now it was invisible here: `logFetch` records the request and nothing
  // records the outcome, so a stalled or aborted transfer looked identical to a
  // served one.
  //
  // It matters because of how the client waits. A cast reaches `status: ready`
  // only inside `CRoomItemAssetManager._CastLoadCallback`, which runs only when
  // `startCastLoad` completes. Until then its type stays in `m_ar_iLoading`,
  // `IsItemReady` returns 0, and `CRoomFurniSetLoader.update` polls with NO
  // timeout and no failure branch. One transfer that never finishes hangs the
  // grid for good, and raises no client error — which is why the logs are
  // silent while the spinner turns.
  if (/\.cct$/i.test(filePath)) trackCastLoad(res, filePath, size);
  stream.pipe(res);
}

/** In-flight `.cct` responses: request id -> what and since when. */
const castLoads = new Map<number, { name: string; at: number; size: number }>();
let castLoadSeq = 0;
let castWatchdog: NodeJS.Timeout | null = null;

function trackCastLoad(res: ServerResponse, filePath: string, size: number): void {
  const id = ++castLoadSeq;
  const name = filePath.split(/[\\/]/).pop() ?? filePath;
  castLoads.set(id, { name, at: Date.now(), size });

  const settle = (how: string) => {
    const entry = castLoads.get(id);
    if (!entry) return; // already settled
    castLoads.delete(id);
    const ms = Date.now() - entry.at;
    // Only the interesting outcomes, or the log drowns in every normal fetch.
    if (how !== "sent" || ms > 1000) {
      console.log(
        `[cast] ${entry.name} ${how} ${entry.size}b in ${ms}ms ` +
          `(${castLoads.size} still open)`,
      );
    }
  };
  res.on("finish", () => settle("sent"));
  // `close` without `writableEnded` means the client went away mid-transfer.
  res.on("close", () => settle(res.writableEnded ? "sent" : "ABORTED"));

  // One shared watchdog, started lazily, that names anything still open. A cast
  // sitting here for ten seconds IS the hang — this turns a silent spinner into
  // a line naming the exact file the client is still waiting for.
  if (!castWatchdog) {
    castWatchdog = setInterval(() => {
      const now = Date.now();
      for (const [, entry] of castLoads) {
        const ms = now - entry.at;
        if (ms > 10_000) {
          console.log(
            `[cast] ⚠ STILL OPEN after ${Math.round(ms / 1000)}s: ${entry.name} ` +
              `(${entry.size}b) — the client is still waiting on this one`,
          );
        }
      }
      if (castLoads.size === 0 && castWatchdog) {
        clearInterval(castWatchdog);
        castWatchdog = null;
      }
    }, 5_000);
    // Never hold the process open for the sake of the watchdog.
    castWatchdog.unref?.();
  }
}

function safePath(root: string, urlPath: string): string | null {
  const resolved = normalize(resolve(root, urlPath.replace(/^\//, "")));
  if (!resolved.startsWith(normalize(root))) return null;
  return resolved;
}

function handleFilePhp(req: IncomingMessage, res: ServerResponse, url: URL) {
  const code = url.searchParams.get("code") ?? "";
  console.log(`[file.php] code=${code} referer=${req.headers.referer ?? ""}`);
  if (!code) {
    send(res, 400, "missing code");
    return;
  }
  const hash = code.replace(/\.cct$/i, "");
  const hit = getCastHashIndex().get(hash);
  if (hit) {
    console.log(`[file.php] -> ${hit}`);
    serveFile(res, hit);
    return;
  }
  send(res, 404, `unknown cast hash: ${hash} (indexed ${getCastHashIndex().size} casts)`);
}

function logFetch(req: IncomingMessage, pathname: string, note?: string) {
  console.log(`[fetch] ${new Date().toISOString().slice(11, 23)} ${req.method ?? "GET"} ${pathname}${note ? ` (${note})` : ""}`);
}

/**
 * Surface crash reports from the PATCHED core cast.
 *
 * `assets/patches/vmk_core/core.old.cct` rewrites `CMgrError` so a Lingo error
 * is recorded by `on error` (which formats it with a timestamp, the handler
 * symbol and the message lines) and then handed to `getNetText` instead of
 * `put`. `put` writes to Director's message window, which Shockwave does not
 * display — so unpatched, the client has always known exactly what went wrong
 * and has never had anywhere to say it.
 *
 * The report therefore arrives here as the PATH of an HTTP GET that resolves to
 * nothing. It is nonsense as a URL and will 404; that does not matter, because
 * the text is the payload. Logging it in `route` rather than in a handler is
 * deliberate: a report must be seen even when nothing can serve it.
 *
 * ⚠ Reports are UNTRUSTED INPUT — they are text the client chose to send. They
 * are logged verbatim for a human to read and never interpreted as commands.
 */
const CRASH_LOG = join(ROOT, "logs", "client-errors.log");
let crashLogReady = false;
/** Report text -> times seen this run, so retry storms collapse to one line. */
const crashSeen = new Map<string, number>();
/**
 * Limits, because reports need no login: anyone can send them, so without a
 * cap the map and the log grow for as long as someone keeps sending.
 */
const CRASH_SEEN_MAX = 1000;
const CRASH_TEXT_MAX = 4000;
const CRASH_LOG_MAX_BYTES = 10 * 1024 * 1024;
let crashLogBytes = 0;

function reportClientError(req: IncomingMessage, pathname: string) {
  // The formatted report always carries the literal the error handler prefixes
  // it with, so it is distinguishable from an ordinary asset miss.
  if (!/error|exception|script error|handler not defined/i.test(pathname)) return;
  // An asset path that merely happens to contain "error" is not a report — a
  // real one is prose, so it has spaces or is far longer than any cast name.
  if (!/\s/.test(pathname) && pathname.length < 120) return;

  const text = pathname.replace(/^\/+/, "").slice(0, CRASH_TEXT_MAX);

  // ⚠ COLLAPSE REPEATS OR THE LOG IS USELESS. `CDownload.update` retries a
  // failed download about ten times a second and reports every attempt, so one
  // missing asset buries every other error under a hundred identical lines —
  // which is how a single interesting fault gets scrolled out of sight. Report
  // the first occurrence at once, then only every tenth, carrying the count.
  const seen = (crashSeen.get(text) ?? 0) + 1;
  // Full: start counting afresh. Repeats of an old report may log once more.
  if (seen === 1 && crashSeen.size >= CRASH_SEEN_MAX) crashSeen.clear();
  crashSeen.set(text, seen);
  if (seen > 1 && seen % 10 !== 0) return;
  const suffix = seen > 1 ? `  (x${seen})` : "";

  console.log(`\n[client-error] ${new Date().toISOString()}${suffix}\n${text}\n`);
  try {
    if (!crashLogReady) {
      mkdirSync(dirname(CRASH_LOG), { recursive: true });
      crashLogBytes = existsSync(CRASH_LOG) ? statSync(CRASH_LOG).size : 0;
      crashLogReady = true;
    }
    // Full: the console still gets every report; the file stops growing.
    if (crashLogBytes >= CRASH_LOG_MAX_BYTES) return;
    const entry = `${new Date().toISOString()} ${req.method ?? "GET"}\n${text}\n\n`;
    appendFileSync(CRASH_LOG, entry, "utf8");
    crashLogBytes += Buffer.byteLength(entry);
  } catch {
    /* the console line is the copy that matters */
  }
}

function resolveExternalVarsOverride(): string | null {
  if (!EXTERNAL_VARS_OVERRIDE) return null;
  const candidates = [
    safePath(ROOT, EXTERNAL_VARS_OVERRIDE),
    safePath(SHOCKWAVE, EXTERNAL_VARS_OVERRIDE),
    resolve(EXTERNAL_VARS_OVERRIDE),
  ];
  for (const candidate of candidates) {
    if (candidate && isFile(candidate)) return candidate;
  }
  return null;
}

function resolveOverlayDir(): string | null {
  if (!OVERLAY_OVERRIDE) return null;
  const candidates = [safePath(ROOT, OVERLAY_OVERRIDE), safePath(SHOCKWAVE, OVERLAY_OVERRIDE), resolve(OVERLAY_OVERRIDE)];
  for (const candidate of candidates) {
    if (candidate && existsSync(candidate) && statSync(candidate).isDirectory()) return candidate;
  }
  return null;
}

function resolvePatchDir(): string | null {
  if (!PATCH_OVERRIDE) return null;
  const candidates = [safePath(ROOT, PATCH_OVERRIDE), safePath(SHOCKWAVE, PATCH_OVERRIDE), resolve(PATCH_OVERRIDE)];
  for (const candidate of candidates) {
    if (candidate && existsSync(candidate) && statSync(candidate).isDirectory()) return candidate;
  }
  return null;
}

function resolveCoreCastOverride(): string | null {
  if (!CORE_CAST_OVERRIDE) return null;
  // ⚠ The PATCH TREE MUST COME FIRST. This override returns early in
  // resolveArchiveFile, before the patch-dir lookup that every other cast goes
  // through — so without this line a patched core.old.cct in assets/patches is
  // silently ignored and the pristine archive copy is served instead, which
  // looks exactly like a patch that did not work.
  const patches = resolvePatchDir();
  const candidates = [
    patches ? safePath(patches, CORE_CAST_OVERRIDE) : null,
    safePath(SHOCKWAVE, CORE_CAST_OVERRIDE),
    resolve(CORE_CAST_OVERRIDE),
  ];
  for (const candidate of candidates) {
    if (candidate && isFile(candidate)) return candidate;
  }
  return null;
}

/**
 * Basename -> full path for every cast in the archive, built once on first use.
 * `siteref/` and `Backup/` are skipped: they are duplicate trees and would make
 * the mapping ambiguous without adding anything.
 */
let castIndex: Map<string, string> | null = null;

function findCastByBasename(name: string): string | null {
  if (castIndex === null) {
    castIndex = new Map();
    const walk = (dir: string, depth: number) => {
      if (depth > 6) return;
      let entries: string[];
      try {
        entries = readdirSync(dir);
      } catch {
        return;
      }
      for (const entry of entries) {
        const full = join(dir, entry);
        let stats;
        try {
          stats = statSync(full);
        } catch {
          continue;
        }
        if (stats.isDirectory()) {
          if (entry === "siteref" || entry === "Backup") continue;
          walk(full, depth + 1);
        } else if (/\.(cct|cst)$/i.test(entry)) {
          const base = entry.replace(/\.(cct|cst)$/i, "");
          if (!castIndex!.has(base)) castIndex!.set(base, full);
        }
      }
    };
    walk(SHOCKWAVE, 0);
    console.log(`[archive] indexed ${castIndex.size} casts by basename`);
  }
  const stem = name.replace(/\.(cct|cst)$/i, "");
  return castIndex.get(stem) ?? null;
}

/**
 * Seasonal decoration: `VMK_SEASON=xmas|halloween` (see seasons.ts).
 *
 * The archived build's config points several rooms at Christmas-decorated variants:
 * 16 `room.cast.*` entries under `vmk_spaces/vmk_holiday_overlays/` and
 * `vmk_sound/holiday/`, covering rooms 2, 3, 4, 35 and 48 (Central Plaza, Town
 * Square, Main Street, Castle Forecourt, Esplanade). Those lines are ALWAYS
 * reduced to the everyday park first. Serving them as written half-worked:
 * the TS client resolved `vmk_holiday_overlays/vmk_mainstreet_square` to the
 * plain extraction, and four of the five sound paths do not exist. The season
 * is then applied from seasons.ts, which only names casts that exist.
 */
const SEASON = seasonFromEnv();

/**
 * Can the TS client load this cast? That means its EXTRACTION exists — the
 * release ships no `.cct` files, so a check against the archive would drop
 * every cast. Must agree with `roomIsLoadable` in mus-server.ts.
 */
const castPathExists = castExtracted;

/**
 * Rooms whose configured sound cast is demonstrably the wrong track.
 *
 * Keyed by room number -> [wrong basename, correct basename]. This is
 * deliberately an explicit table and NOT a naming-convention rule. The
 * convention (`vmk_spaces/vmk_X` -> `vmk_sound/vmk_snd_X`) holds for only 77 of
 * 139 rooms, and the rooms that break it mostly break it *legitimately*: the 11
 * dark-ride rooms all share the `vmk_dark_ride_room` space cast but each has its
 * own score (`vmk_snd_darkride_alice1..6`, `..._peterpan1..5`). Applying the
 * convention wholesale would overwrite all of those with one track.
 *
 * Room 48 (Esplanade) — evidence this one is config damage, not a design choice:
 *   1. Its configured path `vmk_sound/holiday/vmk_snd_main_street2` does not
 *      exist. `vmk_sound/holiday/` contains exactly one file, vmk_snd_hub2, so
 *      the `holiday/` prefix was applied wholesale to paths that never had a
 *      seasonal variant. Only rooms 3, 4, 35 and 48 carry such a dead path.
 *   2. Room 4 (musical_mainstreet) carries the byte-identical string. Room 4 IS
 *      Main Street, where main_street2 belongs; room 48 is a different land.
 *      The line was copied.
 *   3. `vmk_snd_vmk_esplanade.cct` (191KB) exists, matches the room's own space
 *      cast `vmk_spaces/vmk_vmk_esplanade` exactly under the convention, and is
 *      referenced by no config line anywhere — orphaned by that copy-paste.
 *
 * Not fixed here: room 3 (mainstreet_square) de-holidays to `vmk_snd_main_street1`,
 * while an orphaned `vmk_snd_mainstreet_square` also exists. Both are plausible
 * Main Street tracks and several near-duplicate copies exist
 * (vmk_snd_main_street / _street1 / mainstreet1, all ~203KB), so there is no
 * evidence to pick between them. Left as configured.
 */
const SOUND_FIXUPS = new Map<string, [string, string]>([
  // Room 48 was derived from orphan-detection alone, before we had a reference.
  // Disney's own `external_variables_1102` later confirmed it exactly.
  ["48", ["vmk_snd_main_street2", "vmk_snd_vmk_esplanade"]],
  //
  // ⚠ Rooms 3 and 4 were briefly added here because that same Disney file gives
  // both `vmk_snd_main_street`. REVERTED — `external_variables_1102` is a
  // *version*, and an early one: it assigns Town Square and Main Street the
  // single `vmk_snd_main_street` track, while the archive carries
  // `_street1` and `_street2`, a later split into two tracks. The archived config
  // reflects the newer state and is correct here.
  //
  // The rule this establishes: Disney 1102 overrides ours only where ours is
  // demonstrably *damaged* — a dead path, a copy-pasted duplicate, an injected
  // host. It does NOT override on content that simply changed between versions.
  // Room 48 qualifies (its path `vmk_sound/holiday/vmk_snd_main_street2` does
  // not exist and is byte-identical to room 4's line). Rooms 3 and 4 do not.
]);

/**
 * Rewrite `room.cast.*`: de-holiday, apply sound fixups, and **drop entries
 * whose cast cannot be served at all**.
 *
 * ⚠ Entries cannot simply be deleted. `CRoomHandler._EnterRoom` walks
 * `room.cast.<N>.1`, `.2`, … and **stops at the first missing index**, so
 * removing a middle entry would silently truncate the room's cast list. The
 * survivors are renumbered contiguously.
 *
 * Dropping unresolvable casts is what lets a room load at all. Previously the
 * game server refused to advertise any room with a missing cast, because
 * `_EnterRoom` would request the absent file and hang the load bar with nothing
 * on the wire to explain it. That protection was aimed at the wrong layer: if
 * the served config never mentions the missing cast, the client never asks for
 * it. Room 1104 (Haunted Mansion Lobby) was the case in point: one cast
 * (`vmk_avatar/gfx_hmgame_avatar`) was missing and kept the whole lobby
 * unreachable. That cast has since been recovered (vmk_source.zip), and all 16
 * of 1104's casts resolve.
 *
 * The trade is explicit: a room loads without an absent asset rather than not
 * loading at all. Every drop is logged by name.
 */
function applySeasonToVariables(text: string): string {
  const lines = text.split(/\r\n|\r|\n/);
  const newline = text.includes("\r\n") ? "\r\n" : "\n";
  const perRoom = new Map<string, string[]>();
  const out: Array<string | { room: string }> = [];
  let dropped = 0;
  let swapped = 0;
  const unresolvable: string[] = [];

  for (const line of lines) {
    const match = /^room\.cast\.(\d+)(?:\.\d+)?=(.*)$/.exec(line);
    if (!match) {
      out.push(line);
      continue;
    }
    const [, room, rawPath] = match;
    const original = rawPath.trim();
    const deHoliday = original.replace(/(^|\/)(vmk_holiday_overlays|holiday)\//g, "$1");
    let chosen = original;
    if (deHoliday !== original) {
      if (/holiday/i.test(deHoliday.split("/").pop() ?? "")) {
        dropped++; // a holiday-only layer (vmk_holiday_animation) — no plain twin
        continue;
      }
      if (castPathExists(deHoliday)) {
        chosen = deHoliday;
        swapped++;
      }
    }
    const fixup = SOUND_FIXUPS.get(room);
    if (fixup) {
      const [wrong, right] = fixup;
      const base = chosen.split("/").pop() ?? "";
      if (base === wrong) {
        const corrected = chosen.replace(new RegExp(`${wrong}$`), right);
        if (castPathExists(corrected)) {
          console.log(`[season] room ${room}: sound ${wrong} -> ${right} (see SOUND_FIXUPS)`);
          chosen = corrected;
        }
      }
    }
    // Last gate: can the client load this cast at all? The extraction is keyed
    // by basename, so a config path that disagrees with the archive's directory
    // layout (the one existing pirates stage lives in vmk_minigame/, not
    // vmk_spaces/) still resolves.
    if (!castPathExists(chosen)) {
      unresolvable.push(`${room}:${chosen}`);
      continue;
    }
    if (!perRoom.has(room)) {
      perRoom.set(room, []);
      out.push({ room });
    }
    perRoom.get(room)!.push(chosen);
  }

  if (SEASON) {
    let rooms = 0;
    for (const [room, casts] of perRoom) {
      const { casts: seasonal, changes } = seasonalCasts(SEASON, room, casts, castPathExists);
      if (changes.length === 0) continue;
      perRoom.set(room, seasonal);
      rooms++;
      console.log(`[season] ${SEASON} room ${room}: ${changes.join(", ")}`);
    }
    console.log(`[season] ${SEASON}: ${rooms} room(s) decorated`);
  }

  const rendered = out.flatMap((entry) =>
    typeof entry === "string"
      ? [entry]
      : (perRoom.get(entry.room) ?? []).map((path, index) => `room.cast.${entry.room}.${index + 1}=${path}`),
  );
  if (swapped > 0 || dropped > 0) {
    console.log(`[season] archived holiday lines: ${swapped} cast path(s) swapped to plain, ${dropped} holiday-only layer(s) dropped`);
  }
  if (unresolvable.length > 0) {
    console.log(
      `[casts] dropped ${unresolvable.length} unresolvable cast(s) so their rooms can still load: ` +
        unresolvable.join(", "),
    );
  }
  return rendered.join(newline);
}

function resolveArchiveFile(pathname: string): string | null {
  // Match every shape of core-cast request, not just the fully-qualified one.
  // framework_disney.dcr asks for a BARE `core.cst` before it asks for
  // `vmk_core/core.cct`, and only the latter used to hit this override. The
  // bare name fell through to the basename fallback, which served the later
  // re-save (113,960 b) from ref/vmk_core/core.cct; that became castLib3, and
  // the correct core.old.cct fetch was then short-circuited by the
  // already-loaded-cast predicate. The result was a Disney loader running on a
  // re-saved core — the era mix vmk-player.html warns about — which died at
  // initThread with "Script not found: Core Thread Class".
  if (CORE_CAST_OVERRIDE && /(^|\/)(vmk_core\/)?core\.(cct|cst)$/i.test(pathname)) {
    const override = resolveCoreCastOverride();
    if (override) return override;
    console.warn(`[core-cast] VMK_CORE_CAST="${CORE_CAST_OVERRIDE}" not found; serving archive copy`);
  }
  const rel = pathname.replace(/^\//, "");
  const candidates = [rel, rel.replace(/^vmk\//, "")];
  // PATCHED casts win over everything. Keeping them in their own tree means the
  // archive and the overlay stay pristine, so "is this file original?" is always
  // answerable by looking at where it lives.
  const patches = resolvePatchDir();
  if (patches) {
    for (const candidate of candidates) {
      const file = safePath(patches, candidate);
      if (file && isFile(file)) {
        console.log(`[patch] ${pathname} -> ${file}`);
        return file;
      }
    }
  }
  // The overlay is searched first so recovered files (the UI casts pulled out of
  // files.zip, which the mirrored archive never had) can be served without
  // writing anything into the user's VMKShockwave directory.
  const overlay = resolveOverlayDir();
  if (overlay) {
    for (const candidate of candidates) {
      const file = safePath(overlay, candidate);
      if (file && isFile(file)) return file;
    }
  }
  for (const candidate of candidates) {
    const file = safePath(SHOCKWAVE, candidate);
    if (file && isFile(file)) return file;
  }
  // Last resort: match on BASENAME anywhere in the archive.
  //
  // The config's cast paths do not always match the mirror's layout. Measured:
  // of 65 `room.cast.*` paths that 404 on their exact path, 7 exist under a
  // different directory — `vmk_spaces/vmk_pirates2_game_preshow` is really in
  // `vmk_minigame/`, `vmk_sound/holiday/vmk_snd_main_street1` is really in
  // `vmk_sound/`, and `vmk_spaces/vmk_holiday_overlays/vmk_holiday_animation`
  // in `vmk_spaces/`. Those three block Town Square, Central Plaza, Main Street
  // and the Esplanade — rooms that otherwise hang the client's load bar forever
  // with nothing on the wire to explain it, because `_EnterRoom` hands over a
  // room code and the client resolves the casts itself.
  //
  // Only applied to cast-ish requests, and only after every exact path has
  // failed, so it cannot shadow a correct file.
  if (/\.(cct|cst)$/i.test(rel) || !extname(rel)) {
    const base = rel.split("/").pop() ?? "";
    if (base) {
      const found = findCastByBasename(base);
      if (found) {
        console.log(`[archive] ${rel} not at that path; served ${found.replace(SHOCKWAVE, "<archive>")}`);
        return found;
      }
    }
  }
  return null;
}

/**
 * Seasonal loading screens, filtered the same way seasonal casts are.
 *
 * `loadingscreens_6` maps each room to a theme (`room.53=halloween`) and then
 * defines each theme's artwork. Six rooms are pinned to Halloween and one to
 * fireworks in the archived config — including 53 and 54, two of the four guest
 * room styles, so creating a Mad Hatter's room showed a Halloween loading
 * screen in the middle of an otherwise non-holiday park.
 *
 * `applySeasonToVariables` already does this for casts; loading screens are a
 * separate file and were missed by it. Same switch: `VMK_SEASON=halloween`
 * serves the archived pins (the file's themes are only `loading`, `halloween`
 * and `fireworks` — there is no Christmas screen), anything else the default.
 */
function applySeasonToLoadingScreens(text: string): string {
  if (SEASON === "halloween") return text;
  let swapped = 0;
  const out = text.replace(/^(room\.\d+)=(?!loading\s*$)(\w+)\s*$/gm, (_line, key: string) => {
    swapped++;
    return `${key}=loading`;
  });
  if (swapped > 0) {
    console.log(`[season] non-holiday: ${swapped} loading screen(s) reset to the default theme`);
  }
  return out;
}

/**
 * Serve an archive file, applying any transform that file needs.
 *
 * ⚠ Use this rather than `serveFile` for archive content. There are TWO routes
 * into the archive — `/shockwave/*` and the site-relative fallback — and a
 * transform added to only one of them silently does nothing on the other. That
 * is exactly how the seasonal loading-screen filter first appeared to fail:
 * `/shockwave/` has its own branch that called `serveFile` directly.
 */
/**
 * Sprite slots the furnimap mirrors but forgets to mark as mirrored.
 *
 * An animated item draws its moving part into a placeholder slot the furnimap
 * declares as `<SPR GFX="null" …/>`; `CRoomItemStateAnimator` swaps the MEMBER
 * and leaves the slot's other attributes alone. So the slot — not the animation
 * — decides whether that layer is flipped.
 *
 * The scoreboard's DIR 3 draws its body from the dir-5 art with `FLP="1"`, but
 * its placeholder carries no `FLP`. Its animation supplies dir-5 art too, which
 * then lands UNflipped on a mirrored body: the lights sit on the wrong side and
 * the item only looks right at dir 5. Adding the missing `FLP` makes the layers
 * agree.
 *
 * ⚠ This adds an attribute to a sprite that already exists. It does NOT rename
 * a sprite or redefine an item — the trap documented at `furnimapFile`, where a
 * variant page redefines a code with sprite names its cast no longer has, and
 * the furniture vanishes from the room.
 *
 * Dirs 1 and 7 are NOT fixable this way: the scoreboard's animation defines no
 * frames for them at all, so there is nothing to flip.
 */
const FURNIMAP_FLIPS: Array<{ code: number; dir: number }> = [{ code: 40, dir: 3 }];

function patchFurnimap(xml: string): string {
  let flipped = 0;
  let out = xml;
  for (const { code, dir } of FURNIMAP_FLIPS) {
    out = out.replace(
      new RegExp(`<ITEM\\b[^>]*\\bCODE="${code}"[^>]*>[\\s\\S]*?</ITEM>`),
      (item) =>
        item.replace(new RegExp(`<DIR NUM="${dir}">[\\s\\S]*?</DIR>`), (block) =>
          block.replace(/<SPR GFX="null"([^>]*?)\/>/g, (spr, attrs: string) => {
            if (/\bFLP=/.test(attrs)) return spr;
            flipped++;
            return `<SPR GFX="null"${attrs}FLP="1" />`;
          }),
        ),
    );
  }
  if (flipped > 0) console.log(`[furnimap] flipped ${flipped} animated sprite slot(s)`);
  return out;
}

function serveArchiveFile(req: IncomingMessage, res: ServerResponse, file: string, pathname: string): void {
  if (/loadingscreens_\d+$/i.test(pathname)) {
    // Its artwork URLs name the authored host — see public-url.ts.
    const body = withPublicUrls(applySeasonToLoadingScreens(readFileSync(file, "latin1")), publicUrls(req));
    send(res, 200, Buffer.from(body, "latin1"), "text/plain; charset=iso-8859-1");
    return;
  }
  if (/^\/fm\/\d+$/.test(pathname) || /furnituremaps/i.test(pathname)) {
    const body = patchFurnimap(readFileSync(file, "latin1"));
    send(res, 200, Buffer.from(body, "latin1"), "text/plain; charset=iso-8859-1");
    return;
  }
  serveFile(res, file);
}

function tryServeArchive(req: IncomingMessage, res: ServerResponse, pathname: string): boolean {
  const file = resolveArchiveFile(pathname);
  if (!file) return false;
  logFetch(req, pathname, `archive -> ${file.replace(SHOCKWAVE, "")}`);
  serveArchiveFile(req, res, file, pathname);
  return true;
}

function handleLoadingPhp(req: IncomingMessage, res: ServerResponse, url: URL) {
  // ref/loading.php proxies GetSec binary from the game server (see VMKShockwave/ref).
  void handleGetSecProxy(req, res, url, "loading.php");
}

async function proxyGameServer(req: IncomingMessage, res: ServerResponse, path: string) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const body = Buffer.concat(chunks);
  const target = `${GAME_SERVER}${path}`;
  logFetch(req, path, `proxy -> ${target}`);
  try {
    const upstream = await fetch(target, {
      method: req.method ?? "POST",
      headers: {
        "Content-Type": req.headers["content-type"] ?? "application/json",
        // The game server's /dev/register wants the shared secret; this proxy
        // only exists with VMK_DEV=1 (see the route).
        "X-HK-Secret": bridgeSecret(),
      },
      body: body.length ? body : undefined,
      signal: AbortSignal.timeout(3000),
    });
    const out = Buffer.from(await upstream.arrayBuffer());
    send(res, upstream.status, out, upstream.headers.get("content-type") ?? "application/json");
  } catch (err) {
    console.log(`[proxy] ${path} failed:`, err);
    send(res, 502, JSON.stringify({ error: "game server unreachable", detail: String(err) }), "application/json");
  }
}

async function handleGetSecProxy(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
  label: string,
) {
  if (LOADING_STATIC && existsSync(LOADING_STATIC)) {
    logFetch(req, url.pathname, `${label} -> static ${LOADING_STATIC}`);
    serveFile(res, LOADING_STATIC);
    return;
  }

  // ⚠ GetSec's blob carries the user's login ticket. It is off unless the host
  // opts in for the fan-server Shockwave builds (Disney's movie and the browser
  // client never ask),
  // and then it is the CALLER'S OWN: the signed-in session, or a still-valid
  // `?t=` ticket (the movie may fetch without the cookie). Never a user id from
  // the request, and never a default — that handed user 1's ticket to anyone.
  if (!SHOCKWAVE_GETSEC) {
    send(res, 404, "Not found");
    return;
  }
  const who = currentUser(req) ?? getUserByTicket(url.searchParams.get("t") ?? undefined);
  if (!who) {
    logFetch(req, url.pathname, `${label} -> no session, nothing sent`);
    // PHP ref dies with no body when there is no session.
    send(res, 204, "");
    return;
  }
  const userId = who.id;
  const target = `${GAME_SERVER}/GetSec/${GETSEC_UUID}/${userId}`;
  logFetch(req, url.pathname, `${label} -> GetSec userId=${userId}`);
  try {
    const upstream = await fetch(target, {
      headers: { "X-HK-Secret": bridgeSecret() },
      signal: AbortSignal.timeout(1000),
    });
    if (!upstream.ok) {
      console.log(`[${label}] GetSec ${upstream.status} from ${target}`);
      send(res, upstream.status, "");
      return;
    }
    const body = Buffer.from(await upstream.arrayBuffer());
    send(res, 200, body, "application/octet-stream");
  } catch (err) {
    console.log(`[${label}] GetSec proxy failed (${target}):`, err);
    // PHP ref dies with no body when session/server unavailable
    send(res, 204, "");
  }
}

function handleExternalTexts(req: IncomingMessage, res: ServerResponse) {
  // Overlay first, same precedence as resolveArchiveFile. The shipped corpus is
  // the archived build and carries live outbound URLs — `game.exit.url` sends
  // the client to play.openvmk.com when the connection drops, and
  // `reg.page1-5.url` are hitbox.com analytics beacons. A patched copy at
  // assets/overlay/external_texts.txt keeps the archive untouched.
  const overlay = resolveOverlayDir();
  const candidates = [
    ...(overlay ? [join(overlay, "external_texts.txt")] : []),
    join(REF, "external_texts.txt"),
    join(SHOCKWAVE, "external_texts.txt"),
  ];
  const file = candidates.find((path) => existsSync(path));
  if (!file) {
    send(res, 404, "external_texts.txt not found");
    return;
  }

  // ⚠ Served as an explicit BUFFER, not with serveFile. The latin1 round trip
  // and the explicit Content-Length both matter: the corpus is not UTF-8, and
  // serveFile's own comment records that a missing Content-Length makes the real
  // Shockwave plugin re-request in a loop.
  //
  // ⚠ THE BILLBOARD REWRITE THAT USED TO SIT HERE IS GONE. It pointed each
  // `room.<n>.board.<n>` at recovered art via an imported catalogue; the
  // catalogue and the art both came from that import, the boards are not used,
  // and our own archive holds only 7 of the ~23 images the corpus names. Boards
  // now go out exactly as the corpus has them, which is what the original did
  // once Disney's ad server died.
  //
  // ⚠ The texts name this server too: 37 `http://127.0.0.1:5199` URLs —
  // billboards, `game.exit.url`, `reg.loginrejectedurl`, the arcade. Pointed at
  // the public address (public-url.ts) like the variables, or a player on any
  // other machine gets blank boards and is "sent home" to their own computer.
  const body = Buffer.from(withPublicUrls(readFileSync(file, "latin1"), publicUrls(req)), "latin1");
  writeBody(res, 200, {
    "Content-Type": MIME[".txt"] ?? "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",
  }, body);
}

/**
 * The classic `<embed>` page, for driving the movie with a REAL Adobe Shockwave
 * plugin instead of LibreShockwave. See docs/REAL-CLIENT-ORACLE.md.
 *
 * Modelled on the archive's own `siteref/client.php`, with two deliberate
 * differences:
 *
 *  - **`framework_disney.dcr`, not `vmk_14.dcr`.** A real plugin has none of
 *    LibreShockwave's dead-host rewriting (see apply-fetch-rewrite-patch.mjs),
 *    so a movie relying on baked-in fan-server hosts would try to reach
 *    machines that no longer exist. Disney's loader takes every endpoint from
 *    the sw params below, which all point at this server.
 *  - **`sw1`-`sw7`, not `sw1` alone.** client.php passed only the login ticket
 *    because the rest of the archived configuration was baked into that build.
 *
 * Both `<object>` (ActiveX, for IE) and the nested `<embed>` (NPAPI, for Gecko)
 * are emitted, because which one fires depends on the browser hosting it.
 *
 * The ticket is registered with the game server here, server-side, so the
 * `<embed>` can be static — injecting a plugin element from JS after an async
 * fetch is exactly the sort of thing old plugins are unreliable about.
 */
/** Entry points worth A/B-ing against a real plugin. See PRESETS in vmk-player.html. */
const CLIENT_MOVIES: Record<string, string> = {
  framework_disney: "/shockwave/framework_disney.dcr",
  vmk_8: "/shockwave/vmk_8.dcr",
  vmk_14: "/shockwave/vmk_14.dcr",
  framework: "/shockwave/vmk_spaces/framework.dcr",
  /**
   * Control experiment, not VMK. Adobe's own `shockwave_Projector_Loader.dcr`,
   * copied out of the Shockwave 12 install itself. If this plays, the plugin +
   * browser + page + our HTTP serving are all sound and the fault is in VMK's
   * movie/cast set. If it fails the same way, the fault is upstream of anything
   * VMK-specific and no amount of embed-parameter tuning will help.
   */
  selftest: "/shockwave/selftest.dcr",
  /**
   * Drop ANY .dcr at assets/overlay/custom.dcr and load `?movie=custom`.
   * Intended for a trivial movie published from the installed Director MX 2004
   * (= Director 10, the same era as VMK): the clean pipeline control that
   * `selftest` failed to be. If a hand-published movie plays here, the plugin
   * chain is good and the fault is VMK-specific; if it does not, nothing
   * VMK-side is worth debugging yet.
   */
  custom: "/shockwave/custom.dcr",
};

const LOGIN_PAGE = join(ROOT, "server", "public", "login.html");

/**
 * Replace the `username=` / `password=` lines in an external-variables file.
 *
 * These lines are how VMK's client auto-submits its login. The checked-in
 * config carries a fixed `devuser`/`devpass` pair; per player we substitute the
 * real username and a one-shot ticket. CRLF is preserved because the client's
 * parser splits on CR -- an LF-only file was a real defect here once.
 */
function withLoginCredentials(body: string, username: string, ticket: string): string {
  return stripLoginCredentials(body) + `\r\nusername=${username}\r\npassword=${ticket}\r\n`;
}

function stripLoginCredentials(body: string): string {
  return body
    .split(/\r?\n/)
    .filter((line) => !/^\s*(username|password)\s*=/i.test(line))
    .join("\r\n");
}

/** Fixed dev identity, so the debug player is one click and always the same user. */
const DEV_USERNAME = process.env.VMK_DEV_USER ?? "devuser";
const DEV_PASSWORD = process.env.VMK_DEV_PASS ?? "devpass";

/**
 * Only same-site absolute paths may be used as a post-login destination.
 * Anything else (scheme-relative "//evil.example", an absolute URL, a path
 * traversal) is discarded rather than sanitised.
 */
function safeNext(candidate: string | null): string | null {
  if (!candidate) {
    return null;
  }
  if (!candidate.startsWith("/") || candidate.startsWith("//") || candidate.includes("..")) {
    return null;
  }
  return candidate;
}

function serveLoginPage(res: ServerResponse, error: string | null, next: string | null): void {
  let html = readFileSync(LOGIN_PAGE, "utf8");
  const escape = (value: string) =>
    value.replace(/[<>&"]/g, (c) =>
      c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : "&quot;",
    );
  if (error) {
    html = html.replace("<!--ERROR-->", `<p class="error">${escape(error)}</p>`);
  }
  // Carry the intended destination through the form, so someone who asked for
  // the real Shockwave plugin at /client is not silently handed the WASM player
  // at /play after logging in.
  const target = safeNext(next);
  if (target) {
    html = html.replace(
      "<!--NEXT-->",
      `<input type="hidden" name="next" value="${escape(target)}">`,
    );
  }
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(html);
}

/**
 * Run an async route without letting a throw take the process down.
 *
 * The route table dispatches with bare `void someAsyncHandler(...)`, so any
 * rejection becomes an unhandled rejection — which Node terminates on. A single
 * bad login killed the whole server that way. A request failing should cost that
 * request, not everyone's session.
 */
function guard(label: string, run: () => Promise<void>, res: ServerResponse): void {
  run().catch((error: unknown) => {
    console.error(`[${label}] request failed:`, error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal server error");
    } else {
      res.end();
    }
  });
}

/** Per-IP limits on `/auth`: failed sign-ins, and new accounts. */
const AUTH_FAILURES_MAX = 10;
const AUTH_FAILURE_WINDOW_MS = 10 * 60e3;
const SIGNUPS_MAX = 5;
const SIGNUP_WINDOW_MS = 60 * 60e3;
const authFailures = new Map<string, { count: number; until: number }>();
const signups = new Map<string, { count: number; until: number }>();

function gateClosed(gates: Map<string, { count: number; until: number }>, ip: string, max: number): boolean {
  const gate = gates.get(ip);
  return gate !== undefined && gate.until > Date.now() && gate.count >= max;
}

function countAttempt(gates: Map<string, { count: number; until: number }>, ip: string, windowMs: number): void {
  const t = Date.now();
  const gate = gates.get(ip);
  if (gate && gate.until > t) gate.count++;
  else gates.set(ip, { count: 1, until: t + windowMs });
}

// Expired gates go, so the maps cannot grow by one entry per address forever.
setInterval(() => {
  const t = Date.now();
  for (const gates of [authFailures, signups]) for (const [ip, g] of gates) if (g.until <= t) gates.delete(ip);
}, 10 * 60e3).unref();

async function handleAuthPost(req: IncomingMessage, res: ServerResponse): Promise<void> {
  let form: URLSearchParams;
  try {
    form = await readFormBody(req);
  } catch {
    redirect(res, "/?error=" + encodeURIComponent("That request was too large."));
    return;
  }
  const username = (form.get("username") ?? "").trim();
  const password = form.get("password") ?? "";
  const next = safeNext(form.get("next"));
  const back = (message: string) =>
    "/?error=" +
    encodeURIComponent(message) +
    (next ? `&next=${encodeURIComponent(next)}` : "");

  if (!username || !password) {
    redirect(res, back("Enter a username and a password."));
    return;
  }
  if (username.length > 32 || !/^[A-Za-z0-9_. -]+$/.test(username)) {
    redirect(res, back("Usernames can use letters, numbers, spaces, dot, dash and underscore."));
    return;
  }

  // ⚠ Every attempt runs scrypt, and an unknown name CREATES an account, with
  // no limit: a script could stall this server or mint accounts by the
  // thousand. It also checks the same passwords as Housekeeping, so without
  // its own limit Housekeeping's 5-try lockout was moot.
  const ip = clientIp(req.socket.remoteAddress, req.headers);
  const signingUp = !getUserByUsername(username);
  if (gateClosed(authFailures, ip, AUTH_FAILURES_MAX) || (signingUp && gateClosed(signups, ip, SIGNUPS_MAX))) {
    console.warn(`[auth] ${signingUp ? "sign-up" : "sign-in"} for "${username}" refused: rate limit (${ip})`);
    redirect(res, back("Too many attempts. Wait a few minutes and try again."));
    return;
  }

  const outcome = authenticate(username, password);
  if (outcome?.created) countAttempt(signups, ip, SIGNUP_WINDOW_MS);
  if (!outcome) {
    countAttempt(authFailures, ip, AUTH_FAILURE_WINDOW_MS);
    // Deliberately does NOT distinguish "wrong password" from anything else, so
    // the page cannot be used to enumerate who has an account.
    redirect(res, back("That username and password do not match."));
    return;
  }

  console.log(
    `[auth] ${outcome.created ? "created" : "signed in"} "${outcome.user.username}" (id=${outcome.user.id})`,
  );
  setSessionCookie(res, outcome.token);
  logLogin(
    outcome.user.id,
    "web",
    // The PLAYER's address, not a reverse proxy's — see client-ip.ts.
    ip,
    "",
    String(req.headers["user-agent"] ?? ""),
  );
  redirect(res, next ?? "/play");
}

/**
 * Serve the WASM player as the actual game.
 *
 * Same file as the debug page — the sidebar is simply hidden unless `?debug=1`.
 * Keeping one page means the thing players use and the thing that gets debugged
 * cannot drift apart, which is worth more than a tidier prod template.
 *
 * The ticket is injected here rather than generated in the page: a ticket the
 * browser invents is bound to nobody.
 */
async function handlePlayPage(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
  ticket: string,
): Promise<void> {
  const user = currentUser(req);
  const debug = url.searchParams.get("debug") === "1";
  const boot = JSON.stringify({ ticket, username: user?.username ?? null, debug })
    // Keep the JSON from terminating the inline <script> early.
    .replace(/</g, "\\u003c");

  // The page was written to live at /player/ and loads
  // `libreshockwave-cpp-player.js` by RELATIVE path. Served at /play that
  // resolves to /libreshockwave-cpp-player.js and 404s, leaving the stage on
  // "No movie loaded" with `LibreShockwavePlayer is not defined` in the console.
  // A <base> keeps the page's own relative URLs pointing at /player/ without
  // having to rewrite them.
  const html = readFileSync(VMK_PLAYER, "utf8")
    .replace("<head>", `<head>\n  <base href="/player/">`)
    .replace("<body>", `<body>\n  <script>window.__VMK_BOOT = ${boot};</script>`);
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(html);
}

async function handleClientEmbed(
  req: IncomingMessage,
  res: ServerResponse,
  activeX: boolean,
  movieKey: string,
  playerVersion: string,
  ticket: string,
  debug: boolean,
) {
  // ⚠ The ticket is passed IN, by an authenticated caller. This function used to
  // mint its own (`randomBytes(16)` bound to a hardcoded `userId: 1`,
  // `loginName: "DevGuest"`), which meant a ticket proved nothing about who was
  // playing. Minting now happens only in auth.ts::issueTicketFor, for a user who
  // has logged in. Do not reintroduce a fallback here -- a route that can
  // conjure its own ticket is a route that bypasses login.

  // Keep in step with buildVmkParams() in tools/shockwave/vmk-player.html.
  const params: Array<[string, string]> = [
    ["sw1", ticket],
    ["sw2", "connection.info.host=127.0.0.1;connection.info.port=8080"],
    ["sw3", `site.url=${PUBLIC_ORIGIN};url.prefix=${PUBLIC_ORIGIN}/shockwave`],
    ["sw4", `external.texts.txt=${PUBLIC_ORIGIN}/shockwave/external_texts.txt`],
    // `?t=` so the variables response can carry THIS player's credentials --
    // see the external_variables route. Without it the client would fetch the
    // shared file and log in as whatever generic account it names.
    ["sw5", `external.variables.txt=${PUBLIC_ORIGIN}/external_variables.txt?t=${ticket}`],
    ["sw6", `file.server=${PUBLIC_ORIGIN}/file.php`],
    ["sw7", "client.allow.cross.domain=1;client.notify.cross.domain=0"],
  ];
  const moviePath = CLIENT_MOVIES[movieKey] ?? CLIENT_MOVIES.framework_disney;
  const movie = `${PUBLIC_ORIGIN}${moviePath}`;
  logFetch(req, "/client", `embed movie=${movieKey} playerVersion=${playerVersion || "(omitted)"}`);
  const attr = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const objectParams = params
    .map(([key, value]) => `      <param name="${key}" value="${attr(value)}">`)
    .join("\n");
  const embedAttrs = params.map(([key, value]) => `        ${key}="${attr(value)}"`).join("\n");

  // ⚠ Emit ONE plugin element, not the classic `<object>`-wrapping-`<embed>`
  // nesting. Gecko ignores the ActiveX `classid` and renders the nested
  // `<embed>` as fallback, but it can also try to instantiate the `<object>`
  // itself -- which loads the movie twice. The observed symptom is the movie
  // and its casts being fetched in overlapping bursts
  // (dcr, empty.cct, core.cct, dcr, dcr, …) that read like a reload loop.
  // `?activex=1` selects the IE/ActiveX form instead.
  const plugin = activeX
    ? `      <object classid="clsid:166B1BCA-3F9C-11CF-8075-444553540000"
              width="800" height="600" id="vmk">
        <param name="src" value="${attr(movie)}">
        <param name="bgColor" value="#000000">
        <param name="swStretchStyle" value="none">
        <param name="progress" value="false">
        <param name="logo" value="false">
${playerVersion ? `        <param name="PlayerVersion" value="${attr(playerVersion)}">\n` : ""}${objectParams}
      </object>`
    : `      <embed src="${attr(movie)}"
        type="application/x-director"
        pluginspage="http://www.macromedia.com/shockwave/download/"
        bgColor="#000000"
        width="800" height="600"
        swStretchStyle="none"
        progress="false"
        logo="false"
        swRemote="swSaveEnabled='true' swVolume='true' swRestart='false' swPausePlay='false' swFastForward='false' swTitle='client' swContextMenu='true'"
${playerVersion ? `        PlayerVersion="${attr(playerVersion)}"\n` : ""}${embedAttrs}>
      </embed>`;

  // Same convention as /play: the game by default, diagnostics behind ?debug=1.
  //
  // ⚠ The ticket is deliberately NOT shown unless debugging. It is the evidence
  // that this browser authenticated -- printing it on the page put a working
  // credential on screen, in screenshots and in anyone's shoulder view.
  const diagnostics = debug
    ? `    <div class="note">
      Real Adobe Shockwave plugin — ${activeX ? "ActiveX (<code>?activex=1</code>)" : "NPAPI <code>&lt;embed&gt;</code>"}, not LibreShockwave.
      Ticket <b>${attr(ticket)}</b>.
      Movie <b>${attr(movieKey)}</b> = <b>${attr(movie)}</b>. Game server <b>${attr(GAME_SERVER)}</b>.
      Switch with <code>?movie=</code>${Object.keys(CLIENT_MOVIES).map((k) => `<code>${k}</code>`).join(" ")}.
    </div>`
    : "";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Virtual Magic Kingdom</title>
    <style>
      html, body { margin: 0; padding: 0; background: #000; height: 100%; }
      .wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
      .note { color: #888; font: 12px/1.5 sans-serif; padding: 8px 12px; }
      .note b { color: #ccc; }
      /* Only visible if the plugin never instantiates — a real player needs to
         be told why the screen is black, and cannot read a server log. */
      .fallback {
        position: fixed; inset: auto 0 0 0;
        color: #7d8ea6; font: 13px/1.6 "Segoe UI", system-ui, sans-serif;
        text-align: center; padding: 14px;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
${plugin}
    </div>
${diagnostics}
    <noscript class="fallback">
      This page needs the Adobe Shockwave plugin.
    </noscript>
  </body>
</html>
`;
  send(res, 200, html, "text/html; charset=utf-8");
}

function handleDownloadShim(pathname: string, res: ServerResponse) {
  // /shims/download/hosts/foo.jpg -> placeholder image
  if (/\.(png|jpe?g|gif|webp)$/i.test(pathname)) {
    const ext = extname(pathname).toLowerCase();
    send(res, 200, PLACEHOLDER_PNG, ext === ".png" ? "image/png" : "image/jpeg");
    return;
  }
  send(res, 204, "");
}

function route(req: IncomingMessage, res: ServerResponse) {
  // ⚠ Both throw on hostile input — a broken `%` escape (`/%E0%A4%A`) or a
  // path like `//[` — and an uncaught throw here kills the whole server.
  let url: URL;
  let pathname: string;
  try {
    url = new URL(req.url ?? "/", `http://127.0.0.1:${PORT}`);
    pathname = decodeURIComponent(url.pathname);
  } catch {
    send(res, 400, "Bad request");
    return;
  }

  reportClientError(req, pathname);

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    });
    res.end();
    return;
  }

  if (pathname === "/health") {
    send(res, 200, JSON.stringify({ ok: true, shockwave: SHOCKWAVE, wasm: WASM_DIST }), "application/json");
    return;
  }

  if (pathname === "/vmk/config.json") {
    send(
      res,
      200,
      JSON.stringify({
        origin: PUBLIC_ORIGIN,
        loadingUrl: LOADING_URL,
        gameServer: GAME_SERVER,
        loadingStatic: LOADING_STATIC ? true : false,
      }),
      "application/json",
    );
    return;
  }

  if (pathname === "/file.php" || pathname.endsWith("/file.php")) {
    handleFilePhp(req, res, url);
    return;
  }

  // OpenVMK ref: loading.php + sec.php proxy GetSec from game server
  if (pathname === "/vmk/loading.php" || pathname === "/loading.php") {
    handleLoadingPhp(req, res, url);
    return;
  }

  if (pathname === "/sec.php" || pathname.endsWith("/sec.php")) {
    void handleGetSecProxy(req, res, url, "sec.php");
    return;
  }

  // Proxy game-server dev registration (avoids browser CORS 5199 -> 8080).
  // Dev only: it adds the shared secret, so open to anyone it would let anyone
  // choose what GetSec hands out.
  if (DEV_MODE && pathname === "/dev/register" && req.method === "POST") {
    void proxyGameServer(req, res, "/dev/register");
    return;
  }

  // Housekeeping, the staff portal (hk.ts). Its own login: it never creates
  // accounts, and only users with a moderator permission get past it.
  if (handleHk(req, res, url, pathname)) {
    return;
  }

  // Loading bar JSON (web embed used LOAD_SCREEN_VARS inline; kept for manual testing)
  // Real-plugin entry point. `/client.php` mirrors the archive's own path so a
  // captured link still lands somewhere useful.
  // ---------------------------------------------------------------- auth ----
  // GET /            login page (or straight through if already signed in)
  // POST /auth       unknown username -> create; known -> verify; sets cookie
  // GET /logout      drop the session
  // GET /play        the client, and ONLY the client -- requires a session
  if (pathname === "/" || pathname === "/login") {
    const next = safeNext(url.searchParams.get("next"));
    if (currentUser(req)) {
      redirect(res, next ?? "/play");
      return;
    }
    serveLoginPage(res, url.searchParams.get("error"), next);
    return;
  }

  if (pathname === "/auth" && req.method === "POST") {
    guard("auth", () => handleAuthPost(req, res), res);
    return;
  }

  if (pathname === "/logout") {
    const token = parseCookies(req)[SESSION_COOKIE];
    if (token) {
      deleteSession(token);
    }
    clearSessionCookie(res);
    redirect(res, "/");
    return;
  }

  /**
   * The client's game data and code bundle.
   *
   * Checked before `/play` itself so the page's own asset requests resolve, and
   * before the archive routes because these paths are the client's, not the
   * archive's.
   */
  if (
    pathname.startsWith("/core/") ||
    pathname.startsWith("/casts/") ||
    pathname.startsWith("/fonts/")
  ) {
    // Several bitmaps of one cast in one response — see delivery.ts.
    const batch = /^\/casts\/([^/]+)\/_batch$/.exec(pathname);
    if (batch) {
      serveCastBatch(req, res, join(CLIENT_ASSETS, "casts"), batch[1], url.searchParams.get("f") ?? "");
      return;
    }
    const file = join(CLIENT_ASSETS, normalize(pathname).replace(/^[/\\]+/, ""));
    if (file.startsWith(CLIENT_ASSETS) && existsSync(file) && statSync(file).isFile()) {
      // A cast's manifest carries its art version — see delivery.ts.
      const manifest = /^\/casts\/([^/]+)\/manifest\.tsv$/.exec(pathname);
      if (manifest) {
        // Never rejects: a version it cannot compute is `null` (no header).
        void castArtVersion(join(CLIENT_ASSETS, "casts"), manifest[1]).then((version) => {
          try {
            serveFile(res, file, "revalidate", version);
          } catch (err) {
            console.log(`[serve] manifest failed ${file}:`, err);
            if (!res.headersSent) res.writeHead(500).end();
          }
        });
        return;
      }
      serveFile(res, file, "revalidate");
      return;
    }
    res.writeHead(404).end("not found");
    return;
  }

  if (pathname.startsWith("/assets/") && existsSync(join(CLIENT_DIST, pathname.slice(1)))) {
    serveFile(res, join(CLIENT_DIST, normalize(pathname).replace(/^[/\\]+/, "")), "immutable");
    return;
  }

  if (pathname === "/play") {
    const user = currentUser(req);
    if (!user) {
      redirect(res, `/?next=${encodeURIComponent(pathname + url.search)}`);
      return;
    }
    const banned = banPage(user);
    if (banned) {
      send(res, 403, banned, "text/html; charset=utf-8");
      return;
    }
    guard(
      "play",
      async () => {
        const ticket = await issueTicketFor(user, GAME_SERVER);
        logFetch(req, "/play", `user=${user.username} id=${user.id}`);

        /**
         * ⚠ `/play` is the TypeScript client now, not the WASM player.
         *
         * The LibreShockwave player stays at `/player/` as the reference to
         * compare against, and the real Shockwave plugin page stays at
         * `/client`. Falling back to the WASM player when the bundle is missing
         * would silently hide a broken build behind a working-looking page, so
         * an unbuilt client says so instead.
         */
        const page = join(CLIENT_DIST, "client.html");
        if (!existsSync(page)) {
          res.writeHead(503, { "Content-Type": "text/plain" });
          res.end(
            "client not built.\n\n  npx vite build --config client/vite.config.ts\n\n" +
              "The Shockwave plugin page is at /client and the WASM player at /player/.",
          );
          return;
        }
        // `?perf` profiling: Chrome's in-page sampling profiler (`new Profiler`)
        // only exists on a document served with this policy. See `vmkPerf`.
        if (url.searchParams.has("perf")) res.setHeader("Document-Policy", "js-profiling");
        // The game socket's PUBLIC address (public-url.ts). The client prefers
        // this over the config's host/port, which cannot carry a scheme or path
        // — `wss://vmk.example.com/game` behind a proxy is unreachable from them.
        const { gameUrl } = publicUrls(req);
        // ⚠ PREPENDED, not spliced into <head>: the built page has no <head>
        // tag, so a replace would silently inject nothing. A classic script
        // runs before the page's module scripts wherever it sits.
        const html =
          `<script>window.__VMK_GAME_URL = ${JSON.stringify(gameUrl).replace(/</g, "\\u003c")};</script>\n` +
          readFileSync(page, "utf8");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
        res.end(html);
      },
      res,
    );
    return;
  }

  // Dev-only: hand the debug player a REAL session + ticket, so it exercises the
  // same code path as a human logging in instead of being a second auth route.
  if (pathname === "/dev/session" && req.method === "POST") {
    if (!DEV_MODE) {
      res.writeHead(404).end("not found");
      return;
    }
    guard(
      "dev-session",
      async () => {
        const outcome = authenticate(DEV_USERNAME, DEV_PASSWORD);
        if (!outcome) {
          res.writeHead(500).end("dev account password mismatch; delete data/vmk.db to reset");
          return;
        }
        setSessionCookie(res, outcome.token);
        const ticket = await issueTicketFor(outcome.user, GAME_SERVER);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ ticket, username: outcome.user.username, userId: outcome.user.id }),
        );
      },
      res,
    );
    return;
  }

  if (pathname === "/client" || pathname === "/client.php") {
    // PlayerVersion is OMITTED by default. client.php asked for "10" because
    // The archived build served Director 10-era content, but that routes through
    // DynaPlayer.dll, which fetches missing legacy runtimes from Adobe -- and
    // those servers are gone. Only "Shockwave 12" is installed here, so asking
    // for 10 has nothing to resolve to. `?playerversion=10` restores it.
    // Same session requirement as /play -- /client is the archive's original
    // path and stays working, but it is no longer a way around logging in.
    //
    // ⚠ Send the destination along. Without it the login page always finished at
    // /play, so anyone who asked for the REAL Shockwave plugin was silently
    // handed the LibreShockwave WASM player instead -- the two look similar
    // enough at a glance that it reads as "the plugin route is broken".
    const clientUser = currentUser(req);
    if (!clientUser) {
      redirect(res, `/?next=${encodeURIComponent(pathname + url.search)}`);
      return;
    }
    const banned = banPage(clientUser);
    if (banned) {
      send(res, 403, banned, "text/html; charset=utf-8");
      return;
    }
    guard(
      "client",
      async () => {
        const ticket = await issueTicketFor(clientUser, GAME_SERVER);
        await handleClientEmbed(
          req,
          res,
          url.searchParams.get("activex") === "1",
          url.searchParams.get("movie") ?? "framework_disney",
          url.searchParams.get("playerversion") ?? "",
          ticket,
          url.searchParams.get("debug") === "1",
        );
      },
      res,
    );
    return;
  }
  if (pathname === "/shims/loading-screen.json") {
    if (existsSync(LOADING_SCREEN)) {
      serveFile(res, LOADING_SCREEN);
      return;
    }
  }

  if (pathname.startsWith("/shims/download/")) {
    logFetch(req, pathname, "download CDN shim");
    handleDownloadShim(pathname, res);
    return;
  }

  // Dead-host emulation, not a client-routing hack: the client asks for
  // http://beta.<old host>/homepage/download/<file>, the worker's fetch rewrite
  // maps the dead hosts onto this origin keeping the path, and that host
  // really did serve these files at that path. The archive keeps its mirror of
  // them under siteref/, so map the one onto the other. Covers the loading
  // screen art (image_<n>_0.jpg) and anything else served from that directory.
  if (pathname.startsWith("/homepage/download/")) {
    if (tryServeArchive(req, res, `/siteref${pathname}`)) return;

    /**
     * ⚠ THE BILLBOARD ART SURVIVED THE RECOVERY UNDER OTHER NAMES.
     *
     * Room billboards are authored in `external_texts` as absolute URLs on the
     * dead host, and `CBillBoardManager.InitBillBoard` queues `#content`
     * verbatim:
     *
     *   room.96.board.1 = [ "Gallery_1": [#content:
     *     "http://www2.virtualmagickingdom.com/homepage/download/image_89_0.jpg" …
     *
     * The exact-name lookup above misses, the download fails, and the board is
     * blank with only `Download error: BillBoardExternal:N Unknown error!` to
     * show for it. But the files ARE here — re-encoded and, in one case, with
     * the two numbers transposed:
     *
     *   wanted image_89_0.jpg  ->  on disk as image_0_89.jpg
     *   wanted image_91_0.jpg  ->  on disk as image_91_0.png
     *   wanted image_92_0.jpg  ->  on disk as image_92_0.png
     *
     * So this is a recovery-naming gap, not a client bug, and matching the file
     * the archive actually holds is the honest fix. Scoped deliberately: only
     * `image_<a>_<b>.<ext>` in this one directory, only after the exact path has
     * already failed, and only across the extensions the archive uses. Anything
     * genuinely absent (image_90, and Sci-Fi's 93-97) still 404s rather than
     * being papered over with the wrong picture.
     */
    const image = /^\/homepage\/download\/(image)_(\d+)_(\d+)\.(jpg|jpeg|png|gif)$/i
      .exec(pathname);
    if (image) {
      const [, stem, first, second] = image;
      const extensions = ["jpg", "png", "jpeg", "gif"];
      const names: string[] = [];
      for (const ext of extensions) names.push(`${stem}_${first}_${second}.${ext}`);
      // The transposed spelling, e.g. image_89_0 -> image_0_89.
      for (const ext of extensions) names.push(`${stem}_${second}_${first}.${ext}`);
      for (const name of names) {
        if (tryServeArchive(req, res, `/siteref/homepage/download/${name}`)) return;
      }
    }
  }

  // OpenVMK-era PHP stubs — log and return empty JSON for now
  if (pathname.endsWith(".php")) {
    logFetch(req, pathname, "php stub — add handler in serve-shockwave.ts");
    send(res, 200, "{}", "application/json; charset=utf-8");
    return;
  }

  // Furniture maps on a SHORT path: /fm/1, /fm/2, ...
  //
  // ⚠ The length of this URL is load-bearing. `CRoomFurnitureMap._LoadMapFile`
  // uses the URL ITSELF as the Director member name
  // (`t_sMember = t_sFile`), queues the download under it, and
  // `_FileLoadCallback` then looks that name up again:
  //
  //     if m_ar_sMapFileName.getPos(a_sMember) > 0 then … else exit
  //
  // If the name comes back even slightly different — Director member names are
  // length-limited and dislike `/` and `.` — the callback bails, the pending
  // list never empties, and `m_bReady` is never set. Every `GetByTypeCode` then
  // returns the NULL descriptor, so items place with no CASTS and no art is
  // ever requested. That is the failure we are chasing: the furnimap is fetched
  // over and over and no `hof_furni/*.cct` is ever asked for.
  {
    const fm = /^\/fm\/(\d+)$/.exec(pathname);
    if (fm) {
      const file = furnimapFile(Number(fm[1]));
      // ⚠ This route did NOT log, and that hid the most important fact about a
      // furniture spinner: WHICH PAGES the client actually took.
      //
      // `_LoadMapFile` walks `furnituremap_url.1`, `.2`, … until one is missing
      // and MERGES them, so a page the client never fetched is a set of type
      // codes `GetByTypeCode` answers with VOID. `LoadCastLibsForType` then does
      // `t_rStruct.param["CASTS"]` on that void — its only guard covers CASTS
      // being empty, never the struct being absent — and the resulting "Object
      // expected" kills the load loop. No further cast is ever requested and
      // `CRoomFurniSetLoader.update` polls forever.
      //
      // The 404 on the terminating page is EXPECTED: it is how the client knows
      // to stop, so it is logged as the end of the walk rather than as a fault.
      if (file) {
        logFetch(req, pathname, `furnimap page ${fm[1]} -> ${file.replace(SHOCKWAVE, "")}`);
        return serveArchiveFile(req, res, file, pathname);
      }
      logFetch(req, pathname, `furnimap page ${fm[1]} absent — client stops walking here`);
      res.writeHead(404).end("no such furnimap");
      return;
    }
  }

  if (/external_variables/i.test(pathname)) {
    const file = resolveExternalVarsOverride();
    if (file) {
      // Every URL and the game socket's host/port, pointed at THIS server's
      // public address rather than the 127.0.0.1 the file was written for.
      let body = withPublicUrls(applySeasonToVariables(readFileSync(file, "latin1")), publicUrls(req));

      // Give the client THIS player's credentials.
      //
      // The client's SendLogin transmits [name, password, machineId] and no
      // ticket, so the socket has nothing else to identify the account by. It
      // reads both from external variables, which is how the shipped config
      // auto-logged in as the hardcoded devuser/devpass.
      //
      // So the ticket travels as the PASSWORD: it is single-use, short-lived,
      // and already bound server-side to the user who signed in. The MUS server
      // then verifies "this username plus this unexpired ticket" instead of
      // trusting a name anyone could type.
      // The session cookie is the primary proof, and `?t=` is accepted as an
      // alternative because the movie does not always fetch this file at the
      // URL we hand it in sw5 -- VMK resolves it against the movie base, which
      // drops the query string. Requiring the query would therefore make the
      // WASM player unable to log in at all while /client worked, which is
      // exactly the asymmetry this replaced.
      const varsUser = currentUser(req);
      const varsTicket = url.searchParams.get("t");
      const ticketUser = varsTicket ? getUserByTicket(varsTicket) : undefined;
      // Same account either way, so the two agree by construction; when only the
      // cookie is present, mint the ticket here. It is short-lived and one-shot,
      // so issuing one per variables fetch costs nothing.
      // A cookie and a ticket naming DIFFERENT accounts is the one case with no
      // safe answer -- serve it stripped. Otherwise accept whichever proof
      // arrived: the cookie when the request carries one, the ticket when it
      // does not.
      //
      // ⚠ Requiring `varsUser` made the `?t=` half above dead code, and the
      // symptom is the silent one this whole branch is written to avoid. A
      // client that is not the browser holding the session cookie -- DirPlayer
      // is served from :3000, so its fetch to this origin is cross-origin and
      // carries no cookie -- had credentials stripped on every request while
      // holding a perfectly good registered ticket, then stalled after
      // `2002 _Hello` without ever sending CMD.LOGIN.
      const account =
        varsUser && ticketUser && ticketUser.id !== varsUser.id
          ? undefined
          : (varsUser ?? ticketUser);
      if (account) {
        const ticket = ticketUser?.id === account.id ? varsTicket! : createTicket(account.id);
        body = withLoginCredentials(body, account.username, ticket);
        logFetch(req, pathname, `external vars -> ${file} (credentials for ${account.username})`);
      } else {
        // No session: serve the file as-is. Anything that reaches the socket
        // with these will be refused at login, which is the correct outcome.
        //
        // Report BOTH halves, always. A stripped response makes the client stall
        // silently after `2002 _Hello` -- it never sends CMD.LOGIN, so there is
        // no "refused" line on the MUS side either, and with several clients
        // sharing this server the log is the only way to tell whose request is
        // whose.
        const why =
          `session=${varsUser ? varsUser.username : "none"} ` +
          `t=${varsTicket ? `${varsTicket.slice(0, 8)}…` : "none"}`;
        body = stripLoginCredentials(body);
        logFetch(req, pathname, `external vars -> ${file} (${why} — credentials stripped)`);
      }
      send(res, 200, Buffer.from(body, "latin1"), "text/plain; charset=utf-8");
      return;
    }
  }

  // Common OpenVMK external text URLs — prefer ref/ copy when present
  if (/external_texts\.txt$/i.test(pathname) || pathname === "/external/texts") {
    handleExternalTexts(req, res);
    return;
  }

  if (pathname.startsWith("/ref/")) {
    const file = safePath(REF, pathname.slice("/ref/".length));
    if (file && isFile(file)) {
      serveFile(res, file);
      return;
    }
  }

  if ((pathname.startsWith("/player/") || pathname === "/player") && !HAVE_WASM_PLAYER) {
    send(res, 404, "The LibreShockwave reference player is not installed. The game is at /play.");
    return;
  }
  if (pathname.startsWith("/player/") || pathname === "/player") {
    const rel = pathname === "/player" ? "/vmk-player.html" : pathname.slice("/player".length);
    if (rel === "/vmk-player.html" || rel === "/") {
      serveFile(res, VMK_PLAYER);
      return;
    }
    const file = safePath(WASM_DIST, rel);
    if (file && isFile(file)) {
      serveFile(res, file);
      return;
    }
  }

  if (pathname.startsWith("/shockwave/")) {
    // Route through resolveArchiveFile so the overlay (recovered UI casts) and
    // the core-cast override apply here too, not just to site-relative paths.
    const file = resolveArchiveFile(pathname.slice("/shockwave".length));
    if (file) {
      logFetch(req, pathname, `archive -> ${file.replace(SHOCKWAVE, "").replace(ROOT, "")}`);
      serveArchiveFile(req, res, file, pathname);
      return;
    }
  }

  // Client resolves casts relative to site.url (e.g. /vmk_core/core.cct, /vmk/vmk_core/...)
  if (tryServeArchive(req, res, pathname)) {
    return;
  }

  logFetch(req, pathname, "unhandled");
  send(res, 404, `No route for ${pathname}\nTry http://127.0.0.1:${PORT}/player/vmk-player.html`);
}

// The LibreShockwave player at /player/ is a dev reference, not the game: a
// release ships without it. It used to be required here, so a release's web
// server exited at startup and the game never came up.
const HAVE_WASM_PLAYER = existsSync(WASM_DIST) && existsSync(VMK_PLAYER);
if (!HAVE_WASM_PLAYER) {
  console.log(`LibreShockwave player not installed (${WASM_DIST}); /player/ is off. The game at /play does not need it.`);
}

pruneExpired();

// VMK_HOST=0.0.0.0 to accept other machines (Docker sets it); see mus-server.ts.
const BIND_HOST = process.env.VMK_HOST ?? "127.0.0.1";
/**
 * `VMK_SIM_LATENCY_MS=N` delays every response by N ms, as a stand-in for a
 * remote deployment. Locally the round trip is ~0, so a serial request chain
 * costs nothing here and the load-time problems players see do not reproduce.
 * Measure loading with this set (80-150 is a realistic WAN round trip).
 */
const SIM_LATENCY_MS = Number(process.env.VMK_SIM_LATENCY_MS ?? 0);
const handler = SIM_LATENCY_MS > 0
  ? (req: IncomingMessage, res: ServerResponse) => void setTimeout(() => route(req, res), SIM_LATENCY_MS)
  : route;
createServer(handler).listen(PORT, BIND_HOST, () => {
  if (SIM_LATENCY_MS > 0) console.log(`  ⚠ Simulated latency: ${SIM_LATENCY_MS} ms per request (VMK_SIM_LATENCY_MS)`);
  console.log(`VMK private server  http://${BIND_HOST}:${PORT}`);
  console.log(`  Proxies:  X-Forwarded-For trusted from ${trustedProxies()} (VMK_TRUSTED_PROXIES)`);
  // /hk's avatar and item-icon index reads every cast manifest; build it now,
  // in the background, instead of on the first profile view (see warmIcons).
  void warmHk();
  console.log(`  Login:    http://127.0.0.1:${PORT}/            <- start here`);
  console.log(`  Play:     http://127.0.0.1:${PORT}/play        (session required)`);
  console.log(`  Database: ${databasePath()}`);
  console.log(`  Dev mode: ${DEV_MODE ? "ON (VMK_DEV=1) — /player and /dev/* enabled" : "off"}`);
  console.log(`  Player:   http://127.0.0.1:${PORT}/player/vmk-player.html`);
  console.log(`  Plugin:   http://127.0.0.1:${PORT}/client  (real Shockwave <embed>)`);
  console.log(`  Loading:  ${LOADING_URL}${LOADING_STATIC ? ` (static ${LOADING_STATIC})` : " (GetSec proxy)"}`);
  console.log(`  Config:   http://127.0.0.1:${PORT}/vmk/config.json`);
  console.log(`  Archive:  ${SHOCKWAVE}`);
  console.log(`  Core:     ${resolveCoreCastOverride() ?? "vmk_core/core.cct (archive default)"}`);
  console.log(`  Vars:     ${resolveExternalVarsOverride() ?? "(none — external.variables.txt unset)"}`);
  const patchDir = resolvePatchDir();
  if (patchDir) {
    const patched: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) walk(full);
        else patched.push(full.slice(patchDir.length + 1).replace(/\\/g, "/"));
      }
    };
    try {
      walk(patchDir);
    } catch {
      /* nothing to list */
    }
    console.log(`  Patches:  ${patchDir}${patched.length ? "" : "  (empty)"}`);
    for (const p of patched) console.log(`              ⚑ ${p}`);
  } else {
    console.log(`  Patches:  (none — VMK_PATCH_DIR unset or missing)`);
  }
  console.log(`  Ref:      ${REF}`);
  console.log(`  Game Srv: ${GAME_SERVER} (GetSec proxy for loading.php/sec.php)`);
  console.log(`  Debugger: tools/shockwave/debugger/win/windows-x86_64/libreshockwave_debugger.exe`);
});


