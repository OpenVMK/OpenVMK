/**
 * The VMK camera's photos, as the runtime carries them.
 *
 * A photo is an 8-bit SEPIA image: `CCameraComponent.processImage` turns each
 * pixel of the stage grab into a palette index 1..64 (`(255 - avg) / 4 + 1`,
 * avg = (r + 2g + b) / 4) on `sepia_palette_camera`, and every viewer — the
 * catalog, the album, a photo hung on a wall — shows it through a palette of
 * its own. All four palettes (casts a279e2 / 1cc362 / aca627 / fb3299) are the
 * SAME 65-colour ramp, white to black through yellow-brown, so one table does.
 *
 * `member.media` is how Director hands a bitmap over the photo socket; here it
 * is a `LingoMedia` holding exactly those indices. The server stores and
 * returns them untouched, so a photo round-trips pixel for pixel.
 */
import { LingoImage } from "./lingo-builtins.js";

/** `sepia_palette_*`, index 0..64 as [r, g, b]. From the extracted palette members. */
const SEPIA: ReadonlyArray<readonly [number, number, number]> = (
  "255,255,255 255,255,240 255,255,225 255,255,210 255,255,195 255,255,181 255,255,166 255,255,151 " +
  "255,255,136 255,252,127 255,249,119 255,245,110 255,242,102 255,236,85 255,229,68 255,223,51 " +
  "255,216,34 255,213,25 255,210,17 255,206,8 255,203,0 249,198,0 243,193,0 237,188,0 231,184,0 " +
  "225,179,0 219,174,0 213,169,0 207,164,0 200,156,0 194,149,0 187,141,0 180,133,0 176,128,0 " +
  "172,124,0 167,119,0 163,115,0 159,110,0 155,106,0 151,101,0 146,97,0 142,92,0 138,87,0 134,83,0 " +
  "128,79,0 121,75,0 115,71,0 108,67,0 102,63,0 96,59,0 89,55,0 83,51,0 77,47,0 70,43,0 64,39,0 " +
  "57,36,0 51,32,0 45,28,0 38,24,0 32,20,0 26,16,0 19,12,0 13,8,0 6,4,0 0,0,0"
)
  .split(" ")
  .map((c) => c.split(",").map(Number) as unknown as readonly [number, number, number]);

/** `member.media` of a photo: its palette indices. */
export class LingoMedia {
  constructor(
    readonly width: number,
    readonly height: number,
    readonly indices: Uint8Array,
  ) {}
  get ilk(): string {
    return "media";
  }
  toString(): string {
    return `<media ${this.width}x${this.height}>`;
  }
}

/** Paint palette indices into a new image. */
export function imageFromIndices(width: number, height: number, indices: Uint8Array): LingoImage {
  const image = new LingoImage(width, height, 32);
  const rgba = new Uint8ClampedArray(width * height * 4);
  for (let i = 0, p = 0; i < width * height; i++, p += 4) {
    const [r, g, b] = SEPIA[Math.min(indices[i] ?? 0, SEPIA.length - 1)];
    rgba[p] = r;
    rgba[p + 1] = g;
    rgba[p + 2] = b;
    rgba[p + 3] = 255;
  }
  image.writeRgba(rgba);
  image.photoIndices = indices;
  return image;
}

/**
 * `CCameraComponent.processImage`, in bulk: the same per-pixel formula the
 * Lingo runs through `getPixel`/`setPixel` — which here cannot read a real
 * raster, and would take ~23,000 dispatched calls for one 184x124 shot.
 */
export function sepiaFromImage(source: LingoImage): LingoImage {
  const { width, height } = source;
  const rgba = source.readRgba();
  const indices = new Uint8Array(width * height);
  if (rgba) {
    for (let i = 0, p = 0; i < indices.length; i++, p += 4) {
      const avg = Math.trunc((rgba[p] + rgba[p + 1] * 2 + rgba[p + 2]) / 4);
      indices[i] = Math.trunc((255 - avg) / 4) + 1;
    }
  }
  return imageFromIndices(width, height, indices);
}

/**
 * `CCameraComponent.createThumb`: 80x53 by integer-ratio sampling, exactly as
 * the Lingo does (`getPixel(x * ratio, y * ratio)` for x, y from 1).
 */
export function thumbFromPhoto(photo: LingoImage, width = 80, height = 53): LingoImage {
  const source = photo.photoIndices;
  const xr = Math.trunc(photo.width / width);
  const yr = Math.trunc(photo.height / height);
  const indices = new Uint8Array(width * height);
  if (source) {
    for (let y = 1; y <= height; y++) {
      for (let x = 1; x <= width; x++) {
        const sx = Math.min(x * xr, photo.width - 1);
        const sy = Math.min(y * yr, photo.height - 1);
        indices[(y - 1) * width + (x - 1)] = source[sy * photo.width + sx] ?? 0;
      }
    }
  }
  return imageFromIndices(width, height, indices);
}

/** `CCameraComponent.countCS`: the checksum sent with each upload. */
export function photoChecksum(image: LingoImage): number {
  const table = [3, 2, 73, 28, 83, 21, 43, 90, 92, 91, 37, 4, 3, 84, 12, 102, 103, 108, 97, 43, 44, 89, 109, 65, 61, -4, 76];
  const indices = image.photoIndices;
  if (!indices) return 0;
  let a = 0;
  for (let i = 1; i <= 100; i++) {
    const x = i % image.width;
    const y = (i * i) % image.height;
    a = (a + (indices[y * image.width + x] ?? 0) * table[(i % table.length)]) % 85000;
  }
  return a;
}
