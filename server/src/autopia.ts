/**
 * AUTOPIA: the Quest Track (room 77), the Space Race (74) and Off Road on
 * Mars (75). Each room has a `road` floor, where players walk in, and a
 * `track` floor reached through its gate, where they drive.
 *
 * What survives of Disney's version:
 *   - the texts: 4591 / 4597 (the Quest Track needs a car), 4589 / 4596 (the
 *     race tracks need a car AND the Driver's License pin, 2134);
 *   - the art: `vmk_collectibles`, which the client loads in exactly these
 *     rooms (and the Nautilus ones), holds `item_382` "Collectable Fuel" and
 *     `item_388` "Collectable Reward" (a trophy);
 *   - the client's collectable support: `_CreateElements` categories 6/7, and
 *     `_RemoveElement` playing the pickup's DisAppear sound.
 * The rules are the wiki's: on the Quest Track "collect three gas cans and you
 * will obtain your driver's license"; on the race tracks "collect gas cans to
 * stay on longer, and collect trophies for credits".
 *
 * Everything numeric (how many spawn, how much time a can buys) is ours.
 *
 * ⚠ Which of 6/7 Disney used for fuel vs reward is not known; the client
 * treats them alike. Fuel is 6 and reward 7 here.
 */
import { MSG, type OutgoingParam } from "./vmk-protocol.js";

export const FUEL_TYPE = 382;
export const TROPHY_TYPE = 388;
export const LICENSE_PIN = 2134;
const FUEL_CATEGORY = 6;
const TROPHY_CATEGORY = 7;
const REF_BASE = 930000;

/** The car effects (`wlk_carback_<code>`), see magic-pins.ts. */
export const isCarEffect = (effect: number | undefined): boolean =>
  effect !== undefined && effect >= 100 && effect <= 115;

export const TRACK_FLOOR = "track";

export interface AutopiaRoom {
  /** The race tracks also need the Driver's License pin. */
  license: boolean;
  /** Gas cans kept on the track. */
  cans: number;
  /** Trophies kept on the track (1 credit each). */
  trophies: number;
  /** Refusal at the gate, and for teleporting onto the track. */
  gateError: number;
  teleportError: number;
  /** The tip sent the first time a player drives onto this track. */
  tip: string;
}

const QUEST_TRACK: AutopiaRoom = {
  license: false,
  cans: 4,
  trophies: 0,
  gateError: 4591,
  teleportError: 4597,
  tip:
    "Autopia tip: drive over 3 gas cans on the Quest Track to earn your Driver's License! " +
    "Every gas can also keeps your car running a little longer.",
};
const RACE_TRACK: AutopiaRoom = {
  license: true,
  cans: 5,
  trophies: 3,
  gateError: 4589,
  teleportError: 4596,
  tip:
    "Autopia tip: gas cans keep you on the track longer - when your gas runs out, you're back at the gate. " +
    "Trophies pop up around the track too: drive over one for 1 credit!",
};

export const AUTOPIA_ROOMS: ReadonlyMap<number, AutopiaRoom> = new Map([
  [77, QUEST_TRACK],
  [74, RACE_TRACK],
  [75, RACE_TRACK],
]);
export const QUEST_TRACK_CODE = 77;

/** Time a gas can adds to the car, in ms. */
export const GAS_MS = Number(process.env.VMK_AUTOPIA_GAS_MS ?? 15_000);
/** Cans for the license on the Quest Track, in one drive. */
export const LICENSE_CANS = 3;
/** How often an emptied spot on the track refills. */
const SPAWN_MS = Number(process.env.VMK_AUTOPIA_SPAWN_MS ?? 6_000);

export interface Collectable {
  ref: number;
  type: number;
  tile: number;
}

interface TrackState {
  items: Map<number, Collectable>; // by tile
  timer: NodeJS.Timeout;
}

export interface AutopiaDeps {
  /** Track tiles a collectable may sit on (not a gate). */
  spawnTiles: () => number[];
  /** Tiles players stand on now. */
  occupied: () => Set<number>;
  /** Everyone in the room, or nobody once it is empty. */
  broadcast: (msg: number, params: OutgoingParam[]) => boolean;
}

const tracks = new Map<string, TrackState>();
let nextRef = 0;

/** `2586` for some collectables: category 6/7, dir then state 0 (so the pickup animates). */
export function collectableElements(items: Collectable[]): OutgoingParam[] {
  const params: OutgoingParam[] = [{ int: items.length }];
  for (const c of items) {
    params.push(
      { int: c.ref },
      { int: c.type },
      { int: c.type === TROPHY_TYPE ? TROPHY_CATEGORY : FUEL_CATEGORY },
      { int: c.tile },
      { int: 0 },
      { int: 2 },
      { int: 5 },
      { int: 0 },
    );
  }
  return params;
}

/** What is on the track now, for someone entering the room. */
export function collectablesIn(bucket: string | undefined): Collectable[] {
  return bucket ? [...(tracks.get(bucket)?.items.values() ?? [])] : [];
}

function topUp(bucket: string, rules: AutopiaRoom, deps: AutopiaDeps, state: TrackState): boolean {
  const free = deps.spawnTiles().filter((t) => !state.items.has(t) && !deps.occupied().has(t));
  const spawned: Collectable[] = [];
  const add = (type: number, want: number) => {
    const have = [...state.items.values()].filter((c) => c.type === type).length;
    for (let i = have; i < want && free.length > 0; i++) {
      const tile = free.splice(Math.floor(Math.random() * free.length), 1)[0];
      const c = { ref: REF_BASE + (nextRef++ % 60000), type, tile };
      state.items.set(tile, c);
      spawned.push(c);
    }
  };
  add(FUEL_TYPE, rules.cans);
  add(TROPHY_TYPE, rules.trophies);
  if (spawned.length === 0) return true;
  return deps.broadcast(MSG.CREATE_ELEMENTS, collectableElements(spawned));
}

/**
 * Keep the track stocked while anyone is in the room. The first visitor fills
 * it at once; afterwards a taken spot refills every `SPAWN_MS`, so the track
 * is never bare for long. Stops (and forgets the items) once the room empties.
 */
export function ensureAutopiaTrack(bucket: string, rules: AutopiaRoom, deps: AutopiaDeps): void {
  if (tracks.has(bucket)) return;
  const state: TrackState = { items: new Map(), timer: undefined as unknown as NodeJS.Timeout };
  tracks.set(bucket, state);
  // Filled now, so the room's first `2586` can include them.
  topUpSilently(rules, deps, state);
  state.timer = setInterval(() => {
    if (!topUp(bucket, rules, deps, state)) {
      clearInterval(state.timer);
      tracks.delete(bucket);
    }
  }, SPAWN_MS);
}

function topUpSilently(rules: AutopiaRoom, deps: AutopiaDeps, state: TrackState): void {
  topUp("", rules, { ...deps, broadcast: () => true }, state);
}

/** Drive over a tile: the collectable there, now gone for everyone. */
export function takeCollectable(bucket: string | undefined, tile: number, deps: Pick<AutopiaDeps, "broadcast">): Collectable | null {
  const state = bucket ? tracks.get(bucket) : undefined;
  const c = state?.items.get(tile);
  if (!state || !c) return null;
  state.items.delete(tile);
  deps.broadcast(MSG.REMOVE_ELEMENT, [{ int: c.ref }]);
  return c;
}
