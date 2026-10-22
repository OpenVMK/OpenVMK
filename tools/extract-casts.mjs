/**
 * Extracts Director casts from the VMKShockwave archive into the format the TS
 * client loads (`client/assets/casts/<castName>/manifest.tsv` + bitmaps/text/…).
 *
 * WHY THIS EXISTS
 *
 * The client does not read `.cct` files — it reads the extractor's output. So a
 * cast that is present in the archive but never extracted attaches with ZERO
 * members and every lookup against it silently returns 0. That is not an "asset
 * gap"; it is a pipeline gap, and it looks identical from inside the client.
 *
 * It cost real time once already: `vmk_avatar_sh_45_46`, `sh_57_58` and
 * `ht_47_48` were all sitting in the archive at full size while the avatar
 * rendered naked and the diagnosis was written up as missing art.
 *
 * ⚠ RE-EXTRACTING IS ALSO HOW MANIFESTS GET `reg_x`/`reg_y`. The extractor gained
 * those columns after most of `client/assets` was produced, so older manifests
 * stop at `asset_path` and every bitmap in them registers at its CENTRE. Avatar
 * parts then stack in one band instead of forming a body. Anything extracted by
 * this script has the columns.
 *
 *   node tools/extract-casts.mjs                  # every folder in the archive
 *   node tools/extract-casts.mjs vmk_clothes      # one folder
 *   node tools/extract-casts.mjs vmk_clothes --force   # re-extract existing
 *
 * Output is written to a temp directory first and only copied in on success, so
 * a failed extraction cannot leave a half-written cast where the client will
 * load it.
 */
import { execFileSync } from "node:child_process";
import {
  cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const ARCHIVE = process.env.VMK_SHOCKWAVE ?? resolve(import.meta.dirname, "..", "shockwave");
const EXTRACTOR = resolve(
  "tools/shockwave/LibreShockwave/cmake-build-native/cpp/libreshockwave_asset_extractor.exe",
);
const DEST = resolve("client/assets/casts");

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

if (!existsSync(EXTRACTOR)) {
  console.error(`extractor not built: ${EXTRACTOR}`);
  console.error("build it first — see tools/shockwave/build-*.ps1");
  process.exit(1);
}
if (!existsSync(ARCHIVE)) {
  console.error(`archive not found: ${ARCHIVE}  (set VMK_SHOCKWAVE)`);
  process.exit(1);
}

const CAST_SUFFIXES = [".cct", ".cst", ".dcr", ".dxr"];
const isCast = (name) => CAST_SUFFIXES.some((s) => name.toLowerCase().endsWith(s));

/**
 * ONE SOURCE FILE PER CAST NAME, preferring the suffix the client downloads.
 *
 * ⚠ THE OUTPUT DIRECTORY IS KEYED BY BASENAME, so `foo.cct` and `foo.cst` in the
 * same archive folder extract over the top of each other. Whichever runs last
 * wins the manifest while the earlier run's assets survive beside it, and the
 * result is a folder whose `manifest.tsv` describes one cast and whose files are
 * mostly from another. Nothing errors, and the mixture looks exactly like an
 * extractor bug — files present, correctly named, referenced by nothing.
 *
 * MEASURED on `vmk_snd_vmk_esplanade`, where it cost a long diagnosis:
 *
 *     …esplanade.cct → members=16  Sound.xml 1220  Tracker.xml 3670   (VMKE-*)
 *     …esplanade.cst → members=4   Sound.xml  148  Tracker.xml  221   (CNTL-*)
 *
 * The `.cst` is a stale dev leftover holding VMK CENTRAL's content. It landed
 * last, so the room shipped another room's truncated sound documents while its
 * own ambience, music, fourteen bird cues and foghorn sat unreferenced. In the
 * client that meant `CSoundTracker` parsed a foreign timeline with no
 * `<END TIME>`, leaving `m_mpEndTime` VOID. 11 of 135 sound casts carry the same
 * double-source signature.
 *
 * `.cct` wins because it is what the client actually requests — this file's own
 * header note says the client reads `.cct` — and ranking by `CAST_SUFFIXES`
 * order keeps that explicit rather than incidental.
 */
const suffixRank = (name) => {
  const lower = name.toLowerCase();
  const index = CAST_SUFFIXES.findIndex((suffix) => lower.endsWith(suffix));
  return index === -1 ? CAST_SUFFIXES.length : index;
};
const castKey = (name) => name.toLowerCase().replace(/\.(cct|cst|dcr|dxr)$/, "");
const preferOnePerCast = (names) => {
  const best = new Map();
  for (const name of names) {
    const key = castKey(name);
    const current = best.get(key);
    if (current === undefined || suffixRank(name) < suffixRank(current)) best.set(key, name);
  }
  return [...best.values()];
};

/**
 * Every folder holding casts, found RECURSIVELY.
 *
 * ⚠ The archive is NESTED and a top-level scan misses a lot of it:
 *
 *     vmk_sound/xmas          vmk_spaces/halloween
 *     vmk_sound/vmk_halloween vmk_spaces/vmk_holiday_overlays
 *     Backup/…                siteref/<guid>/vmk_spaces/…
 *
 * An earlier one-level version of this script silently skipped all of those,
 * which is the same failure it exists to prevent — a cast that is present but
 * never extracted attaches with zero members and looks like missing art.
 *
 * ⚠ Several top-level folders are SKIPPED. They hold older, alternate or
 * already-handled copies, and installing one would shadow the primary cast with
 * a build that does not match the rest:
 *
 *   Backup/    siteref/   older or per-site duplicates of the live tree
 *   ref/       reference material, not what the client loads
 *   7a684fb5-…  the engine casts, which come from `assets/overlay` instead
 *
 * Shallowest-first ordering is kept anyway so any future duplicate resolves to
 * the shallower copy.
 */
const IGNORED_FOLDERS = new Set([
  "backup",
  "siteref",
  "ref",
  "7a684fb5-a766-4fd9-9877-b00e2cafc03a",
]);

const collectFolders = (dir, depth = 0) => {
  let found = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  if (entries.some((e) => e.isFile() && isCast(e.name))) found.push({ dir, depth });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (depth === 0 && IGNORED_FOLDERS.has(entry.name.toLowerCase())) continue;
    found = found.concat(collectFolders(join(dir, entry.name), depth + 1));
  }
  return found;
};

/**
 * ⚠ `assets/patches` WINS OVER THE ARCHIVE, and is scanned FIRST.
 *
 * Some casts in the archive are stubs — the right name and the wrong contents —
 * and the corrected file lives here instead. Nothing marks them as broken, so
 * extracting the archive copy installs a cast that attaches with the wrong
 * members and fails much later, somewhere unrelated.
 *
 * MEASURED on `vmk_spaces/vmk_nautilus_private.cct`:
 *
 *     archive  46,069 bytes  -> 57 members of ROOM ENGINE framework
 *                              (CRoomComponent, CRoomHandler, room.object.*.dtd)
 *     patch   429,200 bytes  -> the actual room: project.nautilus_private.xml,
 *                              room.nautilus_private.object.xml (14 KB of tiles),
 *                              nautilus_private.visual.xml, 17 PNGs
 *
 * Its siblings are 354 KB and 377 KB, so the stub is obvious in hindsight. With
 * the stub installed the room could not build at all — `_PrepareRoom` reported
 * `Project doc not found: "project.nautilus_private.xml"` and the client showed
 * a black stage, which reads as a broken room rather than a sourcing mistake.
 *
 * Ordering is the whole mechanism: a cast installed here lands in `existing`,
 * so the archive copy is skipped by the same guard that skips already-installed
 * casts. No name matching, no special cases.
 */
const PATCHES = resolve("assets/patches");

const sourceRoots = [
  ...(existsSync(PATCHES) ? [PATCHES] : []),
  ARCHIVE,
];

const folders = sourceRoots.flatMap((root) =>
  collectFolders(root)
    .sort((a, b) => a.depth - b.depth || a.dir.localeCompare(b.dir))
    .map((f) => f.dir),
).filter((dir) => only.length === 0 || only.some((name) => dir.includes(name)));

if (folders.length === 0) {
  console.error(only.length ? `no cast folders matched: ${only.join(", ")}` : "no cast folders found");
  process.exit(1);
}

mkdirSync(DEST, { recursive: true });
const existing = new Set(readdirSync(DEST, { withFileTypes: true })
  .filter((e) => e.isDirectory()).map((e) => e.name));

let installed = 0;
let skipped = 0;
let failed = 0;
/** `<cast> — <reason>` for each cast that produced no manifest. */
const failures = [];
const started = Date.now();

/**
 * ⚠ SHALLOWEST-WINS MUST HOLD UNDER `--force` TOO.
 *
 * `folders` is sorted shallowest-first, and the intent (see IGNORED_FOLDERS note)
 * is that a duplicate cast name resolves to the shallower copy. Without --force
 * that happens for free — a deeper duplicate lands in `existing` after the
 * shallow one installs and is skipped. But --force bypasses the `existing` check,
 * so the deeper copy re-extracts and cpSync OVERWRITES the shallow one:
 * last-copied wins, which is the OPPOSITE of the stated intent.
 *
 * MEASURED: `vmk_sound/vmk_snd_hub2.cct` (the real Central Plaza sounds) was
 * clobbered by `vmk_sound/holiday/vmk_snd_hub2.cct`, a stub whose "Sound.xml" is
 * leftover TIKI cues — so Central Plaza (and every other room with a holiday/xmas/
 * halloween duplicate: Gallery, etc.) played the wrong room's audio. Tracking
 * what THIS run has already installed and skipping later duplicates keeps
 * shallowest-wins even with --force. --force still does its job: it re-extracts
 * the pre-existing SHALLOW copy.
 */
const installedThisRun = new Set();

for (const sourceDir of folders) {
  // Label it by its source root so a patch is visible in the log as a patch —
  // "this cast came from somewhere other than the archive" is exactly the thing
  // you want to see when a room misbehaves.
  const fromPatches = sourceDir.startsWith(PATCHES);
  const folder = (fromPatches ? "patches/" : "") +
    (sourceDir.replace(fromPatches ? PATCHES : ARCHIVE, "").replace(/^[\\/]/, "") || "<root>");
  const casts = preferOnePerCast(readdirSync(sourceDir).filter(isCast));

  // Only the ones we do not already have, unless --force.
  const wanted = casts.filter((file) => {
    const name = file.replace(/\.[^.]+$/, "");
    // Shallowest-wins, even under --force: a duplicate already installed earlier
    // THIS run (from a shallower folder) must not be overwritten by a deeper one.
    if (installedThisRun.has(name)) { skipped++; return false; }
    if (!force && existing.has(name)) { skipped++; return false; }
    return true;
  });
  if (wanted.length === 0) {
    console.log(`${folder}: nothing to do (${casts.length} already present)`);
    continue;
  }

  console.log(`${folder}: ${wanted.length} cast(s) to extract…`);
  const work = mkdtempSync(join(tmpdir(), "vmk-extract-"));
  const stage = join(work, "in");
  const out = join(work, "out");
  mkdirSync(stage);
  mkdirSync(out);

  try {
    // ⚠ Staged one folder at a time rather than pointed at the archive directly:
    // the extractor takes a DIRECTORY, and we only want the subset above.
    for (const file of wanted) cpSync(join(sourceDir, file), join(stage, file));
    execFileSync(EXTRACTOR, [stage, out], { stdio: "pipe" });

    for (const entry of readdirSync(out, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const from = join(out, entry.name);
      // A cast that produced no manifest is a failed extraction; do not install
      // it, or the client will attach an empty cast and report zero members —
      // exactly the failure this script exists to prevent.
      if (!existsSync(join(from, "manifest.tsv"))) {
        /**
         * ⚠ Report WHICH cast and WHY, not just a count.
         *
         * A bare "failed 5" sends you diffing the archive against the install
         * dir to find out what broke. The extractor drops an `errors.log` beside
         * the empty output — usually "Not a supported Director RIFX/XFIR/RIFF
         * file", which means the source is corrupt or is not a cast at all
         * (`hof_furni/item_7991.cct` is 14 MB of zero bytes), NOT that the
         * pipeline mishandled it.
         */
        let why = "no manifest produced";
        try {
          const log = join(from, "errors.log");
          if (existsSync(log)) why = readFileSync(log, "utf8").split("\n")[0].trim() || why;
        } catch { /* keep the generic reason */ }
        failures.push(`${entry.name} — ${why}`);
        failed++;
        continue;
      }
      cpSync(from, join(DEST, entry.name), { recursive: true, force: true });
      existing.add(entry.name);
      installedThisRun.add(entry.name);
      installed++;
    }
  } catch (cause) {
    console.error(`  ${folder}: extraction failed — ${cause.message.split("\n")[0]}`);
    failed += wanted.length;
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

const size = (dir) => {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    total += entry.isDirectory() ? size(path) : statSync(path).size;
  }
  return total;
};

/**
 * ⚠ A FRESHLY EXTRACTED CAST IS NOT USABLE UNTIL IT HAS A SIZE INDEX.
 *
 * `manifest.tsv` records no bitmap dimensions, so `parseCastManifest` leaves
 * every member's rect at 0x0 and the image getter clamps it with
 * `Math.max(w, 1)`: EVERY BITMAP IN THE CAST BECOMES A 1x1 DOT. Nothing errors —
 * the member exists, the PNG exists, the draw happens, and the result is
 * invisible — which is exactly how it hides.
 *
 * Extraction DELETES the index along with the rest of the old directory, so
 * re-extracting a working cast silently breaks it. MEASURED: re-extracting 8
 * space casts to pick up their film loops left all 8 without an index, and the
 * nautilus squid composited from a 1x1 source while the room around it still
 * looked correct.
 *
 * The indexer skips casts that already have one, so this costs ~0.6s over the
 * whole tree and cannot be forgotten the way a documented follow-up step can.
 */
if (installed > 0) {
  console.log("");
  console.log("indexing bitmap sizes…");
  try {
    execFileSync(process.execPath, [resolve("tools/index-bitmap-sizes.mjs")], {
      stdio: "inherit",
    });
  } catch (cause) {
    // Loud, because the casts just installed will render as 1x1 dots until it
    // runs. Not fatal: the extraction itself succeeded and re-running the
    // indexer alone repairs it.
    console.error(`  ⚠ SIZE INDEX FAILED — run tools/index-bitmap-sizes.mjs by hand`);
    console.error(`    ${cause.message.split("\n")[0]}`);
  }
}

console.log("");
console.log(`installed ${installed}, skipped ${skipped}, failed ${failed}`);
for (const failure of failures) console.log(`  failed: ${failure}`);
console.log(`client/assets/casts is now ${(size(DEST) / 1024 / 1024).toFixed(1)} MB`);
console.log(`took ${((Date.now() - started) / 1000).toFixed(1)}s`);
