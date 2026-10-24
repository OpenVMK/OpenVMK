/**
 * Persistence for the VMK private server.
 *
 * Uses node:sqlite (built into Node 22+) rather than better-sqlite3 so that
 * cloning the repo needs no native toolchain -- node-gyp on Windows is a real
 * barrier for something people are meant to just run. node:sqlite is still
 * flagged experimental, so ALL SQL lives in this module: swapping the driver
 * later means rewriting this file and nothing else.
 *
 * Schema notes:
 *   users.has_character  selects the client's login state -- 0 sends the player
 *                        through VMK's own avatar creation (message 2018 state
 *                        1), 1 goes straight to the navigator (state 0).
 *   tickets              one-shot, short-lived, and the ONLY thing the client
 *                        embed carries. A ticket is evidence that someone
 *                        authenticated; it is not a credential to be reused.
 */
import { DatabaseSync } from "node:sqlite";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DATA_DIR = process.env.VMK_DATA_DIR ?? join(ROOT, "data");
const DB_PATH = process.env.VMK_DB ?? join(DATA_DIR, "vmk.db");

mkdirSync(DATA_DIR, { recursive: true });

/**
 * A brand-new database gets every column through the upgrade steps below, and
 * announcing each one reads like a list of problems on someone's first run.
 * Only an EXISTING database being upgraded is worth a line.
 */
const FRESH_DB = !existsSync(DB_PATH);
const logMigration = (message: string): void => {
  if (!FRESH_DB) console.log(message);
};

export const db = new DatabaseSync(DB_PATH);

// ⚠ MUST come before `journal_mode`. The asset server and the MUS server are
// separate processes opening the SAME file, and `npm start` launches them
// together — so they race here. Switching journal mode needs a brief exclusive
// lock, and without a busy timeout the loser does not wait, it throws
// `ERR_SQLITE_ERROR: database is locked` at import time and the whole process
// dies before it ever listens. That is exactly how the HTTP server on 5199
// silently failed to come up while the MUS server on 8080 started fine.
db.exec("PRAGMA busy_timeout = 5000");
// ⚠ ...and the busy timeout is NOT enough on a BRAND-NEW file. While the other
// process is still creating the database, SQLite can refuse the switch to WAL
// with SQLITE_BUSY straight away instead of waiting. The game server then died
// with "database is locked" on the very first start of a fresh release — every
// new player's first run — whenever the two servers happened to collide. Retry
// briefly: the other side finishes in milliseconds.
for (let attempt = 1; ; attempt++) {
  try {
    db.exec("PRAGMA journal_mode = WAL");
    break;
  } catch (err) {
    const busy = (err as { errcode?: number }).errcode === 5 || /locked|busy/i.test(String(err));
    if (!busy || attempt >= 50) throw err;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100); // sleep 100 ms
  }
}
db.exec("PRAGMA foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    username       TEXT    NOT NULL UNIQUE COLLATE NOCASE,
    password_hash  TEXT    NOT NULL,
    password_salt  TEXT    NOT NULL,
    created_at     INTEGER NOT NULL,
    last_login_at  INTEGER,
    character_name TEXT,
    has_character  INTEGER NOT NULL DEFAULT 0,
    outfit_json    TEXT,
    credits        INTEGER NOT NULL DEFAULT 0,
    permissions    TEXT    NOT NULL DEFAULT '',
    badges         TEXT    NOT NULL DEFAULT '',
    slogan_json    TEXT    NOT NULL DEFAULT '',
    slogan_text    TEXT    NOT NULL DEFAULT '',
    set_fx         INTEGER NOT NULL DEFAULT 1,
    set_music      INTEGER NOT NULL DEFAULT 1,
    set_ui         INTEGER NOT NULL DEFAULT 1,
    set_volume     INTEGER NOT NULL DEFAULT 100,
    set_tutorial   INTEGER NOT NULL DEFAULT 0,
    set_trade      INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token      TEXT    PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tickets (
    ticket      TEXT    PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    issued_at   INTEGER NOT NULL,
    expires_at  INTEGER NOT NULL,
    consumed_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS rooms (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    style        INTEGER NOT NULL,
    name         TEXT    NOT NULL,
    description  TEXT    NOT NULL DEFAULT '',
    friends_only INTEGER NOT NULL DEFAULT 0,
    created_at   INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS items (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type_code  INTEGER NOT NULL,
    category   INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_sessions_user  ON sessions(user_id);
  CREATE INDEX IF NOT EXISTS idx_tickets_user   ON tickets(user_id);
  CREATE INDEX IF NOT EXISTS idx_rooms_owner    ON rooms(owner_id);
  CREATE INDEX IF NOT EXISTS idx_items_owner    ON items(owner_id);
`);

/**
 * Guard against an incompatible pre-existing database.
 *
 * `CREATE TABLE IF NOT EXISTS` is silent when a table already exists with a
 * DIFFERENT shape -- so an old file leaves you with a schema that looks fine at
 * boot and throws on the first insert instead. That is exactly what happened
 * here: the dropped packages/server prototype wrote to this same
 * `data/vmk.db` path with a `users` table that had no `password_salt`, and the
 * server started cleanly and then died on the first login with
 * "table users has no column named password_salt".
 *
 * Fail at startup, with the fix in the message, rather than at first use.
 */
{
  const columns = db.prepare("PRAGMA table_info(users)").all() as Array<{ name: string }>;
  const names = new Set(columns.map((c) => String(c.name)));
  const required = ["username", "password_hash", "password_salt", "has_character"];
  const missing = required.filter((c) => !names.has(c));
  if (columns.length > 0 && missing.length > 0) {
    throw new Error(
      `Incompatible database at ${DB_PATH}\n` +
        `  the "users" table is missing: ${missing.join(", ")}\n` +
        `  This is almost certainly a leftover from the old packages/server prototype,\n` +
        `  which used the same filename. Delete the file (there is nothing in it worth\n` +
        `  keeping) and start again:\n\n` +
        `      del "${DB_PATH}"\n`,
    );
  }
}

/**
 * Add columns to `rooms` that a database created by an earlier build lacks.
 *
 * ⚠ `CREATE TABLE IF NOT EXISTS` does NOTHING to a table that already exists,
 * so a new column never appears in a database someone has already used — and
 * the failure is a runtime "no such column", not a startup error. Same trap the
 * `users` guard above exists for; here we can just add the column.
 */
{
  const columns = db.prepare("PRAGMA table_info(rooms)").all() as Array<{ name: string }>;
  const names = new Set(columns.map((c) => String(c.name)));
  if (columns.length > 0 && !names.has("friends_only")) {
    db.exec("ALTER TABLE rooms ADD COLUMN friends_only INTEGER NOT NULL DEFAULT 0");
    logMigration("[db] rooms: added missing column friends_only");
  }
}

{
  const columns = db.prepare("PRAGMA table_info(users)").all() as Array<{ name: string }>;
  const names = new Set(columns.map((c) => String(c.name)));
  if (columns.length > 0 && !names.has("permissions")) {
    db.exec("ALTER TABLE users ADD COLUMN permissions TEXT NOT NULL DEFAULT ''");
    logMigration("[db] users: added missing column permissions");
  }
  if (columns.length > 0 && !names.has("badges")) {
    db.exec("ALTER TABLE users ADD COLUMN badges TEXT NOT NULL DEFAULT ''");
    logMigration("[db] users: added missing column badges");
  }
  for (const col of ["slogan_json", "slogan_text"]) {
    if (columns.length > 0 && !names.has(col)) {
      db.exec(`ALTER TABLE users ADD COLUMN ${col} TEXT NOT NULL DEFAULT ''`);
      logMigration(`[db] users: added missing column ${col}`);
    }
  }
  // Settings, with the same defaults the client used to be told unconditionally.
  //
  // ⚠ The check-then-add is NOT safe across processes. `npm start` launches the
  // asset and MUS servers together and both run this: one reads PRAGMA, sees a
  // column missing, the other adds it first, and the loser's ALTER fails with
  // `SQL logic error` at import — killing that server before it ever listens.
  // Adding the column is the goal, so "someone else already did it" is success.
  for (const [col, def] of [
    ["set_fx", 1], ["set_music", 1], ["set_ui", 1],
    ["set_volume", 100], ["set_tutorial", 0], ["set_trade", 1],
  ] as Array<[string, number]>) {
    if (columns.length > 0 && !names.has(col)) {
      try {
        db.exec(`ALTER TABLE users ADD COLUMN ${col} INTEGER NOT NULL DEFAULT ${def}`);
        logMigration(`[db] users: added missing column ${col}`);
      } catch {
        /* added concurrently by the other server — nothing to do */
      }
    }
  }
}

/**
 * The messenger: friendships, pending requests, ignores and the inbox.
 *
 * `friendships` stores BOTH directions of each pair, so "my friends" is one
 * indexed lookup and removing a friend is two deletes. `messages` holds both
 * kinds the inbox shows — staff/system messages (`sender_id` 0, plain text) and
 * friend IMs (canned-text TOKENS as JSON, which the client resolves itself) —
 * because the client files them in one inbox under one id space: deleting a
 * message there sends `543` with its id whichever kind it was.
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS friendships (
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    friend_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, friend_id)
  );

  CREATE TABLE IF NOT EXISTS friend_requests (
    requester_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at   INTEGER NOT NULL,
    PRIMARY KEY (requester_id, target_id)
  );

  CREATE TABLE IF NOT EXISTS friend_ignores (
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ignored_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, ignored_id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    recipient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sender_id    INTEGER NOT NULL DEFAULT 0,
    kind         TEXT    NOT NULL,
    content      TEXT    NOT NULL,
    created_at   INTEGER NOT NULL,
    read_at      INTEGER
  );

  CREATE INDEX IF NOT EXISTS idx_friend_requests_target ON friend_requests(target_id);
  CREATE INDEX IF NOT EXISTS idx_messages_recipient     ON messages(recipient_id, read_at);
`);

// Pirates of the Caribbean: game wins per level, and whether Captain
// Blackheart has let the player onto level 3 ("win 10 times on level 2 and
// then visit Captain Blackheart").
db.exec(`
  CREATE TABLE IF NOT EXISTS potc_progress (
    user_id   INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    wins1     INTEGER NOT NULL DEFAULT 0,
    wins2     INTEGER NOT NULL DEFAULT 0,
    wins3     INTEGER NOT NULL DEFAULT 0,
    level3_at INTEGER
  );
  -- Wins per level AND game mode (1 CTF, 2 Ship Battle): treasure keys count
  -- "three games on a given level for a given type of game" (wiki).
  CREATE TABLE IF NOT EXISTS potc_wins (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    level   INTEGER NOT NULL,
    mode    INTEGER NOT NULL,
    wins    INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, level, mode)
  );
`);

// When each player last collected from each NPC — the 12-hour reward clock.
db.exec(`
  CREATE TABLE IF NOT EXISTS npc_visits (
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    npc_code    INTEGER NOT NULL,
    first_at    INTEGER NOT NULL,
    rewarded_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, npc_code)
  );
`);

{
  // Staff-featured guest rooms: the Popular tab's first list, drawn with the
  // Mickey (`eventroom_icon`) at the top. No client UI sets it — staff do.
  const columns = db.prepare("PRAGMA table_info(rooms)").all() as Array<{ name: string }>;
  if (columns.length > 0 && !columns.some((c) => String(c.name) === "featured")) {
    try {
      db.exec("ALTER TABLE rooms ADD COLUMN featured INTEGER NOT NULL DEFAULT 0");
      logMigration("[db] rooms: added missing column featured");
    } catch {
      /* added concurrently by the other server — nothing to do */
    }
  }
}

{
  // Room tickets are pins (`items` rows) that remember WHICH room they open and
  // WHEN they stop working. NULL on every ordinary item.
  const columns = db.prepare("PRAGMA table_info(items)").all() as Array<{ name: string }>;
  // `worn`: a pin on the lanyard (inventory 3, max 15). `level`: a magic pin's
  // stars, 1-5, raised by combining; NULL on everything else.
  for (const col of ["room_id", "expires_at", "used_at", "worn", "level"]) {
    if (columns.length > 0 && !columns.some((c) => String(c.name) === col)) {
      try {
        db.exec(`ALTER TABLE items ADD COLUMN ${col} INTEGER`);
        logMigration(`[db] items: added missing column ${col}`);
      } catch {
        /* added concurrently by the other server — nothing to do */
      }
    }
  }
}

{
  // When a friend was last online, for the "last seen" line of an offline
  // friend. Same cross-process race as the settings columns above.
  const columns = db.prepare("PRAGMA table_info(users)").all() as Array<{ name: string }>;
  if (columns.length > 0 && !columns.some((c) => String(c.name) === "last_seen_at")) {
    try {
      db.exec("ALTER TABLE users ADD COLUMN last_seen_at INTEGER");
      logMigration("[db] users: added missing column last_seen_at");
    } catch {
      /* added concurrently by the other server — nothing to do */
    }
  }
}

export interface User {
  id: number;
  username: string;
  character_name: string | null;
  has_character: number;
  credits: number;
  /** Moderator permission indices; empty for an ordinary player. See `PERMISSIONS`. */
  permissions: number[];
}

/**
 * VMK's moderator permissions, IN ORDER — the index is the wire value.
 *
 * `CModeratorToolInterface.ShowModsWindow` holds this exact list and maps the
 * integers from `2510 SetName` through it by position, so the order is protocol,
 * not preference. `_CheckPermissions` then looks the resulting NAMES up to
 * enable each control.
 *
 * ⚠ `SetName` only stores the list `if t_iDatacount > 0`, and `ShowModsWindow`
 * returns 0 unless the session key exists. So sending a count of zero is not
 * "a moderator with no powers" — it is an ordinary player with no mod button.
 */
export const PERMISSIONS = [
  "alert",
  "kick",
  "ban",
  "mute",
  "roomalert",
  "roomkick",
  "roomban",
  "roommute",
  "forcenamechange",
  "searchAnyRoom",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

/** Wire value for a permission name (1-based, as the client indexes it). */
export function permissionIndex(name: Permission): number {
  return PERMISSIONS.indexOf(name) + 1;
}

/** Every permission — what "admin" means until finer roles are needed. */
export const ALL_PERMISSIONS: number[] = PERMISSIONS.map((_, i) => i + 1);

/**
 * The badge codes the client can actually draw.
 *
 * `CRoomAvatarProfile.select` renders each one as
 * `getMember("badge_" & code).image` with NO guard, so an unknown code is not
 * ignored — it throws inside the profile panel. The set below is every
 * `badge_*` member in the interface atlas
 * (`assets/interface/interface/c98d9f2a0506fe2.png.json`).
 *
 * ⚠ There is no `badge_2`. The sequence really does skip it.
 */
export const BADGE_CODES = [1, 3, 4, 5, 6, 7, 8] as const;

/** The profile draws `icon.type.1`..`icon.type.4` and stops — see the `i > 4` break. */
export const MAX_BADGES = 4;

function parseBadges(raw: unknown): number[] {
  if (typeof raw !== "string" || raw.trim() === "") return [];
  return raw
    .split(",")
    .map((b) => Number(b.trim()))
    .filter((b) => (BADGE_CODES as readonly number[]).includes(b))
    .slice(0, MAX_BADGES);
}

export function getBadges(userId: number): number[] {
  const row = db.prepare("SELECT badges FROM users WHERE id = ?").get(userId) as
    | { badges: unknown }
    | undefined;
  return row ? parseBadges(row.badges) : [];
}

/**
 * Replace a user's badges. Unknown codes are DROPPED rather than stored —
 * letting one through would break the profile panel for everyone who clicks
 * this avatar, not just for the owner.
 */
export function setBadges(userId: number, badges: number[]): number[] {
  const clean = [...new Set(badges)]
    .filter((b) => (BADGE_CODES as readonly number[]).includes(b))
    .sort((a, b) => a - b)
    .slice(0, MAX_BADGES);
  db.prepare("UPDATE users SET badges = ? WHERE id = ?").run(clean.join(","), userId);
  return clean;
}

function parsePermissions(raw: unknown): number[] {
  if (typeof raw !== "string" || raw.trim() === "") return [];
  return raw
    .split(",")
    .map((p) => Number(p.trim()))
    // Anything outside the table would be silently dropped by the client's
    // `if t_iListCount >= t_ar_Permissions[i]` bounds check anyway.
    .filter((p) => Number.isInteger(p) && p >= 1 && p <= PERMISSIONS.length);
}

/**
 * The signature, stored in BOTH representations because the protocol needs
 * both and neither can be derived from the other.
 *
 * `506 ChangeSlogan` delivers canned TOKENS. Dictionary words arrive as indices
 * into the client's *expanded* word list, which the server cannot resolve back
 * to text — so flattening to a string here would destroy every ordinary word.
 * The token JSON is therefore the source of truth, replayed verbatim to
 * `2506 AvatarSlogan` (the profile `DESC`) with perfect fidelity.
 *
 * `2505 AvatarData` wants a plain string for the edit field, and that is the
 * one place the round trip is lossy: `slogan_text` is a best-effort rendering,
 * so a signature containing dictionary words may come back into the edit box
 * imperfectly. Displaying it is always correct; only re-editing is affected.
 */
export interface StoredSlogan {
  /** JSON-encoded ChatToken[] — replay this, never the text. */
  json: string;
  /** Best-effort flattening, for the fields that demand a bare string. */
  text: string;
}

export function getSlogan(userId: number): StoredSlogan {
  const row = db.prepare("SELECT slogan_json, slogan_text FROM users WHERE id = ?").get(userId) as
    | { slogan_json: unknown; slogan_text: unknown }
    | undefined;
  return {
    json: typeof row?.slogan_json === "string" ? row.slogan_json : "",
    text: typeof row?.slogan_text === "string" ? row.slogan_text : "",
  };
}

export function setSlogan(userId: number, json: string, text: string): void {
  db.prepare("UPDATE users SET slogan_json = ?, slogan_text = ? WHERE id = ?").run(json, text, userId);
}

/**
 * Furniture placed in a room.
 *
 * `room` is the OCCUPANCY key (`guest:<id>` for a guest room, the cast name for
 * a public one), so a guest room's contents follow the room and not the style
 * it was built from.
 *
 * ⚠ `ref` is the client's element id and must be unique WITHIN a room — the
 * client indexes elements by it. A single global AUTOINCREMENT gives that for
 * free, but it must stay clear of the block the seat markers use
 * (`SEAT_REF_BASE`, 900000), or a seat and a chair would collide.
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS room_items (
    ref       INTEGER PRIMARY KEY AUTOINCREMENT,
    room      TEXT    NOT NULL,
    owner_id  INTEGER REFERENCES users(id) ON DELETE SET NULL,
    type_code INTEGER NOT NULL,
    tile      INTEGER NOT NULL,
    dir       INTEGER NOT NULL DEFAULT 1,
    state     INTEGER NOT NULL DEFAULT 0,
    placed_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS room_items_room ON room_items(room);
`);

{
  /**
   * Teleporter pairs. Two rows share a `pair_id`, one with `pair_half` 0 and one
   * with 1, and keep both as they move between the inventory (`items`) and a
   * room (`room_items`). The wiki's rule: "entering one will always send you to
   * the other in the pair", and a pair can never be re-linked. NULL on every
   * ordinary item.
   */
  for (const table of ["items", "room_items"]) {
    const columns = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
    for (const col of ["pair_id", "pair_half"]) {
      if (columns.length > 0 && !columns.some((c) => String(c.name) === col)) {
        try {
          db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} INTEGER`);
          logMigration(`[db] ${table}: added missing column ${col}`);
        } catch {
          /* added concurrently by the other server — nothing to do */
        }
      }
    }
  }
  /**
   * Posters share `room_items` with furniture so refs stay unique across both:
   * `521 PickItem` identifies what to take down by ref alone. `category` is
   * NULL/1 for furniture and 3 for a poster, whose `tile` is then the WALL ref
   * and `pos_x/y/z` its position on that wall (`CRoomFactorPoster.PlaceTo`).
   */
  const columns = db.prepare("PRAGMA table_info(room_items)").all() as Array<{ name: string }>;
  // `guest_move`: the owner's "Let guests move this item" (813). NULL/0 = no.
  for (const col of ["category", "pos_x", "pos_y", "pos_z", "guest_move"]) {
    if (columns.length > 0 && !columns.some((c) => String(c.name) === col)) {
      try {
        db.exec(`ALTER TABLE room_items ADD COLUMN ${col} INTEGER`);
        logMigration(`[db] room_items: added missing column ${col}`);
      } catch {
        /* added concurrently by the other server — nothing to do */
      }
    }
  }
  // Configurable furniture (turnstiles and friends) keeps its settings here as
  // JSON key/value, because the wire protocol is key/value STRINGS and the set
  // of keys differs per item class — `fee` and `credits` for a turnstile.
  //
  // ⚠ Must run AFTER the CREATE above. It used to sit with the `users` checks
  // near the top, where a fresh database has no `room_items` yet — so the check
  // skipped, the CREATE then built the table without it, and the game server
  // died at startup in seedDarkRides with "no such column: config_json".
  if (columns.length > 0 && !columns.some((c) => String(c.name) === "config_json")) {
    try {
      db.exec("ALTER TABLE room_items ADD COLUMN config_json TEXT NOT NULL DEFAULT ''");
      logMigration("[db] room_items: added missing column config_json");
    } catch {
      /* added concurrently by the other server — nothing to do */
    }
  }
}

/** `room_items.category` for a poster hung on a wall. */
const POSTER_CATEGORY = 3;
/** Matches furniture rows: everything that is not a poster. */
const FURNITURE_ROWS = `(category IS NULL OR category <> ${POSTER_CATEGORY})`;

export interface RoomPoster {
  ref: number;
  room: string;
  ownerId: number | null;
  typeCode: number;
  /** The wall's REF in the room layout (`<NODE CLASS="wall" REF=...>`). */
  wall: number;
  x: number;
  y: number;
  z: number;
  /** "Let guests move this item". */
  guestMove: boolean;
}

/** Set "Let guests move this item" on furniture or a poster. */
export function setRoomItemGuestMove(ref: number, on: boolean): boolean {
  return db.prepare("UPDATE room_items SET guest_move = ? WHERE ref = ?").run(on ? 1 : 0, ref).changes > 0;
}

function rowToRoomPoster(row: Record<string, unknown>): RoomPoster {
  return {
    guestMove: Number(row.guest_move ?? 0) === 1,
    ref: Number(row.ref),
    room: String(row.room),
    ownerId: row.owner_id === null ? null : Number(row.owner_id),
    typeCode: Number(row.type_code),
    wall: Number(row.tile),
    x: Number(row.pos_x ?? 0),
    y: Number(row.pos_y ?? 0),
    z: Number(row.pos_z ?? 0),
  };
}

export function getRoomPosters(room: string): RoomPoster[] {
  return (
    db
      .prepare(`SELECT * FROM room_items WHERE room = ? AND category = ${POSTER_CATEGORY} ORDER BY ref`)
      .all(room) as Array<Record<string, unknown>>
  ).map(rowToRoomPoster);
}

export function getRoomPoster(ref: number): RoomPoster | undefined {
  const row = db.prepare(`SELECT * FROM room_items WHERE ref = ? AND category = ${POSTER_CATEGORY}`).get(ref);
  return row ? rowToRoomPoster(row as Record<string, unknown>) : undefined;
}

export function placeRoomPoster(
  room: string,
  ownerId: number | null,
  typeCode: number,
  wall: number,
  x: number,
  y: number,
  z: number,
): RoomPoster {
  const info = db
    .prepare(
      `INSERT INTO room_items (room, owner_id, type_code, tile, dir, state, placed_at, category, pos_x, pos_y, pos_z)
       VALUES (?, ?, ?, ?, 5, 0, ?, ${POSTER_CATEGORY}, ?, ?, ?)`,
    )
    .run(room, ownerId, typeCode, wall, now(), x, y, z);
  return { ref: Number(info.lastInsertRowid), room, ownerId, typeCode, wall, x, y, z, guestMove: false };
}

/** Rehang a poster. Returns false if the ref is not a poster. */
export function moveRoomPoster(ref: number, wall: number, x: number, y: number, z: number): boolean {
  return (
    db
      .prepare(
        `UPDATE room_items SET tile = ?, pos_x = ?, pos_y = ?, pos_z = ? WHERE ref = ? AND category = ${POSTER_CATEGORY}`,
      )
      .run(wall, x, y, z, ref).changes > 0
  );
}

export interface RoomItem {
  ref: number;
  room: string;
  ownerId: number | null;
  typeCode: number;
  tile: number;
  dir: number;
  state: number;
  /** Teleporter pair, when this item is one half of one. See the migration above. */
  pair?: ItemPair;
  /** "Let guests move this item". */
  guestMove?: boolean;
}

/** Which teleporter pair an item belongs to, and which half of it. */
export interface ItemPair {
  id: number;
  half: 0 | 1;
}

function rowPair(row: Record<string, unknown>): ItemPair | undefined {
  if (row.pair_id === null || row.pair_id === undefined) return undefined;
  return { id: Number(row.pair_id), half: Number(row.pair_half) === 1 ? 1 : 0 };
}

function rowToRoomItem(row: Record<string, unknown>): RoomItem {
  return {
    ref: Number(row.ref),
    room: String(row.room),
    ownerId: row.owner_id === null ? null : Number(row.owner_id),
    typeCode: Number(row.type_code),
    tile: Number(row.tile),
    dir: Number(row.dir),
    state: Number(row.state),
    pair: rowPair(row),
    guestMove: Number(row.guest_move ?? 0) === 1,
  };
}

/** The placed partner of a teleporter half, if its other half is in a room. */
export function getPlacedPartner(pair: ItemPair): RoomItem | undefined {
  const row = db
    .prepare("SELECT * FROM room_items WHERE pair_id = ? AND pair_half = ?")
    .get(pair.id, 1 - pair.half);
  return row ? rowToRoomItem(row as Record<string, unknown>) : undefined;
}

/**
 * Give a player a new teleporter pair: two inventory rows sharing a pair id
 * (the first row's id). Returns the pair id.
 */
export function grantItemPair(ownerId: number, typeCode: number, category: number): number {
  const insert = db.prepare(
    "INSERT INTO items (owner_id, type_code, category, created_at, pair_half) VALUES (?, ?, ?, ?, ?)",
  );
  const at = now();
  const first = Number(insert.run(ownerId, typeCode, category, at, 0).lastInsertRowid);
  const second = Number(insert.run(ownerId, typeCode, category, at, 1).lastInsertRowid);
  db.prepare("UPDATE items SET pair_id = ? WHERE id IN (?, ?)").run(first, first, second);
  return first;
}

/** Put a pin on, or take it off, the lanyard. Returns false if it is not theirs. */
export function setPinWorn(id: number, ownerId: number, worn: boolean): boolean {
  return (
    db.prepare("UPDATE items SET worn = ? WHERE id = ? AND owner_id = ?").run(worn ? 1 : 0, id, ownerId)
      .changes > 0
  );
}

/** Set a magic pin's stars. Returns false if it is not theirs. */
export function setItemLevel(id: number, ownerId: number, level: number): boolean {
  return (
    db.prepare("UPDATE items SET level = ? WHERE id = ? AND owner_id = ?").run(level, id, ownerId)
      .changes > 0
  );
}

/** The pins on a player's lanyard, in the order they were put on. */
export function getWornPins(ownerId: number): Array<{ id: number; typeCode: number; level?: number }> {
  return (
    db.prepare("SELECT id, type_code, level FROM items WHERE owner_id = ? AND worn = 1 ORDER BY id")
      .all(ownerId) as Array<Record<string, unknown>>
  ).map((row) => ({
    id: Number(row.id),
    typeCode: Number(row.type_code),
    level: row.level === null || row.level === undefined ? undefined : Number(row.level),
  }));
}

/** Return one teleporter half to an inventory, keeping its pairing. */
export function addPairedItem(ownerId: number, typeCode: number, category: number, pair: ItemPair): void {
  db.prepare(
    "INSERT INTO items (owner_id, type_code, category, created_at, pair_id, pair_half) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(ownerId, typeCode, category, now(), pair.id, pair.half);
}

export function getRoomItems(room: string): RoomItem[] {
  return (
    db.prepare(`SELECT * FROM room_items WHERE room = ? AND ${FURNITURE_ROWS} ORDER BY ref`).all(room) as Array<
      Record<string, unknown>
    >
  ).map(rowToRoomItem);
}

export function placeRoomItem(
  room: string,
  ownerId: number | null,
  typeCode: number,
  tile: number,
  dir: number,
  state = 0,
  pair?: ItemPair,
): RoomItem {
  const info = db
    .prepare(
      `INSERT INTO room_items (room, owner_id, type_code, tile, dir, state, placed_at, pair_id, pair_half)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(room, ownerId, typeCode, tile, dir, state, now(), pair?.id ?? null, pair?.half ?? null);
  const ref = Number(info.lastInsertRowid);
  return { ref, room, ownerId, typeCode, tile, dir, state, pair };
}

/** A configurable item's settings, as the key/value strings the wire uses. */
export function getRoomItemConfig(ref: number): Record<string, string> {
  const row = db.prepare("SELECT config_json FROM room_items WHERE ref = ?").get(ref) as
    | { config_json?: string }
    | undefined;
  if (!row?.config_json) return {};
  try {
    return JSON.parse(row.config_json) as Record<string, string>;
  } catch {
    return {};
  }
}

/** Merge new settings into an item's config. */
export function setRoomItemConfig(ref: number, patch: Record<string, string>): void {
  const merged = { ...getRoomItemConfig(ref), ...patch };
  db.prepare("UPDATE room_items SET config_json = ? WHERE ref = ?").run(
    JSON.stringify(merged),
    ref,
  );
}

/** Set an item's state, so an interactive piece stays as the player left it. */
export function setRoomItemState(ref: number, state: number): boolean {
  return (
    db.prepare("UPDATE room_items SET state = ? WHERE ref = ?").run(state, ref).changes > 0
  );
}

/** Move an item within its room. Returns false if the ref is unknown. */
export function moveRoomItem(ref: number, tile: number, dir: number): boolean {
  return (
    db.prepare("UPDATE room_items SET tile = ?, dir = ? WHERE ref = ?").run(tile, dir, ref)
      .changes > 0
  );
}

export function getRoomItem(ref: number): RoomItem | undefined {
  const row = db.prepare(`SELECT * FROM room_items WHERE ref = ? AND ${FURNITURE_ROWS}`).get(ref);
  return row ? rowToRoomItem(row as Record<string, unknown>) : undefined;
}

/** Deletes furniture or a poster — refs are shared, see `RoomPoster`. */
export function removeRoomItem(ref: number): boolean {
  return db.prepare("DELETE FROM room_items WHERE ref = ?").run(ref).changes > 0;
}

/**
 * Client settings, from `780 SetSoundSettings`.
 *
 * ⚠ Not only sound, despite the command's name — `tutorial` and `traderequests`
 * ride in the same six ints, and `traderequests` is what gates the trade button
 * in `CRoomAvatarProfile.select`.
 */
export interface UserSettings {
  fx: number;
  music: number;
  ui: number;
  volume: number;
  tutorial: number;
  tradeRequests: number;
}

/** What a brand-new account gets, and the fallback when a row is absent. */
export const DEFAULT_SETTINGS: UserSettings = {
  fx: 1,
  music: 1,
  ui: 1,
  // VMK's slider may be 0-100, so 100 is audible under either reading.
  volume: 100,
  tutorial: 0,
  tradeRequests: 1,
};

export function getSettings(userId: number): UserSettings {
  const row = db
    .prepare(
      `SELECT set_fx, set_music, set_ui, set_volume, set_tutorial, set_trade
       FROM users WHERE id = ?`,
    )
    .get(userId) as Record<string, unknown> | undefined;
  if (!row || row.set_volume === null) return { ...DEFAULT_SETTINGS };
  return {
    fx: Number(row.set_fx),
    music: Number(row.set_music),
    ui: Number(row.set_ui),
    volume: Number(row.set_volume),
    tutorial: Number(row.set_tutorial),
    tradeRequests: Number(row.set_trade),
  };
}

export function setSettings(userId: number, s: UserSettings): void {
  db.prepare(
    `UPDATE users SET set_fx = ?, set_music = ?, set_ui = ?,
       set_volume = ?, set_tutorial = ?, set_trade = ? WHERE id = ?`,
  ).run(s.fx, s.music, s.ui, s.volume, s.tutorial, s.tradeRequests, userId);
}

/**
 * Every credit movement, for Housekeeping's Purchases tab. Lives HERE rather
 * than in staff-db.ts because `setCredits` writes it, and db.ts must not import
 * a module that imports db.ts back (its `db.exec` would run before `db` exists).
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS credit_log (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    delta      INTEGER NOT NULL,
    balance    INTEGER NOT NULL,
    reason     TEXT    NOT NULL,
    item_code  INTEGER,
    staff_id   INTEGER,
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_credit_log_user ON credit_log(user_id, created_at);
`);

/**
 * Record a credit movement. `delta` may be 0 — a free "purchase" still belongs
 * in the ledger. Never throws: a logging failure must not undo a sale.
 */
export function logCredits(
  userId: number,
  delta: number,
  balance: number,
  reason: string,
  itemCode: number | null = null,
  staffId: number | null = null,
): void {
  try {
    db.prepare(
      `INSERT INTO credit_log (user_id, delta, balance, reason, item_code, staff_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).run(userId, Math.trunc(delta), Math.trunc(balance), reason, itemCode, staffId, Date.now());
  } catch (err) {
    console.warn("[db] credit log write failed:", (err as Error).message);
  }
}

/**
 * Set a user's credit balance outright, recording the change.
 *
 * `reason` is what Housekeeping shows ("Item Purchase", "Item Sale"…); callers
 * that predate the ledger get a generic one rather than going unrecorded.
 */
export function setCredits(
  userId: number,
  credits: number,
  reason = "Balance change",
  itemCode: number | null = null,
  staffId: number | null = null,
): void {
  const next = Math.max(0, Math.trunc(credits));
  const before = db.prepare("SELECT credits FROM users WHERE id = ?").get(userId) as
    | { credits: number }
    | undefined;
  db.prepare("UPDATE users SET credits = ? WHERE id = ?").run(next, userId);
  if (before) logCredits(userId, next - Number(before.credits), next, reason, itemCode, staffId);
}

/** Add (or with a negative `delta`, take) credits atomically, recording why. */
export function addCredits(userId: number, delta: number, reason: string, itemCode: number | null = null): void {
  db.prepare("UPDATE users SET credits = MAX(0, credits + ?) WHERE id = ?").run(Math.trunc(delta), userId);
  const after = db.prepare("SELECT credits FROM users WHERE id = ?").get(userId) as { credits: number } | undefined;
  if (after) logCredits(userId, delta, Number(after.credits), reason, itemCode);
}

/** Replace a user's permissions. Pass `[]` to demote them to an ordinary player. */
export function setPermissions(userId: number, permissions: number[]): void {
  const clean = [...new Set(permissions)]
    .filter((p) => Number.isInteger(p) && p >= 1 && p <= PERMISSIONS.length)
    .sort((a, b) => a - b);
  db.prepare("UPDATE users SET permissions = ? WHERE id = ?").run(clean.join(","), userId);
}

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const TICKET_TTL_MS = 1000 * 60 * 5; // 5 minutes -- long enough to load the client

const now = () => Date.now();

/* ------------------------------------------------------------------ passwords */

// scrypt from node:crypto: no dependency, and correct by default. The previous
// prototype in packages/server stored the password in `password_hash` verbatim
// and compared with `===`; that must not come back.
function hashPassword(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString("hex");
}

function passwordMatches(password: string, salt: string, expected: string): boolean {
  const actual = Buffer.from(hashPassword(password, salt), "hex");
  const wanted = Buffer.from(expected, "hex");
  // Length check first: timingSafeEqual throws on a length mismatch.
  return actual.length === wanted.length && timingSafeEqual(actual, wanted);
}

/* ---------------------------------------------------------------------- users */

function rowToUser(row: Record<string, unknown>): User {
  return {
    id: Number(row.id),
    username: String(row.username),
    character_name: row.character_name === null ? null : String(row.character_name),
    has_character: Number(row.has_character),
    credits: Number(row.credits),
    permissions: parsePermissions(row.permissions),
  };
}

export function getUserByUsername(username: string): User | undefined {
  const row = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  return row ? rowToUser(row as Record<string, unknown>) : undefined;
}

export function getUserById(id: number): User | undefined {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  return row ? rowToUser(row as Record<string, unknown>) : undefined;
}

/**
 * The first account on a fresh database is the owner's, so it gets every
 * permission — no shell access or tools/set-admin.mjs needed to reach /hk.
 * node:sqlite is synchronous, so the emptiness check and the insert cannot
 * interleave with another signup.
 */
export function createUser(username: string, password: string): User {
  const salt = randomBytes(16).toString("hex");
  const first = !db.prepare("SELECT 1 FROM users LIMIT 1").get();
  db.prepare(
    `INSERT INTO users (username, password_hash, password_salt, created_at, permissions)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(username, hashPassword(password, salt), salt, now(), first ? ALL_PERMISSIONS.join(",") : "");
  if (first) console.log(`[db] "${username}" is the first account — granted all permissions`);
  const created = getUserByUsername(username);
  if (!created) {
    throw new Error(`createUser: user "${username}" missing immediately after insert`);
  }
  return created;
}

/**
 * The login page's whole behaviour: unknown username creates the account,
 * known username verifies the password.
 *
 * Returns `undefined` only when the username exists and the password is wrong,
 * so the caller cannot accidentally treat "wrong password" as "new user".
 */
export function loginOrCreate(
  username: string,
  password: string,
): { user: User; created: boolean } | undefined {
  const existing = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username) as Record<string, unknown> | undefined;

  if (!existing) {
    return { user: createUser(username, password), created: true };
  }
  if (!passwordMatches(password, String(existing.password_salt), String(existing.password_hash))) {
    return undefined;
  }
  db.prepare("UPDATE users SET last_login_at = ? WHERE id = ?").run(now(), Number(existing.id));
  return { user: rowToUser(existing), created: false };
}

/**
 * Check a password WITHOUT creating anything — Housekeeping's login. Unlike
 * `loginOrCreate`, an unknown username is simply a failure.
 */
export function verifyLogin(username: string, password: string): User | undefined {
  const row = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as
    | Record<string, unknown>
    | undefined;
  if (!row) {
    // Burn the same scrypt time as a real check, so response timing does not
    // reveal which usernames exist.
    hashPassword(password, "0000000000000000");
    return undefined;
  }
  return passwordMatches(password, String(row.password_salt), String(row.password_hash))
    ? rowToUser(row)
    : undefined;
}

/** Replace a user's password (Housekeeping). Their web sessions are ended too. */
export function setPassword(userId: number, password: string): void {
  const salt = randomBytes(16).toString("hex");
  db.prepare("UPDATE users SET password_hash = ?, password_salt = ? WHERE id = ?").run(
    hashPassword(password, salt),
    salt,
    userId,
  );
  db.prepare("DELETE FROM sessions WHERE user_id = ?").run(userId);
}

/**
 * Is this character name already in use?
 *
 * `forUserId` excludes the player's own current name, so re-submitting the name
 * you already hold is not reported as a clash.
 */
export function characterNameTaken(name: string, forUserId?: number): boolean {
  const row = db
    // Only FINISHED characters hold a name: a registration abandoned before the
    // EULA saves its choice (`savePendingCharacter`) but must not reserve it.
    .prepare("SELECT id FROM users WHERE character_name = ? COLLATE NOCASE AND has_character = 1")
    .get(name) as { id?: number } | undefined;
  if (!row) {
    return false;
  }
  return forUserId === undefined || Number(row.id) !== forUserId;
}

/** What `507 CreateAvatar` stored: the figure the room needs to render this player. */
export interface StoredOutfit {
  sex: number;
  figure: number[];
  guestRoomStyle: number | null;
}

/**
 * Read back what `setCharacter` persisted.
 *
 * `2582 _CreateAvatars` needs the figure to draw a player, and the figure only
 * exists here — it is not on the `User` row because nothing needed it until room
 * entry started working.
 */
export function getOutfit(userId: number): StoredOutfit | null {
  const row = db.prepare("SELECT outfit_json FROM users WHERE id = ?").get(userId) as
    | { outfit_json: string | null }
    | undefined;
  if (!row?.outfit_json) return null;
  try {
    const parsed = JSON.parse(row.outfit_json) as Partial<StoredOutfit>;
    if (!Array.isArray(parsed.figure)) return null;
    return {
      sex: Number(parsed.sex ?? 0),
      figure: parsed.figure.map(Number),
      guestRoomStyle: parsed.guestRoomStyle == null ? null : Number(parsed.guestRoomStyle),
    };
  } catch {
    return null; // pre-fix rows held a Buffer's toString(), not JSON
  }
}

/* ----------------------------------------------------------------------- items */

/** Item categories as `2532 _ReceiveItemList` numbers them. */
export const ITEM_CATEGORY = { items: 1, clothes: 2, posters: 3, pins: 4 } as const;

export interface OwnedItem {
  id: number;
  ownerId: number;
  typeCode: number;
  category: number;
  /** Teleporter pair, when this row is one half of one. */
  pair?: ItemPair;
  /** A pin on the lanyard. */
  worn?: boolean;
  /** A magic pin's stars (1-5); undefined on anything else. */
  level?: number;
}

/**
 * Give a player items they do not already have.
 *
 * ⚠ OWNERSHIP IS NOT THE SAME AS WEARING. The outfit chosen at registration is
 * granted here, once, and stays owned however the player later dresses —
 * deriving the inventory from the current figure instead would silently delete
 * a garment the moment they took it off.
 */
export function grantItems(ownerId: number, typeCodes: number[], category: number): number {
  const owned = new Set(
    (db.prepare("SELECT type_code FROM items WHERE owner_id = ? AND category = ?")
      .all(ownerId, category) as Array<{ type_code: number }>).map((r) => Number(r.type_code)),
  );
  const insert = db.prepare(
    "INSERT INTO items (owner_id, type_code, category, created_at) VALUES (?, ?, ?, ?)",
  );
  let added = 0;
  for (const code of typeCodes) {
    if (!Number.isInteger(code) || code <= 0 || owned.has(code)) continue;
    insert.run(ownerId, code, category, now());
    owned.add(code);
    added++;
  }
  return added;
}

/**
 * Add items to a player's inventory, allowing DUPLICATES.
 *
 * ⚠ Deliberately not `grantItems`, and the difference matters. `grantItems`
 * skips a code the player already owns, which is right for clothing — you
 * cannot wear two of the same shirt — and wrong for furniture, where owning
 * four of one chair is ordinary. Routing a pickup through `grantItems` silently
 * destroys the second copy: the item leaves the room and never reappears.
 *
 * Returns the number inserted, which for this function is always the number
 * asked for (minus malformed codes).
 */
export function addItems(ownerId: number, typeCodes: number[], category: number): number {
  const insert = db.prepare(
    "INSERT INTO items (owner_id, type_code, category, created_at) VALUES (?, ?, ?, ?)",
  );
  let added = 0;
  const at = now();
  for (const code of typeCodes) {
    if (!Number.isInteger(code) || code <= 0) continue;
    insert.run(ownerId, code, category, at);
    added++;
  }
  return added;
}

/** Remove every item in a room. Returns how many rows went. */
/**
 * THE CAMERA. A player who owns one sees the camera icon (`2762`), and each
 * shot uses one film (`2760`). Bought as "Camera and 3 film" in the VMK
 * Central shop (disneysonlineworlds.com/How_to_take_a_picture).
 */
{
  const columns = db.prepare("PRAGMA table_info(users)").all() as Array<{ name: string }>;
  for (const [col, ddl] of [
    ["has_camera", "INTEGER NOT NULL DEFAULT 0"],
    ["film", "INTEGER NOT NULL DEFAULT 0"],
  ] as const) {
    if (columns.length > 0 && !columns.some((c) => String(c.name) === col)) {
      try {
        db.exec(`ALTER TABLE users ADD COLUMN ${col} ${ddl}`);
        logMigration(`[db] users: added missing column ${col}`);
      } catch {
        /* added concurrently by the other server */
      }
    }
  }
}

export function getCamera(userId: number): { hasCamera: boolean; film: number } {
  const row = db.prepare("SELECT has_camera, film FROM users WHERE id = ?").get(userId) as
    | { has_camera?: number; film?: number }
    | undefined;
  return { hasCamera: Number(row?.has_camera ?? 0) === 1, film: Number(row?.film ?? 0) };
}

/** Give a camera and/or film. Returns the new film count. */
export function grantCamera(userId: number, film: number, camera = true): number {
  db.prepare("UPDATE users SET has_camera = MAX(has_camera, ?), film = MAX(0, film + ?) WHERE id = ?").run(
    camera ? 1 : 0,
    film,
    userId,
  );
  return getCamera(userId).film;
}

/** Spend one film. False when there is none left. */
export function useFilm(userId: number): boolean {
  return db.prepare("UPDATE users SET film = film - 1 WHERE id = ? AND film > 0").run(userId).changes > 0;
}

/**
 * PHOTOS. Stored as the camera made them: 8-bit sepia palette INDICES (1..64),
 * width x height bytes, plus the 80x53 thumbnail. The client applies its own
 * sepia palette to show them, so nothing here ever decodes an image.
 *
 * Where a photo is:
 *   'catalog'  the owner's Photo Catalog (camera window)
 *   'album'    published to the owner's album (a Photo Album item, type 31,
 *              shows the album of the room it stands in)
 *   'wall'     hung in a room as poster type 3008; `wall_ref` is that poster
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS photos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    place      TEXT    NOT NULL DEFAULT 'catalog',
    caption    TEXT    NOT NULL DEFAULT '',
    width      INTEGER NOT NULL,
    height     INTEGER NOT NULL,
    pixels     BLOB    NOT NULL,
    thumb_w    INTEGER NOT NULL DEFAULT 0,
    thumb_h    INTEGER NOT NULL DEFAULT 0,
    thumb      BLOB,
    wall_ref   INTEGER,
    taken_at   INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS photos_owner ON photos(owner_id, place);
`);

export interface Photo {
  id: number;
  ownerId: number;
  place: "catalog" | "album" | "wall";
  caption: string;
  width: number;
  height: number;
  pixels: Uint8Array;
  thumbWidth: number;
  thumbHeight: number;
  thumb: Uint8Array | null;
  wallRef: number | null;
  takenAt: number;
}

function rowToPhoto(row: Record<string, unknown>): Photo {
  return {
    id: Number(row.id),
    ownerId: Number(row.owner_id),
    place: String(row.place) as Photo["place"],
    caption: String(row.caption ?? ""),
    width: Number(row.width),
    height: Number(row.height),
    pixels: row.pixels as Uint8Array,
    thumbWidth: Number(row.thumb_w ?? 0),
    thumbHeight: Number(row.thumb_h ?? 0),
    thumb: (row.thumb as Uint8Array | null) ?? null,
    wallRef: row.wall_ref === null || row.wall_ref === undefined ? null : Number(row.wall_ref),
    takenAt: Number(row.taken_at),
  };
}

export function createPhoto(ownerId: number, width: number, height: number, pixels: Uint8Array, caption: string): Photo {
  const info = db
    .prepare("INSERT INTO photos (owner_id, caption, width, height, pixels, taken_at) VALUES (?, ?, ?, ?, ?, ?)")
    .run(ownerId, caption, width, height, pixels, now());
  return getPhoto(Number(info.lastInsertRowid))!;
}

export function setPhotoThumb(id: number, width: number, height: number, thumb: Uint8Array): void {
  db.prepare("UPDATE photos SET thumb_w = ?, thumb_h = ?, thumb = ? WHERE id = ?").run(width, height, thumb, id);
}

/** A photo row that has no picture yet — the upload sends the THUMBNAIL first. */
export function createPendingPhoto(ownerId: number, caption: string): number {
  const info = db
    .prepare("INSERT INTO photos (owner_id, caption, width, height, pixels, taken_at) VALUES (?, ?, 0, 0, ?, ?)")
    .run(ownerId, caption, new Uint8Array(0), now());
  return Number(info.lastInsertRowid);
}

export function setPhotoPixels(id: number, width: number, height: number, pixels: Uint8Array): void {
  db.prepare("UPDATE photos SET width = ?, height = ?, pixels = ? WHERE id = ?").run(width, height, pixels, id);
}

export function getPhoto(id: number): Photo | undefined {
  const row = db.prepare("SELECT * FROM photos WHERE id = ?").get(id);
  return row ? rowToPhoto(row as Record<string, unknown>) : undefined;
}

/** A player's photos in one place, oldest first (the order the catalog shows). */
export function getPhotos(ownerId: number, place: Photo["place"]): Photo[] {
  return (
    db.prepare("SELECT * FROM photos WHERE owner_id = ? AND place = ? ORDER BY id").all(ownerId, place) as Array<
      Record<string, unknown>
    >
  ).map(rowToPhoto);
}

export function countPhotos(ownerId: number, place: Photo["place"]): number {
  const row = db.prepare("SELECT COUNT(*) AS n FROM photos WHERE owner_id = ? AND place = ?").get(ownerId, place) as {
    n: number;
  };
  return Number(row.n);
}

export function movePhoto(id: number, place: Photo["place"], wallRef: number | null = null): void {
  db.prepare("UPDATE photos SET place = ?, wall_ref = ? WHERE id = ?").run(place, wallRef, id);
}

export function setPhotoCaption(id: number, caption: string): void {
  db.prepare("UPDATE photos SET caption = ? WHERE id = ?").run(caption, id);
}

export function deletePhoto(id: number): boolean {
  return db.prepare("DELETE FROM photos WHERE id = ?").run(id).changes > 0;
}

/** The photo hung as wall poster `ref`, if any. */
export function getPhotoOnWall(ref: number): Photo | undefined {
  const row = db.prepare("SELECT * FROM photos WHERE place = 'wall' AND wall_ref = ?").get(ref);
  return row ? rowToPhoto(row as Record<string, unknown>) : undefined;
}

export function clearRoomItems(room: string): number {
  return Number(db.prepare("DELETE FROM room_items WHERE room = ?").run(room).changes);
}

/**
 * Take one item out of a player's inventory, by ROW id.
 *
 * ⚠ Keyed on the row, not the type code, because furniture stacks — four
 * identical chairs are four rows, and deleting "the chair" would take all of
 * them. Ownership is part of the WHERE rather than a separate check, so a
 * mismatched owner deletes nothing and returns undefined instead of silently
 * consuming someone else's row.
 */
/**
 * Look at one inventory row WITHOUT consuming it.
 *
 * ⚠ Needed because `takeOwnedItem` deletes, so any check that can REFUSE a
 * placement has to run before it. Validating after consuming and then trying to
 * put the item back is not equivalent — the row id changes, so the client's
 * inventory reference is invalidated and the player appears to lose the item.
 */
export function peekOwnedItem(id: number, ownerId: number): OwnedItem | undefined {
  const row = db
    .prepare("SELECT * FROM items WHERE id = ? AND owner_id = ?")
    .get(id, ownerId) as Record<string, unknown> | undefined;
  if (!row) return undefined;
  return {
    id: Number(row.id),
    ownerId: Number(row.owner_id),
    typeCode: Number(row.type_code),
    category: Number(row.category),
    pair: rowPair(row),
    worn: Number(row.worn ?? 0) === 1,
    level: row.level === null || row.level === undefined ? undefined : Number(row.level),
  };
}

export function takeOwnedItem(id: number, ownerId: number): OwnedItem | undefined {
  const row = db
    .prepare("SELECT * FROM items WHERE id = ? AND owner_id = ?")
    .get(id, ownerId) as Record<string, unknown> | undefined;
  if (!row) return undefined;
  db.prepare("DELETE FROM items WHERE id = ? AND owner_id = ?").run(id, ownerId);
  return {
    id: Number(row.id),
    ownerId: Number(row.owner_id),
    typeCode: Number(row.type_code),
    category: Number(row.category),
    pair: rowPair(row),
    worn: Number(row.worn ?? 0) === 1,
    level: row.level === null || row.level === undefined ? undefined : Number(row.level),
  };
}

/** One inventory row, if this player owns it (placed items and tickets excluded). */
export function getOwnedItem(id: number, ownerId: number): OwnedItem | undefined {
  const row = db
    .prepare("SELECT * FROM items WHERE id = ? AND owner_id = ? AND room_id IS NULL")
    .get(id, ownerId) as Record<string, unknown> | undefined;
  if (!row) return undefined;
  return {
    id: Number(row.id),
    ownerId: Number(row.owner_id),
    typeCode: Number(row.type_code),
    category: Number(row.category),
    pair: rowPair(row),
    worn: Number(row.worn ?? 0) === 1,
    level: row.level === null || row.level === undefined ? undefined : Number(row.level),
  };
}

/** The inventory row holding the other half of a teleporter pair, if any. */
export function getInventoryPartner(pairId: number, id: number): number | undefined {
  const row = db
    .prepare("SELECT id FROM items WHERE pair_id = ? AND id <> ? AND room_id IS NULL")
    .get(pairId, id) as { id: number } | undefined;
  return row ? Number(row.id) : undefined;
}

/**
 * Hand an inventory row to another player (a completed trade). It arrives off
 * the lanyard. A teleporter half takes its partner with it when the same player
 * holds both, so a pair is never split by a trade. Returns the rows moved.
 */
export function transferItem(id: number, fromId: number, toId: number): number[] {
  const item = getOwnedItem(id, fromId);
  if (!item) return [];
  const ids = [id];
  if (item.pair) {
    const partner = db
      .prepare("SELECT id FROM items WHERE pair_id = ? AND id <> ? AND owner_id = ? AND room_id IS NULL")
      .get(item.pair.id, id, fromId) as { id: number } | undefined;
    if (partner) ids.push(Number(partner.id));
  }
  const move = db.prepare("UPDATE items SET owner_id = ?, worn = 0 WHERE id = ? AND owner_id = ?");
  for (const rowId of ids) move.run(toId, rowId, fromId);
  return ids;
}

export function getOwnedItems(ownerId: number, category?: number): OwnedItem[] {
  // Room tickets (`room_id` set) are listed separately, one entry per ticket —
  // see `getTickets`. Grouped in with ordinary pins they collapse by type code
  // and lose which room each one is for.
  const rows = (
    category === undefined
      ? db.prepare("SELECT * FROM items WHERE owner_id = ? AND room_id IS NULL ORDER BY id").all(ownerId)
      : db
          .prepare("SELECT * FROM items WHERE owner_id = ? AND category = ? AND room_id IS NULL ORDER BY id")
          .all(ownerId, category)
  ) as Array<Record<string, unknown>>;
  return rows.map((row) => ({
    id: Number(row.id),
    ownerId: Number(row.owner_id),
    typeCode: Number(row.type_code),
    category: Number(row.category),
    pair: rowPair(row),
    worn: Number(row.worn ?? 0) === 1,
    level: row.level === null || row.level === undefined ? undefined : Number(row.level),
  }));
}

/* ----------------------------------------------------------------------- rooms */

/**
 * A guest room. Every player gets one at registration.
 *
 * ⚠ `id` is a SPACE ID the navigator hands straight back to us, so it must not
 * collide with a public `room.code.<N>`. Those run to ~1109 in the config, so
 * guest rooms are offset well clear of them; `style` is the public room code
 * whose casts the room is built from (17/53/54/67 — the four offered on
 * registration step 1).
 */
export interface GuestRoom {
  id: number;
  ownerId: number;
  style: number;
  name: string;
  description: string;
  /**
   * Who may enter — one of `ENTRY_STATE`. The client's "Change Who Can Enter"
   * window offers all five and reads the value back from `2587`/`2884`.
   */
  entryState: EntryState;
  /** `entryState !== EVERYONE` — the navigator lists' "restricted" flag. */
  friendsOnly: boolean;
  /** Staff-featured: listed first under Popular with the Mickey icon. */
  featured: boolean;
}

/**
 * `CRoomInfoInterface._WhoEntersEventProc` / `GetEntryStateDescription` —
 * the wire values ARE these numbers, in this order.
 */
export const ENTRY_STATE = {
  EVERYONE: 0,
  FRIENDS: 1,
  TICKETS: 2,
  /** "Me, my friends and people with tickets". */
  FRIENDS_AND_TICKETS: 3,
  OWNER: 4,
} as const;
export type EntryState = (typeof ENTRY_STATE)[keyof typeof ENTRY_STATE];

function toEntryState(value: unknown): EntryState {
  const n = Number(value ?? 0);
  return n >= 0 && n <= 4 && Number.isInteger(n) ? (n as EntryState) : ENTRY_STATE.EVERYONE;
}

/**
 * Keeps guest-room space ids clear of the public room codes.
 *
 * The navigator does not distinguish the two namespaces — it sends whatever id
 * we advertise — so an overlap would silently route someone into a public room.
 */
const GUEST_ROOM_ID_BASE = 100000;

function rowToRoom(row: Record<string, unknown>): GuestRoom {
  return {
    id: GUEST_ROOM_ID_BASE + Number(row.id),
    ownerId: Number(row.owner_id),
    style: Number(row.style),
    name: String(row.name),
    description: String(row.description ?? ""),
    // ⚠ The column is still called `friends_only` but holds the full 0-4
    // entry state; a room saved as friends-only (1) is exactly state FRIENDS.
    entryState: toEntryState(row.friends_only),
    friendsOnly: toEntryState(row.friends_only) !== ENTRY_STATE.EVERYONE,
    featured: Number(row.featured ?? 0) !== 0,
  };
}

/** Create a player's room. Returns the existing one if they already have it. */
export function createGuestRoom(
  ownerId: number,
  style: number,
  name: string,
  description = "",
): GuestRoom {
  const existing = getRoomsOwnedBy(ownerId);
  if (existing.length > 0) {
    return existing[0];
  }
  db.prepare(
    "INSERT INTO rooms (owner_id, style, name, description, created_at) VALUES (?, ?, ?, ?, ?)",
  ).run(ownerId, style, name, description, now());
  const created = getRoomsOwnedBy(ownerId);
  if (created.length === 0) {
    throw new Error(`createGuestRoom: room for user ${ownerId} missing immediately after insert`);
  }
  return created[0];
}

/**
 * Add ANOTHER room — a shop purchase or a staff grant.
 *
 * ⚠ Not `createGuestRoom`, which is registration's idempotent "the player's
 * room" and hands back the existing one: a purchase through it charged the
 * price and created nothing, returning the registration room instead.
 */
export function addGuestRoom(
  ownerId: number,
  style: number,
  name: string,
  description = "",
): GuestRoom {
  const result = db
    .prepare(
      "INSERT INTO rooms (owner_id, style, name, description, created_at) VALUES (?, ?, ?, ?, ?)",
    )
    .run(ownerId, style, name, description, now());
  const room = getGuestRoom(GUEST_ROOM_ID_BASE + Number(result.lastInsertRowid));
  if (!room) throw new Error(`addGuestRoom: room for user ${ownerId} missing immediately after insert`);
  return room;
}

export function getRoomsOwnedBy(ownerId: number): GuestRoom[] {
  const rows = db
    .prepare("SELECT * FROM rooms WHERE owner_id = ? ORDER BY id")
    .all(ownerId) as Array<Record<string, unknown>>;
  return rows.map(rowToRoom);
}

/** Every guest room owned by one of this player's friends, grouped by owner. */
export function getFriendsRooms(userId: number): GuestRoom[] {
  const rows = db
    .prepare(
      `SELECT r.* FROM friendships f JOIN rooms r ON r.owner_id = f.friend_id
       WHERE f.user_id = ? ORDER BY r.owner_id, r.id`,
    )
    .all(userId) as Array<Record<string, unknown>>;
  return rows.map(rowToRoom);
}

/** All guest rooms, newest first — the pool the Popular tab ranks. */
export function getAllGuestRooms(limit = 500): GuestRoom[] {
  const rows = db
    .prepare("SELECT * FROM rooms ORDER BY id DESC LIMIT ?")
    .all(limit) as Array<Record<string, unknown>>;
  return rows.map(rowToRoom);
}

/**
 * Rename / re-describe a room. Only the owner may, which the caller checks.
 *
 * Returns the updated room, or `undefined` if the id is not one of ours.
 */
export function updateGuestRoom(
  spaceId: number,
  name: string,
  description: string,
): GuestRoom | undefined {
  const existing = getGuestRoom(spaceId);
  if (!existing) return undefined;
  db.prepare("UPDATE rooms SET name = ?, description = ? WHERE id = ?").run(
    name,
    description,
    spaceId - GUEST_ROOM_ID_BASE,
  );
  return getGuestRoom(spaceId);
}

/**
 * Does this player hold a ticket for this room that has not expired?
 *
 * A ticket is an inventory row (a pin) with `room_id` set; whoever holds the
 * row holds the ticket, so a ticket traded on moves with its row.
 */
export function hasValidTicket(userId: number, spaceId: number): boolean {
  return (
    db
      .prepare(
        `SELECT 1 FROM items WHERE owner_id = ? AND room_id = ?
         AND (expires_at IS NULL OR expires_at > ?) LIMIT 1`,
      )
      .get(userId, spaceId, now()) !== undefined
  );
}

/** `item.12221` "Single Use Room Ticket" — the pin a room ticket is. */
export const ROOM_TICKET_CODE = 12221;

export interface RoomTicket {
  id: number;
  ownerId: number;
  typeCode: number;
  /** The guest room (space id) it opens. */
  spaceId: number;
  /** ms epoch it stops working. */
  expiresAt: number;
}

/** Mint `count` tickets for a room into a player's pins, each valid `days` days. */
export function createTickets(ownerId: number, spaceId: number, count: number, days: number): number {
  const insert = db.prepare(
    `INSERT INTO items (owner_id, type_code, category, created_at, room_id, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );
  const expires = now() + days * 24 * 60 * 60 * 1000;
  for (let i = 0; i < count; i++) {
    insert.run(ownerId, ROOM_TICKET_CODE, ITEM_CATEGORY.pins, now(), spaceId, expires);
  }
  return count;
}

/**
 * A player's tickets, soonest-to-expire first. Expired ones are deleted on
 * the way — a ticket past its date opens nothing and should not sit in the
 * pins page forever.
 */
export function getTickets(ownerId: number): RoomTicket[] {
  db.prepare("DELETE FROM items WHERE owner_id = ? AND room_id IS NOT NULL AND expires_at <= ?").run(
    ownerId,
    now(),
  );
  const rows = db
    .prepare("SELECT * FROM items WHERE owner_id = ? AND room_id IS NOT NULL ORDER BY expires_at, id")
    .all(ownerId) as Array<Record<string, unknown>>;
  return rows.map((row) => ({
    id: Number(row.id),
    ownerId: Number(row.owner_id),
    typeCode: Number(row.type_code),
    spaceId: Number(row.room_id),
    expiresAt: Number(row.expires_at),
  }));
}

/** How long a ticket stays good once used — `error.4603`: "valid for 2 hours". */
const TICKET_GRACE_MS = 2 * 60 * 60 * 1000;

/**
 * Use a ticket to enter a room, the way the original did (`error.4603`):
 * the first use marks the ticket USED and cuts it to at most 2 hours, during
 * which the holder may come and go freely; then it expires like any other.
 *
 * Returns the ticket used and whether this was its FIRST use (which is when
 * the client is told). A ticket already in its grace period is preferred, so
 * re-entering never spends a second one.
 */
export function useTicket(ownerId: number, spaceId: number): { id: number; firstUse: boolean } | undefined {
  const row = db
    .prepare(
      `SELECT id, used_at, expires_at FROM items WHERE owner_id = ? AND room_id = ? AND expires_at > ?
       ORDER BY (used_at IS NULL), expires_at, id LIMIT 1`,
    )
    .get(ownerId, spaceId, now()) as { id?: number; used_at?: number | null; expires_at?: number } | undefined;
  if (row?.id === undefined) return undefined;
  if (row.used_at !== null && row.used_at !== undefined) return { id: Number(row.id), firstUse: false };
  const expires = Math.min(Number(row.expires_at), now() + TICKET_GRACE_MS);
  db.prepare("UPDATE items SET used_at = ?, expires_at = ? WHERE id = ?").run(now(), expires, row.id);
  return { id: Number(row.id), firstUse: true };
}

/** One of a player's tickets by row id — for selling it back. */
export function getTicket(ownerId: number, id: number): RoomTicket | undefined {
  return getTickets(ownerId).find((t) => t.id === id);
}

/** Remove a ticket row (sold back). Scoped to its owner. */
export function deleteTicket(ownerId: number, id: number): boolean {
  return (
    Number(
      db.prepare("DELETE FROM items WHERE id = ? AND owner_id = ? AND room_id IS NOT NULL").run(id, ownerId)
        .changes,
    ) > 0
  );
}

export interface PotcProgress {
  wins: [number, number, number];
  level3: boolean;
}

export function getPotcProgress(userId: number): PotcProgress {
  const row = db.prepare("SELECT wins1, wins2, wins3, level3_at FROM potc_progress WHERE user_id = ?").get(userId) as
    | { wins1: number; wins2: number; wins3: number; level3_at: number | null }
    | undefined;
  if (!row) return { wins: [0, 0, 0], level3: false };
  return { wins: [Number(row.wins1), Number(row.wins2), Number(row.wins3)], level3: row.level3_at !== null };
}

/**
 * One more game won on `level` (1-3) in `mode` (1 CTF, 2 Ship Battle).
 * `wins1-3` count both modes (level unlocks); `modeWins` is this level in
 * this mode alone (treasure keys).
 */
export function addPotcWin(userId: number, level: number, mode: number): PotcProgress & { modeWins: number } {
  const column = level === 3 ? "wins3" : level === 2 ? "wins2" : "wins1";
  db.prepare("INSERT OR IGNORE INTO potc_progress (user_id) VALUES (?)").run(userId);
  db.prepare(`UPDATE potc_progress SET ${column} = ${column} + 1 WHERE user_id = ?`).run(userId);
  db.prepare(
    `INSERT INTO potc_wins (user_id, level, mode, wins) VALUES (?, ?, ?, 1)
     ON CONFLICT (user_id, level, mode) DO UPDATE SET wins = wins + 1`,
  ).run(userId, level, mode);
  const row = db.prepare("SELECT wins FROM potc_wins WHERE user_id = ? AND level = ? AND mode = ?").get(userId, level, mode) as
    | { wins: number }
    | undefined;
  return { ...getPotcProgress(userId), modeWins: Number(row?.wins ?? 0) };
}

/** Captain Blackheart's blessing. True if it was granted just now. */
export function unlockPotcLevel3(userId: number): boolean {
  db.prepare("INSERT OR IGNORE INTO potc_progress (user_id) VALUES (?)").run(userId);
  return db.prepare("UPDATE potc_progress SET level3_at = ? WHERE user_id = ? AND level3_at IS NULL").run(now(), userId).changes > 0;
}

/** How often an NPC pays out — the wiki's "12-hour waiting period". */
export const NPC_COOLDOWN_MS = 12 * 60 * 60 * 1000;

/**
 * Settle an NPC visit: `first` credits on the very first visit, `repeat` if
 * the last reward was at least 12 hours ago, otherwise nothing. Records the
 * reward and credits the player in the same step, so a double-click (which
 * sends 584 twice) cannot claim twice.
 */
export function claimNpcReward(
  userId: number,
  npcCode: number,
  first: number,
  repeat: number,
): { credits: number; firstVisit: boolean; waitMs: number } {
  const row = db
    .prepare("SELECT rewarded_at FROM npc_visits WHERE user_id = ? AND npc_code = ?")
    .get(userId, npcCode) as { rewarded_at?: number } | undefined;
  const t = now();
  let credits = 0;
  let firstVisit = false;
  let waitMs = 0;
  if (row?.rewarded_at === undefined) {
    firstVisit = true;
    credits = first;
    db.prepare(
      "INSERT INTO npc_visits (user_id, npc_code, first_at, rewarded_at) VALUES (?, ?, ?, ?)",
    ).run(userId, npcCode, t, t);
  } else if (t - Number(row.rewarded_at) >= NPC_COOLDOWN_MS) {
    credits = repeat;
    db.prepare("UPDATE npc_visits SET rewarded_at = ? WHERE user_id = ? AND npc_code = ?").run(
      t,
      userId,
      npcCode,
    );
  } else {
    waitMs = NPC_COOLDOWN_MS - (t - Number(row.rewarded_at));
  }
  if (credits > 0) {
    addCredits(userId, credits, `NPC Reward (${npcCode})`);
  }
  return { credits, firstVisit, waitMs };
}

/** Feature or un-feature a guest room (staff). */
export function setGuestRoomFeatured(spaceId: number, featured: boolean): GuestRoom | undefined {
  if (!getGuestRoom(spaceId)) return undefined;
  db.prepare("UPDATE rooms SET featured = ? WHERE id = ?").run(featured ? 1 : 0, spaceId - GUEST_ROOM_ID_BASE);
  return getGuestRoom(spaceId);
}

/** Every featured guest room, newest first. */
export function getFeaturedGuestRooms(): GuestRoom[] {
  const rows = db
    .prepare("SELECT * FROM rooms WHERE featured = 1 ORDER BY id DESC")
    .all() as Array<Record<string, unknown>>;
  return rows.map(rowToRoom);
}

/** Set who may enter a room — one of `ENTRY_STATE`. */
export function setGuestRoomEntryState(spaceId: number, state: number): GuestRoom | undefined {
  if (!getGuestRoom(spaceId)) return undefined;
  db.prepare("UPDATE rooms SET friends_only = ? WHERE id = ?").run(
    toEntryState(state),
    spaceId - GUEST_ROOM_ID_BASE,
  );
  return getGuestRoom(spaceId);
}

/**
 * Sell a room: remove it and pay the owner.
 *
 * Returns the credits the owner now holds, or `undefined` if the id is not one
 * of ours. The room row goes; the id is never reused, because it is an
 * AUTOINCREMENT primary key.
 */
export function deleteGuestRoom(spaceId: number, refund: number): number | undefined {
  const room = getGuestRoom(spaceId);
  if (!room) return undefined;
  db.prepare("DELETE FROM rooms WHERE id = ?").run(spaceId - GUEST_ROOM_ID_BASE);
  addCredits(room.ownerId, refund, `Room Sale (${spaceId})`);
  const owner = getUserById(room.ownerId);
  return owner?.credits ?? 0;
}

/** Look up a room by the space id we advertised. */
export function getGuestRoom(spaceId: number): GuestRoom | undefined {
  if (spaceId < GUEST_ROOM_ID_BASE) {
    return undefined; // a public room code, not one of ours
  }
  const row = db
    .prepare("SELECT * FROM rooms WHERE id = ?")
    .get(spaceId - GUEST_ROOM_ID_BASE) as Record<string, unknown> | undefined;
  return row ? rowToRoom(row) : undefined;
}

export function setCharacter(userId: number, characterName: string, outfitJson?: string): void {
  db.prepare(
    `UPDATE users SET character_name = ?, has_character = 1, outfit_json = ? WHERE id = ?`,
  ).run(characterName, outfitJson ?? null, userId);
}

/**
 * Registration in progress: remember the name and outfit the player chose,
 * WITHOUT making the account a character yet.
 *
 * ⚠ `has_character` is what sends the next login past registration, so it must
 * only flip when registration FINISHES — `AcceptEULA`, the last step
 * (`CRegPage3.SendData`). Setting it at step 1's `CreateAvatar` let a player
 * who closed the window on step 2 or 3 come back fully registered, having
 * never accepted the rules. See `completeCharacter`.
 */
export function savePendingCharacter(userId: number, characterName: string, outfitJson: string): void {
  db.prepare(`UPDATE users SET character_name = ?, outfit_json = ? WHERE id = ?`).run(
    characterName,
    outfitJson,
    userId,
  );
}

export function renameCharacter(userId: number, characterName: string): void {
  db.prepare(`UPDATE users SET character_name = ? WHERE id = ?`).run(characterName, userId);
}

/** Registration finished (the EULA was accepted): the account is a character now. */
export function completeCharacter(userId: number): void {
  db.prepare(`UPDATE users SET has_character = 1 WHERE id = ?`).run(userId);
}

/* ------------------------------------------------------------------ messenger */

/** A player as the messenger shows them: id, character name, last seen. */
export interface MessengerUser {
  id: number;
  name: string;
  /** ms epoch of the last disconnect (or login, for rows older than that). */
  lastSeenAt: number | null;
}

function rowToMessengerUser(row: Record<string, unknown>): MessengerUser {
  const seen = row.last_seen_at ?? row.last_login_at;
  return {
    id: Number(row.id),
    name: String(row.character_name ?? row.username),
    lastSeenAt: seen === null || seen === undefined ? null : Number(seen),
  };
}

export function getMessengerUser(id: number): MessengerUser | undefined {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  return row ? rowToMessengerUser(row as Record<string, unknown>) : undefined;
}

/** Look a player up the way the room profile names them: by CHARACTER name. */
export function getMessengerUserByName(name: string): MessengerUser | undefined {
  const row = db
    .prepare("SELECT * FROM users WHERE character_name = ? COLLATE NOCASE AND has_character = 1")
    .get(name.trim());
  return row ? rowToMessengerUser(row as Record<string, unknown>) : undefined;
}

export function setLastSeen(userId: number): void {
  db.prepare("UPDATE users SET last_seen_at = ? WHERE id = ?").run(now(), userId);
}

export function getFriends(userId: number): MessengerUser[] {
  const rows = db
    .prepare(
      `SELECT u.* FROM friendships f JOIN users u ON u.id = f.friend_id
       WHERE f.user_id = ? ORDER BY u.character_name COLLATE NOCASE`,
    )
    .all(userId) as Array<Record<string, unknown>>;
  return rows.map(rowToMessengerUser);
}

export function areFriends(a: number, b: number): boolean {
  return db.prepare("SELECT 1 FROM friendships WHERE user_id = ? AND friend_id = ?").get(a, b) !== undefined;
}

/** Befriend both ways and drop any request either side had pending. */
export function addFriendship(a: number, b: number): void {
  const insert = db.prepare(
    "INSERT OR IGNORE INTO friendships (user_id, friend_id, created_at) VALUES (?, ?, ?)",
  );
  insert.run(a, b, now());
  insert.run(b, a, now());
  deleteFriendRequest(a, b);
  deleteFriendRequest(b, a);
}

export function removeFriendship(a: number, b: number): void {
  const remove = db.prepare("DELETE FROM friendships WHERE user_id = ? AND friend_id = ?");
  remove.run(a, b);
  remove.run(b, a);
}

/** False when the request already existed, so it is not announced twice. */
export function addFriendRequest(requesterId: number, targetId: number): boolean {
  const result = db
    .prepare(
      "INSERT OR IGNORE INTO friend_requests (requester_id, target_id, created_at) VALUES (?, ?, ?)",
    )
    .run(requesterId, targetId, now());
  return Number(result.changes) > 0;
}

export function hasFriendRequest(requesterId: number, targetId: number): boolean {
  return (
    db
      .prepare("SELECT 1 FROM friend_requests WHERE requester_id = ? AND target_id = ?")
      .get(requesterId, targetId) !== undefined
  );
}

export function deleteFriendRequest(requesterId: number, targetId: number): void {
  db.prepare("DELETE FROM friend_requests WHERE requester_id = ? AND target_id = ?").run(
    requesterId,
    targetId,
  );
}

/** Requests waiting on this player, oldest first — the order they arrived. */
export function getPendingFriendRequests(targetId: number): MessengerUser[] {
  const rows = db
    .prepare(
      `SELECT u.* FROM friend_requests r JOIN users u ON u.id = r.requester_id
       WHERE r.target_id = ? ORDER BY r.created_at`,
    )
    .all(targetId) as Array<Record<string, unknown>>;
  return rows.map(rowToMessengerUser);
}

export function addIgnore(userId: number, ignoredId: number): void {
  db.prepare(
    "INSERT OR IGNORE INTO friend_ignores (user_id, ignored_id, created_at) VALUES (?, ?, ?)",
  ).run(userId, ignoredId, now());
}

export function isIgnoring(userId: number, otherId: number): boolean {
  return (
    db.prepare("SELECT 1 FROM friend_ignores WHERE user_id = ? AND ignored_id = ?").get(userId, otherId) !==
    undefined
  );
}

/** `staff` is plain text from the system; `im` is a friend's canned-token JSON. */
export type MessageKind = "staff" | "im";

export interface StoredMessage {
  id: number;
  recipientId: number;
  senderId: number;
  kind: MessageKind;
  content: string;
  createdAt: number;
}

function rowToMessage(row: Record<string, unknown>): StoredMessage {
  return {
    id: Number(row.id),
    recipientId: Number(row.recipient_id),
    senderId: Number(row.sender_id),
    kind: String(row.kind) === "im" ? "im" : "staff",
    content: String(row.content),
    createdAt: Number(row.created_at),
  };
}

export function addMessage(
  recipientId: number,
  senderId: number,
  kind: MessageKind,
  content: string,
): StoredMessage {
  const createdAt = now();
  const result = db
    .prepare(
      `INSERT INTO messages (recipient_id, sender_id, kind, content, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(recipientId, senderId, kind, content, createdAt);
  return { id: Number(result.lastInsertRowid), recipientId, senderId, kind, content, createdAt };
}

/** Everything still in the player's inbox, oldest first. */
export function getUnreadMessages(recipientId: number): StoredMessage[] {
  const rows = db
    .prepare("SELECT * FROM messages WHERE recipient_id = ? AND read_at IS NULL ORDER BY id")
    .all(recipientId) as Array<Record<string, unknown>>;
  return rows.map(rowToMessage);
}

/** Scoped to the recipient, so nobody can clear someone else's inbox by id. */
export function markMessageRead(recipientId: number, messageId: number): boolean {
  const result = db
    .prepare("UPDATE messages SET read_at = ? WHERE id = ? AND recipient_id = ? AND read_at IS NULL")
    .run(now(), messageId, recipientId);
  return Number(result.changes) > 0;
}

/* ------------------------------------------------------------------- sessions */

export function createSession(userId: number): string {
  const token = randomBytes(32).toString("hex");
  db.prepare(
    "INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
  ).run(token, userId, now(), now() + SESSION_TTL_MS);
  return token;
}

export function getUserBySession(token: string | undefined): User | undefined {
  if (!token) {
    return undefined;
  }
  const row = db
    .prepare(
      `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > ?`,
    )
    .get(token, now());
  return row ? rowToUser(row as Record<string, unknown>) : undefined;
}

export function deleteSession(token: string): void {
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

/* -------------------------------------------------------------------- tickets */

/** Mint a one-shot ticket for the client embed. */
export function createTicket(userId: number): string {
  const ticket = randomBytes(16).toString("hex");
  db.prepare(
    "INSERT INTO tickets (ticket, user_id, issued_at, expires_at) VALUES (?, ?, ?, ?)",
  ).run(ticket, userId, now(), now() + TICKET_TTL_MS);
  return ticket;
}

/**
 * Resolve an unused, unexpired ticket to its user WITHOUT consuming it: the
 * client fetches its variables (and, for Shockwave, GetSec) with the ticket
 * before it logs in. Logging in consumes it (`claimTicket`); after that it
 * resolves to nobody.
 */
export function getUserByTicket(ticket: string | undefined): User | undefined {
  if (!ticket) {
    return undefined;
  }
  const row = db
    .prepare(
      `SELECT u.* FROM tickets t JOIN users u ON u.id = t.user_id
       WHERE t.ticket = ? AND t.expires_at > ? AND t.consumed_at IS NULL`,
    )
    .get(ticket, now());
  return row ? rowToUser(row as Record<string, unknown>) : undefined;
}

/**
 * The game login: resolve a ticket and consume it in one step, so it logs in
 * exactly once. A ticket that leaks after that (logs, a URL) is worthless.
 */
export function claimTicket(ticket: string | undefined): User | undefined {
  if (!ticket) {
    return undefined;
  }
  const claimed = db
    .prepare("UPDATE tickets SET consumed_at = ? WHERE ticket = ? AND consumed_at IS NULL AND expires_at > ?")
    .run(now(), ticket, now());
  if (claimed.changes !== 1) return undefined;
  const row = db
    .prepare("SELECT u.* FROM tickets t JOIN users u ON u.id = t.user_id WHERE t.ticket = ?")
    .get(ticket);
  return row ? rowToUser(row as Record<string, unknown>) : undefined;
}

export function markTicketConsumed(ticket: string): void {
  db.prepare("UPDATE tickets SET consumed_at = ? WHERE ticket = ? AND consumed_at IS NULL").run(
    now(),
    ticket,
  );
}

/** Housekeeping: drop expired sessions and tickets. Cheap, called on boot. */
export function pruneExpired(): void {
  db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now());
  db.prepare("DELETE FROM tickets WHERE expires_at <= ?").run(now());
}

export function databasePath(): string {
  return DB_PATH;
}
