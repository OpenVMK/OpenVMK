/**
 * The official quests, and the vocabulary they are written in. Runtime:
 * quests.ts. Protocol: docs/QUEST-ENGINE.md.
 *
 * Walkthroughs are the wiki's (disneysonlineworlds.com/VMK#In-Game_Quests).
 * The hints are ours, written from those walkthroughs — Disney's riddle texts
 * did not survive.
 *
 * ⚠ A quest's `id` is its questTemplateId on the wire AND the key of every
 * player's saved progress. Never renumber or reuse one; append new quests.
 */

/** `quest.taskname.N` — the client's task types. */
export const TASK = {
  NPC: 1,
  FIND: 2,
  ROOM: 3,
  MINIGAME: 4,
  MAGIC: 5,
  SONG: 6,
  SAY: 7,
  SPEND: 8,
  EARN: 9,
  CLOTHES: 10,
  DANCE: 11,
  EMOTE: 12,
  FRIEND: 13,
  SIT: 14,
  ACQUIRE: 15,
  WAVE: 16,
  CHOICE: 17,
  COLLECT: 18,
  FIND_MANY: 19,
} as const;

/** `quest.gamename.N` — the GameID a minigame task names. */
export const GAME = {
  FIREWORKS: 1,
  JUNGLE_CRUISE: 2,
  /** Any Pirates of the Caribbean game (either mode). */
  PIRATES: 4,
  HAUNTED_MANSION: 5,
  PIRATES_CTF: 6,
  PIRATES_SHIP_BATTLE: 7,
} as const;

/** Findable item codes (`quest.placewhat.N`; art `item_<code>_0_0_3_1_0`). */
export const FINDABLE = { SKULL: 383, ATOM: 384, DIAMOND: 385, HORSESHOE: 386, CLOVER: 387, MICKEY: 400 } as const;

export interface FindableSpot {
  room: number;
  tile: number;
  code: number;
  /**
   * Room 14 only: which land's Monorail Station (a monorail stop id — 20 Main
   * Street, 21 Adventureland, 22 Frontierland, 23 Fantasyland, 24 Tomorrowland,
   * 92 New Orleans Square). Six platforms share one room; unset = any of them.
   */
  stop?: number;
}

export interface QuestTask {
  type: number;
  /** The hint window's text (2853 `description`). */
  hint: string;
  /** Seconds to finish the task; unset = no limit. */
  timeLimitS?: number;
  /** TASK.NPC: the NPC's type code (4001-4009, npcs.ts). */
  npc?: number;
  /** TASK.ROOM: the public room code. */
  room?: number;
  /** TASK.MINIGAME: a GAME id and the score to reach. */
  game?: number;
  score?: number;
  /** TASK.MINIGAME: the game must also be WON (the client has no field for it). */
  win?: boolean;
  /** TASK.MAGIC: the magic pin's type code. */
  pin?: number;
  /** TASK.SAY: what to say (matched ignoring case and punctuation). */
  phrase?: string;
  /** TASK.SPEND / EARN / COLLECT: how many. */
  amount?: number;
  /** TASK.EMOTE: the emoticon id (unset = any). */
  emoticon?: number;
  /** TASK.ACQUIRE / COLLECT: the item's type code. */
  item?: number;
  /** TASK.CHOICE: the options (2-5) and which is right (1-based). */
  answers?: string[];
  correct?: number;
  /** TASK.FIND / FIND_MANY: where the items lie, and how many must be found (default all). */
  spots?: FindableSpot[];
  required?: number;
}

export interface OfficialQuest {
  /** questTemplateId on the wire. Never reuse one: progress is keyed by it. */
  id: number;
  name: string;
  description: string;
  /** Pins the player must own to start (the quest chain). */
  requiresPins?: number[];
  reward: { credits: number; pins: number[] };
  tasks: QuestTask[];
}

// ---------------------------------------------------------------- codes used

const ROOM = {
  VMK_CENTRAL: 41,
  TOMORROWLAND_HUB: 47,
  ESPLANADE: 48,
  PIRATE_TREEHOUSE: 36,
  SMALL_WORLD_IMPORTS: 38,
  STORYBOOKLAND: 40,
  TOM_SAWYERS_ISLAND: 64,
  MARK_TWAIN: 68,
  SHIPWRECK_GRAVEYARD: 78,
  PIRATES_TREASURE_ROOM: 88,
} as const;
const NPC_BLACKHEART = 4004;
const PIN_DEEP_SEA_DIVING_BLUE = 2135;

/**
 * Storybookland's five Jolly Roger skulls. The wiki places them on the entry
 * path, the grass by the water and tracks, the grass by Monstro and the house,
 * and the paths by the villages. The original tiles are lost; these follow
 * that list on room-geometry.json's floor, each checked on screen.
 *
 * ⚠ A walkable tile can still be hidden: 104 ("interior" by the geometry) drew
 * behind the crooked house, so nobody could see the fifth skull. Check every
 * new spot in the client, not just in the geometry.
 */
const STORYBOOKLAND_SKULLS: FindableSpot[] = [195, 397, 204, 309, 302].map((tile) => ({
  room: ROOM.STORYBOOKLAND,
  tile,
  code: FINDABLE.SKULL,
}));

/**
 * The Autopia Road Trip's atom trails: `[room code, tile refs]` per leg.
 *
 * Generated from the server's own geometry (findPath between the door you
 * arrive by and the door toward the next room, atoms spaced evenly along it),
 * because "follow the atoms through X" is a trail and the original tiles are
 * lost. Being ON the walking route means walking straight through the room
 * collects them. Legs with no door toward the next stop (a game lobby, a start
 * room) run to the far side.
 *
 * ⚠ Every tile was then checked ON SCREEN in the TS client: each candidate on
 * a route was drawn alone and its pixels compared with and without it. Routes
 * pass behind benches, roofs and walls, and the generator's first picks put
 * ~1 atom in 5 out of sight (the Attic's route is nearly all hidden). Only
 * tiles showing at least ~70% of the atom were kept, the Stretching Room's
 * dark ones and the Tomorrowland Hub's short route excepted. Re-check any new
 * or moved tile with `/questatoms` in the room.
 *
 * Room 14 is every monorail platform (one room, one geometry): its legs carry a
 * third field, the monorail stop, so they show and count only on that land's
 * platform (the server's `stationStop`).
 */
const STOP = { MAIN_STREET: 20, ADVENTURELAND: 21, FRONTIERLAND: 22, FANTASYLAND: 23, TOMORROWLAND: 24, NEW_ORLEANS: 92 } as const;
const TRAILS: Record<string, [number, number[], number?]> = {
  "easy.esplanade": [48, [279, 322, 382]],
  "easy.townsquare": [3, [99, 369, 201]],
  "easy.mainstreet": [4, [339, 356, 383]],
  "easy.centralplaza": [2, [451, 86, 129]],
  "easy.forecourt": [35, [225, 319, 112]],
  "easy.gardens": [30, [41, 29, 21]],
  "easy.gallery": [31, [131, 187, 185]],
  "easy.fwlobby": [1100, [134, 108]],
  "med.central": [41, [161, 178, 131]],
  "med.mainstreet": [4, [430, 81]],
  "med.centralplaza": [2, [451, 86, 129]],
  "med.forecourt": [35, [168, 179, 188]],
  "med.frontierhub": [58, [284, 297, 309]],
  "med.hmlobby": [1104, [76, 116, 211]],
  "med.stretching": [60, [43, 27, 17]],
  "med.ballroom": [65, [1164, 1071, 999]],
  "med.attic": [66, [948, 920, 894]],
  "med.station": [14, [107, 103, 98], STOP.FRONTIERLAND],
  "med.flstation": [14, [104, 100, 76], STOP.FANTASYLAND],
  "med.dungeon": [13, [73, 147, 286]],
  "md.tlhub": [47, [134, 132]],
  "md.townsquare": [3, [197, 215, 232]],
  "md.mainstreet": [4, [339, 356, 383]],
  "md.centralplaza": [2, [447, 470, 497]],
  "md.bazaar": [5, [37, 49, 48]],
  "md.bazaar2": [5, [67, 101, 132]],
  "md.bridge": [5, [172, 168, 122]],
  "md.dock": [11, [58, 112, 15]],
  "md.elephant": [6, [38, 39, 41]],
  "md.tiki": [7, [88, 18, 8]],
  "md.temple": [8, [138, 165, 63]],
  "md.station": [14, [106, 103, 99], STOP.ADVENTURELAND],
  "md.nosramp": [14, [104, 101], STOP.NEW_ORLEANS],
  "md.nos": [95, [62, 80, 138]],
  "md.hmlobby": [1104, [139, 104, 77]],
  "md.frontierhub": [58, [298, 269, 234]],
  "md.forecourt": [35, [357, 314, 112]],
  "md.gardens": [30, [34, 24]],
  "md.dungeon": [13, [144, 296, 36]],
  "md.fwlobby": [1100, [64, 60, 108]],
  "hard.esplanade": [48, [384, 363]],
  "hard.msstation": [14, [106, 100], STOP.MAIN_STREET],
  "hard.temple": [8, [165, 180]],
  "hard.tent": [9, [126, 0]],
  "hard.safari": [10, [76, 41]],
  "hard.jcdock": [11, [52, 45]],
  "hard.bazaar": [5, [61, 47]],
  "hard.centralplaza": [2, [252, 219]],
  "hard.forecourt": [35, [294, 37]],
  "hard.storybook": [40, [169, 81]],
  "hard.smallworld": [38, [74, 52]],
  "hard.sky": [39, [226, 166]],
  "hard.matterhorn": [33, [271, 264]],
  "hard.tlhub": [47, [166, 161]],
  "hard.tlstation": [14, [104, 101], STOP.TOMORROWLAND],
  "hard.nosstation": [14, [103, 101], STOP.NEW_ORLEANS],
  "hard.nos": [95, [81, 139]],
  "hard.hmlobby": [1104, [117, 89]],
  "hard.frontierhub": [58, [243, 159]],
  "hard.frontierdock": [59, [206, 44]],
  "hard.tomsawyer": [64, [25, 54]],
  "hard.splash": [49, [203, 175]],
  "hard.banquet": [34, [130, 94]],
  "hard.gallery": [31, [127, 219]],
  "hard.fwlobby": [1100, [134, 108]],
};

/** A "find the atoms" task over one trail. */
function atoms(key: string, hint: string): QuestTask {
  const trail = TRAILS[key];
  if (!trail) throw new Error(`quest-defs: no atom trail "${key}"`);
  const [room, tiles, stop] = trail;
  return { type: TASK.FIND_MANY, hint, spots: tiles.map((tile) => ({ room, tile, code: FINDABLE.ATOM, ...(stop !== undefined && { stop }) })) };
}

const visit = (room: number, hint: string): QuestTask => ({ type: TASK.ROOM, room, hint });
const npc = (code: number, hint: string): QuestTask => ({ type: TASK.NPC, npc: code, hint });
const game = (id: number, score: number, hint: string): QuestTask => ({ type: TASK.MINIGAME, game: id, score, hint });

const NPC = { DRAGON: 4001, NED: 4002, YETI: 4003, BLACKHEART: 4004, ESMERALDA: 4005 } as const;
const PIN = {
  AUTOPIA_RACING_BLUE: 2126,
  AUTOPIA_RACING_PINK: 2127,
  AUTOPIA_RACING_GREEN: 2129,
  AUTOPIA_OFFROAD_YELLOW: 2133,
  TURN_INTO_BAT: 2084,
} as const;

/** The Road Trip starts once the Diving pin is earned (Ships & Shipwrecks II). */
const ROAD_TRIP_NEEDS = [PIN_DEEP_SEA_DIVING_BLUE];
const ROAD_TRIP_INTRO =
  "Grab your keys for a road trip around VMK! Follow the trail of atoms from room to room and finish with a " +
  "Castle Fireworks Remixed score. You need the Deep Sea Diving pin from Ships & Shipwrecks II to start.";

// ---------------------------------------------------------------- the quests

export const OFFICIAL_QUESTS: OfficialQuest[] = [
  {
    id: 1,
    name: "Ships & Shipwrecks II",
    description:
      "All hands on deck! Sail from the Pirate Treehouse to the Shipwreck Graveyard, follow the clues and earn " +
      "the Deep Sea Diving Blue Magic Pin. Say \"Dive!\" while wearing it to explore Tomorrowland's underwater areas.",
    reward: { credits: 0, pins: [PIN_DEEP_SEA_DIVING_BLUE] },
    tasks: [
      {
        type: TASK.NPC,
        npc: NPC_BLACKHEART,
        hint: "Every voyage starts with a captain. Find the one whose heart is as black as his name, up in the Pirate Treehouse, and double-click him.",
      },
      {
        type: TASK.CHOICE,
        hint: "Captain Blackheart keeps watch all night. How many lanterns light his treehouse?",
        answers: ["4", "5", "6", "8"],
        correct: 3,
      },
      {
        type: TASK.ROOM,
        room: ROOM.PIRATES_TREASURE_ROOM,
        hint: "Every pirate dreams of treasure. Leave the Pirates of the Caribbean Game Lobby to the left and find where it is kept.",
      },
      {
        type: TASK.SAY,
        phrase: "cannons",
        hint: "Look closely around the treasure room: there are only two of one thing here. Say its name out loud!",
      },
      {
        type: TASK.MINIGAME,
        game: GAME.PIRATES_SHIP_BATTLE,
        score: 0,
        win: true,
        hint: "Time to prove your seamanship. Win a Ship Battle in the Pirates of the Caribbean game.",
      },
      {
        type: TASK.ROOM,
        room: ROOM.STORYBOOKLAND,
        hint: "Somewhere in Fantasyland you can spy the Columbia sailing far in the distance. Go there.",
      },
      {
        type: TASK.FIND_MANY,
        spots: STORYBOOKLAND_SKULLS,
        hint: "Five Jolly Roger skulls are hidden around Storybookland. Walk onto every one of them!",
      },
      {
        type: TASK.ROOM,
        room: ROOM.SMALL_WORLD_IMPORTS,
        hint: "The dock boat stops at a shop with goods from all around a small world. Visit it.",
      },
      {
        type: TASK.CHOICE,
        hint: "How many flags hang from the ropes of the dock boat?",
        answers: ["6", "8", "10", "12"],
        correct: 3,
      },
      {
        type: TASK.ROOM,
        room: ROOM.MARK_TWAIN,
        hint: "Find the boat that is also a stage you can hop onto.",
      },
      {
        type: TASK.SIT,
        hint: "All this sailing is tiring. Sit down anywhere and rest your sea legs.",
      },
      {
        type: TASK.ROOM,
        room: ROOM.SHIPWRECK_GRAVEYARD,
        hint: "Visit the place where defeated ships go to rest.",
      },
      {
        type: TASK.CHOICE,
        hint: "How many cannons lie buried in the sand of the Shipwreck Graveyard?",
        answers: ["2", "3", "4", "5"],
        correct: 2,
      },
      {
        type: TASK.ROOM,
        room: ROOM.TOM_SAWYERS_ISLAND,
        hint: "Find the island where two ships can be seen out on the water.",
      },
      {
        type: TASK.SAY,
        phrase: "Columbia",
        hint: "Say the name of the great sailing ship to climb aboard!",
      },
    ],
  },
  {
    id: 2,
    name: "Autopia Road Trip: Easy",
    description: `${ROAD_TRIP_INTRO} The easy route runs from the Esplanade to the Castle and earns the Autopia Racing Blue Magic Pin.`,
    requiresPins: ROAD_TRIP_NEEDS,
    reward: { credits: 0, pins: [PIN.AUTOPIA_RACING_BLUE] },
    tasks: [
      visit(ROOM.ESPLANADE, "Start your engines at the VMK Esplanade."),
      atoms("easy.esplanade", "Follow the atoms across the Esplanade. The first one is waiting near the giraffe."),
      atoms("easy.townsquare", "Follow the atoms through Town Square, past the flower garden shaped like Mickey's face."),
      atoms("easy.mainstreet", "Follow the atoms down Main Street. Stay in the right lane!"),
      atoms("easy.centralplaza", "Follow the atoms through Central Plaza. Someone is moving at the Photo Supply Co. window..."),
      atoms("easy.forecourt", "Follow the atoms through the Castle Forecourt. Walt and Mickey will greet you at the fork."),
      atoms("easy.gardens", "Follow the atoms through the Castle Gardens, toward Maleficent's Tower."),
      atoms("easy.gallery", "Follow the atoms through the Gallery and stay on the path up the stairs."),
      atoms("easy.fwlobby", "Two cosmic atoms are hiding by the fireworks barrels in the Castle Fireworks Remixed Lobby."),
      game(GAME.FIREWORKS, 1000, "Light up the sky: score 1,000 points in Castle Fireworks Remixed."),
    ],
  },
  {
    id: 3,
    name: "Autopia Road Trip: Medium",
    description: `${ROAD_TRIP_INTRO} The medium route starts at VMK Central, haunts the Mansion and earns the Autopia Racing Pink Magic Pin.`,
    requiresPins: ROAD_TRIP_NEEDS,
    reward: { credits: 0, pins: [PIN.AUTOPIA_RACING_PINK] },
    tasks: [
      visit(ROOM.VMK_CENTRAL, "Start your engines at VMK Central."),
      atoms("med.central", "Follow the atoms around VMK Central. Start by the pirates near the wall; the tricky one is by the camera."),
      atoms("med.mainstreet", "Follow the atoms down Main Street."),
      atoms("med.centralplaza", "Follow the atoms through Central Plaza."),
      atoms("med.forecourt", "Follow the atoms through the Castle Forecourt toward Frontierland."),
      atoms("med.frontierhub", "Follow the atoms through the Frontierland Hub."),
      game(GAME.HAUNTED_MANSION, 30, "Grab a vacuum: catch 30 ghosts in the Haunted Mansion Game."),
      atoms("med.hmlobby", "Follow the atoms through the Haunted Mansion Lobby."),
      atoms("med.stretching", "Follow the atoms through the Stretching Room."),
      atoms("med.ballroom", "Follow the atoms through the Ballroom. If Ezra asks you to dance, politely decline and hurry along!"),
      atoms("med.attic", "Follow the atoms through the Attic."),
      atoms("med.station", "Follow the atoms along the Frontierland Monorail Station platform."),
      atoms("med.flstation", "Ride the monorail to Fantasyland and follow the atoms through its station."),
      atoms("med.dungeon", "Follow the atoms through the Dungeon, and watch out for the dragon's fire!"),
      game(GAME.FIREWORKS, 3000, "Finish with a bang: score 3,000 points in Castle Fireworks Remixed."),
    ],
  },
  {
    id: 4,
    name: "Autopia Road Trip: Medium-Difficult",
    description: `${ROAD_TRIP_INTRO} This route crosses Adventureland and New Orleans Square and earns the Autopia Offroad Yellow Magic Pin.`,
    requiresPins: ROAD_TRIP_NEEDS,
    reward: { credits: 0, pins: [PIN.AUTOPIA_OFFROAD_YELLOW] },
    tasks: [
      visit(ROOM.TOMORROWLAND_HUB, "Start your engines at the Tomorrowland Hub."),
      atoms("md.tlhub", "Follow the atoms through the Tomorrowland Hub to the Emporium."),
      npc(NPC.ESMERALDA, "Esmeralda the Fortuneteller knows where the road leads. Find her in the Emporium and double-click her."),
      atoms("md.townsquare", "Follow the atoms through Town Square."),
      atoms("md.mainstreet", "Follow the atoms down Main Street."),
      atoms("md.centralplaza", "Follow the atoms through Central Plaza toward Adventureland."),
      atoms("md.bazaar", "Follow the atoms through the Adventureland Bazaar to Shrunken Ned's Shop."),
      npc(NPC.NED, "Say hello to Shrunken Ned: double-click him in his shop."),
      { type: TASK.SPEND, amount: 50, hint: "Every road trip needs souvenirs. Spend 50 credits." },
      { type: TASK.MINIGAME, game: GAME.PIRATES_SHIP_BATTLE, score: 0, win: true, hint: "Win a Ship Battle in the Pirates of the Caribbean game." },
      atoms("md.bazaar2", "Follow the atoms through the Adventureland Bazaar to the Pirate Treehouse."),
      npc(NPC.BLACKHEART, "Find Captain Blackheart up in the Pirate Treehouse and double-click him."),
      atoms("md.bridge", "Follow the atoms back across the bridge to the Jungle Cruise Dock."),
      atoms("md.dock", "Follow the atoms through the Jungle Cruise Dock."),
      atoms("md.elephant", "Follow the atoms through the Elephant Bathing Pool."),
      atoms("md.tiki", "Follow the atoms through Tiki Tiki Island."),
      atoms("md.temple", "Follow the atoms through the Forbidden Temple."),
      atoms("md.station", "Follow the atoms along the Adventureland Monorail Station platform."),
      { type: TASK.DANCE, hint: "Waiting for a train? Dance while you wait!" },
      atoms("md.nosramp", "Ride the monorail to New Orleans Square and find the atoms on the platform's exit ramp."),
      atoms("md.nos", "Follow the atoms through New Orleans Square."),
      atoms("md.hmlobby", "Follow the atoms through the Haunted Mansion Lobby."),
      atoms("md.frontierhub", "Follow the atoms through the Frontierland Hub."),
      atoms("md.forecourt", "Follow the atoms through the Castle Forecourt."),
      atoms("md.gardens", "Follow the atoms through the Castle Gardens."),
      npc(NPC.DRAGON, "Brave the Dungeon and double-click Maleficent the Dragon."),
      atoms("md.dungeon", "Follow the atoms through the Dungeon."),
      atoms("md.fwlobby", "Follow the atoms through the Castle Fireworks Remixed Lobby."),
      { type: TASK.WAVE, hint: "You're almost there. Wave to the crowd!" },
      game(GAME.FIREWORKS, 6500, "Light up the sky: score 6,500 points in Castle Fireworks Remixed."),
    ],
  },
  {
    id: 5,
    name: "Autopia Road Trip: Difficult",
    description: `${ROAD_TRIP_INTRO} The difficult route visits almost every land, two atoms per stop, and earns the Autopia Racing Green Magic Pin.`,
    requiresPins: ROAD_TRIP_NEEDS,
    reward: { credits: 0, pins: [PIN.AUTOPIA_RACING_GREEN] },
    tasks: [
      atoms("hard.esplanade", "Collect the 2 atoms at the VMK Esplanade."),
      atoms("hard.msstation", "Collect the 2 atoms at the Main Street Monorail Station."),
      atoms("hard.temple", "Collect the 2 atoms in the Forbidden Temple."),
      atoms("hard.tent", "Collect the 2 atoms in the Explorer's Tent."),
      atoms("hard.safari", "Collect the 2 atoms at the Lost Safari Party."),
      atoms("hard.jcdock", "Collect the 2 atoms at the Jungle Cruise Dock."),
      game(GAME.JUNGLE_CRUISE, 30000, "Snap some wildlife: score 30,000 points on the Jungle Cruise Photo Safari."),
      atoms("hard.bazaar", "Collect the 2 atoms in Adventureland."),
      npc(NPC.NED, "Double-click Shrunken Ned in his shop."),
      atoms("hard.centralplaza", "Collect the 2 atoms in Central Plaza. One is hiding behind the left bench."),
      atoms("hard.forecourt", "Collect the 2 atoms in the Castle Forecourt."),
      atoms("hard.storybook", "Collect the 2 atoms in Storybookland."),
      atoms("hard.smallworld", "Collect the 2 atoms in \"it's a small world\" Imports."),
      { type: TASK.SPEND, amount: 100, hint: "Treat yourself: spend 100 credits." },
      atoms("hard.sky", "Collect the 2 atoms in Fantasyland in the Sky."),
      npc(NPC.YETI, "Head up the Matterhorn and double-click the Yeti."),
      atoms("hard.matterhorn", "Collect the 2 atoms on the Matterhorn."),
      atoms("hard.tlhub", "Collect the 2 atoms at the Tomorrowland Hub."),
      atoms("hard.tlstation", "Collect the 2 atoms at the Tomorrowland Monorail Station."),
      { type: TASK.DANCE, hint: "Dance on the platform!" },
      atoms("hard.nosstation", "Hop on the monorail, get off at New Orleans Square and collect the 2 atoms on the platform."),
      atoms("hard.nos", "Collect the 2 atoms in New Orleans Square."),
      atoms("hard.hmlobby", "Collect the 2 atoms in the Haunted Mansion Lobby."),
      { type: TASK.MAGIC, pin: PIN.TURN_INTO_BAT, hint: "Spooky! Use the Turn into Bat magic." },
      atoms("hard.frontierhub", "Collect the 2 atoms at the Frontierland Hub."),
      { type: TASK.SIT, hint: "Take a break: sit down anywhere." },
      atoms("hard.frontierdock", "Collect the 2 atoms at the Frontierland Dock."),
      atoms("hard.tomsawyer", "Collect the 2 atoms on Tom Sawyer's Island."),
      atoms("hard.splash", "Collect the 2 atoms at Splash Mountain."),
      atoms("hard.banquet", "Collect the 2 atoms in the Banquet Hall."),
      atoms("hard.gallery", "Collect the 2 atoms in the Gallery."),
      atoms("hard.fwlobby", "Collect the 2 atoms in the Castle Fireworks Remixed Lobby."),
      game(GAME.FIREWORKS, 7500, "Finish the road trip: score 7,500 points in Castle Fireworks Remixed."),
    ],
  },
];
