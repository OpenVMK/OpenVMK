/**
 * Jungle Cruise Photo Safari — the server half.
 *
 * The client runs the whole river: steering, the boat's physics, rocks, banks,
 * the camera and the photo album (`vmk_junglecruise_minigame`). What it cannot
 * do on its own is decide WHEN things happen, so the server:
 *
 *   - picks the stage (`2607 LoadStage`) and starts it once the client says it
 *     has loaded (`602`; on `dock.stage1` that is when the boat reaches you);
 *   - pumps turns (`2601`) every 1.65 s — the engine's `m_fTurnPulse` — whose
 *     events spawn animals and powerups and set the gas gauge;
 *   - scores photos (`601` action 1) and pays for gas pickups (action 2);
 *   - ends the game when the gas runs out or the third cruise is done.
 *
 * THE COURSE. Each stage XML (`vmk_junglecruise_stages`) is one river section
 * with a `SCRIPT` timeline — `DELAY` / `RANDOMDELAY` / `ANIMAL TYPE` — of which
 * critter shows up when. The instructions say "complete the maximum of 3
 * cruises"; a cruise runs the six themes in their music order (dock, cambodian,
 * tiki, indy, tent, safari), and cruise N uses each theme's `stageN`, which is
 * why the stages get denser 1 -> 3 and why only `dock.stage1` is the tutorial.
 *
 * EVENTS (`CJungleCruiseHandlerExtension.OnEvent`):
 *   1 [ref, animalSetId]   an animal appears (the client picks the spot)
 *   2 [ref, 1 fuel|2 film] a powerup appears
 *   3 [1 fuel|2 film]      you picked one up (the client adds its own amount)
 *   4 [frameId, score]     a photo's score
 *   5 [fuel]               the gas gauge
 *   6                      game over (the boat heads back to the dock)
 *   7 [fuel, film]         round-trip bonus, between cruises
 *
 * ACTIONS (`601 [count, action, data...]`):
 *   1 photo [frameId, nHits, (ref, 1, accuracy, time%)*]   2 pickup [ref]
 *   3 stage over (also the checksum-mismatch report — see `iterateSeed`)
 *   4 throttle [3] / brake [1]   5 bumped something   6 album   8 quit
 *
 * The numbers Sulake's Java server owned (gas burn, bump cost, bonus) are not
 * in any cast; they are ours and marked as such. Point values and the photo
 * formula ARE the client's (`CJungleCruiseComponent`), so the server's score
 * matches what the player sees flash up.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ITEM_CATEGORY, addCredits, addItems, db } from "./db.js";
import { MSG, type OutgoingParam } from "./vmk-protocol.js";

/** `m_fTurnPulse`. */
const TURN_MS = 1650;
/** Subturns per turn — how finely the script's delays land. */
const SUBTURNS = 5;
/** `junglecruise.powerUp.fuel.startAmount` in the cast's variable index. */
const START_FUEL = 140;
/** `junglecruise.powerUp.fuel.pickup` — the client adds the same on event 3. */
const FUEL_PICKUP = 20;
/** Ours: gas per turn, and extra for a turn spent on the throttle. */
const FUEL_PER_TURN = 1;
const FUEL_THROTTLE = 1;
/** Ours: "If your boat hits something ... you'll lose valuable Gas." */
const FUEL_BUMP = 10;
const BUMP_COOLDOWN_MS = 1000;
/** Ours: event 7, between cruises. */
const ROUND_TRIP_FUEL = 40;
const ROUND_TRIP_FILM = 10;
/** Ours: a powerup of each kind at the start of a stage, then every this often. */
const POWERUP_EVERY_MS = 15_000;
/** Time a photo may arrive after its animal's spot TIME ran out (turn buffering, latency). */
const PHOTO_GRACE_MS = 4000;
const CRUISES = 3;
const THEMES = ["dock", "cambodian", "tiki", "indy", "tent", "safari"] as const;
/** High score game code (`DisplayHighscore(2, ...)`). */
export const JC_GAME_CODE = 2;

/** `m_ar_animalscores`, indexed by animal set ID (1-based). */
const ANIMAL_POINTS = [
  0, 100, 100, 500, 500, 250, 250, 300, 300, 300, 300, 300, 300, 300, 350, 350, 200, 200, 500, 500, 150, 150, 100,
  100, 300, 300, 200, 200, 200, 200, 400, 400, 150, 150, 450, 450, 200, 200, 300, 300, 450, 450, 350, 350, 400, 400,
  300, 100, 100, 100, 500, 500, 500, 250, 250, 250, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 350,
  350, 350, 200, 200, 200, 500, 500, 500, 150, 150, 150, 100, 100, 100, 300, 300, 300, 200, 200, 200, 200, 200, 200,
  400, 400, 400, 150, 150, 150, 450, 450, 450, 200, 200, 200, 300, 300, 300, 450, 450, 450, 350, 350, 350, 400, 400,
  400,
];

// ---------------------------------------------------------------- stages

type ScriptStep = { kind: "delay" | "randomdelay"; seconds: number } | { kind: "animal"; set: string };

export interface Stage {
  name: string;
  /** Set name -> {id, lifetime in ms (the longest spot TIME)}. */
  sets: Map<string, { id: number; lifeMs: number }>;
  lifeById: Map<number, number>;
  script: ScriptStep[];
  fuelSpots: number;
  filmSpots: number;
}

const STAGES = new Map<string, Stage>();

function attr(tag: string, name: string): string | undefined {
  return new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1];
}

function parseStage(xml: string): Stage | null {
  const root = /<JUNGLECRUISE\b[^>]*>/.exec(xml);
  const name = root ? attr(root[0], "STAGE") : undefined;
  if (!name) return null;
  const sets = new Map<string, { id: number; lifeMs: number }>();
  const lifeById = new Map<number, number>();
  for (const m of xml.matchAll(/<ANIMALS\b([^>]*)>([\s\S]*?)<\/ANIMALS>/g)) {
    const id = Number(attr(m[1], "ID"));
    const set = attr(m[1], "SET");
    if (!set || !Number.isFinite(id)) continue;
    const times = [...m[2].matchAll(/<SPOT\b[^>]*>/g)].map((s) => Number(attr(s[0], "TIME")) || 0);
    const lifeMs = Math.max(1, ...times) * 1000;
    sets.set(set, { id, lifeMs });
    lifeById.set(id, lifeMs);
  }
  const script: ScriptStep[] = [];
  const body = /<SCRIPT>([\s\S]*?)<\/SCRIPT>/.exec(xml)?.[1] ?? "";
  for (const m of body.matchAll(/<(DELAY|RANDOMDELAY|ANIMAL)\b([^>]*)\/?>/g)) {
    if (m[1] === "ANIMAL") {
      const set = attr(m[2], "TYPE");
      if (set) script.push({ kind: "animal", set });
    } else {
      script.push({ kind: m[1] === "DELAY" ? "delay" : "randomdelay", seconds: Number(attr(m[2], "TIME")) || 0 });
    }
  }
  const powerups = /<POWERUPS>([\s\S]*?)<\/POWERUPS>/.exec(xml)?.[1] ?? "";
  return {
    name,
    sets,
    lifeById,
    script,
    fuelSpots: (powerups.match(/<FUEL\b/g) ?? []).length,
    filmSpots: (powerups.match(/<FILM\b/g) ?? []).length,
  };
}

function loadStages(): void {
  const dir =
    process.env.VMK_JC_STAGES ??
    join(dirname(fileURLToPath(import.meta.url)), "..", "..", "client", "assets", "casts", "vmk_junglecruise_stages", "text");
  if (!existsSync(dir)) {
    console.warn(`[jungle-cruise] no stage texts at ${dir} — every stage will be empty`);
    return;
  }
  for (const file of readdirSync(dir)) {
    if (!/\.stage\d\.xml_stxt_0\.txt$/.test(file)) continue;
    const stage = parseStage(readFileSync(join(dir, file), "latin1"));
    if (stage) STAGES.set(stage.name, stage);
  }
  console.log(`[jungle-cruise] ${STAGES.size} stages loaded`);
}
loadStages();

/** The stage list in play order: cruise N runs every theme's `stageN`. */
export const COURSE: string[] = [];
for (let cruise = 1; cruise <= CRUISES; cruise++) for (const theme of THEMES) COURSE.push(`${theme}.stage${cruise}`);

// ---------------------------------------------------------------- checksum

/**
 * `CIterateSeed.IterateSeed` — xorshift 13/17/5 in Lingo arithmetic. Its
 * `BitRight` divides by a FLOAT power of two and hands the quotient to
 * `bitOr`, so whether that rounds or truncates is the player's to decide
 * (Director and our runtime need not agree). Returns null when the two
 * readings differ, so that turn number is simply skipped: a mismatch is
 * reported with action 3, the same code as "stage over".
 *
 * Every value stays below 2^31 for seeds under 2^13 — turn numbers wrap first.
 */
export function iterateSeed(seed: number): number | null {
  let a = seed === 0 ? -1 : seed;
  a ^= a * 2 ** 13;
  const q = a / 2 ** 17;
  const t = Math.trunc(q);
  const r = Math.round(q);
  if (t !== r) return null;
  a ^= t;
  return a ^ (a * 2 ** 5);
}
const MAX_TURN = 8191;

// ---------------------------------------------------------------- scores

db.exec(`
  CREATE TABLE IF NOT EXISTS minigame_scores (
    user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    game      INTEGER NOT NULL,
    score     INTEGER NOT NULL,
    played_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS minigame_scores_day ON minigame_scores (game, played_at);
`);

export function recordScore(userId: number, game: number, score: number): void {
  db.prepare("INSERT INTO minigame_scores (user_id, game, score, played_at) VALUES (?, ?, ?, ?)").run(
    userId,
    game,
    score,
    Date.now(),
  );
}

/** "Today's High Scores": each player's best since local midnight, top `limit`. */
export function todaysHighScores(
  game: number,
  userId: number,
  limit = 10,
): { myRank: number; rows: { rank: number; score: number; name: string }[] } {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  const all = db
    .prepare(
      `SELECT s.user_id AS userId, MAX(s.score) AS score, COALESCE(u.character_name, u.username) AS name
         FROM minigame_scores s JOIN users u ON u.id = s.user_id
        WHERE s.game = ? AND s.played_at >= ?
        GROUP BY s.user_id ORDER BY score DESC, MIN(s.played_at) ASC`,
    )
    .all(game, midnight.getTime()) as { userId: number; score: number; name: string }[];
  const mine = all.findIndex((r) => r.userId === userId);
  return {
    myRank: mine < 0 ? 0 : mine + 1,
    rows: all.slice(0, limit).map((r, i) => ({ rank: i + 1, score: r.score, name: r.name })),
  };
}

/**
 * REWARDS, from the VMK wiki ("Jungle Cruise Photo Safari Game"): the first
 * game pays 150 credits and the Toucan Jungle Cruise Photo Safari Poster
 * (item 3003, a poster); every game after that, 20 credits. The wiki's high
 * score prize (750 credits plus real-world codes) is not modelled — it does not
 * say what "the high score" was measured against.
 */
const FIRST_PLAY_CREDITS = 150;
const PLAY_CREDITS = 20;
const FIRST_PLAY_POSTER = 3003;

db.exec(`
  CREATE TABLE IF NOT EXISTS minigame_rewards (
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    game       INTEGER NOT NULL,
    played     INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, game)
  );
`);

export interface JcReward {
  credits: number;
  posters: number[];
  first: boolean;
}

/** A game ended (gas out or the last cruise done): pay for it. */
export function claimJcReward(userId: number): JcReward {
  const row = db.prepare("SELECT played FROM minigame_rewards WHERE user_id = ? AND game = ?").get(userId, JC_GAME_CODE) as
    | { played?: number }
    | undefined;
  const first = !row || !Number(row.played);
  db.prepare(
    `INSERT INTO minigame_rewards (user_id, game, played) VALUES (?, ?, 1)
     ON CONFLICT(user_id, game) DO UPDATE SET played = played + 1`,
  ).run(userId, JC_GAME_CODE);
  const credits = first ? FIRST_PLAY_CREDITS : PLAY_CREDITS;
  addCredits(userId, credits, "Jungle Cruise Reward");
  const posters = first ? [FIRST_PLAY_POSTER] : [];
  if (posters.length) addItems(userId, posters, ITEM_CATEGORY.posters);
  return { credits, posters, first };
}

// ---------------------------------------------------------------- the game

export interface GameEnd {
  score: number;
  /** All three cruises done (rather than out of gas). */
  finished: boolean;
  stagesCleared: number;
}

type Send = (msg: number, params: OutgoingParam[], log?: string) => void;

type Event = number[];

/**
 * One player's cruise. `send` goes to that player only; `onEnd` fires once,
 * when the game is over (gas out or the last cruise done) — not on quit.
 */
export class JungleCruiseGame {
  private stageIndex = 0;
  private stage: Stage | null = null;
  private running = false;
  private over = false;
  private turnTimer: ReturnType<typeof setInterval> | null = null;
  private turn = 0;
  private nextRef = 100;
  private fuel = START_FUEL;
  private score = 0;
  private throttled = false;
  private lastBump = 0;
  /** ms since the stage started, at the start of the next turn. */
  private clock = 0;
  private scriptAt = 0;
  private nextDue = 0;
  private nextPowerup = 0;
  private pending: Event[] = [];
  private animals = new Map<number, { id: number; until: number }>();
  private powerups = new Map<number, 1 | 2>();
  private photographed = new Set<number>();
  private scoredFrames = new Set<number>();

  constructor(
    private readonly send: Send,
    private readonly label: string,
    private readonly onEnd: (end: GameEnd) => void,
  ) {}

  get isOver(): boolean {
    return this.over;
  }

  private albumSignals = 0;
  /**
   * Action 6 after the game: `GoToAlbumView` sends it as the scrapbook opens,
   * its CLOSE button again. True on the second — time to go back to the Dock.
   */
  albumClosed(): boolean {
    return ++this.albumSignals >= 2;
  }

  /** The client is in room 1102 and listening: load the first stage. */
  begin(): void {
    this.loadStage();
  }

  stop(): void {
    this.running = false;
    this.over = true;
    if (this.turnTimer) clearInterval(this.turnTimer);
    this.turnTimer = null;
  }

  /**
   * EXIT GAME (action 8). The cruise only really ends when the gas runs out, so
   * quitting is how most games finish — it settles like an end (score recorded,
   * reward paid) rather than forfeiting.
   */
  quit(): void {
    if (this.over) return;
    this.stop();
    console.log(`[${this.label}] JC quit: score ${this.score}`);
    this.onEnd({ score: this.score, finished: false, stagesCleared: this.stageIndex });
  }

  private loadStage(): void {
    const name = COURSE[this.stageIndex];
    this.stage = STAGES.get(name) ?? null;
    this.running = false;
    this.animals.clear();
    this.powerups.clear();
    this.send(
      MSG.GAME_LOAD_STAGE,
      [{ str: name }, { int: 0 }, { int: 0 }],
      `JC LoadStage ${name} (${this.stageIndex + 1}/${COURSE.length})`,
    );
  }

  /** `602`: the stage is loaded and the boat is under way. */
  stageLoaded(): void {
    if (this.over || this.running) return;
    this.running = true;
    this.clock = 0;
    this.scriptAt = 0;
    this.nextDue = 1000;
    this.nextPowerup = 0;
    this.send(MSG.GAME_START_STAGE, [{ int: 0 }], `JC StartStage ${COURSE[this.stageIndex]}`);
    // A round trip just finished: the bonus rides in the new cruise's first turn.
    if (this.stageIndex > 0 && this.stageIndex % THEMES.length === 0) {
      this.fuel += ROUND_TRIP_FUEL;
      this.pending.push([7, ROUND_TRIP_FUEL, ROUND_TRIP_FILM]);
    }
    if (!this.turnTimer) this.turnTimer = setInterval(() => this.pump(), TURN_MS);
    this.pump();
  }

  /** `601`: `[action, ...data]` (the leading count already stripped). */
  action(action: number, data: number[]): void {
    if (this.over && action !== 6) return;
    switch (action) {
      case 1:
        return this.photo(data);
      case 2: {
        const type = this.powerups.get(data[0]);
        if (type === undefined) return;
        this.powerups.delete(data[0]);
        if (type === 1) this.fuel += FUEL_PICKUP;
        this.pending.push([3, type]);
        return;
      }
      case 3:
        return this.stageOver();
      case 4:
        if (data[0] === 3) this.throttled = true;
        return;
      case 5: {
        const now = Date.now();
        if (!this.running || now - this.lastBump < BUMP_COOLDOWN_MS) return;
        this.lastBump = now;
        this.fuel -= FUEL_BUMP;
        return;
      }
    }
  }

  private photo(data: number[]): void {
    const [frameId, hits] = data;
    if (frameId === undefined || this.scoredFrames.has(frameId)) return;
    this.scoredFrames.add(frameId);
    const now = Date.now();
    let total = 0;
    for (let i = 0; i < (hits ?? 0); i++) {
      const [ref, , accuracy, time] = data.slice(2 + i * 4, 6 + i * 4);
      const animal = this.animals.get(ref);
      if (!animal || now > animal.until || this.photographed.has(ref)) continue;
      this.photographed.add(ref);
      const acc = Math.max(1, Math.min(100, accuracy | 0));
      const t = Math.max(0, Math.min(100, time | 0));
      // CJungleCruiseComponent.Calculatescore: integer arithmetic throughout.
      total += Math.trunc(((ANIMAL_POINTS[animal.id] ?? 0) * (acc + t)) / 200);
    }
    if (total <= 0) return;
    this.score += total;
    this.pending.push([4, frameId, total]);
    console.log(`[${this.label}] JC photo ${frameId}: +${total} (score ${this.score})`);
  }

  private stageOver(): void {
    if (!this.running) return;
    this.running = false;
    this.stageIndex++;
    if (this.stageIndex >= COURSE.length) {
      this.finish(true);
      return;
    }
    setTimeout(() => {
      if (!this.over) this.loadStage();
    }, 500);
  }

  private finish(finished: boolean): void {
    if (this.over) return;
    this.over = true;
    this.running = false;
    this.pending.push([5, Math.max(0, this.fuel)], [6]);
    this.flushTurn();
    if (this.turnTimer) clearInterval(this.turnTimer);
    this.turnTimer = null;
    console.log(`[${this.label}] JC game over: ${finished ? "course done" : "out of gas"}, score ${this.score}`);
    this.onEnd({ score: this.score, finished, stagesCleared: this.stageIndex });
  }

  /** Build and send one turn. */
  private pump(): void {
    if (this.over) return;
    if (!this.running) {
      // Between stages the client still has its engine running: keep it fed so
      // a queued pickup or score is not held back.
      if (this.pending.length) this.flushTurn();
      return;
    }
    const subturns: Event[][] = Array.from({ length: SUBTURNS }, () => []);
    subturns[0].push(...this.pending);
    this.pending = [];
    const start = this.clock;
    const end = start + TURN_MS;
    const slot = (at: number) => Math.min(SUBTURNS - 1, Math.max(0, Math.floor(((at - start) / TURN_MS) * SUBTURNS)));
    const now = Date.now();
    const stage = this.stage;
    // Powerups: one of each kind the stage has spots for.
    if (stage && this.nextPowerup < end) {
      const at = slot(this.nextPowerup);
      if (stage.fuelSpots) subturns[at].push(this.spawnPowerup(1));
      if (stage.filmSpots) subturns[at].push(this.spawnPowerup(2));
      this.nextPowerup += POWERUP_EVERY_MS;
    }
    // The show script, looping once it runs out.
    if (stage && stage.script.some((s) => s.kind === "animal")) {
      while (this.nextDue < end) {
        const step = stage.script[this.scriptAt];
        this.scriptAt = (this.scriptAt + 1) % stage.script.length;
        if (this.scriptAt === 0) this.nextDue += 1000;
        if (step.kind === "delay") this.nextDue += step.seconds * 1000;
        else if (step.kind === "randomdelay") this.nextDue += Math.random() * step.seconds * 1000;
        else if (step.kind === "animal") {
          const set = stage.sets.get(step.set);
          if (!set) continue;
          const ref = this.nextRef++;
          const due = Math.max(this.nextDue, start);
          this.animals.set(ref, { id: set.id, until: now + (due - start) + set.lifeMs + PHOTO_GRACE_MS });
          subturns[slot(due)].push([1, ref, set.id]);
        }
      }
    }
    // Gas.
    this.fuel -= FUEL_PER_TURN + (this.throttled ? FUEL_THROTTLE : 0);
    this.throttled = false;
    subturns[SUBTURNS - 1].push([5, Math.max(0, this.fuel)]);
    this.clock = end;
    // Forget animals nobody can photograph any more.
    for (const [ref, a] of this.animals) if (now > a.until + TURN_MS) this.animals.delete(ref);
    this.sendTurn(subturns);
    if (this.fuel <= 0) this.finish(false);
  }

  private spawnPowerup(type: 1 | 2): Event {
    const ref = this.nextRef++;
    this.powerups.set(ref, type);
    return [2, ref, type];
  }

  private flushTurn(): void {
    const subturns: Event[][] = [this.pending];
    this.pending = [];
    this.sendTurn(subturns);
  }

  private sendTurn(subturns: Event[][]): void {
    let checksum: number | null = null;
    do {
      this.turn = this.turn >= MAX_TURN ? 1 : this.turn + 1;
      checksum = iterateSeed(this.turn);
    } while (checksum === null);
    const params: OutgoingParam[] = [{ int: this.turn }, { int: checksum }, { int: subturns.length }];
    for (const events of subturns) {
      params.push({ int: events.length });
      for (const e of events) params.push({ int: e.length }, ...e.map((v) => ({ int: v })));
    }
    const summary = subturns.flat().map((e) => e[0]).filter((c) => c !== 5);
    this.send(MSG.GAME_STATUS_UPDATE, params, summary.length ? `JC turn ${this.turn} events ${summary.join(",")}` : undefined);
  }
}
