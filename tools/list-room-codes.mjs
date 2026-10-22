/**
 * Print every room code, for use with the staff `/goto <code>` command.
 *
 * Codes come from `room.code.<n>` in external_variables_casts.txt — the same
 * table the server builds LOADABLE_ROOMS from — and names from `room.<n>.name`
 * in external_texts. A code with no name still works with /goto; it is simply
 * absent from the navigator, which is where the 144-vs-110 gap comes from.
 *
 *   node tools/list-room-codes.mjs            grouped, named rooms first
 *   node tools/list-room-codes.mjs --all      include unnamed codes
 *   node tools/list-room-codes.mjs --csv      code,name,cast
 *   node tools/list-room-codes.mjs --md       rewrite docs/ROOM-CODES.md
 *
 * ⚠ Prefer `--md` over editing docs/ROOM-CODES.md by hand. That file went stale
 * exactly once by being hand-maintained: it still claimed 92 named / 52 unnamed
 * after 18 rooms had been given names, and still listed room 1109's cast as
 * `checkers_game_room` after that was corrected to `vmk_checkers`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const vars = readFileSync(join(root, "assets", "external_variables_casts.txt"), "latin1");
const texts = readFileSync(join(root, "assets", "overlay", "external_texts.txt"), "latin1");

const casts = new Map();
for (const line of vars.split(/\r?\n/)) {
  const m = /^room\.code\.(\d+)\s*=\s*(.+?)\s*$/.exec(line);
  if (m) casts.set(Number(m[1]), m[2]);
}
const names = new Map();
for (const line of texts.split(/\r?\n/)) {
  const m = /^room\.(\d+)\.name\s*=\s*(.+?)\s*$/.exec(line);
  if (m) names.set(Number(m[1]), m[2]);
}

// Seats are keyed by GEOMETRY name, which is the cast basename — not by code.
// Several codes share one cast (all eleven dark rides, both `pirates_private`
// rooms), so the mark is per-cast and repeats across those codes.
let seatCasts = new Set();
try {
  const seats = JSON.parse(readFileSync(join(root, "assets", "room-seats.json"), "utf8"));
  seatCasts = new Set(Object.keys(seats.rooms ?? {}));
} catch {
  // No seat extract yet — the column simply stays empty.
}

const rows = [...casts.keys()]
  .sort((a, b) => a - b)
  .map((code) => {
    const cast = casts.get(code);
    return {
      code,
      name: names.get(code) ?? "",
      cast,
      seats: seatCasts.has(cast) || seatCasts.has(cast.replace(/^vmk_/, "")),
    };
  });

if (process.argv.includes("--md")) {
  const named = rows.filter((r) => r.name);
  const unnamed = rows.filter((r) => !r.name);
  const mark = (r) => (r.seats ? "seats" : "");
  const out = [
    "# Room codes",
    "",
    "Every `room.code.<n>` in `assets/external_variables_casts.txt` — the same map",
    "the server builds `LOADABLE_ROOMS` from. Use with the staff command",
    "`/goto <code>`.",
    "",
    "⚠ GENERATED — do not edit by hand. Regenerate with:",
    "",
    "```bash",
    "node tools/list-room-codes.mjs --md",
    "```",
    "",
    `**${rows.length} codes** — ${named.length} named (the navigator advertises these),`,
    `${unnamed.length} unnamed but loadable.`,
    "**seats** marks a room whose cast has extracted sit tiles",
    "(`assets/room-seats.json`); it is per-CAST, so codes sharing a cast share the mark.",
    "",
    "## Named",
    "",
    "| code | name | cast | |",
    "|---:|---|---|---|",
    ...named.map((r) => `| ${r.code} | ${r.name} | \`${r.cast}\` | ${mark(r)} |`),
    "",
    "## Unnamed (no `room.<n>.name` text; show as \"Room <code>\")",
    "",
    "| code | cast | |",
    "|---:|---|---|",
    ...unnamed.map((r) => `| ${r.code} | \`${r.cast}\` | ${mark(r)} |`),
    "",
  ].join("\n");
  const dest = join(root, "docs", "ROOM-CODES.md");
  writeFileSync(dest, out, "utf8");
  console.log(`wrote ${dest}`);
  console.log(`  ${rows.length} codes — ${named.length} named, ${unnamed.length} unnamed`);
} else if (process.argv.includes("--csv")) {
  console.log("code,name,cast");
  for (const r of rows) console.log(`${r.code},"${r.name.replace(/"/g, '""')}",${r.cast}`);
} else {
  const showAll = process.argv.includes("--all");
  const named = rows.filter((r) => r.name);
  const unnamed = rows.filter((r) => !r.name);
  for (const r of named) {
    console.log(`${String(r.code).padStart(4)}  ${r.name.padEnd(34)} ${r.cast}`);
  }
  if (showAll && unnamed.length) {
    console.log(`\n--- ${unnamed.length} code(s) with no room.<n>.name (still work with /goto)`);
    for (const r of unnamed) console.log(`${String(r.code).padStart(4)}  ${"".padEnd(34)} ${r.cast}`);
  }
  console.log(
    `\n${rows.length} codes total — ${named.length} named, ${unnamed.length} unnamed` +
      (showAll ? "" : "  (--all to show the unnamed)"),
  );
}
