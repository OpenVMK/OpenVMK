/**
 * Gives the registration/avatar-builder PART PREVIEW SLOTS the panel's orange
 * background, by adding `#bgColor` to their element declarations.
 *
 * WHY THIS EXISTS
 *
 * The slots rendered with WHITE margins wherever the trimmed part art did not
 * cover the 36x36 tile, while the original shows the panel's orange. Traced end
 * to end, every step of ours is FAITHFUL and the data is simply missing a value:
 *
 *   1. `vmk_set_avatar.window` declares the slots with NO `#bgColor`:
 *        [#member: "shadow.pixel", … #ink: 0, … #id: "part.ch.preview", …]
 *   2. `Layout_Parser_Class.parse_window` then defaults it:
 *        if voidp(tElem[#bgColor]) then tElem[#bgColor] = "#FFFFFF"
 *   3. `CWindowImageWrapper.feedImage` fills the slot rect with it:
 *        fill(_me.pBuffer.image, tTargetRect, _me.pProps[#bgColor])
 *   4. `CWindow.buildVisual` gives the sprite the element's own ink (0 = Copy)
 *      whenever the element group shares one, so nothing keys the white out.
 *
 * And the fill really is OPAQUE — DirPlayer's `set_pixel` writes
 * `data[index + 3] = 0xFF` for 32-bit — so this is not an alpha bug either.
 *
 * ⚠ THIS IS A DATA PATCH, AND THAT IS DELIBERATE. `tools/shockwave/cast-patches`
 * holds several abandoned attempts at the same fix at the .cct level
 * (`02e17c43-orange*.cct`, `fb72f4a9-orange.cct`); every one of them turned out
 * to be a round-trip of the ORIGINAL with no `#bgColor` added, and the installed
 * patch for that cast is `optionC-scalefit`, an unrelated fix. The client reads
 * the EXTRACTED assets rather than the .cct, so the value can be supplied here
 * without solving the Shockwave recompression the earlier attempts died on.
 *
 * ⚠ RE-EXTRACTING THAT CAST REVERTS THIS. Re-run this script afterwards.
 *
 *   node tools/patch-preview-slot-bgcolor.mjs           # apply
 *   node tools/patch-preview-slot-bgcolor.mjs --check   # report only
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const CASTS = resolve("client/assets/casts");
const ORANGE = "#FFAF00"; // rgb(255,175,0) — sampled from the panel behind the slots
const check = process.argv.includes("--check");

/**
 * Element declarations for a part preview slot that carry no #bgColor yet.
 *
 * ⚠ Quotes are matched as `\\?"` because the SAME declaration exists twice per
 * cast: verbatim in `text/*.txt` and JSON-escaped inside `texts.json`. Patching
 * only the plain form leaves whichever one the loader actually reads untouched,
 * which looks exactly like the patch silently doing nothing.
 */
const Q = String.raw`\\?"`;
const SLOT = new RegExp(
  String.raw`(\[#member:\s*${Q}shadow\.pixel${Q},(?:(?:[^\]])*?))` +
  String.raw`(#type:\s*${Q}image${Q},\s*#id:\s*${Q}part\.[a-z0-9.]*preview${Q})`,
  "g",
);

let filesChanged = 0;
let slotsPatched = 0;
const touched = [];

for (const cast of readdirSync(CASTS)) {
  for (const rel of ["texts.json", "text"]) {
    const base = join(CASTS, cast, rel);
    if (!existsSync(base)) continue;
    const files = rel === "text"
      ? readdirSync(base).filter((n) => n.endsWith(".txt")).map((n) => join(base, n))
      : [base];
    for (const file of files) {
      let text;
      try { text = readFileSync(file, "utf8"); } catch { continue; }
      if (!text.includes("part.") || !text.includes("preview")) continue;

      let hits = 0;
      const out = text.replace(SLOT, (whole, head, tail) => {
        // Never double-apply, and never disturb a slot that declares its own.
        if (/#bgColor/i.test(head)) return whole;
        hits++;
        // Quote the value the way THIS file quotes — `"` in the .txt member,
        // `\"` inside texts.json — or the JSON copy stops parsing.
        const q = whole.includes('\\"') ? '\\"' : '"';
        return `${head}#bgColor: ${q}${ORANGE}${q}, ${tail}`;
      });
      if (hits === 0) continue;
      slotsPatched += hits;
      filesChanged++;
      touched.push(`${cast}/${file.slice(base.length - rel.length).replace(/^[\\/]/, "")}  ${hits} slot(s)`);
      if (!check) writeFileSync(file, out, "utf8");
    }
  }
}

console.log(`\npreview-slot #bgColor patch  (${check ? "CHECK ONLY" : "APPLIED"})\n`);
console.log(`  colour        : ${ORANGE}  (the panel behind the slots)`);
console.log(`  files changed : ${filesChanged}`);
console.log(`  slots patched : ${slotsPatched}\n`);
for (const t of touched) console.log("  " + t);
if (slotsPatched === 0) {
  console.log("  nothing to do — already patched, or the declarations moved.");
}
