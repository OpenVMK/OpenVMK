/**
 * Haunted Mansion Ghost Chasers — one running match. Lobby: haunted-mansion.ts.
 * Plan and protocol: docs/HAUNTED-MANSION-PLAN.md.
 *
 * THE START (the 2005 `minigame_engine` + `vmk_hm_minigame`):
 *
 *   2613 prepare room  -> CHMGameComponent.PrepareRoom (in place: no room
 *                         switch yet). It only sends 580 once it has seen
 *   2591 [0]           -> `CHMGameHandler._LeaveRoom`. `0` keeps the generic
 *                         room handler from tearing the room down.
 *   580                -> the player moves into this match's bucket `hm#<ref>`.
 *   2614 participants  -> `ref, name` per human.
 *   2607 load stage    -> `name, version` (2005: two fields). CHMStage
 *                         room_switches to `hm_level<N>` — a LOCAL switch: the
 *                         client sends no 580, and the new room context has no
 *                         avatars in it. room_ready -> InitGameEngine -> 602.
 *   602                -> that client gets CreateAvatars (everyone, on their
 *                         start tiles), 2605 (every object but its player)
 *                         and 2610 (its player: `GetMyObjects()[1]`).
 *   2611 start stage   -> "GET READY", STARTTIME seconds; inputs wait.
 *   2601 every 1.65 s  -> `CHMGameComponent.PrepareRoom: _SetTurnPulse(1.65)`.
 *   2612 end stage     -> `[winner, team1Ghosts, team2Ghosts, moreStages,
 *                         doorRaceWinner, cancelled]`.
 *
 * MOVEMENT is not a game object. The player object (type 3) is reset to
 * (0,0,0) every subturn (`CHMFactorPlayerObject.move`); the body is the ROOM
 * AVATAR, walked by `2583` status pulses one tile per 300 ms (the factor sets
 * the avatar's `m_iStatusDelay = 300`). The client sends 601 walk `7 [dir]`
 * and keeps walking until `4` (stop) or `3 [dir]` (stop, face dir).
 *
 * CHECKSUM: tested at the START of every turn, over all objects in ref order,
 * so the server encodes it before applying that turn's events. Every client
 * mutation of an object's fields is mirrored in `apply` (`CHMMGHandler.OnEvent`
 * and the factors). A mismatch arrives as action 3 with count 1 — HM's own
 * "face" is action 3 with count 2 — and is answered with a 2609 next turn.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { coveredTiles } from "./furni-footprint.js";
import { recordHmWin, type HmGame, type HmParticipant, type HmPlayer } from "./haunted-mansion.js";
import { iterateSeed } from "./jungle-cruise.js";
import { directionBetween, roomTiles, tileCoords, tileToward } from "./room-geometry.js";
import { avatarActions, HAND_STAND, HAND_WALK, LEGS_STAND, LEGS_WALK, MSG, type OutgoingParam } from "./vmk-protocol.js";

const here = dirname(fileURLToPath(import.meta.url));
const STAGES_DIR = join(here, "..", "..", "client", "assets", "casts", "vmk_hm_stages", "text");

/**
 * ⚠ 0.3 s — what the client actually runs. The decompiled `.ls` beside the cast
 * says `_SetTurnPulse(1.65)`, but the TRANSPILED build the client executes
 * (`generated-casts/vmk_hm_minigame__CHMGameComponent__PrepareRoom.ts`) says
 * 0.3, and the `.ls` floats disagree elsewhere too (the ghost spring). At
 * 1.65 s each turn played out in 0.3 s and the ghosts then froze: jerky motion.
 */
const TURN_MS = 300;
const SUBTURNS = 1;
const WALK_MS = 300;
const LOAD_TIMEOUT_MS = 20_000;
/** Round length is not in any surviving data (STARTTIME/ENDTIME are the countdown and the results pause). */
const ROUND_SECONDS = Math.max(15, Number(process.env.VMK_HM_ROUND_SECONDS ?? 90) || 90);
/** "The first team to win two game rounds is the winner" (hm.instructions.text.page.1). */
const WINS_NEEDED = 2;
/** The ride's order (docs/HAUNTED-MANSION-PLAN.md, "Stage choice"); a random layout of each. */
const THEMES = ["stretchingroom", "ballroom", "attic", "graveyard"];
/**
 * Layouts 2-7 of each theme. Every `_1` is a sparse early file (stage
 * VERSION 3-9; 0-1 coffins, a handful of furniture) — a test layout, not one
 * worth playing; every other layout has 4+ coffins.
 */
const LAYOUTS = [2, 3, 4, 5, 6, 7];
/** After the last round's results: the Game Over window shows 3 s in; then home. */
const GAME_OVER_MS = 12_000;
/** Resync a drifting client at most this often. */
const RESYNC_GAP_MS = 5_000;

// Rewards (wiki, "Haunted Mansion Ghost Chasers").
/** "Each caught ghost is worth 5 credits" (also hm.instructions.text.page.1); 10 on some event days. */
const CREDITS_PER_GHOST = Math.max(0, Number(process.env.VMK_HM_CREDITS_PER_GHOST ?? 5) || 0);
/** "180 credits for every 5th win, 375 for every 10th, 2,000 for every 50th" — largest that applies. */
const WIN_MILESTONES: [number, number][] = [[50, 2000], [10, 375], [5, 180]];
/**
 * Idle kick: warn after this long without input, boot this long after (guesses
 * — as Pirates). VMK_HM_IDLE_SECONDS sets the first; 0 turns the kick off (a
 * test client nobody drives would otherwise be booted from every game).
 */
const IDLE_WARN_MS = Math.max(0, Number(process.env.VMK_HM_IDLE_SECONDS ?? 60) || 0) * 1000;
const IDLE_KICK_MS = 15_000;

// Ghosts. None of these figures survive (Sulake's server is lost); each is a
// guess, labelled, and the population knobs are VMK_HM_* settings.
/** Ghosts of each colour on the floor at the start of a round, and the level respawning tops up to. */
const GHOSTS_PER_TEAM = Math.max(1, Number(process.env.VMK_HM_GHOSTS ?? 5) || 5);
/** How often a missing ghost comes back (guess). */
const RESPAWN_MS = Math.max(1000, Number(process.env.VMK_HM_RESPAWN_MS ?? 8000) || 8000);
/** "You will return to normal when the bar above you fills up" — `CHMPlayerStatus` runs that bar for 10000 ms. */
const POSSESSION_MS = 10_000;
/** How far a ghost notices a player, in tiles (guess). */
const SENSE_TILES = 6;
/** A rattled coffin shakes ~10 frames, then opens (`CHMCoffinRattler`); the ghost comes out then. */
const COFFIN_SPAWN_MS = 1500;
/** A coffin rests this long between rattles (no original figure survives). */
const COFFIN_COOLDOWN_MS = 3_500;
/** How near a coffin you rattle it from, in tiles (~62 px). */
const COFFIN_REACH_TILES = 2;
/** The vacuum's reach: a 112 px (≈3 tiles) cone, ±45° of facing. */
const VACUUM_REACH_TILES = 3;
const VACUUM_HALF_ANGLE = Math.PI / 4;
/** "That player's team gains 2 ghosts" for vacuuming up a possessed opponent (wiki). */
const GHOSTLY_CATCH_SCORE = 2;
/** `CAvatarClassHauntedMansion.ActHands`: 13 = "cth" (vacuum beam), 12 = "rtl" (rattling). */
const HAND_CATCH = 13;
const HAND_RATTLE = 12;
/** Ghost step cadence in turns: `CHMFactorGhost.SetMoveTarget` moveDelay 3 idle, 2 chasing/fleeing. */
const STEP_IDLE = 3;
const STEP_HURRY = 2;

// The door race (wiki: "Find the Right Door").
/** "Players have 30 seconds to find a door." VMK_HM_DOOR_RACE_SECONDS stretches it for testing. */
const DOOR_RACE_MS = Math.max(10, Number(process.env.VMK_HM_DOOR_RACE_SECONDS ?? 30) || 30) * 1000;
/** How close counts as "at" a door, in tiles (48 px, ≈1½ tiles). */
const DOOR_REACH_TILES = 1.5;
/** "A new blue ghost spawns every 10 seconds" from the moment the message appears. */
const SUPER_GHOST_EVERY_MS = 10_000;
/** Blue ghosts' step cadence in turns (guess — `SPEED SUPERGHOST` is empty in every stage but one). */
const STEP_SUPER = 2;
/** `CreateSuperGhost` team 3/4/5 picks the blue sprite variant. */
const SUPER_GHOST_TEAM = 3;
/** The head start: the losing team's "delayed" bar runs 5000 ms (`CHMPlayerStatus`); the hitchhiking ghosts say 5 s too. */
const HEAD_START_MS = 5_000;
/**
 * Sudden death: the door race's OVERTIME when nobody has found the right door
 * (8 s). The original client backs the door part:
 * `StartSuddenDeath` shows its notice and plays `doors-open`. A tied ghost count
 * is simply a drawn round (`hmg.results.winner0`, "NO TEAM WINS ROUND").
 */
const SUDDEN_DEATH_MS = 8_000;

export const OBJ = { GHOST: 1, SUPERGHOST: 2, PLAYER: 3, COFFIN: 4, SCOREBOARD: 5 } as const;
/** `CHMFactorPlayerObject` statebits. */
const BIT = { POSSESSED: 1, OUT: 2, INVISIBLE: 4 } as const;
/** `CHMMGHandler.OnEvent`. */
export const EV = {
  COFFIN_RATTLES: 1, CREATE_GHOST: 2, CREATE_SUPERGHOST: 3, PLAYER_TO_GHOST: 4, GHOST_TO_PLAYER: 5,
  GHOST_CAUGHT: 6, SUPERGHOST_CATCH: 7, MOVE_GHOST: 8, CREATE_PICKUP: 9, REMOVE_GHOST: 10,
  COLLECT_PICKUP: 11, COFFIN_TREMBLES: 12, CATCH_GHOSTLY_PLAYER: 13, ENDING_TIMER: 14, IDLE_WARNING: 15,
  START_DOOR_RACE: 16, SUDDEN_DEATH: 17, CORRECT_EXIT: 18, ADVANTAGE_ENDS: 19, SWING_DOOR: 20,
  TOGGLE_VISIBLE: 21, PLAYER_LEFT: 22, DOOR_RACE_ADVANTAGE: 23,
} as const;
/** 601 actions (`CHMGameInterface`, `CHMWindowUI`). */
const ACT = { VACUUM_ON: 2, FACE: 3, STOP: 4, QUIT: 5, WALK: 7, VACUUM_OFF: 8 } as const;
const OBJECT_REF_BASE = 1000;
/** VMK_HM_DEBUG=1: log every vacuum press (cone, nearby ghosts) and door distances each second. */
const HM_DEBUG = process.env.VMK_HM_DEBUG === "1";
/** World (x, y) per walking direction — `room-geometry.ts` `CLOCKWISE`, inverted. */
const WALK_VECTORS: Record<number, [number, number]> = {
  0: [-1, -1], 1: [0, -1], 2: [1, -1], 3: [1, 0], 4: [1, 1], 5: [0, 1], 6: [-1, 1], 7: [-1, 0],
};

// ---------------------------------------------------------------- stages

interface StageItem {
  type: string;
  tile: number;
  dir: number;
  code: number;
  ref: number;
  name: string;
}

export interface StageDef {
  name: string;
  version: number;
  startTime: number;
  endTime: number;
  roomCode: number;
  roomName: string;
  items: StageItem[];
}

const stageFiles = new Map<string, string>();
function indexStages(): void {
  if (stageFiles.size) return;
  for (const file of readdirSync(STAGES_DIR)) {
    const m = /^\d+_stage\.(.+)\.xml_stxt_0\.txt$/.exec(file);
    if (m) stageFiles.set(m[1], join(STAGES_DIR, file));
  }
}

const attr = (tag: string, name: string): string => new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1] ?? "";

export function loadStage(name: string): StageDef {
  indexStages();
  const path = stageFiles.get(name);
  if (!path) throw new Error(`HM stage ${name} not found in ${STAGES_DIR}`);
  const xml = readFileSync(path, "latin1");
  const root = /<HAUNTED_MANSION\b[^>]*>/.exec(xml)?.[0] ?? "";
  const room = /<ROOM\b[^>]*>/.exec(xml)?.[0] ?? "";
  const itemsXml = /<ITEMS>([\s\S]*?)<\/ITEMS>/.exec(xml)?.[1] ?? "";
  const items: StageItem[] = [];
  for (const m of itemsXml.matchAll(/<(\w+)\b([^>]*)\/?>/g)) {
    items.push({
      type: m[1],
      tile: Number(attr(m[2], "TILE")),
      dir: Number(attr(m[2], "DIR")),
      code: Number(attr(m[2], "CODE")),
      ref: Number(attr(m[2], "REF")),
      name: attr(m[2], "NAME"),
    });
  }
  return {
    name,
    version: Number(attr(root, "VERSION")),
    startTime: Number(attr(root, "STARTTIME")) || 5,
    endTime: Number(attr(root, "ENDTIME")) || 10,
    roomCode: Number(attr(room, "CODE")),
    roomName: attr(room, "NAME"),
    items,
  };
}

/**
 * The tiles furniture, coffins and doors make solid. Only LOOP items are left
 * out of the game room (`CHMStage.DumpFurni`: `case "DOOR": break; case
 * "LOOP": continue` — doors ARE placed; they are what the vortex opens in).
 */
function solidTiles(def: StageDef): Set<number> {
  const solid = new Set<number>();
  for (const item of def.items) {
    if (item.type !== "FURNITURE" && item.type !== "COFFIN" && item.type !== "DOOR") continue;
    const covered = coveredTiles(def.roomName, item.tile, item.code, item.dir);
    if (covered.size === 0) solid.add(item.tile);
    for (const [tile, block] of covered) if (!block.walk) solid.add(tile);
  }
  return solid;
}

// ---------------------------------------------------------------- objects

interface GObj {
  code: number;
  ref: number;
  owner: number;
  team: number;
  x: number;
  y: number;
  z: number;
  dir: number;
  params: number[];
  /** Players: the separate `Score` param `AwardScore` keeps (starts VOID = 0). */
  score?: number;
  /** Super ghosts keep their creation move delay (`CHMFactorSuperGhost`). */
  moveDelay?: number;
}

function encodeObject(o: GObj): number[] {
  return [8 + o.params.length, o.code, o.ref, o.owner, o.team, o.x, o.y, o.z, o.dir, ...o.params];
}

function encodeTurn(turn: number, checksum: number, subturns: number[][][]): number[] {
  const out = [turn, checksum, subturns.length];
  for (const events of subturns) {
    out.push(events.length);
    for (const e of events) out.push(e.length, ...e);
  }
  return out;
}

/** Turn numbers whose seed is safe in both runtimes (see pirates-engine.ts `nextTurn`). */
function nextTurn(turn: number): { turn: number; seed: number } {
  for (;;) {
    turn = turn >= 8191 ? 1 : turn + 1;
    const seed = iterateSeed(turn);
    if (seed !== null && Math.abs(seed) < 2 ** 30) return { turn, seed };
  }
}

const ints = (values: number[]): OutgoingParam[] => values.map((v) => ({ int: v }));

const ordinal = (n: number): string => {
  const tail = n % 100 >= 11 && n % 100 <= 13 ? "th" : (["th", "st", "nd", "rd"][n % 10] ?? "th");
  return `${n}${tail}`;
};

// ---------------------------------------------------------------- match

interface Human {
  player: HmPlayer;
  ref: number;
  team: 1 | 2;
  phase: "preparing" | "ready" | "out";
  loaded: boolean;
  resync: boolean;
  lastResync: number;
  objRef: number;
  tile: number;
  facing: number;
  walkDir: number | null;
  walking: boolean;
  /** The LOOP tile we just arrived on — no bounce back until we step off it. */
  arrivedOn: number | null;
  vacuum: boolean;
  /** Ghosts caught over the whole game (credits). */
  ghosts: number;
  /** When a possession wears off (0 = not possessed). */
  possessedUntil: number;
  /** Rattling a coffin: the hands show it until then. */
  rattleUntil: number;
  /** Through the right door this door race. */
  exited: boolean;
  /** Caught by a blue ghost this door race. */
  out: boolean;
  /** The other team's head start: frozen until then. */
  delayedUntil: number;
  /** Wrong doors this player has just tried. */
  swungAt: Map<number, number>;
  /** Last walk/face/vacuum input, for the idle kick. */
  lastInput: number;
  /** When the idle warning went out (0 = not warned). */
  idleWarnedAt: number;
}

interface Door {
  /** Stage item REF — what SwingDoor / CorrectExit name (`CHMGameComponent.m_ar_rDoors`). */
  ref: number;
  name: string;
  tiles: Set<number>;
}

type Phase = "hunt" | "suddenDeath" | "doorRace" | "over";

interface Ghost {
  ref: number;
  /** 1 green, 2 purple; a blue ghost carries its sprite variant (3). */
  team: number;
  tile: number;
  mood: 0 | 1 | 2;
  /** Subturns until the next step. */
  wait: number;
  /** Wandering keeps a heading until it hits something. */
  heading: number | null;
  /** A blue ghost of the door race: chases anyone, can't be vacuumed. */
  super: boolean;
  /** The tile it just left — never stepped straight back onto while it has a choice. */
  previous: number | null;
}

interface Coffin {
  /** The stage item REF — what `CoffinRattles` names (`CHMStage.rattle`). */
  ref: number;
  tiles: Set<number>;
  anchor: number;
  readyAt: number;
  spawnAt: number;
}

export class HmMatch implements HmGame {
  private readonly humans = new Map<number, Human>();
  private readonly objects = new Map<number, GObj>();
  private stageIndex = -1;
  private stage: StageDef | null = null;
  private solid = new Set<number>();
  /** LOOP tile -> its partner (same NAME). */
  private loops = new Map<number, number>();
  private turn = 0;
  private ticker: ReturnType<typeof setInterval> | null = null;
  private walker: ReturnType<typeof setInterval> | null = null;
  private readonly timers = new Set<ReturnType<typeof setTimeout>>();
  private queued: number[][] = [];
  private nextRef = OBJECT_REF_BASE;
  private running = false;
  private startedAt = 0;
  private lastTimerSent = -1;
  private wins: [number, number] = [0, 0];
  private begunStage = -1;
  private stageOver = false;
  private finished = false;
  private scoreboardRef = 0;
  private readonly ghosts = new Map<number, Ghost>();
  private coffins: Coffin[] = [];
  /** Walkable, reachable, non-solid tiles of this stage, and their walking neighbours. */
  private open = new Set<number>();
  private neighbours = new Map<number, number[]>();
  private nextRespawnAt = 0;
  private phase: Phase = "hunt";
  private doors: Door[] = [];
  private correctDoor = 0;
  private phaseEndsAt = 0;
  private nextSuperAt = 0;
  private roundWinner: 0 | 1 | 2 = 0;
  private doorRaceWinner: 0 | 1 | 2 = 0;
  /** The order teams came through the right door, for the tie-break. */
  private exitOrder: (1 | 2)[] = [];
  /** Last stage's door race winner: gets the head start this stage. */
  private headStartTeam: 0 | 1 | 2 = 0;
  private lastDoorReport = 0;
  /** The other team left: no win is recorded. */
  private cancelled = false;

  constructor(
    readonly ref: number,
    participants: HmParticipant[],
    players: Map<number, HmPlayer>,
    private readonly onOver: (match: HmMatch) => void,
  ) {
    for (const p of participants) {
      if (p.ref <= 0) continue; // the test placeholder plays no part
      const player = players.get(p.ref);
      if (!player) continue;
      this.humans.set(p.ref, {
        player, ref: p.ref, team: p.team, phase: "preparing", loaded: false, resync: false, lastResync: 0,
        objRef: 0, tile: 0, facing: 4, walkDir: null, walking: false, arrivedOn: null, vacuum: false, ghosts: 0,
        possessedUntil: 0, rattleUntil: 0, exited: false, out: false, delayedUntil: 0, swungAt: new Map(),
        lastInput: Date.now(), idleWarnedAt: 0,
      });
    }
  }

  get bucket(): string {
    return `hm#${this.ref}`;
  }

  has(userId: number): boolean {
    const h = this.humans.get(userId);
    return h !== undefined && h.phase !== "out";
  }

  private log(text: string): void {
    console.log(`[hm #${this.ref}] ${text}`);
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
    this.log(`starting: ${this.humans.size} player(s)`);
    for (const h of this.humans.values()) {
      h.player.send(MSG.GAME_PREPARE_ROOM, [{ int: 1104 }], "GamePrepareRoom hm");
      h.player.send(MSG.LEAVE_ROOM, [{ int: 0 }], "LeaveRoom 0 (HM PrepareRoom gate)");
    }
    this.later(LOAD_TIMEOUT_MS, () => this.beginIfReady(true));
  }

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
    for (const h of waiting) this.leaveHuman(h, "never reached the game");
    if (this.active().length === 0) return this.end();
    const list: OutgoingParam[] = [{ int: this.active().length }];
    for (const h of this.active()) list.push({ int: h.ref }, { str: h.player.name });
    this.sendAll(MSG.GAME_PARTICIPANT_LIST, list, `GameParticipantList ${this.active().length}`);
    this.walker = setInterval(() => this.walk(), WALK_MS);
    this.loadStage(0);
  }

  private loadStage(index: number): void {
    this.stageIndex = index;
    this.stageOver = false;
    this.running = false;
    this.queued = [];
    this.objects.clear();
    const theme = THEMES[index % THEMES.length];
    const name = `hm_${theme}_${LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)]}`;
    const def = loadStage(name);
    this.stage = def;
    this.solid = solidTiles(def);
    this.loops.clear();
    const loopItems = def.items.filter((i) => i.type === "LOOP");
    for (const a of loopItems) {
      const b = loopItems.find((o) => o !== a && o.name === a.name);
      if (b) this.loops.set(a.tile, b.tile);
    }

    this.ghosts.clear();
    this.mapStage(def);
    this.coffins = def.items
      .filter((i) => i.type === "COFFIN")
      .map((c) => {
        const tiles = new Set(coveredTiles(def.roomName, c.tile, c.code, c.dir).keys());
        tiles.add(c.tile);
        return { ref: c.ref, tiles, anchor: c.tile, readyAt: 0, spawnAt: 0 };
      });
    // Only NAMED doors open (`CHMStage.DumpFurni` gives HM_NAME to those alone).
    this.doors = def.items
      .filter((i) => i.type === "DOOR" && i.name)
      .map((d) => {
        const tiles = new Set(coveredTiles(def.roomName, d.tile, d.code, d.dir).keys());
        tiles.add(d.tile);
        return { ref: d.ref, name: d.name, tiles };
      });
    this.phase = "hunt";
    this.roundWinner = 0;
    this.doorRaceWinner = 0;
    this.exitOrder = [];
    this.correctDoor = 0;

    // Objects. Refs ascend in creation order — the checksum walks them sorted.
    this.scoreboardRef = this.nextRef++;
    this.add({ code: OBJ.SCOREBOARD, ref: this.scoreboardRef, owner: -1, team: 0, x: 0, y: 0, z: 0, dir: 0, params: [0, 0, this.wins[0], this.wins[1]] });
    for (const c of def.items.filter((i) => i.type === "COFFIN")) {
      const [x, y, z] = tileCoords(def.roomName, c.tile) ?? [0, 0, 0];
      this.add({ code: OBJ.COFFIN, ref: this.nextRef++, owner: -1, team: 0, x, y, z, dir: c.dir, params: [] });
    }
    const starts = this.startTiles(def, this.active().length);
    for (const [i, h] of this.active().entries()) {
      h.objRef = this.nextRef++;
      h.tile = starts[i] ?? starts[0] ?? 0;
      h.facing = 4;
      h.walkDir = null;
      h.walking = false;
      h.arrivedOn = null;
      h.vacuum = false;
      h.possessedUntil = 0;
      h.rattleUntil = 0;
      h.exited = false;
      h.out = false;
      h.delayedUntil = 0;
      h.swungAt.clear();
      h.loaded = false;
      h.resync = false;
      this.add({ code: OBJ.PLAYER, ref: h.objRef, owner: h.ref, team: h.team, x: 0, y: 0, z: 0, dir: 0, params: [0, 0], score: 0 });
    }
    this.log(`stage ${index + 1}: ${name} (${def.roomName}), ${this.solid.size} solid tile(s), ${this.loops.size / 2} teleport pair(s)`);
    this.sendAll(MSG.GAME_LOAD_STAGE, [{ str: name }, { int: def.version }], `GameLoadStage ${name} v${def.version}`);
    const at = index;
    this.later(LOAD_TIMEOUT_MS, () => {
      if (this.stageIndex === at) this.beginStage();
    });
  }

  /**
   * The stage's walkable world: the LARGEST connected area of non-solid tiles,
   * walking the floor graph plus the LOOP teleports (the attic's two floors
   * only meet through one).
   *
   * ⚠ Not "reachable from the room's spawn tile": a stage's furniture can wall
   * that tile in — `hm_stretchingroom_4` leaves it a 9-tile pocket, and both
   * teams started there, boxed in, with no room to spawn a ghost.
   */
  private mapStage(def: StageDef): void {
    const tiles = roomTiles(def.roomName);
    this.neighbours = new Map(tiles.map((t) => [t.ref, t.neighbours]));
    this.open = new Set();
    const unvisited = new Set(tiles.map((t) => t.ref).filter((t) => !this.solid.has(t)));
    let best = new Set<number>();
    while (unvisited.size) {
      const origin = unvisited.values().next().value as number;
      unvisited.delete(origin);
      const area = new Set<number>([origin]);
      const queue = [origin];
      while (queue.length) {
        const t = queue.shift()!;
        const next = [...(this.neighbours.get(t) ?? [])];
        const partner = this.loops.get(t);
        if (partner !== undefined) next.push(partner);
        for (const n of next) {
          if (!unvisited.has(n)) continue;
          unvisited.delete(n);
          area.add(n);
          queue.push(n);
        }
      }
      if (area.size > best.size) best = area;
    }
    for (const t of best) if (!this.loops.has(t)) this.open.add(t);
  }

  private shuffled(tiles: Iterable<number>): number[] {
    const out = [...tiles];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  /** Walking distance (in steps, teleports included) from `from` to every open tile. */
  private steps(from: number): Map<number, number> {
    const dist = new Map<number, number>([[from, 0]]);
    const queue = [from];
    while (queue.length) {
      const t = queue.shift()!;
      const next = [...(this.neighbours.get(t) ?? [])];
      const partner = this.loops.get(t);
      if (partner !== undefined) next.push(partner);
      for (const n of next) {
        if (dist.has(n) || !(this.open.has(n) || this.loops.has(n))) continue;
        dist.set(n, dist.get(t)! + 1);
        queue.push(n);
      }
    }
    return dist;
  }

  /**
   * Start tiles, one per player in `this.active()` order. The original's rule
   * is lost; this keeps the teams APART and out of corners: each team gathers
   * round its own anchor, the two anchors as far apart as walking allows, and
   * an anchor must have open ground round it (6+ open neighbours).
   */
  private startTiles(_def: StageDef, _count: number): number[] {
    const roomy = [...this.open].filter((t) => (this.neighbours.get(t) ?? []).filter((n) => this.open.has(n)).length >= 6);
    const pool = roomy.length ? roomy : [...this.open];
    if (!pool.length) return [];
    const first = this.shuffled(pool)[0];
    const fromFirst = this.steps(first);
    const second = pool.reduce((best, t) => ((fromFirst.get(t) ?? -1) > (fromFirst.get(best) ?? -1) ? t : best), first);
    const anchors: Record<1 | 2, number> = Math.random() < 0.5 ? { 1: first, 2: second } : { 1: second, 2: first };
    const taken = new Set<number>();
    return this.active().map((h) => {
      const near = [...this.steps(anchors[h.team]).entries()]
        .filter(([t]) => this.open.has(t) && !taken.has(t))
        .sort((a, b) => a[1] - b[1]);
      const tile = near[0]?.[0] ?? anchors[h.team];
      taken.add(tile);
      return tile;
    });
  }

  private add(o: GObj): void {
    this.objects.set(o.ref, o);
  }

  private sorted(): GObj[] {
    return [...this.objects.values()].sort((a, b) => a.ref - b.ref);
  }

  /** 602: this client's engine is up — avatars first, then the world. */
  stageLoaded(userId: number): void {
    const h = this.humans.get(userId);
    if (!h || h.phase !== "ready" || !this.stage) return;
    h.loaded = true;
    const blocks = this.active().flatMap((o) => o.player.avatarBlock(o.tile, o.facing, o.team));
    h.player.send(MSG.CREATE_AVATARS, [{ int: this.active().length }, ...blocks], `CreateAvatars ${this.active().length} (hm stage)`);
    h.player.send(MSG.AVATAR_INFO, [{ int: h.ref }], `AvatarInfo own=${h.ref}`);
    const others = this.sorted().filter((o) => o.ref !== h.objRef);
    h.player.send(MSG.GAME_OBJECTS_LIST, [{ int: others.length }, ...others.flatMap((o) => ints(encodeObject(o)))], `GameObjectsList ${others.length}`);
    const mine = this.objects.get(h.objRef);
    if (mine) h.player.send(MSG.GAME_CREATE_MY_OBJECT, ints(encodeObject(mine)), `GameCreateMyObject player ${h.objRef}`);
    if (this.begunStage === this.stageIndex) h.resync = true;
    else if (this.active().every((q) => q.loaded)) this.beginStage();
  }

  /** ⚠ Once per stage — see pirates-match.ts `begunStage`. */
  private beginStage(): void {
    if (!this.stage || this.begunStage === this.stageIndex || this.stageOver) return;
    this.begunStage = this.stageIndex;
    if (this.ticker) clearInterval(this.ticker);
    this.sendAll(MSG.GAME_START_STAGE, [{ int: 0 }], `GameStartStage ${this.stage.name}`);
    const at = this.stageIndex;
    this.later(this.stage.startTime * 1000, () => {
      if (this.stageIndex !== at || this.stageOver) return;
      this.running = true;
      this.startedAt = Date.now();
      this.lastTimerSent = -1;
      for (const h of this.active()) {
        h.lastInput = Date.now(); // loading and the countdown are not idling
        h.idleWarnedAt = 0;
      }
      for (const team of [1, 2] as const) for (let i = 0; i < GHOSTS_PER_TEAM; i++) this.spawnGhost(this.queued, team);
      this.nextRespawnAt = Date.now() + RESPAWN_MS;
      // Last door race's winners go first: the others wait out the "delayed" bar.
      const ahead = this.headStartTeam;
      if (ahead) {
        this.event(EV.DOOR_RACE_ADVANTAGE, ahead, HEAD_START_MS / 1000);
        for (const h of this.active()) if (h.team !== ahead) h.delayedUntil = Date.now() + HEAD_START_MS;
        this.later(HEAD_START_MS, () => {
          if (this.stageIndex === at && !this.stageOver) this.event(EV.ADVANTAGE_ENDS, ahead);
        });
        this.log(`${ahead === 1 ? "green" : "purple"} has a ${HEAD_START_MS / 1000} s head start`);
      }
      this.headStartTeam = 0;
    });
    this.ticker = setInterval(() => this.tick(), TURN_MS);
  }

  // ---------------------------------------------------------------- turns

  private event(...data: number[]): void {
    this.queued.push(data);
  }

  private tick(): void {
    if (this.finished) return;
    if (this.running && !this.stageOver) {
      const now = Date.now();
      const endsAt = this.phase === "hunt" ? this.startedAt + ROUND_SECONDS * 1000 : this.phaseEndsAt;
      const left = Math.max(0, Math.ceil((endsAt - now) / 1000));
      if (left !== this.lastTimerSent) {
        this.lastTimerSent = left;
        this.event(EV.ENDING_TIMER, left);
      }
      if (left === 0) this.phaseOver();
      if (this.stageOver) {
        this.flushTurn();
        return;
      }
    }
    this.flushTurn();
  }

  /** Would another stage follow if `winner` took this round? */
  private moreAfter(winner: 0 | 1 | 2): boolean {
    const wins: [number, number] = [...this.wins];
    if (winner) wins[winner - 1]++;
    return wins[0] < WINS_NEEDED && wins[1] < WINS_NEEDED && this.stageIndex + 1 < THEMES.length;
  }

  /** A phase's clock ran out. */
  private phaseOver(): void {
    if (this.phase === "hunt") {
      const g1 = this.teamGhosts(1);
      const g2 = this.teamGhosts(2);
      this.roundWinner = g1 > g2 ? 1 : g2 > g1 ? 2 : 0; // a tie is a drawn round
      return this.afterHunt();
    }
    // Nobody through the right door yet: overtime. Otherwise the race is decided.
    if (this.phase === "doorRace" && this.exitOrder.length === 0 && this.racersLeft() > 0) {
      return this.startSuddenDeath();
    }
    if (this.phase === "doorRace" || this.phase === "suddenDeath") return this.finishDoorRace();
  }

  private racersLeft(): number {
    return this.active().filter((h) => h.loaded && !h.exited && !h.out).length;
  }

  private startSuddenDeath(): void {
    this.phase = "suddenDeath";
    this.phaseEndsAt = Date.now() + SUDDEN_DEATH_MS;
    this.event(EV.SUDDEN_DEATH);
    this.log("sudden death — door race overtime");
  }

  /** The round is decided: race for the door if there is a next room, else end. */
  private afterHunt(): void {
    if (!this.moreAfter(this.roundWinner) || this.doors.length === 0) return this.endStage(false);
    this.phase = "doorRace";
    this.phaseEndsAt = Date.now() + DOOR_RACE_MS;
    this.correctDoor = this.doors[Math.floor(Math.random() * this.doors.length)].ref;
    for (const h of this.active()) {
      h.vacuum = false;
      if (this.possessed(h)) {
        h.possessedUntil = 0;
        this.event(EV.GHOST_TO_PLAYER, h.objRef);
      }
    }
    this.event(EV.START_DOOR_RACE);
    this.nextSuperAt = Date.now(); // one at once, then every 10 s
    this.log(`door race — the right door is ${this.doors.find((d) => d.ref === this.correctDoor)?.name} (ref ${this.correctDoor})`);
  }

  private finishDoorRace(): void {
    const through = (team: 1 | 2) => this.active().filter((h) => h.team === team && h.exited).length;
    const a = through(1);
    const b = through(2);
    this.doorRaceWinner = a > b ? 1 : b > a ? 2 : (this.exitOrder[0] ?? 0);
    this.headStartTeam = this.doorRaceWinner;
    this.log(`door race over: green ${a} through, purple ${b} -> ${this.doorRaceWinner || "nobody"}`);
    this.endStage(false);
  }

  /** Door race, each turn: who reached which door. */
  private checkDoors(events: number[][], now: number): void {
    const report = HM_DEBUG && this.lastDoorReport + 1000 <= now;
    if (report) this.lastDoorReport = now;
    for (const h of this.active()) {
      if (!h.loaded || h.exited || h.out) continue;
      // Within reach, or walking straight into it (doors are solid, in walls).
      const ahead = h.walkDir === null ? null : tileToward(this.stage?.roomName, h.tile, h.walkDir);
      let door: Door | undefined;
      let nearest = Infinity;
      for (const d of this.doors) {
        for (const t of d.tiles) {
          const dist = this.distance(h.tile, t);
          if (dist < nearest) nearest = dist;
          if (dist <= DOOR_REACH_TILES || t === ahead) door ??= d;
        }
      }
      if (report) this.log(`door race: ${h.player.name} at ${h.tile}, nearest door ${nearest === Infinity ? "on another floor" : `${nearest} tiles`}`);
      if (!door) continue;
      if (door.ref === this.correctDoor) {
        h.exited = true;
        h.walkDir = null;
        h.vacuum = false;
        this.exitOrder.push(h.team);
        events.push([EV.CORRECT_EXIT, h.objRef, door.ref], [EV.TOGGLE_VISIBLE, h.objRef, 1]);
        this.log(`${h.player.name} found the right door (${door.name})`);
        // Sudden death: the first one through settles it.
        if (this.phase === "suddenDeath") this.phaseEndsAt = Math.min(this.phaseEndsAt, now);
      } else if (this.exitOrder.length === 0 && !h.swungAt.has(door.ref)) {
        // A wrong door counts once per player per race, and once the
        // right one is found only it does.
        h.swungAt.set(door.ref, now);
        events.push([EV.SWING_DOOR, door.ref]);
        this.log(`${h.player.name} tried the wrong door (${door.name}) — it swings`);
      }
    }
    const left = this.active().filter((h) => h.loaded && !h.exited && !h.out);
    if (left.length === 0) this.phaseEndsAt = Math.min(this.phaseEndsAt, now);
  }

  /** Send one turn: checksum of the world as it stands, then the queued events (all in the first subturn). */
  private flushTurn(): void {
    const { turn, seed } = nextTurn(this.turn);
    this.turn = turn;
    const objectsBefore = this.sorted();
    let checksum = seed;
    for (const o of objectsBefore) {
      let c = 1;
      for (const v of [o.code, o.ref, o.owner, o.team, o.x, o.y, o.z, o.dir, ...o.params]) checksum += Math.round(v) * c++;
    }
    checksum |= 0;
    const objectInts = objectsBefore.flatMap((o) => encodeObject(o));
    // Input-driven events go in the first subturn; every subturn then runs the
    // ghosts. The client plays subturns ~330 ms apart, so a ghost's steps land
    // spread across the turn instead of all at once.
    const subturns: number[][][] = [];
    for (let s = 0; s < SUBTURNS; s++) {
      const events = s === 0 ? this.queued : [];
      if (s === 0) this.queued = [];
      if (this.running && !this.stageOver) this.simulate(events, s === 0);
      subturns.push(events);
    }
    for (const events of subturns) for (const e of events) this.apply(e);
    const turnInts = encodeTurn(turn, checksum, subturns);
    for (const h of this.active()) {
      if (!h.loaded) continue;
      if (h.resync) {
        h.resync = false;
        h.player.send(
          MSG.GAME_FULL_STATUS,
          [{ int: objectsBefore.length }, ...ints(objectInts), ...ints(turnInts)],
          `GameFullStatusUpdate turn ${turn} (${objectsBefore.length} objects)`,
        );
      } else {
        h.player.send(MSG.GAME_STATUS_UPDATE, ints(turnInts), undefined);
      }
    }
  }

  // ---------------------------------------------------------------- ghosts

  /** Chebyshev distance in tiles, or Infinity across floors. */
  private distance(a: number, b: number): number {
    const room = this.stage?.roomName;
    const p = tileCoords(room, a);
    const q = tileCoords(room, b);
    if (!p || !q || Math.abs(p[2] - q[2]) > 32) return Infinity;
    return Math.max(Math.abs(p[0] - q[0]), Math.abs(p[1] - q[1])) / 16;
  }

  /** Squared straight-line distance in world units — breaks the ties `distance` leaves. */
  private far(a: number, b: number): number {
    const room = this.stage?.roomName;
    const p = tileCoords(room, a);
    const q = tileCoords(room, b);
    if (!p || !q) return Infinity;
    return (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (4 * (p[2] - q[2])) ** 2;
  }

  private possessed(h: Human): boolean {
    return h.possessedUntil > 0;
  }

  private spawnGhost(events: number[][], team: 1 | 2, near?: Coffin): void {
    const taken = new Set([...this.ghosts.values()].map((g) => g.tile));
    for (const h of this.active()) taken.add(h.tile);
    let tile: number | undefined;
    if (near) {
      // Out of the coffin: a free tile beside it.
      const around = [...near.tiles].flatMap((t) => this.neighbours.get(t) ?? []);
      tile = this.shuffled(around).find((t) => this.open.has(t) && !taken.has(t));
    }
    // Anywhere open, but not on top of a player.
    tile ??= this.shuffled(this.open).find(
      (t) => !taken.has(t) && this.active().every((h) => this.distance(t, h.tile) > 3),
    );
    if (tile === undefined) return;
    const ref = this.nextRef++;
    this.ghosts.set(ref, { ref, team, tile, mood: 0, wait: STEP_IDLE, heading: null, previous: null, super: false });
    events.push([EV.CREATE_GHOST, ref, team, tile, STEP_IDLE, near?.ref ?? 0]);
  }

  /** A blue ghost: anywhere open, away from the players (`CreateSuperGhost`). */
  private spawnSuperGhost(events: number[][]): void {
    const taken = new Set([...this.ghosts.values()].map((g) => g.tile));
    const tile = this.shuffled(this.open).find(
      (t) => !taken.has(t) && this.active().every((h) => this.distance(t, h.tile) > 5),
    );
    if (tile === undefined) return;
    const ref = this.nextRef++;
    this.ghosts.set(ref, { ref, team: SUPER_GHOST_TEAM, tile, mood: 1, wait: STEP_SUPER, heading: null, previous: null, super: true });
    events.push([EV.CREATE_SUPERGHOST, ref, SUPER_GHOST_TEAM, tile, STEP_SUPER, 0]);
    this.log(`blue ghost ${ref} at ${tile}`);
  }

  /**
   * Is `tile` in `h`'s vacuum cone: your own tile, or within
   * VACUUM_REACH_TILES and ±45° of your facing (a 112 px, ±45° cone).
   */
  private inCone(h: Human, tile: number): boolean {
    if (tile === h.tile) return true;
    const room = this.stage?.roomName;
    const p = tileCoords(room, h.tile);
    const q = tileCoords(room, tile);
    const want = WALK_VECTORS[h.facing];
    if (!p || !q || !want || Math.abs(p[2] - q[2]) > 32) return false;
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    if (Math.max(Math.abs(dx), Math.abs(dy)) / 16 > VACUUM_REACH_TILES) return false;
    const cos = (dx * want[0] + dy * want[1]) / (Math.hypot(dx, dy) * Math.hypot(want[0], want[1]));
    return cos >= Math.cos(VACUUM_HALF_ANGLE) - 1e-9;
  }

  /** The cone as tiles, for the diagnostic log. */
  private cone(h: Human): number[] {
    return [...this.open].filter((t) => this.inCone(h, t));
  }

  /** One subturn of the world. Events are appended to `events`. */
  private simulate(events: number[][], firstOfTurn: boolean): void {
    if (!this.stage) return;
    const room = this.stage.roomName;
    const now = Date.now();
    const players = this.active().filter((h) => h.loaded && h.objRef);
    const hunting = this.phase === "hunt";
    const racing = this.phase === "doorRace" || this.phase === "suddenDeath";

    // Idle players: faded and warned (event 15 opens `hmg.dialog.kick`), then sent home.
    if (firstOfTurn && IDLE_WARN_MS > 0) {
      for (const h of players) {
        if (h.exited || h.out) continue;
        if (!h.idleWarnedAt && now - h.lastInput > IDLE_WARN_MS) {
          h.idleWarnedAt = now;
          events.push([EV.IDLE_WARNING, h.objRef, IDLE_KICK_MS / 1000], [EV.TOGGLE_VISIBLE, h.objRef, 1]);
          this.log(`${h.player.name} idle — warned`);
        } else if (h.idleWarnedAt && now - h.idleWarnedAt > IDLE_KICK_MS) {
          this.log(`${h.player.name} idle — kicked`);
          this.leaveHuman(h, "idle");
          h.player.toLobby();
          // Disney's own wording (`hm.kicked.from.game`).
          h.player.alert("You were booted from the game. Try joining or creating another one.");
        }
      }
    }

    // Possessions wear off.
    for (const h of players) {
      if (h.possessedUntil && now >= h.possessedUntil) {
        h.possessedUntil = 0;
        events.push([EV.GHOST_TO_PLAYER, h.objRef]);
      }
    }

    // Vacuums.
    for (const h of players) {
      if (!hunting || !h.vacuum || this.possessed(h) || h.delayedUntil > now) continue;
      for (const g of [...this.ghosts.values()]) {
        if (g.super || g.team !== h.team || !this.inCone(h, g.tile)) continue;
        this.ghosts.delete(g.ref);
        h.ghosts++;
        events.push([EV.GHOST_CAUGHT, g.ref, h.objRef]);
        this.log(`${h.player.name} caught ghost ${g.ref} (team ${g.team}) at ${g.tile}`);
      }
      for (const o of players) {
        if (o.team === h.team || !this.possessed(o) || !this.inCone(h, o.tile)) continue;
        o.possessedUntil = 0;
        h.ghosts += GHOSTLY_CATCH_SCORE;
        events.push([EV.CATCH_GHOSTLY_PLAYER, h.objRef, o.objRef, GHOSTLY_CATCH_SCORE]);
        this.log(`${h.player.name} vacuumed up possessed ${o.player.name} (+${GHOSTLY_CATCH_SCORE})`);
      }
      // Next to a coffin: rattle it. "Stand next to the coffin and press the
      // CTRL or SHIFT key" (hm.instructions.text.page.6) — no facing required;
      // "next to" is ~62 px.
      const coffin = this.coffins.find((c) => [...c.tiles].some((t) => this.distance(h.tile, t) <= COFFIN_REACH_TILES));
      if (coffin && now >= coffin.readyAt) {
        coffin.readyAt = now + COFFIN_COOLDOWN_MS;
        coffin.spawnAt = now + COFFIN_SPAWN_MS;
        h.rattleUntil = now + COFFIN_SPAWN_MS;
        events.push([EV.COFFIN_RATTLES, coffin.ref, 1]);
        this.pulse(h);
        this.log(`${h.player.name} rattled coffin ${coffin.ref} (tile ${coffin.anchor})`);
      }
    }

    // Coffins give up their ghosts.
    for (const c of this.coffins) {
      if (c.spawnAt && now >= c.spawnAt) {
        c.spawnAt = 0;
        const before = this.ghosts.size;
        this.spawnGhost(events, Math.random() < 0.5 ? 1 : 2, c);
        this.log(`coffin ${c.ref} ${this.ghosts.size > before ? "released a ghost" : "had no free tile to release into"}`);
      }
    }

    // Ghosts move: same colour flees you, the other colour comes for you; a
    // blue ghost comes for anyone still racing.
    for (const g of this.ghosts.values()) {
      if (--g.wait > 0) continue;
      let chase: Human | null = null;
      let flee: Human | null = null;
      let chaseD = g.super ? Infinity : SENSE_TILES + 1;
      let fleeD = SENSE_TILES + 1;
      for (const h of players) {
        if (this.possessed(h) || h.exited || h.out) continue;
        const d = this.distance(g.tile, h.tile);
        if (g.super) {
          if (d < chaseD) [chase, chaseD] = [h, d];
          continue;
        }
        if (h.team === g.team && d < fleeD) [flee, fleeD] = [h, d];
        if (h.team !== g.team && d < chaseD) [chase, chaseD] = [h, d];
      }
      // ⚠ No stepping straight back: with blocky distances, ties are everywhere,
      // and a ghost that may reverse flips between two tiles ("jumps back and
      // forth") whenever the player shuffles or a wall is in the way.
      const all = (this.neighbours.get(g.tile) ?? []).filter((t) => this.open.has(t));
      const steps = all.length > 1 ? all.filter((t) => t !== g.previous) : all;
      let next: number | undefined;
      if (flee && fleeD <= chaseD) {
        g.mood = 2;
        const from = flee.tile;
        next = steps.reduce<number | undefined>((best, t) => (best === undefined || this.far(t, from) > this.far(best, from) ? t : best), undefined);
      } else if (chase) {
        g.mood = 1;
        const to = chase.tile;
        next = steps.reduce<number | undefined>((best, t) => (best === undefined || this.far(t, to) < this.far(best, to) ? t : best), undefined);
      } else {
        g.mood = 0;
        const ahead = g.heading === null ? null : tileToward(room, g.tile, g.heading);
        next = ahead !== null && steps.includes(ahead) && Math.random() > 0.08 ? ahead : this.shuffled(steps)[0];
      }
      g.wait = g.super ? STEP_SUPER : g.mood === 0 ? STEP_IDLE : STEP_HURRY;
      if (next === undefined || next === g.tile) continue;
      const dir = directionBetween(room, g.tile, next) ?? 0;
      g.heading = dir;
      g.previous = g.tile;
      g.tile = next;
      const [x, y, z] = tileCoords(room, next) ?? [0, 0, 0];
      events.push([EV.MOVE_GHOST, g.ref, x, y, z, dir, g.mood]);
    }

    // Touching a ghost of the other colour: you become it.
    for (const g of [...this.ghosts.values()]) {
      if (g.super || !hunting) continue;
      const victim = players.find((h) => h.team !== g.team && !this.possessed(h) && this.distance(g.tile, h.tile) <= 1);
      if (!victim) continue;
      this.ghosts.delete(g.ref);
      victim.possessedUntil = now + POSSESSION_MS;
      victim.vacuum = false;
      events.push([EV.PLAYER_TO_GHOST, victim.objRef], [EV.REMOVE_GHOST, g.ref]);
      this.log(`${victim.player.name} possessed by ghost ${g.ref} (team ${g.team})`);
    }

    // The door race: blue ghosts, and the doors themselves.
    if (racing) {
      if (now >= this.nextSuperAt) {
        this.nextSuperAt = now + SUPER_GHOST_EVERY_MS;
        this.spawnSuperGhost(events);
      }
      for (const g of this.ghosts.values()) {
        if (!g.super) continue;
        const victim = players.find((h) => !h.exited && !h.out && this.distance(g.tile, h.tile) <= 1);
        if (!victim) continue;
        victim.out = true;
        victim.walkDir = null;
        // Out for the rest of this race, still visible. The client's catch sets
        // statebit 2 — the SAME bit as leaving the game — and a
        // `caughtBySuperGhost` flag, plays the catch sound and the race-over
        // music, and changes nothing on screen (`SuperGhostCatchPlayer`).
        // Freezing the player instead ("delayed", reason superGhost) is a
        // reimplementation's choice, not evidence.
        events.push([EV.SUPERGHOST_CATCH, victim.objRef]);
        this.log(`${victim.player.name} caught by blue ghost ${g.ref}`);
      }
      this.checkDoors(events, now);
    }

    // Top the floor back up.
    if (this.phase === "hunt" && firstOfTurn && now >= this.nextRespawnAt) {
      this.nextRespawnAt = now + RESPAWN_MS;
      for (const team of [1, 2] as const) {
        const count = [...this.ghosts.values()].filter((g) => g.team === team).length;
        if (count < GHOSTS_PER_TEAM) this.spawnGhost(events, team);
      }
    }
  }

  /** Mirror what the client does to its objects for one event (`CHMMGHandler` + the factors). */
  private apply(e: number[]): void {
    const [id, a, b, c, d, f, g] = e;
    const player = (ref: number) => {
      const o = this.objects.get(ref);
      return o?.code === OBJ.PLAYER ? o : undefined;
    };
    const setBit = (o: GObj | undefined, bit: number, on: boolean) => {
      if (!o) return;
      o.params[1] = on ? o.params[1] | bit : o.params[1] & ~bit;
    };
    const award = (o: GObj | undefined, amount: number) => {
      if (!o) return;
      o.params[0] += amount;
      o.score = Math.max(0, (o.score ?? 0) + amount);
      this.updateTeamScores();
    };
    switch (id) {
      case EV.CREATE_GHOST:
      case EV.CREATE_SUPERGHOST: {
        const [x, y, z] = (this.stage && tileCoords(this.stage.roomName, c)) ?? [0, 0, 0];
        this.add({
          code: id === EV.CREATE_GHOST ? OBJ.GHOST : OBJ.SUPERGHOST, ref: a, owner: -1, team: b,
          x, y, z, dir: 0, params: [d], moveDelay: d,
        });
        break;
      }
      case EV.MOVE_GHOST: {
        const o = this.objects.get(a);
        if (!o) break;
        o.x = b;
        o.y = c;
        o.z = d;
        o.params = o.code === OBJ.GHOST ? [g === 1 || g === 2 ? 2 : 3, g] : [o.moveDelay ?? 0];
        void f; // direction: the visual only — `Direction` is not updated
        break;
      }
      case EV.GHOST_CAUGHT:
        this.objects.delete(a);
        award(player(b), 1);
        break;
      case EV.REMOVE_GHOST:
        this.objects.delete(a);
        break;
      case EV.PLAYER_TO_GHOST:
        setBit(player(a), BIT.POSSESSED, true);
        break;
      case EV.GHOST_TO_PLAYER:
        setBit(player(a), BIT.POSSESSED, false);
        break;
      case EV.SUPERGHOST_CATCH:
      case EV.PLAYER_LEFT:
        setBit(player(a), BIT.OUT, true);
        break;
      case EV.CATCH_GHOSTLY_PLAYER:
        award(player(a), c);
        setBit(player(b), BIT.POSSESSED, false);
        break;
      case EV.TOGGLE_VISIBLE:
        setBit(player(a), BIT.INVISIBLE, b === 1);
        break;
    }
  }

  /** `CHMFactorScoreBoard.UpdateTeamScores`: team sums of each player's `Score`. */
  private updateTeamScores(): void {
    const board = this.objects.get(this.scoreboardRef);
    if (!board) return;
    let t1 = 0;
    let t2 = 0;
    for (const o of this.objects.values()) {
      if (o.code !== OBJ.PLAYER) continue;
      if (o.team === 1) t1 += o.score ?? 0;
      else if (o.team === 2) t2 += o.score ?? 0;
    }
    board.params = [t1, t2, board.params[2], board.params[3]];
  }

  // ---------------------------------------------------------------- walking

  private pulse(h: Human): void {
    const walking = h.walking;
    const params: OutgoingParam[] = [
      { int: 1 },
      { int: h.ref },
      { int: h.tile },
      { int: 0 },
      ...ints(
        avatarActions({
          headDir: h.facing,
          bodyDir: h.facing,
          legs: walking ? LEGS_WALK : LEGS_STAND,
          leftHand: walking ? HAND_WALK : HAND_STAND,
          // `CAvatarClassHauntedMansion.Action` reads only the RIGHT hand.
          rightHand:
            h.vacuum && !this.possessed(h)
              ? HAND_CATCH
              : h.rattleUntil > Date.now()
                ? HAND_RATTLE
                : walking
                  ? HAND_WALK
                  : HAND_STAND,
        }),
      ),
    ];
    for (const o of this.active()) if (o.loaded) o.player.send(MSG.STATUS_PULSE, params, undefined);
  }

  /**
   * The neighbour that best matches walking direction `dir`, within ~45°.
   *
   * ⚠ Not an exact-direction match: stairs join floors through `<LINKS>` whose
   * steps are off the grid — `(19, 5)`, `(-28, -17)` in the stretching room —
   * so an exact match left players stuck at the top and bottom of every flight.
   */
  private stepToward(from: number, dir: number): number | null {
    const room = this.stage?.roomName;
    const here = tileCoords(room, from);
    if (!here) return null;
    const want = WALK_VECTORS[dir];
    if (!want) return null;
    let best: number | null = null;
    let bestScore = 0.7;
    for (const n of this.neighbours.get(from) ?? []) {
      if (this.solid.has(n)) continue;
      const there = tileCoords(room, n);
      if (!there) continue;
      const dx = there[0] - here[0];
      const dy = there[1] - here[1];
      const length = Math.hypot(dx, dy);
      if (length === 0) continue;
      const score = (dx * want[0] + dy * want[1]) / (length * Math.hypot(want[0], want[1])); // cosine
      if (score > bestScore) {
        bestScore = score;
        best = n;
      }
    }
    return best;
  }

  private walk(): void {
    if (!this.stage || this.stageOver) return;
    for (const h of this.active()) {
      if (!h.loaded) continue;
      // Through the door, caught by a blue ghost, or waiting out the head start.
      const frozen = h.exited || h.out || h.delayedUntil > Date.now();
      if (h.walkDir === null || !this.running || frozen) {
        if (h.walking) {
          h.walking = false;
          this.pulse(h);
        }
        continue;
      }
      const next = this.stepToward(h.tile, h.walkDir);
      if (next === null) {
        if (h.walking) {
          h.walking = false;
          this.pulse(h);
        }
        continue;
      }
      h.tile = next;
      h.walking = true;
      const partner = this.loops.get(next);
      if (partner !== undefined && h.arrivedOn !== next) {
        h.tile = partner;
        h.arrivedOn = partner;
      } else if (h.arrivedOn !== next) {
        h.arrivedOn = null;
      }
      this.pulse(h);
    }
  }

  // ---------------------------------------------------------------- input

  action(userId: number, count: number, action: number, data: number[]): void {
    const h = this.humans.get(userId);
    if (!h || h.phase !== "ready") return;
    if (action === ACT.FACE && count === 1) {
      // The engine's checksum report (`_MinigameTestChecksum`), not a turn.
      // Between stages there are no turns left to repair.
      if (this.stageOver) return;
      if (Date.now() - h.lastResync > RESYNC_GAP_MS) {
        h.lastResync = Date.now();
        h.resync = true;
        this.log(`checksum mismatch from ${h.player.name} — resync`);
      }
      return;
    }
    // Any input: not idle. A pending idle warning is withdrawn — ToggleVisible 0
    // also clears the client's kick dialog (`CHMMGHandler.ToggleVisible`).
    h.lastInput = Date.now();
    if (h.idleWarnedAt) {
      h.idleWarnedAt = 0;
      if (h.objRef && !h.exited) this.event(EV.TOGGLE_VISIBLE, h.objRef, 0);
    }
    switch (action) {
      case ACT.WALK:
        if (data[0] >= 0 && data[0] <= 7) {
          h.walkDir = data[0];
          h.facing = data[0];
        }
        return;
      case ACT.FACE:
        h.walkDir = null;
        if (data[0] >= 0 && data[0] <= 7) h.facing = data[0];
        h.walking = false;
        this.pulse(h);
        return;
      case ACT.STOP:
        h.walkDir = null;
        return;
      case ACT.VACUUM_ON: {
        if (this.possessed(h) || !this.running) return;
        h.vacuum = true;
        this.pulse(h);
        if (HM_DEBUG) {
          const near = [...this.ghosts.values()]
            .filter((g) => this.distance(g.tile, h.tile) <= 3)
            .map((g) => `${g.team === h.team ? "own" : "other"}@${g.tile}(${this.distance(g.tile, h.tile)})`);
          this.log(`${h.player.name} vacuum: tile ${h.tile} facing ${h.facing} cone [${this.cone(h).join(",")}] near [${near.join(" ")}]`);
        }
        return;
      }
      case ACT.VACUUM_OFF:
        if (!h.vacuum) return;
        h.vacuum = false;
        this.pulse(h);
        return;
      case ACT.QUIT:
        this.leaveHuman(h, "quit");
        h.player.toLobby();
        return;
    }
  }

  // ---------------------------------------------------------------- ending

  private teamGhosts(team: 1 | 2): number {
    const board = this.objects.get(this.scoreboardRef);
    return board ? board.params[team - 1] : 0;
  }

  private endStage(cancelled: boolean, forfeitWinner: 0 | 1 | 2 = 0): void {
    if (this.stageOver || !this.stage) return;
    this.stageOver = true;
    this.running = false;
    if (this.ticker) clearInterval(this.ticker);
    this.ticker = null;
    for (const h of this.active()) {
      h.walkDir = null;
      h.walking = false;
      h.vacuum = false;
    }
    this.ghosts.clear();
    this.phase = "over";
    if (cancelled) this.cancelled = true;
    const g1 = this.teamGhosts(1);
    const g2 = this.teamGhosts(2);
    const winner: 0 | 1 | 2 = cancelled ? forfeitWinner : this.roundWinner;
    if (cancelled) this.headStartTeam = 0;
    if (winner) this.wins[winner - 1]++;
    // Mirror `CHMMGHandler.OnEndStage` -> `TeamWins` on the scoreboard.
    const board = this.objects.get(this.scoreboardRef);
    if (board && winner) board.params[winner + 1]++;
    this.updateTeamScores();
    const decided = cancelled || this.wins[0] >= WINS_NEEDED || this.wins[1] >= WINS_NEEDED;
    const more = !decided && this.stageIndex + 1 < THEMES.length;
    const params = [winner, g1, g2, more ? 1 : 0, more ? this.doorRaceWinner : 0, cancelled ? 1 : 0];
    this.log(`stage ${this.stageIndex + 1} over: green ${g1}, purple ${g2} -> ${winner || "draw"}; wins ${this.wins.join("-")}${more ? "" : " (last)"}`);
    // ⚠ Two turns late: `OnEndStage` bumps the scoreboard's wins at once, while
    // the last 2601 may still be waiting in the client's turn buffer — its
    // checksum then fails against the already-changed board (seen: both
    // clients reported a mismatch at every stage end).
    const endParams: OutgoingParam[] = [{ int: this.stage.endTime }, { int: params.length }, ...ints(params)];
    this.later(TURN_MS * 2, () => this.sendAll(MSG.GAME_END_STAGE, endParams, `GameEndStage ${params.join(",")}`));
    if (more) {
      const next = this.stageIndex + 1;
      this.later(this.stage.endTime * 1000, () => this.loadStage(next));
    } else {
      this.later(GAME_OVER_MS, () => this.finish());
    }
  }

  /**
   * Pay everyone still playing, then back to the lobby. Quitters and the
   * disconnected are already `out` and get nothing ("If you quit playing, you
   * won't receive any rewards" — hmg.dialog.exit.text). A cancelled game (the
   * other team left) records no win.
   */
  private finish(): void {
    const winner: 0 | 1 | 2 = this.cancelled ? 0 : this.wins[0] > this.wins[1] ? 1 : this.wins[1] > this.wins[0] ? 2 : 0;
    for (const h of this.active()) {
      h.phase = "out";
      let credits = h.ghosts * CREDITS_PER_GHOST;
      const parts = [`You caught ${h.ghosts} ghost${h.ghosts === 1 ? "" : "s"}`];
      if (winner && h.team === winner) {
        const total = recordHmWin(h.ref);
        const bonus = WIN_MILESTONES.find(([every]) => total % every === 0)?.[1] ?? 0;
        credits += bonus;
        parts.push(bonus ? `and won your ${ordinal(total)} game (+${bonus} bonus)` : "and your team won");
        this.log(`${h.player.name}: win ${total}${bonus ? ` (+${bonus})` : ""}`);
      }
      this.log(`${h.player.name}: ${h.ghosts} ghost(s) -> ${credits} credits`);
      // ⚠ ASCII only: the staff message goes out Latin-1 unconverted, and an
      // em dash arrived as "?" ("your team won ? 65 credits").
      h.player.pay(credits, `Thanks for playing the Haunted Mansion Game! ${parts.join(" ")}. ${credits} credits awarded.`);
      h.player.toLobby();
    }
    this.end();
  }

  private leaveHuman(h: Human, why: string): void {
    if (h.phase === "out") return;
    h.phase = "out";
    this.log(`${h.player.name} left: ${why}`);
    if (h.objRef && this.objects.has(h.objRef) && this.running) this.event(EV.PLAYER_LEFT, h.objRef);
    if (this.stageIndex < 0 || this.finished) return;
    const left = (team: 1 | 2) => this.active().some((o) => o.team === team);
    if (this.active().length === 0) return this.end();
    // A team with nobody left: the other team wins ("NO WINNER, THE OTHER TEAM LEFT THE GAME" is the cancel text).
    if (!this.stageOver && (!left(1) || !left(2)) && this.hadBothTeams()) {
      this.endStage(true, left(1) ? 1 : 2);
    }
  }

  private hadBothTeams(): boolean {
    const teams = new Set([...this.humans.values()].map((h) => h.team));
    return teams.size === 2;
  }

  drop(userId: number): void {
    const h = this.humans.get(userId);
    if (h) this.leaveHuman(h, "disconnected or left the room");
  }

  private end(): void {
    if (this.finished) return;
    this.finished = true;
    if (this.ticker) clearInterval(this.ticker);
    if (this.walker) clearInterval(this.walker);
    for (const t of this.timers) clearTimeout(t);
    this.timers.clear();
    this.log("match over");
    this.onOver(this);
  }
}
