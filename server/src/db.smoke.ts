/**
 * Smoke test for db.ts. Run: npx tsx server/src/db.smoke.ts
 * Uses a throwaway database so it never touches data/vmk.db.
 */
// Anchored to this file, not to the cwd. `./data/...` worked when run by hand
// from the repo root but `npm test` runs the workspace script with cwd=server/,
// where data/ does not exist -- and node:sqlite reports that only as the
// unhelpful "unable to open database file".
const { dirname, join } = await import("node:path");
const { fileURLToPath } = await import("node:url");
process.env.VMK_DB =
  process.env.VMK_DB ??
  join(dirname(fileURLToPath(import.meta.url)), "..", "..", "data", "smoke-test.db");

const { unlinkSync, existsSync, mkdirSync } = await import("node:fs");
mkdirSync(dirname(process.env.VMK_DB), { recursive: true });
if (existsSync(process.env.VMK_DB)) {
  unlinkSync(process.env.VMK_DB);
}

const {
  loginOrCreate,
  createSession,
  getUserBySession,
  createTicket,
  getUserByTicket,
  setCharacter,
  getUserById,
  databasePath,
} = await import("./db.js");

let failures = 0;
const check = (label: string, ok: boolean) => {
  console.log(`${ok ? "  ok  " : "  FAIL"}  ${label}`);
  if (!ok) failures++;
};

console.log(`db: ${databasePath()}\n`);

// 1. unknown username creates the account
const first = loginOrCreate("Ariel", "hunter2");
check("unknown username creates a user", first !== undefined && first.created);
check("new user has no character yet", first?.user.has_character === 0);

// 2. same credentials log in, do NOT create a second account
const second = loginOrCreate("Ariel", "hunter2");
check("correct password logs in", second !== undefined && !second.created);
check("same user id returned", second?.user.id === first?.user.id);

// 3. wrong password is rejected, and must not be mistaken for a new user
const wrong = loginOrCreate("Ariel", "wrong-password");
check("wrong password rejected", wrong === undefined);

// 4. usernames are case-insensitive (a second 'ariel' must not be a new account)
const casing = loginOrCreate("ARIEL", "hunter2");
check("username is case-insensitive", casing?.user.id === first?.user.id && !casing?.created);

// 5. sessions
const token = createSession(first!.user.id);
check("session resolves to the user", getUserBySession(token)?.id === first!.user.id);
check("bogus session resolves to nobody", getUserBySession("not-a-token") === undefined);

// 6. tickets
const ticket = createTicket(first!.user.id);
check("ticket resolves to the user", getUserByTicket(ticket)?.id === first!.user.id);
check("bogus ticket resolves to nobody", getUserByTicket("not-a-ticket") === undefined);

// 7. character state drives the client's login state (0 vs 1)
check("has_character starts 0 -> registration path", getUserById(first!.user.id)?.has_character === 0);
setCharacter(first!.user.id, "ArielOfTheSea");
const after = getUserById(first!.user.id);
check("has_character becomes 1 -> navigator path", after?.has_character === 1);
check("character name stored", after?.character_name === "ArielOfTheSea");

console.log(`\n${failures === 0 ? "ALL PASS" : `${failures} FAILURE(S)`}`);
process.exit(failures === 0 ? 0 : 1);
