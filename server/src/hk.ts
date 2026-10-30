/**
 * HOUSEKEEPING — the staff portal at /hk.
 *
 * Served by the asset server (5199). Reads and writes the database directly;
 * anything that must reach a CONNECTED player (alert, kick, move, refreshing
 * their credits or inventory) is forwarded to the game server's /hk-bridge,
 * which holds the sockets (mus-server.ts `handleHkBridge`).
 *
 * Access: any moderator permission (`users.permissions`, set with
 * tools/set-admin.mjs) opens the portal. Each action needs its matching
 * permission — alert, kick, ban, mute, forcenamechange — and anything that
 * creates value or rewrites an account (give, credits, inventory, password,
 * permissions) or the shop catalogue needs ALL of them, which is what "admin" already means here
 * (db.ts `ALL_PERMISSIONS`).
 *
 * Every state-changing call is POST with a per-session CSRF token and is written
 * to `staff_audit`.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ALL_PERMISSIONS,
  ITEM_CATEGORY,
  PERMISSIONS,
  addItems,
  addMessage,
  createSession,
  db,
  deleteSession,
  getFriends,
  getGuestRoom,
  getOutfit,
  getRoomsOwnedBy,
  getUserById,
  grantItemPair,
  removeFriendship,
  setCredits,
  setGuestRoomEntryState,
  setGuestRoomFeatured,
  setPassword,
  setPermissions,
  setSlogan,
  verifyLogin,
  type Permission,
  type User,
} from "./db.js";
import {
  SESSION_COOKIE,
  clearSessionCookie,
  currentUser,
  parseCookies,
  readFormBody,
  redirect,
  setSessionCookie,
} from "./auth.js";
import {
  activeSanction,
  addSanction,
  audit,
  bridgeSecret,
  liftSanctions,
  logLogin,
  sanctionHistory,
  type SanctionKind,
} from "./staff-db.js";
import { clientIp as realClientIp } from "./client-ip.js";
import {
  describeCatalogChanges,
  displayName,
  guestRoomSpaces,
  itemName,
  parseCatalogDraft,
  roomName,
  searchItemNames,
  seedRows,
  shopName,
  storedCatalog,
  validateCatalog,
} from "./catalog.js";
import {
  CatalogConflict,
  catalogVersion,
  resetStoredCatalog,
  saveStoredCatalog,
  type StoredShop,
} from "./catalog-store.js";
import { isPairedTeleporter } from "./furni-footprint.js";
import { avatarFor, iconFor, isFurniCode, roomIconFor, warmIcons } from "./hk-icons.js";

/** Start building /hk's icon index now, off the request path. See warmIcons. */
export const warmHk = (): Promise<void> => warmIcons();

const here = dirname(fileURLToPath(import.meta.url));
const STATIC = join(here, "..", "public", "hk");
const GAME_SERVER = process.env.VMK_GAME_SERVER ?? "http://127.0.0.1:8080";
const CAPACITY = Number(process.env.VMK_HK_CAPACITY ?? 2000);

type Row = Record<string, unknown>;
type Json = Record<string, unknown>;

class HkError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/* --------------------------------------------------------------- utilities */

const isStaff = (u: User | undefined): u is User => Boolean(u && u.permissions.length > 0);
const isAdmin = (u: User) => ALL_PERMISSIONS.every((p) => u.permissions.includes(p));
const has = (u: User, p: Permission) => isAdmin(u) || u.permissions.includes(PERMISSIONS.indexOf(p) + 1);
const permNames = (perms: number[]) => perms.map((p) => PERMISSIONS[p - 1]).filter(Boolean);

function need(u: User, p: Permission | "admin"): void {
  const ok = p === "admin" ? isAdmin(u) : has(u, p);
  if (!ok) throw new HkError(403, p === "admin" ? "That needs full admin permissions." : `That needs the "${p}" permission.`);
}

/**
 * The client's address; behind a trusted proxy, the one it forwarded. See
 * client-ip.ts — this used to take the LEFTMOST X-Forwarded-For entry, which
 * the client writes itself, so anyone could pick the IP the staff saw.
 */
function clientIp(req: IncomingMessage): string {
  return realClientIp(req.socket.remoteAddress, req.headers);
}

/** Ties a CSRF token to the session cookie, so it cannot be replayed elsewhere. */
function csrfFor(req: IncomingMessage): string {
  const token = parseCookies(req)[SESSION_COOKIE] ?? "";
  return createHmac("sha256", bridgeSecret()).update(`hk-csrf:${token}`).digest("hex");
}

function csrfOk(req: IncomingMessage): boolean {
  const presented = Buffer.from(String(req.headers["x-hk-csrf"] ?? ""));
  const expected = Buffer.from(csrfFor(req));
  return presented.length === expected.length && timingSafeEqual(presented, expected);
}

function sendJson(res: ServerResponse, status: number, value: unknown): void {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(value));
}

function readJson(req: IncomingMessage): Promise<Json> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => {
      size += c.length;
      if (size > 256 * 1024) {
        reject(new HkError(413, "Request too large."));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      try {
        const text = Buffer.concat(chunks).toString("utf8");
        resolve(text ? (JSON.parse(text) as Json) : {});
      } catch {
        reject(new HkError(400, "Bad JSON."));
      }
    });
    req.on("error", reject);
  });
}

/** Call the game server. Never throws; an unreachable server reads as offline. */
async function bridge(action: string, body: Json = {}): Promise<Json & { ok: boolean; offline?: boolean }> {
  try {
    const response = await fetch(`${GAME_SERVER}/hk-bridge/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-HK-Secret": bridgeSecret() },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
    });
    return (await response.json()) as Json & { ok: boolean };
  } catch {
    return { ok: false, offline: true, error: "The game server is not reachable." };
  }
}

interface OnlineUser {
  userId: number;
  username: string;
  name: string;
  room: string | null;
  roomId: number | null;
  roomTitle: string | null;
  guestRoom: boolean;
  ip: string;
}

async function onlineUsers(): Promise<{ users: OnlineUser[]; gameUp: boolean }> {
  const r = await bridge("online");
  return { users: (r.users as OnlineUser[] | undefined) ?? [], gameUp: !r.offline };
}

const int = (v: unknown, what = "value"): number => {
  const n = Number(v);
  if (!Number.isInteger(n)) throw new HkError(400, `Bad ${what}.`);
  return n;
};
const str = (v: unknown, max = 2000): string => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** id -> display names, for any rows that reference users. */
function namesFor(ids: Iterable<number>): Record<number, { username: string; name: string }> {
  const out: Record<number, { username: string; name: string }> = {};
  const list = [...new Set([...ids].filter((id) => Number.isInteger(id) && id > 0))];
  if (list.length === 0) return out;
  const rows = db
    .prepare(`SELECT id, username, character_name FROM users WHERE id IN (${list.map(() => "?").join(",")})`)
    .all(...list) as Row[];
  for (const r of rows) {
    out[Number(r.id)] = { username: String(r.username), name: String(r.character_name ?? r.username) };
  }
  return out;
}

function userByName(name: string): User | undefined {
  const row = db
    .prepare("SELECT id FROM users WHERE username = ? COLLATE NOCASE OR character_name = ? COLLATE NOCASE LIMIT 1")
    .get(name, name) as Row | undefined;
  return row ? getUserById(Number(row.id)) : undefined;
}

function requireUser(id: number): User {
  const u = getUserById(id);
  if (!u) throw new HkError(404, `No user ${id}.`);
  return u;
}

/** Inventory category for a code the staff member did not classify. */
function guessCategory(code: number): number {
  if (code >= 20000 && code < 50000) return ITEM_CATEGORY.clothes;
  if (code >= 3000 && code < 4000 && !isFurniCode(code)) return ITEM_CATEGORY.posters;
  if (isFurniCode(code)) return ITEM_CATEGORY.items;
  if ((code >= 2000 && code < 3000) || (code >= 12000 && code < 13000)) return ITEM_CATEGORY.pins;
  return ITEM_CATEGORY.items;
}

const DURATIONS: Record<string, number | null> = {
  "1h": 3600e3,
  "1d": 86400e3,
  "3d": 3 * 86400e3,
  "7d": 7 * 86400e3,
  "30d": 30 * 86400e3,
  "90d": 90 * 86400e3,
  perm: null,
};
function duration(v: unknown): number | null {
  const key = str(v) || "perm";
  if (key in DURATIONS) return DURATIONS[key];
  const hours = Number(key);
  if (Number.isFinite(hours) && hours > 0) return hours * 3600e3;
  throw new HkError(400, "Bad duration.");
}

/* -------------------------------------------------------------- login page */

const loginAttempts = new Map<string, { count: number; until: number }>();

function serveStatic(res: ServerResponse, rel: string): boolean {
  const file = normalize(join(STATIC, rel));
  if (!file.startsWith(STATIC) || !existsSync(file) || !statSync(file).isFile()) return false;
  const type =
    { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png" }[
      extname(file)
    ] ?? "application/octet-stream";
  res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-cache" });
  res.end(readFileSync(file));
  return true;
}

function escapeHtml(s: string): string {
  return s.replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function serveLogin(res: ServerResponse, error = ""): void {
  const html = readFileSync(join(STATIC, "login.html"), "utf8").replace(
    "<!--ERROR-->",
    error ? `<div class="alert alert-danger">${escapeHtml(error)}</div>` : "",
  );
  res.writeHead(error ? 401 : 200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  res.end(html);
}

async function handleLogin(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const ip = clientIp(req);
  const gate = loginAttempts.get(ip);
  if (gate && gate.until > Date.now() && gate.count >= 5) {
    serveLogin(res, "Too many attempts. Wait a few minutes and try again.");
    return;
  }
  const form = await readFormBody(req);
  const username = (form.get("username") ?? "").trim();
  const password = form.get("password") ?? "";
  const user = username && password ? verifyLogin(username, password) : undefined;
  if (!isStaff(user)) {
    const prev = gate && gate.until > Date.now() ? gate.count : 0;
    loginAttempts.set(ip, { count: prev + 1, until: Date.now() + 5 * 60e3 });
    // Wrong password and "not staff" read the same, so the page does not
    // reveal who holds permissions.
    serveLogin(res, "Invalid username or password.");
    console.warn(`[hk] failed login for "${username}" from ${ip}`);
    return;
  }
  loginAttempts.delete(ip);
  setSessionCookie(res, createSession(user.id));
  logLogin(user.id, "hk", ip, "", String(req.headers["user-agent"] ?? ""));
  audit(user.id, "login", null, "", ip);
  console.log(`[hk] ${user.username} (id=${user.id}) signed in from ${ip}`);
  redirect(res, "/hk");
}

/* ------------------------------------------------------------------ router */

/** Returns true if the request was an /hk request (handled or refused). */
export function handleHk(req: IncomingMessage, res: ServerResponse, url: URL, pathname: string): boolean {
  if (pathname !== "/hk" && !pathname.startsWith("/hk/")) return false;
  const rest = pathname.slice("/hk".length).replace(/^\/+/, "");

  if (rest.startsWith("static/")) {
    if (!serveStatic(res, rest.slice("static/".length))) res.writeHead(404).end("not found");
    return true;
  }
  if (rest === "login" && req.method === "POST") {
    handleLogin(req, res).catch((err) => {
      console.error("[hk] login failed:", err);
      if (!res.headersSent) serveLogin(res, "Something went wrong. Try again.");
    });
    return true;
  }
  if (rest === "logout") {
    const user = currentUser(req);
    const token = parseCookies(req)[SESSION_COOKIE];
    if (token) deleteSession(token);
    if (user) audit(user.id, "logout", null, "", clientIp(req));
    clearSessionCookie(res);
    redirect(res, "/hk");
    return true;
  }

  const user = currentUser(req);
  if (rest.startsWith("api/")) {
    if (!isStaff(user)) {
      sendJson(res, 401, { ok: false, error: "Not signed in." });
      return true;
    }
    if (req.method !== "GET" && !csrfOk(req)) {
      sendJson(res, 403, { ok: false, error: "Your session expired — reload the page." });
      return true;
    }
    api(req, user, rest.slice("api/".length), url)
      .then((value) => sendJson(res, 200, { ok: true, ...value }))
      .catch((err: unknown) => {
        if (err instanceof HkError) sendJson(res, err.status, { ok: false, error: err.message });
        else {
          console.error(`[hk] ${req.method} ${pathname} failed:`, err);
          sendJson(res, 500, { ok: false, error: "Internal error — see the server log." });
        }
      });
    return true;
  }

  // Everything else is the app shell; the page routes itself from the hash.
  if (!isStaff(user)) {
    serveLogin(res);
    return true;
  }
  const html = readFileSync(join(STATIC, "index.html"), "utf8").replace(
    "<!--BOOT-->",
    `<meta name="hk-csrf" content="${csrfFor(req)}">`,
  );
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  res.end(html);
  return true;
}

/* --------------------------------------------------------------------- API */

async function api(req: IncomingMessage, me: User, path: string, url: URL): Promise<Json> {
  const method = req.method ?? "GET";
  const q = url.searchParams;
  const ip = clientIp(req);
  const body = method === "POST" ? await readJson(req) : {};
  const seg = path.split("/").filter(Boolean);
  // Avatars and item icons need hk-icons' bitmap index. It is built in the
  // background at startup; wait for it rather than letting avatarFor build it
  // synchronously, which froze the entire web server for seconds.
  await warmIcons();
  const log = (action: string, target: number | null, detail = "") => audit(me.id, action, target, detail, ip);

  // ---- session / server
  if (path === "me") {
    return {
      me: {
        id: me.id,
        username: me.username,
        name: me.character_name ?? me.username,
        permissions: permNames(me.permissions),
        admin: isAdmin(me),
      },
    };
  }

  if (path === "stats") {
    const { users, gameUp } = await onlineUsers();
    const count = (sql: string) => Number((db.prepare(sql).get() as Row).n);
    return {
      gameUp,
      online: users.length,
      capacity: CAPACITY,
      users: count("SELECT COUNT(*) n FROM users"),
      rooms: count("SELECT COUNT(*) n FROM rooms"),
      openCalls: count("SELECT COUNT(*) n FROM cfh_calls WHERE closed_at IS NULL"),
      activeBans: Number(
        (db.prepare(
          "SELECT COUNT(*) n FROM staff_bans WHERE kind = 'ban' AND lifted_at IS NULL AND (expires_at IS NULL OR expires_at > ?)",
        ).get(Date.now()) as Row).n,
      ),
      chatToday: Number(
        (db.prepare("SELECT COUNT(*) n FROM chat_log WHERE created_at > ? AND kind = 'chat'").get(Date.now() - 86400e3) as Row).n,
      ),
    };
  }

  if (path === "online") {
    const { users, gameUp } = await onlineUsers();
    return { gameUp, users };
  }

  if (path === "public-rooms") {
    const r = await bridge("rooms");
    return { gameUp: !r.offline, rooms: r.rooms ?? [] };
  }

  if (path === "alert-all" && method === "POST") {
    need(me, "alert");
    const text = str(body.text, 240);
    if (!text) throw new HkError(400, "Write the alert first.");
    const r = await bridge("alert", { all: true, text });
    if (r.offline) throw new HkError(502, String(r.error));
    log("alert_all", null, text);
    return { delivered: r.delivered };
  }

  // ---- item pictures and lookup
  if (seg[0] === "icon" && seg[1]) {
    if (q.get("room")) return { icon: roomIconFor(int(seg[1], "code")) };
    const cat = q.get("cat");
    return { icon: iconFor(int(seg[1], "code"), cat ? int(cat, "category") : undefined) };
  }

  if (path === "items/search") {
    const term = str(q.get("q"), 60);
    if (/^\d+$/.test(term)) {
      const code = Number(term);
      return { items: [{ code, name: itemName(code), category: guessCategory(code) }] };
    }
    return {
      items: searchItemNames(term, 60).map((i) => ({ ...i, category: guessCategory(i.code) })),
    };
  }

  // ---- users
  if (path === "users/search") {
    const term = str(q.get("q"), 64);
    if (!term) return { users: [] };
    let rows: Row[];
    if (/^\d+$/.test(term)) {
      rows = db.prepare("SELECT * FROM users WHERE id = ?").all(Number(term)) as Row[];
    } else if (/^[0-9a-f:.]+$/i.test(term) && /[.:]/.test(term)) {
      rows = db
        .prepare(
          "SELECT DISTINCT u.* FROM login_log l JOIN users u ON u.id = l.user_id WHERE l.ip LIKE ? ORDER BY u.id LIMIT 100",
        )
        .all(`${term}%`) as Row[];
    } else {
      rows = db
        .prepare(
          `SELECT * FROM users WHERE username LIKE ? OR character_name LIKE ?
           ORDER BY (username = ? COLLATE NOCASE OR character_name = ? COLLATE NOCASE) DESC, id LIMIT 100`,
        )
        .all(`%${term}%`, `%${term}%`, term, term) as Row[];
    }
    const { users: online } = await onlineUsers();
    const live = new Set(online.map((o) => o.userId));
    return {
      users: rows.map((r) => ({
        id: Number(r.id),
        username: String(r.username),
        name: String(r.character_name ?? ""),
        credits: Number(r.credits),
        staff: String(r.permissions ?? "") !== "",
        createdAt: Number(r.created_at),
        lastSeen: Number(r.last_seen_at ?? r.last_login_at ?? 0) || null,
        online: live.has(Number(r.id)),
        banned: Boolean(activeSanction(Number(r.id), "ban")),
      })),
    };
  }

  if (seg[0] === "users" && seg[1]) {
    const id = int(seg[1], "user id");
    const user = requireUser(id);
    const sub = seg[2] ?? "";

    if (sub === "" && method === "GET") return { user: await profile(user) };

    if (sub === "inventory") {
      const items = (db.prepare("SELECT * FROM items WHERE owner_id = ? ORDER BY category, type_code, id").all(id) as Row[]).map(
        (r) => ({
          id: Number(r.id),
          typeCode: Number(r.type_code),
          category: Number(r.category),
          name: itemName(Number(r.type_code)),
          worn: Number(r.worn ?? 0) === 1,
          level: r.level == null ? null : Number(r.level),
          pairId: r.pair_id == null ? null : Number(r.pair_id),
          ticketRoom: r.room_id == null ? null : Number(r.room_id),
          expiresAt: r.expires_at == null ? null : Number(r.expires_at),
          createdAt: Number(r.created_at),
        }),
      );
      const placed = (db.prepare("SELECT ref, room, type_code, placed_at FROM room_items WHERE owner_id = ? ORDER BY room, ref").all(id) as Row[]).map(
        (r) => ({
          ref: Number(r.ref),
          room: String(r.room),
          roomName: String(r.room).startsWith("guest:") ? getGuestRoom(Number(String(r.room).slice(6)))?.name ?? String(r.room) : String(r.room),
          typeCode: Number(r.type_code),
          name: itemName(Number(r.type_code)),
          placedAt: Number(r.placed_at),
        }),
      );
      const snapshots = (db.prepare(
        "SELECT id, staff_id, credits, created_at, restored_at, json_array_length(items) n FROM inventory_snapshots WHERE user_id = ? ORDER BY id DESC",
      ).all(id) as Row[]).map((r) => ({
        id: Number(r.id),
        staffId: Number(r.staff_id),
        credits: Number(r.credits),
        count: Number(r.n),
        createdAt: Number(r.created_at),
        restoredAt: r.restored_at == null ? null : Number(r.restored_at),
      }));
      return { items, placed, snapshots, names: namesFor(snapshots.map((s) => s.staffId)) };
    }

    if (sub === "purchases") {
      const rows = db
        .prepare("SELECT * FROM credit_log WHERE user_id = ? ORDER BY id DESC LIMIT 500")
        .all(id) as Row[];
      return {
        purchases: rows.map((r) => ({
          id: Number(r.id),
          reason: String(r.reason),
          itemCode: r.item_code == null ? null : Number(r.item_code),
          itemName: r.item_code == null ? "" : itemName(Number(r.item_code)),
          delta: Number(r.delta),
          balance: Number(r.balance),
          staffId: r.staff_id == null ? null : Number(r.staff_id),
          at: Number(r.created_at),
        })),
        names: namesFor(rows.map((r) => Number(r.staff_id))),
      };
    }

    if (sub === "sessions") {
      const rows = db.prepare("SELECT * FROM login_log WHERE user_id = ? ORDER BY id DESC LIMIT 300").all(id) as Row[];
      return {
        sessions: rows.map((r) => ({
          id: Number(r.id),
          source: String(r.source),
          ip: String(r.ip),
          machineId: String(r.machine_id),
          userAgent: String(r.user_agent),
          at: Number(r.created_at),
          endedAt: r.ended_at == null ? null : Number(r.ended_at),
        })),
      };
    }

    if (sub === "trades") {
      const rows = db
        .prepare("SELECT * FROM trade_log WHERE user_a = ? OR user_b = ? ORDER BY id DESC LIMIT 200")
        .all(id, id) as Row[];
      const withNames = (json: unknown) =>
        (JSON.parse(String(json)) as Array<{ id: number; typeCode: number; category: number }>).map((i) => ({
          ...i,
          name: itemName(i.typeCode),
        }));
      return {
        trades: rows.map((r) => ({
          id: Number(r.id),
          a: Number(r.user_a),
          b: Number(r.user_b),
          room: String(r.room),
          itemsA: withNames(r.items_a),
          itemsB: withNames(r.items_b),
          ipA: String(r.remote_a),
          ipB: String(r.remote_b),
          at: Number(r.created_at),
        })),
        names: namesFor(rows.flatMap((r) => [Number(r.user_a), Number(r.user_b)])),
      };
    }

    if (sub === "notes") {
      if (method === "POST") {
        const note = str(body.note, 4000);
        if (!note) throw new HkError(400, "Write the note first.");
        db.prepare("INSERT INTO staff_notes (user_id, staff_id, note, created_at) VALUES (?, ?, ?, ?)").run(
          id,
          me.id,
          note,
          Date.now(),
        );
        log("note_add", id, note);
      }
      const rows = db.prepare("SELECT * FROM staff_notes WHERE user_id = ? ORDER BY id DESC").all(id) as Row[];
      return {
        notes: rows.map((r) => ({ id: Number(r.id), staffId: Number(r.staff_id), note: String(r.note), at: Number(r.created_at) })),
        names: namesFor(rows.map((r) => Number(r.staff_id))),
      };
    }

    if (sub === "bans") {
      const history = sanctionHistory(id);
      return { bans: history, names: namesFor(history.flatMap((b) => [b.staffId, b.liftedBy ?? 0])) };
    }

    if (sub === "cfh") {
      const rows = db
        .prepare("SELECT * FROM cfh_calls WHERE reporter_id = ? OR reported_id = ? ORDER BY id DESC LIMIT 200")
        .all(id, id) as Row[];
      return { calls: rows.map(callOut), names: namesFor(rows.flatMap(callUserIds)) };
    }

    if (sub === "friends") {
      return { friends: getFriends(id) };
    }

    if (sub === "rooms") {
      return { rooms: getRoomsOwnedBy(id) };
    }

    if (sub === "clones") {
      return clones(id);
    }

    if (sub === "action" && method === "POST") {
      return userAction(me, user, body, log);
    }
  }

  // ---- chat logs
  if (path === "chatlogs") {
    const where: string[] = [];
    const params: Array<string | number> = [];
    const user = q.get("user");
    if (user) {
      const u = /^\d+$/.test(user) ? getUserById(Number(user)) : userByName(user);
      if (!u) throw new HkError(404, `No user "${user}".`);
      where.push("(c.user_id = ? OR c.target_id = ?)");
      params.push(u.id, u.id);
    }
    const room = q.get("room");
    if (room) {
      if (/^\d+$/.test(room)) {
        where.push("c.room_code = ?");
        params.push(Number(room));
      } else {
        where.push("(c.room = ? OR c.room_name LIKE ?)");
        params.push(room, `%${room}%`);
      }
    }
    const text = q.get("q");
    if (text) {
      where.push("c.message LIKE ?");
      params.push(`%${text}%`);
    }
    const kind = q.get("kind");
    if (kind && kind !== "all") {
      where.push("c.kind = ?");
      params.push(kind);
    } else if (!kind && !user) {
      // Room enter/leave lines are noise in an unfiltered view; shown for one
      // user (the original's breadcrumb trail) or when asked for with "all".
      where.push("c.kind != 'system'");
    }
    const from = Number(q.get("from"));
    if (from) {
      where.push("c.created_at >= ?");
      params.push(from);
    }
    const to = Number(q.get("to"));
    if (to) {
      where.push("c.created_at <= ?");
      params.push(to);
    }
    const before = Number(q.get("before"));
    if (before) {
      where.push("c.id < ?");
      params.push(before);
    }
    const limit = Math.min(Math.max(Number(q.get("limit")) || 100, 1), 500);
    const rows = db
      .prepare(
        `SELECT c.* FROM chat_log c ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY c.id DESC LIMIT ?`,
      )
      .all(...params, limit) as Row[];
    return {
      lines: rows.map((r) => ({
        id: Number(r.id),
        userId: Number(r.user_id),
        room: String(r.room),
        roomCode: r.room_code == null ? null : Number(r.room_code),
        roomName: String(r.room_name),
        kind: String(r.kind),
        message: String(r.message),
        targetId: r.target_id == null ? null : Number(r.target_id),
        at: Number(r.created_at),
      })),
      names: namesFor(rows.flatMap((r) => [Number(r.user_id), Number(r.target_id ?? 0)])),
    };
  }

  // ---- call for help
  if (path === "cfh") {
    const status = q.get("status") ?? "open";
    const before = Number(q.get("before")) || Number.MAX_SAFE_INTEGER;
    const rows = db
      .prepare(
        `SELECT * FROM cfh_calls WHERE id < ? ${status === "open" ? "AND closed_at IS NULL" : status === "closed" ? "AND closed_at IS NOT NULL" : ""}
         ORDER BY id DESC LIMIT 50`,
      )
      .all(before) as Row[];
    return { calls: rows.map(callOut), names: namesFor(rows.flatMap(callUserIds)) };
  }

  if (seg[0] === "cfh" && seg[1] && method === "POST") {
    const id = int(seg[1], "call id");
    const call = db.prepare("SELECT * FROM cfh_calls WHERE id = ?").get(id) as Row | undefined;
    if (!call) throw new HkError(404, "No such call.");
    const action = str(body.action);
    if (action === "pickup") {
      db.prepare("UPDATE cfh_calls SET picked_by = ?, picked_at = ? WHERE id = ?").run(me.id, Date.now(), id);
    } else if (action === "release") {
      db.prepare("UPDATE cfh_calls SET picked_by = NULL, picked_at = NULL WHERE id = ?").run(id);
    } else if (action === "close") {
      db.prepare("UPDATE cfh_calls SET closed_by = ?, closed_at = ?, resolution = ? WHERE id = ?").run(
        me.id,
        Date.now(),
        str(body.resolution, 500),
        id,
      );
    } else if (action === "reopen") {
      db.prepare("UPDATE cfh_calls SET closed_by = NULL, closed_at = NULL WHERE id = ?").run(id);
    } else throw new HkError(400, "Unknown action.");
    log(`cfh_${action}`, Number(call.reporter_id), `call #${id} ${str(body.resolution, 500)}`);
    return { call: callOut(db.prepare("SELECT * FROM cfh_calls WHERE id = ?").get(id) as Row) };
  }

  // ---- rooms
  if (path === "rooms/search") {
    const term = str(q.get("q"), 64);
    let rows: Row[];
    if (/^\d+$/.test(term)) {
      const n = Number(term);
      rows = db.prepare("SELECT * FROM rooms WHERE id = ? OR id = ? OR owner_id = ?").all(n - 100000, n, n) as Row[];
    } else if (term) {
      rows = db
        .prepare(
          `SELECT r.* FROM rooms r JOIN users u ON u.id = r.owner_id
           WHERE r.name LIKE ? OR u.username LIKE ? OR u.character_name LIKE ? ORDER BY r.id DESC LIMIT 200`,
        )
        .all(`%${term}%`, `%${term}%`, `%${term}%`) as Row[];
    } else {
      rows = db.prepare("SELECT * FROM rooms ORDER BY id DESC LIMIT 100").all() as Row[];
    }
    const { users } = await onlineUsers();
    const rooms = rows.map((r) => {
      const spaceId = 100000 + Number(r.id);
      return {
        ...getGuestRoom(spaceId)!,
        createdAt: Number(r.created_at),
        items: Number((db.prepare("SELECT COUNT(*) n FROM room_items WHERE room = ?").get(`guest:${spaceId}`) as Row).n),
        users: users.filter((u) => u.room === `guest:${spaceId}`).length,
      };
    });
    return { rooms, names: namesFor(rooms.map((r) => r.ownerId)) };
  }

  if (seg[0] === "rooms" && seg[1]) {
    const spaceId = int(seg[1], "room id");
    const room = getGuestRoom(spaceId);
    if (!room) throw new HkError(404, "No such guest room.");
    if (seg[2] === "action" && method === "POST") {
      const action = str(body.action);
      if (action === "feature") {
        need(me, "admin");
        setGuestRoomFeatured(spaceId, Boolean(body.on));
      } else if (action === "entry") {
        need(me, "roomkick");
        setGuestRoomEntryState(spaceId, int(body.state, "state"));
      } else if (action === "rename") {
        need(me, "forcenamechange");
        const name = str(body.name, 60);
        if (!name) throw new HkError(400, "Name the room.");
        db.prepare("UPDATE rooms SET name = ?, description = ? WHERE id = ?").run(
          name,
          str(body.description, 300),
          spaceId - 100000,
        );
      } else throw new HkError(400, "Unknown action.");
      log(`room_${action}`, room.ownerId, `room ${spaceId} ${JSON.stringify(body)}`);
    }
    const { users } = await onlineUsers();
    const items = (db.prepare("SELECT * FROM room_items WHERE room = ? ORDER BY ref").all(`guest:${spaceId}`) as Row[]).map((r) => ({
      ref: Number(r.ref),
      typeCode: Number(r.type_code),
      name: itemName(Number(r.type_code)),
      ownerId: r.owner_id == null ? null : Number(r.owner_id),
      category: Number(r.category ?? 1),
      placedAt: Number(r.placed_at),
    }));
    return {
      room: getGuestRoom(spaceId),
      items,
      users: users.filter((u) => u.room === `guest:${spaceId}`),
      names: namesFor([room.ownerId, ...items.map((i) => i.ownerId ?? 0)]),
    };
  }

  // ---- clone check
  if (path === "clones") {
    const term = str(q.get("q"), 64);
    if (!term) return { groups: [] };
    const u = /^\d+$/.test(term) ? getUserById(Number(term)) : userByName(term);
    if (u) return clones(u.id);
    // An address: everyone who used it.
    const rows = db
      .prepare(
        `SELECT l.user_id, COUNT(*) n, MAX(l.created_at) last FROM login_log l WHERE l.ip = ? OR l.machine_id = ?
         GROUP BY l.user_id ORDER BY last DESC`,
      )
      .all(term, term) as Row[];
    return {
      target: null,
      matches: rows.map((r) => ({ userId: Number(r.user_id), via: [term], count: Number(r.n), last: Number(r.last) })),
      names: namesFor(rows.map((r) => Number(r.user_id))),
    };
  }

  // ---- bulk tools
  if (seg[0] === "bulk" && method === "POST") {
    const names = (Array.isArray(body.names) ? body.names : String(body.names ?? "").split(/[\n,]+/))
      .map((n) => String(n).trim())
      .filter(Boolean)
      .slice(0, 500);
    const resolved = names.map((n) => ({ name: n, user: /^\d+$/.test(n) ? getUserById(Number(n)) : userByName(n) }));
    const missing = resolved.filter((r) => !r.user).map((r) => r.name);
    const targets = resolved.filter((r) => r.user).map((r) => r.user!);
    if (targets.length === 0) throw new HkError(400, "None of those names matched a user.");
    const results: string[] = [];
    for (const target of targets) {
      const out = await userAction(me, target, { ...body, action: seg[1] }, log);
      results.push(`${target.character_name ?? target.username}: ${String(out.message ?? "done")}`);
    }
    return { results, missing };
  }

  // ---- shop catalogue (catalog.ts, catalog-store.ts)
  // A save replaces the whole catalogue in one transaction and bumps its
  // version; the game server rebuilds on the next shop open, no bridge needed.
  if (path === "catalog" && method === "GET") {
    need(me, "admin");
    const shops = storedCatalog();
    return {
      version: catalogVersion(),
      shops: shops.map((shop) => ({
        ...shop,
        name: shopName(shop.nameId) ?? null,
        pages: shop.pages.map((page) => ({
          ...page,
          products: page.products.map((item) => ({
            ...item,
            // Guest rooms are not items: the shop names them from RoomDescHd.<code>.
            name: page.layout === 3 ? roomName(item.code) ?? `Room ${item.code}` : displayName(item.code),
          })),
        })),
      })),
      spaces: guestRoomSpaces(),
      issues: validateCatalog(shops),
    };
  }

  if ((path === "catalog" || path === "catalog/check") && method === "POST") {
    need(me, "admin");
    const before = storedCatalog();
    let shops: StoredShop[];
    try {
      shops = parseCatalogDraft(body.shops, before);
    } catch (err) {
      throw new HkError(400, (err as Error).message);
    }
    const issues = validateCatalog(shops);
    const changes = describeCatalogChanges(before, shops);
    if (path === "catalog/check") return { issues, changes };

    const errors = issues.filter((i) => i.level === "error");
    if (errors.length) {
      throw new HkError(400, `Not saved — ${errors.length} problem(s) to fix first. ${errors[0].message}`);
    }
    if (changes.length === 0) return { message: "Nothing changed.", version: catalogVersion() };
    let version: number;
    try {
      version = saveStoredCatalog(shops, int(body.version, "version"));
    } catch (err) {
      if (err instanceof CatalogConflict) throw new HkError(409, err.message);
      throw err;
    }
    log("catalog_edit", null, `${changes.length} change(s): ${changes.join("; ")}`);
    return { message: `Saved ${changes.length} change(s). Players see them the next time they open the shop.`, version };
  }

  if (path === "catalog/reset" && method === "POST") {
    need(me, "admin");
    const version = resetStoredCatalog(seedRows);
    log("catalog_reset", null, "catalogue reset to the recovered data");
    return { message: "The catalogue is back to the recovered data.", version };
  }

  // ---- staff audit
  if (path === "audit") {
    need(me, "admin");
    const before = Number(q.get("before")) || Number.MAX_SAFE_INTEGER;
    const staff = q.get("staff");
    const rows = (staff
      ? db.prepare("SELECT * FROM staff_audit WHERE id < ? AND staff_id = ? ORDER BY id DESC LIMIT 100").all(before, int(staff))
      : db.prepare("SELECT * FROM staff_audit WHERE id < ? ORDER BY id DESC LIMIT 100").all(before)) as Row[];
    return {
      entries: rows.map((r) => ({
        id: Number(r.id),
        staffId: Number(r.staff_id),
        action: String(r.action),
        targetId: r.target_id == null ? null : Number(r.target_id),
        detail: String(r.detail),
        ip: String(r.ip),
        at: Number(r.created_at),
      })),
      names: namesFor(rows.flatMap((r) => [Number(r.staff_id), Number(r.target_id ?? 0)])),
    };
  }

  if (path === "staff") {
    const rows = db.prepare("SELECT id, username, character_name, permissions, last_seen_at FROM users WHERE permissions != '' ORDER BY id").all() as Row[];
    return {
      staff: rows.map((r) => ({
        id: Number(r.id),
        username: String(r.username),
        name: String(r.character_name ?? r.username),
        permissions: permNames(String(r.permissions).split(",").map(Number)),
        lastSeen: r.last_seen_at == null ? null : Number(r.last_seen_at),
      })),
    };
  }

  throw new HkError(404, `Unknown endpoint ${method} /hk/api/${path}`);
}

/* ------------------------------------------------------------ user profile */

async function profile(user: User): Promise<Json> {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(user.id) as Row;
  const outfit = getOutfit(user.id);
  const { users: online } = await onlineUsers();
  const live = online.find((o) => o.userId === user.id) ?? null;
  const lastIp = db
    .prepare("SELECT ip, created_at FROM login_log WHERE user_id = ? AND ip != '' ORDER BY id DESC LIMIT 1")
    .get(user.id) as Row | undefined;
  const sanctions = sanctionHistory(user.id);
  const active = (kind: SanctionKind) => activeSanction(user.id, kind) ?? null;
  // The figure is (set, colour) pairs; the sets are what they are wearing.
  const wearing = (outfit?.figure ?? []).filter((_, i) => i % 2 === 0).filter((id) => id > 0);
  return {
    id: user.id,
    username: user.username,
    name: user.character_name,
    hasCharacter: Boolean(user.has_character),
    sex: outfit?.sex ?? null,
    wearing,
    avatar: outfit ? avatarFor(outfit.figure) : [],
    credits: user.credits,
    permissions: permNames(user.permissions),
    staff: user.permissions.length > 0,
    signature: String(row.slogan_text ?? ""),
    createdAt: Number(row.created_at),
    lastLogin: row.last_login_at == null ? null : Number(row.last_login_at),
    lastSeen: row.last_seen_at == null ? null : Number(row.last_seen_at),
    camera: Number(row.has_camera ?? 0) === 1,
    film: Number(row.film ?? 0),
    badges: String(row.badges ?? ""),
    online: live,
    lastIp: lastIp ? String(lastIp.ip) : null,
    active: { ban: active("ban"), trade: active("trade"), mute: active("mute"), cfh: active("cfh") },
    banCount: sanctions.filter((s) => s.kind === "ban").length,
    activeBanCount: sanctions.filter(
      (s) => s.kind === "ban" && s.liftedAt === null && (s.expiresAt === null || s.expiresAt > Date.now()),
    ).length,
    rooms: getRoomsOwnedBy(user.id),
    itemCount: Number((db.prepare("SELECT COUNT(*) n FROM items WHERE owner_id = ?").get(user.id) as Row).n),
  };
}

function callOut(r: Row) {
  return {
    id: Number(r.id),
    reporterId: Number(r.reporter_id),
    category: Number(r.category),
    message: String(r.message),
    reported: String(r.reported),
    reportedId: r.reported_id == null ? null : Number(r.reported_id),
    room: String(r.room),
    roomName: String(r.room_name),
    at: Number(r.created_at),
    pickedBy: r.picked_by == null ? null : Number(r.picked_by),
    pickedAt: r.picked_at == null ? null : Number(r.picked_at),
    closedBy: r.closed_by == null ? null : Number(r.closed_by),
    closedAt: r.closed_at == null ? null : Number(r.closed_at),
    resolution: String(r.resolution ?? ""),
  };
}
const callUserIds = (r: Row) => [r.reporter_id, r.reported_id, r.picked_by, r.closed_by].map((v) => Number(v ?? 0));

/** Accounts that share an IP address or machine id with this one. */
function clones(userId: number): Json {
  const rows = db
    .prepare(
      `SELECT o.user_id, o.ip, o.machine_id, COUNT(*) n, MAX(o.created_at) last
       FROM login_log mine JOIN login_log o
         ON o.user_id != mine.user_id
        AND ((mine.ip != '' AND o.ip = mine.ip) OR (mine.machine_id != '' AND o.machine_id = mine.machine_id))
       WHERE mine.user_id = ?
       GROUP BY o.user_id, o.ip, o.machine_id ORDER BY last DESC LIMIT 500`,
    )
    .all(userId) as Row[];
  const byUser = new Map<number, { userId: number; via: Set<string>; count: number; last: number }>();
  for (const r of rows) {
    const id = Number(r.user_id);
    const entry = byUser.get(id) ?? { userId: id, via: new Set<string>(), count: 0, last: 0 };
    if (r.ip) entry.via.add(String(r.ip));
    if (r.machine_id) entry.via.add(`machine ${String(r.machine_id)}`);
    entry.count += Number(r.n);
    entry.last = Math.max(entry.last, Number(r.last));
    byUser.set(id, entry);
  }
  const matches = [...byUser.values()].map((m) => ({ ...m, via: [...m.via] }));
  return { target: userId, matches, names: namesFor([userId, ...matches.map((m) => m.userId)]) };
}

/* ------------------------------------------------------------ user actions */

async function userAction(
  me: User,
  target: User,
  body: Json,
  log: (action: string, target: number | null, detail?: string) => void,
): Promise<Json> {
  const action = str(body.action);
  const id = target.id;
  const reason = str(body.reason, 500);
  const text = str(body.text, 1000);
  const label = target.character_name ?? target.username;

  const sanction = async (kind: SanctionKind, perm: Permission | "admin", what: string) => {
    need(me, perm);
    if (target.id === me.id) throw new HkError(400, "You cannot do that to yourself.");
    if (isAdmin(target) && !isAdmin(me)) throw new HkError(403, "Only an admin can sanction an admin.");
    const ms = duration(body.duration);
    const s = addSanction(id, kind, reason, me.id, ms);
    log(`${kind}_add`, id, `${body.duration ?? "perm"} ${reason}`);
    return s;
  };
  const lift = (kind: SanctionKind, perm: Permission | "admin") => {
    need(me, perm);
    const n = liftSanctions(id, kind, me.id);
    log(`${kind}_lift`, id, `${n} lifted`);
    return { message: n ? `Lifted ${n}.` : "Nothing was active." };
  };

  switch (action) {
    case "alert": {
      need(me, "alert");
      if (!text) throw new HkError(400, "Write the alert first.");
      const r = await bridge("alert", { userId: id, text, title: 0 });
      if (r.offline) throw new HkError(502, String(r.error));
      log("alert", id, text);
      return { message: Number(r.delivered) ? "Alert delivered." : `${label} is not online — nothing was sent.` };
    }

    case "message": {
      need(me, "alert");
      if (!text) throw new HkError(400, "Write the message first.");
      const r = await bridge("mail", { userId: id, text });
      // Offline game server: file it straight in the inbox; it is delivered
      // at their next login either way.
      if (r.offline) addMessage(id, 0, "staff", text);
      log("message", id, text);
      return { message: r.online ? "Message delivered." : "Message filed — they will see it at next login." };
    }

    case "kick": {
      need(me, "kick");
      const r = await bridge("kick", { userId: id, text });
      if (r.offline) throw new HkError(502, String(r.error));
      log("kick", id, text);
      return { message: r.online ? `${label} was disconnected.` : `${label} is not online.` };
    }

    case "ban": {
      const s = await sanction("ban", "ban", "banned");
      // Off the game now, and out of the website: every web session ends.
      await bridge("kick", { userId: id, text: `You have been banned.${reason ? `\r${reason}` : ""}` });
      db.prepare("DELETE FROM sessions WHERE user_id = ?").run(id);
      return { message: `${label} is banned${s.expiresAt ? ` until ${new Date(s.expiresAt).toUTCString()}` : " permanently"}.` };
    }
    case "unban":
      return lift("ban", "ban");

    case "tradeban":
      await sanction("trade", "ban", "trade banned");
      return { message: `${label} can no longer trade.` };
    case "untradeban":
      return lift("trade", "ban");

    case "mute":
      await sanction("mute", "mute", "muted");
      return { message: `${label} is muted.` };
    case "unmute":
      return lift("mute", "mute");

    case "cfhban":
      await sanction("cfh", "ban", "banned from Call for Help");
      return { message: `${label}'s calls for help will be ignored.` };
    case "uncfhban":
      return lift("cfh", "ban");

    case "credits": {
      need(me, "admin");
      const mode = str(body.mode) || "add";
      const amount = int(body.amount, "amount");
      const current = getUserById(id)?.credits ?? 0;
      const next = mode === "set" ? amount : current + amount;
      setCredits(id, next, `Housekeeping (${me.character_name ?? me.username})${reason ? `: ${reason}` : ""}`, null, me.id);
      await bridge("credits", { userId: id });
      log("credits", id, `${current} -> ${Math.max(0, next)} ${reason}`);
      return { message: `${label}: ${current} → ${Math.max(0, next)} credits.` };
    }

    case "give": {
      need(me, "admin");
      const codes = (Array.isArray(body.codes) ? body.codes : [body.code]).map((c) => int(c, "item code"));
      const count = Math.min(Math.max(Number(body.count) || 1, 1), 100);
      if (codes.length === 0) throw new HkError(400, "Pick an item.");
      let given = 0;
      for (const code of codes) {
        const category = body.category ? int(body.category, "category") : guessCategory(code);
        if (category === ITEM_CATEGORY.items && isPairedTeleporter(code)) {
          // Teleporters only exist as linked pairs; `count` is pairs.
          for (let i = 0; i < count; i++) grantItemPair(id, code, category);
          given += count;
        } else {
          given += addItems(id, Array(count).fill(code), category);
        }
      }
      await bridge("inventory", { userId: id });
      log("give", id, `${count} x [${codes.join(",")}] ${reason}`);
      return { message: `Gave ${given} item${given === 1 ? "" : "s"} to ${label}.` };
    }

    case "remove_item": {
      need(me, "admin");
      const itemId = int(body.itemId, "item");
      const row = db.prepare("SELECT * FROM items WHERE id = ? AND owner_id = ?").get(itemId, id) as Row | undefined;
      if (!row) throw new HkError(404, "That item is not in their inventory.");
      db.prepare("DELETE FROM items WHERE id = ?").run(itemId);
      await bridge("inventory", { userId: id });
      log("remove_item", id, `item ${itemId} (${row.type_code} ${itemName(Number(row.type_code))})`);
      return { message: `Removed ${itemName(Number(row.type_code))}.` };
    }

    case "clear_inventory": {
      need(me, "admin");
      const rows = db.prepare("SELECT * FROM items WHERE owner_id = ?").all(id) as Row[];
      db.prepare(
        "INSERT INTO inventory_snapshots (user_id, staff_id, items, credits, created_at) VALUES (?, ?, ?, ?, ?)",
      ).run(id, me.id, JSON.stringify(rows), target.credits, Date.now());
      db.prepare("DELETE FROM items WHERE owner_id = ?").run(id);
      await bridge("inventory", { userId: id });
      log("clear_inventory", id, `${rows.length} items`);
      return { message: `Cleared ${rows.length} items. A snapshot was kept — Restore Inventory brings them back.` };
    }

    case "restore_inventory": {
      need(me, "admin");
      const snap = (body.snapshotId
        ? db.prepare("SELECT * FROM inventory_snapshots WHERE id = ? AND user_id = ?").get(int(body.snapshotId), id)
        : db
            .prepare("SELECT * FROM inventory_snapshots WHERE user_id = ? AND restored_at IS NULL ORDER BY id DESC LIMIT 1")
            .get(id)) as Row | undefined;
      if (!snap) throw new HkError(404, "There is no snapshot to restore.");
      const columns = new Set(
        (db.prepare("PRAGMA table_info(items)").all() as Row[]).map((c) => String(c.name)),
      );
      let restored = 0;
      for (const item of JSON.parse(String(snap.items)) as Row[]) {
        const keys = Object.keys(item).filter((k) => columns.has(k));
        // Same row id where it is still free, so pairs and tickets line up.
        const result = db
          .prepare(`INSERT OR IGNORE INTO items (${keys.join(",")}) VALUES (${keys.map(() => "?").join(",")})`)
          .run(...keys.map((k) => item[k] as string | number | null));
        restored += Number(result.changes);
      }
      db.prepare("UPDATE inventory_snapshots SET restored_at = ? WHERE id = ?").run(Date.now(), Number(snap.id));
      await bridge("inventory", { userId: id });
      log("restore_inventory", id, `snapshot ${String(snap.id)}: ${restored} items`);
      return { message: `Restored ${restored} items.` };
    }

    case "clear_friends": {
      need(me, "admin");
      const friends = getFriends(id);
      for (const f of friends) removeFriendship(id, f.id);
      db.prepare("DELETE FROM friend_requests WHERE requester_id = ? OR target_id = ?").run(id, id);
      log("clear_friends", id, `${friends.length} friends`);
      return { message: `Removed ${friends.length} friends. (Changes show at their next login.)` };
    }

    case "rename": {
      need(me, "forcenamechange");
      const name = str(body.name, 32);
      const r = await bridge("rename", { userId: id, name });
      if (r.offline) throw new HkError(502, "Renaming needs the game server (it validates the name).");
      if (!r.ok) throw new HkError(400, String(r.error));
      log("rename", id, `${label} -> ${name}`);
      return { message: `Renamed ${label} to ${name}.` };
    }

    case "username": {
      need(me, "admin");
      const name = str(body.name, 32);
      if (!/^[A-Za-z0-9_. -]{1,32}$/.test(name)) throw new HkError(400, "Usernames can use letters, numbers, spaces, dot, dash and underscore.");
      const clash = db.prepare("SELECT id FROM users WHERE username = ? COLLATE NOCASE AND id != ?").get(name, id);
      if (clash) throw new HkError(400, "That username is taken.");
      db.prepare("UPDATE users SET username = ? WHERE id = ?").run(name, id);
      log("username", id, `${target.username} -> ${name}`);
      return { message: `Login name changed to ${name}.` };
    }

    case "password": {
      need(me, "admin");
      const password = typeof body.password === "string" ? body.password : "";
      if (password.length < 6) throw new HkError(400, "Use at least 6 characters.");
      setPassword(id, password);
      log("password", id, "");
      return { message: "Password changed. Their web sessions were signed out." };
    }

    case "signature": {
      need(me, "forcenamechange");
      setSlogan(id, "", "");
      log("signature_clear", id, "");
      return { message: "Signature cleared (shows on their next room entry)." };
    }

    case "permissions": {
      need(me, "admin");
      if (id === me.id) throw new HkError(400, "Ask another admin to change your own permissions.");
      const wanted = (Array.isArray(body.permissions) ? body.permissions : []).map(String);
      const perms = wanted.map((p) => PERMISSIONS.indexOf(p as Permission) + 1).filter((p) => p > 0);
      setPermissions(id, perms);
      log("permissions", id, permNames(perms).join(",") || "(none)");
      return { message: perms.length ? `Permissions set: ${permNames(perms).join(", ")}. They apply at next login.` : "Staff access removed." };
    }

    case "send": {
      need(me, "roomkick");
      const roomId = int(body.roomId, "room");
      const r = await bridge("move", { userId: id, roomId });
      if (!r.ok) throw new HkError(400, String(r.error));
      log("send_to_room", id, String(roomId));
      return { message: `Sent ${label} to room ${roomId}.` };
    }

    case "bring": {
      need(me, "roomkick");
      const { users } = await onlineUsers();
      const mine = users.find((u) => u.userId === me.id);
      if (!mine?.roomId) throw new HkError(400, "You need to be in a room in the game to bring someone to you.");
      const r = await bridge("move", { userId: id, roomId: mine.roomId });
      if (!r.ok) throw new HkError(400, String(r.error));
      log("bring", id, String(mine.roomId));
      return { message: `Brought ${label} to ${mine.roomTitle ?? mine.roomId}.` };
    }

    case "goto": {
      const { users } = await onlineUsers();
      const theirs = users.find((u) => u.userId === id);
      if (!theirs?.roomId) throw new HkError(400, `${label} is not in a room.`);
      const r = await bridge("move", { userId: me.id, roomId: theirs.roomId });
      if (!r.ok) throw new HkError(400, r.error === "player is not online" ? "You need to be logged into the game." : String(r.error));
      log("goto", id, String(theirs.roomId));
      return { message: `Moved you to ${theirs.roomTitle ?? theirs.roomId}.` };
    }

    default:
      throw new HkError(400, `Unknown action "${action}".`);
  }
}

/** The /play gate: a banned player sees why instead of the client. */
export function banPage(user: User): string | null {
  const ban = activeSanction(user.id, "ban");
  if (!ban) return null;
  const until = ban.expiresAt ? `until ${new Date(ban.expiresAt).toUTCString()}` : "permanently";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Banned</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{margin:0;background:#0d1a33;color:#e8eefc;font:15px/1.6 "Segoe UI",system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}
.box{max-width:480px;padding:28px 32px;background:#16264a;border-radius:10px;border:1px solid #2c4170}
h1{margin:0 0 8px;font-size:22px}a{color:#9cc2ff}</style></head><body><div class="box">
<h1>Your account has been banned</h1><p>This account is banned ${escapeHtml(until)}.</p>
${ban.reason ? `<p><b>Reason:</b> ${escapeHtml(ban.reason)}</p>` : ""}
<p><a href="/logout">Sign out</a></p></div></body></html>`;
}
