/**
 * Checks that every runtime helper a generated file USES, it also IMPORTS.
 *
 * The emitter writes a fixed import block. When it learns to emit a new helper
 * and that block is not updated, the generated file references a bare
 * identifier — which is a ReferenceError that fires only when that one handler
 * runs. Three of these were found by execution, one at a time, each costing a
 * debugging round: `setGlobal`, `deleteStringChunk`, `_key`.
 *
 * This finds the rest by inspection instead.
 *
 * Run: npx tsx client/src/lingo/generated-imports.check.mts
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const runtimePath = join(here, "lingo-runtime.ts");
const trees = [join(here, "..", "generated"), join(here, "..", "generated-casts")];

/** Everything `lingo-runtime.ts` exports — the set a generated file may import. */
function runtimeExports(): Set<string> {
  const source = readFileSync(runtimePath, "utf8");
  const names = new Set<string>();
  const pattern = /^export\s+(?:async\s+)?(?:function|const|class|let)\s+([A-Za-z_$][\w$]*)/gm;
  for (const match of source.matchAll(pattern)) names.add(match[1]);
  return names;
}

/** The names a generated file pulls in from the runtime. */
function importedNames(source: string): Set<string> {
  const block = /import\s*\{([\s\S]*?)\}\s*from\s*"\.\.\/lingo\/lingo-runtime\.js"/.exec(source);
  if (!block) return new Set();
  return new Set(
    block[1]
      .split(",")
      .map((part) => part.replace(/\btype\b/, "").trim())
      .filter((part) => part !== ""),
  );
}

const exported = runtimeExports();

/** Identifiers a generated file may legitimately call without importing. */
const JS_GLOBALS = new Set([
  "Number", "String", "Boolean", "Object", "Array", "Math", "JSON", "Date",
  "parseInt", "parseFloat", "isNaN", "console", "Symbol", "Map", "Set",
  "if", "for", "while", "switch", "return", "typeof", "catch", "function",
]);
const failures: Array<{ file: string; missing: string[] }> = [];
let scanned = 0;

for (const tree of trees) {
  if (!existsSync(tree)) continue;
  for (const name of readdirSync(tree)) {
    if (!name.endsWith(".ts")) continue;
    scanned++;

    const source = readFileSync(join(tree, name), "utf8");
    const imported = importedNames(source);
    /**
     * ⚠ Strip string literals and comments first. A first version matched
     * `VOID` inside the message `"Object ID or VOID expected:"` and reported two
     * clean files as broken — a checker that cries wolf is worse than no
     * checker, because the next real hit gets ignored.
     */
    const body = source
      .slice(source.indexOf("export function"))
      .replace(/"(?:[^"\\]|\\.)*"/g, '""')
      .replace(/'(?:[^'\\]|\\.)*'/g, "''")
      .replace(/`(?:[^`\\]|\\.)*`/g, "``")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");

    // ⚠ Compare against the runtime's exports, not against every identifier:
    // locals, parameters and JS globals are all legitimately undeclared here,
    // and only a name the runtime provides can be one the emitter meant to import.
    const missing = [...exported].filter(
      (helper) =>
        !imported.has(helper) &&
        new RegExp(`(?<![\\w$.])${helper.replace("$", "\\$")}(?![\\w$])`).test(body),
    );
    /**
     * ⚠ Also catch helpers the runtime does not have AT ALL.
     *
     * The first version only compared against the runtime's exports, so it could
     * find "runtime has it, file forgot to import it" but was blind to "the
     * emitter emits it and nothing implements it" — which is how `chunkCount`
     * got through a green check and failed at runtime minutes later.
     *
     * A called identifier that is neither imported, nor declared in the file,
     * nor a JS global is an emitter helper with no implementation.
     */
    const declared = new Set<string>();
    for (const m of body.matchAll(/\b(?:var|let|const|function)\s+([A-Za-z_$][\w$]*)/g)) {
      declared.add(m[1]);
    }
    for (const m of body.matchAll(/\bfor\s*\(\s*(?:var|let|const)\s+([A-Za-z_$][\w$]*)/g)) {
      declared.add(m[1]);
    }
    for (const m of /export function \w+\(([^)]*)\)/.exec(body)?.[1].split(",") ?? []) {
      const param = m.trim().split(/[:=\s]/)[0];
      if (param !== "") declared.add(param);
    }

    const unimplemented = new Set<string>();
    for (const m of body.matchAll(/(?<![\w$.])([A-Za-z_$][\w$]*)\s*\(/g)) {
      const called = m[1];
      if (imported.has(called) || declared.add.length === 0) continue;
      if (declared.has(called) || JS_GLOBALS.has(called) || exported.has(called)) continue;
      unimplemented.add(called);
    }

    const allMissing = [...missing, ...[...unimplemented].map((n) => `${n} (no implementation)`)];
    if (allMissing.length > 0) failures.push({ file: name, missing: allMissing });
  }
}

console.log(`scanned ${String(scanned)} generated files against ${String(exported.size)} runtime exports`);
if (failures.length === 0) {
  console.log("  ok   every runtime helper used is imported");
  process.exit(0);
}

console.log(`  FAIL ${String(failures.length)} file(s) use a runtime helper they do not import:`);
const byHelper = new Map<string, number>();
for (const { missing } of failures) {
  for (const helper of missing) byHelper.set(helper, (byHelper.get(helper) ?? 0) + 1);
}
for (const [helper, count] of [...byHelper].sort((a, b) => b[1] - a[1])) {
  console.log(`      ${String(count).padStart(5)}  ${helper}`);
}
for (const { file, missing } of failures.slice(0, 5)) {
  console.log(`      e.g. ${file}: ${missing.join(", ")}`);
}
process.exit(1);


