/**
 * A standalone PNG decoder, used to recover art a canvas would throw away.
 *
 * WHY THIS EXISTS
 *
 * ⚠ A CANVAS STORES PREMULTIPLIED ALPHA. Decoding a PNG and drawing it into one
 * collapses every fully-transparent pixel to (0,0,0,0), destroying its RGB.
 * Director does NOT ignore that colour: avatar body parts are composited with
 * `useAlpha: 0`, so `getPartImg` draws a part's colour regardless of its own
 * alpha and the separate `getPartAlpha` pass supplies the silhouette.
 *
 * MEASURED — the avatar's mouth lives in exactly those pixels. `std_fc_1_3_0`
 * row 9, read three ways:
 *
 *     ediM (JPEG)   … 30,16,0      | 233,219,190   | 167,153,124
 *     PNG FILE      … 30,16,0/a255 | 234,219,190/a0| 167,153,124/a0
 *     via CANVAS    … 30,16,0      | 0,0,0/a0      | 0,0,0/a0
 *
 * The file is fine; the canvas round-trip is where it goes. Composited as
 * Director does, the recovered colour is an unmistakable mouth — 38 strong
 * pixels against 2 from the canvas-decoded art.
 *
 * ⚠ AND IT IS NOT ONE TILE. `tools/audit-hidden-colour.mjs` finds 87,533 of
 * 103,489 extracted PNGs (84.6%) carrying colour under transparent pixels, some
 * of them 100% — files that decode to NOTHING through a canvas while Director
 * draws them in full.
 *
 * Only the 8-bit RGBA/RGB/grey forms the extractor emits are handled; anything
 * else returns null and the caller falls back to the ordinary canvas path.
 */

export interface DecodedPng {
  width: number;
  height: number;
  /** Straight (NON-premultiplied) RGBA, exactly as the file stores it. */
  data: Uint8ClampedArray;
}

const SIGNATURE = 0x89504e47;

/** Undo one scanline filter, in place. */
function unfilter(
  filter: number,
  line: Uint8Array,
  prev: Uint8Array,
  stride: number,
  bytesPerPixel: number,
): void {
  if (filter === 0) return;
  for (let i = 0; i < stride; i++) {
    const a = i >= bytesPerPixel ? line[i - bytesPerPixel] : 0;
    const b = prev[i];
    const c = i >= bytesPerPixel ? prev[i - bytesPerPixel] : 0;
    let value = line[i];
    if (filter === 1) value += a;
    else if (filter === 2) value += b;
    else if (filter === 3) value += (a + b) >> 1;
    else if (filter === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a);
      const pb = Math.abs(p - b);
      const pc = Math.abs(p - c);
      value += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
    }
    line[i] = value & 0xff;
  }
}

export function decodePng(bytes: ArrayBuffer): DecodedPng | null {
  const view = new DataView(bytes);
  if (view.byteLength < 8 || view.getUint32(0) !== SIGNATURE) return null;

  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colourType = 0;
  let interlace = 0;
  const idat: Uint8Array[] = [];

  while (pos + 8 <= view.byteLength) {
    const length = view.getUint32(pos);
    const type = String.fromCharCode(
      view.getUint8(pos + 4), view.getUint8(pos + 5),
      view.getUint8(pos + 6), view.getUint8(pos + 7),
    );
    const start = pos + 8;
    if (type === "IHDR") {
      width = view.getUint32(start);
      height = view.getUint32(start + 4);
      bitDepth = view.getUint8(start + 8);
      colourType = view.getUint8(start + 9);
      interlace = view.getUint8(start + 12);
    } else if (type === "IDAT") {
      idat.push(new Uint8Array(bytes, start, length));
    } else if (type === "IEND") break;
    pos = start + length + 4;
  }

  // Interlaced PNGs would need the Adam7 passes; the extractor never emits one.
  if (bitDepth !== 8 || interlace !== 0 || width <= 0 || height <= 0) return null;
  const channels = colourType === 6 ? 4 : colourType === 2 ? 3 : colourType === 0 ? 1 : 0;
  if (channels === 0 || idat.length === 0) return null;

  let raw: Uint8Array;
  try {
    raw = inflate(concat(idat));
  } catch {
    return null;
  }

  const stride = width * channels;
  const out = new Uint8ClampedArray(width * height * 4);
  const line = new Uint8Array(stride);
  const prev = new Uint8Array(stride);
  let read = 0;

  for (let y = 0; y < height; y++) {
    if (read >= raw.length) break;
    const filter = raw[read++];
    line.set(raw.subarray(read, read + stride));
    read += stride;
    unfilter(filter, line, prev, stride, channels);
    for (let x = 0; x < width; x++) {
      const from = x * channels;
      const to = (y * width + x) * 4;
      if (channels === 4) {
        out[to] = line[from];
        out[to + 1] = line[from + 1];
        out[to + 2] = line[from + 2];
        out[to + 3] = line[from + 3];
      } else if (channels === 3) {
        out[to] = line[from];
        out[to + 1] = line[from + 1];
        out[to + 2] = line[from + 2];
        out[to + 3] = 255;
      } else {
        out[to] = out[to + 1] = out[to + 2] = line[from];
        out[to + 3] = 255;
      }
    }
    prev.set(line);
  }
  return { width, height, data: out };
}

function concat(chunks: Uint8Array[]): Uint8Array {
  let total = 0;
  for (const c of chunks) total += c.length;
  const out = new Uint8Array(total);
  let at = 0;
  for (const c of chunks) { out.set(c, at); at += c.length; }
  return out;
}

/**
 * zlib `inflate`, via the platform's own decompressor.
 *
 * ⚠ SYNCHRONOUS BY NECESSITY — `DecompressionStream` is async, and this runs
 * inside the bitmap load path where the caller already has the bytes. The raw
 * DEFLATE reader below is small and only has to handle what `zlib` produces.
 */
function inflate(data: Uint8Array): Uint8Array {
  // Skip the 2-byte zlib header; the payload is raw DEFLATE.
  return inflateRaw(data.subarray(2));
}

const LENGTH_BASE = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
const LENGTH_EXTRA = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
const DIST_BASE = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
const DIST_EXTRA = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
const CODE_ORDER = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];

interface Huffman { counts: Int32Array; symbols: Int32Array }

function buildHuffman(lengths: Uint8Array): Huffman {
  const counts = new Int32Array(16);
  for (const l of lengths) counts[l]++;
  counts[0] = 0;
  const offsets = new Int32Array(16);
  for (let i = 1; i < 16; i++) offsets[i] = offsets[i - 1] + counts[i - 1];
  const symbols = new Int32Array(lengths.length);
  for (let s = 0; s < lengths.length; s++) if (lengths[s]) symbols[offsets[lengths[s]]++] = s;
  return { counts, symbols };
}

function inflateRaw(data: Uint8Array): Uint8Array {
  let out = new Uint8Array(1 << 16);
  let outAt = 0;
  let bitPos = 0;

  const grow = (needed: number): void => {
    if (outAt + needed <= out.length) return;
    let size = out.length;
    while (size < outAt + needed) size *= 2;
    const bigger = new Uint8Array(size);
    bigger.set(out.subarray(0, outAt));
    out = bigger;
  };
  const bits = (count: number): number => {
    let value = 0;
    for (let i = 0; i < count; i++) {
      value |= ((data[bitPos >> 3] >> (bitPos & 7)) & 1) << i;
      bitPos++;
    }
    return value;
  };
  const decode = (table: Huffman): number => {
    let code = 0, first = 0, index = 0;
    for (let len = 1; len < 16; len++) {
      code |= bits(1);
      const count = table.counts[len];
      if (code - first < count) return table.symbols[index + (code - first)];
      index += count;
      first = (first + count) << 1;
      code <<= 1;
    }
    return -1;
  };

  const fixedLit = (() => {
    const l = new Uint8Array(288);
    for (let i = 0; i < 144; i++) l[i] = 8;
    for (let i = 144; i < 256; i++) l[i] = 9;
    for (let i = 256; i < 280; i++) l[i] = 7;
    for (let i = 280; i < 288; i++) l[i] = 8;
    return buildHuffman(l);
  })();
  const fixedDist = buildHuffman(new Uint8Array(30).fill(5));

  for (;;) {
    const last = bits(1);
    const type = bits(2);
    if (type === 0) {
      bitPos = (bitPos + 7) & ~7;
      const at = bitPos >> 3;
      const len = data[at] | (data[at + 1] << 8);
      grow(len);
      out.set(data.subarray(at + 4, at + 4 + len), outAt);
      outAt += len;
      bitPos = (at + 4 + len) << 3;
    } else {
      let lit = fixedLit;
      let dist = fixedDist;
      if (type === 2) {
        const hlit = bits(5) + 257;
        const hdist = bits(5) + 1;
        const hclen = bits(4) + 4;
        const codeLengths = new Uint8Array(19);
        for (let i = 0; i < hclen; i++) codeLengths[CODE_ORDER[i]] = bits(3);
        const codeTable = buildHuffman(codeLengths);
        const lengths = new Uint8Array(hlit + hdist);
        for (let i = 0; i < lengths.length;) {
          const symbol = decode(codeTable);
          if (symbol < 16) lengths[i++] = symbol;
          else if (symbol === 16) { const r = 3 + bits(2); const p = lengths[i - 1]; for (let k = 0; k < r; k++) lengths[i++] = p; }
          else if (symbol === 17) { const r = 3 + bits(3); for (let k = 0; k < r; k++) lengths[i++] = 0; }
          else { const r = 11 + bits(7); for (let k = 0; k < r; k++) lengths[i++] = 0; }
        }
        lit = buildHuffman(lengths.subarray(0, hlit));
        dist = buildHuffman(lengths.subarray(hlit));
      } else if (type === 3) {
        break;
      }
      for (;;) {
        const symbol = decode(lit);
        if (symbol < 0) return out.subarray(0, outAt);
        if (symbol < 256) { grow(1); out[outAt++] = symbol; continue; }
        if (symbol === 256) break;
        const li = symbol - 257;
        const length = LENGTH_BASE[li] + bits(LENGTH_EXTRA[li]);
        const di = decode(dist);
        if (di < 0) return out.subarray(0, outAt);
        const distance = DIST_BASE[di] + bits(DIST_EXTRA[di]);
        grow(length);
        let from = outAt - distance;
        for (let i = 0; i < length; i++) out[outAt++] = out[from++];
      }
    }
    if (last) break;
  }
  return out.subarray(0, outAt);
}
