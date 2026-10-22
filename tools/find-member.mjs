/**
 * Finds a cast member by name across every extracted cast.
 *
 * Answers "does this member exist at all, and in which cast?" — the question
 * that separates a RESOURCE INDEX problem (member exists, index missed it) from
 * a genuinely absent member (the layout names something the casts never had).
 *
 *   node tools/find-member.mjs loadingscreen.hd1 basic.content2.text
 *   node tools/find-member.mjs --like loadingscreen
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "client", "assets", "casts");
const CORE = join(process.cwd(), "client", "assets", "core");

const args = process.argv.slice(2);
const fuzzy = args[0] === "--like";
const wanted = (fuzzy ? args.slice(1) : args).map((a) => a.toLowerCase());
if (wanted.length === 0) {
  console.error("usage: node tools/find-member.mjs [--like] <name> [name…]");
  process.exit(1);
}

/** Every extracted cast directory, including the core/framework ones. */
const dirs = [];
for (const root of [ROOT, CORE]) {
  if (!existsSync(root)) continue;
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.isDirectory()) dirs.push({ label: entry.name, path: join(root, entry.name) });
  }
}

const hits = new Map(wanted.map((w) => [w, []]));

for (const dir of dirs) {
  const manifestPath = join(dir.path, "manifest.tsv");
  if (!existsSync(manifestPath)) continue;
  const lines = readFileSync(manifestPath, "utf8").split(/\r?\n/).filter(Boolean);
  const header = lines[0].split("\t");
  const iId = header.indexOf("member_id");
  const iType = header.indexOf("member_type");
  const iName = header.indexOf("member_name");
  const iPath = header.indexOf("asset_path");
  if (iName < 0) continue;

  for (const line of lines.slice(1)) {
    const cols = line.split("\t");
    const name = (cols[iName] ?? "").trim();
    if (name === "") continue;
    const lower = name.toLowerCase();
    for (const want of wanted) {
      const match = fuzzy ? lower.includes(want) : lower === want;
      if (!match) continue;
      const list = hits.get(want);
      if (list.length < 25 && !list.some((h) => h.cast === dir.label && h.name === name)) {
        list.push({
          cast: dir.label,
          id: cols[iId],
          name,
          type: cols[iType],
          asset: (cols[iPath] ?? "").trim(),
        });
      }
    }
  }
}

for (const [want, list] of hits) {
  console.log(`\n=== ${want} ===`);
  if (list.length === 0) {
    console.log("  NOT FOUND in any extracted cast");
    continue;
  }
  for (const hit of list) {
    console.log(`  ${hit.cast}  id=${hit.id}  ${hit.type}  "${hit.name}"  ${hit.asset || "(no asset)"}`);
  }
}
