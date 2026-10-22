/**
 * Every thread definition, and whether the classes it names actually exist.
 *
 *   node tools/check-thread-classes.mjs
 *
 * ── Why ────────────────────────────────────────────────────────────────────
 * `CMgrThread.initThread` builds a thread from a cast MEMBER field holding
 * `thread.id`, `thread.class`, and `<module>.class` for interface/component/
 * handler. Each named class is resolved with `getmemnum`, and when that comes
 * back < 1 `buildThreadObj` reports "Script not found: 0" AND UNREGISTERS the
 * thread — so the thread silently ceases to exist rather than existing broken.
 *
 * Anything that later does `getThread(#X).component` then hits void, and `.`
 * on void is the bare "Object expected" the client reports with no location.
 *
 * ⚠ THE "MISSING" COLUMN IS NOT YET TRUSTWORTHY. `memberName` below reads the
 * last length-prefixed run of a CASt info block, which is reliable for TEXT
 * members and not for SCRIPT members, so the index under-counts scripts. The
 * tell is that every reported miss is a `handler.class` — including
 * `CInterfaceHandler`, whose source we have decompiled — which is a defect in
 * this scan, not 16 broken threads.
 *
 * The thread INVENTORY it prints (26 definitions, their casts and ids) is
 * sound; only the resolution check is not. Fix `memberName` for script members
 * before believing a miss.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { read, chunkData } from "./shockwave/afterburner.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOTS = [
  join(ROOT, "assets", "patches"),
  join(ROOT, "assets", "overlay"),
  process.env.VMK_SHOCKWAVE ?? join(ROOT, "shockwave"),
];
// ⚠ Director fields are CR-terminated.
const EOL = /\r\n|\r|\n/;

const vars = readFileSync(join(ROOT, "assets", "external_variables_casts.txt"), "latin1");
const entries = [...vars.matchAll(/^cast\.entry\.\d+=(.+)$/gm)].map((m) => m[1].trim());
console.log(`cast.entry list: ${entries.length} cast(s)`);

/** Member name = last length-prefixed run of the CASt info block. */
function memberName(d) {
  const infoLen = d.readUInt32BE(4);
  const info = d.subarray(12, 12 + infoLen);
  for (let i = info.length - 1; i >= 2; i--) {
    const len = info[i - 1];
    if (len > 0 && i + len === info.length) {
      const s = info.toString("latin1", i, i + len);
      if (/^[\x20-\x7e]+$/.test(s)) return s;
    }
  }
  return null;
}

const allMembers = new Set(); // every member name across every loaded cast
const threads = []; // { cast, id, modules: {module: [classes]} }
let scanned = 0;

for (const rel of entries) {
  const path = ROOTS.map((r) => join(r, `${rel.replace(/\//g, "\\")}.cct`)).find(existsSync);
  if (!path) { console.log(`  MISSING CAST: ${rel}`); continue; }
  let cast;
  try { cast = read(readFileSync(path)); } catch { console.log(`  unreadable: ${rel}`); continue; }
  scanned++;

  for (const e of cast.entries.filter((x) => x.tag === "CASt")) {
    let n;
    try { n = memberName(chunkData(cast, e)); } catch { continue; }
    if (n) allMembers.add(n);
  }
  for (const e of cast.entries.filter((x) => x.tag === "STXT")) {
    let s;
    try { s = chunkData(cast, e).toString("latin1").slice(12); } catch { continue; }
    if (!/(^|[\r\n])thread\.id\s*=/.test(s)) continue;
    const kv = new Map();
    for (const line of s.split(EOL)) {
      const m = /^([\w.]+)\s*=\s*(.*)$/.exec(line.trim());
      if (m) kv.set(m[1], m[2].trim());
    }
    const parse = (v) => {
      if (!v) return [];
      const t = v.trim();
      if (t.startsWith("[")) {
        return [...t.matchAll(/"([^"]+)"/g)].map((x) => x[1]);
      }
      return [t.replace(/^"|"$/g, "")];
    };
    threads.push({
      cast: rel,
      id: kv.get("thread.id") ?? "(none)",
      modules: {
        thread: parse(kv.get("thread.class")),
        interface: parse(kv.get("interface.class")),
        component: parse(kv.get("component.class")),
        handler: parse(kv.get("handler.class")),
      },
    });
  }
}

console.log(`scanned ${scanned} cast(s); ${allMembers.size} named member(s) indexed`);
console.log(`thread definitions found: ${threads.length}\n`);

let broken = 0;
for (const t of threads) {
  const missing = [];
  for (const [mod, classes] of Object.entries(t.modules)) {
    for (const c of classes) if (c && !allMembers.has(c)) missing.push(`${mod}.class=${c}`);
  }
  const mark = missing.length > 0 ? "  *** MISSING ***" : "";
  if (missing.length > 0) broken++;
  console.log(`${t.id.padEnd(22)} ${t.cast}${mark}`);
  for (const m of missing) console.log(`      cannot resolve ${m}`);
}
console.log(`\nthreads that will FAIL to build: ${broken}`);
