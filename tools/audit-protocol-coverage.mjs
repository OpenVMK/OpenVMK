// Which protocol messages does the client register that the server never handles / never sends?
//
//   node tools/audit-protocol-coverage.mjs [--json out.json]
//
// Client side: every `tCmds.setaProp("name", N)` (client -> server command) and
// `tMsgs.setaProp(N, #handler)` (server -> client message) in the extracted Lingo
// under client/assets/casts/*/scripts. Server side: the CMD/MSG tables in
// server/src/vmk-protocol.ts, and which of those names the server code actually
// references (a CMD compared against = handled; a MSG passed along = sent).
// A raw numeric literal in the server counts too, so hand-coded ids are not
// reported as missing.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const CASTS = join(ROOT, "client", "assets", "casts");
const SERVER = join(ROOT, "server", "src");

// ---------------------------------------------------------------- client --
const cmds = new Map(); // id -> { names:Set, casts:Set }
const msgs = new Map(); // id -> { handlers:Set, casts:Set }
const add = (map, id, label, cast) => {
  const e = map.get(id) ?? map.set(id, { names: new Set(), casts: new Set() }).get(id);
  e.names.add(label); e.casts.add(cast);
};
for (const cast of readdirSync(CASTS)) {
  if (/WRONG|\.bak$|\.old$/i.test(cast)) continue;
  const dir = join(CASTS, cast, "scripts");
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".ls")) continue;
    const src = readFileSync(join(dir, f), "latin1");
    for (const m of src.matchAll(/setaProp\(\s*"([^"]+)"\s*,\s*(\d+)\s*\)/g)) add(cmds, Number(m[2]), m[1], cast);
    for (const m of src.matchAll(/setaProp\(\s*(\d+)\s*,\s*#(\w+)\s*\)/g)) add(msgs, Number(m[1]), m[2], cast);
  }
}

// ---------------------------------------------------------------- server --
const proto = readFileSync(join(SERVER, "vmk-protocol.ts"), "utf8");
const table = { CMD: new Map(), MSG: new Map() }; // name -> id
let block = null;
for (const line of proto.split("\n")) {
  const start = /^export const (CMD|MSG)\b/.exec(line);
  if (start) { block = start[1]; continue; }
  if (block && /^\};?\s*(as const)?/.test(line)) { block = null; continue; }
  const kv = block && /^\s+([A-Z][A-Z0-9_]*)\s*:\s*(\d+)/.exec(line);
  if (kv) table[block].set(kv[1], Number(kv[2]));
}
const code = readdirSync(SERVER)
  .filter((f) => f.endsWith(".ts") && f !== "vmk-protocol.ts" && !f.includes(".smoke."))
  .map((f) => readFileSync(join(SERVER, f), "utf8"))
  .join("\n");
const used = (kind, name) => new RegExp(`\\b${kind}\\.${name}\\b`).test(code);
const handledCmd = new Set([...table.CMD].filter(([n]) => used("CMD", n)).map(([, id]) => id));
const sentMsg = new Set([...table.MSG].filter(([n]) => used("MSG", n)).map(([, id]) => id));
// Hand-coded numeric ids (e.g. `command === 586`, `send(2594, ...)`).
for (const m of code.matchAll(/command\s*===\s*(\d+)/g)) handledCmd.add(Number(m[1]));
for (const m of code.matchAll(/send\(\s*(\d{4})\s*,/g)) sentMsg.add(Number(m[1]));
const nameOf = (kind, id) => [...table[kind]].filter(([, v]) => v === id).map(([n]) => n).join("/") || "-";

// ---------------------------------------------------------------- report --
const tidyCasts = (s) => {
  const named = [...s].filter((c) => !/^[0-9a-f]{32}$/.test(c));
  const core = s.size - named.length;
  return [...named.slice(0, 4), ...(named.length > 4 ? [`+${named.length - 4}`] : []), ...(core ? [`${core} core`] : [])].join(", ");
};
const missingCmds = [...cmds].filter(([id]) => !handledCmd.has(id)).sort((a, b) => a[0] - b[0]);
const missingMsgs = [...msgs].filter(([id]) => !sentMsg.has(id)).sort((a, b) => a[0] - b[0]);

console.log(`client registers ${cmds.size} commands and ${msgs.size} messages`);
console.log(`server handles ${[...cmds.keys()].filter((id) => handledCmd.has(id)).length} of those commands, sends ${[...msgs.keys()].filter((id) => sentMsg.has(id)).length} of those messages\n`);
console.log(`=== client -> server commands the server never handles (${missingCmds.length}) ===`);
for (const [id, e] of missingCmds) console.log(`${String(id).padStart(5)}  ${[...e.names].join(" / ").padEnd(42)} ${nameOf("CMD", id).padEnd(28)} [${tidyCasts(e.casts)}]`);
console.log(`\n=== server -> client messages the server never sends (${missingMsgs.length}) ===`);
for (const [id, e] of missingMsgs) console.log(`${String(id).padStart(5)}  ${[...e.names].join(" / ").padEnd(42)} ${nameOf("MSG", id).padEnd(28)} [${tidyCasts(e.casts)}]`);

const out = process.argv.indexOf("--json");
if (out > 0) {
  const ser = (list) => list.map(([id, e]) => ({ id, names: [...e.names], casts: [...e.casts], serverName: nameOf(list === missingCmds ? "CMD" : "MSG", id) }));
  writeFileSync(process.argv[out + 1], JSON.stringify({ missingCmds: ser(missingCmds), missingMsgs: ser(missingMsgs) }, null, 2));
}
