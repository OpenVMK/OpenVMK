/**
 * How much bitmap art each cast carries.
 *
 * WHY
 *
 * Director's `.cct` is ONE file: when a cast attaches, its bitmap pixels are
 * already resident, so a window built from it draws complete on its first
 * frame. This port attaches a cast after fetching only its manifest, size index
 * and text, then fetches each PNG lazily on first read — so text rasterises
 * immediately while art is still in flight, and windows come up as captions on
 * empty panels.
 *
 * Making art resident at attach is the faithful shape, but it is only viable if
 * the per-cast cost is sane. This measures it so the decision is made on
 * numbers rather than nerve.
 *
 *   node tools/measure-cast-art.mjs
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = [
  join(process.cwd(), "client", "assets", "casts"),
  join(process.cwd(), "client", "assets", "core"),
];

const rows = [];
let grandBytes = 0;
let grandFiles = 0;

for (const root of ROOTS) {
  if (!existsSync(root)) continue;
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const bitmaps = join(root, entry.name, "bitmaps");
    if (!existsSync(bitmaps)) continue;

    let bytes = 0;
    let files = 0;
    for (const file of readdirSync(bitmaps)) {
      if (!file.endsWith(".png")) continue;
      bytes += statSync(join(bitmaps, file)).size;
      files++;
    }
    rows.push({ cast: entry.name, files, mb: bytes / 1024 / 1024 });
    grandBytes += bytes;
    grandFiles += files;
  }
}

rows.sort((a, b) => b.mb - a.mb);

console.log("largest casts by art:");
for (const row of rows.slice(0, 12)) {
  console.log(`  ${row.cast.slice(0, 34).padEnd(34)} ${String(row.files).padStart(5)} files  ${row.mb.toFixed(1).padStart(7)} MB`);
}

const under = (limit) => {
  const set = rows.filter((r) => r.mb <= limit);
  const mb = set.reduce((a, r) => a + r.mb, 0);
  return `${String(set.length).padStart(2)} casts, ${mb.toFixed(1).padStart(6)} MB`;
};

console.log("");
console.log(`TOTAL                                  ${String(grandFiles).padStart(5)} files  ${(grandBytes / 1024 / 1024).toFixed(1).padStart(7)} MB`);
console.log("");
console.log("if art were made resident at attach, for casts up to:");
for (const limit of [1, 2, 5, 10, 20]) {
  console.log(`  ${String(limit).padStart(2)} MB per cast   ->  ${under(limit)}`);
}
