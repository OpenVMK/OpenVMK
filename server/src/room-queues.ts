/**
 * Queue lines: the Disney-staff "queue blocks" that walk players up to an
 * attraction one at a time (the Steamboat stage, and later the ride lines, the
 * Monorail Music Mixer, Checkers).
 *
 * WHAT THE CLIENT DOES: nearly nothing. `CRoomItemQueueBlock` only relabels the
 * tile under it `CLASS "queue"`, which changes the hover highlight
 * (`queue_hiliter_<tileSize>`); a click is an ordinary move. Most queue-block
 * types have no furnimap art at all. Everything below was the server's.
 *
 * WHERE THE ROUTES COME FROM: the room layouts NAME them. The Steamboat's
 * `room.steamboat.object.xml` spells out the stage, Disney's typos included:
 *
 *   start_queue 8 -> queue_up 5 -> gueue_turn 0 -> gueue_right 179 -> podium 1
 *                 -> gueue_exit_1 2 -> queue_exit_2 3 -> queue_exitturn 4 -> queue_exitdown 6
 *
 * i.e. up the left stairs, along the stage to the podium, off to the right and
 * down. The Fantasyland Courtyard (`pan_queue_1..5`, `alice_queue_1..5`), the
 * Monorail train (`queueu_1..11`, `queueu_play`), Checkers and Tomorrowland Hub
 * carry their own lines the same way.
 *
 * THE RULES (inferred — nothing documents them; queue blocks were never a
 * player item): step onto the join tile to get in line; everyone moves up as
 * soon as the place ahead frees; the front of the line steps onto the stage
 * when it is empty, stays `holdMs`, then walks the exit path and is released.
 * The line, stage and exit tiles are not walkable by hand.
 */

export interface QueueDef {
  /** A name for logs. */
  name: string;
  /** Geometry room name (`room-geometry.json` key). */
  room: string;
  /** Waiting places, BACK to FRONT. The first is where you join. */
  line: number[];
  /** Where the front of the line goes when it is its turn. */
  stage: number;
  /** Walked after the turn is over, in order; you are released on the last. */
  exit: number[];
  /** How long a turn on the stage lasts. */
  holdMs: number;
  /**
   * Which way to face once on the stage (0..7, `directionBetween`'s index), or
   * undefined to keep the facing you walked in with.
   */
  stageFacing?: number;
  /**
   * A SEAT rather than a turn: whoever reaches the stage stays there until the
   * owner of the queue releases them (`releaseSeat`) — the rocket leaving —
   * instead of for `holdMs`. `exit` is then unused.
   */
  holdUntilReleased?: boolean;
  /**
   * Named gate (`setQueueGate`): while it answers false, the front of the line
   * waits rather than taking the stage — boarding closed.
   */
  gate?: string;
  /**
   * A turn the SERVER ends (`stepDown`) instead of a timer — the music stages,
   * where the turn lasts as long as the song the performer picks. The stage
   * hook (`setStageHook`) runs when the performer arrives.
   */
  hosted?: boolean;
}

const gates = new Map<string, (roomInstance: string) => boolean>();
const stageHooks = new Map<string, (roomInstance: string, userId: number) => void>();
/** Run `hook` whenever someone reaches the stage of the queue named `name`. */
export function setStageHook(name: string, hook: (roomInstance: string, userId: number) => void): void {
  stageHooks.set(name, hook);
}
/** Open/close a queue by name: see `QueueDef.gate`. Call `nudgeQueues` when it opens. */
export function setQueueGate(name: string, isOpen: (roomInstance: string) => boolean): void {
  gates.set(name, isOpen);
}

export const MONORAIL_MIXER_STAGE = "Monorail music stage";
export const STREET_MIXER_STAGE = "Street Party music stage";

export const QUEUES: QueueDef[] = [
  {
    name: "Steamboat stage",
    room: "steamboat",
    line: [8, 5, 0, 179],
    stage: 1,
    exit: [2, 3, 4, 6],
    holdMs: Number(process.env.VMK_PODIUM_HOLD_MS ?? 20_000),
    // Face the audience. The theatre rows sit at +y of the stage and face 1
    // (toward it — assets/seat-facing.json); the performer faces back, 5.
    stageFacing: 5,
  },
  /**
   * Tomorrowland Hub rocket to Space Mountain: two short lines side by side,
   * `queue_start_N` -> `queue_board_N` -> the rocket seat `sit_rocket_N`. The
   * seat is held until the rocket leaves (see the rocket shuttle in
   * mus-server.ts), and the lines only move while it is boarding.
   */
  {
    name: "Hub rocket line 1",
    room: "tomorrowland_hub",
    line: [248, 246],
    stage: 251,
    exit: [],
    holdMs: 0,
    holdUntilReleased: true,
    gate: "hub-rocket",
  },
  {
    name: "Hub rocket line 2",
    room: "tomorrowland_hub",
    line: [249, 247],
    stage: 253,
    exit: [],
    holdMs: 0,
    holdUntilReleased: true,
    gate: "hub-rocket",
  },
  /**
   * The Music Mixer stages: line up, step up, pick one of your mixes, dance
   * while the room hears it, walk off (music-mixer.ts; the song picker and the
   * turn's end are the server's — `hosted`).
   *
   * Monorail: Disney's own tiles, `room.monorail_train.object.xml` —
   * `queueu_start` 169 -> `queueu_1..6` -> `queueu_play` 71 by the DJ table ->
   * `queueu_7..11` -> `queueu_leave` 13.
   */
  {
    name: MONORAIL_MIXER_STAGE,
    room: "monorail_train",
    line: [169, 168, 167, 146, 126, 111, 91],
    stage: 71,
    exit: [51, 318, 316, 317, 12, 13],
    holdMs: 0,
    hosted: true,
    // Face the DJ table while mixing. Arriving from `queueu_6` leaves him facing
    // 1 — out at the chairs; 5 was wrong too. 3 is the table, per the user
    // standing there and turning to it.
    stageFacing: 3,
  },
  /**
   * Street Party lobby. The room layout names no line (Disney placed it with
   * Music Mixer queue-block furniture, 77/78); the tiles are from the user, who
   * played it. The WHOLE route is the line, so the DJ mixer can only be reached
   * through it: up the ramp column x=-12 (258 z8, 241 z18, 223.. z22) to the
   * mixer at 170 (z22). The ground run 325 -> 257 in front of it was a second,
   * separate line (the user) — removed.
   */
  {
    name: STREET_MIXER_STAGE,
    room: "musicmix",
    line: [258, 241, 223, 205, 187],
    stage: 170,
    // On along the same column and down its far side to the ground (the user).
    exit: [154, 138, 124, 110],
    holdMs: 0,
    hosted: true,
    // Facing the DJ mixer — recorded from the user turned to it.
    stageFacing: 3,
  },
];

/** What the engine needs from a player's connection. */
export interface QueueMember {
  userId: number;
  /**
   * Walk these tiles one hop at a time, then stand — turned to `face` if given.
   * `onDone` runs after the last.
   */
  walk(tiles: number[], onDone?: () => void, face?: number): void;
}

interface Running {
  def: QueueDef;
  roomInstance: string;
  /** Front of the line first. */
  waiting: Array<{ member: QueueMember; place: number }>;
  performer: QueueMember | null;
  timer?: ReturnType<typeof setTimeout>;
}

/** Keyed `${roomInstance}|${queueName}` — a room instance is the occupancy key. */
const running = new Map<string, Running>();

const keyOf = (roomInstance: string, def: QueueDef) => `${roomInstance}|${def.name}`;

/** The queues in a geometry room. */
export function queuesIn(geometryRoom: string | undefined): QueueDef[] {
  return QUEUES.filter((q) => q.room === geometryRoom);
}

/** Every tile a queue owns — not walkable by hand, except the join tile. */
export function managedTiles(def: QueueDef): number[] {
  return [...def.line, def.stage, ...def.exit];
}

/** The queue (in this geometry room) owning `tile`, if any. */
export function queueAt(geometryRoom: string | undefined, tile: number): QueueDef | undefined {
  return queuesIn(geometryRoom).find((q) => managedTiles(q).includes(tile));
}

/** Tiles a hand-walk must route around in this room. */
export function blockedByQueues(geometryRoom: string | undefined): number[] {
  return queuesIn(geometryRoom).flatMap((q) => managedTiles(q).filter((t) => t !== q.line[0]));
}

/** Where this user is in a queue of this room, if anywhere. */
export function queuedIn(roomInstance: string, userId: number): { def: QueueDef; onStage: boolean } | undefined {
  for (const [key, run] of running) {
    if (!key.startsWith(`${roomInstance}|`)) continue;
    if (run.performer?.userId === userId) return { def: run.def, onStage: true };
    if (run.waiting.some((w) => w.member.userId === userId)) return { def: run.def, onStage: false };
  }
  return undefined;
}

/** A player arrived on the join tile. */
export function joinQueue(roomInstance: string, def: QueueDef, member: QueueMember): void {
  const key = keyOf(roomInstance, def);
  const run = running.get(key) ?? { def, roomInstance, waiting: [], performer: null };
  running.set(key, run);
  if (run.performer?.userId === member.userId || run.waiting.some((w) => w.member.userId === member.userId)) return;
  if (run.waiting.length >= def.line.length) return; // full: the join tile itself is taken
  run.waiting.push({ member, place: 0 }); // standing on line[0]
  console.log(`[queue] ${def.name} (${roomInstance}): user ${member.userId} joined, ${run.waiting.length} waiting`);
  advance(run);
}

/**
 * Leave the line (a click elsewhere, leaving the room, disconnecting).
 * Returns what they were doing, so the caller can place them. A performer who
 * leaves by clicking is walked off along the exit instead — see `stepDown`.
 */
export function leaveQueue(roomInstance: string, userId: number): "waiting" | "performer" | null {
  for (const [key, run] of running) {
    if (!key.startsWith(`${roomInstance}|`)) continue;
    const i = run.waiting.findIndex((w) => w.member.userId === userId);
    if (i >= 0) {
      run.waiting.splice(i, 1);
      advance(run);
      return "waiting";
    }
    if (run.performer?.userId === userId) {
      clearTimeout(run.timer);
      run.performer = null;
      advance(run);
      return "performer";
    }
  }
  return null;
}

/** A performer asked to get down early: walk the exit now. */
export function stepDown(roomInstance: string, userId: number): boolean {
  for (const [key, run] of running) {
    if (!key.startsWith(`${roomInstance}|`) || run.performer?.userId !== userId) continue;
    clearTimeout(run.timer);
    finishTurn(run);
    return true;
  }
  return false;
}

/** Everyone seated (on a `holdUntilReleased` stage) behind this gate in this room. */
export function seatedBehind(roomInstance: string, gate: string): number[] {
  const out: number[] = [];
  for (const run of running.values()) {
    if (run.roomInstance === roomInstance && run.def.gate === gate && run.performer) out.push(run.performer.userId);
  }
  return out;
}

/**
 * Empty the seats behind this gate WITHOUT walking anyone — the caller moves
 * them (the rocket carries them off) — and let the lines move up.
 */
export function releaseSeats(roomInstance: string, gate: string): number[] {
  const released: number[] = [];
  for (const run of running.values()) {
    if (run.roomInstance !== roomInstance || run.def.gate !== gate || !run.performer) continue;
    released.push(run.performer.userId);
    clearTimeout(run.timer);
    run.performer = null;
    advance(run);
  }
  return released;
}

/** Re-run every line in the room — call when a gate opens. */
export function nudgeQueues(roomInstance: string): void {
  for (const run of running.values()) if (run.roomInstance === roomInstance) advance(run);
}

function finishTurn(run: Running): void {
  const performer = run.performer;
  if (!performer) return;
  performer.walk(run.def.exit, () => {
    if (run.performer === performer) run.performer = null;
    advance(run);
  });
}

/**
 * Move everyone up. The front person takes the stage when it is empty; each
 * waiting person then walks forward along the line to their new place.
 */
function advance(run: Running): void {
  const { def } = run;
  const open = def.gate === undefined || (gates.get(def.gate)?.(run.roomInstance) ?? false);
  if (!run.performer && run.waiting.length > 0 && open) {
    const front = run.waiting.shift()!;
    run.performer = front.member;
    const path = def.line.slice(front.place + 1).concat(def.stage);
    console.log(
      `[queue] ${def.name}: user ${front.member.userId} takes the ` +
        (def.holdUntilReleased ? "seat" : `stage for ${def.holdMs}ms`),
    );
    front.member.walk(path, () => {
      if (run.performer !== front.member || def.holdUntilReleased) return;
      if (def.hosted) {
        try {
          stageHooks.get(def.name)?.(run.roomInstance, front.member.userId);
        } catch (cause) {
          console.log(`[queue] ${def.name}: stage hook failed — ${(cause as Error).message}`);
        }
        return;
      }
      run.timer = setTimeout(() => finishTurn(run), def.holdMs);
    }, def.stageFacing);
  }
  // Everyone else closes up: the front waiting person to the front place, etc.
  run.waiting.forEach((w, i) => {
    const target = def.line.length - 1 - i;
    if (w.place >= target) return;
    const path = def.line.slice(w.place + 1, target + 1);
    w.place = target;
    w.member.walk(path);
  });
}
