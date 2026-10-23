/**
 * The Haunted Mansion's hitchhiking ghosts — Phineas (60, the Stretching
 * Room), Ezra (65, the Ballroom) and Gus (66, the Attic). They are NPCs like
 * the rest (npcs.ts), but they ROAM: "not always around, you may have to wait
 * to find" them (VMK wiki, "Non-Player Characters").
 *
 * Client side (`vmk_npc_ghost_N`) the ghost is the room node `ghost_N`, and it
 * goes wherever its element goes:
 *
 *   - `CRoomItemGhostPlacer.update` (the 4006-4008 element class) broadcasts
 *     `#ghost_N_update` with the element every frame;
 *   - `CGhostInterface.update` glides the node to the element's `GetScrPos`
 *     over ~500 ms, or jumps there (`#warp`) when it next appears from hiding.
 *
 * So roaming is the server moving the element (`2599 UpdateElement`, a new
 * place ref). The animation is `2792 [ref, state]`, `CGhostHandler`:
 *
 *   0 StayHidden   1 Appear   2 idle   3 speak   4 DisAppear
 *
 * Every one of those loops plays ONCE and freezes on its last frame
 * (`#loopCount: 1`, `#freeze: 1`; `CArrangement.update` stops at the end), so
 * a visible ghost only bobs while it is told to — the idle is re-sent on a pulse.
 * Loop lengths at the stage's 24 fps: appear 27 frames, disappear 28, idle 18,
 * talk 36.
 *
 * Nothing of the original server's timing survives; the cycle below is
 * hidden -> appear somewhere -> drift about, idling and talking -> fade.
 */
import type { Npc } from "./npcs.js";

export const GHOST_HIDDEN = 0;
export const GHOST_APPEAR = 1;
export const GHOST_IDLE = 2;
export const GHOST_SPEAK = 3;
export const GHOST_DISAPPEAR = 4;

const APPEAR_MS = 1_200; // 27 frames
const DISAPPEAR_MS = 1_250; // 28 frames
const IDLE_PULSE_MS = 1_500; // the 18-frame bob, plus a held pause
const SPEAK_MS = 1_600; // 36 frames
/** The client glides a move over 500 ms; one tile per step, a beat apart. */
const STEP_MS = 750;

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const pick = <T>(xs: readonly T[]): T => xs[Math.floor(Math.random() * xs.length)];

export interface GhostFloor {
  /** Tiles the ghost may appear on. */
  tiles: number[];
  /** Walking neighbours of a tile — where a drift step may go. */
  neighbours(tile: number): number[];
}

export interface GhostOutput {
  /** Anyone still in the room? An empty room stops the ghost. */
  occupied(): boolean;
  state(state: number): void;
  move(tile: number): void;
  chat(line: string): void;
}

export class Ghost {
  tile: number;
  state = GHOST_HIDDEN;
  /** When `state` began, for `2791`'s age. */
  since = Date.now();
  private timer: NodeJS.Timeout | null = null;
  /** End of the current visit; past it the ghost fades. */
  private visibleUntil = 0;
  private nextSpeech = 0;
  private nextDrift = 0;
  private readonly allowed: Set<number>;

  constructor(
    readonly npc: Npc,
    private readonly floor: GhostFloor,
    private readonly out: GhostOutput,
  ) {
    this.allowed = new Set(floor.tiles);
    this.tile = floor.tiles.length > 0 ? pick(floor.tiles) : npc.tile;
  }

  get running(): boolean {
    return this.timer !== null;
  }

  /** Visible — the only time double-clicking it finds anything. */
  get visible(): boolean {
    return this.state === GHOST_APPEAR || this.state === GHOST_IDLE || this.state === GHOST_SPEAK;
  }

  /** The age `2791` reports for a late arrival, so its loop joins mid-way. */
  get age(): number {
    return Date.now() - this.since;
  }

  /** Someone came in: start haunting if the ghost was resting. */
  start(): void {
    if (this.timer) return;
    // A short first wait: a fresh visitor shouldn't have to wait out a long one.
    this.later(rand(4_000, 12_000), () => this.appear());
  }

  stop(): void {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    this.set(GHOST_HIDDEN);
  }

  private later(ms: number, fn: () => void): void {
    this.timer = setTimeout(() => {
      if (!this.out.occupied()) {
        this.stop();
        return;
      }
      fn();
    }, ms);
  }

  private set(state: number): void {
    this.state = state;
    this.since = Date.now();
  }

  private send(state: number): void {
    this.set(state);
    this.out.state(state);
  }

  private appear(): void {
    // Moved while still hidden: the node is blank, and `Appear` warps it.
    const tile = this.floor.tiles.length > 0 ? pick(this.floor.tiles) : this.tile;
    if (tile !== this.tile) {
      this.tile = tile;
      this.out.move(tile);
    }
    const now = Date.now();
    this.visibleUntil = now + rand(45_000, 90_000);
    this.nextSpeech = now + rand(4_000, 10_000);
    this.nextDrift = now + rand(5_000, 9_000);
    this.later(400, () => {
      this.send(GHOST_APPEAR);
      this.later(APPEAR_MS, () => this.haunt());
    });
  }

  /** One beat of a visit: fade, talk, drift, or bob in place. */
  private haunt(): void {
    const now = Date.now();
    if (now >= this.visibleUntil) {
      this.send(GHOST_DISAPPEAR);
      this.later(DISAPPEAR_MS, () => {
        this.set(GHOST_HIDDEN);
        this.later(rand(20_000, 50_000), () => this.appear());
      });
      return;
    }
    if (now >= this.nextSpeech && this.npc.chatter.length > 0) {
      this.nextSpeech = now + rand(15_000, 30_000);
      this.send(GHOST_SPEAK);
      this.out.chat(pick(this.npc.chatter));
      this.later(SPEAK_MS, () => this.haunt());
      return;
    }
    if (now >= this.nextDrift) {
      this.nextDrift = now + rand(6_000, 12_000);
      this.drift(Math.floor(rand(1, 4)));
      return;
    }
    this.send(GHOST_IDLE);
    this.later(IDLE_PULSE_MS, () => this.haunt());
  }

  /** Float `steps` tiles, one neighbour at a time, never straight back. */
  private drift(steps: number, from?: number): void {
    const options = this.floor.neighbours(this.tile).filter((t) => t !== from && this.allowed.has(t));
    if (steps <= 0 || options.length === 0) {
      this.haunt();
      return;
    }
    const prev = this.tile;
    this.tile = pick(options);
    this.out.move(this.tile);
    // Bob while it floats, so it isn't frozen mid-glide.
    this.send(GHOST_IDLE);
    this.later(STEP_MS, () => this.drift(steps - 1, prev));
  }
}
