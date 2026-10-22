/**
 * Pirates of the Caribbean — one running match: Ship Battle (LMS, mode 2) or
 * Capture the Flag (CTF, mode 1).
 *
 * THE START (all of it the shared `minigame_engine_potc2` protocol):
 *
 *   2613 prepare room  -> CPiratesComponent.PrepareRoom: room_switch to
 *                         "pirates_game", then the client sends 580 itself.
 *                         The 580 moves the player into this match's own
 *                         occupancy bucket (`potc#<ref>`), so lobby traffic
 *                         stays out and in-game chat stays in.
 *   2614 participants  -> `ref, name` per human (names for the score screens).
 *   2607 load stage    -> `pirates_level<L>_stage<S>`, params {m: mode}.
 *                         room_switch to the stage, room_ready, InitGameEngine,
 *                         then the client sends 602.
 *   602                -> that client gets 2605 (every object but its ship)
 *                         and 2610 (its ship: GetMyObjects()[1] is "my ship").
 *                         ⚠ Not before: objects created before
 *                         StartMinigameEngine have no room context and come
 *                         out VOID.
 *   2611 start stage   -> STARTTIME countdown; turns already flow, inputs are
 *                         ignored until it is over.
 *   2601 every 0.3 s   -> `m_fTurnPulse` of the 2006 engine; 3 subturns each.
 *   2612 end stage     -> `[winner, team1, team2, lastStage, flagBonus1,
 *                         flagBonus2, cancelled, winningBonus, endInfo]`.
 *
 * Every outcome is the server's: hits (13), kills (6), pickups (11), splashes
 * (12), blow-ups (30). The client only flashes a ball where it touches a ship.
 *
 * RULES — the game's own instructions (`pirates.instructions.text.page.1-9`)
 * first, then the DisneysOnlineWorlds wiki. Both modes are best of three.
 *
 *   - Hits: 5 gold. Ship Battle keeps it on board (half goes to whoever sinks
 *     you; it is banked at each stage end); CTF puts it in the team vault.
 *   - Sinking: "sometimes" the crew escapes in a rowboat (36) — slow, unarmed,
 *     sunk by one hit, refitted (37) at its own base; otherwise a wreck (6)
 *     that can be blown up (30). ROWBOAT_CHANCE is a guess.
 *   - Golden cannonball: one hit sinks any ship.
 *   - Kraken: a ship that sits still too long is hunted and devoured.
 *   - Moonlight: level 2 has a drifting beam that makes ships invincible;
 *     level 3 has a button for it, with a cooldown.
 *   - Idle players are warned (33) and then booted.
 *   - Payout (wiki): Ship Battle your loot, CTF your share of the team vault
 *     plus your bonuses; +100 for a win; a quarter with AI ships.
 *   - Leaving early forfeits gold and the 21-credit price (pirates.ts).
 *   - Wins: 10 on level 1 open level 2; 10 on level 2 plus Captain Blackheart
 *     open level 3; every 3rd win on a level gives its treasure key; 5/10/50
 *     wins pay 50/100/500 credits. Games with AI ships count too.
 * Stage length is not in any surviving data: VMK_POTC_STAGE_SECONDS.
 *
 * CAPTURE THE FLAG (the client's events 11/34-38 and `pirates.endinfo.0-9`):
 *   - Each team's flag is a type-3 pickup by its base; only an ENEMY ship not
 *     already carrying one picks it up (`CPiratesFactorPowerup.move`).
 *   - Bringing it to your own base (38) wins the stage outright, rowboat or
 *     not: 50 gold to every team member. Holding it on board when the stage
 *     ends: 25. If only one team is left afloat, it wins.
 *   - A dropped flag stays in the sea; its own team returns it home by
 *     touching it. The drop-flag button / down arrow is action 8.
 *   - At time-out the texts rank: flag in base, flag on board, flag nearest
 *     home, then the team's gold; ties go to Lady Luck.
 *   - No AI ships: Disney's lobby only offers them in Ship Battle.
 */
import { addPotcWin } from "./db.js";
import { recordScore } from "./jungle-cruise.js";
import {
  angleFromComponents, BIT, encodeObject, encodeTurn, loadStage, makeShip, nextTurn, shipAlive, shipWreck,
  baseVelX, baseVelY, carriesEnemyFlag, carriesFlag, shipRowboat, testBit, TYPE, World,
  type GObj, type Outcome, type Powerup, type Ship, type StageDef,
} from "./pirates-engine.js";
import type { Participant, PotcPlayer } from "./pirates.js";
import { MSG, type OutgoingParam } from "./vmk-protocol.js";

export const POTC_LMS_GAME_CODE = 7; // `DisplayHighscore(7, …)` in CPPSInterface
export const POTC_CTF_GAME_CODE = 6; // `DisplayHighscore(6, "highscores.ctf")`
const MODE_CTF = 1;
/** How far from a hull a dropped flag lands: clear of the triple circle (2500) plus the pickup (550). */
const FLAG_DROP_DISTANCE = 3600;
/** Hull and ammo a rowboat gets back at its own base (event 37). */
const REFIT_AMMO = 3;
/** "Sometimes" a sunk crew escapes in a rowboat (instructions pages 2 and 6). The odds are lost. */
const ROWBOAT_CHANCE = 0.5;
/** CTF (instructions page 8): per team member, for a capture and for holding the enemy flag at the end. */
const CAPTURE_BONUS = 50;
const HOLD_BONUS = 25;
/** Moonlight: a ship this close to the beam's centre (its `BoundingCircleRadius`) turns invincible. */
const MOON_RADIUS = 5000;
/** Kraken: a ship that has kept within this distance … */
const STILL_RADIUS = 2000;
/** … for this long has been "in one place too long" (instructions page 6). The real figure is lost. */
const KRAKEN_SCENT_MS = 10_000;
/** How close the Kraken has to get to a hull to devour it. */
const KRAKEN_BITE = 1500;
/** How long the Kraken stays up after a bite, so its attack animation plays out. */
const KRAKEN_ATTACK_MS = 3000;
/** Where it surfaces, from its prey: far enough to see the waves coming. */
const KRAKEN_SURFACE_DISTANCE = 5000;
/** Idle kick: warn after this long without input, boot this long after that. The real figures are lost. */
const IDLE_WARN_MS = 60_000;
const IDLE_KICK_MS = 15_000;
/** Win milestones (wiki): total games won -> credits. */
const WIN_MILESTONES = new Map([[5, 50], [10, 100], [50, 500]]);
/**
 * "A 'magic key' pin for winning three games on a given level for a given type
 * of game (ie - Capture the Flag and Ship Battle are counted separately)"
 * (wiki): every third win on a level in one mode gives that level's
 * single-use treasure key (item.12182-12184), for the Pirate Treasure Room.
 */
const KEY_EVERY_WINS = 3;
const TREASURE_KEY = [12182, 12183, 12184];
const TURN_MS = 300;
const SUBTURNS = 3;
const STAGE_SECONDS = Math.max(30, Number(process.env.VMK_POTC_STAGE_SECONDS ?? 180) || 180);
const LOAD_TIMEOUT_MS = 20_000;
const SHOOT_DELAY_MS = 1000; // `game.shootdelay`
const HIT_GOLD = 5;
const WIN_BONUS = 100;
const MAX_POWERUPS = 10;
const GOLDEN_CHANCE = 10; // % of ammo crates that carry a golden ball
const AI_REF_BASE = 199_000;
const OBJECT_REF_BASE = 200_000;

/** `pirates.endinfo.<n>` in external_texts — the reason line on the stage-end screen. */
const enum EndInfo {
  // Capture the Flag, in the order the texts rank them.
  FlagHome = 0,
  BothHomeMoreGold = 1,
  BothHomeLuck = 2,
  FlagOnBoard = 3,
  BothOnBoardCloser = 4,
  BothOnBoardLuck = 5,
  NoFlagMoreGold = 6,
  NoFlagLuck = 7,
  FlagAtSeaCloser = 8,
  FlagAtSeaLuck = 9,
  // Ship Battle.
  LastShip = 10,
  MoreBooty = 11,
  EqualBooty = 12,
}

/** Heading from one point to another, in the client's degrees. */
const angleTo = (x0: number, y0: number, x1: number, y1: number): number => angleFromComponents(x1 - x0, y1 - y0);

/** "Lady Luck gives it to …" — a tie still names a winner. */
const luck = (): 1 | 2 => (Math.random() < 0.5 ? 1 : 2);

interface Human {
  player: PotcPlayer;
  ref: number;
  team: 1 | 2;
  shipType: number;
  phase: "preparing" | "ready" | "out";
  loaded: boolean;
  resync: boolean;
  /** Ship Battle: gold banked at each stage end. */
  loot: number;
  /** CTF: capture / holding bonuses earned (instructions page 8). */
  bonus: number;
  /** Last input of any kind — the idle kick's clock. */
  lastInput: number;
  /** The countdown last shown in the idle warning (-1 = none). */
  idleShown: number;
}

interface Crew {
  ref: number;
  owner: number;
  team: 1 | 2;
  shipType: number;
  human: Human | null;
  lastShot: number;
  shotPending: boolean;
  /** Gold carried over from earlier stages — the ship's `Score` (vault). */
  vault: number;
  aiNav?: { x: number; y: number };
  ai?: AIState;
}

interface AIState {
  path: { x: number; y: number }[];
  goal: { x: number; y: number } | null;
  plannedAt: number;
  lastX: number;
  lastY: number;
  stillSince: number;
}

/**
 * A coarse sailing grid for AI routing: 1000-unit cells (5x5 collision tiles),
 * open only where a ship's hull clears land all round. A* with 8 neighbours.
 */
export class NavGrid {
  private static readonly CELL = 1000;
  private static readonly HALF = 60; // the map spans -60000..60200
  private readonly size = NavGrid.HALF * 2 + 1;
  private readonly open: Uint8Array;

  constructor(map: StageDef["map"]) {
    this.open = new Uint8Array(this.size * this.size);
    const clearance = 1800;
    const probes = [[0, 0], [clearance, 0], [-clearance, 0], [0, clearance], [0, -clearance],
      [1300, 1300], [-1300, 1300], [1300, -1300], [-1300, -1300]];
    for (let gy = 0; gy < this.size; gy++) {
      for (let gx = 0; gx < this.size; gx++) {
        const [x, y] = this.world(gx, gy);
        this.open[gy * this.size + gx] = probes.every(([dx, dy]) => map.at(x + dx, y + dy) <= 1) ? 1 : 0;
      }
    }
  }

  private world(gx: number, gy: number): [number, number] {
    return [(gx - NavGrid.HALF) * NavGrid.CELL, (gy - NavGrid.HALF) * NavGrid.CELL];
  }

  private cell(x: number, y: number): [number, number] {
    const c = (v: number) => Math.max(0, Math.min(this.size - 1, Math.round(v / NavGrid.CELL) + NavGrid.HALF));
    return [c(x), c(y)];
  }

  private isOpen(gx: number, gy: number): boolean {
    return gx >= 0 && gy >= 0 && gx < this.size && gy < this.size && this.open[gy * this.size + gx] === 1;
  }

  /** The nearest open cell to a point (ships and goals often sit just inside a blocked one). */
  private nearestOpen(gx: number, gy: number): [number, number] | null {
    for (let r = 0; r <= 6; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) === r && this.isOpen(gx + dx, gy + dy)) return [gx + dx, gy + dy];
        }
      }
    }
    return null;
  }

  nearbyFree(x: number, y: number, distance: number, angle: number): { x: number; y: number } | null {
    for (let k = 0; k < 8; k++) {
      const a = angle + (k * Math.PI) / 4;
      const [gx, gy] = this.cell(x + distance * Math.cos(a), y + distance * Math.sin(a));
      if (this.isOpen(gx, gy)) {
        const [wx, wy] = this.world(gx, gy);
        return { x: wx, y: wy };
      }
    }
    return null;
  }

  /**
   * Waypoints (world coords) from (x0,y0) to (x1,y1), simplified to the turns;
   * null if unreachable. `obstacles` (other hulls) block the cells within a
   * hull's reach of them, except around the start and the goal themselves.
   */
  route(
    x0: number, y0: number, x1: number, y1: number,
    obstacles: { x: number; y: number }[] = [],
  ): { x: number; y: number }[] | null {
    const start = this.nearestOpen(...this.cell(x0, y0));
    const end = this.nearestOpen(...this.cell(x1, y1));
    if (!start || !end) return null;
    const n = this.size;
    const blocked = new Uint8Array(n * n);
    const reach = 4; // cells: two hull lengths, 4000 units
    for (const o of obstacles) {
      const [ox, oy] = this.cell(o.x, o.y);
      for (let dy = -reach; dy <= reach; dy++) {
        for (let dx = -reach; dx <= reach; dx++) {
          if (dx * dx + dy * dy > reach * reach) continue;
          const gx = ox + dx;
          const gy = oy + dy;
          if (gx < 0 || gy < 0 || gx >= n || gy >= n) continue;
          // Never wall in our own position or the goal (a ship we chase).
          if (Math.max(Math.abs(gx - start[0]), Math.abs(gy - start[1])) <= 1) continue;
          if (Math.max(Math.abs(gx - end[0]), Math.abs(gy - end[1])) <= 2) continue;
          blocked[gy * n + gx] = 1;
        }
      }
    }
    const passable = (gx: number, gy: number) => this.isOpen(gx, gy) && !blocked[gy * n + gx];
    const key = (gx: number, gy: number) => gy * n + gx;
    const goalKey = key(...end);
    const g = new Float64Array(n * n).fill(Infinity);
    const from = new Int32Array(n * n).fill(-1);
    const closed = new Uint8Array(n * n);
    const h = (gx: number, gy: number) => Math.hypot(gx - end[0], gy - end[1]);
    // A binary heap would be tidier; the grid is small enough for a sorted bucket list.
    const open: number[] = [key(...start)];
    g[open[0]] = 0;
    const f = new Float64Array(n * n).fill(Infinity);
    f[open[0]] = h(...start);
    let found = false;
    let guard = 0;
    while (open.length && guard++ < 20_000) {
      let best = 0;
      for (let i = 1; i < open.length; i++) if (f[open[i]] < f[open[best]]) best = i;
      const cur = open.splice(best, 1)[0];
      if (cur === goalKey) {
        found = true;
        break;
      }
      closed[cur] = 1;
      const cx = cur % n;
      const cy = Math.floor(cur / n);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = cx + dx;
          const ny = cy + dy;
          if (!passable(nx, ny)) continue;
          // No corner cutting past land.
          if (dx && dy && (!passable(cx + dx, cy) || !passable(cx, cy + dy))) continue;
          const k = key(nx, ny);
          if (closed[k]) continue;
          const cost = g[cur] + (dx && dy ? Math.SQRT2 : 1);
          if (cost < g[k]) {
            g[k] = cost;
            f[k] = cost + h(nx, ny);
            from[k] = cur;
            if (!open.includes(k)) open.push(k);
          }
        }
      }
    }
    if (!found) return null;
    const cells: [number, number][] = [];
    for (let k = goalKey; k !== -1; k = from[k]) cells.unshift([k % n, Math.floor(k / n)]);
    // Line-of-sight smoothing: from each kept point, jump to the furthest
    // cell still in clear view — the grid's staircase becomes a few legs.
    const points: { x: number; y: number }[] = [];
    let at = 0;
    while (at < cells.length - 1) {
      let next = at + 1;
      for (let j = cells.length - 1; j > at + 1; j--) {
        if (this.clear(cells[at], cells[j], passable)) {
          next = j;
          break;
        }
      }
      const [wx, wy] = this.world(...cells[next]);
      points.push({ x: wx, y: wy });
      at = next;
    }
    return points;
  }

  /** Every cell along the segment open (sampled at a third of a cell). */
  private clear(a: [number, number], b: [number, number], passable: (gx: number, gy: number) => boolean): boolean {
    const steps = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 3);
    for (let i = 1; i < steps; i++) {
      const gx = Math.round(a[0] + ((b[0] - a[0]) * i) / steps);
      const gy = Math.round(a[1] + ((b[1] - a[1]) * i) / steps);
      if (!passable(gx, gy)) return false;
    }
    return true;
  }
}

export class PotcMatch {
  private readonly humans = new Map<number, Human>();
  private readonly crews: Crew[] = [];
  private stageIndex = -1;
  private stage: StageDef | null = null;
  private world: World | null = null;
  private turn = 0;
  private ticker: ReturnType<typeof setInterval> | null = null;
  private readonly timers = new Set<ReturnType<typeof setTimeout>>();
  private queued: number[][] = [];
  private nextRef = OBJECT_REF_BASE;
  private running = false;
  private startedAt = 0;
  private lastTimerSent = -1;
  private nextAmmoAt = 0;
  private nextHealthAt = 0;
  private wins: [number, number] = [0, 0];
  private finished = false;
  private stageOver = false;
  private mismatches = 0;
  private navGrid: NavGrid | null = null;
  private stuckLogs = 0;
  private readonly pendingKill = new Set<number>();
  private readonly pendingBlow = new Set<number>();
  /** CTF: ships with a flag drop already queued this turn (events apply next turn). */
  private readonly pendingDrop = new Set<number>();
  /** CTF: where each team's flag starts, and the team bases (world objects). */
  private flagHome = new Map<1 | 2, { x: number; y: number }>();
  private bases = new Map<1 | 2, GObj>();
  /** CTF: the team that brought the enemy flag home this stage (gets CAPTURE_BONUS). */
  private captured: 0 | 1 | 2 = 0;
  /** CTF: each team's vault — the gold its ships took, over every stage. */
  private readonly teamVault: [number, number] = [0, 0];
  // Hazards.
  private kraken: { ref: number; target: number; until: number; navX: number; navY: number; since: number } | null = null;
  private nextKrakenAt = Infinity;
  /** Where each ship has been sitting, and since when — the Kraken's "scent". */
  private readonly still = new Map<number, { x: number; y: number; since: number }>();
  private moon: { ref: number; until: number } | null = null;
  private nextMoonAt = Infinity;
  /** Ships made invincible (25), and when their 26 is due. */
  private readonly invincibleUntil = new Map<number, number>();
  /** Level 3's moonlight button: when each ship may use it again. */
  private readonly moonCooldown = new Map<number, number>();

  constructor(
    readonly ref: number,
    private readonly level: number,
    private readonly mode: number,
    participants: Participant[],
    players: Map<number, PotcPlayer>,
    private readonly onOver: (match: PotcMatch) => void,
  ) {
    for (const p of participants) {
      if (p.ref > 0) {
        const player = players.get(p.ref);
        if (!player) continue;
        const human: Human = {
          player, ref: p.ref, team: p.team, shipType: p.ship, phase: "preparing", loaded: false, resync: false,
          loot: 0, bonus: 0, lastInput: Date.now(), idleShown: -1,
        };
        this.humans.set(p.ref, human);
        this.crews.push({ ref: p.ref, owner: p.ref, team: p.team, shipType: p.ship, human, lastShot: 0, shotPending: false, vault: 0 });
      } else {
        this.crews.push({ ref: AI_REF_BASE - p.ref, owner: -1, team: p.team, shipType: p.ship, human: null, lastShot: 0, shotPending: false, vault: 0 });
      }
    }
  }

  get bucket(): string {
    return `potc#${this.ref}`;
  }

  has(userId: number): boolean {
    const h = this.humans.get(userId);
    return h !== undefined && h.phase !== "out";
  }

  private log(text: string): void {
    console.log(`[pirates #${this.ref}] ${text}`);
  }

  private later(ms: number, fn: () => void): void {
    const t = setTimeout(() => {
      this.timers.delete(t);
      fn();
    }, ms);
    this.timers.add(t);
  }

  private active(): Human[] {
    return [...this.humans.values()].filter((h) => h.phase === "ready");
  }

  private sendAll(msg: number, params: OutgoingParam[], log?: string): void {
    for (const h of this.active()) h.player.send(msg, params, log);
  }

  // ---------------------------------------------------------------- start

  prepare(): void {
    this.log(`starting: level ${this.level}, ${this.mode === 1 ? "CTF" : "LMS"}, ${this.crews.length} ship(s), ${this.humans.size} human(s)`);
    for (const h of this.humans.values()) h.player.send(MSG.GAME_PREPARE_ROOM, [{ int: 1001 }], "GamePrepareRoom pirates");
    this.later(LOAD_TIMEOUT_MS, () => this.beginIfReady(true));
  }

  /** The 580 PrepareRoom sends. True when it was ours (the caller moves the player into `bucket`). */
  roomStarted(userId: number): boolean {
    const h = this.humans.get(userId);
    if (!h || h.phase !== "preparing") return false;
    h.phase = "ready";
    this.beginIfReady(false);
    return true;
  }

  private beginIfReady(timedOut: boolean): void {
    if (this.stageIndex >= 0 || this.finished) return;
    const waiting = [...this.humans.values()].filter((h) => h.phase === "preparing");
    if (waiting.length && !timedOut) return;
    for (const h of waiting) this.leaveHuman(h, "never reached the game scene");
    if (this.active().length === 0) return this.end();
    const list: OutgoingParam[] = [{ int: this.active().length }];
    for (const h of this.active()) list.push({ int: h.ref }, { str: h.player.name });
    this.sendAll(MSG.GAME_PARTICIPANT_LIST, list, `GameParticipantList ${this.active().length}`);
    this.loadStage(0);
  }

  private loadStage(index: number): void {
    this.stageIndex = index;
    this.stageOver = false;
    this.running = false;
    this.pendingKill.clear();
    this.pendingBlow.clear();
    this.queued = [];
    const name = `pirates_level${this.level}_stage${index + 1}`;
    const def = loadStage(name);
    this.stage = def;
    this.navGrid = null;
    const world = new World(def);
    this.world = world;
    world.add({ code: TYPE.WIND, ref: this.nextRef++, owner: -1, team: -1, x: 0, y: 0, z: 0, dir: 0, params: [0] });
    world.add({ code: TYPE.SCOREBOARD, ref: this.nextRef++, owner: -1, team: -1, x: 0, y: 0, z: 0, dir: 0, params: [0, 0, this.wins[0], this.wins[1]] });
    this.pendingDrop.clear();
    this.flagHome.clear();
    this.bases.clear();
    this.captured = 0;
    this.kraken = null;
    this.moon = null;
    this.invincibleUntil.clear();
    this.moonCooldown.clear();
    this.still.clear();
    // Hazards are timed from the end of the countdown (`beginStage`).
    this.nextKrakenAt = Infinity;
    this.nextMoonAt = Infinity;
    // Every stage has two bases: rowboats are refitted at them in both modes.
    for (const b of def.bases) {
      const base: GObj = { code: TYPE.TEAMBASE, ref: this.nextRef++, owner: -1, team: b.team, x: b.x, y: b.y, z: 0, dir: 0, params: [0] };
      world.add(base);
      this.bases.set(b.team, base);
    }
    if (this.mode === MODE_CTF) {
      for (const f of def.items.filter((i) => i.type === 3 && (i.team === 1 || i.team === 2))) {
        const team = f.team as 1 | 2;
        this.flagHome.set(team, { x: f.x, y: f.y });
        world.add(this.flagObject(this.nextRef++, f.x, f.y, team));
      }
      if (this.flagHome.size !== 2) this.log(`⚠ ${name}: ${this.flagHome.size} flag(s) — CTF needs two`);
    }
    if (this.bases.size !== 2) this.log(`⚠ ${name}: ${this.bases.size} base(s), expected two`);
    const slot = { 1: 0, 2: 0 };
    for (const c of this.crews) {
      if (c.human && c.human.phase === "out") continue;
      const start = def.starts[c.team][slot[c.team]++ % Math.max(1, def.starts[c.team].length)];
      world.add(makeShip(c.ref, c.owner, c.team, start.x, start.y, start.dir, c.shipType, c.vault));
      c.lastShot = 0;
      c.shotPending = false;
      c.aiNav = undefined;
    }
    for (const h of this.active()) {
      h.loaded = false;
      h.resync = false;
    }
    this.log(`stage ${index + 1}: ${name}`);
    this.sendAll(MSG.GAME_LOAD_STAGE, [{ str: name }, { int: 0 }, { int: 1 }, { str: "m" }, { str: String(this.mode) }], `GameLoadStage ${name}`);
    const at = index;
    this.later(LOAD_TIMEOUT_MS, () => {
      if (this.stageIndex === at) this.beginStage();
    });
  }

  /** 602: this client's engine is up — give it the world. */
  stageLoaded(userId: number): void {
    const h = this.humans.get(userId);
    if (!h || h.phase !== "ready" || !this.world) return;
    h.loaded = true;
    const others = [...this.world.objects.values()].filter((o) => o.ref !== h.ref);
    h.player.send(MSG.GAME_OBJECTS_LIST, [{ int: others.length }, ...others.flatMap((o) => encodeObject(o).map((v) => ({ int: v })))], `GameObjectsList ${others.length}`);
    const mine = this.world.get(h.ref);
    if (mine) h.player.send(MSG.GAME_CREATE_MY_OBJECT, encodeObject(mine).map((v) => ({ int: v })), `GameCreateMyObject ship ${h.ref}`);
    if (this.begunStage === this.stageIndex) h.resync = true; // late: the next turn comes as a full status
    else if (this.active().every((q) => q.loaded)) this.beginStage();
  }

  /**
   * ⚠ ONCE PER STAGE. The load-timeout fallback used to start a stage whenever
   * no ticker was running — and the ticker is stopped at every stage END, so a
   * stage that finished inside the 20 s window (AI ships sink each other fast)
   * was STARTED AGAIN over its own end screen: a second countdown, a fresh
   * ticker, and the next stage then took its loaded client for a late joiner
   * and never sent it a start. Stuck in the pre-game.
   */
  private begunStage = -1;

  private beginStage(): void {
    if (!this.stage || this.begunStage === this.stageIndex || this.stageOver) return;
    this.begunStage = this.stageIndex;
    if (this.ticker) clearInterval(this.ticker);
    this.sendAll(MSG.GAME_START_STAGE, [{ int: 0 }], `GameStartStage ${this.stage.name}`);
    const countdown = this.stage.startTime * 1000;
    const at = this.stageIndex;
    this.later(countdown, () => {
      if (this.stageIndex !== at || this.stageOver) return;
      this.running = true;
      this.startedAt = Date.now();
      this.lastTimerSent = -1;
      this.nextAmmoAt = Date.now() + 10_000;
      this.nextHealthAt = Date.now() + 15_000;
      const def = this.stage!;
      if (def.kraken) this.nextKrakenAt = Date.now() + this.delay(def.kraken.startFix, def.kraken.startRnd);
      if (def.moonlight && !def.moonlight.userTriggered) {
        this.nextMoonAt = Date.now() + this.delay(def.moonlight.startFix, def.moonlight.startRnd);
      }
      for (const h of this.active()) h.lastInput = Date.now();
    });
    this.ticker = setInterval(() => this.tick(), TURN_MS);
  }

  // ---------------------------------------------------------------- turns

  private tick(): void {
    const world = this.world;
    if (!world || this.finished) return;
    if (this.running && !this.stageOver) {
      this.timerEvents();
      this.spawnPowerups();
      this.thinkAI();
    }
    const { turn, seed } = nextTurn(this.turn);
    this.turn = turn;
    const checksum = world.checksum(seed);
    // Everything queued goes in the first subturn; the rest only move.
    const subturns: number[][][] = [this.queued, ...Array.from({ length: SUBTURNS - 1 }, () => [] as number[][])];
    this.queued = [];
    // ⚠ A full status must describe the world at the START of the turn it
    // carries, and the objects are live: encode before the subturns run.
    const resyncing = this.active().some((h) => h.loaded && h.resync);
    const objectCount = world.objects.size;
    const objectInts = resyncing ? [...world.objects.values()].flatMap((o) => encodeObject(o)) : [];
    const outcomes: Outcome[] = [];
    for (const events of subturns) world.subturn(events, outcomes);
    world.sweep(outcomes);
    for (const c of this.crews) c.shotPending = false;
    this.pendingDrop.clear();
    const turnInts = encodeTurn(turn, checksum, subturns);
    const statusInts = turnInts.map((v) => ({ int: v }));
    for (const h of this.active()) {
      if (!h.loaded) continue;
      if (h.resync) {
        h.resync = false;
        h.player.send(
          MSG.GAME_FULL_STATUS,
          [{ int: objectCount }, ...objectInts.map((v) => ({ int: v })), ...statusInts],
          `GameFullStatusUpdate turn ${turn} (${objectCount} objects)`,
        );
      } else {
        h.player.send(MSG.GAME_STATUS_UPDATE, statusInts, undefined);
      }
    }
    // A rowboat that has come into being (36 applied this turn) can be hit
    // again: the hits that sank its ship are settled.
    for (const s of world.ships()) if (shipRowboat(s) && shipAlive(s)) this.pendingKill.delete(s.ref);
    this.resolve(outcomes);
    if (this.running && !this.stageOver) this.baseTurn();
    if (this.running && !this.stageOver) this.hazards();
    if (this.running && !this.stageOver) this.checkStageEnd();
  }

  // ---------------------------------------------------------------- hazards

  /** `fix` seconds plus up to `rnd` more, in ms — the stage files' `*FIXDLY`/`*RNDDLY` pairs. */
  private delay(fix: number, rnd: number): number {
    return Math.round((fix + Math.random() * rnd) * 1000);
  }

  private hazards(): void {
    const now = Date.now();
    for (const [ref, until] of this.invincibleUntil) {
      if (now < until) continue;
      this.invincibleUntil.delete(ref);
      if (this.world!.get(ref)) this.queue([26, ref]);
    }
    this.moonlightTurn(now);
    this.krakenTurn(now);
    this.idleTurn(now);
  }

  /** Invincibility (25) for `seconds`; 26 follows from `hazards`. */
  private makeInvincible(s: Ship, seconds: number, now: number): void {
    if (testBit(s.state, BIT.INVINCIBLE) || this.invincibleUntil.has(s.ref)) return;
    this.queue([25, s.ref]);
    this.invincibleUntil.set(s.ref, now + seconds * 1000);
    this.log(`ship ${s.ref} invincible for ${seconds}s`);
  }

  /**
   * Levels 2's moving moonlight (`USER_TRIGGERED` false): a beam drifts across
   * the sea for `STAY` seconds, every ship in it turns invincible for
   * `INVINCIBILITY` seconds, and it comes back `REPEAT*DLY` seconds later.
   */
  private moonlightTurn(now: number): void {
    const def = this.stage!.moonlight;
    if (!def || def.userTriggered) return;
    const world = this.world!;
    if (this.moon) {
      const m = world.get(this.moon.ref);
      if (now >= this.moon.until) {
        this.queue([24, this.moon.ref]);
        this.moon = null;
        this.nextMoonAt = now + this.delay(def.repeatFix, def.repeatRnd);
        return;
      }
      if (!m) return; // its 23 applies next turn
      for (const s of world.ships()) {
        if (shipAlive(s) && Math.hypot(s.x - m.x, s.y - m.y) < MOON_RADIUS) this.makeInvincible(s, def.invincibility, now);
      }
      return;
    }
    if (now < this.nextMoonAt) return;
    // Rise over a spot ships sail to (a pickup point), drifting towards the
    // middle of the map so it stays over the water for its whole stay.
    const spots = this.stage!.items;
    if (!spots.length) return;
    const at = spots[Math.floor(Math.random() * spots.length)];
    const heading = (angleTo(at.x, at.y, 0, 0) + Math.floor(Math.random() * 61) - 30 + 360) % 360;
    const vx = Math.trunc((baseVelX(heading) * def.velocity) / 256);
    const vy = Math.trunc((baseVelY(heading) * def.velocity) / 256);
    const ref = this.nextRef++;
    this.queue([23, ref, at.x, at.y, vx, vy]);
    this.moon = { ref, until: now + def.stay * 1000 };
    this.log(`moonlight at ${at.x},${at.y} heading ${heading}`);
  }

  /**
   * The Kraken: "Don't stay in one place too long, or the monster will catch
   * your scent and devour your vessel... As soon as you see waves surrounding
   * you, sail away, and you might be okay!" (instructions page 6). It surfaces
   * near the ship that has sat still longest, swims at it at `CHASESPD`, gives
   * up past `CHASETRIG` or after `STAY` seconds, and comes back `REPEAT*DLY`
   * seconds later.
   */
  private krakenTurn(now: number): void {
    const def = this.stage!.kraken;
    if (!def) return;
    const world = this.world!;
    for (const s of world.ships()) {
      const at = this.still.get(s.ref);
      if (!at || Math.hypot(s.x - at.x, s.y - at.y) > STILL_RADIUS) this.still.set(s.ref, { x: s.x, y: s.y, since: now });
    }
    const prey = (s: Ship) => shipAlive(s) && !testBit(s.state, BIT.INVINCIBLE) && !this.pendingKill.has(s.ref);
    if (this.kraken) {
      const kr = this.kraken;
      const k = world.get(kr.ref);
      if (!k) {
        if (now - kr.since > 2000) this.kraken = null; // never surfaced (stage change)
        return;
      }
      const fed = kr.target === -1;
      if (fed && now < kr.until) return; // the attack is playing
      const target = world.get(kr.target) as Ship | undefined;
      const gone = !target || !prey(target) || Math.hypot(target.x - k.x, target.y - k.y) > def.chaseTrigger;
      if (fed || gone || now >= kr.until) {
        this.queue([19, kr.ref]);
        this.kraken = null;
        this.nextKrakenAt = now + this.delay(def.repeatFix, def.repeatRnd);
        return;
      }
      if (Math.hypot(target.x - k.x, target.y - k.y) < KRAKEN_BITE) {
        this.pendingKill.add(target.ref);
        this.dropFlag(target);
        this.queue([20, kr.ref, target.ref, Math.max(1, target.health + 1)]);
        this.queue([6, target.ref, -1, -1, -1]);
        this.log(`the Kraken devoured ship ${target.ref}`);
        // ⚠ Stay up while the attack plays: 20 sets its attack bit and the
        // visualizer runs the tentacle frames (10 x 3 updates); hiding it in
        // the same turn left only the bubbles and a sudden wreck.
        kr.until = now + KRAKEN_ATTACK_MS;
        kr.target = -1;
        return;
      }
      if (Math.hypot(target.x - kr.navX, target.y - kr.navY) > 500) {
        kr.navX = target.x;
        kr.navY = target.y;
        this.queue([31, kr.ref, target.x, target.y]);
      }
      return;
    }
    if (now < this.nextKrakenAt) return;
    let target: Ship | null = null;
    let since = now - KRAKEN_SCENT_MS;
    for (const s of world.ships()) {
      const at = this.still.get(s.ref);
      if (at && prey(s) && at.since <= since) {
        target = s;
        since = at.since;
      }
    }
    if (!target) {
      this.nextKrakenAt = now + 1000; // nobody has lingered yet: sniff again shortly
      return;
    }
    const a = Math.floor(Math.random() * 360);
    const x = target.x + Math.trunc((baseVelX(a) * KRAKEN_SURFACE_DISTANCE) / 256);
    const y = target.y + Math.trunc((baseVelY(a) * KRAKEN_SURFACE_DISTANCE) / 256);
    const ref = this.nextRef++;
    this.queue([18, ref, x, y, TYPE.KRAKEN]);
    this.queue([31, ref, target.x, target.y]);
    this.kraken = { ref, target: target.ref, until: now + this.delay(def.stay, def.stayRnd), navX: target.x, navY: target.y, since: now };
    this.log(`the Kraken surfaced after ship ${target.ref}`);
  }

  /**
   * Idle kick: event 33 shows "If you don't move again, you will be booted
   * from the game in N seconds"; any input resets it (the client hides the
   * warning itself). A wreck waits out the stage and is never kicked.
   */
  private idleTurn(now: number): void {
    for (const h of this.active()) {
      const s = this.world!.get(h.ref) as Ship | undefined;
      if (!h.loaded || !s || !shipAlive(s)) {
        h.lastInput = now;
        continue;
      }
      const idle = now - h.lastInput;
      if (idle >= IDLE_WARN_MS + IDLE_KICK_MS) {
        this.leaveHuman(h, "was booted for idling");
        h.player.toLobby();
        continue;
      }
      if (idle < IDLE_WARN_MS) {
        h.idleShown = -1;
        continue;
      }
      const left = Math.ceil((IDLE_WARN_MS + IDLE_KICK_MS - idle) / 1000);
      if (left !== h.idleShown) {
        h.idleShown = left;
        this.queue([33, h.ref, left]);
      }
    }
  }

  // ---------------------------------------------------------------- capture the flag

  /**
   * After each turn's simulation: captures, refits, and own flags returned.
   * Anything queued here applies at the start of the NEXT turn, before this
   * runs again — so a condition queued once is already false next time round.
   */
  private baseTurn(): void {
    const world = this.world!;
    for (const s of world.ships()) {
      if (!shipAlive(s)) continue;
      const team = s.team as 1 | 2;
      const base = this.bases.get(team);
      if (!base || !world.atBase(s, base)) continue;
      // "Even better, if you are carrying the enemy flag in your rowboat,
      // you'll win the stage" — the capture comes before the refit.
      if (this.mode === MODE_CTF && carriesEnemyFlag(s)) {
        this.queue([38, s.ref, base.ref]);
        this.captured = team;
        this.log(`ship ${s.ref} brought the enemy flag home: team ${team} wins the stage`);
        this.endStage(team, EndInfo.FlagHome);
        return;
      }
      if (shipRowboat(s) && !this.pendingKill.has(s.ref)) {
        // "If you manage to take it into your base, you'll get a brand new ship."
        const stats = makeShip(0, 0, 0, 0, 0, 0, s.shipType, 0);
        this.queue([37, s.ref, stats.maxHealth, REFIT_AMMO]);
        this.log(`ship ${s.ref} refitted at its base`);
      }
    }
    if (this.mode !== MODE_CTF) return;
    // A team's own flag, dropped in the sea, goes home when one of its ships
    // touches it. The client never takes its own flag (`CPiratesFactorPowerup`
    // ignores same-team ships), so the server removes it (41) and puts it back (5).
    for (const o of [...world.objects.values()]) {
      if (o.code !== TYPE.POWERUP || o.params[0] !== 3 || (o as Powerup).collided) continue;
      const team = o.team as 1 | 2;
      const home = this.flagHome.get(team);
      if (!home || (Math.abs(o.x - home.x) < 500 && Math.abs(o.y - home.y) < 500)) continue;
      const rescuer = world.ships().find((s) => s.team === team && shipAlive(s) && world.touches(s, o));
      if (!rescuer) continue;
      this.queue([41, o.ref]);
      this.queue([5, this.nextRef++, home.x, home.y, 3, 0, team, 1]);
      this.log(`ship ${rescuer.ref} returned team ${team}'s flag home`);
    }
  }

  /**
   * Take the flag off `s` (34) and leave it in the sea (5), clear of the hull —
   * dropped right under it, the ship (or the rowboat it becomes) would sail
   * straight back over it and take it again.
   */
  private dropFlag(s: Ship): void {
    if (!carriesFlag(s) || this.pendingDrop.has(s.ref)) return;
    this.pendingDrop.add(s.ref);
    const flagTeam = (testBit(s.state, BIT.OWN_FLAG) ? s.team : 3 - s.team) as 1 | 2;
    const map = this.stage!.map;
    let at = { x: s.x, y: s.y };
    for (const turn of [180, 90, 270, 0]) {
      const dir = (s.dir + turn) % 360;
      const x = s.x + Math.trunc((baseVelX(dir) * FLAG_DROP_DISTANCE) / 256);
      const y = s.y + Math.trunc((baseVelY(dir) * FLAG_DROP_DISTANCE) / 256);
      if (map.at(x, y) <= 1) {
        at = { x, y };
        break;
      }
    }
    this.queue([34, s.ref, 3]);
    this.queue([5, this.nextRef++, at.x, at.y, 3, 0, flagTeam, 1]);
    this.log(`ship ${s.ref} dropped team ${flagTeam}'s flag at ${at.x},${at.y}`);
  }


  private queue(event: number[]): void {
    this.queued.push(event);
  }

  /** A flag pickup as event 5 creates it: `extra = [type 3, state 0, amount 1]`. */
  private flagObject(ref: number, x: number, y: number, team: 1 | 2): Powerup {
    return { code: TYPE.POWERUP, ref, owner: -1, team, x, y, z: 0, dir: 0, params: [3, 0, 1], collided: false, collector: null } as Powerup;
  }

  private timerEvents(): void {
    const left = Math.max(0, STAGE_SECONDS - Math.floor((Date.now() - this.startedAt) / 1000));
    if (left !== this.lastTimerSent) {
      this.lastTimerSent = left;
      this.queue([32, left]);
    }
  }

  private freeItemPoint(type: number): { x: number; y: number } | null {
    const world = this.world!;
    const taken = [...world.objects.values()].filter((o) => o.code === TYPE.POWERUP);
    const points = this.stage!.items.filter((i) => i.type === type && !taken.some((t) => Math.abs(t.x - i.x) < 1000 && Math.abs(t.y - i.y) < 1000));
    return points.length ? points[Math.floor(Math.random() * points.length)] : null;
  }

  private spawnPowerups(): void {
    const def = this.stage!;
    const size = this.crews.length > 4 ? 1 : 0;
    const now = Date.now();
    const count = [...this.world!.objects.values()].filter((o) => o.code === TYPE.POWERUP).length;
    if (now >= this.nextAmmoAt) {
      this.nextAmmoAt = now + def.ammoEvery[size] * 1000;
      const at = this.freeItemPoint(1);
      if (at && count < MAX_POWERUPS && Math.random() * 100 < def.ammoChance[size]) {
        const golden = Math.random() * 100 < GOLDEN_CHANCE ? 1 : 0;
        this.queue([5, this.nextRef++, at.x, at.y, 1, golden, -1, def.ammoAmount]);
      }
    }
    if (now >= this.nextHealthAt) {
      this.nextHealthAt = now + def.healthEvery[size] * 1000;
      const at = this.freeItemPoint(2);
      if (at && count < MAX_POWERUPS && Math.random() * 100 < def.healthChance[size]) {
        this.queue([5, this.nextRef++, at.x, at.y, 2, 0, -1, def.healthAmount]);
      }
    }
  }

  /** Turn what the simulation found into next turn's events. */
  private resolve(outcomes: Outcome[]): void {
    const world = this.world!;
    const predicted = new Map<number, number>();
    for (const o of outcomes) {
      if (o.kind === "ballEnded") {
        this.queue([12, o.ball.x, o.ball.y]);
      } else if (o.kind === "collect") {
        const p = o.powerup;
        if (shipAlive(o.ship)) this.queue([11, o.ship.ref, p.params[0], p.params[1], p.team, p.params[2]]);
        if (p.params[0] === 3) this.log(`ship ${o.ship.ref} (team ${o.ship.team}) took team ${p.team}'s flag`);
      } else {
        const { ball, ship } = o;
        if (ship.team === ball.team) continue;
        const shooter = ball.params[0];
        if (shipWreck(ship)) {
          if (!this.pendingBlow.has(ship.ref)) {
            this.pendingBlow.add(ship.ref);
            this.queue([30, ship.ref, 0]);
          }
          continue;
        }
        if (!shipAlive(ship) || this.pendingKill.has(ship.ref)) continue;
        // "The rowboat is weak and small": one hit and it goes down for good.
        const rowboat = shipRowboat(ship);
        const health = rowboat ? -1 : (predicted.get(ship.ref) ?? ship.health) - 1;
        predicted.set(ship.ref, health);
        this.queue([13, ship.ref, ball.x, ball.y, shooter, HIT_GOLD]);
        if (rowboat || health <= 0 || ball.golden) this.sink(ship, world.get(shooter) ? shooter : -1, !rowboat, ball.golden ? "golden ball" : "");
      }
    }
  }

  /**
   * A ship's last hit. "Sometimes when you are shot and your ship sinks, your
   * sailors will manage to escape on a small rowboat" — otherwise (and always
   * for a rowboat) it is a burning wreck (6). Ship Battle's sinker takes half
   * the gold on board; CTF's gold is in the team vault and stays there.
   */
  private sink(ship: Ship, killer: number, mayEscape: boolean, why: string): void {
    this.pendingKill.add(ship.ref);
    this.dropFlag(ship);
    const how = why ? ` (${why})` : "";
    if (mayEscape && Math.random() < ROWBOAT_CHANCE) {
      this.queue([36, ship.ref]);
      this.log(`ship ${ship.ref} sunk by ${killer}${how}: the crew escaped in a rowboat`);
      return;
    }
    const half = this.mode === MODE_CTF ? -1 : Math.floor(ship.gold / 2);
    this.queue([6, ship.ref, killer, killer === -1 ? -1 : half, half]);
    this.log(`ship ${ship.ref} sunk by ${killer}${how}`);
  }

  // ---------------------------------------------------------------- inputs

  private crewOf(userId: number): Crew | undefined {
    return this.crews.find((c) => c.human?.ref === userId);
  }

  private shipOf(c: Crew): Ship | undefined {
    const s = this.world?.get(c.ref);
    return s && s.code === TYPE.SHIP ? (s as Ship) : undefined;
  }

  private broadside(c: Crew, side: 0 | 1): void {
    const s = this.shipOf(c);
    if (!s || !shipAlive(s) || testBit(s.state, BIT.ROWBOAT) || s.ammo.length === 0 || c.shotPending) return;
    const now = Date.now();
    if (now - c.lastShot < SHOOT_DELAY_MS) return;
    c.lastShot = now;
    c.shotPending = true;
    const golden = s.ammo[0] === 1 ? 1 : 0;
    for (let n = 1; n <= s.cannons; n++) this.queue([16, s.ref, this.nextRef++, side, n, golden]);
  }

  /** `601 [count, action, data...]`. */
  action(userId: number, action: number, data: number[]): void {
    const h = this.humans.get(userId);
    const c = this.crewOf(userId);
    if (!h || !c) return;
    if (action === 3) {
      // The client's checksum disagreed with ours: our simulation drifted from
      // the Lingo. Every one is a determinism bug worth chasing; the full
      // status keeps the game playable meanwhile.
      this.mismatches++;
      if (this.mismatches <= 5 || this.mismatches % 50 === 0) this.log(`CHECKSUM MISMATCH #${this.mismatches} from ${h.player.name} (turn ${this.turn})`);
      h.resync = true;
      return;
    }
    if (action === 7) {
      this.leaveHuman(h, "left the game");
      h.player.toLobby();
      return;
    }
    if (!this.running || this.stageOver) return;
    h.lastInput = Date.now();
    const s = this.shipOf(c);
    if (!s) return;
    switch (action) {
      case 1:
        if (shipAlive(s) && data.length >= 2) this.queue([1, s.ref, data[0] | 0, data[1] | 0]);
        return;
      case 4:
        this.broadside(c, data[0] === 1 ? 1 : 0);
        return;
      case 5: {
        // Level 3's moonlight button: `INVINCIBILITY` seconds, then usable
        // again `INVINCIBILITYDLY` seconds after it was pressed.
        const moon = this.stage?.moonlight;
        const now = Date.now();
        if (!moon?.userTriggered || !shipAlive(s) || now < (this.moonCooldown.get(s.ref) ?? 0)) return;
        this.moonCooldown.set(s.ref, now + moon.cooldown * 1000);
        this.makeInvincible(s, moon.invincibility, now);
        return;
      }
      case 6:
        if (shipWreck(s) && !this.pendingBlow.has(s.ref)) {
          this.pendingBlow.add(s.ref);
          this.queue([30, s.ref, 0]);
        }
        return;
      case 8:
        if (this.mode === MODE_CTF && shipAlive(s)) this.dropFlag(s);
        return;
    }
  }

  // ---------------------------------------------------------------- AI ships

  /**
   * AI ships: circle the nearest enemy at broadside range and fire when it is
   * abeam — the "T-formation" the wiki's tips describe — and go for an ammo
   * crate when the guns are empty. Steering goals are always open water, so a
   * ship never parks itself against an island.
   */
  private thinkAI(): void {
    if (this.turn % 3 !== 0) return;
    const world = this.world!;
    const map = this.stage!.map;
    const ships = world.ships();
    const now = Date.now();
    for (const c of this.crews) {
      if (c.human) continue;
      const s = this.shipOf(c);
      if (!s || !shipAlive(s)) continue;
      const dist = (o: { x: number; y: number }) => Math.hypot(o.x - s.x, o.y - s.y);
      const ownBase = this.bases.get(s.team as 1 | 2);
      if (shipRowboat(s) && ownBase) {
        // Rowboats can only run for a new ship.
        this.steerAI(c, s, { x: ownBase.x, y: ownBase.y }, now);
        continue;
      }
      const ctf = this.mode === MODE_CTF ? this.ctfPlan(s, ships) : null;
      if (ctf?.home) {
        // Rowboat or flag carrier: run for the base without stopping to fight.
        this.steerAI(c, s, ctf.home, now);
        continue;
      }
      const kraken = this.kraken && this.kraken.target === s.ref ? this.world!.get(this.kraken.ref) : undefined;
      if (kraken) {
        // "As soon as you see waves surrounding you, sail away."
        const away = Math.atan2(s.y - kraken.y, s.x - kraken.x);
        const flee = (this.navGrid ??= new NavGrid(this.stage!.map)).nearbyFree(s.x, s.y, 12_000, away);
        if (flee) {
          this.steerAI(c, s, flee, now);
          continue;
        }
      }
      const enemies = ships.filter((o) => o.team !== s.team && shipAlive(o));
      if (enemies.length === 0 && !ctf?.goal) continue;
      const target = ctf?.chase ?? (enemies.length ? enemies.reduce((a, b) => (dist(a) <= dist(b) ? a : b)) : null);
      const d = target ? dist(target) : Infinity;
      const water = (x: number, y: number) => map.at(x, y) <= 1 && map.at(x + 1500, y) <= 1 && map.at(x - 1500, y) <= 1 && map.at(x, y + 1500) <= 1 && map.at(x, y - 1500) <= 1;
      let goal: { x: number; y: number } | null = ctf?.goal ?? null;
      if (!goal && s.ammo.length === 0) {
        const crates = [...world.objects.values()].filter((o) => o.code === TYPE.POWERUP && o.params[0] === 1);
        if (crates.length) goal = crates.reduce((a, b) => (dist(a) <= dist(b) ? a : b));
      }
      if (!goal && target) {
        // Orbit: a point on a ring around the target, a little ahead of where
        // we are on it, so the target drifts across our beam.
        const radius = d > 14_000 ? Math.max(6000, d - 8000) : 8000;
        const bearing = Math.atan2(s.y - target.y, s.x - target.x);
        const swing = (c.ref % 2 === 0 ? 1 : -1) * 0.8;
        for (let k = 0; k < 8 && !goal; k++) {
          const a = bearing + swing + k * 0.6 * Math.sign(swing);
          const x = Math.round(target.x + radius * Math.cos(a));
          const y = Math.round(target.y + radius * Math.sin(a));
          if (water(x, y)) goal = { x, y };
        }
        goal ??= { x: target.x, y: target.y };
      }
      if (!goal) continue;
      this.steerAI(c, s, goal, now);
      if (target && d < 15_000 && s.ammo.length > 0 && now - c.lastShot > 1800) {
        const hx = baseVelX(s.dir);
        const hy = baseVelY(s.dir);
        const tx = target.x - s.x;
        const ty = target.y - s.y;
        const cross = hx * ty - hy * tx;
        if (Math.abs(cross) / (256 * d) > 0.55) this.broadside(c, cross > 0 ? 1 : 0);
      }
    }
  }

  /**
   * Capture the Flag roles for one AI ship:
   *   home  — a rowboat or a flag carrier: back to its own base.
   *   goal  — the teammate nearest the enemy flag goes for it; the one nearest
   *           its OWN flag lying in the sea goes to bring it back.
   *   chase — everyone else hunts the enemy carrying their flag (if any).
   */
  private ctfPlan(s: Ship, ships: Ship[]): { home?: { x: number; y: number }; goal?: { x: number; y: number }; chase?: Ship } {
    const team = s.team as 1 | 2;
    const base = this.bases.get(team);
    if (base && (shipRowboat(s) || carriesFlag(s))) return { home: { x: base.x, y: base.y } };
    const crew = ships.filter((o) => o.team === team && shipAlive(o) && !shipRowboat(o) && !carriesFlag(o));
    const nearest = (p: { x: number; y: number }) =>
      crew.reduce<Ship | null>((best, o) => (!best || Math.hypot(o.x - p.x, o.y - p.y) < Math.hypot(best.x - p.x, best.y - p.y) ? o : best), null);
    const flags = [...this.world!.objects.values()].filter((o) => o.code === TYPE.POWERUP && o.params[0] === 3 && !(o as Powerup).collided);
    const enemyFlag = flags.find((f) => f.team !== team);
    if (enemyFlag && nearest(enemyFlag) === s) return { goal: { x: enemyFlag.x, y: enemyFlag.y } };
    const home = this.flagHome.get(team);
    const ownAdrift = flags.find((f) => f.team === team && home && Math.hypot(f.x - home.x, f.y - home.y) >= 500);
    if (ownAdrift && nearest(ownAdrift) === s) return { goal: { x: ownAdrift.x, y: ownAdrift.y } };
    const carrier = ships.find((o) => o.team !== team && shipAlive(o) && carriesEnemyFlag(o));
    return carrier ? { chase: carrier } : {};
  }

  /**
   * Ships sail STRAIGHT at their navigation target and stop dead against
   * land (`CPiratesFactorShip.move`), so an AI with a goal across an island
   * parks there forever. Route over a coarse grid instead and hand the ship
   * one waypoint at a time; replan when the goal moves, and when the ship has
   * not moved for a while (pinned against land or another ship).
   */
  private steerAI(c: Crew, s: Ship, goal: { x: number; y: number }, now: number): void {
    const ai = (c.ai ??= { path: [], goal: null, plannedAt: 0, lastX: s.x, lastY: s.y, stillSince: now });
    if (Math.hypot(s.x - ai.lastX, s.y - ai.lastY) > 300) {
      ai.lastX = s.x;
      ai.lastY = s.y;
      ai.stillSince = now;
    }
    const stuck = now - ai.stillSince > 1500;
    const goalMoved = !ai.goal || Math.hypot(ai.goal.x - goal.x, ai.goal.y - goal.y) > 3000;
    if (goalMoved || stuck || now - ai.plannedAt > 4000 || ai.path.length === 0) {
      const grid = (this.navGrid ??= new NavGrid(this.stage!.map));
      // Hulls are obstacles too — wrecks included — and the land-only grid
      // knows nothing of them: route around every other ship still afloat.
      const obstacles = this.world!.ships().filter((o) => o !== s && !o.blown);
      let path = grid.route(s.x, s.y, goal.x, goal.y, obstacles) ?? grid.route(s.x, s.y, goal.x, goal.y);
      if (stuck) {
        // Back off AWAY from the nearest hull (or anywhere free if none is
        // close): a random direction was as likely to point back into it.
        const near = obstacles.reduce<Ship | null>((best, o) => {
          const d = Math.hypot(o.x - s.x, o.y - s.y);
          return d < 7000 && (!best || d < Math.hypot(best.x - s.x, best.y - s.y)) ? o : best;
        }, null);
        const away = near ? Math.atan2(s.y - near.y, s.x - near.x) : Math.random() * Math.PI * 2;
        const escape = grid.nearbyFree(s.x, s.y, 4000, away);
        if (escape) path = [escape, ...(path ?? [])];
        this.stuckLogs++;
        if (this.stuckLogs <= 20 || this.stuckLogs % 50 === 0) {
          this.log(
            `AI ${s.ref} stuck at ${s.x},${s.y} dir ${s.dir} -> goal ${goal.x},${goal.y}` +
              ` (${near ? `ship ${near.ref} ${Math.round(Math.hypot(near.x - s.x, near.y - s.y))} away` : "no hull near"}` +
              `, map ${this.stage!.map.at(s.x, s.y)}, ${path ? `${String(path.length)} waypoints` : "NO ROUTE"})`,
          );
        }
        ai.stillSince = now;
      }
      // The grid ends on a cell centre up to ~1000 off the goal — far enough to
      // stop beside a flag without touching it. Finish on the goal itself.
      if (path && this.stage!.map.at(goal.x, goal.y) <= 1) path.push({ x: goal.x, y: goal.y });
      ai.path = path ?? [];
      ai.goal = goal;
      ai.plannedAt = now;
      c.aiNav = undefined;
    }
    while (ai.path.length > 1 && Math.hypot(ai.path[0].x - s.x, ai.path[0].y - s.y) < 2500) ai.path.shift();
    const next = ai.path[0] ?? goal;
    if (!c.aiNav || c.aiNav.x !== next.x || c.aiNav.y !== next.y || !testBit(s.state, BIT.MOVE)) {
      c.aiNav = next;
      this.queue([1, s.ref, next.x, next.y]);
    }
  }

  // ---------------------------------------------------------------- stage end

  private teamGold(team: 1 | 2): number {
    return this.world!.ships().filter((s) => s.team === team).reduce((sum, s) => sum + s.gold, 0);
  }

  private checkStageEnd(): void {
    const ships = this.world!.ships();
    const alive = (team: 1 | 2) => ships.some((s) => s.team === team && shipAlive(s));
    const timeUp = Date.now() - this.startedAt >= STAGE_SECONDS * 1000;
    if (!alive(1) || !alive(2)) {
      // Ship Battle's whole point; in CTF only when a team has left the game.
      const winner = alive(1) ? 1 : alive(2) ? 2 : 0;
      this.endStage(winner, EndInfo.LastShip);
    } else if (timeUp && this.mode === MODE_CTF) {
      const [winner, info] = this.ctfTimeUp();
      this.endStage(winner, info);
    } else if (timeUp) {
      const g1 = this.teamGold(1);
      const g2 = this.teamGold(2);
      this.endStage(g1 === g2 ? luck() : g1 > g2 ? 1 : 2, g1 === g2 ? EndInfo.EqualBooty : EndInfo.MoreBooty);
    }
  }

  /**
   * CTF at time-out, ranked as `pirates.endinfo.0-9` describe it: a flag in a
   * base, then a flag on board, then a flag nearest the base it is heading
   * for, then the team's gold.
   */
  private ctfTimeUp(): [1 | 2, EndInfo] {
    const world = this.world!;
    const pick = (a: number, b: number, more: EndInfo, tie: EndInfo, lowerWins = false): [1 | 2, EndInfo] => {
      if (a === b) return [luck(), tie];
      return [(a > b) !== lowerWins ? 1 : 2, more];
    };
    const g1 = this.teamGold(1);
    const g2 = this.teamGold(2);
    const home1 = this.bases.get(1)?.params[0] === 1;
    const home2 = this.bases.get(2)?.params[0] === 1;
    if (home1 !== home2) return [home1 ? 1 : 2, EndInfo.FlagHome];
    if (home1 && home2) return pick(g1, g2, EndInfo.BothHomeMoreGold, EndInfo.BothHomeLuck);
    const toBase = (team: 1 | 2, p: { x: number; y: number }) => {
      const b = this.bases.get(team);
      return b ? Math.round(Math.hypot(p.x - b.x, p.y - b.y)) : Infinity;
    };
    const carrier = (team: 1 | 2) => world.ships().find((s) => s.team === team && shipAlive(s) && carriesEnemyFlag(s));
    const c1 = carrier(1);
    const c2 = carrier(2);
    if (Boolean(c1) !== Boolean(c2)) return [c1 ? 1 : 2, EndInfo.FlagOnBoard];
    if (c1 && c2) return pick(toBase(1, c1), toBase(2, c2), EndInfo.BothOnBoardCloser, EndInfo.BothOnBoardLuck, true);
    // Nobody holds a flag. If either has been carried off and dropped, the
    // team that got the ENEMY flag nearer its own base takes it.
    const flagOf = (team: 1 | 2) =>
      [...world.objects.values()].find((o) => o.code === TYPE.POWERUP && o.params[0] === 3 && o.team === team);
    const adrift = ([1, 2] as const).some((t) => {
      const f = flagOf(t);
      const home = this.flagHome.get(t);
      return f && home && Math.hypot(f.x - home.x, f.y - home.y) >= 500;
    });
    if (adrift) {
      const f2 = flagOf(2);
      const f1 = flagOf(1);
      const d1 = f2 ? toBase(1, f2) : Infinity;
      const d2 = f1 ? toBase(2, f1) : Infinity;
      return pick(d1, d2, EndInfo.FlagAtSeaCloser, EndInfo.FlagAtSeaLuck, true);
    }
    return pick(g1, g2, EndInfo.NoFlagMoreGold, EndInfo.NoFlagLuck);
  }

  private endStage(winner: 0 | 1 | 2, endInfo: EndInfo): void {
    this.stageOver = true;
    if (winner) {
      this.wins[winner - 1]++;
      this.queue([39, winner]);
    }
    const g1 = this.teamGold(1);
    const g2 = this.teamGold(2);
    // CTF bonuses, per team member (instructions page 8): bringing the flag
    // home, or holding the enemy flag on board when the stage ends.
    const holding = (team: 1 | 2) =>
      this.world!.ships().some((s) => s.team === team && shipAlive(s) && carriesEnemyFlag(s));
    const bonus = (team: 1 | 2) =>
      this.mode !== MODE_CTF ? 0 : this.captured === team ? CAPTURE_BONUS : holding(team) ? HOLD_BONUS : 0;
    const stageBonus: [number, number] = [bonus(1), bonus(2)];
    this.teamVault[0] += g1;
    this.teamVault[1] += g2;
    for (const c of this.crews) {
      const s = this.shipOf(c);
      if (!s) continue;
      // Ship Battle: "the gold onboard your ship is transferred to your
      // personal vault and it cannot be robbed anymore."
      c.vault += s.gold;
      if (c.human) {
        c.human.loot += s.gold;
        c.human.bonus += stageBonus[c.team - 1];
      }
    }
    const last = this.wins[0] >= 2 || this.wins[1] >= 2 || this.stageIndex >= 2;
    const def = this.stage!;
    this.log(`stage ${this.stageIndex + 1} over: winner ${winner || "none"} (${g1} vs ${g2} gold), wins ${this.wins.join("-")}${last ? ", GAME OVER" : ""}`);
    // Let the team-win event reach the scoreboard, then stop the turns.
    this.later(TURN_MS * 2, () => {
      if (this.ticker) clearInterval(this.ticker);
      this.ticker = null;
      this.running = false;
      const gameWinner = last ? (this.wins[0] === this.wins[1] ? winner : this.wins[0] > this.wins[1] ? 1 : 2) : winner;
      const params = [winner, g1, g2, last ? 1 : 0, stageBonus[0], stageBonus[1], 0, WIN_BONUS, endInfo];
      this.sendAll(MSG.GAME_END_STAGE, [{ int: def.endTime }, { int: params.length }, ...params.map((v) => ({ int: v }))], `GameEndStage ${def.name}`);
      if (last) {
        this.payout(gameWinner);
        this.later((def.endTime + 10) * 1000, () => this.end());
      } else {
        this.later((def.endTime + 1) * 1000, () => this.loadStage(this.stageIndex + 1));
      }
    });
  }

  /**
   * Only players still in the game at the end are paid: "If you leave the
   * game before it ends, you'll lose any gold you have collected".
   *
   *   Ship Battle  your loot, +100 if your team won.
   *   CTF          your team's vault split between its players, plus your
   *                capture/holding bonuses, +100 if your team won (wiki).
   *
   * With AI ships the reward is "very small" — a quarter of the credits. The
   * win still counts towards level unlocks, keys and milestones: the lobby
   * will not start under 4 players, so most games have AI ships in them.
   */
  private payout(winner: number): void {
    const withAI = this.crews.some((c) => !c.human);
    for (const h of this.active()) {
      const won = h.team === winner;
      const crewSize = Math.max(1, this.crews.filter((c) => c.team === h.team).length);
      const gold = this.mode === MODE_CTF ? Math.floor(this.teamVault[h.team - 1] / crewSize) + h.bonus : h.loot;
      let credits = gold + (won ? WIN_BONUS : 0);
      if (withAI) credits = Math.round(credits / 4);
      recordScore(h.player.userId, this.mode === MODE_CTF ? POTC_CTF_GAME_CODE : POTC_LMS_GAME_CODE, gold);
      const extras: string[] = [];
      if (won) {
        const progress = addPotcWin(h.player.userId, this.level, this.mode);
        const total = progress.wins[0] + progress.wins[1] + progress.wins[2];
        const milestone = WIN_MILESTONES.get(total);
        if (milestone) {
          credits += milestone;
          extras.push(`That's ${total} wins - here's a ${milestone} credit bonus!`);
        }
        const levelWins = progress.wins[this.level - 1];
        if (progress.modeWins % KEY_EVERY_WINS === 0) {
          const key = TREASURE_KEY[this.level - 1];
          h.player.givePin(key);
          const mode = this.mode === MODE_CTF ? "Capture the Flag" : "Ship Battle";
          extras.push(`${progress.modeWins} ${mode} wins on level ${this.level} earned you a ${["Bronze", "Silver", "Gold"][this.level - 1]} Treasure Key!`);
          this.log(`${h.player.name}: treasure key ${key}`);
        }
        if (this.level === 1 && levelWins === 10) extras.push("Level 2 games are open to you now.");
        if (this.level === 2 && levelWins === 10) extras.push("Find Captain Blackheart in the Pirate Treehouse to open level 3.");
        this.log(`${h.player.name}: win ${levelWins} on level ${this.level} (${total} total)`);
      }
      h.player.pay(
        credits,
        [
          `Thanks for playing Pirates of the Caribbean! ${won ? "Your team won! " : ""}You took ${gold} gold and have been awarded ${credits} credits.`,
          ...extras,
        ].join(" "),
      );
      this.log(`${h.player.name}: ${gold} gold, ${credits} credits${won ? " (won)" : ""}`);
    }
  }

  // ---------------------------------------------------------------- leaving

  private leaveHuman(h: Human, why: string): void {
    if (h.phase === "out") return;
    h.phase = "out";
    this.log(`${h.player.name} ${why}`);
    const s = this.world?.get(h.ref) as Ship | undefined;
    if (s && shipAlive(s) && !this.pendingKill.has(s.ref)) {
      // A leaver's flag stays in the game.
      if (this.mode === MODE_CTF && this.running && !this.stageOver) this.dropFlag(s);
      this.pendingKill.add(s.ref);
      this.queue([6, s.ref, -1, -1, -1]);
    }
    if (this.active().length === 0 && this.stageIndex >= 0) this.end();
  }

  /** Disconnected, or walked out of room 1001 some other way. */
  drop(userId: number): void {
    const h = this.humans.get(userId);
    if (h) this.leaveHuman(h, "dropped out");
  }

  private end(): void {
    if (this.finished) return;
    this.finished = true;
    if (this.ticker) clearInterval(this.ticker);
    this.ticker = null;
    for (const t of this.timers) clearTimeout(t);
    this.timers.clear();
    for (const h of this.humans.values()) {
      if (h.phase === "ready") {
        h.phase = "out";
        h.player.toLobby();
      }
    }
    this.log("match over");
    this.onOver(this);
  }
}
