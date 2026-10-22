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
// Exit DESTINATIONS are not in the casts: nothing in the room data names
// another room. Routing is server-owned (assets/room-exits.json, built by
// tools/build-room-exits.mjs); this only says WHERE the doors are. <LINKS> is
// not always empty: 31 rooms use it for the stairs between floors.
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
  // ⚠ TILE COORDINATES ARE RELATIVE TO THEIR FLOOR. Every tile sits inside a
  // `<NODE CLASS="floor" X= Y= Z=>`, and the client places it at floor + tile
  // (`CRoomAnchor.GetAbsPos = GetOwner().GetAbsPos() + GetRelPos()`). Reading the
  // tile alone stacks every floor of a room onto one plane: the Haunted Mansion
  // attic's upstairs (floor Z=144) and downstairs (Z=0) both read `Z="0"` from
  // near the same origin, which gave them 2729 false neighbours, so the server
  // walked people straight between levels. Everything below is ABSOLUTE.
  //
  // Floors connect ONLY through `<LINKS>` (Disney's stairs: tile pairs that sit
  // exactly one step apart in absolute space). Multi-floor rooms without links
  // (tom_sawyer, thundermountain, tomorrowland_hub, the attic) sit 50-210 apart
  // in height; you changed level there through an exit, not on foot.
  const floors = [];
  const floorOf = new Map();
  const names = {};
  const links = [];
  const stack = [];
  let inLinks = false;
  let link = null;
  for (const m of xml.matchAll(/<(\/?)(NODE|LINKS)\b([^>]*?)(\/?)>/g)) {
    const [, close, tag, a, self] = m;
    if (tag === "LINKS") { inLinks = !close && !self; continue; }
    if (close) {
      const done = stack.pop();
      if (done?.link && link) { if (link.length === 2) links.push(link); link = null; }
      continue;
    }
    const cls = /CLASS="([^"]+)"/.exec(a)?.[1];
    const frame = {};
    if (!self) stack.push(frame);
    if (inLinks) {
      if (cls === "link") { frame.link = true; link = []; }
      else if (cls === "tile" && link) link.push(Number(/REF="(-?\d+)"/.exec(a)?.[1]));
      continue;
    }
    if (cls === "floor") {
      frame.floor = {
        index: floors.length,
        name: /\sNAME="([^"]*)"/.exec(a)?.[1] ?? "",
        x: Number(/\sX="(-?\d+)"/.exec(a)?.[1] ?? 0),
        y: Number(/\sY="(-?\d+)"/.exec(a)?.[1] ?? 0),
        z: Number(/\sZ="(-?\d+)"/.exec(a)?.[1] ?? 0),
      };
      floors.push(frame.floor);
      continue;
    }
    if (cls !== "tile" && cls !== "exit") continue;
    const ref = /REF="(-?\d+)"/.exec(a)?.[1];
    if (ref == null) continue;
    const floor = [...stack].reverse().find((f) => f.floor)?.floor;
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
      x: Number(x) + (floor?.x ?? 0),
      y: Number(y) + (floor?.y ?? 0),
      z: Number(/\sZ="(-?\d+)"/.exec(a)?.[1] ?? 0) + (floor?.z ?? 0),
    };
    floorOf.set(node.ref, floor?.index ?? -1);
    // Seats (`sit10`, `sit_10_dir_5`) and special exits (`open_navigator`,
    // `teleport_shop`) live on NAME, so keep every non-empty one.
    const tileName = /\sNAME="([^"]+)"/.exec(a)?.[1];
    if (tileName) names[node.ref] = tileName;
    // ⚠ An exit tile is WALKABLE, and belongs in BOTH lists.
    //
    // The client treats it as ordinary floor — every `GetTheTileStack` accepts
    // "tile" or "exit" or "teleport" or "queue" or "sit" — so it will happily
    // walk you onto a doorway. Keeping exits out of `tiles` meant the SERVER
    // believed those tiles did not exist: `findPath` refused to route to them
    // and players stopped dead at every threshold. The Esplanade alone has 18.
    //
    // `exits` is still populated separately, because doorways also need their
    // ID grouping for spawn placement — a door is a tile AND a door, not a
    // third thing.
    tiles.push(node);
    if (cls === "exit") exits.push({ ...node, id: Number(/ID="(-?\d+)"/.exec(a)?.[1] ?? -1) });
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
    // Parallel to `tiles`: the floor index each tile belongs to (-1 = none).
    floorOf: tiles.map((t) => floorOf.get(t.ref) ?? -1),
    floors: floors.map(({ name, x, y, z }) => ({ name, x, y, z })),
    // Walkable steps between floors, [refA, refB] (both ways).
    links: links.filter(([p, q]) => tileRefs.has(p) && tileRefs.has(q)),
    names,
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

const rooms = {};

// ⚠ LOAD THE MEMBER THE CLIENT LOADS. A room cast often carries several layouts
// under the same ROOM NAME — `room.backup_tom_sawyer.object.xml`,
// `room.monorail_train.object_copy.xml` — and their REFs differ by a few. The
// client never guesses: `CRoomComponent._PrepareRoom` opens
// `project.<room>.xml` and loads the member its `DOC=` names. Picking "most
// tiles" instead chose the backup for tom_sawyer and the copy for
// monorail_train, so every seat and route there was a few tiles off.
//
// The raw .cct scan below cannot see member names, so the client's own
// extractions (`client/assets/casts/<cast>/text/NNNNN_<member>_stxt_0.txt`,
// what the TS client actually serves) are read first, and the .cct scan only
// fills in rooms they do not cover.
const EXTRACTED = join(process.cwd(), "client", "assets", "casts");
const fromProject = new Set();
/**
 * Seasonal builds of a room, by extraction folder (`vmk_hub2.xmas`,
 * `vmk_musical_mainstreet_penny_halloween`). Kept apart from `rooms` so they
 * never shadow the everyday layout. Only the ones whose tiles DIFFER survive
 * (see below). The game server swaps one in when `VMK_SEASON` serves that
 * cast (seasons.ts / mus-server.ts `applySeasonalLayouts`).
 */
const variants = {};
const isSeasonalCast = (cast) => /\.(xmas|halloween)$|_(xmas|halloween)$/i.test(cast);
for (const cast of (() => { try { return readdirSync(EXTRACTED); } catch { return []; } })()) {
  if (/WRONG|\.old$|\.bak$/i.test(cast)) continue;
  const dir = join(EXTRACTED, cast, "text");
  let files;
  try { files = readdirSync(dir); } catch { continue; }
  const byMember = new Map(files.map((f) => [/^\d+_(.+)_stxt_\d+\.txt$/.exec(f)?.[1], f]));
  for (const f of files) {
    const p = /^\d+_project\.(.+)\.xml_stxt_\d+\.txt$/.exec(f);
    if (!p || p[1].startsWith("backup_")) continue;
    const doc = /<PROJECT\s[^>]*DOC="([^"]+)"/.exec(readFileSync(join(dir, f), "latin1"))?.[1];
    const member = doc && byMember.get(doc);
    if (!member) continue;
    const geo = parseRoomXml(readFileSync(join(dir, member), "latin1"));
    if (!geo || geo.tileCount === 0) continue;
    if (isSeasonalCast(cast)) {
      variants[cast] = { ...geo, source: `${cast}/${member}` };
      continue;
    }
    // One room can live in several casts (seasonal copies, numeric aliases);
    // the cast named after the room is the one the room code loads.
    const own = cast === `vmk_${geo.name}` || cast === geo.name;
    const prev = rooms[geo.name];
    if (!prev || (own && !prev.own) || (own === prev.own && geo.tileCount > prev.geo.tileCount)) {
      rooms[geo.name] = { geo, own, source: `${cast}/${member}` };
    }
  }
}
for (const [name, entry] of Object.entries(rooms)) {
  rooms[name] = { ...entry.geo, source: entry.source };
  fromProject.add(name);
}

let scanned = 0, withXml = 0, failed = 0;
// ⚠ Patched casts are scanned TOO, not instead. `assets/patches` shadows the
// archive by relative path at serve time, so geometry must see the same file the
// client will get. The archive's `vmk_nautilus_private.cct` is a 46 KB stub with
// no room XML at all (the real cast is ~429 KB) — which is exactly why that room
// rendered black and had no tiles. Where both define the same room NAME, the
// larger tile count wins below, so a fuller patch takes precedence naturally.
const SCAN_ROOTS = [
  join(SHOCKWAVE, "vmk_spaces"),
  join(process.cwd(), "assets", "patches", "vmk_spaces"),
];
for (const file of SCAN_ROOTS.flatMap((r) => [...castFiles(r)])) {
  scanned++;
  let parsed;
  try { parsed = parseAfterburner(readFileSync(file)); } catch { failed++; continue; }
  if (!parsed) continue;
  for (const info of parsed.res) {
    if (info.tag !== "TXTS" && info.tag !== "STXT") continue; // fourCC is reversed on disk
    const text = stxtText(parsed.chunkData(info));
    if (!text || !text.includes("<ROOM ")) continue;
    const geo = parseRoomXml(text);
    if (!geo) continue;
    withXml++;
    if (fromProject.has(geo.name)) continue; // the project doc already decided
    // No project doc seen for this room: most tiles is the best remaining guess.
    if (!rooms[geo.name] || geo.tileCount > rooms[geo.name].tileCount) rooms[geo.name] = geo;
  }
}

// A seasonal build laid out exactly like the everyday room needs nothing of its
// own: the everyday geometry, exits and seats already fit it.
for (const [cast, geo] of Object.entries(variants)) {
  const everyday = rooms[geo.name];
  if (everyday && JSON.stringify(everyday.tiles) === JSON.stringify(geo.tiles)) delete variants[cast];
}
if (Object.keys(variants).length > 0) {
  console.log(`seasonal layouts that differ from the everyday room: ${Object.keys(variants).join(", ")}`);
}

const list = Object.values(rooms).sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), rooms, variants }, null, 2));
console.log(`scanned ${scanned} casts, ${withXml} room XML member(s), ${failed} unreadable`);
console.log(`distinct rooms: ${list.length} (${fromProject.size} via project doc, ${list.length - fromProject.size} by .cct scan)`);
console.log(`wrote ${OUT}\n`);
for (const r of list.slice(0, 12)) {
  console.log(
    `  ${r.name.padEnd(30)} tiles=${String(r.tileCount).padStart(4)} ` +
      `refs ${r.tileRefs.min}..${r.tileRefs.max}  doors=${String(r.doors.length).padStart(2)}  spawn=${r.spawnTile}`,
  );
}
if (list.length > 12) console.log(`  … and ${list.length - 12} more`);
