/**
 * For body-part members with a raw ALFA chunk, report how many bytes the RLE
 * actually PRODUCES against how many the plane needs. A short decode is the
 * truncation that leaves a zero-alpha tail.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

/** Director's PackBits, matching `BitmapDecoder::decompressRLE`. */
function decodeRLE(compressed, expectedSize) {
  const result = new Uint8Array(expectedSize);
  let pos = 0, outPos = 0;
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
  return { produced: outPos, consumed: pos, data: result };
}

const scanWidth8 = (w) => (((w * 8 + 15) / 16) | 0) * 2;
const CASTS = resolve("client/assets/casts");

let checked = 0, short = 0;
const rows = [];
for (const cast of readdirSync(CASTS)) {
  const dir = join(CASTS, cast);
  const rawDir = join(dir, "raw_chunks");
  const tsv = join(dir, "bitmaps.tsv");
  if (!existsSync(rawDir) || !existsSync(tsv)) continue;

  const sizes = new Map();
  for (const line of readFileSync(tsv, "utf8").split(/\r?\n/).slice(1)) {
    const [p, w, h] = line.split("\t");
    if (p) sizes.set(p.replace(/^bitmaps\//, "").replace(/\.png$/, ""), [Number(w), Number(h)]);
  }
  const files = readdirSync(rawDir);
  const hasBitd = new Set(
    files.filter((f) => f.endsWith("_BITD.bin")).map((f) => f.replace(/_\d+_BITD\.bin$/, "")),
  );

  for (const file of files) {
    if (!file.endsWith("_ALFA.bin")) continue;
    const stem = file.replace(/_\d+_ALFA\.bin$/, "");
    if (hasBitd.has(stem)) continue;
    const size = sizes.get(stem);
    if (!size) continue;
    const [w, h] = size;
    const sw = scanWidth8(w);
    const need = sw * h;
    const raw = readFileSync(join(rawDir, file));
    const { produced, consumed } = decodeRLE(raw, need);
    checked++;
    if (produced < need) {
      short++;
      rows.push({ cast, stem, w, h, need, produced, chunk: raw.length, consumed,
        rawSized: raw.length === need });
    }
  }
}
console.log(`\nALFA RLE length check (ediM members only)\n`);
console.log(`  members checked : ${checked}`);
console.log(`  SHORT decodes   : ${short}`);

const rawSized = rows.filter((r) => r.rawSized).length;
console.log(`  of those, chunk length EXACTLY equals the plane size: ${rawSized}/${short}`);
console.log(`  (chunk == plane size means the ALFA is stored UNCOMPRESSED,`);
console.log(`   so running PackBits over it is the bug)\n`);

const kinds = new Map();
for (const r of rows) {
  const kind = r.stem.replace(/^\d+_/, "").replace(/_\d+$/, "").replace(/\d+/g, "N");
  kinds.set(kind, (kinds.get(kind) || 0) + 1);
}
console.log("  member-name shapes affected:");
for (const [k, v] of [...kinds.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(`    ${k.padEnd(32)} ${v}`);
}
const anyFace = rows.filter((r) => /_fc_/.test(r.stem)).length;
console.log(`\n  body-part FACE tiles among them: ${anyFace}`);

const casts = [...new Set(rows.map((r) => r.cast))].sort();
console.log(`\n  affected casts: ${casts.length}`);
if (process.argv.includes("--casts")) for (const c of casts) console.log(c);
if (short === 0) console.log("  every ALFA chunk decodes to a full plane.");
