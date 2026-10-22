/**
 * The Music Mixers — Street Party (Main Street) and Monorail.
 *
 * TWO MIXERS, ONE PROTOCOL. Both run `CMusicMixerHandler` (casts
 * `vmk_music_mixer` / `vmk_monorail_mixer`, identical but for one guard) and
 * are performed through `CMusicPlayerHandler` (`vmk_musicmix_handler` /
 * `vmk_monorail_musicmix_handler`). What differs is the SAMPLE BANK: both banks
 * number their 41 samples the same way, but index N is a different recording
 * (and sometimes a different length) in each — so a song only means something
 * on the mixer it was made on, and each keeps its own list:
 *
 *   street    rooms 1103 (mix) / 42 (perform)   vmk_music_mixer_samples
 *   monorail  rooms 1107 (mix) / 15 (perform)   vmk_monorail_mixer_samples
 *
 * THE SONG is the client's own serialisation (`CMusicMixerComponent.
 * saveCurrentSong`): four track lists, spaces stripped, trailing zeros
 * trimmed — `[[10,0,18,-1],[26],[],[]]`. 0 is an empty slot, 1..41 a sample
 * index into `samples.config`, -1 the second slot of a two-slot sample. The
 * server only validates and stores it; every client plays it from its own bank.
 *
 * ⚠ SONG IDS ARE LIST POSITIONS. `SaveSong` sends `getActiveSong() - 1` — the
 * song's 0-based place in the list — where every other command sends its `id`.
 * Keeping ids equal to positions (0..3, renumbered on delete) makes both mean
 * the same song.
 *
 * REWARDS, from the VMK wiki ("Music Mixers"). Street Party: the first song you
 * save pays 100 credits and an Underwater Organ, the first you play 100. Both
 * mixers: 25 per save at most every 2 hours, 25 per performance at most every
 * 15 minutes. (Disney's own reward messages said "every day" / "every hour";
 * the wiki measured the real intervals.)
 */
import { db, ITEM_CATEGORY, addCredits, addItems } from "./db.js";

export type MixerVariant = "street" | "monorail";

/** Songs per player per mixer — `CMusicMixerPopup` disables CREATE at four. */
export const SONG_SLOTS = 4;
/**
 * One slot of a song, in ms: the metronome's `emptySnd` (Component
 * `SetUpPlaying`). The two builds differ — the Street Party mixer (the genuine
 * `vmk_music_mixer.cct`, 166,850 B, from vmk_source.zip) queues 2000, the
 * Monorail's 1777 — so a performance lasts as long as ITS mixer's song.
 */
export const SLOT_MS: Record<MixerVariant, number> = { street: 2000, monorail: 1778 };
/** Longest track: the grid is 16 slots wide. */
const MAX_SLOTS = 16;
/** Highest sample index in `samples.config`. */
const MAX_SAMPLE = 41;

/** Underwater Organ Color Brown — the Street Party's first-save prize. */
export const FIRST_SAVE_ITEM = 99;
const FIRST_SAVE_CREDITS = 100;
const FIRST_PLAY_CREDITS = 100;
const SAVE_CREDITS = 25;
const PLAY_CREDITS = 25;
export const SAVE_COOLDOWN_MS = 2 * 60 * 60 * 1000;
export const PLAY_COOLDOWN_MS = 15 * 60 * 1000;

db.exec(`
  CREATE TABLE IF NOT EXISTS music_songs (
    owner_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    variant    TEXT    NOT NULL,
    slot       INTEGER NOT NULL,
    name       TEXT    NOT NULL,
    data       TEXT    NOT NULL,
    updated_at INTEGER NOT NULL,
    PRIMARY KEY (owner_id, variant, slot)
  );
  CREATE TABLE IF NOT EXISTS music_rewards (
    owner_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    variant     TEXT    NOT NULL,
    saved_once  INTEGER NOT NULL DEFAULT 0,
    played_once INTEGER NOT NULL DEFAULT 0,
    save_at     INTEGER NOT NULL DEFAULT 0,
    play_at     INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (owner_id, variant)
  );
`);

export interface Song {
  id: number;
  name: string;
  data: string;
}

/** The mixer a room belongs to, for both the mixing rooms and the stages. */
export function mixerVariantOf(roomCode: number | undefined): MixerVariant | undefined {
  if (roomCode === 1103 || roomCode === 42) return "street";
  if (roomCode === 1107 || roomCode === 15) return "monorail";
  return undefined;
}

export function getSongs(ownerId: number, variant: MixerVariant): Song[] {
  return (
    db
      .prepare("SELECT slot, name, data FROM music_songs WHERE owner_id = ? AND variant = ? ORDER BY slot")
      .all(ownerId, variant) as Array<{ slot: number; name: string; data: string }>
  ).map((r) => ({ id: Number(r.slot), name: String(r.name), data: String(r.data) }));
}

export function getSong(ownerId: number, variant: MixerVariant, id: number): Song | undefined {
  return getSongs(ownerId, variant).find((s) => s.id === id);
}

/** A new song in the first free slot; undefined when all four are taken. */
export function createSong(ownerId: number, variant: MixerVariant, name: string, data: string): number | undefined {
  const taken = new Set(getSongs(ownerId, variant).map((s) => s.id));
  let slot = 0;
  while (taken.has(slot)) slot++;
  if (slot >= SONG_SLOTS) return undefined;
  db.prepare(
    "INSERT INTO music_songs (owner_id, variant, slot, name, data, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(ownerId, variant, slot, name, data, Date.now());
  return slot;
}

export function saveSong(ownerId: number, variant: MixerVariant, id: number, name: string, data: string): boolean {
  const set = name
    ? db.prepare("UPDATE music_songs SET data = ?, name = ?, updated_at = ? WHERE owner_id = ? AND variant = ? AND slot = ?")
      .run(data, name, Date.now(), ownerId, variant, id)
    : db.prepare("UPDATE music_songs SET data = ?, updated_at = ? WHERE owner_id = ? AND variant = ? AND slot = ?")
      .run(data, Date.now(), ownerId, variant, id);
  return Number(set.changes) > 0;
}

export function renameSong(ownerId: number, variant: MixerVariant, id: number, name: string): boolean {
  const set = db
    .prepare("UPDATE music_songs SET name = ?, updated_at = ? WHERE owner_id = ? AND variant = ? AND slot = ?")
    .run(name, Date.now(), ownerId, variant, id);
  return Number(set.changes) > 0;
}

/** Delete, then close the gap so ids stay equal to list positions (see top). */
export function deleteSong(ownerId: number, variant: MixerVariant, id: number): boolean {
  const gone = db.prepare("DELETE FROM music_songs WHERE owner_id = ? AND variant = ? AND slot = ?").run(ownerId, variant, id);
  if (Number(gone.changes) === 0) return false;
  const rest = getSongs(ownerId, variant);
  const move = db.prepare("UPDATE music_songs SET slot = ? WHERE owner_id = ? AND variant = ? AND slot = ?");
  rest.forEach((song, position) => {
    if (song.id !== position) move.run(position, ownerId, variant, song.id);
  });
  return true;
}

/**
 * The client's song string, checked and normalised; undefined if it is not one.
 * Four (or fewer) lists of at most 16 ints in -1..41.
 */
export function normaliseSongData(raw: string): string | undefined {
  const text = raw.replace(/\s+/g, "");
  if (text.length > 400 || !/^\[(\[(-?\d+(,-?\d+)*)?\](,\[(-?\d+(,-?\d+)*)?\])*)?\]$/.test(text)) return undefined;
  const tracks = [...text.slice(1, -1).matchAll(/\[([^\]]*)\]/g)].map((m) => (m[1] ? m[1].split(",").map(Number) : []));
  if (tracks.length > 4) return undefined;
  for (const track of tracks) {
    if (track.length > MAX_SLOTS) return undefined;
    if (track.some((v) => !Number.isInteger(v) || v < -1 || v > MAX_SAMPLE)) return undefined;
  }
  return text;
}

/** How long a song plays: its longest track, in slots. */
export function songSlots(data: string): number {
  let longest = 0;
  for (const m of data.matchAll(/\[([^\[\]]*)\]/g)) {
    longest = Math.max(longest, m[1] ? m[1].split(",").length : 0);
  }
  return longest;
}

export interface MixerReward {
  credits: number;
  /** Item codes granted with it. */
  items: number[];
  first: boolean;
}

function rewardRow(ownerId: number, variant: MixerVariant) {
  db.prepare("INSERT OR IGNORE INTO music_rewards (owner_id, variant) VALUES (?, ?)").run(ownerId, variant);
  return db.prepare("SELECT * FROM music_rewards WHERE owner_id = ? AND variant = ?").get(ownerId, variant) as {
    saved_once: number;
    played_once: number;
    save_at: number;
    play_at: number;
  };
}

function pay(ownerId: number, credits: number, items: number[]): void {
  if (credits > 0) addCredits(ownerId, credits, "Music Mixer Reward");
  if (items.length) addItems(ownerId, items, ITEM_CATEGORY.items);
}

/** A song was saved (created or re-saved). Null when still on cooldown. */
export function claimSaveReward(ownerId: number, variant: MixerVariant): MixerReward | null {
  const row = rewardRow(ownerId, variant);
  const t = Date.now();
  if (!row.saved_once && variant === "street") {
    db.prepare("UPDATE music_rewards SET saved_once = 1, save_at = ? WHERE owner_id = ? AND variant = ?").run(t, ownerId, variant);
    pay(ownerId, FIRST_SAVE_CREDITS, [FIRST_SAVE_ITEM]);
    return { credits: FIRST_SAVE_CREDITS, items: [FIRST_SAVE_ITEM], first: true };
  }
  if (t - Number(row.save_at) < SAVE_COOLDOWN_MS) return null;
  db.prepare("UPDATE music_rewards SET saved_once = 1, save_at = ? WHERE owner_id = ? AND variant = ?").run(t, ownerId, variant);
  pay(ownerId, SAVE_CREDITS, []);
  return { credits: SAVE_CREDITS, items: [], first: false };
}

/** A song was performed. Null when still on cooldown. */
export function claimPlayReward(ownerId: number, variant: MixerVariant): MixerReward | null {
  const row = rewardRow(ownerId, variant);
  const t = Date.now();
  if (!row.played_once && variant === "street") {
    db.prepare("UPDATE music_rewards SET played_once = 1, play_at = ? WHERE owner_id = ? AND variant = ?").run(t, ownerId, variant);
    pay(ownerId, FIRST_PLAY_CREDITS, []);
    return { credits: FIRST_PLAY_CREDITS, items: [], first: true };
  }
  if (t - Number(row.play_at) < PLAY_COOLDOWN_MS) return null;
  db.prepare("UPDATE music_rewards SET played_once = 1, play_at = ? WHERE owner_id = ? AND variant = ?").run(t, ownerId, variant);
  pay(ownerId, PLAY_CREDITS, []);
  return { credits: PLAY_CREDITS, items: [], first: false };
}
