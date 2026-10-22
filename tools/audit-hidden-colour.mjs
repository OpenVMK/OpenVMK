/**
 * Finds extracted art that carries COLOUR under fully-transparent pixels.
 *
 * WHY THIS EXISTS
 *
 * A canvas stores premultiplied alpha, so decoding a PNG and drawing it into one
 * collapses every `a0` pixel to (0,0,0,0) and destroys its RGB. Director does
 * NOT ignore that colour: body parts are composited with `useAlpha: 0`, so
 * `getPartImg` draws a part's colour regardless of its own alpha and the
 * separate `getPartAlpha` pass supplies the silhouette.
 *
 * That is what hid the avatar's LIPS — the mouth of `std_fc_1_3_0` lives in
 * pixels whose ALFA is 0, sitting over an opaque head. The PNG on disk holds
 * them (`234,219,190/a0`); our canvas round-trip did not.
 *
 * This tool answers the follow-up: how much OTHER art is affected.
 *
 *   node tools/audit-hidden-colour.mjs            # every cast
 *   node tools/audit-hidden-colour.mjs asd        # one cast
 *
 * A file is FLAGGED when it has transparent pixels whose RGB is not black —
 * i.e. real colour a premultiplying reader would throw away.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { inflateSync } from "node:zlib";
import { join, resolve } from "node:path";

const CASTS = resolve("client/assets/casts");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));

/** Minimal PNG reader for the 8-bit RGBA the extractor emits. */
function readPng(file) {
  const buf = readFileSync(file);
  if (buf.length < 8 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colourType = 0;
  const idat = [];
  while (pos + 8 <= buf.length) {
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
  // Only RGBA can carry hidden colour; anything else has no alpha to hide behind.
  if (colourType !== 6 || bitDepth !== 8 || width <= 0 || height <= 0) return null;

  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * 4;
  const line = new Uint8Array(stride);
  const prev = new Uint8Array(stride);
  let hidden = 0;
  let transparent = 0;
  let rp = 0;
  for (let y = 0; y < height; y++) {
    if (rp >= raw.length) break;
    const filter = raw[rp++];
    for (let i = 0; i < stride; i++) {
      const x = raw[rp + i] ?? 0;
      const a = i >= 4 ? line[i - 4] : 0;
      const b = prev[i];
      const c = i >= 4 ? prev[i - 4] : 0;
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
    for (let x = 0; x < width; x++) {
      const o = x * 4;
      if (line[o + 3] !== 0) continue;
      transparent++;
      // Anything not black is colour a premultiplying decode would destroy.
      if (line[o] > 8 || line[o + 1] > 8 || line[o + 2] > 8) hidden++;
    }
    prev.set(line);
  }
  return { width, height, hidden, transparent };
}

const castDirs = readdirSync(CASTS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && (only.length === 0 || only.includes(d.name)))
  .map((d) => d.name);

let scanned = 0, flagged = 0, totalHidden = 0;
const perCast = new Map();
const worst = [];

for (const cast of castDirs) {
  const dir = join(CASTS, cast, "bitmaps");
  if (!existsSync(dir)) continue;
  let castFlagged = 0, castScanned = 0;
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".png")) continue;
    const file = join(dir, name);
    let info = null;
    try {
      if (statSync(file).size > 4_000_000) continue;
      info = readPng(file);
    } catch {
      continue;
    }
    if (!info) continue;
    scanned++; castScanned++;
    if (info.hidden > 0) {
      flagged++; castFlagged++; totalHidden += info.hidden;
      worst.push({ cast, name, hidden: info.hidden,
        share: info.hidden / (info.width * info.height) });
    }
  }
  if (castScanned > 0) perCast.set(cast, { castScanned, castFlagged });
}

worst.sort((a, b) => b.share - a.share);
const topCasts = [...perCast.entries()]
  .filter(([, v]) => v.castFlagged > 0)
  .sort((a, b) => b[1].castFlagged - a[1].castFlagged)
  .slice(0, 15);

console.log(`\nHidden-colour audit — RGB under fully transparent pixels\n`);
console.log(`  PNGs scanned          : ${scanned}`);
console.log(`  with hidden colour    : ${flagged}  (${((flagged / Math.max(scanned, 1)) * 100).toFixed(1)}%)`);
console.log(`  hidden pixels total   : ${totalHidden}\n`);
console.log(`  casts most affected:`);
for (const [cast, v] of topCasts) {
  console.log(`    ${cast.padEnd(38)} ${v.castFlagged}/${v.castScanned}`);
}
console.log(`\n  highest share within one file:`);
for (const w of worst.slice(0, 12)) {
  console.log(`    ${(w.cast + "/" + w.name).padEnd(60)} ${(w.share * 100).toFixed(0)}% (${w.hidden}px)`);
}
