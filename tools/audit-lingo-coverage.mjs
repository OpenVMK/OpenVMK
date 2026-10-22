/**
 * Lists every Lingo call VMK's transpiled code makes, ranked by how often.
 *
 * WHY THIS EXISTS
 *
 * A missing Director builtin does not throw — it returns a confident wrong
 * answer, and the failure surfaces somewhere unrelated. Every rendering and
 * interactivity bug chased in this port so far has been one of these:
 *
 *   rect(pointA, pointB)   unsupported  -> NaN dest rect -> no component row drew
 *   LingoPoint.inside      missing      -> every hit test answered false
 *   ink 41 / #bgColor      ignored      -> avatars rendered untinted
 *
 * None errored. All were found by staring at a symptom. This inverts that: dump
 * what the game ASKS FOR, ranked, so the gaps can be closed before they are hit.
 *
 *   node tools/audit-lingo-coverage.mjs              # top 60 of each kind
 *   node tools/audit-lingo-coverage.mjs --all        # everything
 *   node tools/audit-lingo-coverage.mjs --json       # machine-readable
 *
 * ⚠ TWO KINDS, AND THE SECOND IS THE DANGEROUS ONE.
 *
 *   callNamed("x", …)        a GLOBAL builtin. Missing ones throw a named error
 *                            and land in `missingBuiltins`, so they are already
 *                            visible.
 *   callMethod("x", tgt, …)  a METHOD on whatever `tgt` is. When the target is a
 *                            runtime class (LingoImage/Rect/Point/List/PropList)
 *                            and the method is absent, dispatch falls through to
 *                            a generic and answers VOID. Silent.
 *
 * Pair the `callMethod` list with the in-page probe in `docs/SESSION-HANDOFF.md`
 * to see which names the live native prototypes actually answer.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOTS = [
  "client/src/generated",
  "client/src/generated-casts",
  "client/src/generated-registration",
];

const args = process.argv.slice(2);
const showAll = args.includes("--all");
const asJson = args.includes("--json");

/** `callNamed("name"` and `callMethod("name"` — the two dispatch forms. */
const NAMED = /callNamed\(\s*"([^"]+)"/g;
const METHOD = /callMethod\(\s*"([^"]+)"/g;

const named = new Map();
const method = new Map();
let files = 0;

function bump(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(path);
      continue;
    }
    if (!entry.name.endsWith(".ts")) continue;
    files++;
    const text = readFileSync(path, "utf8");
    for (const m of text.matchAll(NAMED)) bump(named, m[1]);
    for (const m of text.matchAll(METHOD)) bump(method, m[1]);
  }
}

for (const root of ROOTS) {
  const full = resolve(root);
  try {
    if (statSync(full).isDirectory()) walk(full);
  } catch { /* a root that is not present is not an error */ }
}

const rank = (map) => [...map].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

const namedRanked = rank(named);
const methodRanked = rank(method);

if (asJson) {
  console.log(JSON.stringify({
    files,
    named: Object.fromEntries(namedRanked),
    method: Object.fromEntries(methodRanked),
  }, null, 2));
} else {
  const limit = showAll ? Infinity : 60;
  const show = (title, ranked) => {
    console.log("");
    console.log(`=== ${title} — ${ranked.length} distinct ===`);
    for (const [name, count] of ranked.slice(0, limit)) {
      console.log(`  ${String(count).padStart(6)}  ${name}`);
    }
    if (ranked.length > limit) console.log(`  … ${ranked.length - limit} more (--all)`);
  };
  console.log(`scanned ${files} generated files`);
  show("callNamed (global builtins)", namedRanked);
  show("callMethod (methods — SILENT when missing on a runtime class)", methodRanked);
}
