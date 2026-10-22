/**
 * The clothing/appearance catalogue offered during avatar creation.
 *
 * Read from the game's own `figuresets_28` (the file the client downloads and
 * parses itself), so the ids we advertise are ids the client can actually
 * resolve. Inventing ids here would show the player empty clothing slots.
 *
 * Structure of that file, for whoever comes next:
 *   ColorList   id -> hex colour
 *   SetNumbers  id-range -> [part type, gender]   e.g. "24000": ["ch","M"]
 *   SetContents part type -> the body parts it covers
 *   SetList     set id -> [[part ids], [colour ids]]
 *   CastList    which cast holds each set
 *
 * Part ranges (from SetNumbers): hr 20000/30000/40000, ht 21000/31000/41000,
 * hd 22000/32000/42000, ch 24000/34000/44000, pn 26000/36000/46000,
 * sh 28000/38000/48000.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, castExtracted, downloadFile } from "./paths.js";

export interface AvatarCatalogue {
  male: number[];
  female: number[];
  defaultMale: number[];
  defaultFemale: number[];
  source: string;
}

/** A 12-slot figure is what `getAvailableSets` expects for each default. */
const FIGURE_SLOTS = 12;

/**
 * Default `ColorList` key per part range. `figuresets_28` defines ids 1..204.
 *
 * ⚠ These matter visually: ink 41 (Darken) TINTS the part artwork by this
 * colour, and the artwork itself is pale greyscale shading. Defaulting
 * everything to 1 (`EEEEEE`, near-white) produced a white-skinned, white-haired
 * avatar. Skin and hair need real tones; clothing can stay neutral.
 *
 *   3  = 433721 dark brown (hair)      16 = F0C474 light skin tone (head/body)
 *   1  = EEEEEE near-white (clothing)
 */
const DEFAULT_COLOUR_BY_BASE = new Map<number, number>([
  [0, 3], // hr — hair,   433721 dark brown
  [2000, 16], // hd — skin,   F0C474 light tone
  [4000, 10], // ch — top,    920101 deep red
  [6000, 12], // pn — bottom, 19385F navy
  [8000, 2], // sh — shoes,  2B2B29 near-black
]);
/**
 * Fallback only. ⚠ Do NOT use 1 (`EEEEEE`) for clothing: ink 41 tints the part
 * artwork by this colour, so a near-white value renders the garment as a white
 * patch — which is exactly what the white blocks on the clothing thumbnails
 * were.
 */
const DEFAULT_COLOUR_ID = 1;

/** Colour for a part, keyed by its offset within the gender band. */
function defaultColourFor(base: number): number {
  return DEFAULT_COLOUR_BY_BASE.get(base % 10000) ?? DEFAULT_COLOUR_ID;
}

function parseSetIds(figureSets: string): number[] {
  const line = /^SetList=(.*)$/m.exec(figureSets);
  if (!line) {
    return [];
  }
  const ids: number[] = [];
  for (const match of line[1].matchAll(/"(\d+)":/g)) {
    ids.push(Number(match[1]));
  }
  return ids;
}

/**
 * `SetList`'s colour ids per set: `"36000": [[2,2], [125]]` -> 36000 -> [125].
 *
 * ⚠ A GARMENT COMES IN EXACTLY THE COLOURS LISTED — for clothing that is one.
 * Jeans 36000 is colour 125, Skate Shoes 38000 colour 1. The inventory draws a
 * garment in its FIRST listed colour (`CClothesPreviewRenderer
 * .RenderClothesPreview`: `rgb(m_ar_SetsForRenderer[set][pos][2][1])`), so a
 * figure wearing it in any other colour shows one thing on the avatar and
 * another in the Stuff window. Only hair and skin list real choices.
 */
export function parseSetColours(figureSets: string): Map<number, number[]> {
  const line = /^SetList=(.*)$/m.exec(figureSets);
  const bySet = new Map<number, number[]>();
  if (!line) return bySet;
  for (const entry of line[1].matchAll(/"(\d+)":\s*\[\[[^\]]*\],\s*\[([^\]]*)\]\]/g)) {
    const colours = entry[2].split(",").map((c) => Number(c.trim())).filter(Number.isInteger);
    bySet.set(Number(entry[1]), colours);
  }
  return bySet;
}

/**
 * `CastList` maps each set id to the cast files that hold its artwork:
 *   CastList=["21000": ["ht_47_48"], "24000": ["ch_3_4", "ch_57_58", "s_3_3"], …]
 * Each name resolves to `vmk_clothes/vmk_avatar_<name>.cct`.
 */
function parseCastList(figureSets: string): Map<number, string[]> {
  const line = /^CastList=(.*)$/m.exec(figureSets);
  const bySet = new Map<number, string[]>();
  if (!line) {
    return bySet;
  }
  for (const entry of line[1].matchAll(/"(\d+)":\s*\[([^\]]*)\]/g)) {
    const casts = [...entry[2].matchAll(/"([^"]+)"/g)].map((cast) => cast[1]);
    bySet.set(Number(entry[1]), casts);
  }
  return bySet;
}

/**
 * ⚠ The male/female split is the one part of this that is NOT firmly grounded.
 *
 * `SetNumbers` labels the 20000/30000/40000 series it lists as "M", with no
 * matching "F" entries, so the file does not obviously say which series is
 * female. The banding below (20000s = male, 30000s = female) matches the
 * layout — three parallel series of the same six part types — but has not been
 * confirmed against a rendered avatar.
 *
 * It is safe to be wrong here in the sense that nothing breaks: the client
 * renders whatever it is handed. Check it by eye on the creation screen and fix
 * the banding if the genders are swapped.
 */
function bandFor(id: number): "male" | "female" | "both" | "other" {
  if (id >= 20000 && id < 30000) return "male";
  if (id >= 30000 && id < 40000) return "female";
  // ⚠ 4xxxx is a THIRD band, not junk. `CAvatarFactoryComponent.parseAvailableSets`
  // buckets 20000/30000/40000 identically — the same six part types repeat in
  // each — and the item-details panel labels this band "unisex clothing", so it
  // is offered to everyone rather than belonging to one sex.
  //
  // Returning "other" here silently discarded 406 sets whose artwork we hold,
  // including every 41xxx hat (Earth Day Mickey Ears among them). They looked
  // like missing content when they were only being filtered out.
  if (id >= 40000 && id < 50000) return "both";
  return "other";
}

/**
 * Which BODY PART a set id is, as the 1000-band base.
 *
 * ⚠ The thousands digit is the part, and every gender band repeats the same
 * six: `(id - 20000) % 10000` -> 0 hr, 1000 ht, 2000 hd, 4000 ch, 6000 pn,
 * 8000 sh. So 24000 and 34000 are both tops, and 21000 is a hat rather than
 * "the first boys' item".
 */
function bandOf(id: number): number {
  return Math.floor(((id - 20000) % 10000) / 1000) * 1000;
}

const BAND_NAMES: Record<number, string> = {
  0: "hr", 1000: "ht", 2000: "hd", 4000: "ch", 6000: "pn", 8000: "sh",
};
const bandName = (band: number): string => BAND_NAMES[band] ?? String(band);

/**
 * Sets never advertised, whatever the figureset says.
 *
 * `21008` is a CUSTOM GAS MASK, not Disney content. It is one of eleven sets in
 * `figuresets_29` that resolve through a `set_<id>` cast rather than Disney's
 * `ht_<n>_<m>` convention, and the other ten are the Halloween costumes
 * (Vampire Jacket/Pants/Shoes, Halloween Witch Hat and dress, Pumpkin and Bat
 * Mickey Hats). It carries no name anywhere — nothing in `external_texts`
 * mentions 21008 as a key or a value — and its `SetList` index is 300, far
 * outside the 1..105 range every other hat uses. It sat FIRST in the male hat
 * picker at registration.
 *
 * ⚠ Do NOT block it by deleting `vmk_clothes/vmk_avatar_set_21008.cct`. That
 * does work — `castPresent` fails, and a set whose declared casts are missing
 * is dropped — but it destroys the artwork, has to be repeated for the overlay
 * copy, and silently reverts the next time the mirror is re-synced. Blocking by
 * id keeps the asset and records the reason.
 *
 *   $env:VMK_BLOCKED_SETS = "21008,41084"   # replaces this list
 *   $env:VMK_BLOCKED_SETS = ""              # block nothing
 */
const BLOCKED_SETS = new Set(
  (process.env.VMK_BLOCKED_SETS ?? "21008")
    .split(",")
    .map((id) => Number(id.trim()))
    .filter((id) => Number.isInteger(id) && id > 0),
);

interface RegistrationClothing {
  ids: Set<number>;
  /** The 1000-bands the list covers; other bands are left alone. */
  bands: Set<number>;
  /** How many listed ids survived the archive's art check. */
  matched: (available: number[]) => number;
}

let registrationCache: RegistrationClothing | null | undefined;

/**
 * The curated registration wardrobe, from `assets/registration-clothing.json`.
 *
 * Built by `tools/extract-registration-clothing.mjs` from the OVMK clothing
 * workbook's three "Clothing Shop" sheets — see that file for why those sheets
 * and not the others. It covers tops, bottoms and shoes, which is exactly the
 * three clothing pickers the creation screen has (`avc_shirt`, `avc_pants`,
 * `avc_shoes`); hair and faces are not in it and are not its business.
 *
 * Absent, nothing is filtered and the full figureset is offered as before.
 *   $env:VMK_REGISTRATION_CLOTHING = "off"   # ignore the list
 */
function registrationClothing(repoRoot: string): RegistrationClothing | null {
  if (registrationCache !== undefined) return registrationCache;
  registrationCache = null;
  if (process.env.VMK_REGISTRATION_CLOTHING === "off") return null;
  const path =
    process.env.VMK_REGISTRATION_CLOTHING ??
    join(repoRoot, "assets", "registration-clothing.json");
  if (!existsSync(path)) return null;
  try {
    const data = JSON.parse(readFileSync(path, "utf8")) as { items?: Array<{ id: number }> };
    const ids = new Set((data.items ?? []).map((i) => Number(i.id)).filter(Number.isInteger));
    if (ids.size === 0) return null;
    const bands = new Set([...ids].map(bandOf));
    registrationCache = {
      ids,
      bands,
      matched: (available) => available.filter((id) => ids.has(id)).length,
    };
  } catch (err) {
    // A malformed list must not silently narrow the wardrobe to nothing.
    console.warn(`[avatar] could not read ${path}: ${(err as Error).message}`);
    registrationCache = null;
  }
  return registrationCache;
}

/**
 * Default figure: **6 (setId, colourId) PAIRS**, not 12 set ids.
 *
 * ⚠ This is the single most misread field in the whole registration protocol.
 * `CRegPage1.ParseFigure` walks the 12 ints and branches on `i mod 2`:
 *
 * ```lingo
 * if i mod 2 then                       -- ODD  slot = SET id, resolves the part
 *   t_mp_MyFigure[part]["Figure"] = m_mp_AllSets[part][setId][1]
 * end if
 * t_mp_MyFigure[part]["Color"] = m_ar_FigureColorList[string(value)]   -- EVEN = COLOUR
 * ```
 *
 * Sending twelve set ids therefore delivers only *three* parts. Measured
 * before this was fixed: 20000/22000/26000 landed on odd slots and rendered,
 * while 21000(ht), 24000(ch) and 28000(sh) were consumed as colour ids and
 * their parts came out with `m_iModel = VOID` — `copyPicture` then composed
 * `std_ch_<VOID>_3_0`, missed the image cache, returned 0, and those preview
 * boxes drew blank white.
 *
 * The part is derived from the id's range by `getFigureSets`, so pair ORDER
 * does not matter — except that the hat pair must be `(-1, -1)`.
 *
 * ⚠ Only the HAT may use a `-1` colour. `ParseFigure`'s `-1` branch writes
 * `t_mp_MyFigure["ht"]["Color"]` unconditionally, so a `-1` colour on any other
 * part silently lands on the hat instead.
 */
function buildDefault(
  ids: number[],
  band: "male" | "female",
  hasArt: (id: number) => boolean,
  coloursOf: (id: number) => number[] | undefined,
): number[] {
  // hr (hair), hd (head/body), ch (top), pn (bottom), sh (shoes). ht is added
  // separately as the no-hat pair.
  const bases =
    band === "male" ? [20000, 22000, 24000, 26000, 28000] : [30000, 32000, 34000, 36000, 38000];
  const figure: number[] = [];
  for (const base of bases) {
    // Prefer a set that names artwork. In practice the band base itself does
    // (CastList is keyed by base: 24000 -> ch_3_4/ch_57_58/s_3_3), so this is
    // a guard for archives where it does not, not a change in behaviour.
    const found = ids.find((id) => id >= base && id < base + 1000 && hasArt(id));
    const set = found ?? base;
    figure.push(set);
    // Colour ids are ColorList keys (1..204 in figuresets_28). An INVALID id
    // silently yields no colour rather than erroring, so keep these in range.
    //
    // ⚠ A GARMENT'S COLOUR IS ITS SET'S, not a pick from a table: the client
    // echoes these defaults straight back in CreateAvatar when the player keeps
    // the default clothes, and navy (12) jeans / near-black (2) shoes then
    // disagreed with the inventory, which draws the set's own colour (see
    // `parseSetColours`). Hair and skin keep the table: they are real choices,
    // and 3 / 16 are both in their sets' lists.
    const listed = coloursOf(set);
    const own = listed && listed.length > 0 ? listed : undefined;
    const choice = defaultColourFor(base);
    figure.push(own && !own.includes(choice) ? own[0] : choice);
  }
  // No hat by default. -1 is what `ParseFigure` expects for "bare head", and it
  // is the one place a -1 colour is correct.
  figure.push(-1, -1);
  return figure.slice(0, FIGURE_SLOTS);
}

/**
 * Clothing sets that can actually be DRAWN: they name art in `CastList`, and
 * every cast they name is present on disk.
 *
 * ⚠ Stricter than the filter `loadAvatarCatalogue` applies, and deliberately
 * so. That one keeps sets with no `CastList` entry at all ("nothing to verify,
 * leave them in rather than silently narrowing") because the avatar builder can
 * fall back to already-loaded frames. A shop shelf has no such fallback: a set
 * with no art renders as an empty square, and a set naming a cast that 404s
 * HANGS the client outright — `CAvatarClothAssetManager` loads serially
 * (`m_iMaxLoading = 1`) and only advances from `_CastLoadCallback`, so one
 * missing file stops the queue dead.
 *
 * That is both shop symptoms from one cause: blank tiles are sets with no
 * CastList entry, and the crash partway down a long page is the first set whose
 * cast is missing from this archive.
 */
/**
 * ⚠ MUST match `figureset_url` in external_variables_casts.txt. The server
 * deciding a set is drawable while the client parses a file that never
 * declares it is the exact shape of the Mr. Smee Hat bug, just inverted.
 *
 * _29 over _28: verified a STRICT superset — 0 SetList/CastList ids lost,
 * 14 gained (21003 among them). Those 14 are the Halloween-era additions,
 * which is also why "Spooky Specials" sold items _28 cannot draw.
 */
const FIGURESETS = ["figuresets_29", "figuresets_28"];
const figureSetsFile = (): string | null =>
  FIGURESETS.map(downloadFile).find((path): path is string => path !== null) ?? null;

/**
 * Is this clothing cast (`ch_3_4`, from CastList) loadable? The client loads
 * `vmk_clothes/vmk_avatar_<cast>`, so ask whether THAT has been extracted.
 */
const clothesCastPresent = (cast: string): boolean => castExtracted(`vmk_avatar_${cast}`);

export function drawableClothingSets(): Set<number> {
  const source = figureSetsFile();
  if (!source) return new Set();

  const figureSets = readFileSync(source, "latin1");
  const castsBySet = parseCastList(figureSets);
  // ⚠ BOTH lists are required, and checking only CastList is the subtle failure.
  //
  // `CastList` says which .cct holds a set's artwork; `SetList` says which PART
  // and COLOUR ids the set actually draws. A set present in the first and
  // absent from the second loads its cast perfectly and then renders nothing,
  // because there is no part to composite — a blank square on the shelf.
  //
  // Mr. Smee Hat (21003) is exactly that: CastList gives `ht_89_90`, the file
  // is on disk, and SetList has no 21003 entry at all. Neighbouring hats
  // (21002 -> [[71],[1]]) all carry one.
  const declared = new Set(parseSetIds(figureSets));

  const drawable = new Set<number>();
  for (const [id, casts] of castsBySet) {
    if (!declared.has(id)) continue;
    if (casts.length > 0 && casts.every(clothesCastPresent)) drawable.add(id);
  }
  return drawable;
}

export function loadAvatarCatalogue(): AvatarCatalogue {
  const source = figureSetsFile();

  if (!source) {
    // Without the real file we cannot offer a catalogue the client can resolve.
    // Say so loudly rather than advertise ids that will render as nothing.
    console.warn(
      `[avatar] ${FIGURESETS.join(" / ")} not found in assets/overlay/siteref/homepage/download — ` +
        "avatar creation will offer no clothing.",
    );
    return { male: [], female: [], defaultMale: [], defaultFemale: [], source: "(missing)" };
  }

  const figureSets = readFileSync(source, "latin1");
  const allIds = parseSetIds(figureSets);
  const setColours = parseSetColours(figureSets);

  // Drop sets whose cast files are not in the archive.
  //
  // ⚠ This is not tidiness — a missing cast HANGS avatar creation. The client
  // loads clothes strictly serially (`m_iMaxLoading = 1`) and only advances the
  // queue from `_CastLoadCallback`. A cast that 404s never fires that callback,
  // so the one missing file stops all ~480 of them and the creation screen never
  // appears. Measured: `vmk_clothes/vmk_avatar_s_67_67.cct` is absent from this
  // archive (`s_70_70` is present) and halted the loader at 83 of 482.
  //
  // Same reasoning as the "dropped N unresolvable cast(s) so their rooms can
  // still load" pass in assets.ts: advertise only what we can actually serve.
  const castsBySet = parseCastList(figureSets);

  /**
   * Does this set actually name any art?
   *
   * A set is drawable only through its CastList entry (`24000: ["ch_3_4", …]`
   * -> `vmk_avatar_ch_3_4.cct`). Sets with NO entry — which includes every bare
   * band base like 20000 — resolve to no cast at all and render from whatever
   * fallback frames happen to be loaded. They pass the filter below only
   * because there is nothing to check, so they must be excluded explicitly when
   * choosing a default.
   */
  const hasArt = (id: number): boolean => (castsBySet.get(id)?.length ?? 0) > 0;

  const missingCasts = new Set<string>();
  const ids = allIds.filter((id) => {
    const casts = castsBySet.get(id);
    if (casts === undefined || casts.length === 0) {
      // No CastList entry: nothing to verify, and the client resolves these
      // through other means. Leave them in rather than silently narrowing.
      return true;
    }
    const absent = casts.filter((cast) => !clothesCastPresent(cast));
    for (const cast of absent) {
      missingCasts.add(cast);
    }
    return absent.length === 0;
  });

  if (missingCasts.size > 0) {
    console.log(
      `[avatar] dropped ${allIds.length - ids.length} set(s) whose casts are not extracted ` +
        `(${missingCasts.size} missing cast(s): ${[...missingCasts].sort().join(", ")})`,
    );
  }

  // ⚠ APPLIED AFTER the cast check above, never instead of it. An id on the
  // list whose artwork the archive lacks must still be dropped: every set we
  // advertise becomes serial work for CAvatarClothAssetManager, and one that
  // cannot load leaves `m_ar_ClothesToLoad` non-empty so `AllClothesLoaded`
  // never fires and registration stalls with nothing on the wire to say why.
  // ⚠ Blocked ids go FIRST, before the registration list and before the
  // per-band cap. Filtering later would let a blocked set consume one of the
  // `VMK_AVATAR_SET_LIMIT` slots for its band and then vanish, so the band
  // would silently offer one fewer item than asked for.
  const registration = registrationClothing(ROOT);
  let offered = ids;
  if (BLOCKED_SETS.size > 0) {
    const blocked = ids.filter((id) => BLOCKED_SETS.has(id));
    if (blocked.length > 0) {
      offered = offered.filter((id) => !BLOCKED_SETS.has(id));
      console.log(`[avatar] blocked ${blocked.length} set(s): ${blocked.join(", ")}`);
    }
  }
  if (registration) {
    const before = offered.length;
    // ⚠ Only the bands the list actually covers. It is tops/bottoms/shoes
    // (ch/pn/sh); it has no hair, head or hat entries, so those bands pass
    // through to the figureset as before. Filtering by "not on the list" across
    // ALL bands would leave the creation screen with no hair and no faces —
    // and `CRegClothesLoader.DefineAvailableSets` skips those bands anyway, so
    // they are not the list's business.
    // ⚠ Filters `offered`, not `ids` — chaining from `ids` here would discard
    // the block applied above and put blocked sets back into the wardrobe.
    offered = offered.filter((id) => !registration.bands.has(bandOf(id)) || registration.ids.has(id));
    console.log(
      `[avatar] registration clothing list: ${registration.ids.size} id(s) across ` +
        `${[...registration.bands].map(bandName).join("/")}; ` +
        `${before} set(s) -> ${offered.length} after filtering ` +
        `(${registration.matched(ids)} of the list have extracted art)`,
    );
  }

  // The unisex 4xxxx band belongs to BOTH lists, not to neither.
  let male = offered.filter((id) => ["male", "both"].includes(bandFor(id)));
  let female = offered.filter((id) => ["female", "both"].includes(bandFor(id)));

  // `VMK_AVATAR_SET_LIMIT=<n>` caps how many sets we advertise, n PER PART RANGE.
  //
  // This is a diagnostic knob, not a preference. Every set we list becomes work
  // for the client: CRegClothesLoader adds each one to `m_ar_ClothesToLoad` and
  // asks CAvatarClothAssetManager to load its casts, and the manager runs
  // strictly serially (`m_iMaxLoading = 1`), draining its pending queue only
  // from `_CastLoadCallback`. Registration does not continue until that list
  // empties. So the full catalogue is the worst case for a loader that is
  // stalling, and shrinking it separates "too much work" from "the callback
  // chain is broken".
  //
  // ⚠ PER RANGE, not the first n overall. `CRegClothesLoader.DefineAvailableSets`
  // **skips hr and hd** (the x0000 and x2000/x3000 bands) and queues nothing for
  // them. The ids are ascending, so a plain `slice(0, n)` returns hair and heads
  // only, queues zero clothes, and `AllClothesLoaded` can then never fire —
  // which looks exactly like the stall being investigated. Taking n from each
  // 1000-band guarantees the loadable types (ht, ch, pn, sh) are represented.
  const limit = Number(process.env.VMK_AVATAR_SET_LIMIT);
  if (Number.isInteger(limit) && limit > 0) {
    const perRange = (list: number[]): number[] => {
      const taken = new Map<number, number>();
      return list.filter((id) => {
        const band = Math.floor(id / 1000);
        const n = taken.get(band) ?? 0;
        if (n >= limit) {
          return false;
        }
        taken.set(band, n + 1);
        return true;
      });
    };
    male = perRange(male);
    female = perRange(female);
  }

  return {
    male,
    female,
    // Defaults come from what is actually OFFERED — a starting outfit the
    // player cannot then find in the pickers reads as the screen being broken.
    defaultMale: buildDefault(offered, "male", hasArt, (id) => setColours.get(id)),
    defaultFemale: buildDefault(offered, "female", hasArt, (id) => setColours.get(id)),
    source,
  };
}
