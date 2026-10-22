// Start VMK: both servers in one window, then open the game in the browser.
//
//   node start.mjs                 (what "Start VMK.bat" / start.sh run)
//   node start.mjs --no-browser    just the servers
//
// Closing the window or pressing Ctrl+C stops both. Logs also go to logs/.
//
// Runs the bundled servers in server/dist/ when they exist (a release), else
// the TypeScript sources through tsx (a dev checkout). Any VMK_* variable you
// set beforehand still wins over the defaults below.
import { spawn } from "node:child_process";
import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import { connect } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const HTTP_PORT = Number(process.env.VMK_SHOCKWAVE_PORT ?? 5199);
const GAME_PORT = Number(process.env.VMK_GAME_PORT ?? 8080);
const GAME_URL = `http://127.0.0.1:${HTTP_PORT}/`;
const openBrowser = !process.argv.includes("--no-browser") && process.env.VMK_NO_BROWSER !== "1";

const say = (line = "") => console.log(line);
function fail(lines) {
  console.error("");
  for (const line of [].concat(lines)) console.error(`  ${line}`);
  console.error("");
  process.exit(1);
}

// ---- preflight: every failure here would otherwise surface as a blank page.
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 5)) {
  fail([`VMK needs Node.js 22.5 or newer (this is ${process.versions.node}).`, "Get it from https://nodejs.org/"]);
}
if (!existsSync(join(ROOT, "client", "dist", "client.html"))) {
  fail(["The game client is not built (client/dist is missing).", "In a dev checkout: npx vite build --config client/vite.config.ts"]);
}
if (!existsSync(join(ROOT, "client", "assets", "casts"))) {
  fail(["The game's art is missing (client/assets/casts).", "Re-download the release, or run the cast extraction in a dev checkout."]);
}

const portBusy = (port) =>
  new Promise((done) => {
    const socket = connect({ port, host: "127.0.0.1" });
    socket.once("connect", () => (socket.destroy(), done(true)));
    socket.once("error", () => done(false));
  });

for (const port of [HTTP_PORT, GAME_PORT]) {
  if (await portBusy(port)) {
    fail([`Port ${port} is already in use.`, "VMK may already be running in another window — close that one first."]);
  }
}

// ---- the two servers
const bundled = existsSync(join(ROOT, "server", "dist", "assets.mjs"));
const serverArgs = (name) =>
  bundled ? [join(ROOT, "server", "dist", `${name}.mjs`)] : ["--import", "tsx", join(ROOT, "server", "src", `${name}.ts`)];

const env = {
  ...process.env,
  // Quiet the one-line node:sqlite "experimental" warning on every start.
  NODE_NO_WARNINGS: process.env.NODE_NO_WARNINGS ?? "1",
  // The web server proxies a few calls to the game server; keep it pointed at
  // the game port even when that port was moved.
  VMK_GAME_SERVER: process.env.VMK_GAME_SERVER ?? `http://127.0.0.1:${GAME_PORT}`,
};

mkdirSync(join(ROOT, "logs"), { recursive: true });
const children = [];
let stopping = false;

/**
 * The servers log every fetch and protocol message — useful in logs/, noise in
 * a player's window. By default the console shows only stderr (which stays
 * silent unless something is wrong); `--verbose` mirrors everything.
 */
const verbose = process.argv.includes("--verbose");

/** Resolves when the server prints the line that means it is listening. */
function run(label, name, readyLine) {
  let ready;
  const isReady = new Promise((resolve) => (ready = resolve));
  const log = createWriteStream(join(ROOT, "logs", `${name}.log`), { flags: "a" });
  log.write(`\n===== ${new Date().toISOString()} start =====\n`);
  const child = spawn(process.execPath, serverArgs(name), { cwd: join(ROOT, "server"), env, stdio: ["ignore", "pipe", "pipe"] });
  const recent = [];
  const pipe = (stream, out, show) => {
    let partial = "";
    stream.on("data", (chunk) => {
      log.write(chunk);
      const lines = (partial + chunk).split(/\r?\n/);
      partial = lines.pop() ?? "";
      for (const line of lines) {
        if (line.includes(readyLine)) ready();
        if (show) {
          out.write(`[${label}] ${line}\n`);
        } else {
          // Kept for the crash report — only lines the window has NOT shown.
          recent.push(line);
          if (recent.length > 15) recent.shift();
        }
      }
    });
  };
  pipe(child.stdout, process.stdout, verbose);
  pipe(child.stderr, process.stderr, true);
  child.on("exit", (code, signal) => {
    log.end();
    if (stopping) return;
    // Show WHY in the window: a player will not go digging through logs/.
    console.error(`\n  The ${label.trim()} server stopped (${signal ?? `exit code ${code}`}).`);
    if (recent.length > 0) {
      console.error("  Its last output:\n");
      for (const line of recent) console.error(`    ${line}`);
    }
    console.error(`\n  Full log: logs/${name}.log`);
    stop(1);
  });
  children.push(child);
  return isReady;
}

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) if (child.exitCode === null) child.kill();
  // NOT unref'd: this timer is what keeps the process alive until the children
  // are gone. Unref'd, Node exits early on the pending top-level await (code 13).
  setTimeout(() => process.exit(code), 500);
}
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
process.on("SIGHUP", () => stop(0)); // the console window was closed

say("Starting VMK...");

// ---- wait until both are listening, then hand over to the browser.
// ⚠ Not by connecting to the ports: every TCP connect to the game port opens a
// game session, so polling it fills the log with phantom players.
//
// ⚠ ONE AFTER THE OTHER, not together. Both servers open the same database,
// and on a brand-new one they used to race to create it and switch it to WAL:
// a fresh release's game server died with "database is locked" on its first
// start. db.ts now retries that switch too, but starting the web server only
// once the game server is listening means they never create the file at once.
const timeout = new Promise((resolve) => setTimeout(() => resolve("timeout"), 90_000).unref());
const outcome = await Promise.race([
  (async () => {
    await run("game", "mus-server", "VMK game server listening");
    await run("web ", "assets", "VMK private server");
  })(),
  timeout,
]);
if (outcome === "timeout" && !stopping) {
  console.error("\n  The servers did not come up within 90 seconds. See logs/assets.log and logs/mus-server.log.");
  stop(1);
}

if (!stopping) {
  say("");
  say("  ============================================================");
  say(`   VMK is running:  ${GAME_URL}`);
  say("");
  say("   The FIRST account you create becomes the admin.");
  say("   Leave this window open while you play; close it to stop.");
  say("  ============================================================");
  say("");
  if (openBrowser) {
    const [cmd, args] =
      process.platform === "win32"
        ? ["cmd", ["/c", "start", "", GAME_URL]]
        : process.platform === "darwin"
          ? ["open", [GAME_URL]]
          : ["xdg-open", [GAME_URL]];
    spawn(cmd, args, { stdio: "ignore", detached: true }).on("error", () => say(`  (Open ${GAME_URL} in your browser.)`)).unref();
  }
}
