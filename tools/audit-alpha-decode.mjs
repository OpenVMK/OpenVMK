/**
 * Verifies the EXTRACTED art against the SOURCE data: for every member that has
 * a raw `ALFA` chunk on disk, decompress that chunk independently and compare it
 * to the alpha channel of the PNG the extractor produced.
 *
 * WHY THIS EXISTS
 *
 * The avatar's mouth (`std_fc_1_3_0`) extracted as near-white pixels at alpha 48
 * and looked invisible on the face, which read as a decode bug. It was not — the
 * source art really is a faint template that VMK multiplies with the skin colour
 * (ink 41), and the mouth is a 4-pixel mark. The wrong diagnosis came from a
 * heuristic ("one alpha value dominates") that ALSO flags a solid head, because
 * a big opaque region is exactly one alpha value repeated.
 *
 * ⚠ SO DO NOT JUDGE ART BY ITS HISTOGRAM. Faint art and mis-decoded art look
 * identical in a histogram. The only sound test is against the source bytes:
 * decode `ALFA` here and check the PNG matches. A mismatch is a real bug; a
 * surprising-looking histogram is not.
 *
 *   node tools/audit-alpha-decode.mjs            # every cast with raw chunks
 *   node tools/audit-alpha-decode.mjs asd        # one cast
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { inflateSync } from "node:zlib";
import { join, resolve } from "node:path";

const CASTS = resolve("client/assets/casts");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));

/** Director's PackBits, matching `BitmapDecoder::decompressRLE`. */
function decompressRLE(compressed, expectedSize) {
  if (expectedSize <= 0) return new Uint8Array(0);
  const result = new Uint8Array(expectedSize);
  let pos = 0;
  let outPos = 0;
  while (pos < compressed.length && outPos < result.length) {
    const control = compressed[pos++] & 0xff;
    if (control < 0x80) {
      const count = control + 1;
      for (let i = 0; i < count && pos < compressed.length && outPos < result.length; i++) {
        result[outPos++] = compressed[pos++];
      }
    } else if (control === 0x80) {
      continue;
    } else {
      const count = 257 - control;
      if (pos < compressed.length) {
        const value = compressed[pos++];
        for (let i = 0; i < count && outPos < result.length; i++) result[outPos++] = value;
      }
    }
  }
  return outPos < result.length ? result.subarray(0, outPos) : result;
}

/** `BitmapDecoder::calculateScanWidth` — 8-bit rows pad to a 2-byte boundary. */
const scanWidth8 = (width) => Math.floor((width * 8 + 15) / 16) * 2;

/** Minimal PNG reader: returns {width,height,alpha} for 8-bit RGBA/greyscale-alpha. */
function readPngAlpha(file) {
  const buf = readFileSync(file);
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colourType = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colourType = data[9];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    pos += 12 + len;
  }
  // Only the layouts the extractor emits; anything else is reported, not guessed.
  const channels = colourType === 6 ? 4 : colourType === 4 ? 2 : 0;
  if (channels === 0 || bitDepth !== 8) return { width, height, alpha: null, colourType, bitDepth };

  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = new Uint8Array(width * height);
  const line = new Uint8Array(stride);
  const prev = new Uint8Array(stride);
  let rp = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[rp++];
    for (let i = 0; i < stride; i++) {
      const x = raw[rp + i];
      const a = i >= channels ? line[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      let v;
      if (filter === 0) v = x;
      else if (filter === 1) v = x + a;
      else if (filter === 2) v = x + b;
      else if (filter === 3) v = x + ((a + b) >> 1);
      else {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
      }
      line[i] = v & 0xff;
    }
    rp += stride;
    for (let x = 0; x < width; x++) out[y * width + x] = line[x * channels + (channels - 1)];
    prev.set(line);
  }
  return { width, height, alpha: out, colourType, bitDepth };
}

const castDirs = readdirSync(CASTS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && (only.length === 0 || only.includes(d.name)))
  .map((d) => d.name);

let checked = 0, matched = 0, skipped = 0;
const mismatches = [];

for (const cast of castDirs) {
  const dir = join(CASTS, cast);
  const rawDir = join(dir, "raw_chunks");
  const tsv = join(dir, "bitmaps.tsv");
  if (!existsSync(rawDir) || !existsSync(tsv)) continue;

  const sizes = new Map();
  for (const line of readFileSync(tsv, "utf8").split(/\r?\n/).slice(1)) {
    const [path, w, h] = line.split("\t");
    if (path) sizes.set(path.replace(/^bitmaps\//, "").replace(/\.png$/, ""), [Number(w), Number(h)]);
  }

  const rawFiles = readdirSync(rawDir);
  const hasBitd = new Set(
    rawFiles.filter((f) => f.endsWith("_BITD.bin")).map((f) => f.replace(/_\d+_BITD\.bin$/, "")),
  );

  for (const file of rawFiles) {
    if (!file.endsWith("_ALFA.bin")) continue;
    const stem = file.replace(/_\d+_ALFA\.bin$/, "");
    const size = sizes.get(stem);
    if (!size) { skipped++; continue; }
    const png = join(dir, "bitmaps", `${stem}.png`);
    if (!existsSync(png)) { skipped++; continue; }

    /**
     * ⚠ ONLY THE `ediM` PATH CAN BE CHECKED THIS WAY.
     *
     * `DirectorFile::decodeBitmap` uses the ALFA chunk as the alpha channel only
     * when the member has NO `BITD`. A member that has one goes down the palette
     * decoder instead and takes its alpha from the bitmap data, so its PNG has no
     * reason to match the chunk — `std_ey_1_1_0` decodes its ALFA to all-255
     * while the PNG carries real per-pixel alpha. Comparing those flagged 476
     * members as "mismatches" was the audit being wrong, not the extractor.
     */
    if (hasBitd.has(stem)) { skipped++; continue; }

    const [width, height] = size;
    const decoded = readPngAlpha(png);
    if (!decoded || !decoded.alpha || decoded.width !== width || decoded.height !== height) { skipped++; continue; }

    const sw = scanWidth8(width);
    const expect = decompressRLE(readFileSync(join(rawDir, file)), sw * height);
    if (expect.length < sw * height) { skipped++; continue; }

    let diff = 0, worst = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const d = Math.abs(expect[y * sw + x] - decoded.alpha[y * width + x]);
        if (d > 0) { diff++; if (d > worst) worst = d; }
      }
    }
    checked++;
    if (diff === 0) matched++;
    else mismatches.push({ cast, member: stem, size: `${width}x${height}`, diff, total: width * height, worst });
  }
}

mismatches.sort((a, b) => b.diff / b.total - a.diff / a.total);
console.log(`\nALFA decode audit — compared extracted PNG alpha against the source chunk`);
console.log(`  casts scanned : ${castDirs.length}`);
console.log(`  members checked: ${checked}`);
console.log(`  exact match   : ${matched}`);
console.log(`  MISMATCHED    : ${mismatches.length}`);
console.log(`  skipped (no png / size or format mismatch): ${skipped}\n`);
for (const m of mismatches.slice(0, 30)) {
  console.log(
    `!! ${m.cast}/${m.member} ${m.size} — ${m.diff}/${m.total} px differ, worst delta ${m.worst}`,
  );
}
if (mismatches.length === 0 && checked > 0) console.log("every member's alpha matches its source chunk exactly.");
