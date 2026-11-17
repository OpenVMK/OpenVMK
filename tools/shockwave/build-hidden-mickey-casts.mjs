/**
 * HIDDEN MICKEYS — put Disney's two Hidden Mickey quests back, for Shockwave
 * and the TS client alike, and write the server's data (assets/hidden-mickeys.json).
 *
 *   node tools/shockwave/build-hidden-mickey-casts.mjs <mp4925.cct>
 *
 * ── The two quests ──────────────────────────────────────────────────────────
 * PART 2 (ran until 23 Jan 2008): 50 Mickeys, `mickey001`-`mickey050`, placed as
 *   ordinary room objects (`room.<layout>.object.xml` NODE NAME="mickeyNNN"
 *   SPRITE="tN") drawn by the room engine from the room's visual.xml sprite
 *   (MEMBER="t1".."t8", BLEND 1-20). Their art, `t1`-`t8`, was in the main UI
 *   cast (0d4c05bc) until the 2008 build swapped it for `q1`-`q10`; it survives
 *   in `vmkmpcasts/mp4925.cct`, an older build of that cast. Without it every
 *   Part 2 Mickey drew nothing.
 * THE JANUARY 2008 SET (unreleased: no wiki page or Disney text names it): `<layout>.mickey.xml` in the room cast, drawn by
 *   CHiddenMickeyInterface with `q1`-`q10`; IDs = room code x 100 + n.
 *
 * The client we run is the 2008 one: a photo is only reported (770) when a
 * Mickey from `<layout>.mickey.xml` is wholly in the viewfinder, and Part 2's
 * own photo check (`vmk_questengine/vmk_quest_hidden_mickey`) is lost. So every
 * Part 2 Mickey ALSO gets a `<MICKEY>` line at its sprite's spot, BLEND="0" —
 * invisible (the room object shows the `t` art), but the camera finds it and
 * shows it at 100% in the viewfinder, as the 2008 set's do. The server's active
 * list (2773) picks which quest's IDs are live.
 *
 * ── Where the definitions go ────────────────────────────────────────────────
 * A room that already carries `<layout>.mickey.xml` (the 2008 set) gets Part 2's
 * lines added to THAT member (room cast patched): a second member of the same
 * name elsewhere could lose the by-name lookup, since a room cast can hold a
 * lower cast number than the always-loaded ones. Every other room gets a new
 * `<layout>.mickey.xml` member in the UI cast, with `t1`-`t8`.
 *
 * Outputs: assets/patches/<cast path>.cct (UI cast + touched room casts),
 * assets/hidden-mickeys.json, and the TS client's extractions
 * (client/assets/casts/<cast>/: manifest.tsv, texts.json, text/, bitmaps/,
 * bitmaps.tsv). Run `node tools/pack-cast-bitmaps.mjs` afterwards if the UI
 * cast is packed.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { read, write, chunkData } from "./afterburner.mjs";

const ROOT = join(import.meta.dirname, "..", "..");
const CASTS = join(ROOT, "client", "assets", "casts");
const UI = "7a684fb5-a766-4fd9-9877-b00e2cafc03a/0d4c05bc8da210368dc9ce24c692a0c1";
const UI_EXTRACTION = join(CASTS, "0d4c05bc8da210368dc9ce24c692a0c1");
const TEXT_TEMPLATE = { cast: "7a684fb5-a766-4fd9-9877-b00e2cafc03a/1d7a323290934c002c579db2d87d7992", name: "mickey.score.dtd" };
const EXTRACTOR = join(ROOT, "tools", "shockwave", "LibreShockwave", "cmake-build-native", "cpp", "libreshockwave_asset_extractor.exe");
const T_MEMBERS = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"];

const [mp4925] = process.argv.slice(2);
if (!mp4925) {
  console.error("usage: node tools/shockwave/build-hidden-mickey-casts.mjs <vmkmpcasts/mp4925.cct>");
  process.exit(2);
}

/** A cast as the asset server resolves it: patch, then overlay, then archive. */
function sourceOf(path) {
  for (const root of ["assets/patches", "assets/overlay", "shockwave"]) {
    const f = join(ROOT, root, `${path}.cct`);
    if (existsSync(f)) return f;
  }
  throw new Error(`no source for ${path}`);
}
const patchPath = (path) => join(ROOT, "assets", "patches", `${path}.cct`);

// ── room code -> layout, cast paths ─────────────────────────────────────────
const vars = readFileSync(join(ROOT, "assets", "external_variables_casts.txt"), "latin1");
const layoutOf = new Map([...vars.matchAll(/^room\.code\.(\d+)=(.+?)\s*$/gm)].map(([, c, n]) => [c, n]));
const pathsOf = new Map(); // layout -> cast paths it loads
// ⚠ As served: the asset server (server/src/assets.ts) always reduces
// `vmk_holiday_overlays/…` and `holiday/…` to the everyday cast when one exists,
// so Central Plaza loads vmk_spaces/vmk_hub2 (which has hub2.mickey.xml), not
// the decorated build (which has none).
const everyday = (path) => {
  const plain = path.replace(/(^|\/)(vmk_holiday_overlays|holiday)\//g, "$1");
  if (plain === path) return path;
  try {
    sourceOf(plain);
    return plain;
  } catch {
    return path;
  }
};
for (const [, code, rawPath] of vars.matchAll(/^room\.cast\.(\d+)\.\d+=(.+?)\s*$/gm)) {
  const layout = layoutOf.get(code);
  if (!layout) continue;
  const path = everyday(rawPath);
  if (!pathsOf.has(layout)) pathsOf.set(layout, []);
  if (!pathsOf.get(layout).includes(path)) pathsOf.get(layout).push(path);
}
const base = (path) => path.split("/").pop();
/**
 * `"<layout>:<id>": [locH, locV]` — where each Part 2 Mickey's `t` sprite is
 * DRAWN, measured in the TS client (room engine placement), in
 * tools/shockwave/hidden-mickey-positions.json.
 */
const POSITIONS_FILE = join(ROOT, "tools", "shockwave", "hidden-mickey-positions.json");
const POSITIONS = existsSync(POSITIONS_FILE) ? JSON.parse(readFileSync(POSITIONS_FILE, "utf8")) : {};
const unmeasured = [];
const textFiles = (cast) => (existsSync(join(CASTS, cast, "text")) ? readdirSync(join(CASTS, cast, "text")) : []);
const readText = (cast, file) => readFileSync(join(CASTS, cast, "text", file), "latin1");
const attrs = (s) => Object.fromEntries([...s.matchAll(/(\w+)="([^"]*)"/g)].map(([, k, v]) => [k, v]));

/**
 * Part 2 Mickeys whose room object is in NO surviving cast, put back where the
 * wiki's screenshots show them. Each was located by aligning the wiki's crop
 * with our render of the room and fitting the `t` silhouette to the difference
 * (`drawn` = the fitted centre, `blend` = the fitted strength). Node X/Y/Z give
 * that loc through the room engine's placement, the same in every room:
 * locH = X - Y + 400, locV = (X + Y) / 2 - Z + 300.
 *  - 029 Street Party Music Game (Disney: "near the moon"; wiki: "inside the
 *    moon circle"): the moon lamp right of the West End sign, room 42.
 *  - 023 Shipwreck Graveyard (wiki: "on the right side of the wreck"). Disney's
 *    texts name 023 "Discovery Island", a room with no Mickey in any build; the
 *    Shipwreck is the one the wiki's 50 have instead, so it takes the free ID.
 */
const RESTORED = [
  { layout: "musicmix", path: "vmk_spaces/vmk_musicmix", id: 29, member: "t5", node: [-163, -351, 0], blend: 5, drawn: [588, 43] },
  { layout: "shipwreck", path: "vmk_spaces/vmk_shipwreck", id: 23, member: "t5", node: [-146, -380, 0], blend: 20, drawn: [634, 37] },
];
for (const r of RESTORED) POSITIONS[`${r.layout}:${r.id}`] = r.drawn;

// ── gather both quests per layout ───────────────────────────────────────────
const part2 = {}; // layout -> [{ id, type, x, y, w, h, blend }]
const jan2008 = {}; // layout -> { path, file, member, text, mickeys }
function gather() {
for (const [layout, paths] of pathsOf) {
  for (const path of paths) {
    const cast = base(path);
    const files = textFiles(cast);
    const xmlFile = files.find((f) => f.endsWith(`_${layout}.mickey.xml_stxt_0.txt`));
    if (xmlFile && !jan2008[layout]) {
      const text = readText(cast, xmlFile);
      jan2008[layout] = {
        path,
        cast,
        file: xmlFile,
        member: Number(xmlFile.split("_")[0]),
        text,
        // the 2008 set's own lines only: IDs 1-50 are Part 2's, merged in by an earlier run.
        mickeys: [...text.matchAll(/<MICKEY\s([^>]*)\/>/g)]
          .map(([, a]) => {
            const m = attrs(a);
            return { id: Number(m.ID), type: m.TYPE, x: Number(m.X), y: Number(m.Y), w: Number(m.W), h: Number(m.H) };
          })
          .filter((m) => m.id > 50),
      };
    }
    // ⚠ Only THIS layout's room files: a room loads other rooms' casts too (the
    // Jungle Cruise game loads the jungle rooms'), and their object.xml are not
    // this room's.
    const objFile = files.find((f) => f.endsWith(`_room.${layout}.object.xml_stxt_0.txt`));
    if (!objFile) continue;
    const visual = files.filter((f) => f.endsWith(`_${layout}.visual.xml_stxt_0.txt`)).map((f) => readText(cast, f)).join("\n");
    for (const [, id, sprite] of readText(cast, objFile).matchAll(/NAME="mickey(\d+)" SPRITE="(\w+)"/g)) {
      const sp = new RegExp(`<SPRITE ID="${sprite}"([^>]*)/>`).exec(visual);
      if (!sp) continue;
      const a = attrs(sp[1]);
      if (!/^t[1-8]$/.test(a.MEMBER)) continue;
      // t1-t4 are the wide floor silhouettes, t5-t8 the upright wall ones.
      const type = Number(a.MEMBER.slice(1)) <= 4 ? "floor" : "wall";
      // Where the room engine actually DRAWS it (measured: the visual.xml X/Y is
      // up to 23 px off — the object node places it). All t and q art is
      // registered at its centre, so the check sprite goes at the same loc.
      const at = POSITIONS[`${layout}:${Number(id)}`];
      if (!at) {
        // Never drawn in that room (the music mixer room's stray copies of 010/011):
        // no visible Mickey, so no invisible check sprite either.
        unmeasured.push(`${layout}:${Number(id)}`);
        continue;
      }
      const h = type === "floor" ? 24 : 32;
      // ⚠ The camera's viewfinder stops at stage y = 2 (window boundary), and the
      // check sprite must lie WHOLLY inside it: Central Plaza's 026 is drawn at
      // y = 17, so its 32-px check sprite (top 1) could never be photographed.
      // Nudge the invisible sprite down just enough; the visible art stays put.
      (part2[layout] ??= []).push({ id: Number(id), type, x: at[0], y: Math.max(at[1], 2 + h / 2), w: 34, h, blend: Number(a.BLEND) });
    }
  }
}
}
const mickeyLine = (m) =>
  `\t<MICKEY TYPE="${m.type}" X="${m.x}" Y="${m.y}" Z="-4990000" W="${m.w}" H="${m.h}" ID="${m.id}" BLEND="0" FLIPH="0" INK="8" FLIPV="0" SKEW="0" COLOR="#000000" BGCOLOR="#FFFFFF" />`;
const part2Lines = (layout) => part2[layout].map(mickeyLine).join("\r");

// ── CASt / STXT helpers (as tools/shockwave/build-pirates-holiday-cast.mjs) ──
function parseCast(buf) {
  const infoLen = buf.readUInt32BE(4), specLen = buf.readUInt32BE(8);
  return { type: buf.readUInt32BE(0), info: buf.subarray(12, 12 + infoLen), spec: Buffer.from(buf.subarray(12 + infoLen, 12 + infoLen + specLen)) };
}
function castBytes({ type, info, spec }) {
  const head = Buffer.alloc(12);
  head.writeUInt32BE(type, 0);
  head.writeUInt32BE(info.length, 4);
  head.writeUInt32BE(spec.length, 8);
  return Buffer.concat([head, info, spec]);
}
function infoItems(info) {
  const at = info.readUInt32BE(0);
  const count = info.readUInt16BE(at);
  const offsets = [];
  for (let i = 0; i < count; i++) offsets.push(info.readUInt32BE(at + 2 + i * 4));
  const itemsLenAt = at + 2 + count * 4;
  const itemsLen = info.readUInt32BE(itemsLenAt);
  return { at, offsets, itemsLenAt, items: info.subarray(itemsLenAt + 4, itemsLenAt + 4 + itemsLen) };
}
function memberName(buf) {
  const { info } = parseCast(buf);
  if (!info.length) return "";
  const { offsets, items } = infoItems(info);
  return offsets.length > 1 ? items.toString("latin1", offsets[1] + 1, offsets[1] + 1 + items[offsets[1]]) : "";
}
function renameInfo(info, name) {
  const { at, offsets, itemsLenAt, items } = infoItems(info);
  const start = offsets[1];
  const end = offsets.length > 2 ? offsets[2] : items.length;
  const pascal = Buffer.concat([Buffer.from([name.length]), Buffer.from(name, "latin1")]);
  const newItems = Buffer.concat([items.subarray(0, start), pascal, items.subarray(end)]);
  const delta = pascal.length - (end - start);
  const table = Buffer.alloc(2 + offsets.length * 4 + 4);
  table.writeUInt16BE(offsets.length, 0);
  offsets.forEach((o, i) => table.writeUInt32BE(i >= 2 ? o + delta : o, 2 + i * 4));
  table.writeUInt32BE(newItems.length, 2 + offsets.length * 4);
  return Buffer.concat([info.subarray(0, at), table, newItems, info.subarray(itemsLenAt + 4 + items.length)]);
}
const stxtText = (buf) => buf.toString("latin1", buf.readInt32BE(0), buf.readInt32BE(0) + buf.readInt32BE(4));
const stxtRuns = (buf) => buf.subarray(buf.readInt32BE(0) + buf.readInt32BE(4));
function stxtBytes(text, runs) {
  const head = Buffer.alloc(12);
  head.writeInt32BE(12, 0);
  head.writeInt32BE(text.length, 4);
  head.writeInt32BE(runs.length, 8);
  return Buffer.concat([head, Buffer.from(text, "latin1"), runs]);
}

/** A cast opened for editing: chunk lookup, its KEY* rows, member-by-name. */
function open(file) {
  const cast = read(readFileSync(file));
  const byId = new Map(cast.entries.map((e) => [e.resId, e]));
  const data = (id) => chunkData(cast, byId.get(id));
  const keyId = cast.entries.find((e) => e.tag === "KEY*").resId;
  const key = data(keyId);
  const rows = [];
  for (let i = 0; i < key.readInt32LE(8); i++) {
    const at = 12 + i * 12;
    rows.push({ child: key.readInt32LE(at), owner: key.readInt32LE(at + 4), tag: Buffer.from(key.subarray(at + 8, at + 12)) });
  }
  const fourcc = (row) => Buffer.from(row.tag).reverse().toString("latin1");
  const childOf = (owner, tag) => rows.find((r) => r.owner === owner && fourcc(r) === tag)?.child;
  const castIdByName = new Map();
  for (const e of cast.entries.filter((e) => e.tag === "CASt")) {
    const name = memberName(data(e.resId));
    if (name && !castIdByName.has(name)) castIdByName.set(name, e.resId);
  }
  return { cast, byId, data, keyId, key, rows, fourcc, childOf, castIdByName, casId: cast.entries.find((e) => e.tag === "CAS*").resId };
}

/** Write `replacements` + new members into a cast, keeping KEY* sorted. */
function save(c, replacements, additions, keyRows, newSlots, outFile) {
  if (keyRows.length) {
    const key = Buffer.from(c.key);
    const max = key.readInt32LE(4);
    const rows = [...c.rows, ...keyRows.map(([child, owner, tag]) => ({ child, owner, tag: Buffer.from(tag.split("").reverse().join(""), "latin1") }))];
    if (rows.length > max) throw new Error(`KEY* holds ${max} rows; ${rows.length} needed`);
    rows.sort((a, b) => a.owner - b.owner || (c.fourcc(a) < c.fourcc(b) ? -1 : c.fourcc(a) > c.fourcc(b) ? 1 : 0));
    rows.forEach((row, i) => {
      key.writeInt32LE(row.child, 12 + i * 12);
      key.writeInt32LE(row.owner, 12 + i * 12 + 4);
      row.tag.copy(key, 12 + i * 12 + 8);
    });
    key.writeInt32LE(rows.length, 8);
    replacements.set(c.keyId, key);
  }
  if (newSlots.length) {
    const extra = Buffer.alloc(newSlots.length * 4);
    newSlots.forEach((id, i) => extra.writeInt32BE(id, i * 4));
    replacements.set(c.casId, Buffer.concat([c.data(c.casId), extra]));
  }
  mkdirSync(dirname(outFile), { recursive: true });
  const out = write(c.cast, replacements, additions);
  writeFileSync(outFile, out);
  return out.length;
}

// ── 0. the restored Mickeys: object node + visual sprite in their room cast ──
const tsTextEdits = []; // { cast, member, file, text }
for (const [path, list] of Map.groupBy(RESTORED, (r) => r.path)) {
  const layout = list[0].layout;
  const c = open(sourceOf(path));
  const replacements = new Map();
  for (const [memberName, edit] of [
    [`room.${layout}.object.xml`, (text) => {
      // Rerunnable: drop this tool's nodes first.
      let t = text.replace(/\t\t<NODE CLASS="default" HGT="0" NAME="(mickey\d+)" SPRITE="\1"[^>]*\/>\r/g, "");
      const nodes = list.map((r) => {
        const n = `mickey${String(r.id).padStart(3, "0")}`;
        return `\t\t<NODE CLASS="default" HGT="0" NAME="${n}" SPRITE="${n}" X="${r.node[0]}" XD="0" Y="${r.node[1]}" YD="0" Z="${r.node[2]}" ZD="0" />\r`;
      });
      const at = t.lastIndexOf("\t</ELEMS>");
      if (at < 0) throw new Error(`${path}: no </ELEMS>`);
      return t.slice(0, at) + nodes.join("") + t.slice(at);
    }],
    [`${layout}.visual.xml`, (text) => {
      let t = text.replace(/\t<SPRITE ID="(mickey\d+)" MEMBER="t[1-8]"[^>]*\/>\r/g, "");
      let z = Math.max(...[...t.matchAll(/<SPRITE [^>]*\bZ="(\d+)"/g)].map(([, v]) => Number(v)));
      const [w, h] = { t5: [24, 28], t6: [24, 28], t7: [32, 38], t8: [32, 38], t1: [28, 16], t2: [28, 16], t3: [38, 22], t4: [38, 22] }[list[0].member];
      const sprites = list.map((r) => `\t<SPRITE ID="mickey${String(r.id).padStart(3, "0")}" MEMBER="${r.member}" X="400" Y="300" Z="${++z}" W="${w}" H="${h}" BLEND="${r.blend}" />\r`);
      const at = t.lastIndexOf("</SCORE>");
      if (at < 0) throw new Error(`${path}: no </SCORE>`);
      return t.slice(0, at) + sprites.join("") + t.slice(at);
    }],
  ]) {
    const castId = c.castIdByName.get(memberName);
    const stxtId = castId && c.childOf(castId, "STXT");
    if (!stxtId) throw new Error(`${path}: no ${memberName} STXT`);
    const buf = c.data(stxtId);
    const text = edit(stxtText(buf));
    replacements.set(stxtId, stxtBytes(text, stxtRuns(buf)));
    const cast = base(path);
    const file = textFiles(cast).find((f) => f.endsWith(`_${memberName}_stxt_0.txt`));
    if (!file) throw new Error(`TS ${cast}: no ${memberName}`);
    // The same edit on the extraction's OWN text: the extractor stores non-ASCII
    // (the object.xml creator's "ä") differently from the cast's raw bytes.
    const tsText = edit(readText(cast, file));
    // Written now, so gather() below reads the restored objects.
    writeFileSync(join(CASTS, cast, "text", file), tsText, "latin1");
    tsTextEdits.push({ cast, member: Number(file.split("_")[0]), file, text: tsText });
  }
  const size = save(c, replacements, [], [], [], patchPath(path));
  console.log(`${path}: restored ${list.map((r) => `mickey${String(r.id).padStart(3, "0")}`).join(", ")} (${size} bytes)`);
}
gather();

// ── 1. rooms that carry the 2008 set's xml: add Part 2's lines to it ────────────
for (const layout of Object.keys(part2).sort()) {
  const q = jan2008[layout];
  if (!q) continue;
  const c = open(sourceOf(q.path));
  const castId = c.castIdByName.get(`${layout}.mickey.xml`);
  const stxtId = castId && c.childOf(castId, "STXT");
  if (!stxtId) throw new Error(`${q.path}: no ${layout}.mickey.xml STXT`);
  const buf = c.data(stxtId);
  // Rerunnable: drop Part 2 lines from an earlier run (IDs 1-50), then add the current ones.
  const text = stxtText(buf).replace(/\t<MICKEY [^>]*ID="([1-9]|[1-4]\d|50)" [^>]*\/>\r/g, "");
  const merged = text.replace("</MICKEYS>", `${part2Lines(layout)}\r</MICKEYS>`);
  if (merged === text) throw new Error(`${q.path}: no </MICKEYS> in ${layout}.mickey.xml`);
  const size = save(c, new Map([[stxtId, stxtBytes(merged, stxtRuns(buf))]]), [], [], [], patchPath(q.path));
  console.log(`${q.path}: + ${part2[layout].length} Part 2 Mickey(s) in ${layout}.mickey.xml (${size} bytes)`);
  tsTextEdits.push({ cast: q.cast, member: q.member, file: q.file, text: merged.replace(/\r/g, "\r") });
}

// ── 2. the UI cast: t1-t8, and the other rooms' definitions ─────────────────
const ui = open(sourceOf(UI));
const old = open(mp4925);
const tpl = open(sourceOf(TEXT_TEMPLATE.cast));
const tplCastId = tpl.castIdByName.get(TEXT_TEMPLATE.name);
const textTemplate = parseCast(tpl.data(tplCastId));
const textRuns = stxtRuns(tpl.data(tpl.childOf(tplCastId, "STXT")));
let nextId = Math.max(...ui.cast.entries.map((e) => e.resId)) + 1;
const additions = [], keyRows = [], newSlots = [], uiAdded = [];
for (const name of T_MEMBERS) {
  if (ui.castIdByName.has(name)) {
    // An earlier patch already brought this one back (t1 was): keep it, but
    // still list it so the TS extraction picks it up.
    console.log(`UI cast already has ${name}, kept`);
    uiAdded.push(name);
    continue;
  }
  const srcCast = old.castIdByName.get(name);
  if (!srcCast) throw new Error(`mp4925 has no ${name}`);
  const castId = nextId++;
  additions.push({ resId: castId, tag: "CASt", ils: true, data: old.data(srcCast) });
  for (const tag of ["ediM", "ALFA", "Thum"]) {
    const child = old.childOf(srcCast, tag);
    // KEY* in mp4925 still names a Thum child that its map no longer holds (the
    // earlier t1 copy has none either): skip children without a chunk.
    const e = child && old.byId.get(child);
    if (!e) continue;
    const id = nextId++;
    // ediM is a JPEG, stored raw under the JPEG compression slot (1); the rest
    // are re-deflated (0), as afterburner.mjs `write` expects.
    const jpeg = tag === "ediM";
    if (jpeg && e.compType !== 1) throw new Error(`mp4925 ${name} ediM uses compType ${e.compType}, expected 1`);
    additions.push({ resId: id, tag, compType: jpeg ? 1 : 0, deflate: !jpeg, data: old.data(child) });
    keyRows.push([id, castId, tag]);
  }
  newSlots.push(castId);
  uiAdded.push(name);
}
const header = (layout) =>
  ['<?xml version="1.0"?>', '<!DOCTYPE mickeys SYSTEM "mickey.score.dtd">', `<?creation date="23.1.2008"?>`, "", "<MICKEYS>"].join("\r");
const uiReplacements = new Map();
const uiTextUpdates = new Map(); // member name -> text, for members an earlier run added
for (const layout of Object.keys(part2).sort()) {
  if (jan2008[layout]) continue;
  const name = `${layout}.mickey.xml`;
  const text = `${header(layout)}\r${part2Lines(layout)}\r</MICKEYS>\r`;
  if (ui.castIdByName.has(name)) {
    const stxtId = ui.childOf(ui.castIdByName.get(name), "STXT");
    uiReplacements.set(stxtId, stxtBytes(text, stxtRuns(ui.data(stxtId))));
    uiTextUpdates.set(name, text);
    continue;
  }
  const castId = nextId++, textId = nextId++;
  additions.push(
    { resId: castId, tag: "CASt", ils: true, data: castBytes({ ...textTemplate, info: renameInfo(textTemplate.info, name) }) },
    { resId: textId, tag: "STXT", compType: 0, deflate: true, data: stxtBytes(text, textRuns) },
  );
  keyRows.push([textId, castId, "STXT"]);
  newSlots.push(castId);
  uiAdded.push(name);
}
const uiOut = patchPath(UI);
const uiSize = save(ui, uiReplacements, additions, keyRows, newSlots, uiOut);
console.log(`${UI}: ${newSlots.length} members added, ${uiReplacements.size} rewritten (${uiSize} bytes)`);
if (unmeasured.length) console.log(`skipped ${unmeasured.length} Part 2 Mickey(s) with no measured (drawn) spot: ${unmeasured.join(" ")}`);

// ── 3. the TS client's extractions ─────────────────────────────────────────
for (const edit of tsTextEdits) {
  const dir = join(CASTS, edit.cast);
  writeFileSync(join(dir, "text", edit.file), edit.text, "latin1");
  const texts = JSON.parse(readFileSync(join(dir, "texts.json"), "utf8"));
  texts[String(edit.member)] = edit.text;
  writeFileSync(join(dir, "texts.json"), JSON.stringify(texts));
  console.log(`TS ${edit.cast}: member ${edit.member} updated`);
}
// The UI cast: extract the patched file to a scratch folder and copy in only the new members.
{
  const tmp = join(ROOT, "logs", "hm-extract");
  mkdirSync(join(tmp, "in"), { recursive: true });
  copyFileSync(uiOut, join(tmp, "in", "0d4c05bc8da210368dc9ce24c692a0c1.cct"));
  execFileSync(EXTRACTOR, [join(tmp, "in"), join(tmp, "out")], { stdio: "ignore" });
  const src = join(tmp, "out", "0d4c05bc8da210368dc9ce24c692a0c1");
  const lines = (f) => readFileSync(f, "utf8").split(/\r?\n/);
  const srcRows = lines(join(src, "manifest.tsv"));
  const dstText = readFileSync(join(UI_EXTRACTION, "manifest.tsv"), "utf8");
  const eol = dstText.includes("\r\n") ? "\r\n" : "\n";
  const dstRows = dstText.split(/\r?\n/).filter((r, i, a) => r !== "" || i < a.length - 1);
  const have = new Set(dstRows.slice(1).map((r) => r.split("\t")[0]));
  const want = new Set(uiAdded);
  const texts = JSON.parse(readFileSync(join(UI_EXTRACTION, "texts.json"), "utf8"));
  // Members an earlier run added: rewrite their text in place.
  for (const row of dstRows.slice(1)) {
    const [id, kind, name, , , , asset] = row.split("\t");
    if (kind !== "text" || !uiTextUpdates.has(name) || !asset?.startsWith("text/")) continue;
    writeFileSync(join(UI_EXTRACTION, asset), uiTextUpdates.get(name), "latin1");
    texts[id] = uiTextUpdates.get(name);
  }
  const sizes = [];
  for (const row of srcRows.slice(1)) {
    const [id, kind, name, , , , asset] = row.split("\t");
    if (!want.has(name) || have.has(id) || !asset || asset.startsWith("raw_chunks/")) continue;
    mkdirSync(dirname(join(UI_EXTRACTION, asset)), { recursive: true });
    copyFileSync(join(src, asset), join(UI_EXTRACTION, asset));
    if (kind === "text") texts[id] = readFileSync(join(src, asset), "latin1");
    if (kind === "bitmap") {
      const png = readFileSync(join(src, asset));
      sizes.push(`${asset}\t${png.readUInt32BE(16)}\t${png.readUInt32BE(20)}`);
    }
    dstRows.push(row);
  }
  writeFileSync(join(UI_EXTRACTION, "manifest.tsv"), dstRows.join(eol) + eol);
  writeFileSync(join(UI_EXTRACTION, "texts.json"), JSON.stringify(texts));
  if (sizes.length) {
    const tsv = join(UI_EXTRACTION, "bitmaps.tsv");
    const cur = readFileSync(tsv, "utf8");
    writeFileSync(tsv, cur + (cur.endsWith("\n") ? "" : "\n") + sizes.join("\n") + "\n");
  }
  console.log(`TS 0d4c05bc: ${dstRows.length - dstText.split(/\r?\n/).filter(Boolean).length} rows added, ${sizes.length} bitmaps`);
}

// ── 4. the server's data ───────────────────────────────────────────────────
const json = { part2: {}, jan2008: {} };
for (const [layout, list] of Object.entries(part2)) json.part2[layout] = { mickeys: list.map(({ blend, ...m }) => m) };
for (const [layout, q] of Object.entries(jan2008)) json.jan2008[layout] = { mickeys: q.mickeys };
writeFileSync(join(ROOT, "assets", "hidden-mickeys.json"), JSON.stringify(json, null, 1) + "\n");
const count = (o) => new Set(Object.values(o).flatMap((r) => r.mickeys.map((m) => m.id))).size;
console.log(`hidden-mickeys.json: Part 2 ${count(json.part2)} Mickeys in ${Object.keys(json.part2).length} rooms; the 2008 set ${count(json.jan2008)} in ${Object.keys(json.jan2008).length}`);
