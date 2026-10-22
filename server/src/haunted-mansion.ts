/**
 * Haunted Mansion Ghost Chasers — the LOBBY (room 1104, `haunted_mansion_lobby`).
 * Plan and protocol: docs/HAUNTED-MANSION-PLAN.md.
 *
 * The client is `vmk_hm_lobby_handler/CHMLobbyInterface` over the shared
 * `minigame_lobby/CLobbyHandler` (640-651 in, 2640-2652 out) — the same
 * protocol as the Pirates lobbies (pirates.ts), with these differences:
 *
 *   - The client NEVER asks for the game list: `InitService` only resets
 *     state. The snapshot `2642` is pushed when the player's avatar exists
 *     (ROOM_START, after CreateAvatars — `update` reads the own avatar's NAME
 *     from the room), and every change after that is pushed.
 *   - `640 {l}` creates. `l` is always "0": the level picker
 *     (`CreateStartGameWindow`) is never opened. The creator is on team 1.
 *   - Teams: 1 green, 2 purple, at most 4 each. START (`648`) needs at least one
 *     player per team (`checkStartGameButton`) — not equal teams.
 *   - No participant key/values are read; none are sent.
 *   - The lobby also asks for its room instances (`36 [1001]` → the HM 2023
 *     shape); that is answered in mus-server.ts.
 *
 * High scores: the lobby's HALL OF FAME asks `661 [5, indexType]` (0 today,
 * 1 last 7 days, 2 ever) and reads `2662 gameId, scoreType, n×(rank, score,
 * name)`. The wiki: the Hall of Fame "only shows win counts" — so the score is
 * wins in the period.
 */
import { db } from "./db.js";
import { HmMatch } from "./hm-match.js";
import type { PotcPlayer } from "./pirates.js";
import { decodeToInt, MSG, readClientString, wireText, type OutgoingParam } from "./vmk-protocol.js";

export const HM_LOBBY_ROOM = 1104;
/** `CHMLobbyInterface.CreateHighscoreWindow`: `DisplayHighscore(5, …)`. */
export const HM_GAME_CODE = 5;

/**
 * VMK_HM_TEST_OPPONENT=1: a new game comes with a placeholder player on the
 * purple team (negative ref, no avatar — the slot shows blank), so one tester
 * can press START. Off for real play.
 */
const TEST_OPPONENT = process.env.VMK_HM_TEST_OPPONENT === "1";
const MAX_GAMES = 8;
const TEAM_SIZE = 4;
/** Disney's `lobby.error.create.1`. */
const CREATE_FULL = 1;

export type HmPlayer = PotcPlayer & {
  /**
   * This player's `2582 CreateAvatars` block standing on `tile` facing
   * `facing`. A stage is a LOCAL room switch, so the match places everyone
   * itself; only mus-server knows figures, pins and badges.
   */
  avatarBlock: (tile: number, facing: number, team: 1 | 2) => OutgoingParam[];
};

export interface HmParticipant {
  /** Avatar ref (user id); negative for the test placeholder. */
  ref: number;
  team: 1 | 2;
}

/** What the lobby needs from a running match. */
export interface HmGame {
  readonly bucket: string;
  prepare(): void;
  has(userId: number): boolean;
  roomStarted(userId: number): boolean;
  stageLoaded(userId: number): void;
  /** `601 [count, action, data…]` — count matters: a checksum report is action 3 with count 1. */
  action(userId: number, count: number, action: number, data: number[]): void;
  drop(userId: number): void;
}

const createMatch = (
  ref: number,
  participants: HmParticipant[],
  players: Map<number, HmPlayer>,
  onOver: (m: HmGame) => void,
): HmGame => new HmMatch(ref, participants, players, onOver);

interface Game {
  ref: number;
  owner: HmPlayer;
  /** Insertion order is display order. */
  participants: Map<number, HmParticipant>;
}

const watchers = new Map<number, HmPlayer>();
const games = new Map<number, Game>();
let nextGameRef = 1;
const TAG = "hm";

// ---------------------------------------------------------------- encoding

function kv(pairs: Record<string, string | number>): OutgoingParam[] {
  const entries = Object.entries(pairs);
  return [{ int: entries.length }, ...entries.flatMap(([k, v]) => [{ str: k }, { str: String(v) }])];
}

/** One game in `2642`: ref, desc, owner, timeLeft, participants, game key/values. */
function gameRecord(game: Game): OutgoingParam[] {
  const out: OutgoingParam[] = [
    { int: game.ref },
    { str: game.owner.name },
    { int: game.owner.userId },
    { int: 0 },
    { int: game.participants.size },
  ];
  for (const p of game.participants.values()) out.push({ int: p.ref }, { int: p.team }, ...kv({}));
  out.push(...kv({ l: 0 }));
  return out;
}

function snapshot(): OutgoingParam[] {
  return [{ int: games.size }, ...[...games.values()].flatMap(gameRecord)];
}

function broadcast(msg: number, params: OutgoingParam[], log: string): void {
  for (const w of watchers.values()) w.send(msg, params, log);
}

// ---------------------------------------------------------------- state helpers

function teamCount(game: Game, team: 1 | 2): number {
  let n = 0;
  for (const p of game.participants.values()) if (p.team === team) n++;
  return n;
}

function gameOf(userId: number): Game | undefined {
  for (const game of games.values()) if (game.participants.has(userId)) return game;
  return undefined;
}

function removeGame(game: Game, why: string): void {
  games.delete(game.ref);
  broadcast(MSG.LOBBY_GAME_REMOVED, [{ int: game.ref }], `LobbyGameRemoved ${game.ref} (${why})`);
  console.log(`[${TAG}] game ${game.ref} removed: ${why}`);
}

/** Take a player out of whatever game they are in; the owner takes the game with them. */
function dropFromGames(userId: number, why: string): void {
  const game = gameOf(userId);
  if (!game) return;
  if (game.owner.userId === userId) {
    removeGame(game, why);
    return;
  }
  game.participants.delete(userId);
  broadcast(MSG.LOBBY_AVATAR_LEFT, [{ int: game.ref }, { int: userId }], `LobbyAvatarLeft ${userId} from ${game.ref}`);
}

// ---------------------------------------------------------------- entry points

/**
 * ROOM_START in the lobby, after CreateAvatars: from here on the player hears
 * every change, starting with the snapshot.
 */
export function hmLobbyEnter(player: HmPlayer): void {
  watchers.set(player.userId, player);
  player.send(MSG.LOBBY_GAME_DATA, snapshot(), `LobbyGameData ${TAG}: ${games.size} game(s)`);
}

/** Left the lobby room, or disconnected. */
export function hmLobbyLeave(userId: number): void {
  matchOf.get(userId)?.drop(userId);
  matchOf.delete(userId);
  if (watchers.delete(userId)) dropFromGames(userId, "left the lobby");
}

// ---------------------------------------------------------------- matches

const matchOf = new Map<number, HmGame>();

/**
 * The 580 `CHMGameComponent.PrepareRoom` sends after `2613`. Returns the
 * occupancy bucket the player now belongs in, or null if it was the lobby's
 * own ROOM_START.
 */
export function hmRoomStart(userId: number): string | null {
  const match = matchOf.get(userId);
  if (!match?.roomStarted(userId)) return null;
  watchers.delete(userId); // no lobby traffic into the game scene
  return match.bucket;
}

export function hmStageLoaded(userId: number): void {
  matchOf.get(userId)?.stageLoaded(userId);
}

export function hmAction(userId: number, count: number, action: number, data: number[]): void {
  matchOf.get(userId)?.action(userId, count, action, data);
}

export function hmInMatch(userId: number): boolean {
  return matchOf.get(userId)?.has(userId) ?? false;
}

/**
 * A lobby command (640-651) from a player in room 1104. Returns false for
 * commands that are not the lobby's, so the caller can fall through.
 */
export function hmLobbyCommand(player: HmPlayer, command: number, body: string): boolean {
  if (command < 640 || command > 651 || command === 649) return false;
  let at = 0;
  const int = (): number => {
    if (at >= body.length) return 0;
    const { value, next } = decodeToInt(body, at);
    at = next;
    return value;
  };
  const pairs = (): Map<string, string> => {
    const out = new Map<string, string>();
    const n = int();
    for (let i = 0; i < n && at < body.length; i++) {
      const key = readClientString(body, at);
      const value = readClientString(body, key.next);
      at = value.next;
      out.set(key.value, value.value);
    }
    return out;
  };
  const me = player.userId;
  const tag = `[${player.label}] ${TAG}`;

  switch (command) {
    case 642: // never sent by this client; answered anyway
    case 643:
    case 651:
      watchers.set(me, player);
      player.send(MSG.LOBBY_GAME_DATA, snapshot(), `LobbyGameData ${TAG}: ${games.size} game(s)`);
      return true;

    case 640: {
      pairs(); // {l: "0"}
      dropFromGames(me, "created another game");
      if (games.size >= MAX_GAMES) {
        player.send(MSG.LOBBY_CREATE_FAILED, [{ int: CREATE_FULL }], "LobbyCreateFailed 1 (full)");
        return true;
      }
      const game: Game = { ref: nextGameRef++, owner: player, participants: new Map([[me, { ref: me, team: 1 }]]) };
      if (TEST_OPPONENT) game.participants.set(-1, { ref: -1, team: 2 });
      games.set(game.ref, game);
      console.log(`${tag}: created game ${game.ref}${TEST_OPPONENT ? " (+test opponent)" : ""}`);
      broadcast(MSG.LOBBY_GAME_DATA, [{ int: 1 }, ...gameRecord(game)], `LobbyGameData new game ${game.ref}`);
      return true;
    }

    case 641: {
      const game = games.get(int());
      if (game && game.owner.userId === me) removeGame(game, "owner cancelled");
      return true;
    }

    case 645: {
      const game = games.get(int());
      const team = int();
      pairs();
      if (!game || (team !== 1 && team !== 2)) return true;
      const current = game.participants.get(me);
      if (current?.team === team) return true;
      if (teamCount(game, team) >= TEAM_SIZE) {
        // The client hides a full team's JOIN, so this is a race: resync.
        player.send(MSG.LOBBY_GAME_DATA, snapshot(), "LobbyGameData (team full, resync)");
        return true;
      }
      if (current && game.owner.userId === me) return true; // the owner stays on team 1
      dropFromGames(me, "joined another game");
      const p: HmParticipant = { ref: me, team };
      game.participants.set(me, p);
      console.log(`${tag}: joined game ${game.ref} on team ${team}`);
      broadcast(
        MSG.LOBBY_GAME_JOINED,
        [{ int: game.ref }, { int: me }, { int: team }, ...kv({})],
        `LobbyGameJoined game ${game.ref} ref ${me} team ${team}`,
      );
      return true;
    }

    case 646: {
      const game = games.get(int());
      if (game?.participants.has(me)) dropFromGames(me, "left the game");
      return true;
    }

    case 647: {
      const game = games.get(int());
      const target = int();
      if (!game || game.owner.userId !== me || target === me || !game.participants.has(target)) return true;
      game.participants.delete(target);
      console.log(`${tag}: kicked ${target} from game ${game.ref}`);
      broadcast(MSG.LOBBY_AVATAR_KICKED, [{ int: game.ref }, { int: target }], `LobbyAvatarKicked ${target} from ${game.ref}`);
      return true;
    }

    case 648: {
      const game = games.get(int());
      if (!game || game.owner.userId !== me) return true;
      if (teamCount(game, 1) === 0 || teamCount(game, 2) === 0) return true; // the client gates this
      console.log(`${tag}: START game ${game.ref} — ${game.participants.size} participant(s)`);
      games.delete(game.ref);
      broadcast(MSG.LOBBY_GAME_REMOVED, [{ int: game.ref }], `LobbyGameRemoved ${game.ref} (started)`);
      const onOver = (m: HmGame) => {
        for (const [userId, mm] of matchOf) if (mm === m) matchOf.delete(userId);
      };
      const match = createMatch(game.ref, [...game.participants.values()], watchers, onOver);
      for (const p of game.participants.values()) if (p.ref > 0) matchOf.set(p.ref, match);
      match.prepare();
      return true;
    }
  }
  return true;
}

// ---------------------------------------------------------------- hall of fame

db.exec(`
  CREATE TABLE IF NOT EXISTS hm_wins (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    won_at  INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS hm_wins_at ON hm_wins (won_at);
`);

export function recordHmWin(userId: number): number {
  db.prepare("INSERT INTO hm_wins (user_id, won_at) VALUES (?, ?)").run(userId, Date.now());
  return (db.prepare("SELECT COUNT(*) AS n FROM hm_wins WHERE user_id = ?").get(userId) as { n: number }).n;
}

/** `661 [5, indexType]` → `2662`: wins today (0), in the last 7 days (1), ever (2). */
export function hmHighScores(indexType: number, limit = 15): OutgoingParam[] {
  const since =
    indexType === 2
      ? 0
      : indexType === 1
        ? Date.now() - 7 * 24 * 3600 * 1000
        : new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  const rows = db
    .prepare(
      `SELECT COUNT(*) AS score, COALESCE(u.character_name, u.username) AS name
         FROM hm_wins w JOIN users u ON u.id = w.user_id
        WHERE w.won_at >= ?
        GROUP BY w.user_id ORDER BY score DESC, MIN(w.won_at) ASC LIMIT ?`,
    )
    .all(since, limit) as { score: number; name: string }[];
  return [
    { int: HM_GAME_CODE },
    { int: indexType },
    { int: rows.length },
    ...rows.flatMap((r, i) => [{ int: i + 1 }, { int: r.score }, { str: wireText(r.name) }]),
  ];
}
