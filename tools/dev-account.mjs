/**
 * Creates (or resets) a TICKET-ONLY dev account for automated client testing,
 * so testing never has to touch a real account's state.
 *
 * WHY THIS EXISTS
 *
 * Exercising the registration route means flipping `has_character`, which is the
 * only thing choosing between "straight into the game" and "avatar creation"
 * (`mus-server.ts`: `const loginState = account.has_character ? 0 : 1`). Doing
 * that on a human's account rewrites state they care about. This gives the
 * harness its own account to flip instead.
 *
 * ⚠ NO PASSWORD IS SET, and that is deliberate rather than a shortcut. The
 * client logs in with a TICKET — `getUserByTicket(fields[1])` — so a password is
 * never needed for this. The hash/salt columns are filled with random bytes that
 * are not the hash of anything, which leaves the account unusable from the web
 * login page while working perfectly with `mint-ticket.mjs`.
 *
 *   node tools/dev-account.mjs [username] [--new-user | --existing]
 *
 * Defaults to `devtest` and `--new-user` (the registration route).
 */
import { DatabaseSync } from "node:sqlite";
import { randomBytes } from "node:crypto";
import { join } from "node:path";

const DB_PATH = join(process.cwd(), "data", "vmk.db");
const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith("--")) ?? "devtest";
const hasCharacter = args.includes("--existing") ? 1 : 0;

const db = new DatabaseSync(DB_PATH);
const existing = db.prepare("SELECT id FROM users WHERE username = ?").get(name);

if (existing) {
  db.prepare("UPDATE users SET has_character = ? WHERE id = ?").run(hasCharacter, existing.id);
  console.log(`reset  #${existing.id} ${name}`);
} else {
  db.prepare(
    `INSERT INTO users (username, password_hash, password_salt, created_at, has_character)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(
    name,
    // Random, not derived from any password: nothing hashes to this.
    randomBytes(32).toString("hex"),
    randomBytes(16).toString("hex"),
    Date.now(),
    hasCharacter,
  );
  const { id } = db.prepare("SELECT id FROM users WHERE username = ?").get(name);
  console.log(`created #${id} ${name} (ticket-only, no password)`);
}

console.log(
  `route  has_character=${hasCharacter} -> loginState ${hasCharacter ? 0 : 1} ` +
    `(${hasCharacter ? "existing character" : "NEW USER, avatar creation"})`,
);
console.log(`\nnext:  node tools/mint-ticket.mjs ${name}`);
