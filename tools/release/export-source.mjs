// Assemble the public source tree for https://github.com/OpenVMK/OpenVMK.
//
//   node tools/release/export-source.mjs [--out <dir>] [--force]
//
// Copies an ALLOWLIST of this checkout into <dir> (default ..\openvmk-source):
// anything not named below stays out, so a new private file never leaks by
// default. The result is meant to become a fresh repository with one commit;
// this checkout's own history (client/ only, with the casts in it) is not
// published.
//
// What ships, in short: the code (client, server, tools), the game assets
// exactly as extracted (client/assets minus the derived bitmaps.pack files,
// assets/ minus Shockwave binaries), the docs worth reading, and LICENSE.
// What never ships: build output (dist/), node_modules, the database, logs,
// the Shockwave archive, third-party checkouts and binaries, local config and
// the private dev notes.
//
// It ends with a leak scan over every text file it wrote (local paths, test
// account names, private hostnames), a check that relative imports in the
// exported tools still resolve, and a check that the generated .gitignore
// hides none of the exported files. Any failing exits 1.
//
// ⚠ It does NOT commit. After a clean run:
//   cd <dir> && git init -b main && git add -A && git commit -m "OpenVMK source"
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const OUT = resolve(option("--out") ?? join(ROOT, "..", "openvmk-source"));
const MARKER = ".openvmk-export";
const step = (text) => console.log(`\n== ${text}`);
function die(text) {
  console.error(`\nexport-source: ${text}`);
  process.exit(1);
}

const rel = relative(ROOT, OUT);
if (rel === "" || !rel.startsWith("..")) die(`--out must be outside the repo (got ${OUT}).`);
if (existsSync(OUT)) {
  if (!flag("--force")) die(`${OUT} already exists. Pass --force to replace it.`);
  // Only ever delete something this script made.
  if (!existsSync(join(OUT, MARKER))) die(`${OUT} exists and is not a source export; refusing to delete it.`);
  rmSync(OUT, { recursive: true, force: true });
}

// ---- filters

/** Never shipped, wherever they sit. */
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".vite"]);
const SKIP_EXT = new Set([".cct", ".cst", ".cxt", ".dcr", ".dxr", ".dir", ".log", ".tmp", ".db", ".db-journal", ".db-wal", ".db-shm"]);
/**
 * ⚠ Backups are OUR suffix style only — `x.bak`, `x.bak-before-thing`,
 * `x.save.1` — matched case-sensitively at the END of the name. Disney's casts
 * hold members genuinely called `room.tent.object.xml.BAK`, extracted as
 * `…xml.BAK_stxt_0.txt`, and those are game content. (Same rule as
 * make-release.mjs.)
 */
const BACKUP = /\.(bak|save)(-[\w.-]+|\.\d+)?$|~$/;

/** Casts we extracted wrongly and kept only for comparison. */
const BAD_EXTRACTION = /\.WRONG-[\w-]+-extraction$/;

function shippable(src, isDir) {
  const name = basename(src);
  if (isDir) return !SKIP_DIRS.has(name) && !BAD_EXTRACTION.test(name);
  // raw_chunks/ is the extractor's byte dump of every Director chunk, kept for
  // auditing an extraction against the originals. The client reads only the
  // sound headers (`<file>_snd_.bin`, lingo-sound.ts); the rest is ~200k files
  // that re-extraction from the archive reproduces.
  if (basename(dirname(src)) === "raw_chunks" && !name.endsWith("_snd_.bin")) return false;
  if (BACKUP.test(name)) return false;
  if (SKIP_EXT.has(extname(name).toLowerCase())) return false;
  if (name === "bitmaps.pack") return false; // derived: tools/pack-cast-bitmaps.mjs
  if (/\.local\./.test(name)) return false; // machine-specific settings
  return true;
}

// ---- the allowlist

/** Whole trees, copied through `shippable`. */
const TREES = [
  "client/src",
  "client/assets",
  "server/src",
  "server/public",
  "tools/src",
  "tools/catalogs",
  "tools/release",
  "tools/shockwave/shims",
  "tools/shockwave/dirplayer-patches",
  "assets",
];

/** Single files. */
const FILES = [
  "package.json",
  "package-lock.json",
  "tsconfig.base.json",
  "start.mjs",
  "start.sh",
  "Start VMK.bat",
  "README.md",
  "LICENSE",
  "client/index.html",
  "client/client.html",
  "client/window.html",
  "client/vite.config.ts",
  "server/package.json",
  "server/tsconfig.json",
  "tools/package.json",
  "docs/SELF-HOSTING.md",
  "docs/RELEASING.md",
  "docs/ROOM-CODES.md",
  "docs/POTC-CLASSIC-PORT.md",
  // tools/shockwave: the LibreShockwave build scripts, the shared Afterburner
  // reader, the reference-player page and its patches. The one-off cast
  // patchers and probes beside them are research scratch and stay private.
  "tools/shockwave/README.md",
  "tools/shockwave/DEBUGGING.md",
  "tools/shockwave/afterburner.mjs",
  "tools/shockwave/disasm.mjs",
  "tools/shockwave/lscr.mjs",
  "tools/shockwave/vmk-player.html",
  "tools/shockwave/apply-emscripten-zlib-patch.py",
  "tools/shockwave/apply-fetch-log-patch.mjs",
  "tools/shockwave/apply-fetch-rewrite-patch.mjs",
  "tools/shockwave/build-wasm-windows.ps1",
  "tools/shockwave/build-wasm-wsl.sh",
  "tools/shockwave/rebuild-wasm-incremental.ps1",
  "tools/shockwave/build-lingo-export-windows.ps1",
  "tools/shockwave/build-lingo-export-wsl.sh",
  "tools/shockwave/build-probe-wsl.sh",
  "tools/shockwave/build-getsec-cast-windows.ps1",
];

/** tools/*.{mjs,ts,py,ps1}: every top-level tool script. */
const TOOL_SCRIPT = /\.(mjs|ts|py|ps1)$/;

// ---- copy

let files = 0;
let bytes = 0;
const written = [];
function record(path) {
  files++;
  bytes += statSync(path).size;
  written.push(path);
}

function copyTree(relPath) {
  const from = join(ROOT, relPath);
  if (!existsSync(from)) die(`missing ${relPath} — is this a complete checkout?`);
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const src = join(dir, entry.name);
      if (!shippable(src, entry.isDirectory())) continue;
      if (entry.isDirectory()) walk(src);
      else copyFile(relative(ROOT, src));
    }
  };
  walk(from);
}

function copyFile(relPath) {
  const from = join(ROOT, relPath);
  if (!existsSync(from)) die(`missing ${relPath}`);
  const to = join(OUT, relPath);
  mkdirSync(dirname(to), { recursive: true });
  if (basename(relPath) === "file_info.tsv") {
    // The extractor records the temp path it read the cast from
    // (`source	<tmp>\in\x.cct`); keep just the file name.
    const text = readFileSync(from, "utf8");
    writeFileSync(to, text.replace(/^source\t.*[\\/]([^\\/\r\n]+)$/m, "source\t$1"));
  } else {
    cpSync(from, to);
  }
  record(to);
}

step(`Copying into ${OUT}`);
mkdirSync(OUT, { recursive: true });
for (const f of FILES) copyFile(f);
for (const name of readdirSync(join(ROOT, "tools"))) {
  const full = join(ROOT, "tools", name);
  if (statSync(full).isFile() && TOOL_SCRIPT.test(name) && shippable(full, false)) copyFile(join("tools", name));
}
for (const t of TREES) {
  copyTree(t);
  console.log(`  ${t}`);
}

// ---- generated files

step("Writing generated files");

// .gitattributes without the LFS rule: bitmaps.pack is not committed.
//
// ⚠ Game data is then pinned `-text`: stored and checked out byte for byte. The
// LF rules above would otherwise normalise the extractor's few CRLF files
// (Disney text members, some overlay texts) on commit, so a clone would no
// longer match the extraction. `-text` also means no CRLF on a Windows checkout
// with core.autocrlf=true, which is what the LF rules were protecting against.
const attributes =
  readFileSync(join(ROOT, ".gitattributes"), "utf8").replace(/\r?\n# --- Git LFS ---[\s\S]*$/, "\n") +
  [
    "",
    "# --- Game data: byte-for-byte as extracted, never line-ending converted ---",
    "client/assets/** -text",
    "assets/** -text",
    "",
  ].join("\n");
if (attributes.includes("filter=lfs")) die(".gitattributes still has an LFS rule; update the strip pattern.");
writeFileSync(join(OUT, ".gitattributes"), attributes);
record(join(OUT, ".gitattributes"));

writeFileSync(
  join(OUT, ".gitignore"),
  // ⚠ Root-anchored where a bare name would also match deeper folders:
  // `shockwave/` alone ignored tools/shockwave/ and every script in it.
  [
    "node_modules/",
    "dist/",
    "/data/",
    "/logs/",
    "*.db",
    "*.db-journal",
    "*.db-wal",
    "*.db-shm",
    ".env",
    ".DS_Store",
    "",
    "# Derived from client/assets: node tools/pack-cast-bitmaps.mjs",
    "bitmaps.pack",
    "",
    "# The original Shockwave archive, for re-extracting (not distributed here).",
    "/shockwave/",
    "",
    "# Left by tools/release/export-source.mjs in the export folder.",
    "/.openvmk-export",
    "",
    "# Fetched / built by tools/shockwave (npm run tools:shockwave:setup, build-*.ps1).",
    "tools/shockwave/LibreShockwave/",
    "tools/shockwave/DirPlayer/",
    "tools/shockwave/debugger/",
    "tools/shockwave/wasm/",
    "tools/shockwave/bin/",
    "tools/shockwave/deps/",
    "*.local.*",
    "",
  ].join("\n"),
);
record(join(OUT, ".gitignore"));

// Our LibreShockwave changes, so the extractor that produced client/assets can
// be rebuilt: AGPL source for the modified tool, and the only way to reproduce
// the extraction. Base commit is upstream's.
const LSW = join(ROOT, "tools", "shockwave", "LibreShockwave");
if (existsSync(join(LSW, ".git"))) {
  const git = (...a) => spawnSync("git", ["-C", LSW, "-c", "core.safecrlf=false", ...a], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  const base = git("rev-parse", "HEAD").stdout.trim();
  let patch = git("diff", "HEAD").stdout;
  const untracked = git("ls-files", "--others", "--exclude-standard").stdout.split("\n").filter(Boolean);
  for (const file of untracked) {
    // --no-index exits 1 when the files differ, which they always do here.
    patch += git("diff", "--no-index", "--", "/dev/null", file).stdout;
  }
  const header =
    `LibreShockwave changes used by OpenVMK (AGPL-3.0, like LibreShockwave itself).\n` +
    `Base: https://github.com/LibreShockwave/LibreShockwave commit ${base}\n` +
    `Apply: git clone https://github.com/LibreShockwave/LibreShockwave tools/shockwave/LibreShockwave\n` +
    `       cd tools/shockwave/LibreShockwave && git checkout ${base} && git apply ../libreshockwave.patch\n\n`;
  writeFileSync(join(OUT, "tools", "shockwave", "libreshockwave.patch"), header + patch);
  record(join(OUT, "tools", "shockwave", "libreshockwave.patch"));
  console.log(`  tools/shockwave/libreshockwave.patch (${untracked.length} new files, base ${base.slice(0, 7)})`);
} else {
  console.log("  (no LibreShockwave checkout; patch not written)");
}

writeFileSync(join(OUT, MARKER), `Made by tools/release/export-source.mjs on ${new Date().toISOString()}\n`);

// ---- leak scan

step("Scanning for leaks");
const TEXT_EXT = new Set([
  ".ts", ".mts", ".mjs", ".js", ".cjs", ".json", ".md", ".html", ".css", ".txt", ".tsv", ".csv",
  ".xml", ".ps1", ".sh", ".bat", ".py", ".yml", ".yaml", ".patch", ".ls", "",
]);
// Generic patterns here; names that are themselves private (usernames, emails,
// folder names) go in tools/release/leak-patterns.local.txt, one regex per
// line, which never ships (*.local.* is skipped above).
const LEAKS = [
  [/[A-Z]:[\\/]+Users[\\/]/i, "Windows user path"],
  [/\/(?:mnt\/c\/)?Users\/[^/\s"'`]+\/(?:Documents|Downloads|Desktop)/i, "user folder path"],
  [/\/home\/[^/\s"'`]+\//, "Linux home path"],
  [/Documents[\\/]+VMK/i, "private archive path"],
];
const LOCAL_PATTERNS = join(ROOT, "tools", "release", "leak-patterns.local.txt");
if (existsSync(LOCAL_PATTERNS)) {
  for (const line of readFileSync(LOCAL_PATTERNS, "utf8").split(/\r?\n/)) {
    if (line.trim() && !line.startsWith("#")) LEAKS.push([new RegExp(line.trim(), "i"), "private name (leak-patterns.local.txt)"]);
  }
} else {
  console.log(`  (no ${relative(ROOT, LOCAL_PATTERNS)}; scanning generic patterns only)`);
}
const hits = [];
for (const path of written) {
  if (!TEXT_EXT.has(extname(path).toLowerCase())) continue;
  // Everything is scanned, game data included: the extractor writes our own
  // metadata (file_info.tsv) beside Disney's members, and that once carried a
  // local temp path into all 4,307 casts.
  const r = relative(OUT, path).split(sep).join("/");
  const lines = readFileSync(path, "utf8").split("\n");
  lines.forEach((text, i) => {
    for (const [pattern, what] of LEAKS) {
      const m = text.match(pattern);
      if (m) hits.push(`  ${r}:${i + 1}  ${what}: ${m[0]}`);
    }
  });
}

// ---- relative imports in exported tools/server must resolve

step("Checking relative imports");
const missing = [];
for (const path of written) {
  const r = relative(OUT, path).split(sep).join("/");
  if (!/^(tools|server\/src)\/.*\.(mjs|ts|js)$/.test(r)) continue;
  const text = readFileSync(path, "utf8");
  for (const m of text.matchAll(/(?:from|import)\s*\(?\s*["'](\.{1,2}\/[^"']+)["']/g)) {
    const target = resolve(dirname(path), m[1]);
    const candidates = [target, `${target}.ts`, `${target}.mjs`, `${target}.js`, target.replace(/\.js$/, ".ts")];
    if (!candidates.some((c) => existsSync(c))) missing.push(`  ${r}: ${m[1]}`);
  }
}

// ---- our own .gitignore must not hide anything we exported

step("Checking .gitignore against the export");
{
  const init = spawnSync("git", ["init", "-q", OUT], { encoding: "utf8" });
  if (init.status !== 0) die(`git init failed: ${init.stderr}`);
  const paths = written.map((p) => relative(OUT, p).split(sep).join("/"));
  const check = spawnSync("git", ["-C", OUT, "check-ignore", "--no-index", "--stdin"], {
    input: paths.join("\n"),
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  rmSync(join(OUT, ".git"), { recursive: true, force: true });
  const ignored = check.stdout.split("\n").filter(Boolean);
  if (ignored.length) hits.push(...ignored.map((r) => `  ${r}  exported but .gitignore'd`));
}

// ---- belt and braces: no Shockwave binaries, no database, no packs

const forbidden = written
  .map((p) => relative(OUT, p).split(sep).join("/"))
  .filter((r) => SKIP_EXT.has(extname(r).toLowerCase()) || basename(r) === "bitmaps.pack" || r.startsWith("shockwave/"));
if (forbidden.length) hits.push(...forbidden.map((r) => `  ${r}  forbidden file type`));

console.log(`\n${files.toLocaleString()} files, ${(bytes / 1024 ** 3).toFixed(2)} GB in ${OUT}`);
if (hits.length) console.error(`\nLEAKS (${hits.length}):\n${hits.join("\n")}`);
if (missing.length) console.error(`\nUNRESOLVED IMPORTS (${missing.length}):\n${missing.join("\n")}`);
if (hits.length || missing.length) die("fix the above in the source checkout and re-run with --force.");
console.log("Clean: no leaks, all relative imports resolve.");
