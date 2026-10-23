/**
 * Non-player characters — the credit-giving NPCs of VMK.
 *
 * Client side each NPC is its own cast (`vmk_npc_*`): the character's ART is
 * part of the room's own visuals (a node named e.g. "yeti"), and double-clicking
 * it makes the client look for a room ELEMENT of the NPC's type code and send
 * `584 UseItem [ref, 0]` for it:
 *
 *     tNPC = tRoomContext.Search("TYPE", "4003")      -- CMatterhornInterface
 *     me.getHandler().selectNPC(integer(tNPC.GetParam("REF")))
 *
 * So the server's whole job on the client side is to PLACE that element (it
 * has no furnimap entry and draws nothing) and answer the click with
 * `2710 [int itemCode, str message]`, which opens "<Name> Found!" with the
 * NPC's portrait.
 *
 * Rewards, from the VMK wiki ("Non-Player Characters"): 40 credits the first
 * time you find an NPC, 20 each time after, at most once every 12 hours per NPC.
 * The reward arrives as a message from VMK Staff in the messenger.
 *
 * The LINES were server data and are mostly lost. Where an archived 2006 VMK
 * Forums thread preserved the real ones they are used as-is; the rest are
 * written in character. `%name%` becomes the player's name.
 */
import { claimNpcReward, getPotcProgress, NPC_COOLDOWN_MS, unlockPotcLevel3 } from "./db.js";

/**
 * Pirates of the Caribbean level 3: "As soon as you've won 10 games at Level
 * 2, find Captain Blackheart in the Pirate Treehouse to gain access to Level
 * 3" (pirates.instructions.text.page.7). The line is written in character;
 * Disney's is lost.
 */
const BLACKHEART = 4004;
export const POTC_LEVEL3_WINS = 10;
const BLACKHEART_UNLOCK_LINE = "Ten victories on level 2, %name%! Ye've earned yer place among the real pirates - level 3 be open to ye now. Arrrr!";

export interface Npc {
  code: number;
  /** Display name, as `item.<code>` names it. */
  name: string;
  /** The public room code the NPC lives in. */
  roomCode: number;
  /**
   * The tile the NPC's element sits on — the room tile nearest the NPC's
   * art (measured in the client from the art node's sprite). It anchors the
   * speech bubble, so it has to be close to the character.
   */
  tile: number;
  /** What the NPC says when double-clicked; `%name%` is the player. */
  lines: string[];
  /** Ambient speech-bubble lines, said to the whole room. */
  chatter: string[];
  /**
   * The NPC's animation states (its handler's `RoomAnimationStateChange`
   * case): `moves` are picked at random; those also in `speaks` come with
   * a speech bubble.
   */
  moves: number[];
  speaks: number[];
  /**
   * A Haunted Mansion ghost: it wanders the room and comes and goes, driven
   * by ghosts.ts rather than the NPC director; `tile` is only a fallback.
   */
  roams?: boolean;
}

export const NPCS: Npc[] = [
  {
    code: 4001,
    name: "Maleficent the Dragon",
    roomCode: 13,
    tile: 269,
    // CDungeonHandler: 1 BreatheFire.
    moves: [1],
    speaks: [1],
    chatter: [
      "Who dares disturb my slumber?",
      "Now shall you deal with me... and all the powers of evil!",
      "Mind the flames, little ones.",
    ],
    lines: [
      "So, %name%, you dare to wander into my dungeon? Brave... or foolish.",
      "Mind the flames, %name%. I have not had a visitor in a hundred years.",
      "You will find no sleeping princesses down here, %name%. Only me.",
    ],
  },
  {
    code: 4002,
    name: "Shrunken Ned",
    roomCode: 16,
    tile: 18,
    // CSNSHandler: 1 LookAtCashRegister, 2 WiggleAbout, 3 speak, 4 blink.
    moves: [1, 2, 3, 4],
    speaks: [3],
    chatter: [
      "Step right up! Bargains so good they'll shrink your head!",
      "Tiki idols, treasure chests, Safari posters - I've got it all!",
      "Have you seen all the new stuff that's on sale in the stores?",
    ],
    lines: [
      // Recovered (VMK Forums, Nov 2006).
      "Hello %name%, have you seen all the new stuff that's on sale in the stores?",
      "Welcome to my shop, %name%! Everything's a bargain - just don't lose your head over it.",
      "Hey %name%, need a Tiki idol? I've got deals so good they'll shrink your wallet... just a little.",
    ],
  },
  {
    code: 4003,
    name: "The Yeti",
    roomCode: 33,
    tile: 35,
    // CMatterhornHandler: 0 idle, 1 RoarAndSpeak, 2 AnswerPhone, 3 ThrowSnowball.
    moves: [1, 2, 3],
    speaks: [1],
    chatter: [
      "ROOOAAARRR! ...Is this thing on?",
      "Why don't Yetis ever get cold? We've got snow problem!",
      "Thank you, thank you! I'll be here all winter!",
    ],
    lines: [
      "Why did the Yeti cross the Matterhorn, %name%? To get to the other slide!",
      "What's a Yeti's favourite cereal, %name%? Frosted Flakes!",
      "I've been told I'm a little cold on stage, %name%. Tough crowd!",
      "Brr! Did you bring me a scarf, %name%?",
    ],
  },
  {
    code: 4004,
    name: "Captain Blackheart",
    roomCode: 36,
    tile: 44,
    // CTreehouseHandler: 1 LookLeftAndRight, 2 PointSword, 3 climbUpMastSlideDownRope,
    // 4 steerBoat, 5 lookAndSpeak, 6 climbUpRopeSlideDownMast.
    moves: [1, 2, 3, 4, 5, 6],
    speaks: [5],
    chatter: [
      "Land ho! ...No wait, that be a tree.",
      "A pirate's life for me, mateys!",
      "Arrr! Who be swabbin' me deck?",
    ],
    lines: [
      "Arrrr, %name%! Welcome aboard me treetop galleon!",
      "Why be pirates such good singers, %name%? They hit the high Cs! Arrrr!",
      "Keep yer eyes on the horizon, %name%, there be treasure out there somewhere.",
    ],
  },
  {
    code: 4005,
    name: "Esmeralda the Fortuneteller",
    roomCode: 43,
    tile: 176,
    // CNPCEsmeraldaHandler: 1 levitateEsmeralda.
    moves: [1],
    speaks: [1],
    chatter: [
      // Recovered fortunes (VMK Forums).
      "I see firing cannons and sunken vessels in your future.",
      "I sense dancing princesses and pillaging pirates near.",
      "The spirits are restless today...",
    ],
    lines: [
      // Recovered (VMK Forums, Nov 2006, and the Esmeralda fortunes).
      "Hello %name%, do you need help? Be sure to read the FAQ on the VMK homepage!",
      "I see firing cannons and sunken vessels in your future, %name%.",
      "I sense dancing princesses and pillaging pirates near, %name%.",
      "Don't forget to use your single-use magic pins before they expire, %name%!",
    ],
  },
  // The hitchhiking ghosts (CGhostHandler, one per mansion room; ghosts.ts
  // drives their 0-4 states). Their lines are lost; these are in character.
  {
    code: 4006,
    name: "Phineas",
    roomCode: 60,
    tile: 0,
    roams: true,
    moves: [],
    speaks: [],
    chatter: [
      "Going my way? I'll just tag along...",
      "Is this room stretching, or is it just me?",
      "Beware of hitchhiking ghosts!",
    ],
    lines: [
      "Well, %name%, you found me! Mind if I hitch a ride out of here?",
      "Going my way, %name%? I've been waiting for a lift for ages.",
      "Don't look so pale, %name%. That's my job!",
    ],
  },
  {
    code: 4007,
    name: "Ezra",
    roomCode: 65,
    tile: 0,
    roams: true,
    moves: [],
    speaks: [],
    chatter: [
      "Care for a dance? I'm a little stiff...",
      "Happy deathday to meee...",
      "Keep the candles lit, it's a party!",
    ],
    lines: [
      "Ah, %name%! Have you come for the party? Grab a partner and waltz!",
      "You found me, %name%. I'd shake your hand, but mine keeps falling off.",
      "The ballroom's full tonight, %name%. Nine hundred and ninety-nine guests - room for one more!",
    ],
  },
  {
    code: 4008,
    name: "Gus",
    roomCode: 66,
    tile: 0,
    roams: true,
    moves: [],
    speaks: [],
    chatter: [
      "Anybody seen the key to this ball and chain?",
      "Heh heh... boo!",
      "Mighty dusty up here in the attic.",
    ],
    lines: [
      "Heh, you found old Gus, %name%! Got a file for this chain?",
      "Don't mind the ball and chain, %name%. I'm just hanging around.",
      "Shh, %name%! Don't tell the bride I'm up here.",
    ],
  },
];

/** Element refs for NPCs: a reserved block, clear of placed items and seats. */
export const NPC_REF_BASE = 910000;

export function npcByRef(ref: number): Npc | undefined {
  return NPCS.find((n) => NPC_REF_BASE + n.code === ref);
}

export function npcsInRoom(roomCode: number | undefined): Npc[] {
  return roomCode === undefined ? [] : NPCS.filter((n) => n.roomCode === roomCode);
}

export interface NpcVisit {
  /** What the NPC says, for the 2710 dialog. */
  line: string;
  /** Credits awarded by this visit (0 while the NPC is still on cooldown). */
  credits: number;
  firstVisit: boolean;
  /** ms until the next reward, when `credits` is 0. */
  waitMs: number;
}

const FIRST_VISIT_CREDITS = 40;
const REPEAT_VISIT_CREDITS = 20;

/** Someone double-clicked an NPC: pick a line and settle the reward. */
export function visitNpc(npc: Npc, userId: number, playerName: string): NpcVisit {
  let line = npc.lines[Math.floor(Math.random() * npc.lines.length)].replace(/%name%/g, playerName);
  if (npc.code === BLACKHEART && getPotcProgress(userId).wins[1] >= POTC_LEVEL3_WINS && unlockPotcLevel3(userId)) {
    line = BLACKHEART_UNLOCK_LINE.replace(/%name%/g, playerName);
  }
  const claim = claimNpcReward(userId, npc.code, FIRST_VISIT_CREDITS, REPEAT_VISIT_CREDITS);
  return { line, ...claim };
}

export { NPC_COOLDOWN_MS };
