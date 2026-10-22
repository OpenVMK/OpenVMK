import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [harPath, ...pairs] = process.argv.slice(2);
if (!harPath || pairs.length === 0) {
  console.error("usage: node tools/extract-room-furni.mjs <capture.har> <legacyRoomId>=<ourRoomCode> ...");
  console.error("  e.g. node tools/extract-room-furni.mjs penny.har 44=140");
  process.exit(1);
}
const rooms = new Map(
  pairs.map((p) => {
    const [from, to] = p.split("=").map(Number);
    if (!Number.isInteger(from) || !Number.isInteger(to)) throw new Error(`bad room pair "${p}"`);
    return [from, to];
  }),
);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function varint(b, i) {
  let v = 0, s = 0, x;
  do {
    x = b[i++];
    v += (x & 0x7f) * 2 ** s;
    s += 7;
  } while (x & 0x80);
  return [v, i];
}

function pb(b, depth = 0) {
  const out = [];
  let i = 0;
  while (i < b.length) {
    let key;
    [key, i] = varint(b, i);
    const field = Math.floor(key / 8), wire = key & 7;
    if (field === 0) throw new Error("field 0");
    if (wire === 0) {
      let v;
      [v, i] = varint(b, i);
      out.push([field, v]);
    } else if (wire === 2) {
      let len;
      [len, i] = varint(b, i);
      if (i + len > b.length) throw new Error("overrun");
      const sub = b.subarray(i, i + len);
      i += len;
      const text = sub.toString("utf8");
      const printable = /^[\x20-\x7e\r\n\t]*$/.test(text);
      let val;
      if (depth < 6 && !printable) {
        try { val = pb(sub, depth + 1); } catch { val = null; }
      } else val = printable ? text : null;
      out.push([field, val]);
    } else if (wire === 5) {
      out.push([field, b.readFloatLE(i)]);
      i += 4;
    } else if (wire === 1) {
      out.push([field, b.readDoubleLE(i)]);
      i += 8;
    } else throw new Error("wire " + wire);
  }
  return out;
}

const get = (m, f) => m?.find((x) => x[0] === f)?.[1];
const all = (m, f) => m.filter((x) => x[0] === f).map((x) => x[1]);

const furnimap = [
  join(process.env.VMK_SHOCKWAVE ?? join(root, "shockwave"), "siteref", "homepage", "download", "furnituremaps.0-99_2"),
  join(root, "assets", "furnimaps", "furnimaps_consolidated.xml"),
].map((p) => { try { return readFileSync(p, "latin1"); } catch { return ""; } }).join("\n");
const known = new Set([...furnimap.matchAll(/CODE="(\d+)"/g)].map((m) => Number(m[1])));

function item(m) {
  const out = { type: get(m, 20), tile: get(m, 5), dir: get(m, 11) ?? 0 };
  const state = get(m, 14);
  if (state) out.state = state;
  return { out, stack: get(m, 7) ?? 0 };
}

const har = JSON.parse(readFileSync(harPath, "utf8"));
const ws = har.log.entries.filter((x) => x._webSocketMessages).flatMap((x) => x._webSocketMessages);
const found = new Map();
const skipped = new Map();
let current = null;

for (const m of ws) {
  if (m.type !== "receive") continue;
  const b = Buffer.from(m.data, "base64");
  let [type, i] = varint(b, 2);
  const body = b.subarray(i);
  if (type === 23) {
    const id = get(pb(body), 1);
    current = rooms.has(id) ? id : null;
  } else if (type === 25 && current !== null && !found.has(current)) {
    const items = all(pb(body), 1).map(item);
    const kept = [];
    for (const { out, stack } of items) {
      if (!known.has(out.type)) {
        skipped.set(out.type, (skipped.get(out.type) ?? 0) + 1);
        continue;
      }
      kept.push({ out, stack });
    }
    kept.sort((a, b) => a.stack - b.stack);
    found.set(current, kept.map((k) => k.out));
  }
}

const target = join(root, "assets", "public-room-furni.json");
const data = existsSync(target) ? JSON.parse(readFileSync(target, "utf8")) : { rooms: {} };
for (const [from, to] of rooms) {
  const items = found.get(from);
  if (!items) {
    console.log(`  legacy room ${from}: not in the capture, left alone`);
    continue;
  }
  data.rooms[String(to)] = { source: `captured room ${from} (${harPath.split(/[\\/]/).pop()})`, items };
  console.log(`  legacy room ${from} -> room ${to}: ${items.length} items`);
}
writeFileSync(target, JSON.stringify(data, null, 1) + "\n");
console.log(`wrote ${target}`);
if (skipped.size) console.log("  skipped non-Disney types", JSON.stringify([...skipped]));
