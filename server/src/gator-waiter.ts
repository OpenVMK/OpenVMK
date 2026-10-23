/**
 * The Gator Waiter of the Blue Bayou (room 97, NPC 4009).
 *
 * "Are you hungry for some fine New Orleans cuisine? Have a seat, wave down
 * Gator Waiter! ... Make sure you say the special word or he won't serve you
 * anything!" (room description). The word was "magic" from 23 January 2008
 * (VMK wiki, "New Orleans Square").
 *
 * Client side (`vmk_npc_gatorwaiter`) he is an animation that FOLLOWS the
 * 4009 element (`#followObject`), and `CGatorWaiterHandler.elementUpdate`
 * turns every `2599 UpdateElement` into `ControlGator(dir, action)`:
 *
 *   0 Default   1 Walk   2 Talk   3 Serve   4 Idle      (markers "<Name> <dir>", dirs 0-7)
 *
 * So the server walks him by moving the element a tile at a time with action
 * 1, and everything else is the action on his current tile. `ControlGator`
 * only jumps when the marker NAME changes, so replaying the same action needs
 * a different one in between.
 *
 * ⚠ `elementUpdate` does not check the ref: ANY 2599 in the room drives him,
 * with that element's dir and state. Serving flips a table (also a 2599), so
 * every table update is followed by his own again (`out.table` callers).
 *
 * ⚠ The original `.ani` has two broken markers: "Default 0" is spelled
 * "Default0" (frame 1), and "Serve 1" plays one frame and loops into "Walk 1".
 * He never rests facing 0 or serves facing 1 here (`restDir`, `serveDir`).
 *
 * Serving is the TABLE's second state: `item_547`/`item_549` state 1 are laid
 * for dinner, state 2 (server state 1) has the bread basket, bottle and roast.
 * Nothing of the original server's script survives; the flow below is the
 * room description's: sit, wave him down, say the word.
 */
import type { RoomItem } from "./db.js";

export const GATOR_DEFAULT = 0;
export const GATOR_WALK = 1;
export const GATOR_TALK = 2;
export const GATOR_SERVE = 3;
export const GATOR_IDLE = 4;

export const SEAT = 546;
export const TABLES = new Set([547, 549]);
const SERVED = 1;

/** One tile per step: about the client's avatar hop. */
const STEP_MS = 500;
const TALK_MS = 1_600;
const SERVE_MS = 2_000;
/** A served table is cleared this long after the food arrives. */
const CLEAR_AFTER_MS = 4 * 60_000;
/** A seat counts as at a table within this many tiles of the table's tile. */
const TABLE_REACH = 3;

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const pick = <T>(xs: readonly T[]): T => xs[Math.floor(Math.random() * xs.length)];

const ASK_LINES = [
  "Evenin', %name%! What's the magic word?",
  "Mm-hm, I hear ya, %name%. Say the special word, now.",
  "Ain't nothin' comin' out the kitchen till I hear the magic word, %name%!",
];
const SERVE_LINES = [
  "One Monte Cristo, fresh from the kitchen! Enjoy, %name%!",
  "Here's your gumbo and a Mint Julep to wash it down, %name%.",
  "Bon appetit, %name%! Best table on the bayou.",
];
const ALREADY_LINES = ["Your food's right there on the table, %name%!", "Still got a full plate there, %name%!"];
const IDLE_LINES = [
  "Welcome to the Blue Bayou! Have a seat, y'all.",
  "Who's hungry? Wave me down!",
  "Fresh gumbo tonight!",
];

export interface WaiterRoom {
  /** Anyone still in the room? An empty room parks him at home. */
  occupied(): boolean;
  items(): RoomItem[];
  /** Tiles from `from` to `to` (excluding `from`); [] when there is no way. */
  route(from: number, to: number): number[];
  /** 0-7, as the avatar walks; null when the tiles are not neighbours. */
  direction(from: number, to: number): number | null;
  /** Tiles apart, or null. */
  distance(a: number, b: number): number | null;
  /** Tiles a table covers. */
  footprint(table: RoomItem): number[];
  /** Somewhere he can stand: walkable, not furniture, nobody on it. */
  standable(tile: number): boolean;
  neighbours(tile: number): number[];
}

export interface WaiterOutput {
  gator(tile: number, dir: number, action: number): void;
  chat(line: string): void;
  table(item: RoomItem, state: number): void;
}

interface Order {
  name: string;
  table: RoomItem;
  seat: number;
}

export class GatorWaiter {
  tile: number;
  dir: number;
  action = GATOR_DEFAULT;
  private busy = false;
  private orders: Order[] = [];
  private idleTimer: NodeJS.Timeout | null = null;
  private readonly clearTimers = new Map<number, NodeJS.Timeout>();

  constructor(
    private readonly home: number,
    private readonly homeDir: number,
    private readonly room: WaiterRoom,
    private readonly out: WaiterOutput,
  ) {
    this.tile = home;
    this.dir = homeDir;
    // Served tables don't outlive the server: lay them all again.
    for (const t of this.tables()) if (t.state !== 0) this.out.table(t, 0);
  }

  /** Someone came in: start the idle routine if it isn't running. */
  start(): void {
    if (!this.idleTimer && !this.busy) this.scheduleIdle();
  }

  private tables(): RoomItem[] {
    return this.room.items().filter((i) => TABLES.has(i.typeCode));
  }

  private set(tile: number, dir: number, action: number): void {
    this.tile = tile;
    this.dir = dir;
    this.action = action;
    this.out.gator(tile, dir, action);
  }

  /** Re-send his own update — after any other 2599 has hijacked his animation. */
  resend(): void {
    this.out.gator(this.tile, this.dir, this.action);
  }

  private restDir(dir: number): number {
    return dir === 0 ? 7 : dir;
  }

  private serveDir(dir: number): number {
    return dir === 1 ? 2 : dir;
  }

  /** The table a seat belongs to: the nearest within reach. */
  private tableFor(seat: number): RoomItem | null {
    let best: RoomItem | null = null;
    let bestD = Infinity;
    for (const t of this.tables()) {
      const d = Math.min(...this.room.footprint(t).map((f) => this.room.distance(seat, f) ?? Infinity));
      if (d < bestD) {
        bestD = d;
        best = t;
      }
    }
    return bestD <= TABLE_REACH ? best : null;
  }

  /** The seat (546) under `tile`, if that is where the player is. */
  seatAt(tile: number): RoomItem | null {
    return this.room.items().find((i) => i.typeCode === SEAT && i.tile === tile) ?? null;
  }

  /** A seated player waved: he asks for the word, from where he stands. */
  waved(name: string, tile: number): void {
    if (this.busy || !this.seatAt(tile)) return;
    this.say(pick(ASK_LINES), name);
  }

  /** A seated player said something: the word gets them served. */
  heard(name: string, tile: number, text: string): void {
    if (!/\bmagic\b/i.test(text)) return;
    const seat = this.seatAt(tile);
    if (!seat) return;
    const table = this.tableFor(seat.tile);
    if (!table) return;
    if (table.state === SERVED || this.orders.some((o) => o.table.ref === table.ref)) {
      if (!this.busy) this.say(pick(ALREADY_LINES), name);
      return;
    }
    this.orders.push({ name, table, seat: seat.tile });
    if (!this.busy) this.nextOrder();
  }

  private say(line: string, name: string): void {
    const dir = this.restDir(this.dir);
    this.set(this.tile, dir, GATOR_TALK);
    this.out.chat(line.replace(/%name%/g, name));
    setTimeout(() => {
      if (this.action === GATOR_TALK && !this.busy) this.set(this.tile, dir, GATOR_DEFAULT);
    }, TALK_MS);
  }

  private scheduleIdle(): void {
    if (this.idleTimer) clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      this.idleTimer = null;
      if (!this.room.occupied()) {
        this.orders = [];
        return;
      }
      if (!this.busy) {
        if (Math.random() < 0.3) {
          this.say(pick(IDLE_LINES), "");
        } else {
          // Idle plays once and returns to Default on its own; Default first so
          // the marker name changes and it plays again.
          this.set(this.tile, this.dir, GATOR_DEFAULT);
          setTimeout(() => !this.busy && this.set(this.tile, this.dir, GATOR_IDLE), 300);
        }
      }
      this.scheduleIdle();
    }, rand(15_000, 30_000));
  }

  /** Where to stand to serve: a free tile beside the table, nearest the customer. */
  private serviceTile(table: RoomItem, seat: number): number | null {
    const covered = new Set(this.room.footprint(table));
    let best: number | null = null;
    let bestD = Infinity;
    for (const f of covered) {
      for (const n of this.room.neighbours(f)) {
        if (covered.has(n) || !this.room.standable(n)) continue;
        if (this.room.route(this.tile, n).length === 0 && n !== this.tile) continue;
        const d = this.room.distance(n, seat) ?? Infinity;
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
    }
    return best;
  }

  private nextOrder(): void {
    const order = this.orders.shift();
    if (!order) {
      this.busy = true;
      this.walk(this.home, () => {
        this.busy = false;
        this.set(this.home, this.homeDir, GATOR_DEFAULT);
        this.scheduleIdle();
      });
      return;
    }
    this.busy = true;
    const spot = this.serviceTile(order.table, order.seat);
    if (spot === null) {
      this.busy = false;
      this.nextOrder();
      return;
    }
    this.walk(spot, () => {
      const faceTo = this.room.footprint(order.table).find((f) => this.room.direction(spot, f) !== null);
      const face = this.serveDir(faceTo !== undefined ? this.room.direction(spot, faceTo)! : this.dir);
      this.set(spot, face, GATOR_TALK);
      this.out.chat(pick(SERVE_LINES).replace(/%name%/g, order.name));
      setTimeout(() => {
        this.set(spot, face, GATOR_SERVE);
        setTimeout(() => {
          this.out.table(order.table, SERVED);
          order.table.state = SERVED;
          this.set(spot, this.restDir(face), GATOR_DEFAULT);
          this.clearLater(order.table);
          setTimeout(() => this.nextOrder(), 600);
        }, SERVE_MS);
      }, TALK_MS);
    });
  }

  private clearLater(table: RoomItem): void {
    const old = this.clearTimers.get(table.ref);
    if (old) clearTimeout(old);
    this.clearTimers.set(
      table.ref,
      setTimeout(() => {
        this.clearTimers.delete(table.ref);
        table.state = 0;
        this.out.table(table, 0);
      }, CLEAR_AFTER_MS),
    );
  }

  /** Walk to `to` a tile per step, then `done` (also when there is no way). */
  private walk(to: number, done: () => void): void {
    const path = this.room.route(this.tile, to);
    const step = (i: number) => {
      if (i >= path.length) {
        done();
        return;
      }
      const next = path[i];
      const dir = this.room.direction(this.tile, next) ?? this.dir;
      this.set(next, dir, GATOR_WALK);
      setTimeout(() => step(i + 1), STEP_MS);
    };
    step(0);
  }
}
