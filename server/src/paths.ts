/**
 * Where the server finds its files, relative to the install folder.
 *
 * The release ships the TS client's EXTRACTED casts (`client/assets/casts`) and
 * the small data files under `assets/`, not the Shockwave archive. So:
 *
 * - "does this cast exist?" is answered by the extraction the client will
 *   actually load (`castExtracted`), never by a `.cct` on disk;
 * - the `siteref/homepage/download` data files (furniture maps, figure sets,
 *   dictionary, helps) resolve from `assets/overlay` first (`downloadFile`).
 *
 * The archive is still consulted when present (`VMK_SHOCKWAVE`, default
 * `<root>/shockwave`) — the LibreShockwave player at `/player/` and the
 * extraction tools need it — but nothing a player reaches depends on it.
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { seasonCastKey } from "./seasons.js";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** The Shockwave archive. Optional: absent in a release. */
export const ARCHIVE = process.env.VMK_SHOCKWAVE ?? join(ROOT, "shockwave");

export const OVERLAY = join(ROOT, "assets", "overlay");

/** One folder per cast, as tools/extract-casts.mjs writes them. */
export const CASTS_DIR = process.env.VMK_CASTS ?? join(ROOT, "client", "assets", "casts");

/**
 * A `siteref/homepage/download/<name>` data file: the overlay copy, else the
 * archive's. `null` when neither exists.
 */
export function downloadFile(name: string): string | null {
  for (const root of [OVERLAY, ARCHIVE]) {
    const file = join(root, "siteref", "homepage", "download", name);
    if (existsSync(file)) return file;
  }
  return null;
}

/**
 * The extraction folder a cast path loads from.
 *
 * ⚠ MUST mirror `castKey` in client/src/lingo/boot-client.ts. If the two
 * disagree the server advertises a room whose casts the client then cannot
 * find, or hides one it could have loaded.
 */
export function castKey(path: string): string {
  const clean = path.split("?")[0] ?? path;
  const hash = /([0-9a-f]{32})(?:\.cct)?$/i.exec(clean)?.[1];
  return hash ? hash.toLowerCase() : seasonCastKey(clean);
}

const extractedCache = new Map<string, boolean>();

/** Has this cast (a config path, a basename, or an md5 name) been extracted? */
export function castExtracted(path: string): boolean {
  const key = castKey(path);
  if (!key) return false;
  let found = extractedCache.get(key);
  if (found === undefined) {
    found = existsSync(join(CASTS_DIR, key, "manifest.tsv"));
    extractedCache.set(key, found);
  }
  return found;
}
