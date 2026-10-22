import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const harPath = process.argv[2];
if (!harPath) {
  console.error("usage: node tools/extract-dark-rides.mjs <capture.har>");
  process.exit(1);
}
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const SCENES = {
  2404: { code: 101, ride: "alice" },
  2405: { code: 102, ride: "alice" },
  2406: { code: 103, ride: "alice" },
  2407: { code: 104, ride: "alice" },
  2408: { code: 105, ride: "alice" },
  2409: { code: 106, ride: "peterpan" },
  2410: { code: 107, ride: "peterpan" },
  2411: { code: 108, ride: "peterpan" },
  2412: { code: 109, ride: "peterpan" },
  2413: { code: 110, ride: "peterpan" },
};
const COURTYARD_IDS = new Set([4110, 4111, 4112]);
const COURTYARD_CODE = 99;
const TURNSTILE_RIDE = { 581: "alice", 586: "peterpan" };

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
const texts = readFileSync(join(root, "assets", "overlay", "external_texts.txt"), "latin1");
const known = new Set([
  ...[...furnimap.matchAll(/CODE="(\d+)"/g)].map((m) => Number(m[1])),
  ...[...texts.matchAll(/^item\.(\d+)=/gm)].map((m) => Number(m[1])),
]);

const heights = new Map();
for (const entry of furnimap.matchAll(/<ITEM\b[^>]*\bCODE="(\d+)"[\s\S]*?<\/ITEM>/g)) {
  const firstDir = /<DIR\b[\s\S]*?<\/DIR>/.exec(entry[0])?.[0] ?? "";
  const hgts = [...firstDir.matchAll(/\bHGT="(-?\d+)"/g)].map((h) => Number(h[1]));
  heights.set(Number(entry[1]), hgts.length ? Math.max(...hgts) : 0);
}

function item(m) {
  const out = { type: get(m, 20), tile: get(m, 5), dir: get(m, 11) ?? 0, level: get(m, 7) ?? 0 };
  const state = get(m, 14);
  if (state) out.state = state;
  const conf = get(m, 13);
  if (typeof conf === "string" && conf) {
    const parsed = JSON.parse(conf);
    if (parsed.animArea) out.animArea = parsed.animArea;
    if (parsed.price !== undefined) out.fee = parsed.price;
  }
  return out;
}

const har = JSON.parse(readFileSync(harPath, "utf8"));
const ws = har.log.entries.find((x) => x._webSocketMessages)?._webSocketMessages ?? [];
const scenes = {};
const courtyard = new Map();
const returns = {};
const skipped = new Map();
let current = null;
let lastRide = null;

for (const m of ws) {
  if (m.type !== "receive") continue;
  const b = Buffer.from(m.data, "base64");
  let [type, i] = varint(b, 2);
  const body = b.subarray(i);
  if (type === 23) {
    const msg = pb(body);
    const id = get(msg, 1);
    if (SCENES[id]) {
      const meta = get(msg, 15);
      const json = typeof meta === "string" ? JSON.parse(meta.slice(meta.indexOf("{"))) : {};
      current = { kind: "scene", id };
      scenes[SCENES[id].code] ??= {
        ride: SCENES[id].ride,
        name: get(msg, 2),
        sound: (json.sound ?? "").replace(/^sound\//, ""),
        items: [],
      };
      lastRide = SCENES[id].ride;
    } else if (COURTYARD_IDS.has(id)) {
      current = { kind: "courtyard", id };
    } else current = null;
  } else if (!current) continue;
  else if (type === 24) {
    const self = get(pb(body), 1);
    const tile = get(self, 3), dir = get(self, 2);
    if (current.kind === "scene") scenes[SCENES[current.id].code].entry ??= { tile, dir };
    else if (lastRide && !returns[lastRide]) returns[lastRide] = { tile, dir };
  } else if (type === 25) {
    const items = all(pb(body), 1).map(item);
    for (const it of items) {
      if (!known.has(it.type)) {
        skipped.set(it.type, (skipped.get(it.type) ?? 0) + 1);
        continue;
      }
      if (current.kind === "scene") {
        const scene = scenes[SCENES[current.id].code];
        if (!scene.loaded) scene.items.push(it);
      } else courtyard.set(`${it.type}@${it.tile}`, it);
    }
    if (current.kind === "scene") scenes[SCENES[current.id].code].loaded = true;
  }
}

for (const s of Object.values(scenes)) {
  delete s.loaded;
  s.items = s.items
    .map((it, at) => ({ it, at }))
    .sort((a, b) => a.it.level - b.it.level || (heights.get(a.it.type) ?? 0) - (heights.get(b.it.type) ?? 0) || a.at - b.at)
    .map(({ it }) => {
      const { level, ...rest } = it;
      return rest;
    });
}
const rides = {};
for (const ride of ["alice", "peterpan"]) {
  const codes = Object.entries(scenes).filter(([, s]) => s.ride === ride).map(([c]) => Number(c)).sort((a, b) => a - b);
  const gate = [...courtyard.values()].find((i) => TURNSTILE_RIDE[i.type] === ride);
  rides[ride] = { turnstile: gate ? { type: gate.type, tile: gate.tile, fee: gate.fee ?? 0 } : null, scenes: codes, returnTo: returns[ride] ?? null };
}

const out = {
  source: "network capture (bothrides.har), extracted by tools/extract-dark-rides.mjs",
  courtyard: { code: COURTYARD_CODE, items: [...courtyard.values()] },
  rides,
  scenes,
};
const target = join(root, "assets", "dark-rides.json");
writeFileSync(target, JSON.stringify(out, null, 1) + "\n");
console.log(`wrote ${target}`);
for (const [code, s] of Object.entries(scenes)) {
  console.log(`  ${code} ${s.ride} "${s.name}" ${s.items.length} items, entry ${JSON.stringify(s.entry)}, ${s.sound}`);
}
console.log("  rides", JSON.stringify(rides));
console.log("  skipped non-Disney types", JSON.stringify([...skipped]));
