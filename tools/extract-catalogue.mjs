/**
 * Recover the shop catalogue from an OpenVMK-lineage `vmk.sql` dump.
 *
 * Three tables carry it, and they map 1:1 onto what messages 15 and 16 send:
 *
 *   catalogue_index    (id, name)                      -> shop; `name` is the
 *                                                         `cat.name.<n>` text id
 *   catalogue_children (id, parent, name, layout)      -> page; `name` is the
 *                                                         page title the client
 *                                                         switches on, `layout`
 *                                                         is the third field of
 *                                                         the `16` reply
 *   catalogue_items    (id, parent, price, item,
 *                       metadata, inventoryType,
 *                       level, singleUse, expiryDate)  -> product
 *
 * ⚠ Provenance: this is the OpenVMK-lineage private-server database, not a
 * Disney export. It is the closest thing to real catalogue data that survives —
 * prices, shop assignments and page layouts are all genuine server rows rather
 * than inference — but a handful of entries are demonstrably post-Disney
 * additions ("Walkable Pixels", shop 43, which has no `cat.name.43` anywhere).
 * Recording provenance here matters more than the row count.
 *
 * Usage:  node tools/extract-catalogue.mjs <path-to-vmk.sql>
 */
import { createReadStream, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const src = process.argv[2];
if (!src) {
  console.error("usage: node tools/extract-catalogue.mjs <path-to-vmk.sql>");
  process.exit(1);
}
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(repoRoot, "assets", "catalogue.json");

/**
 * Split one `INSERT ... VALUES (…),(…);` line into rows of scalars.
 *
 * Hand-rolled rather than regex'd because the dump uses MySQL backslash
 * escaping inside strings — `'Shrunken Ned\'s Shop:'` — which a naive
 * `'([^']*)'` splits in the wrong place.
 */
function parseValues(line) {
  const rows = [];
  let i = line.indexOf("VALUES");
  if (i < 0) return rows;
  i += "VALUES".length;
  let row = null;
  let field = "";
  let inStr = false;
  let escaped = false;
  for (; i < line.length; i++) {
    const c = line[i];
    if (inStr) {
      if (escaped) {
        field += c;
        escaped = false;
      } else if (c === "\\") escaped = true;
      else if (c === "'") inStr = false;
      else field += c;
      continue;
    }
    if (c === "(") {
      row = [];
      field = "";
    } else if (c === "'") inStr = true;
    else if (c === ",") {
      if (row) {
        row.push(field.trim());
        field = "";
      }
    } else if (c === ")") {
      if (row) {
        row.push(field.trim());
        rows.push(row);
        row = null;
      }
    } else field += c;
  }
  return rows;
}

const tables = { catalogue_index: [], catalogue_children: [], catalogue_items: [] };
const rl = createInterface({
  input: createReadStream(src, { encoding: "latin1" }),
  crlfDelay: Infinity,
});
for await (const line of rl) {
  const m = /^INSERT INTO `([^`]+)`/.exec(line);
  if (m && m[1] in tables) tables[m[1]].push(...parseValues(line));
}

const num = (s) => Number(s);
const shops = tables.catalogue_index.map(([id, name]) => ({ id: num(id), nameId: num(name) }));
const pages = tables.catalogue_children.map(([id, parent, name, layout]) => ({
  id: num(id),
  shop: num(parent),
  title: name,
  layout: num(layout),
}));
const items = tables.catalogue_items.map(
  ([id, parent, price, item, metadata, inventoryType, level, singleUse, expiryDate]) => ({
    id: num(id),
    page: num(parent),
    price: num(price),
    code: num(item),
    // Guest rooms carry the space name here; everything else leaves it empty.
    metadata,
    // 1 furniture, 2 clothing, 3 posters, 4 pins.
    inventoryType: num(inventoryType),
    // Which avatars may wear it: 0 male, 1 female, 2 either. Clothing only.
    level: num(level),
    singleUse: num(singleUse) !== 0,
    expiryDate: num(expiryDate),
  }),
);

writeFileSync(
  out,
  `${JSON.stringify(
    {
      source: "vmk.sql (OpenVMK-lineage server database) — NOT a Disney export",
      extracted: new Date().toISOString().slice(0, 10),
      shops,
      pages,
      items,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

const byType = items.reduce((acc, it) => {
  acc[it.inventoryType] = (acc[it.inventoryType] ?? 0) + 1;
  return acc;
}, {});
console.log(`wrote ${out}`);
console.log(`  ${shops.length} shops, ${pages.length} pages, ${items.length} items`);
console.log(`  by inventoryType (1 furni, 2 clothes, 3 posters, 4 pins):`, byType);
