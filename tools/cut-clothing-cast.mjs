/**
 * Cut a missing per-model clothing cast out of the mp<N> mega-library.
 *
 *   node tools/cut-clothing-cast.mjs <template.cct> <mega.cct> <from> <to> <out.cct>
 *   node tools/cut-clothing-cast.mjs ...s_58_58.cct ...mp16345.cct 58 57 ...s_57_57.cct
 *
 * ── Why this exists ─────────────────────────────────────────────────────────
 * `figuresets` asks for a cast per clothing model (`vmk_avatar_s_57_57.cct`),
 * and a few of those were never cut from the build. The art is NOT lost: the
 * `vmkmpcasts` mega-library holds every model's members, under numeric
 * `mp<N>.cct` names — the archive's usual "match by members, not filename".
 *
 * A missing one is SILENT. The avatar loaders mark their work done whether or
 * not the asset arrived, so the figure just renders without that part. The
 * Coral Magic Vest (set 44258 -> `["ch_57_58", "s_57_57"]`) lost its shoulder
 * fins exactly this way.
 *
 * ── How ─────────────────────────────────────────────────────────────────────
 * A sibling model's cast is the template: same member families
 * (`std_`/`drk_`/`wav_`/`wlk_`), same 90-member shape, same child layout. For
 * each member we copy the mega-library's CASt chunk AND both of its children
 * (BITD + ALFA) over the template's, keeping the template's own ids.
 *
 * ⚠ The CASt chunk must come across too, not just the pixels. It carries the
 * member's rect and REGISTRATION POINT, and shoulders are precisely where a
 * stale reg point shows up as art floating off the body. Copying CASt and its
 * bitmaps together also keeps bit depth and palette consistent.
 *
 * ⚠ KEY* (member -> child chunks) is a STRUCTURAL chunk, so it is LITTLE-endian
 * like the rest of an XFIR container, and its fourccs are reversed. Only the
 * Lingo chunks (Lnam, Lscr) are big-endian. Read it big-endian and you get a
 * nonsense count and an empty table, which looks just like "no key entries".
 *
 * The template's KEY* and CAS* are left alone: we overwrite chunks in place, so
 * every association still points where it did.
 *
 * ⚠ ediM TEMPLATE, BITD LIBRARY. Every pants cast stores its frames as `ediM`,
 * while the library holds plain `BITD`, so no pants cast could serve as a
 * template (Mission Space pants 51-54, Deep Sea Diving pants 55). Such a child
 * is RETAGGED: its map entry becomes BITD with the library's compression type
 * and its KEY* row is rewritten to match. The CASt comes from the library too,
 * so member and pixels agree on the format.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { read, chunkData, write } from "./shockwave/afterburner.mjs";

/** Member name: offsets[1] inside the CASt info block, Pascal-prefixed.
 *  Layout per LibreShockwave cpp/src/chunks/CastMemberChunk.cpp. */
function memberName(d) {
  if (d.length < 12) return "";
  const infoLen = d.readInt32BE(4);
  if (infoLen <= 0 || 12 + infoLen > d.length) return "";
  const info = d.subarray(12, 12 + infoLen);
  if (info.length < 20) return "";
  const dataOffset = info.readInt32BE(0);
  if (dataOffset <= 0 || dataOffset >= info.length) return "";
  let p = dataOffset;
  if (p + 2 > info.length) return "";
  const tableLen = info.readUInt16BE(p);
  p += 2;
  if (tableLen <= 0 || tableLen > 10000 || p + tableLen * 4 + 4 > info.length) return "";
  const offsets = [];
  for (let i = 0; i < tableLen; i++, p += 4) offsets.push(info.readInt32BE(p));
  const itemsLen = info.readInt32BE(p);
  p += 4;
  const itemsStart = p;
  if (offsets.length <= 1) return "";
  const nameOffset = offsets[1];
  const nameEnd = offsets.length > 2 ? offsets[2] : itemsLen;
  if (nameOffset < 0 || nameEnd - nameOffset <= 0) return "";
  const nameStart = itemsStart + nameOffset;
  if (nameStart >= info.length) return "";
  const len = info.readUInt8(nameStart);
  if (len <= 0 || nameStart + 1 + len > info.length) return "";
  return info.toString("latin1", nameStart + 1, nameStart + 1 + len);
}

function parseKeyTable(cast) {
  const entry = cast.entries.find((e) => e.tag === "KEY*");
  if (!entry) return [];
  const d = chunkData(cast, entry);
  const usedCount = d.readInt32LE(8);
  const out = [];
  let p = 12;
  for (let i = 0; i < usedCount && p + 12 <= d.length; i++, p += 12) {
    out.push({
      sectionId: Math.max(0, d.readInt32LE(p)),
      castId: Math.max(0, d.readInt32LE(p + 4)),
      fourcc: d.toString("latin1", p + 8, p + 12).split("").reverse().join(""),
    });
  }
  return out;
}

/** name -> { castResId, children: [{ resId, fourcc }] } */
function indexMembers(cast) {
  const byOwner = new Map();
  for (const k of parseKeyTable(cast)) {
    if (!byOwner.has(k.castId)) byOwner.set(k.castId, []);
    byOwner.get(k.castId).push({ resId: k.sectionId, fourcc: k.fourcc });
  }
  const out = new Map();
  for (const e of cast.entries) {
    if (e.tag !== "CASt") continue;
    let d;
    try {
      d = chunkData(cast, e);
    } catch {
      continue;
    }
    const n = memberName(d);
    if (n) out.set(n, { castResId: e.resId, children: byOwner.get(e.resId) ?? [] });
  }
  return out;
}

const [, , templatePath, megaPath, fromArg, toArg, outPath] = process.argv;
if (!templatePath || !megaPath || !fromArg || !toArg || !outPath) {
  console.error(
    "usage: node cut-clothing-cast.mjs <template.cct> <mega.cct> <fromModel> <toModel> <out.cct>",
  );
  process.exit(2);
}
for (const p of [templatePath, megaPath]) {
  if (!existsSync(p)) throw new Error(`missing input: ${p}`);
}

const template = read(readFileSync(templatePath));
const mega = read(readFileSync(megaPath));
const tIndex = indexMembers(template);
const mIndex = indexMembers(mega);
console.log(`template: ${tIndex.size} member(s)   mega: ${mIndex.size} member(s)`);

const rename = (name) => name.replace(new RegExp(`_${fromArg}_`), `_${toArg}_`);

const replacements = new Map();
/** ediM child resId -> the library BITD's compType; see the ediM note above. */
const retag = new Map();
const copied = [];
const missing = [];
for (const [name, t] of tIndex) {
  const want = rename(name);
  if (want === name) continue; // not a model-numbered member; leave as is
  const m = mIndex.get(want);
  if (!m) {
    missing.push(want);
    continue;
  }
  // The CASt itself — carries the name, rect and registration point.
  replacements.set(t.castResId, chunkData(mega, mega.entries.find((e) => e.resId === m.castResId)));
  // Its children, matched by fourcc so BITD and ALFA cannot be transposed.
  for (const child of t.children) {
    let src = m.children.find((c) => c.fourcc === child.fourcc);
    if (!src && child.fourcc === "ediM") {
      src = m.children.find((c) => c.fourcc === "BITD");
      if (src) retag.set(child.resId, mega.entries.find((e) => e.resId === src.resId).compType);
    }
    if (!src) {
      missing.push(`${want}:${child.fourcc}`);
      continue;
    }
    replacements.set(child.resId, chunkData(mega, mega.entries.find((e) => e.resId === src.resId)));
  }
  copied.push([name, want]);
}

console.log(`members remapped ${fromArg} -> ${toArg}: ${copied.length}`);
console.log(`chunks replaced: ${replacements.size}`);
if (missing.length > 0) {
  console.error(`\nMISSING in the mega-library (${missing.length}):`);
  for (const m of missing.slice(0, 20)) console.error(`   ${m}`);
  throw new Error("refusing to write a cast with missing members");
}

if (retag.size > 0) {
  for (const entry of template.entries) {
    if (!retag.has(entry.resId)) continue;
    entry.tag = "BITD";
    entry.compType = retag.get(entry.resId);
  }
  // KEY* rows are [sectionId, castId, reversed fourcc], little-endian.
  const keyEntry = template.entries.find((e) => e.tag === "KEY*");
  const key = Buffer.from(chunkData(template, keyEntry));
  const usedCount = key.readInt32LE(8);
  let rows = 0;
  for (let i = 0, p = 12; i < usedCount && p + 12 <= key.length; i++, p += 12) {
    if (!retag.has(key.readInt32LE(p))) continue;
    key.write("DTIB", p + 8, "latin1");
    rows++;
  }
  if (rows !== retag.size) throw new Error(`retagged ${retag.size} chunk(s) but found ${rows} KEY* row(s)`);
  replacements.set(keyEntry.resId, key);
  console.log(`retagged ediM -> BITD: ${retag.size}`);
}

writeFileSync(outPath, write(template, replacements));
console.log(`\nwrote ${outPath} (${readFileSync(outPath).length} bytes, template was ${readFileSync(templatePath).length})`);

// ── Verify by reading the result back ───────────────────────────────────────
// Writing a container that merely parses is not enough: the names must all have
// moved to the new model, and every member's pixels must equal the library's.
const back = read(readFileSync(outPath));
const bIndex = indexMembers(back);
let renamed = 0;
let identical = 0;
let wrong = 0;
for (const [, want] of copied) {
  const b = bIndex.get(want);
  if (!b) {
    console.error(`   MISSING AFTER WRITE: ${want}`);
    wrong++;
    continue;
  }
  renamed++;
  const m = mIndex.get(want);
  for (const child of b.children) {
    const src = m.children.find((c) => c.fourcc === child.fourcc);
    const got = chunkData(back, back.entries.find((e) => e.resId === child.resId));
    const exp = chunkData(mega, mega.entries.find((e) => e.resId === src.resId));
    if (got.equals(exp)) identical++;
    else {
      console.error(`   PIXELS DIFFER: ${want} ${child.fourcc}`);
      wrong++;
    }
  }
}
const stale = [...bIndex.keys()].filter((n) => n.includes(`_${fromArg}_`));
console.log(`\nverify: ${renamed}/${copied.length} members present as _${toArg}_`);
console.log(`verify: ${identical} child chunk(s) byte-identical to the library`);
console.log(`verify: ${stale.length} stale _${fromArg}_ member(s) left`);
if (wrong > 0 || stale.length > 0 || renamed !== copied.length) {
  throw new Error("verification FAILED");
}
console.log("\nOK");
