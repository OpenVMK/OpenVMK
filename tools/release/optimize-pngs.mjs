/**
 * Losslessly shrink every extracted PNG under a directory, IN PLACE.
 *
 *   node tools/release/optimize-pngs.mjs <dir>
 *
 * ⚠ RUN ON A RELEASE COPY, NEVER ON client/assets. The extractor writes its
 * PNGs uncompressed (stored deflate blocks, filter 0): a 762x533 navigator map
 * is 1.9 MB, which is its raw RGBA. That is fine for the working tree and for
 * diffing extractions, and ruinous over a WAN, where the first boot alone pulled
 * 33 MB of PNGs (MEASURED, 100 ms simulated RTT). So the repo keeps them as
 * extracted and make-release.mjs shrinks its own copy.
 *
 * What changes: the scanline filter bytes (re-chosen per row, the usual
 * minimum-sum-of-absolute-differences heuristic) and the deflate stream (zlib
 * level 9), merged into one IDAT. What does not: IHDR, every ancillary chunk and
 * their order, and the decoded pixels. Each result is decoded again and compared
 * byte for byte against the original's unfiltered scanlines; on any mismatch,
 * or if the result is not smaller, the original file is left untouched.
 *
 * Interlaced or sub-byte/16-bit images keep their filter bytes and are only
 * re-deflated (the comparison still runs).
 */
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";
import { availableParallelism } from "node:os";
import { readdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync, inflateSync, crc32 } from "node:zlib";

const SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const CHANNELS = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };

function readChunks(buf) {
  if (buf.length < 8 || !buf.subarray(0, 8).equals(SIGNATURE)) return null;
  const chunks = [];
  let pos = 8;
  while (pos + 12 <= buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString("latin1", pos + 4, pos + 8);
    if (pos + 12 + length > buf.length) return null;
    chunks.push({ type, data: buf.subarray(pos + 8, pos + 8 + length) });
    pos += 12 + length;
    if (type === "IEND") break;
  }
  return chunks.at(-1)?.type === "IEND" ? chunks : null;
}

function chunk(type, data) {
  const head = Buffer.alloc(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, "latin1");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])) >>> 0, 0);
  return Buffer.concat([head, data, crc]);
}

const paeth = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
};

/** Filtered scanlines -> raw scanlines (filter bytes dropped). */
function unfilter(data, height, stride, bpp) {
  const out = Buffer.alloc(height * stride);
  let read = 0;
  for (let y = 0; y < height; y++) {
    const filter = data[read++];
    const row = y * stride;
    const up = row - stride;
    for (let i = 0; i < stride; i++) {
      const x = data[read++];
      const a = i >= bpp ? out[row + i - bpp] : 0;
      const b = y > 0 ? out[up + i] : 0;
      const c = y > 0 && i >= bpp ? out[up + i - bpp] : 0;
      let v;
      switch (filter) {
        case 0: v = x; break;
        case 1: v = x + a; break;
        case 2: v = x + b; break;
        case 3: v = x + ((a + b) >> 1); break;
        case 4: v = x + paeth(a, b, c); break;
        default: throw new Error(`bad filter ${filter}`);
      }
      out[row + i] = v & 0xff;
    }
  }
  return out;
}

/** Raw scanlines -> filtered, choosing each row's filter by minimum sum of |signed byte|. */
function refilter(raw, height, stride, bpp) {
  const out = Buffer.alloc(height * (stride + 1));
  const cand = Array.from({ length: 5 }, () => Buffer.alloc(stride));
  for (let y = 0; y < height; y++) {
    const row = y * stride;
    const up = row - stride;
    let best = 0, bestScore = Infinity;
    for (let f = 0; f < 5; f++) {
      const line = cand[f];
      let score = 0;
      for (let i = 0; i < stride; i++) {
        const x = raw[row + i];
        const a = i >= bpp ? raw[row + i - bpp] : 0;
        const b = y > 0 ? raw[up + i] : 0;
        const c = y > 0 && i >= bpp ? raw[up + i - bpp] : 0;
        const v = (f === 0 ? x : f === 1 ? x - a : f === 2 ? x - b : f === 3 ? x - ((a + b) >> 1) : x - paeth(a, b, c)) & 0xff;
        line[i] = v;
        score += v < 128 ? v : 256 - v;
      }
      if (score < bestScore) { bestScore = score; best = f; }
    }
    out[y * (stride + 1)] = best;
    cand[best].copy(out, y * (stride + 1) + 1);
  }
  return out;
}

/** Returns the optimised file, or null to keep the original. */
export function optimizePng(buf) {
  const chunks = readChunks(buf);
  if (!chunks || chunks[0].type !== "IHDR") return null;
  const ihdr = chunks[0].data;
  const width = ihdr.readUInt32BE(0);
  const height = ihdr.readUInt32BE(4);
  const depth = ihdr[8], colour = ihdr[9], interlace = ihdr[12];
  const channels = CHANNELS[colour];
  if (!channels || width === 0 || height === 0) return null;

  const firstIdat = chunks.findIndex((c) => c.type === "IDAT");
  if (firstIdat < 0) return null;
  const idat = Buffer.concat(chunks.filter((c) => c.type === "IDAT").map((c) => c.data));
  let filtered;
  try { filtered = inflateSync(idat); } catch { return null; }

  const simple = interlace === 0 && depth === 8;
  const stride = Math.ceil((width * channels * depth) / 8);
  const bpp = Math.max(1, (channels * depth) >> 3);
  let payload;
  let reference;
  if (simple) {
    if (filtered.length < height * (stride + 1)) return null;
    reference = unfilter(filtered, height, stride, bpp);
    payload = deflateSync(refilter(reference, height, stride, bpp), { level: 9, memLevel: 9 });
  } else {
    reference = filtered;
    payload = deflateSync(filtered, { level: 9, memLevel: 9 });
  }

  // The proof: decode what we are about to write and compare pixels.
  const back = inflateSync(payload);
  const check = simple ? unfilter(back, height, stride, bpp) : back;
  if (!check.equals(reference)) throw new Error("round-trip mismatch");

  const parts = [SIGNATURE];
  let idatWritten = false;
  for (const c of chunks) {
    if (c.type === "IDAT") {
      if (!idatWritten) { parts.push(chunk("IDAT", payload)); idatWritten = true; }
      continue;
    }
    parts.push(chunk(c.type, c.data));
  }
  const out = Buffer.concat(parts);
  return out.length < buf.length ? out : null;
}

if (!isMainThread) {
  const result = { files: 0, shrunk: 0, before: 0, after: 0, failed: [] };
  for (const file of workerData.files) {
    result.files++;
    let buf;
    try { buf = readFileSync(file); } catch (e) { result.failed.push(`${file}: ${e.message}`); continue; }
    result.before += buf.length;
    let out = null;
    try { out = optimizePng(buf); } catch (e) { result.failed.push(`${file}: ${e.message}`); }
    if (out) {
      // Write beside, then rename: an interrupted run never leaves a torn PNG.
      writeFileSync(`${file}.tmp`, out);
      renameSync(`${file}.tmp`, file);
      result.shrunk++;
      result.after += out.length;
    } else {
      result.after += buf.length;
    }
  }
  parentPort.postMessage(result);
} else if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.argv[2];
  if (!root) {
    console.error("usage: node tools/release/optimize-pngs.mjs <dir>   (a RELEASE copy, never client/assets)");
    process.exit(1);
  }
  const dir = resolve(root);
  const repoAssets = resolve(fileURLToPath(new URL("../../client/assets", import.meta.url)));
  if (dir === repoAssets || dir.startsWith(repoAssets + "\\") || dir.startsWith(repoAssets + "/")) {
    console.error(`refusing to rewrite the working tree's assets (${dir}); the repo keeps PNGs as extracted.`);
    process.exit(1);
  }

  const files = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.toLowerCase().endsWith(".png")) files.push(p);
    }
  };
  walk(dir);

  const started = Date.now();
  const workers = Math.max(1, availableParallelism() - 1);
  const slices = Array.from({ length: workers }, (_, i) => files.filter((_, j) => j % workers === i));
  const results = await Promise.all(
    slices.map((slice) => new Promise((ok, fail) => {
      const w = new Worker(fileURLToPath(import.meta.url), { workerData: { files: slice } });
      w.once("message", ok);
      w.once("error", fail);
    })),
  );
  const total = results.reduce((a, r) => ({
    files: a.files + r.files, shrunk: a.shrunk + r.shrunk, before: a.before + r.before, after: a.after + r.after,
    failed: a.failed.concat(r.failed),
  }), { files: 0, shrunk: 0, before: 0, after: 0, failed: [] });
  const mb = (n) => (n / 1048576).toFixed(0);
  console.log(
    `  ${total.files.toLocaleString()} PNGs, ${total.shrunk.toLocaleString()} shrunk: ` +
      `${mb(total.before)} MB -> ${mb(total.after)} MB in ${((Date.now() - started) / 1000).toFixed(0)}s`,
  );
  for (const f of total.failed.slice(0, 20)) console.log(`  kept original: ${f}`);
  if (total.failed.length > 20) console.log(`  ... and ${total.failed.length - 20} more kept`);
}
