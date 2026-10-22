// Grant or revoke moderator permissions.
//
// Deliberately a COMMAND-LINE tool and not an in-game command: there is no
// protocol path by which a player can promote themselves, so the only way to
// become a moderator is to have shell access to the server.
//
//   node tools/set-admin.mjs <username>                 # all permissions
//   node tools/set-admin.mjs <username> alert kick ban  # only these
//   node tools/set-admin.mjs <username> --revoke        # back to an ordinary player
//   node tools/set-admin.mjs --list                     # who currently holds what
//
// ⚠ Permissions are read at login (2510 SetName), so a change here takes effect
// the next time that player signs in, not immediately.
import {
  getUserByUsername,
  setPermissions,
  PERMISSIONS,
  permissionIndex,
  db,
} from "../server/src/db.ts";

const argv = process.argv.slice(2);

if (argv.length === 0 || argv[0] === "--help" || argv[0] === "-h") {
  console.log(
    "usage:\n" +
      "  node tools/set-admin.mjs <username> [permission...]   grant (default: all)\n" +
      "  node tools/set-admin.mjs <username> --revoke          demote to ordinary player\n" +
      "  node tools/set-admin.mjs --list                       list current moderators\n\n" +
      `permissions: ${PERMISSIONS.join(", ")}`,
  );
  process.exit(argv.length === 0 ? 1 : 0);
}

if (argv[0] === "--list") {
  const rows = db
    .prepare("SELECT username, character_name, permissions FROM users WHERE permissions <> '' ORDER BY username")
    .all();
  if (rows.length === 0) {
    console.log("no moderators — everyone is an ordinary player");
  } else {
    for (const r of rows) {
      const names = String(r.permissions)
        .split(",")
        .map((p) => PERMISSIONS[Number(p) - 1] ?? `?${p}`)
        .join(", ");
      console.log(`${r.username}  (${r.character_name ?? "no character"})  [${names}]`);
    }
  }
  process.exit(0);
}

const [username, ...rest] = argv;
const user = getUserByUsername(username);
if (!user) {
  console.error(`no such user: "${username}"`);
  process.exit(1);
}

const revoke = rest.includes("--revoke");
let granted;

if (revoke) {
  granted = [];
} else if (rest.length === 0) {
  granted = PERMISSIONS.map((_, i) => i + 1);
} else {
  // Fail on a typo rather than silently granting a smaller set than asked for.
  const unknown = rest.filter((n) => !PERMISSIONS.includes(n));
  if (unknown.length > 0) {
    console.error(`unknown permission(s): ${unknown.join(", ")}`);
    console.error(`valid: ${PERMISSIONS.join(", ")}`);
    process.exit(1);
  }
  granted = rest.map((n) => permissionIndex(n));
}

setPermissions(user.id, granted);

const names = granted.map((p) => PERMISSIONS[p - 1]);
console.log(
  granted.length === 0
    ? `"${username}" is now an ordinary player`
    : `"${username}" now holds: ${names.join(", ")}`,
);
console.log("(takes effect at their next login — permissions are sent with 2510 SetName)");
