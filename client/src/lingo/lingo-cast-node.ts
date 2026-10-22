/**
 * Filesystem cast loader — Node only.
 *
 * Kept out of `lingo-cast.ts` because Vite externalises `node:fs`, and a
 * top-level import of it makes the whole module throw on load in the browser
 * before any cast code runs. The parser itself is shared.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { parseCastManifest, type CastLib } from "./lingo-cast.js";

/**
 * Reads width/height straight from a PNG's IHDR — bytes 16..23, big-endian,
 * right after the 8-byte signature and the IHDR chunk header.
 *
 * Member `width`/`height` drive layout and every sprite rect derives from
 * them, so the dimensions have to be real. Decoding whole images just to size
 * them would mean an image library at cast-load time for data sitting 16 bytes
 * into the file. The browser skips this entirely and takes the size from the
 * decoded `ImageBitmap`.
 */
export function readPngSize(path: string): { width: number; height: number } | null {
  try {
    const bytes = readFileSync(path);
    if (bytes.length < 24) return null;
    if (bytes[0] !== 0x89 || bytes[1] !== 0x50) return null; // not a PNG
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  } catch {
    return null;
  }
}

export function loadCastFromExtract(
  extractDir: string,
  libName: string,
  libNumber = 1,
): CastLib {
  return parseCastManifest(
    readFileSync(join(extractDir, "manifest.tsv"), "utf8"),
    libName,
    libNumber,
    {
      readText: (assetPath) => readFileSync(join(extractDir, assetPath), "utf8"),
      sizeOf: (assetPath) => readPngSize(join(extractDir, assetPath)),
    },
  );
}
