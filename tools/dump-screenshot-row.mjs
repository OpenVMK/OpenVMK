/** Dump one name row from the reference screenshot as ASCII, glyph shapes and all. */
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

function readPng(file) {
  const buf = readFileSync(file);
  let pos = 8, w = 0, h = 0, ct = 0;
  const idat = []; let palette = null;
  while (pos + 8 <= buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); ct = data[9]; }
    else if (type === "PLTE") palette = data;
    else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    pos += 12 + len;
  }
  const ch = ct === 6 ? 4 : ct === 2 ? 3 : ct === 4 ? 2 : 1;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = w * ch;
  const line = new Uint8Array(stride), prev = new Uint8Array(stride);
  const px = new Uint8Array(w * h * 4);
  let rp = 0;
  for (let y = 0; y < h; y++) {
    const f = raw[rp++];
    for (let i = 0; i < stride; i++) {
      const x = raw[rp + i] ?? 0;
      const a = i >= ch ? line[i - ch] : 0, b = prev[i], c = i >= ch ? prev[i - ch] : 0;
      let v;
      if (f === 0) v = x; else if (f === 1) v = x + a; else if (f === 2) v = x + b;
      else if (f === 3) v = x + ((a + b) >> 1);
      else { const p = a + b - c, pa = Math.abs(p-a), pb = Math.abs(p-b), pc = Math.abs(p-c);
        v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); }
      line[i] = v & 0xff;
    }
    rp += stride;
    for (let x = 0; x < w; x++) {
      const o = x * ch, t = (y * w + x) * 4;
      if (ct === 3) { const i2 = line[o]; px[t]=palette[i2*3]; px[t+1]=palette[i2*3+1]; px[t+2]=palette[i2*3+2]; }
      else { px[t]=line[o]; px[t+1]=ch>=3?line[o+1]:line[o]; px[t+2]=ch>=3?line[o+2]:line[o]; }
    }
    prev.set(line);
  }
  return { w, h, px };
}

const img = readPng(process.argv[2]);
const X0 = Number(process.argv[3] ?? 56), X1 = Number(process.argv[4] ?? 156);
const Y0 = Number(process.argv[5] ?? 294), Y1 = Number(process.argv[6] ?? 310);
const at = (x,y) => { const o=(y*img.w+x)*4; return [img.px[o],img.px[o+1],img.px[o+2]]; };
console.log(`\nreference rows y ${Y0}..${Y1}, x ${X0}..${X1}\n`);
for (let y = Y0; y <= Y1; y++) {
  let s = "";
  for (let x = X0; x <= X1; x++) {
    const [r,g,b] = at(x,y);
    s += (r>215&&g>215&&b>215) ? "#" : ".";
  }
  console.log(String(y).padStart(4) + " " + s);
}
