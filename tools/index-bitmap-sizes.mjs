/**
 * Writes the `bitmaps.tsv` size index each extracted cast needs.
 *
 * WHY THIS EXISTS
 *
 * `manifest.tsv` does not record bitmap dimensions, and the browser cannot learn
 * them without decoding the PNG — but `the image of member` is a SYNCHRONOUS
 * read in Director and VMK sizes things from it exactly once. So the client
 * reads `<cast>/bitmaps.tsv` to answer `.image.width` the moment a member is
 * touched, long before the art itself is fetched.
 *
 * ⚠ A CAST WITHOUT THIS FILE RENDERS AS 1x1. `parseCastManifest` leaves the
 * member's rect at 0x0, and the image getter clamps with `Math.max(w, 1)`, so
 * every bitmap in that cast becomes a one-pixel dot. It does not error and it
 * does not look like a missing file — the member exists, the PNG exists, the
 * draw happens, and the result is invisible.
 *
 * MEASURED: 4,003 of 4,322 extracted casts had PNGs and no index. That is why
 * the registration avatar rendered its body (`gfx_avatar_bodyparts` HAS an
 * index, 834 rows) but none of its clothing — `std_ch_105_3_0` and every other
 * garment came back as a 1x1 image while the body parts were correctly sized.
 *
 *   node tools/index-bitmap-sizes.mjs           # every cast missing an index
 *   node tools/index-bitmap-sizes.mjs --force   # rewrite them all
 *   node tools/index-bitmap-sizes.mjs vmk_avatar_ch   # matching casts only
 *
 * Dimensions come from the PNG IHDR — 24 bytes per file, no decoding — so a
 * full pass over ~4,800 PNGs is seconds rather than minutes.
 */
import { closeSync, existsSync, openSync, readdirSync, readFileSync, readSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const DEST = resolve("client/assets/casts");

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

if (!existsSync(DEST)) {
  console.error(`no extracted casts at ${DEST} — run tools/extract-casts.mjs first`);
  process.exit(1);
}

/**
 * Width and height straight out of the PNG header.
 *
 * A PNG is an 8-byte signature, then the IHDR chunk: 4-byte length, 4-byte type,
 * then width and height as big-endian uint32 at offsets 16 and 20. Anything that
 * does not start with the signature is not a PNG and is skipped rather than
 * guessed at — a wrong size is worse than no row, because the client would lay
 * out confidently against it.
 */
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function pngSize(file) {
  let fd;
  try {
    fd = openSync(file, "r");
    const head = Buffer.alloc(24);
    const read = readSync(fd, head, 0, 24, 0);
    if (read < 24) return null;
    if (!head.subarray(0, 8).equals(PNG_SIGNATURE)) return null;
    if (head.subarray(12, 16).toString("latin1") !== "IHDR") return null;
    const width = head.readUInt32BE(16);
    const height = head.readUInt32BE(20);
    if (width === 0 || height === 0) return null;
    return { width, height };
  } catch {
    return null;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
}

const casts = readdirSync(DEST, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => only.length === 0 || only.some((match) => name.includes(match)));

let written = 0;
let skipped = 0;
let empty = 0;
let unreadable = 0;
const started = Date.now();

for (const cast of casts) {
  const dir = join(DEST, cast);
  const indexPath = join(dir, "bitmaps.tsv");

  const bitmapDir = join(dir, "bitmaps");
  let files;
  try {
    files = readdirSync(bitmapDir).filter((name) => name.toLowerCase().endsWith(".png"));
  } catch {
    // No bitmaps directory at all — nothing to index, and no file is written so
    // the cast is not made to look indexed when it is not.
    empty++;
    continue;
  }
  if (!force && existsSync(indexPath)) {
    const rows = readFileSync(indexPath, "utf8").split(/\r?\n/).filter((line) => line.trim() !== "").length - 1;
    if (rows === files.length) {
      skipped++;
      continue;
    }
  }
  if (files.length === 0) {
    empty++;
    continue;
  }

  const rows = ["asset_path\twidth\theight"];
  let bad = 0;
  for (const name of files.sort()) {
    const size = pngSize(join(bitmapDir, name));
    if (!size) {
      bad++;
      continue;
    }
    // Paths are cast-RELATIVE and must match `manifest.tsv`'s `asset_path`
    // exactly, forward slashes included — the client looks the size up by that
    // string, so a backslash here silently misses on every row.
    rows.push(`bitmaps/${name}\t${String(size.width)}\t${String(size.height)}`);
  }
  unreadable += bad;

  writeFileSync(indexPath, `${rows.join("\n")}\n`, "latin1");
  written++;
  if (bad > 0) console.log(`${cast}: ${String(rows.length - 1)} indexed, ${String(bad)} unreadable`);
}

console.log("");
console.log(`indexed ${written} cast(s), skipped ${skipped} already indexed, ${empty} with no bitmaps`);
if (unreadable > 0) console.log(`${unreadable} file(s) were not readable PNGs and were left out`);
console.log(`took ${((Date.now() - started) / 1000).toFixed(1)}s`);
