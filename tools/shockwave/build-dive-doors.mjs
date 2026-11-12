/**
 * Give the Nautilus Grotto (82) and the Shipwreck Graveyard (78) doors that
 * the surviving `vmk_grotto_handler` can drive, one door at a time, with the
 * lamp over each door turning green while it is open.
 *
 *   python -I tools/shockwave/prep-dive-lamps.py <ring ediM> <lampDir> "L|<ring.png>|<greenlight_L.png>|<x>|<y>" "R|..."
 *   node tools/shockwave/build-dive-doors.mjs <room.cct> <out.cct> <extraction dir> [lampDir]
 *
 *   room.cct        shockwave/vmk_spaces/vmk_nautilus_grotto.cct (or vmk_shipwreck.cct)
 *   out.cct         assets/patches/vmk_spaces/<same name>.cct, which shadows the archive for Shockwave
 *   extraction dir  client/assets/casts/vmk_nautilus_grotto (or vmk_shipwreck): only its text/
 *                   and texts.json are rewritten here. With lamps (new members), re-extract the
 *                   output cast into it instead and run tools/index-bitmap-sizes.mjs on it.
 *
 * ── Why ──────────────────────────────────────────────────────────────────────
 * Both rooms' door handlers are lost. `vmk_grotto_handler.cct` was the
 * Grotto's ("#Nautilus grotto doors" in its thread.index), but the surviving
 * copy drives room 81's screen and red gates, and `vmk_shipwreck_handler.cct`
 * is the text scroller. With nothing driving them, every door's open AND close
 * animation loops at once. Room cast 82.4 / 78.4 load `vmk_grotto_handler`
 * (both rooms), whose ref-0 and ref-1 switches each hide one door.
 *
 * ── Doors (text members only) ────────────────────────────────────────────────
 * A door is two layers: the leaf (`*_door_closed` <-> `*_door_open`) and a
 * `*_closed2` piece that exists only while the door is shut. Each side's
 * animations become one still "shut" pose, one .ani:
 *
 *   vmk_anim_1  left door shut (leaf + closed2)     2792 [0, s]
 *   vmk_anim_9  right door shut (leaf + closed2)    2792 [1, s]  (with 10, left empty)
 *
 * and the room's other animations are renumbered from 2, around 9 and 10.
 *
 * A pose is the last frame of Disney's own close animation: what it shows once
 * it has finished playing. Both layers of a door share one .ani anchored on the
 * leaf's node, so the other layer's offset is the screen distance between the
 * two nodes (CRoomAnchor.GetScrPos: x - y, (x + y) / 2 - z; the stage centre is
 * (400, 300)) plus its own LOCH/LOCV. Channels go back to front by node depth
 * (10x + 10y + 5z). An anchor on a half pixel moves one unit so it lands whole.
 *
 * ── Lamps (lampDir) ──────────────────────────────────────────────────────────
 * Each lamp is painted red on the tube ring IN FRONT of its door (ring depth
 * ~3870, door ~3480), and both rooms carry Disney's `greenlight_L/_R` for the
 * same spot, placed by nothing that survives. The handler can only hide, and
 * the door must stay behind its ring (they overlap), so:
 *
 *   - the ring's alpha gets the lamp punched out (a replacement ALFA);
 *   - the door's shut pose gains a front channel `redlight_<side>`, the ring's
 *     own lamp pixels as a NEW member, which fills the hole while the door is
 *     shut;
 *   - a new always-on animation, just behind the door, draws `greenlight_<side>`
 *     into the hole, seen once the shut pose is hidden.
 *
 * The green animations reuse two of the door .ani members this build no
 * longer lists, so no new text members are needed.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { read, write, chunkData } from "./afterburner.mjs";

const [templatePath, outPath, extractionDir, lampDir] = process.argv.slice(2);
if (!extractionDir) {
  console.error("usage: node build-dive-doors.mjs <room.cct> <out.cct> <extraction dir> [lampDir]");
  process.exit(2);
}
const STAGE = { x: 400, y: 300 };

// ── Cast plumbing (as build-pirates-holiday-cast.mjs) ────────────────────────
const cast = read(readFileSync(templatePath));
const byId = new Map(cast.entries.map((e) => [e.resId, e]));
const data = (resId) => chunkData(cast, byId.get(resId));
function parseCast(buf) {
  const type = buf.readUInt32BE(0);
  const infoLen = buf.readUInt32BE(4);
  const specLen = buf.readUInt32BE(8);
  return { type, info: buf.subarray(12, 12 + infoLen), spec: Buffer.from(buf.subarray(12 + infoLen, 12 + infoLen + specLen)) };
}
function castBytes({ type, info, spec }) {
  const head = Buffer.alloc(12);
  head.writeUInt32BE(type, 0);
  head.writeUInt32BE(info.length, 4);
  head.writeUInt32BE(spec.length, 8);
  return Buffer.concat([head, info, spec]);
}
/** The info block's item list: u16 count, count x u32 offsets, u32 itemsLen, items. Item 1 is the name. */
function infoItems(info) {
  const at = info.readUInt32BE(0);
  const count = info.readUInt16BE(at);
  const offsets = [];
  for (let i = 0; i < count; i++) offsets.push(info.readUInt32BE(at + 2 + i * 4));
  const itemsLenAt = at + 2 + count * 4;
  const itemsLen = info.readUInt32BE(itemsLenAt);
  return { at, offsets, itemsLenAt, items: info.subarray(itemsLenAt + 4, itemsLenAt + 4 + itemsLen) };
}
function memberName(info) {
  if (info.length < 4) return "";
  const at = info.readUInt32BE(0);
  if (at + 2 > info.length || info.readUInt16BE(at) < 2) return "";
  const { offsets, items } = infoItems(info);
  const len = items[offsets[1]];
  return len ? items.toString("latin1", offsets[1] + 1, offsets[1] + 1 + len) : "";
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
/** Bitmap spec (BitmapInfo.cpp, D12+): pitch | rect t,l,b,r | alphaThreshold | 7 | regY | regX | ... */
const bitmapReg = (spec) => ({ x: spec.readInt16BE(20) - spec.readInt16BE(4), y: spec.readInt16BE(18) - spec.readInt16BE(2) });
function bitmapCast(template, name, width, height, regX, regY) {
  const spec = Buffer.from(template.spec);
  spec.writeUInt16BE((spec.readUInt16BE(0) & 0x8000) | (width * 4), 0);
  spec.writeInt16BE(0, 2);
  spec.writeInt16BE(0, 4);
  spec.writeInt16BE(height, 6);
  spec.writeInt16BE(width, 8);
  spec.writeInt16BE(regY, 18);
  spec.writeInt16BE(regX, 20);
  return castBytes({ type: template.type, info: renameInfo(template.info, name), spec });
}
/** Alpha plane -> ALFA payload: PackBits per row, rows padded to an even width (as every ALFA here). */
function packBitsAlpha(plane, width, height) {
  const scan = width + (width & 1);
  const out = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(scan);
    plane.copy(row, 0, y * width, y * width + width);
    let i = 0;
    while (i < scan) {
      let run = 1;
      while (i + run < scan && run < 128 && row[i + run] === row[i]) run++;
      if (run >= 2) {
        out.push(257 - run, row[i]);
        i += run;
        continue;
      }
      let lit = 1;
      while (i + lit < scan && lit < 128 && !(i + lit + 1 < scan && row[i + lit] === row[i + lit + 1])) lit++;
      out.push(lit - 1, ...row.subarray(i, i + lit));
      i += lit;
    }
  }
  return Buffer.from(out);
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
/**
 * A text's style runs, cut to the first one. Disney's .ani texts carry one run
 * per XML token (153 of them, syntax colouring) indexed by character position;
 * kept as they were, runs past the end of a shorter text crashed Shockwave
 * outright. One run at 0 is what the plain text members have.
 */
function firstRun(buf) {
  const runs = stxtRuns(buf);
  const n = runs.readUInt16BE(0);
  if (n <= 1) return runs;
  const one = Buffer.from(runs.subarray(0, 22));
  one.writeUInt16BE(1, 0);
  if (one.readInt32BE(2) !== 0) throw new Error("first style run does not start at 0");
  return one;
}

const castsByName = new Map();
for (const e of cast.entries.filter((e) => e.tag === "CASt")) {
  const name = memberName(parseCast(data(e.resId)).info);
  if (name) castsByName.set(name, e.resId);
}
const keyEntry = cast.entries.find((e) => e.tag === "KEY*");
const key = data(keyEntry.resId);
const children = new Map(); // CASt id -> { fourcc: child id }
for (let i = 0; i < key.readInt32LE(8); i++) {
  const at = 12 + i * 12;
  const fourcc = Buffer.from(key.subarray(at + 8, at + 12)).reverse().toString("latin1");
  const owner = key.readInt32LE(at + 4);
  if (!children.has(owner)) children.set(owner, {});
  children.get(owner)[fourcc] = key.readInt32LE(at);
}
const child = (name, fourcc) => {
  const id = children.get(castsByName.get(name))?.[fourcc];
  if (!id) throw new Error(`no ${fourcc} for member "${name}"`);
  return id;
};
const texts = new Map(); // member name -> new text
const textOf = (name) => stxtText(data(child(name, "STXT")));
const regOf = (name) => bitmapReg(parseCast(data(castsByName.get(name))).spec);

// ── Read the room ────────────────────────────────────────────────────────────
const variables = textOf("variable.index");
const animFile = new Map(); // "vmk_anim_N" -> "x.ani"
for (const line of variables.split("\r")) {
  const m = /^(vmk_anim_\d+)=(\S+)/.exec(line.trim());
  if (m) animFile.set(m[1], m[2]);
}
const roomXmlName = [...castsByName.keys()].find((n) => /^room\.(?!backup_).*\.object\.xml$/.test(n));
const roomXml = textOf(roomXmlName);
const parseNode = (line) => {
  const attr = (a) => Number(new RegExp(` ${a}="(-?[\\d.]+)"`).exec(line)[1]);
  return { line, x: attr("X"), y: attr("Y"), z: attr("Z") };
};
const nodes = new Map(); // "vmk_anim_N" -> node
for (const m of roomXml.matchAll(/<NODE [^>]*NAME="(vmk_anim_\d+)"[^>]*\/>/g)) nodes.set(m[1], parseNode(m[0]));
const spriteNode = (member) => {
  const m = new RegExp(`<NODE [^>]*SPRITE="${member}"[^>]*/>`).exec(roomXml);
  if (!m) throw new Error(`no node shows ${member}`);
  return parseNode(m[0]);
};
const screen = (n) => ({ x: n.x - n.y, y: (n.x + n.y) / 2 - n.z, depth: 10 * n.x + 10 * n.y + 5 * n.z });
const moveNode = (n, x, y) => ({ ...n, x, y, line: n.line.replace(/ X="-?[\d.]+"/, ` X="${x}"`).replace(/ Y="-?[\d.]+"/, ` Y="${y}"`) });

/** The sprites still showing on an .ani's last frame. */
function finalPose(aniText) {
  const last = Number(/LASTFRAME="(\d+)"/.exec(aniText)[1]);
  const sprites = [];
  for (const m of aniText.matchAll(/<SPRITE ([^>]*)>([\s\S]*?)<\/SPRITE>/g)) {
    const a = (k) => new RegExp(`${k}="([^"]*)"`).exec(m[1])?.[1];
    if (Number(a("ENDFRAME")) < last) continue;
    const keys = [...m[2].matchAll(/<KEYFRAME [^>]*LOCH="(-?\d+)" LOCV="(-?\d+)"/g)];
    const [, h, v] = keys[keys.length - 1] ?? [, "0", "0"];
    sprites.push({ member: a("MEMBER"), width: a("WIDTH"), height: a("HEIGHT"), loch: Number(h), locv: Number(v) });
  }
  return { last, sprites };
}

// ── Doors, by side ───────────────────────────────────────────────────────────
const doors = { l: { close: [], open: [] }, r: { close: [], open: [] } };
for (const [anim, file] of animFile) {
  const m = /_([lr])_door_[ab]_(open|close)\.ani$/.exec(file);
  if (!m) continue;
  if (!nodes.has(anim)) throw new Error(`${anim} (${file}) has no node in ${roomXmlName}`);
  doors[m[1]][m[2]].push({ anim, file, node: nodes.get(anim), pose: finalPose(textOf(file)) });
}

const header = (aniText) => aniText.slice(0, aniText.indexOf("<SCORE"));
/** One still frame: `sprites` are { member, width, height, loch, locv } relative to the anchor. */
function stillAni(template, last, sprites) {
  const regpoint = /REGPOINT="([^"]*)"/.exec(textOf(template))[1];
  const channels = sprites.map(
    (s, i) =>
      `    <CHANNEL ID="${i + 2}">\r` +
      `      <SPRITE MEMBER="${s.member}" STARTFRAME="1" ENDFRAME="${last}" WIDTH="${s.width}" HEIGHT="${s.height}">\r` +
      `        <KEYFRAME FRAME="1" LOCH="${s.loch}" LOCV="${s.locv}"/>\r` +
      `      </SPRITE>\r` +
      `    </CHANNEL>\r`,
  );
  return (
    header(textOf(template)) +
    `<SCORE VERSION="0.5">\r  <EVENTS>\r  </EVENTS>\r  <SOUNDS>\r  </SOUNDS>\r` +
    `  <ANIMATION LASTFRAME="${last}" LASTCHANNEL="150" REGPOINT="${regpoint}">\r` +
    channels.join("") +
    `  </ANIMATION>\r</SCORE>\r`
  );
}

// ── Lamps: where each sits on the stage, and the new members ─────────────────
const lampArt = lampDir ? JSON.parse(readFileSync(join(lampDir, "art.json"), "utf8")) : null;
const replacements = new Map();
const additions = [];
const keyRows = [];
const newSlots = [];
let nextId = Math.max(...cast.entries.map((e) => e.resId)) + 1;
/** Stage top-left of a lamp: its ring's node, rounded as the player rounds a sprite's loc, less the ring's reg point, plus the lamp's place in the ring. */
function lampStage(side) {
  const art = lampArt[`redlight_${side.toUpperCase()}`];
  const ringNode = spriteNode(art.ring);
  const s = screen(ringNode);
  const reg = regOf(art.ring);
  return { x: Math.round(STAGE.x + s.x) - reg.x + art.x, y: Math.round(STAGE.y + s.y) - reg.y + art.y, art };
}
if (lampArt) {
  for (const side of ["L", "R"]) {
    const red = `redlight_${side}`;
    const { ring, width, height } = lampArt[red];
    const ringSize = lampArt[ring];
    // The ring, with the lamp punched out.
    const plane = readFileSync(join(lampDir, `${ring}.alpha`));
    if (plane.length !== ringSize.width * ringSize.height) throw new Error(`${ring}.alpha is the wrong size`);
    replacements.set(child(ring, "ALFA"), packBitsAlpha(plane, ringSize.width, ringSize.height));
    // The red lamp: a new member shaped like the green one (same size and reg point).
    const green = `greenlight_${side}`;
    const template = parseCast(data(castsByName.get(green)));
    const reg = bitmapReg(template.spec);
    const greenJpeg = byId.get(child(green, "ediM"));
    const greenAlpha = byId.get(child(green, "ALFA"));
    const redAlpha = readFileSync(join(lampDir, `${red}.alpha`));
    if (redAlpha.length !== width * height) throw new Error(`${red}.alpha is the wrong size`);
    const castId = nextId++, jpegId = nextId++, alphaId = nextId++;
    additions.push(
      { resId: castId, tag: "CASt", ils: true, data: bitmapCast(template, red, width, height, reg.x, reg.y) },
      { resId: jpegId, tag: "ediM", compType: greenJpeg.compType, deflate: greenJpeg.compLen !== greenJpeg.decompLen, data: readFileSync(join(lampDir, `${red}.jpg`)) },
      { resId: alphaId, tag: "ALFA", compType: greenAlpha.compType, deflate: greenAlpha.compLen !== greenAlpha.decompLen, data: packBitsAlpha(redAlpha, width, height) },
    );
    keyRows.push([alphaId, castId, "ALFA"], [jpegId, castId, "ediM"]);
    newSlots.push(castId);
  }
}

// ── The shut poses (and the green lamps behind them) ─────────────────────────
const slots = { l: "vmk_anim_1", r: "vmk_anim_9" };
const RESERVED = new Set(["vmk_anim_1", "vmk_anim_9", "vmk_anim_10"]);
const doorAnims = new Set([...doors.l.close, ...doors.l.open, ...doors.r.close, ...doors.r.open].map((d) => d.anim));
const usedFiles = new Set();
const spare = [...doors.l.close, ...doors.l.open, ...doors.r.close, ...doors.r.open].map((d) => d.file);
const newNodes = [];
const newVars = [];
const greens = []; // { side, file, node }
for (const side of ["l", "r"]) {
  const { close } = doors[side];
  const leafClose = close.find((d) => d.pose.sprites.some((s) => /_door_closed$/i.test(s.member)));
  if (!leafClose) throw new Error(`${side}: no leaf animation (${close.map((d) => d.file)})`);
  usedFiles.add(leafClose.file);
  // A whole-pixel anchor: (x + y) odd puts the node on a half pixel.
  let anchor = leafClose.node;
  if ((anchor.x + anchor.y) % 2 !== 0) anchor = moveNode(anchor, anchor.x, anchor.y + 1);
  const at = screen(anchor);
  const sprites = close
    .flatMap((p) => p.pose.sprites.map((s) => ({ s, scr: screen(p.node) })))
    .sort((a, b) => a.scr.depth - b.scr.depth)
    .map(({ s, scr }) => ({ ...s, loch: Math.round(scr.x - at.x + s.loch), locv: Math.round(scr.y - at.y + s.locv) }));
  if (lampArt) {
    // Red, in front of the door, filling the hole in the ring while the door is shut.
    const lamp = lampStage(side);
    const red = `redlight_${side.toUpperCase()}`;
    const reg = regOf(`greenlight_${side.toUpperCase()}`);
    const loc = (n) => ({ loch: lamp.x + reg.x - (STAGE.x + screen(n).x), locv: lamp.y + reg.y - (STAGE.y + screen(n).y) });
    sprites.push({ member: red, width: lamp.art.width, height: lamp.art.height, ...loc(anchor) });
    // Green, just behind the door: one step back on both axes keeps the pixel whole.
    const greenNode = moveNode(anchor, anchor.x - 1, anchor.y - 1);
    const file = spare.find((f) => !usedFiles.has(f));
    usedFiles.add(file);
    greens.push({ side, file, node: greenNode, sprite: { member: `greenlight_${side.toUpperCase()}`, width: lamp.art.width, height: lamp.art.height, ...loc(greenNode) } });
    console.log(`${side}: lamp at stage ${lamp.x},${lamp.y} (ring ${lamp.art.ring}); green in ${file}`);
  }
  texts.set(leafClose.file, stillAni(leafClose.file, leafClose.pose.last, sprites));
  newVars.push(`${slots[side]}=${leafClose.file}`);
  newNodes.push(anchor.line.replace(/ SPRITE="[^"]*"/, "").replace(/NAME="vmk_anim_\d+"/, `NAME="${slots[side]}"`));
  console.log(`${side}: shut = ${close.map((d) => d.file).join(" + ")} -> ${leafClose.file} as ${slots[side]}; anchor ${anchor.x},${anchor.y}`);
}

// The room's other animations move out of the handler's slots, to 2, 3, 4...,
// then the green lamps take the next free ones.
const renumber = new Map();
let next = 2;
const take = () => {
  while (RESERVED.has(`vmk_anim_${next}`)) next++;
  return `vmk_anim_${next++}`;
};
for (const anim of [...animFile.keys()].filter((a) => !doorAnims.has(a))) renumber.set(anim, take());
for (const g of greens) {
  const slot = take();
  texts.set(g.file, stillAni(g.file, doors[g.side].close[0].pose.last, [g.sprite]));
  newVars.push(`${slot}=${g.file}`);
  newNodes.push(g.node.line.replace(/ SPRITE="[^"]*"/, "").replace(/NAME="vmk_anim_\d+"/, `NAME="${slot}"`));
  console.log(`  green ${g.side} -> ${slot}`);
}
if (next > 16) throw new Error("CAnimationComponent only looks at vmk_anim_1..15");
const keptVars = variables
  .split("\r")
  .filter((l) => !doorAnims.has(/^(vmk_anim_\d+)=/.exec(l.trim())?.[1]))
  .map((l) => l.replace(/^(\s*)(vmk_anim_\d+)=/, (m, ws, a) => `${ws}${renumber.get(a) ?? a}=`));
texts.set("variable.index", [...newVars, ...keptVars].join("\r"));
for (const [from, to] of renumber) console.log(`  ${from} (${animFile.get(from)}) -> ${to}`);

// Room XML: the door nodes go, the new nodes come in where the first was; the
// other animations' nodes take their new numbers.
let xml = roomXml;
for (const [from, to] of renumber) {
  const line = nodes.get(from)?.line;
  if (!line) throw new Error(`${from} has no node`);
  xml = xml.replace(line, line.replace(`NAME="${from}"`, `NAME="${to}"`));
}
let placed = false;
for (const anim of doorAnims) {
  const line = nodes.get(anim).line;
  const at = xml.indexOf(line);
  const end = xml.indexOf("\r", at);
  const lineStart = xml.lastIndexOf("\r", at) + 1;
  const indent = xml.slice(lineStart, at);
  const replacement = placed ? "" : newNodes.map((n) => indent + n).join("\r") + "\r";
  xml = xml.slice(0, lineStart) + replacement + xml.slice(end + 1);
  placed = true;
}
texts.set(roomXmlName, xml);

// ── Write the cast ───────────────────────────────────────────────────────────
for (const [name, text] of texts) {
  const id = child(name, "STXT");
  replacements.set(id, stxtBytes(text, firstRun(data(id))));
}
if (keyRows.length > 0) {
  // KEY*: little-endian, fourccs byte-reversed, preallocated (max >= used), and
  // ⚠ SORTED by owner then fourcc, or Shockwave calls the member corrupted
  // (see build-pirates-holiday-cast.mjs).
  const table = Buffer.from(key);
  const max = table.readInt32LE(4);
  const used = table.readInt32LE(8);
  if (used + keyRows.length > max) throw new Error(`KEY* holds ${max} rows; ${used} used, ${keyRows.length} more needed`);
  const rows = [];
  for (let i = 0; i < used; i++) {
    const at = 12 + i * 12;
    rows.push({ child: table.readInt32LE(at), owner: table.readInt32LE(at + 4), tag: Buffer.from(table.subarray(at + 8, at + 12)) });
  }
  for (const [c, owner, tag] of keyRows) rows.push({ child: c, owner, tag: Buffer.from(tag.split("").reverse().join(""), "latin1") });
  const fourcc = (row) => Buffer.from(row.tag).reverse().toString("latin1");
  rows.sort((a, b) => a.owner - b.owner || (fourcc(a) < fourcc(b) ? -1 : fourcc(a) > fourcc(b) ? 1 : 0));
  rows.forEach((row, i) => {
    const at = 12 + i * 12;
    table.writeInt32LE(row.child, at);
    table.writeInt32LE(row.owner, at + 4);
    row.tag.copy(table, at + 8);
  });
  table.writeInt32LE(rows.length, 8);
  replacements.set(keyEntry.resId, table);
  // CAS*: one big-endian CASt id per member slot; new members take the next slots.
  const casEntry = cast.entries.find((e) => e.tag === "CAS*");
  const extra = Buffer.alloc(newSlots.length * 4);
  newSlots.forEach((id, i) => extra.writeInt32BE(id, i * 4));
  replacements.set(casEntry.resId, Buffer.concat([data(casEntry.resId), extra]));
}
const out = write(cast, replacements, additions);
const check = read(out);
for (const [resId, bytes] of replacements) {
  const entry = check.entries.find((e) => e.resId === resId);
  if (!entry || !chunkData(check, entry).equals(bytes)) throw new Error(`chunk ${resId} did not survive a re-read`);
}
writeFileSync(outPath, out);
console.log(`${outPath}: ${out.length} bytes; ${texts.size} texts rewritten, ${newSlots.length} members added, ${replacements.size} chunks replaced`);

// ── The TS client's copy ─────────────────────────────────────────────────────
if (lampArt) {
  console.log(`  new members: re-extract ${outPath} into ${extractionDir}, then: node tools/index-bitmap-sizes.mjs ${extractionDir.split(/[\\/]/).pop()} --force`);
} else {
  const textDir = join(extractionDir, "text");
  const files = readdirSync(textDir);
  for (const [name, text] of texts) {
    const file = files.find((f) => f.endsWith(`_${name}_stxt_0.txt`) && /^\d+_/.test(f));
    if (!file) throw new Error(`no extraction text for ${name} in ${textDir}`);
    // The asset extractor writes text members as UTF-8 decoded from Mac Roman
    // (the .ani headers' "Korsum\xe4ki" comes out as "Korsum‰ki"), so do the same.
    writeFileSync(join(textDir, file), new TextDecoder("macintosh").decode(Buffer.from(text, "latin1")), "utf8");
    console.log(`  ${file}`);
  }
}
// The TS client reads a cast's texts from its texts.json bundle, not text/
// (tools/index-cast-texts.mjs; keyed by in-cast member id). Rebuild this one.
if (existsSync(join(extractionDir, "manifest.tsv"))) {
  const lines = readFileSync(join(extractionDir, "manifest.tsv"), "utf8").split(/\r?\n/).filter(Boolean);
  const head = lines[0].split("\t");
  const iId = head.indexOf("member_id");
  const iPath = head.indexOf("asset_path");
  const bundle = {};
  for (const line of lines.slice(1)) {
    const cols = line.split("\t");
    const assetPath = (cols[iPath] ?? "").trim();
    if (!assetPath.startsWith("text/")) continue;
    bundle[cols[iId]] = readFileSync(join(extractionDir, assetPath), "utf8");
  }
  writeFileSync(join(extractionDir, "texts.json"), JSON.stringify(bundle), "utf8");
  console.log(`  texts.json (${Object.keys(bundle).length} members)`);
}
