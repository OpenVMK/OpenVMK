// Assemble a self-contained VMK release folder.
//
//   node tools/release/make-release.mjs [--out <dir>] [--force] [--skip-client-build] [--no-node] [--zip]
//
// The result runs with a double-click on "Start VMK.bat" (or sh start.sh): no
// Node install, no npm install, no Shockwave archive. It holds
//
//   start.mjs, Start VMK.bat, start.sh, README.txt
//   node/                  this machine's Node binary (skip with --no-node)
//   server/dist/*.mjs      the two servers, bundled (tools/release/build-server.mjs)
//   server/public/         the /hk staff portal
//   client/dist/           the built TS client
//   client/assets/         extracted casts, core, fonts — the game's art
//   assets/                data files and the overlay, minus backups and
//                          Shockwave binaries (.cct/.cst/.dcr)
//   data/, logs/           empty — the database is created on first start, and
//                          the first account made on it becomes the admin
//
// ⚠ The release ships NO database. A copy of data/vmk.db would carry every
// account on this machine, and with a non-empty users table nobody gets the
// first-account admin grant.
import { spawnSync } from "node:child_process";
import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const OUT = resolve(option("--out") ?? join(ROOT, "..", "vmk-release"));
const step = (text) => console.log(`\n== ${text}`);
function die(text) {
  console.error(`\nmake-release: ${text}`);
  process.exit(1);
}

if (!relative(ROOT, OUT).startsWith("..") && relative(ROOT, OUT) !== "") {
  die(`--out must be outside the repo (got ${OUT}); a release inside it would be copied into the next one.`);
}
if (OUT === ROOT) die("--out cannot be the repo itself.");
if (existsSync(OUT)) {
  if (!flag("--force")) die(`${OUT} already exists. Pass --force to replace it.`);
  // Only ever delete something that looks like a release we made.
  if (!existsSync(join(OUT, "start.mjs"))) die(`${OUT} exists and is not a VMK release; refusing to delete it.`);
  rmSync(OUT, { recursive: true, force: true });
}

function run(cmd, cmdArgs) {
  // A shell only for `npx` (a .cmd on Windows). Given one, `node`'s own path —
  // C:\Program Files\nodejs\node.exe — splits at the space and fails.
  // With a shell, hand Node ONE command string: separate args under
  // `shell: true` are deprecated (DEP0190). Ours are fixed literals.
  const shell = process.platform === "win32" && cmd === "npx";
  const result = shell
    ? spawnSync([cmd, ...cmdArgs].join(" "), { cwd: ROOT, stdio: "inherit", shell: true })
    : spawnSync(cmd, cmdArgs, { cwd: ROOT, stdio: "inherit" });
  if (result.status !== 0) die(`${cmd} ${cmdArgs.join(" ")} failed (exit ${result.status}).`);
}

// ---- 1. build
if (!flag("--skip-client-build")) {
  step("Building the client");
  run("npx", ["vite", "build", "--config", "client/vite.config.ts"]);
}
step("Bundling the servers");
run(process.execPath, [join(ROOT, "tools", "release", "build-server.mjs")]);

// ---- 2. copy
let files = 0;
let bytes = 0;
const count = (path) => {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const full = join(path, entry.name);
    if (entry.isDirectory()) count(full);
    else {
      files++;
      bytes += statSync(full).size;
    }
  }
};

/** Copy a file or tree into the release at the same relative path. */
function copy(rel, filter = () => true) {
  const from = join(ROOT, rel);
  if (!existsSync(from)) die(`missing ${rel} — is this a complete checkout?`);
  const to = join(OUT, rel);
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true, filter: (src) => filter(src, statSync(src).isDirectory()) });
  console.log(`  ${rel}`);
}

/**
 * Backups and Shockwave binaries never ship.
 *
 * ⚠ Backups are OUR suffix style only — `x.bak`, `x.bak-before-thing`,
 * `x.save.1` — matched case-sensitively at the END of the name. Disney's casts
 * hold members genuinely called `room.tent.object.xml.BAK`, extracted as
 * `…xml.BAK_stxt_0.txt`, and those are game content.
 */
const releasable = (src, isDir) => {
  const name = basename(src);
  if (/\.(bak|save)(-[\w.-]+|\.\d+)?$|~$/.test(name)) return false;
  if (!isDir && [".cct", ".cst", ".dcr", ".dir"].includes(extname(name).toLowerCase())) return false;
  return true;
};

step(`Copying into ${OUT}`);
mkdirSync(OUT, { recursive: true });
for (const rel of ["start.mjs", "Start VMK.bat", "start.sh"]) copy(rel);
// Docker (Linux) and the hosting guide, at the release root where they are used.
for (const name of ["docker-compose.yml", "Caddyfile", ".env.example"]) {
  copyFileSync(join(ROOT, "tools", "release", "docker", name), join(OUT, name));
  console.log(`  ${name}`);
}
copyFileSync(join(ROOT, "docs", "SELF-HOSTING.md"), join(OUT, "SELF-HOSTING.md"));
console.log("  SELF-HOSTING.md");
copyFileSync(join(ROOT, "tools", "release", "CHANGES.txt"), join(OUT, "CHANGES.txt"));
console.log("  CHANGES.txt");
copy(join("server", "dist"), (src) => !src.endsWith(".map"));
copy(join("server", "public"));
copy(join("client", "dist"));
// Packs are rebuilt below from the recompressed PNGs, so do not copy them.
copy(join("client", "assets"), (src, isDir) => releasable(src, isDir) && basename(src) !== "bitmaps.pack");
copy("assets", releasable);
// Served at /shims/loading-screen.json; tiny, and its absence is a 404 per boot.
copy(join("tools", "shockwave", "shims"));
for (const dir of ["data", "logs"]) mkdirSync(join(OUT, dir), { recursive: true });

// ---- 2b. shape the game data for delivery — in the RELEASE copy only.
//
// The repo keeps client/assets exactly as extracted. A player's browser gets
// the same pixels in far fewer bytes and round trips:
//   - every PNG losslessly re-deflated (the extractor stores them raw, ~2x);
//   - `texts.json` for every cast, so its text members are one request
//     instead of one each (only 32 casts in the repo had one);
//   - `bitmaps.pack` rebuilt from the recompressed PNGs.
// Measured at 100 ms RTT, see server/src/delivery.ts.
step("Optimising game data for delivery");
const releaseAssets = join(OUT, "client", "assets");
run(process.execPath, [join(ROOT, "tools", "index-cast-texts.mjs"), releaseAssets, "--quiet"]);
run(process.execPath, [join(ROOT, "tools", "release", "optimize-pngs.mjs"), releaseAssets]);
run(process.execPath, [join(ROOT, "tools", "pack-cast-bitmaps.mjs"), "--root", join(releaseAssets, "casts"), "--force"]);

// ---- 3. Node
if (!flag("--no-node")) {
  step(`Bundling Node ${process.versions.node} (${process.platform}-${process.arch})`);
  const target = process.platform === "win32" ? join(OUT, "node", "node.exe") : join(OUT, "node", "bin", "node");
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(process.execPath, target);
  console.log(`  ${relative(OUT, target)}`);
}

// ---- 4. README
writeFileSync(
  join(OUT, "README.txt"),
  [
    "VMK",
    "===",
    "",
    "To play:",
    '  Windows ......... double-click "Start VMK.bat"',
    "  macOS / Linux ... sh start.sh   (needs Node.js 22.5+ from nodejs.org)",
    "  Docker (Linux) .. docker compose up -d, then open http://<server>:5199",
    "",
    "  Your browser opens the game at http://127.0.0.1:5199/ once it is ready.",
    "  Leave the window open while you play; close it to stop the game.",
    "",
    "The FIRST account you create becomes the admin (staff tools at /hk).",
    "",
    "Hosting it for others, on your network or on a domain with HTTPS:",
    "  see SELF-HOSTING.md.",
    "",
    "What's new in this release: see CHANGES.txt.",
    "",
    "Your data:",
    "  data/vmk.db holds every account, item and room. Back it up by copying it",
    "  while the game is stopped. Delete it to start over from nothing.",
    "",
    "If something goes wrong:",
    "  The window says what failed. Full logs are in logs/.",
    "  \"Port 5199 is already in use\" means VMK (or another program) is already",
    "  running. Close the other window first.",
    "",
    "Built " + new Date().toISOString().slice(0, 10) + ".",
    "",
  ].join("\r\n"),
);

count(OUT);
step(`Done: ${files.toLocaleString()} files, ${(bytes / 1024 ** 3).toFixed(2)} GB in ${OUT}`);

// ---- 5. optional zip (bsdtar ships with Windows 10+ and macOS; Compress-Archive
// cannot handle a release this size).
if (flag("--zip")) {
  const zip = `${OUT}.zip`;
  step(`Zipping to ${zip}`);
  rmSync(zip, { force: true });
  const result = spawnSync("tar", ["-a", "-c", "-f", zip, "-C", dirname(OUT), basename(OUT)], { stdio: "inherit" });
  if (result.status !== 0) die("tar failed — zip the folder by hand.");
  console.log(`  ${(statSync(zip).size / 1024 ** 3).toFixed(2)} GB`);
}
