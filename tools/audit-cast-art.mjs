/**
 * Audits every extracted cast for BITMAP MEMBERS WITH NO USABLE ART.
 *
 * WHY
 *
 * A bitmap member with no `bitmaps/` row still gets a correct SIZE (from
 * `bitmaps.tsv`), so it lays out perfectly and draws nothing — and the browser
 * loader early-outs on an empty path without fetching or raising:
 *
 *     const url = member.imagePath;
 *     if (url === "" || inFlight.has(url)) return;
 *
 * No request, no error, no failed-load counter. It presents as window chrome
 * that is sized and positioned correctly and has no pixels.
 *
 * ⚠ COUNT MEMBERS, NOT ROWS. The extractor writes a `raw_chunks/*.bin` row for
 * EVERY chunk of every member (BITD, ALFA, ediM …) IN ADDITION to the decoded
 * PNG. So one healthy bitmap member routinely has three manifest rows, two of
 * which point into `raw_chunks/`. Counting rows makes a fully-extracted cast
 * look ~66% broken. Only `parseCastManifest`'s rule matters: a member has art
 * if and only if some row of its starts with `bitmaps/`.
 *
 *   node tools/audit-cast-art.mjs [castKey]
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "client", "assets", "casts");
const only = process.argv[2];

if (!existsSync(ROOT)) {
  console.error(`no extracted casts at ${ROOT}`);
  process.exit(1);
}

const casts = readdirSync(ROOT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !only || name === only);

let totalMembers = 0;
let totalWithoutArt = 0;
let totalDangling = 0;
const worst = [];

for (const cast of casts) {
  const manifestPath = join(ROOT, cast, "manifest.tsv");
  if (!existsSync(manifestPath)) continue;

  const lines = readFileSync(manifestPath, "utf8").split(/\r?\n/).filter(Boolean);
  const header = lines[0].split("\t");
  const iId = header.indexOf("member_id");
  const iType = header.indexOf("member_type");
  const iName = header.indexOf("member_name");
  const iPath = header.indexOf("asset_path");
  if (iType < 0 || iPath < 0) continue;

  /** member_id -> { name, pngRows: string[] } */
  const members = new Map();
  for (const line of lines.slice(1)) {
    const cols = line.split("\t");
    if (cols[iType] !== "bitmap") continue;
    const id = cols[iId];
    let entry = members.get(id);
    if (!entry) {
      entry = { name: cols[iName] ?? "", pngRows: [] };
      members.set(id, entry);
    }
    const assetPath = (cols[iPath] ?? "").trim();
    if (assetPath.startsWith("bitmaps/")) entry.pngRows.push(assetPath);
  }

  let withoutArt = 0;
  let dangling = 0;
  const examples = [];
  for (const [, entry] of members) {
    if (entry.pngRows.length === 0) {
      withoutArt++;
      if (examples.length < 4) examples.push(`${entry.name} — no bitmaps/ row`);
      continue;
    }
    const missing = entry.pngRows.filter((p) => !existsSync(join(ROOT, cast, p)));
    if (missing.length === entry.pngRows.length) {
      dangling++;
      if (examples.length < 4) examples.push(`${entry.name} -> ${missing[0]} MISSING on disk`);
    }
  }

  totalMembers += members.size;
  totalWithoutArt += withoutArt;
  totalDangling += dangling;
  if (withoutArt + dangling > 0) {
    worst.push({ cast, members: members.size, withoutArt, dangling, examples });
  }
}

worst.sort((a, b) => b.withoutArt + b.dangling - (a.withoutArt + a.dangling));

console.log(`casts audited                 ${casts.length}`);
console.log(`distinct bitmap members       ${totalMembers}`);
console.log(`  with NO bitmaps/ row        ${totalWithoutArt}`);
console.log(`  row present, file missing   ${totalDangling}`);
console.log("");

if (worst.length === 0) {
  console.log("every bitmap member has art on disk — the gap is NOT extraction.");
} else {
  console.log("worst casts:");
  for (const row of worst.slice(0, 12)) {
    console.log(
      `  ${row.cast}  ${row.members} members, ${row.withoutArt} no-art, ${row.dangling} dangling`,
    );
    for (const example of row.examples) console.log(`      ${example}`);
  }
}
