// Reset the dev database so registration can be walked again.
//
// Two modes, because they serve different purposes:
//
//   node tools/reset-db.mjs            reset REGISTRATION state, keep accounts.
//                                      Sets has_character = 0 and clears
//                                      character_name / outfit_json, so the SAME
//                                      username goes through avatar creation
//                                      again (login state 1). Also frees the
//                                      name, which is UNIQUE-checked.
//
//   node tools/reset-db.mjs --wipe     delete every user, session and ticket.
//                                      Schema is left intact, so the server does
//                                      not need to recreate the file.
//
// ⚠ Stop the server first — it holds the SQLite file open.
import { DatabaseSync } from "node:sqlite";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.VMK_DB ?? join(here, "..", "data", "vmk.db");

if (!existsSync(dbPath)) {
  console.log(`no database at ${dbPath} — nothing to do (the server creates it on start)`);
  process.exit(0);
}

const wipe = process.argv.includes("--wipe");
const db = new DatabaseSync(dbPath);

const countOf = (table) => {
  try {
    return db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get().n;
  } catch {
    return null; // table may not exist yet
  }
};

const before = {
  users: countOf("users"),
  sessions: countOf("sessions"),
  tickets: countOf("tickets"),
};
console.log(`db: ${dbPath}`);
console.log(`before: users=${before.users} sessions=${before.sessions} tickets=${before.tickets}`);

if (before.users) {
  const rows = db
    .prepare("SELECT id, username, character_name, has_character FROM users ORDER BY id")
    .all();
  for (const r of rows) {
    console.log(
      `  #${r.id} ${r.username}  character=${r.character_name ?? "(none)"} has_character=${r.has_character}`,
    );
  }
}

if (wipe) {
  for (const table of ["sessions", "tickets", "users"]) {
    try {
      db.prepare(`DELETE FROM ${table}`).run();
    } catch {
      /* table absent */
    }
  }
  console.log("\nWIPED: all users, sessions and tickets deleted (schema kept)");
} else {
  db.prepare(
    "UPDATE users SET has_character = 0, character_name = NULL, outfit_json = NULL",
  ).run();
  // Sessions/tickets are short-lived and tied to a login; clearing them avoids a
  // stale ticket resuming a half-registered state.
  for (const table of ["sessions", "tickets"]) {
    try {
      db.prepare(`DELETE FROM ${table}`).run();
    } catch {
      /* table absent */
    }
  }
  console.log("\nRESET: has_character = 0, names and outfits cleared; accounts kept");
}

console.log(
  `after:  users=${countOf("users")} sessions=${countOf("sessions")} tickets=${countOf("tickets")}`,
);
db.close();
