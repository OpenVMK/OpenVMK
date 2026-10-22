// Build assets/room-exits.json: where each public room's doorways lead.
//
// ⚠ NOTHING IN THE CLIENT KNOWS THIS. An exit tile is just a tile with CLASS
// "exit"; clicking it sends `move` (581) with the tile ref like any other, and
// the original server decided what happened next. So this table is authored:
// from disneysonlineworlds.com's "Exploring VMK" pages (which name exits as
// "Top Left – Tiki Island"), matched against the room art with
// `tools/render-room-doorways.mjs` (view logs/room-doorways.html through the
// `repo-static` launch config, http://localhost:5190/logs/room-doorways.html).
//
// A doorway is named by ONE of its tile refs (`at`) — the cluster of exit tiles
// that touch it (see list-room-doorways.mjs). Refs are stable across
// re-extraction; cluster indices are not.
//
// Destinations:
//   to: <code>        enter that room; you arrive at ITS doorway leading back
//                     here, or at `arrive` (a ref in the destination) if given
//   to: "back"        the public room you came from (monorail, guest rooms)
//   to: "same"        a hop within this room, to the doorway containing `arrive`
//   navigator: <code> open the themed guest-room list for that room type
//                     (`2831 SpaceListRoomTypeTrigger`) instead of moving
//   flag: "..."       the match is inferred, not confirmed by the guide
//
// Rooms with no entry here (guest rooms and the minor public ones) send every
// exit "back"; see server/src/room-exits.ts.
//
//   node tools/build-room-exits.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { doorwaysOf } from "./list-room-doorways.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const geometry = JSON.parse(readFileSync(join(ROOT, "assets", "room-geometry.json"), "utf8")).rooms;
const OUT = join(ROOT, "assets", "room-exits.json");

// Room codes (docs/ROOM-CODES.md).
const C = {
  skullRock: 0, tikiRoom: 1, centralPlaza: 2, townSquare: 3, mainStreet: 4, bazaar: 5, elephantPool: 6,
  tikiIsland: 7, forbiddenTemple: 8, explorersTent: 9, lostSafari: 10, jungleDock: 11, dungeon: 13,
  monorailStation: 14, monorailTrain: 15, shrunkenNeds: 16, castleGardens: 30, gallery: 31, spellRoom: 32,
  matterhorn: 33, banquetHall: 34, castleForecourt: 35, treehouse: 36, snowWhite: 37, smallWorldShop: 38,
  inTheSky: 39, storybookland: 40, vmkCentral: 41, musicLobby: 42, emporium: 43, horseshoe: 44,
  innerSpaceShop: 45, discoveryIsland: 46, tomorrowlandHub: 47, esplanade: 48, splashMountain: 49,
  bootHill: 51, steamboat: 57, frontierlandHub: 58, frontierlandDock: 59, stretchingRoom: 60,
  bigThunder: 61, btMine: 62, injunJoe: 63, tomSawyer: 64, ballroom: 65, attic: 66, splashBayou: 67,
  markTwainGuest: 68, sciFi: 72, questDeck: 73, spaceRace: 74, mars: 75, captainsQuarters: 76,
  questTrack: 77, shipwreck: 78, rayRoom: 80, shrinkingMachine: 81, nautilusGrotto: 82, waterparkPool: 85,
  treasureRoom: 88, newOrleans: 95, vmkGallery: 96, blueBayou: 97, fantasylandCourtyard: 99,
  rabbitHole: 101, darlingsNursery: 106, pennyArcade: 140, piratesLobby: 1001, fireworksLobby: 1100,
  musicGame: 1103, hmLobby: 1104, magicShop: 1108, checkers: 1109,
};

/** code -> { cast, exits } */
const AUTHORED = {
  // ---------------------------------------------------------- Main Street --
  [C.centralPlaza]: { cast: "hub2", exits: [
    { at: 1, to: C.magicShop, label: "Main Street Magic Shop" },
    { at: 560, to: C.mainStreet, label: "Main Street" },
    { at: 159, to: C.bazaar, label: "Adventureland Bazaar" },
    { at: 266, to: C.castleForecourt, label: "Castle Forecourt" },
    { at: 32, to: C.tomorrowlandHub, label: "Tomorrowland Hub" },
  ] },
  [C.mainStreet]: { cast: "musical_mainstreet", exits: [
    { at: 433, to: C.vmkCentral, label: "VMK Central" },
    { at: 17, to: C.pennyArcade, label: "Penny Arcade" },
    { at: 25, to: C.centralPlaza, label: "Central Plaza" },
    { at: 105, to: C.townSquare, label: "Town Square" },
    { at: 0, to: C.musicLobby, label: "Street Party Music Game Lobby" },
  ] },
  [C.townSquare]: { cast: "mainstreet_square", exits: [
    { at: 485, to: C.emporium, label: "Emporium" },
    { at: 0, to: C.esplanade, label: "VMK Esplanade" },
    { at: 266, to: C.mainStreet, label: "Main Street" },
    { at: 248, to: C.esplanade, label: "VMK Esplanade", flag: "stairs by the railing; not in the guide" },
  ] },
  [C.esplanade]: { cast: "vmk_esplanade", exits: [
    { at: 401, to: C.townSquare, label: "Town Square" },
    { at: 39, to: C.sciFi, label: "Sci-Fi Dine-In" },
    { at: 238, to: C.monorailStation, label: "Main Street Monorail Station", flag: "which of the two lower-right exits" },
    { at: 120, to: C.waterparkPool, label: "Waterpark Pool", flag: "hidden room; inferred from the pool's own exit" },
  ] },
  [C.vmkCentral]: { cast: "vmk_central", exits: [{ at: 1, to: C.mainStreet, label: "Main Street" }] },
  [C.sciFi]: { cast: "drivein", exits: [{ at: 411, to: C.esplanade, label: "VMK Esplanade" }] },
  [C.emporium]: { cast: "emporium", exits: [{ at: 112, to: C.townSquare, label: "Town Square" }] },
  [C.pennyArcade]: { cast: "penny_arcade", exits: [{ at: 0, to: C.mainStreet, label: "Main Street" }] },
  [C.musicLobby]: { cast: "musicmix", exits: [
    { at: 255, to: C.musicGame, label: "Street Party Music Game" },
    { at: 368, to: C.mainStreet, label: "Main Street" },
  ] },
  [C.musicGame]: { cast: "musicmix", exits: [
    { at: 255, to: C.musicLobby, label: "Street Party Music Game Lobby" },
    { at: 368, to: C.mainStreet, label: "Main Street" },
  ] },
  [C.magicShop]: { cast: "vmk_magic_shop", exits: [
    { at: 74, to: C.centralPlaza, label: "Central Plaza" },
    { at: 0, to: C.checkers, label: "Magic Shop Checkers Room" },
  ] },
  [C.checkers]: { cast: "vmk_checkers", exits: [
    { at: 9, to: C.magicShop, label: "Main Street Magic Shop" },
    { at: 0, to: C.magicShop, label: "Main Street Magic Shop" },
    // "Rooms not on the Map": Left / Right - "Another game of Main Street Magic
    // Shop Checkers". There is one checkers room here, so the next game is this
    // room again, walked into from the opposite side.
    { at: 230, to: "same", arrive: 35, label: "Another game of Checkers (left)", flag: "one checkers room; next game = same room" },
    { at: 35, to: "same", arrive: 230, label: "Another game of Checkers (right)" },
  ] },
  [C.waterparkPool]: { cast: "shark_reef", exits: [
    { at: 190, to: C.esplanade, label: "VMK Esplanade" },
    // Out of the water by the ladder: the layout NAMES the pairs. In the pool,
    // pool_exit_1/2 (148, 137, with 161 beside them); on the deck, pool_exit_3/4
    // (319, 304), at the dressing-room door, the only deck tiles linked to it.
    // This used to land on 376-378, the deck's bottom-left corner, going by the
    // wiki's "leads to bottom left of screen"; that is nowhere near the door.
    { at: 137, to: "same", arrive: [304, 319], label: "Out of the pool (ladder to the dressing room)" },
  ] },

  // ---------------------------------------------------------- Adventureland --
  [C.bazaar]: { cast: "bazaar", exits: [
    { at: 252, to: C.piratesLobby, label: "Pirates of the Caribbean Game Lobby" },
    { at: 33, to: C.jungleDock, label: "Jungle Cruise Dock" },
    { at: 12, to: C.shrunkenNeds, label: "Shrunken Ned's Shop" },
    { at: 0, to: C.centralPlaza, label: "Central Plaza" },
    { at: 157, to: C.treehouse, label: "Pirate Treehouse" },
  ] },
  [C.shrunkenNeds]: { cast: "shrunken_neds_shop", exits: [{ at: 214, to: C.bazaar, label: "Adventureland Bazaar" }] },
  [C.treehouse]: { cast: "treehouse", exits: [
    { at: 264, to: C.bazaar, label: "Walk the Plank to the Bazaar" },
    { at: 241, to: C.bazaar, label: "Adventureland Bazaar" },
    { at: 97, to: C.discoveryIsland, label: "Discovery Island" },
  ] },
  [C.discoveryIsland]: { cast: "kelloggs_pirate", exits: [{ at: 228, to: C.treehouse, label: "Pirate Treehouse" }] },
  [C.elephantPool]: { cast: "cambodian", exits: [
    { at: 14, to: C.jungleDock, label: "Jungle Cruise Dock" },
    { at: 12, to: C.tikiIsland, label: "Tiki Tiki Tiki Island" },
  ] },
  [C.jungleDock]: { cast: "dock", exits: [
    { at: 0, to: C.elephantPool, label: "Elephant Bathing Pool" },
    { at: 39, to: C.lostSafari, label: "Lost Safari Party" },
    { at: 126, to: C.bazaar, label: "Adventureland Bazaar" },
  ] },
  [C.tikiIsland]: { cast: "tiki", exits: [
    { at: 0, to: C.forbiddenTemple, label: "Forbidden Temple" },
    { at: 142, to: C.elephantPool, label: "Elephant Bathing Pool" },
  ] },
  [C.forbiddenTemple]: { cast: "indy", exits: [
    { at: 98, to: C.tikiIsland, label: "Tiki Tiki Tiki Island" },
    { at: 5, to: C.monorailStation, label: "Adventureland Monorail Station" },
    { at: 200, to: C.explorersTent, label: "Explorer's Tent" },
  ] },
  [C.explorersTent]: { cast: "tent", exits: [
    { at: 45, to: C.lostSafari, label: "Lost Safari Party" },
    { at: 109, to: C.forbiddenTemple, label: "Forbidden Temple" },
  ] },
  [C.lostSafari]: { cast: "safari", exits: [
    { at: 140, to: C.explorersTent, label: "Explorer's Tent" },
    { at: 0, to: C.jungleDock, label: "Jungle Cruise Dock" },
  ] },
  [C.piratesLobby]: { cast: "pirates_game_preshow", exits: [
    { at: 0, to: C.bazaar, label: "Adventureland Bazaar" },
    { at: 154, to: C.treasureRoom, label: "Pirates Treasure Room" },
  ] },
  [C.treasureRoom]: { cast: "treasure_room", exits: [{ at: 0, to: C.piratesLobby, label: "Pirates of the Caribbean Game Lobby" }] },

  // ---------------------------------------------------------- Frontierland --
  [C.frontierlandHub]: { cast: "frontierland_hub", exits: [
    { at: 59, to: C.frontierlandDock, label: "Frontierland Dock" },
    { at: 15, to: C.horseshoe, label: "Golden Horseshoe Mercantile" },
    { at: 253, navigator: C.bootHill, label: "Boot Hill Shooting Gallery rooms" },
    { at: 330, to: C.hmLobby, label: "Haunted Mansion Lobby" },
    { at: 176, to: C.castleForecourt, label: "Castle Forecourt" },
  ] },
  [C.horseshoe]: { cast: "horseshoe_shop", exits: [{ at: 251, to: C.frontierlandHub, label: "Frontierland Hub" }] },
  [C.frontierlandDock]: { cast: "pier", exits: [
    { at: 180, to: C.steamboat, label: "Mark Twain" },
    { at: 141, to: C.steamboat, label: "Mark Twain" },
    { at: 0, to: C.tomSawyer, label: "Tom Sawyer's Island" },
    { at: 341, to: C.frontierlandHub, label: "Frontierland Hub" },
    { at: 117, to: C.bigThunder, label: "Big Thunder Mountain" },
    { at: 216, to: C.bigThunder, label: "Big Thunder Mountain", flag: "second bottom-right exit" },
    { at: 172, navigator: C.markTwainGuest, label: "Mark Twain Steamboat rooms" },
  ] },
  [C.steamboat]: { cast: "steamboat", exits: [{ at: 198, to: C.frontierlandDock, label: "Frontierland Dock" }] },
  [C.tomSawyer]: { cast: "tom_sawyer", exits: [
    { at: 30, to: C.splashMountain, label: "Splash Mountain" },
    { at: 173, to: C.injunJoe, arrive: 260, label: "Injun Joe's Cave" }, // jump_h
    { at: 210, to: C.monorailStation, label: "Frontierland Monorail Station" },
    { at: 15, to: C.frontierlandDock, label: "Frontierland Dock" },
  ] },
  [C.splashMountain]: { cast: "splashmountain", exits: [
    { at: 121, navigator: C.splashBayou, label: "Splash Mountain ride rooms" },
    { at: 0, to: C.banquetHall, label: "Banquet Hall" },
    { at: 218, to: C.tomSawyer, label: "Tom Sawyer's Island" },
    { at: 61, to: C.banquetHall, label: "Banquet Hall" },
  ] },
  // The mine maze. Disney named every exit `jump_<tokens>`: each token links
  // exactly two exits (a↔?, b, c, … h, 1 … 7). A multi-token exit is the far
  // end of several jumps; the token it SENDS you along is the one the guide's
  // direction confirms.
  [C.bigThunder]: { cast: "thundermountain", exits: [
    { at: 67, to: C.btMine, label: "Big Thunder Mountain Mine", flag: "jump_a has no partner" },
    { at: 20, to: C.btMine, arrive: 37, label: "Big Thunder Mountain Mine" }, // jump_1_2 via 2
    { at: 69, to: C.injunJoe, arrive: 0, label: "Injun Joe's Cave" }, // jump_b_c via c
    { at: 83, to: C.injunJoe, arrive: 83, label: "Injun Joe's Cave" }, // jump_3_4 via 3
    { at: 92, to: C.btMine, arrive: 130, label: "Big Thunder Mountain Mine" }, // jump_f
    { at: 117, to: C.injunJoe, arrive: 130, label: "Injun Joe's Cave" }, // jump_g
    { at: 0, to: "same", arrive: 69, label: "Big Thunder Mountain (same room)" }, // jump_b
  ] },
  [C.btMine]: { cast: "cave1", exits: [
    { at: 245, to: "same", arrive: 0, label: "Mine (same room)" }, // jump_6
    { at: 168, to: C.injunJoe, arrive: 305, label: "Injun Joe's Cave" }, // jump_d
    { at: 160, to: "same", arrive: 130, label: "Mine (same room)" }, // jump_e
    { at: 130, to: C.bigThunder, arrive: 92, label: "Big Thunder Mountain" }, // jump_e_f via f
    { at: 37, to: C.bigThunder, arrive: 20, label: "Big Thunder Mountain" }, // jump_2
    { at: 0, to: C.bigThunder, arrive: 20, label: "Big Thunder Mountain" }, // jump_1_5_6_7 via 1
  ] },
  [C.injunJoe]: { cast: "cave2", exits: [
    { at: 83, to: C.bigThunder, arrive: 83, label: "Big Thunder Mountain" }, // jump_3
    { at: 0, to: C.bigThunder, arrive: 69, label: "Big Thunder Mountain" }, // jump_c
    { at: 305, to: C.btMine, arrive: 168, label: "Big Thunder Mountain Mine" }, // jump_d
    { at: 133, to: C.btMine, arrive: 0, label: "Big Thunder Mountain Mine" }, // jump_4_5 via 5
    { at: 130, to: C.bigThunder, arrive: 117, label: "Big Thunder Mountain" }, // jump_g
    { at: 260, to: C.tomSawyer, arrive: 173, label: "Tom Sawyer's Island" }, // jump_h
    { at: 165, to: C.btMine, arrive: 0, label: "Big Thunder Mountain Mine" }, // jump_7
  ] },
  [C.hmLobby]: { cast: "haunted_mansion_lobby", exits: [
    { at: 0, to: C.frontierlandHub, label: "Frontierland Hub" },
    { at: 270, to: C.stretchingRoom, label: "Haunted Mansion Stretching Room" },
    { at: 195, to: C.newOrleans, label: "New Orleans Square" },
  ] },
  [C.stretchingRoom]: { cast: "hm_level2_public", exits: [
    { at: 376, to: C.hmLobby, label: "Haunted Mansion Lobby" },
    { at: 0, to: C.ballroom, label: "Haunted Mansion Ballroom" },
  ] },
  [C.ballroom]: { cast: "hm_level3_public", exits: [
    { at: 1216, to: C.stretchingRoom, label: "Haunted Mansion Stretching Room" },
    { at: 748, to: C.attic, label: "Haunted Mansion Attic" },
  ] },
  [C.attic]: { cast: "hm_level4_public", exits: [
    { at: 1036, to: C.ballroom, label: "Haunted Mansion Ballroom" },
    { at: 705, to: C.monorailStation, label: "Frontierland Monorail Station" },
    { at: 1017, to: "same", arrive: 418, label: "Attic door (lower level)", flag: "which left exit is the door" },
    { at: 418, to: "same", arrive: 1017, label: "Attic door (upper level)" },
  ] },

  // ---------------------------------------------------- New Orleans Square --
  [C.newOrleans]: { cast: "new_orleans_square", exits: [
    { at: 136, to: C.hmLobby, label: "Haunted Mansion Lobby" },
    { at: 288, to: C.blueBayou, label: "Blue Bayou", flag: "door up the stairs; guide says Top Middle" },
    { at: 0, to: C.monorailStation, label: "New Orleans Square Monorail Station" },
    { at: 7, to: C.vmkGallery, label: "VMK Gallery" },
    { at: 135, to: C.hmLobby, label: "Haunted Mansion Lobby" },
  ] },
  [C.blueBayou]: { cast: "blue_bayou", exits: [{ at: 3, to: C.newOrleans, label: "New Orleans Square" }] },
  [C.vmkGallery]: { cast: "disney_gallery", exits: [{ at: 235, to: C.newOrleans, label: "New Orleans Square" }] },

  // ------------------------------------------------------------ Fantasyland --
  [C.castleForecourt]: { cast: "castle_courtyard", exits: [
    { at: 44, to: C.castleGardens, label: "Castle Gardens" },
    { at: 0, to: C.fantasylandCourtyard, label: "Fantasyland Courtyard" },
    { at: 6, to: C.centralPlaza, label: "Central Plaza" },
    { at: 353, to: C.frontierlandHub, label: "Frontierland Hub" },
  ] },
  [C.castleGardens]: { cast: "castle_moneyshot", exits: [
    { at: 0, to: C.gallery, label: "Gallery" },
    { at: 2, to: C.dungeon, label: "Dungeon" },
    { at: 37, to: C.castleForecourt, label: "Castle Forecourt" },
  ] },
  [C.gallery]: { cast: "castle_entrance", exits: [
    { at: 0, to: C.banquetHall, label: "Banquet Hall" },
    { at: 11, to: C.castleGardens, label: "Castle Gardens" },
    { at: 100, to: C.fireworksLobby, label: "Castle Fireworks Remixed Lobby" },
  ] },
  [C.banquetHall]: { cast: "castle_banquet", exits: [
    { at: 105, to: C.gallery, label: "Gallery" },
    { at: 63, to: C.splashMountain, label: "Splash Mountain" },
  ] },
  [C.dungeon]: { cast: "castle_dungeon", exits: [
    { at: 27, to: C.castleGardens, label: "Castle Gardens" },
    { at: 231, to: C.monorailStation, label: "Fantasyland Monorail Station" },
    { at: 0, to: C.fireworksLobby, label: "Castle Fireworks Remixed Lobby" },
  ] },
  [C.fireworksLobby]: { cast: "fireworks_preshow", exits: [
    { at: 192, to: C.gallery, label: "Gallery" },
    { at: 177, to: C.gallery, label: "Gallery" },
    { at: 0, to: C.dungeon, label: "Dungeon", flag: "guide says Gallery; the Dungeon's exit leads here" },
  ] },
  [C.fantasylandCourtyard]: { cast: "fantasyland_courtyard", exits: [
    { at: 63, to: C.castleGardens, label: "Castle Gardens" },
    // The ride doors (`alice_exit_8..10` at 186/154/140, `pan_exit_12..14` at
    // 23/34/35) are deliberately unmapped: riders come OUT of them, and walking
    // onto one goes nowhere. You board at the turnstile (dark-rides.json).
    { at: 253, to: C.castleForecourt, label: "Castle Forecourt" },
    { at: 248, to: C.castleForecourt, label: "Castle Forecourt" },
    { at: 0, to: C.storybookland, label: "Storybookland" },
    { at: 297, to: C.castleForecourt, label: "Castle Forecourt" },
  ] },
  [C.storybookland]: { cast: "storybookland", exits: [
    { at: 329, to: C.snowWhite, label: "Snow White Hide 'n Seek Forest" },
    { at: 0, to: C.smallWorldShop, label: "\"it's a small world\" Imports" },
    { at: 142, to: C.inTheSky, label: "Fantasyland in The Sky" },
    { at: 344, to: C.fantasylandCourtyard, label: "Fantasyland Courtyard" },
  ] },
  [C.snowWhite]: { cast: "snow_white", exits: [
    { at: 335, to: C.storybookland, label: "Storybookland" },
    { at: 366, to: "same", arrive: 398, label: "up to the upper ground" }, // link_lower
    { at: 398, to: "same", arrive: 366, label: "down to the ground" }, // link_upper
  ] },
  [C.smallWorldShop]: { cast: "small_world_shop", exits: [{ at: 91, to: C.storybookland, label: "Storybookland" }] },
  [C.inTheSky]: { cast: "inthesky", exits: [
    { at: 299, to: C.storybookland, label: "Storybookland" },
    { at: 90, to: C.matterhorn, label: "Matterhorn" },
  ] },
  [C.matterhorn]: { cast: "matterhorn", exits: [
    { at: 236, to: C.tomorrowlandHub, label: "Tomorrowland Hub" },
    { at: 163, to: C.inTheSky, label: "Fantasyland in The Sky" },
  ] },

  // ----------------------------------------------------------- Tomorrowland --
  [C.tomorrowlandHub]: { cast: "tomorrowland_hub", exits: [
    { at: 144, to: C.centralPlaza, label: "Central Plaza" },
    { at: 176, to: C.matterhorn, label: "Stitch's Teleporter (far left)" },
    { at: 164, to: C.emporium, label: "Stitch's Teleporter (middle)" },
    { at: 154, to: C.monorailStation, label: "Stitch's Teleporter (far right)" },
    // `rocket_exit_1/2` (250/252) are NOT a walkable way to Space Mountain: the
    // rocket shuttle carries seated riders there (see mus-server.ts). As plain
    // exits they let anyone skip the ride.
  ] },
  [C.questDeck]: { cast: "spacemountain", exits: [
    { at: 365, to: C.questTrack, label: "Autopia Quest Track" },
    { at: 76, to: C.shrinkingMachine, label: "Inner-Space Shrinking Machine" },
    { at: 228, to: C.shrinkingMachine, label: "Inner-Space Shrinking Machine" },
    // Doorway #3 (91, 107, 121, 133) is the rocket's DOCK, not a way to the Hub
    // on foot: you stand on it to ride the rocket shuttle, and land on it coming
    // back (see mus-server.ts). As a plain exit it skipped the ride.
  ] },
  [C.shrinkingMachine]: { cast: "shrinking_machine", exits: [
    { at: 353, to: C.rayRoom, label: "Inner-Space Ray Room" },
    { at: 102, to: C.questDeck, label: "Space Mountain Quest Deck" },
    { at: 31, to: C.questDeck, label: "Space Mountain Quest Deck" },
    { at: 0, to: C.questDeck, label: "Space Mountain Quest Deck", flag: "with_suit exit" },
  ] },
  [C.rayRoom]: { cast: "ray_room", exits: [
    { at: 604, to: C.shrinkingMachine, label: "Inner-Space Shrinking Machine" },
    { at: 358, to: C.innerSpaceShop, label: "Inner-Space Shop" },
    { at: 811, to: C.innerSpaceShop, label: "Inner-Space Shop" },
  ] },
  [C.innerSpaceShop]: { cast: "galaxy_imports_shop", exits: [
    { at: 231, to: C.rayRoom, label: "Inner-Space Ray Room" },
    { at: 238, to: C.rayRoom, label: "Inner-Space Ray Room" },
  ] },
  [C.questTrack]: { cast: "autopia", exits: [
    { at: 270, to: C.spaceRace, label: "Autopia Space Race" },
    { at: 380, to: C.captainsQuarters, label: "Tomorrowland Tube (down)", flag: "down_top: tube direction inferred" },
    { at: 381, to: C.questDeck, label: "Tomorrowland Tube (up)", flag: "up_top: tube direction inferred" },
  ] },
  [C.spaceRace]: { cast: "speedway", exits: [
    { at: 394, to: C.questTrack, label: "Autopia Quest Track" },
    { at: 464, to: C.mars, label: "Autopia Off Road on Mars" },
  ] },
  [C.mars]: { cast: "mars", exits: [
    { at: 363, to: C.spaceRace, label: "Autopia Space Race" },
    { at: 438, to: C.questTrack, label: "Autopia Quest Track" },
  ] },
  [C.captainsQuarters]: { cast: "nautilus", exits: [
    { at: 293, to: C.shipwreck, label: "Shipwreck Graveyard" },
    { at: 0, to: C.nautilusGrotto, label: "Nautilus Grotto" },
    { at: 278, to: "same", arrive: 299, label: "upper deck" },
    { at: 299, to: "same", arrive: 278, label: "lower deck" },
    { at: 296, to: C.questTrack, label: "Tomorrowland Tube", flag: "to_nautilus/from_nautilus: which is the tube" },
  ] },
  [C.nautilusGrotto]: { cast: "nautilus_grotto", exits: [
    { at: 339, to: C.captainsQuarters, label: "Captain's Quest Quarters" },
    { at: 275, to: C.shipwreck, label: "Shipwreck Graveyard" },
  ] },
  [C.shipwreck]: { cast: "shipwreck", exits: [
    { at: 415, to: C.nautilusGrotto, label: "Nautilus Grotto" },
    { at: 339, to: C.captainsQuarters, label: "Captain's Quest Quarters" },
  ] },

  // ------------------------------------------------------------- Monorail --
  // ⚠ Simplified. `CMonorailStationInterface` flips platform tiles between
  // exit/tile/hide as the train comes and goes, and the train carried you to
  // a different land. Here the stairs go back where you came from, the
  // platform boards the train, and the train's doors put you back on the
  // platform.
  [C.monorailStation]: { cast: "monorail_station", exits: [
    { at: 53, to: "back", label: "back to the land" },
    { at: 162, to: "back", label: "back to the land" },
    { at: 1, to: C.monorailTrain, label: "board the Monorail" },
    { at: 4, to: C.monorailTrain, label: "board the Monorail" },
    { at: 288, to: C.monorailTrain, label: "board the Monorail" },
    { at: 295, to: C.monorailTrain, label: "board the Monorail" },
    { at: 304, to: C.monorailTrain, label: "board the Monorail" },
  ] },
  [C.monorailTrain]: { cast: "monorail_train", exits: [
    { at: 244, to: C.monorailStation, label: "Monorail Station" },
    { at: 249, to: C.monorailStation, label: "Monorail Station" },
    { at: 256, to: C.monorailStation, label: "Monorail Station" },
    { at: 265, to: C.monorailStation, label: "Monorail Station" },
    { at: 267, to: C.monorailStation, label: "Monorail Station" },
    { at: 270, to: C.monorailStation, label: "Monorail Station" },
  ] },
};

// Dark rides: every scene shares `dark_ride_room`. One side goes on to the next
// scene, the other leaves the ride; the last scene returns to the Courtyard.
for (const [first, last] of [[101, 105], [106, 110]]) {
  for (let code = first; code <= last; code++) {
    AUTHORED[code] = { cast: "dark_ride_room", exits: [
      { at: 0, to: code === last ? C.fantasylandCourtyard : code + 1, label: code === last ? "ride exit" : "next scene",
        flag: "which side goes forward is a guess" },
      { at: 116, to: C.fantasylandCourtyard, label: "leave the ride" },
    ] };
  }
}

// ------------------------------------------------------------------ build --
const out = {};
const problems = [];
for (const [code, { cast, exits }] of Object.entries(AUTHORED)) {
  const room = geometry[cast];
  if (!room) { problems.push(`${code}: no geometry for ${cast}`); continue; }
  const doorways = doorwaysOf(room);
  const doorwayOf = (ref) => doorways.find((d) => d.tiles.includes(ref));
  const built = [];
  for (const exit of exits) {
    const door = doorwayOf(exit.at);
    if (!door) { problems.push(`${code} ${cast}: ${exit.at} is not an exit tile (${exit.label})`); continue; }
    const rule = { tiles: door.tiles, label: exit.label };
    if (exit.navigator !== undefined) rule.navigator = exit.navigator;
    else rule.to = exit.to;
    if (exit.arrive !== undefined) {
      const destCast = exit.to === "same" ? cast : AUTHORED[exit.to]?.cast;
      const dest = destCast && geometry[destCast];
      // A single ref names the DOORWAY containing it; an array is taken as the
      // exact floor tiles to land on (the server places you near its middle
      // one), for arrivals that are not a doorway — the Waterpark Pool's exit
      // lifts you onto the deck corner.
      if (Array.isArray(exit.arrive)) {
        const refs = new Set();
        for (let i = 0; dest && i < dest.tiles.length; i += 4) refs.add(dest.tiles[i]);
        const missing = exit.arrive.filter((r) => !refs.has(r));
        if (!dest || missing.length) problems.push(`${code} ${cast}: arrive ${missing.join(",")} not tiles in ${destCast}`);
        else rule.arrive = exit.arrive;
      } else {
        const target = dest && doorwaysOf(dest).find((d) => d.tiles.includes(exit.arrive));
        if (!target) problems.push(`${code} ${cast}: arrive ${exit.arrive} is not a doorway in ${destCast}`);
        else rule.arrive = target.tiles;
      }
    }
    if (exit.flag) rule.flag = exit.flag;
    built.push(rule);
  }
  const unmapped = doorways.filter((d) => !built.some((r) => r.tiles === d.tiles)).map((d) => d.tiles[0]);
  out[code] = { cast, exits: built, ...(unmapped.length ? { unmapped } : {}) };
}

writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), rooms: out }, null, 1));
const n = Object.values(out).reduce((s, r) => s + r.exits.length, 0);
const flagged = Object.values(out).reduce((s, r) => s + r.exits.filter((e) => e.flag).length, 0);
console.log(`${n} exit(s) across ${Object.keys(out).length} room code(s), ${flagged} flagged as inferred`);
console.log(`wrote ${OUT}`);
for (const p of problems) console.log(`⚠ ${p}`);
for (const [code, r] of Object.entries(out)) if (r.unmapped) console.log(`  ${code} ${r.cast}: unmapped doorway(s) at ${r.unmapped.join(", ")}`);
