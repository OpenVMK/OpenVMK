/**
 * Pirates of the Caribbean — the server's mirror of the client's lockstep world.
 *
 * The client (`minigame_engine_potc2` + `vmk_pirates2_minigame`) simulates every
 * object itself, once per SUBTURN, and at the start of each turn compares a
 * checksum of all its objects against the one the server sent
 * (`CGameComponent.calculateChecksum`). A mismatch is reported with action 3
 * and repaired with a full status (`2609`). So the server runs the same
 * simulation, ported line for line from the Lingo:
 *
 *   ships        CPiratesFactorShip.move / TestCollision / SyncGameParameters
 *   cannonballs  CPiratesFactorCannonball.move (cosmetic hits: the SERVER decides damage)
 *   powerups     CPiratesFactorPowerup.move (the SERVER decides who collects)
 *   tables       CVelocityTbl, CComponentToAngle, CCollision, CMap, BitMethods
 *
 * ⚠ LINGO INTEGER ARITHMETIC. `/` on two integers truncates toward zero and
 * `mod` keeps the dividend's sign; every `x * y / 256` below is `trunc`, never
 * `floor` or `round`. Objects are processed in ascending ref order — the
 * client's `m_mp_objects` is a SORTED property list.
 *
 * Event semantics (what each turn event does to the client's objects) are in
 * `applyEvent`, mirroring `CPiratesMinigameHandlerExtension.OnEvent`.
 */
import { readdirSync, readFileSync } from "node:fs";
import { iterateSeed } from "./jungle-cruise.js";

// ---------------------------------------------------------------- tables

/** `CVelocityTbl` — base velocity per degree, scaled to ±256. */
const VEL_X = [0, 4, 8, 13, 17, 22, 26, 31, 35, 40, 44, 48, 53, 57, 61, 66, 70, 74, 79, 83, 87, 91, 95, 100, 104, 108, 112, 116, 120, 124, 127, 131, 135, 139, 143, 146, 150, 154, 157, 161, 164, 167, 171, 174, 177, 181, 184, 187, 190, 193, 196, 198, 201, 204, 207, 209, 212, 214, 217, 219, 221, 223, 226, 228, 230, 232, 233, 235, 237, 238, 240, 242, 243, 244, 246, 247, 248, 249, 250, 251, 252, 252, 253, 254, 254, 255, 255, 255, 255, 255, 256, 255, 255, 255, 255, 255, 254, 254, 253, 252, 252, 251, 250, 249, 248, 247, 246, 244, 243, 242, 240, 238, 237, 235, 233, 232, 230, 228, 226, 223, 221, 219, 217, 214, 212, 209, 207, 204, 201, 198, 196, 193, 190, 187, 184, 181, 177, 174, 171, 167, 164, 161, 157, 154, 150, 146, 143, 139, 135, 131, 127, 124, 120, 116, 112, 108, 104, 100, 95, 91, 87, 83, 79, 74, 70, 66, 61, 57, 53, 48, 44, 40, 35, 31, 26, 22, 17, 13, 8, 4, 0, -4, -8, -13, -17, -22, -26, -31, -35, -40, -44, -48, -53, -57, -61, -66, -70, -74, -79, -83, -87, -91, -95, -100, -104, -108, -112, -116, -120, -124, -128, -131, -135, -139, -143, -146, -150, -154, -157, -161, -164, -167, -171, -174, -177, -181, -184, -187, -190, -193, -196, -198, -201, -204, -207, -209, -212, -214, -217, -219, -221, -223, -226, -228, -230, -232, -233, -235, -237, -238, -240, -242, -243, -244, -246, -247, -248, -249, -250, -251, -252, -252, -253, -254, -254, -255, -255, -255, -255, -255, -256, -255, -255, -255, -255, -255, -254, -254, -253, -252, -252, -251, -250, -249, -248, -247, -246, -244, -243, -242, -240, -238, -237, -235, -233, -232, -230, -228, -226, -223, -221, -219, -217, -214, -212, -209, -207, -204, -201, -198, -196, -193, -190, -187, -184, -181, -177, -174, -171, -167, -164, -161, -157, -154, -150, -146, -143, -139, -135, -131, -128, -124, -120, -116, -112, -108, -104, -100, -95, -91, -87, -83, -79, -74, -70, -66, -61, -57, -53, -48, -44, -40, -35, -31, -26, -22, -17, -13, -8, -4];
const VEL_Y = [-256, -255, -255, -255, -255, -255, -254, -254, -253, -252, -252, -251, -250, -249, -248, -247, -246, -244, -243, -242, -240, -238, -237, -235, -233, -232, -230, -228, -226, -223, -221, -219, -217, -214, -212, -209, -207, -204, -201, -198, -196, -193, -190, -187, -184, -181, -177, -174, -171, -167, -164, -161, -157, -154, -150, -146, -143, -139, -135, -131, -128, -124, -120, -116, -112, -108, -104, -100, -95, -91, -87, -83, -79, -74, -70, -66, -61, -57, -53, -48, -44, -40, -35, -31, -26, -22, -17, -13, -8, -4, 0, 4, 8, 13, 17, 22, 26, 31, 35, 40, 44, 48, 53, 57, 61, 66, 70, 74, 79, 83, 87, 91, 95, 100, 104, 108, 112, 116, 120, 124, 127, 131, 135, 139, 143, 146, 150, 154, 157, 161, 164, 167, 171, 174, 177, 181, 184, 187, 190, 193, 196, 198, 201, 204, 207, 209, 212, 214, 217, 219, 221, 223, 226, 228, 230, 232, 233, 235, 237, 238, 240, 242, 243, 244, 246, 247, 248, 249, 250, 251, 252, 252, 253, 254, 254, 255, 255, 255, 255, 255, 256, 255, 255, 255, 255, 255, 254, 254, 253, 252, 252, 251, 250, 249, 248, 247, 246, 244, 243, 242, 240, 238, 237, 235, 233, 232, 230, 228, 226, 223, 221, 219, 217, 214, 212, 209, 207, 204, 201, 198, 196, 193, 190, 187, 184, 181, 177, 174, 171, 167, 164, 161, 157, 154, 150, 146, 143, 139, 135, 131, 128, 124, 120, 116, 112, 108, 104, 100, 95, 91, 87, 83, 79, 74, 70, 66, 61, 57, 53, 48, 44, 40, 35, 31, 26, 22, 17, 13, 8, 4, 0, -4, -8, -13, -17, -22, -26, -31, -35, -40, -44, -48, -53, -57, -61, -66, -70, -74, -79, -83, -87, -91, -95, -100, -104, -108, -112, -116, -120, -124, -128, -131, -135, -139, -143, -146, -150, -154, -157, -161, -164, -167, -171, -174, -177, -181, -184, -187, -190, -193, -196, -198, -201, -204, -207, -209, -212, -214, -217, -219, -221, -223, -226, -228, -230, -232, -233, -235, -237, -238, -240, -242, -243, -244, -246, -247, -248, -249, -250, -251, -252, -252, -253, -254, -254, -255, -255, -255, -255, -255];

/** `CComponentToAngle` lookup. */
const ANGLE = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 32, 33, 33, 33, 33, 33, 33, 34, 34, 34, 34, 34, 34, 34, 35, 35, 35, 35, 35, 35, 36, 36, 36, 36, 36, 36, 36, 37, 37, 37, 37, 37, 37, 37, 38, 38, 38, 38, 38, 38, 38, 39, 39, 39, 39, 39, 39, 39, 39, 40, 40, 40, 40, 40, 40, 40, 41, 41, 41, 41, 41, 41, 41, 41, 42, 42, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 44, 44, 44, 45, 45, 45, 45, 45];

/** Lingo integer division: truncates toward zero. */
const idiv = (a: number, b: number): number => Math.trunc(a / b);

function validDir(d: number): number {
  if (d > 359) return d % 360;
  if (d < 0) return 360 + (d % 360);
  return d;
}
export const baseVelX = (d: number): number => VEL_X[validDir(d)] ?? 0;
export const baseVelY = (d: number): number => VEL_Y[validDir(d)] ?? 0;

export function angleFromComponents(x: number, y: number): number {
  if (Math.abs(x) <= Math.abs(y)) {
    if (y === 0) y = 1;
    x = x * 256;
    let t = Math.abs(idiv(x, y));
    if (t > 255) t = 255;
    if (y < 0) return x > 0 ? ANGLE[t] : 360 - ANGLE[t];
    return x > 0 ? 180 - ANGLE[t] : 180 + ANGLE[t];
  }
  if (x === 0) x = 1;
  y = y * 256;
  let t = Math.abs(idiv(y, x));
  if (t > 255) t = 255;
  if (y < 0) return x > 0 ? 90 - ANGLE[t] : 270 + ANGLE[t];
  return x > 0 ? 90 + ANGLE[t] : 270 - ANGLE[t];
}

/** `MathMethods.AdjustDirection`. */
function adjustDirection(current: number, diff: number): number {
  current += diff;
  if (current > 359) current = current % 360;
  if (current < 0) current = 360 - (-current % 360);
  return current;
}

const mask = (bit: number): number => 2 ** (bit - 1);
const testBit = (v: number, bit: number): boolean => (v & mask(bit)) > 0;
const setBit = (v: number, bit: number): number => v | mask(bit);
const clearBit = (v: number, bit: number): number => v & ~mask(bit);

export const BIT = { MOVE: 1, SHOOT: 3, DESTROYED: 4, WRECK: 5, INVINCIBLE: 6, OWN_FLAG: 7, ROWBOAT: 8, ENEMY_FLAG: 9 } as const;

function testDistance(x1: number, y1: number, x2: number, y2: number, d: number): boolean {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  if (dx > d || dy > d) return false;
  return dx * dx + dy * dy < d * d;
}

// ---------------------------------------------------------------- stage data

export interface StageDef {
  name: string;
  startTime: number;
  endTime: number;
  starts: Record<1 | 2, { x: number; y: number; dir: number }[]>;
  items: { x: number; y: number; type: number; team: number }[];
  /** Capture the Flag: `<TEAMBASE>` fixtures. The flags are the type-3 `items`. */
  bases: { x: number; y: number; team: 1 | 2 }[];
  ammoAmount: number;
  healthAmount: number;
  /** [small, large] games: seconds between attempts and the % chance per attempt. */
  ammoEvery: [number, number];
  ammoChance: [number, number];
  healthEvery: [number, number];
  healthChance: [number, number];
  moonlightUserTriggered: boolean;
  /** `<MOONLIGHT>`, seconds and units/subturn; null on level 1. */
  moonlight: MoonlightDef | null;
  /** `<KRAKENSEAMONSTER>`: delays in seconds, distances in world units. */
  kraken: KrakenDef | null;
  map: CollisionMap;
}

export interface MoonlightDef {
  userTriggered: boolean;
  startFix: number;
  startRnd: number;
  stay: number;
  repeatFix: number;
  repeatRnd: number;
  /** Seconds of invincibility. */
  invincibility: number;
  /** User-triggered: seconds before the button works again. */
  cooldown: number;
  velocity: number;
}

export interface KrakenDef {
  chaseTrigger: number;
  chaseSpeed: number;
  startFix: number;
  startRnd: number;
  stay: number;
  stayRnd: number;
  repeatFix: number;
  repeatRnd: number;
}

export class CollisionMap {
  constructor(
    private readonly cells: Int8Array,
    private readonly width: number,
    private readonly height: number,
    private readonly tile: number,
    private readonly offX: number,
    private readonly offY: number,
  ) {}

  /** `CMap.TestPointToCMap`. Outside the map reads 3 (land). */
  at(x: number, y: number): number {
    const mx = idiv(Math.trunc(x) - this.offX + this.tile, this.tile);
    const my = idiv(Math.trunc(y) - this.offY + this.tile, this.tile);
    if (my < 1 || my > this.height || mx < 1 || mx > this.width) return 3;
    return this.cells[(my - 1) * this.width + (mx - 1)];
  }
}

const attr = (tag: string, name: string): string | undefined =>
  new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, "i").exec(tag)?.[1];
const point = (s: string | undefined): [number, number] => {
  const m = /point\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)/i.exec(s ?? "");
  return m ? [Number(m[1]), Number(m[2])] : [0, 0];
};

/** The collision member: a Lingo list literal `[[r1...], [r2...], ...]`, one row per y. */
function parseCollision(text: string, width: number, height: number): Int8Array {
  const cells = new Int8Array(width * height).fill(3);
  let row = -1;
  let col = 0;
  let depth = 0;
  for (const m of text.matchAll(/\[|\]|-?\d+/g)) {
    const t = m[0];
    if (t === "[") {
      depth++;
      if (depth === 2) {
        row++;
        col = 0;
      }
    } else if (t === "]") {
      depth--;
    } else if (depth === 2 && row < height && col < width) {
      cells[row * width + col++] = Number(t);
    }
  }
  return cells;
}

const STAGE_DIR = new URL("../../client/assets/casts/vmk_pirates2_stages/text/", import.meta.url);
const stageCache = new Map<string, StageDef>();

export function loadStage(name: string): StageDef {
  const cached = stageCache.get(name);
  if (cached) return cached;
  const files = readdirNames();
  const xmlFile = files.find((f) => f.includes(`_stage.${name}.xml`) && !f.includes("collision"));
  const colFile = files.find((f) => f.includes(`_collision.stage.${name}.xml`));
  if (!xmlFile || !colFile) throw new Error(`pirates: stage ${name} not extracted`);
  const xml = readFileSync(new URL(xmlFile, STAGE_DIR), "latin1");
  const root = /<PIRATES_OF_THE_CARIBBEAN\b[^>]*>/i.exec(xml)?.[0] ?? "";
  const starts: StageDef["starts"] = { 1: [], 2: [] };
  for (const team of xml.matchAll(/<TEAM\s+NUM="(\d)"[^>]*>([\s\S]*?)<\/TEAM>/gi)) {
    const num = Number(team[1]) as 1 | 2;
    for (const s of team[2].matchAll(/<START\b[^>]*>/gi)) {
      const [x, y] = point(attr(s[0], "POS"));
      starts[num]?.push({ x, y, dir: Number(attr(s[0], "DIR") ?? 0) });
    }
  }
  const items = [...xml.matchAll(/<POWERUP\b[^>]*>/gi)].map((m) => {
    const [x, y] = point(attr(m[0], "POS"));
    return { x, y, type: Number(attr(m[0], "TYPE") ?? 1), team: Number(attr(m[0], "TEAMNUM") ?? -1) };
  });
  const pu = /<POWERUPS\b[^>]*>/i.exec(xml)?.[0] ?? "";
  const game = (type: string): string => new RegExp(`<GAME\\s+TYPE="${type}"[^>]*>`, "i").exec(xml)?.[0] ?? "";
  const small = game("small");
  const large = game("large");
  const cm = /<COLLISIONMAP\b[^>]*>/i.exec(xml)?.[0] ?? "";
  const [w, h] = point(attr(cm, "SIZE"));
  const [ox, oy] = point(attr(cm, "OFFSET"));
  const tile = Number(attr(cm, "TILESIZE") ?? 200);
  const cells = parseCollision(readFileSync(new URL(colFile, STAGE_DIR), "latin1"), w, h);
  const def: StageDef = {
    name,
    startTime: Number(attr(root, "STARTTIME") ?? 5),
    endTime: Number(attr(root, "ENDTIME") ?? 5),
    starts,
    items,
    bases: [...xml.matchAll(/<TEAMBASE\b[^>]*>/gi)].map((m) => {
      const [x, y] = point(attr(m[0], "POS"));
      return { x, y, team: (Number(attr(m[0], "TEAMNUM") ?? 1) === 2 ? 2 : 1) as 1 | 2 };
    }),
    ammoAmount: Number(attr(pu, "CANNONBALLAMOUNT") ?? 3),
    healthAmount: Number(attr(pu, "HEALTHAMOUNT") ?? 3),
    ammoEvery: [Number(attr(small, "AMMO_INTERVAL") ?? 9), Number(attr(large, "AMMO_INTERVAL") ?? 5)],
    ammoChance: [Number(attr(small, "AMMO_PROPABILITY") ?? 50), Number(attr(large, "AMMO_PROPABILITY") ?? 50)],
    healthEvery: [Number(attr(small, "HEALTH_INTERVAL") ?? 15), Number(attr(large, "HEALTH_INTERVAL") ?? 10)],
    healthChance: [Number(attr(small, "HEALTH_PROPABILITY") ?? 50), Number(attr(large, "HEALTH_PROPABILITY") ?? 50)],
    // ⚠ "true"/"false" in the stage files, not 1/0.
    moonlightUserTriggered: /^(true|1)$/i.test(attr(/<MOONLIGHT\b[^>]*>/i.exec(xml)?.[0] ?? "", "USER_TRIGGERED") ?? ""),
    moonlight: parseMoonlight(/<MOONLIGHT\b[^>]*>/i.exec(xml)?.[0]),
    kraken: parseKraken(/<KRAKENSEAMONSTER\b[^>]*>/i.exec(xml)?.[0]),
    map: new CollisionMap(cells, w, h, tile, ox, oy),
  };
  stageCache.set(name, def);
  return def;
}

function parseMoonlight(tag: string | undefined): MoonlightDef | null {
  if (!tag) return null;
  const n = (name: string, fallback: number) => Number(attr(tag, name) ?? fallback);
  return {
    userTriggered: /^(true|1)$/i.test(attr(tag, "USER_TRIGGERED") ?? ""),
    startFix: n("STARTFIXDLY", 2),
    startRnd: n("STARTRNDDLY", 2),
    stay: n("STAY", 20),
    repeatFix: n("REPEATFIXDLY", 2),
    repeatRnd: n("REPEATRNDDLY", 4),
    invincibility: n("INVINCIBILITY", 5),
    cooldown: n("INVINCIBILITYDLY", 30),
    velocity: n("VELOCITY", 200),
  };
}

function parseKraken(tag: string | undefined): KrakenDef | null {
  if (!tag) return null;
  const n = (name: string, fallback: number) => Number(attr(tag, name) ?? fallback);
  return {
    chaseTrigger: n("CHASETRIG", 10000),
    chaseSpeed: n("CHASESPD", 100),
    startFix: n("STARTFIXDLY", 2),
    startRnd: n("STARTRNDDLY", 2),
    stay: n("STAY", 20),
    stayRnd: n("STAYRNDDELAY", 20),
    repeatFix: n("REPEATFIXDLY", 15),
    repeatRnd: n("REPEATRNDDLY", 10),
  };
}

let stageFiles: string[] | null = null;
function readdirNames(): string[] {
  stageFiles ??= readdirSync(STAGE_DIR);
  return stageFiles;
}

// ---------------------------------------------------------------- objects

export const TYPE = { SHIP: 1, BALL: 2, POWERUP: 3, WIND: 8, SCOREBOARD: 9, MOONLIGHT: 13, TEAMBASE: 17, KRAKEN: 18 } as const;

/** Ship type -> speed, max health, turning rate (`SetSpeedAndHealth`), broadside size (the ship card's cannons). */
const SHIP_STATS: Record<number, { speed: number; maxHealth: number; turn: number; cannons: number }> = {
  1: { speed: 1024, maxHealth: 3, turn: 17, cannons: 3 },
  2: { speed: 666, maxHealth: 4, turn: 14, cannons: 4 },
  3: { speed: 666, maxHealth: 3, turn: 14, cannons: 5 },
};

export const BALL_SPEED = 1400;
export const BALL_TTL = 25;
const NAV_STOP = 1423;
const SIDE_CANNON_OFFSET = 1000;
const POWERUP_RADIUS = 550;
const SHIP_SHAPE = { r1: 1000, r2: 1500, r3: 1000, o1: 1500, o3: -1500, largest: 2500 };

export interface GObj {
  code: number;
  ref: number;
  owner: number;
  team: number;
  x: number;
  y: number;
  z: number;
  dir: number;
  /** The client's `GameParams` — what the checksum and the wire carry. */
  params: number[];
}

export interface Ship extends GObj {
  code: 1;
  vx: number;
  vy: number;
  health: number;
  maxHealth: number;
  /** One entry per cannonball, 1 = golden. */
  ammo: number[];
  maxAmmo: number;
  state: number;
  navX: number;
  navY: number;
  score: number;
  whirl: number;
  shipType: number;
  gold: number;
  speed: number;
  turn: number;
  cannons: number;
  /** `Blow` sets BoundsType #none: nothing collides with it any more. */
  blown: boolean;
}

export interface Ball extends GObj {
  code: 2;
  collided: boolean;
  /** Server-side: the hit has been decided. */
  hitDone: boolean;
  golden: boolean;
}

export interface Powerup extends GObj {
  code: 3;
  collided: boolean;
  collector: Ship | null;
}

export function makeShip(ref: number, owner: number, team: number, x: number, y: number, dir: number, shipType: number, score: number): Ship {
  const stats = SHIP_STATS[shipType] ?? { speed: 666, maxHealth: 5, turn: 14, cannons: 4 };
  const ship: Ship = {
    code: 1, ref, owner, team, x, y, z: 0, dir, params: [],
    vx: 0, vy: 0, health: Math.min(stats.maxHealth, 5), maxHealth: stats.maxHealth,
    ammo: [0, 0, 0, 0, 0], maxAmmo: 5, state: 0, navX: 0, navY: 0, score, whirl: -1,
    shipType, gold: 0, speed: stats.speed, turn: stats.turn, cannons: stats.cannons, blown: false,
  };
  syncShip(ship);
  return ship;
}

/**
 * `setRowingBoat` -> `SetSpeedAndHealth`: a rowboat is slow, unarmed and has
 * no hull to lose (Capture the Flag's "sunk" state); a ship gets its type's.
 */
function setRowboat(s: Ship, on: boolean): void {
  s.state = on ? setBit(s.state, BIT.ROWBOAT) : clearBit(s.state, BIT.ROWBOAT);
  const stats = SHIP_STATS[s.shipType] ?? { speed: 666, maxHealth: 5, turn: 14, cannons: 4 };
  s.speed = on ? 444 : stats.speed;
  s.maxHealth = on ? 0 : stats.maxHealth;
  s.maxAmmo = on ? 0 : 5;
  s.turn = on ? 14 : stats.turn;
  s.health = Math.min(s.maxHealth, s.health);
}

export const shipRowboat = (s: Ship): boolean => testBit(s.state, BIT.ROWBOAT);
export const carriesFlag = (s: Ship): boolean => testBit(s.state, BIT.OWN_FLAG) || testBit(s.state, BIT.ENEMY_FLAG);
export const carriesEnemyFlag = (s: Ship): boolean => testBit(s.state, BIT.ENEMY_FLAG);

/** `CPiratesFactorShip.SyncGameParameters`. */
function syncShip(s: Ship): void {
  s.params = [s.vx, s.vy, s.health, s.ammo.length, s.state, s.navX, s.navY, s.score, s.whirl, s.shipType, s.gold];
}

export const shipAlive = (s: Ship): boolean => !testBit(s.state, BIT.DESTROYED);
export const shipWreck = (s: Ship): boolean => testBit(s.state, BIT.DESTROYED) && testBit(s.state, BIT.WRECK);
export const shipInvincible = (s: Ship): boolean => testBit(s.state, BIT.INVINCIBLE);

// ---------------------------------------------------------------- collision (CCollision)

function circleCenter(s: Ship, offset: number): [number, number] {
  return [s.x + idiv(baseVelX(s.dir) * offset, 256), s.y + idiv(baseVelY(s.dir) * offset, 256)];
}

function pointToTriple(px: number, py: number, s: Ship): boolean {
  if (Math.abs(s.x - px) > SHIP_SHAPE.largest) return false;
  if (Math.abs(s.y - py) > SHIP_SHAPE.largest) return false;
  const [c1x, c1y] = circleCenter(s, SHIP_SHAPE.o1);
  if (testDistance(c1x, c1y, px, py, SHIP_SHAPE.r1)) return true;
  if (testDistance(s.x, s.y, px, py, SHIP_SHAPE.r2)) return true;
  const [c3x, c3y] = circleCenter(s, SHIP_SHAPE.o3);
  return testDistance(c3x, c3y, px, py, SHIP_SHAPE.r3);
}

function circleToTriple(cx: number, cy: number, r: number, s: Ship): boolean {
  if (Math.abs(s.x - cx) > r + SHIP_SHAPE.largest) return false;
  if (Math.abs(s.y - cy) > r + SHIP_SHAPE.largest) return false;
  const [c1x, c1y] = circleCenter(s, SHIP_SHAPE.o1);
  if (testDistance(c1x, c1y, cx, cy, r + SHIP_SHAPE.r1)) return true;
  if (testDistance(s.x, s.y, cx, cy, r + SHIP_SHAPE.r2)) return true;
  const [c3x, c3y] = circleCenter(s, SHIP_SHAPE.o3);
  return testDistance(c3x, c3y, cx, cy, r + SHIP_SHAPE.r3);
}

function tripleToTriple(a: Ship, b: Ship): boolean {
  const L = SHIP_SHAPE.largest;
  if (Math.abs(b.x - a.x) > L + L) return false;
  if (Math.abs(b.y - a.y) > L + L) return false;
  const { r1, r2, r3, o1, o3 } = SHIP_SHAPE;
  const [a1x, a1y] = circleCenter(a, o1);
  const [b1x, b1y] = circleCenter(b, o1);
  if (testDistance(a1x, a1y, b1x, b1y, r1 + r1)) return true;
  if (testDistance(a.x, a.y, b1x, b1y, r2 + r1)) return true;
  if (testDistance(a1x, a1y, b.x, b.y, r1 + r2)) return true;
  const [b3x, b3y] = circleCenter(b, o3);
  if (testDistance(a1x, a1y, b3x, b3y, r1 + r3)) return true;
  if (testDistance(a.x, a.y, b3x, b3y, r2 + r3)) return true;
  if (testDistance(a.x, a.y, b.x, b.y, r2 + r2)) return true;
  const [a3x, a3y] = circleCenter(a, o3);
  if (testDistance(a3x, a3y, b1x, b1y, r3 + r1)) return true;
  if (testDistance(a3x, a3y, b.x, b.y, r3 + r2)) return true;
  return testDistance(a3x, a3y, b3x, b3y, r3 + r3);
}

// ---------------------------------------------------------------- the world

/** Something the server decided while simulating, to be sent as an event next turn. */
export type Outcome =
  | { kind: "ballHitShip"; ball: Ball; ship: Ship }
  | { kind: "ballEnded"; ball: Ball }
  | { kind: "collect"; powerup: Powerup; ship: Ship };

export class World {
  readonly objects = new Map<number, GObj>();
  windStrength = 0;
  windDir = 0;

  constructor(readonly stage: StageDef) {}

  add(o: GObj): void {
    this.objects.set(o.ref, o);
  }

  ships(): Ship[] {
    return [...this.objects.values()].filter((o): o is Ship => o.code === TYPE.SHIP);
  }

  get(ref: number): GObj | undefined {
    return this.objects.get(ref);
  }

  private sorted(): GObj[] {
    return [...this.objects.values()].sort((a, b) => a.ref - b.ref);
  }

  /** `CGameComponent.calculateChecksum`, for the state at the START of `turn`. */
  checksum(seed: number): number {
    let sum = seed;
    for (const o of this.objects.values()) {
      let c = 1;
      sum += o.code * c++;
      sum += o.ref * c++;
      sum += o.owner * c++;
      sum += o.team * c++;
      sum += Math.trunc(o.x) * c++;
      sum += Math.trunc(o.y) * c++;
      sum += Math.trunc(o.z) * c++;
      sum += Math.trunc(o.dir) * c++;
      for (const p of o.params) sum += Math.trunc(p) * c++;
    }
    return sum;
  }

  /** One subturn: the events, then every object's `move()` in ref order. */
  subturn(events: number[][], outcomes: Outcome[]): void {
    for (const e of events) this.applyEvent(e);
    for (const o of this.sorted()) {
      if (o.code === TYPE.SHIP) this.moveShip(o as Ship);
      else if (o.code === TYPE.BALL) this.moveBall(o as Ball, outcomes);
      else if (o.code === TYPE.POWERUP) this.movePowerup(o as Powerup, outcomes);
      else if (o.code === TYPE.KRAKEN) this.moveKraken(o);
      else if (o.code === TYPE.MOONLIGHT) {
        // `CPiratesFactorMoonlight.move`: drift by its velocity.
        o.x += o.params[0];
        o.y += o.params[1];
      }
    }
  }

  /** Kraken chase speed (`<KRAKENSEAMONSTER CHASESPD>`), units per subturn. */
  private get krakenSpeed(): number {
    return this.stage.kraken?.chaseSpeed ?? 100;
  }

  /** `CKrakenSeamonsterFactor.move`: swim at its target; snap when within 40. */
  private moveKraken(k: GObj): void {
    let dx = k.params[0] - k.x;
    let dy = k.params[1] - k.y;
    const dir = angleFromComponents(dx, dy);
    if (dx < 0) dx = -dx;
    if (dy < 0) dy = -dy;
    if (dx < 40 && dy < 40) {
      k.x = k.params[0];
      k.y = k.params[1];
    } else {
      k.x += idiv(baseVelX(dir) * this.krakenSpeed, 256);
      k.y += idiv(baseVelY(dir) * this.krakenSpeed, 256);
    }
  }

  /** After the last subturn: the client's component update drops spent balls and taken powerups. */
  sweep(outcomes: Outcome[]): void {
    for (const o of [...this.objects.values()]) {
      if (o.code === TYPE.BALL && ((o as Ball).params[3] <= 0 || (o as Ball).collided)) this.objects.delete(o.ref);
      else if (o.code === TYPE.POWERUP && (o as Powerup).collided) {
        const p = o as Powerup;
        if (p.params[0] === 3 && p.collector) outcomes.push({ kind: "collect", powerup: p, ship: p.collector });
        this.objects.delete(o.ref);
      }
    }
  }

  /** `CPiratesFactorTeamBase.BoundingCircleRadius` against a hull. */
  atBase(s: Ship, base: GObj): boolean {
    return circleToTriple(base.x, base.y, 3000, s);
  }

  /** A hull touching a flag pickup — for returning a team's own dropped flag. */
  touches(s: Ship, p: GObj): boolean {
    return circleToTriple(p.x, p.y, POWERUP_RADIUS, s);
  }

  // ---- events (CPiratesMinigameHandlerExtension.OnEvent)

  applyEvent(e: number[]): void {
    const [code, ...d] = e;
    switch (code) {
      case 1: {
        const s = this.get(d[0]) as Ship | undefined;
        if (!s) return;
        s.navX = d[1];
        s.navY = d[2];
        s.state = clearBit(setBit(s.state, BIT.MOVE), BIT.SHOOT);
        return;
      }
      case 5: {
        const [ref, x, y, type, state, team, amount] = d;
        this.add({ code: 3, ref, owner: -1, team, x, y, z: 0, dir: 0, params: [type, state, amount], collided: false, collector: null } as Powerup);
        return;
      }
      case 6: {
        const s = this.get(d[0]) as Ship | undefined;
        if (!s) return;
        s.state = setBit(setBit(s.state, BIT.WRECK), BIT.DESTROYED);
        s.health = -1;
        if (d[1] !== -1) {
          const killer = this.get(d[1]) as Ship | undefined;
          if (killer && d[2] !== -1) this.awardScore(killer, d[2]);
          if (d[3] !== -1) this.loseGold(s, d[3]);
        }
        return;
      }
      case 11: {
        const [shipRef, type, state, , amount] = d;
        const s = this.get(shipRef) as Ship | undefined;
        if (!s) return;
        if (type === 1) {
          for (let i = 1; i <= amount; i++) s.ammo.push(state === 1 && i === 1 ? 1 : 0);
          while (s.ammo.length > s.maxAmmo) s.ammo.pop();
        } else if (type === 2) {
          s.health = Math.min(s.health + amount, s.maxHealth);
        } else if (type === 3) {
          s.state = setBit(s.state, s.team === d[3] ? BIT.OWN_FLAG : BIT.ENEMY_FLAG);
        }
        syncShip(s);
        return;
      }
      case 34:
      case 38: {
        // 34 drop flag [ship, type]; 38 flag home [ship, base]. Both take the
        // flag off the ship the same way: `setCarryingFlag(0, IsCarryingOwnFlag())`.
        const s = this.get(d[0]) as Ship | undefined;
        if (!s) return;
        if (code === 34 && d[1] !== 3) return syncShip(s);
        s.state = clearBit(s.state, testBit(s.state, BIT.OWN_FLAG) ? BIT.OWN_FLAG : BIT.ENEMY_FLAG);
        syncShip(s);
        if (code === 38) {
          const base = this.get(d[1]);
          if (base) base.params = [1];
        }
        return;
      }
      case 36: {
        const s = this.get(d[0]) as Ship | undefined;
        if (!s) return;
        setRowboat(s, true);
        s.health = 0;
        s.ammo = [];
        syncShip(s);
        return;
      }
      case 37: {
        const s = this.get(d[0]) as Ship | undefined;
        if (!s) return;
        setRowboat(s, false);
        s.health = d[1];
        s.ammo = Array.from({ length: Math.max(0, d[2]) }, () => 0);
        syncShip(s);
        return;
      }
      case 41:
      case 19:
      case 24:
        // Expire powerup / Kraken leaves / moonlight fades: `_MinigameDeleteObject`.
        this.objects.delete(d[0]);
        return;
      case 18: {
        // Sea monster shows: `extra = [x, y]` — it starts with itself as its target.
        const [ref, x, y, type] = d;
        this.add({ code: type, ref, owner: -1, team: -1, x, y, z: 0, dir: 0, params: [x, y] });
        return;
      }
      case 20: {
        // Kraken eats a ship: `LoseHealth` `healthLost` times.
        const s = this.get(d[1]) as Ship | undefined;
        if (!s) return;
        for (let i = 0; i < d[2]; i++) this.loseHealth(s);
        return;
      }
      case 31: {
        // Sea monster move: a new target in GameParams.
        const m = this.get(d[0]);
        if (m) m.params = [d[1], d[2]];
        return;
      }
      case 23: {
        const [ref, x, y, vx, vy] = d;
        this.add({ code: TYPE.MOONLIGHT, ref, owner: -1, team: -1, x, y, z: 0, dir: 0, params: [vx, vy] });
        return;
      }
      case 13: {
        const [target, , , shooter, score] = d;
        const s = this.get(target) as Ship | undefined;
        if (!s) return;
        if (s.health > -1) {
          this.loseHealth(s);
          const sh = this.get(shooter) as Ship | undefined;
          if (sh) this.awardScore(sh, score);
        }
        return;
      }
      case 16: {
        const [shooter, ballRef, side, cannon, golden] = d;
        const s = this.get(shooter) as Ship | undefined;
        if (!s) return;
        let dir = s.dir;
        const offset = 75 + cannon * 5;
        dir = side === 0 ? dir - offset : dir + offset;
        if (cannon === 1 && s.ammo.length > 0) s.ammo.shift();
        if (dir < 0) dir += 360;
        dir = dir % 360;
        const x = s.x + idiv(baseVelX(dir) * SIDE_CANNON_OFFSET, 256);
        const y = s.y + idiv(baseVelY(dir) * SIDE_CANNON_OFFSET, 256);
        const vx = idiv(baseVelX(dir) * BALL_SPEED, 256);
        const vy = idiv(baseVelY(dir) * BALL_SPEED, 256);
        let st = 0;
        if (shipInvincible(s)) st = setBit(st, 1);
        if (golden) st = setBit(st, 4);
        this.add({
          code: 2, ref: ballRef, owner: s.owner, team: s.team, x, y, z: 500, dir: 0,
          params: [shooter, vx, vy, BALL_TTL, st], collided: false, hitDone: false, golden: Boolean(golden),
        } as Ball);
        return;
      }
      case 25:
      case 26: {
        const s = this.get(d[0]) as Ship | undefined;
        if (s) s.state = code === 25 ? setBit(s.state, BIT.INVINCIBLE) : clearBit(s.state, BIT.INVINCIBLE);
        return;
      }
      case 30: {
        const s = this.get(d[0]) as Ship | undefined;
        if (!s) return;
        s.state = clearBit(s.state, BIT.WRECK);
        s.blown = true;
        return;
      }
      case 39: {
        const board = [...this.objects.values()].find((o) => o.code === TYPE.SCOREBOARD);
        if (!board) return;
        const p = board.params;
        board.params = [p[0], p[1], p[2] + (d[0] === 1 ? 1 : 0), p[3] + (d[0] === 2 ? 1 : 0)];
        return;
      }
      default:
        // 10 wind, 12 splash, 32 timer, 33 idle warning...: no state the checksum sees.
        return;
    }
  }

  private loseHealth(s: Ship): void {
    if (testBit(s.state, BIT.DESTROYED)) return;
    s.health = Math.max(-1, s.health - 1);
    syncShip(s);
  }

  private awardScore(s: Ship, amount: number): void {
    if (amount === 0) return;
    s.gold = Math.max(0, s.gold + amount);
    syncShip(s);
  }

  private loseGold(s: Ship, amount: number): void {
    if (amount === 0) return;
    s.gold = Math.max(0, s.gold - amount);
    syncShip(s);
  }

  // ---- moves

  private shipCollides(s: Ship): boolean {
    if (this.stage.map.at(s.x, s.y) > 1) return true;
    for (const o of this.ships()) {
      if (o === s || o.blown) continue;
      const notCollidable = testBit(o.state, BIT.DESTROYED) && !testBit(o.state, BIT.WRECK);
      if (!notCollidable && tripleToTriple(s, o)) return true;
    }
    return false;
  }

  /** `CPiratesFactorShip.move` (whirlpools omitted: no stage defines one). */
  private moveShip(s: Ship): void {
    let state = s.state;
    const origX = s.x;
    const origY = s.y;
    const origDir = s.dir;
    let dir = s.dir;
    let px = s.x;
    let py = s.y;
    let vx = s.vx;
    let vy = s.vy;
    if (testBit(state, BIT.MOVE) && !testBit(state, BIT.DESTROYED)) {
      const navDir = angleFromComponents(s.navX - px, s.navY - py);
      const diff = dir - navDir;
      const abs = Math.abs(diff);
      if (abs < s.turn) dir = navDir;
      else if (abs < 180) dir = adjustDirection(dir, diff < 0 ? s.turn : -s.turn);
      else dir = adjustDirection(dir, diff < 0 ? -s.turn : s.turn);
      if (px > s.navX - NAV_STOP && px < s.navX + NAV_STOP && py > s.navY - NAV_STOP && py < s.navY + NAV_STOP) {
        state = clearBit(state, BIT.MOVE);
        vx = 0;
        vy = 0;
      } else {
        vx = idiv(baseVelX(dir) * s.speed, 256);
        vy = idiv(baseVelY(dir) * s.speed, 256);
        px += vx;
        py += vy;
      }
    }
    // WindAffects: every ship drifts with the wind.
    px += idiv(baseVelX(this.windDir) * this.windStrength, 256);
    py += idiv(baseVelY(this.windDir) * this.windStrength, 256);
    s.state = state;
    s.dir = dir;
    s.x = px;
    s.y = py;
    let colliding = false;
    if (!testBit(state, BIT.DESTROYED) || testBit(state, BIT.WRECK)) {
      colliding = this.shipCollides(s);
      if (testBit(state, BIT.MOVE) && colliding) {
        const half = idiv(s.speed, 2);
        for (const turn of [45, -45, 85, -85]) {
          const td = adjustDirection(dir, turn);
          s.x = origX + idiv(baseVelX(td) * half, 256);
          s.y = origY + idiv(baseVelY(td) * half, 256);
          colliding = this.shipCollides(s);
          if (!colliding) {
            px = s.x;
            py = s.y;
            break;
          }
        }
      }
    }
    if (colliding) {
      px = origX;
      py = origY;
      s.dir = origDir;
    }
    s.x = px;
    s.y = py;
    s.vx = px - origX;
    s.vy = py - origY;
    syncShip(s);
  }

  /** `CPiratesFactorCannonball.move`: hits are cosmetic on the client; the server decides them. */
  private moveBall(b: Ball, outcomes: Outcome[]): void {
    b.x += b.params[1];
    b.y += b.params[2];
    b.params[3] -= 1;
    if (this.stage.map.at(b.x, b.y) > 3) b.collided = true;
    const owner = this.get(b.params[0]);
    for (const s of this.ships()) {
      if (s === owner || s.blown) continue;
      const totallyDestroyed = testBit(s.state, BIT.DESTROYED) && !testBit(s.state, BIT.WRECK);
      if (totallyDestroyed) continue;
      // The ball's own `State` param is never set client-side, so it reads as
      // not invincible: it only meets ships that are not invincible either.
      if (shipInvincible(s)) continue;
      if (pointToTriple(b.x, b.y, s)) {
        b.collided = true;
        if (!b.hitDone) {
          b.hitDone = true;
          outcomes.push({ kind: "ballHitShip", ball: b, ship: s });
        }
      }
    }
    if (!b.hitDone && (b.collided || b.params[3] <= 0)) {
      b.hitDone = true;
      outcomes.push({ kind: "ballEnded", ball: b });
    }
  }

  /**
   * `CPiratesFactorPowerup.move`, in ship ref order.
   *
   * ⚠ FLAGS (type 3) overwrite `m_collided` for EVERY ship touching them: an
   * enemy without a flag sets it, anyone else clears it again, and the last
   * ship looked at wins. The client sweeps the flag at the end of the turn if
   * it is still set, so the taker is only known then — see `sweep`.
   */
  private movePowerup(p: Powerup, outcomes: Outcome[]): void {
    for (const s of this.ships()) {
      if (testBit(s.state, BIT.DESTROYED) || s.blown) continue;
      if (circleToTriple(p.x, p.y, POWERUP_RADIUS, s)) {
        if (p.params[0] === 3) {
          const takes = !carriesFlag(s) && s.team !== p.team;
          p.collided = takes;
          p.collector = takes ? s : null;
          continue;
        }
        if (!p.collided) {
          p.collided = true;
          p.collector = s;
          outcomes.push({ kind: "collect", powerup: p, ship: s });
        }
      }
    }
  }
}

// ---------------------------------------------------------------- turns

/**
 * Turn numbers whose seed is safe: `iterateSeed` must read the same in
 * Director and our runtime (see jungle-cruise.ts), and |seed| stays under 2^30
 * so seed + object sum never leaves Lingo's 32-bit integers.
 */
export function nextTurn(turn: number): { turn: number; seed: number } {
  for (;;) {
    turn = turn >= 8191 ? 1 : turn + 1;
    const seed = iterateSeed(turn);
    if (seed !== null && Math.abs(seed) < 2 ** 30) return { turn, seed };
  }
}

/** `2601` / tail of `2609`: `turn, checksum, nSub, per subturn (nEvents, (count, ints...)*)`. */
export function encodeTurn(turn: number, checksum: number, subturns: number[][][]): number[] {
  const out = [turn, checksum, subturns.length];
  for (const events of subturns) {
    out.push(events.length);
    for (const e of events) out.push(e.length, ...e);
  }
  return out;
}

/** One object as `2605`/`2609`/`2610` carry it: `count, type, ref, owner, team, x, y, z, dir, extras...`. */
export function encodeObject(o: GObj): number[] {
  return [8 + o.params.length, o.code, o.ref, o.owner, o.team, Math.trunc(o.x), Math.trunc(o.y), Math.trunc(o.z), Math.trunc(o.dir), ...o.params];
}

export { idiv, testBit };
