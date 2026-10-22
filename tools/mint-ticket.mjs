/**
 * Mints a login ticket for an existing account and registers it with the MUS
 * server, so the TypeScript client can be driven past login without going
 * through the web login page.
 *
 * WHY THIS EXISTS
 *
 * The MUS server reads the client's second login field as a TICKET, not a
 * password (`mus-server.ts`: `getUserByTicket(fields[1])`), and tickets live in
 * the database — `/dev/register` alone only populates the server's in-memory
 * map, which the login path does not consult. So a dev client needs a real
 * database ticket.
 *
 * ⚠ This does NOT create accounts or handle passwords. It issues a ticket for
 * an account that already exists, exactly as `auth.ts::issueTicketFor` does
 * after a successful login.
 *
 *   node tools/mint-ticket.mjs [username] [--new-user | --existing]
 *
 * `--new-user` / `--existing` set the account's `has_character` flag, which is
 * the ONLY thing deciding which route the client takes after login:
 *
 *   mus-server.ts   const loginState = account.has_character ? 0 : 1;
 *                   0 — existing character  -> straight into the game
 *                   1 — NEW USER            -> avatar creation / registration
 *
 * So `--new-user` is how you exercise the registration flow without creating a
 * second account. It is a reversible flag flip: `character_name`, `outfit_json`
 * and everything else are left untouched, and `--existing` puts it back.
 *
 * Prints the ready-made client URL.
 */
import { DatabaseSync } from "node:sqlite";
import { randomBytes } from "node:crypto";
import { join } from "node:path";

const DB_PATH = join(process.cwd(), "data", "vmk.db");
const TICKET_TTL_MS = 10 * 60 * 1000;
const GAME_SERVER = process.env.VMK_GAME_SERVER ?? "http://127.0.0.1:8080";
const CLIENT = process.env.VMK_CLIENT ?? "http://localhost:5180/client.html";

const args = process.argv.slice(2);
const asNewUser = args.includes("--new-user");
const asExisting = args.includes("--existing");
const wanted = args.find((a) => !a.startsWith("--"));

if (asNewUser && asExisting) {
  console.error("--new-user and --existing are opposites; pass at most one");
  process.exit(1);
}

const db = new DatabaseSync(DB_PATH);

const users = db
  .prepare("SELECT id, username, character_name, has_character FROM users ORDER BY id")
  .all();
if (users.length === 0) {
  console.error("no accounts in the database — create one via the login page at :5199");
  process.exit(1);
}

const user = wanted
  ? users.find((u) => String(u.username).toLowerCase() === wanted.toLowerCase())
  : users[0];

if (!user) {
  console.error(`no such account: ${wanted}`);
  console.error(`known: ${users.map((u) => u.username).join(", ")}`);
  process.exit(1);
}

// Flip the route flag BEFORE minting, so the account the ticket resolves to is
// already in the state the login path will read.
if (asNewUser || asExisting) {
  const target = asNewUser ? 0 : 1;
  db.prepare("UPDATE users SET has_character = ? WHERE id = ?").run(target, user.id);
  user.has_character = target;
}

const ticket = randomBytes(16).toString("hex");
const now = Date.now();
db.prepare(
  "INSERT INTO tickets (ticket, user_id, issued_at, expires_at) VALUES (?, ?, ?, ?)",
).run(ticket, user.id, now, now + TICKET_TTL_MS);

// Best-effort, exactly like issueTicketFor: the ticket is already durable in
// the database, so a MUS server that is down does not invalidate it.
try {
  const response = await fetch(`${GAME_SERVER}/dev/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      ticket,
      loginName: user.character_name ?? user.username,
    }),
  });
  console.log(`registered with the game server: ${response.status}`);
} catch {
  console.log("game server not reachable — the ticket is still valid in the database");
}

console.log(`user     #${user.id} ${user.username} (character: ${user.character_name ?? "none"})`);
console.log(
  `route    has_character=${user.has_character} -> loginState ${user.has_character ? 0 : 1} ` +
    `(${user.has_character ? "existing character, straight into the game" : "NEW USER, avatar creation"})`,
);
if (asNewUser) console.log("         restore with: node tools/mint-ticket.mjs --existing");
console.log(`ticket   ${ticket}   (valid ${TICKET_TTL_MS / 60000} minutes)`);
console.log("");
// `password` IS the ticket: DoTheLogin sends [username, password, machineID]
// and the server reads field 2 as the ticket.
console.log(
  `${CLIENT}?sw1=username%3D${encodeURIComponent(String(user.username))}` +
    `&sw2=password%3D${ticket}`,
);
