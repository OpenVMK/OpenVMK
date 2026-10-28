// Render each room's background art with its doorways (and seats) drawn on
// top, as one HTML gallery — for authoring/checking assets/room-exits.json.
//
// Placement copies the client: `CRoomAnchor.GetScrPos` projects absolute
// (x, y, z) to  screenX = x - y,  screenY = 0.5 * (x + y) - z,  offset by the
// stage centre (`CRoomRoot`: stage width/2, height/2), and a sprite is drawn at
// that point minus its bitmap's reg point.
//
//   node tools/render-room-doorways.mjs [out.html] [room ...]
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { doorwaysOf } from "./list-room-doorways.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CASTS = join(ROOT, "client", "assets", "casts");
const geometry = JSON.parse(readFileSync(join(ROOT, "assets", "room-geometry.json"), "utf8")).rooms;
const exitsFile = join(ROOT, "assets", "room-exits.json");
// room-exits.json is keyed by room CODE; the gallery draws casts, so show the
// first code's rules for each cast (shared casts — dark rides — look alike).
const exits = {};
if (existsSync(exitsFile)) {
  for (const [code, room] of Object.entries(JSON.parse(readFileSync(exitsFile, "utf8")).rooms ?? {})) {
    // On the picture a "?" marks an inferred exit; the list below says why.
    exits[room.cast] ??= room.exits.map((e) => ({ ...e, mapLabel: `${e.label}${e.flag ? " ?" : ""}` }));
  }
}
// Room codes and names per cast, from docs/ROOM-CODES.md (`| code | name | `cast` |`).
const codesByCast = new Map();
try {
  for (const m of readFileSync(join(ROOT, "docs", "ROOM-CODES.md"), "utf8").matchAll(/^\|\s*(\d+)\s*\|\s*([^|]*?)\s*\|\s*`([^`]+)`/gm)) {
    const list = codesByCast.get(m[3]) ?? [];
    list.push(`${m[1]} ${m[2]}`);
    codesByCast.set(m[3], list);
  }
} catch { /* no codes doc: headers show the cast only */ }
const seatsFile = join(ROOT, "assets", "room-seats.json");
const seats = existsSync(seatsFile) ? JSON.parse(readFileSync(seatsFile, "utf8")).rooms ?? {} : {};
const [outArg, ...only] = process.argv.slice(2);
const OUT = outArg ?? join(ROOT, "logs", "room-doorways.html");
const STAGE = { w: 800, h: 600 };
const CX = STAGE.w / 2, CY = STAGE.h / 2;

const scr = (x, y, z) => [x - y + CX, 0.5 * (x + y) - z + CY];

function background(room) {
  if (!room.source) return null;
  const [cast] = room.source.split("/");
  const xml = readFileSync(join(CASTS, room.source.replace("/", "/text/")), "latin1");
  // The first `default` node sits at the back; rooms name it <room>_bg.
  const nodes = [...xml.matchAll(/<NODE CLASS="default"([^>]*)\/>/g)].map((m) => m[1]);
  const pick = nodes.find((a) => /SPRITE="[^"]*_bg"/.test(a)) ?? nodes[0];
  if (!pick) return null;
  const sprite = /SPRITE="([^"]+)"/.exec(pick)[1];
  const n = (k) => Number(new RegExp(`\\s${k}="(-?\\d+)"`).exec(pick)?.[1] ?? 0);
  const findIn = (c) => {
    const file = join(CASTS, c, "manifest.tsv");
    if (!existsSync(file)) return null;
    return readFileSync(file, "utf8")
      .split("\n")
      .map((l) => l.split("\t"))
      .find((r) => r[1] === "bitmap" && r[2] === sprite && /\.png$/.test(r[6] ?? ""));
  };
  // Art can live in a sibling cast (the Haunted Mansion rooms' is in mp23348).
  let home = cast;
  let row = findIn(cast);
  if (!row) {
    for (const c of readdirSync(CASTS)) {
      if (/WRONG|\.old$/i.test(c)) continue;
      row = findIn(c);
      if (row) { home = c; break; }
    }
  }
  if (!row) return null;
  const [sx, sy] = scr(n("X"), n("Y"), n("Z"));
  // Root-relative: view through a server over the repo (launch config
  // `repo-static`, http://localhost:5190/logs/room-doorways.html).
  const href = `/client/assets/casts/${home}/${row[6]}`;
  return { href, left: sx - Number(row[7]), top: sy - Number(row[8]) };
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const cards = [];
for (const [name, room] of Object.entries(geometry).sort()) {
  if (only.length && !only.includes(name)) continue;
  if (!room.tiles.length || !room.doors.length) continue;
  const pos = new Map();
  for (let i = 0; i < room.tiles.length; i += 4) pos.set(room.tiles[i], room.tiles.slice(i + 1, i + 4));
  const s = room.tileSize;
  const diamond = (ref) => {
    const [x, y, z] = pos.get(ref);
    // The tile's footprint: its (x, y) corner to (x + s, y + s).
    const pts = [[x, y], [x + s, y], [x + s, y + s], [x, y + s]].map(([a, b]) => scr(a, b, z).join(","));
    return pts.join(" ");
  };
  const doorways = doorwaysOf(room);
  const authored = exits[name] ?? [];
  let svg = "";
  for (const [i, d] of doorways.entries()) {
    const rule = authored.find((e) => e.tiles.some((t) => d.tiles.includes(t)));
    const colour = rule ? (rule.flag ? "#eab308" : "#22c55e") : "#ef4444";
    for (const t of d.tiles) svg += `<polygon points="${diamond(t)}" fill="${colour}" fill-opacity=".55" stroke="#000" stroke-width=".5"/>`;
    const [x, y, z] = pos.get(d.tiles[Math.floor(d.tiles.length / 2)]);
    const [lx, ly] = scr(x + s / 2, y + s / 2, z);
    const text = `#${i}${rule ? ` → ${rule.mapLabel ?? rule.label ?? rule.to}` : ""}`;
    svg += `<text x="${lx}" y="${ly}" class="lbl">${esc(text)}</text>`;
  }
  // Seats, labelled with ref and current facing (from room-seats.json) so
  // assets/seat-facing.json can be authored from this view.
  // Hand-placed seats (seat-facing.json `add`) have no tile name, so walk the
  // union of named `sit` tiles and room-seats.json.
  const seatInfo = new Map((seats[name] ?? []).map((s) => [s.tile, s]));
  const seatRefs = new Set([
    ...Object.entries(room.names ?? {}).filter(([, n]) => /sit/i.test(n)).map(([r]) => Number(r)),
    ...seatInfo.keys(),
  ]);
  for (const ref of seatRefs) {
    if (!pos.has(ref)) continue;
    const seat = seatInfo.get(ref);
    // Blue = facing from Disney's name or seat-facing.json; yellow = inferred;
    // cyan = hand-placed.
    const fill = seat?.source === "inferred" ? "#eab308" : seat?.source === "added" ? "#06b6d4" : "#3b82f6";
    svg += `<polygon points="${diamond(ref)}" fill="${fill}" fill-opacity=".65"/>`;
    const [x, y, z] = pos.get(Number(ref));
    const [lx, ly] = scr(x + s / 2, y + s / 2, z);
    // Direction index -> screen arrow (clockwise from "away", room-geometry.ts).
    const dir = seat?.dir;
    const arrow = dir === null || dir === undefined ? "?" : "↑↗→↘↓↙←↖"[dir];
    svg += `<text x="${lx}" y="${ly + 5}" class="seatarrow">${arrow}</text>`;
    svg += `<text x="${lx}" y="${ly + 16}" class="seat">${ref}</text>`;
  }
  // Other NAMED tiles (not seats, not doorways) — queue lines, `teleport_upper`,
  // `podium`… The server keys behaviour off these names, so they are worth seeing.
  const doorwayTiles = new Set(doorways.flatMap((d) => d.tiles));
  for (const [ref, tileName] of Object.entries(room.names ?? {})) {
    const n = Number(ref);
    if (/sit/i.test(tileName) || doorwayTiles.has(n) || !pos.has(n)) continue;
    svg += `<polygon points="${diamond(n)}" fill="#a855f7" fill-opacity=".6" stroke="#000" stroke-width=".5"/>`;
    const [x, y, z] = pos.get(n);
    const [lx, ly] = scr(x + s / 2, y + s / 2, z);
    svg += `<text x="${lx}" y="${ly + 3}" class="named">${esc(tileName)} ${n}</text>`;
  }
  // Every tile's number, hidden until "show all tile numbers" is ticked.
  for (const [n, [x, y, z]] of pos) {
    const [lx, ly] = scr(x + s / 2, y + s / 2, z);
    svg += `<text x="${lx}" y="${ly + 3}" class="ref">${n}</text>`;
  }
  const bg = background(room);
  const img = bg ? `<image href="${bg.href}" x="${bg.left}" y="${bg.top}"/>` : "";
  const list = doorways
    .map((d, i) => {
      const rule = authored.find((e) => e.tiles.some((t) => d.tiles.includes(t)));
      const where = rule ? ` → <b>${esc(rule.label)}</b>${rule.flag ? ` <i class="flag">(${esc(rule.flag)})</i>` : ""}` : ` → <span class="none">no exit rule</span>`;
      return `#${i} ${d.label} [${esc(d.floor)}]${where} <span class="dim">tiles ${d.tiles[0]}${d.tiles.length > 1 ? `…(${d.tiles.length})` : ""}${d.names.length ? ` {${esc(d.names.join(","))}}` : ""}</span>`;
    })
    .join("<br>");
  const codes = codesByCast.get(name);
  const title = `${esc(name)}${codes ? ` <span class="codes">${esc(codes.join(" · "))}</span>` : ""}`;
  cards.push(
    `<section data-cast="${esc(name)}"><h2>${title}</h2><svg viewBox="0 0 ${STAGE.w} ${STAGE.h}">${img}${svg}</svg><p>${list}</p></section>`,
  );
}

writeFileSync(
  OUT,
  `<!doctype html><meta charset="utf-8"><title>Room doorways</title><style>
body{font:13px system-ui;background:#111;color:#ddd;margin:16px}
section{margin-bottom:32px}svg{width:800px;max-width:100%;background:#222;display:block}
.lbl{font:bold 14px system-ui;fill:#fff;stroke:#000;stroke-width:3px;paint-order:stroke;text-anchor:middle}
.seat{font:bold 9px system-ui;fill:#e5e7eb;stroke:#000;stroke-width:2px;paint-order:stroke;text-anchor:middle}
.seatarrow{font:bold 18px system-ui;fill:#fff;stroke:#000;stroke-width:3px;paint-order:stroke;text-anchor:middle}
h2 .codes{font-size:13px;font-weight:normal;color:#9ca3af;margin-left:8px}
.flag{color:#eab308}.none{color:#ef4444}.dim{color:#6b7280}section p{line-height:1.5}
.named{font:bold 10px system-ui;fill:#f3e8ff;stroke:#000;stroke-width:2.5px;paint-order:stroke;text-anchor:middle}
.ref{font:8px system-ui;fill:#fde68a;stroke:#000;stroke-width:2px;paint-order:stroke;text-anchor:middle;display:none}
body.refs .ref{display:inline}
</style><h1>Room doorways</h1><p>Exits: green = mapped, yellow = mapped but inferred, red = no rule. Seats: arrow = the way the avatar faces; blue = from the data, yellow = inferred, cyan = hand-placed. Purple = other named tiles. Filter with #cast,cast</p>
<p><label><input type="checkbox" id="refs"> show all tile numbers</label></p>${cards.join("\n")}
<script>
document.getElementById("refs").addEventListener("change", (e) => document.body.classList.toggle("refs", e.target.checked));
const show = () => {
  const want = decodeURIComponent(location.hash.slice(1)).split(",").filter(Boolean);
  for (const s of document.querySelectorAll("section")) {
    s.style.display = !want.length || want.includes(s.dataset.cast) ? "" : "none";
  }
};
addEventListener("hashchange", show);
show();
</script>`,
);
console.log(`wrote ${OUT} (${cards.length} room(s))`);
