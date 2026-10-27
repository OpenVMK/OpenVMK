/**
 * Build Disney's holiday Skull Rock cast (room 138, "Skull Rock Holiday
 * Edition") from the everyday one.
 *
 *   python -I tools/shockwave/prep-cast-art.py <skull_bg ediM> <artDir> skull_bg.png skullrock_ho_1..4.png
 *   node tools/shockwave/build-pirates-holiday-cast.mjs <vmk_pirates_private.cct> <artDir> <out.cct>
 *
 * ── Why this exists ──────────────────────────────────────────────────────────
 * Room 138 loads `vmk_spaces/vmk_pirates_holiday_private`, but every copy of
 * that file in the archive is byte-identical to the everyday cave. The holiday
 * room's art survives only outside a cast: the snowy, Christmas-lit `skull_bg`
 * and four light layers `skullrock_ho_1`..`_4` (one bulb colour each), cycled
 * by `skull_ho_lights.ani`. Every other member is unchanged from the everyday
 * room, pixel for pixel.
 *
 * ── What changes ─────────────────────────────────────────────────────────────
 *   skull_bg            new JPEG + alpha (same 800x600 member, same reg point)
 *   skullrock_ho_1..4   NEW bitmap members, JPEG `ediM` + `ALFA`, reg (400, 0)
 *   skull_ho_lights.ani NEW text member: each layer for 25 frames in turn
 *   variable.index      + vmk_anim_8 = skull_ho_lights.ani
 *   room object XML     vmk_anim_8 node -> SPRITE skullrock_ho_1 at (-294, -296, 6)
 *   visual XML          + a skullrock_ho_1 sprite, which that node names
 *
 * Member names stay the everyday ones (`pirates_private.visual.xml`, …)
 * because the config keeps `room.code.138=pirates_private`; the holiday
 * Conservatory cast (room 139) is laid out the same way.
 *
 * `CAnimationComponent.activateAnimations` places each `vmk_anim_N` at the
 * object node of that NAME and hides the node's own sprite, so the visual entry
 * only has to exist; Z 10 is the gap the everyday visual leaves between
 * Canon_Left (9) and private_skullrock (11).
 *
 * ── How members are added ───────────────────────────────────────────────────
 * A member is its CASt header (in the initial load segment), its children
 * (payload chunks), a KEY* row per child and a CAS* slot. New CASt headers are
 * clones of skull_bg's (bitmaps) and private_skullrock.ani's (text) with the
 * name, rect, pitch and reg point rewritten; layouts per LibreShockwave's
 * CastMemberChunk.cpp and BitmapInfo.cpp.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { read, write, chunkData } from "./afterburner.mjs";

const [templatePath, artDir, outPath] = process.argv.slice(2);
if (!outPath) {
  console.error("usage: node build-pirates-holiday-cast.mjs <vmk_pirates_private.cct> <artDir> <out.cct>");
  process.exit(2);
}

const cast = read(readFileSync(templatePath));
const art = JSON.parse(readFileSync(join(artDir, "art.json"), "utf8"));
const byId = new Map(cast.entries.map((e) => [e.resId, e]));
const data = (resId) => chunkData(cast, byId.get(resId));

// Template chunk ids, checked by name below so a different template fails loudly.
const ID = {
  keyTable: 3,
  castTable: 116,
  skullBgCast: 65, skullBgJpeg: 147, skullBgAlpha: 148,
  aniCast: 73, // private_skullrock.ani: the text-member template
  visualText: 159, objectText: 161, indexText: 202,
};

// ── CASt ─────────────────────────────────────────────────────────────────────
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
  const { offsets, items } = infoItems(info);
  return items.toString("latin1", offsets[1] + 1, offsets[1] + 1 + items[offsets[1]]);
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
/** Bitmap spec (BitmapInfo.cpp, D12+): pitch | rect t,l,b,r | alphaThreshold | 7 | regY | regX | flags | depth | palette. */
function bitmapCast(template, name, width, height, regX, regY) {
  const spec = Buffer.from(template.spec);
  spec.writeUInt16BE(0x8000 | (width * 4), 0); // 32-bit rows, no padding
  spec.writeInt16BE(0, 2);
  spec.writeInt16BE(0, 4);
  spec.writeInt16BE(height, 6);
  spec.writeInt16BE(width, 8);
  spec.writeInt16BE(regY, 18);
  spec.writeInt16BE(regX, 20);
  return castBytes({ type: template.type, info: renameInfo(template.info, name), spec });
}

// ── STXT ─────────────────────────────────────────────────────────────────────
/** headerLen 12 | textLen | runsLen | text | runs. Lines end in CR. */
function stxtText(buf) {
  return buf.toString("latin1", buf.readInt32BE(0), buf.readInt32BE(0) + buf.readInt32BE(4));
}
function stxtBytes(text, runs) {
  const head = Buffer.alloc(12);
  head.writeInt32BE(12, 0);
  head.writeInt32BE(text.length, 4);
  head.writeInt32BE(runs.length, 8);
  return Buffer.concat([head, Buffer.from(text, "latin1"), runs]);
}
const stxtRuns = (buf) => buf.subarray(buf.readInt32BE(0) + buf.readInt32BE(4));
function replaceOnce(text, from, to, what) {
  const n = text.split(from).length - 1;
  if (n !== 1) throw new Error(`${what}: expected one "${from.trim()}", found ${n}`);
  return text.replace(from, to);
}

// ── Alpha plane: PackBits per row, rows padded to an even width ──────────────
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

// ── Sanity: the template is the everyday Skull Rock cast ─────────────────────
const skullBg = parseCast(data(ID.skullBgCast));
const aniTemplate = parseCast(data(ID.aniCast));
for (const [id, want] of [[ID.skullBgCast, "skull_bg"], [ID.aniCast, "private_skullrock.ani"]]) {
  const got = memberName(parseCast(data(id)).info);
  if (got !== want) throw new Error(`template CASt ${id} is "${got}", expected "${want}"`);
}
if (!stxtText(data(ID.indexText)).includes("vmk_anim_7 = twinkle_east")) throw new Error("variable.index is not the everyday one");

const replacements = new Map();
const additions = [];
const keyRows = [];
const newSlots = [];
let nextId = Math.max(...cast.entries.map((e) => e.resId)) + 1;
const alpha = (name) => {
  const { width, height } = art[name];
  const plane = readFileSync(join(artDir, `${name}.alpha`));
  if (plane.length !== width * height) throw new Error(`${name}.alpha is ${plane.length} bytes, not ${width}x${height}`);
  return packBitsAlpha(plane, width, height);
};

// skull_bg: same member, new pixels.
if (art.skull_bg.width !== 800 || art.skull_bg.height !== 600) throw new Error("skull_bg must stay 800x600");
replacements.set(ID.skullBgJpeg, readFileSync(join(artDir, "skull_bg.jpg")));
replacements.set(ID.skullBgAlpha, alpha("skull_bg"));

// The four light layers.
for (let n = 1; n <= 4; n++) {
  const name = `skullrock_ho_${n}`;
  const { width, height } = art[name];
  const castId = nextId++, jpegId = nextId++, alphaId = nextId++;
  additions.push(
    { resId: castId, tag: "CASt", ils: true, data: bitmapCast(skullBg, name, width, height, 400, 0) },
    { resId: jpegId, tag: "ediM", compType: 1, data: readFileSync(join(artDir, `${name}.jpg`)) },
    { resId: alphaId, tag: "ALFA", compType: 0, deflate: true, data: alpha(name) },
  );
  keyRows.push([alphaId, castId, "ALFA"], [jpegId, castId, "ediM"]);
  newSlots.push(castId);
}

// skull_ho_lights.ani: four layers, 25 frames each, on channel 2.
const lights = [
  ["skullrock_ho_1", 1, 25], ["skullrock_ho_2", 26, 50], ["skullrock_ho_3", 51, 75], ["skullrock_ho_4", 76, 100],
];
const aniText = [
  '<?xml version="1.0"?>',
  "<SCORE>",
  "  <EVENTS></EVENTS>",
  "  <SOUNDS></SOUNDS>",
  '  <ANIMATION LASTFRAME="100" LASTCHANNEL="1000" REGPOINT="point(400, 300)">',
  '    <CHANNEL ID="2">',
  ...lights.flatMap(([member, start, end]) => [
    `      <SPRITE MEMBER="${member}" STARTFRAME="${start}" ENDFRAME="${end}" WIDTH="${art[member].width}" HEIGHT="${art[member].height}" INK="0">`,
    `        <KEYFRAME FRAME="${start}" LOCH="0" LOCV="0"/>`,
    "      </SPRITE>",
  ]),
  "    </CHANNEL>",
  "  </ANIMATION>",
  "</SCORE>",
  "",
].join("\r");
const simpleRuns = stxtRuns(data(ID.indexText)); // one plain run, as variable.index has
{
  const castId = nextId++, textId = nextId++;
  additions.push(
    {
      resId: castId,
      tag: "CASt",
      ils: true,
      data: castBytes({ ...aniTemplate, info: renameInfo(aniTemplate.info, "skull_ho_lights.ani") }),
    },
    { resId: textId, tag: "STXT", compType: 0, deflate: true, data: stxtBytes(aniText, simpleRuns) },
  );
  keyRows.push([textId, castId, "STXT"]);
  newSlots.push(castId);
}

// variable.index, visual, room object.
{
  const buf = data(ID.indexText);
  const text = replaceOnce(stxtText(buf), "vmk_anim_7 = twinkle_east\r", "vmk_anim_7 = twinkle_east\rvmk_anim_8 = skull_ho_lights.ani\r", "variable.index");
  replacements.set(ID.indexText, stxtBytes(text, stxtRuns(buf)));
}
{
  const buf = data(ID.visualText);
  const canon = '\t<SPRITE ID="Canon_Left" MEMBER="Canon_Left" X="400" Y="300" Z="9" W="95" H="113" />\r';
  const lightsSprite = `\t<SPRITE ID="skullrock_ho_1" MEMBER="skullrock_ho_1" X="400" Y="0" Z="10" W="${art.skullrock_ho_1.width}" H="${art.skullrock_ho_1.height}" />\r`;
  replacements.set(ID.visualText, stxtBytes(replaceOnce(stxtText(buf), canon, canon + lightsSprite, "visual"), stxtRuns(buf)));
}
{
  const buf = data(ID.objectText);
  const node = '<NODE CLASS="default" HGT="0" NAME="vmk_anim_8" SPRITE="twinkle_east" X="5" XD="0" Y="275" YD="0" Z="0" ZD="0" />';
  const holiday = '<NODE CLASS="default" HGT="0" NAME="vmk_anim_8" SPRITE="skullrock_ho_1" X="-294" XD="0" Y="-296" YD="0" Z="6" ZD="0" />';
  replacements.set(ID.objectText, stxtBytes(replaceOnce(stxtText(buf), node, holiday, "room object"), stxtRuns(buf)));
}

// KEY*: little-endian, fourccs byte-reversed; the table is preallocated (max >= used).
//
// ⚠ The rows must stay SORTED by owner id, then fourcc (ASCII: ALFA < Thum <
// ediM; the cast-level rows under owner 1024 come last). Every Disney cast is
// laid out that way, and Shockwave depends on it: with the new rows appended
// after the 1024 block, the real player stopped on "member 41 of PLAYER-CAST 41
// is corrupted" while LibreShockwave, which scans the table, read it fine.
{
  const key = Buffer.from(data(ID.keyTable));
  const max = key.readInt32LE(4);
  const used = key.readInt32LE(8);
  if (used + keyRows.length > max) throw new Error(`KEY* holds ${max} rows; ${used} used, ${keyRows.length} more needed`);
  const rows = [];
  for (let i = 0; i < used; i++) {
    const at = 12 + i * 12;
    // A copy, not a view: the sorted rows are written back over this buffer.
    rows.push({ child: key.readInt32LE(at), owner: key.readInt32LE(at + 4), tag: Buffer.from(key.subarray(at + 8, at + 12)) });
  }
  for (const [child, owner, tag] of keyRows) {
    rows.push({ child, owner, tag: Buffer.from(tag.split("").reverse().join(""), "latin1") });
  }
  const fourcc = (row) => Buffer.from(row.tag).reverse().toString("latin1");
  rows.sort((a, b) => a.owner - b.owner || (fourcc(a) < fourcc(b) ? -1 : fourcc(a) > fourcc(b) ? 1 : 0));
  rows.forEach((row, i) => {
    const at = 12 + i * 12;
    key.writeInt32LE(row.child, at);
    key.writeInt32LE(row.owner, at + 4);
    row.tag.copy(key, at + 8);
  });
  key.writeInt32LE(rows.length, 8);
  replacements.set(ID.keyTable, key);
}

// CAS*: one big-endian CASt id per member slot; new members take the next slots.
{
  const slots = data(ID.castTable);
  const extra = Buffer.alloc(newSlots.length * 4);
  newSlots.forEach((id, i) => extra.writeInt32BE(id, i * 4));
  replacements.set(ID.castTable, Buffer.concat([slots, extra]));
}

const out = write(cast, replacements, additions);
writeFileSync(outPath, out);
console.log(`${outPath}: ${out.length} bytes; ${newSlots.length} members added (ids ${newSlots.join(", ")}), ${replacements.size} chunks replaced`);
