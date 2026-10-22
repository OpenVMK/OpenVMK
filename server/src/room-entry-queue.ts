/**
 * The full-room queue and FastPass: what happens when a public room is at its
 * capacity and someone asks to enter it (`31 PUBLIC_SPACE_REQUEST`).
 *
 * NOT the queue BLOCKS in room-queues.ts — those walk people up to a stage
 * inside a room. This one stands outside the room, in the navigator's
 * `vmk_roomqueue_guest.window`.
 *
 * THE CLIENT (Navigator_Handler_Class / CNavigatorQueueInterface /
 * CNavigatorFastPassWindow, cast eba88a10):
 *   - `2041 [roomName, position]` opens the queue window over the loading
 *     screen. Position is 0-based. -1 closes it.
 *   - Its CANCEL sends `41`. Once more than `queue.legnth` (5) are waiting, it
 *     also offers FASTPASS. Confirming that hides the window and sends `832`.
 *   - `2832 [spaceId, instanceId, name, position]` opens the FastPass window,
 *     so the player is free to roam while keeping their place.
 *     `2834 [position]` updates it. At -1 its ENTER lights and flashes for
 *     `fast.pass.flash.time` (20 s), and pressing it sends `31 [spaceId, instanceId]`.
 *   - LEAVE on the pass sends `833`, which `2833` answers by closing the window.
 *
 * THE RULES (inferred; the server side of this is not documented). One line per
 * room, first come first served, and a FastPass keeps the place its holder
 * had. When a slot frees, the head of the line gets it:
 *   - a waiting player is let straight in;
 *   - a pass holder has it HELD for them while ENTER flashes, and the pass
 *     lapses if they do not come.
 * A held slot counts as occupied, so nobody walks in past a pass holder.
 */

/** Seconds a freed slot is held for a pass holder: the client's own countdown. */
const FAST_PASS_HOLD_MS = Number(process.env.VMK_FASTPASS_HOLD_MS ?? 20_000) + 3_000;

interface Entry {
  userId: number;
  /** The room code the player asked for (the `31` space id). */
  code: number;
  fastPass: boolean;
  /** Set while a slot is held for this pass holder. */
  held?: ReturnType<typeof setTimeout>;
}

export interface EntryQueueHooks {
  /** The most people a room holds. */
  capacity: number;
  /** How many are in `room` now. */
  population: (room: string) => number;
  /** The name the queue window shows. */
  title: (code: number) => string;
  /** Put a waiting player into the room. */
  admit: (userId: number, code: number) => void;
  queuePosition: (userId: number, title: string, position: number) => void;
  fastPassCreated: (userId: number, code: number, title: string, position: number) => void;
  fastPassPosition: (userId: number, position: number) => void;
  fastPassCancelled: (userId: number) => void;
  log: (line: string) => void;
}

let hooks: EntryQueueHooks | null = null;
/** room name -> its line, front first. Held pass holders stay at the front. */
const lines = new Map<string, Entry[]>();
/** userId -> the room whose line they are in. One line per player. */
const lineOf = new Map<number, string>();

export function configureEntryQueue(h: EntryQueueHooks): void {
  hooks = h;
}

const heldIn = (line: Entry[]) => line.filter((e) => e.held !== undefined).length;

function freeSlots(room: string): number {
  if (!hooks) return Infinity;
  return hooks.capacity - hooks.population(room) - heldIn(lines.get(room) ?? []);
}

/** Tell everyone still waiting where they stand. */
function announce(room: string): void {
  if (!hooks) return;
  const line = lines.get(room) ?? [];
  let position = 0;
  for (const entry of line) {
    if (entry.held !== undefined) continue;
    if (entry.fastPass) hooks.fastPassPosition(entry.userId, position);
    else hooks.queuePosition(entry.userId, hooks.title(entry.code), position);
    position++;
  }
}

function remove(userId: number): Entry | undefined {
  const room = lineOf.get(userId);
  if (room === undefined) return undefined;
  lineOf.delete(userId);
  const line = lines.get(room) ?? [];
  const at = line.findIndex((e) => e.userId === userId);
  if (at < 0) return undefined;
  const [entry] = line.splice(at, 1);
  if (entry.held !== undefined) clearTimeout(entry.held);
  if (line.length === 0) lines.delete(room);
  return entry;
}

/** Let the front of the line in while there is room. */
export function roomFreed(room: string | undefined): void {
  if (!hooks || room === undefined) return;
  const line = lines.get(room);
  if (!line) return;
  let changed = false;
  for (let free = freeSlots(room); free > 0; free = freeSlots(room)) {
    const next = line.find((e) => e.held === undefined);
    if (!next) break;
    changed = true;
    if (!next.fastPass) {
      remove(next.userId);
      hooks.queuePosition(next.userId, hooks.title(next.code), -1);
      hooks.log(`queue: ${next.userId} admitted to ${room}`);
      hooks.admit(next.userId, next.code);
      continue;
    }
    // A pass holder: hold the slot while ENTER flashes.
    next.held = setTimeout(() => {
      if (lineOf.get(next.userId) !== room) return;
      remove(next.userId);
      hooks?.fastPassCancelled(next.userId);
      hooks?.log(`fastpass: ${next.userId} did not come — pass for ${room} lapsed`);
      roomFreed(room);
    }, FAST_PASS_HOLD_MS);
    hooks.fastPassPosition(next.userId, -1);
    hooks.log(`fastpass: slot in ${room} held for ${next.userId}`);
  }
  if (changed) announce(room);
}

export type EntryDecision = "enter" | "queued";

/**
 * A `31` for a public room. "enter": go in now (a free slot, or the slot held
 * for your pass). "queued": the room is full, and you are now in its line.
 */
export function requestEntry(userId: number, room: string, code: number): EntryDecision {
  const mine = lines.get(room)?.find((e) => e.userId === userId);
  if (mine?.held !== undefined) {
    remove(userId);
    hooks?.log(`fastpass: ${userId} used their pass into ${room}`);
    return "enter";
  }
  // Nobody may step past people already waiting, even into a free slot.
  const waiting = (lines.get(room) ?? []).some((e) => e.held === undefined && e.userId !== userId);
  if (freeSlots(room) > 0 && !waiting) {
    if (mine) remove(userId);
    return "enter";
  }
  if (mine) {
    // Asked again from the same line (a pass holder pressing ENTER early).
    announce(room);
    return "queued";
  }
  // One line at a time: asking for another room gives up the old place.
  leaveEntryQueue(userId);
  const line = lines.get(room) ?? [];
  line.push({ userId, code, fastPass: false });
  lines.set(room, line);
  lineOf.set(userId, room);
  hooks?.log(`queue: ${userId} waiting for ${room} (${line.length} in line)`);
  announce(room);
  return "queued";
}

/** `41`, or a disconnect: out of whatever line they were in. */
export function leaveEntryQueue(userId: number): void {
  const room = lineOf.get(userId);
  const entry = remove(userId);
  if (!entry || room === undefined) return;
  if (entry.fastPass) hooks?.fastPassCancelled(userId);
  roomFreed(room);
  announce(room);
}

/** `832`: keep the place, but on a pass. */
export function takeFastPass(userId: number): void {
  const room = lineOf.get(userId);
  const line = room !== undefined ? lines.get(room) : undefined;
  const entry = line?.find((e) => e.userId === userId);
  if (!hooks || !entry || !line || room === undefined || entry.fastPass) return;
  entry.fastPass = true;
  const position = line.filter((e) => e.held === undefined).indexOf(entry);
  hooks.fastPassCreated(userId, entry.code, hooks.title(entry.code), position);
  hooks.log(`fastpass: ${userId} took a pass for ${room} at position ${position}`);
}

/** `833`: throw the pass away. */
export function discardFastPass(userId: number): void {
  const room = lineOf.get(userId);
  const entry = remove(userId);
  hooks?.fastPassCancelled(userId);
  if (entry && room !== undefined) {
    roomFreed(room);
    announce(room);
  }
}

/** Whether this player is in some room's line. */
export const inEntryQueue = (userId: number): boolean => lineOf.has(userId);
