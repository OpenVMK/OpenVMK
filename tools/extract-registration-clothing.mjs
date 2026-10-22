/**
 * Extract the registration clothing list from the OVMK clothing-data workbook.
 *
 *   node tools/extract-registration-clothing.mjs <Clothing Data List Export.xlsx>
 *
 * Writes `assets/registration-clothing.json`.
 *
 * ── Which sheets, and why ──────────────────────────────────────────────────
 * The workbook has nine sheets: three `MData` (raw), three `Clothing`, and
 * three `Clothing Shop`. Only the SHOP sheets are used:
 *
 *   Boys Clothing Shop     217 ids   ch top=181  pn bottom=30  sh shoes=6
 *   Girls Clothing Shop    213 ids   ch top=148  pn bottom=52  sh shoes=13
 *   Unisex Clothing Shop   253 ids   ch top=223  pn bottom=20  sh shoes=10
 *
 * They are a strict SUBSET of the matching `Clothing` sheet — every id appears
 * in both — and the difference is data quality: the Shop rows all carry a
 * price, while the `Clothing` sheets have 35 rows with none. That is a broken
 * text-split in the `MData` source, where a name ending in a colour word ate
 * the price column (`21004 Mickey Beanie Red` -> name "Mickey Beanie", price
 * "Red"). So the Shop sheets are the clean cut of the same data.
 *
 * ⚠ The thousands digit of an id is the BODY PART, not a shop flag:
 * `(id - 20000) % 10000` gives 0=hair 1000=hat 2000=head 4000=top 6000=bottom
 * 8000=shoes. The sheet names invite the opposite reading — "Boys Clothing"
 * starts at 21000 (hats) and "Boys Clothing Shop" at 24000 (tops) — so do not
 * treat "Shop" as a category of item.
 *
 * The Shop sheets carry NO hair, head or hat bands. That is exactly right for
 * registration: the creation screen has five pickers and none of them is hats
 * (`avc_face`, `avc_hair`, `avc_shirt`, `avc_pants`, `avc_shoes`), and
 * `CRegClothesLoader.DefineAvailableSets` skips the hair and head bands
 * entirely. Hair and faces come from the figureset, as they always have.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "assets", "registration-clothing.json");

/** Sheet number -> the gender band its ids belong to. */
const SHOP_SHEETS = { 4: "male", 7: "female", 8: null, 9: "both" };
const SHEET_NAMES = { 4: "Boys Clothing Shop", 7: "Girls Clothing Shop", 9: "Unisex Clothing Shop" };
const BANDS = { 0: "hr", 1000: "ht", 2000: "hd", 4000: "ch", 6000: "pn", 8000: "sh" };

const source = process.argv[2];
if (!source || !existsSync(source)) {
  console.error("usage: node tools/extract-registration-clothing.mjs <workbook.xlsx>");
  process.exit(2);
}

// An xlsx is a zip. Expand-Archive only accepts a .zip extension, so copy first.
const work = mkdtempSync(join(tmpdir(), "vmk-xlsx-"));
try {
  const zip = join(work, "book.zip");
  writeFileSync(zip, readFileSync(source));
  execFileSync("powershell.exe", [
    "-NoProfile", "-NonInteractive", "-Command",
    `Expand-Archive -Path '${zip}' -DestinationPath '${join(work, "x")}' -Force`,
  ]);

  const unescape = (s) =>
    s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
     .replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
     .replace(/&amp;/g, "&");

  const sharedXml = readFileSync(join(work, "x", "xl", "sharedStrings.xml"), "utf8");
  // A shared string can be split across <r> runs; concatenate every <t>.
  const strings = [...sharedXml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) =>
    [...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => unescape(t[1])).join(""),
  );

  const cellsOf = (n) => {
    const xml = readFileSync(join(work, "x", "xl", "worksheets", `sheet${n}.xml`), "utf8");
    const rows = [];
    for (const r of xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
      const cells = {};
      for (const c of r[1].matchAll(/<c\s+r="([A-Z]+)\d+"([^>]*)>([\s\S]*?)<\/c>/g)) {
        const [, col, attrs, inner] = c;
        const type = /t="([^"]*)"/.exec(attrs)?.[1];
        if (type === "s") {
          const i = /<v>(\d+)<\/v>/.exec(inner)?.[1];
          cells[col] = i === undefined ? "" : strings[Number(i)] ?? "";
        } else if (type === "inlineStr") {
          cells[col] = unescape(/<t[^>]*>([\s\S]*?)<\/t>/.exec(inner)?.[1] ?? "");
        } else {
          cells[col] = unescape(/<v>([\s\S]*?)<\/v>/.exec(inner)?.[1] ?? "");
        }
      }
      rows.push(cells);
    }
    return rows;
  };

  const items = [];
  const seen = new Set();
  for (const sheet of [4, 7, 9]) {
    let kept = 0;
    for (const row of cellsOf(sheet)) {
      const id = Number(row.A);
      // Row 1 is the header, and the id band starts at 20000.
      if (!Number.isInteger(id) || id < 20000) continue;
      // The gender band is derivable from the id, so take it from there rather
      // than from which sheet the row came from — if the two ever disagree, the
      // id is what the client actually buckets on.
      const gender = id < 30000 ? "male" : id < 40000 ? "female" : "both";
      const band = BANDS[Math.floor(((id - 20000) % 10000) / 1000) * 1000] ?? "?";
      if (seen.has(id)) continue;
      seen.add(id);
      const price = Number(row.C);
      items.push({
        id,
        name: row.B ?? "",
        price: Number.isFinite(price) ? price : null,
        band,
        gender,
      });
      kept++;
    }
    console.log(`sheet${sheet} "${SHEET_NAMES[sheet]}": ${kept} items`);
  }
  items.sort((a, b) => a.id - b.id);

  const byBand = {};
  for (const it of items) byBand[it.band] = (byBand[it.band] ?? 0) + 1;
  console.log(`\n${items.length} distinct ids — ${Object.entries(byBand).map(([b, n]) => `${b}=${n}`).join("  ")}`);
  const noPrice = items.filter((i) => i.price === null).length;
  console.log(`without a price: ${noPrice}`);

  writeFileSync(
    OUT,
    `${JSON.stringify({ source: source.split(/[\\/]/).pop(), sheets: Object.values(SHEET_NAMES), extracted: new Date().toISOString(), items }, null, 2)}\n`,
  );
  console.log(`wrote ${resolve(OUT)}`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
void SHOP_SHEETS;
