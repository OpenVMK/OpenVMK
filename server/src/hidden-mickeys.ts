/**
 * HIDDEN MICKEYS (Disney's "Hidden Mickey Quest II" = the wiki's Part 2) — Mickey silhouettes drawn over rooms, found by
 * photographing them with the in-game camera. Client: `1d7a3232…`
 * (`CHiddenMickey*`), the camera (`CCameraInterface`), VMK Central's status
 * window. Protocol and history: docs/QUEST-ENGINE.md ("Hidden Mickey Quest II").
 *
 *   login          -> 2773 SetActiveMickeyList [n, n × (id, colour)] — BEFORE the
 *                     first room is ready, or the client draws none (it draws
 *                     only active IDs, and appends to the list, never clears it)
 *   770 [req, left, top] (a Mickey was wholly in the 184×124 viewfinder)
 *                  -> 2770 [req, newFound]; 1 opens the "Mickey found" window,
 *                     0 carries on with the ordinary photo
 *   771 [photoId, left, top] (the found Mickey's photo was saved) -> nothing
 *   772            -> 2771 [found, total]
 *   773            -> 2772 [n, n × (id, str date)] (VMK Central's list)
 *
 * Where each Mickey is: assets/hidden-mickeys.json, written by
 * tools/shockwave/build-hidden-mickey-casts.mjs from the room casts — Part 2's
 * `mickeyNNN` room objects and the 2008 set's `<layout>.mickey.xml`. That tool also
 * gives every Part 2 Mickey a `<MICKEY>` line (BLEND 0) so the 2008 camera can
 * find it, and restores Part 2's `t1`-`t8` art. See docs/QUEST-ENGINE.md.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./db.js";

export interface MickeyDef {
  id: number;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const here = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = process.env.VMK_HIDDEN_MICKEYS ?? join(here, "..", "..", "assets", "hidden-mickeys.json");

/**
 * Which Hidden Mickey quest is running. Disney ran them one after the other and
 * the client has ONE status / found list, so the server runs one at a time:
 *
 *   VMK_HIDDEN_MICKEY_QUEST=part2    Part 2: mickey001-050 (default)
 *   VMK_HIDDEN_MICKEY_QUEST=jan2008  the unreleased January 2008 set (`<layout>.mickey.xml`)
 *
 * Both sets are in the room definitions; the active list (2773) decides which
 * the client draws and photographs. Finds are kept per Mickey ID, and the IDs
 * never overlap (1-50 vs room code × 100 + n), so switching keeps each quest's own.
 */
export const HIDDEN_MICKEY_QUEST = process.env.VMK_HIDDEN_MICKEY_QUEST === "jan2008" ? "jan2008" : "part2";

/** layout name -> its Mickeys. */
const byLayout = new Map<string, MickeyDef[]>();
const allIds = new Set<number>();
if (existsSync(DATA_PATH)) {
  try {
    const raw = JSON.parse(readFileSync(DATA_PATH, "utf8")) as Record<string, Record<string, { mickeys: MickeyDef[] }>>;
    for (const [layout, def] of Object.entries(raw[HIDDEN_MICKEY_QUEST] ?? {})) {
      byLayout.set(layout, def.mickeys);
      for (const m of def.mickeys) allIds.add(m.id);
    }
  } catch (err) {
    console.warn(`[hidden-mickeys] ${DATA_PATH} unreadable: ${(err as Error).message}`);
  }
}
console.log(`Hidden Mickeys (${HIDDEN_MICKEY_QUEST}): ${allIds.size} in ${byLayout.size} room layout(s)`);

/** The camera's `camera.picture` element (vmk_photo_camera.window). */
export const VIEWFINDER = { w: 184, h: 124 } as const;

/**
 * Colour per Mickey (`hidden.mickey.color.N`: 0 Regular, 1 Gold, 2 Minnie,
 * 3 Donald, 4 Goofy). Which colour Disney gave each is lost; all are Regular.
 */
const colourOf = (_id: number): number => 0;

export function activeMickeyList(): { id: number; colour: number }[] {
  return [...allIds].sort((a, b) => a - b).map((id) => ({ id, colour: colourOf(id) }));
}

export const totalMickeys = (): number => allIds.size;

db.exec(`
  CREATE TABLE IF NOT EXISTS hidden_mickeys_found (
    user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mickey_id INTEGER NOT NULL,
    found_at  INTEGER NOT NULL,
    PRIMARY KEY (user_id, mickey_id)
  );
`);

export function foundMickeys(userId: number): { id: number; foundAt: number }[] {
  return (
    db.prepare("SELECT mickey_id AS id, found_at AS foundAt FROM hidden_mickeys_found WHERE user_id = ? ORDER BY found_at").all(userId) as {
      id: number;
      foundAt: number;
    }[]
  ).filter((r) => allIds.has(r.id));
}

/**
 * The Mickeys a photo at (left, top) captured in this room: those whose
 * position (the sprite's loc) lies inside the 184×124 frame. The client asks
 * only when one sits wholly inside; an overlap test also counted neighbours
 * just outside the frame (Storybookland's 4004 with a shot of 4006).
 */
export function mickeysInFrame(layout: string | undefined, left: number, top: number): MickeyDef[] {
  const defs = layout ? byLayout.get(layout) : undefined;
  if (!defs) return [];
  return defs.filter((m) => m.x >= left && m.x <= left + VIEWFINDER.w && m.y >= top && m.y <= top + VIEWFINDER.h);
}

/** Record the captured Mickeys; returns the ones that were new. */
export function recordFinds(userId: number, mickeys: MickeyDef[]): MickeyDef[] {
  const insert = db.prepare("INSERT OR IGNORE INTO hidden_mickeys_found (user_id, mickey_id, found_at) VALUES (?, ?, ?)");
  const now = Date.now();
  return mickeys.filter((m) => Number(insert.run(userId, m.id, now).changes) > 0);
}

export interface MickeyReward {
  at: number;
  credits: number;
  items: number[];
}

/**
 * The prize tiers (the wiki's, for Part 2; the 2008 set's are unknown, so it uses
 * the same): credits plus
 * Disney's Part II prize items — Bronze Mickey Part II 2086, Goofy Hat 41001,
 * Silver Mortimer Part II 2087, Photo Album 31, Gold Oswald Part II 2088, and
 * the first tier's Brown Mickey T-Shirt: "Mickey T-Shirt" comes in ten colours
 * (44080-44089, figure-set colours); 44086 is the brown one (#4C3422; 44085's
 * #735D39 is tan).
 */
export const REWARDS: MickeyReward[] = [
  { at: 1, credits: 375, items: [44086] },
  { at: 10, credits: 0, items: [2086] },
  { at: 20, credits: 375, items: [41001] },
  { at: 30, credits: 375, items: [2087] },
  { at: 40, credits: 375, items: [31] },
  { at: 50, credits: 750, items: [2088] },
];

/** The tiers crossed going from `before` to `after` finds. */
export const rewardsBetween = (before: number, after: number): MickeyReward[] => REWARDS.filter((r) => r.at > before && r.at <= after);

/** `dd.mm.yyyy`, the way Disney's own XML dates read. */
export function mickeyDate(ms: number): string {
  const d = new Date(ms);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}
