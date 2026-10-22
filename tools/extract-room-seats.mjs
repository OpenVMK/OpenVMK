// Pull seat tiles out of room-geometry.json into assets/room-seats.json.
//
// Disney marked seats on the tile's NAME attribute, not its CLASS — which is
// why a CLASS-only survey concludes they do not exist:
//
//   <NODE CLASS="tile" NAME="sit10" REF="23" X="192" Y="72" Z="0" />
//
// The name also encodes facing when it was fixed, in several spellings:
// `sit_10_dir_5`, `sit10_dir5`, `sit_20_dir7`. Where no direction is given the
// facing comes from `assets/seat-facing.json` (hand-authored per room from the
// original's screenshots), else it stays null and the server keeps the
// approach direction.
//
// Reads the tile names `tools/extract-room-geometry.mjs` records, so run that
// first. Output is keyed by the same room name, so the server looks seats up
// with the key it already resolves tiles with.
//
//   node tools/extract-room-seats.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GEOMETRY = join(ROOT, "assets", "room-geometry.json");
const FACING = join(ROOT, "assets", "seat-facing.json");
const OUT = join(ROOT, "assets", "room-seats.json");

const geometry = JSON.parse(readFileSync(GEOMETRY, "utf8"));
/** { room: { "<ref>": dir, "*": dir } } — "*" is the room-wide default. */
const facing = existsSync(FACING) ? JSON.parse(readFileSync(FACING, "utf8")).rooms ?? {} : {};

/**
 * `sit`, `sit10`, `sit_3`, `sit_10_dir_5`, `sit10_dir5`, `left_sit10` — all
 * seats. The number after `sit` tracks height, which the tile's own Z already
 * carries; `dir` is the only part that changes behaviour.
 *
 * Deliberately NOT seats: `sit_rocket_N`, `player1_sit`/`player2_sit` and
 * spacemountain's `sit_front`/`sit_back` — ride and minigame positions the
 * room's own handler drives.
 */
// A word may come before `sit` (`left_sit10`, `player1_sit` at Checkers) or
// after it (`sit_rocket_1` in Tomorrowland Hub's rocket, `sit_front` /
// `sit_back` in Space Mountain's). Missing those left riders STANDING in the
// rocket — the only seats in the game the old pattern did not match.
const SEAT = /^(?:[a-z0-9]+_)?sit(?:_?\d+|_[a-z]+(?:_\d+)?)?(?:_?dir_?(\d))?$/i;

/**
 * Facing for a seat Disney left undirected: perpendicular to its bench, toward
 * the middle of its floor. Benches are runs of seat tiles along x or y; the
 * Esplanade's four benches all face the plaza this way. Directions use the
 * server's clockwise index (room-geometry.ts): +y = 5, -y = 1, +x = 3, -x = 7 —
 * the same four diagonals Disney's own `_dir_N` seats use.
 */
function inferredFacing(tile, seatSet, pos, floorOf, s) {
  const [x, y] = pos.get(tile);
  const seatAt = (dx, dy) =>
    [...seatSet].some((t) => {
      const p = pos.get(t);
      return p[0] === x + dx && p[1] === y + dy && floorOf.get(t) === floorOf.get(tile);
    });
  const alongX = seatAt(s, 0) || seatAt(-s, 0);
  const alongY = seatAt(0, s) || seatAt(0, -s);
  // Centre of this seat's floor.
  let cx = 0, cy = 0, n = 0;
  for (const [ref, p] of pos) {
    if (floorOf.get(ref) !== floorOf.get(tile)) continue;
    cx += p[0]; cy += p[1]; n++;
  }
  cx /= n; cy /= n;
  const toX = cx - x, toY = cy - y;
  // A bench along x faces across y, and vice versa; a lone seat takes the
  // stronger axis toward the centre.
  const useY = alongX && !alongY ? true : alongY && !alongX ? false : Math.abs(toY) >= Math.abs(toX);
  return useY ? (toY >= 0 ? 5 : 1) : (toX >= 0 ? 3 : 7);
}

/**
 * Which INVISIBLE SEAT item goes on the tile. The number in the tile name is
 * the seat's height, and Disney made one invisible seat per height:
 *
 *   66  Invisible Public Room Seat              HGT 10   sit10 / sit_10
 *   86  Invisible Public Room Seat Height 20    HGT 20   sit20 / sit_20
 *   87  Invisible Public Room Seat Height 30    HGT 30   sit30
 *   283 Invisible Public Room Chair With Height Zero     anything else
 *
 * The item's block height is what lifts a seated avatar onto the bench (the
 * server sends a stack of 1, so the client stands the avatar ON the item). Using
 * 283 everywhere sat everyone on the floor.
 */
function seatItemFor(name) {
  const height = Number(/sit_?(\d+)/i.exec(name)?.[1] ?? 0);
  return height === 10 ? 66 : height === 20 ? 86 : height === 30 ? 87 : 283;
}

const rooms = {};
let seats = 0;
let fromName = 0;
let fromTable = 0;
let inferred = 0;
for (const [room, geo] of Object.entries(geometry.rooms ?? {})) {
  const found = [];
  const pos = new Map();
  const floorOf = new Map();
  for (let i = 0; i < geo.tiles.length; i += 4) {
    pos.set(geo.tiles[i], [geo.tiles[i + 1], geo.tiles[i + 2], geo.tiles[i + 3]]);
    floorOf.set(geo.tiles[i], geo.floorOf?.[i / 4] ?? -1);
  }
  const named = Object.entries(geo.names ?? {})
    .map(([refText, name]) => ({ tile: Number(refText), name, m: SEAT.exec(name) }))
    .filter((e) => e.m && pos.has(e.tile));
  const seatSet = new Set(named.map((e) => e.tile));
  for (const { tile, name, m } of named) {
    const refText = String(tile);
    let dir = m[1] === undefined ? null : Number(m[1]);
    let source = "name";
    if (dir !== null) fromName++;
    else {
      const table = facing[room];
      const authored = table?.[refText] ?? table?.["*"];
      if (authored !== undefined && authored !== null) {
        dir = authored;
        source = "authored";
        fromTable++;
      } else {
        dir = inferredFacing(tile, seatSet, pos, floorOf, geo.tileSize);
        source = "inferred";
        inferred++;
      }
    }
    found.push({ tile, dir, z: pos.get(tile)[2], marker: name, source, item: seatItemFor(name) });
  }
  if (found.length === 0) continue;
  found.sort((a, b) => a.tile - b.tile);
  rooms[room] = found;
  seats += found.length;
}

writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), rooms }, null, 2));

console.log(`${seats} seat tile(s) across ${Object.keys(rooms).length} room(s)`);
console.log(`facing: ${fromName} from the tile name, ${fromTable} from seat-facing.json, ${inferred} inferred (bench -> floor centre)`);
console.log(`wrote ${OUT}\n`);
for (const [room, list] of Object.entries(rooms).sort((a, b) => b[1].length - a[1].length)) {
  const guessed = list.filter((s) => s.source === "inferred").length;
  console.log(
    `  ${room.padEnd(28)} ${String(list.length).padStart(3)} seat(s)` + (guessed > 0 ? `  (${guessed} inferred)` : ""),
  );
}
