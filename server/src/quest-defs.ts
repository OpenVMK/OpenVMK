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
];
