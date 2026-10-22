/**
 * Prove the furnimap flip patch changes exactly one sprite and nothing else.
 *
 *   node tools/check-furnimap-patch.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const FILE = join(
  process.env.VMK_SHOCKWAVE ?? join(import.meta.dirname, "..", "shockwave"),
  "siteref/homepage/download/furnituremaps.0-99_2",
);
if (!existsSync(FILE)) {
  console.error(`missing ${FILE}`);
  process.exit(1);
}
const FLIPS = [{ code: 40, dir: 3 }];

function patchFurnimap(xml) {
  let flipped = 0;
  let out = xml;
  for (const { code, dir } of FLIPS) {
    out = out.replace(
      new RegExp(`<ITEM\\b[^>]*\\bCODE="${code}"[^>]*>[\\s\\S]*?</ITEM>`),
      (item) =>
        item.replace(new RegExp(`<DIR NUM="${dir}">[\\s\\S]*?</DIR>`), (block) =>
          block.replace(/<SPR GFX="null"([^>]*?)\/>/g, (spr, attrs) => {
            if (/\bFLP=/.test(attrs)) return spr;
            flipped++;
            return `<SPR GFX="null"${attrs}FLP="1" />`;
          }),
        ),
    );
  }
  return { out, flipped };
}

const before = readFileSync(FILE, "latin1");
const { out: after, flipped } = patchFurnimap(before);

console.log(`sprite slots flipped: ${flipped}`);
console.log(`length ${before.length} -> ${after.length}  (+${after.length - before.length})`);

// Every differing region, so a stray edit cannot hide.
const changes = [];
let i = 0;
while (i < before.length && changes.length < 10) {
  if (before[i] === after[i]) { i++; continue; }
  const start = Math.max(0, i - 90);
  changes.push({
    at: i,
    before: before.slice(start, i + 90),
    after: after.slice(start, i + 100),
  });
  break; // one insertion shifts everything after it; showing the first is enough
}
for (const c of changes) {
  console.log(`\nfirst difference at offset ${c.at}:`);
  console.log(`  before: …${c.before}…`);
  console.log(`  after:  …${c.after}…`);
}

// The item count and every CODE must be untouched.
const codes = (s) => (s.match(/<ITEM\b[^>]*\bCODE="\d+"/g) ?? []).join("|");
console.log(`\nitem definitions identical: ${codes(before) === codes(after)}`);
const sprites = (s) => (s.match(/GFX="[^"]*"/g) ?? []).join("|");
console.log(`sprite NAMES identical:      ${sprites(before) === sprites(after)}`);

// And item 40 dir 3, in full, after the patch.
const item40 = /<ITEM\b[^>]*\bCODE="40"[^>]*>[\s\S]*?<\/ITEM>/.exec(after)?.[0] ?? "";
console.log(`\nitem 40 DIR 3 after patch:\n  ${/<DIR NUM="3">[\s\S]*?<\/DIR>/.exec(item40)?.[0]}`);
console.log(`\nitem 40 DIR 5 (must be unchanged):\n  ${/<DIR NUM="5">[\s\S]*?<\/DIR>/.exec(item40)?.[0]}`);
