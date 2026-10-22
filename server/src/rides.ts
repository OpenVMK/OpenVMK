/**
 * Ride pieces: track furniture a player builds in a guest room and rides.
 *
 * Spec (disneysonlineworlds.com/Ride_Pieces): stepping onto a Start piece starts
 * the ride; every piece except teleporters sends you one way only; paired
 * teleporters carry the ride into another room (or elsewhere in this one) —
 * see `rideOnFromTeleporter` and `rideAlong` in mus-server.ts.
 *
 * The client has NO ride logic. It draws whatever the server pulses, and a
 * vehicle appears whenever the avatar's `legs` action is 5..13
 * (`CAvatarFactor.Action` -> `CAvatarVehicle`). So the whole ride is planned
 * here and played through the ordinary walk pacer, one tile per pulse.
 *
 * Direction convention. Furni facings 1/3/5/7 are the same indices avatars use
 * (`directionBetween`): 1 = screen up-right, 3 = down-right, 5 = down-left,
 * 7 = up-left. Read off the Yeti start's arrow sign (item_369, dir 1 points
 * up-right, dir 3 down-right). The start sends you along its facing; the
 * rest of the track is two-way and carries you on from the way you came in.
 * See `exitHeading`.
 */
import type { RoomItem } from "./db.js";
import { coveredTiles } from "./furni-footprint.js";
import { tileToward } from "./room-geometry.js";

type Kind = "start" | "straight" | "turnLeft" | "turnRight" | "teleporter";

interface RidePiece {
  kind: Kind;
  /** Only on starts: the `legs` vehicle the rider sits in (`CAvatarVehicle.update`). */
  vehicle?: number;
}

/** `CAvatarVehicle.update`: which vehicle each `legs` value draws. */
const VEHICLE = {
  log: 5,
  everestCar: 6,
  rocket: 7,
  donutTyphoonLagoon: 8,
  donutBlizzardBeach: 9,
  aliceCar: 10,
  peterPanShip: 11,
} as const;

/**
 * Every ride piece we know, by furni type code (names: `item.<code>` in
 * external_texts). Uphill/downhill ride as straights: they run the length of
 * their two-tile footprint. The Space Mountain switch, door and poles are
 * left out until their behaviour is known, so a ride stops at them.
 */
const PIECES = new Map<number, RidePiece>([
  // River
  [314, { kind: "teleporter" }],
  [315, { kind: "start", vehicle: VEHICLE.log }],
  [316, { kind: "straight" }],
  [317, { kind: "turnRight" }],
  [318, { kind: "turnLeft" }],
  // Yeti (Everest)
  [368, { kind: "teleporter" }],
  [369, { kind: "start", vehicle: VEHICLE.everestCar }],
  [370, { kind: "straight" }],
  [371, { kind: "turnRight" }],
  [372, { kind: "turnLeft" }],
  // Space Mountain
  [389, { kind: "teleporter" }],
  [390, { kind: "start", vehicle: VEHICLE.rocket }],
  [391, { kind: "straight" }],
  [392, { kind: "turnRight" }],
  [393, { kind: "turnLeft" }],
  [508, { kind: "straight" }], // uphill
  [509, { kind: "straight" }], // downhill
  // Waterslide
  [424, { kind: "teleporter" }],
  [425, { kind: "start", vehicle: VEHICLE.donutTyphoonLagoon }],
  [426, { kind: "straight" }],
  [427, { kind: "turnRight" }],
  [428, { kind: "turnLeft" }],
  [429, { kind: "straight" }], // uphill
  [430, { kind: "straight" }], // downhill
  [830, { kind: "start", vehicle: VEHICLE.donutBlizzardBeach }],
  [831, { kind: "start", vehicle: VEHICLE.donutTyphoonLagoon }],
  // Dark ride
  [574, { kind: "teleporter" }], // Alice
  [575, { kind: "teleporter" }], // Peter Pan
  [576, { kind: "start", vehicle: VEHICLE.aliceCar }],
  [577, { kind: "start", vehicle: VEHICLE.peterPanShip }],
  [578, { kind: "straight" }],
  [579, { kind: "turnRight" }],
  [580, { kind: "turnLeft" }],
  [584, { kind: "straight" }], // uphill
  [585, { kind: "straight" }], // downhill
]);

export const TURN_ART_OFFSET = new Map<number, number>([
  [579, 2],
  [580, 6],
]);

/**
 * Is this furni type ride track you may not walk on? Everything but a start:
 * track is reached only by riding it, and the start is how you board.
 */
export function isRideTrack(typeCode: number): boolean {
  const kind = PIECES.get(typeCode)?.kind;
  return kind !== undefined && kind !== "start";
}

/** Is this furni type a ride start? */
export function isRideStart(typeCode: number): boolean {
  return PIECES.get(typeCode)?.kind === "start";
}

export interface RidePlan {
  /** The start piece that launched it. */
  start: RoomItem;
  vehicle: number;
  /** Tiles to pulse, in order, AFTER the start tile. Each has the heading it is entered with. */
  steps: Array<{ tile: number; facing: number }>;
  /** Why the ride ended, for the log. */
  end: string;
  /** Which way the last piece points: the rider steps off facing it. */
  endFacing: number;
}

/**
 * Plan the ride from a start piece: follow the track tile by tile until it runs
 * out, loops back to the start, or reaches a teleporter.
 */
export function planRide(
  geometryRoom: string | undefined,
  items: RoomItem[],
  start: RoomItem,
): RidePlan | null {
  const startPiece = PIECES.get(start.typeCode);
  if (startPiece?.kind !== "start") return null;
  return followTrack(geometryRoom, items, start, start.dir, startPiece.vehicle ?? 0);
}

/**
 * Carry a ride on from the teleporter it arrived through: out of its open end,
 * along its facing (see the note in `followTrack`). Null if no track joins
 * there, and the rider gets off on that side.
 */
export function rideOnFromTeleporter(
  geometryRoom: string | undefined,
  items: RoomItem[],
  teleporter: RoomItem,
  vehicle: number,
): RidePlan | null {
  const next = tileToward(geometryRoom, teleporter.tile, teleporter.dir);
  const onTrack = next !== null && items.some(
    (i) => i.ref !== teleporter.ref && PIECES.has(i.typeCode) &&
      coveredTiles(geometryRoom, i.tile, i.typeCode, i.dir).has(next),
  );
  return onTrack ? followTrack(geometryRoom, items, teleporter, teleporter.dir, vehicle) : null;
}

export function followTrack(
  geometryRoom: string | undefined,
  items: RoomItem[],
  start: RoomItem,
  startHeading: number,
  vehicle: number,
  fromTile: number = start.tile,
): RidePlan {
  // Tile -> the ride item covering it. Multi-tile pieces (hills, the river's
  // L-shaped turns) cover several tiles and all of them are track.
  const track = new Map<number, RoomItem>();
  for (const item of items) {
    if (!PIECES.has(item.typeCode)) continue;
    for (const tile of coveredTiles(geometryRoom, item.tile, item.typeCode, item.dir).keys()) {
      track.set(tile, item);
    }
  }

  const steps: RidePlan["steps"] = [];
  let tile = fromTile;
  let current: RoomItem = start;
  // A loop brings you back to the start; anything else that repeats a
  // (tile, heading) is a cycle with no start in it, which would run forever.
  const visited = new Set<string>();
  const MAX_STEPS = 400;
  const done = (end: string, heading: number): RidePlan => ({
    start, vehicle, steps, end, endFacing: heading,
  });

  for (;;) {
    // The start sends you along its facing; after that each piece carries you
    // on from the way you came in, or ends the ride if it does not connect.
    const arrived = steps.length ? steps[steps.length - 1].facing : null;
    const heading = arrived === null ? startHeading : exitHeading(geometryRoom, track, current, tile, arrived);
    if (heading === null) return done("piece does not connect", arrived ?? startHeading);
    if (steps.length >= MAX_STEPS) return done("step limit", heading);

    const next = tileToward(geometryRoom, tile, heading);
    const nextItem = next === null ? undefined : track.get(next);
    if (next === null || !nextItem) return done("end of track", heading);
    if (nextItem.ref === start.ref && current.ref !== start.ref) {
      steps.push({ tile: next, facing: heading });
      return done("looped back to start", start.dir);
    }
    // ⚠ A teleporter has ONE open end: the side it faces, where its track
    // joins. A ride enters only through it, i.e. heading the opposite way;
    // meeting the back or side of one ends the ride before it. Every dark-ride
    // scene in dark-rides.json meets its exit teleporter this way round.
    if (PIECES.get(nextItem.typeCode)?.kind === "teleporter" && heading !== (nextItem.dir + 4) % 8) {
      return done("teleporter entered from the back", heading);
    }
    const key = `${next},${heading}`;
    if (visited.has(key)) return done("cycle without start", heading);
    visited.add(key);

    steps.push({ tile: next, facing: heading });
    tile = next;
    current = nextItem;
    if (PIECES.get(nextItem.typeCode)?.kind === "teleporter") {
      return done("teleporter", heading);
    }
    // Another start in the middle of a track is just more track.
  }
}

/**
 * Which way the piece under `tile` sends a rider who arrived heading
 * `arrived`, or null if the piece does not connect from that side.
 *
 * ⚠ TRACK IS TWO-WAY. Facing 5 is facing 3's art mirrored (and 7 is 1's), so a
 * straight at 1 and at 5 draw the same rails and nothing shows which way it
 * "points". Treating straights as one-way stopped rides on track that looked
 * perfectly joined. Only the start has a direction you can see (its arrow).
 *
 * - Straights and hills (and a start met mid-track) pass you through if you
 *   arrive along their axis.
 * - A turn at facing d joins the d side to the d+2 side (right) or the d+6
 *   side (left). Entered at its facing it turns you right/left; entered from
 *   the other end it turns you back the other way.
 * - A multi-tile turn (the river's L-bends) carries you straight while the
 *   next tile is still the same piece, and at its corner turns toward the arm
 *   that continues.
 */
function exitHeading(
  geometryRoom: string | undefined,
  track: Map<number, RoomItem>,
  item: RoomItem,
  tile: number,
  arrived: number,
): number | null {
  const kind = PIECES.get(item.typeCode)?.kind;
  const d = (item.dir + 8 - (TURN_ART_OFFSET.get(item.typeCode) ?? 0)) % 8;
  if (kind !== "turnLeft" && kind !== "turnRight") {
    return arrived % 4 === d % 4 ? arrived : null;
  }
  const within = (heading: number) => {
    const next = tileToward(geometryRoom, tile, heading);
    return next !== null && track.get(next)?.ref === item.ref;
  };
  if (within(arrived)) return arrived;
  for (const side of [(arrived + 2) % 8, (arrived + 6) % 8]) if (within(side)) return side;
  const joins: Record<number, number> =
    kind === "turnRight"
      ? { [d]: (d + 2) % 8, [(d + 6) % 8]: (d + 4) % 8 }
      : { [d]: (d + 6) % 8, [(d + 2) % 8]: (d + 4) % 8 };
  return joins[arrived] ?? null;
}
