/**
 * Magic pins: which pin casts which effect.
 *
 * ⚠ THE CLIENT NEVER KNOWS THIS. `2527 getAvailableMagic` hands it an effect
 * code per worn pin and it just draws that code (`CMagicFactor.SetFx`); the
 * pin -> effect table lived on Disney's server and did not survive. This one is
 * DERIVED from Disney's own data only:
 *
 *   - pin names: `item.<code>` in the external texts;
 *   - effect codes: the `case`s in `CMagicFactor` / `CMagicFactor_new`
 *     (`PrepareFx`, `update`), confirmed by `PlayMagicSound`'s sound per code
 *     (e.g. 19 -> "MFX-coral-1", 34 -> "MFX-confette", 115 ->
 *     "MFX-stitch_space_ship");
 *   - the car codes 100-115: matched by eye against each `wlk_carback_<code>`
 *     bitmap in `vmk_avatar_magic_clothes` (100-103 racing blue/pink/yellow/
 *     green, 104-107 offroad green/blue/pink/yellow, 110 Mike's car, 111 X2,
 *     112 Test Track, 114 Mr. Toad's, 115 Stitch's ship).
 *
 * Anything marked `guess` is a best match, not a certainty — correct it here.
 *
 * Codes: a pin's SINGLE-USE twin is its code + 10000 (2026 Teleportation ->
 * 12026). 10000-10066 are pre-combined 5-star pins (10004 Treasure Detector
 * 5-Star). Timings are not in any Disney data; they are defaults to tune.
 */

export interface MagicPin {
  /** `CMagicFactor` effect code sent in avatar action slot 10. */
  effect: number;
  /** Code sent when the effect ends, for effects with an exit animation (bat, shark). */
  endEffect?: number;
  /** Best match rather than certain. */
  guess?: boolean;
  /** Effect 4: the player then clicks a tile (`2528` -> `MagicTeleport`). */
  teleport?: boolean;
  /** The avatar dances for as long as the effect runs (Dancing Inferno). */
  dance?: boolean;
  /**
   * The pin's magic word, shown in the menu's "Magic word:" line. Not in any
   * Disney data file; taken from the Disney's Online Worlds wiki, which
   * documents the original game.
   */
  word?: string;
  /**
   * Garments worn for as long as the effect runs, as figure `[setId, colourId]`
   * pairs. Each replaces whatever the avatar wears on that part; hair and face
   * are kept. The client has no costume logic of its own — only the effect
   * animation — so the server changes the figure (`2504`) and changes it back.
   */
  costume?: number[];
  sword?: boolean;
  /**
   * Pirates treasure key: opens its own chest in the Pirate Treasure Room
   * (room 88) — 1 bronze, 2 silver, 3 gold. Like the sword it casts no effect.
   */
  treasure?: 1 | 2 | 3;
}

/** Base (multi-use) pin code -> its magic. Single-use twins are code + 10000. */
const PINS = new Map<number, MagicPin>([
  [2026, { effect: 4, teleport: true, word: "Jump!" }], // Teleportation
  [2027, { effect: 2, dance: true, word: "Inferno!" }], // Dancing Inferno — MFX-discoinferno, and you dance
  [2028, { effect: 5, word: "Spooky!" }], // Invisibility — MFX-ghost
  [2029, { effect: 3, word: "Rocket!" }], // Fireworks
  [2030, { effect: 8, word: "BlingBling!" }], // Buried in Treasure — MFX-moneyrain ("coins shower")
  [2031, { effect: 9, word: "BoomCrash!" }], // Cursed Storm
  // Pirate Costume — MFX-pirate-parrot-curse. The unisex pirate set, all in its
  // only colour (figuresets_29): Pirate Hat with Parrot, Pirate Jacket, Pirate
  // Pants, Pirate Shoes. The parrot hat is the guess, after the effect's sound.
  [2032, { effect: 1, costume: [41019, 1, 44211, 1, 46001, 1, 48003, 1], word: "YohoYoho!" }],
  [2033, { effect: 10, word: "Whoosh!" }], // Flying Carpet — DrawMagicCarpet
  [2083, { effect: 12, word: "Frosty!" }], // Snowman
  [2084, { effect: 11, endEffect: 15, word: "Dracula!" }], // Turn Into Bat — bat in / bat out
  [2085, { effect: 14, guess: true, word: "Gold!" }], // Treasure Detector — MFX-treasure (13 also treasure)
  [2126, { effect: 100, word: "Drive!" }], // Autopia Racing Blue
  [2127, { effect: 101, word: "Drive!" }], // Autopia Racing Pink
  [2128, { effect: 102, word: "Drive!" }], // Autopia Racing Yellow
  [2129, { effect: 103, word: "Drive!" }], // Autopia Racing Green
  [2130, { effect: 104, word: "Drive!" }], // Autopia Offroad Green
  [2131, { effect: 105, word: "Drive!" }], // Autopia Offroad Blue
  [2132, { effect: 106, word: "Drive!" }], // Autopia Offroad Pink
  [2133, { effect: 107, word: "Drive!" }], // Autopia Offroad Yellow
  // Deep Sea Diving — SPS-scuba-breath. The magic-only diving set, numbered
  // beside the Coral pin's (41032/44258/46038/48028): Diver Helmet Blue, Jacket
  // with Oxygen Tank, Pants, Boots. The plain diving set (44231/46023/48013) is
  // the quest's tradeable clothing, so the pin wearing it would be the guess.
  [2135, { effect: 17, costume: [41031, 1, 44257, 1, 46037, 1, 48027, 1], word: "Dive!" }],
  // Inner-Space Suit — SM-space-suit-1. Each pin wears its colour's Mission Space
  // Helmet/Vest/Pants/Boots. Helmet and boots are one model tinted per colour
  // (SetList: 175 Blue, 178 Green, 176 Pink, 177 Red); vest and pants are a
  // model each, colour 1.
  [2136, { effect: 18, costume: [41025, 175, 44251, 1, 46031, 1, 48021, 175], word: "Space!" }], // Blue
  [2137, { effect: 18, costume: [41026, 178, 44252, 1, 46032, 1, 48022, 178], word: "Space!" }], // Green
  [2138, { effect: 18, costume: [41027, 176, 44253, 1, 46033, 1, 48023, 176], word: "Space!" }], // Pink
  [2139, { effect: 18, costume: [41028, 177, 44254, 1, 46034, 1, 48024, 177], word: "Space!" }], // Red
  [2143, { effect: 19, costume: [40001, 1, 41032, 1, 44258, 1, 46038, 1, 48028, 1], word: "Ahoy!" }], // Turn Into Coral — MFX-coral-1; Coral Magic Hair/Hat/Vest/Pants/Boots
  [2219, { effect: 25, endEffect: 26, word: "Jaws!" }], // Turn Into Shark — shark in / out
  [12242, { effect: 0, sword: true, word: "Draw!" }], // Sword In The Stone Single Use — pulls the courtyard sword; 2242 is an ordinary pin
  // Pirates treasure keys (single use only). "yohosilver!" is the word players
  // used in 2007 (DIS boards); bronze and gold follow its pattern.
  [12182, { effect: 0, treasure: 1, word: "YoHoBronze!" }], // Bronze Treasure Key
  [12183, { effect: 0, treasure: 2, word: "YoHoSilver!" }], // Silver Treasure Key
  [12184, { effect: 0, treasure: 3, word: "YoHoGold!" }], // Gold Treasure Key
  [2220, { effect: 27, word: "zap!" }], // Lightning
  [2328, { effect: 115, word: "Stitch!" }], // Stitch Spaceship
  [2369, { effect: 34, word: "Confetti!" }], // Confetti — MFX-confette
  [2382, { effect: 35, word: "Float!" }], // Levitation — `magic_levitation_*` frames are drawn for effect 35
  [2383, { effect: 110, guess: true }], // Mike's Car — the yellow car
  [2384, { effect: 111, word: "Spaceship!" }], // X2 Spaceship
  [2385, { effect: 112, word: "Start!" }], // Test Track Car
  [2386, { effect: 114, word: "Toad!" }], // Mr. Toad's Car
]);

/** Pre-combined 5-star pins, 10000-10066: base pin they are a level-5 copy of. */
const FIVE_STAR = new Map<number, number>([
  [10004, 2085], // Treasure Detector Magic 5-Star
  [10005, 2220], // Lightning Magic 5-Star
]);

/** The base code a pin's magic comes from, or undefined for a normal pin. */
function baseOf(code: number): number | undefined {
  if (PINS.has(code)) return code;
  if (code >= 12000 && code < 13000 && PINS.has(code - 10000)) return code - 10000;
  return FIVE_STAR.get(code);
}

/** The magic a pin casts, or undefined for an ordinary pin. */
export function magicOf(code: number): MagicPin | undefined {
  const base = baseOf(code);
  return base === undefined ? undefined : PINS.get(base);
}

export function isMagicPin(code: number): boolean {
  return baseOf(code) !== undefined;
}

/** Single-use pins are the 12xxx twins; `CInvPagePins` refuses to combine them. */
export function isSingleUsePin(code: number): boolean {
  return code >= 12000 && code < 13000;
}

/** The stars a newly granted magic pin starts with. */
export function startingLevel(code: number): number {
  if (FIVE_STAR.has(code)) return 5;
  return isMagicPin(code) ? 1 : 0;
}

/**
 * How long an effect lasts and how long until it can be cast again, by stars.
 * "The higher the star, the lower the re-charge time will be and/or the longer
 * the magic will last" — and 5-star Teleportation recharges in 10 s (wiki).
 * Not Disney data: defaults to tune.
 */
export function magicTiming(code: number, level: number): { durationMs: number; rechargeS: number } {
  const stars = Math.min(Math.max(level, 1), 5);
  const magic = magicOf(code);
  if (magic?.teleport) return { durationMs: 0, rechargeS: 10 + (5 - stars) * 10 };
  return { durationMs: (20 + stars * 8) * 1000, rechargeS: 60 + (5 - stars) * 30 };
}
