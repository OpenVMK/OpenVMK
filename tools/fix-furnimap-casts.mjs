#!/usr/bin/env node
/**
 * Make every furnimap item list the casts its sprites actually come from.
 *
 * An item may draw some facings with ANOTHER item's art: turn right (371)
 * draws dirs 3/5/7 as mirrored `item_372_*` sprites. The client only loads the
 * casts named in `CASTS="…"`, so when that list omits `hof_furni/item_372`
 * those facings resolve no member and draw nothing. The served furnimap had
 * lost exactly these second entries (the older consolidated backup still has
 * `CASTS="hof_furni/item_371, hof_furni/item_372"`).
 *
 * For each `<ITEM>`, every `GFX="item_<N>_…"` implies cast `hof_furni/item_<N>`;
 * any that is missing from CASTS (and exists on disk) is appended.
 *
 *   node tools/fix-furnimap-casts.mjs [--write] [files…]
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const write = process.argv.includes("--write");
const args = process.argv.slice(2).filter((a) => a !== "--write");
const files = args.length
  ? args
  : [
      "shockwave/siteref/homepage/download/furnituremaps.0-99_2",
      "shockwave/siteref/homepage/download/furnituremaps",
      "assets/furnimaps/furnimaps_consolidated.xml",
    ];

for (const file of files) {
  const path = join(root, file);
  if (!existsSync(path)) {
    console.log(`${file}: not found`);
    continue;
  }
  const xml = readFileSync(path, "latin1");
  const changes = [];
  const out = xml.replace(/<ITEM\b([^>]*)>([\s\S]*?)<\/ITEM>/g, (whole, attrs, body) => {
    const code = /CODE="(\d+)"/.exec(attrs)?.[1];
    const castsMatch = /CASTS="([^"]*)"/.exec(attrs);
    if (!code || !castsMatch) return whole;
    const casts = castsMatch[1].split(",").map((c) => c.trim()).filter(Boolean);
    const needed = new Set();
    for (const m of body.matchAll(/GFX="item_(\d+)_/g)) needed.add(`hof_furni/item_${m[1]}`);
    const missing = [...needed].filter(
      (c) => !casts.includes(c) && existsSync(join(root, "shockwave", `${c}.cct`)),
    );
    if (missing.length === 0) return whole;
    changes.push(`${code}: +${missing.join(" +")}`);
    const fixed = [...casts, ...missing].join(", ");
    return whole.replace(castsMatch[0], `CASTS="${fixed}"`);
  });
  console.log(`${file}: ${changes.length} item(s) missing a sprite cast`);
  for (const c of changes) console.log(`  ${c}`);
  if (write && changes.length) {
    writeFileSync(path, out, "latin1");
    console.log(`  written`);
  }
}
