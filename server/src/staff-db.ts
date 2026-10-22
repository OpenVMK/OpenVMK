/**
 * Housekeeping (staff portal) persistence: the records a moderator needs that
 * the game itself never kept.
 *
 * Both servers import this — the MUS server WRITES most of it (chat, trades,
 * logins, calls for help) and enforces it (bans, mutes, trade bans); the asset
 * server's /hk portal READS it and records staff actions. Same file, same WAL
 * database, so a ban written by the portal is seen by the very next login.
 *
 * ⚠ Same cross-process DDL race as db.ts: both processes run these CREATEs at
 * import. `CREATE ... IF NOT EXISTS` is idempotent, so it is safe; anything
 * that ALTERs must swallow "already added by the other server".
 */
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { databasePath, db } from "./db.js";

/**
 * The shared secret the portal presents to the game server's /hk-bridge
 * endpoints (kick, alert, move…). Lives beside the database; whichever server
 * starts first creates it, `wx` making the other one read it instead.
 *
 * ⚠ The game server's HTTP port is also the client's socket port, reachable by
 * anyone who can play. Without this, "kick everyone" would be one curl away.
 */
let bridgeSecretCache: string | null = null;
export function bridgeSecret(): string {
  if (bridgeSecretCache) return bridgeSecretCache;
  const file = join(dirname(databasePath()), "hk-bridge.secret");
  try {
    writeFileSync(file, randomBytes(32).toString("hex"), { flag: "wx" });
  } catch {
    /* already there — created by the other server or an earlier run */
  }
  bridgeSecretCache = readFileSync(file, "utf8").trim();
  return bridgeSecretCache;
}

db.exec(`
  CREATE TABLE IF NOT EXISTS staff_bans (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    kind       TEXT    NOT NULL,          -- 'ban' | 'trade' | 'mute' | 'cfh'
    reason     TEXT    NOT NULL DEFAULT '',
    staff_id   INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL,
    expires_at INTEGER,                   -- NULL = permanent
    lifted_at  INTEGER,
    lifted_by  INTEGER
  );
  CREATE INDEX IF NOT EXISTS idx_staff_bans_user ON staff_bans(user_id, kind);

  CREATE TABLE IF NOT EXISTS chat_log (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    room       TEXT    NOT NULL DEFAULT '',  -- occupancy key: cast name or guest:<id>
    room_code  INTEGER,
    room_name  TEXT    NOT NULL DEFAULT '',
    kind       TEXT    NOT NULL DEFAULT 'chat', -- 'chat' | 'trade' | 'command' | 'system'
    message    TEXT    NOT NULL,
    target_id  INTEGER,                      -- trade chat partner
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_chat_log_user ON chat_log(user_id, created_at);
  CREATE INDEX IF NOT EXISTS idx_chat_log_room ON chat_log(room, created_at);
  CREATE INDEX IF NOT EXISTS idx_chat_log_time ON chat_log(created_at);

  CREATE TABLE IF NOT EXISTS trade_log (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_a     INTEGER NOT NULL,
    user_b     INTEGER NOT NULL,
    room       TEXT    NOT NULL DEFAULT '',
    items_a    TEXT    NOT NULL DEFAULT '[]', -- JSON [{id,typeCode,category}] A gave
    items_b    TEXT    NOT NULL DEFAULT '[]',
    remote_a   TEXT    NOT NULL DEFAULT '',
    remote_b   TEXT    NOT NULL DEFAULT '',
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_trade_log_a ON trade_log(user_a, created_at);
  CREATE INDEX IF NOT EXISTS idx_trade_log_b ON trade_log(user_b, created_at);

  CREATE TABLE IF NOT EXISTS login_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    source      TEXT    NOT NULL,          -- 'web' | 'game' | 'hk'
    ip          TEXT    NOT NULL DEFAULT '',
    machine_id  TEXT    NOT NULL DEFAULT '',
    user_agent  TEXT    NOT NULL DEFAULT '',
    created_at  INTEGER NOT NULL,
    ended_at    INTEGER
  );
  CREATE INDEX IF NOT EXISTS idx_login_log_user ON login_log(user_id, created_at);
  CREATE INDEX IF NOT EXISTS idx_login_log_ip   ON login_log(ip);
  CREATE INDEX IF NOT EXISTS idx_login_log_mid  ON login_log(machine_id);

  CREATE TABLE IF NOT EXISTS staff_notes (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    staff_id   INTEGER NOT NULL,
    note       TEXT    NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_staff_notes_user ON staff_notes(user_id);

  CREATE TABLE IF NOT EXISTS cfh_calls (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    reporter_id  INTEGER NOT NULL,
    category     INTEGER NOT NULL DEFAULT 0,
    message      TEXT    NOT NULL,
    reported     TEXT    NOT NULL DEFAULT '',  -- harasser name as typed
    reported_id  INTEGER,
    room         TEXT    NOT NULL DEFAULT '',
    room_name    TEXT    NOT NULL DEFAULT '',
    created_at   INTEGER NOT NULL,
    picked_by    INTEGER,
    picked_at    INTEGER,
    closed_by    INTEGER,
    closed_at    INTEGER,
    resolution   TEXT    NOT NULL DEFAULT ''
  );
  CREATE INDEX IF NOT EXISTS idx_cfh_open ON cfh_calls(closed_at, created_at);
  CREATE INDEX IF NOT EXISTS idx_cfh_reporter ON cfh_calls(reporter_id);

  CREATE TABLE IF NOT EXISTS inventory_snapshots (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    staff_id   INTEGER NOT NULL,
    items      TEXT    NOT NULL,          -- JSON rows as they were
    credits    INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    restored_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS staff_audit (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    staff_id   INTEGER NOT NULL,
    action     TEXT    NOT NULL,
    target_id  INTEGER,
    detail     TEXT    NOT NULL DEFAULT '',
    ip         TEXT    NOT NULL DEFAULT '',
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_staff_audit_time ON staff_audit(created_at);
  CREATE INDEX IF NOT EXISTS idx_staff_audit_target ON staff_audit(target_id);
`);

const now = () => Date.now();
type Row = Record<string, unknown>;

/* ----------------------------------------------------------------- sanctions */

export type SanctionKind = "ban" | "trade" | "mute" | "cfh";

export interface Sanction {
  id: number;
  userId: number;
  kind: SanctionKind;
  reason: string;
  staffId: number;
  createdAt: number;
  expiresAt: number | null;
  liftedAt: number | null;
  liftedBy: number | null;
}

function rowToSanction(r: Row): Sanction {
  return {
    id: Number(r.id),
    userId: Number(r.user_id),
    kind: String(r.kind) as SanctionKind,
    reason: String(r.reason ?? ""),
    staffId: Number(r.staff_id ?? 0),
    createdAt: Number(r.created_at),
    expiresAt: r.expires_at == null ? null : Number(r.expires_at),
    liftedAt: r.lifted_at == null ? null : Number(r.lifted_at),
    liftedBy: r.lifted_by == null ? null : Number(r.lifted_by),
  };
}

/** The sanction of this kind in force now, if any — the longest-running one wins. */
export function activeSanction(userId: number, kind: SanctionKind): Sanction | undefined {
  const row = db
    .prepare(
      `SELECT * FROM staff_bans WHERE user_id = ? AND kind = ? AND lifted_at IS NULL
         AND (expires_at IS NULL OR expires_at > ?)
       ORDER BY expires_at IS NULL DESC, expires_at DESC LIMIT 1`,
    )
    .get(userId, kind, now()) as Row | undefined;
  return row ? rowToSanction(row) : undefined;
}

export function addSanction(
  userId: number,
  kind: SanctionKind,
  reason: string,
  staffId: number,
  durationMs: number | null,
): Sanction {
  const at = now();
  const result = db
    .prepare(
      "INSERT INTO staff_bans (user_id, kind, reason, staff_id, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)",
    )
    .run(userId, kind, reason, staffId, at, durationMs === null ? null : at + durationMs);
  return rowToSanction(
    db.prepare("SELECT * FROM staff_bans WHERE id = ?").get(Number(result.lastInsertRowid)) as Row,
  );
}

/** Lift every active sanction of this kind. Returns how many were lifted. */
export function liftSanctions(userId: number, kind: SanctionKind, staffId: number): number {
  const result = db
    .prepare(
      `UPDATE staff_bans SET lifted_at = ?, lifted_by = ?
       WHERE user_id = ? AND kind = ? AND lifted_at IS NULL AND (expires_at IS NULL OR expires_at > ?)`,
    )
    .run(now(), staffId, userId, kind, now());
  return Number(result.changes);
}

export function sanctionHistory(userId: number): Sanction[] {
  return (
    db.prepare("SELECT * FROM staff_bans WHERE user_id = ? ORDER BY id DESC").all(userId) as Row[]
  ).map(rowToSanction);
}

/* ------------------------------------------------------------------ chat log */

export interface ChatLogEntry {
  userId: number;
  room?: string;
  roomCode?: number;
  roomName?: string;
  kind?: "chat" | "trade" | "command" | "system";
  message: string;
  targetId?: number;
}

/**
 * Never throws: a logging failure must not cost a player their chat line.
 */
export function logChat(e: ChatLogEntry): void {
  try {
    db.prepare(
      `INSERT INTO chat_log (user_id, room, room_code, room_name, kind, message, target_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      e.userId,
      e.room ?? "",
      e.roomCode ?? null,
      e.roomName ?? "",
      e.kind ?? "chat",
      e.message.slice(0, 1000),
      e.targetId ?? null,
      now(),
    );
  } catch (err) {
    console.warn("[staff-db] chat log write failed:", (err as Error).message);
  }
}

/* ----------------------------------------------------------------- trade log */

export interface LoggedItem {
  id: number;
  typeCode: number;
  category: number;
}

export function logTrade(
  a: number,
  b: number,
  room: string,
  itemsA: LoggedItem[],
  itemsB: LoggedItem[],
  remoteA = "",
  remoteB = "",
): void {
  try {
    db.prepare(
      `INSERT INTO trade_log (user_a, user_b, room, items_a, items_b, remote_a, remote_b, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(a, b, room, JSON.stringify(itemsA), JSON.stringify(itemsB), remoteA, remoteB, now());
  } catch (err) {
    console.warn("[staff-db] trade log write failed:", (err as Error).message);
  }
}

/* ----------------------------------------------------------------- login log */

export function logLogin(
  userId: number,
  source: "web" | "game" | "hk",
  ip: string,
  machineId = "",
  userAgent = "",
): number {
  try {
    const result = db
      .prepare(
        `INSERT INTO login_log (user_id, source, ip, machine_id, user_agent, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(userId, source, ip, machineId.slice(0, 200), userAgent.slice(0, 300), now());
    return Number(result.lastInsertRowid);
  } catch (err) {
    console.warn("[staff-db] login log write failed:", (err as Error).message);
    return 0;
  }
}

export function endLogin(id: number): void {
  if (!id) return;
  try {
    db.prepare("UPDATE login_log SET ended_at = ? WHERE id = ? AND ended_at IS NULL").run(now(), id);
  } catch {
    /* best effort */
  }
}

/** `host:port` -> `host`; IPv4-mapped IPv6 unwrapped. */
export function ipOf(remote: string | undefined): string {
  if (!remote) return "";
  let ip = remote.trim();
  const v6 = /^\[([^\]]+)\](?::\d+)?$/.exec(ip);
  if (v6) ip = v6[1];
  else if ((ip.match(/:/g) ?? []).length === 1) ip = ip.slice(0, ip.lastIndexOf(":"));
  return ip.replace(/^::ffff:/i, "");
}

/* --------------------------------------------------------------- call for help */

export function createCall(c: {
  reporterId: number;
  category: number;
  message: string;
  reported: string;
  reportedId?: number;
  room?: string;
  roomName?: string;
}): number {
  const result = db
    .prepare(
      `INSERT INTO cfh_calls (reporter_id, category, message, reported, reported_id, room, room_name, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      c.reporterId,
      c.category,
      c.message.slice(0, 2000),
      c.reported.slice(0, 64),
      c.reportedId ?? null,
      c.room ?? "",
      c.roomName ?? "",
      now(),
    );
  return Number(result.lastInsertRowid);
}

/* ----------------------------------------------------------------- audit log */

export function audit(staffId: number, action: string, targetId: number | null, detail = "", ip = ""): void {
  try {
    db.prepare(
      "INSERT INTO staff_audit (staff_id, action, target_id, detail, ip, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    ).run(staffId, action, targetId, detail.slice(0, 2000), ip, now());
  } catch (err) {
    console.warn("[staff-db] audit write failed:", (err as Error).message);
  }
}
