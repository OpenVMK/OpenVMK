/**
 * Where a room's exit tiles lead, from `assets/room-exits.json`
 * (`tools/build-room-exits.mjs`).
 *
 * ⚠ THE CLIENT NEVER DECIDES THIS. An exit is a tile with CLASS "exit"; the
 * client highlights it and, when clicked, sends the same `move` (581) as any
 * tile. The original server recognised the tile and moved you on with
 * `2590 _EnterRoom`. Destinations are therefore authored data, keyed by ROOM
 * CODE rather than cast: one cast can serve many codes (every dark-ride scene
 * is `dark_ride_room`, the music lobby and game share `musicmix`).
 *
 * A room with no entry — every guest room, and the few minor public rooms —
 * treats each of its exit tiles as "go back where you came from", which is
 * what walking out of a guest room's door did.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export interface ExitRule {
  tiles: number[];
  label: string;
  /** A room code, "back" (the previous public room) or "same" (hop within this room). */
  to?: number | "back" | "same";
  /** Open the themed guest-room list for this room type instead of moving. */
  navigator?: number;
  /** Doorway tiles to arrive on, in the destination (or this room for "same"). */
  arrive?: number[];
  /** Direction to face on arrival (server clockwise index); default keeps the walk's facing. */
  face?: number;
  flag?: string;
  /** Entering the Monorail Station: WHICH land's platform (a monorail stop id). */
  stop?: number;
  /** Boarding the Monorail: which train (they run several; each is its own car). */
  train?: number;
}

const here = dirname(fileURLToPath(import.meta.url));
const EXITS_PATH = process.env.VMK_ROOM_EXITS ?? join(here, "..", "..", "assets", "room-exits.json");

const byCode = new Map<number, ExitRule[]>();
let loaded = false;

function load(): void {
  if (loaded) return;
  loaded = true;
  if (!existsSync(EXITS_PATH)) {
    console.warn(`[exits] ${EXITS_PATH} not found — every exit goes back. Run: node tools/build-room-exits.mjs`);
    return;
  }
  try {
    const parsed = JSON.parse(readFileSync(EXITS_PATH, "utf8")) as {
      rooms: Record<string, { exits: ExitRule[] }>;
    };
    for (const [code, room] of Object.entries(parsed.rooms)) byCode.set(Number(code), room.exits);
    const n = [...byCode.values()].reduce((s, e) => s + e.length, 0);
    console.log(`[exits] ${n} exit(s) across ${byCode.size} room code(s)`);
  } catch (error) {
    console.warn(`[exits] could not read ${EXITS_PATH}: ${(error as Error).message}`);
  }
}

/**
 * Renumber room `code`'s tiles, for a seasonal build laid out differently
 * (`VMK_SEASON`, see seasons.ts). `map` gives a tile's number in the new
 * layout, or null when it has none there. Covers the room's own exits and every
 * other room's `arrive` tiles INTO it. An exit left with no tiles is dropped,
 * which is right: the older seasonal builds predate some doors (Central
 * Plaza's Magic Shop, Main Street's Penny Arcade).
 */
export function remapRoomTiles(code: number, map: (tile: number) => number | null): { kept: number; dropped: string[] } {
  load();
  const remap = (tiles: number[]) => tiles.map(map).filter((t): t is number => t !== null);
  const dropped: string[] = [];
  const own = byCode.get(code);
  if (own) {
    const kept: ExitRule[] = [];
    for (const rule of own) {
      const tiles = remap(rule.tiles);
      if (tiles.length === 0) {
        dropped.push(rule.label);
        continue;
      }
      kept.push({ ...rule, tiles, arrive: rule.to === "same" && rule.arrive ? remap(rule.arrive) : rule.arrive });
    }
    byCode.set(code, kept);
  }
  for (const [other, rules] of byCode) {
    if (other === code) continue;
    byCode.set(other, rules.map((r) => (r.to === code && r.arrive ? { ...r, arrive: remap(r.arrive) } : r)));
  }
  return { kept: byCode.get(code)?.length ?? 0, dropped };
}

/**
 * The rule for stepping onto `tile` in room `code`, or null when the tile is
 * not a mapped exit. `isExitTile` says whether the geometry marks it an exit
 * at all — an unmapped exit in an unmapped room goes "back".
 */
export function exitAt(code: number, tile: number, isExitTile: boolean): ExitRule | null {
  load();
  const rules = byCode.get(code);
  if (rules) return rules.find((r) => r.tiles.includes(tile)) ?? null;
  return isExitTile ? { tiles: [tile], label: "exit", to: "back" } : null;
}

/**
 * Where to stand on arriving in `code` from `fromCode`: the doorway that leads
 * back the way you came, so walking straight back out returns you. Null when
 * the destination has no such doorway (fall back to the room's spawn).
 */
export function doorBackTo(code: number, fromCode: number): number[] | null {
  load();
  const rule = byCode.get(code)?.find((r) => r.to === fromCode);
  return rule ? rule.tiles : null;
}

export function exitTilesTo(code: number, to: number): number[] {
  load();
  return (byCode.get(code) ?? []).filter((r) => r.to === to).flatMap((r) => r.tiles);
}
