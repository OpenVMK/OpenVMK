import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const archive = join(process.env.VMK_SHOCKWAVE ?? join(root, "shockwave"), "siteref", "homepage", "download", "furnituremaps.0-99_2");
const target = join(root, "assets", "furnimaps", "furnimaps_consolidated.xml");

const RIDE_GATES = [
  { code: 581, tint: "1db8e5" },
  { code: 586, tint: "92d81b" },
];

const TEMPLATE = 525;
const source = readFileSync(archive, "latin1")
  .match(new RegExp(`<ITEM[^>]*CODE="${TEMPLATE}"[^>]*>[\\s\\S]*?</ITEM>`))?.[0]
  ?.replace(new RegExp(`<SPR GFX="item_${TEMPLATE}_[^"]*"[^>]*/>`, "g"), "");
if (!source) throw new Error(`item ${TEMPLATE} not found in ${archive}`);

let xml = readFileSync(target, "latin1");
for (const { code, tint } of RIDE_GATES) {
  const entry = source
    .replace(`CODE="${TEMPLATE}"`, `CODE="${code}"`)
    .replace(/BGC="[0-9A-Fa-f]+"/g, `BGC="${tint}"`)
    .replace(/\s*\r?\n\s*/g, "");
  const existing = new RegExp(`<ITEM[^>]*CODE="${code}"[^>]*>[\\s\\S]*?</ITEM>\\r?\\n?`);
  xml = existing.test(xml) ? xml.replace(existing, entry + "\n") : xml.replace("</ITEMS>", entry + "\n</ITEMS>");
  console.log(`${code}: ${TEMPLATE}'s layout (502's frame), tint #${tint}`);
}
writeFileSync(target, xml, "latin1");
