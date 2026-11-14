/**
 * Room Prize Dispensers: a staff-configured prize handed to a player as they
 * enter and/or leave a guest room (modelled on the Sword in the Stone pin).
 *
 * Not an item: the config is a row per guest room (`room_prizes`), edited with
 * `/dispenser` in game or Housekeeping's Prize Dispensers page. Both servers
 * open the same database and the game reads the row on every room change, so
 * a save needs no restart and no bridge call.
 *
 * This file only stores, validates, rolls and grants. Telling a connected
 * player (credits, inventory grid, staff mail) is mus-server.ts's job.
 */
import { ITEM_CATEGORY, addItems, db, getUserById, grantItemPair, grantItems, setCredits } from "./db.js";
import { itemName } from "./catalog.js";
import { isFurniture, isPairedTeleporter } from "./furni-footprint.js";

export type PrizeTrigger = "enter" | "exit" | "both";
export type DispenseEvent = "enter" | "exit";

export interface Prize {
  kind: "item" | "credits";
  /** Item type code; 0 for credits. */
  code: number;
  /** ITEM_CATEGORY value (1 furniture, 2 clothes, 3 posters, 4 pins); 0 for credits. */
  category: number;
  /** Copies of an item (PAIRS for a teleporter). */
  count: number;
  /** Credits; 0 for items. */
  amount: number;
  /** Relative likelihood among the room's prizes. */
  weight: number;
}

export interface PrizeConfig {
  roomId: number;
  enabled: boolean;
  trigger: PrizeTrigger;
  /** % chance that a roll gives anything at all. */
  chance: number;
  /** Minutes before the same player may roll again (0 = no wait). */
  cooldownMinutes: number;
  /** A player who has won once never rolls again. */
  oncePerPlayer: boolean;
  /** Staff-mail text; `%name%` and `%prize%` are replaced. Empty = DEFAULT_MESSAGE. */
  message: string;
  prizes: Prize[];
  updatedBy: number | null;
  updatedAt: number;
}

export const DEFAULT_MESSAGE = "Thanks for visiting, %name%! Here's %prize% for you.";

const MAX_PRIZES = 50;
const MAX_ITEM_COUNT = 100;
const MAX_CREDITS = 1_000_000;
const MAX_WEIGHT = 100_000;
const MAX_COOLDOWN_MIN = 60 * 24 * 365;
const MESSAGE_MAX = 240;

db.exec(`
  CREATE TABLE IF NOT EXISTS room_prizes (
    room_id         INTEGER PRIMARY KEY,           -- guest space id
    enabled         INTEGER NOT NULL DEFAULT 1,
    trigger_on      TEXT    NOT NULL DEFAULT 'exit',
    chance          INTEGER NOT NULL DEFAULT 100,
    cooldown_min    INTEGER NOT NULL DEFAULT 60,
    once_per_player INTEGER NOT NULL DEFAULT 0,
    message         TEXT    NOT NULL DEFAULT '',
    prizes_json     TEXT    NOT NULL DEFAULT '[]',
    updated_by      INTEGER,
    updated_at      INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS room_prize_claims (
    room_id      INTEGER NOT NULL,
    user_id      INTEGER NOT NULL,
    last_roll_at INTEGER NOT NULL,
    rolls        INTEGER NOT NULL DEFAULT 0,
    wins         INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (room_id, user_id)
  );
`);

type Row = Record<string, unknown>;

/** Inventory category for a code nobody classified. */
export function guessCategory(code: number): number {
  if (isFurniture(code)) return ITEM_CATEGORY.items;
  if (code >= 20000 && code < 50000) return ITEM_CATEGORY.clothes;
  if ((code >= 2000 && code < 3000) || (code >= 12000 && code < 13000)) return ITEM_CATEGORY.pins;
  if (code >= 3000 && code < 4000) return ITEM_CATEGORY.posters;
  return ITEM_CATEGORY.items;
}

export function defaultPrizeConfig(roomId: number): PrizeConfig {
  return {
    roomId,
    enabled: false,
    trigger: "exit",
    chance: 100,
    cooldownMinutes: 60,
    oncePerPlayer: false,
    message: "",
    prizes: [],
    updatedBy: null,
    updatedAt: 0,
  };
}

/* --------------------------------------------------------------- validation */

/**
 * Check and normalise a configuration from untrusted input (the /hk POST) or
 * from the in-game command. Throws an Error whose message is fit to show staff.
 */
export function parsePrizeDraft(roomId: number, input: unknown): Omit<PrizeConfig, "updatedBy" | "updatedAt"> {
  if (!input || typeof input !== "object") throw new Error("Bad configuration.");
  const c = input as Record<string, unknown>;
  const whole = (v: unknown, what: string, min: number, max: number): number => {
    const n = typeof v === "string" && v.trim() === "" ? NaN : Number(v);
    if (!Number.isInteger(n) || n < min || n > max) throw new Error(`${what} must be a whole number from ${min} to ${max}.`);
    return n;
  };

  const trigger = c.trigger;
  if (trigger !== "enter" && trigger !== "exit" && trigger !== "both") {
    throw new Error('The trigger must be "enter", "exit" or "both".');
  }
  if (!Array.isArray(c.prizes) || c.prizes.length > MAX_PRIZES) {
    throw new Error(`A dispenser holds at most ${MAX_PRIZES} prizes.`);
  }
  const prizes = (c.prizes as unknown[]).map((raw, i): Prize => {
    const at = `Prize ${i + 1}`;
    if (!raw || typeof raw !== "object") throw new Error(`${at} is malformed.`);
    const p = raw as Record<string, unknown>;
    const weight = whole(p.weight, `${at}: weight`, 1, MAX_WEIGHT);
    if (p.kind === "credits") {
      return { kind: "credits", code: 0, category: 0, count: 1, amount: whole(p.amount, `${at}: credits`, 1, MAX_CREDITS), weight };
    }
    if (p.kind !== "item") throw new Error(`${at}: kind must be "item" or "credits".`);
    const code = whole(p.code, `${at}: item code`, 1, 999_999);
    const cat = Number(p.category);
    const category = Number.isInteger(cat) && cat >= 1 && cat <= 4 ? cat : guessCategory(code);
    return { kind: "item", code, category, count: whole(p.count ?? 1, `${at}: count`, 1, MAX_ITEM_COUNT), amount: 0, weight };
  });
  const enabled = c.enabled === true;
  if (enabled && prizes.length === 0) throw new Error("Add at least one prize before turning the dispenser on.");

  return {
    roomId,
    enabled,
    trigger,
    chance: whole(c.chance, "Chance", 0, 100),
    cooldownMinutes: whole(c.cooldownMinutes, "Cooldown", 0, MAX_COOLDOWN_MIN),
    oncePerPlayer: c.oncePerPlayer === true,
    message: typeof c.message === "string" ? c.message.trim().slice(0, MESSAGE_MAX) : "",
    prizes,
  };
}

/* ------------------------------------------------------------------ storage */

function rowToConfig(r: Row): PrizeConfig {
  let prizes: Prize[] = [];
  try {
    const parsed: unknown = JSON.parse(String(r.prizes_json));
    if (Array.isArray(parsed)) prizes = parsed as Prize[];
  } catch {
    /* a damaged row gives nothing rather than crashing a room change */
  }
  const trigger = String(r.trigger_on);
  return {
    roomId: Number(r.room_id),
    enabled: Number(r.enabled) === 1,
    trigger: trigger === "enter" || trigger === "both" ? trigger : "exit",
    chance: Number(r.chance),
    cooldownMinutes: Number(r.cooldown_min),
    oncePerPlayer: Number(r.once_per_player) === 1,
    message: String(r.message ?? ""),
    prizes,
    updatedBy: r.updated_by == null ? null : Number(r.updated_by),
    updatedAt: Number(r.updated_at),
  };
}

export function getPrizeConfig(roomId: number): PrizeConfig | undefined {
  const row = db.prepare("SELECT * FROM room_prizes WHERE room_id = ?").get(roomId) as Row | undefined;
  return row ? rowToConfig(row) : undefined;
}

export function listPrizeConfigs(): PrizeConfig[] {
  return (db.prepare("SELECT * FROM room_prizes ORDER BY updated_at DESC").all() as Row[]).map(rowToConfig);
}

/** Validate `input` and store it. Throws a staff-readable Error when it is not acceptable. */
export function savePrizeConfig(roomId: number, input: unknown, staffId: number | null): PrizeConfig {
  const c = parsePrizeDraft(roomId, input);
  const at = Date.now();
  db.prepare(
    `INSERT INTO room_prizes (room_id, enabled, trigger_on, chance, cooldown_min, once_per_player, message, prizes_json, updated_by, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(room_id) DO UPDATE SET
       enabled = excluded.enabled, trigger_on = excluded.trigger_on, chance = excluded.chance,
       cooldown_min = excluded.cooldown_min, once_per_player = excluded.once_per_player,
       message = excluded.message, prizes_json = excluded.prizes_json,
       updated_by = excluded.updated_by, updated_at = excluded.updated_at`,
  ).run(
    roomId,
    c.enabled ? 1 : 0,
    c.trigger,
    c.chance,
    c.cooldownMinutes,
    c.oncePerPlayer ? 1 : 0,
    c.message,
    JSON.stringify(c.prizes),
    staffId,
    at,
  );
  return { ...c, updatedBy: staffId, updatedAt: at };
}

/** Remove a room's dispenser and everyone's claim history with it. */
export function deletePrizeConfig(roomId: number): boolean {
  db.prepare("DELETE FROM room_prize_claims WHERE room_id = ?").run(roomId);
  return Number(db.prepare("DELETE FROM room_prizes WHERE room_id = ?").run(roomId).changes) > 0;
}

/** Forget who has rolled, so cooldowns and once-per-player start fresh. Returns the records cleared. */
export function resetClaims(roomId: number): number {
  return Number(db.prepare("DELETE FROM room_prize_claims WHERE room_id = ?").run(roomId).changes);
}

export function claimStats(roomId: number): { players: number; rolls: number; wins: number } {
  const r = db
    .prepare(
      "SELECT COUNT(*) AS players, COALESCE(SUM(rolls), 0) AS rolls, COALESCE(SUM(wins), 0) AS wins FROM room_prize_claims WHERE room_id = ?",
    )
    .get(roomId) as Row;
  return { players: Number(r.players), rolls: Number(r.rolls), wins: Number(r.wins) };
}

/* ------------------------------------------------------------------ wording */

/** What the player is told they got. */
export function prizeText(p: Prize): string {
  if (p.kind === "credits") return `${p.amount} credits`;
  const name = itemName(p.code);
  return p.count > 1 ? `${p.count} x ${name}` : name;
}

/** What staff see: includes the code. */
export function prizeLabel(p: Prize): string {
  return p.kind === "credits" ? `${p.amount} credits` : `${p.count > 1 ? `${p.count} x ` : ""}${itemName(p.code)} [${p.code}]`;
}

/** Summary lines for the /dispenser dialog and the staff audit. */
export function describePrizes(cfg: PrizeConfig): string[] {
  const total = cfg.prizes.reduce((n, p) => n + p.weight, 0);
  const lines = [
    `${cfg.enabled ? "ON" : "OFF"} - on ${cfg.trigger} - ${cfg.chance}% chance - ` +
      `cooldown ${cfg.cooldownMinutes} min${cfg.oncePerPlayer ? " - once per player" : ""}`,
  ];
  cfg.prizes.forEach((p, i) => {
    const odds = total > 0 ? ((cfg.chance * p.weight) / total).toFixed(1) : "0";
    lines.push(`${i + 1}. ${prizeLabel(p)} (weight ${p.weight}, ${odds}%)`);
  });
  if (cfg.prizes.length === 0) lines.push("no prizes yet: /dispenser add item <code> [count] [weight]");
  return lines;
}

/* ------------------------------------------------------------ roll + grant */

export function rollPrize(cfg: PrizeConfig, ignoreChance = false): Prize | null {
  if (cfg.prizes.length === 0) return null;
  if (!ignoreChance && Math.random() * 100 >= cfg.chance) return null;
  const total = cfg.prizes.reduce((n, p) => n + p.weight, 0);
  let pick = Math.random() * total;
  for (const p of cfg.prizes) {
    pick -= p.weight;
    if (pick < 0) return p;
  }
  return cfg.prizes[cfg.prizes.length - 1];
}

export interface Granted {
  /** The prize as the player is told of it. */
  text: string;
  /** New credit balance, when credits were given. */
  credits?: number;
  /** Something landed in the inventory. */
  items: boolean;
  /** A garment they already owned (clothing cannot be held twice). */
  duplicate?: boolean;
}

function grantPrize(userId: number, p: Prize, roomId: number): Granted {
  if (p.kind === "credits") {
    const balance = (getUserById(userId)?.credits ?? 0) + p.amount;
    setCredits(userId, balance, `Prize Dispenser (room ${roomId})`);
    return { text: prizeText(p), credits: balance, items: false };
  }
  if (p.category === ITEM_CATEGORY.clothes) {
    const added = grantItems(userId, [p.code], p.category);
    return { text: prizeText(p), items: added > 0, duplicate: added === 0 };
  }
  if (p.category === ITEM_CATEGORY.items && isPairedTeleporter(p.code)) {
    // Teleporters only exist as linked pairs; `count` is pairs.
    for (let i = 0; i < p.count; i++) grantItemPair(userId, p.code, p.category);
    return { text: prizeText(p), items: true };
  }
  addItems(userId, Array<number>(p.count).fill(p.code), p.category);
  return { text: prizeText(p), items: true };
}

export interface Dispensed {
  prize: Prize;
  granted: Granted;
  /** The finished staff-mail text. */
  message: string;
}

function deliver(cfg: PrizeConfig, prize: Prize, userId: number, name: string): Dispensed {
  const granted = grantPrize(userId, prize, cfg.roomId);
  const message =
    (cfg.message || DEFAULT_MESSAGE).replace(/%name%/gi, () => name).replace(/%prize%/gi, () => granted.text) +
    (granted.duplicate ? " (You already owned it.)" : "");
  return { prize, granted, message };
}

/**
 * A player entered or left `roomId`. Applies every rule (on/off, trigger,
 * owner, once, cooldown, chance) and, if they win, grants the prize and
 * returns what to tell them. Null: nothing for them this time.
 */
export function tryDispense(
  roomId: number,
  userId: number,
  name: string,
  event: DispenseEvent,
  ownerId?: number,
): Dispensed | null {
  const cfg = getPrizeConfig(roomId);
  if (!cfg || !cfg.enabled || cfg.prizes.length === 0) return null;
  if (cfg.trigger !== "both" && cfg.trigger !== event) return null;
  if (ownerId === userId) return null;

  const now = Date.now();
  const claim = db
    .prepare("SELECT last_roll_at, wins FROM room_prize_claims WHERE room_id = ? AND user_id = ?")
    .get(roomId, userId) as Row | undefined;
  if (claim) {
    if (cfg.oncePerPlayer && Number(claim.wins) > 0) return null;
    if (cfg.cooldownMinutes > 0 && now - Number(claim.last_roll_at) < cfg.cooldownMinutes * 60_000) return null;
  }

  const prize = rollPrize(cfg);
  // Misses count as rolls, or hopping in and out would farm the odds.
  db.prepare(
    `INSERT INTO room_prize_claims (room_id, user_id, last_roll_at, rolls, wins) VALUES (?, ?, ?, 1, ?)
     ON CONFLICT(room_id, user_id) DO UPDATE SET
       last_roll_at = excluded.last_roll_at, rolls = rolls + 1, wins = wins + excluded.wins`,
  ).run(roomId, userId, now, prize ? 1 : 0);
  return prize ? deliver(cfg, prize, userId, name) : null;
}

/** `/dispenser test`: a prize for `userId` whatever the rules say; nothing is recorded. */
export function testDispense(roomId: number, userId: number, name: string): Dispensed | null {
  const cfg = getPrizeConfig(roomId);
  if (!cfg) return null;
  const prize = rollPrize(cfg, true);
  return prize ? deliver(cfg, prize, userId, name) : null;
}
