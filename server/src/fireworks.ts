/**
 * Castle Fireworks Remixed — the server half.
 *
 * The client plays each stage itself (`vmk_fireworks_minigame`): it launches
 * the shots it is given, lets the player explode them, and reports the hits.
 * The server owns everything else, which Sulake's `FireworksMiniGameStage`
 * did and which did not survive:
 *
 *   - the lobby (`fireworks_preshow`, room 1100): sign-ups and the countdown
 *     shown in `vmk_fw_signup.window`, driven by `2642` / `2641` (`miu` is the
 *     minimum player count) and answered by `649 set_ready_to_play`;
 *   - the match: `2613` switches every signed-up player's room in place into
 *     the game scene, `2614` names the participants, then per stage `2607`
 *     carries the launch schedule, `602` says it loaded, `2611` starts it,
 *     `601` action 3 reports hits and action 1 ends it, `2612` ranks it;
 *   - the score: the client's own score display is cosmetic. Points, the
 *     flawless multiplier and bonus combos follow the in-game instructions
 *     (`fwps.instructions.page.5..7`);
 *   - qualification on each level's last stage (`QUALIFIEDPERCENT`), the end
 *     (`2601` event 1), rewards and today's high scores (game code 1).
 *
 * THE SCHEDULE. Each stage XML (`vmk_fireworks_stages`) lists its launches as
 * `SHOOT TIME TYPECHANGE POS [COMBO]` and the stage's icons under `SELECTOR`.
 * The types were the server's to pick: the first launch takes a random icon,
 * `TYPECHANGE="1"` switches to a different one and `0` keeps the last. The
 * bonus combination is the types of the `COMBO` launches, in order.
 *
 * `2607` payload (`CFireworksMinigameHandler.OnLoadStage`), one `intArray`:
 *   [score, nBonus, bonus types..., nShots, (timeMs, shotId, type, x, y, z)...]
 *
 * `2612` payload (`CFireworksGameComponent.StageEnd`), 35 ints:
 *   [rank, qualified, lowestQualifyingScore, gameOver, score,
 *    15 x (avatarRef | -1, score)]
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./db.js";
import { iterateSeed, recordScore } from "./jungle-cruise.js";
import { MSG, type OutgoingParam } from "./vmk-protocol.js";

export const FW_GAME_CODE = 1;
export const FW_LOBBY_ROOM = 1100;
const FW_GAME_ROOM = 1101;
const GAME_REF = 1;
const GAME_NAME = "Castle Fireworks Remixed";

const MIN_PLAYERS = Math.max(1, Number(process.env.VMK_FW_MIN_PLAYERS ?? 1));
const COUNTDOWN_S = Math.max(5, Number(process.env.VMK_FW_COUNTDOWN ?? 15));
const SCENE_SETTLE_MS = 2000;
const LOAD_TIMEOUT_MS = 15_000;
const STAGE_GRACE_MS = 20_000;
const INFO_EVERY_MS = 5000;
const BOARD_SIZE = 15;

/** `fwps.instructions.page.5`: Oops, Ok, Good, Awesome, Flawless (hitType 1..5). */
const HIT_POINTS = [0, 0, 2, 4, 6, 8];
const FLAWLESS = 5;
const MULTIPLIER_STEP = 0.5;
const MULTIPLIER_MAX = 3;

/** The wiki ("Castle Fireworks Remixed": Awards). */
const BRONZE_PIN = 2239;
const SILVER_PIN = 2240;
const GOLD_PIN = 2241;
const BRONZE_SCORE = 3900;
const SILVER_SCORE = 4400;
const GOLD_EVERY_WINS = 10;

// ---------------------------------------------------------------- stages

interface Launch {
  timeMs: number;
  typeChange: boolean;
  combo: boolean;
  x: number;
  y: number;
  z: number;
}

interface StageDef {
  name: string;
  icons: number[];
  launches: Launch[];
  comboReward: number;
  qualifiedPercent: number;
  startTimeS: number;
  levelChangePauseS: number;
}

const STAGES = new Map<string, StageDef>();

function attr(tag: string, name: string): string | undefined {
  return new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, "i").exec(tag)?.[1];
}

function parseStage(xml: string): StageDef | null {
  const root = /<FIREWORKS\b[^>]*>/i.exec(xml)?.[0];
  const name = root ? attr(root, "STAGE") : undefined;
  if (!root || !name) return null;
  const icons = [...xml.matchAll(/<ICON\b[^>]*>/gi)].map((m) => Number(attr(m[0], "TYPE"))).filter(Number.isInteger);
  const level = /<LEVEL\b[^>]*>/i.exec(xml)?.[0] ?? "";
  const look = /<LOOKNFEEL\b[^>]*>/i.exec(xml)?.[0] ?? "";
  const launches: Launch[] = [];
  for (const m of xml.matchAll(/<SHOOT\b[^>]*>/gi)) {
    const pos = /vector\(\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\)/i.exec(attr(m[0], "POS") ?? "");
    if (!pos) continue;
    launches.push({
      timeMs: Math.round(Number(attr(m[0], "TIME") ?? 0) * 1000),
      typeChange: attr(m[0], "TYPECHANGE") === "1",
      combo: (attr(m[0], "COMBO") ?? "").toLowerCase() === "true",
      x: Math.round(Number(pos[1])),
      y: Math.round(Number(pos[2])),
      z: Math.round(Number(pos[3])),
    });
  }
  if (icons.length === 0 || launches.length === 0) return null;
  launches.sort((a, b) => a.timeMs - b.timeMs);
  return {
    name,
    icons,
    launches,
    comboReward: Number(attr(level, "COMBOREWARD") ?? 0) || 0,
    qualifiedPercent: Number(attr(root, "QUALIFIEDPERCENT") ?? 100) || 100,
    startTimeS: Number(attr(root, "STARTTIME") ?? 5) || 5,
    levelChangePauseS: Number(attr(look, "LEVELCHANGEPAUSE") ?? 5) || 5,
  };
}

function loadStages(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const dir = join(here, "..", "..", "client", "assets", "casts", "vmk_fireworks_stages", "text");
  if (!existsSync(dir)) {
    console.warn(`[fireworks] no stage files at ${dir}`);
    return;
  }
  for (const file of readdirSync(dir)) {
    if (!/_stage\.fireworks\..*\.xml_stxt_0\.txt$/.test(file)) continue;
    const stage = parseStage(readFileSync(join(dir, file), "latin1"));
    if (stage) STAGES.set(stage.name, stage);
  }
}
loadStages();

/** Five levels of three stages, the base files (the `-1`/`-2` variants are spares). */
const COURSE: string[] = [];
for (let level = 1; level <= 5; level++) {
  for (let stage = 1; stage <= 3; stage++) {
    const name = `fireworks.level${level}-stage${stage}`;
    if (STAGES.has(name)) COURSE.push(name);
  }
}
console.log(`[fireworks] ${STAGES.size} stage files, course of ${COURSE.length}`);

interface Shot {
  id: number;
  type: number;
}

interface BuiltStage {
  def: StageDef;
  ints: number[];
  shots: Map<number, Shot>;
  combo: number[];
}

function buildStage(def: StageDef, firstId: number): BuiltStage {
  const shots = new Map<number, Shot>();
  const combo: number[] = [];
  const rows: number[] = [];
  let type = def.icons[Math.floor(Math.random() * def.icons.length)];
  def.launches.forEach((launch, i) => {
    if (i > 0 && launch.typeChange && def.icons.length > 1) {
      const others = def.icons.filter((t) => t !== type);
      type = others[Math.floor(Math.random() * others.length)];
    }
    const id = firstId + i;
    shots.set(id, { id, type });
    if (launch.combo) combo.push(type);
    rows.push(launch.timeMs, id, type, launch.x, launch.y, launch.z);
  });
  return { def, ints: [0, combo.length, ...combo, def.launches.length, ...rows], shots, combo };
}

// ---------------------------------------------------------------- rewards

db.exec(`
  CREATE TABLE IF NOT EXISTS fireworks_wins (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    wins    INTEGER NOT NULL DEFAULT 0
  );
`);

export interface FwReward {
  score: number;
  credits: number;
  pins: number[];
  won: boolean;
}

function settle(userId: number, score: number, won: boolean, ownsPin: (code: number) => boolean): FwReward {
  recordScore(userId, FW_GAME_CODE, score);
  const credits = Math.floor(score / 10);
  const pins: number[] = [];
  if (score > SILVER_SCORE && !ownsPin(SILVER_PIN)) pins.push(SILVER_PIN);
  if (score > BRONZE_SCORE && !ownsPin(BRONZE_PIN)) pins.push(BRONZE_PIN);
  if (won) {
    db.prepare(
      `INSERT INTO fireworks_wins (user_id, wins) VALUES (?, 1)
       ON CONFLICT(user_id) DO UPDATE SET wins = wins + 1`,
    ).run(userId);
    const row = db.prepare("SELECT wins FROM fireworks_wins WHERE user_id = ?").get(userId) as { wins: number } | undefined;
    if (row && row.wins % GOLD_EVERY_WINS === 0) pins.push(GOLD_PIN);
  }
  return { score, credits, pins, won };
}

// ---------------------------------------------------------------- players

type Send = (msg: number, params: OutgoingParam[], log?: string) => void;

export interface FwPlayer {
  userId: number;
  name: string;
  figure: () => number[];
  send: Send;
  label: string;
  /** Pay the reward (credits, pins) and tell the player. */
  pay: (reward: FwReward) => void;
  ownsPin: (code: number) => boolean;
  /** Put the player back into a freshly loaded lobby. */
  backToLobby: () => void;
}

interface Participant {
  player: FwPlayer;
  phase: "preparing" | "ready" | "playing" | "out";
  score: number;
  multiplier: number;
  comboAt: number;
  scored: Set<number>;
  loaded: boolean;
  stageDone: boolean;
  paid: boolean;
}

// ---------------------------------------------------------------- the lobby

const watchers = new Map<number, Send>();
const signups = new Map<number, FwPlayer>();
let countdownEnds = 0;
let countdownTimer: ReturnType<typeof setTimeout> | null = null;
let match: Match | null = null;

function timeLeft(): number {
  return countdownEnds ? Math.max(0, Math.ceil((countdownEnds - Date.now()) / 1000)) : 0;
}

function gameData(): OutgoingParam[] {
  const params: OutgoingParam[] = [
    { int: 1 },
    { int: GAME_REF },
    { str: GAME_NAME },
    { int: 0 },
    { int: timeLeft() },
    { int: signups.size },
  ];
  for (const userId of signups.keys()) params.push({ int: userId }, { int: 0 }, { int: 0 });
  params.push({ int: 1 }, { str: "miu" }, { str: String(MIN_PLAYERS) });
  return params;
}

function broadcastLobby(): void {
  const list: OutgoingParam[] = [{ int: 1 }, { int: GAME_REF }, { str: GAME_NAME }, { int: signups.size }, { int: timeLeft() }];
  for (const send of watchers.values()) send(MSG.LOBBY_GAME_LIST, list, undefined);
}

function cancelCountdown(): void {
  if (countdownTimer) clearTimeout(countdownTimer);
  countdownTimer = null;
  countdownEnds = 0;
}

function reviewCountdown(): void {
  if (signups.size >= MIN_PLAYERS && !countdownTimer && !match) {
    countdownEnds = Date.now() + COUNTDOWN_S * 1000;
    countdownTimer = setTimeout(startMatch, COUNTDOWN_S * 1000);
    console.log(`[fireworks] countdown started: ${COUNTDOWN_S}s, ${signups.size} signed up`);
  } else if (signups.size < MIN_PLAYERS && countdownTimer) {
    cancelCountdown();
    console.log("[fireworks] countdown cancelled: not enough players");
  }
  broadcastLobby();
}

/** A player is standing in the lobby: show them the game. */
export function fwLobbyEnter(userId: number, send: Send): void {
  watchers.set(userId, send);
  send(MSG.LOBBY_GAME_DATA, gameData(), `LobbyGameData fireworks: ${signups.size} signed up, ${timeLeft()}s`);
}

/** The player left the lobby room, or disconnected. */
export function fwLobbyLeave(userId: number): void {
  watchers.delete(userId);
  if (signups.delete(userId)) reviewCountdown();
  match?.drop(userId);
}

/** `649 set_ready_to_play`: PLAY (1) or LEAVE (0) on the sign-up window. */
export function fwSetReady(player: FwPlayer, ready: boolean): void {
  if (ready) {
    if (match?.has(player.userId)) return;
    signups.set(player.userId, player);
  } else {
    signups.delete(player.userId);
  }
  player.send(MSG.LOBBY_READY_TO_PLAY, [{ int: ready ? 1 : 0 }], `LobbyReadyToPlay ${ready ? 1 : 0}`);
  console.log(`[${player.label}] fireworks: ${ready ? "signed up" : "left the sign-up"} (${signups.size})`);
  reviewCountdown();
}

function startMatch(): void {
  cancelCountdown();
  if (match || signups.size === 0 || COURSE.length === 0) {
    broadcastLobby();
    return;
  }
  const players = [...signups.values()];
  signups.clear();
  match = new Match(players, () => {
    match = null;
    reviewCountdown();
  });
  broadcastLobby();
  match.prepare();
}

/** `580` during a match: the in-place switch has happened. True if it was ours. */
export function fwRoomStart(userId: number): boolean {
  return match?.roomStarted(userId) ?? false;
}

export function fwInMatch(userId: number): boolean {
  return match?.has(userId) ?? false;
}

export function fwStageLoaded(userId: number): void {
  match?.stageLoaded(userId);
}

/** `601 [count, action, data...]`. True when the player is done and should go back to the lobby. */
export function fwAction(userId: number, action: number, data: number[]): boolean {
  const done = match?.action(userId, action, data) ?? false;
  return done || action === 2;
}

// ---------------------------------------------------------------- the match

class Match {
  private readonly people = new Map<number, Participant>();
  private stageIndex = -1;
  private stage: BuiltStage | null = null;
  private nextShotId = 1;
  private timers = new Set<ReturnType<typeof setTimeout>>();
  private infoTimer: ReturnType<typeof setInterval> | null = null;
  private turn = 0;
  private finished = false;

  constructor(players: FwPlayer[], private readonly onOver: () => void) {
    for (const player of players) {
      this.people.set(player.userId, {
        player,
        phase: "preparing",
        score: 0,
        multiplier: 1,
        comboAt: 0,
        scored: new Set(),
        loaded: false,
        stageDone: false,
        paid: false,
      });
    }
  }

  has(userId: number): boolean {
    const p = this.people.get(userId);
    return p !== undefined && p.phase !== "out";
  }

  private later(ms: number, fn: () => void): void {
    const timer = setTimeout(() => {
      this.timers.delete(timer);
      fn();
    }, ms);
    this.timers.add(timer);
  }

  private active(): Participant[] {
    return [...this.people.values()].filter((p) => p.phase === "playing");
  }

  prepare(): void {
    console.log(`[fireworks] match starting with ${this.people.size} player(s)`);
    for (const p of this.people.values()) p.player.send(MSG.GAME_PREPARE_ROOM, [{ int: FW_GAME_ROOM }], "GamePrepareRoom fireworks");
    this.later(LOAD_TIMEOUT_MS, () => this.beginIfReady(true));
  }

  roomStarted(userId: number): boolean {
    const p = this.people.get(userId);
    if (!p || p.phase !== "preparing") return false;
    this.later(SCENE_SETTLE_MS, () => {
      if (p.phase !== "preparing") return;
      p.phase = "ready";
      this.beginIfReady(false);
    });
    return true;
  }

  private beginIfReady(timedOut: boolean): void {
    if (this.stageIndex >= 0 || this.finished) return;
    const waiting = [...this.people.values()].filter((p) => p.phase === "preparing");
    if (waiting.length && !timedOut) return;
    for (const p of waiting) {
      p.phase = "out";
      console.log(`[${p.player.label}] fireworks: never reached the game scene`);
    }
    const starters = [...this.people.values()].filter((p) => p.phase === "ready");
    if (starters.length === 0) return this.end();
    const list: OutgoingParam[] = [{ int: starters.length }];
    for (const p of starters) {
      const figure = p.player.figure();
      list.push({ int: p.player.userId }, { str: p.player.name }, { int: figure.length }, ...figure.map((v) => ({ int: v })));
    }
    for (const p of starters) {
      p.phase = "playing";
      p.player.send(MSG.GAME_PARTICIPANT_LIST, list, `GameParticipantList ${starters.length}`);
    }
    this.loadStage(0);
  }

  private loadStage(index: number): void {
    this.stageIndex = index;
    const def = STAGES.get(COURSE[index])!;
    this.stage = buildStage(def, this.nextShotId);
    this.nextShotId += def.launches.length;
    const ints = this.stage.ints;
    for (const p of this.active()) {
      p.loaded = false;
      p.stageDone = false;
      p.multiplier = 1;
      p.comboAt = 0;
      p.player.send(
        MSG.GAME_LOAD_STAGE,
        [{ str: def.name }, { int: 0 }, { int: 1 }, { str: "intArray" }, { str: String(ints.length) }, ...ints.map((v) => ({ int: v }))],
        `GameLoadStage ${def.name} (${index + 1}/${COURSE.length}, ${def.launches.length} shots, combo ${this.stage.combo.join("-")})`,
      );
    }
    const stageAt = index;
    this.later(LOAD_TIMEOUT_MS, () => {
      if (this.stageIndex === stageAt) this.startStage();
    });
  }

  stageLoaded(userId: number): void {
    const p = this.people.get(userId);
    if (!p || p.phase !== "playing") return;
    p.loaded = true;
    if (this.active().every((q) => q.loaded)) this.startStage();
  }

  private stageStarted = -1;

  private startStage(): void {
    if (!this.stage || this.stageStarted === this.stageIndex) return;
    this.stageStarted = this.stageIndex;
    for (const p of this.active()) p.player.send(MSG.GAME_START_STAGE, [{ int: 0 }], `GameStartStage ${this.stage.def.name}`);
    const def = this.stage.def;
    const lastShot = def.launches[def.launches.length - 1].timeMs;
    const stageAt = this.stageIndex;
    this.later(def.startTimeS * 1000 + lastShot + STAGE_GRACE_MS, () => {
      if (this.stageIndex === stageAt) this.endStage();
    });
    if (this.infoTimer) clearInterval(this.infoTimer);
    this.infoTimer = setInterval(() => this.sendInfo(), INFO_EVERY_MS);
  }

  private ranking(): Participant[] {
    return [...this.people.values()]
      .filter((p) => p.phase === "playing")
      .sort((a, b) => b.score - a.score);
  }

  private sendInfo(): void {
    const top = this.ranking().slice(0, 3);
    const params: OutgoingParam[] = [{ int: top.length }];
    top.forEach((p, i) => params.push({ int: p.player.userId }, { int: i + 1 }, { int: p.score }));
    for (const p of this.active()) p.player.send(MSG.GAME_INFO_UPDATE, params, undefined);
  }

  action(userId: number, action: number, data: number[]): boolean {
    const p = this.people.get(userId);
    if (!p) return false;
    if (action === 2) {
      this.leave(p);
      return true;
    }
    if (p.phase !== "playing" || !this.stage) return false;
    if (action === 3 && data.length > 0) this.score(p, data);
    else if (action === 1) {
      p.stageDone = true;
      if (this.active().every((q) => q.stageDone)) this.endStage();
    }
    return false;
  }

  private score(p: Participant, data: number[]): void {
    const stage = this.stage!;
    const hits = data[0] ?? 0;
    let gained = 0;
    for (let i = 0; i < hits; i++) {
      const [hitType, selectedType, shotId] = data.slice(1 + i * 3, 4 + i * 3);
      const shot = stage.shots.get(shotId);
      if (!shot || p.scored.has(shotId)) continue;
      p.scored.add(shotId);
      const correct = selectedType === shot.type;
      const kind = Math.max(1, Math.min(5, hitType | 0));
      if (correct) {
        gained += kind === FLAWLESS ? Math.round(HIT_POINTS[FLAWLESS] * p.multiplier) : HIT_POINTS[kind];
        if (stage.combo.length > 0) {
          if (p.comboAt >= stage.combo.length) p.comboAt = 0;
          if (stage.combo[p.comboAt] === shot.type) p.comboAt++;
          else p.comboAt = stage.combo[0] === shot.type ? 1 : 0;
          if (p.comboAt === stage.combo.length) gained += stage.def.comboReward;
        }
      } else {
        p.comboAt = 0;
      }
      p.multiplier = kind === FLAWLESS ? Math.min(MULTIPLIER_MAX, p.multiplier + MULTIPLIER_STEP) : 1;
    }
    p.score += gained;
  }

  private endStage(): void {
    if (!this.stage || this.finished) return;
    const def = this.stage.def;
    this.stage = null;
    if (this.infoTimer) clearInterval(this.infoTimer);
    this.infoTimer = null;
    const ranked = this.ranking();
    if (ranked.length === 0) return this.end();
    const last = this.stageIndex >= COURSE.length - 1;
    const cut = def.qualifiedPercent < 100 && !last;
    const keep = cut ? Math.max(1, Math.ceil((ranked.length * def.qualifiedPercent) / 100)) : ranked.length;
    const lowest = ranked[keep - 1].score;
    const board: number[] = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      const p = ranked[i];
      board.push(p ? p.player.userId : -1, p ? p.score : 0);
    }
    const pause = def.levelChangePauseS;
    ranked.forEach((p, i) => {
      const qualified = i < keep;
      const over = last || !qualified;
      p.player.send(
        MSG.GAME_END_STAGE,
        [{ int: pause }, { int: 35 }, ...[i + 1, qualified ? 1 : 0, lowest, last ? 1 : 0, p.score, ...board].map((v) => ({ int: v }))],
        `GameEndStage ${def.name}: rank ${i + 1}/${ranked.length}, ${p.score}${over ? (last ? " (final)" : " (dropped)") : ""}`,
      );
      if (over) this.finishPlayer(p, last && i === 0, pause);
    });
    if (last || this.active().length === 0) {
      this.later(pause * 1000 + 2000, () => this.end());
      return;
    }
    this.later(pause * 1000, () => this.loadStage(this.stageIndex + 1));
  }

  private finishPlayer(p: Participant, won: boolean, pauseS: number): void {
    if (p.paid) return;
    p.paid = true;
    p.phase = "out";
    p.player.pay(settle(p.player.userId, p.score, won, p.player.ownsPin));
    this.later(pauseS * 1000, () => this.sendEndGame(p));
  }

  private sendEndGame(p: Participant): void {
    let checksum: number | null = null;
    do {
      this.turn = this.turn >= 8191 ? 1 : this.turn + 1;
      checksum = iterateSeed(this.turn);
    } while (checksum === null);
    p.player.send(
      MSG.GAME_STATUS_UPDATE,
      [{ int: this.turn }, { int: checksum }, { int: 1 }, { int: 1 }, { int: 1 }, { int: 1 }],
      "GameStatusUpdate fireworks EndGame",
    );
  }

  private leave(p: Participant): void {
    if (p.phase === "playing" && !p.paid) {
      p.paid = true;
      p.player.pay(settle(p.player.userId, p.score, false, p.player.ownsPin));
    }
    p.phase = "out";
    this.people.delete(p.player.userId);
    if (this.people.size === 0) this.end();
    else if (this.stage && this.active().length > 0 && this.active().every((q) => q.stageDone)) this.endStage();
  }

  drop(userId: number): void {
    const p = this.people.get(userId);
    if (p) this.leave(p);
  }

  private end(): void {
    if (this.finished) return;
    this.finished = true;
    for (const t of this.timers) clearTimeout(t);
    this.timers.clear();
    if (this.infoTimer) clearInterval(this.infoTimer);
    this.infoTimer = null;
    console.log("[fireworks] match over");
    this.onOver();
  }
}
