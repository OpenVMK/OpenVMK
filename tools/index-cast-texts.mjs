/**
 * Bundles each extracted cast's TEXT MEMBERS into one `texts.json`.
 *
 * WHY
 *
 * `prefetchCast` needs every text member's content before it can attach a cast
 * — a cast's `thread.index` and its window layouts are text members, and
 * `initThread` reads them the moment the cast attaches. It was fetching them
 * ONE HTTP REQUEST AT A TIME:
 *
 *     cast text members   184 requests   6009 ms   (and the timing buffer caps
 *                                                   at 250, so the real figure
 *                                                   is higher)
 *
 * against 16 requests / 49 ms for all the JavaScript. After per-cast JS
 * chunking, this is the largest remaining cost in the boot.
 *
 * One file per cast collapses that to one request. Same idea as
 * `index-bitmap-sizes.mjs`, which already does this for bitmap dimensions.
 *
 * ⚠ Keyed by the manifest's IN-CAST member id, which is what
 * `boot-client.ts` looks up — NOT the global id `parseCastManifest` assigns.
 *
 *   node tools/index-cast-texts.mjs [assetsDir]
 *
 * `assetsDir` defaults to client/assets; make-release.mjs points it at the
 * release copy so every shipped cast has a fresh bundle.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const dirArg = process.argv.slice(2).find((a) => !a.startsWith("--"));
const ASSETS = dirArg ? resolve(dirArg) : join(process.cwd(), "client", "assets");
const ROOTS = [join(ASSETS, "casts"), join(ASSETS, "core")];
const quiet = process.argv.includes("--quiet");

let castsWritten = 0;
let membersBundled = 0;

for (const root of ROOTS) {
  if (!existsSync(root)) continue;

  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = join(root, entry.name);
    const manifestPath = join(dir, "manifest.tsv");
    if (!existsSync(manifestPath)) continue;

    const lines = readFileSync(manifestPath, "utf8").split(/\r?\n/).filter(Boolean);
    const header = lines[0].split("\t");
    const iId = header.indexOf("member_id");
    const iPath = header.indexOf("asset_path");
    if (iId < 0 || iPath < 0) continue;

    /** in-cast member id -> text content */
    const texts = {};
    let count = 0;
    for (const line of lines.slice(1)) {
      const cols = line.split("\t");
      const assetPath = (cols[iPath] ?? "").trim();
      if (!assetPath.startsWith("text/")) continue;
      const file = join(dir, assetPath);
      if (!existsSync(file)) continue;
      texts[cols[iId]] = readFileSync(file, "utf8");
      count++;
    }

    if (count === 0) continue;
    writeFileSync(join(dir, "texts.json"), JSON.stringify(texts), "utf8");
    castsWritten++;
    membersBundled += count;
    if (!quiet) console.log(`${entry.name}  ${count} text members`);
  }
}

console.log("");
console.log(`wrote texts.json for ${castsWritten} casts, ${membersBundled} members bundled`);
