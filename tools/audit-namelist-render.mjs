/**
 * Measure the registration name list in a native-resolution screenshot.
 * Reports the numbers that decide font size, face width and aliasing —
 * so the comparison is arithmetic instead of eyeballing.
 */
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

function readPng(file) {
  const buf = readFileSync(file);
  let pos = 8, w = 0, h = 0, depth = 0, ct = 0, interlace = 0;
  const idat = [];
  let palette = null, trns = null;
  while (pos + 8 <= buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4);
      depth = data[8]; ct = data[9]; interlace = data[12];
    } else if (type === "PLTE") palette = data;
    else if (type === "tRNS") trns = data;
    else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    pos += 12 + len;
  }
  if (depth !== 8 || interlace !== 0) {
    throw new Error(`unsupported PNG: depth=${depth} interlace=${interlace} colourType=${ct}`);
  }
  const channels = ct === 6 ? 4 : ct === 2 ? 3 : ct === 4 ? 2 : 1;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = w * channels;
  const line = new Uint8Array(stride), prev = new Uint8Array(stride);
  const px = new Uint8Array(w * h * 4);
  let rp = 0;
  for (let y = 0; y < h; y++) {
    const f = raw[rp++];
    for (let i = 0; i < stride; i++) {
      const x = raw[rp + i] ?? 0;
      const a = i >= channels ? line[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      let v;
      if (f === 0) v = x; else if (f === 1) v = x + a; else if (f === 2) v = x + b;
      else if (f === 3) v = x + ((a + b) >> 1);
      else { const p = a + b - c, pa = Math.abs(p-a), pb = Math.abs(p-b), pc = Math.abs(p-c);
        v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); }
      line[i] = v & 0xff;
    }
    rp += stride;
    for (let x = 0; x < w; x++) {
      const o = x * channels, t = (y * w + x) * 4;
      if (ct === 3) {
        const idx = line[o];
        px[t] = palette[idx * 3]; px[t+1] = palette[idx*3+1]; px[t+2] = palette[idx*3+2];
        px[t+3] = trns && idx < trns.length ? trns[idx] : 255;
      } else if (channels >= 3) {
        px[t] = line[o]; px[t+1] = line[o+1]; px[t+2] = line[o+2];
        px[t+3] = channels === 4 ? line[o+3] : 255;
      } else {
        px[t] = px[t+1] = px[t+2] = line[o];
        px[t+3] = channels === 2 ? line[o+1] : 255;
      }
    }
    prev.set(line);
  }
  return { w, h, px };
}

const file = process.argv[2];
const img = readPng(file);
console.log(`\n${file}\n${img.w}x${img.h}\n`);

const at = (x, y) => {
  const o = (y * img.w + x) * 4;
  return [img.px[o], img.px[o+1], img.px[o+2]];
};
// The name pills are a mid green; the text is near-white.
const isText = (x, y) => { const [r,g,b] = at(x,y); return r > 215 && g > 215 && b > 215; };
const isGreen = (x, y) => {
  const [r,g,b] = at(x,y);
  return g > r && g > b && g > 120 && g < 215 && r > 90 && r < 200 && b < 130;
};

// Find the pill column band by looking for rows containing both green and text.
let x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1;
for (let y = 250; y < 430; y++) {
  for (let x = 20; x < 240; x++) {
    if (isGreen(x, y)) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
}
console.log(`green pill band: x ${x0}..${x1} (w ${x1-x0+1})   y ${y0}..${y1} (h ${y1-y0+1})`);

// Group text pixels into rows.
const rowsWithText = [];
for (let y = y0; y <= y1; y++) {
  let count = 0;
  for (let x = x0; x <= x1; x++) if (isText(x, y)) count++;
  rowsWithText.push({ y, count });
}
const bands = [];
let cur = null;
for (const r of rowsWithText) {
  if (r.count > 0) { if (!cur) cur = { top: r.y, bottom: r.y }; else cur.bottom = r.y; }
  else if (cur) { bands.push(cur); cur = null; }
}
if (cur) bands.push(cur);

console.log(`\ntext bands found: ${bands.length}`);
let prevTop = null;
for (const band of bands) {
  let left = 1e9, right = -1, ink = 0;
  for (let y = band.top; y <= band.bottom; y++)
    for (let x = x0; x <= x1; x++)
      if (isText(x, y)) { ink++; if (x < left) left = x; if (x > right) right = x; }
  // cap height = tallest run in the first 10 columns of ink (a capital letter)
  let capTop = 1e9, capBot = -1;
  for (let y = band.top; y <= band.bottom; y++)
    for (let x = left; x < left + 9; x++)
      if (isText(x, y)) { if (y < capTop) capTop = y; if (y > capBot) capBot = y; }
  const pitch = prevTop === null ? "-" : band.top - prevTop;
  prevTop = band.top;
  console.log(
    `  y ${band.top}..${band.bottom}  inkH=${band.bottom-band.top+1}  cap=${capBot-capTop+1}` +
    `  x ${left}..${right}  inkW=${right-left+1}  inkPx=${ink}  pitch=${pitch}`,
  );
}

// Aliasing: within the pill band, classify pixels that are neither text nor pill green.
let text = 0, green = 0, between = 0;
for (let y = y0; y <= y1; y++) {
  for (let x = x0; x <= x1; x++) {
    if (isText(x, y)) text++;
    else if (isGreen(x, y)) green++;
    else between++;
  }
}
console.log(`\npixel classes in the pill band:`);
console.log(`  near-white text : ${text}`);
console.log(`  pill green      : ${green}`);
console.log(`  neither (edges/borders/antialiasing) : ${between}`);
