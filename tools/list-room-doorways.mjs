// List every room's doorways with where they sit ON SCREEN, for authoring
// assets/room-exits.json against guides that describe exits as "Top Left",
// "Bottom Right" and so on.
//
// Exit IDs are per TILE in most rooms (the Esplanade numbers 18 exit tiles
// 0..17), so a doorway here is a cluster of exit tiles that touch on the same
// floor. Screen position uses the client's projection (`CRoomAnchor.GetScrPos`):
//   screenX = x - y        screenY = 0.5 * (x + y) - z
// and is labelled against the room's own walkable extent.
//
//   node tools/list-room-doorways.mjs [room ...]      (default: every room)
//   node tools/list-room-doorways.mjs --json          (machine-readable)
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const geometry = JSON.parse(readFileSync(join(ROOT, "assets", "room-geometry.json"), "utf8")).rooms;
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const asJson = process.argv.includes("--json");

export function doorwaysOf(room) {
  const pos = new Map();
  const floorOf = new Map();
  for (let i = 0; i < room.tiles.length; i += 4) {
    const [ref, x, y, z] = room.tiles.slice(i, i + 4);
    pos.set(ref, { x, y, z, sx: x - y, sy: 0.5 * (x + y) - z });
    floorOf.set(ref, room.floorOf?.[i / 4] ?? -1);
  }
  const exitRefs = room.doors.flatMap((d) => d.tiles).filter((r) => pos.has(r));
  const idOf = new Map(room.doors.flatMap((d) => d.tiles.map((t) => [t, d.id])));
  const s = room.tileSize;
  const seen = new Set();
  const clusters = [];
  for (const start of exitRefs) {
    if (seen.has(start)) continue;
    const group = [];
    const queue = [start];
    seen.add(start);
    while (queue.length) {
      const at = queue.pop();
      group.push(at);
      const a = pos.get(at);
      for (const other of exitRefs) {
        if (seen.has(other) || floorOf.get(other) !== floorOf.get(at)) continue;
        const b = pos.get(other);
        if (Math.abs(a.x - b.x) <= s && Math.abs(a.y - b.y) <= s) {
          seen.add(other);
          queue.push(other);
        }
      }
    }
    clusters.push(group.sort((p, q) => p - q));
  }
  // Label against the walkable extent, so a room's border reads as its edges.
  const all = [...pos.values()];
  const minX = Math.min(...all.map((p) => p.sx)), maxX = Math.max(...all.map((p) => p.sx));
  const minY = Math.min(...all.map((p) => p.sy)), maxY = Math.max(...all.map((p) => p.sy));
  return clusters.map((tiles) => {
    const cx = tiles.reduce((n, t) => n + pos.get(t).sx, 0) / tiles.length;
    const cy = tiles.reduce((n, t) => n + pos.get(t).sy, 0) / tiles.length;
    const fx = (cx - minX) / (maxX - minX || 1);
    const fy = (cy - minY) / (maxY - minY || 1);
    const v = fy < 0.33 ? "top" : fy > 0.67 ? "bottom" : "middle";
    const h = fx < 0.33 ? "left" : fx > 0.67 ? "right" : "center";
    const names = [...new Set(tiles.map((t) => room.names?.[t]).filter(Boolean))];
    return {
      tiles,
      ids: [...new Set(tiles.map((t) => idOf.get(t)))],
      floor: room.floors?.[floorOf.get(tiles[0])]?.name ?? "",
      screen: [Math.round(cx), Math.round(cy)],
      frac: [Number(fx.toFixed(2)), Number(fy.toFixed(2))],
      label: v === "middle" && h === "center" ? "middle" : `${v === "middle" ? "" : v}${v !== "middle" && h !== "center" ? "-" : ""}${h === "center" ? "" : h}`,
      names,
    };
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const out = {};
  for (const [name, room] of Object.entries(geometry).sort()) {
    if (args.length && !args.includes(name)) continue;
    if (!room.tiles.length || !room.doors.length) continue;
    out[name] = doorwaysOf(room);
  }
  if (asJson) console.log(JSON.stringify(out, null, 1));
  else if (process.argv.includes("--compact")) {
    for (const [name, list] of Object.entries(out)) {
      const doors = list.map((d, i) => {
        const floor = d.floor && d.floor !== "ground" && d.floor !== "floor" ? `[${d.floor}]` : "";
        const names = d.names.length ? ` {${d.names.slice(0, 3).join(",")}}` : "";
        return `#${i} ${d.label}(${d.frac.join(",")})${floor} n${d.tiles.length}${names}`;
      });
      console.log(`${name}: ${doors.join(" | ")}`);
    }
  } else {
    for (const [name, list] of Object.entries(out)) {
      console.log(`\n${name}`);
      for (const [i, d] of list.entries()) {
        console.log(
          `  #${i} ${d.label.padEnd(12)} frac=${d.frac.join(",").padEnd(10)} floor=${d.floor.padEnd(12)} ` +
            `tiles=${d.tiles.length === 1 ? d.tiles[0] : `${d.tiles[0]}..${d.tiles[d.tiles.length - 1]}(${d.tiles.length})`}` +
            (d.names.length ? `  names=${d.names.join(",")}` : ""),
        );
      }
    }
  }
}
