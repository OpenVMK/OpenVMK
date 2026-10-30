/**
 * Minimal OpenVMK-style game server for LibreShockwave VMK client development.
 *
 * Listens on port 8080 for:
 *   HTTP  GET /GetSec/{uuid}/{userId}     — security blob (binary)
 *   HTTP  GET /GetStats/                  — JSON stats stub
 *   HTTP  GET /{secureUuid}/GetUser/{id}/ — JSON user stub (admin API)
 *   HTTP  POST /dev/register              — dev: bind ticket to userId
 *   TCP   VMK handshake (message 2001 connectionReady, carrying a DH public key)
 *   WS    WebSocket binary bridge (browser WASM socket Xtra → same TCP logic)
 *
 * Reference: VMKShockwave/siteref (client.php, loading.php, includes/api.php)
 */
import net, { type Socket, type Server } from "node:net";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, isAbsolute, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { coveredTiles, directionsFor, fitsAt, isFurniture, isPairedTeleporter, previewable, statesFor, type FurniBlock } from "./furni-footprint.js";
import {
  animationNameOf,
  playDurationMs,
  nextStateOf,
  resultStatesOf,
  rollDurationMs,
  rollStateOf,
  statesOf,
} from "./item-animations.js";
import {
  catalog,
  pageById,
  searchItemNames,
  ITEM_CLOTHING,
  ITEM_POSTER,
  ITEM_PIN,
  VMK_CENTRAL_SHOP,
  CAMERA_PAGE_ID,
  CAMERA_PRODUCTS,
} from "./catalog.js";
import { buildGetSecCast, secretsFromTicket } from "./getsec-cast.js";
import {
  characterNameTaken,
  claimTicket,
  setCharacter,
  savePendingCharacter,
  completeCharacter,
  getOutfit,
  createGuestRoom,
  getRoomsOwnedBy,
  getFriendsRooms,
  getAllGuestRooms,
  getFeaturedGuestRooms,
  setGuestRoomFeatured,
  addGuestRoom,
  getMessengerUser,
  getMessengerUserByName,
  updateGuestRoom,
  grantItems,
  getOwnedItems,
  setPinWorn,
  getWornPins,
  setItemLevel,
  addItems,
  peekOwnedItem,
  takeOwnedItem,
  clearRoomItems,
  setRoomItemState,
  getRoomItemConfig,
  setRoomItemConfig,
  ITEM_CATEGORY,
  setGuestRoomEntryState,
  hasValidTicket,
  useTicket,
  createTickets,
  getTickets,
  getTicket,
  deleteTicket,
  areFriends,
  ENTRY_STATE,
  deleteGuestRoom,
  getGuestRoom,
  getUserById,
  getRoomItems,
  getRoomItem,
  placeRoomItem,
  moveRoomItem,
  removeRoomItem,
  getRoomPosters,
  getRoomPoster,
  placeRoomPoster,
  moveRoomPoster,
  setRoomItemGuestMove,
  getCamera,
  grantCamera,
  getPhotos,
  countPhotos,
  getPhoto,
  movePhoto,
  deletePhoto,
  setPhotoCaption,
  getPhotoOnWall,
  type RoomPoster,
  getPlacedPartner,
  grantItemPair,
  addPairedItem,
  type ItemPair,
  type RoomItem,
  getSettings,
  setSettings,
  DEFAULT_SETTINGS,
  getBadges,
  setBadges,
  getSlogan,
  setSlogan,
  setCredits,
  BADGE_CODES,
  MAX_BADGES,
  PERMISSIONS,
  permissionIndex,
  type Permission,
  type GuestRoom,
  getOwnedItem,
  getInventoryPartner,
  transferItem,
  renameCharacter,
} from "./db.js";
import { loadAvatarCatalogue, type AvatarCatalogue } from "./avatar-sets.js";
import {
  CMD,
  MSG,
  NO_ENCRYPTION_KEY,
  type NavigatorNode,
  decodeToInt,
  decodeString,
  navigationNodeInfoParams,
  type OutgoingParam,
  VmkRc4,
  createDiffieHellman,
  decodeClientMessage,
  encodeServerMessage,
  readClientString,
  avatarActions,
  MAGIC_TELEPORT_IN,
  MAGIC_TELEPORT_OUT,
  LEGS_STAND,
  LEGS_WALK,
  LEGS_DANCE,
  HAND_STAND,
  HAND_WALK,
  HAND_DANCE,
  HAND_WAVE,
  HAND_DRINK,
  HAND_CARRY_CUP,
  MOUTH_CLOSED,
  MOUTH_TALKING,
  wireText,
} from "./vmk-protocol.js";
import {
  directionBetween, exitIdAt, exitTilesWithIds, findPath, insideOf, freeTileNear, isExitTile, spawnTileFor, tileName,
  tileNamed, tileToward, floorNameOf, tilesApart, roomTiles, tilesOnFloor,
} from "./room-geometry.js";
import { Ghost } from "./ghosts.js";
import { GatorWaiter, SEAT } from "./gator-waiter.js";
import { seasonalLayout, seasonalTileMap, useSeasonalLayout } from "./room-geometry.js";
import { doorBackTo, exitAt, exitTilesTo, remapRoomTiles, type ExitRule } from "./room-exits.js";
import { seedPublicFurni } from "./public-furni.js";
import {
  FW_LOBBY_ROOM,
  fwAction,
  fwLobbyEnter,
  fwLobbyLeave,
  fwRoomStart,
  fwSetReady,
  fwStageLoaded,
  type FwPlayer,
} from "./fireworks.js";
import {
  POTC_LOBBY_ROOM, isPotcLobby, potcAction, potcLobbyCommand, potcLobbyEnter, potcLobbyLeave, potcRoomStart, potcStageLoaded,
  type PotcPlayer,
} from "./pirates.js";
import {
  HM_LOBBY_ROOM, hmAction, hmHighScores, hmLobbyCommand, hmLobbyEnter, hmLobbyLeave, hmRoomStart, hmStageLoaded,
  type HmPlayer,
} from "./haunted-mansion.js";
import { deHoliday, seasonCastKey, seasonFromEnv, seasonalCasts } from "./seasons.js";
import { ARCHIVE, OVERLAY, castExtracted, downloadFile } from "./paths.js";
import { clientIp, remoteLabel } from "./client-ip.js";
import { createPhotoSession, issuePhotoToken } from "./photo-server.js";
import { followTrack, isRideStart, isRideTrack, planRide, rideOnFromTeleporter, type RidePlan } from "./rides.js";
import {
  DARK_RIDE_COURTYARD,
  darkRideOfGate,
  darkRidePreloadRef,
  darkRideReturn,
  darkRideDoorIds,
  darkRideScene,
  darkRideSceneKey,
  darkRideScenes,
  isDarkRideScene,
  nextDarkRideScene,
  seedDarkRides,
  type DarkRide,
} from "./dark-rides.js";
import { PROXIMITY_ITEMS, PROXIMITY_KEYS, proximityConfig, proximityZone } from "./ride-triggers.js";
import {
  blockedByQueues, joinQueue, leaveQueue, managedTiles, nudgeQueues, queueAt, queuedIn, queuesIn, releaseSeats,
  setQueueGate, setStageHook, stepDown, MONORAIL_MIXER_STAGE, STREET_MIXER_STAGE, type QueueMember,
} from "./room-queues.js";
import {
  claimPlayReward, claimSaveReward, createSong, deleteSong, getSong, getSongs, mixerVariantOf,
  normaliseSongData, renameSong, saveSong, songSlots, SLOT_MS, type MixerReward, type MixerVariant,
} from "./music-mixer.js";
import {
  JC_GAME_CODE,
  JungleCruiseGame,
  claimJcReward,
  recordScore,
  todaysHighScores,
} from "./jungle-cruise.js";
import {
  configureEntryQueue,
  discardFastPass,
  leaveEntryQueue,
  requestEntry,
  roomFreed,
  takeFastPass,
} from "./room-entry-queue.js";
import { isSingleUsePin, magicOf, magicTiming, startingLevel } from "./magic-pins.js";
import { itemName } from "./catalog.js";
import { NPC_REF_BASE, npcByRef, npcsInRoom, visitNpc, type Npc } from "./npcs.js";
import {
  MESSENGER_COMMANDS,
  handleMessengerCommand,
  sendStaffMessage,
  messengerMoved,
  messengerRenamed,
  messengerOffline,
  messengerOnline,
  type MessengerPeer,
} from "./messenger.js";
import {
  IM_MAX_CHARS,
  cannedText,
  clampCanned,
  clampSlogan,
  decodeChat,
  reEmit,
  tokensToText,
  tokensToLog,
  tokensToPlainText,
  tokensToWords,
  type ChatToken,
} from "./chat-tokens.js";
import {
  activeSanction,
  bridgeSecret,
  createCall,
  endLogin,
  ipOf,
  logChat,
  logLogin,
  logTrade,
} from "./staff-db.js";

export const GETSEC_UUID = "e640c26f-9cec-4f0b-8b30-0675a9cf640a";

/**
 * Room codes, parsed from the SAME `external_variables_casts.txt` the client
 * loads. `_EnterRoom` resolves a room entirely from variables — the name from
 * `room.code.<N>` and the casts from `room.cast.<N>.1..N` — so the server's only
 * job is to name a code the client can already resolve. Advertising a code that
 * is absent produces "Room name not defined:" client-side and no room.
 *
 * There are 141 codes and 420 cast mappings in the current config, so the room
 * list is effectively handed to us; nothing needs inventing.
 */
const ROOM_CODES = new Map<number, string>();

/** `room.<N>.name` from the texts — what the load bar should actually say. */
const ROOM_NAMES = new Map<number, string>();

/**
 * Where a player lands when nothing better is known — the VMK Esplanade.
 *
 * ⚠ THIS IS THE END OF REGISTRATION. A new player is sent here the moment they
 * finish creating a character, so a wrong value does not look like a config
 * problem: it looks like registration dropping you in the wrong place.
 *
 * The default used to be 10 (`room.code.10=safari`), with 48 supplied only
 * through `VMK_LANDING_ROOM` on the command line. That meant anyone starting
 * the server the ordinary way — `npm start` — got the safari, and only a shell
 * with the right env var behaved correctly. The intended room belongs in the
 * code, not in one person's terminal history.
 */
const LANDING_ROOM_CODE = Number(process.env.VMK_LANDING_ROOM ?? 48);
/** Monorail Station and Train: never an exit's "back", or the station would loop to the train. */
const MONORAIL_ROOM_CODES = new Set([14, 15]);
/**
 * Which tile to stand a newly-arrived avatar on.
 *
 * ⚠ Tiles are defined by the ROOM, not by us — `_CreateFloors` (2580) is a stub
 * in the client, so we never send a floor. `_CreateAvatars` looks the index up
 * with `_AccessIndexed(tile, "tile")` and logs "Referred tile not found" if the
 * room has no such tile, leaving the avatar unplaced. Valid indices therefore
 * differ per room and are not yet known; this is a knob for finding one.
 * `-1` is the explicit "not in the room" value and hides the avatar.
 */
/**
 * Manual arrival-tile override, applied to EVERY room.
 *
 * Normally the tile comes from the room's own geometry (`spawnTileFor`), which
 * is per-room and therefore what you want. This exists only for poking at a
 * specific tile while testing; leave it unset in normal operation.
 */
const SPAWN_TILE_OVERRIDE =
  process.env.VMK_SPAWN_TILE === undefined ? null : Number(process.env.VMK_SPAWN_TILE);
/**
 * Milliseconds between walk steps.
 *
 * The client's lerp is `m_iStatusDelay` = 500 ms (`CRoomFactorAvatar`, assigned
 * once and never reassigned), and `WalkToTile` SNAPS to the previous target if a
 * pulse lands while `m_bWalking` is still set.
 *
 * ⚠ SO 500 EXACTLY IS A RACE, NOT A MATCH. `m_bWalking` is only cleared by the
 * render tick that first observes the lerp complete, i.e. some point in
 * [500, 500 + frame time]. A pulse sent at exactly 500 ms therefore arrives
 * before the flag clears about as often as after, and each time it does the
 * avatar snaps. The margin below puts the pulse reliably after the lerp has
 * finished; it costs an imperceptible pause per tile and removes the snap.
 */
const WALK_STEP_MS = Number(process.env.VMK_WALK_STEP_MS ?? 540);
/**
 * Which way a player faces on arrival, before they have walked anywhere.
 *
 * 4 is "toward the camera" — the pose with a full face rather than the back of
 * the head, which is what direction 0 would give. The room casts describe where
 * their doors are but not which way they open, so there is nothing better than a
 * sensible constant to derive this from.
 */
const SPAWN_FACING = 4;
/**
 * Capacity reported for a room instance.
 *
 * Nothing enforces it — the server has no queueing — but the navigator shows
 * "users / max", so a plausible number is better than 0 (which reads as closed)
 * or an enormous one.
 */
const ROOM_MAX_USERS = Number(process.env.VMK_ROOM_MAX_USERS ?? 50);
/** Credits paid back when a room is sold. Shown in the confirm dialog. */
const ROOM_REFUND = Number(process.env.VMK_ROOM_REFUND ?? 500);
/** Item categories in `2532`: 1 items, 2 clothes, 3 posters, 4 pins. */
const CLOTHES_CATEGORY = 2;

/**
 * Set ids out of a figure.
 *
 * A figure is `(setId, colour)` pairs, so the ids are the EVEN indices; `-1`
 * marks an empty slot (the bare head) rather than an item.
 */
function figureSetIds(figure: number[]): number[] {
  const sets: number[] = [];
  for (let i = 0; i < figure.length; i += 2) {
    const setId = figure[i];
    if (Number.isInteger(setId) && setId > 0) sets.push(setId);
  }
  return sets;
}
/**
 * Which part of the avatar a set id dresses.
 *
 * Transcribed from `CAvatarFactoryComponent.parseAvailableSets`, which buckets
 * ids into exactly these six names. Each part repeats across three bands —
 * 2xxxx male, 3xxxx female, 4xxxx shared/later — hence the modulo.
 */
type AvatarPart = "hr" | "ht" | "hd" | "ch" | "pn" | "sh";

function partOf(setId: number): AvatarPart | null {
  if (setId < 20000) return null;
  // Fold 2xxxx/3xxxx/4xxxx onto one 0..9999 axis; the part layout repeats.
  const offset = (setId - 20000) % 10000;
  if (offset < 1000) return "hr";
  if (offset < 2000) return "ht";
  if (offset < 4000) return "hd";
  if (offset < 6000) return "ch";
  if (offset < 8000) return "pn";
  return "sh";
}

/**
 * The parts you can actually OWN.
 *
 * ⚠ Hair (`hr`) and face (`hd`) are deliberately absent: they are your body,
 * not clothing. The proof is in the text files — Disney's own
 * `external_texts_181` has names for every `item.21000/24000/26000/28000` but
 * not one for the 20000 or 22000 bands, because those were never items. Listing
 * them in the inventory is what made the grid show raw `item.20000` keys, since
 * `getText` falls back to the key it cannot resolve.
 */
const GARMENT_PARTS = new Set<AvatarPart>(["ht", "ch", "pn", "sh"]);

/**
 * Staff chat commands. Type them with a `/` or `#` prefix — NOT `!`.
 *
 * ⚠ THE PREFIX IS WHAT MAKES THESE WORK, and `!` is the one that cannot.
 * `dict.separators` is ". ,!?:;)(]", so a `!` SPLITS the line and each word is
 * then dictionary-matched on its own — `! badges 6` arrives as
 * `<word:9338><word:9416> 6`, i.e. two opaque indices and a number, with the
 * command name lost. `/` and `#` are not separators, so `/badges` stays a
 * single word, matches nothing in the dictionary, and falls through to
 * `[#source: #ownName, #valid: 0]` — which is transmitted verbatim as
 * `int 0` + `str "/badges"`. The leading character is then stripped here.
 *
 * ⚠ Do NOT try to pick "safe" names by checking `dictionary_177`. That is the
 * BASE list; the client expands it through
 * `CAffixExpanderAndConditionEvaluator.ExpandListToList`, so derived forms get
 * their own indices. `badges` is absent from the base file and still resolved
 * to index 9416, because `badge` carries a plural flag. With a fusing prefix
 * the name no longer matters, which is why this list is free-form again.
 */
/**
 * Answer the shop catalogue at all?
 *
 * Default ON so the shop is testable without setting anything. It is small on
 * purpose — see the caps in catalog.ts — because replying to `15`/`16` with the
 * full catalogue crashed the client, and the way back is to grow the reply one
 * dimension at a time. `VMK_SHOP=off` restores the old inert-window behaviour if
 * a crash ever makes the client unplayable again.
 */
const SHOP_ENABLED = process.env.VMK_SHOP !== "off";

const STAFF_COMMANDS = new Set([
  "tradereset",
  "commands",
  "cmds",
  "help",
  "perms",
  "giveroom",
  "feature",
  "badges",
  "badge",
  "spawn",
  "find",
  "state",
  "give",
  "credits",
  "place",
  "tile",
  "goto",
  "warp",
  "changename",
  "sword",
]);

const isGarment = (setId: number): boolean => {
  const part = partOf(setId);
  return part !== null && GARMENT_PARTS.has(part);
};

/**
 * What the avatar builder is allowed to dress you in.
 *
 * `owned` is correct — you should only be offered clothing you have. `all`
 * offers the whole catalogue, which is what we shipped before ownership
 * existed, and is kept as an escape hatch for comparing behaviour.
 *   $env:VMK_WARDROBE = "all"
 *
 * Note for anyone bisecting a blank builder: it is probably NOT this. The
 * blank panel that showed up alongside this change was `2512` never being sent
 * outside registration — see the HAIR_LIST_FOR_HATS send in GET_FIGURE_LIST.
 */
const WARDROBE_MODE = process.env.VMK_WARDROBE === "all" ? "all" : "owned";

/** How long the face keeps moving after a message: a floor, plus per word. */
const TALK_BASE_MS = 1200;
const TALK_PER_TOKEN_MS = 180;
const TALK_MAX_MS = 8000;
/** Emote codes carried by START_ACTION / STOP_ACTION. */
const EMOTE_DANCE = 0;
const EMOTE_WAVE = 1;
/** A wave is one-shot: nothing reports its end, so the server times it out. */
const WAVE_MS = Number(process.env.VMK_WAVE_MS ?? 3000);
/** How long a cup from a water cooler lasts; nothing reports the end either. */
const DRINK_MS = Number(process.env.VMK_DRINK_MS ?? 9000);
/** One sip (`HAND_DRINK`), and the gap between sips spent holding the cup. */
const SIP_MS = Number(process.env.VMK_SIP_MS ?? 700);
const SIP_EVERY_MS = Number(process.env.VMK_SIP_EVERY_MS ?? 3000);
/** Double-clicking these hands you a cup and plays the drink (`HAND_DRINK`). */
const WATER_COOLERS = new Set([20]);
/** How long an emoticon stays above the avatar. */
const EMOTICON_MS = Number(process.env.VMK_EMOTICON_MS ?? 5000);
/**
 * Replace words the dictionary rejected with asterisks, as the original did.
 *
 * The client does NOT stop a player sending an unrecognised word — it only
 * highlights it, and forwards it as free text — so this is the only thing
 * standing between the chat bar and arbitrary text. Off is useful for testing
 * and for a private server among people who do not want safe-chat; on is the
 * faithful behaviour and the safe default.
 *
 *   VMK_CHAT_CENSOR=off   let unrecognised words through verbatim
 */
const CHAT_CENSOR = process.env.VMK_CHAT_CENSOR !== "off";
/**
 * Diagnostic: stand still and rotate through directions 0..7, one every few
 * seconds, logging each as it is sent (`VMK_FACING_DEMO=1`).
 *
 * The client cannot tell us which index means which screen direction — the art
 * for 5..7 is just 3..1 mirrored, so both readings of the table are internally
 * consistent and no amount of reading the Lingo distinguishes them. Watching
 * the avatar turn while the log says which index is in flight settles it in one
 * pass instead of guessing and re-testing.
 */
const FACING_DEMO = process.env.VMK_FACING_DEMO === "1";
const FACING_DEMO_MS = Number(process.env.VMK_FACING_DEMO_MS ?? 2500);

/**
 * Guest-room styles offered on registration step 1 (message 2509).
 *
 * These four are not a guess. `CRegPage1.ChangeRoomSelection` needs
 * `reg.roomstyle.<id>` art and `ROOM.<id>.NAME` text for each id, and the
 * registration cast (`fb72f4a9d3…`) holds exactly four such bitmaps —
 * `reg.roomstyle.17/53/54/67`. All four have matching names in external_texts:
 *
 *   17 Tomorrowland Outerspace   53 Mad Hatter's Tea Party
 *   54 Maleficent's Evil Fortress  67 Splash Mountain Bayou
 *
 * Three of those are the same rooms the older `reg.roomstyle1/2/3.hd` strings
 * name, which is what corroborates the mapping.
 *
 * This list is self-diagnosing: for an id whose art is missing, VMK's own Lingo
 * puts `Missing : reg.roomstyle.<id>` in the log. That is how these were found.
 */
const GUEST_ROOM_STYLES = (process.env.VMK_GUEST_ROOM_STYLES ?? "17,53,54,67")
  .split(",")
  .map((id) => Number(id.trim()))
  .filter((id) => Number.isInteger(id));

/**
 * The rooms the navigator offers.
 *
 * Historical note, kept because it explains the shape of the code around it:
 * there was a long hunt over whether the value the client echoes back in
 * PUBLIC_SPACE_REQUEST is a spaceid, a synthetic tag, or a list index. It is
 * the **spaceid, which we set equal to the room code**. Nothing mints tags any
 * more and there is no index arithmetic left — a `SPACE_TAG_BASE` of 1000 and
 * its `advertisedRooms()[value - 1000]` lookup are gone, because they collided
 * with the real four-digit room codes (1001, 1100, 1102, 1103, 1104, 1106,
 * 1107, 2000, 2001) and quietly redirected all nine.
 *
 * ⚠ Do not add another "interpretation" ahead of the plain room-code reading.
 */
function advertisedRooms(): number[] {
  // Advertise EVERY loadable room on every node.
  //
  // The land maps wire their hotspots by room *name*, not by id: the
  // Adventureland template (`02e17c43` / `00033_vmk_nav_adventureland`) carries
  // click areas `nav.bazaar`, `nav.safari`, `nav.tiki`, `nav.dock`, `nav.tent`,
  // `nav.treehouse`, `nav.indy`, `nav.cambodian` — which match `room.code`
  // *values* exactly (`room.code.5=bazaar`, `room.code.10=safari`, …). The
  // original server evidently advertised each land's rooms on that land's node
  // and the client bound hotspot -> space by name.
  //
  // We do not yet know which node tag is which land, so serve them all and let
  // the client bind whatever its current map needs. ⚠ A previous `id >= 20`
  // filter (added to disambiguate id-vs-index) excluded 5,6,7,8,9,10,11 — i.e.
  // most of Adventureland — and guaranteed those hotspots could never resolve.
  //
  // ⚠ DIAGNOSTIC OVERRIDE. `VMK_ADVERTISE_ROOMS=72` serves exactly one space,
  // which makes PUBLIC_SPACE_REQUEST unambiguous: 72 = spaceid, 0 = list index,
  // 1000 = tag, anything else = a constant the client is inventing. Measured so
  // far: the client sends `1` no matter which room is clicked, which fits none
  // of the first three.
  const override = process.env.VMK_ADVERTISE_ROOMS;
  if (override) {
    const ids = override
      .split(",")
      .map((part) => Number(part.trim()))
      .filter((id) => Number.isFinite(id));
    if (ids.length > 0) return ids;
  }
  return ROOM_IDS;
}

/**
 * ⛔ REMOVED — `roomCodeForSpaceTag`. Do not reintroduce it.
 *
 * It computed `advertisedRooms()[tag - SPACE_TAG_BASE]`, which was only ever
 * correct while we minted synthetic tags. We now advertise `tag = spaceId =
 * room code`, so nothing mints tags any more — but the branch stayed in the
 * resolver and silently ate every FOUR-DIGIT room code, because SPACE_TAG_BASE
 * is 1000 and its stated invariant ("must sit above every room code") is false:
 * 1001, 1100, 1102, 1103, 1104, 1106, 1107, 2000 and 2001 all exceed it.
 *
 * Measured: the client asked for the Pirates lobby correctly and got Tiki.
 *   PUBLIC_SPACE_REQUEST raw=1001 interpreted as TAG -> room 1 (Tiki Tiki Tiki Room)
 * 1001 - 1000 = index 1 = the second advertised room. The long "which encoding
 * is it?" hunt ended with the right answer (spaceId == room code) but this dead
 * branch was left ahead of it in the chain, so nine rooms stayed broken.
 */

/**
 * Disney space id -> our `room.code.<N>`.
 *
 * ⚠ These are **different namespaces**, which cost a lot of time to establish.
 * The client carries its own hardcoded space ids and they do not line up with
 * `room.code.*`:
 *   - the Pirates minigame sends `1` — from the COOL STUFF shortcut *and* from
 *     the Adventureland map hotspot, two independent paths — while
 *     `room.code.1` is `tiki_private`;
 *   - `CRoomInfoHandler` hardcodes `send(31, [21, -1])` for the Music Mixer,
 *     while musicmix is `room.code.42/1103/1107`;
 *   - `[25, -1]` and `[29, -1]` for the monorails.
 * Two earlier apparent matches (`room.25.name` = "Monorail Train 1") were
 * coincidence, not a shared numbering.
 *
 * Entries are hand-derived from the client's own calls. Anything absent falls
 * through to identity, which is right for ids that genuinely are room codes.
 */
const SPACE_ID_TO_ROOM = new Map<number, number>([
  // ⛔ `[1, 1001]` was REMOVED. It was inferred back when the navigator only
  // advertised a handful of rooms and the Pirates lobby click arrived as `1`.
  // Now that every room is advertised with `spaceId = room code`, that same
  // click arrives as `1001` (verified on the wire). Keeping the entry would
  // hijack `room.code.1` = `tiki_private` — the client would ask for the Tiki
  // Room and be sent to the Pirates lobby, the very swap we were chasing, only
  // in reverse.
  //
  // Only ids that are NOT valid room codes belong here.
  [21, 1103], // Music Mixer — CRoomInfoHandler hardcodes send(31, [21, -1]); no room.code.21 exists
]);

/**
 * Rooms the navigator can advertise: ids that have BOTH a `room.code.<N>` in
 * the variables (so `_EnterRoom` can resolve casts) AND a `room.<N>.name` in the
 * texts (so the navigator has a label). 86 of the 142 codes qualify.
 *
 * The client resolves both sides itself, so the server only ever sends ids.
 */
const ROOM_IDS: number[] = [];

/**
 * Every code whose casts actually resolve — regardless of whether it has a name
 * or is advertised. `ROOM_IDS` answers "should the navigator list this?";
 * this answers "will the client survive being sent there?".
 */
const LOADABLE_ROOMS = new Set<number>();

/**
 * Geometry name derived from a code's SPACE CAST, for codes that reuse another
 * room's cast.
 *
 * `room.code.1109` is `checkers_game_room`, but `room.cast.1109.1` is
 * `vmk_spaces/vmk_vmk_magic_shop` — the checkers room is dressed from the Magic
 * Shop's cast. The geometry extractor files tiles under the room XML's own
 * `NAME` (`vmk_magic_shop`), so looking geometry up by the CODE's name finds
 * nothing: no spawn tile, no tiles, no pathing.
 */
const GEOMETRY_ALIAS = new Map<number, string>();

/**
 * Minigames that are deliberately not enterable yet.
 *
 * These rooms are not broken in the way the missing-cast rooms are — several
 * would part-load — but none of the game logic behind them exists, so entering
 * strands the player somewhere with no way to play and, for the lobbies, no
 * obvious way out. Refusing the request keeps them where they are.
 *
 * (The Haunted Mansion public levels, 60/65/66, are OPEN — their ghosts are
 * ghosts.ts. The lobby, 1104, is haunted-mansion.ts / hm-match.ts.)
 */
const BLOCKED_ROOMS = new Map<number, string>([
  // (1001, the Pirates of the Caribbean lobby, is OPEN — pirates.ts. 1000,
  // 1002 and 1003 were listed with it but have no room config at all.)
  // (1104, the Haunted Mansion lobby, is OPEN — haunted-mansion.ts.)
  // (11, the Dock, and 1102, the Jungle Cruise game, are OPEN — jungle-cruise.ts.)
  // The Magic Shop and its checkers room. They share a space cast, and the shop
  // is the only way through to the game, so they close together.
  [1108, "The Main Street Magic Shop"],
  [1109, "Magic Shop Checkers"],
  // 42 is the lobby, 1103 the game. ⚠ 1103 also catches the client's hardcoded
  // `GoToMusicMixerGame`, which sends space id 21 — `SPACE_ID_TO_ROOM` resolves
  // that to 1103 BEFORE this check runs, so that shortcut is covered too.
  // (They are now OPEN — music-mixer.ts. Kept as a note: 21 -> 1103 above.)
]);

/**
 * Does every cast a room needs actually exist on disk?
 *
 * `_EnterRoom` gives the client a room code and the client resolves
 * `room.cast.<code>.1..N` itself, so a room whose casts are missing fails
 * *after* we have already told it to enter — the client simply never fetches
 * anything and the stage stays put, with nothing on the wire to explain it.
 *
 * 16 of the 89 named rooms are in this state: they point into
 * `vmk_spaces/vmk_holiday_overlays/…` and `vmk_sound/holiday/…`, seasonal
 * variants the mirror never captured (that directory holds the archive's packaging
 * zips instead). Rooms 2, 3 and 4 — Central Plaza, Town Square, Main Street —
 * are all in the broken set, which is why the first room click did nothing.
 */
/**
 * Advertise rooms with missing casts? Default NO.
 *
 * ⚠ History, so this is not re-litigated. Requiring every cast to resolve kept
 * Room 1104 (Haunted Mansion Lobby) unreachable over one absent file,
 * `vmk_avatar/gfx_hmgame_avatar`. Relaxing the bar to "any space cast resolves"
 * did make it reachable — and it **crashed the client**, which is strictly
 * worse than the old behaviour of quietly landing in the fallback room.
 *
 * So the strict bar is back by default. The relaxation is kept behind this flag
 * because it is the only way to actually investigate such a room: set
 * `VMK_INCOMPLETE_ROOMS=1` to advertise partially-present rooms and see what
 * they do. serve-shockwave still strips unresolvable casts from the served
 * config either way, so an incomplete room cannot hang the load bar — it just
 * may not survive whatever it needed the missing asset for.
 *
 * (The rooms that prompted this — 1104 and the HM public levels 60/65/66 — now
 * resolve all their casts: `gfx_hmgame_avatar` and the ghost NPCs were
 * recovered from vmk_source.zip. Formerly: 60/65/66 (HM public
 * levels — missing `vmk_hm_public_levels` and their ghost NPCs).)
 */
const ALLOW_INCOMPLETE_ROOMS = process.env.VMK_INCOMPLETE_ROOMS === "1";

/** Can this room be entered? See ALLOW_INCOMPLETE_ROOMS for the two modes. */
function roomIsLoadable(casts: string[]): boolean {
  if (casts.length === 0) return false;
  // The question is whether the TS client can LOAD each cast, which means its
  // extraction exists — not whether a .cct sits in an archive the release does
  // not ship. Must agree with assets.ts applySeasonToVariables, which serves the
  // de-holidayed path when it exists and drops holiday-only layers outright.
  casts = casts.filter((rel) => {
    const plain = deHoliday(rel);
    return plain === rel || !/holiday/i.test(plain.split("/").pop() ?? "");
  });
  if (casts.length === 0) return false;
  const resolves = (rel: string) => castExtracted(deHoliday(rel)) || castExtracted(rel);
  if (!ALLOW_INCOMPLETE_ROOMS) return casts.every(resolves);
  const spaces = casts.filter((rel) => /(^|\/)vmk_spaces\//i.test(rel));
  // A handful of entries (minigame lobbies) carry no vmk_spaces/ cast at all;
  // for those, any resolvable cast is enough to be worth offering.
  return spaces.length > 0 ? spaces.some(resolves) : casts.some(resolves);
}

function loadRoomCastMap(text: string): Map<number, string[]> {
  const map = new Map<number, string[]>();
  for (const line of text.split(/\r?\n/)) {
    const match = /^room\.cast\.(\d+)(?:\.\d+)?=(.*)$/.exec(line);
    if (!match) continue;
    const id = Number(match[1]);
    if (!map.has(id)) map.set(id, []);
    map.get(id)!.push(match[2].trim());
  }
  return map;
}

function loadRoomNames(): Map<number, string> {
  return loadRoomTexts("name");
}

/**
 * Room codes offered as guest-room styles: their casts load and their space is
 * a private room (`*_private`, `*_room`). The list `/giveroom` prints and /hk
 * offers. Any loadable code can still be given by number.
 */
function guestRoomStyles(): Array<{ code: number; space: string; name: string }> {
  return [...ROOM_CODES.entries()]
    .filter(([code, space]) => LOADABLE_ROOMS.has(code) && /private|_room$/.test(space))
    .map(([code, space]) => ({ code, space, name: ROOM_NAMES.get(code) ?? space }))
    .sort((a, b) => a.name.localeCompare(b.name) || a.code - b.code);
}

/**
 * A NEW guest room for `userId`, built on room `code` — `/giveroom` and the /hk
 * grant. Free, unlike the shop's `BUY_ROOM`; same `addGuestRoom`. Starts with
 * the style's own description, as a bought room does. `notify` sends the
 * player a staff message saying where to find it. Returns the reason instead
 * of a room when the code cannot be used.
 */
function giveGuestRoom(userId: number, characterName: string, code: number, notify: boolean): GuestRoom | string {
  const space = ROOM_CODES.get(code);
  if (!space || !LOADABLE_ROOMS.has(code)) {
    return `room code ${code} ${space ? `(${space}) has no loadable casts` : "does not exist"}`;
  }
  const room = addGuestRoom(userId, code, `${characterName}'s Room`, loadRoomTexts("desc").get(code) ?? "");
  if (notify) {
    sendStaffMessage(
      userId,
      `You've been given a new guest room: ${ROOM_NAMES.get(code) ?? space}. ` +
        `Find it under My Rooms in the Guest Rooms navigator.`,
    );
  }
  return room;
}

/**
 * `room.<N>.name` / `room.<N>.desc` from the texts.
 *
 * Descriptions matter for guest rooms: a new room starts with the blurb of the
 * style it was built from, which is what the player then edits. Seeding it with
 * the style's NAME instead reads as a mistake in the room info panel.
 */
function loadRoomTexts(field: "name" | "desc"): Map<number, string> {
  const values = new Map<number, string>();
  const pattern = new RegExp(`^room\\.(\\d+)\\.${field}=(.*)$`);
  for (const path of [join(OVERLAY, "external_texts.txt"), join(ARCHIVE, "external_texts.txt")]) {
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "latin1").split(/\r?\n/)) {
      const match = pattern.exec(line);
      if (match) values.set(Number(match[1]), match[2].trim());
    }
    return values;
  }
  return values;
}

/**
 * With `VMK_SEASON` set, walk each decorated room on the layout its seasonal
 * cast actually has. Most decorations are drawn over the everyday floor plan,
 * but Central Plaza (both seasons) and Christmas Main Street come from OLDER
 * builds of those rooms, with tiles renumbered and the later doors missing.
 * The server must path, spawn and route exits on the tiles the client drew.
 *
 * Works out the served space cast the same way the config does (seasons.ts)
 * and uses the layout extract-room-geometry recorded for it. Exits are carried
 * across by tile POSITION, and doors that build lacks are dropped.
 */
function applySeasonalLayouts(castMap: Map<number, string[]>): void {
  const season = seasonFromEnv();
  if (!season) return;
  for (const [code, casts] of castMap) {
    const served = seasonalCasts(season, String(code), casts.map(deHoliday), castExtracted).casts;
    const space = served.find((c) => c.startsWith("vmk_spaces/"));
    if (!space) continue;
    const key = seasonCastKey(space);
    const layout = seasonalLayout(key);
    const name = layout?.name;
    if (!layout || !name) continue;
    const map = seasonalTileMap(name, key);
    if (!map || !useSeasonalLayout(name, key)) continue;
    const { kept, dropped } = remapRoomTiles(code, map);
    console.log(
      `[season] ${season} room ${code} (${name}) walks the ${key} layout; ${kept} exit(s) carried over` +
        (dropped.length ? `, dropped (no such door in this build): ${dropped.join(", ")}` : ""),
    );
  }
}

let redeemPrices: Map<number, number> | null = null;

function redeemPriceOf(typeCode: number): number {
  if (!redeemPrices) {
    redeemPrices = new Map();
    const path = process.env.VMK_EXTERNAL_VARS
      ? (isAbsolute(process.env.VMK_EXTERNAL_VARS)
          ? process.env.VMK_EXTERNAL_VARS
          : join(dirname(fileURLToPath(import.meta.url)), "..", "..", process.env.VMK_EXTERNAL_VARS))
      : join(dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "external_variables_casts.txt");
    const line = existsSync(path) ? /^redeemprices=\[(.*)\]\s*$/m.exec(readFileSync(path, "utf8"))?.[1] : undefined;
    for (const pair of (line ?? "").split(",")) {
      const [code, price] = pair.split(":").map(Number);
      if (Number.isInteger(code) && Number.isInteger(price)) redeemPrices.set(code, price);
    }
    console.log(`[sell] ${redeemPrices.size} redeem prices loaded`);
  }
  return redeemPrices.get(typeCode) ?? 0;
}

function loadRoomCodes(): void {
  const candidates = [
    process.env.VMK_EXTERNAL_VARS ?? "",
    join(dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "external_variables_casts.txt"),
  ].filter(Boolean);
  for (const candidate of candidates) {
    const path = isAbsolute(candidate)
      ? candidate
      : join(dirname(fileURLToPath(import.meta.url)), "..", "..", candidate);
    if (!existsSync(path)) continue;
    const text = readFileSync(path, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const match = /^room\.code\.(\d+)=(.*)$/.exec(line);
      if (match) ROOM_CODES.set(Number(match[1]), match[2].trim());
    }
    const names = loadRoomNames();
    for (const [id, name] of names) ROOM_NAMES.set(id, name);
    const castMap = loadRoomCastMap(text);
    applySeasonalLayouts(castMap);
    let unnamed = 0;
    let missingCasts = 0;
    let blockedListed = 0;
    for (const id of [...ROOM_CODES.keys()].sort((a, b) => a - b)) {
      // ⚠ Loadable is NOT the same as advertisable, and conflating them cost an
      // afternoon. A room drops out of the navigator for having no NAME — true
      // of every private/guest-room cast — long before its casts are examined.
      // `/goto` needs the cast question answered on its own, so answer it here
      // for EVERY code, named or not.
      if (roomIsLoadable(castMap.get(id) ?? [])) {
        LOADABLE_ROOMS.add(id);
      }
      // `vmk_spaces/vmk_vmk_magic_shop` -> `vmk_magic_shop`, the name the room
      // XML inside that cast declares and the extractor keys geometry by.
      // ⚠ Try the basename BOTH ways. The room XML's own NAME sometimes keeps
      // the `vmk_` prefix and sometimes drops it, and the cast file may carry it
      // twice: `vmk_vmk_magic_shop` declares `vmk_magic_shop` (strip one), while
      // `vmk_checkers` declares `vmk_checkers` (strip none). Stripping
      // unconditionally silently fails for the second kind.
      const space = (castMap.get(id) ?? []).find((c) => /(^|\/)vmk_spaces\//i.test(c));
      if (space) {
        const base = (space.split("/").pop() ?? "").replace(/\.(cct|cst)$/i, "");
        const candidate = [base, base.replace(/^vmk_/, "")].find(
          (n) => n && spawnTileFor(n) !== null,
        );
        if (candidate) GEOMETRY_ALIAS.set(id, candidate);
      }
      if (!names.has(id)) {
        unnamed++;
        continue;
      }
      // Blocked minigames are advertised REGARDLESS of their casts. We never
      // send the client into them, so nothing has to load — and listing them is
      // the only way a player can click one and be told it is closed. The
      // Haunted Mansion was the case in point: its casts are absent, so it was
      // silently missing from the navigator, which looked like "already
      // blocked" but gave no explanation and no way to ask for one.
      if (BLOCKED_ROOMS.has(id)) {
        blockedListed++;
        ROOM_IDS.push(id);
        continue;
      }
      if (!roomIsLoadable(castMap.get(id) ?? [])) {
        missingCasts++;
        continue;
      }
      ROOM_IDS.push(id);
    }
    console.log(
      `Rooms: ${ROOM_CODES.size} codes, ${ROOM_IDS.length} advertisable ` +
        `(${unnamed} unnamed, ${missingCasts} with missing casts, ` +
        `${blockedListed} blocked minigames listed-but-closed). ` +
        `e.g. ${ROOM_IDS.slice(0, 4).map((id) => `${id}=${names.get(id)}`).join(", ")}`,
    );
    return;
  }
  console.log("Room codes: NONE FOUND — PUBLIC_SPACE_REQUEST will not resolve a room");
}
export const SECURE_API_UUID = "22156013-96f2-456c-9c44-8258c6de672f";
const PORT = Number(process.env.VMK_GAME_PORT ?? 8080);

interface DevSession {
  userId: number;
  ticket: string;
  loginName: string;
}

/** userId -> session */
const sessions = new Map<number, DevSession>();

/**
 * Live game connections, keyed by user id.
 *
 * VMK is one character online at a time: logging in from a second place takes
 * over, it does not run two copies of you. Without this, two browsers holding
 * the same account each got their own independent session -- both "logged in",
 * both able to move, with no server-side notion that they were the same player.
 * Room state, inventory and trades all assume a single connection per user, so
 * the duplicate is not a cosmetic problem.
 */
interface LiveConnection {
  userId: number;
  username: string;
  label: string;
  remote: string;
  disconnect: (reason: string) => void;
  /** Re-send this player's inventory — for items that reach them from elsewhere. */
  refreshInventory: () => void;
  /** Put this player out of `roomName` (booted by its owner). No-op if elsewhere. */
  bootFrom: (roomName: string) => void;
  /** Send this player a message. */
  send: (msgType: number, params: OutgoingParam[], note?: string) => void;
  /** The room this player stands in, if any. */
  roomName: () => string | undefined;
  /** The "trading" bubble (avatar action slot 9): on while a trade window is open. */
  setTrading: (on: boolean) => void;
  /** Garment set ids this player is wearing — those cannot be traded away. */
  wornGarments: () => number[];
  /** Carry this player to another room, arriving near `arrive` (the rocket shuttle). */
  rideTo: (code: number, arrive: number[], label: string) => void;
  /** Let this player into the full room they were queueing for. */
  enterQueued: (code: number) => void;
  /** They reached a music stage: offer their mixes (music-mixer.ts). */
  onMusicStage: () => void;
  rename: (name: string) => void;
  /** The character name shown in rooms (Housekeeping's online list). */
  characterName: () => string;
  /** The room code they stand in (a guest room's is its style), if any. */
  roomCode: () => number | undefined;
  /** Staff move (Housekeeping "Send to room" / "Bring"): a public room or a guest room. */
  goTo: (where: { roomCode?: number; guestRoom?: GuestRoom }) => void;
}

/**
 * Player-to-player trading. See `CMD.TRADE_*` / `MSG.TRADE_*` for the wire.
 *
 * One trade per player. Each side offers inventory rows; any change to an offer
 * drops BOTH players back to unaccepted, so nobody confirms a deal that moved
 * under them. Level 1 is "You accept", 2 the final confirm; when both reach 2
 * the rows change owner in one go (after re-checking every row is still theirs)
 * and both inventories are re-sent — `2597` itself refreshes nothing.
 */
interface Trade {
  users: [number, number];
  room: string;
  offer: Map<number, Set<number>>;
  level: Map<number, number>;
}
const tradeOf = new Map<number, Trade>();
/** Outstanding "Do you want to trade?" prompts: requestId -> who asked whom. */
const tradeRequests = new Map<number, { from: number; to: number; room: string; expires: number }>();
let nextTradeRequest = 1;
const TRADE_REQUEST_MS = 60_000;
/** "Ignore" on a request: `target -> requester -> until`. The text promises "a while". */
const tradeIgnores = new Map<number, Map<number, number>>();
const TRADE_IGNORE_MS = 10 * 60_000;

const tradePartner = (t: Trade, userId: number): number => (t.users[0] === userId ? t.users[1] : t.users[0]);

/** One offered row as `2596` lays it out; undefined if the row is gone. */
function tradeItemParams(ownerId: number, rowId: number): OutgoingParam[] | undefined {
  const item = getOwnedItem(rowId, ownerId);
  if (!item) return undefined;
  const out: OutgoingParam[] = [{ int: item.id }, { int: item.typeCode }, { int: item.category }];
  if (item.category === ITEM_CATEGORY.items) {
    // A teleporter half is [1, pairId, partnerRef] — `checkTeleporterSelection`
    // highlights the partner piece from the third value.
    const partner = item.pair ? getInventoryPartner(item.pair.id, item.id) : undefined;
    if (item.pair) out.push({ int: 3 }, { int: 1 }, { int: item.pair.id }, { int: partner ?? 0 });
    else out.push({ int: 0 });
  } else if (item.category === ITEM_CATEGORY.pins) {
    out.push({ int: item.level ?? 0 });
  }
  return out;
}

function sendTradeStatus(t: Trade): void {
  for (const me of t.users) {
    const them = tradePartner(t, me);
    const side = (userId: number): OutgoingParam[] => {
      const rows = [...(t.offer.get(userId) ?? [])]
        .map((row) => tradeItemParams(userId, row))
        .filter((p): p is OutgoingParam[] => p !== undefined);
      return [{ int: t.level.get(userId) ?? 0 }, { int: rows.length }, ...rows.flat()];
    };
    liveByUser.get(me)?.send(MSG.TRADE_STATUS, [...side(me), ...side(them)], "TradeStatus");
  }
}

function endTrade(t: Trade, cancelled: boolean): void {
  for (const userId of t.users) {
    if (tradeOf.get(userId) === t) tradeOf.delete(userId);
    const conn = liveByUser.get(userId);
    conn?.send(MSG.TRADE_FINISHED, [{ int: cancelled ? 1 : 0 }], `TradeFinished ${cancelled ? "cancelled" : "done"}`);
    conn?.setTrading(false);
  }
}

function completeTrade(t: Trade): void {
  const [a, b] = t.users;
  const rowsA = [...(t.offer.get(a) ?? [])];
  const rowsB = [...(t.offer.get(b) ?? [])];
  // Every row must still be where it was offered from; otherwise nothing moves.
  const intact =
    rowsA.every((row) => getOwnedItem(row, a) !== undefined) &&
    rowsB.every((row) => getOwnedItem(row, b) !== undefined);
  if (!intact) {
    console.log(`[trade] ${a}<->${b} aborted: an offered item is no longer there`);
    endTrade(t, true);
    return;
  }
  // Snapshot what each side gave BEFORE the rows change owner — afterwards
  // `getOwnedItem(row, a)` no longer finds them.
  const describe = (rows: number[], owner: number) =>
    rows
      .map((row) => getOwnedItem(row, owner))
      .filter((it): it is NonNullable<typeof it> => it !== undefined)
      .map((it) => ({ id: it.id, typeCode: it.typeCode, category: it.category }));
  const gaveA = describe(rowsA, a);
  const gaveB = describe(rowsB, b);
  for (const row of rowsA) transferItem(row, a, b);
  for (const row of rowsB) transferItem(row, b, a);
  console.log(`[trade] ${a} gave [${rowsA.join(",")}] <-> ${b} gave [${rowsB.join(",")}]`);
  logTrade(a, b, t.room, gaveA, gaveB, ipOf(liveByUser.get(a)?.remote), ipOf(liveByUser.get(b)?.remote));
  endTrade(t, false);
  for (const userId of t.users) liveByUser.get(userId)?.refreshInventory();
}
const liveByUser = new Map<number, LiveConnection>();
// The music stages hand the performer to their connection (music-mixer.ts).
for (const stage of [MONORAIL_MIXER_STAGE, STREET_MIXER_STAGE]) {
  setStageHook(stage, (_room, userId) => liveByUser.get(userId)?.onMusicStage());
}

/**
 * Players booted from a room, and until when they may not come back — the boot
 * dialog promises they "won't be able to return for a while". `room -> user ->
 * epoch ms`. In memory: a restart forgives everyone.
 */
const roomBoots = new Map<string, Map<number, number>>();
const BOOT_BAN_MS = 5 * 60 * 1000;
function bootedUntil(room: string, userId: number): number {
  const until = roomBoots.get(room)?.get(userId) ?? 0;
  if (until && until <= Date.now()) roomBoots.get(room)?.delete(userId);
  return until > Date.now() ? until : 0;
}

/**
 * Everyone currently standing in each room, keyed by room cast name then user id.
 *
 * ⚠ WITHOUT THIS THERE IS NO MULTIPLAYER AT ALL. Every room message is
 * addressed — `2582 _CreateAvatars` names the avatars to build, `2583
 * _StatusPulse` names the avatar that moved — so a client only ever learns
 * about players the server explicitly tells it about. Sending each player
 * nothing but their own avatar is exactly what "the other person isn't there"
 * looks like: both clients are working correctly on the information they have.
 */
interface RoomOccupant {
  userId: number;
  name: string;
  sex: number;
  /** Exactly 12 ints; the client reads that many unconditionally. */
  figure: number[];
  tile: number;
  facing: number;
  /** Profile badge codes — see `BADGE_CODES`; at most `MAX_BADGES` are drawn. */
  badges: number[];
  /**
   * The signature, as TEXT — `_CreateAvatars` reads `desc` with `GetStrFrom`.
   * Lossy by necessity; `sloganTokens` is the faithful copy.
   */
  slogan: string;
  /**
   * The signature as TOKENS, replayed through `2506` right after the avatar is
   * created. This is what makes the profile show the real words: the CLIENT
   * resolves the dictionary indices that the server cannot.
   */
  sloganTokens: ChatToken[];
  /**
   * The magic effect running now (action slot 10). Pulses carry it to whoever
   * is already in the room; this is what a player who walks in mid-effect gets.
   */
  magic?: number;
  /** A magic costume on show over `figure` (Pirate Costume), while it lasts. */
  shownFigure?: number[];
  /** 1 while a trade window is open — avatar action slot 9, the trade bubble. */
  trading?: number;
  /**
   * The pose from the last pulse — legs (sitting, dancing, a ride's vehicle),
   * arms, and the stack level a seat lifts you to. Pulses reach whoever is in
   * the room; someone who walks in LATER only gets `2582 CreateAvatars`, which
   * used to say "standing, stack 0" — the user, sitting in TS, stood in
   * Shockwave. Walking is kept as standing (a newcomer would see a frozen stride).
   */
  legs?: number;
  leftHand?: number;
  rightHand?: number;
  stack?: number;
  /** `/ghost`: hidden from everyone in the room but staff and themselves. */
  ghost?: boolean;
  /** Has any moderator permission — sees ghosts (in the Invisibility look). */
  staff?: boolean;
  send: (msgType: number, params: OutgoingParam[], note?: string) => void;
}
const roomOccupants = new Map<string, Map<number, RoomOccupant>>();

function occupantsOf(room: string | undefined): RoomOccupant[] {
  if (!room) return [];
  return [...(roomOccupants.get(room)?.values() ?? [])];
}

/**
 * GHOSTS. A staff member who types `/ghost` is not in the room as far as
 * ordinary players can tell: they never get the avatar (`2582`), its moves,
 * chat, signature or departure, and room head counts leave it out. Staff —
 * and the ghost itself — see it with the Invisibility pin's look (effect 5).
 *
 * The rule lives HERE, once: anything the server says about an avatar goes to
 * `audienceOf(room, thatAvatar)`, never straight to `occupantsOf(room)`.
 */
const GHOST_FX = 5;

function sees(viewer: RoomOccupant, subject: RoomOccupant | undefined): boolean {
  return !subject?.ghost || viewer.userId === subject.userId || viewer.staff === true;
}

/** Everyone in `room` allowed to see avatar `subjectId`. */
function audienceOf(room: string | undefined, subjectId: number): RoomOccupant[] {
  const subject = room ? roomOccupants.get(room)?.get(subjectId) : undefined;
  return occupantsOf(room).filter((o) => sees(o, subject));
}

/** A room's head count as players see it: ghosts are not there. */
function visibleCount(room: string | undefined): number {
  return occupantsOf(room).filter((o) => !o.ghost).length;
}

/* ------------------------------------------------------------------ monorail */

/**
 * THE MONORAIL: one train looping six stops, driven entirely from here.
 *
 * Both rooms' handlers are complete client-side and react to two messages
 * (vmk-protocol: MONORAIL_EVENT 2730, MONORAIL_NEXT_STOP 2731). The station
 * handler animates the train in and out and switches the platform's boarding
 * exits (door IDs 7..23) on at state 1 and off at 0; the train handler shows
 * the stop on its display, plays each land's music and switches its own doors
 * (IDs 7..19). Nothing tells us the original timings, so they are ours:
 *
 *   $env:VMK_MONORAIL_TIMINGS = "approach,stopped,leaving,between" (seconds)
 *
 * ⚠ There is ONE station room (code 14) for six stations, so each stop gets
 * its own occupancy bucket, `monorail_station@<stop>` — otherwise riders at
 * every land would share one platform. See `stationStop` in the connection.
 */
const MONORAIL_STOPS = [20, 21, 22, 23, 24, 92] as const;
const MONORAIL_STOP_NAMES: Record<number, string> = {
  20: "Main Street", 21: "Adventureland", 22: "Frontierland",
  23: "Fantasyland", 24: "Tomorrowland", 92: "New Orleans Square",
};
const MONORAIL_STATION = 14;
const MONORAIL_TRAIN = 15;
/** The music mixers' mixing rooms (music-mixer.ts); 42 and 15 are their stages. */
const STREET_MIXER_ROOM = 1103;
const MONORAIL_MIXER_ROOM = 1107;
const STREET_MIXER_LOBBY = 42;
/** The Jungle Cruise: the Dock (preshow, sign-up) and the game it launches (jungle-cruise.ts). */
const JC_DOCK_ROOM = 11;
const JC_GAME_ROOM = 1102;
/** Door IDs of the Monorail's mixer booth (`CLASS exit NAME "mixer"`, refs 90/109/110). */
const TRAIN_MIXER_DOORS = [20, 21, 22];
/** Just outside the booth: the `mixer_queue` tiles. */
const TRAIN_MIXER_ARRIVE = [124, 125];
/** How long the stage's song picker waits for a choice before walking you off. */
const PICK_SONG_MS = 45_000;
const stationBucket = (stop: number) => `monorail_station@${stop}`;
/** Each train is its own ride: riders on one never share a car with another's. */
const trainBucket = (train: number) => `monorail_train#${train}`;

/** The land each station opens onto: the ground-floor stairs, and the pier-side ones. */
const STATION_STAIRS: Record<number, { ground: number; pier: number }> = {
  20: { ground: 48, pier: 48 }, // VMK Esplanade
  21: { ground: 8, pier: 8 }, // Forbidden Temple
  22: { ground: 66, pier: 64 }, // Haunted Mansion Attic / Tom Sawyer's Island
  23: { ground: 13, pier: 13 }, // Dungeon
  24: { ground: 47, pier: 47 }, // Tomorrowland Hub
  92: { ground: 95, pier: 95 }, // New Orleans Square
};
/** Which station a land's monorail exit leads to. */
const LAND_STATION: Record<number, number> = { 48: 20, 8: 21, 64: 22, 66: 22, 13: 23, 47: 24, 95: 92 };

// Door IDs, from the handlers' own `findExits` and the station/train layouts.
const STATION_GROUND_STAIRS = [0, 1, 2, 3, 4, 5, 6];
const STATION_PIER_STAIRS = [24, 25, 26, 27];
const STATION_BOARDING = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const TRAIN_DOORS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
/**
 * Which train doorway meets which platform doorway — it behaves like a real
 * train: the ground-floor platform faces the train's lower doors, the pier
 * platform its upper ones, front to back in the same order. Boarding through a
 * platform doorway puts you just inside its partner; alighting, just outside.
 * (Door IDs per doorway, left to right on screen, from the room layouts.)
 */
const MONORAIL_DOOR_PAIRS: Array<{ station: number[]; train: number[] }> = [
  { station: [7, 8, 9], train: [0] },
  { station: [10, 11, 12], train: [1, 2, 3] },
  { station: [13, 14, 15], train: [4, 5, 6] },
  { station: [16, 17], train: [7, 8] },
  { station: [18, 19, 20], train: [9, 10, 11, 12, 13, 14] },
  { station: [21, 22, 23], train: [15, 16, 17, 18, 19] },
];
const doorPairFor = (side: "station" | "train", id: number) =>
  MONORAIL_DOOR_PAIRS.find((pair) => pair[side].includes(id));

type MonorailState = 0 | 1 | 2 | 10;
/**
 * SEVERAL TRAINS, one clock. With a single train every platform waited a full
 * lap (3+ minutes) — nothing records the original's frequency, but its own
 * platform text says "Next monorail arrives in a few moments". The trains run
 * in LOCKSTEP, spaced evenly round the loop, so no two ever stand at the same
 * platform and each station sees one every `lap / trains`.
 *
 *   $env:VMK_MONORAIL_TRAINS = "3"   # 1..6
 */
const MONORAIL_TRAIN_COUNT = Math.min(
  MONORAIL_STOPS.length,
  Math.max(1, Math.floor(Number(process.env.VMK_MONORAIL_TRAINS ?? 3)) || 1),
);
interface Train {
  id: number;
  /** Where on the loop this train starts, as a stop index. */
  offset: number;
  stop: number;
  state: MonorailState;
}
const trains: Train[] = Array.from({ length: MONORAIL_TRAIN_COUNT }, (_, id) => {
  const offset = Math.floor((id * MONORAIL_STOPS.length) / MONORAIL_TRAIN_COUNT);
  return { id, offset, stop: MONORAIL_STOPS[offset], state: 2 as MonorailState };
});
const trainAt = (stop: number): Train | undefined => trains.find((t) => t.stop === stop);
const MONORAIL_TIMINGS = (() => {
  // Matched to the client's own animations and sounds. The movie runs at
  // 24 fps — MEASURED in the client (`the frameTempo` = 24, every update
  // object ticking 24.0/s), NOT `system.tempo`'s default of 30 that these
  // were first computed with:
  //   approach  4.5 s  the station's pull-in is 100 curve points, one a frame
  //                    (CAnimateMonorail pArriveAtStationAnimation) = 4.2 s —
  //                    the doors-open event (and its sound) must land as the
  //                    train stops. "Stand clear" (7.8 s) overlaps the doors.
  //   stopped   26 s   the train's boarding welcome VO is 25.1 s
  //   leaving   8.5 s  the pull-out is 200 points = 8.3 s
  //   between   20 s   the ride itself. The train handler fires "Next stop"
  //                    (2.7 s VO) 10 s after departure; at 5 s, "approaching"
  //                    followed 3.5 s later — no room to breathe. 20 s leaves
  //                    ~15 s of riding after the announcement. (The land music
  //                    is queued ×10, so it does not bound the ride.)
  // One lap is six times the sum; with trains spaced round the loop a
  // platform waits lap / trains (118 s with 3).
  const parts = (process.env.VMK_MONORAIL_TIMINGS ?? "4.5,26,8.5,20").split(",").map(Number);
  const [approach, stopped, leaving, between] = parts.map((s) => Math.max(1, s || 1) * 1000);
  return { approach, stopped, leaving, between };
})();

function monorailSend(bucket: string, msg: number, params: OutgoingParam[]): void {
  for (const occupant of occupantsOf(bucket)) occupant.send(msg, params, undefined);
}

/** What a platform shows right now: the live state if a train is at it, else hidden. */
function stationStateFor(stop: number): MonorailState {
  return trainAt(stop)?.state ?? 2;
}

/** The train standing at `stop` with its doors open, if any. */
function boardableTrainAt(stop: number): Train | undefined {
  const train = trainAt(stop);
  return train?.state === 1 ? train : undefined;
}

/** When the trains (all in lockstep) entered their current phase. */
let monorailPhaseAt = Date.now();
/** Milliseconds until the trains' next phase change. */
function msUntilNextMonorailPhase(): number {
  const { approach, stopped, leaving, between } = MONORAIL_TIMINGS;
  const length = { 10: approach, 1: stopped, 0: leaving, 2: between }[trains[0]?.state ?? 2];
  return monorailPhaseAt + length - Date.now();
}
/**
 * ⚠ THE STATION DROPS AN EVENT WITHIN 1 s OF THE LAST (`CMonorailStationInterface
 * .MonorailInit`: `if t_iMsgDeltaTime > 1000 ... else exit`). A joining
 * player's catch-up event landing just before a phase change ate the real one —
 * MEASURED: walked in late in the approach, the catch-up `10` arrived <1 s before
 * the doors-open `1`, which was dropped, so the doors never opened and the
 * boarding doorways never became exits. Inside this window the catch-up is
 * skipped and the upcoming event becomes the station's FIRST, taking the same
 * init path a catch-up would (state 1 shows the doors open and the exits).
 * The train handler has no such guard and keeps its catch-up.
 */
const STATION_CATCHUP_GUARD_MS = 1200;

function setMonorailState(state: MonorailState): void {
  const what = { 10: "approaching", 1: "doors open", 0: "leaving", 2: "between stations" }[state];
  monorailPhaseAt = Date.now();
  for (const train of trains) {
    train.state = state;
    const riders = occupantsOf(trainBucket(train.id)).length;
    const waiting = occupantsOf(stationBucket(train.stop)).length;
    // Always logged — "where is the train?" is the first question when a
    // platform sits empty.
    console.log(
      `[monorail] train ${train.id + 1} ${MONORAIL_STOP_NAMES[train.stop]}: ${what} ` +
        `(${riders} aboard, ${waiting} on the platform)`,
    );
    const params: OutgoingParam[] = [{ int: state }];
    monorailSend(trainBucket(train.id), MSG.MONORAIL_EVENT, params);
    // The platform only sees the train arrive, stand and leave; "between" is
    // the train's own state. (The station handler also drops a second event
    // within 1 s of the last, which the phase lengths comfortably avoid.)
    if (state !== 2) monorailSend(stationBucket(train.stop), MSG.MONORAIL_EVENT, params);
  }
}

function runMonorail(index: number): void {
  const { approach, stopped, leaving, between } = MONORAIL_TIMINGS;
  const stopFor = (train: Train, step: number) =>
    MONORAIL_STOPS[(step + train.offset) % MONORAIL_STOPS.length];
  for (const train of trains) {
    train.stop = stopFor(train, index);
    monorailSend(trainBucket(train.id), MSG.MONORAIL_NEXT_STOP, [{ int: train.stop }]);
  }
  setMonorailState(10);
  setTimeout(() => {
    setMonorailState(1);
    setTimeout(() => {
      // ⚠ NAME THE NEXT STOP BEFORE DEPARTING. On state 0 the train handler
      // schedules `displayNextStop` 10 s ahead with `m_currentStop` CAPTURED
      // then, and 10 ("Now approaching:") reads it too — so it must already be
      // the next station. Sent after departure (as first written), the train
      // announced the stop it was leaving, or nothing.
      for (const train of trains) {
        monorailSend(trainBucket(train.id), MSG.MONORAIL_NEXT_STOP, [{ int: stopFor(train, index + 1) }]);
      }
      setMonorailState(0);
      setTimeout(() => {
        setMonorailState(2);
        setTimeout(() => runMonorail(index + 1), between);
      }, leaving);
    }, stopped);
  }, approach);
}
runMonorail(0);

/**
 * THE ROCKET SHUTTLE: Tomorrowland Hub (47) <-> Space Mountain Quest Deck (73).
 *
 * Both rooms carry a complete client side — `vmk_tomorrowland_hub_rocketride`
 * and `vmk_spacemountain_rocketride` — driven by one message,
 * `2792 AnimationState [animRef, state]`: 0 idle (boarding), 1 pre-launch,
 * 2 depart, 3 arrived. One rocket shuttles between them: after it leaves a
 * room that room shows nothing until it comes back.
 *
 * Boarding, from the room layouts:
 *   Hub   two lines, `queue_start_N` -> `queue_board_N` -> seat `sit_rocket_N`
 *         (queue engine, room-queues.ts; the seat is held until departure).
 *         The Hub handler itself hides whoever sits on `sit_rocket_1/2` as the
 *         rocket leaves.
 *   Deck  the seats `sit_front` / `sit_back` are EXIT tiles on the `rocket`
 *         floor — sitting in the rocket is leaving. Walk onto one while it
 *         boards; arriving riders step off at `queue_down`.
 *
 * Phase lengths follow the rooms' own animations at 24 fps:
 *   hub_rocketride_enter 20 frames (0.8 s), hub_rocketride_leave_blur 135 (5.6 s),
 *   rocketride_all: arrive 1-22 (0.9 s), prelaunch 53-59, depart 60-265 (8.6 s).
 * Boarding and pre-launch are ours: `VMK_ROCKET_TIMINGS="board,prelaunch"` (s).
 */
const ROCKET_HUB = 47;
const ROCKET_DECK = 73;
const HUB_ROCKET_GATE = "hub-rocket";
/**
 * ⚠ THE DECK'S ROCKET IS SCENERY YOU CANNOT STEP INTO. Its tiles (367-374, the
 * `rocket` floor, `sit_front`/`sit_back` among them) join no walkable floor, and
 * the nearest floor tile is ~100 px away on screen — and the Deck's own handler
 * hides anyone sitting in them. Placing riders there read as being BEAMED in
 * and out (the user, twice). The walkable spot beside the rocket is doorway #3,
 * the DOCK: stand on it while the rocket boards to ride, and you land on it.
 */
const DECK_DOCK = [91, 107, 121, 133];
const DECK_ROCKET_ARRIVE = [91, 107];
/** Clicking the rocket's seats (or the doorway tile beside each) means "board": walk to the dock. */
const DECK_ROCKET_CLICKS = new Set([368, 369, 371, 372]);
// The floor just in front of the two lines. NOT `queue_start_1` (248): arriving
// on a line tile stood you on the line without being in it, blocking it.
const HUB_ROCKET_ARRIVE = [194, 196];
const ROCKET_ANIM_MS = { hubArrive: 1000, hubDepart: 5700, deckArrive: 1000, deckDepart: 8700 };
const ROCKET_TIMINGS = (() => {
  const [board, prelaunch] = (process.env.VMK_ROCKET_TIMINGS ?? "20,3").split(",").map((s) => Math.max(1, Number(s) || 1) * 1000);
  return { board, prelaunch };
})();
type RocketPhase =
  | "hub-arrive" | "hub-board" | "hub-prelaunch" | "hub-depart"
  | "deck-arrive" | "deck-board" | "deck-prelaunch" | "deck-depart";
let rocketPhase: RocketPhase = "hub-board";
const rocketRoom = (code: number): string | undefined => ROOM_CODES.get(code);

/** The `2792` state a room should show right now, or null if the rocket is elsewhere. */
function rocketStateFor(code: number): number | null {
  const [where, what] = rocketPhase.split("-") as ["hub" | "deck", string];
  if ((code === ROCKET_HUB) !== (where === "hub")) return null;
  return { arrive: 3, board: 0, prelaunch: 1, depart: 2 }[what] ?? null;
}

function rocketSend(code: number, state: number): void {
  const room = rocketRoom(code);
  for (const occupant of occupantsOf(room)) {
    occupant.send(MSG.ROOM_ANIMATION_STATE, [{ int: 0 }, { int: state }], undefined);
  }
}

setQueueGate(HUB_ROCKET_GATE, () => rocketPhase === "hub-board");

/** Move riders to the other end: they arrive as the rocket does. */
function rocketCarry(riders: number[], to: number, arrive: number[]): void {
  for (const userId of riders) {
    const conn = liveByUser.get(userId);
    if (conn) conn.rideTo(to, arrive, `rocket to ${ROOM_NAMES.get(to) ?? to}`);
  }
}

function setRocketPhase(phase: RocketPhase, ms: number, next: () => void): void {
  rocketPhase = phase;
  const code = phase.startsWith("hub") ? ROCKET_HUB : ROCKET_DECK;
  const state = rocketStateFor(code);
  if (state !== null) rocketSend(code, state);
  console.log(`[rocket] ${phase} (${ms} ms)`);
  setTimeout(next, ms);
}

function runRocket(): void {
  // ⚠ LOOKED UP WHEN USED, not once per lap: the first lap starts while the
  // server is still booting, before the room-code table is loaded, so a name
  // taken here came back empty for that whole lap — its "boarding reopens"
  // nudge went to a room called "" and nobody in line was seated.
  const hub = (): string => rocketRoom(ROCKET_HUB) ?? "";
  const deck = (): string => rocketRoom(ROCKET_DECK) ?? "";
  setRocketPhase("hub-board", ROCKET_TIMINGS.board, () => {
    setRocketPhase("hub-prelaunch", ROCKET_TIMINGS.prelaunch, () => {
      // Seated riders leave with the rocket; the lines move up behind them.
      const riders = releaseSeats(hub(), HUB_ROCKET_GATE);
      if (riders.length) console.log(`[rocket] hub departs with ${riders.join(", ")}`);
      setRocketPhase("hub-depart", ROCKET_ANIM_MS.hubDepart, () => {
        rocketCarry(riders, ROCKET_DECK, DECK_ROCKET_ARRIVE);
        setRocketPhase("deck-arrive", ROCKET_ANIM_MS.deckArrive, () => {
          setRocketPhase("deck-board", ROCKET_TIMINGS.board, () => {
            setRocketPhase("deck-prelaunch", ROCKET_TIMINGS.prelaunch, () => {
              // Whoever is standing on the dock now is aboard.
              const aboard = occupantsOf(deck()).filter((o) => DECK_DOCK.includes(o.tile)).map((o) => o.userId);
              if (aboard.length) console.log(`[rocket] deck departs with ${aboard.join(", ")}`);
              setRocketPhase("deck-depart", ROCKET_ANIM_MS.deckDepart, () => {
                rocketCarry(aboard, ROCKET_HUB, HUB_ROCKET_ARRIVE);
                setRocketPhase("hub-arrive", ROCKET_ANIM_MS.hubArrive, () => {
                  runRocket();
                  nudgeQueues(hub()); // boarding is open again
                });
              });
            });
          });
        });
      });
    });
  });
}
runRocket();
console.log(
  `Monorail: ${MONORAIL_TRAIN_COUNT} train(s) on ${MONORAIL_STOPS.length} stops, ` +
    `approach ${MONORAIL_TIMINGS.approach / 1000}s / doors open ${MONORAIL_TIMINGS.stopped / 1000}s / ` +
    `leaving ${MONORAIL_TIMINGS.leaving / 1000}s / between ${MONORAIL_TIMINGS.between / 1000}s`,
);

/**
 * Display name of a room's owner.
 *
 * The visitor is usually not the owner, so this cannot come from the
 * connection — it has to be looked up from the account the room belongs to.
 */
function ownerNameFor(room: GuestRoom): string {
  const owner = getUserById(room.ownerId);
  return owner?.character_name ?? owner?.username ?? "";
}

/** How many rooms the navigator's Popular tab lists. */
const POPULAR_ROOMS_MAX = 30;

/** Credits per room ticket — the client's own `room.ticket.price` text (10). */
const ROOM_TICKET_PRICE = 10;
/** What selling one back returns — "You could get 2 credits back" (VMK wiki, Tickets). */
const ROOM_TICKET_SELL_PRICE = 2;

/**
 * One guest room as the navigator's room lists carry it (2031/2032/2033):
 * `int id, str name, str owner, str description, int friendsOnly,
 *  int accessFromNavi, int userCount, int maxUsers`.
 */
function guestSpaceEntry(room: GuestRoom, viewerId?: number): OutgoingParam[] {
  return [
    { int: room.id },
    { str: room.name },
    { str: ownerNameFor(room) },
    { str: room.description },
    /**
     * ⚠ The ENTRY STATE, not a boolean. `CGuestRoomNavigator.
     * createComponentWindow` colours the row by it — 1 friends (green),
     * 2 tickets (yellow), 3 friends+tickets (pink) — and gives 2/3 the
     * FastPass ticket icon. Sending 0/1 hid all of that.
     */
    { int: room.entryState },
    // 0 draws the row RED, the client's "you cannot go in" — only an
    // owner-only room is closed to every visitor regardless of who they are.
    { int: room.entryState === ENTRY_STATE.OWNER && viewerId !== room.ownerId ? 0 : 1 },
    { int: visibleCount(`guest:${room.id}`) },
    { int: ROOM_MAX_USERS },
  ];
}

/** Tiles that are taken, ignoring one user (yourself — you never block you). */
/**
 * How long a teleporter's out and in effects are HELD.
 *
 * ⚠ BY THE SOUND, NOT THE FRAMES. `CMagicFactor.PrepareFx` builds effect 6
 * (out) from 9 images and 7 (in) from 7, each listed 3 times — 27 and 21 movie
 * frames, ~1.1 s and ~0.9 s at 24 fps — but both lists are `#loop: 1`, so the
 * visual REPEATS for as long as the effect is held. What the effect actually
 * lasts is its sound: `PlayMagicSound` plays `teleport-2` (3.9 s) for 6 and
 * `teleport-4` (3.1 s) for 7, and any change of effect STOPS the sound
 * (`StopSound` on the switch and on clear). Timed by frames — first 900/700 ms,
 * then ~1.2/0.9 s — every teleport cut its audio off mid-way; the user heard it.
 *
 *   $env:VMK_TELEPORT_MS = "out,in"   # ms, to tune by ear
 */
/** A ride through a teleporter: the vehicle it carries on in, and how many hops so far. */
type RideHop = { vehicle: number; hops: number };
/**
 * Teleporters a single ride may pass through. Track that loops between pairs
 * (A -> B whose track leads back into A) would otherwise ride forever.
 */
const MAX_RIDE_HOPS = 16;

const [TELEPORT_OUT_MS, TELEPORT_IN_MS] =(process.env.VMK_TELEPORT_MS ?? "3900,3100")
  .split(",").map((ms) => Math.max(100, Number(ms) || 1000));

/**
 * When each magic pin (by inventory row) can be cast again. Module-level, so
 * reconnecting does not skip a recharge. See `magicTiming` in magic-pins.ts.
 */
const magicReadyAt = new Map<number, number>();

/** Candy Music Tiles A-G: step-on instruments. See `pressMusicTiles`. */
const MUSIC_TILES = new Set([1276, 1277, 1278, 1279, 1280, 1281, 1282]);
/** How long a struck tile stays lit — its note (`VMK-tile-A`..`G`) is about a second. */
const MUSIC_NOTE_MS = 1200;
const musicTileLitAt = new Map<number, number>();
const musicTileTimers = new Map<number, NodeJS.Timeout>();

function occupiedTiles(room: string | undefined, exceptUserId: number): Set<number> {
  const taken = new Set<number>();
  for (const occupant of occupantsOf(room)) {
    if (occupant.userId !== exceptUserId) taken.add(occupant.tile);
  }
  return taken;
}

/**
 * Tiles blocked by FURNITURE, from each item's footprint.
 *
 * A block with `WLK="1"` may be walked on (carpets, and the seat blocks you
 * have to reach to sit down); anything else is solid. Without this, items are
 * invisible to pathfinding and players walk straight through them.
 *
 * ⚠ `room` is the occupancy key (items are stored per room) but `geometry` is
 * the cast name (tile coordinates come from the casts). Passing one for the
 * other silently yields an empty set — no collision, no error.
 */
function furnitureTiles(room: string | undefined, geometry: string | undefined, walker?: number): Set<number> {
  const solid = new Set<number>();
  if (!room) return solid;
  for (const [ref, block] of surfaceOf(room, geometry, walker)) {
    if (!block.walk) solid.add(ref);
  }
  // Ride track is WLK="1" in the furnimap because the RIDE moves you over it,
  // but on foot only the start piece can be stepped on.
  for (const item of getRoomItems(room)) {
    if (!isRideTrack(item.typeCode)) continue;
    for (const tile of coveredTiles(geometry, item.tile, item.typeCode, item.dir).keys()) solid.add(tile);
  }
  return solid;
}

/**
 * The block an avatar would actually stand on, per tile — the TOP of the stack.
 *
 * ⚠ "Any block blocks" is the wrong rule, and it is what made stacking
 * impossible. Items stack: `CRoomHandler._CreateElements` walks a tile's
 * children to find the current stack depth and drops the new item on top, and
 * `_ComposeBlocks` does the same for every block of a multi-tile piece. So what
 * decides whether you can walk onto a tile is the SURFACE — the topmost block —
 * not the pile underneath it. A walkable platform over a solid crate is
 * walkable; the crate below is irrelevant once something sits on it.
 *
 * Stack order is placement order, which is ref order: `room_items.ref` is an
 * autoincrement, so a later ref sits higher. That mirrors the client, where the
 * newest item is the one appended to the tile's children.
 */
function surfaceOf(
  room: string | undefined,
  geometry: string | undefined,
  walker?: number,
): Map<number, FurniBlock> {
  const top = new Map<number, FurniBlock>();
  if (!room) return top;
  // Ascending ref = ascending stack, so later writes win.
  for (const item of getRoomItems(room).sort((a, b) => a.ref - b.ref)) {
    // A turnstile blocks or admits according to its STATE, and the furnimap
    // cannot express that: WLK is per facing, never per state. Its two blocks
    // are the post and the lane beside it, and the lane is already WLK="1" in
    // the map, so a turnstile left to the furnimap is permanently passable.
    //
    // State 0 is OPEN and state 1 is BARRED, which is the opposite of what the
    // numbering suggests. State 0 is the furnimap pose -- the arm standing
    // aside -- and the ANI's state 1 turns it ACROSS the lane. Getting this
    // backwards produces both halves of the reported symptom at once: the
    // barred turnstile lets you walk in, and the open one refuses you.
    const fee = FEE_TURNSTILES.has(item.typeCode);
    const gate = fee || PASSABLE_WHEN_OPEN.has(item.typeCode);
    const open =
      item.state === TURNSTILE_OPEN &&
      (item.ownerId !== null || (walker !== undefined && turnstileAdmitted.get(item.ref)?.has(walker) === true));
    const barred = fee ? !open && item.ownerId !== walker : item.state !== 0;
    const body = fee ? turnstileLane(geometry, item)?.body : undefined;
    for (const [ref, block] of coveredTiles(geometry, item.tile, item.typeCode, item.dir)) {
      const shut = fee ? barred && (body === undefined || ref === body) : barred;
      top.set(ref, gate ? { ...block, walk: fee ? !shut && block.walk : !shut } : block);
    }
  }
  return top;
}

function joinRoom(room: string, occupant: RoomOccupant): void {
  let here = roomOccupants.get(room);
  if (!here) {
    here = new Map();
    roomOccupants.set(room, here);
  }
  here.set(occupant.userId, occupant);
}

function leaveRoom(room: string | undefined, userId: number): void {
  if (!room) return;
  const here = roomOccupants.get(room);
  const leaving = here?.get(userId);
  if (!here?.delete(userId)) return;
  if (here.size === 0) roomOccupants.delete(room);
  // Tell everyone still there to remove the avatar, or it lingers forever —
  // everyone who could SEE it, that is: a ghost leaves without a trace.
  for (const other of here.values()) {
    if (!sees(other, leaving)) continue;
    other.send(MSG.REMOVE_AVATAR, [{ int: userId }], `RemoveAvatar ${userId}`);
  }
  // Left (or dropped) while on the Steamboat stage: lights and screen off.
  releasePodium(room, userId);
  // ...and out of any queue line, so the people behind move up.
  leaveQueue(room, userId);
  // A place came free: the full-room line (room-entry-queue.ts) gets it.
  roomFreed(room);
}

/**
 * THE STEAMBOAT STAGE. `vmk_steamboat_handler` (room 57) projects whoever
 * stands on the tile named `podium` onto the theatre screen: `2840
 * [avatarRef]` lights the stage and draws their figure, `2841` puts it out.
 * The client does all of that; the server only says who is up there.
 *
 * room name -> the userId on its podium. One tile, so one person at a time.
 */
const podiumHolders = new Map<string, number>();

function isPodium(geometryRoom: string | undefined, tile: number): boolean {
  return tileName(geometryRoom, tile) === "podium";
}

function claimPodium(room: string, userId: number): void {
  if (podiumHolders.get(room) === userId) return;
  podiumHolders.set(room, userId);
  for (const occupant of occupantsOf(room)) {
    occupant.send(MSG.STEAMBOAT_ENTER_PODIUM, [{ int: userId }], `EnterPodium ${userId}`);
  }
}

function releasePodium(room: string, userId: number): void {
  if (podiumHolders.get(room) !== userId) return;
  podiumHolders.delete(room);
  for (const occupant of occupantsOf(room)) {
    occupant.send(MSG.STEAMBOAT_EXIT_PODIUM, [], "ExitPodium");
  }
}

/**
 * Items placed in a room. Backed by the `room_items` table, so placements
 * survive a restart and carry an owner.
 *
 * Refs come from the table's AUTOINCREMENT, which keeps them unique across all
 * rooms — more than the client needs (it indexes per room) but it means a ref
 * identifies an item globally, which is what move and sell will want.
 */
interface PlacedItem {
  ref: number;
  typeCode: number;
  tile: number;
  dir: number;
  state: number;
  pair?: ItemPair;
  /** A poster: `tile` is then the wall ref, and this its position on it. */
  poster?: { x: number; y: number; z: number };
  /** "Let guests move this item" — the GUESTMOVE flag. See `CHANGE_ITEM_PROPERTIES`. */
  guestMove?: boolean;
}

const posterAsPlaced = (poster: RoomPoster): PlacedItem => ({
  ref: poster.ref,
  typeCode: poster.typeCode,
  tile: poster.wall,
  dir: 5,
  state: 0,
  poster: { x: poster.x, y: poster.y, z: poster.z },
  guestMove: poster.guestMove,
});

const asPlaced = (item: RoomItem): PlacedItem => ({
  ref: item.ref,
  typeCode: item.typeCode,
  tile: item.tile,
  dir: item.dir,
  state: item.state,
  pair: item.pair,
  guestMove: item.guestMove,
});

/**
 * A teleporter half's id as the client knows it, and its partner's.
 *
 * `CFurniPairedItemDelegate` highlights every item whose `PARAMS[3]` equals the
 * selected one's `PARAMS[2]`, so each half sends its own id second and its
 * partner's third. Derived from the pair so both halves agree without a lookup.
 */
const pairHalfId = (pair: ItemPair, half: number): number => pair.id * 2 + half;

/** `2586 _CreateElements` for a batch of items, in wire order. */
function createElements(items: PlacedItem[]): OutgoingParam[] {
  const params: OutgoingParam[] = [{ int: items.length }];
  for (const item of items) {
    if (item.poster) {
      // Category 3: `_CreateElements` reads x, y, z and hangs it on the wall
      // named by the place ref. The count covers exactly those three.
      params.push(
        { int: item.ref },
        { int: item.typeCode },
        { int: ITEM_CATEGORY_POSTER },
        { int: item.tile },
        { int: item.guestMove ? 1 : 0 }, // allowGuestMove; see the furniture note below
        { int: 3 },
        { int: item.poster.x },
        { int: item.poster.y },
        { int: item.poster.z },
      );
      continue;
    }
    params.push(
      { int: item.ref },
      { int: item.typeCode },
      { int: ITEM_CATEGORY_FURNITURE },
      { int: item.tile },
      // ⚠ GUESTMOVE = 0, counter-intuitively, or the item cannot be edited.
      // `CRoomElementControl.select` opens the control panel only when
      //     if t_bFurnish and not t_bGuestMove then
      // so a 1 here SUPPRESSES the panel entirely — permissions never even get
      // consulted, because `ControlRoom` is only read INSIDE that block to
      // decide whether the move button is enabled or dimmed.
      //
      // UPDATE: that reading was incomplete. With 1, the `else` branch of
      // `select` shows the GUEST panel instead: move and rotate work, and TAKE
      // AWAY is deactivated. Guests get that panel too (they get nothing at 0).
      // This is the owner's "Let guests move this item" (813), sent as stored.
      { int: item.guestMove ? 1 : 0 }, // allowGuestMove
      // dir + state; see CREATE_ELEMENTS on why this is 2 and not 0. A
      // teleporter half adds three more, which `_CreateElements` files as
      // `PARAMS`: [0, own half id, partner half id]. See `pairHalfId`.
      { int: item.pair ? 5 : 2 },
      { int: item.dir },
      { int: item.state },
    );
    if (item.pair) {
      params.push(
        { int: 0 },
        { int: pairHalfId(item.pair, item.pair.half) },
        { int: pairHalfId(item.pair, 1 - item.pair.half) },
      );
    }
  }
  return params;
}

/** Category 1 is ordinary furniture placed on a tile. */
const ITEM_CATEGORY_FURNITURE = 1;
/** Category 3 is a poster on a wall. */
const ITEM_CATEGORY_POSTER = 3;
/** "OVMK Photo": a camera photo hung on a wall is a poster of this type. */
const PHOTO_POSTER_TYPE = 3008;
/** Photos an album holds (`2767` capacity). Not documented; the wiki never hit it. */
const PHOTO_ALBUM_CAPACITY = Number(process.env.VMK_PHOTO_ALBUM_CAPACITY ?? 50);
/** "You will get 5 credits for every photo" (wiki, How to take a picture) — on delete. */
const PHOTO_DELETE_CREDITS = 5;

/** Shortest Jungle Cruise that is scored and paid (a quit can end one at once). */
const JC_MIN_REWARD_MS = 60_000;

/** Per-connection message budget: see `runClientMessage`. */
const COMMAND_BURST = 300;
const COMMAND_RATE = 60;

/**
 * Guest room name and description limits: `CRoomInfoInterface` and
 * `CCatalogRoomsView` stop at these and show `reg.roomname.toolong` /
 * `reg.roomdesc.toolong`. Both are listed to everyone in the navigator.
 */
const ROOM_NAME_MAX = 30;
const ROOM_DESC_MAX = 255;

/** Most ints a figure message is read for (a real one is 12–14). */
const FIGURE_INTS_MAX = 32;

/** Most of a client-supplied body or string any log line repeats. */
const LOG_BODY_MAX = 512;

/** Most pins a lanyard holds: `CInvPagePins` greys WEAR at 15 worn. */
const MAX_WORN_PINS = 15;

/** A pin's stars: its stored level, else what it starts at (1 magic, 0 ordinary). */
const pinLevel = (row: { typeCode: number; level?: number }): number =>
  row.level ?? startingLevel(row.typeCode);

/**
 * Show owned furniture in the inventory grid.
 *
 * `VMK_INV_FURNITURE=off` hides it. That is an escape hatch, not the intended
 * state: picked-up and purchased furniture still persists in `items` either
 * way, it is simply not advertised.
 */
const INV_FURNITURE = process.env.VMK_INV_FURNITURE !== "off";
/**
 * `VMK_INV_FURNITURE=previewable` advertises only furniture the shop/inventory
 * grid can actually draw a thumbnail for.
 *
 * ⚠ A DIAGNOSTIC, not a setting. Measured: with furniture off the clothing tab
 * works; with it on the clothing tab spins and the client reports a bare
 * "Object expected". Of the five furniture items in the test inventory, three
 * (41, 118, 126) have no TILESIZE in the furnimap and fail `previewable()`,
 * and those three are the ones whose thumbnails render as fragments. This
 * narrows "furniture breaks the grid" to "UNDRAWABLE furniture breaks the
 * grid" — or refutes it, which is just as useful.
 */
const INV_FURNITURE_PREVIEWABLE_ONLY = process.env.VMK_INV_FURNITURE === "previewable";
/**
 * `VMK_INV_FURNITURE=<n>` advertises at most n furniture rows, unfiltered.
 *
 * ⚠ The A/B against `previewable`. Filtering to previewable items fixed the
 * clothing tab — but it also cut the row count from 5 to 2, and the items it
 * removed DO draw when placed. So "undrawable furniture breaks the grid" and
 * "too many furniture rows break the grid" both explain the result equally
 * well. This knob holds the count fixed while changing WHICH items are sent,
 * which separates them: if 2 undrawable rows are fine, it was never
 * drawability.
 */
const INV_FURNITURE_LIMIT = Number.isInteger(Number(process.env.VMK_INV_FURNITURE))
  ? Number(process.env.VMK_INV_FURNITURE)
  : null;

/**
 * Gap between the messages answering one `GET_ITEM_LIST`.
 *
 * ⚠ A mitigation for client behaviour, not a protocol requirement. Each `2532`
 * makes `_ReceiveItemList` update all four category buckets, and every page
 * then starts its own asynchronous thumbnail load — so answering with five
 * messages at once produced up to fourteen page updates in a single network
 * read, and the grid did not survive it reliably. `VMK_INV_STAGGER_MS=0`
 * restores the burst, which is the way to check this still earns its keep.
 */
const INV_STAGGER_MS = Number(process.env.VMK_INV_STAGGER_MS ?? 250);

/**
 * Window within which a REPEAT request for the same catalogue page is ignored.
 *
 * ⚠ Not a delay — a de-duplicator, and the difference matters. Pacing replies
 * was tried and made things worse: the client asked for page 1 nine times in
 * 2.5 seconds, and holding each reply back only let the backlog grow (the
 * measured gap climbed 250ms -> 469ms as it fell further behind). Deferring
 * work cannot reduce work.
 *
 * Collapsing the duplicates does. The client gets its answer immediately the
 * first time and the storm is absorbed, so nothing waits and nothing repeats.
 *
 * `VMK_SHOP_DEDUPE_MS=0` answers every request, including duplicates.
 */
const SHOP_DEDUPE_MS = Number(process.env.VMK_SHOP_DEDUPE_MS ?? 1500);

/**
 * Command id reserved for a PATCHED client to report its own errors.
 *
 * Not part of VMK's protocol — 999 appears in no `registerCommands` table in
 * any cast, so it cannot collide with a real message.
 */
const CMD_CLIENT_DEBUG = 999;

/**
 * Furniture that opens a CONFIGURATION dialog instead of toggling a state,
 * mapped to the keys its dialog reads.
 *
 * ⚠ Only the turnstile is here, and that is a limit of the evidence rather than
 * a choice. The keys come from `CRoomItemEntranceFeeTurnStile`, whose
 * `createItemConfigurationDialog` reads exactly `fee` and `credits` (the fee
 * radio offers FREE / 5 / 25 / 50, from turnstile.prize1..4).
 *
 * The Random Number Generator and Scoreboard classes are NOT in the decompiled
 * export — only `CRoomItemEntranceFeeTurnStile` and a generic
 * `CRoomItemProximityConfig` are — so their key names are unknown and guessing
 * them would produce a dialog with empty fields. See the note in the handler.
 *
 * ⚠ Turnstiles also only respond in a GUEST ROOM at all: their `select` is
 * wrapped in `if getObject(#session).get("RoomType") = #private`. In a public
 * space a double-click does nothing, by design.
 */
/**
 * How long after a `584 UseItem` a second one for the same item is the SAME
 * double-click rather than a new one.
 *
 * Director's own double-click interval is the OS setting, typically 250-500ms;
 * 400 covers it while still letting a determined player click a scoreboard up
 * at better than two a second.
 */
const USE_DEBOUNCE_MS = Number(process.env.VMK_USE_DEBOUNCE_MS ?? 400);
/** ref -> when it was last used. See the note at the 584 handler. */
const lastUse = new Map<number, number>();
/** Dark-ride scenery: last click, and whether this double-click already opened the editor. */
const lastProximityUse = new Map<number, { at: number; dialog: boolean }>();

/**
 * Items whose blocked tiles open up once they are in a non-zero state.
 *
 * Turnstiles, and only turnstiles: a turnstile exists to be passed through, and
 * its whole point is that the barrier is conditional. Nothing else on the map
 * should change what it blocks when it changes state — a lit candlestick is
 * still a candlestick.
 *
 * ⚠ Deliberately NOT derived from `CONFIGURABLE`, even though the two currently
 * hold the same codes. They mean different things, and an item that gains a
 * settings dialog later must not silently become walkable.
 */
const PASSABLE_WHEN_OPEN = new Set([41, 90, 124, 125, 126]);

const FEE_TURNSTILES = new Set([502, 524, 525, 526, 581, 586]);
const TURNSTILE_SHUT = 1;
const TURNSTILE_OPEN = 2;
const TURNSTILE_OPEN_MS = Number(process.env.VMK_TURNSTILE_OPEN_MS ?? 5000);
const turnstileTimers = new Map<number, ReturnType<typeof setTimeout>>();
const turnstileAdmitted = new Map<number, Set<number>>();
const TURNSTILE_FEES = [0, 5, 25, 50];
const DARK_RIDE_REWARD_PIN = 12242;
const DARK_RIDE_BOARD_MS = 1200;
const DARK_RIDE_FIRST_HOLD_MS = Number(process.env.VMK_DARK_RIDE_FIRST_HOLD_MS ?? 1000);
const DARK_RIDE_SCENE_HOLD_MS = Number(process.env.VMK_DARK_RIDE_SCENE_HOLD_MS ?? 500);
const DARK_RIDE_PRELOAD = process.env.VMK_DARK_RIDE_PRELOAD !== "0";
const DARK_RIDE_PIN_CHANCE = Number(process.env.VMK_DARK_RIDE_PIN_CHANCE ?? 1 / 3);

const SWORD_TILE = 313;
const SWORD_REACH = 2;
const SWORD_CHANCE = Number(process.env.VMK_SWORD_CHANCE ?? 1 / 3);
const SWORD_SUCCESS_MS = Math.round((250 - 5 + 1) / 24 * 1000);
const SWORD_FAILURE_MS = Math.round((330 - 251 + 1) / 24 * 1000);
const SWORD_STATE = { idle: 0, success: 1, failure: 2 } as const;
const swordBusyUntil = new Map<string, number>();

/**
 * The Pirate Treasure Room (88): a treasure key opens its own chest. Players
 * wore the key, stood by the chest and cast it (menu or "yohosilver!"); the
 * chest opened, "sometimes (but not always!) giving you a prize" (DIS boards,
 * 2007). Bronze is the right chest, silver the left, gold the middle (lower
 * left on screen). `anim` is the chest's ref in `CTreasureRoomComponent`
 * (1 left, 2 middle, 0 right); `tile` is the tile the room puts on each chest.
 *
 * Prizes: the November 2007 list (DIS boards, "List Of POTC Treasure Chest
 * Prizes"). Disney rotated them with the month's theme; this is one month's.
 * The odds of an empty chest are lost — "Empty, Empty, Empty", with gold
 * emptier less often — so EMPTY is tuned, not recovered.
 */
const TREASURE_ROOM = 88;
const CHEST_REACH = 2;
/** The open animation (`*_chest_treasure` / `*_chest_empty`), then it shuts. */
const CHEST_OPEN_MS = 6000;
const CHEST_STATE = { closed: 0, treasure: 1, empty: 2 } as const;
const TREASURE_CHESTS: Record<1 | 2 | 3, { name: string; tile: number; anim: number; empty: number; prizes: SwordPrize[] }> = {
  1: {
    name: "bronze",
    tile: 358,
    anim: 0,
    empty: 0.5,
    prizes: [
      { name: "100 Credits", credits: 100 },
      { name: "a Pirate Throne", items: [142], category: ITEM_CATEGORY.items },
      { name: "a Pirate Throne", items: [143], category: ITEM_CATEGORY.items },
      { name: "a Pirate Throne", items: [140], category: ITEM_CATEGORY.items },
      { name: "a Pirate Throne", items: [141], category: ITEM_CATEGORY.items },
    ],
  },
  2: {
    name: "silver",
    tile: 362,
    anim: 1,
    empty: 0.4,
    prizes: [
      { name: "300 Credits", credits: 300 },
      { name: "a Pirate Maze Cannon Wall", items: [449], category: ITEM_CATEGORY.items },
      { name: "a Pirate Maze Wall", items: [448], category: ITEM_CATEGORY.items },
    ],
  },
  3: {
    name: "gold",
    tile: 360,
    anim: 2,
    empty: 0.3,
    prizes: [
      { name: "500 Credits", credits: 500 },
      { name: "a Pirate Maze Turret", items: [450], category: ITEM_CATEGORY.items },
      { name: "a Pirate Hat", items: [41018], category: ITEM_CATEGORY.clothes },
      { name: "a Turn Into Coral Magic Pin", items: [2143], category: ITEM_CATEGORY.pins },
      { name: "a Pirate Maze Cannon Wall", items: [449], category: ITEM_CATEGORY.items },
      { name: "a Pirate Maze Wall", items: [448], category: ITEM_CATEGORY.items },
    ],
  },
};
/** Per room name and chest: open until. */
const chestBusyUntil = new Map<string, number>();

interface SwordPrize {
  name: string;
  credits?: number;
  items?: number[];
  category?: number;
}

const SWORD_PRIZES: SwordPrize[] = [
  { name: "10 Credits", credits: 10 },
  { name: "Mad Tea Party Pin", items: [2252], category: ITEM_CATEGORY.pins },
  { name: "Casey Jr. Pin", items: [2251], category: ITEM_CATEGORY.pins },
  { name: "It's A Small World Pin", items: [2254], category: ITEM_CATEGORY.pins },
  { name: "Matterhorn Pin", items: [2255], category: ITEM_CATEGORY.pins },
  { name: "Thanksgiving '07 Pin", items: [2347], category: ITEM_CATEGORY.pins },
  { name: "Turn Into Coral Magic Pin", items: [2143], category: ITEM_CATEGORY.pins },
  { name: "Mr. Toad's Car Magic", items: [2386], category: ITEM_CATEGORY.pins },
  { name: "Inner-Space Suit Green Magic Pin", items: [2137], category: ITEM_CATEGORY.pins },
  { name: "Test Track Car Magic", items: [2385], category: ITEM_CATEGORY.pins },
  { name: "Lagoonagator Hat", items: [41077], category: ITEM_CATEGORY.clothes },
  { name: "Figment Hat", items: [41066], category: ITEM_CATEGORY.clothes },
  { name: "Tiki Totem Topper", items: [1321], category: ITEM_CATEGORY.items },
  { name: "Mission Space Costume", items: [41002, 44210, 46000, 48002], category: ITEM_CATEGORY.clothes },
];

function turnstileFee(config: Record<string, string>): number {
  const fee = Number(config.fee);
  return Number.isInteger(fee) && fee > 0 ? fee : 0;
}

function turnstileLane(
  geometry: string | undefined,
  item: RoomItem,
): { plate: number; body: number; beyond: number | null } | null {
  const tiles = [...coveredTiles(geometry, item.tile, item.typeCode, item.dir).keys()];
  if (tiles.length !== 2) return null;
  const [a, b] = tiles;
  const lane =
    directionBetween(geometry, a, b) === item.dir ? { plate: a, body: b }
    : directionBetween(geometry, b, a) === item.dir ? { plate: b, body: a }
    : null;
  return lane ? { ...lane, beyond: tileToward(geometry, lane.body, item.dir) } : null;
}

function turnstileStepRule(
  room: string | undefined,
  geometry: string | undefined,
): ((from: number, to: number) => boolean) | undefined {
  if (!room) return undefined;
  const lanes = getRoomItems(room)
    .filter((i) => FEE_TURNSTILES.has(i.typeCode))
    .map((i) => ({ dir: i.dir, lane: turnstileLane(geometry, i) }))
    .filter((l): l is { dir: number; lane: NonNullable<ReturnType<typeof turnstileLane>> } => l.lane !== null);
  if (lanes.length === 0) return undefined;
  return (from, to) => {
    for (const { dir, lane } of lanes) {
      if (from !== lane.body && to !== lane.body) continue;
      if (directionBetween(geometry, from, to) !== dir) return false;
      if (to === lane.body && from !== lane.plate) return false;
    }
    return true;
  };
}

function setTurnstile(item: RoomItem, state: number): void {
  clearTimeout(turnstileTimers.get(item.ref));
  turnstileTimers.delete(item.ref);
  setRoomItemState(item.ref, state);
  broadcastState(item, state);
}

function admitThroughTurnstile(item: RoomItem, geometry: string | undefined, userId?: number): void {
  if (userId !== undefined) {
    const admitted = turnstileAdmitted.get(item.ref) ?? new Set<number>();
    admitted.add(userId);
    turnstileAdmitted.set(item.ref, admitted);
  }
  if (item.state === TURNSTILE_OPEN) clearTimeout(turnstileTimers.get(item.ref));
  else setTurnstile(item, TURNSTILE_OPEN);
  scheduleTurnstileClose(item.ref, item.room, geometry, TURNSTILE_OPEN_MS);
}

function scheduleTurnstileClose(ref: number, room: string, geometry: string | undefined, delay: number): void {
  turnstileTimers.set(ref, setTimeout(() => {
    turnstileTimers.delete(ref);
    const still = getRoomItem(ref);
    if (!still || still.room !== room || still.state !== TURNSTILE_OPEN) return;
    const standing = occupiedTiles(room, -1);
    const lane = coveredTiles(geometry, still.tile, still.typeCode, still.dir);
    if ([...lane.keys()].some((t) => standing.has(t))) {
      scheduleTurnstileClose(ref, room, geometry, 500);
      return;
    }
    turnstileAdmitted.delete(ref);
    setRoomItemState(still.ref, TURNSTILE_SHUT);
    broadcastState(still, TURNSTILE_SHUT);
  }, delay));
}

/**
 * Tell everyone in the item's room that it is now in `state`.
 *
 * ⚠ paramCount must be 2, not 1. `CRoomHandler._UpdateElement` only reaches
 * `setState` inside `if t_iParamCnt > 1`, then reads paramCnt-1 further ints
 * after the direction. A 1 here — which is what move and rotate send — carries
 * the direction and nothing else, so the state would change on the server and
 * never on screen.
 */
function broadcastState(item: RoomItem, state: number): void {
  const params: OutgoingParam[] = [
    { int: item.ref },
    { int: ITEM_CATEGORY_FURNITURE },
    { int: item.tile },
    // ⚠ Must be the STORED flag: `_UpdateElement` overwrites GUESTMOVE with it,
    // so a hard 0 here quietly unticked "Let guests move" on every state change.
    { int: item.guestMove ? 1 : 0 }, // allowGuestMove
    { int: 2 }, // dir + state
    { int: item.dir },
    { int: state },
  ];
  for (const occupant of occupantsOf(item.room)) {
    occupant.send(MSG.UPDATE_ELEMENT, params, undefined);
  }
}

/**
 * How long a piece that loops FOREVER keeps going after someone last stepped
 * into its zone. Most ride pieces instead carry a loop count and stop by themselves
 * (see `playDurationMs`); this is only for the rest. State 0 makes
 * `CRoomItemStateAnimator` stop the piece's sound, so it must outlast that.
 */
const RIDE_TRIGGER_HOLD_MS = Number(process.env.VMK_RIDE_TRIGGER_HOLD_MS ?? 6000);
/** ref -> the pending switch back to state 0. Items are shared, so this is global. */
const rideTriggerTimers = new Map<number, ReturnType<typeof setTimeout>>();

/**
 * Someone — walking or riding — stepped onto `tile`: switch on every dark-ride
 * piece whose "Animation Area" covers it. See ride-triggers.ts.
 *
 * ⚠ A piece with a LOOP count plays once and the client puts it back to state 0
 * itself. The server must follow at the same moment: left at 1, the next person
 * into the zone would be ignored (it is "already playing") while the client
 * shows it at rest. A piece that loops forever is held on while people keep
 * stepping into its zone and switched off `RIDE_TRIGGER_HOLD_MS` after.
 */
function fireRideTriggers(room: string, geometryRoom: string | undefined, tile: number): void {
  for (const item of getRoomItems(room)) {
    if (!PROXIMITY_ITEMS.has(item.typeCode)) continue;
    const zone = proximityZone(geometryRoom, item, proximityConfig(getRoomItemConfig(item.ref)));
    if (!zone.has(tile)) continue;
    const plays = playDurationMs(item.typeCode, 1);
    if (item.state === 1) {
      if (plays > 0) continue; // mid-play; it ends on its own
    } else {
      setRoomItemState(item.ref, 1);
      broadcastState(item, 1);
      console.log(
        `[ride] trigger ref=${item.ref} type=${item.typeCode} (${animationNameOf(item.typeCode)}) at tile ${tile}` +
          (plays > 0 ? `, plays ${plays}ms` : ", held while the cart is near"),
      );
    }
    clearTimeout(rideTriggerTimers.get(item.ref));
    rideTriggerTimers.set(item.ref, setTimeout(() => {
      rideTriggerTimers.delete(item.ref);
      const still = getRoomItem(item.ref);
      if (!still || still.room !== room || still.state === 0) return;
      setRoomItemState(still.ref, 0);
      // Already at rest on screens that watched it play; this is for anyone
      // who entered mid-play and for the server's own record.
      broadcastState(still, 0);
    }, plays > 0 ? plays : RIDE_TRIGGER_HOLD_MS));
  }
}

const CONFIGURABLE = new Map<number, string[]>([
  // Disneyland Retro Turnstile: green, purple, red, blue, gold.
  [41, ["fee", "credits"]],
  [124, ["fee", "credits"]],
  [125, ["fee", "credits"]],
  [126, ["fee", "credits"]],
  [90, ["fee", "credits"]],
]);

/** Bounds on a configure message's `(key, value)` pairs. */
const CONFIG_PAIRS_MAX = 16;
const CONFIG_TEXT_MAX = 64;

/**
 * What a player may store from a configure message: only the keys the item's
 * dialog shows, never `credits` (the server's own tally).
 *
 * ⚠ The raw patch used to be MERGED into `config_json` whatever its keys, so
 * each forged frame grew one row by megabytes until `JSON.stringify` threw.
 * Returns null for an item with nothing to configure.
 */
function settableConfig(typeCode: number, patch: Record<string, string>): Record<string, string> | null {
  const keys = CONFIGURABLE.get(typeCode)?.filter((k) => k !== "credits");
  if (!keys) return null;
  const clean = Object.fromEntries(keys.filter((k) => k in patch).map((k) => [k, patch[k]]));
  return Object.keys(clean).length > 0 ? clean : null;
}

/**
 * "Invisible Public Room Chair With Height Zero" — furnimap type code 283.
 *
 * This is how Disney made a bench that is PAINTED INTO THE BACKGROUND sittable:
 * the scenery is art, and an invisible zero-height chair is placed on the tile
 * to carry the behaviour. "Height Zero" matters — a normal chair would raise
 * the avatar off the drawn bench.
 */
const SEAT_TYPE_CODE = Number(process.env.VMK_SEAT_TYPE ?? 283);

interface SeatTile {
  tile: number;
  /** Fixed facing from a `sit_10_dir_N` marker, or null for "any". */
  dir: number | null;
  z: number;
  /** The invisible seat for this tile's height (tools/extract-room-seats.mjs). */
  item?: number;
}

/**
 * How a room seat carries its height.
 *
 * Disney made one invisible seat per height — 66 (HGT 10), 86 (20), 87 (30),
 * 283 (0) — and the tile names say which (`sit10`, `sit20`). Each seat tile
 * gets its matching item, and the avatar stands ON it (stack 1) so the item's
 * HGT lifts them onto the bench. CHECKED BY EYE 2026-09-25 on the Esplanade
 * benches, the Drive-In cars and the steamboat theatre: all sit right, even
 * though those rooms' seat tiles disagree about how raised they already are.
 * (Placing 283 everywhere at stack 0 sat everyone on the floor.)
 *
 *   $env:VMK_SEAT_HEIGHT = "floor"   # the old behaviour, for comparison
 */
const SEAT_HEIGHT_MODE = process.env.VMK_SEAT_HEIGHT === "floor" ? "floor" : "height";

/**
 * Seat tiles per room, from `assets/room-seats.json`.
 *
 * ⚠ Disney marked these on the tile's NAME attribute (`sit10`,
 * `sit_10_dir_5`), NOT its CLASS. Surveying CLASS values alone concludes that
 * public rooms have no seats at all, which is wrong — see
 * tools/extract-room-seats.mjs.
 */
const roomSeats = new Map<string, SeatTile[]>();
{
  const file = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "room-seats.json");
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8")) as {
      rooms?: Record<string, SeatTile[]>;
    };
    for (const [room, seats] of Object.entries(parsed.rooms ?? {})) {
      roomSeats.set(room, seats);
    }
    const total = [...roomSeats.values()].reduce((n, s) => n + s.length, 0);
    console.log(`Seats: ${total} tile(s) across ${roomSeats.size} room(s) (type ${SEAT_TYPE_CODE})`);
  } catch {
    console.log("Seats: none — assets/room-seats.json missing (run tools/extract-room-seats.mjs)");
  }
}

/**
 * Invisible chairs for a room, as placeable items.
 *
 * Refs are taken from a HIGH block so they cannot collide with anything a
 * player places; the client indexes elements by ref and a clash would replace
 * a seat with furniture, or vice versa.
 */
/**
 * The sit pose, as the legs field of the action array.
 *
 * From `CAvatarAnimatorRenderer.ActLeftFoot`: 1 walks, 2 dances, and **3, 4, 6,
 * 8 and 9 all sit** (5/7/10/11 hide the legs, anything else stands). So sitting
 * is entirely ours to drive — it needs no item, no `CLASS` param on the tile,
 * and no `CRoomObjectType` class binding, all of which live client-side.
 *
 * That matters because placing type 283 DOES put the invisible chair in the
 * room, but the client never attaches `CRoomItemSitBlock` to it — the class
 * binding is missing from every variables file we serve — so the chair is inert
 * scenery. Driving the pose from here sidesteps that entirely.
 */
const LEGS_SIT = 3;

/**
 * THE WATERPARK POOL (room 85, space `shark_reef`). Its layout has five
 * floors: the `pool`, a raised `front_floor` deck with the doors, a tiny
 * dressing room, and two one-tile floors that are the tops of the slides,
 * `Left_slide_1` and `Right_slide_1`, which connect to nothing. Players do
 * not climb the slides: they ARRIVE at the top of one, ride
 * `_1 -> _2 -> _3` into the pool ("work on your splash landing", room.85.desc),
 * and swim.
 *
 * The room's only script, `CSharkReefHandler`, takes `2792 [n]` and plays
 * splash `vmk_anim_1` (n = 0) or `vmk_anim_2` (n = 1) with "SR-fallintowater".
 * Those animations sit exactly at `Left_slide_3` and `Right_slide_3`.
 */
const WATERPARK_POOL = "shark_reef";
const WATERPARK_SLIDES = [
  { top: "Left_slide_1", mid: "Left_slide_2", bottom: "Left_slide_3", splash: 0 },
  { top: "Right_slide_1", mid: "Right_slide_2", bottom: "Right_slide_3", splash: 1 },
];
/** One slide tile per step; about the client's 500 ms hop, a little quicker. */
const SLIDE_STEP_MS = Number(process.env.VMK_SLIDE_STEP_MS ?? 450);
/** Slides are used in turn, so a crowd arriving together splits between them. */
let nextSlide = 0;
/** A tile on a floor with this name swims (magic 20, `CSwimmerAvatarRender`). */
const SWIM_FLOOR = "pool";
const SWIM_EFFECT = 20;

/**
 * THE INNER-SPACE SHRINKING MACHINE (room 81). Its `spacewalk` floor is
 * reached from the `gateplatform` across the red gate (`gate` tiles 29/30,
 * linked to 184/185), and only in an Inner-Space Suit: pin magic 18, the
 * space walk. The room's handler only drives the gate's light (below), so
 * nothing in the client enforces this; Disney's texts give the rules — 4588
 * at the gate, 4594 for teleporting out there, 4530/4532 for ending the suit
 * in space.
 */
const SPACEWALK_FLOOR = "spacewalk";
/** The tiles between the gate's posts: already past it, suit only. */
const SPACE_GATE = "gate";
const SPACE_SUIT_EFFECT = 18;
/**
 * The gate's red force field, `2792 [1, state]` (0 shown, 1 hidden): hidden
 * only on the screen of a suited player standing in the gate, and back as they
 * step through. The handler is Disney's file archived
 * as `vmk_grotto_handler.cct` (`CNautilusGrottoComponent.HandleGate`): its
 * `vmk_anim_9`/`10` are this room's red gate pieces, and the Grotto's sharks
 * and bubbles. Served as room 81's handler from assets/patches.
 */
const SPACE_GATE_ANIM = 1;

/** The seat on a tile, if it is one. */
function seatAt(room: string | undefined, tile: number): SeatTile | null {
  if (!room) return null;
  return (roomSeats.get(room) ?? []).find((s) => s.tile === tile) ?? null;
}

/**
 * Type codes that are somewhere to sit.
 *
 * Derived from the item NAMES, because nothing in the furnimap marks an item as
 * a seat — `<ITEM>` carries only CASTS/CODE/STK/TILESIZE, and the behaviour
 * lives in a client-side class binding we cannot read. The names are Disney's
 * own and consistent ("Asteroid Chair", "Crater Couch", "Barrel Seat"), so they
 * are the most reliable signal available.
 *
 * ⚠ Heuristic, and deliberately so. A false positive sits someone on a table;
 * a false negative leaves a chair inert. Both are recoverable, and the
 * alternative is a hand-maintained list of hundreds of codes.
 */
let cachedSeatTypes: Set<number> | null = null;
function seatTypeCodes(): Set<number> {
  if (cachedSeatTypes) return cachedSeatTypes;
  const codes = new Set<number>([SEAT_TYPE_CODE]);
  const file = downloadFile("furnituremaps.0-99_2");
  try {
    if (!file) throw new Error("furnituremaps.0-99_2 not found");
    const xml = readFileSync(file, "latin1");
    // An item is sittable if ANY of its blocks carries SIT, in any direction.
    for (const item of xml.matchAll(/<ITEM\s([^>]*)>([\s\S]*?)<\/ITEM>/g)) {
      if (!/\bSIT="/.test(item[2])) continue;
      const code = Number(/CODE="(\d+)"/.exec(item[1])?.[1]);
      if (Number.isInteger(code)) codes.add(code);
    }
    console.log(`Seat types: ${codes.size} furniture code(s) with a SIT block`);
  } catch {
    console.log("Seat types: furnimap unreadable — only the invisible chair sits");
  }
  cachedSeatTypes = codes;
  return cachedSeatTypes;
}

/**
 * NPC "directors": while anyone is in a room with an NPC, the NPC does
 * something every 25-50 s — one of its animations (`2792`), with a speech
 * bubble (`2598`) when that animation is a speaking one. The NPC casts only
 * ever REACT to these; with nothing sent they idle forever.
 *
 * One timer per room bucket, stopped by the first tick that finds the room
 * empty, so an unvisited room costs nothing.
 */
const npcDirectors = new Map<string, NodeJS.Timeout>();
function ensureNpcDirector(roomBucket: string, roomCode: number): void {
  const npcs = npcsInRoom(roomCode).filter((n) => !n.roams && n.moves.length > 0);
  if (npcs.length === 0 || npcDirectors.has(roomBucket)) return;
  const schedule = (ms: number) => npcDirectors.set(roomBucket, setTimeout(tick, ms));
  const tick = () => {
    const audience = occupantsOf(roomBucket);
    if (audience.length === 0) {
      npcDirectors.delete(roomBucket);
      return;
    }
    for (const npc of npcs) {
      const ref = NPC_REF_BASE + npc.code;
      const state = npc.moves[Math.floor(Math.random() * npc.moves.length)];
      for (const o of audience) o.send(MSG.ROOM_ANIMATION_STATE, [{ int: ref }, { int: state }], undefined);
      if (npc.speaks.includes(state) && npc.chatter.length > 0) {
        const line = npc.chatter[Math.floor(Math.random() * npc.chatter.length)];
        // Empty name: the client falls back to `item.<type>`, the NPC's name.
        const chat: OutgoingParam[] = [{ int: ref }, { str: wireText(line) }, { str: "" }];
        for (const o of audience) o.send(MSG.ELEMENT_CHAT, chat, undefined);
      }
    }
    schedule(25_000 + Math.random() * 25_000);
  };
  schedule(6_000 + Math.random() * 6_000);
}

/**
 * The Haunted Mansion ghosts, one per room bucket (ghosts.ts). Created on the
 * first visit and kept, so the ghost's tile survives an empty room; it rests
 * hidden until someone comes back.
 */
const ghosts = new Map<string, Ghost>();
function ghostFor(roomBucket: string, geometryRoom: string | undefined, npc: Npc): Ghost {
  const key = `${roomBucket}#${npc.code}`;
  let ghost = ghosts.get(key);
  if (ghost) return ghost;
  const tiles = roomTiles(geometryRoom);
  const neighbours = new Map(tiles.map((t) => [t.ref, t.neighbours]));
  const ref = NPC_REF_BASE + npc.code;
  const everyone = (msg: number, params: OutgoingParam[]) => {
    for (const o of occupantsOf(roomBucket)) o.send(msg, params, undefined);
  };
  ghost = new Ghost(
    npc,
    {
      // Floor it could walk on, but never a doorway.
      tiles: tiles.filter((t) => t.neighbours.length > 0 && exitIdAt(geometryRoom, t.ref) === null).map((t) => t.ref),
      neighbours: (tile) => neighbours.get(tile) ?? [],
    },
    {
      occupied: () => occupantsOf(roomBucket).length > 0,
      state: (state) => everyone(MSG.ROOM_ANIMATION_STATE, [{ int: ref }, { int: state }]),
      // `_UpdateElement`: a new place ref, dir only.
      move: (tile) =>
        everyone(MSG.UPDATE_ELEMENT, [
          { int: ref },
          { int: ITEM_CATEGORY_FURNITURE },
          { int: tile },
          { int: 0 }, // allowGuestMove
          { int: 1 }, // dir only
          { int: 0 },
        ]),
      // Empty name: the client falls back to `item.<type>`, the ghost's name.
      chat: (line) => everyone(MSG.ELEMENT_CHAT, [{ int: ref }, { str: wireText(line) }, { str: "" }]),
    },
  );
  ghosts.set(key, ghost);
  return ghost;
}

/** The Blue Bayou's Gator Waiter, one per room bucket (gator-waiter.ts). */
const waiters = new Map<string, GatorWaiter>();
function waiterFor(roomBucket: string, geometryRoom: string | undefined, npc: Npc): GatorWaiter {
  let waiter = waiters.get(roomBucket);
  if (waiter) return waiter;
  const ref = NPC_REF_BASE + npc.code;
  const neighbours = new Map(roomTiles(geometryRoom).map((t) => [t.ref, t.neighbours]));
  const seatTiles = () => new Set(getRoomItems(roomBucket).filter((i) => i.typeCode === SEAT).map((i) => i.tile));
  const blocked = () => {
    const solid = furnitureTiles(roomBucket, geometryRoom);
    for (const t of occupiedTiles(roomBucket, -1)) solid.add(t);
    for (const t of seatTiles()) solid.add(t);
    return solid;
  };
  waiter = new GatorWaiter(
    npc.tile,
    npc.dir ?? 0,
    {
      occupied: () => occupantsOf(roomBucket).length > 0,
      items: () => getRoomItems(roomBucket),
      route: (from, to) => {
        const solid = blocked();
        solid.delete(to);
        return findPath(geometryRoom, from, to, solid);
      },
      direction: (from, to) => directionBetween(geometryRoom, from, to),
      distance: (a, b) => tilesApart(geometryRoom, a, b),
      footprint: (table) => {
        const covered = [...coveredTiles(geometryRoom, table.tile, table.typeCode, table.dir).keys()];
        return covered.length ? covered : [table.tile];
      },
      standable: (tile) => neighbours.has(tile) && !blocked().has(tile) && exitIdAt(geometryRoom, tile) === null,
      neighbours: (tile) => neighbours.get(tile) ?? [],
    },
    {
      // `_UpdateElement` with dir AND state: the gator's handler reads both.
      gator: (tile, dir, action) => {
        const params: OutgoingParam[] = [
          { int: ref },
          { int: ITEM_CATEGORY_FURNITURE },
          { int: tile },
          { int: 0 }, // allowGuestMove
          { int: 2 }, // dir + state
          { int: dir },
          { int: action },
        ];
        for (const o of occupantsOf(roomBucket)) o.send(MSG.UPDATE_ELEMENT, params, undefined);
      },
      chat: (line) => {
        const chat: OutgoingParam[] = [{ int: ref }, { str: wireText(line) }, { str: "" }];
        for (const o of occupantsOf(roomBucket)) o.send(MSG.ELEMENT_CHAT, chat, undefined);
      },
      table: (item, state) => {
        setRoomItemState(item.ref, state);
        broadcastState({ ...item, state }, state);
        // Any 2599 drives the gator's animation (see gator-waiter.ts): put his back.
        waiters.get(roomBucket)?.resend();
      },
    },
  );
  waiters.set(roomBucket, waiter);
  return waiter;
}

const SEAT_REF_BASE = 900000;
function seatItemsFor(room: string | undefined): PlacedItem[] {
  if (!room) return [];
  return (roomSeats.get(room) ?? []).map((seat, i) => ({
    ref: SEAT_REF_BASE + i,
    typeCode: SEAT_HEIGHT_MODE === "height" ? seat.item ?? SEAT_TYPE_CODE : SEAT_TYPE_CODE,
    tile: seat.tile,
    dir: seat.dir ?? 0,
    state: 0,
  }));
}

/**
 * Queue-line markers: an invisible `65 Queue Block` on every tile a queue owns.
 *
 * ⚠ This is what makes the tiles LOOK like a queue. `CRoomItemQueueBlock` (the
 * class on 65) relabels the tile under it `CLASS "queue"`, and the pointer then
 * draws `queue_hiliter_<tileSize>` over it instead of the plain tile highlight.
 * Without an item there the line is ordinary floor to the client. 65's
 * furnimap entry is one walkable block with NO sprites — a pure marker; the
 * other queue-block types mostly have no furnimap entry to build from at all.
 */
const QUEUE_REF_BASE = 910000;
const QUEUE_MARKER_TYPE = 65;
function queueMarkersFor(room: string | undefined): PlacedItem[] {
  const tiles = [...new Set(queuesIn(room).flatMap(managedTiles))];
  // dir 3: 65 defines only 1/3/5/7, and a facing it lacks builds no block for
  // the class to relabel.
  return tiles.map((tile, i) => ({ ref: QUEUE_REF_BASE + i, typeCode: QUEUE_MARKER_TYPE, tile, dir: 3, state: 0 }));
}

/** The stored signature tokens, tolerating a row written before this existed. */
function storedSloganTokens(userId: number): ChatToken[] {
  const raw = getSlogan(userId).json;
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    // Clamped on read too: rows stored before the 506 handler capped them.
    return Array.isArray(parsed) ? clampSlogan(parsed as ChatToken[]) : [];
  } catch {
    return [];
  }
}

/**
 * The signature as a bare string, always DERIVED from the stored tokens rather
 * than read from `slogan_text`. Rows written before `tokensToPlainText` existed
 * hold the debug rendering (`<word:8436>`), and deriving heals them in place
 * instead of waiting for the player to notice and retype it.
 */
function sloganTextFor(userId: number): string {
  return tokensToPlainText(storedSloganTokens(userId));
}

/**
 * `2506 _AvatarSlogan` for one occupant, or null if they have no signature.
 *
 * Sent immediately after `_CreateAvatars` because the `desc` in that block is a
 * plain string, and the server cannot render dictionary indices back to words.
 * This replays the original tokens so the client resolves them with its own
 * expanded list — the only way the profile shows the signature as typed.
 */
function sloganMessage(o: RoomOccupant): OutgoingParam[] | null {
  if (o.sloganTokens.length === 0) return null;
  return [{ int: o.userId }, ...reEmit(o.sloganTokens, { censorUnknown: false })];
}

/**
 * The Ghost Chasers uniform. `CAvatarFactoryComponent.parseAllFigureData`
 * registers four sets that exist only for this game — 45100 shirt `ch` 90
 * (purple), 45101 shirt `ch` 92 (green), 47100 trousers `pn` 90, 48100 no
 * shoes — and `CAvatarClassHauntedMansion` draws them from `gfx_hmgame_avatar`
 * plus the player's own head, hair, face and eyes. The server swaps them in;
 * the slot is the set number's range (`set mod 10000`: 4000s/5000s shirt,
 * 6000s/7000s trousers, 8000s/9000s shoes), the colour id is 1.
 */
function hmGameFigure(figure: number[], team: 1 | 2): number[] {
  const out = [...figure];
  for (let i = 0; i + 1 < out.length; i += 2) {
    const set = out[i];
    if (set < 0) continue;
    const slot = set % 10000;
    if (slot >= 4000 && slot < 6000) out[i] = team === 1 ? 45101 : 45100;
    else if (slot >= 6000 && slot < 8000) out[i] = 47100;
    else if (slot >= 8000) out[i] = 48100;
    else continue;
    out[i + 1] = 1;
  }
  return out;
}

/** The per-avatar block of `2582 _CreateAvatars`, in wire order. */
function avatarBlock(o: RoomOccupant): OutgoingParam[] {
  const figure = [...(o.shownFigure ?? o.figure).slice(0, 12)];
  while (figure.length < 12) figure.push(-1);
  // The lanyard, for other players' profile windows: `_CreateAvatars` files
  // each as `pin.type.N` / `pin.level.N` / `pin.singleuse.N` (N up to 15).
  const worn = getWornPins(o.userId).slice(0, MAX_WORN_PINS);
  return [
    { str: o.name },
    { int: o.sex },
    { str: wireText(o.slogan) }, // desc — the signature; 2506 updates it live
    ...figure.map((v) => ({ int: v })),
    { int: worn.length }, // pinCount, then { code, level, singleUse } each
    ...worn.flatMap((pin) => [
      { int: pin.typeCode },
      { int: pinLevel(pin) },
      { int: isSingleUsePin(pin.typeCode) ? 1 : 0 },
    ]),
    // iconCount, then one int per badge. `_CreateAvatars` stores these as
    // `icon.type.<n>` params and `CRoomAvatarProfile.select` draws them from
    // `getMember("badge_" & code)` — with no guard, so only BADGE_CODES are ever
    // sent. `setBadges` is what enforces that; this just serialises.
    { int: o.badges.length },
    ...o.badges.map((code) => ({ int: code })),
    { int: o.userId },
    { int: o.tile },
    { int: o.stack ?? 0 }, // stack — a seat's level, see `RoomOccupant.legs`
    ...avatarActions({
      headDir: o.facing,
      bodyDir: o.facing,
      legs: o.legs,
      leftHand: o.leftHand,
      rightHand: o.rightHand,
      magic: o.magic ?? 0,
      tradeState: o.trading ?? 0,
    }).map((v) => ({ int: v })),
  ];
}

/** Loaded once, lazily — parsing figuresets_28 is ~66 KB of text. */
let cachedCatalogue: AvatarCatalogue | null = null;
function avatarCatalogue(): AvatarCatalogue {
  if (!cachedCatalogue) {
    cachedCatalogue = loadAvatarCatalogue();
    console.log(
      `[avatar] catalogue: ${cachedCatalogue.male.length} male / ` +
        `${cachedCatalogue.female.length} female sets from ${cachedCatalogue.source}`,
    );
  }
  return cachedCatalogue;
}

const NAME_PARTS_A = ["Sparkle", "Pirate", "Captain", "Merry", "Golden", "Silver", "Brave", "Clever"];
const NAME_PARTS_B = ["Star", "Wave", "Falcon", "Lantern", "Compass", "Cutlass", "Rocket", "Comet"];

/** Five suggestions, as GeneratedNames expects. */
function suggestNames(count: number): string[] {
  const out = new Set<string>();
  // Bounded: one DB query per try, and once the name pool fills it would never
  // find `count`. A short list is a fine answer.
  for (let tries = 0; out.size < count && tries < count * 50; tries++) {
    const a = NAME_PARTS_A[Math.floor(Math.random() * NAME_PARTS_A.length)];
    const b = NAME_PARTS_B[Math.floor(Math.random() * NAME_PARTS_B.length)];
    const suffix = Math.floor(Math.random() * 900) + 100;
    const candidate = `${a}${b}${suffix}`;
    if (!characterNameTaken(candidate)) {
      out.add(candidate);
    }
  }
  return [...out];
}

/**
 * Name rules, mirroring what the client already enforces locally (4–18 chars)
 * so a name that slips past the UI is still refused here.
 *
 * Reason codes are the ones NameRejected understands: 1..4 carry an
 * explanation string, anything else is displayed bare.
 */
function judgeCharacterName(
  name: string,
  forUserId: number | undefined,
): { ok: true } | { ok: false; reason: number; info: string } {
  const trimmed = name.trim();
  if (trimmed.length < 4) {
    return { ok: false, reason: 1, info: "That name is too short." };
  }
  if (trimmed.length > 18) {
    return { ok: false, reason: 1, info: "That name is too long." };
  }
  if (!/^[A-Za-z0-9 _-]+$/.test(trimmed)) {
    return { ok: false, reason: 2, info: "Letters, numbers, spaces, dash and underscore only." };
  }
  if (characterNameTaken(trimmed, forUserId)) {
    return { ok: false, reason: 3, info: "Somebody is already using that name." };
  }
  return { ok: true };
}

/**
 * Register a connection as THE connection for this user, displacing any older
 * one. Returns nothing; the displaced session is closed by its own handler.
 */
function claimUserConnection(entry: LiveConnection): void {
  const existing = liveByUser.get(entry.userId);
  if (existing && existing !== entry) {
    console.log(
      `[${entry.label}] "${entry.username}" logged in from ${entry.remote}; ` +
        `dropping earlier connection on ${existing.remote}`,
    );
    existing.disconnect("replaced by a newer login");
  }
  liveByUser.set(entry.userId, entry);
}

function releaseUserConnection(entry: LiveConnection): void {
  if (liveByUser.get(entry.userId) === entry) {
    liveByUser.delete(entry.userId);
    // Gone: out of any full-room line, so the next person moves up.
    leaveEntryQueue(entry.userId);
  }
}

configureEntryQueue({
  capacity: ROOM_MAX_USERS,
  population: (room) => visibleCount(room),
  title: (code) => ROOM_NAMES.get(code) ?? ROOM_CODES.get(code) ?? `Room ${code}`,
  admit: (userId, code) => liveByUser.get(userId)?.enterQueued(code),
  queuePosition: (userId, title, position) =>
    liveByUser.get(userId)?.send(
      MSG.QUEUE_ROOM,
      [{ str: wireText(title) }, { int: position }],
      `QueueRoom "${title}" ${position}`,
    ),
  fastPassCreated: (userId, code, title, position) =>
    liveByUser.get(userId)?.send(
      MSG.CREATE_FAST_PASS,
      [{ int: code }, { int: 0 }, { str: wireText(title) }, { int: position }],
      `CreateFastPass ${code} "${title}" ${position}`,
    ),
  fastPassPosition: (userId, position) =>
    liveByUser.get(userId)?.send(MSG.FAST_PASS_QUEUE_POSITION, [{ int: position }], `FastPassQueuePosition ${position}`),
  fastPassCancelled: (userId) => liveByUser.get(userId)?.send(MSG.CANCEL_FAST_PASS, [], "CancelFastPass"),
  log: (line) => console.log(`[entry-queue] ${line}`),
});

function md5Ticket(): string {
  return createHash("md5").update(randomBytes(16)).digest("hex");
}

function ensureSession(userId: number): DevSession {
  let session = sessions.get(userId);
  if (!session) {
    session = {
      userId,
      ticket: md5Ticket(),
      loginName: `Guest${userId}`,
    };
    sessions.set(userId, session);
    console.log(`[session] created userId=${userId}`);
  }
  return session;
}

function hexPreview(buf: Buffer, max = 64): string {
  const slice = buf.subarray(0, max);
  const hex = [...slice].map((b) => b.toString(16).padStart(2, "0")).join(" ");
  return buf.length > max ? `${hex} … (+${buf.length - max}b)` : hex;
}

/**
 * A copy of client bytes fit for the log: every run of 32+ hex digits becomes
 * `*`. The LOGIN message carries the ticket in the clear (the browser client
 * declines encryption), and logs are read by more people than should log in.
 */
function maskTickets(buf: Buffer): Buffer {
  return Buffer.from(buf.toString("latin1").replace(/[0-9a-f]{32,}/gi, (run) => "*".repeat(run.length)), "latin1");
}

function asciiPreview(buf: Buffer, max = 80): string {
  return [...buf.subarray(0, max)]
    .map((b) => (b >= 0x20 && b <= 0x7e ? String.fromCharCode(b) : "."))
    .join("");
}

/**
 * GetSec is a key fetch (loading.php / sec.php) made only by later fan-server
 * Shockwave builds (vmk_8, vmk_14, framework.dcr). Disney's framework_disney.dcr
 * never asks, and neither does the browser client. Its blob carries the user's login ticket,
 * so it is OFF unless VMK_SHOCKWAVE_GETSEC=1 — set for Shockwave testing only —
 * and even then `/GetSec` answers only the web server (the bridge secret),
 * which decides whose blob it is from the caller's own session (assets.ts).
 */
export const SHOCKWAVE_GETSEC = process.env.VMK_SHOCKWAVE_GETSEC === "1";

function buildGetSecBlob(userId: number): Buffer {
  const session = ensureSession(userId);
  const mode = process.env.VMK_GETSEC_MODE ?? "cast";

  switch (mode) {
    case "empty":
      return Buffer.alloc(0);
    case "zeros":
      return Buffer.alloc(256, 0);
    case "ticket":
      return Buffer.from(session.ticket, "utf8");
    case "cast":
    default:
      try {
        const secrets = secretsFromTicket(session.ticket);
        const cast = buildGetSecCast(secrets);
        console.log(`[getsec] synthesized cast userId=${userId} size=${cast.length}b`);
        return cast;
      } catch (err) {
        // Never the ticket itself: zeros, as `zeros` mode would send.
        console.warn(`[getsec] cast synthesis failed, sending zeros:`, err);
        return Buffer.alloc(256, 0);
      }
  }
}

function sendHttp(socket: Socket, status: number, body: string | Buffer, type?: string) {
  const headers = [
    `HTTP/1.1 ${status}`,
    `Content-Type: ${type ?? "text/plain; charset=utf-8"}`,
    "Access-Control-Allow-Origin: *",
    `Content-Length: ${Buffer.isBuffer(body) ? body.length : Buffer.byteLength(body)}`,
    "Connection: close",
    "",
    "",
  ].join("\r\n");
  socket.end(Buffer.concat([Buffer.from(headers, "utf8"), typeof body === "string" ? Buffer.from(body) : body]));
}

function parseHttpRequest(initial: Buffer): { method: string; path: string; headers: Record<string, string>; body: Buffer } | null {
  const headerEnd = initial.indexOf("\r\n\r\n");
  if (headerEnd < 0) return null;
  const headerText = initial.subarray(0, headerEnd).toString("utf8");
  const lines = headerText.split("\r\n");
  const [method, path = "/"] = lines[0]?.split(" ") ?? ["GET", "/"];
  const headers: Record<string, string> = {};
  for (const line of lines.slice(1)) {
    const i = line.indexOf(":");
    if (i > 0) headers[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim();
  }
  const body = initial.subarray(headerEnd + 4);
  return { method, path, headers, body };
}

// RFC 6455 section 1.3. This value is fixed by the spec and must be exact:
// the client checks Sec-WebSocket-Accept == base64(sha1(key + GUID)) and drops
// the connection before "open" if it disagrees. A scrambled copy here made every
// upgrade look successful server-side (the 101 was sent, the MUS challenge was
// written) while every client silently refused it.
const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

function acceptWebSocket(socket: Socket, key: string) {
  const accept = createHash("sha1").update(key + WS_GUID).digest("base64");
  socket.write(
    [
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${accept}`,
      "",
      "",
    ].join("\r\n"),
  );
}

function encodeWebSocketBinaryFrame(payload: Buffer): Buffer {
  if (payload.length < 126) {
    const frame = Buffer.alloc(2 + payload.length);
    frame[0] = 0x82;
    frame[1] = payload.length;
    payload.copy(frame, 2);
    return frame;
  }
  if (payload.length < 65536) {
    const frame = Buffer.alloc(4 + payload.length);
    frame[0] = 0x82;
    frame[1] = 126;
    frame.writeUInt16BE(payload.length, 2);
    payload.copy(frame, 4);
    return frame;
  }
  const frame = Buffer.alloc(10 + payload.length);
  frame[0] = 0x82;
  frame[1] = 127;
  frame.writeBigUInt64BE(BigInt(payload.length), 2);
  payload.copy(frame, 10);
  return frame;
}

/**
 * The largest frame a client may send. The game's messages are small; without
 * a cap a frame header can announce any length and the socket buffers it all,
 * re-copying the backlog on every chunk (quadratic CPU, unbounded memory).
 * Photos travel as base64 pixels, so the photo socket gets more room.
 */
const WS_MAX_GAME_FRAME = 1024 * 1024;
const WS_MAX_PHOTO_FRAME = 8 * 1024 * 1024;

/**
 * Socket silence limits. The protocol has no keepalive — a logged-in player
 * standing still sends nothing — so the idle limit after login is long;
 * VMK_IDLE_TIMEOUT_MINUTES=0 turns it off. Before login a client is in a
 * handshake that takes a second or two, so a minute is generous.
 */
const LOGIN_TIMEOUT_MS = 60_000;
const IDLE_TIMEOUT_MS = Math.max(0, Number(process.env.VMK_IDLE_TIMEOUT_MINUTES ?? 120) || 0) * 60_000;

function decodeWebSocketFrames(
  buffer: Buffer,
  maxPayload: number,
): { payloads: Buffer[]; remaining: Buffer; tooLarge: boolean } {
  const payloads: Buffer[] = [];
  let offset = 0;
  while (offset + 2 <= buffer.length) {
    const first = buffer[offset] ?? 0;
    const second = buffer[offset + 1] ?? 0;
    const opcode = first & 0x0f;
    const masked = (second & 0x80) !== 0;
    let payloadLength = second & 0x7f;
    let headerSize = 2;

    if (payloadLength === 126) {
      if (offset + 4 > buffer.length) break;
      payloadLength = buffer.readUInt16BE(offset + 2);
      headerSize = 4;
    } else if (payloadLength === 127) {
      if (offset + 10 > buffer.length) break;
      const length = buffer.readBigUInt64BE(offset + 2);
      if (length > BigInt(maxPayload)) return { payloads, remaining: Buffer.alloc(0), tooLarge: true };
      payloadLength = Number(length);
      headerSize = 10;
    }

    if (payloadLength > maxPayload) return { payloads, remaining: Buffer.alloc(0), tooLarge: true };

    const maskSize = masked ? 4 : 0;
    const frameSize = headerSize + maskSize + payloadLength;
    if (offset + frameSize > buffer.length) break;

    let payload = buffer.subarray(offset + headerSize + maskSize, offset + frameSize);
    if (masked) {
      const mask = buffer.subarray(offset + headerSize, offset + headerSize + 4);
      payload = Buffer.from(payload);
      for (let i = 0; i < payload.length; i += 1) {
        payload[i] = (payload[i] ?? 0) ^ (mask[i % 4] ?? 0);
      }
    }

    if (opcode === 0x8) {
      offset += frameSize;
      break;
    }
    if (opcode === 0x2 || opcode === 0x1 || opcode === 0x0) {
      payloads.push(payload);
    }
    offset += frameSize;
  }
  return { payloads, remaining: buffer.subarray(offset), tooLarge: false };
}

/** Tag of the navigator's root node. Arbitrary but must be stable. */
const ROOT_NODE_TAG = 1;

/**
 * The smallest navigator tree the client will accept: one root node holding a
 * single public space. Enough to answer GET_ROOT_NODE / NAVIGATE_NODE and see
 * whether the client proceeds to request a room.
 *
 * NOTE a client-side quirk: `navigationNodeInfo` only initialises its child list
 * inside `if t_iChildNodeCount > 0`, but assigns `#children` unconditionally, so
 * a zero-child answer sets `#children` to VOID rather than an empty list. If
 * CreateNavigator turns out to choke on that, send one throwaway child.
 */
function navigatorNode(tag: number): NavigatorNode {
  return {
    nodeTag: tag,
    parentNodeTag: tag === ROOT_NODE_TAG ? 0 : ROOT_NODE_TAG,
    userCount: 0,
    // The spaceId comes back verbatim in PUBLIC_SPACE_REQUEST and we map it
    // straight onto a room code, so only advertise ids the client can resolve
    // BOTH ways: `room.code.<N>` for the casts and `room.<N>.name` for the
    // label. Advertising several gives the navigator an actual room list to
    // render — with a single stub space there is nothing to click, which is why
    // every click came back as NAVIGATE_NODE instead of PUBLIC_SPACE_REQUEST.
    // ⚠ Space tags must not collide with NODE tags, and are currently a probe.
    //
    // Measured, in order:
    //  - spaceIds [0,1,5,6,…] with tags 1..12: clicking the third room sent
    //    PUBLIC_SPACE_REQUEST `[3, -1]`. 3 was a tag, never an advertised
    //    spaceId — so the client echoes something other than spaceid, and the
    //    wrong room was entered.
    //  - tag === spaceId (0,1,5,6,…): every click came back as NAVIGATE_NODE
    //    instead, because those values collide with the node tags we serve
    //    (1, 2, 3, 8) and the client routes them as tree navigation.
    //
    // Settled: tag === spaceId === the room number, read from the client's own
    // code rather than guessed.
    //
    // `Navigator_Component_Class.NavigateToRoom(a_roomTag)`:
    //     repeat with tSpace in m_ar_NavSubs        -- our advertised spaces
    //       if tSpace.tag = a_roomTag then          -- MATCHED BY TAG
    //         tRoomID = tSpace.spaceid              -- and it sends the SPACEID
    //         tRoomName = getText("ROOM." & tSpace.tag & ".NAME")
    //     send(31, [#integer: tRoomID, #integer: -1])
    //
    // Three consequences, each of which we got wrong at some point:
    //  - the hotspot supplies a **tag**, so a space whose tag matches nothing
    //    the map can pass is simply never found and the click does NOTHING —
    //    which is exactly what minting tags as 1000 + index caused;
    //  - the name is looked up as `ROOM.<tag>.NAME`, so the tag *is* the room
    //    number from `room.<N>.name`;
    //  - what comes back on the wire is the **spaceid**, so spaceid is what we
    //    resolve to a room code.
    spaces: (advertisedRooms().length > 0 ? advertisedRooms() : [LANDING_ROOM_CODE]).map((id) => ({
      spaceId: id,
      tag: id,
      // Live head-count: advanced mode draws Mickeys from it (vmk-protocol.ts).
      userCount: visibleCount(ROOM_CODES.get(id)),
    })),
    children: [],
    // Every space gets one running instance. You enter an *instance*
    // (`PUBLIC_SPACE_REQUEST` = [spaceId, instanceId]), so advertising a space
    // with none may leave the navigator nothing to act on — which matches the
    // symptom of rooms rendering but clicks never emitting 31.
    maxUsers: ROOM_MAX_USERS,
    // ⚠ INSTANCE 0, AND THE SAME 0 EVERYWHERE. The id is not just a handle —
    // it is a LABEL INDEX. Both `NavigatorInterface.RefreshAdvancedInterface`
    // and `CRoomInfoComponent.setPublicInfo` do `instanceID + 1` into the same
    // title list (["North", "East", "South", "West", …]), so advertising 1 here
    // while `PUBLIC_ROOM_INFO` and `NODE_INSTANCES` send 0 made the navigator
    // call the room "East" and the room info tab call it "North".
    instances: [{ instanceId: 0, userCount: 0 }],
  };
}

/**
 * A VMK client session: the Diffie-Hellman handshake, then framed messages.
 *
 * What this replaced, because the mistake is worth recording: the old stub sent
 * `DU<4 digits>\x01`, lifted from a LibreShockwave test vector labelled "server
 * secret key message". "DU" is not a marker — it is the two-character message
 * TYPE header, and it decodes to message 277, which VMK has no listener for.
 * (That test vector is almost certainly Habbo's; LibreShockwave's test corpus
 * is full of Habbo strings.) The client was right to discard it.
 *
 * The real opener is message 2001, `connectionReady`, carrying the server's DH
 * public key as a string. See tools/src/vmk-protocol.ts for the citations.
 *
 * Direction matters here and is easy to get backwards: the client enciphers
 * what it SENDS once the handshake completes, and never deciphers what it
 * receives (CConnection uses pDecoder only in send/sendNonce). So we decipher
 * inbound traffic and keep sending plaintext.
 */
function createVmkSession(
  onWrite: (data: Buffer) => void,
  label: string,
  remote: string,
  initial: Buffer = Buffer.alloc(0),
  onClose: (reason: string) => void = () => {},
  /** Login accepted: the connection moves from the login timeout to the idle one. */
  onLogin: () => void = () => {},
) {
  const dh = createDiffieHellman((n) => new Uint8Array(randomBytes(n)));
  let started = false;
  /** Bytes received but not yet consumed; hex text once `rc4` is set. */
  let pending = initial.toString("latin1");
  /** Deciphered client bytes awaiting frame parsing. */
  let plain = "";
  let rc4: VmkRc4 | null = null;
  /** Character name reported back to the client; set from the resolved account. */
  let characterName = "devuser";
  let renameHandshakes = 0;
  /**
   * Where this connection's avatar stands, as a tile REF.
   *
   * Seeded from the room's geometry on entry and updated on every "move" — the
   * pathfinder needs a start tile, so this has to track where the client thinks
   * the avatar is. The value before the first room entry is never sent.
   */
  let currentTile = 0;
  /**
   * Which room bucket this connection occupies.
   *
   * ⚠ NOT always a cast name. For a public room it is the cast name
   * (`vmk_esplanade`); for a guest room it is `guest:<id>`, so that two players
   * who picked the same style occupy SEPARATE rooms rather than being dropped
   * into one shared space. Use `currentGeometryRoom` for anything that needs
   * tiles — `guest:12` has no geometry.
   */
  let currentRoomName: string | undefined;
  /** Cast name whose geometry applies here (`vmk_esplanade`). Drives pathing. */
  let currentGeometryRoom: string | undefined;
  /**
   * Which way the avatar is facing, 0..7 (see `directionBetween`).
   *
   * Kept between pulses because the client has no memory of it: every
   * `Actions` call sets the direction outright, so omitting it would spin the
   * avatar back to "facing away" on each step.
   */
  let facing = SPAWN_FACING;
  /** Mouth pose carried by every pulse — set while a chat bubble is up. */
  let mouth = MOUTH_CLOSED;
  /** Clears the talking face once the bubble has had its time. */
  let talkTimer: NodeJS.Timeout | undefined;
  /**
   * Current emote. Dance is a toggle the player ends themselves; waving is a
   * one-shot the server has to clear, since nothing tells us it finished.
   */
  let dancing = false;
  let waving = false;
  let waveTimer: NodeJS.Timeout | undefined;
  /**
   * A water cooler's cup in the left hand (so it survives a wave):
   * `HAND_CARRY_CUP`, `HAND_DRINK` mid-sip, or 0 for none.
   */
  let cupHand = 0;
  let drinkTimers: NodeJS.Timeout[] = [];
  /** Emoticon shown above the avatar; cleared on a timer, as nothing ends it. */
  let emoticon = 0;
  let emoticonTimer: NodeJS.Timeout | undefined;
  /** This connection's entry in `roomOccupants`, once it has entered a room. */
  let me: RoomOccupant | null = null;
  /** Remaining `[tile, legs]` pulses of the current walk; replaced on redirect. */
  /** `face`, when given, overrides the facing worked out from the step (a ride mounting in place). */
  let walkQueue: Array<[tile: number, legs: number, face?: number]> = [];
  /** A ride owns the avatar until this time; clicks to walk are ignored meanwhile. */
  let ridingUntil = 0;
  let darkRide: { ride: DarkRide; scene: number; timer?: ReturnType<typeof setTimeout> } | null = null;
  /** What to do when the current walk ends (a teleporter hop). See `walkAlong`. */
  let walkDone: (() => void) | undefined;
  /**
   * Where to land on the next room entry, when a teleporter sent us there: the
   * partner's tile, facing its way. Consumed by `enterRoom`.
   */
  let pendingArrival: { room: string; partner: RoomItem; facing: number } | null = null;
  /**
   * Where to land on the next room entry when an EXIT sent us there: a
   * doorway in `code` (the one leading back, so stepping straight out returns
   * you). Consumed by `enterRoom`.
   */
  let pendingDoor: { code: number; tiles: number[]; face?: number } | null = null;
  /**
   * The doorway we last walked out of, and the room it was in. Coming back
   * from where it led lands on it again, when that room has several doorways
   * to here (the Quest Deck's two into the Shrinking Machine) — otherwise the
   * first one would always win.
   */
  let leftThrough: { code: number; tiles: number[]; to: number } | null = null;
  /** Entering the Waterpark Pool: the slide to ride once the avatar is placed. */
  let pendingSlide: (typeof WATERPARK_SLIDES)[number] | null = null;
  /**
   * The last public room we were in, for exits that go "back" — every guest
   * room's door, and the monorail station's stairs. The monorail itself is
   * never "back": the station's back is the land you boarded from.
   */
  let backRoomCode: number | undefined;
  /** Which land's Monorail Station we are on (a monorail stop id). See MONORAIL_STOPS. */
  let stationStop = MONORAIL_STOPS[0] as number;
  /** Set by leaving the train: the platform to arrive on. Consumed by `enterRoom`. */
  let pendingStationStop: number | null = null;
  /** Which Monorail train we are riding (an index into `trains`). */
  let trainId = 0;
  /** Set by boarding: the train to ride. Consumed by `enterRoom`. */
  let pendingTrain: number | null = null;
  /** Where CloseMixer returns to: the Street Party lobby, or the train (and which). */
  let mixerReturn: { code: number; train?: number } | null = null;
  /** This player's performance on a music stage: the picker or the song, timed. */
  let performance: { room: string; variant: MixerVariant; timer: ReturnType<typeof setTimeout>; playing: boolean } | null =
    null;
  /** This player's Jungle Cruise, while they are in room 1102 (jungle-cruise.ts). */
  let jcGame: JungleCruiseGame | null = null;
  /** The avatar's current magic effect, carried on every pulse. See `AvatarActions.magic`. */
  let magic = 0;
  /**
   * `/ghost` (staff): hidden from ordinary players — see `sees`. Kept for the
   * session, across rooms, until `/ghost` again.
   */
  let ghosting = false;
  /**
   * The effect others are shown. A ghost wears the Invisibility pin's look
   * (only staff and the ghost ever receive it) unless a real effect is running;
   * the pin itself is untouched and works as normal for everyone.
   */
  const shownMagic = (): number => (ghosting && magic === 0 ? GHOST_FX : magic);
  /** 1 while this player's trade window is open (action slot 9). */
  let trading = 0;
  /** Set when a teleporter sent us into this room: play the arrival effect on `ROOM_START`. */
  let arrivedByTeleport: RoomItem | null = null;
  /** With `arrivedByTeleport`, when a RIDE went through: carry on riding from the partner. */
  let arrivedRiding: RideHop | null = null;
  /** The magic pin effect running on this avatar, if any. */
  let activeMagic: {
    pinId: number;
    effect: number;
    endEffect?: number;
    /** The effect forced the dance on (Dancing Inferno); undo it when it ends. */
    dance?: boolean;
    /** A costume is showing (Pirate Costume); put the real outfit back at the end. */
    costume?: boolean;
    /** The suit's time ran out in space; it comes off once we step off the spacewalk. */
    overdue?: boolean;
    timer?: NodeJS.Timeout;
  } | null = null;
  /** Timer for the NEXT queued pulse. Undefined means nothing is walking. */
  let walkTimer: NodeJS.Timeout | undefined;
  /** When the last pulse went out, so a redirect cannot outrun the cadence. */
  let lastPulseAt = 0;
  /** The account this connection belongs to, once login resolves its ticket. */
  let live: LiveConnection | null = null;
  /** The public room code last entered — for guest rooms, their style. */
  let currentRoomCode: number | undefined;
  /** This connection's presence in the messenger, from login to disconnect. */
  let messengerPeer: MessengerPeer | null = null;
  /** This connection's `login_log` row, closed on disconnect (Housekeeping → Sessions). */
  let loginLogId = 0;

  /**
   * The last few messages sent, for correlating a client-side crash.
   *
   * ⚠ Exists because the client's crash dialog names nothing. When it dies, all
   * the server sees is `[tcp] closed`, and the interesting part — what we had
   * just told it — has usually scrolled away amid pulses. This keeps a short
   * tail that is dumped on disconnect, so a bytecode patch that names the
   * failing HANDLER can be lined up against the MESSAGE that provoked it.
   */
  const recentSends: string[] = [];
  const SEND_HISTORY = 12;

  const send = (msgType: number, params: OutgoingParam[] = [], note = "") => {
    const buf = encodeServerMessage(msgType, params);
    onWrite(buf);
    const line = `msg ${msgType}${note ? ` ${note}` : ""} ${buf.length}b`;
    recentSends.push(`${new Date().toISOString().slice(11, 23)} ${line}`);
    if (recentSends.length > SEND_HISTORY) recentSends.shift();
    console.log(`[${label}] >> ${line} ${hexPreview(buf)}`);
  };

  /** Print the send tail. Called when the connection drops. */
  const dumpRecentSends = () => {
    if (recentSends.length === 0) return;
    console.log(`[${label}] last ${recentSends.length} message(s) before disconnect:`);
    for (const line of recentSends) console.log(`[${label}]    ${line}`);
  };

  const stopWalking = () => {
    walkQueue = [];
    walkDone = undefined;
    if (walkTimer) {
      clearTimeout(walkTimer);
      walkTimer = undefined;
    }
  };

  /**
   * Which pose an arm takes, given what the legs are doing.
   *
   * Order matters: walking wins (the arms swing with the stride), then dancing,
   * then a wave. Waving is right-arm only — `prepare()` routes `m_bActWav`
   * through `doHandWorkRight`.
   */
  const handPose = (legs: number, side: "left" | "right"): number => {
    // A cup stays in hand on the move — held, not sipped.
    if (cupHand && side === "left" && legs === LEGS_WALK) return HAND_CARRY_CUP;
    if (legs === LEGS_WALK) return HAND_WALK;
    if (dancing) return HAND_DANCE;
    if (waving && side === "right") return HAND_WAVE;
    if (cupHand && side === "left") return cupHand;
    return HAND_STAND;
  };

  /**
   * The GARMENTS currently on the avatar (not necessarily all it owns).
   *
   * ⚠ Garments only. This feeds `2535 ReceiveWornClothes`, which fills the
   * "Character's Clothing" list — and that list resolves each row through
   * `getText("item." & code)`. Hair and face have no such text, so including
   * them printed the raw keys `item.20000` / `item.22000` as item names.
   */
  const wornClothingSets = (): number[] => {
    const outfit = live ? getOutfit(live.userId) : null;
    return outfit ? figureSetIds(outfit.figure).filter(isGarment) : [];
  };

  /**
   * Everything this player owns in the wardrobe, worn or not.
   *
   * Filtered on the way OUT as well as the way in, so a row written before
   * `isGarment` existed can never put a nameless hair set back in the grid.
   */
  const ownedClothingSets = (): number[] =>
    live
      ? getOwnedItems(live.userId, ITEM_CATEGORY.clothes)
          .map((i) => i.typeCode)
          .filter(isGarment)
      : [];

  /**
   * Run a `!command` typed into the chat bar. Returns true if the message was a
   * command and must NOT be broadcast.
   *
   * ⚠ WHY THIS WORKS AT ALL, and what constrains it. Chat arrives as canned-text
   * tokens, not a string. `CCannedTextManager.ParseText` splits the line on
   * `dict.separators` (". ,!?:;)(]"), looks each word up, and only words it
   * CANNOT place fall through to
   *   [#word: w, #valid: 0, #source: #ownName, ...]
   * which `TransformCannedToMsg` sends as `int 0` + `str w` — the literal
   * characters. `#valid: 0` is what paints the word red in the client; it does
   * NOT stop transmission, which is why an unrecognised word can be "forced
   * through" and read here verbatim.
   *
   * Use a `/` or `#` prefix — see `STAFF_COMMANDS` for why `!` cannot work.
   *
   * Nothing a staff member types with a command prefix is ever broadcast, even
   * a misspelling: a typo must not leak into the room. Replies go back through
   * `send`, which is this connection only, so command output is private.
   */
  const handleStaffCommand = (tokens: ReturnType<typeof decodeChat>): boolean => {
    // Only free text survives as characters; anything else the player typed is
    // an index we cannot resolve, so it can never form part of a command.
    const words = tokens
      .filter((t): t is { kind: "text"; text: string } => t.kind === "text")
      .map((t) => t.text.trim())
      .filter((w) => w.length > 0);
    if (words.length === 0) return false;

    // A fusing prefix keeps the whole word out of the dictionary, so `/badges`
    // arrives intact as free text. `!` is a separator and cannot fuse, but it is
    // accepted here for the names that happen to survive on their own.
    const prefixed = /^[/#!]+[A-Za-z]/.test(words[0]);
    // `/badges4` fuses the digits onto the name — nothing splits them, since
    // digits are not separators. Peel them off and treat them as the first
    // argument, so `/badges4` and `/badges 4` behave the same.
    const bare = words[0].replace(/^[^A-Za-z]+/, "");
    const split = /^([A-Za-z]+)(\d+)$/.exec(bare);
    const head = (split?.[1] ?? bare).toLowerCase();
    const fused = split?.[2];
    if (!prefixed && !STAFF_COMMANDS.has(head)) return false;

    // Command output goes to the VMK Alert dialog, not the chat bubble: a
    // bubble is capped in length, vanishes on a timer, and looks to bystanders
    // like the staff member is talking to themselves. `2240` is a modal the
    // sender dismisses, and it is addressed to this connection only.
    //
    // Lines are collected and shown as ONE dialog — each `2240` opens its own
    // window, so replying line-by-line would stack boxes on top of each other.
    const lines: string[] = [];
    const reply = (text: string) => lines.push(text);
    const flush = () => {
      if (lines.length === 0) return;
      send(
        MSG.ADMIN_MESSAGE,
        [{ str: wireText(lines.join("\r")) }, { int: 3 }],
        `staff reply (${lines.length} line${lines.length === 1 ? "" : "s"})`,
      );
      lines.length = 0;
    };

    const name = head;
    // Arguments are every later free-text word, plus any digits fused onto the
    // command itself. Numbers are never dictionary words, so they arrive intact.
    const args = [...(fused ? [fused] : []), ...words.slice(1)];
    // Any moderator permission at all counts as staff. There is no in-game way
    // to acquire one — see tools/set-admin.mjs.
    //
    // A non-staff player is NOT intercepted: `/hello` is ordinary chat for them,
    // and swallowing it would be a way to probe for who is staff.
    if (permissionsFor().length === 0) return false;
    if (!live) return true;
    console.log(`[${label}] staff command "${name}" args=[${args.join(" ")}]`);

    const ints = args.map((a) => Number(a)).filter((n) => Number.isInteger(n));

    // Every branch only QUEUES text; the single `flush()` afterwards is what
    // opens one dialog containing all of it.
    dispatch(name, args, ints, reply, tokensToWords(tokens).replace(/^\S+\s*/, ""));
    flush();
    return true;
  };

  /**
   * The command bodies. `reply` QUEUES a line — it does not send one — so a
   * command may call it freely and still produce a single dialog.
   *
   * The boolean is vestigial: every branch is handled, and the caller always
   * swallows the message. It is kept only so each case reads as a clear exit.
   */
  const dispatch = (
    name: string,
    args: string[],
    ints: number[],
    reply: (text: string) => void,
    line = "",
  ): boolean => {
    if (!live) return true;
    switch (name) {
      case "commands":
      case "cmds":
      case "help":
        reply("/badges <n> toggle - /badges 0 clear - /badges list");
        reply("/find <name> - /spawn <setIds> - /credits [+|-]<n> [player] - /perms");
        reply("/goto <roomCode> - /place <typeCode> [dir] - /tile - /sword [win|fail] - /ghost");
        reply("/giveroom <roomCode> [player] - give a guest room (no args: list styles)");
        reply("/feature [spaceId] - toggle a guest room's Mickey spot in Popular (no id: this room)");
        reply("/state <itemRef> [n] - force an item's state (test interactivity)");        reply("/changename <old name> = <new name> - rename a player everywhere");
        reply(`badge codes: ${BADGE_CODES.join(" ")} (max ${MAX_BADGES} worn)`);
        return true;

      case "perms":
        reply(`perms: ${permissionNames().join(" ") || "none"}`);
        return true;

      case "state": {
        // `/state <ref> [n]` — force an item's state, or report it.
        //
        // ⚠ Exists because the server CANNOT tell which items are interactive.
        // `CRoomItemStateAnimator` reads `m_bInteractive` from
        // `CItemAniStructure.GetInteractive()`, which parses an `<ANI>` node out
        // of the item's OWN cast (hof_furni/item_<code>.cct) and DEFAULTS TO 1.
        // None of that is in the furnimap, so the sprite-name state count is a
        // lower bound, not the truth. This makes the question empirical: drive
        // a state by hand and watch whether the piece animates.
        if (ints.length === 0 || !currentRoomName) {
          reply("usage: /state <itemRef> [state]   — omit state to read it");
          return true;
        }
        const item = getRoomItem(ints[0]);
        if (!item || item.room !== currentRoomName) {
          reply(`no item ref ${ints[0]} in this room`);
          return true;
        }
        const known = statesFor(item.typeCode);
        if (ints.length === 1) {
          reply(`ref ${item.ref} type ${item.typeCode} state ${item.state} (${known} known)`);
          return true;
        }
        const next = ints[1];
        setRoomItemState(item.ref, next);
        for (const occupant of occupantsOf(currentRoomName)) {
          occupant.send(
            MSG.UPDATE_ELEMENT,
            [
              { int: item.ref },
              { int: ITEM_CATEGORY_FURNITURE },
              { int: item.tile },
              { int: item.guestMove ? 1 : 0 },
              { int: 2 }, // dir + state; 1 would carry dir only
              { int: item.dir },
              { int: next },
            ],
            undefined,
          );
        }
        reply(`ref ${item.ref} type ${item.typeCode} state ${item.state} -> ${next}`);
        return true;
      }

      case "find": {
        // `/find <text>` — look an item up by name, so `/spawn` has something
        // to be given. Without this the only way to find a set id is to grep
        // external_texts by hand.
        const query = args.join(" ");
        if (!query) {
          reply("usage: /find <name>   e.g. /find herbie");
          return true;
        }
        const hits = searchItemNames(query, 24);
        if (hits.length === 0) {
          reply(`no item matches "${query}"`);
          return true;
        }
        const sex = getOutfit(live.userId)?.sex ?? 0;
        for (const hit of hits) {
          const part = partOf(hit.code);
          if (part === null) {
            // Furniture and posters — usable with /place, not /spawn.
            reply(`${hit.code} ${hit.name} (furni)`);
            continue;
          }
          // ⚠ The band decides who can WEAR it: 2xxxx male, 3xxxx female,
          // 4xxxx either. A set from the wrong band is not merely unflattering,
          // it has no art for the other body.
          const band = Math.floor(hit.code / 10000);
          const who = band === 2 ? "M" : band === 3 ? "F" : "M/F";
          const mine = band === 4 || band === (sex === 1 ? 3 : 2);
          const wearable = isGarment(hit.code) ? "" : " (body, not clothing)";
          reply(
            `${hit.code} ${hit.name} [${part} ${who}]` +
              `${mine ? "" : " — not your sex"}${wearable}`,
          );
        }
        if (hits.length === 24) reply("… more matches; narrow the search");
        return true;
      }

      case "badge":
      case "badges": {
        const current = getBadges(live.userId);
        if (args.length === 0) {
          reply(`badges: ${current.join(" ") || "none"}`);
          reply("/badges <n> toggles it on or off - /badges 0 clears all");
          return true;
        }
        // TOGGLE. A player wears several badges at once, so a code is added if
        // absent and removed if already worn — `/badges 6` twice leaves you
        // where you started, and `/badges 6` then `/badges 4` gives you both.
        // 0 clears everything; it is not a valid badge, so it cannot collide.
        let next = [...current];
        if (ints.includes(0)) next = [];
        for (const code of ints) {
          if (code === 0) continue;
          if (next.includes(code)) next = next.filter((b) => b !== code);
          else next.push(code);
        }
        // Codes outside BADGE_CODES are dropped by setBadges rather than
        // stored: a bad code breaks the profile panel for EVERY player who
        // clicks this avatar, so it must never reach the wire.
        const stored = setBadges(live.userId, next);
        const rejected = ints.filter((i) => i > 0 && !stored.includes(i));
        if (me) me.badges = stored;
        reply(`badges: ${stored.join(" ") || "none"}`);
        if (rejected.length > 0) reply(`rejected: ${rejected.join(" ")}`);
        console.log(`[${label}] badges set to [${stored.join(",")}] for "${characterName}"`);
        // Re-announce so the change is visible without re-entering the room.
        if (me && currentRoomName) {
          for (const occupant of audienceOf(currentRoomName, me?.userId ?? -1)) {
            occupant.send(MSG.CREATE_AVATARS, [{ int: 1 }, ...avatarBlock(me)], undefined);
          }
        }
        return true;
      }

      case "give":
      case "spawn": {
        const wanted = ints.filter(isGarment);
        const bad = ints.filter((i) => !isGarment(i));
        if (wanted.length === 0) {
          reply("usage: /spawn <setId>  (garment sets only)");
          if (bad.length > 0) reply(`not garments: ${bad.join(" ")}`);
          return true;
        }
        const granted = grantItems(live.userId, wanted, ITEM_CATEGORY.clothes);
        if (granted > 0) queueItemList(1);
        reply(`spawned ${granted} of ${wanted.length}`);
        if (bad.length > 0) reply(`skipped: ${bad.join(" ")}`);
        console.log(`[${label}] spawned [${wanted.join(",")}] for "${characterName}"`);
        return true;
      }

      case "tradereset": {
        // `/tradereset` — forget every trade "ignore" and pending request, so
        // testing does not have to sit out the 10-minute ignore.
        const ignores = [...tradeIgnores.values()].reduce((n, m) => n + m.size, 0);
        tradeIgnores.clear();
        tradeRequests.clear();
        reply(`trade ignores cleared (${ignores}), pending requests dropped`);
        return true;
      }

      case "fx": {
        // `/fx <n>` — play magic effect n on yourself, for mapping pins to
        // effects by eye; `/fx 0` clears it. Effects loop until cleared.
        const fx = ints[0];
        if (fx === undefined) {
          reply("usage: /fx <effect>  (0 clears). Known: 1-12 14 15 17-20 25-28 34 90 100-112 114 115");
          return true;
        }
        stopMagic();
        setMagic(fx);
        reply(fx === 0 ? "effect cleared" : `effect ${fx}`);
        return true;
      }

      case "pin": {
        // `/pin <code> [count]` — pins into your inventory (duplicates allowed:
        // combining needs two of the same). Magic pins start at their level.
        const code = ints[0];
        if (code === undefined || code < 2000) {
          reply("usage: /pin <code> [count]  e.g. /pin 2026 (Teleportation), 12026 single-use");
          return true;
        }
        const count = Math.min(Math.max(ints[1] ?? 1, 1), 15);
        addItems(live.userId, Array(count).fill(code), ITEM_CATEGORY.pins);
        queueItemList(1);
        reply(`gave ${count} x pin ${code}`);
        return true;
      }

      case "teleporter": {
        // `/teleporter <typeCode>` — a LINKED pair into your inventory. Pairs
        // are made here, by the shop and by /hk give, and never re-linked.
        const typeCode = ints[0];
        if (typeCode === undefined || !isFurniture(typeCode)) {
          reply("usage: /teleporter <typeCode> - gives a linked pair");
          reply("e.g. 3 Stitch's, 53 Tea Cup, 452 Space Mountain, 368 Yeti Ride");
          return true;
        }
        const pairId = grantItemPair(live.userId, typeCode, ITEM_CATEGORY.items);
        queueItemList(1);
        reply(`gave a linked pair of ${typeCode} (pair ${pairId})`);
        console.log(`[${label}] granted teleporter pair ${pairId} (type ${typeCode}) to "${characterName}"`);
        return true;
      }

      case "place": {
        if (ints.length === 0) {
          reply("usage: /place <typeCode> [dir]");
          reply("1 = Ace Of Spades Carpet (walkable, safe test)");
          reply("283 = Invisible Public Room Chair - the seat marker");
          return true;
        }
        if (!currentRoomName) {
          reply("not in a room");
          return true;
        }
        // ⚠ Default 1, never 0. Furniture defines its sprites under
        // `<DIR NUM="1|3|5|7">` — direction 0 does not exist, so an item placed
        // with dir 0 resolves to no sprite set and renders NOTHING while every
        // other stage reports success. That looked like broken placement for a
        // long time; it was only ever a missing direction.
        const [typeCode, requestedDir] = ints;
        // ⚠ Refuse anything the furnimap does not define. The real PLACE_ITEM
        // path checks the inventory category, but this command took any number
        // at all — which is how two pins ended up in a guest room as furniture.
        // Code 2010 is "Best Guest Room Award", a PIN: the whole 2000 block is
        // pins, and they have no furnimap entry because they are worn, not
        // placed. The client then reports "Unknown object type code: 2010" and
        // "Cast definition for item 2010 not found!" every time the room loads,
        // for a row that can never render.
        if (!isFurniture(typeCode)) {
          reply(`${typeCode} is not furniture — the furnimap does not define it, so it cannot render.`);
          reply("Pins live in the 2000 block and are worn, not placed.");
          return true;
        }
        // ⚠ Pick a facing the item actually DEFINES. Direction 1 is the usual
        // default, but not every item has it — 1215 defines only 3 and 5 — and
        // a facing with no sprite set renders NOTHING while the placement
        // succeeds everywhere else: no error, no missing cast, the art loads,
        // and the tile stays empty. That cost a round of "I don't see this item
        // when placed" with a perfectly good item.
        const available = directionsFor(typeCode);
        const dir =
          requestedDir !== undefined
            ? requestedDir
            : available.includes(3)
              ? 3
              : available.includes(1)
                ? 1
                : (available[0] ?? 1);
        if (available.length > 0 && !available.includes(dir)) {
          reply(`${typeCode} has no artwork facing ${dir} — it defines ${available.join(", ")}.`);
          reply(`try: /place ${typeCode} ${available[0]}`);
          return true;
        }

        // ⚠ The whole footprint must land on real tiles, not just the anchor.
        // The client refuses a placement whose blocks run off the grid and
        // reports "Failed to set item into a tile!" — but it still keeps the
        // row, so the item is invisible and comes back on every room load.
        if (!fitsAt(currentGeometryRoom, currentTile, typeCode, dir)) {
          reply(`${typeCode} does not fit on tile ${currentTile} facing ${dir} — part of it is off the grid.`);
          reply("Stand further from the edge, or try another facing.");
          return true;
        }
        // Written to the table first, so the ref the client is told about is
        // the durable one — a restart replays the same item under the same id.
        const item = asPlaced(
          placeRoomItem(currentRoomName, live.userId, typeCode, currentTile, dir),
        );
        // Everyone in the room, not just the placer — an item only one person
        // can see would look like it worked when it had not.
        const params = createElements([item]);
        const audience = occupantsOf(currentRoomName);
        if (audience.length === 0) send(MSG.CREATE_ELEMENTS, params, undefined);
        else for (const occupant of audience) occupant.send(MSG.CREATE_ELEMENTS, params, undefined);
        console.log(
          `[${label}] placed item ref=${item.ref} type=${typeCode} ` +
            `on tile ${item.tile} dir=${dir} in ${currentRoomName}`,
        );
        reply(`placed ${typeCode} on tile ${item.tile} (ref ${item.ref})`);
        reply("walk off and back on to test it");
        return true;
      }

      case "tile":
        reply(`tile ${currentTile} in ${currentRoomName ?? "?"}`);
        return true;

      case "ghost": {
        // `/ghost` toggles. Ordinary players lose (or get back) the avatar;
        // staff and the ghost itself see it in the Invisibility look. Lasts
        // the session, across rooms (`sees`, `audienceOf`).
        ghosting = !ghosting;
        if (me && currentRoomName) {
          const room = currentRoomName;
          const self = me;
          const plain = occupantsOf(room).filter((o) => o.userId !== self.userId && !o.staff);
          self.ghost = ghosting;
          if (ghosting) {
            for (const o of plain) o.send(MSG.REMOVE_AVATAR, [{ int: self.userId }], `RemoveAvatar ${self.userId} (ghost)`);
            sendPulse(currentTile, LEGS_STAND); // the ghost look, to staff and self
          } else {
            self.magic = shownMagic();
            const slogan = sloganMessage(self);
            for (const o of plain) {
              o.send(MSG.CREATE_AVATARS, [{ int: 1 }, ...avatarBlock(self)], `CreateAvatars +1 ("${self.name}" unghosted)`);
              if (slogan) o.send(MSG.AVATAR_SLOGAN, slogan, undefined);
            }
            sendPulse(currentTile, LEGS_STAND); // the look off, for everyone
          }
        }
        console.log(`[${label}] ghost ${ghosting ? "ON" : "OFF"}`);
        reply(
          ghosting
            ? "Ghost ON: players can't see you here or in any room you enter. Staff see you as a ghost. /ghost again to reappear."
            : "Ghost OFF: everyone can see you again.",
        );
        return true;
      }

      case "warp":
      case "goto": {
        if (ints.length === 0) {
          reply("usage: /goto <roomCode>   e.g. /goto 48 (Esplanade)");
          reply(`${ROOM_CODES.size} codes, ${ROOM_IDS.length} with a loadable cast`);
          return true;
        }
        const code = ints[0];
        const cast = ROOM_CODES.get(code);
        if (!cast) {
          reply(`no room with code ${code}`);
          return true;
        }
        // Rooms without a loadable cast hang the load bar rather than failing,
        // so refuse them here instead of stranding the player on a dead screen.
        //
        // ⚠ Checked against LOADABLE_ROOMS, not ROOM_IDS. The latter is the
        // NAVIGATOR's list and excludes every unnamed room — which is all the
        // private/guest-room casts — so using it here refused perfectly loadable
        // rooms while blaming their casts.
        if (!LOADABLE_ROOMS.has(code)) {
          reply(`room ${code} (${cast}) has no loadable cast`);
          return true;
        }
        // ⚠ `/goto` deliberately IGNORES `BLOCKED_ROOMS`. Those rooms are closed
        // to players because their minigame is unimplemented, but a staff member
        // asking for one by code is testing exactly that — refusing would make
        // the blocked rooms the only ones nobody can ever look at. The block
        // still applies to the navigator, which is where players meet it.
        const blocked = BLOCKED_ROOMS.get(code);
        console.log(
          `[${label}] /goto ${code} (${ROOM_NAMES.get(code) ?? cast}) for "${characterName}"` +
            (blocked ? ` — BLOCKED room (${blocked}), entering anyway` : ""),
        );
        // No reply on success: the alert would land over the loading room.
        enterRoom(code);
        return true;
      }

      case "changename": {
        if (!may("forcenamechange")) {
          reply("/changename needs the forcenamechange permission");
          return true;
        }
        let parts = line.split(/\s*[=>]\s*/).map((p) => p.trim()).filter((p) => p.length > 0);
        if (parts.length !== 2 && !/[=>]/.test(line)) {
          const words = line.trim().split(/\s+/);
          parts = words.length === 2 ? words : [];
        }
        if (parts.length !== 2) {
          reply("/changename <old name> = <new name>");
          return true;
        }
        const [oldName, newName] = parts;
        const target = getMessengerUserByName(oldName);
        if (!target) {
          reply(`no player named "${oldName}"`);
          return true;
        }
        const verdict = judgeCharacterName(newName, target.id);
        if (!verdict.ok) {
          reply(`"${newName}": ${verdict.info}`);
          return true;
        }
        renameCharacter(target.id, newName);
        liveByUser.get(target.id)?.rename(newName);
        messengerRenamed(target.id);
        reply(`renamed ${target.name} to ${newName}`);
        console.log(`[${label}] ${characterName} renamed user ${target.id} "${target.name}" -> "${newName}"`);
        return true;
      }

      case "giveroom": {
        // `/giveroom <roomCode> [player name]` — a guest room built on ANY room
        // code whose casts load, catalogue or not. Same `addGuestRoom` as the
        // shop's; this one is free and may target another player.
        const code = ints[0];
        if (code === undefined) {
          const styles = guestRoomStyles().map((s) => `${s.code}=${s.space}`);
          reply("/giveroom <roomCode> [player name] - give a guest room (yourself if no name)");
          reply(`private styles: ${styles.join(" ")}`);
          return true;
        }
        // The name is everything after the code, so names with spaces work.
        const targetName = args.slice(1).join(" ").trim();
        const target = targetName ? getMessengerUserByName(targetName) : getMessengerUser(live.userId);
        if (!target) {
          reply(`no player named "${targetName}"`);
          return true;
        }
        const given = giveGuestRoom(target.id, target.name, code, target.id !== live.userId);
        if (typeof given === "string") {
          reply(given);
          return true;
        }
        reply(`gave room ${given.id} "${given.name}" (${code} = ${ROOM_CODES.get(code)}) to ${target.name}`);
        console.log(
          `[${label}] ${characterName} gave room ${given.id} (${code} = ${ROOM_CODES.get(code)}) to ${target.name} (${target.id})`,
        );
        return true;
      }

      case "feature": {
        // `/feature [spaceId]` — toggle a guest room's Mickey spot at the top
        // of Popular Guest Rooms. No id: the guest room you are standing in.
        const room = ints[0] !== undefined ? getGuestRoom(ints[0]) : currentGuestRoom();
        if (!room) {
          const list = getFeaturedGuestRooms().map((r) => `${r.id} "${r.name}"`);
          reply("/feature [spaceId] - toggle a guest room's Mickey spot in Popular (no id: this room)");
          reply(`featured now: ${list.join(", ") || "none"}`);
          return true;
        }
        const updated = setGuestRoomFeatured(room.id, !room.featured);
        reply(`${updated?.featured ? "featured" : "unfeatured"} ${room.id} "${room.name}"`);
        console.log(`[${label}] ${characterName} ${updated?.featured ? "featured" : "unfeatured"} room ${room.id}`);
        return true;
      }

      case "sword": {
        const mode = (args[0] ?? "win").toLowerCase();
        if (mode !== "win" && mode !== "fail") {
          reply("/sword [win|fail] - pull the sword in the Fantasyland Courtyard now, no pin needed");
          return true;
        }
        if (currentRoomCode !== DARK_RIDE_COURTYARD) {
          reply("/sword only works in the Fantasyland Courtyard");
          return true;
        }
        if (drawSword(null, mode === "win")) reply(`pulling the sword: ${mode}`);
        return true;
      }

      case "credits": {
        const amountArg = args[0];
        if (amountArg === undefined) {
          reply(`credits: ${getUserById(live.userId)?.credits ?? 0}`);
          return true;
        }
        const amount = /^([+-]?)(\d+)$/.exec(amountArg);
        if (!amount) {
          reply("/credits <n> [player] - set a balance; /credits +n or -n [player] - add or take");
          return true;
        }
        const words = line.trim().split(/\s+/);
        const targetName = (words[0] === amountArg ? words.slice(1) : words).join(" ").trim();
        const target = targetName ? getMessengerUserByName(targetName) : getMessengerUser(live.userId);
        if (!target) {
          reply(`no player named "${targetName}"`);
          return true;
        }
        const current = getUserById(target.id)?.credits ?? 0;
        const n = Number(amount[2]);
        const next = Math.max(0, amount[1] === "+" ? current + n : amount[1] === "-" ? current - n : n);
        setCredits(target.id, next, `Staff Command (${characterName})`, null, live.userId);
        liveByUser.get(target.id)?.send(MSG.RECEIVE_CREDITS, [{ int: next }], `ReceiveCredits ${next}`);
        reply(`${target.name}: ${current} -> ${next} credits`);
        console.log(`[${label}] ${characterName} set credits of "${target.name}" (${target.id}) ${current} -> ${next}`);
        return true;
      }

      case "camera": {
        // `/camera [film]` — a camera plus film (default 3, like the shop's
        // "Camera and 3 film"). Stand-in until the camera is on sale.
        const film = grantCamera(live.userId, ints[0] ?? 3);
        send(MSG.CAMERA_STATUS, [{ int: 1 }], "CameraStatus hasCamera=1");
        send(MSG.FILM_COUNTER, [{ int: film }], `FilmCounter ${film}`);
        reply(`camera: yes, film: ${film}`);
        return true;
      }

      default:
        // Swallowed, not broadcast — a typo must never reach the room.
        reply(`unknown command "${name}" - try /commands`);
        return true;
    }
  };

  /**
   * The six settings ints, in the order `CSoundHandler.GetSoundSettings` reads
   * them. Always from storage — pushing literals is what used to overwrite a
   * player's choices at the next login.
   */
  const settingsParams = (): OutgoingParam[] => {
    const s = live ? getSettings(live.userId) : DEFAULT_SETTINGS;
    return [
      { int: s.fx },
      { int: s.music },
      { int: s.ui },
      { int: s.volume },
      { int: s.tutorial },
      { int: s.tradeRequests },
    ];
  };

  /** Log note for a settings push — the real values, not a hardcoded guess. */
  const settingsNote = (why: string): string => {
    const s = live ? getSettings(live.userId) : DEFAULT_SETTINGS;
    return (
      `GetSoundSettings (${why}) fx=${s.fx} music=${s.music} ui=${s.ui} ` +
      `vol=${s.volume} tutorial=${s.tutorial} trade=${s.tradeRequests}`
    );
  };

  /** This player's moderator permissions, as the wire indices `2510` wants. */
  const permissionsFor = (): number[] =>
    live ? (getUserById(live.userId)?.permissions ?? []) : [];

  /**
   * Staff = any moderator permission. Staff speak outside the chat dictionary:
   * their unrecognised words are passed on as typed, never censored to ***.
   */
  const isStaff = (): boolean => permissionsFor().length > 0;

  /** The same, as names — for logs only; the wire never carries these. */
  const permissionNames = (): string[] =>
    permissionsFor().map((p) => PERMISSIONS[p - 1] ?? `?${p}`);

  /** Does this player hold a given moderator power? */
  const may = (name: Permission): boolean => permissionsFor().includes(permissionIndex(name));

  /**
   * Tell the client what it is worth.
   *
   * ⚠ This is not optional book-keeping — the CREDIT tab CRASHES without it.
   * `CInventoryComponent.construct` sets `m_iCredits = 0`, an INTEGER, and only
   * `_UpdateCreditBalance` (reached solely through this message) replaces it
   * with the property list `[#credits: [0: n]]` the views expect. Opening the
   * tab runs `_ChangePage` → `CInvPageCredits.update`, which immediately calls
   * `.getaProp(#credits)` — on an integer that is a script error.
   *
   * The real client usually got away with it because the CATALOG sends
   * `RequestBalance` on open, priming the value; the Stuff window itself never
   * asks. So we push it at room entry, by which point every thread is up.
   */
  /** Last catalogue page answered, and when — see SHOP_DEDUPE_MS. */
  let lastCataloguePage = -1;
  let lastCatalogueAt = 0;

  const sendCredits = () => {
    const credits = live ? (getUserById(live.userId)?.credits ?? 0) : 0;
    send(MSG.RECEIVE_CREDITS, [{ int: credits }], `ReceiveCredits ${credits}`);
  };

  /**
   * The guest room this connection is standing in, if any.
   *
   * `currentRoomName` is `guest:<id>` inside a guest room and a cast name in a
   * public one, so this is the one place that decoding lives.
   */
  /**
   * Send one inventory grid: `2532 ReceiveItemList`.
   *
   * ⚠ This is the ONLY way to add something to a grid. `CInventoryHandler`
   * registers `2520 _RemItemsFromList` for removal but has no add counterpart,
   * so anything that gives a player an item — picking furniture up, clearing a
   * room — has to resend the whole list or the grid keeps showing the old
   * contents until something else happens to refresh it. That is why "take
   * away" looked like it destroyed furniture even though the row was written.
   *
   * The second int is the clear flag: 1 means replace, which is what makes a
   * full resend correct rather than duplicating rows.
   *
   * ⚠ A furniture ref is the ITEM ROW id, not the type code — you can own four
   * of one chair, and a type-code ref would collapse them into a single entry
   * the client cannot tell apart. Clothing uses the set id because ownership
   * there is unique by construction. `PLACE_ITEM` relies on this: the ref it
   * receives back is the row to consume.
   */
  /**
   * Send one inventory grid: `2532 ReceiveItemList`.
   *
   * Four rules, each of them learned the hard way. Breaking any one produces a
   * client crash rather than a visible error, so they are worth stating:
   *
   * 1. EVERY MESSAGE CARRIES EVERY CATEGORY. `_ReceiveItemList` rebuilds all
   *    four buckets from scratch per message and then pushes all four into the
   *    inventory. The clear flag only decides whether `ClearItems()` runs
   *    first — it does NOT make a message partial. A furniture-only message
   *    therefore tells the client you own no clothing. Inventory 1 cannot be
   *    split; only the gap between whole messages can be widened.
   *
   * 2. FIELD SHAPE DIFFERS PER CATEGORY. After the five common fields
   *    (ref, typeCode, category, itemGroup, itemCount) the client reads:
   *      1 items    int paramCount, then that many ints
   *      2 clothes  nothing
   *      3 posters  nothing
   *      4 pins     int param, int singleUse, int expiryDate
   *    Get this wrong and the rest of the list is read at the wrong offsets.
   *
   * 3. ONE ENTRY PER GROUP, WITH A COUNT. The client's map is keyed on
   *    itemGroup, so two entries sharing a group overwrite each other. Four
   *    identical chairs are one entry with itemCount 4, not four entries.
   *
   * 4. A FURNITURE REF IS THE ITEM ROW ID. `PLACE_ITEM` consumes exactly the
   *    ref it is given, so it has to name a row. Clothing can use the set id
   *    because ownership there is unique by construction.
   *
   * It is also the ONLY way to add to a grid — there is no "add item" message,
   * only `2520` for removal — so anything that grants an item resends this.
   */
  /** When the last inventory refresh went out, and any pending coalesced one. */
  let lastItemListAt = 0;
  let itemListTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * `2536 _ReceiveWornPins` — the whole lanyard (inventory 3), replacing it.
   * Per pin `int ref, int code, int param, int singleUse, int expiry, str group`
   * — group LAST, unlike `2532`. Each worn pin is its own entry (`w<rowId>`),
   * because two of the same pin on a lanyard are two pins.
   * ⚠ Always sent, even empty: it is what initialises the worn grid.
   */
  /** Take one pin off the client's lanyard grid. See `MSG.PIN_UNWORN`. */
  const removeWornPin = (pinId: number): void => {
    send(
      MSG.PIN_UNWORN,
      [{ int: pinId }, { int: -1 }, { str: `w${pinId}` }, { str: "" }],
      `PinUnworn ${pinId}`,
    );
  };

  const sendWornPins = (): void => {
    const worn = live ? getWornPins(live.userId) : [];
    const params: OutgoingParam[] = [{ int: worn.length }];
    for (const pin of worn) {
      params.push(
        { int: pin.id },
        { int: pin.typeCode },
        { int: pinLevel(pin) },
        { int: isSingleUsePin(pin.typeCode) ? 1 : 0 },
        { int: 0 }, // expiry
        { str: `w${pin.id}` },
      );
    }
    send(MSG.RECEIVE_WORN_PINS, params, `ReceiveWornPins ${worn.length}`);
  };

  const sendItemList = (inventoryId: number): void => {
    // Clothes, furniture and pins all live in inventory 1; 3 is worn pins,
    // 5 is VMKs, and both are empty until those systems exist.
    const mine = (category: number) =>
      inventoryId === 1 && live ? getOwnedItems(live.userId, category) : [];
    const clothes = inventoryId === 1 ? ownedClothingSets() : [];
    const allFurni = INV_FURNITURE
      ? mine(ITEM_CATEGORY.items).filter(
          (row) => !INV_FURNITURE_PREVIEWABLE_ONLY || previewable(row.typeCode),
        )
      : [];
    // ⚠ Takes the LEAST previewable first, deliberately. The point of the cap
    // is to hold the row count fixed while sending the items the previewable
    // filter would have removed — sending the same easy ones would prove
    // nothing.
    const furni =
      INV_FURNITURE_LIMIT === null
        ? allFurni
        : [...allFurni]
            .sort((a, b) => Number(previewable(a.typeCode)) - Number(previewable(b.typeCode)))
            .slice(0, INV_FURNITURE_LIMIT);
    // Worn pins live in inventory 3 (the lanyard), not in the main grid.
    const pins = mine(ITEM_CATEGORY.pins).filter((row) => !row.worn);
    // ⚠ Posters were bought but never advertised. `CMD.BUY` already files
    // inventoryType 3 under ITEM_CATEGORY.posters, so a purchased poster was
    // charged for, stored, and then never appeared in any tab — it looked like
    // the credits vanished for nothing. The catalogue sells 17 of them.
    const posters = mine(ITEM_CATEGORY.posters);

    // Rule 3: collapse to one entry per type, keeping the first row as the ref.
    const group = (rows: Array<{ id: number; typeCode: number }>) => {
      const byType = new Map<number, number[]>();
      for (const row of rows) {
        if (!byType.has(row.typeCode)) byType.set(row.typeCode, []);
        byType.get(row.typeCode)!.push(row.id);
      }
      return byType;
    };
    // Teleporter halves: ONE slot per pair ("each pair occupies a single
    // inventory slot"), filed under `p<pairId>` like tickets are under
    // `t<id>`, so two pairs of the same teleporter never merge. The count is
    // how many halves are still in the inventory; placing takes the first.
    const furniPairs = new Map<number, { typeCode: number; ids: number[] }>();
    for (const row of furni) {
      if (!row.pair) continue;
      const entry = furniPairs.get(row.pair.id) ?? { typeCode: row.typeCode, ids: [] };
      entry.ids.push(row.id);
      furniPairs.set(row.pair.id, entry);
    }
    const furniByType = group(furni.filter((row) => !row.pair));
    // Pins group by type AND stars: a 3-star pin and a 1-star pin of the same
    // magic are different things to combine, so they must not share a slot.
    const pinsByType = new Map<string, { typeCode: number; level: number; ids: number[] }>();
    for (const row of pins) {
      const level = pinLevel(row);
      // ⚠ A multi-use MAGIC pin gets a slot of its own (`m<rowId>`). COMBINE
      // asks the player to pick a SECOND slot and `CInvPagePins` refuses the
      // one already selected, so two identical pins sharing a slot could never
      // be combined. Ordinary and single-use pins still stack by type.
      const key = level > 0 && !isSingleUsePin(row.typeCode)
        ? `m${row.id}`
        : level > 0 ? `${row.typeCode}.${level}` : String(row.typeCode);
      const entry = pinsByType.get(key) ?? { typeCode: row.typeCode, level, ids: [] };
      entry.ids.push(row.id);
      pinsByType.set(key, entry);
    }
    const postersByType = group(posters);
    // Room tickets: ONE entry per ticket, never grouped — each opens its own
    // room and expires on its own date. See the loop below and `2533`.
    const tickets = inventoryId === 1 && live ? getTickets(live.userId) : [];

    const params: OutgoingParam[] = [
      { int: inventoryId },
      { int: 1 }, // clear: replace the grid's contents
      // ⚠ The count must match the entries written below EXACTLY. The client
      // reads this many records and then keeps reading the stream as the next
      // field, so a count that is one out desynchronises the whole message
      // rather than dropping one row.
      { int: clothes.length + furniByType.size + furniPairs.size + pinsByType.size + postersByType.size + tickets.length },
    ];
    for (const setId of clothes) {
      params.push(
        { int: setId },
        { int: setId },
        { int: CLOTHES_CATEGORY },
        { str: String(setId) },
        { int: 1 },
      );
    }
    for (const [typeCode, ids] of furniByType) {
      params.push(
        { int: ids[0] },
        { int: typeCode },
        { int: ITEM_CATEGORY_FURNITURE },
        { str: String(typeCode) },
        { int: ids.length },
        { int: 0 }, // rule 2: paramCount
      );
    }
    for (const [pairId, { typeCode, ids }] of furniPairs) {
      params.push(
        { int: ids[0] },
        { int: typeCode },
        { int: ITEM_CATEGORY_FURNITURE },
        { str: `p${pairId}` },
        { int: ids.length },
        { int: 0 }, // paramCount
      );
    }
    // ⚠ Posters take the BASE five fields and nothing else. `_ReceiveItemList`
    // reads an extra int for category 1 (paramCount) and three for category 4
    // (param, singleUse, expiryDate), but its category 3 branch just sets
    // `t_iParam = 0` and reads nothing — so appending a param here would shift
    // every following record.
    for (const [typeCode, ids] of postersByType) {
      params.push(
        { int: ids[0] },
        { int: typeCode },
        { int: ITEM_CATEGORY.posters },
        { str: String(typeCode) },
        { int: ids.length },
      );
    }
    for (const [groupKey, { typeCode, level, ids }] of pinsByType) {
      params.push(
        { int: ids[0] },
        { int: typeCode },
        { int: ITEM_CATEGORY.pins },
        { str: groupKey },
        { int: ids.length },
        // param = stars. `CInvPagePins` enables COMBINE only when > 0 and
        // draws that many stars; ordinary pins stay 0.
        { int: level },
        { int: isSingleUsePin(typeCode) ? 1 : 0 },
        { int: 0 }, // expiryDate: 0 = never
      );
    }
    /**
     * ⚠ The GROUP string is the key the client files each record under
     * (`GetItemListByCategory` is a proplist group -> record), and the key its
     * `2533` details attach to. Tickets therefore need a group of their own —
     * `t<rowId>` — or they overwrite each other.
     *
     * `singleUse` 1 is what makes the pins page print "Good for …'s Room", and
     * `expiryDate` is SECONDS REMAINING (both readers divide by 3600, then 24).
     */
    for (const ticket of tickets) {
      params.push(
        { int: ticket.id },
        { int: ticket.typeCode },
        { int: ITEM_CATEGORY.pins },
        { str: `t${ticket.id}` },
        { int: 1 },
        { int: 0 }, // param
        { int: 1 }, // singleUse
        { int: Math.max(0, Math.floor((ticket.expiresAt - Date.now()) / 1000)) },
      );
    }

    send(
      MSG.RECEIVE_ITEM_LIST,
      params,
      `ReceiveItemList inventory=${inventoryId} (${clothes.length} clothing, ` +
        `${furni.length} furniture in ${furniByType.size}, ` +
        `${pins.length} pins in ${pinsByType.size}, ` +
        `${posters.length} posters in ${postersByType.size}, ${tickets.length} tickets)`,
    );
    /**
     * `2533` — the "Good for" line. AFTER 2532, always: the client only files a
     * detail under a group that already exists in the pins list. The value is
     * the room OWNER's name; the client appends "'s Room" itself.
     */
    if (tickets.length > 0) {
      const details: OutgoingParam[] = [{ int: inventoryId }, { int: 0 }, { int: tickets.length }];
      for (const ticket of tickets) {
        const room = getGuestRoom(ticket.spaceId);
        details.push(
          { str: `t${ticket.id}` },
          { int: 1 },
          { str: "goodfor" },
          { str: wireText(room ? ownerNameFor(room) : "?") },
        );
      }
      send(MSG.INVENTORY_ITEM_DETAILS, details, `ItemDetailsInInventory ${tickets.length} ticket(s)`);
    }
    lastItemListAt = Date.now();
  };

  /**
   * Send an inventory refresh, but never two in quick succession.
   *
   * ⚠ REPLACING THE ITEM LIST WHILE THE CLIENT IS LOADING THUMBNAILS CRASHES
   * THE GRID. `CInvPageItems.update` asks for thumbnails asynchronously
   * (`GetFurniThumbnail` -> `_FurniThumbsReadyCbk`), and the callback then
   * walks the CURRENT list BY POSITION:
   *
   *     t_iOffset = (m_iCurrentPage - 1) * m_iItemsPerPage
   *     t_rItem   = m_mp_kType_mp_iRef_rItem[#items][t_iOffset + i]
   *     … t_rItem[#items] …
   *
   * Its `m_iLoadingRequest` guard rejects a stale THUMBNAIL reply, but nothing
   * guards against the item list having been replaced meanwhile. A second
   * `2532` in that window shortens the list, the index runs off the end,
   * `t_rItem` is VOID, and dereferencing it is the bare "Object expected" that
   * has been spinning the tab all along.
   *
   * That is why it looked like a volume limit: more rows means a longer
   * thumbnail load, which means a wider window to lose the race. It broke most
   * often while buying, because every purchase refreshed the list immediately.
   *
   * Coalescing to one refresh per window closes it without hiding any item.
   * The send always reads current state, so a delayed refresh is never stale.
   *   $env:VMK_INV_COALESCE_MS = "0"   # send immediately, as before
   */
  const INV_COALESCE_MS = Number(process.env.VMK_INV_COALESCE_MS ?? 1500);
  const queueItemList = (inventoryId: number): void => {
    if (!(INV_COALESCE_MS > 0)) {
      sendItemList(inventoryId);
      return;
    }
    // One already pending: it will read the latest state when it fires, so
    // there is nothing to add.
    if (itemListTimer) return;
    const since = Date.now() - lastItemListAt;
    if (since >= INV_COALESCE_MS) {
      sendItemList(inventoryId);
      return;
    }
    itemListTimer = setTimeout(() => {
      itemListTimer = null;
      sendItemList(inventoryId);
    }, INV_COALESCE_MS - since);
  };


  /**
   * `2930 _ListItemGroups`: re-count ONE inventory slot in place after
   * something left it — `[inventoryId, count, {str group, int items, int ref}]`.
   * `items` 0 deletes the slot. Unlike a full `2532` this leaves the grid's
   * page and pending thumbnail loads alone (see `queueItemList`).
   *
   * ⚠ Only for slots that already exist. The `#all` path files a group it does
   * not know under `#undefined`, which no page shows — so an item ARRIVING
   * (pick-up, purchase) still needs the full list.
   */
  const sendGroupCount = (category: number, typeCode: number, pairId?: number): void => {
    if (!live) return;
    // The diagnostic furniture filters change what the grid holds; keep the
    // full resend under them rather than second-guess it.
    if (category === ITEM_CATEGORY.items && (INV_FURNITURE_PREVIEWABLE_ONLY || INV_FURNITURE_LIMIT !== null)) {
      queueItemList(1);
      return;
    }
    const rows = getOwnedItems(live.userId, category).filter(
      (row) =>
        row.typeCode === typeCode &&
        !row.worn &&
        (pairId === undefined ? !row.pair : row.pair?.id === pairId),
    );
    const group = pairId === undefined ? String(typeCode) : `p${pairId}`;
    send(
      MSG.LIST_ITEM_GROUPS,
      [{ int: 1 }, { int: 1 }, { str: group }, { int: rows.length }, { int: rows[0]?.id ?? 0 }],
      `ListItemGroups ${group} -> ${rows.length}`,
    );
  };

  const currentGuestRoom = (): GuestRoom | undefined =>
    currentRoomName?.startsWith("guest:")
      ? getGuestRoom(Number(currentRoomName.slice("guest:".length)))
      : undefined;

  /** What Housekeeping's chat log calls the room this player stands in. */
  const roomTitle = (): string => {
    const guest = currentGuestRoom();
    if (guest) return guest.name;
    if (currentRoomCode === undefined) return "";
    return ROOM_NAMES.get(currentRoomCode) ?? ROOM_CODES.get(currentRoomCode) ?? `Room ${currentRoomCode}`;
  };

  /** One chat-log line, stamped with where it was said. */
  const logLine = (kind: "chat" | "trade" | "command" | "system", message: string, targetId?: number) => {
    if (!live) return;
    logChat({
      userId: live.userId,
      room: currentRoomName,
      roomCode: currentGuestRoom()?.id ?? currentRoomCode,
      roomName: roomTitle(),
      kind,
      message,
      targetId,
    });
  };

  /** "User entered room: 'Main Street' (1)" — the moderator's breadcrumb trail. */
  const logRoomMove = (what: "entered" | "left", _userId: number) => {
    const id = currentGuestRoom()?.id ?? currentRoomCode;
    logLine("system", `User ${what} room: '${roomTitle()}' (${id ?? "?"})`);
  };

  /**
   * Animate the face for roughly as long as the chat bubble is up.
   *
   * Longer messages stay on screen longer, so the mouth should too — a fixed
   * duration leaves a long message ending in a still face, or a short one
   * mouthing at nothing.
   */
  const startTalking = (tokenCount: number) => {
    if (talkTimer) clearTimeout(talkTimer);
    mouth = MOUTH_TALKING;
    sendPulse(currentTile, LEGS_STAND); // same tile: a pose change, not a move
    const ms = Math.min(TALK_MAX_MS, TALK_BASE_MS + tokenCount * TALK_PER_TOKEN_MS);
    talkTimer = setTimeout(() => {
      talkTimer = undefined;
      mouth = MOUTH_CLOSED;
      sendPulse(currentTile, LEGS_STAND);
    }, ms);
  };

  /**
   * May this player walk into this guest room? One of the five `ENTRY_STATE`s
   * the owner picks in "Change Who Can Enter". The owner always may; so does
   * staff, who have to be able to reach any room to moderate it.
   */
  type EntryVerdict =
    | { ok: true; byTicket: boolean }
    | { ok: false; why: string; needsTicket: boolean };
  const entryVerdict = (room: GuestRoom): EntryVerdict => {
    if (!live) return { ok: false, why: "not logged in", needsTicket: false };
    if (room.ownerId === live.userId || may("kick")) return { ok: true, byTicket: false };
    const friend = () => areFriends(room.ownerId, live!.userId);
    const ticket = () => hasValidTicket(live!.userId, room.id);
    switch (room.entryState) {
      case ENTRY_STATE.EVERYONE:
        return { ok: true, byTicket: false };
      case ENTRY_STATE.FRIENDS:
        return friend() ? { ok: true, byTicket: false } : { ok: false, why: "friends only", needsTicket: false };
      case ENTRY_STATE.TICKETS:
        return ticket() ? { ok: true, byTicket: true } : { ok: false, why: "ticket holders only", needsTicket: true };
      case ENTRY_STATE.FRIENDS_AND_TICKETS:
        // A friend walks in free; only a stranger spends a ticket.
        if (friend()) return { ok: true, byTicket: false };
        return ticket()
          ? { ok: true, byTicket: true }
          : { ok: false, why: "friends and ticket holders only", needsTicket: true };
      case ENTRY_STATE.OWNER:
        return { ok: false, why: "owner only", needsTicket: false };
    }
  };

  /**
   * The ONLY way into a guest room — the navigator (30), a guest id arriving
   * on 31, and the messenger's "go to friend" all come through here, so the
   * owner's entry setting cannot be walked around.
   */
  const enterGuestRoom = (room: GuestRoom): boolean => {
    // Booted by the owner a moment ago: "Booted!" again, until the wait is up.
    // `2040 [room, 1000]` cancels the load and shows the kicked dialog.
    if (live && room.ownerId !== live.userId && bootedUntil(`guest:${room.id}`, live.userId)) {
      console.log(`[${label}] entry to guest room ${room.id} REFUSED: booted`);
      send(MSG.ENTRANCE_DENIED, [{ int: room.id }, { int: 1000 }], `EntranceDenied ${room.id} (booted)`);
      return false;
    }
    const verdict = entryVerdict(room);
    if (!verdict.ok) {
      console.log(`[${label}] entry to guest room ${room.id} "${room.name}" REFUSED: ${verdict.why}`);
      refuseEntry(room, verdict.needsTicket);
      return false;
    }
    let firstTicketUse = false;
    if (verdict.byTicket && live) {
      // `error.4603`: "Your ticket for this guest room has been used. It will
      // still be valid for 2 hours until it expires." The first use starts
      // that clock (see `useTicket`); re-entering inside it costs nothing.
      const used = useTicket(live.userId, room.id);
      firstTicketUse = used?.firstUse ?? false;
      console.log(
        `[${label}] entered guest room ${room.id} on ticket ${used?.id ?? "?"}` +
          `${firstTicketUse ? " (first use: 2-hour grace starts)" : " (already used, within grace)"}`,
      );
      // The pin's days-left line changes, so the grid has to hear about it.
      if (firstTicketUse) queueItemList(1);
    }
    enterRoom(room.style, room);
    if (firstTicketUse) send(MSG.GENERIC_ERROR, [{ int: 4603 }], "GenericError 4603 (ticket used)");
    return true;
  };

  /**
   * Tell a player they may not come in. See `enterGuestRoom`.
   *
   * ⚠ Something has to CANCEL the load, or the client sits on the load bar
   * waiting for a room that never comes. Two client-owned paths do that:
   *   - a ticket room: `2040 [spaceId, 1001]` — cancels, reopens the navigator
   *     and shows the client's own "no valid ticket" dialog;
   *   - friends-only / owner-only: `2042` cancels, and `2000 [25]` shows
   *     `error.25` "This is a guest room with limited access…". The client has
   *     no friends-specific text.
   */
  const refuseEntry = (room: GuestRoom, needsTicket: boolean) => {
    if (needsTicket) {
      send(MSG.ENTRANCE_DENIED, [{ int: room.id }, { int: 1001 }], `EntranceDenied ${room.id} (no ticket)`);
      return;
    }
    send(MSG.CANCEL_ROOM_LOAD, [], "CancelRoomLoad (limited access)");
    send(MSG.GENERIC_ERROR, [{ int: 25 }], "GenericError 25 (limited access)");
  };

  /**
   * Put this connection into a room and send everything entry needs.
   *
   * `roomCode` is the PUBLIC room whose casts the client loads. `guestRoom`,
   * when given, is the player's own room built from those casts: it keeps its
   * own occupancy bucket, so two players who chose the same style get separate
   * rooms rather than sharing one space.
   */
  /**
   * Leaving the room ends any trade. The client closes its own window on
   * `room_leave` (`CInventoryComponent`) WITHOUT telling us, so the partner
   * would be left in a trade with nobody.
   */
  const cancelMyTrade = () => {
    const trade = live ? tradeOf.get(live.userId) : undefined;
    if (trade) endTrade(trade, true);
  };

  /** "<Minigame> is not implemented yet" — for a BLOCKED_ROOMS room, however it was reached. */
  const alertBlocked = (blocked: string) =>
    send(
      MSG.ADMIN_MESSAGE,
      [
        // The label starts the sentence, so BLOCKED_ROOMS capitalises its
        // articles ("The Haunted Mansion", not "the Haunted Mansion").
        { str: `${blocked} is not implemented yet. Stay tuned!` },
        // Target picks only the dialog TITLE. 0 gives "Personal Message
        // from VMK Staff", which is 31 characters and clips to "...VMK
        // Staf" in the header. 3 gives "VMK Staff Alert to VMK" — shorter,
        // fits, and reads as a service notice rather than a DM, which is
        // what this actually is.
        { int: 3 },
      ],
      `AdminMessage alert (blocked: ${blocked})`,
    );

  const enterRoom = (roomCode: number, guestRoom?: GuestRoom) => {
    const fromCode = currentRoomCode;
    if (live && fromCode !== undefined) logRoomMove("left", live.userId);
    if (
      currentRoomCode !== undefined &&
      !currentRoomName?.startsWith("guest:") &&
      !MONORAIL_ROOM_CODES.has(currentRoomCode)
    ) {
      backRoomCode = currentRoomCode;
    }
    cancelMyTrade();
    // Leaving the Jungle Cruise any way at all ends the game (no reward).
    if (jcGame) {
      jcGame.stop();
      jcGame = null;
    }
    // Off the music stage by leaving the room: the queue drops them itself.
    if (performance) {
      clearTimeout(performance.timer);
      performance = null;
      dancing = false;
    }
    stopWalking(); // any in-flight walk belongs to the room we just left
    // Drop out of the old room's occupancy so the people still there are told
    // to remove this avatar, rather than leaving a ghost standing about.
    if (me) {
      leaveRoom(currentRoomName, me.userId);
      me = null;
    }
    if (live && roomCode !== FW_LOBBY_ROOM) fwLobbyLeave(live.userId);
    // Out of a Pirates lobby unless we stay in it (a match's way back re-enters
    // the same lobby); 1001 -> 1010 leaves 1001's.
    if (live && (!isPotcLobby(roomCode) || roomCode !== currentRoomCode)) potcLobbyLeave(live.userId);
    // The HM lobby the same way: a match's way back re-enters 1104.
    if (live && roomCode !== HM_LOBBY_ROOM) hmLobbyLeave(live.userId);
    const castRoom = ROOM_CODES.get(roomCode);
    currentRoomName = guestRoom ? `guest:${guestRoom.id}` : castRoom;
    // Six stations share room 14: each land's platform is its own bucket. Off
    // the train you land on the stop it stands at; from a land, on that land's.
    if (!guestRoom && roomCode === MONORAIL_STATION) {
      stationStop =
        pendingStationStop ?? (fromCode !== undefined ? LAND_STATION[fromCode] : undefined) ?? stationStop;
      currentRoomName = stationBucket(stationStop);
    }
    pendingStationStop = null;
    // Each train is its own car. Boarded: that train; any other way in (staff
    // /goto), whichever is standing at a platform, else the first.
    if (!guestRoom && roomCode === MONORAIL_TRAIN) {
      trainId = pendingTrain ?? trains.find((t) => t.state === 1)?.id ?? 0;
      currentRoomName = trainBucket(trainId);
    }
    pendingTrain = null;
    // A mixing room is a blank room under a full-screen window: everyone gets
    // their OWN, so nobody's avatar stands about behind someone else's mixer.
    // Remember where they came from — CloseMixer sends them back there.
    if (!guestRoom && (roomCode === STREET_MIXER_ROOM || roomCode === MONORAIL_MIXER_ROOM)) {
      currentRoomName = `mixer#${live ? live.userId : 1}`;
      if (fromCode !== undefined && fromCode !== STREET_MIXER_ROOM && fromCode !== MONORAIL_MIXER_ROOM) {
        mixerReturn = fromCode === MONORAIL_TRAIN ? { code: fromCode, train: trainId } : { code: fromCode };
      }
    }
    // The Jungle Cruise is one boat per player: nobody else is on your river.
    if (!guestRoom && roomCode === JC_GAME_ROOM) currentRoomName = `jc#${live ? live.userId : 1}`;
    if (!guestRoom && isDarkRideScene(roomCode)) currentRoomName = darkRideSceneKey(roomCode);
    if (darkRide && !(isDarkRideScene(roomCode) && roomCode === darkRide.scene)) {
      clearTimeout(darkRide.timer);
      darkRide = null;
      ridingUntil = 0;
    }
    if (!darkRide && ridingUntil === Number.MAX_SAFE_INTEGER) ridingUntil = 0;
    currentRoomCode = roomCode;
    if (live) logRoomMove("entered", live.userId);
    // Tiles always come from the CASTS, whoever owns the room.
    currentGeometryRoom = castRoom;
    // A code that reuses another room's space cast has no geometry of its own —
    // fall back to the cast's name. `spawnTileFor` returning null is the test
    // for "we have no tiles for this name at all".
    if (currentGeometryRoom && spawnTileFor(currentGeometryRoom) === null) {
      const alias = GEOMETRY_ALIAS.get(roomCode);
      if (alias && spawnTileFor(alias) !== null) {
        console.log(
          `[${label}] room ${roomCode} (${currentGeometryRoom}) has no geometry — ` +
            `using its space cast's, ${alias}`,
        );
        currentGeometryRoom = alias;
      }
    }

    const derivedSpawn = spawnTileFor(currentGeometryRoom);
    let spawnSource: string;
    if (SPAWN_TILE_OVERRIDE !== null) {
      currentTile = SPAWN_TILE_OVERRIDE;
      spawnSource = "VMK_SPAWN_TILE override";
    } else if (derivedSpawn !== null) {
      currentTile = derivedSpawn;
      spawnSource = `${currentGeometryRoom} geometry`;
    } else {
      currentTile = 0;
      spawnSource = `no geometry for ${currentGeometryRoom ?? "?"} — falling back to tile 0`;
    }
    // Arriving by teleporter: land on the partner, not at the door.
    if (pendingArrival && pendingArrival.room === currentRoomName) {
      // The pad, worked out NOW: its tiles are this room's geometry.
      currentTile = teleporterPad(pendingArrival.partner);
      facing = pendingArrival.facing;
      spawnSource = "teleporter partner";
    }
    pendingArrival = null;
    // Arriving through an exit: stand in the doorway on this side, on its
    // middle tile or as near it as the crowd allows.
    if (pendingDoor && pendingDoor.code === roomCode && !guestRoom) {
      const doorway = pendingDoor.tiles;
      currentTile = freeTileNear(
        currentGeometryRoom,
        doorway[Math.floor(doorway.length / 2)],
        new Set(occupiedTiles(currentRoomName, live ? live.userId : 1)),
      );
      if (pendingDoor.face !== undefined) facing = pendingDoor.face;
      spawnSource = "doorway";
    }
    pendingDoor = null;
    // The Waterpark Pool is entered down a slide (see WATERPARK_SLIDES).
    pendingSlide = null;
    if (!guestRoom && castRoom === WATERPARK_POOL) {
      const slide = WATERPARK_SLIDES[nextSlide++ % WATERPARK_SLIDES.length];
      const top = tileNamed(currentGeometryRoom, slide.top);
      if (top !== null) {
        currentTile = top;
        pendingSlide = slide;
        spawnSource = `top of ${slide.top.replace(/_1$/, "")}`;
      }
    }
    console.log(`[${label}] spawn tile ${currentTile} (${spawnSource})`);
    if (FACING_DEMO) {
      // Rotate on the spot so the direction table can be read off the screen.
      let dir = 0;
      walkTimer = setInterval(() => {
        facing = dir % 8;
        console.log(`[${label}] FACING DEMO — now sending direction ${facing}`);
        sendPulse(currentTile, LEGS_STAND);
        dir++;
      }, FACING_DEMO_MS);
    }

    const title = guestRoom?.name ?? ROOM_NAMES.get(roomCode) ?? castRoom ?? `Room ${roomCode}`;
    // roomVer/roomRef: the client uses roomRef only to look up an optional
    // `preload.<roomRef>` variable, and skips the preload when it is absent.
    send(
      MSG.ENTER_ROOM,
      // roomText is what the client shows on the load bar (ShowLoadBar), so it
      // must be the room's NAME, not a debug string.
      [{ int: roomCode }, { int: 0 }, { str: title }, { int: (guestRoom || !DARK_RIDE_PRELOAD ? undefined : darkRidePreloadRef(roomCode)) ?? roomCode }],
      `EnterRoom code=${roomCode} ("${title}")`,
    );
    // Friends see the new room in their list.
    if (live) messengerMoved(live.userId);
    // Prime the credit balance before the player can reach the Stuff window —
    // see `sendCredits` for why the CREDIT tab crashes without it.
    sendCredits();
    if (guestRoom) {
      // ⚠ A guest room must NOT be announced with 2584. That message calls
      // `setPublic()` and looks the name and description up from
      // `ROOM.<tag>.NAME`/`.DESC`, so the info tab would show the STYLE's
      // public blurb ("Mad Hatter's Tea Party", plus an instance) instead of
      // the player's own room.
      //
      // 2587 is the private counterpart: `setGuestInfo` + `setPrivate`, and it
      // deliberately sets `m_iRoomTag = -1` — which is also why guest rooms
      // have no billboards, since those are looked up by tag.
      //
      // ⚠ Name and description are CANNED TEXT, not plain strings: the handler
      // reads them with `TransformCannedMsgToString`, which expects a token
      // count first. A bare `str` would desynchronise the whole message.
      // Staff may edit ANY space. Public rooms grant this client-side —
      // `CRoomInfoHandler.PublicRoomInfoMessage` sets `ControlRoom` when the
      // permission list contains 2 (kick) — but a GUEST room takes its control
      // flag from this message, so the same rule has to be applied here or a
      // moderator is powerless in the rooms most likely to need moderating.
      const owns = live?.userId === guestRoom.ownerId || may("kick");
      send(
        MSG.GUEST_ROOM_INFO,
        [
          ...cannedText(guestRoom.name),
          { str: ownerNameFor(guestRoom) },
          ...cannedText(guestRoom.description),
          { int: owns ? 1 : 0 }, // controlRoom — may this player edit it
          // "friendsOnly" by name, but the client stores it as the entry state
          // the Who Can Enter window opens on — so the full 0-4 value.
          { int: guestRoom.entryState },
        ],
        `GuestRoomInfo "${guestRoom.name}" owner=${ownerNameFor(guestRoom)} control=${owns ? 1 : 0}`,
      );
      return;
    }
    // Name the room the client is now in. Without this its room tag stays -1,
    // which blanks the room info tab AND leaves every billboard on its
    // placeholder — `LateActivation` looks up `room.<tag>.board.<n>`.
    send(
      MSG.PUBLIC_ROOM_INFO,
      [{ int: roomCode }, { int: 0 }],
      `PublicRoomInfo tag=${roomCode} instance=0`,
    );
  };

  /**
   * Send one `_StatusPulse` to EVERYONE in the room, this player included.
   *
   * ⚠ Broadcasting is what makes other people move on your screen. A pulse is
   * addressed by avatar ref, so a client that never receives one for another
   * player simply leaves them standing where they were created.
   */
  /**
   * Candy Music Tiles (1276-1282, notes A-G): stepping on one lights it and
   * plays its note, stepping off puts it out. The client does both halves by
   * itself once the tile is in state 1 — the tile's ANI names the note on that
   * state (`SOUND="VMK-tile-A"`) and `CRoomItemStateAnimator.setSound` plays
   * it — so the server only has to move the state as feet land and leave.
   * A tile someone else is still standing on stays lit.
   */
  const pressMusicTiles = (from: number, to: number) => {
    const room = currentRoomName;
    if (!room || from === to) return;
    const tiles = getRoomItems(room).filter((i) => MUSIC_TILES.has(i.typeCode));
    if (tiles.length === 0) return;
    const others = occupiedTiles(room, live ? live.userId : 1);
    for (const item of tiles) {
      const covered = coveredTiles(currentGeometryRoom, item.tile, item.typeCode, item.dir);
      if (covered.has(to)) {
        clearTimeout(musicTileTimers.get(item.ref));
        musicTileTimers.delete(item.ref);
        // Already lit from an earlier step (nobody standing on it)? Re-strike
        // it: the client only plays the note on a CHANGE into state 1.
        if (item.state === 1 && ![...covered.keys()].some((t) => others.has(t))) {
          broadcastState(item, 0);
        }
        if (item.state !== 1) setRoomItemState(item.ref, 1);
        broadcastState(item, 1);
        musicTileLitAt.set(item.ref, Date.now());
      } else if (covered.has(from) && item.state === 1) {
        // ⚠ Not off at once. State 0 makes the client STOP the note
        // (`CRoomItemStateAnimator.setState` -> `StopSound`), and walking
        // leaves a tile ~540ms after landing: every note was cut short, and
        // one whose MP3 was still downloading never sounded at all.
        const wait = Math.max(0, (musicTileLitAt.get(item.ref) ?? 0) + MUSIC_NOTE_MS - Date.now());
        const geometry = currentGeometryRoom; // this session may have moved on by then
        clearTimeout(musicTileTimers.get(item.ref));
        musicTileTimers.set(item.ref, setTimeout(() => {
          musicTileTimers.delete(item.ref);
          const still = getRoomItem(item.ref);
          if (!still || still.room !== room || still.state === 0) return;
          const standing = occupiedTiles(room, -1);
          const cover = coveredTiles(geometry, still.tile, still.typeCode, still.dir);
          if ([...cover.keys()].some((t) => standing.has(t))) return; // they'll clear it on leaving
          setRoomItemState(still.ref, 0);
          broadcastState(still, 0);
        }, wait));
      }
    }
  };

  const sendPulse = (tile: number, legs: number, face?: number) => {
    // ⚠ In a Haunted Mansion match the avatar belongs to hm-match.ts, on the
    // stage's tiles. Our own pulses (the talking mouth on chat, an idle
    // re-pose) still carry the LOBBY tile — the avatar snapped there and back
    // every time its owner chatted.
    if (currentRoomName?.startsWith("hm#")) return;
    pressMusicTiles(currentTile, tile);
    // Stepping into a dark-ride piece's "Animation Area" (the editor's own
    // title) sets it off — riding OR walking; nothing in the client or its
    // texts limits it to carts. Only on ENTERING a tile: the stand pulse that
    // ends a walk repeats the tile it is already on.
    if (tile !== currentTile && currentRoomName) {
      const triggerRoom = currentRoomName;
      const triggerGeometry = currentGeometryRoom;
      setTimeout(() => fireRideTriggers(triggerRoom, triggerGeometry, tile), WALK_STEP_MS);
    }
    // The Steamboat stage: on the podium tile you are projected on the screen.
    if (tile !== currentTile && currentRoomName && live) {
      if (isPodium(currentGeometryRoom, tile)) claimPodium(currentRoomName, live.userId);
      else if (isPodium(currentGeometryRoom, currentTile)) releasePodium(currentRoomName, live.userId);
    }
    // In the water, you swim. Magic 20 is how the client knows: it switches the
    // avatar to `CSwimmerAvatarRender` (head over `magic_swimming_*`,
    // `CAvatarFactor.SetAvatarRenderer`). No room script decides this; the
    // pool rooms carry none, so it is the server's call, by the tile's floor.
    // A running pin effect wins; when it ends, `stopMagic` pulses again and
    // this puts the swimming back.
    // The red gate opens only while a suited player is in it, and shuts
    // behind them once they are through, either way.
    const onGate = tileName(currentGeometryRoom, tile) === SPACE_GATE;
    if (onGate && suited() && !spaceGateOpen) showSpaceGate(true);
    else if (!onGate && spaceGateOpen) showSpaceGate(false);
    // A suit that ran out in space comes off back on the platform.
    if (activeMagic?.overdue && !inSpace(tile)) {
      setTimeout(() => {
        if (activeMagic?.overdue && !inSpace()) stopMagic();
      }, 0);
    }
    const swimming = floorNameOf(currentGeometryRoom, tile) === SWIM_FLOOR;
    if (!activeMagic) {
      if (swimming) magic = SWIM_EFFECT;
      else if (magic === SWIM_EFFECT) magic = 0;
    }
    const dir = directionBetween(currentGeometryRoom, currentTile, tile);
    if (dir !== null) facing = dir;
    if (face !== undefined) facing = face;
    // Stopping on a seat sits you down. Applied here rather than at the end of
    // a walk so it holds however the tile was reached — walked to, spawned on,
    // or redirected onto. Walking THROUGH a seat still animates as walking,
    // because only a resting pose is replaced.
    // A room's own seat markers, OR a piece of furniture someone placed that
    // is somewhere to sit — a chair should seat you whether Disney marked the
    // tile or a player put it there.
    let seat = seatAt(currentGeometryRoom, tile);
    // Floor level unless we are sitting on top of something. A room seat in
    // "height" mode is its invisible seat item: stand ON it so its HGT lifts us
    // (`WalkToTile` climbs `stack` levels into the tile's items).
    let seatStack = seat && SEAT_HEIGHT_MODE === "height" ? 1 : 0;
    if (legs >= 5 && legs <= 13 && currentRoomName) {
      const under = getRoomItems(currentRoomName)
        .filter((i) => coveredTiles(currentGeometryRoom, i.tile, i.typeCode, i.dir).has(tile))
        .sort((a, b) => a.ref - b.ref);
      for (let level = under.length; level > 0; level--) {
        const piece = under[level - 1];
        if (isRideTrack(piece.typeCode) || isRideStart(piece.typeCode)) {
          seatStack = level;
          break;
        }
      }
    } else if (!seat && currentRoomName) {
      // Resolve the tile against every item's FOOTPRINT, not just its anchor —
      // a seat is a property of a block, and a couch's seats sit at offsets
      // from where the item was placed.
      for (const item of getRoomItems(currentRoomName)) {
        const block = coveredTiles(
          currentGeometryRoom, item.tile, item.typeCode, item.dir,
        ).get(tile);
        if (!block?.sit) continue;
        seat = { tile, dir: item.dir, z: 0 };
        // HGT is the block's own stack height; an avatar sits one level above
        // it, or the furniture draws over them.
        seatStack = block.height + 1;
        break;
      }
    }
    // Flying Carpet (effect 10): the client lifts and wobbles the avatar over
    // the carpet but takes the POSE from the legs we send — you ride it
    // sitting, standing still or gliding across the room.
    if (magic === 10 && legs < 5) legs = LEGS_SIT;
    if (seat && legs === LEGS_STAND && !dancing) {
      legs = LEGS_SIT;
      // A bench faces one way; sitting with your back to it looks broken. Where
      // Disney recorded no direction (`sit10` rather than `sit_10_dir_5`) the
      // seat works from any approach, so we keep the direction of travel.
      if (seat.dir !== null) facing = seat.dir;
    }
    currentTile = tile;
    lastPulseAt = Date.now();
    // The pose this pulse sends (same rules as the params below), kept for
    // anyone who enters later — see `RoomOccupant.legs`.
    const poseLegs = legs === LEGS_WALK || legs >= 5 ? legs : dancing ? LEGS_DANCE : legs;
    const handLegs = magic >= 100 ? LEGS_STAND : legs;
    if (me) {
      me.tile = tile;
      me.facing = facing;
      me.magic = shownMagic();
      const resting = poseLegs === LEGS_WALK;
      me.legs = resting ? LEGS_STAND : poseLegs;
      me.leftHand = handPose(resting ? LEGS_STAND : handLegs, "left");
      me.rightHand = handPose(resting ? LEGS_STAND : handLegs, "right");
      me.stack = seatStack;
    }
    const params: OutgoingParam[] = [
      { int: 1 }, // one avatar moved
      { int: live ? live.userId : 1 },
      { int: tile },
      // ⚠ Stack is DRAW ORDER on the tile, not decoration. Sitting on furniture
      // with stack 0 puts the avatar at floor level, so the chair draws OVER
      // them and they appear to be inside it. `_CreateElements` gives each item
      // a level by walking the tile stack, so an avatar sharing that tile has
      // to sit one level above the thing it is sitting on.
      { int: seatStack },
      // Arms swing with the legs. The client resolves them from a SEPARATE
      // field, so telling it only about the legs gives a striding walk with
      // arms hanging in the standing pose.
      ...avatarActions({
        headDir: facing,
        bodyDir: facing,
        // Dancing overrides the legs; walking overrides dancing, because you
        // cannot do both and the client would render a confused hybrid.
        // A vehicle (5..13) is a ride in progress and beats dancing too.
        legs: legs === LEGS_WALK || legs >= 5 ? legs : dancing ? LEGS_DANCE : legs,
        // In a magic car (effects 100+) the arms stay put: the renderer hides
        // the legs under the car (`ActLeftFoot`, m_iMagic > 99) but still
        // swings whatever arms we send, so walking looked like running inside
        // the car. The LEGS keep saying "walk" — `SetCarPantAction` reads that
        // to play the car's own driving frames.
        leftHand: handPose(magic >= 100 ? LEGS_STAND : legs, "left"),
        rightHand: handPose(magic >= 100 ? LEGS_STAND : legs, "right"),
        // Carried on every pulse so talking survives walking — a player who
        // chats and then moves keeps their face animating.
        mouth,
        emoticon,
        magic: shownMagic(),
        tradeState: trading,
      }).map((int) => ({ int })),
    ];
    const audience = audienceOf(currentRoomName, me?.userId ?? -1);
    if (audience.length === 0) {
      send(MSG.STATUS_PULSE, params, undefined); // not registered yet
      return;
    }
    for (const occupant of audience) {
      // per-step logging would drown the log; the route is logged once
      occupant.send(MSG.STATUS_PULSE, params, undefined);
    }
  };

  /**
   * Walk a route, one pulse every `WALK_STEP_MS`.
   *
   * ⚠ THE CADENCE IS OWNED BY THE CLOCK, NOT BY THE CLICK. Calling this again
   * REPLACES the queue but never re-times the pacer, so clicking a new tile
   * mid-walk redirects the avatar exactly as VMK does. Firing a pulse straight
   * away on each click is what made spam-clicking accelerate the avatar: pulses
   * landed closer together than the client's 500 ms lerp, so every hop was cut
   * short and the walk covered ground faster the more you clicked.
   */
  const openOwnTurnstiles = (tiles: number[]) => {
    if (!live || !currentRoomName) return;
    for (const item of getRoomItems(currentRoomName)) {
      if (!FEE_TURNSTILES.has(item.typeCode) || item.ownerId !== live.userId) continue;
      if (item.state === TURNSTILE_OPEN && !turnstileTimers.has(item.ref)) continue;
      const body = turnstileLane(currentGeometryRoom, item)?.body;
      if (body !== undefined && tiles.includes(body)) admitThroughTurnstile(item, currentGeometryRoom, live?.userId);
    }
  };

  const turnstileAtPlate = (tile: number): RoomItem | undefined =>
    currentRoomName
      ? getRoomItems(currentRoomName).find(
          (i) => FEE_TURNSTILES.has(i.typeCode) && turnstileLane(currentGeometryRoom, i)?.plate === tile,
        )
      : undefined;

  const lastPayPrompt = new Map<number, number>();
  const arriveAtTurnstile = (gate: RoomItem) => {
    const item = getRoomItem(gate.ref);
    if (!item || item.room !== currentRoomName || !live) return;
    if (item.ownerId === live.userId) {
      walkThroughTurnstile(item);
      return;
    }
    const fee = turnstileFee(getRoomItemConfig(item.ref));
    if (fee === 0) {
      admitThroughTurnstile(item, currentGeometryRoom, live?.userId);
      walkThroughTurnstile(getRoomItem(item.ref) ?? item);
      return;
    }
    const now = Date.now();
    if (now - (lastPayPrompt.get(item.ref) ?? 0) < 2000) return;
    lastPayPrompt.set(item.ref, now);
    send(
      MSG.CURRENT_ITEM_CONFIGURATION,
      [{ int: item.ref }, { int: 1 }, { str: "fee" }, { str: String(fee) }],
      `CurrentItemConfiguration ref=${item.ref} turnstile fee=${fee} (on the plate)`,
    );
  };

  const enterDarkScene = (code: number) => {
    const scene = darkRideScene(code);
    if (!scene || !darkRide) return;
    darkRide.scene = code;
    facing = scene.entry.dir;
    ridingUntil = Number.MAX_SAFE_INTEGER;
    pendingDoor = { code, tiles: [scene.entry.tile] };
    console.log(`[${label}] ${new Date().toISOString().slice(11, 23)} dark ride ${darkRide.ride}: scene ${code} "${scene.name}"`);
    enterRoom(code);
  };

  const boardDarkRide = (ride: DarkRide) => {
    const first = darkRideScenes(ride)[0];
    if (first === undefined) return;
    darkRide = { ride, scene: first };
    enterDarkScene(first);
  };

  const finishDarkRide = () => {
    if (!darkRide) return;
    const ride = darkRide.ride;
    const back = darkRideReturn(ride);
    clearTimeout(darkRide.timer);
    darkRide = null;
    ridingUntil = 0;
    if (back) {
      facing = back.dir;
      pendingDoor = { code: DARK_RIDE_COURTYARD, tiles: [back.tile] };
    }
    enterRoom(DARK_RIDE_COURTYARD);
    if (!live) return;
    if (Math.random() >= DARK_RIDE_PIN_CHANCE) {
      console.log(`[${label}] finished the ${ride} dark ride; no pin this time`);
      return;
    }
    addItems(live.userId, [DARK_RIDE_REWARD_PIN], ITEM_CATEGORY.pins);
    queueItemList(1);
    sendStaffMessage(
      live.userId,
      `Well done ${characterName}, you made it through the ride! Here's ${itemName(DARK_RIDE_REWARD_PIN) ?? "a Sword In The Stone Single Use Pin"} for you!`,
    );
    console.log(`[${label}] finished the ${ride} dark ride; awarded pin ${DARK_RIDE_REWARD_PIN}`);
  };

  const rideDarkScene = () => {
    if (!darkRide || !currentRoomName) return;
    const code = darkRide.scene;
    const scene = darkRideScene(code);
    if (!scene) return;
    const items = getRoomItems(currentRoomName);
    const start = items.find(
      (i) =>
        (isRideTrack(i.typeCode) || isRideStart(i.typeCode)) &&
        coveredTiles(currentGeometryRoom, i.tile, i.typeCode, i.dir).has(currentTile),
    );
    if (!start) {
      console.log(`[${label}] ${new Date().toISOString().slice(11, 23)} dark ride scene ${code}: no track under tile ${currentTile}; ending the ride`);
      finishDarkRide();
      return;
    }
    const plan = followTrack(currentGeometryRoom, items, start, scene.entry.dir, scene.vehicle, currentTile);
    const steps = [...plan.steps];
    let teleporter: RoomItem | undefined;
    if (plan.end === "teleporter") {
      const last = steps.pop();
      teleporter = last ? items.find((i) => coveredTiles(currentGeometryRoom, i.tile, i.typeCode, i.dir).has(last.tile)) : undefined;
    } else if (scene.last) {
      const lastTile = steps.length ? steps[steps.length - 1].tile : currentTile;
      const extra = tileToward(currentGeometryRoom, lastTile, plan.endFacing);
      if (extra !== null) steps.push({ tile: extra, facing: plan.endFacing });
    }
    const pulses: Array<[tile: number, legs: number, face?: number]> = [
      [currentTile, scene.vehicle, scene.entry.dir],
      ...steps.map((s): [number, number, number] => [s.tile, scene.vehicle, s.facing]),
    ];
    const first = darkRideScenes(darkRide.ride)[0] === code;
    const hold = first ? DARK_RIDE_FIRST_HOLD_MS : DARK_RIDE_SCENE_HOLD_MS;
    console.log(
      `[${label}] ${new Date().toISOString().slice(11, 23)} dark ride scene ${code}: ${steps.length} steps after ${hold}ms, then ${teleporter ? `teleporter ${teleporter.ref}` : plan.end}`,
    );
    const sceneOver = () => {
      if (!darkRide || darkRide.scene !== code) return;
      const next = nextDarkRideScene(code);
      if (teleporter) {
        animateTeleporter(teleporter, TELEPORT_OUT_MS);
        magic = MAGIC_TELEPORT_OUT;
        sendPulse(currentTile, scene.vehicle, facing);
      }
      darkRide.timer = setTimeout(() => {
        if (!darkRide || darkRide.scene !== code) return;
        magic = 0;
        if (next !== undefined) enterDarkScene(next);
        else finishDarkRide();
      }, teleporter ? TELEPORT_OUT_MS : WALK_STEP_MS);
    };
    const arrivedByTeleporter = !first;
    sendPulse(currentTile, scene.vehicle, scene.entry.dir);
    pulses.shift();
    let started = false;
    const sceneReady = () => {
      if (started || !darkRide || darkRide.scene !== code) return;
      started = true;
      clearTimeout(darkRide.timer);
      if (arrivedByTeleporter) {
        magic = MAGIC_TELEPORT_IN;
        sendPulse(currentTile, scene.vehicle, scene.entry.dir);
        setTimeout(() => {
          if (!darkRide || darkRide.scene !== code || magic !== MAGIC_TELEPORT_IN) return;
          magic = 0;
          if (Date.now() - lastPulseAt >= WALK_STEP_MS) sendPulse(currentTile, scene.vehicle, facing);
        }, TELEPORT_IN_MS);
      }
      console.log(`[${label}] ${new Date().toISOString().slice(11, 23)} dark ride scene ${code}: room started; leaving in ${hold}ms`);
      darkRide.timer = setTimeout(() => {
        if (!darkRide || darkRide.scene !== code) return;
        if (pulses.length === 0) sceneOver();
        else walkAlong(pulses, sceneOver);
      }, Math.max(hold, arrivedByTeleporter ? TELEPORT_IN_MS : 0));
    };
    sceneReady();
  };

  const walkThroughTurnstile = (item: RoomItem) => {
    const lane = turnstileLane(currentGeometryRoom, item);
    if (!lane || !currentRoomName) return;
    const blocked = new Set([
      ...occupiedTiles(currentRoomName, live ? live.userId : 1),
      ...furnitureTiles(currentRoomName, currentGeometryRoom, live?.userId),
    ]);
    const toPlate =
      currentTile === lane.plate
        ? []
        : findPath(currentGeometryRoom, currentTile, lane.plate, blocked, stepRule());
    if (currentTile !== lane.plate && toPlate[toPlate.length - 1] !== lane.plate) return;
    const route = [...toPlate, lane.body];
    if (lane.beyond !== null && !blocked.has(lane.beyond)) route.push(lane.beyond);
    const pulses: Array<[tile: number, legs: number, face?: number]> = route.map((t) => [t, LEGS_WALK]);
    pulses.push([route[route.length - 1], LEGS_STAND]);
    const ride = item.ownerId === null && currentRoomCode === DARK_RIDE_COURTYARD ? darkRideOfGate(item.typeCode) : undefined;
    if (!ride) {
      walkAlong(pulses);
      return;
    }
    const through = route[route.length - 1];
    const exitTile = darkRideReturn(ride)?.tile;
    let toDoor: number[] = [];
    for (const door of exitTilesWithIds(ROOM_CODES.get(DARK_RIDE_COURTYARD), darkRideDoorIds(ride))) {
      if (door === exitTile) continue;
      const path = door === through ? [] : findPath(currentGeometryRoom, through, door, blocked);
      if (door !== through && path[path.length - 1] !== door) continue;
      if (toDoor.length === 0 || path.length < toDoor.length) toDoor = path;
    }
    if (toDoor.length) {
      pulses.pop();
      for (const t of toDoor) pulses.push([t, LEGS_WALK]);
      pulses.push([toDoor[toDoor.length - 1], LEGS_STAND]);
    }
    ridingUntil = Number.MAX_SAFE_INTEGER;
    walkAlong(pulses, () => {
      setTimeout(() => {
        if (currentRoomCode === DARK_RIDE_COURTYARD) boardDarkRide(ride);
        else ridingUntil = 0;
      }, toDoor.length ? WALK_STEP_MS : DARK_RIDE_BOARD_MS);
    });
  };

  const walkAlong = (
    pulses: Array<[tile: number, legs: number, face?: number]>,
    /** Runs after the LAST pulse, unless a new walk replaced this one first. */
    onDone?: () => void,
  ) => {
    walkQueue = pulses;
    walkDone = onDone;
    if (walkTimer) return; // already pumping; it will pick up the new queue

    const pump = () => {
      const next = walkQueue.shift();
      if (!next) {
        walkTimer = undefined;
        return;
      }
      openOwnTurnstiles(walkQueue.length ? [next[0], walkQueue[0][0]] : [next[0]]);
      sendPulse(next[0], next[1], next[2]);
      walkTimer = walkQueue.length ? setTimeout(pump, WALK_STEP_MS) : undefined;
      if (walkQueue.length === 0 && walkDone) {
        const done = walkDone;
        walkDone = undefined;
        done();
      }
    };
    // Respect the time already served since the previous pulse, so a click
    // arriving mid-stride waits out the rest of that hop instead of cutting it.
    const waited = Date.now() - lastPulseAt;
    walkTimer = setTimeout(pump, Math.max(0, WALK_STEP_MS - waited));
  };

  /**
   * This player as a queue line sees them: the engine walks them up the line,
   * onto the stage and off it. See room-queues.ts.
   */
  const queueMember: QueueMember = {
    get userId() { return live ? live.userId : 1; },
    walk: (tiles, onDone, face) => {
      if (tiles.length === 0) { onDone?.(); return; }
      walkAlong([
        ...tiles.map((t): [number, number] => [t, LEGS_WALK]),
        [tiles[tiles.length - 1], LEGS_STAND, face],
      ], onDone);
    },
  };

  /** Snap this avatar onto a free tile near `near` (no walk), for everyone in the room. */
  const placeNear = (near: number): number => {
    // Never back onto the line itself — including its join tile, or the next
    // click would put them straight back in.
    const avoid = new Set([
      ...occupiedTiles(currentRoomName, live ? live.userId : 1),
      ...queuesIn(currentGeometryRoom).flatMap(managedTiles),
    ]);
    const tile = freeTileNear(currentGeometryRoom, near, avoid);
    stopWalking();
    currentTile = tile;
    lastPulseAt = Date.now();
    if (me) me.tile = tile;
    const params: OutgoingParam[] = [
      { int: live ? live.userId : 1 }, { int: tile }, { int: 0 }, { int: facing }, { int: facing },
    ];
    for (const occupant of audienceOf(currentRoomName, me?.userId ?? -1)) occupant.send(MSG.LOCATE_AVATAR, params, undefined);
    return tile;
  };

  /**
   * Step into a teleporter half and come out of its partner.
   *
   * "Teleporters are always paired together - entering one will always send you
   * to the other in the pair if it is placed in a room." Same room: snap onto
   * the partner with `2585 _LocateAvatar` (`SetToTileStack`, no walk). Another
   * room: enter it the ordinary way, so its owner's entry setting still applies,
   * and land on the partner rather than at the door. A partner still in an
   * inventory goes nowhere.
   */
  /** Show a magic effect on this avatar now (a pulse on the tile we stand on). */
  /** The red gate is open on our screen: we are in it, suited. */
  let spaceGateOpen = false;
  /**
   * Is this tile (by default, ours) past the Shrinking Machine's red gate:
   * out on the spacewalk, or on the `gate` tiles between the posts?
   */
  const inSpace = (tile = currentTile) =>
    tilesOnFloor(currentGeometryRoom, SPACEWALK_FLOOR).has(tile) || tileName(currentGeometryRoom, tile) === SPACE_GATE;
  const suited = () => activeMagic?.effect === SPACE_SUIT_EFFECT;
  const suitedInSpace = () => suited() && inSpace();
  /** Refuse anything that would end the suit while in space. True if refused. */
  const refuseSuitOff = (code: 4530 | 4532): boolean => {
    if (!suitedInSpace()) return false;
    console.log(`[${label}] refused: suit off in space (tile ${currentTile})`);
    send(MSG.GENERIC_ERROR, [{ int: code }], `GenericError ${code}`);
    return true;
  };
  /**
   * How we may step here: the room's turnstiles, and the red gate — no step
   * onto the spacewalk from off it without the suit on. Stepping back off is
   * always allowed, and so is walking about out there (arriving from the Ray
   * Room lands you on it).
   */
  /** Open or shut the red gate on this player's own screen (SPACE_GATE_ANIM). */
  const showSpaceGate = (open: boolean): void => {
    if (tilesOnFloor(currentGeometryRoom, SPACEWALK_FLOOR).size === 0) return;
    spaceGateOpen = open;
    send(MSG.ROOM_ANIMATION_STATE, [{ int: SPACE_GATE_ANIM }, { int: open ? 1 : 0 }], `AnimationState space gate ${open ? "open" : "shut"}`);
  };
  const stepRule = (): ((from: number, to: number) => boolean) | undefined => {
    const turnstiles = turnstileStepRule(currentRoomName, currentGeometryRoom);
    if (tilesOnFloor(currentGeometryRoom, SPACEWALK_FLOOR).size === 0 || suited()) return turnstiles;
    return (from, to) => !(inSpace(to) && !inSpace(from)) && (turnstiles?.(from, to) ?? true);
  };

  const setMagic = (fx: number) => {
    magic = fx;
    sendPulse(currentTile, LEGS_STAND);
  };

  /**
   * Down a Waterpark Pool slide: `_1` (where we arrived) -> `_2` -> `_3` in the
   * water, then the splash for everyone in the room. Landing on a `pool` tile is
   * what starts the swimming (see `sendPulse`). Abandoned if the player leaves
   * the room or starts walking mid-ride.
   */
  const rideSlide = (slide: (typeof WATERPARK_SLIDES)[number]): void => {
    const room = currentRoomName;
    const mid = tileNamed(currentGeometryRoom, slide.mid);
    const bottom = tileNamed(currentGeometryRoom, slide.bottom);
    if (!room || mid === null || bottom === null) return;
    const top = currentTile;
    const stillRiding = (from: number) => currentRoomName === room && currentTile === from && !walkTimer;
    setTimeout(() => {
      if (!stillRiding(top)) return;
      sendPulse(mid, LEGS_STAND);
      setTimeout(() => {
        if (!stillRiding(mid)) return;
        sendPulse(bottom, LEGS_STAND);
        for (const occupant of occupantsOf(room)) {
          occupant.send(MSG.ROOM_ANIMATION_STATE, [{ int: slide.splash }], `Splash ${slide.splash}`);
        }
        console.log(`[${label}] down ${slide.top.replace(/_1$/, "")} -> splash ${slide.splash}`);
      }, SLIDE_STEP_MS);
    }, SLIDE_STEP_MS * 2);
  };

  /** `2527` — the magic menu: every worn magic pin, its recharge and state. */
  const sendMagicList = (): void => {
    const pins = live
      ? getWornPins(live.userId).filter((pin) => magicOf(pin.typeCode) !== undefined)
      : [];
    const params: OutgoingParam[] = [{ int: pins.length }];
    for (const pin of pins) {
      const wait = Math.max(0, Math.ceil(((magicReadyAt.get(pin.id) ?? 0) - Date.now()) / 1000));
      params.push(
        { int: pin.id }, // fxId — what the client sends back to cast it
        { int: pin.typeCode },
        { int: magicOf(pin.typeCode)!.effect },
        { str: itemName(pin.typeCode) },
        { str: magicOf(pin.typeCode)!.word ?? "" }, // magic word (from the wiki)
        { int: wait },
        { int: pinLevel(pin) },
        { int: activeMagic?.pinId === pin.id ? 1 : 0 },
        { int: isSingleUsePin(pin.typeCode) ? 1 : 0 },
        // ⚠ -1 = never expires. `CMagicMenu.ShowMagicInfo` hides the expiry
        // line only for -1; 0 printed "Expires in 0 Day(s)" over the Wait line.
        { int: -1 },
      );
    }
    send(MSG.AVAILABLE_MAGIC, params, `AvailableMagic ${pins.length}`);
  };

  /**
   * Show a figure to the room without saving it (`2504 _ModifyAvatar`) — for a
   * costume that only lasts as long as its magic. ⚠ `ref` appears twice.
   */
  const showFigure = (figure: number[]): void => {
    // Remember a costume for players who enter mid-effect; the real outfit
    // clears it.
    if (me) me.shownFigure = figure === me.figure ? undefined : figure;
    if (!live || !currentRoomName) return;
    const padded = [...figure.slice(0, 12)];
    while (padded.length < 12) padded.push(-1);
    const params: OutgoingParam[] = [
      { int: live.userId },
      ...padded.map((v) => ({ int: v })),
      { int: live.userId },
      { int: currentTile },
      { int: 0 }, // stack
      ...avatarActions({ headDir: facing, bodyDir: facing, magic: shownMagic() }).map((v) => ({ int: v })),
    ];
    for (const occupant of audienceOf(currentRoomName, me?.userId ?? -1)) occupant.send(MSG.MODIFY_AVATAR, params, undefined);
  };

  /**
   * A figure with a costume's garments swapped in. A figure is `[setId,
   * colourId]` pairs; a set's part is its thousands digit (1 hat, 4 top,
   * 6 pants, 8 shoes), so each costume piece replaces the pair on its part,
   * or is added if the avatar wears nothing there. Hair and face stay.
   */
  const costumeFigure = (base: number[], costume: number[]): number[] => {
    const partOf = (set: number) => Math.floor((set % 10000) / 1000);
    const out = [...base];
    for (let i = 0; i + 1 < costume.length; i += 2) {
      let slot = -1;
      for (let j = 0; j + 1 < out.length; j += 2) {
        if (out[j] > 0 && partOf(out[j]) === partOf(costume[i])) { slot = j; break; }
      }
      if (slot < 0) for (let j = 0; j + 1 < out.length; j += 2) if (out[j] <= 0) { slot = j; break; }
      if (slot < 0) { slot = out.length; out.push(0, 0); }
      out[slot] = costume[i];
      out[slot + 1] = costume[i + 1];
    }
    return out;
  };

  /**
   * End the running pin effect. Bat and shark play an exit animation
   * (`endEffect`) before the avatar is plain again.
   */
  const stopMagic = (): void => {
    if (!activeMagic) return;
    clearTimeout(activeMagic.timer);
    const end = activeMagic.endEffect;
    if (activeMagic.dance) dancing = false;
    const hadCostume = activeMagic.costume === true;
    const hadSuit = activeMagic.effect === SPACE_SUIT_EFFECT;
    activeMagic = null;
    if (hadSuit && spaceGateOpen) showSpaceGate(false);
    // Out of the costume: the real outfit was never overwritten.
    if (hadCostume && me) showFigure(me.figure);
    if (end) {
      setMagic(end);
      setTimeout(() => {
        if (magic === end && !activeMagic) setMagic(0);
      }, 1500);
    } else {
      setMagic(0);
    }
  };

  /**
   * Checks every cast shares, then the cast's bookkeeping. Returns the pin
   * if the cast may go ahead. A single-use pin is used up here, and its
   * lanyard refreshed; the recharge starts from the cast.
   */
  const startMagic = (pinId: number): { typeCode: number; level: number } | null => {
    if (!live) return null;
    const fail = (code: number, why: string) => {
      console.log(`[${label}] magic ${pinId} refused: ${why}`);
      send(MSG.GENERIC_ERROR, [{ int: code }], `GenericError ${code}`);
      return null;
    };
    if (!currentRoomName) return fail(4524, "not in a room");
    const pin = getWornPins(live.userId).find((p) => p.id === pinId);
    if (!pin) return fail(4521, "not wearing it");
    if (!magicOf(pin.typeCode)) return fail(4520, "no magic");
    if ((magicReadyAt.get(pin.id) ?? 0) > Date.now()) return fail(4522, "recharging");
    const level = pinLevel(pin);
    magicReadyAt.set(pin.id, Date.now() + magicTiming(pin.typeCode, level).rechargeS * 1000);
    if (isSingleUsePin(pin.typeCode)) {
      takeOwnedItem(pin.id, live.userId);
      removeWornPin(pin.id);
      sendMagicList();
      if (me) {
        for (const occupant of audienceOf(currentRoomName, me?.userId ?? -1)) {
          occupant.send(MSG.CREATE_AVATARS, [{ int: 1 }, ...avatarBlock(me)], undefined);
        }
      }
    }
    return { typeCode: pin.typeCode, level };
  };

  /**
   * Cast a worn magic pin: the effect, plus Dancing Inferno's dance and the
   * Pirate Costume's outfit, for the pin's duration. Shared by the magic menu
   * (`526 ActivataMagicFx`) and the magic words in chat.
   */
  const drawSword = (pinId: number | null, forced?: boolean): boolean => {
    if (!live || !currentRoomName) return false;
    const refuse = (code: number, why: string) => {
      console.log(`[${label}] sword ${pinId ?? "command"} refused: ${why}`);
      send(MSG.GENERIC_ERROR, [{ int: code }], `GenericError ${code}`);
      return false;
    };
    if (currentRoomCode !== DARK_RIDE_COURTYARD) return refuse(4535, "not in the courtyard");
    if (pinId !== null) {
      const reach = tilesApart(currentGeometryRoom, currentTile, SWORD_TILE);
      if (reach === null || reach > SWORD_REACH) return refuse(4535, `not at the sword (tile ${currentTile})`);
    }
    const room = currentRoomName;
    if ((swordBusyUntil.get(room) ?? 0) > Date.now()) return refuse(4538, "someone is drawing");
    if (pinId !== null) {
      if (!startMagic(pinId)) return false;
      sendMagicList();
      queueItemList(1);
    }

    const userId = live.userId;
    const name = characterName;
    const success = forced ?? Math.random() < SWORD_CHANCE;
    const state = success ? SWORD_STATE.success : SWORD_STATE.failure;
    const lasts = success ? SWORD_SUCCESS_MS : SWORD_FAILURE_MS;
    swordBusyUntil.set(room, Date.now() + lasts);
    const toFace = directionBetween(currentGeometryRoom, currentTile, SWORD_TILE);
    if (toFace !== null) sendPulse(currentTile, LEGS_STAND, toFace);
    for (const o of occupantsOf(room)) o.send(MSG.ROOM_ANIMATION_STATE, [{ int: 0 }, { int: state }], `AnimationState sword ${state}`);
    console.log(`[${label}] drew the sword ${pinId === null ? "by command" : `with pin ${pinId}`}: ${success ? "success" : "failure"}`);

    setTimeout(() => {
      if ((swordBusyUntil.get(room) ?? 0) <= Date.now()) swordBusyUntil.delete(room);
      for (const o of occupantsOf(room)) o.send(MSG.ROOM_ANIMATION_STATE, [{ int: 0 }, { int: SWORD_STATE.idle }], "AnimationState sword idle");
      if (!success) {
        sendStaffMessage(userId, `Nice try ${name}! You didn't quite have what it takes to pull out the Sword. Keep on trying!`);
        return;
      }
      const prize = SWORD_PRIZES[Math.floor(Math.random() * SWORD_PRIZES.length)];
      if (prize.credits) {
        setCredits(userId, (getUserById(userId)?.credits ?? 0) + prize.credits, "Sword in the Stone Prize");
        if (live?.userId === userId) sendCredits();
      }
      if (prize.items && prize.category !== undefined) {
        addItems(userId, prize.items, prize.category);
        if (live?.userId === userId) queueItemList(1);
      }
      sendStaffMessage(userId, `Well done brave ${name}, you pulled out the sword from the stone! Here's ${prize.name} for your achievement!`);
      console.log(`[${label}] sword prize for "${name}": ${prize.name}`);
    }, lasts);
    return true;
  };

  /**
   * A treasure key cast in the Pirate Treasure Room: open its chest (2792 to
   * the room), pay out or not, and shut it again. Disney's refusals: 4535
   * "Try to find a matching item" (wrong room, or not at this key's chest),
   * 4536 "Wait for the treasure chest to close".
   */
  const openChest = (pinId: number, level: 1 | 2 | 3): boolean => {
    if (!live || !currentRoomName) return false;
    const chest = TREASURE_CHESTS[level];
    const refuse = (code: number, why: string) => {
      console.log(`[${label}] ${chest.name} key ${pinId} refused: ${why}`);
      send(MSG.GENERIC_ERROR, [{ int: code }], `GenericError ${code}`);
      return false;
    };
    if (currentRoomCode !== TREASURE_ROOM) return refuse(4535, "not in the treasure room");
    const reach = tilesApart(currentGeometryRoom, currentTile, chest.tile);
    if (reach === null || reach > CHEST_REACH) return refuse(4535, `not at the ${chest.name} chest (tile ${currentTile})`);
    const busyKey = `${currentRoomName}#${chest.anim}`;
    if ((chestBusyUntil.get(busyKey) ?? 0) > Date.now()) return refuse(4536, "chest still open");
    if (!startMagic(pinId)) return false;
    sendMagicList();
    queueItemList(1);

    const room = currentRoomName;
    const userId = live.userId;
    const name = characterName;
    const prize = Math.random() < chest.empty ? null : chest.prizes[Math.floor(Math.random() * chest.prizes.length)];
    chestBusyUntil.set(busyKey, Date.now() + CHEST_OPEN_MS);
    const toFace = directionBetween(currentGeometryRoom, currentTile, chest.tile);
    if (toFace !== null) sendPulse(currentTile, LEGS_STAND, toFace);
    const state = prize ? CHEST_STATE.treasure : CHEST_STATE.empty;
    for (const o of occupantsOf(room)) {
      o.send(MSG.ROOM_ANIMATION_STATE, [{ int: chest.anim }, { int: state }], `AnimationState ${chest.name} chest ${state}`);
    }
    console.log(`[${label}] opened the ${chest.name} chest with key ${pinId}: ${prize ? prize.name : "empty"}`);
    if (prize) {
      if (prize.credits) {
        setCredits(userId, (getUserById(userId)?.credits ?? 0) + prize.credits, "Pirates Treasure Chest");
        sendCredits();
      }
      if (prize.items && prize.category !== undefined) {
        addItems(userId, prize.items, prize.category);
        queueItemList(1);
      }
    }
    // The prize message waits for the lid, like the sword's.
    setTimeout(() => {
      if ((chestBusyUntil.get(busyKey) ?? 0) <= Date.now()) chestBusyUntil.delete(busyKey);
      for (const o of occupantsOf(room)) {
        o.send(MSG.ROOM_ANIMATION_STATE, [{ int: chest.anim }, { int: CHEST_STATE.closed }], `AnimationState ${chest.name} chest closed`);
      }
      sendStaffMessage(
        userId,
        prize
          ? `Arrr, ${name}! The ${chest.name} chest held ${prize.name} - it's yours!`
          : `Shiver me timbers, ${name}... the ${chest.name} chest was empty this time. Better luck with the next key!`,
      );
    }, CHEST_OPEN_MS);
    return true;
  };

  const castPin = (pinId: number): boolean => {
    const wornPin = live ? getWornPins(live.userId).find((p) => p.id === pinId) : undefined;
    if (wornPin && magicOf(wornPin.typeCode)?.sword) return drawSword(pinId);
    const treasure = wornPin ? magicOf(wornPin.typeCode)?.treasure : undefined;
    if (wornPin && treasure) return openChest(pinId, treasure);
    if (refuseSuitOff(4530)) return false;
    stopMagic(); // one effect at a time
    const pin = startMagic(pinId);
    if (!pin) return false;
    const cast = magicOf(pin.typeCode)!;
    const { durationMs } = magicTiming(pin.typeCode, pin.level);
    // Dancing Inferno makes you dance for the whole effect; only claim the
    // dance if you were not already dancing, so ending it does not stop one
    // you started yourself.
    const forceDance = cast.dance === true && !dancing;
    if (forceDance) dancing = true;
    activeMagic = {
      pinId,
      effect: cast.effect,
      endEffect: cast.endEffect,
      dance: forceDance,
      costume: cast.costume !== undefined && me !== null,
    };
    activeMagic.timer = setTimeout(() => {
      if (activeMagic?.pinId !== pinId) return;
      // Never out of the suit in space (4530): it lasts until we step off.
      if (suitedInSpace()) activeMagic.overdue = true;
      else stopMagic();
    }, durationMs);
    setMagic(cast.effect);
    // Into the costume for the effect's length (never saved).
    if (cast.costume && me) showFigure(costumeFigure(me.figure, cast.costume));
    console.log(`[${label}] cast pin ${pinId} (type ${pin.typeCode}, ${pin.level}*) -> effect ${cast.effect} for ${durationMs}ms`);
    return true;
  };

  /**
   * Saying a worn magic pin's word casts it — the menu shows the word for that
   * reason. Matched on letters and digits only, any case, so "jump", "Jump!"
   * and "JUMP !" all count; the whole message must be the word. Teleportation
   * is left to the menu: it needs a tile picked, which only the menu starts.
   * With several pins sharing a word (the Autopia cars), the first one that is
   * ready wins.
   */
  const castByMagicWord = (said: string): boolean => {
    if (!live) return false;
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const key = norm(said);
    if (key === "") return false;
    const candidates = getWornPins(live.userId).filter((pin) => {
      const magic = magicOf(pin.typeCode);
      return magic?.word !== undefined && !magic.teleport && norm(magic.word) === key;
    });
    if (candidates.length === 0) return false;
    const ready = candidates.find((pin) => (magicReadyAt.get(pin.id) ?? 0) <= Date.now()) ?? candidates[0];
    return castPin(ready.id);
  };

  /**
   * Play a teleporter's own animation, if it has one (the coffin opens, the
   * wardrobe door swings…), and put it back afterwards. Most teleporters'
   * animation is state 1; an item with none just sits still.
   */
  const animateTeleporter = (item: RoomItem, ms: number) => {
    if (!statesOf(item.typeCode, item.dir).includes(1)) return;
    setRoomItemState(item.ref, 1);
    broadcastState(item, 1);
    setTimeout(() => {
      const still = getRoomItem(item.ref);
      if (!still || still.state !== 1) return;
      setRoomItemState(still.ref, 0);
      broadcastState(still, 0);
    }, ms);
  };

  /**
   * A teleporter's PAD — its `ACT="1"` block, where you stand to be sent and
   * where you arrive. Not the item's anchor: the Tea Cup is 3x3 with a solid
   * rim, and its anchor corner is part of that rim.
   */
  const teleporterPad = (item: RoomItem): number => {
    for (const [tile, block] of coveredTiles(currentGeometryRoom, item.tile, item.typeCode, item.dir)) {
      if (block.act) return tile;
    }
    return item.tile;
  };

  /**
   * The tiles you step out along after arriving: pad -> the teleporter's
   * doorway (its other walkable block, next to the pad) -> the floor just past
   * it. A one-tile teleporter (the Tron Transporter) has no doorway, so you step
   * off the way it faces. Stops early at anything solid or occupied.
   */
  const teleporterExit = (item: RoomItem): number[] => {
    const blocks = coveredTiles(currentGeometryRoom, item.tile, item.typeCode, item.dir);
    const pad = teleporterPad(item);
    const blocked = new Set([
      ...occupiedTiles(currentRoomName, live ? live.userId : 1),
      ...furnitureTiles(currentRoomName, currentGeometryRoom),
    ]);
    const route: number[] = [];
    let from = pad;
    let heading: number | null = item.dir;
    for (const [tile, block] of blocks) {
      if (tile === pad || !block.walk) continue;
      const dir = directionBetween(currentGeometryRoom, pad, tile);
      if (dir === null || tileToward(currentGeometryRoom, pad, dir) !== tile) continue;
      route.push(tile);
      from = tile;
      heading = dir;
      break;
    }
    if (heading !== null) {
      const outside = tileToward(currentGeometryRoom, from, heading);
      if (outside !== null && !blocks.has(outside) && !blocked.has(outside)) route.push(outside);
    }
    return route;
  };

  /** The arrival half of a hop: effect 7 on the partner's pad, then step out. */
  const finishTeleportIn = (partner: RoomItem) => {
    animateTeleporter(partner, TELEPORT_IN_MS);
    setMagic(MAGIC_TELEPORT_IN);
    setTimeout(() => {
      if (magic !== MAGIC_TELEPORT_IN) return;
      magic = 0;
      const route = teleporterExit(partner);
      if (route.length === 0) {
        setMagic(0);
        return;
      }
      const pulses: Array<[tile: number, legs: number, face?: number]> = route.map((t) => [t, LEGS_WALK]);
      pulses.push([route[route.length - 1], LEGS_STAND]);
      walkAlong(pulses);
    }, TELEPORT_IN_MS);
  };

  /**
   * LAYOUT BEAMS: a pair of named tiles that carry you between two floors of
   * the same room with no walkable link between them. Tomorrowland Hub's glass
   * tower: `teleport_upper` (on the walkway) <-> `teleport_sub` (the rocket
   * level). No client code handles them — like the queue blocks, it was the
   * server's job. Finish a walk on one end and you come out at the other.
   *
   * The Steamboat's balcony box is the same shape: its two chairs
   * (`left_sit10` / `right_sit10`) are a floor of their own with no link, and
   * the deck tiles `go_left_chair` / `go_right_chair` are the way up. Landing
   * on a seat tile sits you down (`sendPulse`). Those are `quiet`: you are
   * simply put in the chair, with no beam effect.
   */
  const BEAM_PAIRS: Array<[string, string, { quiet?: boolean }?]> = [
    ["teleport_upper", "teleport_sub"],
    ["go_left_chair", "left_sit10", { quiet: true }],
    ["go_right_chair", "right_sit10", { quiet: true }],
  ];
  const isQuietBeamEnd = (tile: number): boolean => {
    const name = tileName(currentGeometryRoom, tile);
    return BEAM_PAIRS.some(([a, b, opts]) => opts?.quiet && (name === a || name === b));
  };
  const beamTargetAt = (tile: number): number | null => {
    const name = tileName(currentGeometryRoom, tile);
    if (!name) return null;
    for (const [a, b] of BEAM_PAIRS) {
      if (name === a) return tileNamed(currentGeometryRoom, b);
      if (name === b) return tileNamed(currentGeometryRoom, a);
    }
    return null;
  };
  /**
   * Beam out (effect 6), appear at `to`, beam in (effect 7) — a teleporter
   * without the furniture. `then` runs once the beam-in has finished, with the
   * avatar free to move again (a walk that crossed floors carries on from it).
   */
  const beamTo = (to: number, then?: () => void): void => {
    const room = currentRoomName;
    if (!room) return;
    if (isQuietBeamEnd(to)) {
      const landed = placeNear(to);
      // `placeNear` only relocates; a standing pulse there sits you on a seat.
      sendPulse(landed, LEGS_STAND);
      console.log(`[${label}] moved to ${landed} in ${room}`);
      then?.();
      return;
    }
    ridingUntil = Date.now() + TELEPORT_OUT_MS + TELEPORT_IN_MS + 200;
    setMagic(MAGIC_TELEPORT_OUT);
    setTimeout(() => {
      if (currentRoomName !== room) return;
      magic = 0;
      const landed = placeNear(to);
      console.log(`[${label}] beamed to ${landed} in ${room}`);
      setMagic(MAGIC_TELEPORT_IN);
      setTimeout(() => {
        if (magic === MAGIC_TELEPORT_IN) setMagic(0);
        if (then && currentRoomName === room) {
          ridingUntil = 0;
          then();
        }
      }, TELEPORT_IN_MS);
    }, TELEPORT_OUT_MS);
  };
  /**
   * Every beam end in this room paired with where it leads — for routing a walk
   * across floors that no path joins.
   */
  const beamEnds = (): Array<[from: number, to: number]> => {
    const ends: Array<[number, number]> = [];
    for (const [a, b] of BEAM_PAIRS) {
      const ta = tileNamed(currentGeometryRoom, a);
      const tb = tileNamed(currentGeometryRoom, b);
      if (ta !== null && tb !== null) ends.push([ta, tb], [tb, ta]);
    }
    return ends;
  };

  /**
   * Play a planned ride: `pulses` already holds the walk to the start and the
   * mount. A ride that ends on a paired ride teleporter whose partner is placed
   * goes through it and carries on from the partner (`rideOnFrom`); any other
   * ending gets off where it stopped.
   */
  const rideAlong = (
    pulses: Array<[tile: number, legs: number, face?: number]>,
    plan: RidePlan,
    hops: number,
    /** Where the ride starts, for a ride with no steps at all. */
    from: number,
  ): void => {
    for (const step of plan.steps) pulses.push([step.tile, plan.vehicle, step.facing]);
    const last = plan.steps[plan.steps.length - 1];
    const through = plan.end === "teleporter" && last && currentRoomName && hops < MAX_RIDE_HOPS
      ? getRoomItems(currentRoomName).find(
          (i) => i.pair && i.tile === last.tile && isRideTrack(i.typeCode) && getPlacedPartner(i.pair),
        )
      : undefined;
    if (through) {
      ridingUntil = Date.now() + (pulses.length + 1) * WALK_STEP_MS;
      walkAlong(pulses, () => teleportVia(through, { vehicle: plan.vehicle, hops: hops + 1 }));
      return;
    }
    // The ride throws you off onto the tile past the last piece, the way you
    // were heading — not left standing on track you cannot walk on.
    const end = last?.tile ?? from;
    const off = rideStepOff(end, plan.endFacing);
    if (off !== null) pulses.push([off, LEGS_WALK, plan.endFacing]);
    pulses.push([off ?? end, LEGS_STAND, plan.endFacing]);
    ridingUntil = Date.now() + (pulses.length + 1) * WALK_STEP_MS;
    walkAlong(pulses);
  };

  /**
   * Where a rider gets off at the end of a ride: the next tile along
   * `heading`, if it exists and nothing stands there (furniture, ride track,
   * another avatar). Null when blocked — then they stay on the last piece.
   */
  const rideStepOff = (from: number, heading: number): number | null => {
    if (!currentRoomName) return null;
    const next = tileToward(currentGeometryRoom, from, heading);
    if (next === null) return null;
    const blocked = new Set([
      ...occupiedTiles(currentRoomName, live ? live.userId : 1),
      ...furnitureTiles(currentRoomName, currentGeometryRoom, live?.userId),
    ]);
    return blocked.has(next) ? null : next;
  };

  /** The arrival half of a RIDE through a teleporter: effect 7 in the vehicle, then ride on. */
  const rideOnFrom = (partner: RoomItem, ride: RideHop): void => {
    const room = currentRoomName;
    if (!room) return;
    animateTeleporter(partner, TELEPORT_IN_MS);
    magic = MAGIC_TELEPORT_IN;
    ridingUntil = Date.now() + TELEPORT_IN_MS + 200;
    sendPulse(currentTile, ride.vehicle, partner.dir);
    setTimeout(() => {
      if (currentRoomName !== room) return;
      magic = 0;
      const plan = rideOnFromTeleporter(currentGeometryRoom, getRoomItems(room), partner, ride.vehicle);
      console.log(
        `[${label}] ride on from teleporter ${partner.ref}: ` +
          (plan ? `${plan.steps.length} tiles, ended: ${plan.end}` : "no track beyond it"),
      );
      if (!plan || plan.steps.length === 0) {
        // No track beyond the partner: off the far side of it, as at any ride's end.
        const off = rideStepOff(currentTile, partner.dir);
        ridingUntil = 0;
        if (off === null) sendPulse(currentTile, LEGS_STAND, partner.dir);
        else walkAlong([[off, LEGS_WALK, partner.dir], [off, LEGS_STAND, partner.dir]]);
        return;
      }
      rideAlong([], plan, ride.hops, currentTile);
    }, TELEPORT_IN_MS);
  };

  const teleportVia = (item: RoomItem, ride?: RideHop): void => {
    if (!item.pair || !currentRoomName) return;
    const partner = getPlacedPartner(item.pair);
    if (!partner) {
      console.log(`[${label}] teleporter ${item.ref} (pair ${item.pair.id}): partner not placed`);
      if (ride) sendPulse(currentTile, LEGS_STAND, facing);
      return;
    }
    const face = partner.dir;
    const room = currentRoomName;
    // Hold the avatar still for the whole sequence, as a ride does.
    ridingUntil = Date.now() + TELEPORT_OUT_MS + TELEPORT_IN_MS + 200;
    // Out: effect 6 on the entrance, the entrance animates, then the hop. A
    // rider stays in the vehicle for it, as on the dark rides.
    animateTeleporter(item, TELEPORT_OUT_MS);
    if (ride) {
      magic = MAGIC_TELEPORT_OUT;
      sendPulse(currentTile, ride.vehicle, facing);
    } else {
      setMagic(MAGIC_TELEPORT_OUT);
    }
    setTimeout(() => {
      if (currentRoomName !== room) return; // left some other way meanwhile
      if (partner.room === room) {
        magic = 0;
        const pad = teleporterPad(partner);
        currentTile = pad;
        facing = face;
        lastPulseAt = Date.now();
        if (me) {
          me.tile = pad;
          me.facing = face;
        }
        const params: OutgoingParam[] = [
          { int: live ? live.userId : 1 },
          { int: pad },
          { int: 0 },
          { int: face },
          { int: face },
        ];
        for (const occupant of audienceOf(room, me?.userId ?? -1)) occupant.send(MSG.LOCATE_AVATAR, params, undefined);
        console.log(`[${label}] teleported ${item.ref} -> ${partner.ref} (pad ${pad}) in ${room}${ride ? " riding" : ""}`);
        if (ride) rideOnFrom(partner, ride);
        else finishTeleportIn(partner);
        return;
      }
      const guestId = /^guest:(\d+)$/.exec(partner.room)?.[1];
      const guest = guestId ? getGuestRoom(Number(guestId)) : undefined;
      magic = 0;
      if (!guest) {
        console.log(`[${label}] teleporter ${item.ref}: partner is in ${partner.room}, not a guest room`);
        setMagic(0);
        return;
      }
      pendingArrival = { room: partner.room, partner, facing: face };
      arrivedByTeleport = partner;
      arrivedRiding = ride ?? null;
      console.log(`[${label}] teleporting ${item.ref} -> ${partner.ref} in ${partner.room}${ride ? " riding" : ""}`);
      if (!enterGuestRoom(guest)) {
        pendingArrival = null;
        arrivedByTeleport = null;
        arrivedRiding = null;
        setMagic(0);
      }
    }, TELEPORT_OUT_MS);
  };

  /**
   * What a Monorail Station or Monorail Train exit tile does right now, by its
   * door ID — the same IDs the client handlers switch between "exit", "tile"
   * and "hide". Undefined when we are in neither room.
   *
   * Stairs always lead to the station's land. The train's doors — boarding
   * from the platform, alighting from inside — work only while the train
   * stands at that platform with its doors open (state 1); otherwise the tile
   * is just floor, as the client shows it.
   */
  const monorailExitAt = (tile: number): ExitRule | null | undefined => {
    if (currentRoomCode !== MONORAIL_STATION && currentRoomCode !== MONORAIL_TRAIN) return undefined;
    const id = exitIdAt(currentGeometryRoom, tile);
    if (id === null) return null;
    if (currentRoomCode === MONORAIL_STATION) {
      const stairs = STATION_STAIRS[stationStop];
      if (STATION_GROUND_STAIRS.includes(id)) return { tiles: [tile], label: "station stairs", to: stairs.ground };
      if (STATION_PIER_STAIRS.includes(id)) return { tiles: [tile], label: "station stairs", to: stairs.pier };
      const boardable = STATION_BOARDING.includes(id) ? boardableTrainAt(stationStop) : undefined;
      if (boardable) {
        return {
          tiles: [tile],
          label: `board Monorail train ${boardable.id + 1} at ${MONORAIL_STOP_NAMES[stationStop]}`,
          to: MONORAIL_TRAIN,
          train: boardable.id,
          // Just inside the train doorway that faces this platform doorway.
          arrive: insideOf(
            ROOM_CODES.get(MONORAIL_TRAIN),
            exitTilesWithIds(ROOM_CODES.get(MONORAIL_TRAIN), doorPairFor("station", id)?.train ?? [9, 10, 11, 12, 13, 14]),
          ),
        };
      }
      return null;
    }
    const mine = trains[trainId];
    if (TRAIN_DOORS.includes(id) && mine?.state === 1) {
      return {
        tiles: [tile],
        label: `leave Monorail train ${mine.id + 1} at ${MONORAIL_STOP_NAMES[mine.stop]}`,
        to: MONORAIL_STATION,
        stop: mine.stop,
        // Just outside the platform doorway this train doorway faces.
        arrive: insideOf(
          ROOM_CODES.get(MONORAIL_STATION),
          exitTilesWithIds(ROOM_CODES.get(MONORAIL_STATION), doorPairFor("train", id)?.station ?? [10, 11, 12]),
        ),
      };
    }
    // The music mixer booth at the rear (doorway #6): always open, and it does
    // not care where the train is — CloseMixer brings you back to this train.
    if (TRAIN_MIXER_DOORS.includes(id)) {
      return { tiles: [tile], label: "Monorail music mixer", to: MONORAIL_MIXER_ROOM };
    }
    return null; // doors shut
  };

  /**
   * Step through an exit. The client only ever told us "move to tile N"; the
   * rule for N (room-exits.ts) says whether that leaves the room, hops within
   * it, or opens a themed guest-room list.
   */
  const takeExit = (rule: ExitRule): void => {
    const from = currentRoomCode;
    if (rule.navigator !== undefined) {
      // The client answers with GET_POPULAR_BY_TYPE, which opens the list.
      send(MSG.SPACE_LIST_ROOM_TYPE_TRIGGER, [{ int: rule.navigator }], `SpaceListRoomTypeTrigger ${rule.navigator}`);
      return;
    }
    if (rule.to === "same") {
      // A hop within the room (a mine-maze jump, the attic door): place, don't
      // walk — `WalkToTile` would glide across the room.
      const doorway = rule.arrive ?? [];
      if (!doorway.length || !currentRoomName) return;
      const tile = freeTileNear(
        currentGeometryRoom,
        doorway[Math.floor(doorway.length / 2)],
        new Set(occupiedTiles(currentRoomName, live ? live.userId : 1)),
      );
      currentTile = tile;
      lastPulseAt = Date.now();
      if (me) me.tile = tile;
      const params: OutgoingParam[] = [
        { int: live ? live.userId : 1 },
        { int: tile },
        { int: 0 },
        { int: facing },
        { int: facing },
      ];
      for (const occupant of audienceOf(currentRoomName, me?.userId ?? -1)) occupant.send(MSG.LOCATE_AVATAR, params, undefined);
      // A pulse on the new tile, so its state follows the hop: climbing out of
      // the Waterpark Pool must stop the swimming there and then.
      sendPulse(tile, LEGS_STAND);
      console.log(`[${label}] exit "${rule.label}" -> tile ${tile} (same room)`);
      return;
    }
    const code = rule.to === "back" || rule.to === undefined ? backRoomCode ?? LANDING_ROOM_CODE : rule.to;
    const blocked = BLOCKED_ROOMS.get(code);
    if (blocked) {
      console.log(`[${label}] exit "${rule.label}" -> ${code}: BLOCKED (${blocked})`);
      alertBlocked(blocked);
      return;
    }
    // Named rooms come from ROOM_IDS; a nameless one (the Monorail mixer, 1107)
    // only has to load.
    if (!ROOM_IDS.includes(code) && !LOADABLE_ROOMS.has(code)) {
      console.log(`[${label}] exit "${rule.label}" -> ${code}: no loadable space cast, staying put`);
      return;
    }
    let doorway = rule.arrive ?? (from !== undefined ? doorBackTo(code, from) : null);
    if (!rule.arrive && from !== undefined && leftThrough?.code === code && leftThrough.to === from &&
        exitTilesTo(code, from).includes(leftThrough.tiles[0])) {
      doorway = leftThrough.tiles;
    }
    leftThrough = from !== undefined ? { code: from, tiles: rule.tiles, to: code } : null;
    if (rule.stop !== undefined) pendingStationStop = rule.stop;
    if (rule.train !== undefined) pendingTrain = rule.train;
    // Up a land's monorail stairs: arrive at the top of the SAME stairs — the
    // pier-side ones for Tom Sawyer's Island, the ground-floor ones otherwise.
    if (code === MONORAIL_STATION && !rule.arrive && from !== undefined) {
      const stop = LAND_STATION[from];
      const pier = stop !== undefined && STATION_STAIRS[stop].pier === from && STATION_STAIRS[stop].ground !== from;
      const tiles = exitTilesWithIds(ROOM_CODES.get(MONORAIL_STATION), pier ? STATION_PIER_STAIRS : STATION_GROUND_STAIRS);
      if (tiles.length) doorway = tiles;
    }
    pendingDoor = doorway ? { code, tiles: doorway, face: rule.face } : null;
    console.log(
      `[${label}] exit "${rule.label}" -> ${code} (${ROOM_NAMES.get(code) ?? ROOM_CODES.get(code) ?? "?"})` +
        `${rule.flag ? ` [inferred: ${rule.flag}]` : ""}`,
    );
    enterRoom(code);
  };

  /**
   * THE MUSIC STAGE (music-mixer.ts). The queue walks the performer up and
   * calls `offerPerformance`; the picker (2757) offers their mixes for this
   * stage's mixer; `PlaySong` plays one to the whole room (2756) while they
   * dance; when it ends — or they cancel, or never choose — 2759 and the queue
   * walks them off.
   */
  const offerPerformance = (): void => {
    const variant = mixerVariantOf(currentRoomCode);
    const room = currentRoomName;
    if (!live || !variant || !room) return;
    if (performance) clearTimeout(performance.timer);
    const hasSongs = getSongs(live.userId, variant).length > 0;
    send(MSG.PLAY_SONG_QUEUE_START, [{ int: hasSongs ? 1 : 0 }], `PlaySongQueueStart ${hasSongs ? "pick a song" : "no songs"}`);
    performance = {
      room,
      variant,
      playing: false,
      // No songs: the client's "No Songs Available" dialog is the whole turn.
      timer: setTimeout(() => {
        if (hasSongs) send(MSG.PLAY_SONG_QUEUE_START, [{ int: 2 }], "PlaySongQueueStart (picker timed out)");
        endPerformance(hasSongs ? "no song chosen" : "no songs");
      }, hasSongs ? PICK_SONG_MS : 2_500),
    };
  };

  const performSong = (data: string, songName: string): void => {
    if (!performance || !live) return;
    clearTimeout(performance.timer);
    performance.playing = true;
    const performer = characterName ?? live.username;
    // Everyone in the room hears it and sees "Playing X, mixed by Y".
    const params: OutgoingParam[] = [{ str: data }, { str: wireText(songName) }, { str: wireText(performer) }];
    for (const occupant of occupantsOf(performance.room)) occupant.send(MSG.PLAY_SONG_RESULT, params, undefined);
    dancing = true;
    sendPulse(currentTile, LEGS_STAND);
    const ms = Math.max(1, songSlots(data)) * SLOT_MS[performance.variant] + 1_500;
    performance.timer = setTimeout(() => endPerformance("song over"), ms);
    console.log(`[${label}] performing "${songName}" on the ${performance.variant} stage (${Math.round(ms / 1000)}s)`);
    const reward = claimPlayReward(live.userId, performance.variant);
    if (reward) payMixerReward(reward, "play", performance.variant);
  };

  const endPerformance = (reason: string): void => {
    if (!performance || !live) return;
    clearTimeout(performance.timer);
    const room = performance.room;
    performance = null;
    if (currentRoomName !== room) return;
    send(MSG.PLAY_SONG_QUEUE_END, [], "PlaySongQueueEnd");
    if (dancing) {
      dancing = false;
      sendPulse(currentTile, LEGS_STAND);
    }
    stepDown(room, live.userId);
    console.log(`[${label}] left the music stage (${reason})`);
  };

  /**
   * Mixer rewards arrive as VMK Staff mail, like the NPC rewards. The wording
   * is ours — the server's own messages were never in the client files — and
   * states the REAL intervals the wiki measured, not the "every day / every
   * hour" Disney's messages claimed.
   */
  const payMixerReward = (reward: MixerReward, kind: "save" | "play", variant: MixerVariant): void => {
    if (!live) return;
    sendCredits();
    if (reward.items.length) queueItemList(1);
    const where = variant === "street" ? "Street Party" : "Monorail";
    const text = reward.first
      ? kind === "save"
        ? `You saved your first ${where} mix! You've been awarded ${reward.credits} credits and an Underwater Organ.`
        : `You performed your first ${where} mix! You've been awarded ${reward.credits} credits.`
      : kind === "save"
        ? `You saved a new ${where} mix! You've been awarded ${reward.credits} credits. You can earn credits for mixing again in 2 hours.`
        : `You performed your ${where} mix! You've been awarded ${reward.credits} credits. You can earn credits for performing again in 15 minutes.`;
    sendStaffMessage(live.userId, text, false);
    console.log(`[${label}] ${where} mixer ${kind} reward: +${reward.credits} credits${reward.items.length ? ` +item ${reward.items.join(",")}` : ""}`);
  };

  /** This player's figure, 12 ints (6 set/colour pairs), -1 padded. */
  const myFigure = (): number[] | null => {
    const outfit = live ? getOutfit(live.userId) : null;
    if (!outfit) return null;
    const figure = [...outfit.figure.slice(0, 12)];
    while (figure.length < 12) figure.push(-1);
    return figure;
  };

  /**
   * `2505 AvatarData`: name, sex, slogan, figure. Answers the clothing button,
   * and dresses the skipper in the Jungle Cruise boat
   * (`CJungleCruiseHandler.HandleAvatarInfo`, which reads ints to the end).
   */
  const sendAvatarData = (): void => {
    const outfit = live ? getOutfit(live.userId) : null;
    const figure = myFigure();
    if (!outfit || !figure) {
      console.warn(`[${label}] AvatarData but no stored outfit`);
      return;
    }
    send(
      MSG.AVATAR_DATA,
      [
        { str: characterName },
        { int: outfit.sex },
        // Read with GetStrFrom, so a plain string — the one lossy hop; see
        // `StoredSlogan`. This pre-fills the "MY SIGNATURE" field.
        { str: wireText(live ? sloganTextFor(live.userId) : "") },
        ...figure.map((v) => ({ int: v })),
      ],
      `AvatarData "${characterName}" sex=${outfit.sex}`,
    );
  };

  const fireworksPlayer = (): FwPlayer | null => {
    if (!live) return null;
    const userId = live.userId;
    return {
      userId,
      name: characterName,
      figure: () => myFigure() ?? [],
      send,
      label,
      ownsPin: (code) => getOwnedItems(userId, ITEM_CATEGORY.pins).some((i) => i.typeCode === code),
      pay: (reward) => {
        const balance = (getUserById(userId)?.credits ?? 0) + reward.credits;
        setCredits(userId, balance, "Quest Reward");
        if (reward.pins.length) addItems(userId, reward.pins, ITEM_CATEGORY.pins);
        if (live?.userId !== userId) return;
        sendCredits();
        if (reward.pins.length) queueItemList(1);
        const pins = reward.pins.map((code) => itemName(code) ?? `pin ${code}`);
        sendStaffMessage(
          userId,
          `Thanks for playing Castle Fireworks Remixed! You scored ${reward.score} and have been awarded ${reward.credits} credits` +
            (pins.length ? ` and ${pins.join(" and ")}.` : "."),
          false,
        );
        console.log(
          `[${label}] fireworks over: ${reward.score} points, +${reward.credits} credits` +
            `${pins.length ? ` +${reward.pins.join(",")}` : ""}${reward.won ? " (won)" : ""}`,
        );
      },
      backToLobby: () => enterRoom(FW_LOBBY_ROOM),
    };
  };

  const piratesPlayer = (): PotcPlayer | null => {
    if (!live) return null;
    // The lobby this player is in now — 1001 or the Classics Lobby 1010 — is
    // where a match sends them back to.
    // The Haunted Mansion lobby (haunted-mansion.ts) uses the same adapter.
    const lobbyRoom =
      isPotcLobby(currentRoomCode) || currentRoomCode === HM_LOBBY_ROOM ? currentRoomCode! : POTC_LOBBY_ROOM;
    return {
      userId: live.userId,
      name: characterName,
      send,
      label,
      alert: (text) => send(MSG.ADMIN_MESSAGE, [{ str: text }, { int: 3 }], `AdminMessage alert (pirates)`),
      pay: (credits, message) => {
        const userId = live?.userId;
        if (userId === undefined) return;
        if (credits > 0) setCredits(userId, (getUserById(userId)?.credits ?? 0) + credits, "Quest Reward");
        sendCredits();
        sendStaffMessage(userId, message, false);
      },
      toLobby: () => enterRoom(lobbyRoom),
      credits: () => (live ? (getUserById(live.userId)?.credits ?? 0) : 0),
      charge: (credits) => {
        const userId = live?.userId;
        if (userId === undefined) return false;
        const balance = getUserById(userId)?.credits ?? 0;
        if (balance < credits) return false;
        if (credits > 0) {
          setCredits(userId, balance - credits, "Pirates of the Caribbean");
          sendCredits();
        }
        return true;
      },
      givePin: (code) => {
        if (!live) return;
        addItems(live.userId, [code], ITEM_CATEGORY.pins);
        queueItemList(1);
      },
    };
  };

  /** The Haunted Mansion's player (haunted-mansion.ts / hm-match.ts): the Pirates adapter plus the avatar block. */
  const hmPlayer = (): HmPlayer | null => {
    const base = piratesPlayer();
    if (!base) return null;
    return {
      ...base,
      avatarBlock: (tile, facing, team) =>
        me
          ? avatarBlock({
              ...me,
              shownFigure: hmGameFigure(me.shownFigure ?? me.figure, team),
              tile,
              facing,
              stack: 0,
              legs: LEGS_STAND,
              leftHand: HAND_STAND,
              rightHand: HAND_STAND,
            })
          : [],
    };
  };

  /** Room 1102 has loaded: dress the skipper and cast off. */
  const startJungleCruise = (): void => {
    jcGame?.stop();
    sendAvatarData();
    const userId = live ? live.userId : 0;
    const startedAt = Date.now();
    const game = new JungleCruiseGame(send, label, (end) => {
      if (!userId) return;
      // ⚠ EXIT GAME settles like an end, so start-then-quit paid 20 credits
      // (plus a score row and a mail) in three messages, as fast as a script
      // could loop it. A cruise has to have actually been played.
      if (Date.now() - startedAt < JC_MIN_REWARD_MS) {
        console.log(`[${label}] Jungle Cruise ended after ${Math.round((Date.now() - startedAt) / 1000)} s: too short to score or pay`);
        return;
      }
      recordScore(userId, JC_GAME_CODE, end.score);
      const reward = claimJcReward(userId);
      sendCredits();
      if (reward.posters.length) queueItemList(1);
      // Announced like the other minigame rewards (see payMixerReward).
      sendStaffMessage(
        userId,
        reward.first
          ? `You played your first Jungle Cruise Photo Safari! You've been awarded ${reward.credits} credits and a Toucan Jungle Cruise Photo Safari Poster.`
          : `Thanks for playing the Jungle Cruise Photo Safari! You've been awarded ${reward.credits} credits.`,
        false,
      );
      console.log(
        `[${label}] Jungle Cruise over: ${end.score} points, ${end.stagesCleared} stage(s), ` +
          `+${reward.credits} credits${reward.posters.length ? ` +poster ${reward.posters.join(",")}` : ""}` +
          `${reward.first ? " (first play)" : ""}`,
      );
    });
    jcGame = game;
    game.begin();
  };

  /**
   * The Dock's departing boats (`CDockBoatsInterface.NewBoat`): everyone else
   * on the Dock sees this skipper sail off. `2791` entry: ref, type, state,
   * age, then int params `[boatColour, figure...]` and no strings.
   */
  const launchDockBoat = (): void => {
    const figure = myFigure();
    if (!figure || !currentRoomName || !live) return;
    const params: OutgoingParam[] = [
      { int: 1 },
      { int: live.userId },
      { int: 22 },
      { int: 0 },
      { int: 0 },
      { int: 1 + figure.length },
      { int: 1 + Math.floor(Math.random() * 4) },
      ...figure.map((v) => ({ int: v })),
      { int: 0 },
    ];
    for (const occupant of occupantsOf(currentRoomName)) {
      if (occupant.userId !== live.userId) occupant.send(MSG.ROOM_ANIMATION_LIST, params, undefined);
    }
  };

  /**
   * Message 2002 `_Hello` is what actually starts the login: the client reads
   * one int from it (a nonce byte count, only used when encryption is on) and
   * then schedules DoTheLogin on a 500ms timeout. Without this the session
   * stalls after the handshake with no error — the client is simply waiting.
   */
  const sendHello = () => send(MSG.HELLO, [{ int: 0 }], "_Hello (starts login)");

  const handleMessage = (command: number, body: string) => {
    if (command === CMD.PUBLIC_KEY) {
      const { value: clientPublicKeyHex } = readClientString(body);
      // connectionReady's non-encrypted branch sends this exact literal and
      // never enables its encoder, so the client keeps talking plaintext. It is
      // a signal, not a key -- deriving from it yields a 1-byte "secret" and
      // would leave us deciphering plaintext as hex.
      if (clientPublicKeyHex === NO_ENCRYPTION_KEY) {
        console.log(`[${label}] client declined encryption (sent "00") — staying plaintext`);
        sendHello();
        return;
      }
      try {
        const shared = dh.deriveSharedKey(clientPublicKeyHex);
        rc4 = new VmkRc4(shared);
        console.log(
          `[${label}] handshake complete: client pub ${clientPublicKeyHex}, ` +
            `shared secret ${shared.length}b — inbound traffic is RC4 from here`,
        );
        sendHello();
      } catch (err) {
        // An empty key here means the client's own Lingo BigInt failed; it will
        // also have thrown "Modulo by zero" out of CDecoderRC4.Setkey. Say so
        // plainly rather than dying, so the session stays inspectable.
        console.log(
          `[${label}] HANDSHAKE FAILED: ${(err as Error).message}. ` +
            `The client computed no public key — check its BigInt library, not this server.`,
        );
      }
      return;
    }
    if (MESSENGER_COMMANDS.has(command)) {
      // Friends, requests, IMs and staff mail — all of it lives in messenger.ts.
      // Nothing there is meaningful before login.
      if (live) {
        handleMessengerCommand(
          {
            userId: live.userId,
            label,
            send,
            enter: (where) =>
              where.guestRoom ? enterGuestRoom(where.guestRoom) : enterRoom(where.roomCode),
          },
          command,
          body,
        );
      }
      return;
    }
    if (command === CMD.LOGIN) {
      // Proof the shared key is right: these only read back as text if our
      // keystream matches the client's exactly.
      let offset = 0;
      const fields: string[] = [];
      for (let n = 0; n < 3 && offset < body.length; n++) {
        const read = readClientString(body, offset);
        fields.push(read.value);
        offset = read.next;
      }
      // fields = [name, password, machineId].
      //
      // The name alone proves nothing -- it comes from external variables, which
      // are just a text file. What authenticates is the PASSWORD field, which
      // the web server fills with a one-shot ticket bound to the signed-in user
      // (see the external_variables route). So: resolve the ticket, then check
      // it really belongs to the account being claimed.
      const claimedName = fields[0] ?? "";
      const presented = fields[1] ?? "";
      // Consumed here, whatever happens next: a ticket logs in once.
      const account = presented ? claimTicket(presented) : undefined;

      if (!account || account.username.toLowerCase() !== claimedName.toLowerCase()) {
        console.log(
          `[${label}] login REFUSED: ${
            !presented
              ? "no ticket presented"
              : !account
                ? "ticket is unknown, already used or expired"
                : `ticket belongs to "${account.username}", not "${claimedName}"`
          }`,
        );
        // The client has no "bad login" state that recovers, so there is nothing
        // useful to send: drop the connection and let it fail visibly rather
        // than sit in a login screen that will never advance.
        onClose("unauthenticated");
        return;
      }

      // Banned from Housekeeping. The web side already refuses /play with the
      // reason; this covers a ticket minted just before the ban landed.
      const ban = activeSanction(account.id, "ban");
      if (ban) {
        console.log(`[${label}] login REFUSED: "${account.username}" is banned (#${ban.id})`);
        onClose("banned");
        return;
      }

      characterName = account.character_name ?? account.username;
      onLogin();

      // One character online at a time. A second login takes over the account
      // and the earlier connection is dropped.
      live = {
        userId: account.id,
        username: account.username,
        label,
        remote,
        disconnect: (reason) => onClose(reason),
        refreshInventory: () => queueItemList(1),
        onMusicStage: () => offerPerformance(),
        rename: (name) => {
          characterName = name;
          renameHandshakes++;
          const perms = permissionsFor();
          send(
            MSG.SET_NAME,
            [{ str: name }, { int: perms.length }, ...perms.map((p) => ({ int: p }))],
            `SetName "${name}" (renamed by staff)`,
          );
          if (!me || !currentRoomName) return;
          me.name = name;
          const block: OutgoingParam[] = [{ int: 1 }, ...avatarBlock(me)];
          const slogan = sloganMessage(me);
          for (const occupant of audienceOf(currentRoomName, me?.userId ?? -1)) {
            occupant.send(MSG.REMOVE_AVATAR, [{ int: me.userId }], `RemoveAvatar ${me.userId} (renamed)`);
            occupant.send(MSG.CREATE_AVATARS, block, `CreateAvatars +1 ("${name}" renamed)`);
            if (slogan) occupant.send(MSG.AVATAR_SLOGAN, slogan, undefined);
          }
        },
        bootFrom: (roomName) => {
          if (currentRoomName !== roomName) return;
          logRoomMove("left", account.id);
          cancelMyTrade();
          stopWalking();
          stopMagic();
          if (me) {
            leaveRoom(currentRoomName, me.userId);
            me = null;
          }
          currentRoomName = undefined;
          currentRoomCode = undefined;
          // Opens the navigator over the dead room and shows "You've been booted".
          send(MSG.USER_WAS_KICKED, [], "UserWasKicked");
        },
        send,
        roomName: () => currentRoomName,
        setTrading: (on) => {
          trading = on ? 1 : 0;
          if (me) me.trading = trading;
          if (currentRoomName) sendPulse(currentTile, LEGS_STAND);
        },
        wornGarments: () => wornClothingSets(),
        rideTo: (code, arrive, rideLabel) => {
          stopWalking();
          takeExit({ tiles: [], label: rideLabel, to: code, arrive });
        },
        enterQueued: (code) => enterRoom(code),
        characterName: () => characterName,
        roomCode: () => currentRoomCode,
        goTo: (where) => {
          stopWalking();
          if (where.guestRoom) enterGuestRoom(where.guestRoom);
          else if (where.roomCode !== undefined) enterRoom(where.roomCode);
        },
      };
      claimUserConnection(live);
      loginLogId = logLogin(account.id, "game", ipOf(remote), fields[2] ?? "");

      // Online in the messenger from now; the client's `MESSENGER_INIT` (sent
      // on `init_messenger`, right after login) is what fetches the list.
      const ownerId = account.id;
      messengerPeer = {
        userId: ownerId,
        send,
        location: () => {
          if (currentRoomCode === undefined) return null;
          // Re-read, so a rename or a friends-only toggle shows immediately.
          const guest = currentGuestRoom();
          return {
            title: guest?.name ?? ROOM_NAMES.get(currentRoomCode) ?? `Room ${currentRoomCode}`,
            // A friends-only room still admits the owner's friends — which is
            // exactly who can see this entry — so only a third party's
            // friends-only room is closed to them.
            // Only a hint for the GO TO button — `enterGuestRoom` decides for
            // real when it is pressed, per visitor.
            accessible: guest
              ? guest.entryState !== ENTRY_STATE.OWNER || guest.ownerId === ownerId
              : !BLOCKED_ROOMS.has(currentRoomCode),
            roomCode: currentRoomCode,
            guestRoom: guest,
          };
        },
      };
      messengerOnline(messengerPeer);

      console.log(
        `[${label}] login: user="${account.username}" id=${account.id} ` +
          `character=${JSON.stringify(characterName)} hasCharacter=${account.has_character} ` +
          `machineId=${JSON.stringify(fields[2])}`,
      );

      // 2018 has two listeners: CMainHandler.RemoveLoginWindow (tears down the
      // login UI, reads nothing) and CRegistrationHandler.HandleLogin (reads an
      // int state and branches).
      //
      //   state 0 — existing character: stops the login timer, clears the window
      //             and asks the server for the name.
      //   state 1 — new user: opens VMK's own avatar creation.
      //
      // Anything unrecognised falls through the case and silently does nothing,
      // so a wrong value here looks like a hang, not an error.
      const loginState = account.has_character ? 0 : 1;
      // `2010 SaveSessionId [status, sessionID, failure]` stores the id the
      // PHOTO SOCKET logs in with (`LOGIN <sessionID>`, Binary_Manager_Class).
      // Status 1 is not one of its error codes, so it shows nothing. It must
      // arrive while `CRegistrationHandler` still listens, which is login time.
      send(
        MSG.SAVE_SESSION_ID,
        [{ int: 1 }, { str: issuePhotoToken(account.id) }, { str: "" }],
        "SaveSessionId (photo socket token)",
      );
      send(
        MSG.REMOVE_LOGIN_WINDOW,
        [{ int: loginState }],
        loginState === 0 ? "login accepted (state 0, existing character)" : "login accepted (state 1, NEW USER → avatar creation)",
      );
      // Push sound prefs as early as the session exists. The loading window's
      // EnableLoadingSound runs during boot and is gated on session `fx`, so a
      // push that waits for QUERY_CAMERA arrives after the jingle would have
      // played. Sending it here as well is harmless -- GetSoundSettings only
      // sets session flags, so a second copy is idempotent. If this logs
      // "Listener not found", CSoundHandler is not constructed yet and this
      // early copy should be dropped rather than moved further forward.
      send(
        MSG.GET_SOUND_SETTINGS,
        settingsParams(),
        settingsNote("pushed at login"),
      );
      return;
    }
    if (command === CMD.GET_NAME) {
      // `CRegistrationHandler.SetName` reads: name, an int count, then that many
      // permission ints. This is the ONLY thing that makes someone a moderator:
      // it stores the list on the session, and `SetName` then fires
      // `show_mod_window`, whose `ShowModsWindow` returns 0 unless that session
      // key exists — no key, no mod button.
      //
      // ⚠ A count of 0 is NOT "a moderator with no powers". `SetName` only
      // stores the list `if t_iDatacount > 0`, so zero leaves the key absent and
      // the player ordinary. That single `{ int: 0 }` is why no mod button has
      // ever appeared.
      const perms = permissionsFor();
      send(
        MSG.SET_NAME,
        [{ str: characterName }, { int: perms.length }, ...perms.map((p) => ({ int: p }))],
        `SetName "${characterName}"${perms.length > 0 ? ` perms=[${permissionNames().join(",")}]` : ""}`,
      );
      return;
    }
    if (command === CMD.NAVIGATOR_HANDSHAKE) {
      if (renameHandshakes > 0) {
        renameHandshakes--;
        return;
      }
      // Reads no parameters, and fires #ui_show — this is what reveals the game
      // interface, so a missing reply here leaves the stage blank with no error.
      send(MSG.NAVIGATOR_HANDSHAKED, [], "NavigatorHandshaked (shows the UI)");
      return;
    }

    // ---------------------------------------------------------------------
    // Avatar creation. Reached only from login state 1 (a new account).
    // Field orders come from CRegistrationHandler's own readers — see the MSG
    // comments in vmk-protocol.ts. A short or mis-ordered reply here does not
    // error: VMK's `case` falls through and the screen simply never advances.
    // ---------------------------------------------------------------------
    if (command === CMD.GET_NEW_AVATAR_SETS) {
      const cat = avatarCatalogue();
      const params: OutgoingParam[] = [{ int: cat.male.length }];
      for (const id of cat.male) params.push({ int: id });
      params.push({ int: cat.female.length });
      for (const id of cat.female) params.push({ int: id });
      for (const id of cat.defaultMale) params.push({ int: id });
      for (const id of cat.defaultFemale) params.push({ int: id });
      send(
        MSG.GET_AVAILABLE_SETS,
        params,
        `getAvailableSets male=${cat.male.length} female=${cat.female.length}`,
      );
      // Must follow 2502, and nothing asks for it -- see MSG.HAIR_LIST_FOR_HATS.
      // AllClothesLoaded is gated on `m_bHatListReady and m_bAvailableSetsReady`
      // and this is the only message that sets the first, so without it
      // registration silently dead-ends after every cast has loaded.
      //
      // Empty list = no hairstyle is barred from wearing a hat, which is the
      // permissive reading of an inverted-sense list we have no data for.
      send(MSG.HAIR_LIST_FOR_HATS, [{ int: 0 }], "hairListForHats (none barred from hats)");
      // The guest-room styles, needed HERE and not after the EULA.
      //
      // Step 1 of the creation screen has a "THEN CHOOSE YOUR STYLE OF GUEST
      // ROOM" panel, and `CRegPage1.update` only populates it when the
      // "AvailableSets" refresh finds a GuestRoomList already present. Sending
      // 2509 only after AcceptEULA means `m_ar_RoomList` is VOID at that point,
      // `ChangeRoomSelection` is skipped by its own `if listp(...)` guard, and
      // the panel keeps the placeholder text -- which is why the screen showed
      // the literal string "reg.roomstyle.hd". That is the window ELEMENT's own
      // name, not a missing text key: ChangeRoomSelection would have filled it
      // from `getText("ROOM." & id & ".NAME")`, and those keys all exist.
      send(
        MSG.AVAILABLE_GUEST_ROOMS,
        [{ int: GUEST_ROOM_STYLES.length }, ...GUEST_ROOM_STYLES.map((id) => ({ int: id }))],
        `AvailableGuestRooms styles=${GUEST_ROOM_STYLES.join(",")}`,
      );
      return;
    }

    if (command === CMD.GENERATE_NAMES) {
      // ⚠ Exactly 5 strings. GeneratedNames reads the count int but then loops
      // 5 times unconditionally, so anything else desynchronises the frame.
      const suggestions = suggestNames(5);
      send(
        MSG.GENERATED_NAMES,
        [{ int: suggestions.length }, ...suggestions.map((name) => ({ str: name }))],
        `GeneratedNames ${suggestions.join(", ")}`,
      );
      return;
    }

    if (command === CMD.SEND_NEW_NAME) {
      // Registration only. After it, a name changes through staff (SetName).
      if (live && getUserById(live.userId)?.has_character !== 0) return;
      // ⚠ Judged AND kept trimmed: the rules apply to `trim()`, so keeping the
      // raw string let ~1 MB of whitespace padding through to every room.
      const proposed = readClientString(body).value.trim();
      const verdict = judgeCharacterName(proposed, live?.userId);
      if (verdict.ok) {
        characterName = proposed;
        const perms = permissionsFor();
        send(
          MSG.SET_NAME,
          [{ str: proposed }, { int: perms.length }, ...perms.map((p) => ({ int: p }))],
          `SetName "${proposed}" (accepted)`,
        );
      } else {
        // reason 1..4 carries an explanatory string; anything else is bare.
        const params: OutgoingParam[] = [{ int: verdict.reason }];
        if (verdict.reason > 0 && verdict.reason < 5) {
          params.push({ str: verdict.info });
        }
        send(MSG.NAME_REJECTED, params, `NameRejected "${proposed}" reason=${verdict.reason}`);
      }
      return;
    }

    if (command === CMD.CREATE_AVATAR) {
      // Exact layout, read from CRegPage1._GatherData (not inferred):
      //
      //   str name, int sex (0=M/1=F), {int setId, int colourIdx} x parts,
      //   int guestRoomStyle
      //
      // ALWAYS two ints per part: when setId is -1 the client appends -1 as the
      // colour too and moves on, so the pairs never go ragged.
      //
      // ⚠ The trailing int is the GUEST ROOM STYLE the player picked on step 1 —
      // one of the ids we advertised in `2509 AvailableGuestRooms`. The client
      // uses it as `reg.roomstyle.<id>` (preview art) and `ROOM.<id>.NAME`
      // (label). It is NOT the landing room: `2514 LandingRoom` is where the
      // player spawns and is a separate value the client stores in
      // `m_iLandingRoom`. Do not conflate them.
      //
      // ⚠ `CRegPage2._GatherData` sends the SAME message with NO trailing style
      // (it reads the figure from the session instead). Discriminate by parity:
      // sex + 2*parts is ODD, sex + 2*parts + style is EVEN.
      // ⚠ Registration only: nothing checked this, so a finished character
      // could resend it and rename themselves for good, past staff.
      if (live && getUserById(live.userId)?.has_character !== 0) {
        console.warn(`[${label}] CreateAvatar refused: registration is already complete`);
        return;
      }
      const nameRead = readClientString(body);
      const proposed = nameRead.value.trim();
      const verdict = judgeCharacterName(proposed, live?.userId);

      if (!verdict.ok) {
        const suggestions = suggestNames(3);
        send(
          MSG.AVATAR_NOT_CREATED,
          [{ int: suggestions.length }, ...suggestions.map((name) => ({ str: name }))],
          `AvatarNotCreated "${proposed}" — offering ${suggestions.join(", ")}`,
        );
        return;
      }

      // sex + 6 parts x (set, colour) + style is 14; anything past a generous
      // bound is not a figure, and was stored and logged in full.
      const ints: number[] = [];
      for (let at = nameRead.next; at < body.length && ints.length < FIGURE_INTS_MAX; ) {
        const read = decodeToInt(body, at);
        if (read.next <= at) break; // never spin on a malformed frame
        ints.push(read.value);
        at = read.next;
      }

      // The style is whatever the picker was SHOWING. `CRegPage1._GatherData`
      // sends `m_iSelectedRoomId`, and `ChangeRoomSelection` sets it together with
      // the label (`ROOM.<id>.NAME`) and preview (`reg.roomstyle.<id>`) from the
      // same `m_ar_RoomList` entry; it also runs when the list arrives, so the
      // value is never unset. (An older note here called it stale — it is not;
      // checked 2026-09-25 by registering with each style.) If a player gets a
      // room they did not pick, suspect the picker's label/art, not this value.
      // The raw ints are still logged: they tell a wrong pick from a mis-parse.
      console.log(
        `[${label}] CreateAvatar ints [${ints.join(", ")}] ` +
          `(name="${proposed}", ${ints.length} ints, last=${ints[ints.length - 1]})`,
      );

      const hasStyle = ints.length % 2 === 0 && ints.length >= 2;
      const guestRoomStyle = hasStyle ? ints[ints.length - 1] : null;
      const sex = ints.length > 0 ? ints[0] : 0;
      const figure = ints.slice(1, hasStyle ? ints.length - 1 : ints.length);

      if (guestRoomStyle !== null && !GUEST_ROOM_STYLES.includes(guestRoomStyle)) {
        // Not fatal — we still create the avatar — but it means the client sent
        // a style we never advertised, which would point at a 2509 mismatch.
        console.warn(
          `[${label}] guest room style ${guestRoomStyle} was never advertised ` +
            `(offered ${GUEST_ROOM_STYLES.join(",")})`,
        );
      }

      characterName = proposed;
      if (live) {
        // Remember the choices; the account is NOT a character until the EULA.
        // See `savePendingCharacter` and ACCEPT_EULA below.
        //
        // ⚠ Step 2 (`CRegPage2._GatherData`) sends CreateAvatar again WITHOUT a
        // room style, so keep the one step 1 chose rather than erasing it.
        const style = guestRoomStyle ?? getOutfit(live.userId)?.guestRoomStyle ?? null;
        savePendingCharacter(live.userId, proposed, JSON.stringify({ sex, figure, guestRoomStyle: style }));
        console.log(
          `[${label}] avatar chosen for "${live.username}" as "${proposed}" ` +
            `sex=${sex === 0 ? "M" : "F"} figure=[${figure.join(",")}] guestRoomStyle=${style ?? "(none)"} ` +
            `(pending until AcceptEULA)`,
        );
      }
      send(MSG.AVATAR_CREATED, [], `AvatarCreated "${proposed}"`);
      // ⚠ ORDERING IS LOAD-BEARING. `2514 LandingRoom` must arrive BEFORE the
      // player clicks agree on step 5, because `CRegPageBase._EventProc` does
      // all of this synchronously in that one click handler:
      //
      //   SendData()                      -> 508 AcceptEULA
      //   send("NavigatorHandshake")
      //   if integerp(m_iLandingRoom) and m_iLandingRoom > -1 then
      //       send("InstanceInfoByTag", [m_iLandingRoom])
      //
      // `m_iLandingRoom` is only set when 2514 arrives. Replying with 2514 to
      // 508 is too late — the guard has already failed, InstanceInfoByTag is
      // never sent, and the client sits on a black stage with its UI up having
      // never asked for a room. Sending it here gives it time to land.
      send(MSG.LANDING_ROOM, [{ int: LANDING_ROOM_CODE }], `LandingRoom ${LANDING_ROOM_CODE}`);
      return;
    }

    if (command === CMD.ACCEPT_EULA) {
      // The rules step, and the END of registration: `CRegPage3.SendData` sends
      // this only when the player agrees. Everything that makes the account a
      // character happens here, once — a player who leaves on step 2 or 3 comes
      // back to registration, with nothing granted twice.
      if (live && getUserById(live.userId)?.has_character === 0) {
        const outfit = getOutfit(live.userId);
        const name = characterName ?? live.username;
        completeCharacter(live.userId);
        // Registration step 1 is a room PICKER, so finishing means the player
        // owns a room. A new room inherits the STYLE'S DESCRIPTION, which the
        // player edits later — not the style's name, which reads as a mistake.
        const style = outfit?.guestRoomStyle ?? GUEST_ROOM_STYLES[0];
        const room = createGuestRoom(live.userId, style, `${name}'s Room`, loadRoomTexts("desc").get(style) ?? "");
        console.log(
          `[${label}] guest room ${room.id} "${room.name}" ` +
            `(style ${style} = ${ROOM_NAMES.get(style) ?? "?"}) for "${live.username}"`,
        );
        // You own the outfit you chose, exactly as you own the room you chose.
        // Granted ONCE, here — not derived from the current figure later, or
        // taking a garment off would remove it from the inventory. Garments
        // only; hair and face are not inventory items.
        const startingSets = figureSetIds(outfit?.figure ?? []).filter(isGarment);
        const granted = grantItems(live.userId, startingSets, ITEM_CATEGORY.clothes);
        console.log(
          `[${label}] registration complete for "${live.username}" as "${name}": ` +
            `granted ${granted} starting clothing item(s) [${startingSets.join(", ")}]`,
        );
      }
      // 2514 is deliberately NOT sent here — see CREATE_AVATAR.
      send(MSG.AVAILABLE_GUEST_ROOMS, [{ int: 0 }], "AvailableGuestRooms (none yet)");
      return;
    }

    if (command === CMD.ROOM_START) {
      // Joining the monorail mid-cycle: both handlers have an "init" path for
      // the first event they see (the station shows the train stopped, gone or
      // arriving; the train opens its doors or runs between stops). A moment
      // late so the room's handler cast has registered its listeners.
      if (currentRoomCode === MONORAIL_STATION || currentRoomCode === MONORAIL_TRAIN) {
        const room = currentRoomName;
        setTimeout(() => {
          if (currentRoomName !== room) return;
          if (currentRoomCode === MONORAIL_TRAIN) {
            const train = trains[trainId] ?? trains[0];
            send(MSG.MONORAIL_NEXT_STOP, [{ int: train.stop }], `NextMonorailStop ${train.stop}`);
            send(MSG.MONORAIL_EVENT, [{ int: train.state }], `MonorailEvent ${train.state} (train ${train.id + 1}, joining)`);
          } else {
            const state = stationStateFor(stationStop);
            const untilNext = msUntilNextMonorailPhase();
            if (untilNext < STATION_CATCHUP_GUARD_MS) {
              // The next event is about to land; let it be the first (see STATION_CATCHUP_GUARD_MS).
              console.log(`[monorail] station ${stationStop} catch-up ${state} skipped: next phase in ${untilNext} ms`);
            } else {
              send(MSG.MONORAIL_EVENT, [{ int: state }], `MonorailEvent ${state} (station ${stationStop}, joining)`);
            }
          }
        }, 800);
      }
      // Walking into either end of the rocket shuttle mid-cycle: show where the
      // rocket is (nothing, if it is at the other end). Late, like the monorail
      // sync, so the room's handler is listening.
      if (currentRoomCode === ROCKET_HUB || currentRoomCode === ROCKET_DECK) {
        const room = currentRoomName;
        const code = currentRoomCode;
        setTimeout(() => {
          if (currentRoomName !== room) return;
          const state = rocketStateFor(code);
          if (state !== null) send(MSG.ROOM_ANIMATION_STATE, [{ int: 0 }, { int: state }], `RocketState ${state} (joining)`);
        }, 800);
      }
      // A fresh room starts its gate shut (`Init` -> `HandleGate(0)`).
      spaceGateOpen = false;
      // Walking into the Steamboat while someone is on stage: show them. Late,
      // like the monorail sync, so the handler is listening and the performer's
      // avatar exists — `ShowScreen` looks it up by ref and reads its outfit.
      const performer = currentRoomName ? podiumHolders.get(currentRoomName) : undefined;
      if (performer !== undefined) {
        const room = currentRoomName;
        setTimeout(() => {
          if (currentRoomName !== room || podiumHolders.get(room as string) !== performer) return;
          send(MSG.STEAMBOAT_ENTER_PODIUM, [{ int: performer }], `EnterPodium ${performer} (joining)`);
        }, 800);
      }
      // Arrived by teleporter: once this handler has placed the avatar, play
      // the arrival effect on the partner. A timer, so it lands after the
      // avatar exists whichever way this handler returns.
      if (arrivedByTeleport) {
        const partner = arrivedByTeleport;
        const ride = arrivedRiding;
        arrivedByTeleport = null;
        arrivedRiding = null;
        setTimeout(() => (ride ? rideOnFrom(partner, ride) : finishTeleportIn(partner)), 600);
      }
      // "start" — the client has the room's casts and wants its contents.
      // Answer with the player's own avatar, or the room stays empty.
      //
      // Except a mixing room, which is only ever a full-screen window: no
      // avatar (drawing one flashed the player standing in an empty room until
      // the window came up). `2750 OpenMixer` now — ROOM_START means the room's
      // casts, and so the mixer's handler, are loaded.
      if (currentRoomCode === STREET_MIXER_ROOM || currentRoomCode === MONORAIL_MIXER_ROOM) {
        send(MSG.OPEN_MIXER, [], "OpenMixer");
        return;
      }
      // The Jungle Cruise: no avatar either — you are the skipper in the boat,
      // drawn by the game from `2505`. `room_ready` has already prepared it.
      if (currentRoomCode === JC_GAME_ROOM) {
        startJungleCruise();
        return;
      }
      if (currentRoomCode === FW_LOBBY_ROOM && live) {
        if (fwRoomStart(live.userId)) return;
        fwLobbyEnter(live.userId, send);
      }
      if (isPotcLobby(currentRoomCode) && live) {
        // The 580 a match's `PrepareRoom` sends: the room code stays 1001 (an
        // in-place scene switch), but the player now belongs to the match's own
        // occupancy bucket. The avatar is still placed — the game parks every
        // owner's avatar under its ship (`CPiratesComponent.update`).
        const bucket = potcRoomStart(live.userId);
        if (bucket) {
          leaveRoom(currentRoomName, live.userId);
          me = null;
          currentRoomName = bucket;
        } else {
          const player = piratesPlayer();
          if (player && currentRoomCode !== undefined) potcLobbyEnter(currentRoomCode, player);
        }
      }
      // Haunted Mansion: the same in-place switch for a match's 580; the
      // lobby's own 580 subscribes the player once their avatar exists (below).
      let hmLobbyArrival = false;
      if (currentRoomCode === HM_LOBBY_ROOM && live) {
        const bucket = hmRoomStart(live.userId);
        if (bucket) {
          leaveRoom(currentRoomName, live.userId);
          me = null;
          currentRoomName = bucket;
        } else {
          hmLobbyArrival = true;
        }
      }
      const outfit = live ? getOutfit(live.userId) : null;
      if (!outfit) {
        console.warn(
          `[${label}] ROOM_START but no stored outfit for ` +
            `${live?.username ?? "(no session)"} — cannot place an avatar`,
        );
        return;
      }

      const ref = live ? live.userId : 1;
      // ⚠ Arrival does NOT check occupancy on the client: `_CreateAvatars` uses
      // `SetToTileStack`, which places the avatar wherever it is told. Since
      // every player gets the same tile from `spawnTileFor`, two people
      // entering the same room rendered on top of each other. Step aside to the
      // nearest free tile before announcing ourselves.
      // A slide top is a floor of one tile: stay on it even if someone else is
      // still there, since they are about to slide away.
      if (!pendingSlide && !darkRide) {
        currentTile = freeTileNear(
          currentGeometryRoom, // tiles come from the casts
          currentTile,
          new Set([
            ...occupiedTiles(currentRoomName, ref), // people
            ...furnitureTiles(currentRoomName, currentGeometryRoom), // solid furniture
          ]),
        );
      }
      me = {
        userId: ref,
        name: characterName,
        sex: outfit.sex,
        figure: outfit.figure,
        tile: currentTile,
        facing,
        badges: live ? getBadges(live.userId) : [],
        slogan: live ? sloganTextFor(live.userId) : "",
        sloganTokens: live ? storedSloganTokens(live.userId) : [],
        magic: shownMagic(),
        ghost: ghosting,
        staff: permissionsFor().length > 0,
        send,
      };

      // Announce this player to everyone already here, BEFORE joining, so the
      // list built for ourselves below does not contain us twice. A ghost is
      // announced to staff only; ghosts already here are listed to us only if
      // we are staff (`sees`).
      const others = occupantsOf(currentRoomName).filter((o) => sees(me!, o));
      const mySlogan = sloganMessage(me);
      for (const other of occupantsOf(currentRoomName)) {
        if (!sees(other, me)) continue;
        other.send(
          MSG.CREATE_AVATARS,
          [{ int: 1 }, ...avatarBlock(me)],
          `CreateAvatars +1 ("${characterName}" joined)`,
        );
        // The block's `desc` is a plain string and cannot carry dictionary
        // words; this replays the tokens so their profile reads correctly.
        if (mySlogan) other.send(MSG.AVATAR_SLOGAN, mySlogan, undefined);
      }
      if (currentRoomName) joinRoom(currentRoomName, me);
      if (pendingSlide) {
        rideSlide(pendingSlide);
        pendingSlide = null;
      }

      // ...and tell this player about everyone, themselves included. A single
      // message carries them all: the leading int is the avatar count.
      const everyone = [me, ...others];
      send(
        MSG.CREATE_AVATARS,
        [{ int: everyone.length }, ...everyone.flatMap(avatarBlock)],
        `CreateAvatars ${everyone.length} (${everyone.map((o) => `"${o.name}"@${o.tile}`).join(", ")})`,
      );
      // `2592 _AvatarInfo [ownRef]` — which of those avatars is US.
      // `CRoomHandler._AvatarInfo` stores it as session `room_own_avatar`,
      // and it was never sent: the trade window then asked `RequestItemDetails`
      // about its OWN offer with owner 0, missed the trade branch, and fell
      // through to placed furniture — inventory row 32 previewed as the High
      // School Piano at room-item ref 32. Quests, lobbies and the element
      // control read the same key.
      send(MSG.AVATAR_INFO, [{ int: me.userId }], `AvatarInfo own=${me.userId}`);
      // ⚠ After the avatars: the HM lobby's `update` reads the own avatar's
      // NAME from the room as soon as it sees a game it belongs to.
      if (hmLobbyArrival) {
        const player = hmPlayer();
        if (player) hmLobbyEnter(player);
      }
      if (darkRide && currentRoomCode === darkRide.scene) rideDarkScene();
      // Signatures for everyone now on screen, our own included — this is what
      // makes a signature survive a relog rather than reading as debug output.
      for (const occupant of everyone) {
        const params = sloganMessage(occupant);
        if (params) send(MSG.AVATAR_SLOGAN, params, `AvatarSlogan "${occupant.name}"`);
      }
      // Anything already placed here. Sent AFTER the avatars because the
      // handler resolves `placeRef` against the room's tile index, which only
      // exists once the room itself is up.
      //
      // Seats come from the ROOM's own data and are keyed by the geometry name,
      // so they follow the cast rather than the occupancy key — a guest room
      // built on a public style does not inherit that room's benches.
      // The invisible chairs ARE functional — removing them removed sitting in
      // public rooms, which is the clearest evidence that the client attaches
      // real behaviour to them.
      //
      // A previous revision dropped them believing that a CASTS-less item leaks
      // a slot in `m_ar_iLoading`. It does not: the "Cast definition not found"
      // branch calls `_TellItemsToPrepare`, which does
      // `m_ar_iLoading.deleteOne(t_iType)` and frees it. `m_iMaxLoading` is 5.
      const seats = seatItemsFor(currentGeometryRoom);
      const placed = currentRoomName
        ? [...getRoomItems(currentRoomName).map(asPlaced), ...getRoomPosters(currentRoomName).map(posterAsPlaced)]
        : [];
      /**
       * NPCs: an element of the NPC's type code, which is what the NPC cast
       * searches for when its art is double-clicked (see npcs.ts). It has no
       * furnimap entry and draws nothing — the character is the room's own art.
       * Its TILE is the one nearest that art, because the NPC's speech bubble
       * is anchored at the element (`_ElementChat` uses its screen position).
       * Public rooms only: a guest room built on the same style has no NPC.
       */
      const roomNpcs = currentGuestRoom() ? [] : npcsInRoom(currentRoomCode);
      // A ghost is wherever it last wandered to (ghosts.ts).
      const ghostOf = (npc: Npc) =>
        npc.roams && currentRoomName ? ghostFor(currentRoomName, currentGeometryRoom, npc) : undefined;
      // So is the Gator Waiter (gator-waiter.ts), wherever his last order took him.
      const waiterOf = (npc: Npc) =>
        npc.waiter && currentRoomName ? waiterFor(currentRoomName, currentGeometryRoom, npc) : undefined;
      const npcs: PlacedItem[] = roomNpcs.map((npc) => {
        const waiter = waiterOf(npc);
        return {
          ref: NPC_REF_BASE + npc.code,
          typeCode: npc.code,
          tile: waiter?.tile ?? ghostOf(npc)?.tile ?? npc.tile,
          dir: waiter?.dir ?? npc.dir ?? 0,
          state: waiter?.action ?? 0,
        };
      });
      const queueMarkers = currentGuestRoom() ? [] : queueMarkersFor(currentGeometryRoom);
      const elements = [...seats, ...placed, ...npcs, ...queueMarkers];
      if (elements.length > 0) {
        send(
          MSG.CREATE_ELEMENTS,
          createElements(elements),
          `CreateElements ${elements.length} (${seats.length} seat(s), ${placed.length} placed` +
            `${npcs.length ? `, NPC ${npcs.map((n) => n.typeCode).join(",")}` : ""})`,
        );
      }
      if (roomNpcs.length > 0 && currentRoomName && currentRoomCode !== undefined) {
        // `2791`: each NPC's current animation — resting (state 0) on arrival;
        // a ghost mid-visit joins its loop `age` ms in.
        const list: OutgoingParam[] = [{ int: roomNpcs.length }];
        for (const npc of roomNpcs) {
          const ghost = ghostOf(npc);
          list.push(
            { int: NPC_REF_BASE + npc.code }, // ref
            { int: npc.code }, // type
            { int: ghost?.state ?? 0 }, // state
            { int: ghost ? Math.min(ghost.age, 60_000) : 0 }, // age
            { int: 0 }, // int params
            { int: 0 }, // string params
          );
        }
        send(MSG.ROOM_ANIMATION_LIST, list, `RoomAnimationList ${roomNpcs.length}`);
        ensureNpcDirector(currentRoomName, currentRoomCode);
        for (const npc of roomNpcs) ghostOf(npc)?.start();
        for (const npc of roomNpcs) {
          const waiter = waiterOf(npc);
          if (!waiter) continue;
          // `CGatorWaiterHandler` hears 2586 BEFORE the room has built the
          // element (listeners run in reverse), so its InitAnimation finds no
          // 4009 node; the first 2599 is what puts him on screen.
          send(
            MSG.UPDATE_ELEMENT,
            [
              { int: NPC_REF_BASE + npc.code },
              { int: ITEM_CATEGORY_FURNITURE },
              { int: waiter.tile },
              { int: 0 },
              { int: 2 },
              { int: waiter.dir },
              { int: waiter.action },
            ],
            `GatorWaiter @${waiter.tile} dir ${waiter.dir} action ${waiter.action}`,
          );
          waiter.start();
        }
      }
      return;
    }

    // ⚠ OFF BY DEFAULT. Answering the catalogue crashed the client outright, so
    // the safe state is to leave it unanswered (the shop then simply does
    // nothing, as it did before). Set VMK_SHOP=on to work on it.
    if (!SHOP_ENABLED && (command === CMD.CAT_INDEX_REQUEST || command === CMD.CAT_CATEGORY_REQUEST)) {
      console.log(`[${label}] catalogue command ${command} ignored (VMK_SHOP is off)`);
      return;
    }

    /** 0 male, 1 female — the axis `catalogue_items.level` is keyed on. */
    const playerSex = (): number => (live ? (getOutfit(live.userId)?.sex ?? 0) : 0);

    if (command === CMD.BUY) {
      // `[int typeCode, int pageId]` — see the constant. The client sends no
      // price, so the price is whatever the recovered catalogue says.
      let at = 0;
      const first = decodeToInt(body, at);
      at = first.next;
      const typeCode = first.value;
      const pageId = at < body.length ? decodeToInt(body, at).value : 0;
      if (!live) return;

      const page = pageById(pageId, playerSex());
      const product = page?.products.find((p) => p.code === typeCode);
      if (!product) {
        // ⚠ Look the product up on the page it was LISTED on, not anywhere in
        // the catalogue. The pair is what the client vouched for; accepting a
        // bare type code would let any item be bought at any other item's page.
        console.log(`[${label}] refused buy ${typeCode} — not on page ${pageId}`);
        return;
      }

      // One camera per player: a second "Camera and 3 film" would only be 3 film
      // at the camera's price. Owners buy film packs (6001) instead. Refused
      // before any charge, with the shop's own refusal: error.4018 "Sorry, that
      // purchase wasn't completed."
      if (CAMERA_PRODUCTS.get(product.code)?.camera && getCamera(live.userId).hasCamera) {
        send(MSG.GENERIC_ERROR, [{ int: 4018 }], "GenericError 4018 (already has a camera)");
        console.log(`[${label}] refused buy ${typeCode} — already owns a camera`);
        return;
      }

      const credits = getUserById(live.userId)?.credits ?? 0;
      if (credits < product.price) {
        // The client checks this too and puts up its own "not enough credits"
        // dialog before sending, so reaching here means the balance moved in
        // between. Staying silent leaves the shop as it was.
        console.log(
          `[${label}] refused buy ${typeCode} — ${credits} credits, needs ${product.price}`,
        );
        return;
      }

      setCredits(live.userId, credits - product.price, "Item Purchase", typeCode);

      // Camera and film are not inventory items: they light the camera button
      // and fill the film counter (catalog.ts, CAMERA_PRODUCTS).
      const grant = CAMERA_PRODUCTS.get(product.code);
      if (grant) {
        const film = grantCamera(live.userId, grant.film, grant.camera);
        const hasCamera = getCamera(live.userId).hasCamera;
        send(MSG.PURCHASE_OK, [{ int: typeCode }], `PurchaseOk ${typeCode}`);
        sendCredits();
        send(MSG.CAMERA_STATUS, [{ int: hasCamera ? 1 : 0 }], `CameraStatus hasCamera=${hasCamera ? 1 : 0}`);
        send(MSG.FILM_COUNTER, [{ int: film }], `FilmCounter ${film}`);
        console.log(
          `[${label}] bought ${typeCode} "${product.name}" for ${product.price} -> ` +
            `${grant.camera ? "camera + " : ""}${grant.film} film (now ${film})`,
        );
        return;
      }
      // Category follows the product, not the shop: the Clothing shop sells
      // inventoryType 2, Posters 3, Pins 4, everything else furniture.
      const category =
        product.inventoryType === ITEM_CLOTHING
          ? ITEM_CATEGORY.clothes
          : product.inventoryType === ITEM_POSTER
            ? ITEM_CATEGORY.posters
            : product.inventoryType === ITEM_PIN
              ? ITEM_CATEGORY.pins
              : ITEM_CATEGORY.items;
      // ⚠ addItems, not grantItems — buying a second identical chair must give
      // you two. grantItems would silently skip the duplicate and charge for it.
      // A teleporter is bought as a linked PAIR (one inventory slot); a lone
      // half would have no partner and never send anyone anywhere.
      if (category === ITEM_CATEGORY.items && isPairedTeleporter(product.code)) {
        grantItemPair(live.userId, product.code, category);
      } else {
        addItems(live.userId, [product.code], category);
      }

      send(MSG.PURCHASE_OK, [{ int: typeCode }], `PurchaseOk ${typeCode}`);
      sendCredits();
      // All four categories land in inventory 1 — furniture, clothing, posters
      // and pins alike — so the grid needs the resend for the new item to
      // appear (there is no "add item" message).
      queueItemList(1);
      console.log(
        `[${label}] bought ${typeCode} "${product.name}" for ${product.price} ` +
          `(${credits} -> ${credits - product.price}) into category ${category}`,
      );
      return;
    }

    if (command === CMD.BUY_ROOM) {
      // `CCatalogRoomsView._NextStep`: `[int code, int pageId]` then the room
      // NAME and DESCRIPTION as two canned blocks, each with its own count
      // (`TransformCannedToMsg` is called WITHOUT the no-length flag here).
      // A NEW room every time — `addGuestRoom`, not registration's idempotent
      // `createGuestRoom` — for the listed price.
      let offset = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, offset);
        offset = next;
        return value;
      };
      const readStr = () => {
        const { value, next } = readClientString(body, offset);
        offset = next;
        return value;
      };
      const readCanned = (maxChars: number): string => {
        const count = readInt();
        if (!Number.isFinite(count) || count <= 0 || count > 512) return "";
        let taken = 0;
        const tokens = decodeChat(readInt, readStr, () => offset < body.length && taken++ < count);
        // Plain text, never `tokensToText` — that is the debug rendering and
        // stores `<word:N>` for anything the server's dictionary cannot resolve.
        return tokensToPlainText(clampCanned(tokens, maxChars)).trim().slice(0, maxChars);
      };
      const code = readInt();
      const pageId = offset < body.length ? readInt() : 0;
      const name = readCanned(ROOM_NAME_MAX);
      const description = readCanned(ROOM_DESC_MAX);
      if (!live) return;

      const product = pageById(pageId, playerSex())?.products.find((p) => p.code === code);
      if (!product) {
        console.log(`[${label}] refused room buy ${code} — not on page ${pageId}`);
        return;
      }
      // The shop lists rooms by CATALOGUE code (5003…, drawn from rooms.bg.N);
      // the room is built from the public room whose `room.code.N` names the
      // same space — the product's metadata. Lowest loadable code wins.
      const candidates = [...ROOM_CODES.entries()]
        .filter(([, space]) => space === product.metadata)
        .map(([id]) => id)
        .sort((a, b) => a - b);
      const style = candidates.find((id) => LOADABLE_ROOMS.has(id)) ?? candidates[0];
      if (style === undefined) {
        console.warn(`[${label}] refused room buy ${code} — no room code for "${product.metadata}"`);
        return;
      }
      const credits = getUserById(live.userId)?.credits ?? 0;
      if (credits < product.price) {
        console.log(`[${label}] refused room buy ${code} — ${credits} credits, needs ${product.price}`);
        return;
      }

      setCredits(live.userId, credits - product.price, `Room Purchase (${code})`);
      const room = addGuestRoom(
        live.userId,
        style,
        name || `${characterName}'s Room`,
        description || (loadRoomTexts("desc").get(style) ?? ""),
      );
      send(MSG.ROOM_PURCHASE_OK, [{ int: code }, { int: room.id }], `RoomPurchaseOk ${code} -> space ${room.id}`);
      sendCredits();
      console.log(
        `[${label}] bought room ${room.id} "${room.name}" (catalogue ${code} = style ${style} ` +
          `${product.metadata}) for ${product.price} (${credits} -> ${credits - product.price})`,
      );
      return;
    }

    if (command === CMD.CAT_INDEX_REQUEST) {
      // The shop's tab structure. Names are sent as TEXT IDS, not strings — the
      // client renders `getText("cat.name." & nameId)` itself.
      // ⚠ Per-sex: `catalogue_items.level` decides which garments a player is
      // offered, and the clothing categories are split on what survives that
      // filter. The same sex MUST be used for the `16` lookup below, or a split
      // page id resolves against the wrong catalogue.
      const shops = catalog(playerSex());
      const params: OutgoingParam[] = [{ int: shops.length }];
      for (const shop of shops) {
        params.push({ int: shop.nameId }, { int: shop.pages.length });
        for (const page of shop.pages) {
          // `special` flags a promoted page; nothing of ours is special yet.
          params.push({ int: page.id }, { str: wireText(page.title) }, { int: 0 });
        }
      }
      send(
        MSG.CATALOG_INDEX,
        params,
        `CatalogIndex ${shops.length} shop(s), ` +
          `${shops.reduce((n, s) => n + s.pages.length, 0)} page(s)`,
      );
      return;
    }

    if (command === CMD.CAT_CATEGORY_REQUEST) {
      const pageId = body.length > 0 ? decodeToInt(body, 0).value : 0;
      const page = pageById(pageId, playerSex());
      if (!page) {
        console.log(`[${label}] catalogue page ${pageId} requested but unknown`);
        return;
      }
      // ⚠ layout is load-bearing and comes from the data, never a constant:
      // 3 routes the whole reply to `_SaveRoomList` (the guest-room shelf)
      // instead of the product grid. In the recovered `catalogue_children` rows
      // exactly one page carries it — Guestrooms — and every other page is 1.
      const params: OutgoingParam[] = [
        { int: page.id },
        { str: wireText(page.title) },
        { int: page.layout },
        { int: page.products.length },
      ];
      for (const product of page.products) {
        // No key/value pairs — those carry per-product extras we do not use.
        params.push({ int: product.code }, { int: product.price }, { int: 0 });
      }
      // ⚠ DE-DUPLICATED. The client asks for the same page repeatedly —
      // measured at nine requests for page 1 inside 2.5 seconds — because
      // `FindSubPageAndRequest` fires one `16` per matching sub-page and its
      // `t_sPropName contains m_sActiveCategory` test matches everything while
      // that category is still VOID. Answering every one starts a thumbnail
      // load per reply. Collapsing the repeats is the only thing that reduces
      // the work; delaying them (tried) just built a backlog.
      const now = Date.now();
      if (
        SHOP_DEDUPE_MS > 0 &&
        page.id === lastCataloguePage &&
        now - lastCatalogueAt < SHOP_DEDUPE_MS
      ) {
        console.log(
          `[${label}] catalogue page ${page.id} re-requested after ` +
            `${now - lastCatalogueAt}ms — collapsed`,
        );
        return;
      }
      lastCataloguePage = page.id;
      lastCatalogueAt = now;

      send(
        MSG.CATALOG_CATEGORY,
        params,
        `CatalogCategory page=${page.id} "${page.title}" (${page.products.length} products)`,
      );
      return;
    }

    if (command === CMD.QUEST_CURRENT_TASK) {
      // The quest engine is not implemented. Say so, rather than leaving the
      // button dead — the client waits on `2853` forever with no error path, so
      // silence is indistinguishable from a broken UI.
      //
      // Target 3 titles the dialog "VMK Staff Alert to VMK"; 0 would give
      // "Personal Message from VMK Staff", which clips in the header.
      console.log(`[${label}] quest engine requested (852) — replying "not available"`);
      send(
        MSG.ADMIN_MESSAGE,
        [{ str: wireText("Quests aren't available right now.") }, { int: 3 }],
        "AdminMessage alert (quests unavailable)",
      );
      return;
    }

    if (command === CMD.SET_SOUND_SETTINGS) {
      // Six ints, same order as the reply. The client has already applied them
      // locally, so there is nothing to echo back — persisting is the whole job,
      // and pushing them again mid-session would only make sliders jump.
      let offset = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, offset);
        offset = next;
        return value;
      };
      const settings = {
        fx: readInt(),
        music: readInt(),
        ui: readInt(),
        volume: readInt(),
        tutorial: readInt(),
        tradeRequests: readInt(),
      };
      if (live) setSettings(live.userId, settings);
      console.log(
        `[${label}] settings saved fx=${settings.fx} music=${settings.music} ` +
          `ui=${settings.ui} vol=${settings.volume} tutorial=${settings.tutorial} ` +
          `trade=${settings.tradeRequests}`,
      );
      // ⚠ ECHO IT BACK. Storing is not applying: `CSoundHandler.GetSoundSettings`
      // ends with `ResetRoomSound` and `ResetFXChannels`, and those are what make
      // a new volume audible. Without this reply the values persist but nothing
      // re-reads them, so the change only takes effect the next time a room load
      // resets the channels anyway.
      //
      // Echoing cannot make the sliders jump: we send back exactly what the
      // client just told us, so only the sound channels change.
      send(MSG.GET_SOUND_SETTINGS, settingsParams(), settingsNote("applying saved"));
      return;
    }

    if (command === CMD.REQUEST_ITEM_DETAILS) {
      // [avatarRef, type, itemRef]. The type selects the reply's extra fields
      // and must be echoed back; the info button always asks for 3, which
      // carries none — so the reply is just code, owner, type.
      let offset = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, offset);
        offset = next;
        return value;
      };
      let whose = readInt(); // avatarRef: whose panel; in a trade, whose inventory the row is in
      const requestType = readInt(); // NOT what the reply carries — see below
      const itemRef = readInt();

      // ⚠ The request's type (the int skipped above) says what `itemRef` IS:
      // 1 a lanyard SLOT in someone's profile (`CRoomAvatarProfile.ShowPinInfo`),
      // 2 an inventory row in a trade (`CInvTrade`), 3 a placed room item
      // (`CRoomElementControl`). A profile pin is its 0-based POSITION on the
      // lanyard, not an id — falling through to the room lookup below read slot
      // 4 as placement ref 4 and showed a pumpkin carriage chair for a Casey Jr.
      // Pin. Slots follow `avatarBlock`'s `pin.type.N` order, i.e. getWornPins'.
      if (requestType === 1) {
        const pin = getWornPins(whose).slice(0, MAX_WORN_PINS)[itemRef];
        if (!pin) {
          console.log(`[${label}] item details for lanyard slot ${itemRef} of ${whose}: no such pin`);
          return;
        }
        const owner = getUserById(whose);
        const magic = magicOf(pin.typeCode);
        // Kind 7 magic pin [level, word], 6 any other pin — as for a trade row.
        const params: OutgoingParam[] = [{ int: pin.typeCode }, { str: wireText(owner?.character_name ?? "") }];
        if (magic) params.push({ int: 7 }, { int: pinLevel(pin) }, { str: magic.word ?? "" });
        else params.push({ int: 6 });
        send(MSG.ITEM_DETAILS, params, `ItemDetails (lanyard) slot=${itemRef} pin=${pin.id} type=${pin.typeCode}`);
        return;
      }

      // The trade window asks about INVENTORY rows — its own and the
      // partner's (`CInvTrade.RequestItemInfo`), not placed furniture.
      const openTrade = live ? tradeOf.get(live.userId) : undefined;
      // Its OWN rows go out under session `room_own_avatar`, which is 0 if
      // `2592 AvatarInfo` never arrived. In a trade, an owner that is neither
      // trader can only mean "mine" — never let it fall through to the room's
      // furniture, where the same number is some unrelated placed item.
      if (openTrade && live && !openTrade.users.includes(whose)) whose = live.userId;
      if (openTrade && openTrade.users.includes(whose)) {
        const row = getOwnedItem(itemRef, whose);
        if (!row) return;
        const owner = getUserById(whose);
        const magic = magicOf(row.typeCode);
        // Kind: 1 furniture [ref, entity], 2 poster [ref], 3 clothing,
        // 7 magic pin [level, word], 6 any other pin.
        const params: OutgoingParam[] = [{ int: row.typeCode }, { str: wireText(owner?.character_name ?? "") }];
        if (row.category === ITEM_CATEGORY.items) params.push({ int: 1 }, { int: row.id }, { int: -1 });
        else if (row.category === ITEM_CATEGORY.posters) params.push({ int: 2 }, { int: row.id });
        else if (row.category === ITEM_CATEGORY.clothes) params.push({ int: 3 });
        else if (magic) params.push({ int: 7 }, { int: row.level ?? 1 }, { str: magic.word ?? "" });
        else params.push({ int: 6 });
        send(MSG.ITEM_DETAILS, params, `ItemDetails (trade) row=${row.id} type=${row.typeCode}`);
        return;
      }

      const poster = getRoomPoster(itemRef);
      if (poster) {
        const owner = poster.ownerId !== null ? getUserById(poster.ownerId) : undefined;
        // Kind 2 = poster, followed by its ref.
        send(
          MSG.ITEM_DETAILS,
          [{ int: poster.typeCode }, { str: wireText(owner?.character_name ?? "") }, { int: 2 }, { int: itemRef }],
          `ItemDetails poster ref=${itemRef} type=${poster.typeCode}`,
        );
        return;
      }
      const item = getRoomItem(itemRef);
      if (!item) {
        console.log(`[${label}] item details for unknown ref ${itemRef}`);
        return;
      }
      // The panel titles itself from `getText("item." & code)`, so this must be
      // the TYPE code, not the placement ref.
      const owner = item.ownerId !== null ? getUserById(item.ownerId) : undefined;
      // ⚠ `type` is the item KIND, not the value the request sent.
      // `CInvItemDetails.Define` labels the panel from it —
      //   1 -> "Furniture", 2 -> "Poster", 3 -> unisex clothing
      // — so echoing the request's 3 titled a chair as clothing. Room furniture
      // is 1, and kind 1 carries two more ints: the placement ref (which is
      // what enables the owner's "guests may move" checkbox) and an entity id,
      // where -1 means "omit".
      send(
        MSG.ITEM_DETAILS,
        [
          { int: item.typeCode },
          { str: wireText(owner?.character_name ?? "") },
          { int: 1 },
          { int: itemRef },
          { int: -1 }, // no entity id — that is the RPG furniture lookup
        ],
        `ItemDetails ref=${itemRef} type=${item.typeCode} owner="${owner?.character_name ?? "?"}"`,
      );
      return;
    }

    if (command === CMD.TOGGLE_ITEM || command === CMD.USE_ITEM) {
      // Both cycle the state; they differ only in WHO may.
      //
      //   815 TOGGLE_ITEM — `[int ref]`, the "place.state.button" on the
      //       element-control panel. That panel belongs to the owner, so this
      //       is the owner editing their own furniture.
      //   584 USE_ITEM    — `[int ref, int 0]`, a DOUBLE-click on the item in
      //       the room. Any guest may, which is what makes a piece interactive
      //       rather than merely configurable.
      //
      // ⚠ A single click is not this message. Every `select` handler that sends
      // 584 guards it with `if the doubleClick then` and then still calls
      // `callAncestor(#select, …)`, so a single click walks you over and does
      // nothing else — by design.
      const use = command === CMD.USE_ITEM;
      const ref = body.length > 0 ? decodeToInt(body, 0).value : 0;

      // An NPC — the room's character, double-clicked. See npcs.ts.
      const npc = use ? npcByRef(ref) : undefined;
      if (npc) {
        if (!live || npc.roomCode !== currentRoomCode || currentGuestRoom()) return;
        // A hidden ghost isn't there to find — you have to wait for it.
        if (npc.roams && !(currentRoomName && ghostFor(currentRoomName, currentGeometryRoom, npc).visible)) return;
        // The double-click arrives twice; one answer, one reward.
        const now = Date.now();
        if (now - (lastUse.get(ref) ?? 0) < USE_DEBOUNCE_MS) {
          lastUse.set(ref, now);
          return;
        }
        lastUse.set(ref, now);
        const visit = visitNpc(npc, live.userId, characterName);
        const hours = Math.ceil(visit.waitMs / 3_600_000);
        const dialog =
          visit.credits > 0
            ? visit.line
            : `${visit.line}\r\rCome back in ${hours} hour${hours === 1 ? "" : "s"} for more credits!`;
        // `2710 [int itemCode, str message]` — the "<Name> Found!" dialog.
        send(MSG.NPC_CLICKED, [{ int: npc.code }, { str: wireText(dialog) }], `NpcClicked ${npc.code}`);
        if (visit.credits > 0) {
          sendCredits();
          sendStaffMessage(
            live.userId,
            visit.firstVisit
              ? `You found ${npc.name} for the first time! You've been awarded ${visit.credits} credits.`
              : `You visited ${npc.name} again! You've been awarded ${visit.credits} credits.`,
            // No flash: the NPC's own dialog is up; the Mail icon pulses instead.
            false,
          );
        }
        console.log(
          `[${label}] ${characterName} found ${npc.name} (${npc.code}): ` +
            `${visit.credits > 0 ? `+${visit.credits} credits${visit.firstVisit ? " (first visit)" : ""}` : `no credits, ${hours}h to wait`}`,
        );
        return;
      }

      const item = getRoomItem(ref);
      if (!item || item.room !== currentRoomName) return;

      // Dark-ride scenery, clicked by its owner: show the trigger zone, and on a
      // double-click open its editor. See ride-triggers.ts.
      //
      // `CRoomItemProximityConfig.select` sends 584 on EVERY click (owner only),
      // and `CRoomItemTriggerableAlternative` adds one more on a double-click, so
      // a double-click arrives as 2-3 of these back to back. The first answers
      // `2882` (redraw the stars, no dialog); a repeat inside the double-click
      // window answers `2881` once (the editor, which is modal).
      if (PROXIMITY_ITEMS.has(item.typeCode) && item.ownerId === live?.userId) {
        const now = Date.now();
        const previous = lastProximityUse.get(ref);
        const repeat = previous !== undefined && now - previous.at < USE_DEBOUNCE_MS;
        lastProximityUse.set(ref, { at: now, dialog: repeat ? true : false });
        if (repeat && previous.dialog) return; // already opened for this double-click
        const config = proximityConfig(getRoomItemConfig(ref));
        const pairs: OutgoingParam[] = PROXIMITY_KEYS.flatMap((k) => [{ str: k }, { str: String(config[k]) }]);
        const message = repeat ? MSG.ITEM_CONFIGURATION : MSG.CURRENT_ITEM_CONFIGURATION;
        send(
          message,
          [{ int: ref }, { int: PROXIMITY_KEYS.length }, ...pairs],
          `${repeat ? "ItemConfiguration" : "CurrentItemConfiguration"} ref=${ref} type=${item.typeCode} ` +
            `{${PROXIMITY_KEYS.map((k) => `${k}=${config[k]}`).join(" ")}}`,
        );
        return;
      }

      // ⚠ ONE double-click sends 584 TWICE — once per mouseDown. Measured on
      // the scoreboard, where each pair arrives back to back:
      //
      //   << 8b 40 40 45 49 48 52 45 48   UseItem ref=22
      //      used ref=22 state 0 -> 1
      //   << 8b 40 40 45 49 48 52 45 48   UseItem ref=22, again
      //      used ref=22 state 1 -> 2
      //
      // Acting on both advances every item by two and overwrites the
      // intermediate state within milliseconds, so the scoreboard counted
      // 0, 2, 4 instead of 0, 1, 2, and a two-state piece like a turnstile went
      // 0 -> 1 -> 0 and looked completely dead. Collapse the pair.
      //
      // Keyed by ref rather than by session: the second message is the same
      // physical gesture on the same object, and two people genuinely using one
      // item inside the double-click interval is not a case worth splitting.
      // TOGGLE_ITEM is exempt — that is a deliberate press of the state button.
      if (use) {
        const now = Date.now();
        const previous = lastUse.get(ref) ?? 0;
        if (now - previous < USE_DEBOUNCE_MS) {
          lastUse.set(ref, now);
          return;
        }
        lastUse.set(ref, now);
      }

      // A water cooler pours you a cup — only standing next to it. Falls
      // through so the cooler's own state (if it has one) still steps.
      if (use && WATER_COOLERS.has(item.typeCode)) {
        const footprint = [...coveredTiles(currentGeometryRoom, item.tile, item.typeCode, item.dir).keys()];
        const besideCooler = (tile: number) =>
          footprint.some((f) => (tilesApart(currentGeometryRoom, tile, f) ?? Infinity) <= 1);
        const drink = () => {
          for (const t of drinkTimers) clearTimeout(t);
          // Hold the cup, sipping at SIP_EVERY_MS, then put it away. A change
          // made mid-walk waits for the next stride's pulse: a same-tile pulse
          // there would stop the avatar dead.
          const pose = (hand: number) => () => {
            cupHand = hand;
            if (!walkTimer) sendPulse(currentTile, LEGS_STAND);
          };
          drinkTimers = [];
          for (let at = 0; at + SIP_MS < DRINK_MS; at += SIP_EVERY_MS) {
            drinkTimers.push(setTimeout(pose(HAND_DRINK), at));
            drinkTimers.push(setTimeout(pose(HAND_CARRY_CUP), at + SIP_MS));
          }
          drinkTimers.push(setTimeout(pose(0), DRINK_MS));
          console.log(`[${label}] ${characterName} drinks from ref=${ref} type=${item.typeCode}`);
        };
        // The double-click's walk is usually still under way: pour on arrival
        // if it ends beside the cooler.
        const walkEnd = walkQueue.length ? walkQueue[walkQueue.length - 1][0] : undefined;
        if (walkEnd !== undefined && besideCooler(walkEnd)) {
          const after = walkDone;
          walkDone = () => {
            after?.();
            drink();
          };
        } else if (walkEnd === undefined && besideCooler(currentTile)) {
          drink();
        } else {
          console.log(`[${label}] ${characterName} too far from cooler ref=${ref}`);
        }
      }

      if (FEE_TURNSTILES.has(item.typeCode)) {
        const owns = item.ownerId === live?.userId;
        const config = getRoomItemConfig(ref);
        const fee = turnstileFee(config);
        if (!use) {
          if (item.ownerId === null || (!owns && !may("kick"))) return;
          setTurnstile(item, item.state === TURNSTILE_OPEN ? TURNSTILE_SHUT : TURNSTILE_OPEN);
          return;
        }
        if (owns) {
          const credits = String(Number(config.credits) || 0);
          send(
            MSG.ITEM_CONFIGURATION,
            [{ int: ref }, { int: 2 }, { str: "fee" }, { str: String(fee) }, { str: "credits" }, { str: credits }],
            `ItemConfiguration ref=${ref} turnstile fee=${fee} credits=${credits}`,
          );
          return;
        }
        if (fee === 0) {
          admitThroughTurnstile(item, currentGeometryRoom, live?.userId);
          walkThroughTurnstile(getRoomItem(ref) ?? item);
          console.log(`[${label}] ${characterName} through free turnstile ref=${ref}`);
          return;
        }
        if (Date.now() - (lastPayPrompt.get(ref) ?? 0) < 2000) return;
        lastPayPrompt.set(ref, Date.now());
        send(
          MSG.CURRENT_ITEM_CONFIGURATION,
          [{ int: ref }, { int: 1 }, { str: "fee" }, { str: String(fee) }],
          `CurrentItemConfiguration ref=${ref} turnstile fee=${fee}`,
        );
        return;
      }

      // A settings dialog is the FALLBACK, not the first response.
      //
      // This block used to answer every `584` on a CONFIGURABLE item, and that
      // is what kept turnstiles dead even after their states were fixed: the
      // double-click was consumed by a dialog nobody ever saw instead of
      // turning the arm. An item that can visibly DO something does it; only
      // one with nothing to show asks to be configured.
      //
      // The cost is that a turnstile fee is currently unreachable. It was never
      // reachable in practice -- no dialog ever appeared -- so this trades a
      // setting nobody could set for a piece that works.
      const configKeys = CONFIGURABLE.get(item.typeCode);
      const owns = item.ownerId === live?.userId;
      if (use && configKeys && statesOf(item.typeCode, item.dir).length <= 1) {
        const config = getRoomItemConfig(ref);
        const pairs: OutgoingParam[] = [];
        for (const key of configKeys) {
          pairs.push({ str: key }, { str: config[key] ?? "0" });
        }
        send(
          MSG.ITEM_CONFIGURATION,
          [{ int: ref }, { int: configKeys.length }, ...pairs],
          `ItemConfiguration ref=${ref} type=${item.typeCode} ` +
            `{${configKeys.map((k) => `${k}=${config[k] ?? "0"}`).join(" ")}}`,
        );
        return;
      }

      // Using is open to the room; toggling is yours, or staff room-control.
      if (!use && !owns && !may("kick")) {
        console.log(`[${label}] refused toggle ref=${ref} (not owner, not staff)`);
        return;
      }

      // ⚠ The furnimap's state count is a LOWER BOUND, and reading it here is
      // what made the RNG, the scoreboard and the turnstiles feel dead: they
      // keep their states in `item.<code>.ani.xml`, so the furnimap reported 1
      // and they were refused below before anything happened. The two Haunted
      // Mansion candlesticks worked all along precisely because their on/off is
      // drawn as furnimap sprites, which is the comparison that found this.
      //
      // `statesOf` unions both sources and returns the ACTUAL state numbers, so
      // we step through the list rather than counting modulo it — the
      // scoreboard's states start at 1 and the RNG's skip 7-9 to reach 10.
      const states = statesOf(item.typeCode, item.dir);
      if (states.length <= 1) {
        // Not interactive. The client shows the state button on everything, so
        // this is an ordinary outcome rather than an error.
        console.log(
          `[${label}] ${use ? "use" : "toggle"} ref=${ref} type=${item.typeCode} — only one state`,
        );
        return;
      }

      // An item with a roll — one state far longer than its siblings, which it
      // plays through rather than settles in — is choosing a result, not
      // advancing a sequence. That is the RNG. Everything else steps on: the
      // scoreboard through its five light settings, the turnstile 0 <-> 1.
      const roll = rollStateOf(item.typeCode);
      const results = resultStatesOf(item.typeCode, item.dir);
      const picks = roll !== null && results.length > 2;
      const next = picks
        ? results[Math.floor(Math.random() * results.length)]
        : nextStateOf(item.typeCode, item.state, item.dir);

      // A picker SPINS before it lands. The RNG's state 10 plays its seven
      // results in order, so sending the result straight away throws the
      // animation away and the number simply snaps into place. Send the roll
      // first, then the result once the roll has had time to play.
      //
      // The result is chosen NOW rather than when the timer fires, so what the
      // player eventually sees is already decided and a disconnect mid-spin
      // cannot change it.
      if (picks) {
        const spin = rollDurationMs(item.typeCode);
        setRoomItemState(ref, roll);
        broadcastState(item, roll);
        console.log(
          `[${label}] used ref=${ref} type=${item.typeCode} rolling (state ${roll}, ${spin}ms) ` +
            `-> ${next} of [${results.join(",")}]`,
        );
        const room = currentRoomName;
        setTimeout(() => {
          // ⚠ Re-read. The spin is nearly half a second, and the item may have
          // been picked up, moved or rotated in that time — landing a stale
          // tile and facing in the broadcast would teleport it back.
          const still = getRoomItem(ref);
          if (!still || still.room !== room) return;
          setRoomItemState(ref, next);
          broadcastState(still, next);
        }, spin);
        return;
      }
      setRoomItemState(ref, next);

      broadcastState(item, next);
      console.log(
        `[${label}] ${use ? "used" : "toggled"} ref=${ref} type=${item.typeCode} ` +
          `state ${item.state} -> ${next} ${picks ? "picked from" : "of"} [${states.join(",")}]`,
      );
      return;
    }

    if (command === CMD.CONFIGURE_ITEM) {
      // `[int ref, int count, (str key, str value) × count]` — a settings
      // dialog's OK. No ok flag here (that is `811`); this IS the save.
      let at = 0;
      const ref = decodeToInt(body, at);
      at = ref.next;
      const count = decodeToInt(body, at);
      at = count.next;
      const patch: Record<string, string> = {};
      for (let i = 0; i < Math.min(count.value, CONFIG_PAIRS_MAX) && at < body.length; i++) {
        const key = readClientString(body, at);
        at = key.next;
        const value = readClientString(body, at);
        at = value.next;
        patch[key.value.slice(0, CONFIG_TEXT_MAX)] = value.value.slice(0, CONFIG_TEXT_MAX);
      }
      const item = getRoomItem(ref.value);
      if (!item || item.room !== currentRoomName) return;
      if (item.ownerId !== live?.userId && !may("kick")) {
        console.log(`[${label}] refused configure ref=${ref.value} (not owner, not staff)`);
        return;
      }
      if (FEE_TURNSTILES.has(item.typeCode)) {
        if (item.ownerId === null) return;
        if ("credits" in patch && live && item.ownerId === live.userId) {
          const takings = Number(getRoomItemConfig(ref.value).credits) || 0;
          setRoomItemConfig(ref.value, { credits: "0" });
          const balance = (getUserById(live.userId)?.credits ?? 0) + takings;
          setCredits(live.userId, balance, "Turnstile Takings");
          sendCredits();
          send(
            MSG.ITEM_CONFIGURATION_USED,
            [{ int: ref.value }, { int: 3 }, { int: 2 }, { str: "collected" }, { str: String(takings) }, { str: "credits" }, { str: "0" }],
            `ItemConfigurationUsed ref=${ref.value} status=3 collected=${takings}`,
          );
          console.log(`[${label}] collected ${takings} credits from turnstile ref=${ref.value}`);
        }
        if ("fee" in patch) {
          const fee = Number(patch.fee);
          if (TURNSTILE_FEES.includes(fee)) {
            setRoomItemConfig(ref.value, { fee: String(fee) });
            console.log(`[${label}] turnstile ref=${ref.value} fee=${fee}`);
          }
        }
        return;
      }
      if (PROXIMITY_ITEMS.has(item.typeCode)) {
        const config = proximityConfig(patch);
        const clean = Object.fromEntries(PROXIMITY_KEYS.map((k) => [k, String(config[k])]));
        setRoomItemConfig(ref.value, clean);
        // Redraw the zone from what was stored (clamped), not what was asked.
        send(
          MSG.CURRENT_ITEM_CONFIGURATION,
          [{ int: ref.value }, { int: PROXIMITY_KEYS.length }, ...PROXIMITY_KEYS.flatMap((k) => [{ str: k }, { str: clean[k] }])],
          `CurrentItemConfiguration ref=${ref.value} (saved)`,
        );
      } else {
        const clean = settableConfig(item.typeCode, patch);
        if (!clean) return;
        setRoomItemConfig(ref.value, clean);
      }
      console.log(
        `[${label}] configured ref=${ref.value} type=${item.typeCode} ` +
          `{${Object.entries(patch).map(([k, v]) => `${k}=${v}`).join(" ")}}`,
      );
      return;
    }

    if (command === CMD.USE_ITEM_CONFIGURATION) {
      // `[int ref, int ok, int count, (str key, str value) × count]`.
      let at = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, at);
        at = next;
        return value;
      };
      const ref = readInt();
      const ok = readInt();
      const count = readInt();
      const patch: Record<string, string> = {};
      for (let i = 0; i < Math.min(count, CONFIG_PAIRS_MAX) && at < body.length; i++) {
        const key = readClientString(body, at);
        at = key.next;
        const value = readClientString(body, at);
        at = value.next;
        patch[key.value.slice(0, CONFIG_TEXT_MAX)] = value.value.slice(0, CONFIG_TEXT_MAX);
      }

      const item = getRoomItem(ref);
      if (!item || item.room !== currentRoomName) return;
      if (FEE_TURNSTILES.has(item.typeCode)) {
        if (!live || !ok) return;
        const fee = turnstileFee(getRoomItemConfig(ref));
        if (Number(patch.fee) !== fee) {
          send(
            MSG.CURRENT_ITEM_CONFIGURATION,
            [{ int: ref }, { int: 1 }, { str: "fee" }, { str: String(fee) }],
            `CurrentItemConfiguration ref=${ref} turnstile fee changed to ${fee}`,
          );
          return;
        }
        if (item.ownerId !== live.userId && fee > 0) {
          const credits = getUserById(live.userId)?.credits ?? 0;
          if (credits < fee) {
            send(MSG.GENERIC_ERROR, [{ int: 4593 }], `GenericError 4593 (turnstile: ${credits} < ${fee})`);
            return;
          }
          setCredits(live.userId, credits - fee, "Turnstile Fee");
          const takings = (Number(getRoomItemConfig(ref).credits) || 0) + fee;
          setRoomItemConfig(ref, { credits: String(takings) });
          sendCredits();
        }
        send(MSG.ITEM_CONFIGURATION_USED, [{ int: ref }, { int: 2 }, { int: 0 }], `ItemConfigurationUsed ref=${ref} status=2`);
        admitThroughTurnstile(item, currentGeometryRoom, live?.userId);
        walkThroughTurnstile(getRoomItem(ref) ?? item);
        console.log(`[${label}] ${characterName} paid ${fee} at turnstile ref=${ref}`);
        return;
      }
      if (!(item.ownerId === live?.userId) && !may("kick")) {
        console.log(`[${label}] refused configure ref=${ref} (not owner, not staff)`);
        return;
      }
      if (!ok) {
        console.log(`[${label}] configure ref=${ref} cancelled`);
        return;
      }

      const clean = settableConfig(item.typeCode, patch);
      if (!clean) return;
      setRoomItemConfig(ref, clean);
      // Status 2 closes the dialog. 3 is the "collected N credits" path, which
      // needs the turnstile's takings modelled and is not implemented.
      send(
        MSG.ITEM_CONFIGURATION_USED,
        [{ int: ref }, { int: 2 }, { int: 0 }],
        `ItemConfigurationUsed ref=${ref} status=2`,
      );
      console.log(
        `[${label}] configured ref=${ref} type=${item.typeCode} ` +
          `{${Object.entries(patch).map(([k, v]) => `${k}=${v}`).join(" ")}}`,
      );
      return;
    }

    if (command === CMD.PLACE_ITEM) {
      // `[int invRef, int tileRef, int x, int y, int z]` from
      // `CInvPageItems._PlaceElementCbk`, at the end of a drag out of the
      // inventory grid. x/y/z are the position WITHIN the tile, which we do not
      // model — only the tile is stored, exactly as MOVE_ITEM does.
      //
      // ⚠ invRef is the inventory ROW id, not a type code. That is what
      // `ReceiveItemList` advertised as this row's ref, and it has to be,
      // because furniture stacks: four identical chairs are four rows and a
      // type-code ref could not tell them apart.
      let offset = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, offset);
        offset = next;
        return value;
      };
      const invRef = readInt();
      const tile = readInt();
      // Every refusal answers with the client's own "placement failed" dialog
      // (`MSG.FAILED_TO_PLACE`); silence left the dragged item just not appearing.
      const refusePlace = () =>
        send(MSG.FAILED_TO_PLACE, [{ int: invRef }, { int: 0 }], `FailedToPlace ${invRef} (0)`);

      if (!live || !currentRoomName) return;
      // You may furnish a room you own; staff hold room control everywhere,
      // the same test the move/rotate/pick-up path uses.
      const guest = currentGuestRoom();
      if (!(guest?.ownerId === live.userId) && !may("kick")) {
        console.log(`[${label}] refused place — ${currentRoomName} is not a room you own`);
        refusePlace();
        return;
      }

      // Look BEFORE consuming. Every reason to refuse has to be established
      // while the inventory row still exists — see peekOwnedItem.
      const candidate = peekOwnedItem(invRef, live.userId);
      if (!candidate || candidate.category !== ITEM_CATEGORY.items) {
        console.log(
          `[${label}] refused place invRef=${invRef} ` +
            `(${!candidate ? "not in your inventory" : `category ${candidate.category}, not furniture`})`,
        );
        refusePlace();
        return;
      }
      // ⚠ dir 1 here must match the dir used in placeRoomItem below — checking
      // the fit at one facing and storing another would pass a placement the
      // client then refuses.
      // Use a facing the item DEFINES, and the SAME one for the fit test and
      // the row written below. Two traps meet here: a facing with no sprite set
      // renders nothing while every stage reports success (1215 defines only 3
      // and 5, not 1), and testing the fit at one facing while storing another
      // passes a placement the client then refuses.
      // Prefer 3: that is the facing the client draws the placement ghost at
      // (`CRoomObjectPlacer.PlaceElement` sets DIR "3"). Storing 1 made every
      // item turn the moment it was dropped.
      const dirs = directionsFor(candidate.typeCode);
      const facing = dirs.includes(3) ? 3 : dirs.includes(1) ? 1 : (dirs[0] ?? 3);
      if (!fitsAt(currentGeometryRoom, tile, candidate.typeCode, facing)) {
        console.log(
          `[${label}] refused place invRef=${invRef} type=${candidate.typeCode} on tile ${tile} — ` +
            `footprint runs off the grid, the client would report "Failed to set item into a tile!"`,
        );
        refusePlace();
        return;
      }

      // Only now consume it. If the row is not there, or not yours, the
      // placement must not happen at all — otherwise a replayed or forged
      // message mints furniture from nothing.
      const owned = takeOwnedItem(invRef, live.userId);
      if (!owned) {
        refusePlace();
        return;
      }

      //⚠ dir 1, never 0 — see the /place command. Direction 0 has no sprite
      // set, so the item renders as nothing while every stage reports success.
      // A teleporter half keeps its pair as it moves into the room.
      const placed = asPlaced(
        placeRoomItem(currentRoomName, live.userId, owned.typeCode, tile, facing, 0, owned.pair),
      );
      const params = createElements([placed]);
      const audience = occupantsOf(currentRoomName);
      if (audience.length === 0) send(MSG.CREATE_ELEMENTS, params, undefined);
      else for (const occupant of audience) occupant.send(MSG.CREATE_ELEMENTS, params, undefined);

      // Refresh the grid rather than sending `2520 RemoveItemsFromList`.
      // Removal deletes the whole GROUP, and a group is now every copy of that
      // type — placing one of four chairs must leave three, not zero. Resending
      // is the only thing that gets the count badge right.
      // Now `2930` does it in place: it sets the count (0 drops the slot)
      // without a full resend.
      sendGroupCount(ITEM_CATEGORY.items, owned.typeCode, owned.pair?.id);
      console.log(
        `[${label}] placed inventory item ${owned.id} (type ${owned.typeCode}) ` +
          `on tile ${tile} in ${currentRoomName} -> ref ${placed.ref}`,
      );
      return;
    }

    if (command === CMD.CENTRAL_AD_CLICKED) {
      // VMK Central's posters. 0 is "click here for camera": open the shop on
      // VMK Central's Camera page (catalog.ts, EXTRA_SHOPS). 1 is the river
      // ad, which has no page to open yet.
      const which = body.length > 0 ? decodeToInt(body, 0).value : 0;
      if (which === 0) {
        send(
          MSG.OPEN_CATALOG_PAGE,
          [{ int: VMK_CENTRAL_SHOP }, { int: CAMERA_PAGE_ID }],
          `OpenCatalogPage VMK Central / Camera`,
        );
      } else {
        console.log(`[${label}] VMK Central ad ${which} clicked — nothing to open`);
      }
      return;
    }

    // ---- PIRATES LOBBY (pirates.ts): player-hosted games, 640-651 except 649.
    if (isPotcLobby(currentRoomCode) && command >= CMD.LOBBY_CREATE_GAME && command <= CMD.LOBBY_REQUEST_GAME_CONDITIONS) {
      const player = piratesPlayer();
      if (player && potcLobbyCommand(currentRoomCode!, player, command, body)) return;
    }
    // ---- PIRATES MATCH (pirates-match.ts / pirates-classic-match.ts): 602 stage loaded, 601 actions.
    if (isPotcLobby(currentRoomCode) && live && (command === CMD.GAME_ACTION || command === CMD.GAME_STAGE_LOADED)) {
      if (command === CMD.GAME_STAGE_LOADED) {
        potcStageLoaded(live.userId);
        return;
      }
      const ints: number[] = [];
      for (let at = 0; at < body.length; ) {
        const { value, next } = decodeToInt(body, at);
        if (next <= at) break;
        ints.push(value);
        at = next;
      }
      const [, action, ...data] = ints;
      if (action !== undefined) potcAction(live.userId, action, data);
      return;
    }

    // ---- HAUNTED MANSION (haunted-mansion.ts): lobby 640-651, match 601/602,
    // the Hall of Fame (661).
    if (currentRoomCode === HM_LOBBY_ROOM && live) {
      if (command >= CMD.LOBBY_CREATE_GAME && command <= CMD.LOBBY_REQUEST_GAME_CONDITIONS) {
        const player = hmPlayer();
        if (player && hmLobbyCommand(player, command, body)) return;
      }
      if (command === CMD.GAME_STAGE_LOADED) {
        hmStageLoaded(live.userId);
        return;
      }
      if (command === CMD.GAME_ACTION || command === CMD.GET_HIGH_SCORES_HM) {
        const ints: number[] = [];
        for (let at = 0; at < body.length; ) {
          const { value, next } = decodeToInt(body, at);
          if (next <= at) break;
          ints.push(value);
          at = next;
        }
        if (command === CMD.GET_HIGH_SCORES_HM) {
          const indexType = ints[1] ?? 0;
          send(MSG.HIGH_SCORES_HM, hmHighScores(indexType), `HighScoresHM index ${indexType}`);
          return;
        }
        // Keep the count: a checksum report is action 3 with count 1, HM's
        // "face" is action 3 with count 2.
        const [count, action, ...data] = ints;
        if (count !== undefined && action !== undefined) hmAction(live.userId, count, action, data);
        return;
      }
    }

    // ---- JUNGLE CRUISE (jungle-cruise.ts): the Dock's sign-up, the game, scores.
    if (
      command === CMD.LOBBY_SET_READY_TO_PLAY ||
      command === CMD.GAME_ACTION ||
      command === CMD.GAME_STAGE_LOADED ||
      command === CMD.GET_HIGH_SCORES
    ) {
      const ints: number[] = [];
      for (let at = 0; at < body.length; ) {
        const { value, next } = decodeToInt(body, at);
        if (next <= at) break;
        ints.push(value);
        at = next;
      }
      if (currentRoomCode === FW_LOBBY_ROOM && live) {
        if (command === CMD.LOBBY_SET_READY_TO_PLAY) {
          const player = fireworksPlayer();
          if (player) fwSetReady(player, ints[0] === 1);
          return;
        }
        if (command === CMD.GAME_STAGE_LOADED) {
          fwStageLoaded(live.userId);
          return;
        }
        if (command === CMD.GAME_ACTION) {
          const [, action, ...data] = ints;
          if (action !== undefined && fwAction(live.userId, action, data)) enterRoom(FW_LOBBY_ROOM);
          return;
        }
      }
      switch (command) {
        case CMD.LOBBY_SET_READY_TO_PLAY: {
          // START GAME on the Dock's instructions window: off you go.
          if (ints[0] !== 1 || currentRoomCode !== JC_DOCK_ROOM) return;
          send(MSG.LOBBY_READY_TO_PLAY, [{ int: 1 }], "LobbyReadyToPlay 1");
          launchDockBoat();
          console.log(`[${label}] Jungle Cruise: casting off from the Dock`);
          enterRoom(JC_GAME_ROOM);
          return;
        }
        case CMD.GAME_STAGE_LOADED:
          jcGame?.stageLoaded();
          return;
        case CMD.GAME_ACTION: {
          // `[count, action, data...]`, count = data + 1.
          const [, action, ...data] = ints;
          if (!jcGame || action === undefined) return;
          if (action === 8) {
            // QUIT (the exit button's OK): settles like a game end — score and
            // reward — then back to the Dock.
            console.log(`[${label}] Jungle Cruise: quit`);
            jcGame.quit();
            takeExit({ tiles: [], label: "quit the Jungle Cruise", to: JC_DOCK_ROOM });
            return;
          }
          if (action === 6 && jcGame.isOver) {
            // Sent opening the album and again closing it (CAlbumWindow).
            if (jcGame.albumClosed()) takeExit({ tiles: [], label: "leave the Jungle Cruise", to: JC_DOCK_ROOM });
            return;
          }
          jcGame.action(action, data);
          return;
        }
        case CMD.GET_HIGH_SCORES: {
          const game = ints[0] ?? JC_GAME_CODE;
          const { myRank, rows } = live ? todaysHighScores(game, live.userId) : { myRank: 0, rows: [] };
          send(
            MSG.HIGH_SCORES,
            [{ int: myRank }, { int: rows.length }, ...rows.flatMap((r) => [{ int: r.rank }, { int: r.score }, { str: wireText(r.name) }])],
            `HighScores game ${game}: ${rows.length} row(s), mine #${myRank}`,
          );
          return;
        }
      }
      return;
    }

    // ---- MUSIC MIXERS (music-mixer.ts). The mixing rooms (1103/1107) and the
    // stages (42/15) share GetSongs; which mixer is the room's.
    if (command >= CMD.CLOSE_MIXER && command <= CMD.CANCEL_PLAY) {
      if (!live) return;
      const me = live.userId;
      const variant = mixerVariantOf(currentRoomCode);
      let at = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, at);
        at = next;
        return value;
      };
      // ⚠ Client strings are LENGTH-PREFIXED (`readClientString`), not
      // \x02-terminated like the server's: `decodeString` swallowed the song
      // data AND the name tokens behind it, so every save was "malformed".
      const readStr = () => {
        const { value, next } = readClientString(body, at);
        at = next;
        return value;
      };
      const readName = () => tokensToPlainText(decodeChat(readInt, readStr, () => at < body.length)).trim().slice(0, 40);
      const songList = (): OutgoingParam[] => {
        const songs = variant ? getSongs(me, variant) : [];
        return [{ int: songs.length }, ...songs.flatMap((s) => [{ int: s.id }, { str: wireText(s.name) }])];
      };
      if (command === CMD.CLOSE_MIXER) {
        const back = mixerReturn ?? { code: currentRoomCode === MONORAIL_MIXER_ROOM ? MONORAIL_TRAIN : STREET_MIXER_LOBBY };
        mixerReturn = null;
        console.log(`[${label}] closed the ${variant ?? "?"} mixer -> ${back.code}`);
        takeExit({
          tiles: [],
          label: "leave the music mixer",
          to: back.code,
          train: back.train,
          arrive: back.code === MONORAIL_TRAIN ? TRAIN_MIXER_ARRIVE : undefined,
        });
        return;
      }
      if (!variant) return;
      switch (command) {
        case CMD.GET_SONGS: {
          const list = songList();
          send(MSG.SONG_LIST, list, `SongList ${variant} (${(list[0] as { int: number }).int})`);
          return;
        }
        case CMD.LOAD_SONG: {
          const song = getSong(me, variant, readInt());
          if (song) send(MSG.SONG_DATA, [{ str: song.data }], `SongData "${song.name}"`);
          return;
        }
        case CMD.CREATE_SONG:
        case CMD.SAVE_SONG: {
          const position = command === CMD.SAVE_SONG ? readInt() : -1;
          const data = normaliseSongData(readStr());
          const name = readName();
          if (data === undefined) {
            console.log(`[${label}] ${variant} song refused: malformed data`);
            return;
          }
          if (command === CMD.CREATE_SONG) {
            if (!name) {
              send(MSG.INVALID_SONG_NAME, [], "InvalidSongName");
              return;
            }
            const slot = createSong(me, variant, name, data);
            send(MSG.CREATE_SONG_RESULT, [{ int: slot === undefined ? 1 : 0 }, { int: slot ?? 0 }, ...songList()], `CreateSongResult ${slot ?? "full"}`);
            if (slot === undefined) return;
            console.log(`[${label}] created ${variant} song ${slot} "${name}" (${songSlots(data)} slots)`);
          } else {
            const ok = saveSong(me, variant, position, name, data);
            send(MSG.SAVE_SONG_RESULT, [{ int: ok ? 0 : 1 }, ...songList()], `SaveSongResult ${ok ? "ok" : "no such song"}`);
            if (!ok) return;
            console.log(`[${label}] saved ${variant} song ${position} (${songSlots(data)} slots)`);
          }
          const reward = claimSaveReward(me, variant);
          if (reward) payMixerReward(reward, "save", variant);
          return;
        }
        case CMD.RENAME_SONG: {
          const id = readInt();
          const name = readName();
          if (!name) {
            send(MSG.INVALID_SONG_NAME, [], "InvalidSongName");
            return;
          }
          const ok = renameSong(me, variant, id, name);
          send(MSG.SAVE_SONG_RESULT, [{ int: ok ? 0 : 1 }, ...songList()], `SaveSongResult (rename ${id} "${name}")`);
          return;
        }
        case CMD.DELETE_SONG: {
          const id = readInt();
          const ok = deleteSong(me, variant, id);
          send(MSG.DELETE_SONG_RESULT, [{ int: ok ? 0 : 1 }, ...songList()], `DeleteSongResult ${id}`);
          return;
        }
        case CMD.PLAY_SONG: {
          if (!performance || performance.playing || performance.room !== currentRoomName) return;
          const song = getSong(me, variant, readInt());
          if (!song) {
            send(MSG.INVALID_SONG_NAME, [], "PlaySongNotFound");
            return;
          }
          performSong(song.data, song.name);
          return;
        }
        case CMD.CANCEL_PLAY: {
          if (performance && !performance.playing) endPerformance("cancelled");
          return;
        }
      }
      return;
    }

    // ---- PHOTOS: the game-side messages. Pictures travel on the photo socket
    // (photo-server.ts); these move photos between catalog, album and walls.
    if (
      command === CMD.QUERY_FILM_COUNTER ||
      command === CMD.REQUEST_PHOTO_CATALOG_INDEX ||
      command === CMD.PUBLISH_PHOTO ||
      command === CMD.DELETE_PHOTO ||
      command === CMD.PLACE_PHOTO_ON_WALL ||
      command === CMD.REMOVE_PHOTO_FROM_WALL ||
      command === CMD.EDIT_CAPTION ||
      command === CMD.REQUEST_PHOTO_ID_OF_POSTER ||
      command === CMD.TEST_ALBUM_STATUS ||
      command === CMD.HIDDEN_MICKEY_CHECK
    ) {
      if (!live) return;
      const me = live.userId;
      let at = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, at);
        at = next;
        return value;
      };
      const readStr = () => {
        const { value, next } = decodeString(body, at);
        at = next;
        return value;
      };
      const sendIndex = () => {
        const ids = getPhotos(me, "catalog").filter((p) => p.width > 0).map((p) => p.id);
        send(MSG.PHOTO_CATALOG_INDEX, [{ int: ids.length }, ...ids.map((id) => ({ int: id }))], `PhotoCatalogIndex ${ids.length}`);
      };
      const sendAlbumStatus = () => {
        const pics = countPhotos(me, "album");
        send(MSG.PHOTO_ALBUM_STATUS, [{ int: pics }, { int: PHOTO_ALBUM_CAPACITY }], `PhotoAlbumStatus ${pics}/${PHOTO_ALBUM_CAPACITY}`);
      };

      switch (command) {
        case CMD.QUERY_FILM_COUNTER: {
          const film = getCamera(me).film;
          send(MSG.FILM_COUNTER, [{ int: film }], `FilmCounter ${film}`);
          return;
        }
        case CMD.REQUEST_PHOTO_CATALOG_INDEX:
          sendIndex();
          return;
        case CMD.TEST_ALBUM_STATUS:
          sendAlbumStatus();
          return;
        case CMD.HIDDEN_MICKEY_CHECK: {
          // `[reqId, left, top]`: a Hidden Mickey sprite was in the viewfinder.
          // The client holds the upload until `2770 [reqId, found]`, and only
          // uploads when found = 0. Hidden Mickeys are not implemented, so
          // nothing is ever newly found and the photo is saved as usual.
          const reqId = readInt();
          send(MSG.HIDDEN_MICKEY_IN_PICTURE, [{ int: reqId }, { int: 0 }], `HiddenMickeyInPicture ${reqId} 0`);
          return;
        }
        case CMD.PUBLISH_PHOTO: {
          const action = readInt();
          const id = readInt();
          const photo = getPhoto(id);
          const fail = (code: number, why: string) => {
            console.log(`[${label}] publish photo ${id} refused: ${why}`);
            send(MSG.PUBLISH_PHOTO_RESPONSE, [{ int: action }, { int: id }, { int: code }], `PublishPhotoResponse ${code}`);
          };
          if (!photo || photo.ownerId !== me) return fail(1, "not yours");
          if (action === 1) {
            if (photo.place !== "catalog") return fail(1, `in ${photo.place}`);
            if (countPhotos(me, "album") >= PHOTO_ALBUM_CAPACITY) return fail(2, "album full");
            movePhoto(id, "album");
          } else {
            if (photo.place !== "album") return fail(1, `in ${photo.place}`);
            movePhoto(id, "catalog");
          }
          send(MSG.PUBLISH_PHOTO_RESPONSE, [{ int: action }, { int: id }, { int: 0 }], `PublishPhotoResponse ok`);
          sendAlbumStatus();
          console.log(`[${label}] photo ${id} -> ${action === 1 ? "album" : "catalog"}`);
          return;
        }
        case CMD.DELETE_PHOTO: {
          const id = readInt();
          const photo = getPhoto(id);
          // ⚠ `width === 0` is an unfinished upload (a thumbnail, no picture,
          // no film spent). Paying for those was a free-credits loop.
          if (!photo || photo.ownerId !== me || photo.place === "wall" || photo.width === 0) return;
          deletePhoto(id);
          // "You will get 5 credits for every photo" — paid when one is deleted.
          const credits = (getUserById(me)?.credits ?? 0) + PHOTO_DELETE_CREDITS;
          setCredits(me, credits, "Photo Deleted");
          sendCredits();
          console.log(`[${label}] deleted photo ${id} (+${PHOTO_DELETE_CREDITS} credits)`);
          return;
        }
        case CMD.EDIT_CAPTION: {
          const id = readInt();
          const photo = getPhoto(id);
          if (!photo || photo.ownerId !== me) return;
          const caption = tokensToPlainText(decodeChat(readInt, readStr, () => at < body.length)).slice(0, 90);
          setPhotoCaption(id, caption);
          console.log(`[${label}] photo ${id} caption "${caption}"`);
          return;
        }
        case CMD.PLACE_PHOTO_ON_WALL: {
          const id = readInt();
          const wall = readInt();
          const x = readInt();
          const y = readInt();
          const z = readInt();
          const photo = getPhoto(id);
          const guest = currentGuestRoom();
          if (!photo || photo.ownerId !== me || photo.place !== "catalog" || !currentRoomName) return;
          if (!(guest?.ownerId === me) && !may("kick")) {
            console.log(`[${label}] refused photo on wall — ${currentRoomName} is not your room`);
            return;
          }
          const poster = placeRoomPoster(currentRoomName, me, PHOTO_POSTER_TYPE, wall, x, y, z);
          movePhoto(id, "wall", poster.ref);
          const params = createElements([posterAsPlaced(poster)]);
          for (const occupant of occupantsOf(currentRoomName)) occupant.send(MSG.CREATE_ELEMENTS, params, undefined);
          send(MSG.PHOTO_PLACED_ON_WALL, [{ int: id }], `PhotoPlacedOnWall ${id}`);
          console.log(`[${label}] hung photo ${id} on wall ${wall} -> ref ${poster.ref}`);
          return;
        }
        case CMD.REMOVE_PHOTO_FROM_WALL: {
          const ref = readInt();
          const poster = getRoomPoster(ref);
          const photo = getPhotoOnWall(ref);
          if (!poster || poster.room !== currentRoomName) return;
          if (poster.ownerId !== me && !may("kick") && currentGuestRoom()?.ownerId !== me) return;
          removeRoomItem(ref);
          for (const occupant of occupantsOf(currentRoomName!)) occupant.send(MSG.REMOVE_POSTER, [{ int: ref }], undefined);
          if (photo) {
            movePhoto(photo.id, "catalog");
            // Back to its OWNER's catalog, wherever they are.
            liveByUser.get(photo.ownerId)?.send(
              MSG.PHOTO_REMOVED_FROM_WALL,
              [{ int: ref }, { int: photo.id }],
              `PhotoRemovedFromWall ${ref} ${photo.id}`,
            );
          }
          console.log(`[${label}] took down photo ${photo?.id ?? "?"} (ref ${ref})`);
          return;
        }
        case CMD.REQUEST_PHOTO_ID_OF_POSTER: {
          const ref = readInt();
          const photo = getPhotoOnWall(ref);
          if (!photo) return;
          send(MSG.PHOTO_ID_OF_POSTER, [{ int: ref }, { int: photo.id }], `PhotoIdOfPoster ${ref} ${photo.id}`);
          return;
        }
      }
      return;
    }

    if (command === CMD.CHANGE_ITEM_PROPERTIES) {
      // `[int ref, int state]`: the "Let guests move this item" checkbox in the
      // item-info window (`CInvItemDetails`), shown only to the item's owner.
      // Everyone in the room gets the new GUESTMOVE through `_UpdateElement`,
      // which is what hands visitors the move panel (or takes it back).
      let at = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, at);
        at = next;
        return value;
      };
      const ref = readInt();
      const on = readInt() !== 0;
      if (!live || !currentRoomName) return;
      const poster = getRoomPoster(ref);
      const item = poster ? undefined : getRoomItem(ref);
      const target = poster ?? item;
      if (!target || target.room !== currentRoomName || (target.ownerId !== live.userId && !may("kick"))) {
        console.log(`[${label}] refused guest-move change ref=${ref} (${!target ? "unknown ref" : "not owner and not staff"})`);
        return;
      }
      setRoomItemGuestMove(ref, on);
      if (poster) {
        const params: OutgoingParam[] = [
          { int: ref },
          { int: ITEM_CATEGORY_POSTER },
          { int: poster.wall },
          { int: on ? 1 : 0 },
          { int: 3 },
          { int: poster.x },
          { int: poster.y },
          { int: poster.z },
        ];
        for (const occupant of occupantsOf(currentRoomName)) occupant.send(MSG.UPDATE_ELEMENT, params, undefined);
      } else if (item) {
        broadcastState({ ...item, guestMove: on }, item.state);
      }
      console.log(`[${label}] guests ${on ? "may" : "may not"} move ref=${ref}`);
      return;
    }

    if (command === CMD.PLACE_POSTER || command === CMD.MOVE_POSTER) {
      // Both carry `[int ref, int wallRef, int x, int y, int z]`; for PLACE the
      // ref is the inventory ROW (what `ReceiveItemList` advertised), for MOVE
      // the placed poster's ref. The client's `PlaneInside` already refused a
      // position off the wall, and a failed drag re-sends the ORIGINAL spot,
      // so the numbers are taken as given.
      let offset = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, offset);
        offset = next;
        return value;
      };
      const ref = readInt();
      const wall = readInt();
      const x = readInt();
      const y = readInt();
      const z = readInt();
      if (!live || !currentRoomName) return;

      if (command === CMD.PLACE_POSTER) {
        // Posters are guest-room decor: `CInvPagePosters` greys PLACE in a
        // public room, and the same ownership rule as furniture applies.
        const guest = currentGuestRoom();
        if (!(guest?.ownerId === live.userId) && !may("kick")) {
          console.log(`[${label}] refused poster — ${currentRoomName} is not a room you own`);
          return;
        }
        const candidate = peekOwnedItem(ref, live.userId);
        if (!candidate || candidate.category !== ITEM_CATEGORY.posters) {
          console.log(
            `[${label}] refused poster invRef=${ref} ` +
              `(${!candidate ? "not in your inventory" : `category ${candidate.category}, not a poster`})`,
          );
          return;
        }
        const owned = takeOwnedItem(ref, live.userId);
        if (!owned) return;
        const poster = placeRoomPoster(currentRoomName, live.userId, owned.typeCode, wall, x, y, z);
        const params = createElements([posterAsPlaced(poster)]);
        for (const occupant of occupantsOf(currentRoomName)) occupant.send(MSG.CREATE_ELEMENTS, params, undefined);
        sendGroupCount(ITEM_CATEGORY.posters, owned.typeCode);
        console.log(
          `[${label}] hung poster ${owned.id} (type ${owned.typeCode}) on wall ${wall} ` +
            `at ${x},${y},${z} in ${currentRoomName} -> ref ${poster.ref}`,
        );
        return;
      }

      const poster = getRoomPoster(ref);
      // Owner, staff, or any visitor when the owner ticked "Let guests move".
      if (
        !poster ||
        poster.room !== currentRoomName ||
        (poster.ownerId !== live.userId && !may("kick") && !poster.guestMove)
      ) {
        console.log(`[${label}] refused poster move ref=${ref} (${!poster ? "unknown ref" : "not owner and not staff"})`);
        return;
      }
      moveRoomPoster(ref, wall, x, y, z);
      // `_UpdateElement` category 3: paramCount is read but the three ints
      // follow regardless.
      const params: OutgoingParam[] = [
        { int: ref },
        { int: ITEM_CATEGORY_POSTER },
        { int: wall },
        { int: poster.guestMove ? 1 : 0 },
        { int: 3 },
        { int: x },
        { int: y },
        { int: z },
      ];
      for (const occupant of occupantsOf(currentRoomName)) occupant.send(MSG.UPDATE_ELEMENT, params, undefined);
      console.log(`[${label}] moved poster ref=${ref} -> wall ${wall} at ${x},${y},${z}`);
      return;
    }

    if (command === CMD.PICK_ITEM || command === CMD.ROTATE_ITEM) {
      // Posters share the ref space with furniture; take them down here.
      const ref = decodeToInt(body, 0).value;
      const poster = getRoomPoster(ref);
      if (poster) {
        if (poster.room !== currentRoomName || (poster.ownerId !== live?.userId && !may("kick"))) {
          console.log(`[${label}] refused poster edit ref=${ref} (not owner and not staff)`);
          return;
        }
        // A poster has one facing — its wall — so rotate is meaningless.
        if (command === CMD.ROTATE_ITEM) return;
        // A hung PHOTO goes back to its owner's photo catalog, never into the
        // poster inventory (the client uses 765 for these; this covers a 521).
        const photo = poster.typeCode === PHOTO_POSTER_TYPE ? getPhotoOnWall(ref) : undefined;
        if (poster.typeCode === PHOTO_POSTER_TYPE) {
          removeRoomItem(ref);
          for (const occupant of occupantsOf(currentRoomName!)) occupant.send(MSG.REMOVE_POSTER, [{ int: ref }], undefined);
          if (photo) {
            movePhoto(photo.id, "catalog");
            liveByUser.get(photo.ownerId)?.send(MSG.PHOTO_REMOVED_FROM_WALL, [{ int: ref }, { int: photo.id }], undefined);
          }
          return;
        }
        removeRoomItem(ref);
        if (poster.ownerId !== null) addItems(poster.ownerId, [poster.typeCode], ITEM_CATEGORY.posters);
        for (const occupant of occupantsOf(currentRoomName!)) {
          occupant.send(MSG.REMOVE_POSTER, [{ int: ref }], undefined);
        }
        if (poster.ownerId !== null) liveByUser.get(poster.ownerId)?.refreshInventory();
        console.log(`[${label}] took down poster ref=${ref} type=${poster.typeCode}`);
        return;
      }
    }

    if (
      command === CMD.MOVE_ITEM ||
      command === CMD.ROTATE_ITEM ||
      command === CMD.PICK_ITEM
    ) {
      // All three identify the item the same way: a ref, first.
      let offset = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, offset);
        offset = next;
        return value;
      };
      const ref = readInt();
      const item = getRoomItem(ref);

      // An item is editable by its owner, or by staff (who hold room control
      // everywhere). Refusing silently is fine here: the client has already
      // moved the sprite locally, and the next room entry redraws from the
      // table, so a rejected edit corrects itself.
      // "Let guests move this item" extends MOVE and ROTATE to every visitor,
      // never TAKE AWAY: the guest panel deactivates that button
      // (`CRoomElementControl.select`), and a forged 521 must fail the same way.
      const mayEdit =
        item !== undefined &&
        item.room === currentRoomName &&
        (item.ownerId === live?.userId || may("kick") || (item.guestMove === true && command !== CMD.PICK_ITEM));
      if (!item || !mayEdit) {
        console.log(
          `[${label}] refused item edit ref=${ref} ` +
            `(${!item ? "unknown ref" : "not owner and not staff"})`,
        );
        return;
      }

      if (command === CMD.PICK_ITEM) {
        removeRoomItem(ref);
        // ⚠ "Take away" MOVES the item, it does not destroy it. Deleting the
        // room row without crediting the inventory loses the item outright,
        // which is what made picked-up furniture vanish for good.
        //
        // It returns to the ITEM's owner, not whoever picked it up — staff hold
        // room control everywhere (see `mayEdit`), so tidying someone's room
        // must not transfer their furniture to the person tidying.
        //
        // ⚠ ownerId is nullable, and that is a real case rather than a defect:
        // scenery the server placed belongs to nobody. Such an item simply
        // ceases to exist when taken away — there is no inventory to credit,
        // and inventing one would hand players room decor they never bought.
        if (item.ownerId !== null) {
          // A teleporter half goes back still paired — pairs are never re-linked.
          if (item.pair) addPairedItem(item.ownerId, item.typeCode, ITEM_CATEGORY.items, item.pair);
          else addItems(item.ownerId, [item.typeCode], ITEM_CATEGORY.items);
        }
        console.log(
          `[${label}] picked up item ref=${ref} type=${item.typeCode} ` +
            `-> ${item.ownerId === null ? "discarded (unowned scenery)" : `inventory of user ${item.ownerId}`}`,
        );
        for (const occupant of occupantsOf(currentRoomName)) {
          occupant.send(MSG.REMOVE_ELEMENT, [{ int: ref }], undefined);
        }
        // ⚠ Resend the grid. The client does NOT re-request it on open — that
        // assumption is why the row was written and the item still never
        // appeared. There is no "add item" message either, so a full resend is
        // the only way (see `sendItemList`).
        // The OWNER's grid, wherever they are — picking up a visitor's piece
        // must show up in the visitor's inventory, not only in yours.
        if (item.ownerId !== null) liveByUser.get(item.ownerId)?.refreshInventory();
        return;
      }

      let tile = item.tile;
      let dir = item.dir;
      if (command === CMD.MOVE_ITEM) {
        // [ref, tileRef, x, y, z] — the x/y/z are the offset WITHIN the tile,
        // which we do not model, so only the tile is stored.
        tile = readInt();
      } else {
        // Rotate carries no angle: the client asks, the server decides. Sprites
        // exist only for 1/3/5/7, so step through those four.
        // Only step through facings the item DEFINES -- 1215 has 3 and 5
        // alone, and rotating it to 7 made it vanish.
        const defined = directionsFor(item.typeCode);
        const DIRS = [1, 3, 5, 7].filter((d) => defined.length === 0 || defined.includes(d));
        if (DIRS.length === 0) DIRS.push(dir);
        dir = DIRS[(Math.max(0, DIRS.indexOf(dir)) + 1) % DIRS.length];
      }
      moveRoomItem(ref, tile, dir);
      console.log(
        `[${label}] ${command === CMD.MOVE_ITEM ? "moved" : "rotated"} ` +
          `item ref=${ref} -> tile ${tile} dir ${dir}`,
      );
      // Rotating must carry the STATE with it, and paramCount 1 does not.
      //
      // `_UpdateElement` only reaches `setState` inside `if t_iParamCnt > 1`,
      // so a rotate told the client its new facing and NOTHING about its state.
      // The animated layer was then rebuilt at the new dir from whatever the
      // client still held, which is why a turned scoreboard came back wrong.
      //
      // The state is KEPT even when the new facing cannot draw it. An ANI names
      // the facings each state has art for and they are usually a subset -- the
      // scoreboard animates at dirs 3 and 5 only -- so at dir 1 or 7 its lights
      // simply do not render. Resetting to 0 there looks tidier for exactly one
      // rotation and then loses the setting for good: turning the item full
      // circle used to come back dark. Keeping it means the lights return the
      // moment it faces a direction that can show them.
      //
      // Cycling is still refused at those facings -- `statesOf` is facing-aware,
      // reports a single state there, and the 584 handler declines it -- so the
      // state can be remembered without becoming editable while invisible.
      broadcastState({ ...item, tile, dir }, item.state);
      const audience = occupantsOf(currentRoomName);

      // Anyone sitting on it turns with it. `2599` moves the FURNITURE only —
      // the avatar keeps whatever facing its last pulse gave it, so a rotated
      // chair would otherwise leave its occupant facing the old way.
      for (const seated of audience) {
        if (seated.tile !== tile) continue;
        seated.facing = dir;
        const pulse: OutgoingParam[] = [
          { int: 1 },
          { int: seated.userId },
          { int: tile },
          { int: 1 }, // stack: still on top of the chair
          ...avatarActions({
            headDir: dir,
            bodyDir: dir,
            legs: LEGS_SIT,
          }).map((v) => ({ int: v })),
        ];
        for (const occupant of audienceOf(currentRoomName, seated.userId)) occupant.send(MSG.STATUS_PULSE, pulse, undefined);
        console.log(`[${label}] turned seated avatar ${seated.userId} to face ${dir}`);
      }
      return;
    }

    if (command === CMD.CHANGE_SLOGAN) {
      // ⚠ Unlike inbound chat (560/561), this body DOES start with a token
      // count: `SetUpMySlogan` calls `TransformCannedToMsg` without
      // `a_bNoPhraseLength`. Read and discard it, then decode to the end.
      let offset = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, offset);
        offset = next;
        return value;
      };
      const readStr = () => {
        const { value, next } = readClientString(body, offset);
        offset = next;
        return value;
      };
      if (body.length > 0) readInt(); // the count
      const tokens = clampSlogan(decodeChat(readInt, readStr, () => offset < body.length));
      // ⚠ `tokensToText` is for LOGS ONLY — it renders an unresolvable index as
      // the literal `<word:8436>`. Storing that put debug syntax on a player's
      // profile. The user-facing string drops what it cannot resolve instead.
      const text = tokensToPlainText(tokens);
      if (live) setSlogan(live.userId, JSON.stringify(tokens), text);
      console.log(
        `[${label}] slogan set to "${tokensToText(tokens)}" ` +
          `(${tokens.length} token${tokens.length === 1 ? "" : "s"}) for "${characterName}"`,
      );

      // 0 = the player changed it themselves; non-zero would claim staff did.
      send(MSG.SLOGAN_CHANGED, [{ int: 0 }], "SloganChanged (by the player)");

      // Push it to the room so the profile DESC updates without re-entering.
      // Replayed from the TOKENS, so dictionary words survive intact.
      const ref = live ? live.userId : 1;
      const params: OutgoingParam[] = [
        { int: ref },
        ...reEmit(tokens, { censorUnknown: CHAT_CENSOR && !isStaff(), ownName: characterName }),
      ];
      const audience = audienceOf(currentRoomName, me?.userId ?? -1);
      if (audience.length === 0) send(MSG.AVATAR_SLOGAN, params, "AvatarSlogan (not in a room)");
      else for (const occupant of audience) occupant.send(MSG.AVATAR_SLOGAN, params, undefined);
      if (me) {
        me.slogan = text;
        me.sloganTokens = tokens;
      }
      return;
    }

    if (command === CMD.CALL_FOR_HELP) {
      // `[int category, int count, tokens…, str harasserName]` — the canned
      // block here DOES carry its count (`TransformCannedToMsg` called without
      // `a_bNoPhraseLength`), and the harasser's name follows it, so the count
      // is what stops the token reader from swallowing the name.
      if (!live) return;
      let offset = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, offset);
        offset = next;
        return value;
      };
      const readStr = () => {
        const { value, next } = readClientString(body, offset);
        offset = next;
        return value;
      };
      const category = readInt();
      const count = Math.max(0, Math.min(512, readInt()));
      let taken = 0;
      const tokens = decodeChat(readInt, readStr, () => taken++ < count && offset < body.length);
      const reported = offset < body.length ? readStr().trim() : "";
      const message = tokensToLog(tokens);
      if (activeSanction(live.userId, "cfh")) {
        console.log(`[${label}] call for help dropped: user is banned from calling`);
      } else {
        const id = createCall({
          reporterId: live.userId,
          category,
          message,
          reported,
          reportedId: reported ? getMessengerUserByName(reported)?.id : undefined,
          room: currentRoomName,
          roomName: roomTitle(),
        });
        console.log(`[${label}] call for help #${id} (category ${category}) "${message}" about "${reported}"`);
      }
      // Acknowledged either way: a refusal would tell a CFH-banned player that
      // staff are ignoring them, which only invites them to try another way.
      send(MSG.HELP_RECEIVED_OK, [], "HelpReceivedOK");
      return;
    }

    if (command === CMD.ROOM_SAY || command === CMD.ROOM_CANNED_SAY) {
      // Chat arrives as dictionary TOKENS, not text — see chat-tokens.ts.
      // 560 is the chat bar (`CMessageBar.SendMessage`) and 561 the canned
      // composer (`CInvTrade.SendMessage`); both use the same token body.
      //
      // ⚠ 585 `chat` is deliberately NOT handled here. The room registers the
      // command but nothing in any loaded cast sends it, and the one 585 we
      // have seen had a 2-byte body — far too short for a message. Guessing at
      // its format would corrupt whatever it really is; it stays logged as
      // unhandled, with its bytes, until something proves what it carries.
      let offset = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, offset);
        offset = next;
        return value;
      };
      const readStr = () => {
        const { value, next } = readClientString(body, offset);
        offset = next;
        return value;
      };

      // Re-broadcast to the whole room, so held to a client field's size: the
      // chat bar sets no explicit limit in its Lingo, and 255 is the longest
      // canned field the client has (messenger compose).
      const tokens = clampCanned(decodeChat(readInt, readStr, () => offset < body.length), IM_MAX_CHARS);
      if (tokens.length === 0) return;

      // Staff commands, before anything is broadcast — a command must never
      // reach the room, even a malformed one.
      if (handleStaffCommand(tokens)) {
        logLine("command", tokensToLog(tokens));
        return;
      }

      // Muted from Housekeeping: the line is logged (staff can see what they
      // tried to say) but reaches nobody. Told to the sender only, so the mute
      // is obvious to them and invisible to the room.
      const mute = live ? activeSanction(live.userId, "mute") : undefined;
      if (mute) {
        logLine("chat", `[muted] ${tokensToLog(tokens)}`);
        const until = mute.expiresAt ? ` until ${new Date(mute.expiresAt).toUTCString()}` : "";
        send(
          MSG.ADMIN_MESSAGE,
          [{ str: wireText(`You have been muted by VMK Staff${until}.${mute.reason ? `\r${mute.reason}` : ""}`) }, { int: 3 }],
          "AdminMessage (muted)",
        );
        return;
      }

      // The trade window's chat (`CInvTrade.SendMessage`) uses 561 too; while a
      // trade is open that is where it goes, as `2562 _TradeChat` to both.
      const openTrade = live ? tradeOf.get(live.userId) : undefined;
      if (openTrade && command === CMD.ROOM_CANNED_SAY) {
        const line: OutgoingParam[] = [
          { int: live!.userId },
          ...reEmit(tokens, { censorUnknown: CHAT_CENSOR && !isStaff(), ownName: characterName }),
        ];
        for (const userId of openTrade.users) liveByUser.get(userId)?.send(MSG.TRADE_CHAT, line, "TradeChat");
        logLine("trade", tokensToLog(tokens), tradePartner(openTrade, live!.userId));
        return;
      }

      const ref = live ? live.userId : 1;
      const audience = audienceOf(currentRoomName, me?.userId ?? -1);
      console.log(
        `[${label}] chat ref=${ref} "${tokensToText(tokens)}" ` +
          `(${tokens.length} token${tokens.length === 1 ? "" : "s"}) ` +
          `-> ${audience.length || 1} in ${currentRoomName ?? "?"}`,
      );
      logLine("chat", tokensToLog(tokens));
      // Animate the face while the bubble is up. `_AvatarChat` draws the bubble
      // but never touches the mouth, so without this the avatar talks with a
      // completely still face.
      startTalking(tokens.length);

      const params: OutgoingParam[] = [
        { int: ref },
        ...reEmit(tokens, { censorUnknown: CHAT_CENSOR && !isStaff(), ownName: characterName }),
      ];
      if (audience.length === 0) send(MSG.AVATAR_CHAT, params, "AvatarChat (not in a room yet)");
      else for (const occupant of audience) occupant.send(MSG.AVATAR_CHAT, params, undefined);
      // After the bubble, so the room sees the word said and then the magic.
      castByMagicWord(tokensToText(tokens));
      // The Blue Bayou's Gator Waiter serves a seated guest who says the word.
      if (currentRoomName) waiters.get(currentRoomName)?.heard(characterName, currentTile, tokensToText(tokens));
      return;
    }

    if (command === CMD.ROOM_MOVE) {
      // "move" — body is a single int: the REF of the tile the player clicked.
      // `CRoomInterface._TileSelection` sends
      //   send("move", [#integer: integer(a_rTile.GetParam("REF"))])
      // so the REF always belongs to a tile the client already has, and
      // `room-geometry.json` lets us confirm it and route to it.
      //
      // Answer with STATUS_PULSE, not LOCATE_AVATAR: `_StatusPulse` calls
      // `WalkToTile` (animated walk), whereas `_LocateAvatar` calls
      // `SetToTileStack` and teleports. Same destination, different feel.
      if (body.length === 0) return;
      let target = decodeToInt(body, 0).value;
      const ref = live ? live.userId : 1;
      // Mid-ride the ride owns the avatar; the rider cannot walk off the car.
      if (Date.now() < ridingUntil) return;

      // In a queue line, the line owns the avatar (see room-queues.ts). A click
      // on the line does nothing; on stage, any click steps down early; waiting,
      // a click elsewhere leaves the line and walks on from beside it.
      const inQueue = currentRoomName && live ? queuedIn(currentRoomName, live.userId) : undefined;
      if (inQueue && currentRoomName && live) {
        if (queueAt(currentGeometryRoom, target) === inQueue.def) return;
        if (inQueue.onStage && inQueue.def.holdUntilReleased) {
          // A rocket seat: free to get off while it boards, committed after.
          if (inQueue.def.gate === HUB_ROCKET_GATE && rocketPhase !== "hub-board") return;
          leaveQueue(currentRoomName, live.userId);
          placeNear(inQueue.def.line[0]);
          console.log(`[${label}] got off the ${inQueue.def.name} seat`);
        } else if (inQueue.onStage) {
          // ⚠ A MUSIC STAGE HOLDS YOU UNTIL YOUR SONG IS PLAYED OUT. Clicks do
          // nothing; the turn ends with the song, the picker's CANCEL, or the
          // picker timing out — never by walking off mid-performance.
          if (inQueue.def.hosted) return;
          stepDown(currentRoomName, live.userId);
          return;
        }
        leaveQueue(currentRoomName, live.userId);
        placeNear(inQueue.def.line[0]);
        console.log(`[${label}] left the ${inQueue.def.name} line`);
      }
      // Clicking anywhere on a line means "get in line": walk to its start.
      const clickedQueue = queueAt(currentGeometryRoom, target);
      if (clickedQueue) target = clickedQueue.line[0];
      const joinQueueHere = clickedQueue && currentRoomName
        ? (() => { const room = currentRoomName; return () => joinQueue(room, clickedQueue, queueMember); })()
        : undefined;
      if (joinQueueHere && target === currentTile) {
        joinQueueHere();
        return;
      }
      // Space Mountain's rocket: clicking its seats means "board" — walk to a
      // free spot on the dock, where the next launch picks you up.
      if (currentRoomCode === ROCKET_DECK && DECK_ROCKET_CLICKS.has(target) && currentRoomName) {
        const taken = new Set(occupiedTiles(currentRoomName, ref));
        const spot = DECK_DOCK.find((t) => t === currentTile || !taken.has(t));
        if (spot === undefined) return;
        target = spot;
      }

      // `WalkToTile` animates ONE hop and has no route logic, so a single pulse
      // to a distant tile slides or teleports. Walk the computed path instead,
      // one adjacent tile per pulse, paced so each hop can animate.
      // May stop short of `target` when the tile cannot be reached — better a
      // short walk than a glide across the room. Empty means "don't move".
      // Other avatars are impassable, so clicking an occupied tile walks you
      // as close as the crowd allows instead of standing inside someone.
      const path = findPath(
        currentGeometryRoom, // tiles come from the casts
        currentTile,
        target,
        new Set([
          ...occupiedTiles(currentRoomName, ref), // people
          ...furnitureTiles(currentRoomName, currentGeometryRoom, live?.userId), // solid furniture
          ...blockedByQueues(currentGeometryRoom), // queue lines: joined, not walked
        ]),
        stepRule(),
      );
      // Clicking the start you are already standing on rides from there.
      const arrival = path.length > 0 ? path[path.length - 1] : currentTile;
      // The red gate held us back: say why. We still walk as near as it lets.
      if (arrival !== target && !suited() && inSpace(target) && !inSpace()) {
        send(MSG.GENERIC_ERROR, [{ int: 4588 }], "GenericError 4588 (spacewalk needs the suit)");
      }

      /**
       * ⚠ ACROSS FLOORS BY BEAM. Floors a beam joins (Tomorrowland Hub's
       * walkway and rocket level) share no walkable link, so a click on the
       * other floor used to walk you as near as the same floor allowed and
       * stop. If the target is out of reach but a beam end is not, and the
       * target can be reached from the beam's other end, go the way a player
       * would: walk to the beam, beam across, then carry on with the SAME
       * request from there — so what the click meant (e.g. joining a rocket
       * line) still happens.
       */
      if (arrival !== target) {
        const blocked = new Set([
          ...occupiedTiles(currentRoomName, ref),
          ...furnitureTiles(currentRoomName, currentGeometryRoom, live?.userId),
          ...blockedByQueues(currentGeometryRoom),
        ]);
        for (const [entry, exit] of beamEnds()) {
          const steps = stepRule();
          const toEntry = entry === currentTile ? [] : findPath(currentGeometryRoom, currentTile, entry, blocked, steps);
          if (entry !== currentTile && toEntry[toEntry.length - 1] !== entry) continue;
          const onward = exit === target ? [] : findPath(currentGeometryRoom, exit, target, blocked, steps);
          if (exit !== target && onward[onward.length - 1] !== target) continue;
          // Landing ON the clicked tile is the whole trip; re-running the click
          // there would beam straight back.
          const carryOn = exit === target ? undefined : () => handleMessage(CMD.ROOM_MOVE, body);
          console.log(`[${label}] walk ${currentTile} -> ${target} via beam ${entry} -> ${exit}`);
          if (toEntry.length === 0) {
            beamTo(exit, carryOn);
            return;
          }
          const pulses: Array<[tile: number, legs: number, face?: number]> = toEntry.map((t) => [t, LEGS_WALK]);
          pulses.push([entry, LEGS_STAND]);
          walkAlong(pulses, () => beamTo(exit, carryOn));
          return;
        }
      }
      const rideStart = currentRoomName
        ? getRoomItems(currentRoomName).find((i) => i.tile === arrival && isRideStart(i.typeCode))
        : undefined;
      // A regular teleporter whose PAD is the arrival tile (ride teleporters are
      // track, reached only by riding — see rides.ts). Its rim and doorway are
      // just floor and furniture: only the `ACT` block sends you.
      const teleporter = currentRoomName
        ? getRoomItems(currentRoomName).find(
            (i) => i.pair && !isRideTrack(i.typeCode) && teleporterPad(i) === arrival,
          )
        : undefined;
      if (path.length === 0 && teleporter && target === currentTile) {
        teleportVia(teleporter);
        return;
      }
      // A layout beam (Tomorrowland Hub's tower): where the walk ENDS on one.
      const beam = arrival === target ? beamTargetAt(target) : null;
      if (path.length === 0 && beam !== null && target === currentTile) {
        beamTo(beam);
        return;
      }
      // An exit fires only when it is where the walk ENDS, i.e. the tile that
      // was clicked — crossing a doorway on the way somewhere else does not
      // leave the room. A guest room's every exit is its front door: "back".
      const exitTile = arrival === target && isExitTile(currentGeometryRoom, target);
      // The monorail's exits depend on where the train is; see `monorailExitAt`.
      const monorailExit = arrival === target ? monorailExitAt(target) : undefined;
      const exit: ExitRule | null =
        currentRoomCode === undefined
          ? null
          : monorailExit !== undefined
            ? monorailExit
            : currentRoomName?.startsWith("guest:")
              ? exitTile ? { tiles: [target], label: "guest room door", to: "back" } : null
              : arrival === target ? exitAt(currentRoomCode, target, exitTile) : null;
      // Already standing in the doorway (you arrive in one): clicking it again leaves.
      if (path.length === 0 && exit && target === currentTile) {
        takeExit(exit);
        return;
      }
      if (path.length === 0 && target === currentTile) {
        const gate = turnstileAtPlate(currentTile);
        if (gate) {
          arriveAtTurnstile(gate);
          return;
        }
      }
      if (path.length === 0 && !(rideStart && target === currentTile)) return;

      // Every hop walks, INCLUDING the last one — the client is still lerping
      // toward that tile for the next 500 ms, so switching to the standing pose
      // as part of the final move makes the avatar slide the last tile. The
      // stand is its own pulse, one interval later, repeating the destination
      // tile: `WalkToTile` sees source == target, snaps (a no-op, it is already
      // there) and `Actions` drops the legs to "std".
      const pulses: Array<[tile: number, legs: number, face?: number]> = path.map((t) => [t, LEGS_WALK]);

      // Arriving on a ride start boards the ride: mount in place facing along
      // the start, then one vehicle pulse per track tile, then step out.
      const ride = rideStart && currentRoomName
        ? planRide(currentGeometryRoom, getRoomItems(currentRoomName), rideStart)
        : null;
      if (ride) {
        pulses.push([arrival, ride.vehicle, ride.start.dir]);
        console.log(
          `[${label}] ride ref=${ref} start=${ride.start.ref} (type ${ride.start.typeCode}, dir ${ride.start.dir}) ` +
            `vehicle=${ride.vehicle} ${ride.steps.length} tiles [${ride.steps.map((s) => `${s.tile}/${s.facing}`).join(" ")}] ` +
            `ended: ${ride.end}`,
        );
        rideAlong(pulses, ride, 0, arrival);
        return;
      }
      pulses.push([arrival, LEGS_STAND]);
      if (exit) {
        walkAlong(pulses, () => takeExit(exit));
        console.log(`[${label}] walk ref=${ref} ${currentTile} -> exit "${exit.label}" at ${arrival}`);
        return;
      }
      if (teleporter) {
        walkAlong(pulses, () => teleportVia(teleporter));
        console.log(`[${label}] walk ref=${ref} ${currentTile} -> teleporter ${teleporter.ref} at ${arrival}`);
        return;
      }

      const bodyGate = currentRoomName
        ? getRoomItems(currentRoomName).find(
            (i) => FEE_TURNSTILES.has(i.typeCode) && turnstileLane(currentGeometryRoom, i)?.body === arrival,
          )
        : undefined;
      const beyond = bodyGate ? turnstileLane(currentGeometryRoom, bodyGate)?.beyond ?? null : null;
      if (
        bodyGate &&
        beyond !== null &&
        !new Set(occupiedTiles(currentRoomName, ref)).has(beyond) &&
        !furnitureTiles(currentRoomName, currentGeometryRoom, live?.userId).has(beyond)
      ) {
        pulses.pop();
        pulses.push([beyond, LEGS_WALK], [beyond, LEGS_STAND]);
        walkAlong(pulses);
        console.log(`[${label}] walk ref=${ref} ${currentTile} -> through turnstile ${bodyGate.ref} to ${beyond}`);
        return;
      }

      const gate = turnstileAtPlate(arrival);
      if (gate) {
        walkAlong(pulses, () => arriveAtTurnstile(gate));
        console.log(`[${label}] walk ref=${ref} ${currentTile} -> turnstile ${gate.ref} plate ${arrival}`);
        return;
      }

      console.log(
        `[${label}] walk ref=${ref} ${currentTile} -> ${target} ` +
          `(${path.length} step${path.length === 1 ? "" : "s"}` +
          `${arrival === target ? "" : `, unreachable — stopping at ${arrival}`})`,
      );
      // Hand the route to the pacer. It REPLACES whatever was queued — clicking
      // a new tile mid-walk redirects, it does not start a second walk.
      // Reaching a queue's start tile puts you in line; a beam tile beams you.
      const onArrive = joinQueueHere && arrival === target
        ? joinQueueHere
        : beam !== null ? () => beamTo(beam) : undefined;
      walkAlong(pulses, onArrive);
      return;
    }

    if (command === CMD.REQUEST_BALANCE) {
      sendCredits();
      return;
    }

    if (command === CMD.COMBINE_PIN) {
      // `[int firstRef, int secondRef]`: the first pin takes both pins'
      // stars, the second is used up. The client pre-filters (same code, sum
      // <= 5, not itself), but a forged request must fail the same way — with
      // the client's own texts.
      if (!live) return;
      let at = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, at);
        at = next;
        return value;
      };
      const firstRef = readInt();
      const secondRef = readInt();
      const fail = (code: number, why: string) => {
        console.log(`[${label}] refused combine ${firstRef}+${secondRef}: ${why}`);
        send(MSG.GENERIC_ERROR, [{ int: code }], `GenericError ${code}`);
      };
      if (firstRef === secondRef) return fail(4528, "same pin");
      const a = peekOwnedItem(firstRef, live.userId);
      const b = peekOwnedItem(secondRef, live.userId);
      if (!a || !b || a.category !== ITEM_CATEGORY.pins || b.category !== ITEM_CATEGORY.pins || a.worn || b.worn) {
        return fail(4525, "not two of your unworn pins");
      }
      if (!magicOf(a.typeCode) || !magicOf(b.typeCode)) return fail(4526, "not magic pins");
      if (isSingleUsePin(a.typeCode) || isSingleUsePin(b.typeCode)) return fail(4533, "single-use");
      const stars = pinLevel(a) + pinLevel(b);
      if (a.typeCode !== b.typeCode || stars > 5) return fail(4525, `types ${a.typeCode}/${b.typeCode}, ${stars} stars`);
      takeOwnedItem(b.id, live.userId);
      magicReadyAt.delete(b.id);
      setItemLevel(a.id, live.userId, stars);
      console.log(`[${label}] combined pins ${a.id}+${b.id} (type ${a.typeCode}) -> ${stars} stars`);
      // `2539 _PinsCombined`: [updatedRef, oldGroup, newGroup, newLevel,
      // removedRef, removedGroup]. The client re-files the surviving pin with
      // its new stars and drops the used one, in place — no list resend, so
      // the grid keeps its page and selection. Groups are the `m<rowId>` slots
      // `sendItemList` gives every combinable magic pin.
      send(
        MSG.PINS_COMBINED,
        [
          { int: a.id },
          { str: `m${a.id}` },
          { str: `m${a.id}` },
          { int: stars },
          { int: b.id },
          { str: `m${b.id}` },
        ],
        `PinsCombined ${a.id}+${b.id} -> ${stars}`,
      );
      return;
    }

    if (command === CMD.QUERY_MAGIC_FX) {
      sendMagicList();
      return;
    }

    if (command === CMD.DEACTIVATE_MAGIC_FX) {
      if (!refuseSuitOff(4530)) stopMagic();
      sendMagicList();
      return;
    }

    if (command === CMD.ACTIVATE_MAGIC_FX) {
      // `[int fxId]` — fxId is the worn pin's row (see `sendMagicList`).
      if (body.length === 0) return;
      castPin(decodeToInt(body, 0).value);
      return;
    }

    if (
      command === CMD.TRADE_SEND_REQUEST || command === CMD.TRADE_RESPONSE ||
      command === CMD.TRADE_ADD_REMOVE_ITEM || command === CMD.TRADE_CONF_LEVEL
    ) {
      if (!live) return;
      const me = live.userId;
      let at = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, at);
        at = next;
        return value;
      };

      if (command === CMD.TRADE_SEND_REQUEST) {
        // `[targetRef]` — the profile's TRADE button. The client checks only its
        // OWN "show trade requests" setting; the target's is enforced here.
        const target = readInt();
        const them = liveByUser.get(target);
        const tradeBan = activeSanction(me, "trade");
        if (tradeBan) {
          send(
            MSG.ADMIN_MESSAGE,
            [{ str: wireText("You are not allowed to trade at the moment.") }, { int: 3 }],
            "AdminMessage (trade banned)",
          );
        }
        const why =
          target === me ? "self"
          : tradeBan ? "trade banned"
          : activeSanction(target, "trade") ? "target is trade banned"
          : !currentRoomName || them?.roomName() !== currentRoomName ? "not in this room"
          : tradeOf.has(me) || tradeOf.has(target) ? "already trading"
          : !getSettings(target).tradeRequests ? "target has trade requests off"
          : (tradeIgnores.get(target)?.get(me) ?? 0) > Date.now() ? "target is ignoring this player"
          : null;
        if (why || !them) {
          console.log(`[${label}] trade request to ${target} dropped: ${why ?? "offline"}`);
          // Anything but "declined" would leave the asker waiting forever.
          send(MSG.TRADE_RESPONSE, [{ int: target }, { int: 0 }], "TradeResponse 0 (refused)");
          return;
        }
        // ⚠ Nothing swept these, and a repeat sent the target another popup:
        // a request to an alt in the same room grew the map without bound.
        // Expired ones go now, and one asker has one request open at a time.
        const t = Date.now();
        for (const [rid, r] of tradeRequests) {
          if (r.expires <= t) tradeRequests.delete(rid);
          else if (r.from === me) {
            if (r.to === target) return; // already asked; no second popup
            tradeRequests.delete(rid);
          }
        }
        const id = nextTradeRequest++;
        tradeRequests.set(id, { from: me, to: target, room: currentRoomName!, expires: Date.now() + TRADE_REQUEST_MS });
        them.send(MSG.TRADE_REQUEST, [{ int: me }, { int: id }], `TradeRequest from ${me} (#${id})`);
        console.log(`[${label}] trade request #${id} -> ${target}`);
        return;
      }

      if (command === CMD.TRADE_RESPONSE) {
        // `[response, requestId]` — 0 decline, 1 accept, 2 ignore.
        const response = readInt();
        const id = readInt();
        const req = tradeRequests.get(id);
        if (!req || req.to !== me) return;
        tradeRequests.delete(id);
        const asker = liveByUser.get(req.from);
        if (!asker) return;
        const stillThere =
          req.expires > Date.now() && asker.roomName() === req.room && currentRoomName === req.room &&
          !tradeOf.has(me) && !tradeOf.has(req.from) &&
          !activeSanction(me, "trade") && !activeSanction(req.from, "trade");
        if (response !== 1 || !stillThere) {
          if (response === 2) {
            let ignores = tradeIgnores.get(me);
            if (!ignores) tradeIgnores.set(me, (ignores = new Map()));
            ignores.set(req.from, Date.now() + TRADE_IGNORE_MS);
          }
          asker.send(MSG.TRADE_RESPONSE, [{ int: me }, { int: response === 2 ? 2 : 0 }], "TradeResponse declined");
          console.log(`[${label}] trade request #${id} ${response === 2 ? "ignored" : "declined"}`);
          return;
        }
        const trade: Trade = {
          users: [req.from, me],
          room: req.room,
          offer: new Map([[req.from, new Set()], [me, new Set()]]),
          level: new Map([[req.from, 0], [me, 0]]),
        };
        tradeOf.set(req.from, trade);
        tradeOf.set(me, trade);
        // `2595 [partner, 1]` is what OPENS the window — both players need it.
        asker.send(MSG.TRADE_RESPONSE, [{ int: me }, { int: 1 }], "TradeResponse open");
        send(MSG.TRADE_RESPONSE, [{ int: req.from }, { int: 1 }], "TradeResponse open");
        asker.setTrading(true);
        live.setTrading(true);
        sendTradeStatus(trade);
        console.log(`[${label}] trade opened ${req.from} <-> ${me}`);
        return;
      }

      const trade = tradeOf.get(me);
      if (!trade) return;
      const partner = tradePartner(trade, me);

      if (command === CMD.TRADE_ADD_REMOVE_ITEM) {
        // `[0 add | 1 remove, 1, rowId]`
        const action = readInt();
        readInt(); // always 1 — the main inventory
        const rowId = readInt();
        const mine = trade.offer.get(me)!;
        if (action === 0) {
          const item = getOwnedItem(rowId, me);
          const refuse =
            !item ? "not yours"
            : item.worn ? "a worn pin — take it off first"
            : item.category === ITEM_CATEGORY.clothes && liveByUser.get(me)?.wornGarments().includes(item.typeCode)
              ? "clothing you are wearing"
            : null;
          if (refuse) {
            console.log(`[${label}] trade: can't offer ${rowId}: ${refuse}`);
            send(MSG.TRADE_CHAT_NOTIFICATION, [{ str: `You can't offer that: ${refuse}.` }], "TradeChatNotification");
            return;
          }
          mine.add(rowId);
        } else {
          mine.delete(rowId);
        }
        // The deal changed: nobody stays accepted on the old one.
        trade.level.set(me, 0);
        trade.level.set(partner, 0);
        sendTradeStatus(trade);
        return;
      }

      // TRADE_CONF_LEVEL `[level]`: -1 stop, 0 untick, 1 accept, 2 final confirm.
      const level = readInt();
      if (level === -1) {
        console.log(`[${label}] trade stopped by ${me}`);
        endTrade(trade, true);
        return;
      }
      const theirs = trade.level.get(partner) ?? 0;
      // The final confirm only counts once both have accepted.
      trade.level.set(me, level === 2 && theirs < 1 ? 1 : Math.max(0, Math.min(2, level)));
      if (trade.level.get(me) === 2 && theirs === 2) {
        completeTrade(trade);
        return;
      }
      sendTradeStatus(trade);
      return;
    }

    if (command === CMD.KICK_USER) {
      // `[int avatarRef]` — BOOT on a player's profile. The client only offers
      // the button with `ControlRoom` (owner or staff); check it again here.
      if (!live || body.length === 0 || !currentRoomName) return;
      const target = decodeToInt(body, 0).value;
      const guest = currentGuestRoom();
      const allowed = (guest !== undefined && guest.ownerId === live.userId) || may("kick");
      if (!allowed) {
        console.log(`[${label}] boot ${target} refused: not this room's owner`);
        return;
      }
      if (target === live.userId || (guest && target === guest.ownerId)) return;
      const victim = liveByUser.get(target);
      if (!victim || !occupantsOf(currentRoomName).some((o) => o.userId === target)) {
        console.log(`[${label}] boot ${target}: not in ${currentRoomName}`);
        return;
      }
      let bans = roomBoots.get(currentRoomName);
      if (!bans) roomBoots.set(currentRoomName, (bans = new Map()));
      bans.set(target, Date.now() + BOOT_BAN_MS);
      console.log(`[${label}] booted user ${target} from ${currentRoomName} for ${BOOT_BAN_MS / 60000} min`);
      victim.bootFrom(currentRoomName);
      return;
    }

    if (command === CMD.MAGIC_TELEPORT) {
      if (darkRide || Date.now() < ridingUntil) return;
      // `[int fxId, int tileRef]` — Teleportation magic, after the tile pick.
      let at = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, at);
        at = next;
        return value;
      };
      const pinId = readInt();
      const tile = readInt();
      // Teleporting ends the suit, so not from space (4530); and nobody
      // teleports out onto the spacewalk — that is what the gate is for (4594).
      if (refuseSuitOff(4530)) return;
      if (inSpace(tile) && !inSpace()) {
        console.log(`[${label}] magic teleport ${pinId}: tile ${tile} is on the spacewalk`);
        send(MSG.GENERIC_ERROR, [{ int: 4594 }], "GenericError 4594 (no teleporting onto the spacewalk)");
        return;
      }
      // The room's own rules: you may land only where you could WALK to. Placed
      // furniture (a divider, a wall of items) blocks the route; other avatars
      // do not — you jump over them, you just cannot land on one.
      //
      // ⚠ `findPath` never fails: for an unreachable target it returns a route
      // to the nearest reachable tile instead (see its note). So "non-empty" is
      // not "reachable" — the route has to END on the tile. The old check only
      // tested non-empty, and without the furniture set, so it let you
      // teleport past a divider into a space you could not walk into.
      const furniture = furnitureTiles(currentRoomName, currentGeometryRoom, live?.userId);
      const occupied = new Set(occupiedTiles(currentRoomName, live ? live.userId : 1));
      const route = findPath(currentGeometryRoom, currentTile, tile, furniture, stepRule());
      const reachable = tile !== currentTile && route.length > 0 && route[route.length - 1] === tile;
      if (furniture.has(tile) || occupied.has(tile) || !reachable) {
        console.log(`[${label}] magic teleport ${pinId}: tile ${tile} is not reachable from ${currentTile}`);
        // 4523 "You can't cast magic right now" — no text says "not there", and
        // the pin is not spent (startMagic has not run), so this reads right.
        send(MSG.GENERIC_ERROR, [{ int: 4523 }], "GenericError 4523 (teleport target unreachable)");
        return;
      }
      stopMagic();
      const pin = startMagic(pinId);
      if (!pin) return;
      // Out on the spot, then in at the chosen tile, then plain again.
      stopWalking();
      setMagic(4);
      setTimeout(() => {
        currentTile = tile;
        lastPulseAt = Date.now();
        if (me) me.tile = tile;
        const params: OutgoingParam[] = [
          { int: live ? live.userId : 1 },
          { int: tile },
          { int: 0 },
          { int: facing },
          { int: facing },
        ];
        for (const occupant of audienceOf(currentRoomName, me?.userId ?? -1)) occupant.send(MSG.LOCATE_AVATAR, params, undefined);
        setTimeout(() => {
          if (magic === 4) setMagic(0);
        }, TELEPORT_IN_MS);
      }, TELEPORT_OUT_MS);
      console.log(`[${label}] magic teleport pin ${pinId} -> tile ${tile}`);
      return;
    }

    if (command === CMD.WEAR_PIN || command === CMD.UNWEAR_PIN) {
      // `[int ref]`. WEAR names the main grid's slot (its first row), TAKE OFF
      // a worn pin's own row. Answered by resending both grids rather than
      // `2524`/`2523`, the same way furniture refreshes — the client then shows
      // exactly what the server holds.
      if (!live || body.length === 0) return;
      const ref = decodeToInt(body, 0).value;
      const row = peekOwnedItem(ref, live.userId);
      if (!row || row.category !== ITEM_CATEGORY.pins) {
        console.log(`[${label}] refused ${command === CMD.WEAR_PIN ? "wear" : "unwear"} ${ref}: not your pin`);
        return;
      }
      const wear = command === CMD.WEAR_PIN;
      if (wear && getWornPins(live.userId).length >= MAX_WORN_PINS) {
        console.log(`[${label}] refused wear ${ref}: lanyard full (${MAX_WORN_PINS})`);
        return;
      }
      // Taking off the pin whose magic is running ends it — not out in space.
      if (!wear && activeMagic?.pinId === ref) {
        if (refuseSuitOff(4532)) {
          sendWornPins(); // the client already moved it off; put it back
          queueItemList(1);
          return;
        }
        stopMagic();
      }
      setPinWorn(ref, live.userId, wear);
      console.log(`[${label}] ${wear ? "wore" : "took off"} pin ${ref} (type ${row.typeCode})`);
      if (!wear) removeWornPin(ref);
      sendWornPins();
      sendMagicList(); // the client's copy of the magic words comes from this list
      queueItemList(1);
      // Re-announce the avatar so the room's `pin.*` params — what the profile
      // lanyard draws — change now, as badges do. `_CreateAvatars` on an
      // existing avatar updates it in place and clears the unused pin slots.
      if (me && currentRoomName) {
        for (const occupant of audienceOf(currentRoomName, me?.userId ?? -1)) {
          occupant.send(MSG.CREATE_AVATARS, [{ int: 1 }, ...avatarBlock(me)], undefined);
        }
      }
      return;
    }

    if (command === CMD.GET_ITEM_LIST) {
      // `int inventoryId`; 0 means "everything".
      //
      // You OWN the clothes you are wearing, so they belong in the inventory —
      // there is no separate "worn but not owned" state in VMK. Pins have no
      // owner model yet, so that list is genuinely empty, but it is still SENT
      // with the clear flag: silence and "you have nothing" look identical to a
      // client that is waiting.
      const requested = body.length > 0 ? decodeToInt(body, 0).value : 0;
      // ⚠ EMPTY INVENTORIES ARE NOT FREE, and that is the whole problem.
      // `_ReceiveItemList` loops ALL FOUR category buckets on EVERY 2532 and
      // calls `UpdateItemList` on each, which fires the page's item-list
      // callback and starts an asynchronous thumbnail pass. Sending 1, 3 and 5
      // is therefore twelve page updates — and 3 (worn pins) and 5 (VMKs) hold
      // nothing, so eight of the twelve are churn over empty lists.
      //
      // Measured: the grid survives 2 furniture rows and dies on 6, regardless
      // of WHICH items (undrawable rows work fine at 2), and raising
      // VMK_INV_STAGGER_MS to 1000 did not stop it — so the cost is per
      // message, not between messages. Dropping the empty ones cuts the
      // updates by two thirds without hiding a single item.
      //
      // The comment below used to justify sending them anyway: silence and
      // "you have nothing" look alike to a waiting client. That reasoning holds
      // for inventory 1, which is always sent, but 3 has its own dedicated
      // message (2536 ReceiveWornPins, sent below) and nothing consumes 5 yet.
      //   $env:VMK_INV_SEND_EMPTY = "1"   # restore the old behaviour
      const sendEmpty = process.env.VMK_INV_SEND_EMPTY === "1";
      const candidates = requested === 0 ? [1, 3, 5] : [requested];
      // Inventory 1 always goes, and an explicitly requested id always goes —
      // only the unasked-for empties (3 and 5 on a "send everything" request)
      // are dropped.
      const inventories = sendEmpty
        ? candidates
        : candidates.filter((id) => id === 1 || id === requested);
      // Characters created before the wardrobe existed own nothing, so the grid
      // arrives empty while the avatar is visibly dressed. Top the inventory up
      // from what it is wearing: idempotent, and a no-op for anyone who
      // registered after the grant landed.
      if (live) {
        const healed = grantItems(live.userId, wornClothingSets(), ITEM_CATEGORY.clothes);
        if (healed > 0) {
          console.log(`[${label}] backfilled ${healed} worn clothing item(s) into the inventory`);
        }
      }
      const worn = wornClothingSets();

      // ⚠ STAGGERED, not sent as a burst.
      //
      // One `GET_ITEM_LIST` used to produce five messages back to back —
      // inventories 1, 3 and 5, then worn clothes, then worn pins. Each `2532`
      // makes `_ReceiveItemList` loop ALL FOUR category buckets and call
      // `UpdateItemList` on every one, and each page then starts its own
      // asynchronous thumbnail load. That is up to fourteen page updates
      // arriving in a single network read, and the grid does not survive it
      // reliably: which tab dies moves around with the item count, and the
      // Character panel renders the same garments perfectly, so the casts and
      // the cloth loader are not at fault — only the burst is.
      //
      // Spacing them lets each page finish before the next arrives.
      // `VMK_INV_STAGGER_MS=0` restores the burst.
      const steps: Array<() => void> = [];
      // ⚠ EVERY message must carry EVERY category. `_ReceiveItemList` builds
      // all four buckets fresh per message and then pushes all four into the
      // inventory:
      //
      //   repeat with i = 1 to t_mp_kType_mp_iRef_rItem.count
      //     UpdateItemList(getPropAt(i), t_mp_kType_mp_iRef_rItem[i])
      //
      // The clear flag only decides whether `ClearItems()` runs first; it does
      // NOT make a message partial. So a furniture-only message carries an
      // empty #clothes bucket and tells the client you own no clothing — which
      // is exactly why enabling furniture always killed the clothing tab.
      // Splitting inventory 1 is not possible; only the gap between whole
      // messages can be widened.
      for (const id of inventories) steps.push(() => sendItemList(id));
      steps.push(() => {
        const wornParams: OutgoingParam[] = [{ int: worn.length }];
        for (const setId of worn) {
          wornParams.push({ int: setId }, { int: setId }, { str: String(setId) });
        }
        send(MSG.RECEIVE_WORN_CLOTHES, wornParams, `ReceiveWornClothes ${worn.length}`);
      });
      // ⚠ Always sent, even at zero. This is the only message that initialises
      // the worn-pins grid (inventory 3); without it that grid stays VOID and
      // opening the pins tab takes the client down. Nothing asks for it — it
      // has to ride along with the clothes.
      steps.push(() => { sendWornPins(); sendMagicList(); });

      if (INV_STAGGER_MS <= 0) {
        for (const step of steps) step();
      } else {
        steps.forEach((step, i) => {
          if (i === 0) step();
          else setTimeout(step, i * INV_STAGGER_MS);
        });
      }
      return;
    }

    if (command === CMD.GET_FIGURE_LIST) {
      // What the avatar builder may dress you in: every hair and face for your
      // sex, plus the garments you actually own. The client buckets these by
      // band into hr/ht/hd/ch/pn/sh (`parseAvailableSets`) and draws one swatch
      // strip per bucket, so a band you send nothing for simply has no options.
      const outfit = live ? getOutfit(live.userId) : null;
      const sex = outfit?.sex ?? 0;
      const catalogue = avatarCatalogue();
      const all = sex === 1 ? catalogue.female : catalogue.male;
      // Hair and face are your BODY, not your wardrobe — always offered in
      // full, and never gated on ownership, which is why Disney shipped no
      // `item.` names for those bands.
      // The worn hair/face is unioned in too: the catalogue hides hat-shaped
      // hair sets (`HAT_HAIR_SETS`), and someone created before that still
      // wears one.
      const wornBody = outfit ? figureSetIds(outfit.figure).filter((id) => !isGarment(id)) : [];
      const body = [...all.filter((id) => !isGarment(id)), ...wornBody];
      // Clothing is offered only if you own it. What you are WEARING is unioned
      // in regardless, so the builder can always redraw the current figure even
      // if a grant was missed.
      const garments =
        WARDROBE_MODE === "all"
          ? all.filter(isGarment)
          : [...ownedClothingSets(), ...wornClothingSets()];
      const sets = [...new Set([...body, ...garments])].sort((a, b) => a - b);
      // ⚠ MUST PRECEDE 2501, AND NOTHING ASKS FOR IT.
      //
      // `CAvatarFactoryHandler.AllClothesLoaded` ends with
      //   if m_bHatListReady and m_bAvailableSetsReady and listp(...) then
      //     return this.getComponent().parseAvailableSets(...)
      // and `parseAvailableSets` is what CREATES the builder window. This
      // message is the only thing that sets `m_bHatListReady`, so without it
      // the panel comes up blank — every cast loads, then the render is simply
      // never reached. We used to send it on the REGISTRATION path only, which
      // is why the builder worked in the session you registered in and was
      // blank in every session after.
      //
      // Ordering is load-bearing: `getAvailableSets` can reach
      // `AllClothesLoaded` synchronously when every cloth is already loaded, so
      // the flag has to be set before 2501 arrives, not after.
      send(MSG.HAIR_LIST_FOR_HATS, [{ int: 0 }], "hairListForHats (none barred from hats)");
      send(
        MSG.AVAILABLE_SETS,
        [{ int: sets.length }, ...sets.map((id) => ({ int: id }))],
        `AvailableSets ${sets.length} (sex=${sex}, ${body.length} body + ` +
          `${sets.length - body.length} garment(s), mode=${WARDROBE_MODE})`,
      );
      return;
    }

    if (command === CMD.REQUEST_AVATAR_DATA) {
      // The clothing button. No body. Without this the avatar builder opens
      // with no figure to edit.
      sendAvatarData();
      return;
    }

    if (command === CMD.CHANGE_FIGURE) {
      // `(int setId, int colour)` per part — no name and no trailing room
      // style, unlike CREATE_AVATAR. Read every int; the pairs never go ragged
      // because a -1 part is followed by a -1 colour.
      // 6 parts x 2 = 12. Stored, re-parsed on every wardrobe lookup and logged,
      // so a forged ~200k-int body cost on every one of those.
      const figure: number[] = [];
      for (let at = 0; at < body.length && figure.length < 12; ) {
        const read = decodeToInt(body, at);
        if (read.next <= at) break; // never spin on a malformed frame
        figure.push(read.value);
        at = read.next;
      }
      if (figure.length === 0 || !live) return;

      // ⚠ The builder only offers garments you own or are already wearing
      // (GET_FIGURE_LIST). Nothing checked that here, and GET_ITEM_LIST grants
      // whatever is worn into the inventory — so naming any garment in a
      // forged figure gave it to you, to keep or sell.
      if (WARDROBE_MODE === "owned") {
        const allowed = new Set([...ownedClothingSets(), ...wornClothingSets()]);
        const stolen = figure.filter((v, i) => i % 2 === 0 && isGarment(v) && !allowed.has(v));
        if (stolen.length > 0) {
          console.warn(`[${label}] figure change refused: garment(s) not owned [${stolen.join(", ")}]`);
          return;
        }
      }

      const outfit = getOutfit(live.userId);
      const sex = outfit?.sex ?? 0;
      setCharacter(
        live.userId,
        characterName,
        JSON.stringify({ sex, figure, guestRoomStyle: outfit?.guestRoomStyle ?? null }),
      );
      console.log(`[${label}] figure changed to [${figure.join(", ")}]`);

      const padded = [...figure.slice(0, 12)];
      while (padded.length < 12) padded.push(-1);
      if (me) me.figure = padded;

      // Tell the room, or everyone else keeps seeing the old outfit until they
      // reload. ⚠ `ref` appears twice — see MODIFY_AVATAR.
      const ref = live.userId;
      const params: OutgoingParam[] = [
        { int: ref },
        ...padded.map((v) => ({ int: v })),
        { int: ref },
        { int: currentTile },
        { int: 0 }, // stack
        ...avatarActions({ headDir: facing, bodyDir: facing }).map((v) => ({ int: v })),
      ];
      const audience = audienceOf(currentRoomName, me?.userId ?? -1);
      if (audience.length === 0) send(MSG.MODIFY_AVATAR, params, "ModifyAvatar (alone)");
      else for (const occupant of audience) occupant.send(MSG.MODIFY_AVATAR, params, undefined);
      return;
    }

    if (command === CMD.SET_FRIENDS_ONLY) {
      // `int state` from the room info tab, for the room you are standing in.
      const state = body.length > 0 ? decodeToInt(body, 0).value : 0;
      const room = currentGuestRoom();
      if (!room || !live || room.ownerId !== live.userId) {
        console.warn(`[${label}] SetFriendsOnly refused — not in a room you own`);
        return;
      }
      // ⚠ NOT A BOOLEAN. "Change Who Can Enter" sends one of the five
      // ENTRY_STATEs; storing `state !== 0` collapsed tickets/owner-only into
      // "friends" and echoed 1, so the window re-opened on the wrong choice.
      const updated = setGuestRoomEntryState(room.id, state);
      console.log(`[${label}] room ${room.id} entryState=${updated?.entryState}`);
      // Echo it back: `setRoomEntryState` is what re-draws the tab's controls,
      // so without this the choice springs back to its old position.
      send(
        MSG.GUEST_ROOM_ENTRY_STATE,
        [{ int: updated?.entryState ?? 0 }],
        `GuestRoomEntryState ${updated?.entryState ?? 0}`,
      );
      return;
    }

    if (command === CMD.CREATE_ROOM_TICKET) {
      // `int expiryChoice, int amount` from room info → Create Tickets, for the
      // guest room you are standing in. Tickets are single-use pins that open
      // this room while it is set to "People with tickets" (or friends + tickets).
      let at = 0;
      const first = decodeToInt(body, at);
      at = first.next;
      const choice = first.value;
      const amount = Math.min(10, Math.max(1, at < body.length ? decodeToInt(body, at).value : 1));
      const room = currentGuestRoom();
      if (!live || !room || (room.ownerId !== live.userId && !may("kick"))) {
        // `error.4599`: the client's own "cannot create tickets" text.
        send(MSG.GENERIC_ERROR, [{ int: 4599 }], "GenericError 4599 (tickets: not your room)");
        return;
      }
      // `ticketpin.expiry.hd1..4` — EXPIRES IN 1 / 3 / 7 / 30 DAYS.
      const days = [1, 3, 7, 30][Math.min(4, Math.max(1, choice)) - 1];
      const price = ROOM_TICKET_PRICE * amount;
      const credits = getUserById(live.userId)?.credits ?? 0;
      if (credits < price) {
        send(MSG.GENERIC_ERROR, [{ int: 4602 }], `GenericError 4602 (tickets: ${credits} < ${price})`);
        return;
      }
      setCredits(live.userId, credits - price, "Room Tickets");
      createTickets(live.userId, room.id, amount, days);
      sendCredits();
      // The ticket window re-reads the pins when 2533 arrives, which the list
      // refresh sends right after 2532.
      queueItemList(1);
      console.log(
        `[${label}] ${amount} ticket(s) for room ${room.id} "${room.name}" (${days} day(s)) ` +
          `for ${price} (${credits} -> ${credits - price})`,
      );
      return;
    }

    if (command === CMD.SELL_ITEM_REQUEST || command === CMD.SELL_ITEM_CONFIRM) {
      // Two steps: 522 asks "how much?", 2537 answers, 525 confirms, 2538 done.
      // Only ROOM TICKETS are sellable so far — for 2 credits, as the original.
      // Everything else has no sell price yet, and is left alone.
      const ref = body.length > 0 ? decodeToInt(body, 0).value : 0;
      if (!live) return;
      const ticket = getTicket(live.userId, ref);
      if (!ticket) {
        const userId = live.userId;
        const sale = ((): { rowId: number; typeCode: number; category: number; group: string; price: number } | string => {
          if (isGarment(ref) && ownedClothingSets().includes(ref)) {
            if (wornClothingSets().includes(ref)) return "garment is being worn";
            const row = getOwnedItems(userId, ITEM_CATEGORY.clothes).find((r) => r.typeCode === ref);
            if (!row) return "garment row missing";
            return { rowId: row.id, typeCode: ref, category: ITEM_CATEGORY.clothes, group: String(ref), price: redeemPriceOf(ref) };
          }
          const row = getOwnedItem(ref, userId);
          if (!row) return "not an inventory item of this player";
          if (row.worn) return "pin is on the lanyard";
          if (row.pair) return "one half of a teleporter pair";
          const level = pinLevel(row);
          const group =
            row.category !== ITEM_CATEGORY.pins ? String(row.typeCode)
            : level > 0 && !isSingleUsePin(row.typeCode) ? `m${row.id}`
            : level > 0 ? `${row.typeCode}.${level}`
            : String(row.typeCode);
          return { rowId: row.id, typeCode: row.typeCode, category: row.category, group, price: redeemPriceOf(row.typeCode) };
        })();
        if (typeof sale === "string" || sale.price <= 0) {
          console.log(`[${label}] sell ${ref} refused: ${typeof sale === "string" ? sale : `no redeem price for ${sale.typeCode}`}`);
          return;
        }
        if (command === CMD.SELL_ITEM_REQUEST) {
          send(
            MSG.SELL_CONFIRM_REQUEST,
            [{ int: ref }, { int: sale.category }, { int: sale.price }],
            `SellConfirmRequest ${sale.typeCode} ref ${ref} for ${sale.price}`,
          );
          return;
        }
        if (!takeOwnedItem(sale.rowId, userId)) return;
        const credits = (getUserById(userId)?.credits ?? 0) + sale.price;
        setCredits(userId, credits, `Item Sale (${sale.rowId})`, sale.typeCode);
        send(
          MSG.SELL_CONFIRMED,
          [
            { int: 0 },
            { int: 1 },
            { int: sale.price },
            { int: 1 },
            { int: sale.category },
            { int: ref },
            { str: sale.group },
          ],
          `SellConfirmed ${sale.typeCode} ref ${ref}`,
        );
        sendCredits();
        queueItemList(1);
        console.log(`[${label}] sold ${sale.typeCode} (row ${sale.rowId}) for ${sale.price} (-> ${credits})`);
        return;
      }
      if (command === CMD.SELL_ITEM_REQUEST) {
        send(
          MSG.SELL_CONFIRM_REQUEST,
          [{ int: ref }, { int: ITEM_CATEGORY.pins }, { int: ROOM_TICKET_SELL_PRICE }],
          `SellConfirmRequest ticket ${ref} for ${ROOM_TICKET_SELL_PRICE}`,
        );
        return;
      }
      if (!deleteTicket(live.userId, ref)) return;
      const credits = (getUserById(live.userId)?.credits ?? 0) + ROOM_TICKET_SELL_PRICE;
      setCredits(live.userId, credits, "Ticket Sale");
      send(
        MSG.SELL_CONFIRMED,
        [
          { int: 0 }, // fromHK
          { int: 1 }, // showAlert
          { int: ROOM_TICKET_SELL_PRICE },
          { int: 1 }, // itemCount
          { int: ITEM_CATEGORY.pins },
          { int: ref },
          { str: `t${ref}` },
        ],
        `SellConfirmed ticket ${ref}`,
      );
      sendCredits();
      console.log(`[${label}] sold ticket ${ref} for ${ROOM_TICKET_SELL_PRICE} (-> ${credits})`);
      return;
    }

    if (command === CMD.CLEAR_ROOM_ITEMS) {
      // Two-step: 0 asks, 1 confirms. The client raises its own dialog from
      // 2812 and only then sends the 1.
      const confirmed = (body.length > 0 ? decodeToInt(body, 0).value : 0) !== 0;
      const room = currentGuestRoom();
      // The owner, or staff — the same rule that gives staff the room's edit
      // controls (`2587 controlRoom`), which is what offers CLEAR at all.
      if (!room || !live || (room.ownerId !== live.userId && !may("kick"))) {
        console.warn(`[${label}] ClearRoomItems refused — not in a room you own`);
        return;
      }
      if (!confirmed) {
        send(MSG.CONFIRM_CLEAR_ROOM, [], "ConfirmClearRoom (asking)");
        return;
      }
      // ⚠ Clearing MOVES the furniture, it does not destroy it — same rule as
      // "take away" on a single piece. Each item goes back to ITS OWNER, not to
      // whoever cleared the room, so a staff member tidying someone's room does
      // not end up owning their furniture. Unowned scenery simply ceases to
      // exist; there is no inventory to credit.
      const items = getRoomItems(currentRoomName!);
      const returned = new Map<number, number>();
      for (const item of items) {
        if (item.ownerId === null) continue;
        addItems(item.ownerId, [item.typeCode], ITEM_CATEGORY.items);
        returned.set(item.ownerId, (returned.get(item.ownerId) ?? 0) + 1);
      }
      clearRoomItems(currentRoomName!);
      for (const occupant of occupantsOf(currentRoomName!)) {
        for (const item of items) {
          occupant.send(MSG.REMOVE_ELEMENT, [{ int: item.ref }], undefined);
        }
      }
      // Same as pick-up: the grid only changes if we resend it — and for EVERY
      // owner who got something back and is online, not just whoever cleared.
      for (const ownerId of returned.keys()) liveByUser.get(ownerId)?.refreshInventory();
      console.log(
        `[${label}] room ${room.id} cleared: ${items.length} item(s) -> ` +
          `${[...returned].map(([id, n]) => `${n} to user ${id}`).join(", ") || "none (all unowned)"}`,
      );
      return;
    }

    if (command === CMD.SELL_ROOM) {
      // `int roomId, int confirm`. 0 asks for the confirm dialog, 1 does it.
      let at = 0;
      const first = decodeToInt(body, at);
      at = first.next;
      const roomId = first.value;
      const confirmed = at < body.length ? decodeToInt(body, at).value !== 0 : false;

      const room = getGuestRoom(roomId);
      if (!room || !live || room.ownerId !== live.userId) {
        console.warn(`[${label}] SellRoom refused for ${roomId} — not owned by this player`);
        return;
      }
      if (!confirmed) {
        send(
          MSG.ROOM_SELL_CONFIRM,
          [{ int: room.id }, { str: room.name }, { int: ROOM_REFUND }],
          `RoomSellConfirm ${room.id} "${room.name}" refund=${ROOM_REFUND}`,
        );
        return;
      }
      // If they are standing in it, get them out first — the room is about to
      // stop existing, and leaving them there would strand them.
      if (currentRoomName === `guest:${room.id}`) {
        enterRoom(LANDING_ROOM_CODE);
      }
      const credits = deleteGuestRoom(room.id, ROOM_REFUND);
      console.log(
        `[${label}] room ${room.id} "${room.name}" sold for ${ROOM_REFUND}; owner now holds ${credits}`,
      );
      send(
        MSG.ROOM_SOLD,
        [{ int: room.id }, { int: ROOM_REFUND }],
        `RoomSold ${room.id} refund=${ROOM_REFUND}`,
      );
      return;
    }

    if (command === CMD.EDIT_ROOM_INFO || command === CMD.EDIT_ROOM_INFO_BY_ID) {
      // Renaming a guest room. Two senders, two shapes:
      //   594 (room info tab)   canned name, canned description
      //   37  (navigator)       int roomId, int n, canned name,
      //                         int m, canned description
      // The outer counts in 37 duplicate the ones inside each canned block, so
      // they are read and discarded.
      let offset = 0;
      const readInt = () => {
        const { value, next } = decodeToInt(body, offset);
        offset = next;
        return value;
      };
      const readStr = () => {
        const { value, next } = readClientString(body, offset);
        offset = next;
        return value;
      };
      /** One canned block: its own count, then that many tokens. */
      const readCanned = (maxChars: number): string => {
        const count = readInt();
        if (!Number.isFinite(count) || count <= 0 || count > 512) return "";
        const tokens: ChatToken[] = [];
        for (let i = 0; i < count && offset < body.length; i++) {
          const token = readInt();
          if (token === 0 || token === -2) tokens.push({ kind: "text" as const, text: readStr() });
          else if (token === -1000) tokens.push({ kind: "word" as const, index: readInt(), capitalised: true });
          else if (token === -1001) tokens.push({ kind: "break" as const });
          else if (token > 0) tokens.push({ kind: "word" as const, index: token, capitalised: false });
          else tokens.push({ kind: "censored" as const, length: Math.min(64, -token) });
        }
        // ⚠ Stored and listed to every navigator, so held to the client's own
        // field sizes. Plain text, as BUY_ROOM stores: `tokensToText` is the
        // debug rendering and persisted `<word:N>` into room names.
        return tokensToPlainText(clampCanned(tokens, maxChars)).trim().slice(0, maxChars);
      };

      const byId = command === CMD.EDIT_ROOM_INFO_BY_ID;
      const targetId = byId ? readInt() : undefined;
      if (byId) readInt(); // outer name count — duplicated inside the block
      const newName = readCanned(ROOM_NAME_MAX);
      if (byId) readInt(); // outer description count
      const newDesc = readCanned(ROOM_DESC_MAX);

      // Which room? Either the one named, or the one we are standing in.
      const room = targetId !== undefined ? getGuestRoom(targetId) : currentGuestRoom();

      if (!room) {
        console.warn(`[${label}] EditRoomInfo: no guest room to edit (target=${targetId ?? "current"})`);
        return;
      }
      // Only the owner may rename a room — the client hides the controls, but
      // the client is not where that decision belongs.
      if (!live || room.ownerId !== live.userId) {
        console.warn(
          `[${label}] EditRoomInfo refused: ${live?.username ?? "(no session)"} does not own room ${room.id}`,
        );
        return;
      }

      const updated = updateGuestRoom(room.id, newName || room.name, newDesc);
      if (!updated) return;
      console.log(`[${label}] room ${updated.id} renamed to "${updated.name}" desc="${updated.description}"`);
      // ⚠ PLAIN strings here — 2796 does not use canned text, unlike 2587.
      send(
        MSG.GUEST_ROOM_INFO_UPDATE,
        [
          { int: updated.id },
          { str: updated.name },
          { str: updated.description },
          { int: 0 }, // accessibility: open
        ],
        `GuestRoomInfoUpdate ${updated.id} "${updated.name}"`,
      );
      return;
    }

    if (command === CMD.SEND_EMOTICON) {
      // One int: the emoticon the player double-clicked in the grid. The client
      // draws it above the avatar as `emoticon_<id>` for as long as action slot
      // 3 carries it, so the server has to clear it — nothing reports an end.
      const id = body.length > 0 ? decodeToInt(body, 0).value : 0;
      if (id <= 0) return;
      if (emoticonTimer) clearTimeout(emoticonTimer);
      emoticon = id;
      console.log(`[${label}] emoticon ${id}`);
      sendPulse(currentTile, LEGS_STAND); // same tile: a pose change, not a move
      emoticonTimer = setTimeout(() => {
        emoticonTimer = undefined;
        emoticon = 0;
        sendPulse(currentTile, LEGS_STAND);
      }, EMOTICON_MS);
      return;
    }

    if (command === CMD.START_ACTION || command === CMD.STOP_ACTION) {
      // Emotes. Body is one int: 0 = dance, 1 = wave
      // (`CEmoticons.eventProcEmoticons`). Dance is a toggle the player ends
      // with STOP_ACTION; wave is one-shot and nothing reports its end, so the
      // server clears it — otherwise the arm stays up forever.
      const action = body.length > 0 ? decodeToInt(body, 0).value : 0;
      const starting = command === CMD.START_ACTION;

      if (action === EMOTE_DANCE) {
        dancing = starting;
      } else if (action === EMOTE_WAVE) {
        if (waveTimer) clearTimeout(waveTimer);
        waving = starting;
        if (starting) {
          waveTimer = setTimeout(() => {
            waveTimer = undefined;
            waving = false;
            sendPulse(currentTile, LEGS_STAND);
          }, WAVE_MS);
        }
      } else {
        console.log(`[${label}] ${starting ? "StartAction" : "StopAction"} ${action} — unknown emote`);
        return;
      }

      console.log(
        `[${label}] ${starting ? "start" : "stop"} ` +
          `${action === EMOTE_DANCE ? "dance" : "wave"} (dancing=${dancing} waving=${waving})`,
      );
      // Same tile: a pose change, not a move.
      sendPulse(currentTile, LEGS_STAND);
      // Waving down the Gator Waiter from a Blue Bayou table.
      if (starting && action === EMOTE_WAVE && currentRoomName) {
        waiters.get(currentRoomName)?.waved(characterName, currentTile);
      }
      return;
    }

    if (command === CMD.PRIVATE_SPACE_REQUEST) {
      // ⚠ NOT the path the navigator uses. `CGuestRoomNavigator` sends guest
      // rooms through PUBLIC_SPACE_REQUEST (31) like any other space — see the
      // guest-room branch there, which is what actually runs when you click
      // your room. This handler exists for callers that do use 30; it shares
      // the same resolution so both behave identically.
      const requested = body.length > 0 ? decodeToInt(body, 0).value : 0;
      const room = getGuestRoom(requested);
      if (!room) {
        console.warn(
          `[${label}] PRIVATE_SPACE_REQUEST for unknown space ${requested} — ignoring`,
        );
        return;
      }
      // A guest room is its OWN space that happens to be built from a public
      // room's casts. Two players who pick the same style each get their own
      // room, so the style only decides which casts the client loads — the
      // occupancy, and later the furniture, belong to the room id.
      console.log(
        `[${label}] PRIVATE_SPACE_REQUEST ${room.id} "${room.name}" ` +
          `(style ${room.style} = ${ROOM_NAMES.get(room.style) ?? "?"}) owner=${room.ownerId}`,
      );
      enterGuestRoom(room);
      return;
    }

    if (command === CMD.GET_OWN_SPACES || command === CMD.FRIEND_SPACES) {
      // The guest-room navigator's "my rooms" / "friends' rooms" tabs. Neither
      // carries a body (observed: 0 bytes).
      //
      // An empty list is a real answer, not a non-answer: `spaceListSearch`
      // calls `NoResults()` when the count is 0, which is what makes the window
      // say so instead of sitting half-open waiting.
      const own = command === CMD.GET_OWN_SPACES;
      // Own: every room this player has — registration's plus any bought in the
      // shop. Friends': every room owned by someone on their friend list.
      const rooms = !live ? [] : own ? getRoomsOwnedBy(live.userId) : getFriendsRooms(live.userId);
      const params: OutgoingParam[] = [{ int: rooms.length }];
      for (const room of rooms) params.push(...guestSpaceEntry(room, live?.userId));
      send(
        own ? MSG.SPACE_LIST_OWN : MSG.SPACE_LIST_FRIENDS,
        params,
        `${own ? "OwnSpaces" : "FriendSpaces"} ${rooms.length}` +
          `${rooms.length ? ` (${rooms.map((r: GuestRoom) => `${r.id}:"${r.name}"`).join(", ")})` : ""}`,
      );
      return;
    }

    if (command === CMD.NODE_INSTANCES) {
      // Body is one int: the space the navigator is asking about.
      const spaceId = body.length > 0 ? decodeToInt(body, 0).value : LANDING_ROOM_CODE;
      // We run exactly one copy of every room, so report instance 0 with the
      // number of people actually standing in it — the navigator shows that as
      // the room's population.
      const here = visibleCount(ROOM_CODES.get(spaceId));
      send(
        MSG.INSTANCE_INFO,
        [
          { int: spaceId },
          { int: ROOM_MAX_USERS },
          { int: 1 }, // one instance
          { int: 0 }, // its id — matches the instance we name in 2584
          { int: here },
        ],
        `InstanceInfo space=${spaceId} instances=1 users=${here}`,
      );
      return;
    }

    if (command === CMD.INSTANCE_INFO_BY_TAG) {
      // Body: int tag — the landing room we handed the client in 2514.
      // Reply 2023 with the REAL room id. This is the handshake that finally
      // makes the client send PUBLIC_SPACE_REQUEST (31) and enter the world.
      const tagRead = body.length > 0 ? decodeToInt(body, 0) : { value: LANDING_ROOM_CODE, next: 0 };
      const requested = tagRead.value;
      // ⚠ The HM lobby sends 36 [1001] too (`CHMLobbyInterface.GetMoreGameRooms`),
      // from INSIDE room 1104, and reads the lobby shape back:
      // `spaceId, n, n×(instanceId, userPercentage)` (`CHMLobbyHandler.InstanceInfo`).
      // The navigator's 2023 listener reads that as spaceId/max/count=0 — harmless.
      // We run one instance; the spaceId is echoed in 31 by "go to room".
      if (currentRoomCode === HM_LOBBY_ROOM) {
        const here = visibleCount(ROOM_CODES.get(HM_LOBBY_ROOM));
        const pct = Math.min(100, Math.round((here * 100) / ROOM_MAX_USERS));
        send(
          MSG.INSTANCE_INFO,
          [{ int: HM_LOBBY_ROOM }, { int: 1 }, { int: 0 }, { int: pct }],
          `InstanceInfo (HM lobby) space=${HM_LOBBY_ROOM} instances=1 users=${pct}%`,
        );
        return;
      }
      // Never hand back a room with nothing to draw: the client resolves the
      // room's casts itself and hangs the load bar forever if one is missing.
      const roomId = ROOM_IDS.includes(requested) ? requested : LANDING_ROOM_CODE;
      if (roomId !== requested) {
        console.warn(
          `[${label}] InstanceInfoByTag tag=${requested} is not loadable — answering ${roomId}`,
        );
      }
      send(MSG.INSTANCE_INFO, [{ int: roomId }], `InstanceInfo room=${roomId} (tag=${requested})`);
      return;
    }
    if (command === CMD.PUBLIC_SPACE_REQUEST) {
      // Body: int spaceId, int instanceId (-1 = any). We map spaceId straight
      // onto a room code, so the navigator must only ever advertise spaceIds
      // that exist as `room.code.<N>` in external_variables_casts.txt.
      const first = body.length > 0 ? decodeToInt(body, 0) : { value: LANDING_ROOM_CODE, next: 0 };
      const instance = first.next < body.length ? decodeToInt(body, first.next).value : -1;
      // The value IS the room code. That is settled — the navigator advertises
      // `spaceId = tag = room code`, and the client echoes it back unchanged.
      //
      // A ROOM CODE READING MUST WIN OVER ANY REINTERPRETATION. The synthetic
      // "tag" branch used to run first and swallowed every four-digit code (see
      // the note where roomCodeForSpaceTag was removed). Only ids with no
      // `room.code.<N>` may be remapped, which is what SPACE_ID_TO_ROOM is for.
      const isRoomCode = ROOM_CODES.has(first.value);
      const viaSpaceId = isRoomCode ? null : SPACE_ID_TO_ROOM.get(first.value) ?? null;
      const how = isRoomCode ? "ROOM CODE" : viaSpaceId !== null ? "DISNEY SPACE ID" : "unknown";
      const resolved = isRoomCode ? first.value : viaSpaceId ?? first.value;
      // ⚠ Never send the client to a room with nothing to render. `_EnterRoom`
      // hands the code over and the client resolves `room.cast.<N>.*` itself —
      // if a listed cast is absent it never fetches and the load bar hangs
      // forever, with nothing on the wire to explain it.
      //
      // serve-shockwave now strips unresolvable casts from the config before it
      // is served, so a partially-present room is safe to enter; ROOM_IDS holds
      // the rooms that still have a space cast to draw. See roomIsLoadable.
      // ⚠ GUEST ROOMS ARRIVE HERE TOO, not on PRIVATE_SPACE_REQUEST (30).
      // `CGuestRoomNavigator.eventProcGuestRooms` does
      // `send(31, [#integer: tSelectedRoomID, #integer: -1])` — the same
      // command as a public room, carrying the id we advertised in the space
      // list. Without this branch a guest room id is "not a room code", falls
      // through to the landing-room fallback, and clicking your own room
      // quietly dumps you in the Esplanade.
      const guestRoom = getGuestRoom(resolved);
      if (guestRoom) {
        console.log(
          `[${label}] PUBLIC_SPACE_REQUEST raw=${first.value} -> guest room ${guestRoom.id} ` +
            `"${guestRoom.name}" (style ${guestRoom.style} = ${ROOM_NAMES.get(guestRoom.style) ?? "?"})`,
        );
        enterGuestRoom(guestRoom);
        return;
      }

      // Minigames: refuse the request outright rather than redirect. Sending
      // the landing room instead would silently teleport a player who clicked
      // "Pirates" into the Esplanade, which reads as a bug; leaving them where
      // they are and saying why is the honest behaviour.
      const blocked = BLOCKED_ROOMS.get(resolved);
      if (blocked) {
        console.log(
          `[${label}] PUBLIC_SPACE_REQUEST raw=${first.value} -> room ${resolved} ` +
            `(${ROOM_NAMES.get(resolved) ?? "?"}) is BLOCKED — ${blocked} minigame not implemented`,
        );
        // Drop any load state the click may have started, then explain.
        send(MSG.CANCEL_ROOM_LOAD, [], "CancelRoomLoad (blocked minigame)");
        alertBlocked(blocked);
        return;
      }

      let roomCode = ROOM_CODES.has(resolved) ? resolved : LANDING_ROOM_CODE;
      if (!ROOM_IDS.includes(roomCode)) {
        console.log(
          `[${label}] room ${roomCode} (${ROOM_CODES.get(roomCode) ?? "?"}) has no loadable space cast — ` +
            `it would hang the load bar; sending ${LANDING_ROOM_CODE} instead`,
        );
        roomCode = LANDING_ROOM_CODE;
      }
      console.log(
        `[${label}] PUBLIC_SPACE_REQUEST raw=${first.value} interpreted as ${how} -> room ${roomCode} ` +
          `(${ROOM_NAMES.get(roomCode) ?? ROOM_CODES.get(roomCode) ?? "?"})`,
      );
      // A full room puts you in its line (room-entry-queue.ts). Staff walk in,
      // and the Monorail's platform/train buckets are not gated — they are
      // reached by riding, not from the navigator.
      const target = ROOM_CODES.get(roomCode);
      if (
        live &&
        target &&
        target !== currentRoomName &&
        !may("kick") &&
        roomCode !== MONORAIL_STATION &&
        roomCode !== MONORAIL_TRAIN &&
        requestEntry(live.userId, target, roomCode) === "queued"
      ) {
        // The client has already torn its room down for the loading screen,
        // so leave the old one here too — otherwise the avatar stands on in
        // everyone else's view while its owner waits in a queue.
        cancelMyTrade();
        stopWalking();
        stopMagic();
        if (me) {
          leaveRoom(currentRoomName, me.userId);
          me = null;
        }
        currentRoomName = undefined;
        currentRoomCode = undefined;
        return;
      }
      enterRoom(roomCode);
      return;
    }

    if (command === CMD.CANCEL_ROOM_QUEUE) {
      if (live) leaveEntryQueue(live.userId);
      return;
    }
    if (command === CMD.GET_FAST_PASS) {
      if (live) takeFastPass(live.userId);
      return;
    }
    if (command === CMD.DISCARD_FAST_PASS) {
      if (live) discardFastPass(live.userId);
      return;
    }
    if (command === CMD.GET_SOUND_PREFS) {
      // fx, music, ui, volume, tutorialState, tradeRequests. fx/music/ui on,
      // tutorial off (1 would drive the client into the tutorial flow).
      // Volume: the range is not pinned down — Director's own is 0-255 but
      // VMK's settings slider may be 0-100, so 100 is audible under either.
      send(
        MSG.GET_SOUND_SETTINGS,
        settingsParams(),
        settingsNote("on request"),
      );
      return;
    }
    // ⚠ 780 IS ALREADY HANDLED EARLIER, as SET_SOUND_SETTINGS — which persists
    // the six values and echoes them back. A second CMD.SET_SOUND_PREFS block
    // used to sit here logging and returning; it was dead (the first match
    // wins) and its "no reply expected" note was wrong: the reply is precisely
    // what applies the volume, via ResetRoomSound / ResetFXChannels.
    if (command === CMD.GET_POPULAR) {
      // spaceListPopular reads two independent lists, featured then ordinary.
      // The FIRST list is staff-featured rooms (`/feature`): the client marks
      // each `Featured` and draws the Mickey `eventroom_icon` on it, at the top.
      // Popular is the guest rooms with people in them, busiest first; a server
      // this size is usually empty at any given moment, so the list is topped
      // up with the newest rooms rather than showing nothing.
      const busiestFirst = (rooms: GuestRoom[]) =>
        rooms
          .map((room) => ({ room, users: visibleCount(`guest:${room.id}`) }))
          .sort((a, b) => b.users - a.users)
          .map((r) => r.room);
      const featured = busiestFirst(getFeaturedGuestRooms());
      const pool = getAllGuestRooms().filter((r) => !r.featured);
      const occupied = busiestFirst(pool).filter((r) => visibleCount(`guest:${r.id}`) > 0);
      const rooms = [...occupied, ...pool.filter((r) => !occupied.includes(r))].slice(0, POPULAR_ROOMS_MAX);
      const viewer = live?.userId;
      send(
        MSG.SPACE_LIST_POPULAR,
        [
          { int: featured.length },
          ...featured.flatMap((r) => guestSpaceEntry(r, viewer)),
          { int: rooms.length },
          ...rooms.flatMap((r) => guestSpaceEntry(r, viewer)),
        ],
        `spaceListPopular featured=${featured.length} rooms=${rooms.length} (${occupied.length} occupied)`,
      );
      return;
    }
    if (command === CMD.GET_POPULAR_BY_TYPE) {
      // The themed list an `open_navigator` exit asks for (2831 -> 830): the
      // guest rooms built in one style, busiest first.
      const roomType = body.length ? decodeToInt(body, 0).value : 0;
      const rooms = getAllGuestRooms()
        .filter((r) => r.style === roomType)
        .map((room) => ({ room, users: visibleCount(`guest:${room.id}`) }))
        .sort((a, b) => b.users - a.users)
        .map((r) => r.room)
        .slice(0, POPULAR_ROOMS_MAX);
      send(
        MSG.SPACE_LIST_ROOM_TYPE,
        [{ int: roomType }, { int: rooms.length }, ...rooms.flatMap((r) => guestSpaceEntry(r, live?.userId))],
        `spaceListRoomType type=${roomType} rooms=${rooms.length}`,
      );
      return;
    }
    if (command === CMD.QUERY_CAMERA) {
      // CInterfaceHandler.CameraStatus reads exactly one int and does nothing
      // else: 1 shows the message-bar camera icon, anything else hides it. We
      // have no camera, so 0. Cosmetic — this is not what gates room entry.
      // 1 once they own a camera (photos, see photo-server.ts).
      const cam = live ? getCamera(live.userId) : { hasCamera: false };
      send(MSG.CAMERA_STATUS, [{ int: cam.hasCamera ? 1 : 0 }], `CameraStatus hasCamera=${cam.hasCamera ? 1 : 0}`);
      // The client never asks for its sound preferences — measured: 781
      // GetSoundPrefs is never sent in a full session — so the server has to
      // push them. Until GetSoundSettings arrives the session has no `fx`
      // flag and every PlaySound() in the title is skipped, which is why the
      // client is completely silent. QUERY_CAMERA is the safe moment: it comes
      // from CInterfaceHandler, so the interface handlers (CSoundHandler among
      // them) have constructed and registered their listeners by now. Sending
      // earlier risks "Listener not found".
      send(
        MSG.GET_SOUND_SETTINGS,
        settingsParams(),
        settingsNote("pushed"),
      );
      return;
    }
    if (command === CMD.GET_ROOT_NODE || command === CMD.NAVIGATE_NODE) {
      // NAVIGATE_NODE carries the requested tag; GET_ROOT_NODE carries nothing.
      const requested = command === CMD.NAVIGATE_NODE && body.length > 0
        ? decodeToInt(body, 0).value
        : ROOT_NODE_TAG;
      const node = navigatorNode(requested);
      send(
        MSG.NAVIGATION_NODE_INFO,
        navigationNodeInfoParams(node),
        `navigationNodeInfo tag=${node.nodeTag} spaces=${node.spaces.length} children=${node.children.length}`,
      );
      return;
    }
    if (command === CMD_CLIENT_DEBUG) {
      // A channel for a PATCHED client to report what it will not tell us
      // otherwise. The crash dialog names nothing — `error_title`/`error_text`
      // are fixed strings — so the failing handler is invisible from here, and
      // every theory has had to be inferred from behaviour.
      //
      // Patch the client's error reporter to call:
      //   getConnection("VMK").send(999, [#str: <message> && <handler>])
      // and it lands here, verbatim, next to the send history dumped on
      // disconnect. Numeric command ids work — the catalogue uses `send(17, …)`
      // — and 999 is unused by any registered command table.
      const text = body.slice(0, LOG_BODY_MAX).replace(/\x02/g, " ").trim();
      console.log(`[${label}] *** CLIENT DEBUG: ${text || "(empty)"}`);
      return;
    }
    // Log the BYTES, not just the length. Working out an unimplemented
    // command's payload from the client's Lingo alone is guesswork until you
    // can check it against something real, and the body is the only evidence.
    // Only the head: a forged 1 MB body became ~9 MB of synchronous log.
    const head = body.slice(0, LOG_BODY_MAX);
    console.log(
      `[${label}] << command ${command} (${body.length}b body) — no handler yet` +
        `${head.length ? ` | ${[...head].map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")} | ${JSON.stringify(head)}` : ""}`,
    );
  };

  /*
   * ⚠ One WebSocket frame can carry ~200k five-byte messages, all handled
   * synchronously, so any per-message cost — a DB write, a broadcast, a log
   * line — was multiplied by that from a single send. The budget refills at
   * COMMAND_RATE a second up to COMMAND_BURST; a real client never comes close
   * (a login is a few dozen messages, play is a handful a second). Running out
   * means a script, and the connection is closed.
   */
  let commandBudget = COMMAND_BURST;
  let budgetCheckedAt = Date.now();
  let flooded = false;

  /**
   * Every client message goes through here. A handler that throws is logged and
   * the session carries on: before, nothing caught it and one bad message on
   * any connection took the whole server down for everyone.
   */
  const runClientMessage = (command: number, body: string): void => {
    if (flooded) return;
    const t = Date.now();
    commandBudget = Math.min(COMMAND_BURST, commandBudget + ((t - budgetCheckedAt) / 1000) * COMMAND_RATE);
    budgetCheckedAt = t;
    if (--commandBudget < 0) {
      flooded = true;
      console.warn(`[${label}] closing: over ${COMMAND_RATE} messages/s sustained (last command ${command})`);
      onClose("message flood");
      return;
    }
    try {
      handleMessage(command, body);
    } catch (err) {
      console.error(`[${label}] command ${command} failed (${body.length}b body): ${err instanceof Error ? err.stack ?? err.message : String(err)}`);
    }
  };

  /** Parse whole frames out of `text`, returning whatever is left over. */
  const drainFrames = (text: string): string => {
    let rest = text;
    for (;;) {
      const decoded = decodeClientMessage(rest);
      if (!decoded) return rest;
      rest = decoded.rest;
      runClientMessage(decoded.message.command, decoded.message.body);
      if (flooded) return "";
      // Message 11 flips the client into encrypted mode mid-stream, so anything
      // still buffered behind it is hex ciphertext, not plaintext frames.
      if (rc4) return rest;
    }
  };

  const pump = () => {
    if (!rc4) {
      const leftover = drainFrames(pending);
      pending = leftover;
      if (!rc4) return;
    }
    // Ciphertext is hex TEXT: two characters per plaintext byte. Decipher only
    // complete pairs — RC4 is a stream, so order and alignment both matter.
    const usable = pending.length - (pending.length % 2);
    if (usable > 0) {
      plain += Buffer.from(rc4.decipher(pending.slice(0, usable))).toString("latin1");
      pending = pending.slice(usable);
    }
    plain = drainFramesEncrypted(plain);
  };

  /** Same as drainFrames, but never re-enters handshake mode. */
  const drainFramesEncrypted = (text: string): string => {
    let rest = text;
    for (;;) {
      const decoded = decodeClientMessage(rest);
      if (!decoded) return rest;
      rest = decoded.rest;
      runClientMessage(decoded.message.command, decoded.message.body);
      if (flooded) return "";
    }
  };

  return {
    feed(chunk: Buffer) {
      const shown = maskTickets(chunk);
      console.log(`[${label}] << ${chunk.length}b ${hexPreview(shown)} | "${asciiPreview(shown)}"`);
      pending += chunk.toString("latin1");
      pump();
      // A message that never completes (or announces a huge length) would
      // otherwise buffer forever. Ciphertext is hex: two characters a byte.
      if (pending.length + plain.length > 2 * WS_MAX_GAME_FRAME) {
        pending = "";
        plain = "";
        onClose("unfinished message over the size limit");
      }
    },
    start() {
      if (started) return;
      started = true;
      console.log(`[${label}] session ${remote}: server pub ${dh.publicKeyHex}`);
      send(MSG.CONNECTION_READY, [{ str: dh.publicKeyHex }], "connectionReady");
      pump();
    },
    /**
     * Drop this connection's claim on the account, if it had one.
     *
     * Must run on socket close, or a user who disconnects stays "online"
     * forever and their next login looks like a duplicate that displaces a
     * connection which no longer exists.
     */
    release() {
      // What we last told this client, for pairing with a client-side crash.
      dumpRecentSends();
      // An in-flight walk is a repeating timer holding this closure alive and
      // writing to a dead socket, so it has to go with the connection.
      stopWalking();
      // Same for a coalesced inventory refresh still waiting to fire.
      if (itemListTimer) {
        clearTimeout(itemListTimer);
        itemListTimer = null;
      }
      // A trade partner must not be left in a window with nobody.
      cancelMyTrade();
      jcGame?.stop();
      jcGame = null;
      // A music-stage timer would fire into a dead socket.
      if (performance) {
        clearTimeout(performance.timer);
        performance = null;
      }
      if (me) {
        leaveRoom(currentRoomName, me.userId);
        me = null;
      }
      endLogin(loginLogId);
      loginLogId = 0;
      if (live) {
        if (currentRoomCode !== undefined) logRoomMove("left", live.userId);
        fwLobbyLeave(live.userId);
        potcLobbyLeave(live.userId);
        hmLobbyLeave(live.userId);
        if (messengerPeer) messengerOffline(live.userId, messengerPeer);
        messengerPeer = null;
        releaseUserConnection(live);
        live = null;
      }
    },
  };
}

function handleHttpConnection(socket: Socket, initial: Buffer) {
  const req = parseHttpRequest(initial);
  if (!req) {
    socket.destroy();
    return;
  }

  // ⚠ Both throw on hostile input — a broken `%` escape (`/%E0%A4%A`) or a
  // path like `//[` — and an uncaught throw here kills the whole server.
  let url: URL;
  let pathname: string;
  try {
    url = new URL(req.path, `http://127.0.0.1:${PORT}`);
    pathname = decodeURIComponent(url.pathname);
  } catch {
    sendHttp(socket, 400, "Bad request");
    return;
  }
  console.log(`[http] ${req.method} ${pathname}`);

  if (
    req.method === "GET" &&
    req.headers.upgrade?.toLowerCase() === "websocket" &&
    req.headers["sec-websocket-key"]
  ) {
    // The PLAYER's address. Behind a reverse proxy the socket is the proxy's;
    // the upgrade request carries the real one (client-ip.ts). Everything the
    // staff see — login log, online users, trades — derives from `remote`.
    const remote = remoteLabel(clientIp(socket.remoteAddress, req.headers), socket.remotePort);
    console.log(`[ws] upgrade ${remote} ${pathname}`);
    acceptWebSocket(socket, req.headers["sec-websocket-key"]);
    // The camera's photo transfer is a second socket (photo-server.ts).
    // `endsWith`, not `===`: behind a reverse proxy the client's game URL is
    // e.g. wss://host/game, so the camera asks for /game/photo.
    if (pathname === "/photo" || pathname.endsWith("/photo")) handlePhotoConnection(socket, req.body, remote);
    else handleWebSocketGameConnection(socket, req.body, remote);
    return;
  }

  if (req.method === "OPTIONS") {
    sendHttp(socket, 204, "");
    return;
  }

  // The web server registers each ticket it mints (auth.ts issueTicketFor);
  // what is registered is what GetSec hands back, so only it may.
  if (req.method === "POST" && pathname === "/dev/register") {
    if (!hasBridgeSecret(req.headers)) {
      console.warn("[dev] register refused: no bridge secret");
      sendHttp(socket, 403, "forbidden");
      return;
    }
    try {
      const json = JSON.parse(req.body.toString("utf8") || "{}") as { userId?: number; ticket?: string; loginName?: string };
      const userId = Number(json.userId ?? 1);
      const ticket = String(json.ticket ?? md5Ticket());
      const loginName = String(json.loginName ?? `Guest${userId}`);
      // (A ticket -> user map used to be filled here too: never read, and one
      // entry per /play load, forever. Logins resolve tickets from the DB.)
      sessions.set(userId, { userId, ticket, loginName });
      console.log(`[dev] registered userId=${userId}`);
      sendHttp(socket, 200, JSON.stringify({ ok: true, userId }), "application/json");
    } catch (err) {
      sendHttp(socket, 400, String(err));
    }
    return;
  }

  if (req.method === "GET" && pathname === "/health") {
    sendHttp(socket, 200, JSON.stringify({ ok: true, port: PORT, sessions: sessions.size }), "application/json");
    return;
  }

  if (pathname.startsWith("/hk-bridge/")) {
    const action = pathname.slice("/hk-bridge/".length);
    // `parseHttpRequest` sees only the first packet; a client may send the
    // body in a second write, so wait for Content-Length bytes.
    const need = Math.min(Number(req.headers["content-length"] ?? 0) || 0, 64 * 1024);
    if (req.body.length >= need) {
      handleHkBridge(socket, req.method, action, req.headers, req.body.subarray(0, need));
      return;
    }
    let body = req.body;
    socket.on("data", (chunk: Buffer) => {
      body = Buffer.concat([body, chunk]);
      if (body.length < need) return;
      socket.removeAllListeners("data");
      handleHkBridge(socket, req.method, action, req.headers, body.subarray(0, need));
    });
    return;
  }

  const getSecMatch = pathname.match(/^\/GetSec\/([^/]+)\/(\d+)\/?$/i);
  if (req.method === "GET" && getSecMatch) {
    const [, uuid, userIdStr] = getSecMatch;
    const userId = Number(userIdStr);
    if (!SHOCKWAVE_GETSEC || uuid?.toLowerCase() !== GETSEC_UUID) {
      sendHttp(socket, 404, "not found");
      return;
    }
    // Only the web server may ask: it alone knows whose session is calling.
    if (!hasBridgeSecret(req.headers)) {
      console.warn(`[GetSec] refused userId=${userId}: no bridge secret`);
      sendHttp(socket, 403, "forbidden");
      return;
    }
    const blob = buildGetSecBlob(userId);
    console.log(`[GetSec] userId=${userId} -> ${blob.length}b (${process.env.VMK_GETSEC_MODE ?? "ticket"})`);
    sendHttp(socket, 200, blob, "application/octet-stream");
    return;
  }

  if (req.method === "GET" && /^\/GetStats\/?$/i.test(pathname)) {
    sendHttp(
      socket,
      200,
      JSON.stringify({ online: sessions.size, rooms: 0, uptime: Math.floor(process.uptime()) }),
      "application/json",
    );
    return;
  }

  const getUserMatch = pathname.match(new RegExp(`^/${SECURE_API_UUID}/GetUser/(\\d+)/?$`, "i"));
  if (req.method === "GET" && getUserMatch) {
    const userId = Number(getUserMatch[1]);
    const session = ensureSession(userId);
    sendHttp(
      socket,
      200,
      JSON.stringify({ id: userId, loginName: session.loginName, username: session.loginName, coins: 1000 }),
      "application/json",
    );
    return;
  }

  console.log(`[http] unhandled ${req.method} ${pathname}`);
  sendHttp(socket, 404, `unhandled: ${pathname}`);
}

/** A live player as Housekeeping lists them. */
function describeLive(conn: LiveConnection) {
  const room = conn.roomName();
  const guest = room?.startsWith("guest:") ? getGuestRoom(Number(room.slice("guest:".length))) : undefined;
  const code = conn.roomCode();
  return {
    userId: conn.userId,
    username: conn.username,
    name: conn.characterName(),
    room: room ?? null,
    roomId: guest?.id ?? code ?? null,
    roomTitle: guest ? guest.name : code !== undefined ? (ROOM_NAMES.get(code) ?? ROOM_CODES.get(code) ?? `Room ${code}`) : null,
    guestRoom: Boolean(guest),
    ip: ipOf(conn.remote),
  };
}

/**
 * HOUSEKEEPING'S HANDS IN THE GAME. The /hk portal runs in the asset server and
 * can change the database itself; anything that must reach a CONNECTED player
 * — an alert, a kick, a move, a credit or inventory refresh — happens here,
 * because only this process holds the sockets.
 *
 * ⚠ This port is the game's public socket port. Every call must present the
 * shared secret (staff-db.ts `bridgeSecret`), or anyone who can play could
 * kick everyone.
 */
/** Does this request carry the web server's shared secret (`X-HK-Secret`)? */
function hasBridgeSecret(headers: Record<string, string | undefined>): boolean {
  const presented = Buffer.from(String(headers["x-hk-secret"] ?? ""));
  const expected = Buffer.from(bridgeSecret());
  return presented.length === expected.length && timingSafeEqual(presented, expected);
}

function handleHkBridge(
  socket: Socket,
  method: string,
  action: string,
  headers: Record<string, string | undefined>,
  body: Buffer,
): void {
  const json = (status: number, value: unknown) =>
    sendHttp(socket, status, JSON.stringify(value), "application/json");
  if (!hasBridgeSecret(headers)) {
    console.warn(`[hk-bridge] refused ${method} ${action}: bad secret`);
    json(403, { ok: false, error: "forbidden" });
    return;
  }
  let input: Record<string, unknown> = {};
  try {
    input = body.length ? (JSON.parse(body.toString("utf8")) as Record<string, unknown>) : {};
  } catch {
    json(400, { ok: false, error: "bad json" });
    return;
  }
  const userId = Number(input.userId);
  const conn = Number.isInteger(userId) ? liveByUser.get(userId) : undefined;
  const text = typeof input.text === "string" ? input.text.slice(0, 2000) : "";

  switch (action) {
    case "online":
      json(200, { ok: true, users: [...liveByUser.values()].map(describeLive) });
      return;

    case "rooms": {
      // Public rooms a player can be sent to, with how many stand in each.
      const counts = new Map<number, number>();
      for (const c of liveByUser.values()) {
        const code = c.roomCode();
        if (code !== undefined && !c.roomName()?.startsWith("guest:")) counts.set(code, (counts.get(code) ?? 0) + 1);
      }
      const rooms = [...ROOM_CODES.keys()]
        .filter((code) => LOADABLE_ROOMS.has(code) && !BLOCKED_ROOMS.has(code) && ROOM_NAMES.has(code))
        .map((code) => ({ code, name: ROOM_NAMES.get(code)!, cast: ROOM_CODES.get(code), users: counts.get(code) ?? 0 }))
        .sort((a, b) => a.name.localeCompare(b.name));
      json(200, { ok: true, rooms });
      return;
    }

    case "alert": {
      // `target` only picks the dialog title: 0 "Personal Message from VMK
      // Staff", 3 "VMK Staff Alert to VMK".
      if (!text) return json(400, { ok: false, error: "no text" });
      const targets =
        input.all === true
          ? [...liveByUser.values()]
          : (Array.isArray(input.userIds) ? input.userIds : [userId])
              .map((id) => liveByUser.get(Number(id)))
              .filter((c): c is LiveConnection => c !== undefined);
      const title = input.all === true ? 3 : Number(input.title ?? 0) === 3 ? 3 : 0;
      for (const c of targets) {
        c.send(MSG.ADMIN_MESSAGE, [{ str: wireText(text) }, { int: title }], "AdminMessage (Housekeeping)");
      }
      json(200, { ok: true, delivered: targets.length });
      return;
    }

    case "kick": {
      if (!conn) return json(200, { ok: true, online: false });
      if (text) conn.send(MSG.ADMIN_MESSAGE, [{ str: wireText(text) }, { int: 0 }], "AdminMessage (kick reason)");
      // Give the alert a moment to leave before the socket goes.
      setTimeout(() => conn.disconnect("kicked by Housekeeping"), text ? 250 : 0);
      json(200, { ok: true, online: true });
      return;
    }

    case "credits": {
      if (!conn) return json(200, { ok: true, online: false });
      const credits = getUserById(userId)?.credits ?? 0;
      conn.send(MSG.RECEIVE_CREDITS, [{ int: credits }], `ReceiveCredits ${credits} (Housekeeping)`);
      json(200, { ok: true, online: true });
      return;
    }

    case "inventory": {
      if (!conn) return json(200, { ok: true, online: false });
      conn.refreshInventory();
      json(200, { ok: true, online: true });
      return;
    }

    case "move": {
      if (!conn) return json(200, { ok: false, error: "player is not online" });
      const spaceId = Number(input.roomId);
      const guestRoom = spaceId >= 100000 ? getGuestRoom(spaceId) : undefined;
      if (guestRoom) conn.goTo({ guestRoom });
      else if (ROOM_CODES.has(spaceId)) conn.goTo({ roomCode: spaceId });
      else return json(400, { ok: false, error: `no room ${input.roomId}` });
      json(200, { ok: true });
      return;
    }

    case "rename": {
      const name = typeof input.name === "string" ? input.name.trim() : "";
      const verdict = judgeCharacterName(name, userId);
      if (!verdict.ok) return json(200, { ok: false, error: verdict.info });
      renameCharacter(userId, name);
      conn?.rename(name);
      messengerRenamed(userId);
      json(200, { ok: true });
      return;
    }

    case "room-styles":
      // Only this process knows which room codes have loadable casts.
      json(200, { ok: true, styles: guestRoomStyles() });
      return;

    case "giveroom": {
      const target = Number.isInteger(userId) ? getUserById(userId) : undefined;
      if (!target) return json(200, { ok: false, error: "no such player" });
      const given = giveGuestRoom(target.id, target.character_name ?? target.username, Number(input.code), true);
      if (typeof given === "string") return json(200, { ok: false, error: given });
      console.log(`[hk-bridge] gave room ${given.id} (style ${given.style}) to ${target.username} (${target.id})`);
      json(200, { ok: true, room: { id: given.id, name: given.name, style: given.style } });
      return;
    }

    case "mail": {
      // Staff mail is the messenger's inbox: persisted, and delivered now if
      // they are online — only this process knows who is.
      if (!text) return json(400, { ok: false, error: "no text" });
      sendStaffMessage(userId, text);
      json(200, { ok: true, online: Boolean(conn) });
      return;
    }

    default:
      json(404, { ok: false, error: `unknown action ${action}` });
  }
}

/** A WebSocket TEXT frame (opcode 1): the photo socket's JSON. */
function encodeWebSocketTextFrame(text: string): Buffer {
  const frame = encodeWebSocketBinaryFrame(Buffer.from(text, "utf8"));
  frame[0] = 0x81;
  return frame;
}

function handlePhotoConnection(socket: Socket, initial: Buffer, remote: string) {
  // Opened by a client that is already in the game; it may sit unused a while.
  socket.setTimeout(IDLE_TIMEOUT_MS);
  let wsBuffer: Buffer = Buffer.from(initial);
  const session = createPhotoSession((json) => socket.write(encodeWebSocketTextFrame(json)), remote, {
    albumOwnerFor: (userId) => {
      const room = liveByUser.get(userId)?.roomName();
      if (!room?.startsWith("guest:")) return null;
      return getGuestRoom(Number(room.slice("guest:".length)))?.ownerId ?? null;
    },
    filmChanged: (userId, film) =>
      liveByUser.get(userId)?.send(MSG.FILM_COUNTER, [{ int: film }], `FilmCounter ${film}`),
    log: (line) => console.log(line),
  });
  const pump = () => {
    const { payloads, remaining, tooLarge } = decodeWebSocketFrames(wsBuffer, WS_MAX_PHOTO_FRAME);
    wsBuffer = remaining;
    for (const payload of payloads) session.feed(payload.toString("utf8"));
    if (tooLarge) {
      console.log(`[photo] closing ${remote}: frame over ${WS_MAX_PHOTO_FRAME} bytes`);
      socket.destroy();
    }
  };
  pump();
  socket.on("data", (chunk: Buffer) => {
    wsBuffer = Buffer.concat([wsBuffer, chunk]);
    pump();
  });
  socket.on("close", () => console.log(`[photo] closed ${remote}`));
  socket.on("error", (err) => console.log(`[photo] error ${remote}:`, err.message));
}

function handleWebSocketGameConnection(socket: Socket, initial: Buffer, remote: string) {
  let wsBuffer: Buffer = Buffer.from(initial);
  const session = createVmkSession(
    (payload) => socket.write(encodeWebSocketBinaryFrame(payload)),
    "ws",
    remote,
    Buffer.alloc(0),
    (reason) => {
      console.log(`[ws] closing ${remote}: ${reason}`);
      socket.destroy();
    },
    () => socket.setTimeout(IDLE_TIMEOUT_MS),
  );

  const pumpWs = () => {
    const { payloads, remaining, tooLarge } = decodeWebSocketFrames(wsBuffer, WS_MAX_GAME_FRAME);
    wsBuffer = remaining;
    for (const payload of payloads) {
      session.feed(payload);
    }
    if (tooLarge) {
      console.log(`[ws] closing ${remote}: frame over ${WS_MAX_GAME_FRAME} bytes`);
      socket.destroy();
    }
  };

  session.start();
  pumpWs();

  socket.on("data", (chunk: Buffer) => {
    wsBuffer = Buffer.concat([wsBuffer, chunk]);
    pumpWs();
  });

  socket.on("close", () => {
    console.log(`[ws] closed ${remote}`);
    session.release();
  });

  socket.on("error", (err) => {
    console.log(`[ws] error ${remote}:`, err.message);
  });
}

function handleTcpConnection(socket: Socket, initial: Buffer) {
  const remote = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`[tcp] connect ${remote}${initial.length ? ` (+${initial.length}b initial)` : ""}`);
  if (initial.length) {
    const shown = maskTickets(initial);
    console.log(`[tcp] << ${hexPreview(shown)} | "${asciiPreview(shown)}"`);
  }

  const session = createVmkSession(
    (payload) => socket.write(payload),
    "tcp",
    remote,
    initial,
    (reason) => {
      console.log(`[tcp] closing ${remote}: ${reason}`);
      socket.destroy();
    },
    () => socket.setTimeout(IDLE_TIMEOUT_MS),
  );
  session.start();

  socket.on("data", (chunk: Buffer) => session.feed(chunk));

  socket.on("close", () => {
    console.log(`[tcp] closed ${remote}`);
    session.release();
  });

  socket.on("error", (err) => {
    console.log(`[tcp] error ${remote}:`, err.message);
  });
}

export function startShockwaveGameServer(port = PORT): Server {
  ensureSession(1);
  loadRoomCodes();
  seedDarkRides(ROOM_CODES.get(DARK_RIDE_COURTYARD));
  seedPublicFurni((code) => ROOM_CODES.get(code));

  const server = net.createServer((socket) => {
    let mode: "pending" | "http" | "tcp" = "pending";
    // Silence closes the socket: LOGIN_TIMEOUT_MS until the game login is
    // accepted (an HTTP request is answered well within it), IDLE_TIMEOUT_MS
    // after (createVmkSession's onLogin). Without this a connection that never
    // sends anything stays open forever, and anyone can hold thousands.
    socket.setTimeout(LOGIN_TIMEOUT_MS);
    socket.on("timeout", () => {
      console.log(`[conn] ${socket.remoteAddress}:${socket.remotePort} idle — closing`);
      socket.destroy();
    });

    const startTcp = (initial: Buffer) => {
      if (mode !== "pending") return;
      mode = "tcp";
      socket.removeAllListeners("data");
      handleTcpConnection(socket, initial);
    };

    const tcpFallback = setTimeout(() => startTcp(Buffer.alloc(0)), 100);

    socket.on("data", (chunk: Buffer) => {
      if (mode === "tcp") return;
      clearTimeout(tcpFallback);

      if (mode === "pending") {
        const head = chunk.subarray(0, Math.min(chunk.length, 8)).toString("utf8");
        if (head.startsWith("GET ") || head.startsWith("POST ") || head.startsWith("HEAD ") || head.startsWith("OPTIONS ")) {
          mode = "http";
          socket.removeAllListeners("data");
          handleHttpConnection(socket, chunk);
          return;
        }
        startTcp(chunk);
        return;
      }
    });

    socket.on("error", (err) => console.log("[conn] error:", err.message));
  });

  // VMK_HOST=0.0.0.0 to accept other machines (Docker sets it). The default
  // keeps a local install invisible to the network.
  const host = process.env.VMK_HOST ?? "127.0.0.1";
  server.listen(port, host, () => {
    console.log(`VMK game server listening on http://${host}:${port}`);
    console.log(`  GetSec:  /GetSec/${GETSEC_UUID}/{userId}`);
    console.log(`  Dev:     POST /dev/register  {userId,ticket}`);
    console.log(`  TCP/WS:  VMK handshake (message 2001 connectionReady + DH public key)`);
    console.log(`  GetSec mode: ${process.env.VMK_GETSEC_MODE ?? "cast"} (env VMK_GETSEC_MODE)`);
    console.log(
      `  Chat filter: ${CHAT_CENSOR ? "ON — unrecognised words become ***" : "OFF — free text passes through"}` +
        ` (env VMK_CHAT_CENSOR=off to disable)`,
    );
    // Where registration drops a brand-new player. Printed because getting it
    // wrong presents as "registration sent me to the wrong room", not as a
    // configuration mistake.
    console.log(
      `  Landing room: ${LANDING_ROOM_CODE} ` +
        `(${ROOM_NAMES.get(LANDING_ROOM_CODE) ?? ROOM_CODES.get(LANDING_ROOM_CODE) ?? "?"})` +
        `${ROOM_IDS.includes(LANDING_ROOM_CODE) ? "" : "  ⚠ NOT ADVERTISABLE — check its casts"}`,
    );
  });

  return server;
}

// Run when this file IS the entry point.
//
// This used to test `process.argv[1].includes("shockwave-game-server")`, i.e. it
// was keyed to the filename. Renaming the file to mus-server.ts made the server
// silently do nothing -- it started, matched no branch, and exited 0 with no
// output, which reads as "started fine" to anything watching the process.
// Compare resolved paths instead so a rename cannot disable the server again.
const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
const thisPath = fileURLToPath(import.meta.url);
const stripExt = (p: string) => p.replace(/\.(ts|js|mjs|cjs)$/i, "");
if (invokedPath && stripExt(invokedPath) === stripExt(thisPath)) {
  startShockwaveGameServer();
}





