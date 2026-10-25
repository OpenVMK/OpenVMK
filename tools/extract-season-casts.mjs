/**
 * Extracts the seasonal room casts (Christmas, Halloween) into folders the TS
 * client can tell apart from the everyday rooms.
 *
 * WHY A SEPARATE TOOL
 *
 * The archive keeps each season as a folder of casts with the SAME basenames as
 * the everyday ones:
 *
 *     vmk_spaces/vmk_hub2.cct            Central Plaza
 *     vmk_spaces/xmas/vmk_hub2.cct       Central Plaza, Christmas
 *     vmk_spaces/halloween/vmk_hub2.cct  Central Plaza, Halloween
 *
 * Shockwave fetches the real path, so it has no trouble. The TS client keys an
 * extraction by basename (`castKey` in boot-client.ts), and so does
 * `extract-casts.mjs` — all three land in `client/assets/casts/vmk_hub2`, and
 * whichever was extracted last is the room everybody sees, all year.
 *
 * Here each seasonal cast is installed as `<basename>.<season>` instead
 * (`vmk_hub2.xmas`). `castKey` gives a cast under a `xmas/` or `halloween/`
 * folder that suffix, and the game server serves those paths when
 * `VMK_SEASON` is set (server/src/seasons.ts). Casts whose basenames are
 * already unique (`vmk_holiday_animation`, `vmk_snd_hub2_halloween`) go
 * through `extract-casts.mjs` as usual.
 *
 *   node tools/extract-season-casts.mjs            # what is missing
 *   node tools/extract-season-casts.mjs --force    # re-extract all of them
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const ARCHIVE = process.env.VMK_SHOCKWAVE ?? resolve(import.meta.dirname, "..", "shockwave");
const EXTRACTOR = resolve(
  "tools/shockwave/LibreShockwave/cmake-build-native/cpp/libreshockwave_asset_extractor.exe",
);
const DEST = resolve("client/assets/casts");
/** Season -> the archive folders holding its same-named room casts. */
export const SEASON_FOLDERS = {
  // `vmk_sound/xmas/` holds the Christmas music for every decorated room but
  // Central Plaza (whose track also sits loose, as `vmk_snd_hub2_xmas`).
  xmas: ["vmk_spaces/xmas", "vmk_sound/xmas"],
  // `vmk_halloween/` repeats three of `halloween/` byte for byte, and adds the
  // one room that folder lacks: the Esplanade (2.2 MB, vs 307 KB everyday).
  halloween: ["vmk_spaces/halloween", "vmk_spaces/vmk_halloween"],
};

const force = process.argv.includes("--force");
if (!existsSync(EXTRACTOR)) {
  console.error(`extractor not built: ${EXTRACTOR}`);
  process.exit(1);
}

let installed = 0;
const failures = [];
for (const [season, folders] of Object.entries(SEASON_FOLDERS)) {
  for (const folder of folders) {
    const dir = join(ARCHIVE, folder);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((f) => /\.cct$/i.test(f))) {
      const base = file.replace(/\.cct$/i, "").toLowerCase();
      const target = `${base}.${season}`;
      // A name that already says its season (`vmk_mainstreet_halloween`) is
      // unique as it stands — extract-casts.mjs installs it under that name.
      if (base.includes(season)) continue;
      if (!force && existsSync(join(DEST, target, "manifest.tsv"))) {
        console.log(`  ${target}: present`);
        continue;
      }
      const work = mkdtempSync(join(tmpdir(), "vmk-season-"));
      try {
        mkdirSync(join(work, "in"));
        mkdirSync(join(work, "out"));
        cpSync(join(dir, file), join(work, "in", file));
        execFileSync(EXTRACTOR, [join(work, "in"), join(work, "out")], { stdio: "pipe" });
        const produced = join(work, "out", base);
        const alt = readdirSync(join(work, "out"))[0];
        const from = existsSync(produced) ? produced : alt ? join(work, "out", alt) : null;
        if (!from || !existsSync(join(from, "manifest.tsv"))) {
          failures.push(`${folder}/${file}: no manifest produced`);
          continue;
        }
        // Replace, never merge: a stale `.xmas` from another source file must
        // not leave its members behind.
        rmSync(join(DEST, target), { recursive: true, force: true });
        cpSync(from, join(DEST, target), { recursive: true });
        console.log(`  ${target}: extracted from ${folder}/${file}`);
        installed++;
      } catch (cause) {
        failures.push(`${folder}/${file}: ${String(cause.message).split("\n")[0]}`);
      } finally {
        rmSync(work, { recursive: true, force: true });
      }
    }
  }
}

// A cast with no size index draws every bitmap as a 1x1 dot (see
// extract-casts.mjs); the indexer skips casts that already have one.
if (installed > 0) {
  execFileSync(process.execPath, [resolve("tools/index-bitmap-sizes.mjs")], { stdio: "inherit" });
}
console.log(`\n${installed} installed${failures.length ? `, ${failures.length} failed:` : ""}`);
for (const f of failures) console.log(`  ${f}`);
