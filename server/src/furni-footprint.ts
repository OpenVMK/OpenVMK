/**
 * Furniture footprints: which TILES an item covers, and what each covered tile
 * does — block walking, seat you, or raise you.
 *
 * The furnimap describes an item as blocks, per facing:
 *
 *   <ITEM CODE="24" TILESIZE="24">
 *     <DIR NUM="1">
 *       <BLK X="0" Y="0" WLK="1" STK="1" HGT="1" .../>
 *       <BLK X="1" Y="0" WLK="1" SIT="1" HGT="0"/>   <- the seat
 *
 * X/Y are tile offsets from the item's anchor, in the item's own frame, and the
 * whole set is repeated per `<DIR NUM>` — so a rotated couch covers different
 * tiles and its seats move with it. Resolving that is what makes sitting,
 * collision and stacking work; treating an item as "one tile, sittable or not"
 * cannot express a seat that is offset from the anchor, which is why Tom
 * Sawyer's Tee Pee (seat at X=1) never seated anyone.
 *
 * ⚠ SIT is not a boolean. Observed values are 1 (924 blocks), 0 (42) and 17
 * (4). Only a non-zero value is treated as a seat here; a `SIT="0"` block is an
 * explicit "not a seat", and counting it was a bug in the earlier item-level
 * heuristic this replaces.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { downloadFile } from "./paths.js";

const here = dirname(fileURLToPath(import.meta.url));

export interface FurniBlock {
  /** Tile offsets from the anchor, in the item's own frame. */
  x: number;
  y: number;
  /** 1 if an avatar may stand here. Absent means not walkable. */
  walk: boolean;
  /** Non-zero seats you. See the note above on SIT="0". */
  sit: boolean;
  /** Stack height; drives what level an avatar sits or stands at. */
  height: number;
  /**
   * `STK="1"` — another item may be stacked on top of this block.
   *
   * Carried through by `CRoomFactorElement._ComposeBlocks` alongside WLK, SIT
   * and HGT, so it is a real per-block property and not an item-level one.
   */
  stack: boolean;
  /**
   * `ACT="1"` — a teleporter's PAD, the one block that sends you (the client
   * makes it a `teleport` tile). A multi-tile teleporter such as the Tea Cup is
   * 3x3 with a solid rim, this pad in the middle and one walkable doorway.
   */
  act: boolean;
}

/** dir number -> the blocks that facing occupies. */
type DirBlocks = Map<number, FurniBlock[]>;

interface FurniItem {
  dirs: DirBlocks;
  /**
   * The item's own TILESIZE attribute, or 0 when the entry omits it.
   *
   * ⚠ 0 is not a harmless default — see `previewable`. Only 236 of the 1,089
   * entries across both furnimap pages carry TILESIZE at all.
   */
  tileSize: number;
  /** Facings whose blocks carry `<SPR GFX=…>` children, i.e. have art. */
  dirsWithArt: Set<number>;
  /**
   * Does DIR 5 carry a sprite with `BLD` > 0?
   *
   * ⚠ This is the shop's real crash predicate. In
   * `CRoomFurniThumbRenderer._RenderFurniPreview` EVERY blit sits inside
   * `if t_iBld then`, where `t_iBld = integer(t_rSpr.param["BLD"])`. Almost no
   * furnimap sprite carries BLD, so almost nothing ever composites — which is
   * why the vast majority of items preview harmlessly. The handful that do
   * carry it run the full path, including:
   *
   *   t_rAlp = t_rImg.extractAlpha()
   *   if not ilk(t_rAlp, #image) then t_rAlp = image(1, 1, 8, #grayscale)
   *   t_rAlpha.copyPixels(t_rAlp, t_rcImg + t_rcOff, t_rcImg, [#ink: 39, …])
   *
   * — reading a full-size source rect out of a 1×1 fallback whenever the
   * member has no alpha channel. That raises a Lingo error, and the client's
   * global `error()` handler is the "We're Sorry! VMK has crashed and you'll
   * need to login again" dialog, which drops the connection.
   *
   * Exactly four catalogue items qualify, and in Shrunken Ned's the only grid
   * page holding one is page 2 — the page reported as crashing consistently.
   */
  compositesDir5: boolean;
  /**
   * How many states this item cycles through when its state button is pressed.
   * 1 means it is not interactive.
   *
   * ⚠ Do NOT read this from the `STATES` attribute alone. `STATES` exists in the
   * DTD and exactly ONE item in the whole map uses it (1264, Gingerbread Game
   * Block, STATES="3"). Every other interactive piece expresses its states
   * through sprite NAMES instead: `item_<code>_<x>_<y>_<dir>_<layer>_<state>`,
   * where the trailing field is the state. 107 items carry both 0 and 1 there —
   * the candlesticks, Lumiere, the shower, the water cooler, Madame Leota's
   * crystal ball, the waterslide and river pieces, the teleporters.
   *
   * So the count is the larger of the two sources, and the sprite names are the
   * one that actually matters.
   */
  states: number;
  /**
   * WHICH states the furnimap draws, not merely how many.
   *
   * ⚠ Not interchangeable with `states`. An item's states may also come from
   * its `ani.xml`, and the two sets are additive — the turnstile's closed pose
   * is furnimap state 0 while its turn is animation state 1. `item-animations`
   * unions them; `states` above cannot express that because a count discards
   * which states those were.
   */
  spriteStates: Set<number>;
}

const items = new Map<number, FurniItem>();
let parsed = false;

/**
 * ⚠ EVERY page the client loads, not just the first.
 *
 * `furnituremap_url.1`, `.2`, … are merged by the client, so a server reading
 * only page 1 knows a fraction of the items — 398 footprints against ~1,015
 * renderable. That under-reports seating, collision and the shop all at once,
 * and silently: an item simply has no blocks and behaves like scenery.
 *
 * Keep this list in step with the `furnituremap_url.*` variables.
 */
function furnimapPaths(): string[] {
  const repoRoot = join(here, "..", "..");
  // ⚠ Must mirror furnimapFile() in assets.ts — see the note there about why
  // the archive's other furnimap variants are NOT served. If the server reads
  // fewer pages than the client is served, an item the client renders has no
  // blocks here and so does not seat, block or stack; if it reads more, the
  // server enforces collision the client cannot see. Either way the
  // disagreement is invisible until someone walks through a sofa.
  return [
    process.env.VMK_FURNIMAP,
    downloadFile("furnituremaps.0-99_2"),
    join(repoRoot, "assets", "furnimaps", "furnimaps_consolidated.xml"),
  ]
    .filter((p): p is string => Boolean(p))
    .filter((p) => existsSync(p));
}

function parse(): void {
  if (parsed) return;
  parsed = true;
  const files = furnimapPaths();
  if (files.length === 0) {
    console.warn("[furni] no furnimap found — items will not occupy or seat");
    return;
  }
  // Pages are merged, first definition wins — matching the client, where a
  // later page adds codes rather than redefining ones page 1 already gave.
  const xml = files.map((f) => readFileSync(f, "latin1")).join("\n");
  let blocks = 0;
  for (const item of xml.matchAll(/<ITEM\s([^>]*)>([\s\S]*?)<\/ITEM>/g)) {
    const code = Number(/CODE="(\d+)"/.exec(item[1])?.[1]);
    if (!Number.isInteger(code)) continue;
    const dirs: DirBlocks = new Map();
    const dirsWithArt = new Set<number>();
    let composites = false;
    // Trailing field of every well-formed sprite name, across all facings.
    const spriteStates = new Set<number>();
    for (const gfx of item[2].matchAll(/GFX="item_\d+(?:_-?\d+)+_(\d+)"/g)) {
      spriteStates.add(Number(gfx[1]));
    }
    for (const dir of item[2].matchAll(/<DIR\s+NUM="(\d+)"\s*>([\s\S]*?)(?=<DIR\s|$)/g)) {
      const num = Number(dir[1]);
      const list: FurniBlock[] = [];
      // ⚠ The attribute group is OPTIONAL. `<BLK>` with no attributes at all is
      // common — item 443's every facing is one — and a `/<BLK\s/` pattern
      // silently skips those, leaving the item with no footprint. It then reads
      // as scenery: no collision, no seat, and excluded from anything gated on
      // having blocks.
      for (const blk of dir[2].matchAll(/<BLK(?:\s([^>]*))?>/g)) {
        const a = blk[1] ?? "";
        const attr = (n: string) => new RegExp(`\\b${n}="([^"]*)"`).exec(a)?.[1];
        list.push({
          x: Number(attr("X") ?? 0),
          y: Number(attr("Y") ?? 0),
          walk: attr("WLK") === "1",
          sit: Number(attr("SIT") ?? 0) !== 0,
          height: Number(attr("HGT") ?? 0),
          stack: Number(attr("STK") ?? 0) !== 0,
          act: attr("ACT") === "1",
        });
        blocks++;
      }
      if (/<SPR\s/.test(dir[2])) dirsWithArt.add(num);
      if (num === 5) {
        composites = [...dir[2].matchAll(/<SPR[^>]*\bBLD="(\d+)"/g)].some(
          (m) => Number(m[1]) > 0,
        );
      }
      if (list.length > 0) dirs.set(num, list);
    }
    if (dirs.size === 0) continue;
    const entry: FurniItem = {
      dirs,
      tileSize: Number(/\bTILESIZE="(\d+)"/.exec(item[1])?.[1] ?? 0),
      dirsWithArt,
      compositesDir5: composites,
      states: Math.max(
        Number(/\bSTATES="(\d+)"/.exec(item[1])?.[1] ?? 0),
        spriteStates.size,
        1,
      ),
      spriteStates,
    };
    // Pages overlap, and the two we serve disagree about the SAME code: the
    // archive's map omits TILESIZE on 376 of its 495 entries where the
    // consolidated one supplies it. Keep whichever definition the client can
    // actually draw rather than letting file order decide.
    const prev = items.get(code);
    if (prev && isPreviewable(prev) && !isPreviewable(entry)) continue;
    items.set(code, entry);
  }
  const sittable = [...items.values()].filter((it) =>
    [...it.dirs.values()].some((bs) => bs.some((b) => b.sit)),
  ).length;
  const drawable = [...items.values()].filter(isPreviewable).length;
  const interactive = [...items.values()].filter((i) => i.states > 1).length;
  console.log(
    `[furni] ${items.size} item footprints, ${blocks} blocks, ` +
      `${sittable} with a seat, ${drawable} previewable, ${interactive} interactive`,
  );
}

/**
 * Can `CRoomFurniThumbRenderer._RenderFurniPreview` draw this item?
 *
 * ⚠ This is the shop's admission test, and it is much stricter than "has a
 * footprint". Answering `16 CAT_CATEGORY_REQUEST` makes the client render a
 * thumbnail for every product on the page, through a code path with no room
 * context and almost no guards:
 *
 *   t_iDir = 5
 *   repeat with t_rDir in t_rStruct.child      -- picks DIR NUM=5, and only 5
 *   t_iItemSize = value(t_rStruct.param["TILESIZE"])
 *   t_iX = integer(t_rBlock.param["X"]) * t_iItemSize    -- VOID here is fatal
 *
 * So an entry missing TILESIZE multiplies by VOID and takes the client down.
 * Nothing supplies a default: the in-room renderer survives the same entries
 * only because it scales against the ROOM's TILESIZE
 * (`GetContext().GetParam("TILESIZE")`) and uses the item's as a mere factor.
 * That asymmetry is why furniture that places and draws perfectly in a room
 * still cannot be shown on a shelf.
 *
 * Requiring all three conditions leaves ~120 of 1,089 entries sellable. That is
 * the true ceiling of what the shop can display, not a conservative margin.
 */
function isPreviewable(item: FurniItem): boolean {
  return item.tileSize > 0 && item.dirs.has(5) && item.dirsWithArt.has(5);
}

/**
 * Which facings this item actually defines, ascending.
 *
 * ⚠ NOT every item defines 1/3/5/7. Measured: item 1215 (Royal Leaping
 * Fountains) defines only 3 and 5. Placing it at any other facing resolves to
 * no sprite set, so it renders NOTHING while the placement succeeds everywhere
 * else — no error, no missing cast, the art loads and nothing appears. That is
 * the same trap the `/place` command already documents for direction 0.
 */
export function directionsFor(typeCode: number): number[] {
  parse();
  const item = items.get(typeCode);
  return item ? [...item.dirs.keys()].sort((a, b) => a - b) : [];
}

/**
 * Does the furnimap define this code at all — i.e. is it furniture?
 *
 * This is the server-side twin of the client's `CRoomFurnitureMap.GetByTypeCode`.
 * A code the furnimap does not know gets the NULL descriptor there, and the
 * client reports "Unknown object type code: N" followed by "Cast definition for
 * item N not found!" — the item exists in the room and can never be drawn.
 *
 * ⚠ Non-furniture codes look perfectly plausible as numbers. Pins occupy the
 * 2000 block (2010 is "Best Guest Room Award"), and placing one writes a row
 * that no amount of client-side work can render. Check this before putting any
 * code into `room_items`.
 */
export function isFurniture(typeCode: number): boolean {
  parse();
  return items.has(typeCode);
}

/**
 * Teleporters, which only ever exist as LINKED PAIRS ("Teleporters are always
 * paired together - entering one will always send you to the other in the
 * pair"). Anything that hands one out — the shop, /hk give, `/teleporter` —
 * must hand out a pair; a lone half has no partner and does nothing.
 *
 * ⚠ An explicit list, not "has an ACT block". ACT also marks the entrance
 * turnstiles, the Quest Kiosk, the rocket vehicles and several OVMKS pieces,
 * none of which pair. Furniture teleporters first, then ride teleporters
 * (rides.ts), which carry a ride on to their partner.
 */
const PAIRED_TELEPORTERS = new Set([
  3, 7, 17, 53, 71, 311, 361, 362, 375, 452, 482, 1305, 1333,
  314, 368, 389, 424, 574, 575,
]);

export function isPairedTeleporter(typeCode: number): boolean {
  return PAIRED_TELEPORTERS.has(typeCode);
}

/** As `isPreviewable`, by type code. Diagnostic only — see catalog.ts. */
export function previewable(typeCode: number): boolean {
  parse();
  const item = items.get(typeCode);
  return item ? isPreviewable(item) : false;
}

/** Does the preview renderer actually composite this item? See `compositesDir5`. */
export function composites(typeCode: number): boolean {
  parse();
  return items.get(typeCode)?.compositesDir5 ?? false;
}

/**
 * How many states this item cycles through. 1 = not interactive.
 *
 * ⚠ A LOWER BOUND. Items that keep their states in `item.<code>.ani.xml`
 * report 1 here however many they really have — the RNG, the scoreboard and
 * the turnstiles all do. Use `item-animations.statesOf()` for the real list;
 * this remains only for callers that genuinely want the furnimap's own view.
 */
export function statesFor(typeCode: number): number {
  parse();
  return items.get(typeCode)?.states ?? 1;
}

/** Which states the furnimap draws for this item. See `FurniItem.spriteStates`. */
export function spriteStatesFor(typeCode: number): number[] {
  parse();
  return [...(items.get(typeCode)?.spriteStates ?? [])].sort((a, b) => a - b);
}

/**
 * The blocks an item occupies at a facing.
 *
 * Falls back to the item's first defined direction: items define 1/3/5/7 and a
 * few only 1, so asking for a facing that does not exist should still place the
 * item rather than make it non-existent.
 */
export function blocksFor(typeCode: number, dir: number): FurniBlock[] {
  parse();
  const item = items.get(typeCode);
  if (!item) return [];
  return item.dirs.get(dir) ?? item.dirs.values().next().value ?? [];
}

/* ----------------------------------------------------------------- geometry */

interface RoomTiles {
  tileSize: number;
  /** "x,y,z" -> tile ref, for turning a block offset back into a tile. */
  byCoord: Map<string, number>;
  /** tile ref -> [x, y, z]. */
  coords: Map<number, [number, number, number]>;
}

const rooms = new Map<string, RoomTiles>();
let geometryLoaded = false;

function loadGeometry(): void {
  if (geometryLoaded) return;
  geometryLoaded = true;
  const path =
    process.env.VMK_ROOM_GEOMETRY ?? join(here, "..", "..", "assets", "room-geometry.json");
  if (!existsSync(path)) return;
  const data = JSON.parse(readFileSync(path, "utf8")) as {
    rooms: Record<string, { tileSize: number; tiles: number[] }>;
  };
  for (const [name, room] of Object.entries(data.rooms)) {
    const byCoord = new Map<string, number>();
    const coords = new Map<number, [number, number, number]>();
    // Flat [ref, x, y, z, ...].
    for (let i = 0; i + 3 < room.tiles.length; i += 4) {
      const [ref, x, y, z] = room.tiles.slice(i, i + 4);
      byCoord.set(`${x},${y},${z}`, ref);
      coords.set(ref, [x, y, z]);
    }
    rooms.set(name, { tileSize: room.tileSize, byCoord, coords });
  }
}

/**
 * Would the client accept this item at this tile and facing?
 *
 * Mirrors `CRoomFactorElement._TestComposition`: every block of the item is
 * offset from the anchor tile and must land on a tile that EXISTS. If one does
 * not, `_TestComposition` returns 0, `SetToTileStack` returns 0, and the client
 * reports "Failed to set item into a tile!" — the row is stored but nothing is
 * ever drawn.
 *
 * ⚠ This is deliberately stricter than `coveredTiles`, which drops a block that
 * hangs off the edge and reports what is left. That is right for asking "which
 * tiles does this occupy" and WRONG for asking "may this go here": it makes a
 * half-off-the-grid placement look perfectly fine to the server while the
 * client refuses it. Measured on one guest room: 2 of 25 placed items were in
 * this state, both multi-tile pieces on the last row of the grid.
 *
 * Two details are copied from the client rather than improved on:
 *  - blocks are looked up for the EXACT facing, with no fallback to another
 *    direction, because that is what `_TestComposition` matches on; and
 *  - an item with no blocks at that facing is accepted, because the client
 *    returns 1 when it finds no matching `<DIR>`.
 */
export function fitsAt(
  room: string | undefined,
  anchorTile: number,
  typeCode: number,
  dir: number,
): boolean {
  if (!room) return true; // nothing to check against; do not invent a refusal
  parse();
  loadGeometry();
  const geo = rooms.get(room);
  const anchor = geo?.coords.get(anchorTile);
  if (!geo || !anchor) return false; // the anchor tile itself does not exist
  const blocks = items.get(typeCode)?.dirs.get(dir);
  if (!blocks || blocks.length === 0) return true;
  const [ax, ay, az] = anchor;
  return blocks.every((block) =>
    geo.byCoord.has(`${ax + block.x * geo.tileSize},${ay + block.y * geo.tileSize},${az}`),
  );
}

/** What an item covers, as tile ref -> the block sitting on that tile. */
export function coveredTiles(
  room: string | undefined,
  anchorTile: number,
  typeCode: number,
  dir: number,
): Map<number, FurniBlock> {
  const out = new Map<number, FurniBlock>();
  if (!room) return out;
  loadGeometry();
  const geo = rooms.get(room);
  const anchor = geo?.coords.get(anchorTile);
  if (!geo || !anchor) return out;
  const [ax, ay, az] = anchor;
  for (const block of blocksFor(typeCode, dir)) {
    // Offsets are in TILES; the geometry stores world coordinates.
    const key = `${ax + block.x * geo.tileSize},${ay + block.y * geo.tileSize},${az}`;
    const ref = geo.byCoord.get(key);
    // A block hanging off the edge of the room simply covers nothing.
    if (ref !== undefined) out.set(ref, block);
  }
  return out;
}
