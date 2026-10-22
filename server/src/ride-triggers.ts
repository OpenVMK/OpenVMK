/**
 * Dark-ride trigger zones: scenery that animates when a ride cart comes near.
 *
 * The client side is complete in `CRoomItemProximityConfig` (cast 312ea5aa,
 * also vmk_furniture_code). Every item type listed below carries that class
 * (`CRoomObjectType<code>` in the cast's variable.index), which:
 *
 *   - draws the item's ZONE as `proximity_marker_<tileSize>` tiles while its
 *     owner has it selected (single click -> `584 UseItem`);
 *   - opens a "Dark Ride" editor on `2881 ItemConfiguration`, with a radio row
 *     per direction, and saves it with `810 ConfigureItem`
 *     `[int ref, int 8, (str key, str value) x 8]`;
 *   - redraws the zone from `2882 CurrentItemConfiguration` without a dialog.
 *
 * What the client does NOT do is fire anything. The original server switched
 * the piece to state 1 when a cart entered its zone; `CRoomItemStateAnimator`
 * then plays the state-1 frames once (`loop 0`) with the piece's own sound —
 * the Unbirthday Cake's cast carries `DRA-Scn5_Cake_Ani-v1` for exactly this.
 *
 * ZONE SHAPE, as `GetSurroundingBlocks` computes it: for every block of the
 * item, for each of eight directions, the tiles 1..reach steps away. The
 * directions are relative to the item's facing (`getCurrentDirections`).
 */
import type { RoomItem } from "./db.js";
import { coveredTiles } from "./furni-footprint.js";
import { tileAtOffset } from "./room-geometry.js";

/** `CRoomObjectType<code>` entries that include `CRoomItemProximityConfig`. */
export const PROXIMITY_ITEMS = new Set([
  587, 592, 598, 613, 621, 641, 682, 716, 721, 727, 728, 731, 733, 734, 735, 736,
  737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752,
  753, 754, 755, 756, 757, 758, 759, 762, 764, 774, 780, 791, 796, 797, 1110, 1111,
  1206, 1215,
]);

/**
 * The configuration keys, in the client's order — front, front-right, right,
 * back-right, back, back-left, left, front-left — with its defaults
 * (`m_ar_configuration` in `construct`). The editor offers 0..5 on the four
 * sides and 0..1 on the diagonals.
 */
export const PROXIMITY_KEYS = ["f", "fr", "r", "br", "b", "bl", "l", "fl"] as const;
const DEFAULTS: Record<string, number> = { f: 3, fr: 0, r: 2, br: 1, b: 1, bl: 1, l: 2, fl: 0 };
const MAX: Record<string, number> = { f: 5, fr: 1, r: 5, br: 1, b: 5, bl: 1, l: 5, fl: 1 };

/** A stored configuration, completed with defaults and clamped to the editor's range. */
export function proximityConfig(stored: Record<string, string>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const key of PROXIMITY_KEYS) {
    const value = Math.trunc(Number(stored[key] ?? DEFAULTS[key]));
    out[key] = Number.isFinite(value) ? Math.max(0, Math.min(MAX[key], value)) : DEFAULTS[key];
  }
  return out;
}

/** `m_ar_directions`: world unit steps, starting +x and turning toward +y. */
const DIRECTIONS: Array<[number, number]> = [
  [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1],
];

/**
 * `getCurrentDirections`: the world step for each key at this facing. The base
 * index is 0 for dir 3, 2 for 5, 4 for 7, 6 for 1, and key i (1-based) takes
 * `DIRECTIONS[base + i]` wrapped — so dir 3's front is +x.
 */
function directionsFor(dir: number): Array<[number, number]> {
  const base = ({ 3: 0, 5: 2, 7: 4, 1: 6 } as Record<number, number>)[dir] ?? 1;
  return PROXIMITY_KEYS.map((_, i) => {
    let at = base + i + 1; // 1-based, as in the Lingo
    if (at > DIRECTIONS.length) at = at % DIRECTIONS.length;
    return DIRECTIONS[at - 1];
  });
}

/** Every tile in an item's trigger zone. */
export function proximityZone(
  geometryRoom: string | undefined,
  item: RoomItem,
  config: Record<string, number>,
): Set<number> {
  const zone = new Set<number>();
  const directions = directionsFor(item.dir);
  const blocks = coveredTiles(geometryRoom, item.tile, item.typeCode, item.dir);
  for (const block of blocks.keys()) {
    PROXIMITY_KEYS.forEach((key, i) => {
      const [dx, dy] = directions[i];
      for (let step = 1; step <= config[key]; step++) {
        const tile = tileAtOffset(geometryRoom, block, dx * step, dy * step);
        if (tile !== null) zone.add(tile);
      }
    });
  }
  return zone;
}
