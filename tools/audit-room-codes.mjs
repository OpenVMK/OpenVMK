// Extract tile/exit geometry for every VMK room, straight out of the casts.
//
// Each room cast carries a `room.<name>.object.xml` text member describing the
// whole layout:
//
//   <ROOM NAME="vmk_esplanade" TILESIZE="24" VERSION="167">
//     <NODE CLASS="tile" REF="0"   X="168" Y="24"  .../>   the walkable grid
//     <NODE CLASS="exit" ID="12" REF="39" X="432" Y="72" /> doorway tiles
//
// `REF` is exactly the tile index `2582 _CreateAvatars` / `2583 _StatusPulse`
// want, so this gives the server real spawn tiles instead of a guess.
//
// ⚠ Exit DESTINATIONS are not in the casts — every room's <LINKS> is empty, and
// nothing in the room data names another room. Routing is server-owned; this
// only tells you WHERE the doors are, grouped into doorways by their ID.
//
// Reads the afterburner container directly rather than shelling out to the asset
// extractor, so it never inflates the bitmaps (a full dump would be ~GBs).
//
//   node tools/extract-room-geometry.mjs [outfile.json]
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import zlib from "node:zlib";

const SHOCKWAVE = process.env.VMK_SHOCKWAVE ?? join(import.meta.dirname, "..", "shockwave");
const OUT = process.argv[2] ?? "assets/room-geometry.json";

// ---------------------------------------------------------------- container --
function parseAfterburner(buf) {
  if (buf.toString("latin1", 0, 4) !== "XFIR") return null;
  const type = buf.toString("latin1", 8, 12);
  if (type !== "CDGF" && type !== "MDGF") return null; // FGDC / FGDM reversed

  let p = 12;
  const fourcc = () => { const s = buf.toString("latin1", p, p + 4); p += 4; return s; };
  const varint = () => {
    let v = 0;
    for (;;) { const x = buf[p++]; v = (v << 7) | (x & 0x7f); if (!(x & 0x80)) return v; }
  };

  fourcc(); { const n = varint(); p += n; }        // Fver
  fourcc(); { const n = varint(); p += n; }        // Fcdr
  fourcc();                                        // ABMP
  const abmpLen = varint();
  const abmpEnd = p + abmpLen;
  varint(); varint();
  const abmp = zlib.inflateSync(buf.subarray(p, abmpEnd));
  p = abmpEnd;

  let q = 0;
  const rv = () => {
    let v = 0;
    for (;;) { const x = abmp[q++]; v = (v << 7) | (x & 0x7f); if (!(x & 0x80)) return v; }
  };
  rv(); rv();
  const count = rv();
  const res = [];
  for (let i = 0; i < count; i++) {
    const id = rv(), off = rv(), comp = rv(), uncomp = rv(), ctype = rv();
    const tag = abmp.toString("latin1", q, q + 4); q += 4;
    res.push({ id, off, comp, uncomp, ctype, tag });
  }

  fourcc(); varint();                              // FGEI
  const fgeiBody = p;

  // Chunks packed inside the ILS blob are stored uncompressed, back to back,
  // each preceded by its varint id. Everything else sits in FGEI at its offset.
  const ils = res.find((r) => r.id === 2);
  const packed = new Map();
  if (ils) {
    try {
      const data = zlib.inflateSync(buf.subarray(fgeiBody, fgeiBody + ils.comp));
      let r = 0;
      const irv = () => {
        let v = 0;
        for (;;) { const x = data[r++]; v = (v << 7) | (x & 0x7f); if (!(x & 0x80)) return v; }
      };
      while (r < data.length) {
        const id = irv();
        const info = res.find((x) => x.id === id);
        if (!info) break;
        packed.set(id, data.subarray(r, r + info.comp));
        r += info.comp;
      }
    } catch { /* no usable ILS */ }
  }

  const chunkData = (info) => {
    if (packed.has(info.id)) return packed.get(info.id);
    if (info.off < 0) return null;
    try {
      return zlib.inflateSync(buf.subarray(fgeiBody + info.off, fgeiBody + info.off + info.comp));
    } catch {
      return null;
    }
  };
  return { res, chunkData };
}

// STXT payload: i32 headerLen | i32 textLen | (headerLen-8 more) | text | runs
function stxtText(payload) {
  if (!payload || payload.length < 12) return null;
  const headerLen = payload.readUInt32BE(0);
  const textLen = payload.readUInt32BE(4);
  if (headerLen < 8 || headerLen + textLen > payload.length) return null;
  return payload.toString("latin1", headerLen, headerLen + textLen);
}

// -------------------------------------------------------------------- parse --
function parseRoomXml(xml) {
  const room = /<ROOM\s+NAME="([^"]+)"[^>]*TILESIZE="(\d+)"/.exec(xml);
  if (!room) return null;
  const tiles = [];
  const exits = [];
  for (const m of xml.matchAll(/<NODE\b([^>]*)\/>/g)) {
    const a = m[1];
    const cls = /CLASS="([^"]+)"/.exec(a)?.[1];
    if (cls !== "tile" && cls !== "exit") continue;
    const ref = /REF="(-?\d+)"/.exec(a)?.[1];
    if (ref == null) continue;
    // ⚠ Z IS NOT OPTIONAL. Multi-level rooms put several tiles on the SAME
    // (X, Y) at different heights — Space Mountain has 222 tiles at Z=208 and
    // 114 at Z=294, Haunted Mansion has a floor per level. Keying tiles by
    // (x, y) alone silently collapses them onto one ref, which strands every
    // duplicate and shatters the room into hundreds of tiny islands.
    const x = /\sX="(-?\d+)"/.exec(a)?.[1];
    const y = /\sY="(-?\d+)"/.exec(a)?.[1];
    // ⚠ A TILE CAN APPEAR TWICE. Later in the file, nested inside a parent
    // node, tiles are listed again as bare back-references —
    // `<NODE CLASS="tile" REF="8" />` with no coordinates at all. Defaulting
    // those to (0,0,0) redefines a real tile as sitting at the origin, which
    // then looks adjacent to everything near it: that is where the remaining
    // cross-room jumps came from. A definition is a node that carries a
    // position; anything else is a mention.
    if (x == null || y == null) continue;
    const node = {
      ref: Number(ref),
      x: Number(x),
      y: Number(y),
      z: Number(/\sZ="(-?\d+)"/.exec(a)?.[1] ?? 0),
    };
    if (cls === "tile") tiles.push(node);
    else exits.push({ ...node, id: Number(/ID="(-?\d+)"/.exec(a)?.[1] ?? -1) });
  }
  // Exits sharing an ID are one doorway; the middle tile is the natural arrival.
  const byDoor = new Map();
  for (const e of exits) {
    if (!byDoor.has(e.id)) byDoor.set(e.id, []);
    byDoor.get(e.id).push(e);
  }
  const doors = [...byDoor.entries()]
    .map(([id, tilesIn]) => {
      const sorted = [...tilesIn].sort((a, b) => a.ref - b.ref);
      return { id, tiles: sorted.map((t) => t.ref), middle: sorted[Math.floor(sorted.length / 2)].ref };
    })
    .sort((a, b) => a.id - b.id);

  // ⚠ An exit REF is NOT guaranteed to be a tile. `animal_private` has tiles
  // 0..203 but a doorway whose middle is 204 — sending that as a spawn hits
  // "Referred tile not found" in `_CreateAvatars` and the avatar never appears.
  // Only ever hand back a ref that is genuinely in the tile set; otherwise fall
  // back to the tile physically nearest the door, then to the first tile.
  const tileRefs = new Set(tiles.map((t) => t.ref));
  const nearestTile = (node) => {
    let best = null;
    let bestD = Infinity;
    for (const t of tiles) {
      const d = (t.x - node.x) ** 2 + (t.y - node.y) ** 2;
      if (d < bestD) { bestD = d; best = t; }
    }
    return best?.ref ?? null;
  };
  let spawnTile = null;
  let spawnFrom = "none";
  for (const door of doors) {
    if (tileRefs.has(door.middle)) { spawnTile = door.middle; spawnFrom = `door ${door.id}`; break; }
  }
  if (spawnTile === null && doors.length) {
    const door = doors[0];
    const node = exits.find((e) => e.ref === door.middle);
    const near = node ? nearestTile(node) : null;
    if (near !== null) { spawnTile = near; spawnFrom = `nearest tile to door ${door.id}`; }
  }
  if (spawnTile === null) { spawnTile = tiles[0]?.ref ?? 0; spawnFrom = "first tile"; }

  return {
    name: room[1],
    tileSize: Number(room[2]),
    tileCount: tiles.length,
    tileRefs: { min: Math.min(...tiles.map((t) => t.ref)), max: Math.max(...tiles.map((t) => t.ref)) },
    doors,
    spawnTile,
    spawnFrom,
    // Per-tile coordinates. Needed for PATHFINDING: `WalkToTile` is a single-hop
    // animation with no route logic, so the server must walk a player one
    // adjacent tile at a time. Stored as a flat [ref,x,y,z, ref,x,y,z, ...]
    // list — an array of objects roughly triples the file size for no gain.
    tiles: tiles.flatMap((t) => [t.ref, t.x, t.y, t.z]),
  };
}

// --------------------------------------------------------------------- walk --
function* castFiles(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    const full = join(dir, name);
    let st;
    try { st = statSync(full); } catch { continue; }
    if (st.isDirectory()) { yield* castFiles(full); continue; }
    if (name.toLowerCase().endsWith(".cct")) yield full;
  }
}

// ---------------------------------------------------------------- audit --
//
// `room.code.<n>` is the name the CLIENT uses to find its room member
// (`room.<name>.object.xml`). If no cast listed for that code declares a
// matching <ROOM NAME>, the client has nothing to build and the room renders
// BLACK — with every cast fetched and no error. That is what made the checkers
// room (1109) look broken for so long: it was named `checkers_game_room` while
// its cast declares `vmk_checkers`.
//
// This reports every code where that invariant fails, alongside the names its
// casts DO declare, so the fix is usually obvious.
// Paths are relative to the repo root, matching extract-room-geometry.mjs.
const ROOT = process.cwd();
const VARS = join(ROOT, "assets", "external_variables_casts.txt");
const text = readFileSync(VARS, "latin1");

const codeName = new Map();
const codeCasts = new Map();
for (const line of text.split(/\r?\n/)) {
  const c = /^room\.code\.(\d+)=(.*)$/.exec(line);
  if (c) codeName.set(Number(c[1]), c[2].trim());
  const k = /^room\.cast\.(\d+)(?:\.\d+)?=(.*)$/.exec(line);
  if (k) {
    const id = Number(k[1]);
    if (!codeCasts.has(id)) codeCasts.set(id, []);
    codeCasts.get(id).push(k[2].trim());
  }
}

// Every room NAME each space cast declares, keyed by the cast's relative path.
const declared = new Map();
function namesIn(rel) {
  if (declared.has(rel)) return declared.get(rel);
  const out = new Set();
  // ⚠ Exact path FIRST, then basename. Cast references are not always literal
  // paths on disk: holiday variants live under `vmk_spaces/vmk_holiday_overlays/`
  // while the file sits in `vmk_spaces/`, and the asset server falls back to the
  // basename for exactly this reason. Without the same fallback this audit
  // reports working rooms (the Esplanade among them) as broken.
  const candidates = [];
  for (const root of [SHOCKWAVE, join(ROOT, "assets", "patches"), join(ROOT, "assets", "overlay")]) {
    candidates.push(join(root, ...rel.split("/")) + ".cct");
    const base = rel.split("/").pop();
    for (const sub of ["vmk_spaces", "."]) candidates.push(join(root, sub, base + ".cct"));
  }
  for (const file of candidates) {
    let parsed;
    try { parsed = parseAfterburner(readFileSync(file)); } catch { continue; }
    if (!parsed) continue;
    for (const info of parsed.res) {
      if (info.tag !== "TXTS" && info.tag !== "STXT") continue;
      const t = stxtText(parsed.chunkData(info));
      if (!t || !t.includes("<ROOM ")) continue;
      const m = /<ROOM\s+NAME="([^"]+)"/.exec(t);
      if (m) out.add(m[1]);
    }
  }
  declared.set(rel, out);
  return out;
}

let ok = 0;
const broken = [];
const noSpaceCast = [];
for (const [id, name] of [...codeName].sort((a, b) => a[0] - b[0])) {
  // ⚠ Scan EVERY cast, not just vmk_spaces/. A room definition can live in a
  // minigame cast — Jungle Cruise (1102) declares its room outside vmk_spaces —
  // so filtering by folder reports working rooms as broken.
  const spaces = codeCasts.get(id) ?? [];
  if (spaces.length === 0) { noSpaceCast.push([id, name]); continue; }
  const all = new Set();
  for (const s of spaces) for (const n of namesIn(s)) all.add(n);
  if (all.size === 0) { broken.push([id, name, "(casts declare no room at all)"]); continue; }
  if (all.has(name)) { ok++; continue; }
  broken.push([id, name, [...all].join(", ")]);
}

console.log(`codes: ${codeName.size}   name matches a declared room: ${ok}`);
console.log(`MISMATCHED: ${broken.length}      no vmk_spaces cast: ${noSpaceCast.length}\n`);
if (broken.length) {
  console.log("code    room.code value              casts actually declare");
  console.log("-----   --------------------------   ----------------------");
  for (const [id, name, decl] of broken) {
    console.log(`${String(id).padStart(5)}   ${name.padEnd(28)} ${decl}`);
  }
}
if (noSpaceCast.length) {
  console.log(`\nNo vmk_spaces cast (minigame lobbies etc): ${noSpaceCast.map(([i]) => i).join(", ")}`);
}