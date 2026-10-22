import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getRoomItems, placeRoomItem, removeRoomItem } from "./db.js";
import { isFurniture } from "./furni-footprint.js";

interface PlacedFurni {
  type: number;
  tile: number;
  dir: number;
  state?: number;
}

interface PublicFurniFile {
  rooms: Record<string, { source?: string; items: PlacedFurni[] }>;
}

const FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "public-room-furni.json");

function signature(items: PlacedFurni[]): string {
  return items.map((i) => `${i.type}@${i.tile}/${i.dir}`).sort().join(",");
}

export function seedPublicFurni(roomNameOf: (code: number) => string | undefined): void {
  if (!existsSync(FILE)) return;
  const data = JSON.parse(readFileSync(FILE, "utf8")) as PublicFurniFile;
  let seeded = 0;
  for (const [code, entry] of Object.entries(data.rooms)) {
    const room = roomNameOf(Number(code));
    if (!room) {
      console.log(`[public-furni] room ${code} has no layout; skipped`);
      continue;
    }
    const wanted = entry.items.filter((i) => isFurniture(i.type));
    const ownerless = getRoomItems(room).filter((i) => i.ownerId === null);
    const have = ownerless.map((i) => ({ type: i.typeCode, tile: i.tile, dir: i.dir }));
    if (signature(have) === signature(wanted)) continue;
    for (const item of ownerless) removeRoomItem(item.ref);
    for (const it of wanted) placeRoomItem(room, null, it.type, it.tile, it.dir, it.state ?? 0);
    console.log(`[public-furni] room ${code} (${room}): placed ${wanted.length} items from ${entry.source ?? "the capture"}`);
    seeded++;
  }
  console.log(`[public-furni] ${Object.keys(data.rooms).length} room(s), ${seeded} (re)seeded`);
}
