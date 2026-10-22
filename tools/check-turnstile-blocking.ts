/**
 * Does a turnstile make its tiles solid when closed?
 *
 *   npx tsx tools/check-turnstile-blocking.ts
 *
 * Runs the REAL `coveredTiles` against the real geometry, so it answers the
 * question the game answers rather than a re-implementation of it.
 */
import { coveredTiles } from "../server/src/furni-footprint.js";

const TURNSTILE = 41;
const TILE = 55;
const ROOMS = ["space_private", "spacemountain_private", "spacemountain", "tomorrowland_hub"];

for (const geo of ROOMS) {
  for (const dir of [1, 3, 5, 7]) {
    const covered = coveredTiles(geo, TILE, TURNSTILE, dir);
    const parts = [...covered].map(([ref, b]) => `${ref}:${b.walk ? "walk" : "SOLID"}`);
    console.log(
      `${geo.padEnd(24)} dir=${dir}  ${covered.size} tile(s)  ${parts.join(" ") || "(none)"}`,
    );
  }
}
