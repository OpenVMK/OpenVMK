/**
 * Extract every item's real animation states from the casts.
 *
 *   node tools/extract-item-animations.mjs [--write]
 *
 * Writes `assets/item-animations.json`.
 *
 * ── Why the furnimap is not enough ──────────────────────────────────────────
 * `furni-footprint.statesFor()` counts the trailing field of sprite names in
 * the furnimap, which is a LOWER BOUND and assumes states run 0..n-1. Neither
 * holds. Measured from Disney's own `item.<code>.ani.xml`:
 *
 *   41  turnstile   STATE 1                 (state 0 is the furnimap sprite)
 *   40  scoreboard  STATE 1,2,3,4,5         — no state 0 at all
 *   38  RNG         STATE 0..6 and 10       — non-contiguous
 *   20  water cool. STATE 0                 — animates in the DEFAULT state
 *
 * So `(state + 1) % count` lands on states that have no artwork: it would show
 * the scoreboard a blank state 0, and could never reach the RNG's state 10.
 * Advancing through the item's ACTUAL list is the only correct rule.
 *
 * ⚠ The structures live in cast members named `item.<code>.ani.xml`, and
 * `memberalias.index` lets one item borrow another's (e.g. 126 -> 41, 91 -> 40),
 * so aliases are resolved here and recorded against the borrowing item too.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { read, chunkData } from "./shockwave/afterburner.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const OUT = join(ROOT, "assets", "item-animations.json");
const ROOTS = [
  join(ROOT, "assets", "patches"),
  join(ROOT, "assets", "overlay"),
  process.env.VMK_SHOCKWAVE ?? join(ROOT, "shockwave"),
];
// ⚠ Director fields are CR-terminated.
const EOL = /\r\n|\r|\n/;

const vars = readFileSync(join(ROOT, "assets", "external_variables_casts.txt"), "latin1");
// The catalogs moved under tools/; accept either location.
const TEXTS = [join(ROOT, "tools", "catalogs", "external_texts.json"), join(ROOT, "catalogs", "external_texts.json")].find(existsSync);
const texts = JSON.parse(readFileSync(TEXTS, "utf8"));

/** The member name is the last length-prefixed run in the CASt info block. */
function memberName(d) {
  const infoLen = d.readUInt32BE(4);
  const info = d.subarray(12, 12 + infoLen);
  for (let i = info.length - 1; i >= 2; i--) {
    const len = info[i - 1];
    if (len > 0 && i + len === info.length) {
      const s = info.toString("latin1", i, i + len);
      if (/^[\x20-\x7e]+$/.test(s)) return s;
    }
  }
  return null;
}

const structures = new Map(); // "item.41.ani.xml" -> xml text
const aliases = new Map(); // borrowing member -> source member
let scanned = 0;

for (const m of vars.matchAll(/^cast\.entry\.\d+=(.+)$/gm)) {
  const rel = m[1].trim().replace(/\//g, "\\");
  const path = ROOTS.map((r) => join(r, `${rel}.cct`)).find(existsSync);
  if (!path) continue;
  let cast;
  try { cast = read(readFileSync(path)); } catch { continue; }
  scanned++;

  // CASt chunks give names; STXT chunks give text. Pair them by resource order:
  // a text member's STXT is the next STXT after its CASt.
  const named = [];
  for (const e of cast.entries) {
    if (e.tag === "CASt") {
      let n;
      try { n = memberName(chunkData(cast, e)); } catch { continue; }
      if (n && /^item\.\d+\.ani\.xml$/.test(n)) named.push(n);
    }
  }
  const xmls = [];
  for (const e of cast.entries.filter((x) => x.tag === "STXT")) {
    let s;
    try { s = chunkData(cast, e).toString("latin1").slice(12); } catch { continue; }
    if (s.includes("<ANI")) xmls.push(s);
    else {
      for (const raw of s.split(EOL)) {
        const a = /^(item\.\d+\.ani\.xml)=(item\.\d+\.ani\.xml)$/.exec(raw.trim());
        if (a) aliases.set(a[1], a[2]);
      }
    }
  }
  // ⚠ Pair by the frames the XML names, not by index — chunk order is not
  // guaranteed to line CASt and STXT up, and mispairing would attribute one
  // item's states to another silently.
  for (const xml of xmls) {
    const code = Number(/MEMBER="[A-Za-z_]*?(\d+)_/.exec(xml)?.[1]);
    if (!Number.isInteger(code)) continue;
    const key = `item.${code}.ani.xml`;
    if (!structures.has(key) || xml.length > structures.get(key).length) structures.set(key, xml);
  }
  void named;
}

const parse = (xml) => {
  const ani = /<ANI([^>]*)>/.exec(xml)?.[1] ?? "";
  const delay = Number(/DELAY="(\d+)"/.exec(ani)?.[1]);
  const interactive = /INTERACTIVE="(\d+)"/.exec(ani)?.[1];
  const states = [];
  for (const st of xml.matchAll(/<STATE([^>]*)>([\s\S]*?)<\/STATE>/g)) {
    const num = Number(/NUM="(\d+)"/.exec(st[1])?.[1]);
    if (!Number.isInteger(num)) continue;
    // ⚠ Do NOT reject a DIR whose frames name a different facing.
    //
    // Sprite names are `item_<code>_<x>_<y>_<dir>_<layer>_<state>`, and reusing
    // one facing's art for its mirror is Disney's NORMAL convention — the
    // furnimap does the same thing with `FLP="1"`, and the client takes the
    // flip from the furnimap's sprite slot, not from the animation. Treating
    // the difference as a fault rejected 289 of 298 items, including the water
    // cooler and the turnstile, both of which render perfectly.
    const dirs = [...new Set([...st[2].matchAll(/<DIR\s+NUM="(\d+)"/g)].map((d) => Number(d[1])))]
      .sort((a, b) => a - b);
    const frames = [...st[2].matchAll(/<FRAME MEMBER="([^"]*)"/g)].filter((f) => f[1] !== "").length;
    // LOOP is a COUNT, not a flag: the client plays the state that many times
    // and then drops itself back to state 0 (`CRoomItemStateAnimator.update` ->
    // `loopsReached` -> `setState(0)`). The Unbirthday Cake is LOOP="6".
    states.push({ state: num, dirs, frames, loop: Number(/LOOP="(\d+)"/.exec(st[1])?.[1] ?? 0) });
  }
  states.sort((a, b) => a.state - b.state);
  return {
    states,
    ...(Number.isFinite(delay) ? { delay } : {}),
    ...(interactive !== undefined ? { interactive: Number(interactive) } : {}),
  };
};

const items = {};
for (const [key, xml] of structures) {
  const code = Number(/^item\.(\d+)\./.exec(key)[1]);
  items[code] = { ...parse(xml), name: texts[`item.${code}`] ?? "" };
}
let aliased = 0;
for (const [from, to] of aliases) {
  const fromCode = Number(/^item\.(\d+)\./.exec(from)?.[1]);
  const src = structures.get(to);
  if (!Number.isInteger(fromCode) || !src || items[fromCode]) continue;
  items[fromCode] = { ...parse(src), name: texts[`item.${fromCode}`] ?? "", aliasOf: Number(/^item\.(\d+)\./.exec(to)[1]) };
  aliased++;
}

const codes = Object.keys(items).map(Number).sort((a, b) => a - b);
console.log(`scanned ${scanned} cast(s): ${structures.size} structure(s), ${aliases.size} alias(es) (${aliased} resolved)`);
console.log(`total items with animation: ${codes.length}`);
const multi = codes.filter((c) => items[c].states.length > 1);
console.log(`items with more than one state: ${multi.length}`);
for (const c of [41, 38, 40, 20, 126]) {
  if (!items[c]) { console.log(`   ${c}: none`); continue; }
  const s = items[c];
  console.log(`   ${String(c).padEnd(5)} states=[${s.states.map((x) => x.state).join(",")}]${s.aliasOf ? ` (alias of ${s.aliasOf})` : ""}  ${s.name}`);
}

if (!process.argv.includes("--write")) {
  console.log("\ndry run — pass --write to apply");
  process.exit(0);
}
writeFileSync(OUT, `${JSON.stringify({ extracted: new Date().toISOString(), items }, null, 2)}\n`);
console.log(`\nwrote ${OUT}`);
