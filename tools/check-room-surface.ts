/**
 * What actually decides walkability on each tile of a room.
 *
 *   npx tsx tools/check-room-surface.ts <room> <geometry> [tile...]
 *
 * Mirrors `surfaceOf`: ascending ref = ascending stack, so a LATER item's
 * walkable block covers an earlier item's solid one. That rule is right for
 * stacking (a rug over a crate is walkable) but it means a rug dropped across a
 * turnstile's tile silently makes the turnstile passable.
 */
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { coveredTiles } from "../server/src/furni-footprint.js";

const [room = "guest:100001", geometry = "space_private", ...want] = process.argv.slice(2);
const wanted = want.map(Number);

const db = new DatabaseSync(process.env.VMK_DB ?? "data/vmk.db");
const texts = JSON.parse(readFileSync("catalogs/external_texts.json", "utf8")) as
  Record<string, string>;
const rows = db
  .prepare("SELECT ref, type_code, tile, dir, state FROM room_items WHERE room = ? ORDER BY ref")
  .all(room) as Array<{ ref: number; type_code: number; tile: number; dir: number; state: number }>;

// tile -> every (ref, block) that touches it, in stack order.
const touching = new Map<number, Array<{ ref: number; type: number; walk: boolean }>>();
for (const item of rows) {
  for (const [tile, block] of coveredTiles(geometry, item.tile, item.type_code, item.dir)) {
    const list = touching.get(tile) ?? [];
    list.push({ ref: item.ref, type: item.type_code, walk: block.walk });
    touching.set(tile, list);
  }
}

const tiles = wanted.length > 0 ? wanted : [...touching.keys()].sort((a, b) => a - b);
for (const tile of tiles) {
  const list = touching.get(tile) ?? [];
  if (list.length === 0) {
    console.log(`tile ${tile}: nothing`);
    continue;
  }
  const top = list[list.length - 1];
  console.log(`tile ${tile}: ${top.walk ? "WALKABLE" : "solid"} (decided by ref ${top.ref})`);
  for (const e of list) {
    const mark = e === top ? " <= TOP" : "";
    console.log(
      `    ref ${String(e.ref).padEnd(4)} type ${String(e.type).padEnd(5)} ` +
        `${e.walk ? "walk " : "SOLID"}  ${texts[`item.${e.type}`] ?? ""}${mark}`,
    );
  }
}
