/**
 * Pirates of the Caribbean — the server half's LOBBIES. A started game is a
 * match: `PotcMatch` (pirates-match.ts, simulated by pirates-engine.ts) for
 * the 2006 game, `PotcClassicMatch` (pirates-classic-match.ts) for the 2005 one.
 *
 * Two lobbies, one per room, never sharing games:
 *   - 1001 `pirates_game_preshow` — POTC2 (2006): Ship Battle and Capture the
 *     Flag, ships, AI, a price, level locks.
 *   - 1010 `pirates_classic_preshow` — POTC1 (2005), the Classics Lobby: one
 *     game type, no ships, no AI, no price (its lobby has none of those).
 *
 * Both talk the shared `minigame_lobby/CLobbyHandler` protocol (640-651 in,
 * 2640-2652 out). Pirates games are player-hosted:
 *
 *   - 2006: `651` on `room_ready` asks for the game conditions. `c` (the
 *     price) must be present or NEW GAME stays disabled; 0 means "no price
 *     dialog". The client never asks for the game list, so the snapshot
 *     `2642` goes out here too, and every change is pushed.
 *     2005: no `651` — `InitService` queries the list (`642`/`643`).
 *   - `640 {l, m, c}` creates a game (2005: `{l}` only): level 1-3, mode 1 CTF
 *     / 2 LMS ("SHIP BATTLE"). The creator owns it and is on team 1.
 *   - `645 ref, team, {c}` joins, `646` leaves, `641` removes (owner),
 *     `647` kicks (owner), `648` starts (owner).
 *   - 2006 only: `650 ref, avatar, {t}` picks a ship (1 Pearl, 2 Dutchman,
 *     3 Wicked); `{team: "switch"}` swaps sides. `644 ref, {a: slot, t: ship}`
 *     adds an AI ship, LMS only (the client only offers it there; see
 *     CTF_TEST_AI for solo CTF testing): slots 1-4 are team 1, 5-8 team 2. AI
 *     participants carry NEGATIVE refs — the client names them "AI Player <ref>".
 *
 * ⚠ EVERY PARTICIPANT NEEDS `t` (2006). `CreateGameDisplay` and the prestart
 * window look the ship's button art up by it, and a missing `t` dereferences VOID.
 *
 * ⚠ THE SNAPSHOT MUST FOLLOW THE AVATARS. `CreateGameDisplay` reads the own
 * avatar's NAME from the room; a `2642` that lands before `CreateAvatars`
 * throws there. `651` is sent from `initRoom` on `room_ready`, which is late
 * enough — that is why the snapshot rides on it rather than on ROOM_START.
 *
 * The 2006 client enforces START's rule itself (`m_bCheckEqualPlayers`): at
 * least 4 participants and equal teams. The server re-checks equal teams (code
 * 205, Disney's own `lobby.error.start.205`).
 *
 * Failure codes are Disney's (`lobby.error.*` in external_texts): create 1
 * (full), 202/203 (level locked), 204 (credits); join 202/203/204; start 205.
 * Level 2 needs 10 level-1 wins; level 3 needs 10 level-2 wins and then a
 * visit to Captain Blackheart (npcs.ts) — `potc_progress` in db.ts. 2006 only.
 */
import { getPotcProgress } from "./db.js";
import { PotcClassicMatch } from "./pirates-classic-match.js";
import { PotcMatch } from "./pirates-match.js";
import { decodeToInt, MSG, readClientString, type OutgoingParam } from "./vmk-protocol.js";

export const POTC_LOBBY_ROOM = 1001;
export const POTC_CLASSIC_LOBBY_ROOM = 1010;
export const isPotcLobby = (room: number | undefined): boolean =>
  room === POTC_LOBBY_ROOM || room === POTC_CLASSIC_LOBBY_ROOM;

/**
 * `c`: the price to play, in credits — 21 (wiki). Charged when the game
 * starts and never refunded: "If you leave the game before it ends ... you'll
 * also lose the price you paid" (pirates.instructions.text.page.8).
 * VMK_POTC_COST overrides it (0 skips the client's price dialog). 2006 only.
 */
const COST = Math.max(0, Number(process.env.VMK_POTC_COST ?? 21) || 0);
/**
 * VMK_POTC_CTF_TEST_AI=1: a new Capture the Flag game comes with three AI
 * ships (2 v 2), so one tester can start it. VMK_POTC_CLASSIC_TEST_AI=1 does
 * the same for a classic (2005) game. Off for real play.
 */
const CTF_TEST_AI = process.env.VMK_POTC_CTF_TEST_AI === "1";
const CLASSIC_TEST_AI = process.env.VMK_POTC_CLASSIC_TEST_AI === "1";
const MAX_GAMES = 8;
const TEAM_SIZE = 4;
const SHIPS = new Set([1, 2, 3]);
const DEFAULT_SHIP = 1;
const AI_DEFAULT_SHIP = 2;
/** The 2005 game has one kind of ship and one game type (Ship Battle). */
const CLASSIC_MODE = 2;

const CREATE_FULL = 1;
const START_UNEQUAL_TEAMS = 205;
const LOCKED_LEVEL2 = 202;
const LOCKED_LEVEL3 = 203;
const CANNOT_PAY = 204;
/** "When you've won 10 level 1 games, you can start playing level 2 games." */
const LEVEL_UNLOCK_WINS = 10;

type Send = (msg: number, params: OutgoingParam[], log?: string) => void;

export interface PotcPlayer {
  userId: number;
  name: string;
  send: Send;
  label: string;
  /** A server alert (`2240`), as the blocked-room refusal uses. */
  alert: (text: string) => void;
  /** Pay out credits and tell the player why (a staff message). */
  pay: (credits: number, message: string) => void;
  /** The player's credit balance now. */
  credits: () => number;
  /** Take the price of a game; false (and nothing taken) if they cannot pay. */
  charge: (credits: number) => boolean;
  /** Put a pin in the player's inventory. */
  givePin: (code: number) => void;
  /** Reload the lobby the match came from — the way out of a match. */
  toLobby: () => void;
}

export interface Participant {
  /** The avatar ref (user id), or negative for an AI ship. */
  ref: number;
  team: 1 | 2;
  ship: number;
}

/** What the lobby needs from a running match, of either year. */
export interface PotcGame {
  readonly bucket: string;
  prepare(): void;
  has(userId: number): boolean;
  roomStarted(userId: number): boolean;
  stageLoaded(userId: number): void;
  action(userId: number, action: number, data: number[]): void;
  drop(userId: number): void;
}

interface Game {
  ref: number;
  owner: PotcPlayer;
  level: number;
  mode: number;
  /** Insertion order is display order: the client lists by arrival per team. */
  participants: Map<number, Participant>;
  nextAiRef: number;
}

interface Lobby {
  room: number;
  /** The 2005 game (room 1010). */
  classic: boolean;
  tag: string;
  watchers: Map<number, PotcPlayer>;
  games: Map<number, Game>;
}

const LOBBIES = new Map<number, Lobby>(
  [
    [POTC_LOBBY_ROOM, false],
    [POTC_CLASSIC_LOBBY_ROOM, true],
  ].map(([room, classic]) => [
    room as number,
    { room: room as number, classic: classic as boolean, tag: classic ? "pirates-classic" : "pirates", watchers: new Map(), games: new Map() },
  ]),
);
/** Game refs are unique across both lobbies (they name the match bucket). */
let nextGameRef = 1;

// ---------------------------------------------------------------- encoding

function kv(pairs: Record<string, string | number>): OutgoingParam[] {
  const entries = Object.entries(pairs);
  return [{ int: entries.length }, ...entries.flatMap(([k, v]) => [{ str: k }, { str: String(v) }])];
}

function participantData(p: Participant): Record<string, string | number> {
  return { t: p.ship };
}

function gameRecord(lobby: Lobby, game: Game): OutgoingParam[] {
  const out: OutgoingParam[] = [
    { int: game.ref },
    { str: game.owner.name },
    { int: game.owner.userId },
    { int: 0 },
    { int: game.participants.size },
  ];
  for (const p of game.participants.values()) {
    out.push({ int: p.ref }, { int: p.team }, ...kv(participantData(p)));
  }
  out.push(...kv(lobby.classic ? { l: game.level } : { l: game.level, m: game.mode, c: COST }));
  return out;
}

function snapshot(lobby: Lobby): OutgoingParam[] {
  return [{ int: lobby.games.size }, ...[...lobby.games.values()].flatMap((g) => gameRecord(lobby, g))];
}

function broadcast(lobby: Lobby, msg: number, params: OutgoingParam[], log: string): void {
  for (const w of lobby.watchers.values()) w.send(msg, params, log);
}

// ---------------------------------------------------------------- state helpers

function teamCount(game: Game, team: 1 | 2): number {
  let n = 0;
  for (const p of game.participants.values()) if (p.team === team) n++;
  return n;
}

function gameOf(lobby: Lobby, userId: number): Game | undefined {
  for (const game of lobby.games.values()) if (game.participants.has(userId)) return game;
  return undefined;
}

function removeGame(lobby: Lobby, game: Game, why: string): void {
  lobby.games.delete(game.ref);
  broadcast(lobby, MSG.LOBBY_GAME_REMOVED, [{ int: game.ref }], `LobbyGameRemoved ${game.ref} (${why})`);
  console.log(`[${lobby.tag}] game ${game.ref} removed: ${why}`);
}

/** Take a player out of whatever game they are in; the owner takes the game with them. */
function dropFromGames(lobby: Lobby, userId: number, why: string): void {
  const game = gameOf(lobby, userId);
  if (!game) return;
  if (game.owner.userId === userId) {
    removeGame(lobby, game, why);
    return;
  }
  game.participants.delete(userId);
  broadcast(lobby, MSG.LOBBY_AVATAR_LEFT, [{ int: game.ref }, { int: userId }], `LobbyAvatarLeft ${userId} from ${game.ref}`);
}

/**
 * Why `player` may not create or join a `level` game, as Disney's
 * `lobby.error.create.*` / `lobby.error.join.*` codes: 202 level 2 locked,
 * 203 level 3 locked, 204 cannot pay. 0 = allowed. The 2005 lobby had neither.
 */
function refusal(lobby: Lobby, player: PotcPlayer, level: number): number {
  if (lobby.classic) return 0;
  const progress = getPotcProgress(player.userId);
  if (level >= 2 && progress.wins[0] < LEVEL_UNLOCK_WINS) return LOCKED_LEVEL2;
  if (level >= 3 && !progress.level3) return LOCKED_LEVEL3;
  if (player.credits() < COST) return CANNOT_PAY;
  return 0;
}

function pushParticipant(lobby: Lobby, game: Game, p: Participant, msg: number, name: string): void {
  broadcast(
    lobby,
    msg,
    [{ int: game.ref }, { int: p.ref }, { int: p.team }, ...kv(participantData(p))],
    `${name} game ${game.ref} ref ${p.ref} team ${p.team} ship ${p.ship}`,
  );
}

// ---------------------------------------------------------------- entry points

/** ROOM_START in a Pirates lobby: from here on the player hears every change. */
export function potcLobbyEnter(room: number, player: PotcPlayer): void {
  LOBBIES.get(room)?.watchers.set(player.userId, player);
}

/** Left a lobby room, or disconnected. */
export function potcLobbyLeave(userId: number): void {
  matchOf.get(userId)?.drop(userId);
  matchOf.delete(userId);
  for (const lobby of LOBBIES.values()) {
    if (lobby.watchers.delete(userId)) dropFromGames(lobby, userId, "left the lobby");
  }
}

// ---------------------------------------------------------------- matches

const matchOf = new Map<number, PotcGame>();

/**
 * The 580 `PrepareRoom` sends after `2613`. Returns the occupancy bucket the
 * player now belongs in (the caller moves them there), or null if it was the
 * lobby's own ROOM_START.
 */
export function potcRoomStart(userId: number): string | null {
  const match = matchOf.get(userId);
  if (!match?.roomStarted(userId)) return null;
  for (const lobby of LOBBIES.values()) lobby.watchers.delete(userId); // no lobby traffic into the game scene
  return match.bucket;
}

export function potcStageLoaded(userId: number): void {
  matchOf.get(userId)?.stageLoaded(userId);
}

/** `601 [count, action, data...]` from a player in a match. */
export function potcAction(userId: number, action: number, data: number[]): void {
  matchOf.get(userId)?.action(userId, action, data);
}

export function potcInMatch(userId: number): boolean {
  return matchOf.get(userId)?.has(userId) ?? false;
}

/**
 * A lobby command (640-651) from a player standing in a Pirates lobby room.
 * Returns false for commands that are not the lobby's, so the caller can fall through.
 */
export function potcLobbyCommand(room: number, player: PotcPlayer, command: number, body: string): boolean {
  if (command < 640 || command > 651 || command === 649) return false;
  const lobby = LOBBIES.get(room);
  if (!lobby) return false;
  const { games, watchers } = lobby;
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
  const tag = `[${player.label}] ${lobby.tag}`;

  switch (command) {
    case 651: {
      // request_game_conditions — and, since nothing else asks, the game list.
      watchers.set(me, player);
      player.send(MSG.LOBBY_GAME_CONDITIONS, kv({ c: lobby.classic ? 0 : COST }), `LobbyGameConditions`);
      player.send(MSG.LOBBY_GAME_DATA, snapshot(lobby), `LobbyGameData ${lobby.tag}: ${games.size} game(s)`);
      return true;
    }
    case 642: // list_games — the 2005 lobby's `InitService` asks with these.
    case 643: // get_game_data
      watchers.set(me, player);
      player.send(MSG.LOBBY_GAME_DATA, snapshot(lobby), `LobbyGameData ${lobby.tag}: ${games.size} game(s)`);
      return true;

    case 640: {
      const data = pairs();
      const level = Number(data.get("l"));
      // The 2005 lobby sends only the level: it has one game type.
      const mode = lobby.classic ? CLASSIC_MODE : Number(data.get("m"));
      if (![1, 2, 3].includes(level) || ![1, 2].includes(mode)) {
        console.warn(`${tag}: create with bad level/mode`, Object.fromEntries(data));
        return true;
      }
      dropFromGames(lobby, me, "created another game");
      if (games.size >= MAX_GAMES) {
        player.send(MSG.LOBBY_CREATE_FAILED, [{ int: CREATE_FULL }], "LobbyCreateFailed 1 (full)");
        return true;
      }
      const refused = refusal(lobby, player, level);
      if (refused) {
        player.send(MSG.LOBBY_CREATE_FAILED, [{ int: refused }], `LobbyCreateFailed ${refused}`);
        return true;
      }
      const game: Game = {
        ref: nextGameRef++,
        owner: player,
        level,
        mode,
        participants: new Map([[me, { ref: me, team: 1, ship: DEFAULT_SHIP }]]),
        nextAiRef: -1,
      };
      if ((lobby.classic && CLASSIC_TEST_AI) || (!lobby.classic && mode === 1 && CTF_TEST_AI)) {
        // Test only: Disney's lobbies offer no AI here and will not start
        // without real opponents, so a solo test game is impossible.
        for (const team of [1, 2, 2] as const) {
          const ai: Participant = { ref: game.nextAiRef--, team, ship: AI_DEFAULT_SHIP };
          game.participants.set(ai.ref, ai);
        }
      }
      games.set(game.ref, game);
      console.log(`${tag}: created game ${game.ref} (level ${level}, ${lobby.classic ? "classic" : mode === 1 ? "CTF" : "LMS"})`);
      broadcast(lobby, MSG.LOBBY_GAME_DATA, [{ int: 1 }, ...gameRecord(lobby, game)], `LobbyGameData new game ${game.ref}`);
      return true;
    }

    case 641: {
      const game = games.get(int());
      if (game && game.owner.userId === me) removeGame(lobby, game, "owner cancelled");
      return true;
    }

    case 645: {
      const game = games.get(int());
      const team = int();
      pairs(); // {c}: the price the client agreed to; COST is ours.
      if (!game || (team !== 1 && team !== 2)) return true;
      if (game.participants.has(me) && game.participants.get(me)!.team === team) return true;
      if (teamCount(game, team) >= TEAM_SIZE) {
        // No Disney text for "team full"; the client hides a full team's JOIN,
        // so this is a race — resync rather than invent an error.
        player.send(MSG.LOBBY_GAME_DATA, snapshot(lobby), "LobbyGameData (team full, resync)");
        return true;
      }
      const refused = refusal(lobby, player, game.level);
      if (refused) {
        player.send(MSG.LOBBY_JOIN_FAILED, [{ int: refused }], `LobbyJoinFailed ${refused}`);
        return true;
      }
      dropFromGames(lobby, me, "joined another game");
      const p: Participant = { ref: me, team, ship: DEFAULT_SHIP };
      game.participants.set(me, p);
      console.log(`${tag}: joined game ${game.ref} on team ${team}`);
      pushParticipant(lobby, game, p, MSG.LOBBY_GAME_JOINED, "LobbyGameJoined");
      return true;
    }

    case 646: {
      const game = games.get(int());
      if (game?.participants.has(me)) dropFromGames(lobby, me, "left the game");
      return true;
    }

    case 647: {
      const game = games.get(int());
      const target = int();
      if (!game || game.owner.userId !== me || target === me || !game.participants.has(target)) return true;
      game.participants.delete(target);
      console.log(`${tag}: kicked ${target} from game ${game.ref}`);
      broadcast(lobby, MSG.LOBBY_AVATAR_KICKED, [{ int: game.ref }, { int: target }], `LobbyAvatarKicked ${target} from ${game.ref}`);
      return true;
    }

    case 644: {
      const game = games.get(int());
      const data = pairs();
      if (lobby.classic || !game || game.owner.userId !== me || game.mode !== 2) return true;
      const slot = Number(data.get("a"));
      const ship = Number(data.get("t"));
      const team: 1 | 2 = slot >= 5 ? 2 : 1;
      if (!(slot >= 1 && slot <= 8) || teamCount(game, team) >= TEAM_SIZE) return true;
      const p: Participant = { ref: game.nextAiRef--, team, ship: SHIPS.has(ship) ? ship : AI_DEFAULT_SHIP };
      game.participants.set(p.ref, p);
      console.log(`${tag}: AI ship ${p.ref} added to game ${game.ref} on team ${team}`);
      pushParticipant(lobby, game, p, MSG.LOBBY_GAME_JOINED, "LobbyGameJoined (AI)");
      return true;
    }

    case 650: {
      const game = games.get(int());
      const avatar = int();
      const data = pairs();
      const p = game?.participants.get(avatar);
      if (lobby.classic || !game || !p || avatar !== me) return true;
      const ship = Number(data.get("t"));
      if (SHIPS.has(ship)) p.ship = ship;
      if (data.get("team") === "switch") {
        const other: 1 | 2 = p.team === 1 ? 2 : 1;
        if (teamCount(game, other) < TEAM_SIZE) p.team = other;
      }
      pushParticipant(lobby, game, p, MSG.LOBBY_SET_PARTICIPANT_DATA, "LobbySetParticipantData");
      return true;
    }

    case 648: {
      const game = games.get(int());
      if (!game || game.owner.userId !== me) return true;
      if (teamCount(game, 1) !== teamCount(game, 2)) {
        player.send(MSG.LOBBY_START_FAILED, [{ int: START_UNEQUAL_TEAMS }], "LobbyStartFailed 205 (unequal teams)");
        return true;
      }
      if (lobby.classic && !PotcClassicMatch.ready) {
        // Until the 2005 match is served: say so and LEAVE the game in the
        // lobby — removing it strands the prestart window (its START/CANCEL
        // then talk about a game the server no longer has).
        player.alert("Classic Pirates games are not ready yet. Stay tuned!");
        return true;
      }
      const cost = lobby.classic ? 0 : COST;
      // Everyone pays at the start. Someone who has spent their credits since
      // joining is taken out (their own 204), which leaves the teams unequal:
      // the owner sees 205 and can wait for a replacement.
      const humans = [...game.participants.values()].filter((p) => p.ref > 0);
      const broke = humans.filter((p) => (watchers.get(p.ref)?.credits() ?? 0) < cost);
      if (broke.length) {
        for (const p of broke) {
          watchers.get(p.ref)?.send(MSG.LOBBY_JOIN_FAILED, [{ int: CANNOT_PAY }], "LobbyJoinFailed 204 (cannot pay at start)");
          if (p.ref === game.owner.userId) {
            removeGame(lobby, game, "owner cannot pay");
            return true;
          }
          game.participants.delete(p.ref);
          broadcast(lobby, MSG.LOBBY_AVATAR_LEFT, [{ int: game.ref }, { int: p.ref }], `LobbyAvatarLeft ${p.ref} (cannot pay)`);
        }
        player.send(MSG.LOBBY_START_FAILED, [{ int: START_UNEQUAL_TEAMS }], "LobbyStartFailed 205 (a player could not pay)");
        return true;
      }
      if (cost > 0) for (const p of humans) watchers.get(p.ref)?.charge(cost);
      console.log(`${tag}: START game ${game.ref} — ${game.participants.size} participant(s), ${cost} credits each`);
      games.delete(game.ref);
      broadcast(lobby, MSG.LOBBY_GAME_REMOVED, [{ int: game.ref }], `LobbyGameRemoved ${game.ref} (started)`);
      const onOver = (m: PotcGame) => {
        for (const [userId, mm] of matchOf) if (mm === m) matchOf.delete(userId);
      };
      const participants = [...game.participants.values()];
      const match: PotcGame = lobby.classic
        ? new PotcClassicMatch(game.ref, game.level, participants, watchers, onOver)
        : new PotcMatch(game.ref, game.level, game.mode, participants, watchers, onOver);
      for (const p of game.participants.values()) if (p.ref > 0) matchOf.set(p.ref, match);
      match.prepare();
      return true;
    }
  }
  return true;
}
