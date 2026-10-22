import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { clearRoomItems, getRoomItems, placeRoomItem, setRoomItemConfig } from "./db.js";
import { isFurniture } from "./furni-footprint.js";
import { PROXIMITY_KEYS } from "./ride-triggers.js";
import { TURN_ART_OFFSET } from "./rides.js";

export type DarkRide = "alice" | "peterpan";

interface SceneItem {
  type: number;
  tile: number;
  dir: number;
  state?: number;
  animArea?: number[];
  fee?: number;
}

interface Scene {
  ride: DarkRide;
  name: string;
  sound: string;
  entry: { tile: number; dir: number };
  items: SceneItem[];
}

interface DarkRideData {
  courtyard: { code: number; items: SceneItem[] };
  rides: Record<DarkRide, { turnstile: { type: number; tile: number; fee: number } | null; scenes: number[]; returnTo: { tile: number; dir: number } | null }>;
  scenes: Record<string, Scene>;
}

const RIDE_VEHICLE: Record<DarkRide, number> = { alice: 10, peterpan: 11 };
const RIDE_PRELOAD_REF: Record<DarkRide, number> = { alice: 3970926, peterpan: 3970931 };

export function darkRidePreloadRef(code: number): number | undefined {
  const scene = data?.scenes[String(code)];
  if (!scene || darkRideScenes(scene.ride)[0] !== code) return undefined;
  return RIDE_PRELOAD_REF[scene.ride];
}

const file = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "dark-rides.json");
const data: DarkRideData | null = existsSync(file) ? (JSON.parse(readFileSync(file, "utf8")) as DarkRideData) : null;

export const DARK_RIDE_COURTYARD = data?.courtyard.code ?? 99;

export function darkRideSceneKey(code: number): string {
  return `darkride:${code}`;
}

export function isDarkRideScene(code: number | undefined): boolean {
  return code !== undefined && data?.scenes[String(code)] !== undefined;
}

export function darkRideOfGate(typeCode: number): DarkRide | undefined {
  if (!data) return undefined;
  return (Object.keys(data.rides) as DarkRide[]).find((r) => data.rides[r].turnstile?.type === typeCode);
}

export function darkRideScenes(ride: DarkRide): number[] {
  return data?.rides[ride].scenes ?? [];
}

export function darkRideScene(code: number): { ride: DarkRide; name: string; entry: { tile: number; dir: number }; vehicle: number; last: boolean } | undefined {
  const scene = data?.scenes[String(code)];
  if (!scene) return undefined;
  const order = darkRideScenes(scene.ride);
  return { ride: scene.ride, name: scene.name, entry: scene.entry, vehicle: RIDE_VEHICLE[scene.ride], last: order[order.length - 1] === code };
}

export function nextDarkRideScene(code: number): number | undefined {
  const scene = data?.scenes[String(code)];
  if (!scene) return undefined;
  const order = darkRideScenes(scene.ride);
  return order[order.indexOf(code) + 1];
}

/**
 * The ride's doors in the Courtyard layout (`alice_exit_8..10`,
 * `pan_exit_12..14`). Boarding walks into one; finishing lands on `returnTo`.
 * They are NOT room exits: stepping onto one goes nowhere (room-exits.json).
 */
const RIDE_DOOR_IDS: Record<DarkRide, number[]> = { alice: [8, 9, 10], peterpan: [12, 13, 14] };

export function darkRideDoorIds(ride: DarkRide): number[] {
  return RIDE_DOOR_IDS[ride];
}

export function darkRideReturn(ride: DarkRide): { tile: number; dir: number } | null {
  return data?.rides[ride].returnTo ?? null;
}

function signature(items: Array<{ type: number; tile: number; dir: number }>): string {
  return items.map((i) => `${i.type}@${i.tile}/${i.dir}`).join(",");
}

const WALL_TOPPERS = new Map<number, number>([[592, 589]]);

function settleWallPieces(items: SceneItem[]): SceneItem[] {
  return items.map((item) => {
    const wallType = WALL_TOPPERS.get(item.type);
    if (wallType === undefined) return item;
    const wall = items.find((w) => w.type === wallType && w.tile === item.tile);
    if (!wall) return item;
    const turn = (wall.dir - item.dir + 8) % 8;
    const animArea = item.animArea?.map((_, k, area) => area[(k + turn) % 8]);
    return { ...item, dir: wall.dir, ...(animArea ? { animArea } : {}) };
  });
}

function animConfig(area: number[]): Record<string, string> {
  return Object.fromEntries(PROXIMITY_KEYS.map((k, i) => [k, String(area[i] ?? 0)]));
}

export function seedDarkRides(courtyardRoom: string | undefined): void {
  if (!data) {
    console.log("[darkride] assets/dark-rides.json missing; scenes left empty");
    return;
  }
  let seeded = 0;
  for (const [code, scene] of Object.entries(data.scenes)) {
    const key = darkRideSceneKey(Number(code));
    const wanted = settleWallPieces(scene.items)
      .filter((i) => isFurniture(i.type))
      .map((i) => ({ ...i, dir: (i.dir + (TURN_ART_OFFSET.get(i.type) ?? 0)) % 8 }));
    const have = getRoomItems(key).map((i) => ({ type: i.typeCode, tile: i.tile, dir: i.dir }));
    if (signature(have) === signature(wanted)) continue;
    clearRoomItems(key);
    for (const it of wanted) {
      const placed = placeRoomItem(key, null, it.type, it.tile, it.dir, it.state ?? 0);
      if (it.animArea) setRoomItemConfig(placed.ref, animConfig(it.animArea));
    }
    seeded++;
  }
  if (courtyardRoom) {
    const present = getRoomItems(courtyardRoom);
    for (const gate of data.courtyard.items) {
      if (!isFurniture(gate.type)) continue;
      if (present.some((i) => i.typeCode === gate.type && i.tile === gate.tile)) continue;
      const placed = placeRoomItem(courtyardRoom, null, gate.type, gate.tile, gate.dir, 1);
      setRoomItemConfig(placed.ref, { fee: String(gate.fee ?? 0), credits: "0" });
      console.log(`[darkride] placed ride gate ${gate.type} at ${courtyardRoom} tile ${gate.tile}`);
    }
  }
  console.log(`[darkride] ${Object.keys(data.scenes).length} scenes, ${seeded} (re)seeded`);
}
