/**
 * Brings VMK's framework up in a browser, once, for any page that needs it.
 *
 * This exists because three pages had grown their own copy of the same setup and
 * the copies had drifted. It is deliberately thin: it wires the HOST side —
 * cast, fonts, movie environment, network — and then hands control to
 * `Client_Initialization_Script.startClient`, which is the client's own entry
 * point and does everything else itself.
 *
 * ⚠ Nothing here reimplements VMK. Creating managers, parsing `System Props` and
 * `System Texts`, indexing members, building the boot thread: `startClient` does
 * all of it. Every host-side reimplementation of one of those steps has cost a
 * debugging round.
 */
import {
  LingoImage,
  registerDispatchBuiltins,
  registerPureBuiltins,
} from "./lingo-builtins.js";
import {
  CastLib,
  CastRegistry,
  onFieldSelection,
  parseCastManifest,
  registerCastBuiltins,
  setBitmapLoader,
  setCastFileLoader,
  type CastMember,
  type FilmLoopScore,
  type SpriteChannel,
} from "./lingo-cast.js";
import { installMovieEnvironment } from "./lingo-environment.js";
import { registerNetBuiltins } from "./lingo-net.js";
import { decodePng } from "./lingo-png.js";
import { prewarmSound, soundStats } from "./lingo-sound.js";
import { canvasMeasurer, CONVERTED_FONTS, setTextMeasurer } from "./lingo-text.js";
import {
  INK_BACKGROUND_TRANSPARENT,
  INK_MATTE,
  registerStageBuiltins,
  Stage,
} from "./lingo-stage.js";
import { loadGlyphAtlases, measureAtlasText } from "./lingo-glyph-atlas.js";
import {
  defineLingoClasses,
  registerApiHandlers,
  type HandlerModule,
  type LingoClass,
} from "./lingo-script.js";
import {
  callMethod,
  callNamed,
  lingoTruthy,
  objectRespondsTo,
  registerFallbackHandlers,
  registerHandlers,
  registerHostHandlers,
  resetLingoRuntime,
  setTheProperty,
  symbol,
  theProperty,
  setHandlerProfiler,
  type LingoObject,
  type LingoValue,
} from "./lingo-runtime.js";

/**
 * The converted PFR1 faces, by the family name the browser will know them as.
 *
 * ⚠ Imported, not restated. The draw path in `lingo-stage.ts` asks for these
 * same names, and when the two lists were written out separately they drifted:
 * text was measured with the real face and painted with a fallback.
 */
const FONT_FILES = CONVERTED_FONTS;

/**
 * A body-part member name, e.g. `std_lsh_1_3_0` — `<action>_<part>_<model>_
 * <dir>_<frame>`. These are prefetched (they compose synchronously; see
 * `loadCastArt`) AND kept at `use_alpha` = 0: the avatar figure composites its
 * parts opaquely and takes its silhouette from `setAlpha`, so flagging them as
 * embedded-alpha would double the alpha pass. Every OTHER bitmap is treated as
 * embedded-alpha — see `CastMember.useEmbeddedAlpha`.
 */
const isBodyPartMember = (name: string): boolean =>
  /^[a-z]{2,3}\d?_[a-z]{2,3}\d?_\d+_\d+_\d+$/.test(name);

/**
 * Whether a bitmap needs its colour-under-alpha rescued (`opaqueCopy`).
 *
 * ⚠ BODY PARTS ONLY. The rescue is a second, JavaScript PNG decode plus a pass
 * over every pixel, and its one consumer is `copyPixels`'s ink-41 tint — how the
 * avatar's parts are coloured, where the facial features live in transparent
 * pixels. Done for every bitmap it was the TOP CPU cost of a room load
 * (MEASURED with the sampling profiler in the Steamboat: 17.8% self), because a
 * room backdrop is ~460,000 pixels decoded for colour nothing ever reads.
 */
const wantsOpaqueCopy = (name: string): boolean => isBodyPartMember(name);

/**
 * ⚠ MAGIC EFFECTS FLICKERED THE FIRST TIME THEY PLAYED — the NPC flicker again.
 *
 * `CMagicFactor` steps a sprite through frames like `magic_teleport_01..16`,
 * and each frame's PNG was fetched only when first shown, so every new frame
 * drew nothing for a tick or two on the first cast. The NPC fix (make the cast
 * resident) does not fit here: this cast is 1,346 bitmaps / 22 MB, mostly car
 * frames, and residency would hold the cast back until all of it arrived.
 *
 * So: prefetch by FAMILY. A frame's family is its name less the last number
 * (`magic_teleport_01` -> `magic_teleport`, `wlk_carback_111_2_0` ->
 * `wlk_carback_111_2`: one car, one facing), and the first frame of a family to
 * be requested pulls in the rest in the same moment.
 */
const MAGIC_FX_CASTS = new Set(["vmk_avatar_magic_clothes", "38319376ce23dfbcd058e8f4b575f628"]);
const effectFamilies = new Map<string, CastMember[]>();
const effectFamiliesFetched = new Set<string>();
/**
 * The family is the name with ALL trailing number groups dropped, so every
 * direction comes in together: `wlk_carback_110_1_0` -> `wlk_carback_110`.
 * Dropping only the last group made each DIRECTION its own family, and the
 * car vanished for a moment every time the driver turned.
 */
const effectFamilyOf = (name: string): string | null => {
  const base = name.replace(/(?:_?\d+)+$/, "");
  return base !== "" && base !== name ? base : null;
};

/**
 * Magic-effect art that `CMagicFactor.createUnionImageFromMemberList` stacks
 * around the avatar (gold pile back / avatar / gold pile front, cars, carpet…)
 * — the same union-and-`setAlpha` build as the ride vehicles, so it needs its
 * embedded alpha for the same reason. MEASURED symptom: Buried in Treasure drew
 * the avatar as a black silhouette inside its coin pile.
 *
 * ⚠ Scoped by NAME, not by cast: the same cast holds held-item frames
 * (`std_lfood`, `drk_rfood`) and NPC bodies (`wlk_npc`) that are composed as
 * body parts at use_alpha 0, plus the fuel-meter UI.
 */
const isMagicFxMember = (name: string): boolean =>
  /^(magic_|Magic_|bubbles|confetti_magic|flame|lightning|wlk_car(back|front)_|royal|tsmcar_)/.test(name);

/** A ride-vehicle piece `CAvatarVehicle.update` draws around the avatar (legs 5..13). */
const isVehicleMember = (name: string): boolean =>
  /^(log_\d|magic_everestcar_|magic_rocket_|magic_donut(tl|bb)_|alicecar_|ppship_|magic_raft(bb|tl)_)/.test(name);

/**
 * ⚠ The pool of empty cast libs the Director movie ships with.
 *
 * `CMgrCastload.InitPreloader` scans `1..number of castLibs` for libs named
 * `"empty 1"`, `"empty 2"`, … and every external cast the client downloads is
 * attached into one by `getAvailableEmptyCast` → `setImportedCast`. With no
 * pool, `getAvailableEmptyCast` returns 0, `setImportedCast` is skipped, and the
 * load reports success while attaching nothing.
 */
/**
 * ⚠ 40 WAS NOT ENOUGH, AND RUNNING OUT IS SILENT.
 *
 * `CMgrCastload.DoneCurrentDownLoad` attaches a finished download only
 * `if tCastNumber > 0`, and `getAvailableEmptyCast` answers 0 once the pool is
 * dry. The download is still marked done and the task still completes, so the
 * cast reports success while attaching NOTHING — no error, no retry.
 *
 * MEASURED entering musical_mainstreet with 39 casts attached, i.e. 39 of the 40
 * slots taken and exactly one recyclable. `net.operation.count` is 2, so two
 * clothing casts finished downloading while that single slot was in use:
 *
 *     DONE vmk_clothes/vmk_avatar_ch_57_58  state=#done   slot -> 0 (pool 0)
 *     DONE vmk_clothes/vmk_avatar_s_3_3     state=#done   slot -> 0 (pool 0)
 *
 * Those two carry `std_ch2_57_*` — the shirt LOGO, since the figure's chest set
 * parses as `[ch: 3, ch2: 57, ls: 3, rs: 3]` — and `std_ls_3_*` / `std_rs_3_*`,
 * the SLEEVES. Neither reached `CAvatarClothAssetManager.m_mp_sName_rStruct`
 * (their manifests were fetched 200 OK, so this is not a download failure), and
 * the avatar rendered with a plain chest and bare arms while every other garment
 * was correct.
 *
 * An unused empty lib is an empty object, so the headroom costs next to nothing.
 */
const EMPTY_CAST_SLOTS = 160;

/**
 * ⚠ A CAST'S ART IS RESIDENT WHEN THE CAST ATTACHES. This is the shape
 * Director has, and matching it is what stops windows drawing in pieces.
 *
 * A `.cct` is ONE file. When Director attached a cast, its bitmap pixels were
 * already in memory, so any window built from that cast drew COMPLETE on its
 * first frame. This port used to attach a cast after fetching only its
 * manifest, size index and text, then fetch each PNG lazily on first read —
 * and text rasterises synchronously while art is still in flight. The visible
 * result is captions appearing before (or without) the panels behind them,
 * which is precisely the reported "I see text before I see images".
 *
 * Every blank-panel and flicker symptom chased in this port is downstream of
 * that one divergence, which is why fixing them individually never held.
 *
 * ⚠ BOUNDED, and the bound is measured (`tools/measure-cast-art.mjs`):
 *
 *     41 casts, 114.2 MB of art in total
 *     but 35 of them hold  0.4 MB between them
 *     5 bulk casts hold   95.2 MB  (avatars, items, room art)
 *     the window-chrome cast is 10.7 MB — the one dialogs are built from
 *
 * So the art windows need is small and bounded; the bulk is exactly the
 * material Director itself streamed per room. The cap admits the former and
 * excludes the latter.
 *
 * An earlier attempt at this WAS reverted for making the boot twice as slow —
 * but that was while the dev server was still spending 32 s on per-handler
 * module requests, so the art fetches queued behind them. That cost is gone
 * (per-cast chunking; 99 ms), which is what makes this viable now.
 */
const ART_RESIDENT_CONCURRENCY = 8;
/**
 * How many bitmaps decode at once when they come out of a cast's pack — the
 * network is out of the picture there, and the browser decodes in parallel off
 * the main thread. See `loadCastArt`.
 */
const PACKED_DECODE_CONCURRENCY = 64;


export interface BootOptions {
  /** Where the extracted framework cast lives, e.g. `/core/core.old`. */
  coreUrl: string;
  /**
   * Where the extracted MOVIE cast lives, e.g. `/core/framework_disney`.
   *
   * Defaults to a sibling of `coreUrl`. This is the cast inside
   * `framework_disney.dcr` — the file the plugin is actually pointed at — and it
   * carries the boot `Logo`. See the merge in `bootClient`.
   */
  movieUrl?: string;
  /** The movie's stage. */
  canvas: HTMLCanvasElement;
  /** The framework cast's transpiled handlers, from `import.meta.glob`. */
  modules: Record<string, HandlerModule>;
  /**
   * Each game cast's transpiled handlers, LAZILY — `import.meta.glob` without
   * `eager`, keyed by path.
   *
   * ⚠ Must be lazy. Eagerly importing all 40 casts is 5,079 modules, which the
   * dev server turns into 5,079 requests and hangs. It is also wrong in
   * principle: VMK loads casts at runtime, so a cast's Lingo should arrive when
   * the cast does, not at boot.
   */
  castModules?: Record<string, () => Promise<unknown>>;
  /**
   * Publish the inspection hooks (`window.vmkPerf`, `vmkProbe`,
   * `vmkBitmapStats`, `vmkSoundStats`) and arm the early-draw probe. Off for
   * players — see `src/debug.ts`.
   */
  debug?: boolean;
  /** Trace sink; defaults to the console. */
  log?: (line: string) => void;
}

export interface BootedClient {
  registry: CastRegistry;
  stage: Stage;
  classes: Map<string, LingoClass>;
  /** `startClient`'s return value — 1 on success. */
  started: LingoValue;
  /** The object manager. */
  core: LingoObject;
  /** The `#core` thread, whose `pState` drives the boot. */
  bootThread: LingoObject;
}

/**
 * Script members whose shipped NAME is not the name their own cast asks for.
 *
 * ⚠ THE MESSENGER NEVER BUILT. `0b6ee192`'s `thread.index` declares
 * `handler.class = CMessengerHandler`, but the cast's handler script — every
 * `MessengerInit`/`friendlist`/`AdminMessage` handler, same code as the
 * `CMessengerHandler` in an unshipped extras cast `2230483a` — is named
 * `CMessyCheeseStuff` (member 13; the name is in the .cct itself, not an
 * extraction artefact). So `buildThreadObj(#Messenger_handler)` hit
 * `Script not found: 0`, the thread had no handler, nothing listened for
 * `init_messenger`, and `540 MessengerInit` was never sent: no friends list,
 * no inbox, no incoming message of any kind.
 *
 * Applied to the manifest text (so the MEMBER answers to the name) and to the
 * class table (so the member resolves to its transpiled class). In code rather
 * than in the extracted manifest so a re-extraction cannot silently undo it.
 */
/**
 * Classes a served cast carries an OUTDATED build of, and the cast whose build
 * to use instead: `castKey -> [className, fromCastKey]`.
 *
 * ⚠ `CRoomItemSound` — Sound Furniture A–E (1296–1300). The furniture-code
 * casts the live config loads (`cast.entry.13` = 312ea5aa, and its twin
 * c7d81c17) have the early design, which looks for one looping member
 * `item.<N>.sound`. The items' own casts instead ship
 * `SoundFurni<N>sound.xml` + `SoundFurni<N>Tracker.xml`, which only the
 * `vmk_furniture_code` build understands: it hands them to the room's
 * `CSoundTracker` in place of the room's own score, and puts the room's score
 * back when the item is picked up. With the early build the item found no
 * `item.1300.sound` and stayed silent — as it presumably did live, since the
 * items were never sold.
 */
const CLASS_SUBSTITUTES: Record<string, Array<[className: string, fromCast: string]>> = {
  "312ea5aa5d6c166d8f614e2d3c0e4920": [["CRoomItemSound", "vmk_furniture_code"]],
  "c7d81c175a2637e0193f0cf7bfd014ba": [["CRoomItemSound", "vmk_furniture_code"]],
};

const MEMBER_RENAMES: Record<string, Array<[from: string, to: string]>> = {
  "0b6ee19273580ef7ae01b42744cca0a6": [["CMessyCheeseStuff", "CMessengerHandler"]],
};

function renameMembers(key: string, manifest: string): string {
  let out = manifest;
  for (const [from, to] of MEMBER_RENAMES[key] ?? []) {
    // Column 3 is `member_name`; tabs on both sides keep it to that column.
    out = out.split(`\t${from}\t`).join(`\t${to}\t`);
  }
  return out;
}

/**
 * Decodes a fetched config file (`external_texts.txt`, `external_variables*.txt`).
 *
 * ⚠ NOT `response.text()`, which always decodes UTF-8 whatever the server's
 * charset says. VMK's texts are Windows-1252 bytes — Director read them in the
 * system ANSI codepage — so the lone `AE` of "Disneyland®" decoded to U+FFFD
 * and drew as a gap. A file that IS valid UTF-8 is taken as UTF-8; anything
 * else is read the way Director read it.
 */
function decodeConfigText(bytes: ArrayBuffer): string {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return new TextDecoder("windows-1252").decode(bytes);
  }
}

async function loadFonts(): Promise<void> {
  await Promise.all(
    FONT_FILES.map(async ([family, file]) => {
      const face = new FontFace(family, `url(/fonts/${file})`);
      await face.load();
      document.fonts.add(face);
    }),
  );
  /**
   * ⚠ AND THE HINTED GLYPH ATLASES, awaited HERE rather than fired off.
   *
   * The compositor draws synchronously, so an atlas that lands after the first
   * frame is simply never consulted for text already composed — the name list
   * would keep its canvas-drawn glyphs for the rest of the session and the
   * atlas would look broken when it is merely late. See `lingo-glyph-atlas`.
   */
  await loadGlyphAtlases("/fonts/atlas");
}

/**
 * ⚠ Only embedded faces are substituted. A binary scan of every cast finds no
 * PFR1 at all, and the data names just Verdana and Courier — OS fonts Director
 * took from the system, and the same ones the original measured against. They
 * pass straight through; only genuinely unavailable names fall back, and those
 * are reported rather than absorbed.
 */
function makeFontResolver(log: (line: string) => void): (name: string) => string {
  const reported = new Set<string>();
  return (rawName) => {
    /**
     * ⚠ STRIP DIRECTOR'S TRAILING ` *` FIRST, as `substituteFont` does.
     *
     * Members carry names like `"Folio BoldCondensed *"`. Left on, the `*`
     * matched no converted face, and `document.fonts.check` answers TRUE for a
     * family it has never heard of — so the raw name passed through and the
     * canvas silently MEASURED in sans-serif while the stage DREW in Folio.
     * MEASURED: "CANCEL" 63.3px measured vs 38.3px drawn. Every button sized and
     * centred its caption for the wider face, so the longer the caption, the
     * further left it sat.
     */
    const name = String(rawName ?? "").replace(/\s*\*\s*$/, "").trim();
    const wanted = name.replace(/\s+/g, "").toLowerCase();
    const converted = FONT_FILES.find(([family]) => family.toLowerCase() === wanted);
    if (converted) return converted[0];
    if (name && document.fonts.check(`12px "${name}"`)) return name;
    if (name && !reported.has(name)) {
      reported.add(name);
      log(`font unavailable: "${name}" - measuring with Foxley816`);
    }
    return "Foxley816";
  };
}

/**
 * Director's ink modes, applied to a member's art.
 *
 * ⚠ Without this every sprite draws with COPY ink — its background rectangle
 * included — so window chrome and avatars sit in opaque boxes. `Stage` has
 * always had the hook; nothing was ever passed to it.
 *
 * ⚠ Synchronous on purpose. `getImageData`/`putImageData` are, and the result is
 * a CANVAS, which `drawImage` accepts directly — going through
 * `createImageBitmap` would make this async and the compositor would have
 * nothing to draw this frame.
 *
 * The two transforms, and why they differ (this shape is taken from the
 * `mycoke-shockwave-port` reference, which is the same Director/SmartFox stack
 * and had already paid for the details):
 *
 *   ink 36, background transparent — key out EVERY pixel matching the
 *     background colour, wherever it is. Interior pixels of that colour go too;
 *     that is the documented price of ink 36.
 *   ink 8, matte — flood-fill from the four corners, so only background
 *     CONNECTED to an edge is removed and an interior highlight survives.
 *
 * ⚠ The key colour is the top-left pixel when it is opaque, else white — an
 * extracted PNG may already have had its background stripped. And the tolerance
 * is TIGHT (4): the reference project used 18 and it ate legitimate interior
 * highlights.
 */
function prepareInk(member: CastMember, ink: number): unknown | undefined {
  /**
   * ⚠ ADD PIN (33) / ADD (34) DROP THE WHITE BACKGROUND before adding.
   *
   * The stage blits them with canvas `lighter`, and white added to anything is
   * white. Every Christmas room's snow (`vmk_holiday_animation`, `snowfall.ani`,
   * INK="33" on all 54 sprites) is opaque WHITE art with grey flakes, so it drew
   * as six white boxes across the top of the room. MEASURED against the real
   * Shockwave client: the same band shows bright flakes over the scene, no box.
   * Director treats the background as transparent for the additive inks;
   * LibreShockwave does the same edge flood fill (`applyFloodFillTransparency`,
   * InkProcessor.cpp) before ADD_PIN/ADD. So these take the matte path below,
   * keyed white: art with no white edge (the navigator's olive land highlights)
   * comes back unchanged and keeps drawing raw.
   */
  const additive = ink === 33 || ink === 34;
  if (ink !== INK_MATTE && ink !== INK_BACKGROUND_TRANSPARENT && !additive) return undefined;

  const held = member.image;
  const source = held instanceof LingoImage ? held.source : held;
  if (source === null || source === undefined) return undefined;

  /**
   * ⚠ Size from the ART, not from `member.rect`.
   *
   * A runtime buffer member — every window element — has an image but NO rect,
   * so reading the rect gave 1x1. This keyed a single white pixel and returned
   * a 1x1 canvas, which the compositor then stretched across the whole element:
   * a solid white slab exactly the element's size, sitting over the artwork.
   *
   * That is what the three white rectangles across the custom loading screen
   * were. VMK fills a text element's buffer white on purpose
   * (`CWindowTextWrapper.setText`) and relies on ink 36 to knock it back out —
   * so getting the ink surface wrong turns a deliberate white into an opaque
   * one.
   */
  const art = source as { width?: unknown; height?: unknown } | null;
  const artWidth = typeof art?.width === "number" ? art.width : 0;
  const artHeight = typeof art?.height === "number" ? art.height : 0;
  const width = Math.max(1, Math.floor(artWidth || member.width || member.rect.width || 1));
  const height = Math.max(1, Math.floor(artHeight || member.height || member.rect.height || 1));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return undefined;

  try {
    context.drawImage(source as CanvasImageSource, 0, 0);
  } catch {
    return undefined;
  }

  const frame = context.getImageData(0, 0, width, height);
  const pixels = frame.data;
  /**
   * ⚠ INK 36 KEYS **WHITE** — the MEMBER's background colour, not the sprite's.
   *
   * Director's "background transparent" keys out the background colour of the
   * sprite's CAST MEMBER. Every VMK window element is a bitmap member built at
   * runtime by `CWindow.buildVisual` — `createMember(#bitmap)` then
   * `image(w, h, depth)` — and both of those default to WHITE in Director. So
   * for the entire window system the key is white, always.
   *
   * Two lines of VMK's own Lingo confirm it:
   *
   *   CWindowUniqueElement.Define    if tProps[#bgColor] <> rgb(255,255,255)
   *                                    then pParams[#bgColor] = ...
   *     — white is the value worth OMITTING, i.e. the assumed default.
   *   CWindow.buildVisual            fill(tAlpha, rect, rgb(255,255,255))
   *     — the buffer starts fully opaque, so "background" means the white it
   *       was born with, wherever nothing has been drawn over it.
   *
   * ⚠ Three earlier key rules all failed, and each failure is explained here:
   *
   *   corner pixel   — a FLAT-FILLED buffer's corner IS the fill, so the key
   *                    matched every pixel and erased the whole image. That is
   *                    what hid the dictionary progress bar: a uniform
   *                    rgb(0,102,161) that composited on channel 11, visible,
   *                    with real pixels, at 100% transparency. It drew
   *                    perfectly and could not be seen.
   *   sprite bgColor — MEASURED as rgb(0,0,0) on every sprite. Keying black
   *                    left the white fill of a text buffer opaque, which is
   *                    the white slabs over the captions. Wrong PROPERTY: the
   *                    sprite's bgColor is not the member's.
   *   white          — this one. Previously dismissed by reading that black
   *                    measurement as if it were the member's colour.
   *
   * Note what white does for the progress bar: a bar filled edge to edge with
   * rgb(0,102,161) has NO white, so nothing matches, `changed` stays 0 and the
   * ink variant is discarded — the bar draws untouched. Ink 36 is correctly a
   * no-op for a buffer that is entirely covered by art, which is what Director
   * does too and what every key-by-content rule got wrong.
   *
   * ⚠ Scoped to ink 36 ONLY. Director's matte keys the same member colour, but
   * ink 8 is applied to genuine cast artwork whose extracted background is not
   * reliably white, and its flood-fill from the corners already bounds the
   * damage. Switching both at once would risk turning every non-white matte
   * background into an opaque box AND confound the result for this fix. Ink 8
   * keeps the corner heuristic until it has a measurement of its own.
   */
  /**
   * ⚠ Keying by the buffer's own `fillColor` was TRIED and REVERTED.
   *
   * The theory was that `CWindowImageWrapper.feedImage` fills an element with
   * its declared `pProps[#bgColor]` — the panel's orange for the registration
   * slot thumbnails — so ink 36 should knock ORANGE out rather than white.
   *
   * MEASURED, and the premise was wrong: those slot buffers report
   * `fillColor: 255,255,255`. They are filled WHITE, key white, and the orange
   * visible around a thumbnail is the PANEL showing through correctly. There is
   * no element yet observed whose fill is anything else, so keying by
   * `fillColor` would have been an untested behaviour change justified by a
   * misreading. White stands, for the reasons above.
   */
  /**
   * ⚠ MATTE KEYS THE MEMBER BACKGROUND (WHITE) FOR RUNTIME WINDOW BUFFERS.
   *
   * Director's matte keys the cast member's background colour. For a bitmap
   * loaded from art that colour isn't reliably white, so the historic heuristic
   * used the TOP-LEFT pixel as the key when that pixel is opaque (`cornerKeyed`).
   * But every window ELEMENT is a runtime buffer (`CWindow.buildVisual` →
   * `createMember(#bitmap)` + `image(w,h,depth)`) that is born WHITE and whose
   * background is therefore white by construction — exactly like ink 36.
   *
   * The corner heuristic is actively WRONG for those: when a buffer is a flat
   * fill (the blue `back2` content panel — `window.middle.middle` painted edge
   * to edge), the corner IS the fill, so keying it flood-filled the ENTIRE panel
   * transparent (MEASURED: back2's matte variant came back 80% clear). The room
   * then showed through wherever nothing else covered it — the right ~40px band
   * and bottom of the client, and the seam line under every title bar — because
   * only the frame's narrower 245px panel was left painting the body.
   *
   * ⚠ SCOPED to CWindow element buffers, NOT every runtime buffer. `buildVisual`
   * names each element `<windowID>_<elementID>` (e.g. `uid:189:22727_back2`), so
   * a runtime buffer (no source art path) whose name carries that `_` separator
   * is a born-white window buffer. Other runtime canvases are NOT born white and
   * MUST keep the corner heuristic: the room avatar HUD (`"671 Canvas"`, no `_`)
   * is the avatar rendered on a BLACK ground, and white-keying it left an opaque
   * black box around the portrait (the "black flicker around the avatar" on
   * load). Real cast art (`door.png`, an imagePath) is likewise untouched — and
   * was already keying white in practice, since art with a transparent corner
   * fails the `pixels[3] === 255` test. See [[window-seethrough-strech]],
   * [[copypixels-had-no-ink36-key]].
   */
  const path = String((member as { imagePath?: string }).imagePath ?? "");
  const isWindowBuffer = path === "" && (member.name ?? "").includes("_");
  const cornerKeyed = ink === INK_MATTE && !isWindowBuffer && pixels[3] === 255;
  const keyR = cornerKeyed ? pixels[0]! : 255;
  const keyG = cornerKeyed ? pixels[1]! : 255;
  const keyB = cornerKeyed ? pixels[2]! : 255;

  /**
   * ⚠ Colour match rules, checked against BOTH LibreShockwave and DirPlayer.
   *
   *   InkProcessor::applyBackgroundTransparent   rgb == bgColorRgb   (EXACT)
   *   InkProcessor::applyMatte                   alpha == 0 || matchesRgb(…, tol)
   *
   * Two differences from what this used to do, and both changed pixels:
   *
   * 1. Ink 36 compares EXACTLY. A tolerance of 4 also ate colours that merely
   *    sat near the key, which on flat UI art is a real risk — VMK's panel fills
   *    are a handful of steps apart.
   * 2. For MATTE, an ALREADY-TRANSPARENT pixel counts as background. This
   *    matters for connectivity, not just for the pixel itself: the flood fill
   *    starts at the corners, and requiring `alpha >= 240` meant a transparent
   *    border stopped the fill dead on its first step. Extracted PNGs routinely
   *    have exactly that, so matte was doing nothing at all on them.
   */
  /**
   * ⚠ MATTE COMPARES EXACTLY TOO — the tolerance of 4 here was wrong.
   *
   * `InkProcessor::applyMatte(src, matteColorRgb, int tolerance = 0)` and every
   * call site in LibreShockwave uses that default, as do its tests
   * (`applyMatte(matteSource, 0xFFFFFF)`). `Drawing.cpp` defaults its matte
   * tolerance to 0 as well. A tolerance is accepted but never asked for.
   *
   * ⚠ THIS IS WHAT ERASED THE CHAT BUBBLE'S OUTLINE AND TAIL. VMK draws the
   * `bubble.color` layer as a STENCIL — the shape is 254,254,254 against a pure
   * 255 background (decoded straight out of `bubble.tile.outline` /
   * `bubble.spike.outline`). One step apart, so a tolerance of 4 made the shape
   * itself match the flood fill's key and the whole layer was consumed.
   *
   * MEASURED on the live bubble buffer: the matte variant came back with 24
   * opaque pixels out of 3672 — the outline, the rounded caps and the tail all
   * gone — which is why the bubble rendered as a bare cream box.
   */
  const tolerance = 0;
  const matches = (at: number): boolean => {
    // Transparent already — background for matte's purposes, and nothing to do
    // for ink 36 either way.
    if (pixels[at + 3]! === 0) return true;
    return (
      Math.abs(pixels[at]! - keyR) <= tolerance &&
      Math.abs(pixels[at + 1]! - keyG) <= tolerance &&
      Math.abs(pixels[at + 2]! - keyB) <= tolerance
    );
  };

  /**
   * ⚠ INK 36 GATE — key only when the background colour is actually on the BORDER.
   *
   * LibreShockwave's `resolveBackColor` returns -1 (→ copy through, no keying)
   * for a background-transparent sprite whose edge is not the opaque key colour;
   * `hasOpaqueBorderColor` scans the edge and bails unless one border pixel is
   * exactly the opaque key. `applyBackgroundTransparent` is then a GLOBAL exact
   * key + force-opaque — which the loop below already matches.
   *
   * Without this gate we keyed white GLOBALLY on every ink-36 member, which:
   *   - ate the white "?" glyph on every window's help button (blue button,
   *     white glyph, BLUE border → there is no white background to remove), and
   *   - forced the near-white antialias of alpha-edged icons fully opaque — the
   *     white fringe on the inventory / registration item thumbnails.
   *
   * A white-filled text or loading-screen buffer has a white border, so it still
   * keys: the historied white-slab / caption fixes are preserved. A buffer with
   * no white at all (the dictionary progress bar) has no white edge, so it copies
   * through untouched — the same result the old "changed === 0" path produced.
   */
  if (ink === INK_BACKGROUND_TRANSPARENT) {
    const isKey = (at: number): boolean =>
      pixels[at + 3]! === 255 && pixels[at]! === keyR && pixels[at + 1]! === keyG && pixels[at + 2]! === keyB;
    let borderHasKey = false;
    for (let x = 0; x < width && !borderHasKey; x++) {
      if (isKey(x * 4) || isKey(((height - 1) * width + x) * 4)) borderHasKey = true;
    }
    for (let y = 0; y < height && !borderHasKey; y++) {
      if (isKey(y * width * 4) || isKey((y * width + width - 1) * 4)) borderHasKey = true;
    }
    if (!borderHasKey) return undefined;
  }

  let changed = 0;
  if (ink === INK_BACKGROUND_TRANSPARENT) {
    for (let at = 0; at < pixels.length; at += 4) {
      if (pixels[at + 3]! === 0) continue; // already clear; leave it
      if (matches(at)) {
        pixels[at + 3] = 0;
        changed++;
        continue;
      }
      /**
       * ⚠ Everything that survives becomes FULLY OPAQUE — `applyBackgroundTransparent`
       * pushes `pixel | 0xFF000000`. Director's ink 36 is a keyed blit, not an
       * alpha composite: a pixel is either the background colour or it is solid
       * art. Leaving partial alpha in place let antialiased edges from the
       * extracted PNG show the panel colour through, which reads as a faint halo
       * around every keyed sprite.
       */
      if (pixels[at + 3]! !== 255) {
        pixels[at + 3] = 255;
        changed++;
      }
    }
  } else {
    // Matte: only background REACHABLE FROM AN EDGE, so an interior region of
    // the same colour survives. That is the documented difference from ink 36.
    const seen = new Uint8Array(width * height);
    const stack: number[] = [0, width - 1, (height - 1) * width, height * width - 1];
    while (stack.length > 0) {
      const point = stack.pop()!;
      if (seen[point] === 1) continue;
      seen[point] = 1;
      const at = point * 4;
      if (!matches(at)) continue;
      if (pixels[at + 3]! !== 0) {
        pixels[at + 3] = 0;
        changed++;
      }
      const x = point % width;
      const y = (point - x) / width;
      if (x > 0) stack.push(point - 1);
      if (x < width - 1) stack.push(point + 1);
      if (y > 0) stack.push(point - width);
      if (y < height - 1) stack.push(point + width);
    }
  }

  if (changed === 0) return undefined;
  context.putImageData(frame, 0, 0);
  return canvas;
}

/**
 * Where `getPref`/`setPref` keep their values: `localStorage`, the browser's
 * stand-in for the prefs file Director writes to disk.
 *
 * ⚠ Without it prefs lived in a Map and died with the page, so
 * `Special_Services_Class.getMachineID` — `getPref(pref.value.id)`, minting
 * `Encipher(the milliSeconds)` only when that is empty — sent a NEW machine id
 * on every load. Housekeeping's clone check and session log key on it.
 *
 * `vmk_cached_pass` is never persisted: `CLoginWindow` caches the typed
 * password through setPref, and a browser profile is no place for it. Storage
 * that throws (private mode, blocked site data) degrades to memory.
 */
function lingoPrefStorage(): { getItem(key: string): string | null; setItem(key: string, value: string): void } {
  const PREFIX = "vmk.pref.";
  const NEVER_PERSIST = new Set(["vmk_cached_pass"]);
  const memory = new Map<string, string>();
  return {
    getItem(key) {
      if (!NEVER_PERSIST.has(key)) {
        try {
          const stored = globalThis.localStorage?.getItem(PREFIX + key);
          if (stored !== null && stored !== undefined) return stored;
        } catch {
          /* storage unavailable — fall through to memory */
        }
      }
      return memory.get(key) ?? null;
    },
    setItem(key, value) {
      memory.set(key, value);
      if (NEVER_PERSIST.has(key)) return;
      try {
        globalThis.localStorage?.setItem(PREFIX + key, value);
      } catch {
        /* storage unavailable — memory only */
      }
    },
  };
}

export async function bootClient(options: BootOptions): Promise<BootedClient> {
  const log = options.log ?? ((line: string) => void console.log(line));

  resetLingoRuntime();
  registerPureBuiltins();
  registerDispatchBuiltins({ storage: lingoPrefStorage() });

  // ---- the framework cast -------------------------------------------------
  // ⚠ Named "core", not "Internal": `CMgrCastload.construct` does
  // `castLib("core")._number` and `castLib(getVariable("dynamic.bin.cast"))`.
  const manifest = await (await fetch(`${options.coreUrl}/manifest.tsv`)).text();
  const registry = new CastRegistry();
  const internal = parseCastManifest(manifest, "core", 1);
  registry.addLib(internal);

  await Promise.all(
    manifest.split(/\r?\n/).slice(1).map(async (row) => {
      const [id, , , , , , asset] = row.split("\t");
      if (!asset?.startsWith("text/")) return;
      const member = internal.find(Number(id));
      if (member) member.text = await (await fetch(`${options.coreUrl}/${asset}`)).text();
    }),
  );

  /**
   * The MOVIE's own internal cast, merged into cast lib 1.
   *
   * ⚠ `core.old.cct` is the framework, not the movie. The client the plugin
   * actually loads is `framework_disney.dcr`, and its internal cast holds three
   * members — `MainEvents`, `CInit`, and the **`Logo` bitmap**. Booting from
   * `core.old` alone leaves `member("Logo")` absent, so
   * `Core Thread Class.showLogo` reserves no sprite and the boot logo never
   * appears; the only other `Logo` in the whole asset set is in `cast.entry.34`
   * of 37, far too late for a logo meant to be up for the entire load.
   *
   * Merged rather than added as its own lib because these ARE lib 1 from
   * Lingo's point of view — the movie's cast is the internal cast. Their ids
   * (53, 76, 125) do not collide with anything in `core.old`.
   */
  const movieUrl = options.movieUrl ?? options.coreUrl.replace(/\/[^/]+$/, "/framework_disney");
  const movieManifest = await fetch(`${movieUrl}/manifest.tsv`);
  if (movieManifest.ok) {
    const sizes = new Map<string, { width: number; height: number }>();
    const sizeIndex = await fetch(`${movieUrl}/bitmaps.tsv`);
    if (sizeIndex.ok) {
      for (const row of (await sizeIndex.text()).split(/\r?\n/).slice(1)) {
        const [assetPath, width, height] = row.split("\t");
        if (assetPath) sizes.set(assetPath, { width: Number(width), height: Number(height) });
      }
    }
    const movie = parseCastManifest(await movieManifest.text(), "core", 1, {
      sizeOf: (assetPath) => sizes.get(assetPath) ?? null,
    });
    let added = 0;
    for (const member of movie.members) {
      if (member.imagePath !== "") member.imagePath = `${movieUrl}/${member.imagePath}`;
      if (member.soundPath !== "") member.soundPath = `${movieUrl}/${member.soundPath}`;
      internal.add(member);
      added++;
    }
    log(`movie cast: framework_disney (${String(added)} members)`);
  } else {
    log("movie cast: framework_disney NOT served - the boot logo will be missing");
  }

  for (let slot = 1; slot <= EMPTY_CAST_SLOTS; slot++) {
    registry.addLib(new CastLib(slot + 1, `empty ${String(slot)}`));
  }
  registry.addLib(new CastLib(EMPTY_CAST_SLOTS + 2, "bin"));
  registerCastBuiltins(registry);

  const stage = new Stage(registry, options.canvas.width, options.canvas.height, prepareInk);
  registerStageBuiltins(stage);

  await loadFonts();
  /**
   * ⚠ Measure from the ATLAS's exact advances when a face has one, else canvas.
   *
   * The atlas carries the reference rasteriser's integer advances; using them for
   * a member's image size, wrap and `charPosToLoc` centring — the SAME numbers
   * the glyphs are drawn with — is what removes canvas `measureText`'s fractional
   * drift from the whole text path and gets list/window text to pixel parity.
   * Non-atlas faces (Folio, system fonts) fall through to the canvas measurer
   * unchanged. See [[font-size-points-vs-pixels]].
   */
  const canvasFallback = canvasMeasurer(
    document.createElement("canvas").getContext("2d")!, makeFontResolver(log),
  );
  setTextMeasurer((request) => {
    const viaAtlas = measureAtlasText(
      request.font, request.fontSize, request.text, request.fixedLineSpace,
    );
    return viaAtlas ? { ...viaAtlas, estimated: false } : canvasFallback(request);
  });

  // ⚠ Movie scripts are global too, not just `*_API` — `startClient` lives in
  // `Client_Initialization_Script`. The emitter does not record a script's
  // subtype, so the distinction is made from the name.
  /**
   * ⚠ Two casts spell it without the underscore: `CustomLoadingScreenApi` and
   * `QuestNotificationsAPI`. They are movie scripts like the other 20, so their
   * handlers must be global — `CCannedTextManager.update` calls
   * `ShowCustomLoadingScreen` as a bare handler and died on "not implemented"
   * with the implementation sitting right there, unregistered.
   *
   * Checked against every class in both generated trees rather than guessed:
   * exactly 22 names end in api/script, all 22 are API scripts, and only these
   * two were being missed.
   */
  const isGlobalScript = (name: string): boolean =>
    /(_API|_Script)$/i.test(name) || /(API|Api)$/.test(name);

  /**
   * Scripts that expose GLOBAL wrappers without saying so in their name.
   *
   * ⚠ Registered fill-only (`registerFallbackHandlers`), because these are not
   * wholly global. `CDialogWindow` carries `DialogWindowExists` and
   * `createDialogWindow` — thin wrappers that read `the paramCount` and forward
   * to the `#dialogwindow` thread's component, which is the movie-script idiom —
   * next to instance methods like `setText`, which would displace
   * `Text_API.setText` if the class were treated as global outright.
   *
   * The real fix is upstream: the exporter does not record a script's SUBTYPE,
   * so movie-vs-parent cannot be read from the export at all and this list can
   * only grow one blocked boot at a time. `ScriptChunk` in LibreShockwave has
   * the field.
   */
  const GLOBAL_WRAPPER_SCRIPTS = [
    "CDialogWindow",
    /**
     * ⚠ A movie script whose name says nothing. Two handlers, both global
     * debug-HUD helpers reached by `callNamed`:
     * `ShowSpriteLimitCounter` / `HideSpriteLimitCounter`.
     *
     * `CMainInterface.closeLoginWindow` calls the first unqualified, so the
     * whole handler threw "Lingo handler not implemented:
     * ShowSpriteLimitCounter/0" — and it runs off the `login_hide` broadcast, so
     * a debug counter took the login window's teardown with it.
     *
     * Neither name collides with an instance method, so fill-only registration
     * is risk-free here.
     */
    "VMKUTILS",
    /**
     * ⚠ ANOTHER MOVIE SCRIPT WITH A CLASS-LOOKING NAME. Every handler is a
     * global wrapper onto the `CannedField` thread's component:
     *
     *     on CreateCannedField                    -- reads `the paramCount`
     *       …
     *       return getThread("CannedField").getComponent().createNewCannedField(…)
     *
     * plus `ParseCannedField`, `removeCannedField`, `showCannedFields` and
     * `removeAllCannedFields`. Sixteen call sites reach `CreateCannedField`
     * unqualified — the message bar's chat field, the messenger's compose box,
     * help, gifts, camera captions, room naming.
     *
     * ⚠ THIS IS WHY THE NAVIGATOR DID NOT OPEN ON RE-LOGIN. `CMessageBar.
     * showMessageBar` calls it while handling `#ui_show`, so the throw —
     * "Lingo handler not implemented: CreateCannedField/4" — unwound out of
     * `executeMessage(#ui_show)` and aborted `CRegistrationHandler.
     * NavigatorHandshaked` on its SECOND line, three lines before
     * `executeMessage(#ui_navigator)`. The condition guarding that call was
     * fine; the handler simply never got there, and an existing character
     * landed on an empty stage with only the message bar drawn.
     *
     * None of the five names collides with an instance method, so fill-only.
     */
    "CCannedField",
    /**
     * ⚠ THE OTHER HALF OF THE CANNED-TEXT PAIR, and the same idiom exactly.
     * All TWELVE of its handlers are one-line global wrappers onto the
     * `dictionary` thread's component (`CCannedTextManager`):
     *
     *     on TransformCannedToMsg a_ar_mp_cannedMap, a_bNoPhraseLength
     *       return getThread("dictionary").getComponent()
     *                .TransformCannedToMsg(a_ar_mp_cannedMap, a_bNoPhraseLength)
     *
     * ⚠ THIS IS WHY ENTER DID NOT SEND CHAT. `CMessageBar.SendMessage` is
     *
     *     send(getConnection(getVariable("main.connection.id","VMK")), 560,
     *          TransformCannedToMsg(t_ar_cWords, 1))
     *
     * so the unqualified call threw "Lingo handler not implemented:
     * TransformCannedToMsg/2" while EVALUATING THE ARGUMENTS — `send` was never
     * reached and nothing went on the wire. MEASURED: `eventProcMessageBar`
     * fired with `#keydown`/`chat.field`, `the key` was "\r", `the keyCode` 36,
     * `CheckContent` returned 1 and `SendMessage` was entered — the whole chain
     * was connected and still produced no packet.
     *
     * Command 561 (`CInvTrade.SendMessage`) and sixteen other sites — messenger,
     * help, gifts, camera captions, room naming, quests — go through the same
     * handler, so this was not chat alone.
     *
     * Fill-only like the rest: the two names it shares with
     * `CCannedTextManager` are reached on the instance by `callMethod`, never
     * globally, so nothing is displaced.
     */
    "CCannedText",
    /**
     * ⚠ A CLASS CALLING ITS OWN SIBLING HANDLER UNQUALIFIED.
     *
     * Lingo resolves a bare call inside a script against that script's own
     * handlers first, so `CSpline3D.InterpolateAt` doing
     *
     *     return interpolateCatmullRom(fraction, p1, p2, p3, p4)
     *
     * is calling its own sibling — but the export records it as a bare call and
     * it becomes `callNamed`, which finds no global and throws
     * "Lingo handler not implemented: interpolateCatmullRom/5".
     *
     * ⚠ THIS IS WHY THE JUNGLE CRUISE ROOMS CAME UP WITHOUT AN AVATAR. The throw
     * unwinds out of the room's own handler cast — MEASURED in
     * `vmk_cambodian_handler`, `vmk_safari_handler` and `vmk_tiki_handler`, whose
     * components then report `#cambodiantemplehandler_component UNRESOLVED` —
     * and the room finishes building with no figure placed. Six rooms share the
     * spline: cambodian, tiki, indy, tent, safari, dock (`CSpline3D` is copied
     * into each of their handler casts, plus the jungle-cruise minigame).
     *
     * Fill-only is right and safe: `interpolateCatmullRom` is pure arithmetic on
     * `(t, p1..p4)` and never touches `me`, and the class's stateful handlers
     * (`InterpolateAt` and friends) are reached on the instance by `callMethod`,
     * so nothing is displaced.
     */
    "CSpline3D",
    /**
     * ⚠ SAME "class calls its own pure sibling unqualified" bug as CSpline3D, but
     * SCOPED to one handler because the rest are generic instance methods.
     *
     * `CGuestRoomNavigator.construct` builds a composite icon with
     * `ReallyCopyPixels(tImage, tSrc, …)` — a pure `me`-less sibling helper
     * (copyPixels + extractAlpha + setAlpha). The exporter recorded the bare call
     * as `callNamed`, which found no global and threw "Lingo handler not
     * implemented: ReallyCopyPixels/4" out of `construct`, so the navigator never
     * built and clicking Guest Rooms (map building or tab → `startGuestRoomNavigator`)
     * did NOTHING. Only `ReallyCopyPixels` is exposed: the class's other handlers
     * (`showHide`, `ChangePage`, `GetContent`…) are stateful and generically named,
     * reached on the instance via `callMethod`, and must NOT become globals.
     * See [[unqualified-lingo-call-missing-global]], [[handler-call-on-object]].
     */
    { name: "CGuestRoomNavigator", only: ["ReallyCopyPixels"] },
    /**
     * ⚠ A MOVIE SCRIPT whose name matches no `isGlobalScript` pattern, so its
     * handlers were never globalised. `RoomGraphicsTools` is Director-movie-script
     * (its .lsasm header says "Movie Script"), so ALL its handlers are global —
     * `rectToQuad`, `flipQuadH`, `ClipAlphaLowValues`, `ClipAlphaHighValues`, none
     * of which touch `me` (pure geometry / alpha helpers).
     *
     * ⚠ THIS IS WHY HOVERING A PLACED FURNITURE TILE THREW. `CRoomVisualBlock`/
     * `CRoomVisualPoster.CreateHighlighter` build the hover-highlight quad with
     * bare `rectToQuad(tdestrect)` (then `flipQuadH`, `ClipAlphaLowValues`), which
     * the exporter recorded as `callNamed` — no global, so `mouseDown`/highlight
     * threw "handler not implemented: rectToQuad/1" and no tile highlight drew.
     * Registered whole (not scoped) because every handler is a pure global.
     * See [[unqualified-lingo-call-missing-global]].
     */
    "RoomGraphicsTools",
    /**
     * ⚠ ANOTHER plainly-named MOVIE SCRIPT of global helpers — the room's
     * coordinate/geometry math (`AbsToScr`, `ScrToAbs`, `PntInsideTile`,
     * `PntInsideTri`, `GetTileAtPos`, `GetTileAtScrPos`, `GetTilesOnFloor`,
     * `GetAvatarsOnTiles`, `_TriArea`, `floor`). Every handler is a pure global
     * (none touch `me`).
     *
     * ⚠ THIS IS WHY POSTER (and wall) PLACEMENT THREW. `CRoomVisualPoster.PointInside`
     * / `CRoomVisualWall.PointInside` (reached from `_UpdatePoster` on every mouse
     * move) call bare `AbsToScr(...)`, exported as `callNamed` with no global →
     * "handler not implemented: AbsToScr/1", spamming every frame the pointer was
     * over a poster/wall. Registered whole; its own `floor` is harmlessly skipped
     * because the builtin `floor` already exists (and is equivalent), and the rest
     * fill in. See [[unqualified-lingo-call-missing-global]].
     */
    "RoomMath",
    /**
     * ⚠ THE HIGH-SCORE API (`vmk_highscore`), a MOVIE SCRIPT: `DisplayHighscore`
     * and `DisableHighScore`, both global wrappers onto the `highscore` thread.
     *
     * `CJCPSInterface.deconstruct` (the Dock) calls `DisableHighScore()` bare, so
     * leaving the Dock threw "handler not implemented: DisableHighScore/0" out of
     * its teardown — START GAME unloaded the Dock and the Jungle Cruise never
     * came up. The HIGH SCORES button reaches `DisplayHighscore(2, …)` the same
     * way. See [[unqualified-lingo-call-missing-global]].
     */
    "APIHighScore",
    /**
     * ⚠ THE JUNGLE CRUISE'S GEOMETRY HELPERS (`vmk_junglecruise_minigame`, also
     * a cut-down copy in `vmk_dock_boats`). Every handler is `me`-less and
     * global in use — `ProjectAxonometricPosition`, `InverseAxonometricPosition`,
     * `drawAxionomicCircle`, `lineIntersection`… — though the member is marked
     * a behavior. `CCollisionEngine.addBoundaries` calls
     * `InverseAxonometricPosition` bare while the stage loads, and the throw
     * left the game on a black screen with no boat. Its own `floor` is skipped:
     * the builtin exists and is equivalent. See [[unqualified-lingo-call-missing-global]].
     */
    "MathMethods",
    /**
     * ⚠ THE MINIGAME ENGINE'S VECTOR HELPERS (`vmk_minigame`, also both older
     * engine casts): `initIntVector` and `intvector`, `me`-less globals over a
     * `G_IntVectorScript` global, though the member is marked a behavior. The
     * newer engine's `CGameComponent.construct` calls `initIntVector()` bare, so
     * the Fireworks game's engine never constructed. See
     * [[unqualified-lingo-call-missing-global]].
     */
    "IntVectorInterface",
    "FWGlobalMethods",
    "PiratesInputHandler",
    /**
     * ⚠ PIRATES' BIT HELPERS (`vmk_pirates2_minigame`): `SetBit`/`ClearBit`/
     * `TestBit`, `me`-less globals. `CPiratesFactorShip.SetConstants` calls
     * `IsRowingBoat` -> `TestBit` bare, so EVERY ship creation threw
     * "handler not implemented: TestBit/2" out of `_MinigameCreateObject`:
     * the game loaded with no ships and every checksum mismatched. `Profiler`
     * is the same shape (`ProfilerReset()` bare, every frame, from
     * `CPiratesComponent.update`). See [[unqualified-lingo-call-missing-global]].
     */
    "BitMethods",
    "Profiler",
  ] as (string | { name: string; only?: string[] })[];

  /**
   * ⚠ The sprite counter is a DEVELOPER overlay — suppress it.
   *
   * Registering `VMKUTILS` (above) fixed the throw but also made
   * `ShowSpriteLimitCounter` actually work, which parks a `CTempViewSprCount`
   * on the stage reading "36%" in the top-right corner. It is genuine VMK code,
   * but it is not part of the game's presentation and it does not appear in a
   * real client capture.
   *
   * Stubbed rather than un-registering VMKUTILS, because the CALL still has to
   * resolve — `closeLoginWindow` invokes it unqualified, and taking the handler
   * away again would restore the original crash.
   */
  registerFallbackHandlers({
    ShowSpriteLimitCounter: () => undefined,
    HideSpriteLimitCounter: () => undefined,
  });

  const registerWrapperFallbacks = (): void => {
    for (const entry of GLOBAL_WRAPPER_SCRIPTS) {
      // A plain string registers the whole class's handlers; `{ name, only }`
      // registers ONLY the named handlers — for a class whose OTHER handlers are
      // stateful instance methods with generic names (showHide, ChangePage) that
      // would be unsafe to expose globally.
      const className = typeof entry === "string" ? entry : entry.name;
      const only = typeof entry === "string" ? undefined : entry.only;
      const cls = classes.get(className);
      if (!cls) continue;
      const table: Record<string, (...args: LingoValue[]) => LingoValue> = {};
      for (const [handler, fn] of cls.handlers) {
        if (only && !only.includes(handler)) continue;
        /**
         * ⚠ RESOLVE THE CLASS AT CALL TIME. Registration is fill-only, so the
         * FIRST closure for a name owns it for the session — and a dozen casts
         * define their own `MathMethods`. Visiting the Explorer's Tent pinned
         * ITS `ProjectAxonometricPosition` (no `/ 100`), and later the Pirates
         * game drew every ship ~1300 px off-screen with the room's class
         * re-asserted and ignored. `classes` follows attach/detach, so asking
         * it per call gives the CURRENT room's script, as Director would.
         */
        table[handler] = (...args: LingoValue[]) => {
          const live = classes.get(className)?.handlers.get(handler) ?? fn;
          return live(undefined, ...args);
        };
      }
      registerFallbackHandlers(table);
    }
  };

  // The class registry, seeded with the framework cast and grown as game casts
  // attach. See `defineLingoClasses(..., into)`.
  const classes = defineLingoClasses(options.modules);

  /**
   * ⚠ A SCRIPT NAME DEFINED BY TWO CASTS RESOLVES TO THE EARLIER CAST.
   *
   * Director finds a script member by name in the LOWEST castLib that has one
   * (the same rule as `member(name)`, see CastLib.indexName). Game casts here
   * download in parallel and each merged its classes over the last, so the
   * winner was whichever cast FINISHED last — not deterministic, and usually
   * wrong. Nine names collide across the loaded casts; the one that surfaced
   * is `CScale9Grid`: cast 4 (DialogWindow) has the full 39-handler class, while
   * cast 28 (quest) and cast 37 carry cut-down copies with no `setColor` or
   * `setSortKey`. Messenger list rows built from those threw in
   * `updateAddressbookEntry` before `setText` — the friend's name never showed —
   * and the throw aborted `AddFriend` before the address book was updated, so
   * every 5-second poll re-added the friend as another blank row.
   *
   * Ranked by REQUEST order (cast.entry order), taken before the first await.
   * Framework classes carry no rank, so a game cast still overrides them as
   * before; this only orders game casts among themselves.
   */
  const castRank = new Map<string, number>();
  const classRank = new Map<string, number>();
  /**
   * ⚠ …AMONG THE CASTS ATTACHED NOW. A room's casts are unloaded when you leave
   * it (`RemoveCastLib`), and their scripts go with them in Director. Ranking by
   * request order alone made a departed room's class win forever: the Dock's
   * `vmk_dock_boats` carries a cut-down `CStage` (no collision engine, no show
   * script) and `MathMethods`, requested before the Jungle Cruise's full ones,
   * so the game built its stage from the Dock's class and the boat never moved.
   *
   * Each cast's own classes are kept, and every attach re-asserts them over a
   * holder that is no longer attached or sits in a higher-numbered lib.
   */
  const castClasses = new Map<string, Map<string, unknown>>();
  const classOwner = new Map<string, string>();
  const keyLib = new Map<string, number>();
  const libKey = new Map<number, string>();
  const detachedCasts = new Set<string>();

  // ---- external casts -----------------------------------------------------
  const extracted = new Map<
    string,
    {
      manifest: string;
      texts: Map<number, string>;
      sizes: Map<string, { width: number; height: number }>;
      /** Film loop scores by in-cast member id — see `loadFilmLoops`. */
      filmLoops: Map<number, FilmLoopScore>;
    }
  >();

  /**
   * The key an extracted cast is stored under.
   *
   * Usually the md5 from the URL, because `cast.entry.N` points at
   * `<uuid>/<md5>`. ⚠ But not always: `cast.entry.36` is
   * `vmk_clothes/gfx_avatar_bodyparts` — a NAME, and that cast lives in the
   * archive rather than the overlay. Falling back to the basename lets a cast be
   * supplied under either form without needing a name↔hash mapping, which cannot
   * be recovered reliably: the two configs carrying both are from different eras
   * and their entry numbering does not line up (37 against 36).
   */
  const castKey = (url: string): string => {
    const path = url.split("?")[0] ?? url;
    const hash = /([0-9a-f]{32})(?:\.cct)?$/i.exec(path)?.[1];
    if (hash) return hash.toLowerCase();
    const parts = path.split("/");
    const base = (parts.pop() ?? path).replace(/\.cct$/i, "");
    // A seasonal room cast shares its basename with the everyday one
    // (`vmk_spaces/xmas/vmk_hub2` vs `vmk_spaces/vmk_hub2`), so its season
    // folder picks the extraction: `vmk_hub2.xmas`. See server/src/seasons.ts
    // and tools/extract-season-casts.mjs. A name that already says its season
    // (`vmk_snd_hub2_halloween`) is unique as it stands.
    const folder = parts.pop()?.toLowerCase();
    const season = folder === "xmas" ? "xmas" : folder === "halloween" || folder === "vmk_halloween" ? "halloween" : null;
    if (season && !base.toLowerCase().includes(season)) return `${base}.${season}`;
    return base;
  };

  /**
   * `report` feeds VMK's loading bar.
   *
   * ⚠ A cast is not one download here — it is a manifest, a size index, every
   * text member and every transpiled handler. VMK only asks "how many bytes so
   * far", and it IGNORES a report of zero (`CCastLoadInstance.update` gates
   * `TellStreamState` on `bytesSoFar > 0`), so progress is reported in stages
   * against a nominal total. Fractions of a cast are what make the bar move at
   * all: the queue is 37 long and each entry would otherwise jump 0 -> 1.
   */
  async function prefetchCast(
    key: string,
    report?: (bytesSoFar: number, bytesTotal: number) => void,
  ): Promise<boolean> {
    const stage = (done: number): void => report?.(done, 100);
    if (extracted.has(key)) {
      stage(100);
      return true;
    }
    // Ranked at REQUEST time, before any await: requests follow cast.entry
    // order, completions do not. See `castRank`.
    if (!castRank.has(key)) castRank.set(key, castRank.size);
    stage(5);
    // Usually already under way, started by `downloadUpcomingCasts`.
    const download = await downloadCast(key);
    if (!download) return false;
    stage(60);
    const castManifest = renameMembers(key, download.manifest);
    const { sizes, texts } = download;

    if (download.loaders === 0) {
      /**
       * Only worth reporting for casts that HAVE Lingo. Art-only casts —
       * clothing, bitmaps — legitimately have no handlers, and warning for
       * those would bury the real misses in noise.
       */
      // `castManifest` is the raw TSV; column 2 is `member_type`.
      if (castManifest.includes("\tscript\t")) {
        log(`⚠ cast scripts MISSING: no generated-casts modules for key "${key}" — its classes will not resolve`);
      }
    }
    if (download.loaders > 0) {
      const loaded = download.modules;
      const before = classes.size;
      const previous = new Map(classes);
      defineLingoClasses(loaded, classes);
      // A script name defined by an EARLIER cast keeps its earlier class.
      const rank = castRank.get(key) ?? Number.MAX_SAFE_INTEGER;
      const own = new Map<string, unknown>();
      for (const [name, cls] of classes) {
        const held = previous.get(name);
        if (held !== cls) own.set(name, cls);
        if (held === undefined) {
          classRank.set(name, rank);
          classOwner.set(name, key);
        } else if (held !== cls) {
          // The holder only keeps the name while its cast is still attached.
          const holder = classOwner.get(name);
          const holderGone = holder !== undefined && holder !== key && detachedCasts.has(holder);
          if (!holderGone && (classRank.get(name) ?? Number.MAX_SAFE_INTEGER) <= rank) {
            classes.set(name, held);
          } else {
            classRank.set(name, rank);
            classOwner.set(name, key);
          }
        }
      }
      castClasses.set(key, own);
      // The class answers to the member's corrected name too; see MEMBER_RENAMES.
      for (const [from, to] of MEMBER_RENAMES[key] ?? []) {
        const cls = classes.get(from);
        if (cls && !classes.has(to)) classes.set(to, cls);
      }
      registerApiHandlers(classes, isGlobalScript);
      // After the API pass, so a real global always wins the name.
      registerWrapperFallbacks();
      log(
        `cast scripts: ${key.slice(0, 8)} +${String(classes.size - before)} classes` +
          ` (${String(download.loaders)} handlers)`,
      );
    }

    /**
     * ⚠ BEFORE `loadCastArt`, because it decides what art has to be resident.
     *
     * A film loop's frame bitmaps are named only inside its score — no window
     * layout, no button descriptor, nothing else mentions `octopus_noblink0003`.
     * Loading the scores first lets their cell names join `wantedArt` in time to
     * be prefetched with the rest of the cast, instead of arriving frame by
     * frame while the loop is already playing.
     */
    const filmLoops = await loadFilmLoops(key, castManifest);

    await loadCastArt(key, castManifest, texts, stage);

    extracted.set(key, { manifest: castManifest, texts, sizes, filmLoops });
    castDownloads.delete(key);
    stage(100);
    return true;
  }

  /**
   * A cast's NETWORK half — index files, text members, transpiled Lingo
   * chunks, art pack — with none of the attach work (no classes defined, no
   * art decoded, nothing registered). Memoised, so a download started early
   * is simply picked up by `prefetchCast` when VMK gets to that cast.
   *
   * ⚠ WHY IT IS SPLIT OFF: VMK loads casts strictly one at a time
   * (`net.operation.count=1`, faithful) and each cast was 3-5 round trips
   * before the next could start. Locally that is invisible; on a remote server
   * MEASURED at 100 ms RTT it was ~0.4 s per cast — the 37-cast boot queue
   * alone ~12 s, a room's casts another ~0.5 s each. Attaching stays in VMK's
   * order; only the waiting overlaps.
   */
  const castDownloads = new Map<string, Promise<CastDownload | null>>();
  type CastDownload = {
    manifest: string;
    sizes: Map<string, { width: number; height: number }>;
    texts: Map<number, string>;
    modules: Record<string, HandlerModule>;
    loaders: number;
  };
  type FetchPriority = "high" | "low" | "auto";
  function downloadCast(key: string, priority: FetchPriority = "auto"): Promise<CastDownload | null> {
    const known = castDownloads.get(key);
    if (known) return known;
    // A failure is not remembered: VMK's retry must get a fresh attempt.
    const started = fetchCastFiles(key, priority).then(
      (download) => {
        if (!download) castDownloads.delete(key);
        return download;
      },
      (error: unknown) => {
        castDownloads.delete(key);
        throw error;
      },
    );
    castDownloads.set(key, started);
    return started;
  }

  /**
   * Start the network half of the casts VMK has QUEUED behind the one it is
   * fetching — read from its cast-load manager's `pWaitList`, never changed.
   */
  const SPECULATIVE_CASTS = 8;
  function downloadUpcomingCasts(): void {
    try {
      const objects = callNamed("getObjectManager");
      if (!lingoTruthy(callMethod("managerExists", objects, symbol("castload_manager")))) return;
      const manager = callMethod("getManager", objects, symbol("castload_manager")) as Record<string, unknown> | undefined;
      const waiting = manager?.pWaitList as { count: number; getAt(i: number): unknown } | undefined;
      if (!waiting || typeof waiting.getAt !== "function") return;
      let started = 0;
      for (let i = 1; i <= waiting.count && started < SPECULATIVE_CASTS; i++) {
        const files = waiting.getAt(i) as { items?: unknown[] } | undefined;
        for (const file of files?.items ?? []) {
          if (started >= SPECULATIVE_CASTS) break;
          const key = castKey(`${String(file)}.cct`);
          if (extracted.has(key)) continue;
          started++;
          downloadCast(key, "low").catch(() => undefined);
        }
      }
    } catch {
      // Purely an accelerator: VMK's own queue still fetches every cast.
    }
  }

  async function fetchCastFiles(key: string, priority: FetchPriority): Promise<CastDownload | null> {
    const base = `/casts/${key}`;
    const get = (url: string): Promise<Response> => fetch(url, { priority } as RequestInit);
    /**
     * ⚠ THE THREE INDEX FILES GO TOGETHER, not one after another.
     *
     * Fetched in sequence, each waited for the previous one AND for the main
     * thread to get round to it — MEASURED ~110 ms between them on an avatar
     * load, so ~0.3 s of dead time per cast before a single bitmap was asked
     * for. An outfit is ~11 casts that VMK itself loads strictly one at a time
     * (`net.operation.count=1`, `m_iMaxLoading = 1` — faithful), so that dead
     * time was paid eleven times over on every first avatar.
     */
    // The cast's art in one download, started alongside its index files and
    // awaited by whichever art path needs it first — see `loadCastPack`.
    void loadCastPack(key);
    let response: Response;
    let sizeIndex: Response | null;
    let bundle: Response | null;
    try {
      [response, sizeIndex, bundle] = await Promise.all([
        get(`${base}/manifest.tsv`),
        get(`${base}/bitmaps.tsv`).catch(() => null),
        get(`${base}/texts.json`).catch(() => null),
      ]);
    } catch {
      return null;
    }
    if (!response.ok) return null;
    noteCastVersion(key, response.headers.get("X-Cast-Version"));

    // Raw: `renameMembers` is applied at attach, in `prefetchCast`.
    const castManifest = await response.text();
    const texts = new Map<number, string>();

    /**
     * The cast's bitmap SIZE index (`tools/index-bitmap-sizes.mjs`).
     *
     * ⚠ Sizes, not pixels. `manifest.tsv` does not record bitmap dimensions and
     * the browser cannot learn them without decoding the PNG — but `the image of
     * member` is a synchronous read, and VMK sizes a window element from it
     * exactly once. This is a few KB per cast against 114 MB of art.
     */
    const sizes = new Map<string, { width: number; height: number }>();
    if (sizeIndex?.ok) {
      for (const row of (await sizeIndex.text()).split(/\r?\n/).slice(1)) {
        const [assetPath, width, height] = row.split("\t");
        if (!assetPath) continue;
        sizes.set(assetPath, { width: Number(width), height: Number(height) });
      }
    }
    // ⚠ Text members' content is separate files. Skipping them attaches a cast
    // whose `thread.index` is empty, so `initThread` parses nothing and the cast
    // looks loaded while contributing none of its threads.
    /**
     * ⚠ ONE request for the whole cast's text, not one PER MEMBER.
     *
     * Every text member has to be in hand before the cast attaches — a cast's
     * `thread.index` and its window layouts are text members, and `initThread`
     * reads them the moment it attaches — so this is on the critical path of
     * every one of the 37 casts.
     *
     * Fetching them individually was, after per-cast JS chunking, the single
     * largest cost left in the boot:
     *
     *     cast text members   184 requests   6009 ms
     *     js chunks            16 requests     49 ms
     *
     * (and the Resource Timing buffer caps at 250 entries, so 184 is a floor).
     * `tools/index-cast-texts.mjs` bundles them into `texts.json` per cast.
     *
     * The per-member path is KEPT as a fallback: the index is generated, so a
     * cast extracted without it must still attach rather than silently come up
     * with no thread index at all.
     */
    /**
     * ⚠ A 200 IS NOT EVIDENCE THE RIGHT THING CAME BACK.
     *
     * A dev server answers an unknown path with its SPA fallback — an HTML
     * page, status 200 — so `response.ok` is true and `.json()` then throws
     * `Unexpected token '<'`. Only 33 of the 41 casts have a `texts.json`, so
     * the other 8 hit exactly that and the throw propagated out as a FAILED
     * CAST DOWNLOAD, killing casts that were previously fine.
     *
     * The same trap is already documented for `fetchText` below. Check what
     * actually arrived, and treat anything else as "no bundle" so the
     * per-member fallback runs.
     */
    const bundled = bundle?.ok && (bundle.headers.get("content-type") ?? "").includes("json")
      ? await bundle.json().catch(() => null) as Record<string, string> | null
      : null;
    if (bundled) {
      for (const [id, body] of Object.entries(bundled)) texts.set(Number(id), body);
    } else {
      await Promise.all(
        castManifest.split(/\r?\n/).slice(1).map(async (row) => {
          const [id, , , , , , asset] = row.split("\t");
          if (!asset?.startsWith("text/")) return;
          const body = await get(`${base}/${asset}`);
          if (body.ok) texts.set(Number(id), await body.text());
        }),
      );
    }

    // The cast's own Lingo, loaded alongside its data. Each cast declares its
    // threads in `thread.index` and `initThread` instantiates those classes the
    // moment the cast attaches, so the classes must exist by then.
    /**
     * ⚠ A CAST WHOSE MODULES DO NOT MATCH ITS KEY MUST SAY SO.
     *
     * `key` is the md5 when the cast arrives by hashed URL (`cast.entry.N` ->
     * `<uuid>\<md5>`) and the basename otherwise — see `castKey`. The transpiled
     * modules are named the same two ways (MEASURED: 32 hash-named prefixes, 95
     * human-named), so a cast served under one scheme while its Lingo was
     * emitted under the other matches NOTHING.
     *
     * That used to fail SILENTLY: the cast attached, `initThread` instantiated
     * its threads, and the first construction reported
     *
     *     rawNew: no transpiled class for script member "CVMKEmporiumInterface"
     *
     * which reads as a missing transpile and is not one — the class is on disk
     * the whole time, exactly like the `xml.parser` case in `lingo-script.ts`.
     * Diagnosing it from that message costs a session, so the miss is reported
     * HERE, where the key and the cast are both still in hand.
     *
     * The folded retry catches the cheap half (case and separator differences,
     * the same folding `setScriptClassResolver` already does for class names).
     * A hash/name mismatch cannot be resolved without a mapping, so it warns
     * rather than guessing.
     */
    const fold = (value: string): string => value.toLowerCase().replace(/[\s_.-]+/g, "");
    const allModules = Object.entries(options.castModules ?? {});
    const prefix = `./generated-casts/${key}__`;
    let loaders = allModules.filter(([path]) => path.startsWith(prefix));
    // Swap in a later build of a class this cast ships an outdated copy of.
    for (const [className, fromCast] of CLASS_SUBSTITUTES[key] ?? []) {
      const marker = `__${className}__`;
      const replacement = allModules.filter(([path]) =>
        path.startsWith(`./generated-casts/${fromCast}${marker}`));
      if (replacement.length === 0) continue;
      loaders = [...loaders.filter(([path]) => !path.includes(marker)), ...replacement];
    }
    if (loaders.length === 0) {
      const wanted = fold(key);
      loaders = allModules.filter(([path]) => {
        const name = path.slice("./generated-casts/".length);
        const castPart = name.split("__")[0] ?? "";
        return castPart !== "" && fold(castPart) === wanted;
      });
      if (loaders.length > 0) {
        log(`cast scripts: ${key.slice(0, 8)} matched by folded name (${String(loaders.length)} handlers)`);
      }
    }
    // Imported only — classes are defined at attach, in `prefetchCast`.
    const modules: Record<string, HandlerModule> = {};
    await Promise.all(
      loaders.map(async ([path, load]) => {
        modules[path] = (await load()) as HandlerModule;
      }),
    );
    return { manifest: castManifest, sizes, texts, modules, loaders: loaders.length };
  }

  /**
   * Decodes a cast's bitmaps BEFORE the cast is reported as loaded.
   *
   * ⚠ Decoded, not merely fetched. Warming the HTTP cache would still leave the
   * first read asynchronous — `fetch` + `createImageBitmap` — so a window
   * composed on that frame would still miss its art, just by less. Holding the
   * decoded `ImageBitmap` lets `setBitmapLoader` answer SYNCHRONOUSLY, which is
   * what `the image of member` is in Director.
   *
   * Progress goes through the same `stage()` the rest of the download reports
   * on, so this appears under VMK's own loading bar rather than as a stall —
   * which is what that bar is FOR: the original client showed it while cast
   * files downloaded in full.
   */
  /**
   * Fetches this cast's film loop scores and registers the art they name.
   *
   * A `filmLoop` member's content is a miniature score naming other members and
   * the frame each appears on — the nautilus squid, the treehouse fireflies, the
   * space rocket. There are only a handful per cast (three in
   * `vmk_nautilus_private`, none in most), so this is a few small requests.
   */
  async function loadFilmLoops(
    key: string,
    castManifest: string,
  ): Promise<Map<number, FilmLoopScore>> {
    const scores = new Map<number, FilmLoopScore>();
    const rows: Array<[number, string]> = [];
    for (const row of castManifest.split(/\r?\n/).slice(1)) {
      const cols = row.split("\t");
      const asset = (cols[6] ?? "").trim();
      if (!asset.startsWith("filmloops/")) continue;
      const id = Number(cols[0]);
      if (Number.isFinite(id)) rows.push([id, asset]);
    }
    if (rows.length === 0) return scores;

    await Promise.all(
      rows.map(async ([id, asset]) => {
        try {
          const response = await fetch(`/casts/${key}/${asset}`);
          // ⚠ A 200 is not evidence the right thing came back — a dev server
          // answers an unknown path with its SPA fallback. Same trap as
          // `texts.json` above.
          if (!response.ok || !(response.headers.get("content-type") ?? "").includes("json")) {
            return;
          }
          const score = await response.json() as FilmLoopScore;
          scores.set(id, score);
          for (const cells of Object.values(score.frames)) {
            for (const cell of cells) wantedArt.add(cell.member);
          }
        } catch {
          // Director draws nothing for a loop it cannot load; the member stays
          // declared and simply shows no frames.
        }
      }),
    );
    return scores;
  }

  async function loadCastArt(
    key: string,
    castManifest: string,
    texts: Map<number, string>,
    stage: (done: number) => void,
  ): Promise<void> {
    /**
     * ⚠ ONLY THE ART WINDOWS ARE BUILT FROM — not the whole cast.
     *
     * A first version made every bitmap in a cast resident, on the reasoning
     * that a `.cct` was one download. Measured, that fetched 4,776 files and
     * 103.7 MB on every boot, because most of a cast's art is room, avatar and
     * item material that nothing on screen needs yet — exactly what Director
     * itself streamed per room. The original never moved anything like that at
     * startup, which is why the boot felt slower than the real client.
     *
     * What actually has to be resident is narrower and knowable: the members
     * named by this cast's WINDOW LAYOUTS. Those are the elements
     * `CWindow.buildVisual` composes ONCE, so they are the ones that must have
     * pixels at that instant. Everything else can arrive lazily without any
     * window ever drawing incomplete.
     *
     * The layouts are text members we have already fetched, so this costs a
     * scan of strings we hold rather than any extra request.
     */
    /**
     * ⚠ THE WANTED SET IS GLOBAL, AND CASTS ARE SWEPT AGAIN AS IT GROWS.
     *
     * A layout and the art it names are usually in DIFFERENT casts: the
     * preloader's layout is a text member of `02e17c43`, while every piece it
     * references (`basic.middle.middle`, `vmk_symbol`, …) is a bitmap in the UI
     * cast `0d4c05bc`. Scanning only within a cast therefore found almost
     * nothing — 21 files — and the panels went blank again.
     *
     * Since either cast can arrive first, names accumulate across all casts and
     * each new batch re-sweeps the casts already extracted. Both directions are
     * covered, and a cast is only ever swept for names it actually holds.
     */
    /**
     * ⚠ BUTTON DESCRIPTORS COUNT TOO, not just `<window>` layouts.
     *
     * A button's slice art is named in a `*.element` text member, which carries
     * the same `#member: "…"` spelling but none of the window markup:
     *
     *     [#state: #up, #members: [#left:  [#member: "button.g.left.active"],
     *                              #middle:[#member: "button.g.middle.active"],
     *                              #right: [#member: "button.g.left.active",
     *                                       #flipH: 1]], …]
     *
     * Skipping those left every button's caps to be fetched ON DEMAND, which
     * loses a race it cannot win: `CWindowCommonButton.createButtonImg`
     * composes ONCE and caches the result in `pCachedImgs`, so art arriving
     * afterwards has nowhere to go.
     *
     * TRACED at boot: the GET MORE NAMES composite copied its right cap at
     * t=23444 with the slice holding no drawable at all, and the art only
     * landed at t=23537 — 90ms after the button had been composed and cached.
     * The NEXT button, whose art happened to be resident already, composed
     * correctly at t=23433 from the same code.
     *
     * Prefetching by name removes the race rather than trying to repair it
     * afterwards. `#members:` is the descriptor's own marker.
     */
    /**
     * ⚠ `<SCALE>` LAYOUTS NAME THEIR SKIN AS `MEMBER="…"`, not `#member: "…"`.
     *
     * `CScale9Grid.render` composes a nine-slice ONCE and caches it behind
     * `m_bNeedUpdate`, so — exactly like the button caps and the body parts —
     * art arriving afterwards can never reach it.
     *
     * The registration name rows are built from `layout.registration.xml`:
     *
     *     <SCALE TYPE="GRID9" MEMBER="scale.field" MASK="TRUE" COLOR="#88ba3f">
     *
     * That spelling matched neither existing pattern, so `scale.field` was
     * fetched lazily and every row composed against an EMPTY skin. MEASURED:
     * the mask `render` hands to `setAlpha` came out 0 across all 2,565 px,
     * where forcing a re-render once the art is resident gives 2,553 opaque.
     *
     * It goes unnoticed today only because `setAlpha` is a no-op, so the rows
     * fall back to their flat `COLOR` fill — which is also why enabling
     * `setAlpha` made the whole list vanish.
     */
    for (const body of texts.values()) {
      const isDirectorLayout = body.includes("<window>") || body.includes("#members:");
      const isXmlLayout = body.includes("<SCALE") || body.includes("MEMBER=");
      if (!isDirectorLayout && !isXmlLayout) continue;
      for (const match of body.matchAll(/#member:\s*"([^"]+)"/g)) wantedArt.add(match[1]);
      for (const match of body.matchAll(/MEMBER="([^"]+)"/g)) wantedArt.add(match[1]);
    }

    /**
     * ⚠ A FURNITURE ITEM CAST IS RESIDENT IN FULL — like Director's own download.
     *
     * These casts (`item_<code>`, downloaded on demand for the inventory/shop
     * thumbnails) name their art in NO window layout, so the wanted-set scan above
     * finds nothing and every bitmap would arrive lazily. But `_RenderFurniPreview`
     * composites the item SYNCHRONOUSLY the instant the cast goes ready and then
     * `crop`s the result into a cached image, so a block whose PNG is still in
     * flight is copied blank and the blank is cached forever — the thumbnails came
     * out solid black. Director never hit this because a downloaded `.cct` is
     * fully resident; these casts are small and on demand (unlike the whole-archive
     * residency rejected at boot — see `loadCastArt`'s opening note), so making
     * their bitmaps resident here is both cheap and faithful. Paired with
     * `copyPixels` now asking its source to load, the composite reads real pixels.
     */
    /**
     * ⚠ AN NPC CAST IS RESIDENT IN FULL TOO. Its animation frames
     * (`esmeralda0014`, `yeti_roar_0003`…) are named only in `.ani` scores and
     * `variable.index` frame lists, never a window layout, so they arrived
     * lazily: the first time an animation played, each new frame drew NOTHING
     * for the tick or two its PNG was in flight — the NPC flickered. MEASURED
     * on Esmeralda's levitate: frames 0014-0025 each shown 1-2 ticks
     * NOT-READY on first play, clean every play after. NPC casts are small.
     */
    if (/^item_\d+$/.test(key) || /^vmk_npc_/.test(key) || /^vmk_junglecruise_(animals|boat|elements|interface|minigame)$/.test(key)) {
      for (const row of castManifest.split(/\r?\n/).slice(1)) {
        const cols = row.split("\t");
        const name = (cols[2] ?? "").trim();
        const asset = (cols[6] ?? "").trim();
        if (name !== "" && asset.startsWith("bitmaps/")) wantedArt.add(name);
      }
    }

    /**
     * ⚠ EMOTE ICONS TOO. `CAvatarRenderer.DrawEmoticons` builds
     * `"emoticon_" & m_iEmoticon` at runtime, so no layout names them and the
     * first emote of a session fetched its icon as it was drawn: the bubble
     * came up with no icon, and every emote after that was fine. Fourteen tiny
     * bitmaps; always resident.
     */
    for (const row of castManifest.split(/\r?\n/).slice(1)) {
      const cols = row.split("\t");
      const name = (cols[2] ?? "").trim();
      // Ride vehicles likewise: named at runtime by `CAvatarVehicle.update`.
      if ((/^emoticon_\d+$/.test(name) || isVehicleMember(name)) && (cols[6] ?? "").trim().startsWith("bitmaps/")) wantedArt.add(name);
    }

    if (wantedArt.size === 0) return;

    /**
     * ⚠ BODY PARTS COUNT TOO, for exactly the reason the button descriptors do.
     *
     * `CBodypartClass.copyPicture` builds its member name as
     *
     *     <action>_<part>_<model>_<dir>_<frame>        e.g. std_lsh_1_3_0
     *
     * looks it up in the image cache and copies it SYNCHRONOUSLY. Art that
     * arrives afterwards has nowhere to go, because `getPartImg` has already
     * composed the figure — the same lost race as the button caps above.
     *
     * These names appear in NO window layout and NO button descriptor, which is
     * why they were the one thing still racing after those two were covered.
     * MEASURED: the first composed figure differed from a clean recompose by
     * 396px, ALL of it in the feet, where `getPartImg` stacks leg -> shoe ->
     * trousers per side and a late leg re-stamps over its own shoe.
     *
     * ⚠ THE GATE VMK ITSELF USES CANNOT HELP HERE. `CAvatarClothAssetManager`
     * waits on `startCastLoad`, whose `addOneCastToWaitList` skips any cast
     * `FindCastNumber` already finds — and `vmk_clothes/gfx_avatar_bodyparts` is
     * attached at boot, so it is never queued and `preloadNetThing` never runs
     * for it. Prefetching by name is the same remedy already applied to the two
     * other synchronous composers.
     *
     * Cheap despite the count: these are avatar tiles, tens of bytes to a couple
     * of KB each. `isBodyPartMember` is the module-scope predicate — the same one
     * the bitmap loader uses to keep body parts out of the embedded-alpha rule.
     */
    /**
     * ⚠ HELP-MENU ROW BACKGROUNDS — imperatively composed, like body parts.
     *
     * `CHelpMenuItemCategory.render` and `CHelpMenuItemTopic.ResolveImage` build
     * each help row as `duplicate(member("field.hlp.active").image)` (blue) /
     * `field.hlp.selected` (purple) / the `field.hlp2.*` topic variants, then
     * copyPixels the caption onto it — ALL in Lingo, named in no window layout or
     * button descriptor, so the layout scan never marks them resident. The help
     * list composes ONCE on open; when these bitmaps are still loading the rows
     * come out white-on-white (the caption is white too) and only self-heal on the
     * next interaction that forces a re-render. MEASURED: first open blue=0/
     * white=22023, reopen with art resident blue=21130/white=0. Prefetching them
     * by name removes the race, exactly as the body-part predicate above does.
     * They live in the UI cast (`0d4c05bc…`); the global sweep reaches them.
     */
    const isHelpChromeMember = (name: string): boolean =>
      /^field\.hlp\d?\.(active|selected)$/.test(name);

    const pathsFor = (manifest: string, castKey: string): Array<[string, string, string]> => {
      const found: Array<[string, string, string]> = [];
      for (const [name, asset] of bitmapRowsOf(castKey, manifest)) {
        if (!wantedArt.has(name) && !isBodyPartMember(name) && !isHelpChromeMember(name)) continue;
        const url = `/casts/${castKey}/${asset}`;
        if (!decodedArt.has(url)) found.push([castKey, asset, name]);
      }
      return found;
    };

    const targets = pathsFor(castManifest, key);
    // Newly-learned names may belong to art that already went past.
    for (const [otherKey, cached] of extracted) {
      if (otherKey === key) continue;
      targets.push(...pathsFor(cached.manifest, otherKey));
    }
    if (targets.length === 0) return;

    // Ask for every target up front so unpacked casts go out as a few batched
    // requests (`batchedBytes`), not one request per pump step.
    const pending = new Map(
      targets.map(([castKey, asset]) => [`/casts/${castKey}/${asset}`, castBitmapBytes(castKey, asset)] as const),
    );
    let next = 0;
    let done = 0;
    const pump = async (): Promise<void> => {
      while (next < targets.length) {
        const [castKey, asset, name] = targets[next++];
        const url = `/casts/${castKey}/${asset}`;
        if (!decodedArt.has(url)) {
          try {
            let bytes = await pending.get(url);
            if (bytes === undefined) {
              const response = await fetch(url);
              if (response.ok) bytes = await response.arrayBuffer();
            }
            if (bytes) {
              decodedArt.set(url, await createImageBitmap(new Blob([bytes])));
              // Keep the colour a canvas would premultiply away — see `opaqueArt`.
              // Body parts only: see `wantsOpaqueCopy`.
              if (wantsOpaqueCopy(name)) {
                const opaque = await opaqueCopy(bytes);
                if (opaque) opaqueArt.set(url, opaque);
              }
            }
          } catch {
            // Director draws nothing for art it cannot load; the lazy path
            // remains as a second chance.
          }
        }
        done++;
        // 60..95 is this phase's share of the cast's progress.
        stage(60 + Math.floor((done / targets.length) * 35));
      }
    };
    /**
     * ⚠ FROM A PACK THE LIMIT IS DECODING, NOT THE NETWORK. The bytes are
     * already in memory, and `createImageBitmap` decodes off the main thread in
     * parallel — so eight at a time only made the decodes queue in rounds.
     * MEASURED with packs: 25 outfit casts FETCHED in 112 ms total, but VMK's
     * one-at-a-time loader then waited 12.1 s between them with the CPU idle.
     */
    const packed = await loadCastPack(key);
    // Batched art is a few requests too; the limit is decoding, as with a pack.
    const concurrency = packed || batchSupported ? PACKED_DECODE_CONCURRENCY : ART_RESIDENT_CONCURRENCY;
    const decodeStart = performance.now();
    await Promise.all(
      Array.from({ length: Math.min(concurrency, targets.length) }, pump),
    );
    // For `vmkPerf.timeline()`: how long the cast's art held it back.
    perfEvents.push({
      t: decodeStart,
      what: `art ${key}: ${String(targets.length)} in ${String(Math.round(performance.now() - decodeStart))}ms${packed ? " (pack)" : ""}`,
    });
  }

  // ⚠ Synchronous by contract: `setImportedCast` indexes the lib on the next
  // line. Everything needed was fetched during the download, which VMK always
  // performs first.
  /** Cast-attach cost, surfaced by `vmkPerf.castStats()`. */
  const perfCast = { casts: 0, members: 0, ms: 0, parseMs: 0 };
  /** Timestamped cast attaches for `vmkPerf.timeline()`. Here, not with the profiler: attaches start first. */
  const perfEvents: Array<{ t: number; what: string }> = [];
  setCastFileLoader((fileName, lib) => {
    const cached = extracted.get(castKey(fileName));
    /**
     * Whatever this lib held before is gone from it now — including when the
     * slot is being reset to `empty.cct` on leaving a room. A cast only counts
     * as DETACHED once it has been seen attached and then displaced; casts
     * attached some other way are never presumed gone (the core `CScale9Grid`
     * holder, cast 9290e7d1, attaches without passing through here).
     */
    {
      const key = cached ? castKey(fileName) : undefined;
      const displaced = libKey.get(lib._number);
      if (displaced !== undefined && displaced !== key) {
        keyLib.delete(displaced);
        libKey.delete(lib._number);
        detachedCasts.add(displaced);
      }
      if (key !== undefined) {
        libKey.set(lib._number, key);
        keyLib.set(key, lib._number);
        detachedCasts.delete(key);
      }
    }
    if (!cached) {
      // `resetCastLibs` points every empty slot at `<moviePath>empty.cct` before
      // any real cast is attached. That is the reset, not a miss.
      if (!/\bempty\.cct$/i.test(fileName)) log(`cast attach MISSED: ${fileName}`);
      return;
    }
    // Its scripts take back any name held by a cast that has since been detached.
    {
      const key = castKey(fileName);
      let changed = 0;
      const names: string[] = [];
      for (const [name, cls] of castClasses.get(key) ?? []) {
        const holder = classOwner.get(name);
        if (holder === undefined || holder === key || !detachedCasts.has(holder)) continue;
        (classes as Map<string, unknown>).set(name, cls);
        classOwner.set(name, key);
        classRank.set(name, castRank.get(key) ?? Number.MAX_SAFE_INTEGER);
        changed++;
        names.push(`${name}<-${holder}`);
      }
      if (changed > 0) {
        registerApiHandlers(classes, isGlobalScript);
        registerWrapperFallbacks();
        log(`cast scripts: ${key.slice(0, 8)} (lib ${String(lib._number)}) re-asserted ${String(changed)} class(es) on attach: ${names.join(", ")}`);
      }
    }
    // Cast-attach timing for `vmkPerf.castStats()` — this whole body is
    // synchronous main-thread work, and an avatar load fires ~15 of these.
    const perfT0 = performance.now();
    const perfP0 = performance.now();
    perfEvents.push({ t: perfT0, what: `attach ${castKey(fileName)}` });
    if (perfEvents.length > 2000) perfEvents.shift();
    // `sizeOf` sets each bitmap member's rect from the size index, so a member
    // knows its dimensions before any PNG is fetched.
    const members = parseCastManifest(cached.manifest, lib.name, lib._number, {
      sizeOf: (assetPath) => cached.sizes.get(assetPath) ?? null,
    });
    perfCast.parseMs += performance.now() - perfP0;
    let count = 0;
    for (const member of members.members) {
      // ⚠ The cache is keyed by the manifest's in-cast id; `_number` is now the
      // GLOBAL id (see `parseCastManifest`). Reverse the same offset rather than
      // keying on `_number`, or every text member attaches empty again.
      const inCastId =
        lib._number === 1 ? member._number : member._number - lib._number * 100000;
      const text = cached.texts.get(inCastId);
      if (text !== undefined) member.text = text;
      // Same in-cast keying as the text above; a film loop is playable the
      // moment its score is attached.
      const score = cached.filmLoops.get(inCastId);
      if (score !== undefined) member.setFilmLoop(score);
      // The manifest's path is cast-relative; the loader fetches by URL and has
      // no other way to know which cast a member came from.
      if (member.imagePath !== "") {
        member.imagePath = `/casts/${castKey(fileName)}/${member.imagePath}`;
        // ⚠ SCOPED to the avatar arrow only. A broad name-based rule (every
        // non-body-part bitmap) was TRIED and reverted — it changed too much of
        // the UI compositing and caused regressions. The arrow is the one place
        // that genuinely needs Director's per-member embedded-alpha: its navy
        // fill (`avatar.arrow.32`) is a 32-bit member with transparent corners
        // that must be SKIPPED (blended), not stamped opaque black inside the
        // silhouette (the black fringe). `get image()` seeds `buffer.useAlpha=1`
        // from this at buffer creation, before any `duplicate()` snapshots it.
        // See [[avatar-arrow-two-render-gaps]].
        if (member.name === "avatar.arrow.32" || member.name === "avatar.arrow.32.inside") {
          member.useEmbeddedAlpha = true;
        }
        // ⚠ RIDE VEHICLES TOO, same reason. `CAvatarVehicle.createUnionImage…`
        // stacks back piece, avatar, front piece with plain `copyPixels`, then
        // `setAlpha`s the union of their masks. At use_alpha 0 the front piece's
        // transparent surround was stamped as raw black over the back piece and
        // the mask kept it: the car sat in a black box. MEASURED on the Everest
        // car: 340 opaque-black px inside the silhouette.
        if (isVehicleMember(member.name) || isMagicFxMember(member.name)) member.useEmbeddedAlpha = true;
        // Magic-effect frames: remember each animation family, so the first
        // frame drawn fetches the rest with it. See `effectFamilyOf`.
        if (MAGIC_FX_CASTS.has(castKey(fileName))) {
          const family = effectFamilyOf(member.name);
          if (family) {
            const list = effectFamilies.get(family) ?? [];
            list.push(member);
            effectFamilies.set(family, list);
          }
        }
      }
      // Same rewrite for audio; `lingo-sound` fetches by URL and likewise has
      // no way to know which cast a sound member came from.
      if (member.soundPath !== "") {
        member.soundPath = `/casts/${castKey(fileName)}/${member.soundPath}`;
        // A room's own clips — its sound cast and its handler cast — are
        // buffered as they attach, not on first play. Scoped to those so boot
        // does not fetch every UI sound at once. See `prewarmSound`.
        if (/^vmk_snd_|_handler$/.test(castKey(fileName))) prewarmSound(member);
      }
      lib.add(member);
      count++;
    }
    /**
     * ⚠ NAME THE CAST, not the slot it landed in.
     *
     * `CMgrCastload.setImportedCast` sets `fileName` FIRST — which is what calls
     * this loader — and only then sets `name`, so `lib.name` is still the empty
     * placeholder here and every line read "cast attached: empty 120". That is
     * unreadable exactly when it matters: the ordering of cast attach against
     * `room_ready` decides whether a room gets its audio at all
     * (`CSoundTracker.StartRoomSounds` bails and never retries if its documents
     * are not resolvable yet), and you cannot check that ordering in a log that
     * will not say which cast attached.
     */
    perfCast.casts++;
    perfCast.members += count;
    perfCast.ms += performance.now() - perfT0;
    log(`cast attached: ${castKey(fileName)} as ${lib.name} (${String(count)} members)`);
  });

  /**
   * Fetches one bitmap member's PNG and fills the buffer it was asked for.
   *
   * ⚠ Fire-and-forget by design. `the image of member` is a synchronous Lingo
   * read; the buffer comes back correctly sized immediately and its pixels land
   * a moment later, so the frame that requested it draws nothing and the next
   * one draws art. Blocking is not an option and prefetching all 114 MB is not
   * either.
   *
   * Failures are counted rather than thrown: Director draws nothing for art it
   * cannot load, and a throw here would surface inside unrelated generated code.
   */
  let bitmapsRequested = 0;
  let bitmapsFailed = 0;
  /**
   * Every buffer waiting on a fetch, keyed by URL.
   *
   * ⚠ A SET OF URLS WAS NOT ENOUGH. One URL can back several buffers — a cast
   * that re-attaches (Monorail Station → train, both use `vmk_text_scroller`)
   * gives its members NEW image buffers with the same `imagePath`. The URL was
   * never removed from the set and only the first buffer was handed the pixels,
   * so every later buffer returned early here and stayed pending for good:
   * `Digital_font` never arrived, all 40 glyphs cut from it stayed empty, and
   * the monorail signs scrolled black text on black.
   */
  const inFlight = new Map<string, Set<LingoImage>>();
  /** URLs that failed — not retried, as before (a 404 would otherwise refetch every frame). */
  const failedArt = new Set<string>();
  /** Decoded art held from `loadCastArt`, keyed by URL. */
  const decodedArt = new Map<string, ImageBitmap>();

  /**
   * ONE DOWNLOAD PER CAST, like the original `.cct` — `bitmaps.pack`.
   *
   * `tools/pack-cast-bitmaps.mjs` concatenates a cast's PNGs behind a small
   * index. VMK loads casts strictly one at a time (faithful), and fetching an
   * outfit cast's 123 PNGs six at a time made the Character window + first
   * avatar ~12 s of round-trips with the CPU idle (MEASURED, `?perf=sample`).
   *
   * Optional throughout: a cast without a pack (or an old extraction) fetches
   * its PNGs one by one exactly as before.
   */
  type CastPack = { data: ArrayBuffer; start: number; files: Record<string, [number, number]> };
  const castPacks = new Map<string, Promise<CastPack | null>>();
  /**
   * ⚠ ONLY casts downloaded in full anyway — clothing/body parts, furniture
   * items, NPCs. A room or core UI cast is fetched a few bitmaps at a time, and
   * a pack would pull the whole cast (up to ~48 MB) down for one frame. Keep in
   * step with `castHasPack` in tools/pack-cast-bitmaps.mjs.
   */
  const castHasPack = (castKey: string): boolean => /^(vmk_avatar_|gfx_avatar_|item_\d+$|vmk_npc_)/.test(castKey);
  const loadCastPack = (castKey: string): Promise<CastPack | null> => {
    if (!castHasPack(castKey)) return Promise.resolve(null);
    const known = castPacks.get(castKey);
    if (known) return known;
    const loading = (async (): Promise<CastPack | null> => {
      try {
        const response = await fetch(`/casts/${castKey}/bitmaps.pack`);
        // A dev server answers a missing file with its HTML fallback: check the
        // magic, not just the status.
        if (!response.ok) return null;
        const data = await response.arrayBuffer();
        const view = new DataView(data);
        if (data.byteLength < 8 || view.getUint32(0, false) !== 0x56504b31 /* "VPK1" */) return null;
        const headerLength = view.getUint32(4, true);
        const header = JSON.parse(new TextDecoder().decode(new Uint8Array(data, 8, headerLength))) as {
          files: Record<string, [number, number]>;
        };
        return { data, start: 8 + headerLength, files: header.files };
      } catch {
        return null;
      }
    })();
    castPacks.set(castKey, loading);
    return loading;
  };
  /** One bitmap's bytes out of its cast's pack, or null to fetch it on its own. */
  const packedBytes = async (castKey: string, asset: string): Promise<ArrayBuffer | null> => {
    const pack = await loadCastPack(castKey);
    const entry = pack?.files[asset];
    if (!pack || !entry) return null;
    return pack.data.slice(pack.start + entry[0], pack.start + entry[0] + entry[1]);
  };
  /**
   * SEVERAL BITMAPS OF A CAST IN ONE REQUEST — `/casts/<key>/_batch`
   * (server/src/delivery.ts), answered in the `bitmaps.pack` format.
   *
   * ⚠ For casts WITHOUT a pack, which are most of what a boot or a room load
   * touches: the UI, navigator and room casts. Those are fetched a few bitmaps
   * at a time by design (a pack would drag a 20 MB cast down for one frame),
   * but "a few" was hundreds of separate requests. MEASURED at 100 ms simulated
   * RTT: 1,547 single-PNG requests in the first boot, which over HTTP/1.1's six
   * connections is ~25 s of waiting with nothing to do. Locally the round trip
   * is ~0, which is why this never showed up outside a real deployment.
   *
   * Requests made in the same tick are coalesced per cast. Resolves the bytes,
   * `null` when the server has no such file (a 404, as before), or `undefined`
   * when batching is unavailable — a server without the route (Vite dev) — so
   * the caller fetches the file on its own exactly as it used to.
   */
  let batchSupported = true;
  type BatchWaiter = (bytes: ArrayBuffer | null | undefined) => void;
  const batchQueue = new Map<string, Map<string, BatchWaiter[]>>();
  let batchFlushScheduled = false;
  /** Query budget per request; names are ~25 chars, so ~120 bitmaps. */
  const BATCH_QUERY_CHARS = 3500;
  const batchedBytes = (castKey: string, asset: string): Promise<ArrayBuffer | null | undefined> => {
    if (!batchSupported || !asset.startsWith("bitmaps/") || asset.includes("|")) return Promise.resolve(undefined);
    return new Promise((resolve) => {
      let cast = batchQueue.get(castKey);
      if (!cast) batchQueue.set(castKey, (cast = new Map()));
      const waiters = cast.get(asset);
      if (waiters) waiters.push(resolve);
      else cast.set(asset, [resolve]);
      if (!batchFlushScheduled) {
        batchFlushScheduled = true;
        setTimeout(flushBatches, 0);
      }
    });
  };
  const flushBatches = (): void => {
    batchFlushScheduled = false;
    const queued = [...batchQueue];
    batchQueue.clear();
    for (const [castKey, assets] of queued) {
      let group: string[] = [];
      let chars = 0;
      const send = (names: string[]): void => {
        void fetchBatch(castKey, names).then((files) => {
          for (const asset of names) {
            const bytes = files === undefined ? undefined : files.get(asset) ?? null;
            for (const resolve of assets.get(asset) ?? []) resolve(bytes);
          }
        });
      };
      for (const asset of assets.keys()) {
        const cost = encodeURIComponent(asset.slice("bitmaps/".length)).length + 3;
        if (group.length > 0 && chars + cost > BATCH_QUERY_CHARS) {
          send(group);
          group = [];
          chars = 0;
        }
        group.push(asset);
        chars += cost;
      }
      if (group.length > 0) send(group);
    }
  };
  const fetchBatch = async (castKey: string, assets: string[]): Promise<Map<string, ArrayBuffer> | undefined> => {
    if (!batchSupported) return undefined;
    try {
      const list = assets.map((a) => a.slice("bitmaps/".length)).join("|");
      const response = await fetch(`/casts/${castKey}/_batch?f=${encodeURIComponent(list)}`);
      const data = response.ok ? await response.arrayBuffer() : null;
      const view = data ? new DataView(data) : null;
      // A dev server answers an unknown route with its HTML fallback: check the
      // magic, not just the status.
      if (!data || !view || data.byteLength < 8 || view.getUint32(0, false) !== 0x56504b31 /* "VPK1" */) {
        batchSupported = false;
        return undefined;
      }
      const headerLength = view.getUint32(4, true);
      const header = JSON.parse(new TextDecoder().decode(new Uint8Array(data, 8, headerLength))) as {
        files: Record<string, [number, number]>;
      };
      const start = 8 + headerLength;
      const files = new Map<string, ArrayBuffer>();
      for (const [asset, [offset, length]] of Object.entries(header.files)) {
        files.set(asset, data.slice(start + offset, start + offset + length));
      }
      return files;
    } catch {
      // A network failure is not proof the route is missing; fall back this once.
      return undefined;
    }
  };
  /**
   * BITMAPS KEPT ACROSS RELOADS — the Cache API, one entry per file.
   *
   * ⚠ The HTTP cache cannot do this for batches: which files share a `_batch`
   * request depends on timing, so the URLs rarely repeat. MEASURED on a warm
   * reload: 34 JS chunks from cache and 148 cast files as 304s, and still
   * 20 MB moved — all of it batches.
   *
   * Entries are keyed `<url>?cv=<version>`, where the version is the cast's
   * `X-Cast-Version` from its (revalidated) `manifest.tsv`. The server derives
   * it from every bitmap's name, size and mtime (server/src/delivery.ts
   * `castArtVersion`), so a re-extracted, recompressed or hand-edited cast gets
   * a new version and the old entries are simply never asked for again (and
   * swept, below). No version — Vite dev, an older server, a server whose
   * file watch failed — or no `caches` (an insecure origin) means no caching:
   * exactly the old path. A miss costs no request of its own; it joins the
   * batch it would have joined anyway.
   */
  const ART_CACHE = "vmk-cast-art-v1";
  const castVersions = new Map<string, string>();
  let artCache: Promise<Cache | null> | null = null;
  const openArtCache = (): Promise<Cache | null> =>
    (artCache ??= (typeof caches === "undefined" ? Promise.resolve(null) : caches.open(ART_CACHE)).catch(() => null));
  let sweepTimer: ReturnType<typeof setTimeout> | undefined;
  const noteCastVersion = (castKey: string, version: string | null): void => {
    if (!version || !/^[\w-]+$/.test(version)) return;
    if (castVersions.get(castKey) === version) return;
    castVersions.set(castKey, version);
    clearTimeout(sweepTimer);
    sweepTimer = setTimeout(() => void sweepArtCache(), 20_000);
  };
  /** Drop entries of casts whose version has moved on. Off the critical path. */
  const sweepArtCache = async (): Promise<void> => {
    try {
      const cache = await openArtCache();
      if (!cache) return;
      for (const request of await cache.keys()) {
        const match = /\/casts\/([^/]+)\/.*[?&]cv=([\w-]+)/.exec(request.url);
        const current = match ? castVersions.get(match[1]) : undefined;
        if (match && current !== undefined && current !== match[2]) await cache.delete(request);
      }
    } catch {
      // Purely housekeeping.
    }
  };
  const artCacheKey = (castKey: string, asset: string, version: string): string =>
    `/casts/${castKey}/${asset}?cv=${version}`;
  const cachedArt = async (cache: Cache | null, castKey: string, asset: string, version: string): Promise<ArrayBuffer | null> => {
    try {
      const hit = cache ? await cache.match(artCacheKey(castKey, asset, version)) : undefined;
      return hit ? await hit.arrayBuffer() : null;
    } catch {
      return null;
    }
  };
  /**
   * ⚠ One tick's lookups are answered TOGETHER, and their misses handed to
   * `batchedBytes` in one synchronous loop. Each `cache.match` settles on its
   * own task; letting every miss join the batch queue as it settled would
   * split what used to be one `_batch` request into several — extra requests
   * on exactly the cold path this must not slow down.
   */
  type ArtLookup = { castKey: string; asset: string; version: string; resolve: (b: ArrayBuffer | null | undefined) => void };
  let artLookups: ArtLookup[] = [];
  const lookUpArt = (castKey: string, asset: string, version: string): Promise<ArrayBuffer | null | undefined> =>
    new Promise((resolve) => {
      if (artLookups.length === 0) setTimeout(() => void flushArtLookups(), 0);
      artLookups.push({ castKey, asset, version, resolve });
    });
  const flushArtLookups = async (): Promise<void> => {
    const lookups = artLookups;
    artLookups = [];
    const cache = await openArtCache();
    const found = await Promise.all(lookups.map((l) => cachedArt(cache, l.castKey, l.asset, l.version)));
    lookups.forEach((lookup, i) => {
      const hit = found[i];
      if (hit) { lookup.resolve(hit); return; }
      void batchedBytes(lookup.castKey, lookup.asset).then((bytes) => {
        // Only what this version's server sent; a 404 or fallback is not art.
        if (bytes && castVersions.get(lookup.castKey) === lookup.version) {
          storeArt(lookup.castKey, lookup.asset, lookup.version, bytes);
        }
        lookup.resolve(bytes);
      });
    });
  };
  const storeArt = (castKey: string, asset: string, version: string, bytes: ArrayBuffer): void => {
    void openArtCache().then((cache) =>
      cache?.put(artCacheKey(castKey, asset, version), new Response(bytes.slice(0), {
        headers: { "Content-Type": "image/png" },
      })),
    ).catch(() => undefined);
  };
  /** A bitmap's bytes from the cast's pack, else the art cache, else a batch; `undefined` = fetch it alone. */
  const castBitmapBytes = async (castKey: string, asset: string): Promise<ArrayBuffer | null | undefined> => {
    const packed = await packedBytes(castKey, asset);
    if (packed) return packed;
    if (castHasPack(castKey) && (await loadCastPack(castKey))) return undefined;
    const version = castVersions.get(castKey);
    if (!version || !batchSupported || !asset.startsWith("bitmaps/")) return batchedBytes(castKey, asset);
    return lookUpArt(castKey, asset, version);
  };
  /** `/casts/<key>/<asset>` -> [key, asset]. */
  const splitCastUrl = (url: string): [string, string] | null => {
    const match = /^\/casts\/([^/]+)\/(.+)$/.exec(url);
    return match ? [match[1], match[2]] : null;
  };

  /**
   * The same art with alpha forced OPAQUE, keyed by URL — see
   * `LingoImage.opaqueSource`.
   *
   * ⚠ A canvas stores PREMULTIPLIED alpha, so decoding a PNG and drawing it into
   * one destroys the RGB of every fully-transparent pixel. Director composites
   * that colour anyway for body parts (`useAlpha: 0`), and the avatar's MOUTH
   * lives entirely in those pixels — `std_fc_1_3_0` holds `234,219,190/a0` in
   * the file and `0,0,0/a0` once a canvas has touched it.
   *
   * Decoding the PNG ourselves and setting alpha to 255 BEFORE it reaches a
   * canvas is what keeps the colour. `tools/audit-hidden-colour.mjs` measures
   * the exposure: 87,533 of 103,489 extracted PNGs carry such colour.
   */
  const opaqueArt = new Map<string, ImageBitmap>();

  /** Decode PNG bytes and hand back the same picture, fully opaque. */
  const opaqueCopy = async (bytes: ArrayBuffer): Promise<ImageBitmap | null> => {
    const decoded = decodePng(bytes);
    if (!decoded) return null;
    let anyHidden = false;
    const pixels = decoded.data;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] !== 255) {
        // Only worth a second bitmap when there is colour to rescue.
        if (pixels[i] === 0 && (pixels[i - 3] > 8 || pixels[i - 2] > 8 || pixels[i - 1] > 8)) {
          anyHidden = true;
        }
        pixels[i] = 255;
      }
    }
    if (!anyHidden) return null;
    return createImageBitmap(new ImageData(pixels, decoded.width, decoded.height));
  };
  /** Member names any window layout references — see `loadCastArt`. */
  const wantedArt = new Set<string>();
  /**
   * A cast's bitmap rows as [name, asset], parsed once per manifest. Every cast
   * load re-sweeps every cast already extracted (see `loadCastArt`), and
   * re-splitting all of their manifests each time was ~8% of busy CPU once
   * casts started arriving in quick succession.
   */
  const bitmapRows = new Map<string, { manifest: string; rows: Array<[string, string]> }>();
  const bitmapRowsOf = (castKey: string, manifest: string): Array<[string, string]> => {
    const known = bitmapRows.get(castKey);
    if (known && known.manifest === manifest) return known.rows;
    const rows: Array<[string, string]> = [];
    for (const row of manifest.split(/\r?\n/).slice(1)) {
      const cols = row.split("\t");
      const asset = (cols[6] ?? "").trim();
      if (asset.startsWith("bitmaps/")) rows.push([(cols[2] ?? "").trim(), asset]);
    }
    bitmapRows.set(castKey, { manifest, rows });
    return rows;
  };
  setBitmapLoader((member, buffer) => {
    const url = member.imagePath;
    /**
     * ⚠ SYNCHRONOUS when the cast's art is resident — see `loadCastArt`.
     *
     * This is the branch that makes a window draw complete on its first frame
     * instead of as a caption on an empty panel. `the image of member` is a
     * synchronous read in Director, and VMK composes a window ONCE from
     * whatever pixels exist at that moment, so answering later is answering
     * never for that window.
     */
    const resident = decodedArt.get(url);
    if (resident) {
      buffer.source = resident;
      const opaque = opaqueArt.get(url);
      if (opaque) buffer.opaqueSource = opaque;
      return;
    }
    if (url === "" || failedArt.has(url)) return;
    const waiters = inFlight.get(url);
    if (waiters) { waiters.add(buffer); return; }
    const requesters = new Set<LingoImage>([buffer]);
    inFlight.set(url, requesters);
    bitmapsRequested++;
    // First frame of a magic effect: fetch its siblings now, not one per tick.
    const family = effectFamilyOf(member.name);
    if (family && effectFamilies.has(family) && !effectFamiliesFetched.has(family)) {
      effectFamiliesFetched.add(family);
      for (const sibling of effectFamilies.get(family) ?? []) {
        if (sibling === member) continue;
        const image = sibling.image;
        if (image instanceof LingoImage) image.requestSource();
      }
    }
    void (async () => {
      try {
        // Out of the cast's pack, else batched with the same tick's other
        // requests — see `loadCastPack` and `batchedBytes`.
        const parts = splitCastUrl(url);
        let bytes = parts ? await castBitmapBytes(parts[0], parts[1]) : undefined;
        if (bytes === null) throw new Error("HTTP 404");
        if (!bytes) {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP ${String(response.status)}`);
          bytes = await response.arrayBuffer();
        }
        const art = await createImageBitmap(new Blob([bytes]));
        const opaque = wantsOpaqueCopy(member.name) ? await opaqueCopy(bytes) : null;
        if (opaque) opaqueArt.set(url, opaque);
        // Removed BEFORE assigning: `set source` wakes waiters, and a waiter
        // that asks again must start a fresh request, not join a finished one.
        inFlight.delete(url);
        for (const target of requesters) {
          target.source = art;
          if (opaque) target.opaqueSource = opaque;
        }
      } catch {
        inFlight.delete(url);
        failedArt.add(url);
        bitmapsFailed++;
      }
    })();
  });
  if (options.debug) {
    Object.assign(globalThis, {
      vmkBitmapStats: () => ({ requested: bitmapsRequested, failed: bitmapsFailed }),
      vmkSoundStats: () => soundStats(),
    });
  }

  /**
   * ⚠ CPU PROFILER — `window.vmkPerf`, for tracking the heavy tasks.
   *
   * Two layers, both cheap when idle:
   *
   *  1. An always-on `longtask` observer records every main-thread block ≥50ms
   *     (`vmkPerf.tasks()`), so a stall shows up without any per-call cost — the
   *     browser reports the entries, we just keep the last 500.
   *  2. An OPT-IN op profiler (`vmkPerf.start()` … `vmkPerf.stop()`) wraps the
   *     hot `LingoImage` methods with wall-clock timers for the length of one
   *     session, then unwraps. Nothing is wrapped outside a session, so normal
   *     play pays nothing — this is the same live-wrap that measured the avatar
   *     compose (setAlpha/copyPixels/extractAlpha), made reusable.
   *
   * `stop()` returns ops sorted by time. Wall time can double-count a method
   * that calls another wrapped one, so read it for RANKING, not exact isolation.
   */
  const perfLongTasks: Array<{ t: number; dur: number }> = [];
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        perfLongTasks.push({ t: Math.round(e.startTime), dur: Math.round(e.duration) });
        if (perfLongTasks.length > 500) perfLongTasks.shift();
      }
    }).observe({ entryTypes: ["longtask"] });
  } catch { /* Safari/older WebKit has no longtask entry type — tasks() stays empty. */ }

  const PERF_OPS = ["copyPixels", "setAlpha", "extractAlpha", "fill", "duplicate", "copyIntoLevels"] as const;
  const perfAcc = new Map<string, { n: number; ms: number }>();
  /**
   * Per-half-second buckets of op time, and cast attaches, so a slow stretch can
   * be lined up with what was loading at the time (`vmkPerf.timeline()`).
   */
  /**
   * Lingo handler SELF time, by `Class.handler` (and `global x` / `builtin x`):
   * time inside the handler minus the handlers it called. Self time points at
   * the code that is actually slow rather than at whoever called it. Recursion
   * is counted per frame, which is right for self time.
   */
  const handlerAcc = new Map<string, { calls: number; self: number }>();
  const handlerStack: Array<{ label: string; t0: number; child: number }> = [];
  const handlerProfile = {
    enter(label: string): void {
      handlerStack.push({ label, t0: performance.now(), child: 0 });
    },
    exit(): void {
      const frame = handlerStack.pop();
      if (!frame) return;
      const total = performance.now() - frame.t0;
      const row = handlerAcc.get(frame.label) ?? { calls: 0, self: 0 };
      row.calls++;
      row.self += total - frame.child;
      handlerAcc.set(frame.label, row);
      const parent = handlerStack[handlerStack.length - 1];
      if (parent) parent.child += total;
    },
  };
  const PERF_BUCKET_MS = 500;
  const perfBuckets = new Map<number, Record<string, number>>();
  const perfBucket = (op: string, ms: number): void => {
    const at = Math.floor(performance.now() / PERF_BUCKET_MS);
    const row = perfBuckets.get(at) ?? {};
    row[op] = (row[op] ?? 0) + ms;
    perfBuckets.set(at, row);
  };
  type PerfMethod = ((...a: unknown[]) => unknown) & { __perfOrig?: (...a: unknown[]) => unknown };
  const perfWrap = (on: boolean): void => {
    const proto = LingoImage.prototype as unknown as Record<string, PerfMethod>;
    for (const name of PERF_OPS) {
      const cur = proto[name];
      if (typeof cur !== "function") continue;
      if (on && !cur.__perfOrig) {
        const orig = cur;
        const wrapped = function (this: unknown, ...a: unknown[]): unknown {
          const t0 = performance.now();
          try {
            return orig.apply(this, a);
          } finally {
            let s = perfAcc.get(name);
            if (!s) { s = { n: 0, ms: 0 }; perfAcc.set(name, s); }
            s.n++;
            const spent = performance.now() - t0;
            s.ms += spent;
            perfBucket(name, spent);
          }
        } as PerfMethod;
        wrapped.__perfOrig = orig;
        proto[name] = wrapped;
      } else if (!on && cur.__perfOrig) {
        proto[name] = cur.__perfOrig;
      }
    }
  };
  // Held locally and published only in debug: the `?perf` paths below drive it
  // directly, so they work whether or not `window.vmkPerf` exists.
  const vmkPerf = {
      /** Main-thread blocks ≥ `min` ms, worst first. */
      tasks: (min = 50) =>
        perfLongTasks.filter((e) => e.dur >= min).sort((a, b) => b.dur - a.dur).slice(0, 25),
      /** Total ms the main thread was blocked in recorded long tasks. */
      blockedMs: () => perfLongTasks.reduce((s, e) => s + e.dur, 0),
      /** Cumulative cast-attach cost since the last `start()` (or boot). */
      castStats: () => ({ ...perfCast }),
      /**
       * Op time per half-second (ms), long tasks, and cast attaches, in order —
       * `from`/`to` in ms since page load. Rows with nothing in them are skipped.
       */
      timeline: (from = 0, to = Infinity) => {
        const rows: Array<Record<string, unknown>> = [];
        const keys = new Set<number>([
          ...perfBuckets.keys(),
          ...perfLongTasks.map((e) => Math.floor(e.t / PERF_BUCKET_MS)),
          ...perfEvents.map((e) => Math.floor(e.t / PERF_BUCKET_MS)),
        ]);
        for (const k of [...keys].sort((a, b) => a - b)) {
          const t = k * PERF_BUCKET_MS;
          if (t < from || t > to) continue;
          const ops = perfBuckets.get(k) ?? {};
          const blocked = perfLongTasks.filter((e) => Math.floor(e.t / PERF_BUCKET_MS) === k).reduce((s, e) => s + e.dur, 0);
          const events = perfEvents.filter((e) => Math.floor(e.t / PERF_BUCKET_MS) === k).map((e) => e.what);
          const opsText = Object.entries(ops).filter(([, ms]) => ms >= 1).map(([op, ms]) => `${op} ${Math.round(ms)}`).join(", ");
          rows.push({ t: (t / 1000).toFixed(1), blocked, ops: opsText, events: events.join(" | ") });
        }
        return rows;
      },
      /**
       * Lingo handlers ranked by self time since `start()` (or the last
       * `handlers(n, true)`), top `n`. Pass `reset` to begin a fresh window —
       * e.g. read after login, then again after entering a room.
       */
      handlers: (n = 25, reset = false) => {
        const rows = [...handlerAcc.entries()]
          .map(([handler, v]) => ({ handler, calls: v.calls, selfMs: Math.round(v.self) }))
          .sort((a, b) => b.selfMs - a.selfMs)
          .slice(0, n);
        if (reset) handlerAcc.clear();
        return rows;
      },
      /** Begin an op-profiling session (wraps the hot ops, clears counters). */
      start: () => {
        handlerAcc.clear();
        handlerStack.length = 0;
        setHandlerProfiler(handlerProfile);
        perfBuckets.clear();
        perfEvents.length = 0;
        perfAcc.clear();
        perfLongTasks.length = 0;
        perfCast.casts = 0; perfCast.members = 0; perfCast.ms = 0; perfCast.parseMs = 0;
        perfWrap(true);
        return "profiling — run the action, then vmkPerf.stop()";
      },
      /** End the session and return ops ranked by wall time. */
      stop: () => {
        perfWrap(false);
        setHandlerProfiler(null);
        const ops = [...perfAcc.entries()]
          .map(([op, v]) => ({ op, calls: v.n, ms: Math.round(v.ms) }))
          .sort((a, b) => b.ms - a.ms);
        return { ops, castAttach: { ...perfCast }, blockedMs: perfLongTasks.reduce((s, e) => s + e.dur, 0), longTasks: perfLongTasks.filter((e) => e.dur >= 50).length };
      },
  };
  if (options.debug) Object.assign(globalThis, { vmkPerf });
  /**
   * `?perf=1` starts profiling at BOOT. A session started from the console
   * misses everything that happens once per page load — the first avatar
   * build, the first room — which is exactly what "slow the first time" is.
   * Also widens the resource-timing buffer (default 250, full by room entry).
   */
  try {
    if (typeof location !== "undefined" && new URLSearchParams(location.search).has("perf")) {
      performance.setResourceTimingBufferSize(20000);
      vmkPerf.start();
      console.log("[perf] profiling from boot (?perf); call vmkPerf.stop() to read it");
    }
  } catch { /* profiling is optional */ }

  /**
   * `?perf=sample` — Chrome's in-page SAMPLING profiler instead of the handler
   * wrappers, which cost more than the calls they time. Samples see everything,
   * runtime internals included (dispatch, proxy traps, the stage). Needs the
   * `Document-Policy: js-profiling` header, which the web server sends for
   * `/play?perf…`. Read with `await vmkPerf.samples()`.
   */
  type SampleTrace = {
    frames: Array<{ name: string; resourceId?: number; line?: number }>;
    resources: string[];
    stacks: Array<{ frameId: number; parentId?: number }>;
    samples: Array<{ stackId?: number }>;
  };
  let sampler: { stop(): Promise<SampleTrace> } | null = null;
  try {
    const wantSamples = typeof location !== "undefined" && new URLSearchParams(location.search).get("perf") === "sample";
    const ProfilerCtor = (globalThis as unknown as { Profiler?: new (o: { sampleInterval: number; maxBufferSize: number }) => { stop(): Promise<SampleTrace> } }).Profiler;
    if (wantSamples) {
      // The wrappers would skew the samples; sampling alone.
      vmkPerf.stop();
      if (ProfilerCtor) {
        sampler = new ProfilerCtor({ sampleInterval: 10, maxBufferSize: 1_000_000 });
        console.log("[perf] sampling profiler running; await vmkPerf.samples()");
      } else {
        console.log("[perf] no Profiler API — is the js-profiling Document-Policy header present?");
      }
    }
  } catch (error) {
    console.log(`[perf] sampling profiler unavailable: ${String(error)}`);
  }
  Object.assign(vmkPerf, {
    /**
     * Stop the sampler and rank functions by SELF samples (top of stack) and by
     * INCLUSIVE samples (anywhere on the stack). Restart it for the next window.
     */
    samples: async (n = 30, focus?: string) => {
      if (!sampler) return "no sampler — load /play?perf=sample";
      const trace = await sampler.stop();
      const label = (frameId: number): string => {
        const f = trace.frames[frameId];
        const file = f.resourceId !== undefined ? (trace.resources[f.resourceId] ?? "").split("/").pop() : "";
        return `${f.name || "(anonymous)"} ${file}:${f.line ?? "?"}`;
      };
      const self = new Map<string, number>();
      const inclusive = new Map<string, number>();
      // `focus`: who calls the function whose name starts with it — the chain
      // of the next three frames up, counted per sample.
      const callers = new Map<string, number>();
      let total = 0;
      for (const sample of trace.samples) {
        if (sample.stackId === undefined) continue;
        total++;
        let stackId: number | undefined = sample.stackId;
        const seen = new Set<string>();
        let top = true;
        let focusHit = false;
        while (stackId !== undefined) {
          const stack = trace.stacks[stackId];
          const name = label(stack.frameId);
          if (top) { self.set(name, (self.get(name) ?? 0) + 1); top = false; }
          if (!seen.has(name)) { seen.add(name); inclusive.set(name, (inclusive.get(name) ?? 0) + 1); }
          if (focus && !focusHit && name.startsWith(focus)) {
            focusHit = true;
            const chain: string[] = [];
            let up = stack.parentId;
            for (let i = 0; i < 3 && up !== undefined; i++) {
              chain.push(label(trace.stacks[up].frameId));
              up = trace.stacks[up].parentId;
            }
            const key = chain.join("  <  ");
            callers.set(key, (callers.get(key) ?? 0) + 1);
          }
          stackId = stack.parentId;
        }
      }
      const rank = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
        .map(([name, count]) => `${(100 * count / Math.max(1, total)).toFixed(1)}%  ${name}`);
      const ProfilerCtor = (globalThis as unknown as { Profiler?: new (o: { sampleInterval: number; maxBufferSize: number }) => { stop(): Promise<SampleTrace> } }).Profiler;
      sampler = ProfilerCtor ? new ProfilerCtor({ sampleInterval: 10, maxBufferSize: 1_000_000 }) : null;
      return {
        busySamples: total,
        self: rank(self),
        inclusive: rank(inclusive),
        ...(focus ? { callers: rank(callers) } : {}),
      };
    },
  });

  /**
   * TEMPORARY in-source probe for early-boot drawing.
   *
   * ⚠ IN SOURCE, NOT INJECTED. A probe attached through the browser tool's
   * script-exec records its own arrival at ~29 s after page load — the
   * round-trip alone — so it attaches long after the logo, the cast queue and
   * the dictionary phase are finished. Every injected probe in this port that
   * claimed to measure early boot was structurally incapable of it, and
   * produced truthful counts of a window that excluded the event ("only 3
   * fills" among them). Arming here runs as part of the module, before the
   * first frame.
   *
   * Records where a sprite channel is FIRST occupied by each member and what
   * the compositor had to work with, so "never drawn" and "drawn but
   * invisible" can be told apart — which matters here because the loading
   * bar's progress colour (rgb(0,62,114)) is nearly its panel's own navy.
   */
  const probe: Array<Record<string, unknown>> = [];
  const seenMembers = new Set<string>();
  if (options.debug) Object.assign(globalThis, { vmkProbe: () => probe });
  if (options.debug) stage.onFirstDraw = (channel, member): void => {
    const name = String(member.name ?? "");
    if (name === "" || seenMembers.has(name)) return;
    seenMembers.add(name);
    const image = member.image as { source?: unknown; fillColor?: unknown } | undefined;
    probe.push({
      t: Math.round(performance.now()),
      member: name,
      channel: channel.spriteNum,
      visible: channel.visible,
      ink: channel.ink,
      /**
       * ⚠ The datum that decides the ink-36 fix. Director keys ink 36 on the
       * sprite's bgColor and DEFAULTS THAT TO WHITE; ours defaults to VOID. If
       * VMK leaves these unset, correcting the default fixes both the erased
       * bar and the white caption slabs with one rule. If VMK sets a non-white
       * value here, Director's rule does not capture its intent and the
       * flat-buffer case needs a different discriminator.
       */
      bgColor: String(channel.bgColor),
      loc: `${String(channel.locH)},${String(channel.locV)}`,
      size: `${String(member.width)}x${String(member.height)}`,
      pixels: image && typeof image === "object" ? Boolean(image.source) : null,
      fill: image && typeof image === "object" ? String(image.fillColor) : null,
    });
  };

  // ---- network ------------------------------------------------------------
  const params = new URLSearchParams(location.search);
  registerNetBuiltins({
    /**
     * ⚠ `binaryType` MUST be "arraybuffer".
     *
     * The MUS bridge is a BINARY WebSocket, and a browser socket defaults to
     * `binaryType = "blob"` — so `event.data` arrives as a Blob, which is only
     * readable asynchronously. `MultiuserXtra.decode` saw a non-string,
     * non-ArrayBuffer value and fell through to `String(data)`, handing VMK the
     * literal text `"[object Blob]"` for every frame.
     *
     * It fails silently and looks like a dead server: the connection opens, the
     * server sends `2001 connectionReady` with its Diffie-Hellman public key,
     * and the client simply never replies — no error, on either side.
     */
    socketFactory: (url) => {
      const socket = new WebSocket(url);
      socket.binaryType = "arraybuffer";
      /**
       * Trace the connection lifecycle.
       *
       * The client raises its own `ErrorInConnection` window when a connect
       * fails, and that window says nothing about WHY — so a refused socket, a
       * rejected login and a server that closed mid-handshake all present
       * identically on screen. These lines are the only way to tell them apart.
       */
      log(`ws connect ${url}`);
      socket.addEventListener("open", () => { log(`ws open ${url}`); });
      socket.addEventListener("error", () => { log(`ws error ${url}`); });
      socket.addEventListener("close", (event) => {
        log(`ws close ${url} code=${String(event.code)} clean=${String(event.wasClean)}` +
          (event.reason ? ` reason=${event.reason}` : ""));
      });
      return socket as never;
    },
    /**
     * The MUS handshake, as a sequence.
     *
     * VMK's login is driven entirely by messages after `Initialize`:
     *
     *   dictionary_ready -> OpenConnection -> createConnection(VMK,ip,port)
     *     <- 2001 connectionReady   -> send(11, "00")  (declines encryption)
     *     <- 2002 _Hello            -> createTimeout("login_starter", 500,
     *                                     #DoTheLogin, …) — RETRIES until
     *                                     m_bFurniMapsLoaded is 1
     *                               -> send("login", [user, pass, machineID])
     *     <- 2018                   -> RemoveLoginWindow
     *
     * A stalled login is a sequence that STOPPED, so what matters is which
     * frame was last seen — not any single value read at an arbitrary moment.
     *
     * ⚠ The id is printed from the frame's own leading digits rather than by
     * decoding the MUS header: the numbers here must be readable next to the
     * SERVER's log without this side pretending to a precision it does not
     * have. Non-printable bytes become `.` so a binary frame stays one line.
     */
    onProtocol: (direction, content) => {
      const arrow = direction === "in" ? "<<" : ">>";
      const printable = content
        .slice(0, 48)
        .replace(/[^\x20-\x7e]/g, ".");
      const id = /\b(\d{2,4})\b/.exec(printable.slice(0, 24))?.[1] ?? "?";
      log(`mus ${arrow} ${String(content.length)}b id~${id} "${printable}"`);
    },
    fetchText: async (url, report) => {
      // A `.cct` request is a CAST download. There is no Director file reader
      // here, so fetch that cast's extracted form instead of bytes that would
      // never be parsed; the download still completes from VMK's point of view.
      /**
       * ⚠ ANY `.cct` request is a cast download, not just a hashed one.
       *
       * `cast.entry.36` is `vmk_clothes/gfx_avatar_bodyparts` — a name, not a
       * hash, and art absent from the archive. Matching only hashes sent it down
       * the config path, where the HTML guard threw; the instance went to
       * `#error`, and since `DoneCurrentDownLoad` only runs when the state is NOT
       * `#error`, it sat in `pCurrentDownLoads` forever and blocked every cast
       * behind it. One missing file stalled the whole queue at 35 of 37.
       *
       * A cast that cannot be supplied now reports "done with nothing", so the
       * attach step logs a miss and the queue moves on.
       */
      if (/\.cct(?:\?|$)/i.test(url)) {
        const key = castKey(url);
        const loading = prefetchCast(key, report);
        // While this one loads, start downloading the casts queued behind it.
        downloadUpcomingCasts();
        const ok = await loading;
        if (!ok) log(`cast unavailable: ${url.split("/").pop() ?? url}`);
        return ok ? `cast:${key}` : "";
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${String(response.status)}`);
      const body = decodeConfigText(await response.arrayBuffer());
      // ⚠ A dev server answers an unknown path with its SPA fallback — an HTML
      // page, status 200 — and the client will parse that as configuration and
      // boot on markup. A 200 is not evidence that the right thing came back.
      const type = response.headers.get("content-type") ?? "";
      if (type.includes("text/html") || body.trimStart().startsWith("<!doctype")) {
        throw new Error(`expected config, got HTML from ${url}`);
      }
      log(`fetch ${url} -> ${String(body.length)} bytes`);
      return body;
    },
    // Shockwave's `sw1`…`sw9` arrive as query parameters in a browser.
    externalParam: (name) => params.get(name) ?? undefined,
  });

  // ---- movie environment --------------------------------------------------
  // ⚠ `runMode` must contain "Plugin" or the boot skips its whole
  // embed-parameter branch and never loads any config.
  const input = installMovieEnvironment({ canvas: options.canvas, runMode: "Plugin" });

  /**
   * ⚠ CSS PIXELS ARE NOT STAGE PIXELS.
   *
   * The canvas is 800x600 but the page displays it smaller, so `clientX` had to
   * be scaled — unscaled, every reported mouse position was wrong by the display
   * ratio and no hit test could ever agree with what the user was pointing at.
   */
  const toStage = (event: { clientX: number; clientY: number }): { x: number; y: number } => {
    const box = options.canvas.getBoundingClientRect();
    const scaleX = box.width > 0 ? options.canvas.width / box.width : 1;
    const scaleY = box.height > 0 ? options.canvas.height / box.height : 1;
    return { x: (event.clientX - box.left) * scaleX, y: (event.clientY - box.top) * scaleY };
  };

  /**
   * Alpha lookup for hit testing, cached per drawable.
   *
   * ⚠ Transparent pixels must not be clickable. A window element's buffer is a
   * full rectangle whose background has been keyed out by ink 36, so a plain
   * rect test would make every button swallow clicks across its whole box —
   * including the gaps between the navigation arrows, which sit 14x16 inside
   * much larger groups.
   */
  const alphaCache = new WeakMap<object, ImageData | null>();
  const alphaOf = (drawable: unknown, width: number, height: number): ImageData | null => {
    if (typeof drawable !== "object" || drawable === null) return null;
    const cached = alphaCache.get(drawable);
    if (cached !== undefined) return cached;
    let data: ImageData | null = null;
    try {
      const surface = document.createElement("canvas");
      surface.width = Math.max(1, Math.floor(width));
      surface.height = Math.max(1, Math.floor(height));
      const context = surface.getContext("2d", { willReadFrequently: true });
      if (context) {
        context.drawImage(drawable as CanvasImageSource, 0, 0);
        data = context.getImageData(0, 0, surface.width, surface.height);
      }
    } catch {
      data = null;
    }
    alphaCache.set(drawable, data);
    return data;
  };

  /**
   * The sprite under a stage point: topmost by `locZ`, skipping transparency.
   *
   * ⚠ `locZ` is the draw order the compositor already sorts by, so "last drawn
   * wins" is the same rule the user sees.
   */
  /**
   * Does this channel carry any behaviour — i.e. can it answer a mouse event?
   *
   * `CMgrSprite.setEventBroker` and `CRoomMouseEventProcessor.CreateSprite` both
   * work by putting an instance in `scriptInstanceList`, so this is the same
   * question Director asks.
   */
  const isInteractive = (channel: SpriteChannel): boolean => {
    const list = (channel as unknown as {
      scriptInstanceList?: { toArray?(): LingoValue[] };
    }).scriptInstanceList;
    if (!list || typeof list.toArray !== "function") return false;
    return list.toArray().some((instance) => instance !== undefined && instance !== null);
  };

  const spriteAt = (x: number, y: number): SpriteChannel | null => {
    /**
     * ⚠ ONLY A SPRITE WITH A BEHAVIOUR CAN WIN A CLICK, and the search is TWO
     * TIERED. Ported from LibreShockwave's player, which is the authority here:
     * `CursorManager::hitTestInteractive` takes the topmost sprite that is
     * interactive AND pixel-hit, and falls back to the topmost interactive
     * sprite by BOUNDING BOX (`HitTester::hitTestAll` walks topmost-first).
     *
     * Decorative art is therefore transparent to the mouse no matter how high it
     * sits. That is not a shortcut — it is what makes rooms work at all.
     *
     * MEASURED in the Emporium, which was dead to every click:
     *
     *     Spotter           locZ -4994020   ink 0   behaviours 0   [-2,-1,594,599]
     *     Daylight          locZ -4994300   ink 0   behaviours 0   [76,26,797,585]
     *     room_hiliter_24   locZ -4996460   ink 0   behaviours 1   (the marker)
     *
     * Two full-room lighting overlays sit above the tile marker and cover nearly
     * the whole stage. The depth is CORRECT — `CRoomAnchor.GetScrPos` computes
     * `Zs = 10*(X+Y) + 5*Z + offZ`, and Spotter's node at X=247 Y=351 gives
     * exactly -4994020 — so this can never be fixed by reordering. The overlays
     * simply must not take the click. `frontgate_roof` over the plaza is the
     * same shape of bug.
     *
     * ⚠ THE BOUNDING FALLBACK IS WHAT SAVES THE MARKER. `room_hiliter_24` is a
     * hollow diamond outline, only 27% opaque, whose centre pixel has alpha 1.
     * An earlier attempt pixel-tested every sprite and left the middle of every
     * tile dead — "I have to be directly on the mark". Being interactive, the
     * marker still wins on its rect when no exact hit is found.
     */
    let exact: SpriteChannel | null = null;
    let bounding: SpriteChannel | null = null;
    for (const channel of stage.activeChannels()) {
      const member = channel.member;
      if (!member || channel.visible === 0) continue;
      /**
       * ⚠ THE HIT BOX MUST BE THE DRAWN BOX — REGISTRATION POINT AND ALL.
       *
       * `the loc of sprite` is its REGISTRATION POINT, not its top-left, and the
       * compositor already knows that: `Stage.render` draws at
       * `locH - regPoint.locH, locV - regPoint.locV`. This test used the raw
       * `loc`, so every sprite with a non-zero regPoint was CLICKABLE SOMEWHERE
       * IT WAS NOT DRAWN, offset by exactly its registration point.
       *
       * MEASURED on the registration tips page, whose NEXT button did nothing.
       * The animation's "Layer 1" sprite has regPoint (33,90) and locZ 29, above
       * the button's 10:
       *
       *     drawn   x 684..759  y 293..488     (does NOT cover the button)
       *     tested  x 717..792  y 383..578     (DOES — it sits right on top)
       *
       * so `the clickOn` came back 149 instead of the button's 128, mouseDown
       * never reached `CWindowCommonButton`, its `pClickPass` stayed VOID, and
       * `mouseUp` returned 0 at that gate. The button itself was faultless —
       * calling `mouseDown` then `mouseUp` on it by hand advanced the page.
       *
       * Sized from `drawWidth`/`drawHeight` for the same reason: they are what
       * the renderer puts in the draw record, so the two cannot drift apart.
       */
      // A stretched sprite's reg point stretches with it — same as the renderer.
      const width = channel.drawWidth;
      const height = channel.drawHeight;
      const scaleX = channel.stretchWidth !== undefined && member.width > 0 ? width / member.width : 1;
      const scaleY = channel.stretchHeight !== undefined && member.height > 0 ? height / member.height : 1;
      /**
       * ⚠ A MIRRORED SPRITE IS DRAWN MIRRORED ABOUT ITS `loc`, so its box is too.
       *
       * `Stage.blitMirrored` flips about the registration point (see the rope
       * divider note there), which moves the drawn box to the other side of
       * `loc` unless the art is registered dead-centre. This test kept the
       * unflipped box and sampled the unflipped alpha, so an FLP=1 piece was
       * clickable where it WOULD have been drawn unmirrored. MEASURED on the Tea
       * Cup Teleporter (item 53) at dir 3, every piece FLP=1 with regX far off
       * centre (9..56 on ~60-100px art): furni mode could not select it — the
       * click fell through to the floor marker and walked instead. Shockwave
       * selects it fine.
       */
      const unflippedLeft = channel.locH - member.regPoint.locH * scaleX;
      const unflippedTop = channel.locV - member.regPoint.locV * scaleY;
      const flipH = Boolean(channel.flipH);
      const flipV = Boolean(channel.flipV);
      const left = flipH ? 2 * channel.locH - unflippedLeft - width : unflippedLeft;
      const top = flipV ? 2 * channel.locV - unflippedTop - height : unflippedTop;
      if (x < left || y < top || x >= left + width || y >= top + height) continue;

      // Non-interactive sprites are invisible to the mouse — see above.
      if (!isInteractive(channel)) continue;
      /**
       * ⚠ …BUT NOT A SPRITE CUT OUT BY ITS OWN ALPHA MASK. The fallback exists
       * for the floor marker, and that is Copy ink — an exact hit over its whole
       * rect already. A masked sprite (every avatar: an 80x160 canvas holding a
       * much smaller figure) is drawn only where its mask is, and that is its
       * whole hit region. On the fallback, hovering the EMPTY space above an
       * avatar's head brought up its name tag, which the original never does.
       */
      const heldImage = member.image;
      const ownMask = channel.ink !== 0 && heldImage instanceof LingoImage &&
        Boolean((heldImage as { useAlpha?: unknown }).useAlpha);
      if (!ownMask && (!bounding || channel.locZ >= bounding.locZ)) bounding = channel;

      /**
       * ⚠ COPY INK IS HIT-TESTED AS ITS WHOLE RECT. DO NOT ALPHA-TEST IT.
       *
       * Director's Copy ink paints every pixel of the sprite's rect, so the rect
       * IS the hit region — and VMK depends on that for the room's click
       * surface. `CRoomMouseEventAgent`, the only behaviour carrying
       * `mouseDown`/`mouseUp` on the floor layer, is attached to the tile MARKER
       * (`room_hiliter_<tilesize>`), and the room background carries no
       * behaviours at all. So a click reaches the room only through the marker.
       *
       * MEASURED on `room_hiliter_24`: 50x25, ink 0, and only 342 of 1250 pixels
       * opaque (27%) — it is a hollow diamond outline whose CENTRE pixel has
       * alpha 1. Alpha-testing it therefore made only the thin outline clickable
       * and left the middle of every tile dead, which is the "I have to be
       * directly on the mark" report. Treating the rect as solid restores the
       * original behaviour: hovering a tile shows the marker, and clicking
       * anywhere on it walks there.
       *
       * ⚠ TRIED AND REVERTED: alpha-testing every ink including Copy, to stop
       * `frontgate_roof` (ink 0, alpha 0 at the sampled point) swallowing clicks
       * over the plaza. That reasoning was sound about the roof but wrong about
       * Director, and it broke the marker — a strictly worse trade, since the
       * marker is the ONLY way a click reaches the floor. If the roof turns out
       * to genuinely block clicks in the original too, that is a z-order or
       * source-art question, not a hit-test one.
       */
      /**
       * ⚠ ONLY MATTE (INK 8) IS HIT-TESTED BY PIXEL. Every other ink takes its
       * whole rect, even where it draws nothing — DirPlayer's
       * `should_matte_hit_test`: "Only ink 8 (Matte) uses pixel-level hit
       * testing for mouse clicks. Other inks use bounding box detection even if
       * they use alpha for rendering."
       *
       * MEASURED on the Pirates lobby's "Add AI Player" slots: `#type "text"`
       * window elements drawn at ink 36 (background transparent), sitting over
       * the opaque dialog panel `…_back1`. Pixel-testing them made only the
       * glyph strokes clickable; a click between the letters missed, the panel
       * underneath scored the exact hit, and the slot never got its mouseUp.
       *
       * The one exception kept is a member cut out by its OWN alpha mask
       * (`useAlpha`, every avatar) — see below; that is what it draws, and the
       * name-tag hover was measured against it (`ownMask`, above).
       */
      if (channel.ink === 8 || ownMask) {
        const held = member.image;
        /**
         * ⚠ HIT-TEST THE ALPHA THAT IS DRAWN. A member carrying its OWN alpha
         * mask (`useAlpha` — every avatar) is composed over an OPAQUE BLACK fill
         * and cut out by that mask, and it is DRAWN from the mask, not from the
         * matte ink variant. The matte variant colour-keys the black fill and
         * eats the dark parts of the figure — MEASURED on the live avatar, the
         * ink-8 variant kept 535 opaque px (the head) out of the figure's 1754,
         * so only the head was hittable and hovering the shirt/body missed: the
         * name tag "wouldn't show over the avatar at all". Skip the variant for
         * masked members and test the source's own alpha, exactly what is drawn.
         */
        const usesOwnMask =
          held instanceof LingoImage && Boolean((held as { useAlpha?: unknown }).useAlpha);
        const variant = usesOwnMask ? undefined : member.inkVariants.get(channel.ink);
        const drawable = variant ?? (held instanceof LingoImage ? held.source : held);
        const pixels = alphaOf(drawable, member.width || channel.width, member.height || channel.height);
        if (pixels) {
          // Sample in the DRAWABLE's own space; a sprite may be stretched.
          // Scaled by the same box the bounds test used, or a stretched sprite
          // samples the wrong pixel.
          let sx = Math.min(
            pixels.width - 1,
            Math.max(0, Math.floor(((x - left) / width) * pixels.width)),
          );
          let sy = Math.min(
            pixels.height - 1,
            Math.max(0, Math.floor(((y - top) / height) * pixels.height)),
          );
          // The pixels are stored unmirrored; read the one that is drawn here.
          if (flipH) sx = pixels.width - 1 - sx;
          if (flipV) sy = pixels.height - 1 - sy;
          if (pixels.data[(sy * pixels.width + sx) * 4 + 3]! < 8) continue;
        }
      }

      if (!exact || channel.locZ >= exact.locZ) exact = channel;
    }
    // An exact hit wins; otherwise the topmost interactive rect takes it.
    return exact ?? bounding;
  };

  /**
   * Hand the event to the sprite's Director scripts.
   *
   * `CMgrSprite.setEventBroker` puts a `CEventBroker` instance in the sprite's
   * `scriptInstanceList`, and that broker's `mouseDown`/`mouseUp` call
   * `redirectEvent`, which reaches whatever `registerProcedure` was given for
   * the element. So the host's whole job is: find the sprite, call the scripts.
   */
  /**
   * Does this object answer `name`, itself or through its ancestor chain?
   *
   * ⚠ NOT RESPONDING IS NORMAL, AND IS NOT AN ERROR. Director sends a sprite
   * event to every script instance on the channel and simply skips the ones
   * with no such handler — most sprites have no `mouseEnter`. Calling blindly
   * turned that ordinary case into a thrown "Lingo method not found", and once
   * hover dispatch existed the log filled with one per mouse movement:
   *
   *     input: mouseEnter failed — Lingo method not found: mouseenter on
   *       object […] [CWindowUniqueElement -> CObject]
   *
   * Keeping the try/catch around the call is still worth it, but it now means
   * something: a handler that EXISTS and threw is a real fault, not noise.
   */
  const respondsTo = objectRespondsTo;

  /**
   * ⚠ A BARE MESSAGE IS NOT ENOUGH HERE. Input handlers run outside the frame
   * loop, so they miss the stack that `client.ts` prints for a frame error —
   * and a Lingo failure deep in a transpiled cast reads as
   *
   *     input: mouseUp failed — Cannot read properties of undefined
   *
   * with nothing saying WHICH cast, which handler, or which line. The generated
   * file names carry the class and handler, so a few frames of stack name the
   * fault outright. Paths are trimmed the same way `client.ts` trims them.
   */
  const logInputFailure = (handler: string, cause: unknown): void => {
    log(`input: ${handler} failed — ${(cause as Error).message}`);
    for (const line of (cause instanceof Error ? cause.stack ?? "" : "")
      .split("\n")
      .slice(1, 7)) {
      log(`      ${line.trim().replace(/https?:\/\/[^/]+\/(src\/)?/, "").replace(/\?[a-z0-9=&]+/gi, "")}`);
    }
  };

  const runEventScript = (property: string): void => {
    const script = theProperty(property);
    if (typeof script !== "string") return;
    const call = /^\s*(\w+)\s*(?:\(\s*\))?\s*$/.exec(script);
    if (!call) {
      if (script.trim() !== "") log(`input: ${property} "${script}" is not a bare handler call`);
      return;
    }
    try {
      callNamed(call[1]);
    } catch (cause) {
      logInputFailure(`${property} ${call[1]}`, cause);
    }
  };

  const dispatchMouse =(channel: SpriteChannel | null, handler: string): void => {
    const scripts = (channel as unknown as { scriptInstanceList?: LingoValue })?.scriptInstanceList;
    if (!scripts || typeof (scripts as { toArray?: unknown }).toArray !== "function") return;
    for (const instance of (scripts as unknown as { toArray(): LingoValue[] }).toArray()) {
      if (instance === undefined || instance === null) continue;
      if (!respondsTo(instance, handler)) continue;
      try {
        callMethod(handler, instance);
      } catch (cause) {
        // A handler that throws must not take the whole input system with it.
        logInputFailure(handler, cause);
      }
    }
  };

  /**
   * `the cursor of sprite` as a CSS cursor.
   *
   * `CEventBroker.setcursor` stores Director's own codes, so this is just the
   * other half of that mapping:
   *
   *     -1 arrow   1 ibeam   2 crosshair   3 crossbar   4 timer   0 unset
   *
   * ⚠ A LIST IS A CUSTOM CURSOR — `[memberNum, maskNum]`, the cast art Director
   * would blit. VMK sets one on every clickable element, so mapping it to
   * `pointer` is what makes buttons feel like buttons; drawing the actual cast
   * cursor would need a hardware-cursor image and is not what the player
   * notices.
   */
  const cssCursorFor = (channel: SpriteChannel | null): string => {
    const raw = (channel as unknown as { cursor?: unknown } | null)?.cursor;
    if (raw === undefined || raw === null) return "default";
    if (typeof (raw as { toArray?: unknown })?.toArray === "function") return "pointer";
    const code = Number(raw);
    if (!Number.isFinite(code)) return "default";
    switch (code) {
      case 1: return "text";
      case 2:
      case 3: return "crosshair";
      case 4: return "wait";
      default: return "default";
    }
  };

  /**
   * ⚠ HOVER WAS NEVER DISPATCHED. `pointermove` only recorded the position, so
   * `CEventBroker.mouseEnter` / `mouseLeave` — which exist, and which every
   * button's roll-over state is driven from — were dead code, and the cursor
   * never changed over a control either.
   *
   * Director sends the pair on TRANSITION, not continuously: leave the old
   * sprite first, then enter the new one. Sending `mouseEnter` every frame would
   * re-trigger a button's state change (and its sound) on every mouse movement.
   */
  let hoveredChannel: SpriteChannel | null = null;

  options.canvas.addEventListener("pointermove", (event) => {
    const at = toStage(event);
    input.setMouse(at.x, at.y);
    const over = spriteAt(at.x, at.y);
    if (over !== hoveredChannel) {
      dispatchMouse(hoveredChannel, "mouseLeave");
      hoveredChannel = over;
      dispatchMouse(over, "mouseEnter");
    }
    options.canvas.style.cursor = cssCursorFor(over);
  });

  /**
   * ⚠ `mouseWithin` IS A PER-FRAME EVENT, and it was never sent at all.
   *
   * Director dispatches it on EVERY FRAME the pointer is inside the sprite —
   * unlike `mouseEnter`/`mouseLeave`, which fire once on transition. That
   * continuous delivery is what makes press-and-hold behaviours work, and VMK
   * relies on it: `CWindowScrollbar.mouseWithin` is the whole of its
   * drag-the-lift implementation, reading `the mouseV` each frame and moving the
   * thumb to follow. With the event missing, the bar could only ever step once
   * per click — reported as "holding the bar down should let you scroll faster".
   *
   * ⚠ SENT TO THE PRESSED SPRITE WHEN THERE IS ONE, not to whatever is under the
   * cursor. A drag routinely travels outside the thumb — that is the point of
   * the clamping `mouseWithin` does — and Director keeps delivering to the
   * sprite that owns the gesture. Falling back to the hovered sprite covers the
   * un-pressed case, which is what a plain hover-repeat wants.
   *
   * Paced off `the frameTempo` like the movie loop, so it follows the same clock
   * VMK's animations do rather than a second, unrelated timebase.
   */
  let withinTimer: ReturnType<typeof setInterval> | null = null;
  const pumpMouseWithin = (): void => {
    const target = pressedChannel ?? hoveredChannel;
    if (target) dispatchMouse(target, "mouseWithin");
  };
  const startWithinPump = (): void => {
    if (withinTimer !== null) return;
    const tempo = Number(theProperty("frameTempo"));
    const period = Number.isFinite(tempo) && tempo > 0 ? 1000 / tempo : 16;
    withinTimer = setInterval(pumpMouseWithin, period);
  };
  /**
   * ⚠ THE RELEASE GOES TO THE SPRITE THAT WAS PRESSED, not to whatever is under
   * the cursor when the button comes up.
   *
   * Director tracks the pressed sprite for the whole gesture, which is why
   * `CWindowCommonButton` carries BOTH `mouseUp` and `mouseUpOutSide`:
   *
   *   released ON the pressed sprite    -> mouseUp        (the click happened)
   *   released anywhere else            -> mouseUpOutSide (cancelled)
   *
   * Dispatching by cursor position instead made buttons work only SOMETIMES: a
   * pixel of drift between press and release, or a release over a sibling
   * element, sent `mouseUp` to the wrong sprite or to none — and since `mouseUp`
   * is what actually fires a button's action, the click was simply lost. It felt
   * intermittent because it depended on how still the mouse was held.
   */
  let pressedChannel: SpriteChannel | null = null;

  /**
   * ⚠ Seed Director's DEFAULT, or the first keystroke of the session is lost.
   *
   * An unread movie property comes back VOID, which `keyboardFocusChannel`
   * cannot tell from "no focus" — so until something clicked an editable field,
   * automatic focus never engaged and typing did nothing at all.
   */
  setTheProperty("keyboardFocusSprite", -1);

  /**
   * Writing `the selection of member` focuses the field showing it.
   *
   * ⚠ This is what hands the chat bar back after VMK has revoked focus — see
   * `CastMember.selection` for the measured trace. Restricted to EDITABLE
   * FIELDS so restoring a caret in a non-editable member cannot steal keys.
   */
  onFieldSelection((member) => {
    if (member.kind !== "field" || !member.editable) return;
    for (const channel of stage.activeChannels()) {
      if (channel.member !== member) continue;
      setTheProperty("keyboardFocusSprite", channel.spriteNum);
      return;
    }
    // Not on stage yet — automatic focus still lands on the lowest editable
    // field, which is the chat bar in a room.
    setTheProperty("keyboardFocusSprite", -1);
  });

  options.canvas.addEventListener("pointerdown", (event) => {
    const at = toStage(event);
    input.setMouse(at.x, at.y);
    const channel = spriteAt(at.x, at.y);
    pressedChannel = channel;
    input.setMouseButton(true, channel?.spriteNum ?? 0);
    /**
     * ⚠ CLICKING AN EDITABLE FIELD FOCUSES IT — and nothing did this, so the
     * registration name box could never be typed into.
     *
     * Director gives `the keyboardFocusSprite` to an editable field when it is
     * pressed; it is engine behaviour, not something VMK's Lingo asks for, so
     * there was no handler anywhere to notice it was missing.
     *
     * MEASURED before this: clicking the name box left `keyboardFocusSprite` at
     * 0 through the whole gesture, so `typeIntoFocusedField` had nothing to type
     * into. It LOOKED like the click was being lost — the field is the only
     * control with no visible pressed state — when the click was landing
     * correctly and the focus was simply never assigned.
     *
     * ⚠ Pressing anything ELSE returns focus to AUTOMATIC (-1), Director's
     * default — NOT to 0. Clearing it to "nobody" is what made the in-room chat
     * bar dead: walking is a click on the floor, so the very first thing a
     * player does in a room revoked the focus they had never been given, and
     * only VMK's own `setFocus(chat.field, 1)` on closing Settings could ever
     * hand it back. With -1 the lowest editable field takes the keys again,
     * which is how you type in a VMK room without clicking the bar first.
     */
    const pressedMember = channel?.member;
    setTheProperty(
      "keyboardFocusSprite",
      pressedMember && pressedMember.kind === "field" && pressedMember.editable
        ? (channel?.spriteNum ?? -1)
        : -1,
    );
    runEventScript("mouseDownScript");
    dispatchMouse(channel, "mouseDown");
  });
  // ⚠ On WINDOW, not the canvas: a press that ends outside still has to release,
  // or the button sticks down forever and every later `the mouseDown` lies.
  window.addEventListener("pointerup", (event) => {
    const at = toStage(event);
    input.setMouse(at.x, at.y);
    const released = spriteAt(at.x, at.y);
    const pressed = pressedChannel;
    pressedChannel = null;
    input.setMouseButton(false, 0);
    if (!pressed) return;
    dispatchMouse(pressed, released === pressed ? "mouseUp" : "mouseUpOutSide");
  });

  // Per-frame `mouseWithin`, once the handlers it feeds are wired — see above.
  startWithinPump();
  /**
   * Director types into the EDITABLE FIELD that holds keyboard focus.
   *
   * ⚠ Nothing in the port did this, so `the keyboardFocusSprite` was set,
   * `the key` was correct, and the field stayed empty — registration cannot be
   * completed at all without it, because the player has to type a name.
   *
   * MEASURED before this existed: clicking "Type a name" set
   * `keyboardFocusSprite: 110`, that sprite's member reported
   * `kind: "field", editable: 1`, `the key` / `the keyCode` tracked every
   * keystroke ("o" / 111) — and `member.text` never moved off "".
   *
   * VMK reads the field back with `the text of member`, so editing the member's
   * text IS the whole contract; there is no separate caret model to maintain.
   * Only the focused sprite is touched, and only when its member is an editable
   * field, so this cannot disturb anything else that listens for keys.
   */
  const typeIntoFocusedField = (event: KeyboardEvent): void => {
    // ⚠ `Stage.keyboardFocusChannel` resolves Director's AUTOMATIC (-1) focus
    // as well as an explicit sprite. Reading the property directly here treated
    // the default as "no focus" and left the chat bar untypable — see there.
    const target = stage.keyboardFocusChannel()?.member ?? null;
    if (!target || target.kind !== "field" || !target.editable) return;

    const current = String(target.text ?? "");

    if (event.key === "Backspace") {
      target.text = current.slice(0, -1);
    } else if (event.key.length === 1) {
      // Printable only. Multi-character `key` values are the named keys
      // (Enter, Shift, ArrowLeft…), which a text field must ignore rather than
      // insert literally.
      target.text = current + event.key;
    } else {
      return;
    }
    // The caret and the field's own repaint are VMK's business; it re-reads the
    // member on its next frame.
    event.preventDefault();
  };

  /**
   * `the keyCode` — Director's MAC VIRTUAL KEY CODES, not the browser's.
   *
   * ⚠ DIRECTOR REPORTS MAC KEY CODES ON WINDOWS TOO, and VMK branches on them
   * directly (`CRegPage1._EventProc`, the `#keyDown` arm):
   *
   *     123/124/125/126  arrows       pass — let the field handle them
   *     117 / 51         del / bksp   pass
   *     36 / 49          return/space return 1, i.e. REJECT
   *     otherwise                     validate the character
   *
   * The browser's `keyCode` is a different table entirely, and the overlaps are
   * the dangerous part: JS 123 is F12, which would read as Left Arrow. Handing
   * VMK a browser code sends nearly every keystroke down the wrong arm — Return
   * (JS 13) falls into `otherwise` and gets validated as a character rather than
   * being rejected.
   */
  const MAC_KEY_CODES: Record<string, number> = {
    a: 0, s: 1, d: 2, f: 3, h: 4, g: 5, z: 6, x: 7, c: 8, v: 9, b: 11, q: 12,
    w: 13, e: 14, r: 15, y: 16, t: 17, "1": 18, "2": 19, "3": 20, "4": 21,
    "6": 22, "5": 23, "=": 24, "9": 25, "7": 26, "-": 27, "8": 28, "0": 29,
    "]": 30, o: 31, u: 32, "[": 33, i: 34, p: 35, l: 37, j: 38, "'": 39, k: 40,
    ";": 41, "\\": 42, ",": 43, "/": 44, n: 45, m: 46, ".": 47, "`": 50,
  };
  const MAC_NAMED_KEYS: Record<string, number> = {
    Enter: 36, Tab: 48, " ": 49, Backspace: 51, Escape: 53, Delete: 117,
    ArrowLeft: 123, ArrowRight: 124, ArrowDown: 125, ArrowUp: 126,
  };
  const directorKeyCode = (event: KeyboardEvent): number => {
    const named = MAC_NAMED_KEYS[event.key];
    if (named !== undefined) return named;
    return MAC_KEY_CODES[event.key.toLowerCase()] ?? 0;
  };

  /**
   * `the key` — Director's CHARACTER, not the browser's key NAME.
   *
   * ⚠ VMK compares `the key` against control CHARACTERS, so passing the DOM
   * name through meant those comparisons could never match:
   *
   *     CMessageBar.eventProcMessageBar   the key = "\r" or "\x03" -> keyCode 36
   *     CMessageBar.update                keyPressed("\b")
   *     CMessageBar.HandleKeyPressed      case "\b"
   *
   * ⚠ THIS IS WHY ENTER DID NOT SEND CHAT. `"Enter" <> "\r"`, so the message
   * bar never rewrote the keyCode to 36, never reached the `SendMessage` arm,
   * and the typed text just sat in the field — the one visible symptom being
   * that nothing happened at all.
   *
   * The default arm of that same handler runs `charToNum(the key)` against a
   * whitelist of legal chat characters, which is meaningless unless `the key`
   * is one character. Modifiers, which Director reports as empty, become "".
   */
  const chr = (code: number): string => String.fromCharCode(code);
  const DIRECTOR_KEYS: Record<string, string> = {
    Enter: chr(13), Tab: chr(9), Backspace: chr(8), Escape: chr(27),
    Delete: chr(127),
    ArrowLeft: chr(28), ArrowRight: chr(29), ArrowUp: chr(30), ArrowDown: chr(31),
  };
  const directorKey = (event: KeyboardEvent): string => {
    // Director tells the numpad's ENTER from RETURN, and so does VMK.
    if (event.code === "NumpadEnter") return chr(3);
    const mapped = DIRECTOR_KEYS[event.key];
    if (mapped !== undefined) return mapped;
    return event.key.length === 1 ? event.key : "";
  };

  /**
   * Send a key event to the sprite holding the keyboard focus, Director-style.
   *
   * Returns TRUE when a handler claimed the key by returning a truthy value.
   * That is Director's contract and VMK leans on it: a handler that returns 1
   * has REJECTED the keystroke (invalid character, name already at the 18-char
   * limit) and the character must not be inserted, while one that falls through
   * — or calls `pass` — lets the field take it.
   *
   * ⚠ WITHOUT THIS, TYPING BYPASSED VMK ENTIRELY. `CRegPageBase.update`
   * registers `_EventProc` for `#keyDown` and `#keyUp` alongside `#mouseUp`,
   * but only the mouse half was ever dispatched, so the field's text changed
   * under VMK's feet and none of the keyboard behaviour ran:
   *
   *     InactivateNameSelector   typing was meant to CLEAR a chosen name
   *     reg.char.not.allowed     the invalid-character dialog
   *     reg.name.toolong         the 18-character cap and its dialog
   */
  const dispatchToFocusedSprite = (handler: string): boolean => {
    // Automatic focus counts here too — the field VMK's Lingo would be typing
    // into is the one whose script must see `#keyDown` first.
    const channel = stage.keyboardFocusChannel();
    if (!channel) return false;
    let claimed = false;
    const scripts = (channel as unknown as { scriptInstanceList?: LingoValue }).scriptInstanceList;
    if (!scripts || typeof (scripts as { toArray?: unknown }).toArray !== "function") return false;
    for (const instance of (scripts as unknown as { toArray(): LingoValue[] }).toArray()) {
      if (instance === undefined || instance === null) continue;
      if (!respondsTo(instance, handler)) continue;
      try {
        if (lingoTruthy(callMethod(handler, instance))) claimed = true;
      } catch (cause) {
        logInputFailure(handler, cause);
      }
    }
    return claimed;
  };

  /**
   * ⚠ THE BROWSER'S SCROLLING KEYS BELONG TO THE GAME. Director never scrolled
   * a page, and the Jungle Cruise steers with the arrows through `the
   * keyDownScript` (no focused sprite claims them), so the down arrow scrolled
   * the page away mid-cruise. Left alone only while a real HTML text field on
   * the page has focus.
   */
  const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "PageUp", "PageDown", "Home", "End"]);
  const typingInPage = (target: EventTarget | null): boolean => {
    const el = target as HTMLElement | null;
    if (!el || typeof el.tagName !== "string") return false;
    return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
  };

  window.addEventListener("keydown", (event) => {
    if (SCROLL_KEYS.has(event.key) && !typingInPage(event.target)) event.preventDefault();
    input.setModifiers(event.shiftKey, event.ctrlKey, event.altKey, event.metaKey);
    input.setKey(directorKey(event), directorKeyCode(event));
    // VMK sees the key BEFORE the field changes — it reads the field's current
    // length to decide whether one more character would overflow.
    if (dispatchToFocusedSprite("keyDown")) {
      event.preventDefault();
      return;
    }
    typeIntoFocusedField(event);
  });
  /**
   * ⚠ RELEASE MATTERS, because `keyPressed()` asks what is held NOW.
   *
   * `the key` is "the key of the last keyDown" and legitimately persists, but
   * without a keyup the held-key state never clears and `keyPressed(x)` reports
   * the last key as still down forever — so a single backspace would repeat for
   * the rest of the session.
   */
  window.addEventListener("keyup", (event) => {
    // `#keyUp` is registered alongside `#keyDown`, so it has to be delivered
    // too; nothing on this page acts on it, but a registered event that never
    // arrives is the same silent gap the keyDown half was.
    dispatchToFocusedSprite("keyUp");
    input.setModifiers(event.shiftKey, event.ctrlKey, event.altKey, event.metaKey);
    // Only THIS key: others may still be held (two arrows = a diagonal).
    input.releaseKey(directorKeyCode(event));
  });
  // A key released while the page had no focus never sends its keyup.
  window.addEventListener("blur", () => input.releaseKey());

  // ---- hand over to VMK ---------------------------------------------------
  registerApiHandlers(classes, isGlobalScript);

  /**
   * ⚠ Sticky, and a WRAPPER rather than a replacement.
   *
   * Sticky because `prefetchCast` re-runs `registerApiHandlers` on every cast
   * attach, which used to overwrite this logger at the first of 37 casts — so
   * every `error(…)` after that point went to VMK's error manager and nowhere
   * the page could see it. A boot reporting zero `error:` lines was not a boot
   * without errors.
   *
   * A wrapper because VMK's own `Error_API.error` is the implementation; this
   * only makes it visible. (No recursion: it dispatches to the error manager
   * with `callMethod`, not by name.)
   */
  const vmkError = classes.get("Error_API")?.handlers.get("error");
  registerHostHandlers({
    /**
     * ⚠ No `me` parameter. `registerApiHandlers` injects VOID as the receiver
     * when it registers a class handler globally, so a handler registered
     * DIRECTLY here receives the Lingo arguments from index 0: VMK calls
     * `error(me, message, #handler)`, which lands as `(object, message, method)`.
     * Taking a leading `me` shifts every argument by one and logs the handler
     * symbol where the message should be.
     */
    error: (object, message, method) => {
      log(`error: ${String(message)}${method === undefined ? "" : ` (${String(method)})`}`);
      return vmkError ? vmkError(undefined, object, message, method) : 0;
    },

    /**
     * ⚠ THE MESSENGER'S DATE SCRIPT WAS JAVASCRIPT, AND ITS SOURCE IS LOST.
     *
     * `Date Functions` (cast 0b6ee192) was written in Director's JS syntax and
     * compiled to SpiderMonkey bytecode — its `.lsasm` is a bare
     * `callJavaScript`, the decompiler emitted `-- @js` and an empty body, and
     * calling it threw "Lingo handler not implemented: compareDates/2". Only the
     * signatures survive (`returnDate(a_sDate)`, `compareDates(a_rDate1,
     * a_rDate2)`), so these are reconstructed from how VMK uses them.
     *
     * WHAT IT COST: every message that arrived while the inbox already held one
     * was DROPPED. `InstantmessageReceived`/`addPrivilegedMessage` walk the inbox
     * calling `compareDates` to find the insert position; with an empty inbox
     * the loop never runs, so the first message got through and every later one
     * threw before `addAt`. Deleting the message emptied the inbox, so the NEXT
     * one got through — "the rest don't come in until I delete".
     *
     * Semantics: the new message is inserted BEFORE the first waiting message
     * it compares true against, and the view shows `inbox[1]` with NEXT moving
     * on. "Date 1 is earlier" therefore reads oldest-first; a tie is false, so
     * messages from the same minute stay in arrival order. Dates are the
     * server's `MM/DD/YYYY HH:MM` (messenger.ts `messengerDate`).
     */
    returnDate: (value) => {
      const ms = Date.parse(String(value ?? ""));
      return Number.isNaN(ms) ? 0 : ms;
    },
    compareDates: (first, second) => {
      const a = Date.parse(String(first ?? ""));
      const b = Date.parse(String(second ?? ""));
      return !Number.isNaN(a) && !Number.isNaN(b) && a < b ? 1 : 0;
    },
  });

  /**
   * A BOOT-TIME fallback only. `Special_Services_API.getUniqueID` is the real
   * one, and it takes over as soon as the first cast attach re-registers the
   * API handlers — deliberately not sticky, so VMK's own `uid:N:ms` ids win
   * once its special-services object exists.
   */
  registerHandlers({
    getUniqueID: () => `id.${Math.random().toString(36).slice(2, 8)}`,
  });

  const started = callNamed("startClient");

  return {
    registry,
    stage,
    classes,
    started,
    core: callNamed("getObjectManager") as unknown as LingoObject,
    bootThread: callNamed("getObject", symbol("core")) as unknown as LingoObject,
  };
}






