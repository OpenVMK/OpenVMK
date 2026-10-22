/**
 * Cast, member and sprite layer — the largest remaining block of Director
 * surface the transpiled framework cast reaches.
 *
 * The API here was read off the generated code, not off Director docs. Across
 * the 987 transpiled handlers the reachable surface is:
 *
 *   member  92 sites   castLib 19   sprite 27   image 43   script 7
 *   properties: _number(28) _type(6) name(13) text(14) image(37) rect(35)
 *               width(74) height(44) locH(14) locV(5) spriteNum(6) depth(5)
 *               font(5) fontSize(15) fontStyle(5) color(7) bgColor(5)
 *               paletteRef(6) char(5)
 *
 * ⚠ The emitter renames Director's `the number of member X` and `the type of
 * member X` to `._number` / `._type` to avoid colliding with JS. Everything
 * else keeps its Lingo name.
 *
 * ⚠ Lookups never throw. Transpiled code branches on
 * `member(x)._type = #empty` and `member("null")._number > 0`, so a miss has to
 * come back as a real object describing emptiness — throwing would change
 * control flow that the original relied on.
 */
import { LingoColor, LingoImage, LingoPoint, LingoRect } from "./lingo-builtins.js";
import { LingoMedia, imageFromIndices } from "./lingo-photo.js";
import { measureText, ptToPx, type MeasuredText } from "./lingo-text.js";
import {
  callMethod,
  callNamed,
  hasHandler,
  lingoTruthy,
  LINGO_ILK,
  LINGO_NATIVE,
  LingoList,
  registerBuiltins,
  setTheProperty,
  symbol,
  VOID,
  type LingoValue,
} from "./lingo-runtime.js";

export type MemberType =
  | "empty" | "bitmap" | "field" | "text" | "script" | "sound"
  | "palette" | "shape" | "digitalVideo" | "transition" | "filmLoop";

/** Two Lingo colours are the same colour when their components match. */
function sameColour(a: LingoValue, b: LingoValue): boolean {
  if (a === b) return true;
  const left = a as { red?: number; green?: number; blue?: number } | undefined;
  const right = b as { red?: number; green?: number; blue?: number } | undefined;
  if (!left || !right || typeof left !== "object" || typeof right !== "object") return false;
  return left.red === right.red && left.green === right.green && left.blue === right.blue;
}

/**
 * One character of a text member, addressable so it can be styled.
 *
 * A boxed `String`, so it still behaves as its own character everywhere a
 * string is expected — `.length`, concatenation, template literals — while
 * carrying enough identity for `the color of char n of member` to land on the
 * member. See `CastMember.char`.
 */
class TextChunkRef extends String {
  private readonly owner: CastMember;
  private readonly index: number;

  constructor(value: string, owner: CastMember, index: number) {
    super(value);
    this.owner = owner;
    this.index = index;
  }

  get color(): LingoValue {
    return this.owner.charColour(this.index);
  }

  set color(value: LingoValue) {
    this.owner.setCharColour(this.index, value);
  }
}

/**
 * Supplied by `lingo-script.ts` once the transpiled classes are defined.
 *
 * Kept as a hook rather than an import because `lingo-script.ts` already
 * imports this module; asking for the class map directly would be a cycle.
 */
let scriptClassResolver:
  | ((name: string) => { allocate(): unknown } | undefined)
  | undefined;

export function setScriptClassResolver(
  resolve: (name: string) => { allocate(): unknown } | undefined,
): void {
  scriptClassResolver = resolve;
}

/**
 * Resolves a global member number for `the castNum of sprite`. Set by
 * `registerCastBuiltins`; kept as a hook because a SpriteChannel is created
 * without a reference to the registry that owns it.
 */
let spriteMemberResolver: ((number: number) => CastMember | undefined) | undefined;

/**
 * Resolves a GLOBAL member number (or a member reference) to the member itself —
 * the same lookup `member N` performs, exposed to `CastMember.duplicate` so a
 * member can copy itself into another slot without a reference to the registry.
 */
let memberByRefResolver: ((ref: LingoValue) => CastMember | undefined) | undefined;

/**
 * Populates a cast lib when its `fileName` is assigned — the host's stand-in for
 * Director loading an external cast.
 *
 * ⚠ Necessarily synchronous, because `setImportedCast` indexes the lib on the
 * very next line. The host is expected to have fetched the cast already: VMK
 * downloads it with `preloadNetThing` first and only attaches it once the
 * download reports done, so a prefetch cache keyed by the same URL is enough.
 */
let castFileLoader: ((fileName: string, lib: CastLib) => void) | undefined;

export function setCastFileLoader(load: (fileName: string, lib: CastLib) => void): void {
  castFileLoader = load;
}

/**
 * Supplies the decoded pixels for one bitmap member, asynchronously.
 *
 * ⚠ Deliberately NOT a prefetch. The extracted casts hold 4,825 PNGs / 114 MB;
 * loading them when a cast attaches would download the lot at boot, and all 37
 * casts attach during the boot. Art is fetched only for members something
 * actually asks for.
 *
 * The size comes from the cast's `bitmaps.tsv` index instead, so the member can
 * answer `.image.width` correctly the moment it is read — which is what VMK
 * needs, because a window is laid out once and never re-measured.
 */
let bitmapLoader: ((member: CastMember, image: LingoImage) => void) | undefined;

export function setBitmapLoader(
  load: (member: CastMember, image: LingoImage) => void,
): void {
  bitmapLoader = load;
}

const HTML_ENTITIES: Record<string, string> = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (whole, body: string) => {
    if (body.startsWith("#")) {
      const code = body[1]?.toLowerCase() === "x"
        ? Number.parseInt(body.slice(2), 16)
        : Number.parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCharCode(code) : whole;
    }
    return HTML_ENTITIES[body.toLowerCase()] ?? whole;
  });
}

/**
 * Director's HTML text member, flattened to the plain text it displays plus the
 * char ranges of its links. See `CastMember.html`.
 *
 * ⚠ SOURCE LINE BREAKS ARE WHITESPACE, NOT BREAKS. `parseContent` joins its
 * fragments with a literal CR after every tag purely for readability, and marks
 * REAL breaks with `<BR>` — it even converts the help text's own CRs to `<BR>`
 * on the way in (`replaceChunks(node.text, "\r", "<BR>")`). Honouring both would
 * double-space the entire help window, so whitespace collapses the way a browser
 * collapses it and only the break tags start a line.
 *
 * Breaks are CR, which is Director's line separator and what the text renderer
 * already splits on.
 */
function flattenHtml(html: string): { text: string; links: Array<[number, number]> } {
  const links: Array<[number, number]> = [];
  let text = "";
  let linkStart: number | null = null;
  let index = 0;

  /** Collapse to one space, and never open a line with one. */
  const write = (raw: string): void => {
    const run = decodeEntities(raw).replace(/[\s ]+/g, " ");
    if (run === "") return;
    if (run === " " && (text === "" || text.endsWith("\r") || text.endsWith(" "))) return;
    text += text.endsWith("\r") ? run.replace(/^ /, "") : run;
  };
  const breakLine = (): void => {
    text = text.replace(/ $/, "") + "\r";
  };

  while (index < html.length) {
    const open = html.indexOf("<", index);
    if (open < 0) {
      write(html.slice(index));
      break;
    }
    write(html.slice(index, open));
    const close = html.indexOf(">", open);
    if (close < 0) {
      write(html.slice(open));
      break;
    }
    const tag = html.slice(open + 1, close);
    const name = (/^\/?\s*([a-z0-9]+)/i.exec(tag)?.[1] ?? "").toLowerCase();
    const closing = tag.trimStart().startsWith("/");

    if (name === "br" || name === "hr" || (closing && (name === "tr" || name === "p"))) {
      breakLine();
    } else if (name === "a") {
      // A link's range is its VISIBLE text, so it is measured as the text
      // between the tags accumulates — not from the markup offsets.
      if (closing) {
        if (linkStart !== null && text.length >= linkStart) links.push([linkStart, text.length]);
        linkStart = null;
      } else {
        linkStart = text.length + 1;
      }
    }
    index = close + 1;
  }

  return { text, links };
}

/**
 * Called when `the selection of member` is written — see `CastMember.selection`.
 *
 * Injected rather than imported so the cast layer keeps knowing nothing about
 * the stage: resolving a member to the sprite drawing it is the stage's job,
 * and `lingo-stage` already imports from here.
 */
let fieldSelectionHook: ((member: CastMember) => void) | null = null;

export function onFieldSelection(hook: (member: CastMember) => void): void {
  fieldSelectionHook = hook;
}

/** One sub-sprite of a film loop frame, as emitted by `AssetExtractor`. */
export interface FilmLoopCell {
  channel: number;
  member: string;
  posX: number;
  posY: number;
  width: number;
  height: number;
  ink: number;
  blend: number;
  flipH: number;
  flipV: number;
}

/**
 * A film loop's score — `filmloops/*.filmloop.json` out of the extractor.
 *
 * Frames are keyed by index and SPARSE: only frames that place something appear,
 * and `frameCount` is the length of the cycle rather than the number of keys.
 */
export interface FilmLoopScore {
  name: string;
  frameCount: number;
  width: number;
  height: number;
  rectLeft: number;
  rectTop: number;
  regX: number;
  regY: number;
  loops: boolean;
  frames: Record<string, FilmLoopCell[]>;
}

/**
 * Resolves a film loop's sub-sprite members by name.
 *
 * A score names its cells by member NAME, and a member has no route back to the
 * registry that holds it, so the lookup is installed by `registerCastBuiltins`
 * exactly like `spriteMemberResolver` above.
 */
let filmLoopMemberResolver: ((name: string) => CastMember | undefined) | undefined;

/** Every film loop member with a score, so the frame tick can find them. */
const activeFilmLoops = new Set<CastMember>();

/**
 * Advances every film loop by one frame and repaints those that changed.
 *
 * ⚠ Called once per STAGE UPDATE, not per sprite. A film loop's frame belongs to
 * the member, not to whichever sprites happen to show it — Director plays the
 * loop itself, and two sprites on the same loop are always on the same frame.
 */
export function advanceFilmLoops(): void {
  for (const member of activeFilmLoops) {
    const score = member.filmLoop;
    if (score === null || score.frameCount <= 0) continue;
    member.filmLoopFrame = (member.filmLoopFrame + 1) % score.frameCount;
    member.repaintFilmLoop();
  }
}

export class CastMember {
  private ownName = "";
  /** Set by `CastLib.add`, so a rename can re-index the lib that holds it. */
  private owner: { reindex(member: CastMember, from: string): void } | undefined;

  /**
   * `the name of member`.
   *
   * ⚠ An accessor, not a field, because VMK renames members after creating
   * them: `CMgrResource.createMember` mints an unnamed member and then does
   * `the name of tmember = tMemName`, and `CDownload.importFileToCast` names it
   * again once the bytes arrive. A plain field left the lib's by-name index
   * empty, so `field("external_variables.txt")` — how `CMgrVariable.dump` reads
   * every config file the client downloads — never found the member that had
   * just been filled, and the whole downloaded configuration was silently
   * discarded while the boot ran on to completion.
   */
  get name(): string {
    return this.ownName;
  }

  set name(value: string) {
    const previous = this.ownName;
    this.ownName = String(value ?? "");
    this.owner?.reindex(this, previous);
  }

  /** Called by `CastLib.add`; not part of the Lingo surface. */
  attachTo(owner: { reindex(member: CastMember, from: string): void }): void {
    this.owner = owner;
  }
  private ownText = "";

  get text(): string {
    return this.ownText;
  }

  /**
   * ⚠ ASSIGNING `the text` OF A `#text` MEMBER RE-APPLIES ITS DEFAULT FORMATTING.
   *
   * Director's rich-text members carry formatting PER CHARACTER. Setting
   * `the fontSize of member` styles the characters that are there; replacing the
   * text brings in new characters, which take the member's defaults. VMK relies
   * on this — `CScale9Grid.render` assigns size and font and only THEN the text:
   *
   *     setThePropOf(t_rWriter, "font", m_sFont)          <- ""  (already ignored)
   *     setThePropOf(t_rWriter, "fontSize", m_iFontSize)  <- 15, and DISCARDED
   *     setThePropOf(t_rWriter, "text", string(m_sTxt))   <- resets to defaults
   *
   * so the writer keeps what `CUIComponentPage.construct` gave it at creation:
   * Arial, size 12, rgb(250,250,250).
   *
   * MEASURED against a native-resolution capture of the original, ink width of
   * the five registration name rows (95, 103, 96, 96, 87 px):
   *
   *     12px  ->  96, 102, 96, 94, 86    mean error 1.33px    <- Director
   *     13px  -> 104, 110, 104, 102, 92  mean error 6.93px
   *     15px  -> 120, 126, 120, 117, 106 mean error 22.43px   <- what we drew
   *
   * ⚠ SCOPED TO `#text` MEMBERS. A `#field` member's formatting really is
   * member-level in Director and survives a text assignment, so fields must not
   * take this path.
   */
  set text(value: string) {
    this.ownText = String(value ?? "");
    this.linkRanges = [];
    // New text, new formatting — Director re-applies the member's defaults, and
    // any per-character colour belonged to the string that just went away.
    this.clearCharColours();
    // ⚠ `_type` carries the SYMBOL spelling, "#text" — comparing against "text"
    // silently never matches and the whole rule becomes a no-op.
    if (String(this._type).replace(/^#/, "") !== "text") return;
    if (this.defaultFontSize !== null) this.ownFontSize = this.defaultFontSize;
    if (this.defaultColor !== null) this.ownColor = this.defaultColor;
  }

  /**
   * `the member of <a cast member>` IS THE MEMBER ITSELF.
   *
   * Director answers `.member` on a member reference with that same member, and
   * VMK relies on it to write routines that accept a SPRITE or a MEMBER
   * interchangeably. `CMagicFactor.createUnionImageFromMemberList` is exactly
   * that shape:
   *
   *     repeat with tCheckMem in i_ar_list
   *       if voidp(tCheckMem.member) then next repeat
   *       tUnionList.append(tCheckMem)
   *     ...
   *     tMem = tImage.member
   *     tOffsetRect = tMem.rect - rect(tMem.regPoint, tMem.regPoint)
   *
   * and `CMagicFactor.DrawLoader` calls it with MEMBERS:
   *
   *     t_rMem = getMember("magic_loadingfx_0_" & t_iFrame)
   *     me.createUnionImageFromMemberList([t_rMem, a_Mem_AvatImage], point(0,0))
   *
   * ⚠ THIS IS WHY THE AVATAR'S LOADING SPINNER NEVER APPEARED — and why the
   * avatar VANISHED while loading rather than showing anything. With `.member`
   * VOID, the guard skipped every entry, the union stayed `rect(0,0,0,0)`, and
   * `image(0, 0, …)` blew up in `setAlpha`:
   *
   *     IndexSizeError: getImageData … The source width is 0
   *
   * thrown out of `DrawLoader`, so `DrawMagic`'s `if listp(t_ImgAvatar)` never
   * ran and the sprite kept an empty image. MEASURED: the members carry
   * everything the routine wants — `magic_loadingfx_0_1` is
   * `rect(0,0,45,75)`, regPoint 23,70.
   */
  get member(): CastMember {
    return this;
  }

  /** `[start, end]` char offsets of `the selection of member`. */
  private ownSelection: [number, number] | null = null;

  /**
   * `the selection of member` — the insertion point in an editable field.
   *
   * ⚠ WRITING IT IS HOW VMK RE-FOCUSES THE CHAT BAR, and that is the only
   * reason this property exists here. `CMessageBar` revokes focus outright when
   * the bar is disabled but never calls `setFocus(…, 1)` to bring it back:
   *
   *     MessageBarStates / setEditable, chat OFF -> setFocus(chat.field, 0)
   *     MessageBarStates / setEditable, chat ON  -> setEdit(elem, 1)
   *                                                 elem.pMember.selection = m_ar_lastSelection
   *
   * MEASURED across one room entry (probe on the live `CMessageBar`), as
   * `editable/keyboardFocusSprite`:
   *
   *     0/-1 -> 1/-1 -> 1/-1 -> 0/0 -> 1/0 -> 0/0 -> 1/0
   *
   * so the bar ends up ENABLED WITH NO FOCUS and typing is dead. Restoring the
   * caret is Director's way of putting focus back, and it is the one call in
   * the re-enable path that could do it — the write was landing as an inert
   * field before this.
   *
   * All four writers in the corpus are exactly this pattern
   * (`CMessageBar.setEditable`, `MessageBarStates` ×2,
   * `CAvatarBuilderPage._EventProc`), so the hook cannot reach anything else.
   */
  get selection(): LingoValue {
    const end = this.text.length;
    const [start, stop] = this.ownSelection ?? [end, end];
    return new LingoList([start, stop]);
  }

  set selection(value: LingoValue) {
    const pair = value as unknown as { count?: number; [index: number]: LingoValue };
    const start = Number(pair?.[1] ?? 0);
    const stop = Number(pair?.[2] ?? start);
    this.ownSelection = [
      Number.isFinite(start) ? start : 0,
      Number.isFinite(stop) ? stop : 0,
    ];
    fieldSelectionHook?.(this);
  }

  private ownHtml = "";
  /** `[firstChar, lastChar]` per `<A>` span, 1-based into `text` — see `html`. */
  private linkRanges: Array<[number, number]> = [];

  /**
   * `the html of member` — Director's rich-text members are AUTHORED AS HTML.
   *
   * ⚠ THE HELP WINDOW IS BUILT ENTIRELY THIS WAY. `CHelpContent.parseContent`
   * walks the help XML and emits one HTML string — `<FONT>` runs, `<BR>`s, an
   * `<HR>` rule and `<A HREF="#next">` page links — then assigns it in a single
   * `the html of pViewMem = viewHtml`. Nothing else ever sets that member's
   * text. With no `html` property the assignment landed as an inert JS field:
   * the member stayed EMPTY, and the window had nothing to draw.
   *
   * Stored raw (Director hands `the html` back) and flattened into `the text`,
   * because that is what the compositor draws and what `the rect` measures.
   */
  get html(): string {
    return this.ownHtml;
  }

  set html(value: string) {
    this.ownHtml = String(value ?? "");
    const flattened = flattenHtml(this.ownHtml);
    this.text = flattened.text;
    // AFTER `set text`, which clears the ranges — assignment order matters.
    this.linkRanges = flattened.links;
  }

  /**
   * `the hyperlinks of member` — one `[start, end]` char range per link.
   *
   * ⚠ `CHelpContent.setStyle` reads `.count` off this the moment the help text
   * is set, so an unimplemented property is not a missing feature, it is a
   * thrown "Cannot read properties of undefined" that aborts the build midway
   * and leaves the interface half-torn-down.
   */
  get hyperlinks(): LingoValue {
    return new LingoList(
      this.linkRanges.map(([start, end]) => new LingoList([start, end])),
    ) as unknown as LingoValue;
  }

  /**
   * The formatting a `#text` member was created with — captured on FIRST
   * assignment, which is the initialisation that follows `createMember`, and
   * never moved afterwards. See the note on `set text`.
   */
  private defaultFontSize: number | null = null;
  private defaultColor: LingoValue | null = null;
  /** Decoded pixels, attached by the renderer once the image is loaded. */
  private assignedImage: LingoValue = VOID;

  /**
   * Attaches a fetched film loop score and makes the member playable.
   *
   * The rect comes from the score because a film loop has no bitmap to measure:
   * `CRoomVisualDefault._Open` sets `the width/height of sprite` from the room's
   * own score, but everything that asks the MEMBER how big it is — including the
   * buffer `get image` allocates — needs an answer before any frame is drawn.
   */
  setFilmLoop(score: FilmLoopScore): void {
    this.filmLoop = score;
    this.filmLoopFrame = 0;
    if (score.width > 0 && score.height > 0) {
      this.rect = new LingoRect(0, 0, score.width, score.height);
      /**
       * ⚠ A FILM LOOP REGISTERS AT ITS CENTRE — ALWAYS, whatever its rect.
       *
       * Director defaults a film loop's registration point to the centre of its
       * bounding box, and the composed image IS that box (width×height). Both of
       * VMK's rooms confirm it against their own animation documents, whose
       * `REGPOINT` names the loop's registration in SCORE space (rect origin +
       * centre):
       *
       *     private_nautilus_octopus.ani  REGPOINT (109,181)  loop 219×363, rect (0,0)
       *         → 109,181 = centre.
       *     space_rocket.ani              REGPOINT (557,223)  loop 149×443, rect (483,3)
       *         → 557-483, 223-3 = 74,220 = centre.
       *
       * So the registration is the centre in both cases; it is the SCORE-space
       * `REGPOINT` that carries the rect origin, not the member's regPoint.
       *
       * ⚠ `score.regX`/`regY` are just `-rectLeft`/`-rectTop` (the negated rect
       * origin), NOT a registration point. An earlier version used them when the
       * rect origin was non-zero — which never fired for nautilus (rect (0,0))
       * and, the first time it did (SpaceRocket, rectLeft 483), set regPoint to
       * (-483,-3) and drew the whole rocket ~483px off the right edge of the
       * stage, invisible. Centring both fixes SpaceRocket and leaves nautilus
       * (already centred by the old fallback) unchanged. MEASURED: rocket
       * appears at room centre-right, exhaust animating, once regPoint is centre.
       */
      this.regPoint = new LingoPoint(Math.floor(score.width / 2), Math.floor(score.height / 2));
    }
    // A buffer allocated before the score arrived is the wrong size and holds
    // nothing; drop it so the next read builds one from the score.
    this.assignedImage = VOID;
    activeFilmLoops.add(this);
  }

  /**
   * Composites the current frame of this member's film loop into its buffer.
   *
   * Follows `SpriteBaker::bakeFileBackedFilmLoop`, LibreShockwave's own
   * implementation: cells are the entries whose frame index matches EXACTLY (a
   * score is not a delta stream), they paint in ascending channel order, and
   * each sits at its authored position less the sub-member's registration point
   * and the loop's own rect origin.
   */
  repaintFilmLoop(): void {
    const score = this.filmLoop;
    const buffer = this.assignedImage;
    if (score === null || !(buffer instanceof LingoImage)) return;

    /**
     * ⚠ AN EMPTY FRAME HOLDS THE LAST PICTURE — checked BEFORE the clear.
     *
     * The cannon room's `smokeloop` (vmk_cannon_room) has one blank frame at
     * every span boundary (0, 7, 14, 21 of 28), so clearing on it blinked the
     * smoke out every seventh frame — read as flicker. It is the only loop in
     * any cast with an empty frame (scanned 2026-10-20), so this changes nothing
     * else. ⚠ DELIBERATE DIVERGENCE: real Shockwave shows this smoke STATIC;
     * the user chose to keep it animating, without the blink.
     */
    const cells = score.frames[String(this.filmLoopFrame)];
    if (cells === undefined || cells.length === 0) return;

    buffer.clearToTransparent();

    for (const cell of cells) {
      const sub = filmLoopMemberResolver?.(cell.member);
      if (sub === undefined) continue;
      const art = sub.image;
      if (!(art instanceof LingoImage)) continue;
      // ⚠ The frame bitmaps belong to no window layout, so nothing prefetched
      // them; asking is what starts the fetch (see `LingoImage.needSource`).
      art.requestSource();
      if (art.width <= 0 || art.height <= 0) continue;

      const reg = sub.regPoint;
      const x = cell.posX - reg.locH - score.rectLeft;
      const y = cell.posY - reg.locV - score.rectTop;
      // Cells are sprites, so they LAYER. `copyPixels`' Copy would erase the
      // lower channel wherever this one is transparent; see `drawSpriteOver`.
      /**
       * ⚠ A CELL'S `blend` IS THE SCORE'S INVERTED BYTE, not a percent: 0 is
       * "unset" = opaque, 255 is invisible — LibreShockwave
       * `SpriteState::scoreBlendPercent`. Ignoring it pasted every smoke cell
       * solid: the cannon room's columns are authored at 127 (50%), Ned's
       * cauldron smoke at 204 (20%). (LibreShockwave's own film-loop baker
       * passes 100 here, so it has the same gap.)
       */
      const opacity = cell.blend > 0 ? Math.max(0, 255 - cell.blend) / 255 : 1;
      buffer.drawSpriteOver(art, x, y, opacity);
    }
  }

  /**
   * `the image of member`.
   *
   * For a bitmap this is whatever the renderer attached. For a text or field
   * member Director renders the text and hands back the result, and VMK reads
   * `.image.width` straight off it to size the element — so returning VOID here
   * is not "no image yet", it is a TypeError four frames deep in generated code.
   */
  get image(): LingoValue {
    if (this.assignedImage !== VOID) return this.assignedImage;

    /**
     * ⚠ THE NO-SUCH-MEMBER SENTINEL ANSWERS AN EMPTY 0x0 IMAGE, not VOID.
     *
     * `getMember` hands back `member(0)` for a name no cast defines, and Pirates
     * ends every puff animation (`puff`/`explosion`/`splash` in its variables)
     * on "empty_frame" — a member that exists in no cast, archive included. Its
     * `CPuffVisualizer.update` reads `getMember(tPuffFrame).image.width` every
     * frame, so VOID threw out of the update loop on every puff's last frames
     * and starved the subscribers behind it: the Pirates interface stopped
     * draining its click queue, single clicks piled up, and two queued clicks
     * read as a DOUBLE-click — a broadside on every navigation. An empty image
     * draws nothing, which is what the content means by "empty_frame".
     * Scoped to the sentinel: a real member with no art yet is handled below.
     */
    if (this === EMPTY_MEMBER) return new LingoImage(0, 0, 32) as unknown as LingoValue;

    /**
     * A bitmap whose art has not been fetched yet.
     *
     * Answer with a correctly-SIZED buffer immediately and let the pixels
     * arrive into it later. ⚠ The size has to be right now, not later: VMK
     * builds a window element from `tmember.image.width` once
     * (`CWindowUniqueElement.Define`) and never re-measures, so a member that
     * reports 0×0 until its PNG lands lays the window out wrong permanently.
     *
     * Cached into `assignedImage` so every read returns the SAME buffer — the
     * loader fills that instance, and a fresh one per read would be filled and
     * then thrown away.
     */
    /**
     * A film loop composites its current frame into ONE buffer that it keeps.
     *
     * Same contract as the bitmap case below — the buffer is cached in
     * `assignedImage` so every read returns the same instance, and the frame
     * tick repaints that instance in place. Handing back a fresh image per read
     * would leave whatever the stage already holds frozen on frame 0.
     */
    if (this.kind === "filmLoop" && this.filmLoop !== null) {
      const buffer = new LingoImage(
        Math.max(this.filmLoop.width, 1),
        Math.max(this.filmLoop.height, 1),
        32,
      );
      this.assignedImage = buffer as unknown as LingoValue;
      this.repaintFilmLoop();
      return this.assignedImage;
    }

    if (this.kind === "bitmap" && this.imagePath !== "") {
      const buffer = new LingoImage(
        Math.max(this.rect.width, 1),
        Math.max(this.rect.height, 1),
        32,
      );
      this.assignedImage = buffer as unknown as LingoValue;
      // ⚠ Seed Director's per-member embedded-alpha flag AT BUFFER CREATION,
      // before any `duplicate()` snapshots useAlpha. Now scoped to the avatar
      // arrow members only (set in boot-client) — a broad rule was reverted for
      // its blast radius on window/thumbnail compositing. For an opaque member
      // the flag is a no-op. See [[avatar-arrow-two-render-gaps]].
      if (this.useEmbeddedAlpha) buffer.useAlpha = 1;
      /**
       * ⚠ ARMED, NOT FETCHED. Reading a member's image is not the same as
       * wanting its pixels — see `LingoImage.needSource`. VMK walks entire
       * casts building name→image indexes it mostly never draws
       * (`AddCastContentsToImageCache`), and starting a request here meant 834
       * fetches for `gfx_avatar_bodyparts` alone, repeated per clothing cast.
       */
      buffer.needSource = () => { bitmapLoader?.(this, buffer); };
      return this.assignedImage;
    }

    if (this.kind !== "text" && this.kind !== "field") return VOID;

    /**
     * ⚠ A text member renders at its RECT, not at the size of its string.
     *
     * Director gives a text member a box and draws the text inside it, so
     * `the image of member` is that box. VMK depends on it completely: every
     * window text element sizes itself with
     *
     *   pTextMem.rect = rect(0, 0, pOwnW, pOwnH)     -- the authored 220x11
     *   pwidth        = pTextMem.image.width         -- must read back 220
     *
     * (`CWindowTextWrapper.createImgFromTxt`). Measuring the STRING instead
     * returned the width of the text that happened to be set — and for a title
     * or a caption that has not been filled in yet, that is 0, clamped to 1. So
     * every text element in every window came out ONE PIXEL WIDE while its
     * height was correct, which is why windows past the boot logo rendered as
     * slivers. The logo is a bare sprite and never went through this path,
     * which is exactly why it looked right.
     *
     * The measured size is still the fallback for a member with no rect —
     * a runtime-minted field that was never given a box.
     */
    const boxed = this.rect.width > 0 && this.rect.height > 0;
    const measured = boxed ? { width: this.rect.width, height: this.rect.height } : this.measure();
    const rendered = new LingoImage(
      Math.max(measured.width, 1),
      Math.max(measured.height, 1),
      32,
    );
    /**
     * ⚠ Marks this buffer as a TEXT RENDER even when the string is empty.
     *
     * `copyPixels` carries text from source to destination, but it cannot do
     * that unconditionally — a plain bitmap blitted over an element (window
     * chrome, a nine-slice panel) has `text === ""` and would wipe the caption
     * underneath it. It therefore needs to tell "a bitmap with no text" apart
     * from "a text member that is deliberately empty", and the string alone
     * cannot answer that.
     *
     * Without this, clearing a caption is IMPOSSIBLE: `setText(elem, "")` empties
     * the member, `render` copies the empty result into the element buffer, and
     * the copy is skipped — so the buffer keeps whatever it last displayed.
     */
    rendered.isTextRender = true;
    rendered.text = this.text;
    rendered.textFont = this.font;
    // The size text is actually drawn at — points→pixels for the code-created
    // writer, unchanged (already pixels) for layout text. Everything downstream
    // (run size, atlas lookup, advances) then works in device pixels. See
    // `pointSized`.
    rendered.textSize = this.renderFontSize;
    // ⚠ 0 stays 0 — the compositor reads that as "use the font size", which is
    // Director's own default here. See `LingoImage.textLineHeight`.
    rendered.textLineHeight = this.fixedLineSpace;
    /**
     * ⚠ `the topSpacing of member` — space ABOVE the first line, and VMK sets it
     * NEGATIVE to pull text up.
     *
     * `CWriter.Define` computes it from the font struct:
     *
     *     t_iTopSpacing = a_rMetrics.fixedLineSpace - m_rMember.fontSize
     *     m_rMember.topSpacing = t_iTopSpacing
     *
     * Ignoring it left every caption composed through a writer sitting too LOW
     * in its box. MEASURED on the chat bubble, whose text element is 14px tall
     * and whose glyphs are 8px: the ink began at row 5-6 instead of row 3, so
     * the message hugged the bottom border with an empty band above it.
     *
     * Stored on the member by the generic property bag (nothing declares it), so
     * read defensively — a member that never had one keeps the old behaviour.
     */
    const topSpacing = Number((this as unknown as Record<string, unknown>).topSpacing);
    rendered.textTopSpacing = Number.isFinite(topSpacing) ? topSpacing : 0;
    // Only an explicit 0 / false turns wrapping off — see `wordWrap`.
    rendered.textWordWrap = !(this.wordWrap === 0 || this.wordWrap === false);
    rendered.textColor = this.color;
    rendered.textAlign = this.alignment;
    /**
     * ⚠ PER-CHARACTER COLOUR BECOMES SEPARATE RUNS.
     *
     * The compositor already draws `textRuns` each with its own colour and x —
     * that is how a composed caption keeps its pieces — so a styled member only
     * has to split itself at the colour boundaries. `measure().advances` gives
     * the cumulative x after each character, which is exactly the run origin.
     *
     * This is what makes VMK's dictionary flash visible: `CComposeCannedMessage`
     * colours the characters of an unmatched word and expects the field to draw
     * that word red while the rest stays black.
     */
    // ⚠ ONE run still counts. `colourRuns()` is empty unless a character was
    // explicitly styled, so a single run means the WHOLE string was recoloured —
    // which is exactly the case when the only word typed is not in the
    // dictionary. Requiring two runs drew that word in the member's colour.
    const colourRuns = this.colourRuns();
    if (colourRuns.length > 0) {
      const advances = this.measure().advances;
      const whole = this.text;
      rendered.textRuns = colourRuns.map(([from, to, colour]) => ({
        text: whole.slice(from - 1, to),
        x: advances[from - 1] ?? 0,
        y: 0,
        width: (advances[to] ?? 0) - (advances[from - 1] ?? 0),
        height: rendered.height,
        font: this.font,
        size: this.fontSize,
        lineHeight: this.fixedLineSpace,
        topSpacing: rendered.textTopSpacing,
        wordWrap: rendered.textWordWrap,
        color: colour,
        align: this.alignment,
        antialias: rendered.textAntialias,
      }));
    }
    /**
     * ⚠ `the antiAlias of member`, and VOID MEANS OFF.
     *
     * VMK assigns this straight from an XML attribute that is often absent:
     *
     *     CUIComponent.readDefinition   t_bAntiAlias = value(param["ANTIALIAS"])
     *     CScale9Grid.render            setThePropOf(t_rWriter, "antialias", m_bAntiAlias)
     *
     * `layout.registration.xml` declares no ANTIALIAS, so the registration name
     * rows arrive with `m_bAntiAlias` VOID — MEASURED, all five — and Director
     * reads a VOID boolean property as FALSE. Those rows are therefore drawn
     * ALIASED, which is why they look crisp in the original and smooth here.
     *
     * ⚠ THIS IS NOT THE "SHARPENING PASS" THAT WAS TRIED AND REMOVED. That one
     * pushed coverage toward solid for ALL text, inventing a transform Director
     * has no equivalent of, and it visibly boldened captions. This carries a
     * property Director actually has, only where VMK actually clears it.
     */
    rendered.textAntialias = this.antialias === VOID || !this.antialias ? 0 : 1;
    return rendered as unknown as LingoValue;
  }

  /**
   * ⚠ ASSIGNING AN IMAGE TO A MEMBER STORES A COPY, as Director does.
   *
   * `the image of member = X` does not alias X — the member takes its own
   * image. Storing the reference made two names for one buffer, and VMK's own
   * button code then destroys itself:
   *
   *   CWindowImageButton.prepare   pBuffer.image = pImage        -- same object!
   *   CWindowCommonButton.render   fill(pBuffer.image, …, white) -- wipes pImage
   *                                copyPixels(pBuffer.image, pImage, …)
   *
   * The fill is meant to clear the BUFFER before drawing the button art onto
   * it. Aliased, it painted the art white and then copied white onto white.
   *
   * MEASURED on `change.hr.-1` (a 14x16 arrow): the cast member's image is the
   * real blue arrow (3,139,189 x72), while the element's was 224 white pixels —
   * and since these draw with ink 36, keying white erased them completely. That
   * is all 16 navigation arrows plus the NEXT and GET MORE NAMES buttons, which
   * appeared as bare text on the reference comparison.
   *
   * `duplicate()` carries the pixels BY REFERENCE (`copiedFrom`), so this costs
   * an object, not a raster — and the copy gains its own canvas only if someone
   * actually draws into it, which is exactly the case this fixes.
   */
  set image(value: LingoValue) {
    this.assignedImage =
      value instanceof LingoImage ? (value.duplicate() as unknown as LingoValue) : value;
    // A camera photo keeps its palette indices across the copy, or its
    // `member.media` would have nothing to send (see lingo-photo.ts).
    if (value instanceof LingoImage && value.photoIndices && this.assignedImage instanceof LingoImage) {
      this.assignedImage.photoIndices = value.photoIndices;
    }
    if (value instanceof LingoImage && this.kind === "bitmap") {
      this.assignedRegPoint = new LingoPoint(Math.trunc(value.width / 2), Math.trunc(value.height / 2));
    }
  }

  /**
   * `member.media` — a bitmap's content as one value, which is how the camera
   * sends a photo over the photo socket and how every viewer shows one
   * (`getMember("PosterStore").media = tdata.image`). Only camera photos
   * carry it here: their 8-bit sepia indices (lingo-photo.ts). Anything else
   * answers VOID rather than a value no reader could use.
   */
  get media(): LingoValue {
    const image = this.assignedImage;
    if (image instanceof LingoImage && image.photoIndices) {
      return new LingoMedia(image.width, image.height, image.photoIndices) as unknown as LingoValue;
    }
    return VOID;
  }

  set media(value: LingoValue) {
    if (value instanceof LingoMedia) {
      this.assignedImage = imageFromIndices(value.width, value.height, value.indices) as unknown as LingoValue;
    }
  }

  /**
   * `member.palette` — accepted and kept, never applied. The photo viewers set
   * their own sepia palette after `media`, and all four are the same ramp that
   * `imageFromIndices` already painted with.
   */
  palette: LingoValue = VOID;

  /**
   * Director's `duplicate(member, destMember)` — copy this member's CONTENT into
   * another member. The furniture loader re-homes each downloaded item member
   * into a fresh same-named member in the main bin so the room and thumbnail
   * renderers can still find it by name after the source cast is dropped:
   *
   *     unregisterMember(m.name)
   *     tNew = createMember(m.name, m.type)   -- a member NUMBER
   *     duplicate(m, tNew)                    -- THIS, then RemoveCastLib(m's cast)
   *
   * The destination was already minted with the SAME `kind` (createMember is
   * passed `the type of` the source), so only content copies. The pixels go by
   * value — the source cast is `RemoveCastLib`'d immediately after — but a bitmap
   * whose PNG has not been fetched yet is carried by `imagePath` (still a live
   * URL) and re-fetched lazily, exactly as the source member would have.
   *
   * ⚠ WITHOUT THIS the furni thumbnail chain died silently: `_CastLoadCallback`
   * threw "method not found: duplicate on CastMember", so the castload task's
   * callback never ran, the item type stayed #loading, its #done download was
   * never harvested, and the inventory Furnishings grid span forever.
   */
  duplicate(dest?: LingoValue): CastMember {
    const target =
      dest instanceof CastMember ? dest : memberByRefResolver?.(dest as LingoValue);
    if (!target || target === this) return this;

    target.imagePath = this.imagePath;
    target.soundPath = this.soundPath;
    target.filmLoopPath = this.filmLoopPath;
    target.useEmbeddedAlpha = this.useEmbeddedAlpha;
    target.sourceRect = this.sourceRect;
    target.rotated = this.rotated;
    target.duration = this.duration;
    target.loop = this.loop;
    target.filmLoop = this.filmLoop;
    target.filmLoopFrame = this.filmLoopFrame;
    target.assignedRect = new LingoRect(
      this.assignedRect.left,
      this.assignedRect.top,
      this.assignedRect.right,
      this.assignedRect.bottom,
    );
    target.assignedRegPoint = this.assignedRegPoint
      ? new LingoPoint(this.assignedRegPoint.locH, this.assignedRegPoint.locV)
      : undefined;
    // Written straight to the backing field, not through `set text`, which would
    // reset a text member's formatting to defaults; a bitmap's text is "" anyway.
    target.ownText = this.ownText;
    // Pixels by value — the source cast is about to be removed. A member still
    // awaiting its PNG has VOID here and rebuilds from `imagePath` on first read.
    const art = this.assignedImage;
    target.assignedImage =
      art instanceof LingoImage ? (art.duplicate() as unknown as LingoValue) : art;
    return target;
  }

  /** Director style symbols arrive as `#bold` or a comma list; normalise both. */
  private styleNames(): string[] {
    const raw = this.fontStyle;
    const parts =
      raw && typeof raw === "object" && typeof (raw as { toArray?: unknown }).toArray === "function"
        ? (raw as { toArray: () => unknown[] }).toArray()
        : String(raw ?? "").split(",");
    return parts.map((p) => String(p).replace(/^#/, "").trim().toLowerCase()).filter(Boolean);
  }

  /**
   * ⚠ POINT-SIZED TEXT — the CUIComponentPage writer only.
   *
   * VMK's font sizes are PIXELS everywhere the window layout sets them, but the
   * one text member VMK mints in code — `CUIComponentPage`'s scratch writer
   * (`createMember("UIComponenPageWriter…", #text)`, `fontSize = 12`) — carries a
   * POINT size, which Director renders at 96 DPI = 12pt→16px. That is why the shop
   * / register / quest LISTS came out 3/4 size while every window caption (sized
   * in px) was already correct. MEASURED: the catalog's `cat.item.info` (layout
   * `fontSize 16`) renders at 16px in the original, while the list writer's
   * `fontSize 12` also renders at 16px. Scoped by the writer's own name so
   * nothing sized in pixels is touched. See [[font-size-points-vs-pixels]].
   */
  get pointSized(): boolean {
    // ⚠ CONFIRMED CASE ONLY. The `CUIComponentPage` writer (shop / register /
    // quest / messenger lists) is the one text member VMK mints in code whose
    // fontSize is POINTS (12pt→16px), verified against the original shop. Adding
    // `HELPITEM.node` (CHelpMenu topics) here was TRIED and made the help topics
    // too big — that path is NOT the same as the shop's and must be measured on
    // its own before being scoped. Layout/button text is pixel-sized and untouched.
    // See [[font-size-points-vs-pixels]].
    return /UIComponenPageWriter/i.test(this.name ?? "");
  }

  /** The size text is actually rasterised at: points→pixels for the writer, else the raw px. */
  get renderFontSize(): number {
    return this.pointSized ? ptToPx(this.fontSize) : this.fontSize;
  }

  measure(): MeasuredText {
    return measureText({
      text: this.text,
      font: this.font,
      fontSize: this.renderFontSize,
      fontStyle: this.styleNames(),
      wrapWidth: this.wordWrap ? this.rect.width : 0,
      fixedLineSpace: this.fixedLineSpace,
    });
  }

  /**
   * `charPosToLoc(member, n)` — where character `n` STARTS, not where it ends.
   *
   * ⚠ OFF BY ONE CHARACTER, and it made every captioned button too wide.
   * `advances[k]` is the cumulative width AFTER k characters, so returning
   * `advances[position]` answers the END of character `position`. Director
   * answers its START, i.e. `advances[position - 1]`.
   *
   * VMK's own arithmetic is the proof. `CWindowCommonButton.createButtonImg`
   * sizes every caption with
   *
   *     tTextWidth = tTextMem.charPosToLoc(tTextMem.char.count).locH + tFontDesc[#fontSize]
   *
   * — it adds ONE FONT SIZE to the answer. That is only coherent if the answer
   * is the last glyph's start and the addition covers that glyph's own width.
   * Reading it as the end made `tTextWidth` a whole glyph too large, and since
   * `tTextMem.rect` is then set to that width while the member itself stays
   * LEFT aligned (VMK never assigns `tTextMem.alignment`), the glyphs sat at
   * the left of an over-wide image. The `#center` branch then centres that
   * image, so the visible text drifted left with the surplus pooling on the
   * right — the MOD badge and the DANCE/WAVE buttons, against an original where
   * the badge hugs its text.
   *
   * MEASURED on "MOD" at 15px: we answered 37 (the full string), making
   * `tTextWidth` 52 against a button that should be ~40.
   *
   * The other call site agrees rather than conflicting — `CComposeCannedMessage`
   * asks `charPosToLoc(the selStart + 1)` for the caret sitting BEFORE character
   * `selStart + 1`, which is that character's start. Under the old reading that
   * was also one character too far right.
   */
  charPosToLoc(position: LingoValue): LingoPoint {
    const measured = this.measure();
    const start = (Number(position) || 0) - 1;
    const index = Math.max(0, Math.min(start, measured.advances.length - 1));
    return new LingoPoint(Math.round(measured.advances[index] ?? 0), measured.lineHeight);
  }

  /**
   * `pointToWord` — which WORD of this member sits under a point, or -1.
   *
   * ⚠ THIS IS THE CHAT BOX'S SPELL/FILTER CHECK, and without it typing threw.
   * `CComposeCannedMessage.CheckWord` locates the word under the caret by
   * round-tripping through the layout:
   *
   *     tWordLoc   = tMem.charPosToLoc(the selStart + 1)
   *     tWordIndex = tSprite.pointToWord(tWordLoc + tOffset)
   *     if tWordIndex <> -1 then tWord = tMem.word[tWordIndex]
   *
   * The guard only rejects -1, so anything else is indexed straight into the
   * member. With no implementation the call answered VOID, `tMem.word[VOID]`
   * came back undefined, and `removeLastSeparator` died on `iWord.length` —
   * surfacing as "input: keyUp failed — Cannot read properties of undefined".
   *
   * Words are 1-based and counted the way Lingo's `word` chunk counts them, so
   * the index this returns can be fed straight back to `member.word[n]`.
   */
  pointToWord(location: LingoValue): number {
    const text = this.text;
    if (text.trim() === "") return -1;
    const charPos = this.locToCharPos(location);
    if (charPos < 0) return -1;
    // Count whitespace-delimited words up to the character the point lands on.
    let word = 0;
    let inWord = false;
    for (let i = 0; i < text.length; i++) {
      const isSpace = /\s/.test(text[i]);
      if (!isSpace && !inWord) {
        inWord = true;
        word += 1;
      } else if (isSpace) {
        inWord = false;
      }
      if (i >= charPos && inWord) return word;
    }
    // Past the end of the text: the last word, which is where a caret at the
    // end of the line sits.
    return word > 0 ? word : -1;
  }

  /** `locToCharPos` — the inverse, used by field members for hit-testing. */
  locToCharPos(location: LingoValue): number {
    const measured = this.measure();
    const x = Number((location as unknown as { locH?: number })?.locH ?? location) || 0;
    for (let i = 0; i < measured.advances.length; i++) {
      if ((measured.advances[i] ?? 0) >= x) return i;
    }
    return measured.advances.length;
  }

  /**
   * `the wordWrap of member`. Director's default for a text member is TRUE.
   *
   * ⚠ It was 0 and NOTHING READ IT, so every caption wrapped at spaces whatever
   * the layout said. `CWindowTextWrapper.createImgFromTxt` copies the element's
   * `#wordWrap` onto the member, and a `#wordWrap: 0` box is one line that
   * Director CLIPS at its edge. MEASURED on the Castle Fireworks scoreboard,
   * `fw.rankstatus.N` (`#width: 94, #height: 13, #wordWrap: 0`): "2.
   * CaptainCutlass296" broke after "2.", the name fell onto a second line
   * outside the 13px box, and the row read "2." with no name. Short names
   * ("1. Kevin") fit one line and looked fine.
   *
   * The default is 1 so code-built captions keep wrapping; an element with no
   * `#wordWrap` hands the member VOID, which also wraps (see `textWordWrap`
   * in `image`).
   */
  wordWrap: LingoValue = 1;
  fixedLineSpace = 0;
  alignment = "left";
  antialias = 1;
  antiAliasThreshold = 12;
  /** Extract-relative path to this member's PNG, for bitmap members. */
  imagePath = "";
  /**
   * Whether this bitmap member was imported with an embedded alpha channel —
   * Director's per-member `use_alpha` flag (DirPlayer `Bitmap.use_alpha`, read
   * from the cast's ALFA info). It decides whether `copyPixels` treats the
   * source's transparent pixels as a mask to SKIP (blend) or stamps them
   * opaque; a 32-bit source with `use_alpha` blends, one without stamps.
   *
   * ⚠ NOT in the extracted `bitmaps.tsv` (width/height only), so the boot
   * loader sets it by NAME: on when the member is a bitmap and NOT a body part
   * (the avatar figure composites its parts opaquely and takes its silhouette
   * from `setAlpha`, so those must stay `use_alpha` = 0 — see boot-client's
   * `isBodyPartMember`). For an OPAQUE member the flag is a no-op (there are no
   * transparent pixels to treat differently), so the name gate is equivalent to
   * gating on real transparency without needing to decode the PNG first — which
   * matters because `duplicate()` SNAPSHOTS `useAlpha`, so it has to be right on
   * the member's own buffer before `CAvatarRenderer.Define` duplicates it.
   */
  useEmbeddedAlpha = false;
  /**
   * Path to this member's audio, for sound members. Same lifecycle as
   * `imagePath`: cast-relative out of the manifest, rewritten to a URL when the
   * cast is attached.
   */
  soundPath = "";
  /**
   * Path to this member's film loop score, for `filmLoop` members. Same
   * lifecycle as `imagePath`.
   */
  filmLoopPath = "";
  /**
   * The parsed film loop score, once fetched — see `FilmLoopScore`.
   *
   * ⚠ A film loop is a SCORE, not a picture: it names other members and the
   * frame each appears on. `noblink_loop` (the nautilus squid) sequences
   * `octopus_noblink0000`..`0005` over 42 frames. The frame bitmaps are ordinary
   * members of the same cast; this is only the ordering.
   */
  filmLoop: FilmLoopScore | null = null;
  /** Which frame of `filmLoop` is showing. Advanced by `advanceFilmLoops`. */
  filmLoopFrame = 0;
  /**
   * `the duration of member` — for a sound, length in MILLISECONDS, which is
   * the unit VMK does arithmetic in (`TimeLeft` counts it down 10 per
   * `delay(10)`). See `durationOf` in lingo-sound.
   *
   * ⚠ Read BEFORE the sound can possibly have been decoded.
   * `CSoundChannelObject.PlaySound` does `m_iDuration = t_rSndMem.duration`
   * (times `loopCount`) and hands it straight to `TimeLeft`, which is how the
   * channel decides when the clip is over. 0 is the honest answer until the
   * audio's metadata loads, and `setSoundDuration` fills it in from the decoded
   * media.
   */
  duration = 0;
  /** `the loop of member` — PlaySound branches on this to queue an endless loop. */
  loop = 0;
  /**
   * When the art lives in a texture atlas, the frame's rectangle within it.
   * `rotated` means the frame was packed turned 90° clockwise and has to be
   * un-rotated when drawn — ignoring it silently renders sideways art.
   */
  sourceRect: { x: number; y: number; w: number; h: number } | null = null;
  rotated = false;
  /**
   * Per-ink drawables, built on demand. Director applies ink at draw time, but
   * the result only depends on (member, ink), so it is cached rather than
   * recomputed every frame.
   */
  readonly inkVariants = new Map<number, unknown>();
  /** `LingoImage.revision` each cached variant was built from — see `drawableFor`. */
  readonly inkVariantRevision = new Map<number, number>();
  /**
   * The image OBJECT each cached variant was built from.
   *
   * ⚠ REVISION ALONE CANNOT DECIDE STALENESS. It counts writes WITHIN one
   * `LingoImage`, so it is only comparable against the same object — and
   * `feedImage` REPLACES a member's image wholesale. A fresh image whose
   * counter happens to match the old one then looks up-to-date, and the sprite
   * keeps drawing the previous buffer forever.
   *
   * MEASURED on the registration hair row: `change.hr.-1` served a 224x36
   * FULLY TRANSPARENT variant while its member image was the real 14x16 arrow,
   * revision 4 on both sides — so the left arrow was simply absent while every
   * count and visibility flag said it drew. Its neighbours were fine, which is
   * what makes this shape of bug so easy to miss.
   */
  readonly inkVariantSource = new Map<number, unknown>();
  /**
   * `the regPoint of member` — where `the loc of sprite` pins the art.
   *
   * ⚠ Director registers an IMPORTED bitmap at its CENTRE, and VMK relies on
   * it: `showLogo` places the boot logo with
   * `point(stage.width/2, stage.height/2 - …)` and expects that point to be the
   * middle of the logo. Defaulting everything to (0,0) drew it half its width
   * right and half its height low.
   *
   * Runtime-allocated buffers are the other case — a window element's member
   * has no file behind it and is positioned by its top-left, which VMK also
   * states explicitly (`pBuffer.regPoint = point(0, 0)` in `ResizeBy`). The
   * discriminator is therefore "did this come from a file", not the member type.
   *
   * ⚠ The centre is only a FALLBACK. `manifest.tsv` now carries the authored
   * `reg_x`/`reg_y` for every member (see `parseCastManifest`), and the authored
   * value is frequently not the centre — `field.hlp.selected` is (0,0). This
   * branch is reached only for a member whose manifest predates those columns.
   */
  private assignedRegPoint: LingoPoint | undefined;

  get regPoint(): LingoPoint {
    if (this.assignedRegPoint) return this.assignedRegPoint;
    if (this.kind === "bitmap" && this.imagePath !== "") {
      return new LingoPoint(Math.floor(this.rect.width / 2), Math.floor(this.rect.height / 2));
    }
    return new LingoPoint(0, 0);
  }

  set regPoint(value: LingoPoint) {
    this.assignedRegPoint = new LingoPoint(
      Number((value as { locH?: unknown })?.locH ?? 0),
      Number((value as { locV?: unknown })?.locV ?? 0),
    );
  }

  /** The box as ASSIGNED. `rect` grows this vertically for text — see below. */
  private assignedRect = new LingoRect(0, 0, 0, 0);
  /** Cache for the grown height, keyed on everything that changes the layout. */
  private grownKey = "";
  private grownHeight = 0;

  /**
   * `the rect of member`.
   *
   * ⚠ A TEXT MEMBER GROWS VERTICALLY TO FIT ITS CONTENT. Assigning the rect
   * sets the box WIDTH and the top-left; Director then lays the text out inside
   * that width and reports back a rect as tall as the result. VMK reads exactly
   * that to size a scrolling region — `CWindowTextWrapper.createImgFromTxt`:
   *
   *     pTextMem.rect = rect(0, 0, pOwnW, pOwnH)   -- the element's visible box
   *     …
   *     if pScrolls.count > 0 then
   *       tHeight = pTextMem.rect.height           -- must be the CONTENT height
   *     else
   *       tHeight = pOwnH
   *     pImage = image(pOwnW, tHeight, …)
   *
   * Returning the assigned height made the two equal, so the registration
   * EULA's 9,424 characters were laid out into the 265px visible box and the
   * rest was simply not there. `CWindowScrollbar` then computed
   * `pClientSourceRect` 335x265 against a 266px view, concluded there was
   * nothing to scroll (`pMaxOffset = -1`), and every click on the bar was a
   * correct no-op. The scrollbar was never the broken part.
   *
   * ⚠ ONLY GROWS, NEVER SHRINKS, and only for text. A caption whose content
   * fits keeps the box it was given, so every element sized from
   * `pTextMem.image.width` — which is most of the UI — is untouched. The
   * measurement is cached because `image`, `measure` and `wrapWidth` all read
   * this and it would otherwise re-layout the text on every access.
   */
  get rect(): LingoRect {
    const box = this.assignedRect;
    /**
     * ⚠ A BITMAP MEMBER'S RECT IS ITS IMAGE'S BOUNDS.
     *
     * Director derives `the rect of member` for a bitmap from the artwork; only
     * an explicit assignment overrides it. Ours returned the unset
     * `rect(0,0,0,0)` for any member whose image was built at RUNTIME rather
     * than loaded with an authored rect — every composed avatar canvas, for one.
     *
     * ⚠ THIS IS WHY THE LOADING AVATAR'S HEAD FLOATED OFF THE SPINNER AND WHY
     * THE ANIMATION JITTERED. `CMagicFactor.createUnionImageFromMemberList`
     * sizes the composite from each contributor:
     *
     *     tOffsetRect = tMem.rect - rect(tMem.regPoint, tMem.regPoint)
     *     tUnion = tUnion.union(tOffsetRect)
     *
     * MEASURED per frame, the avatar's canvas contributed NO EXTENT:
     *
     *     magic_loadingfx_0_1  rect(0,0,45,75)  reg(23,70)   off rect(-23,-70,22,5)
     *     971 Canvas           rect(0,0,0,0)    reg(40,144)  off rect(-40,-144,-40,-144)
     *
     * so the union was driven by the fx alone — its origin pinned to the
     * avatar's regPoint as a bare point, and its SIZE changing with every fx
     * frame (62x149, 62x145, 62x148 …), which is exactly the jitter. The head
     * was then placed against a union it had not been measured into.
     */
    /**
     * ⚠ READ `assignedImage`, NEVER THE `image` GETTER — that recurses.
     *
     * `get image()` sizes the placeholder buffer for a not-yet-fetched bitmap
     * from `this.rect`, so reaching for `this.image` here is a cycle:
     * rect -> image -> rect. I shipped exactly that and it blew the stack with
     * "RangeError: Maximum call stack size exceeded", leaving the room BLANK —
     * the room built (context present, 74 sprites) but nothing could draw.
     *
     * Only an image that already EXISTS can answer for the member's bounds. A
     * member still waiting on its PNG keeps its assigned rect, which is also
     * what `get image()` needs in order to size that buffer.
     */
    if (
      this.kind !== "text" && this.kind !== "field" &&
      box.right - box.left <= 0 && box.bottom - box.top <= 0
    ) {
      const art = this.assignedImage;
      if (art instanceof LingoImage && art.width > 0 && art.height > 0) {
        return new LingoRect(0, 0, art.width, art.height);
      }
    }
    if (this.kind !== "text" && this.kind !== "field") return box;
    const width = box.right - box.left;
    if (width <= 0 || this.text === "") return box;

    const key = `${width} ${this.text} ${this.font} ${this.fontSize} ${this.fixedLineSpace} ${this.wordWrap} ${this.styleNames().join(",")}`;
    if (key !== this.grownKey) {
      this.grownKey = key;
      this.grownHeight = measureText({
        text: this.text,
        font: this.font,
        fontSize: this.fontSize,
        fontStyle: this.styleNames(),
        wrapWidth: this.wordWrap ? width : 0,
        fixedLineSpace: this.fixedLineSpace,
      }).height;
    }
    const height = box.bottom - box.top;
    if (this.grownHeight <= height) return box;
    return new LingoRect(box.left, box.top, box.right, box.top + this.grownHeight);
  }

  set rect(value: LingoRect) {
    if (!value) return;
    this.assignedRect = new LingoRect(
      Number(value.left) || 0,
      Number(value.top) || 0,
      Number(value.right) || 0,
      Number(value.bottom) || 0,
    );
  }

  /**
   * `the width of member` / `the height of member`.
   *
   * ⚠ Director gives every member these, and VMK sizes window elements from
   * them: `CWindowElementWrapper.Define` does
   *
   *   pwidth  = pBuffer.width
   *   pheight = pBuffer.height
   *
   * where `pBuffer` is the member holding the element's pixels. Without them a
   * grouped element — every window frame and field background in the game — came
   * out 0x0 while its BUFFER was correct, so the element drew nothing and the
   * first resize computed from zero and destroyed the buffer too: a 250x132
   * nine-slice frame became 1x38 the moment its window was merged and recentred.
   *
   * The assigned image is the truth when there is one (a runtime buffer is
   * allocated at a size before it has any rect); otherwise the member's rect,
   * which is what a text member carries.
   */
  /**
   * `the font of member`.
   *
   * ⚠ AN EMPTY NAME DOES NOT CLEAR IT. Assigning "" leaves the member on the
   * face it already has, because that is the only reading under which VMK's own
   * setup makes sense:
   *
   *   CUIComponentPage.construct  configures its shared text member with
   *                               font "Arial", size 12, colour 250,250,250
   *   CScale9Grid.render          then does `t_rWriter.font = m_sFont` for each
   *                               layout it draws through that member
   *
   * A component whose XML omits FONT has `m_sFont == ""`, so a literal
   * assignment wipes the "Arial" the page deliberately set and every later row
   * renders in whatever the host falls back to. MEASURED on the registration
   * name list: writer font "" (was "Arial"), which made `substituteFont`
   * answer "sans-serif" — wider than the authored face, so names that fit
   * their 85px row in Director wrapped and vanished out of a 12px box.
   *
   * Size and colour are NOT guarded the same way: 0 and black are meaningful
   * values, whereas a nameless font is not a font.
   */
  private ownFont = "";

  get font(): string {
    return this.ownFont;
  }

  set font(value: string) {
    const name = String(value ?? "");
    if (name === "") return;
    this.ownFont = name;
  }

  private ownFontSize = 12;

  get fontSize(): number {
    return this.ownFontSize;
  }

  set fontSize(value: number) {
    const size = Number(value);
    if (!Number.isFinite(size) || size <= 0) return;
    // The first assignment is the member's creation-time default — see `set text`.
    if (this.defaultFontSize === null || (this.ownText === "" && String(this.name ?? "").startsWith("writer_"))) {
      this.defaultFontSize = size;
    }
    this.ownFontSize = size;
  }

  fontStyle: LingoValue = VOID;

  private ownColor: LingoValue = VOID;

  get color(): LingoValue {
    return this.ownColor;
  }

  set color(value: LingoValue) {
    /**
     * ⚠ THE SETUP COLOUR IS THE DEFAULT UNTIL TEXT LANDS — not just the FIRST one.
     *
     * `set text` re-applies `defaultColor` (Director restyles new characters to
     * the member's formatting). A writer is built BEFORE any text as
     * `CMgrWriter.create` -> `setFont(pPlainStruct)` (colour BLACK) -> then
     * `Define(metrics)` (the intended colour). Locking `defaultColor` on the
     * FIRST set pinned it to the plain BLACK, so `Define`'s colour only reached
     * `ownColor` and `CWriter.render`'s `.text` reverted it — every avatar
     * NAME TAG rendered its name in black (rgb 250,250,250 was requested).
     *
     * While the member still has NO text it is being set up, so the latest
     * member-level colour is the default. Once text is assigned the member is
     * styled and later colour sets are per-use overrides — the original
     * "keep construct's colour" behaviour (see `set text`) is preserved because
     * by then `ownText` is non-empty.
     */
    if (value !== VOID && (this.defaultColor === null || this.ownText === "")) {
      this.defaultColor = value;
    }
    this.ownColor = value;
    /**
     * Colouring the WHOLE member drops any per-character styling — Director
     * restyles every character, and VMK relies on it to end the red flash:
     * `CComposeCannedMessage.updateContent` does `tTextField.color = m_colorInput`
     * and then clears `m_ar_cWords`.
     */
    this.clearCharColours();
  }
  bgColor: LingoValue = VOID;
  depth = 8;
  paletteRef: LingoValue = VOID;

  constructor(
    readonly _number: number,
    /** Public because `new(script "X")` has to branch on it from outside. */
    readonly kind: MemberType,
    readonly castLibNumber = 1,
  ) {}

  /** Director's `the type of member` — a symbol, `#empty` when unresolved. */
  get _type(): string {
    return symbol(this.kind);
  }

  /**
   * `the castLibNum of member` — which cast the member belongs to.
   *
   * ⚠ Director spells it `castLibNum`; the field here is `castLibNumber`, so the
   * Lingo name read as VOID and coerced to 0. `CMgrThread.initThread` uses it to
   * find the cast a freshly loaded `thread.index` came from, and answered
   * "Cast doesn't exist: 0" for every cast the client loads.
   */
  get castLibNum(): number {
    return this.castLibNumber;
  }

  /**
   * `the number of member` — the GLOBAL member number.
   *
   * ⚠ SAME OMISSION AS `castLibNum` ABOVE, and it silently broke room audio.
   * Director spells it `number`; the field here is `_number`, so the Lingo name
   * read as VOID for EVERY member, static or attached.
   *
   * `CMgrResource.registerMember` is where that lands:
   *
   *     on registerMember me, tMemName, tMemberNum
   *       if voidp(tMemberNum) then tMemberNum = member(tMemName).number
   *       if tMemberNum < 1 then return 0      -- silent refusal
   *       pAllMemNumList[tMemName] = tMemberNum
   *
   * so the ONE-ARGUMENT form could never register anything. The 5170 entries in
   * `pAllMemNumList` all arrived through the two-argument form from a boot path;
   * anything relying on the one-argument form — every dynamically attached room
   * SOUND cast — was left out. `getmemnum` then answers 0 and
   * `CSoundTracker.parseTrackerData` reads `member(0).text`, i.e. "", so the
   * tracker parses no cues and no `<END TIME>`. MEASURED in Esplanade: 1 cue and
   * `m_mpEndTime` VOID against a document defining cues at 0.1 and 16.0 with
   * `END TIME="90.0"`, and `getmemnum("tracker.xml")` = 0 while the member
   * itself held 2363 characters.
   *
   * Numbering matches the rest of the file (`numberBase`, and the `globalId` the
   * registry assigns): cast lib 1 keeps the bare id, every other lib is
   * `castLibNumber * 100000 + id`.
   */
  /**
   * `the number of member` — ALREADY GLOBAL, so do not offset it again.
   *
   * ⚠ `_number` IS the global number. Both routes that mint a member store it
   * that way: `parseCastManifest` builds
   * `globalId = libNumber * 100000 + id` before calling the constructor, and
   * `CastLib.createMember` uses the same convention (see `numberBase`, which
   * SUBTRACTS this base to recover the in-cast index).
   *
   * This getter used to re-apply `castLibNumber * 100000`, which double-offset
   * every member outside lib 1 and broke the round-trip that Lingo leans on —
   * `member(the number of member X)` no longer found X:
   *
   *     _number            12400045   <- what `find` indexes by
   *     number             24800045   <- 124*100000 + 12400045
   *     member(12400045)   "Sound.xml"
   *     member(number)     MISS
   *
   * It exists at all because a member with no `number` reports `undefined`, and
   * `CMgrResource.registerMember` requires `member(name).number >= 1` before it
   * will put the name in `pAllMemNumList` — with no getter, `getmemnum` answered
   * 0 for members that were plainly there. Returning `_number` satisfies that
   * without inventing an offset.
   */
  get number(): number {
    return this._number;
  }

  /**
   * Whether this is the miss sentinel. Not `_number <= 0`: runtime-minted text
   * members carry negative ids so they cannot collide with real cast ids, and
   * an id test would quietly drop every text sprite from the stage.
   */
  get isEmpty(): boolean {
    return this.kind === "empty";
  }

  /**
   * `rawNew(script "CObject")` — allocate an instance of a script member's
   * class WITHOUT running `construct`.
   *
   * This is how VMK builds every object. `CMgrObject.create` calls `rawNew`,
   * chains the results through `#ancestor`, and only then calls `construct` on
   * the ones that declare it — so allocation and initialisation must stay
   * separable. A `new`-style helper that constructs eagerly would run
   * `construct` before the ancestor chain exists, and each class's `construct`
   * would see a half-built object.
   */
  rawNew(): LingoValue {
    const cls = scriptClassResolver?.(this.name);
    if (!cls) {
      throw new Error(`rawNew: no transpiled class for script member "${this.name}"`);
    }
    return cls.allocate() as LingoValue;
  }

  /**
   * `new(script "CMgrObject")` — allocate AND construct, the one-shot form.
   * `Object_API.CreateObjectManager` bootstraps the whole framework with it.
   */
  new(...args: LingoValue[]): LingoValue {
    const instance = this.rawNew();
    /**
     * ⚠ Director's `new(script X)` runs the class's `on new` handler — NOT
     * `construct`. VMK names its initialiser `construct` and calls it itself,
     * after chaining: `CMgrThread.buildThreadObj` does
     * `new(script …)` → `handler(obj, #construct)` → link `#ancestor` →
     * `construct(obj)`, and `Object_API.CreateObjectManager` likewise does
     * `new(script …)` then `construct(…)` on the next line.
     *
     * Constructing here ran every class's initialiser before its ancestors were
     * attached and then let VMK run it a second time — the same failure `rawNew`
     * exists to avoid, reintroduced one level up.
     */
    /**
     * ⚠ The arguments go THROUGH to `on new`. `xml.tokenizer`'s takes the string
     * to split, its delimiters and whether to keep them, and switches on
     * `the paramCount` to default the ones it was not given — so dropping them
     * both loses the input and picks the wrong defaults.
     */
    if (typeof (instance as Record<string, unknown>)?.new === "function") {
      callMethod("new", instance, ...args);
    }
    return instance;
  }

  /**
   * `the width of member` / `the height of member`.
   *
   * ⚠ A runtime BUFFER member has an image but no rect. `CWindow.buildVisual`
   * mints an empty member, assigns `image(w, h, depth)` to it, and VMK then
   * sizes the element from the MEMBER:
   *
   *   pwidth  = pBuffer.width      (`CWindowElementWrapper.Define`)
   *
   * Reading only the rect answered 0 for every such buffer, so every grouped
   * element — the nine-slice frame and three-slice field behind every window —
   * was 0x0 while its buffer was correct. Nothing drew, and the first resize
   * computed from zero and destroyed the buffer as well: a 250x132 frame became
   * 1x38 the moment its window was merged and recentred.
   *
   * The assigned image wins when there is one; the rect is what a text member
   * carries and remains the fallback.
   */
  get width(): number {
    const image = this.assignedImage as { width?: unknown } | undefined;
    if (image && typeof image.width === "number") return image.width;
    return this.rect.width;
  }

  /**
   * ⚠ A TEXT MEMBER'S HEIGHT IS ITS TEXT, NOT ITS BOX.
   *
   * Director auto-sizes a text member vertically, so `the height of member` is
   * the height of the rendered lines — the rect is only the box the text is laid
   * out in. `CWriter.render` leans on exactly that to crop a caption down to
   * size:
   *
   *     m_rMember.rect = m_rDefRect                        -- a big working box
   *     t_iWidth = m_rMember.charPosToLoc(t_iTotal).locH
   *     m_rMember.rect = rect(0, 0, t_iWidth, m_rMember.height)
   *
   * MEASURED on the chat bubble, whose writer's `m_rDefRect` is 0,0,480,480:
   * returning the BOX height made every rendered caption 480px tall, so
   * `CRoomChatOutputMgr._RenderChat` built its composite as
   * `image(nameW + msgW, 480)`, copied the name and the message in at y=0, and
   * fed that into a 14px-high element — the name and message landed at the top
   * of a 480px image and the bubble showed them misplaced.
   *
   *     name "CleverStar896:"   113 x 480
   *     message "hello"          43 x 480
   *
   * A bitmap member still answers with its image, and a text member with an
   * explicitly assigned image keeps that too.
   */
  get height(): number {
    const image = this.assignedImage as { height?: unknown } | undefined;
    if (image && typeof image.height === "number") return image.height;
    if (this.kind === "text" || this.kind === "field") {
      const textHeight = Math.round(this.measure().height);
      // Never taller than the box it is laid out in, and never zero.
      return Math.max(1, Math.min(textHeight, this.rect.height || textHeight));
    }
    return this.rect.height;
  }

  /** `the char of member` — used for text measurement in the framework cast. */
  /**
   * ⚠ `member.char[n]` IS AN ADDRESSABLE REFERENCE, not just the character.
   *
   * A chunk of a Director text member can be STYLED — that is how VMK flashes a
   * chat word red when the dictionary does not know it:
   *
   *     CComposeCannedMessage.update
   *       repeat with ch = 1 to w.word.length
   *         if not w.valid then tTextField.char[c].color = m_colorNonMatch
   *         c = c + 1
   *
   * A plain string has nowhere to put that, so the assignment used to throw
   * ("Cannot create property 'color' on string 'h'") every frame while flashing.
   * Each character comes back as a boxed String carrying the member and the
   * 1-based index, so it still reads, concatenates and measures as its own
   * character while `color` records a style run — see `setCharColour`.
   *
   * ⚠ Only `char` does this. `word` and `line` stay plain strings, because they
   * are consumed as VALUES (`CheckWord` hands `tMem.word[i]` to
   * `removeLastSeparator`, which does `iWord.length` and `iWord.char[…]`) and
   * nothing styles them.
   */
  get char(): unknown {
    const base = (this.text as unknown as { char: unknown }).char as object;
    if (base === null || typeof base !== "object") return base;
    const owner = this;
    return new Proxy(base, {
      get(target, property, receiver) {
        const value = Reflect.get(target, property, receiver) as unknown;
        if (typeof property !== "string" || typeof value !== "string") return value;
        const index = Number(property);
        if (!Number.isInteger(index) || index < 1) return value;
        return new TextChunkRef(value, owner, index);
      },
    });
  }

  /**
   * Per-character colour, keyed by 1-based index. Empty for almost every member;
   * only a styled chunk puts anything here. See `char` and the text render.
   */
  private charColours = new Map<number, LingoValue>();

  setCharColour(index: number, colour: LingoValue): void {
    if (!Number.isInteger(index) || index < 1) return;
    this.charColours.set(index, colour);
  }

  charColour(index: number): LingoValue {
    return this.charColours.has(index) ? this.charColours.get(index) : this.color;
  }

  /** Drop every per-character colour — a new string or a whole-member colour. */
  clearCharColours(): void {
    if (this.charColours.size > 0) this.charColours.clear();
  }

  /** The styled ranges, as `[startIndex, endIndexInclusive, colour]`, in order. */
  colourRuns(): Array<[number, number, LingoValue]> {
    if (this.charColours.size === 0) return [];
    const length = this.text.length;
    const runs: Array<[number, number, LingoValue]> = [];
    let start = 1;
    let current = this.charColour(1);
    for (let i = 2; i <= length; i++) {
      const colour = this.charColour(i);
      if (sameColour(colour, current)) continue;
      runs.push([start, i - 1, current]);
      start = i;
      current = colour;
    }
    if (length > 0) runs.push([start, length, current]);
    return runs;
  }

  /**
   * ⚠ A field reference used as a string IS its text.
   *
   * `String Services Class.convertToPropList` computes each value's end with
   * `length(a_sString)` where `a_sString` is the field itself. Without this the
   * default object stringification made that 15 ("[object Object]"), every
   * `char.range(start, 15)` came back empty, and the parser produced 113
   * correct keys mapped to 113 empty values — a config that looks loaded and
   * carries nothing.
   */
  toString(): string {
    return this.text;
  }

  /**
   * ⚠ Chunk expressions on a field reference operate on its TEXT.
   * `CMgrVariable.dump` — the parser for every config file the client downloads —
   * does `tStr = field(tField)` then `tStr.item.count`. Returning the member
   * itself made that read `undefined.count`, killing the boot immediately after
   * its first successful download.
   *
   * Delegating keeps one implementation: `installStringChunks` puts the real
   * accessors on `String.prototype` and these forward to them.
   */
  get line(): unknown {
    return (this.text as unknown as { line: unknown }).line;
  }

  get word(): unknown {
    return (this.text as unknown as { word: unknown }).word;
  }

  get item(): unknown {
    return (this.text as unknown as { item: unknown }).item;
  }

  erase(): LingoValue {
    this.text = "";
    this.image = VOID;
    return VOID;
  }
}

/** The single object every failed lookup returns. */
const EMPTY_MEMBER = new CastMember(-1, "empty", 0);

/**
 * ⚠ The cast-lib equivalent of `EMPTY_MEMBER`, for the same reason.
 * `CMgrCastload.FindCastNumber` scans `1..the number of castLibs` and reads
 * `the fileName of castLib j` at every step, so a gap in the numbering — or a
 * count that runs past the registered libs — has to answer with an empty lib
 * rather than VOID, or the client's first cast-load pass dies on a property of
 * VOID instead of simply not matching.
 */
let EMPTY_CASTLIB: CastLib;

export class CastLib {
  /**
   * ⚠ Director calls a cast library `#castLib`, and VMK GUARDS on it.
   *
   * `CAvatarClothAssetManager.AddCastContentsToImageCache` opens with
   *
   *     if ilk(a_rCast) = #castLib then … end if
   *
   * and everything it does — duplicating each bitmap into
   * `m_mp_sName_rStruct[name]` — sits inside that `if`. Reporting the generic
   * `#instance` made the guard false, so the avatar IMAGE CACHE was never
   * populated: `CBodypartClass.copyPicture` looks its member up by name in that
   * cache (`std_hd_1_3_0`), missed every time, and returned 0 without drawing.
   *
   * The result was eight blank avatar previews on registration page 1 while the
   * art was present and correct — `std_hd_1_4_0` resolves to member 600137,
   * 30x38, with pixels. Nothing reported a failure; `copyPicture` returning 0 is
   * an ordinary "no such cached image" answer.
   *
   * Same class of bug as `#image` on `LingoImage` and `#member` on `CastMember`,
   * both of which are already declared for exactly this reason.
   */
  readonly [LINGO_ILK] = "castLib";

  private readonly byNumber = new Map<number, CastMember>();
  private readonly byName = new Map<string, CastMember>();

  private ownFileName = "";

  /**
   * `the fileName of castLib` — the external cast's path, empty for an internal
   * one.
   *
   * ⚠ Assigning it is how Director ATTACHES an external cast, and VMK depends on
   * exactly that: `CMgrCastload.setImportedCast` finds an empty lib, sets its
   * `fileName` and `name`, and immediately calls `preIndexMembers` on it —
   * expecting the members to be there already. So the setter is the load hook,
   * not a plain field.
   *
   * It is also read: `FindCastNumber` takes the last three characters to skip
   * `.dcr`/`.dir` libs while scanning, which is why it must always be a string.
   */
  get fileName(): string {
    return this.ownFileName;
  }

  set fileName(value: string) {
    const attaching = String(value ?? "");
    /**
     * ⚠ ATTACHING REPLACES THE LIB'S CONTENTS — it does not add to them.
     *
     * Dynamic cast slots are RECYCLED. `CMgrCastload.ResetOneDynamicCast` renames
     * a retired lib back to `<null> N` and returns it to `pAvailableDynCasts`,
     * and the next room's `setImportedCast` grabs that same slot and assigns a
     * new `fileName`. Director loads the new cast OVER the slot; ours merged the
     * two, so a lib ended up holding both rooms' members at once.
     *
     * MEASURED going Main Street -> Emporium -> Main Street. Lib 2 reported
     * `vmk_sound/vmk_snd_main_street2`, 251 members, and contained BOTH:
     *
     *     200015  main_street_sound.xml   1174 chars   (Main Street's)
     *     200035  Sound.xml                846 chars   (EMPORIUM's, stale)
     *
     * `preIndexMembers` then filed the stale `Sound.xml` in `pAllMemNumList`, and
     * `CSoundTracker.StartRoomSounds` — which falls through to the generic
     * `Sound.xml` for every room whose sound cast carries no `CSoundStart` —
     * parsed the WRONG ROOM'S soundscape. Returning to Main Street came up with
     * endTime 84 and the Emporium's ES-* cues.
     *
     * Clearing here rather than in `ResetOneDynamicCast` covers every path that
     * attaches a cast, including a slot reused without an explicit reset.
     */
    if (attaching !== "" && attaching !== this.ownFileName && this.byNumber.size > 0) {
      this.byNumber.clear();
      this.byName.clear();
    }
    this.ownFileName = attaching;
    if (this.ownFileName !== "") castFileLoader?.(this.ownFileName, this);
  }

  private ownName = "";
  /** Set by `CastRegistry.addLib`, so a rename can re-index the registry. */
  private registry: { reindexLib(lib: CastLib, from: string): void } | undefined;

  /**
   * `the name of castLib`.
   *
   * ⚠ An accessor for the same reason `CastMember.name` is one: VMK renames a
   * lib after attaching a cast to it. `CMgrCastload.setImportedCast` takes an
   * `"empty N"` slot and renames it to the cast, then `CCastLoadTask.OneCastDone`
   * looks it up again with `castLib(tCastName)._number`. With a plain field the
   * registry index still held `"empty 40"`, the lookup missed, and `initThread`
   * was handed 0 — "Cast doesn't exist: 0" for every cast the client loads.
   */
  get name(): string {
    return this.ownName;
  }

  set name(value: string) {
    const previous = this.ownName;
    this.ownName = String(value ?? "");
    this.registry?.reindexLib(this, previous);
  }

  /** Called by `CastRegistry.addLib`; not part of the Lingo surface. */
  attachToRegistry(registry: { reindexLib(lib: CastLib, from: string): void }): void {
    this.registry = registry;
  }

  constructor(
    readonly _number: number,
    name: string,
  ) {
    this.ownName = name;
  }

  add(member: CastMember): void {
    this.byNumber.set(member._number, member);
    this.indexName(member);
    member.attachTo(this);
  }

  /**
   * ⚠ RE-CONSIDER A NAME AFTER THE MEMBER GAINS ART.
   *
   * `add` indexes the name immediately, but the loader sets a bitmap's
   * `imagePath` AFTER `add` (and it may arrive on a later manifest row than the
   * one that created the member). `indexName` prefers the member WITH art, so it
   * must run again once the art is known — otherwise a real backdrop that shares
   * its name with an earlier empty duplicate (Nautilus `nautilus_bg` 233 vs the
   * empty 187) never wins the name and the room renders black. See `indexName`.
   */
  reconsiderName(member: CastMember): void {
    this.indexName(member);
  }

  /**
   * ⚠ DUPLICATE NAMES RESOLVE TO THE LOWEST-NUMBERED MEMBER — Director's rule.
   *
   * `byName` is a plain Map, so a bare `.set` let the LAST member registered under
   * a name win. Director does the opposite: `member("name")` returns the member
   * with the lowest number. The difference is not academic — casts carry
   * same-named duplicates where a later one is an EMPTY placeholder, and last-wins
   * made the empty one shadow the real art. MEASURED: Shipwreck's `sunken_ship_bg`
   * exists as member 7 (the real 1.8 MB backdrop) and an empty member 17 (0-byte
   * BITD/ALFA); last-wins returned 17, so the room rendered its whole underwater
   * backdrop as black. Keeping the lowest number matches Director and renders the
   * real member. See [[room-sound-wrong-cast-clobber]].
   */
  /**
   * ⚠ A bitmap member "has art": a decoded image path (or an assigned image).
   *
   * Same-named bitmap duplicates come in two shapes — one carries the real
   * decoded PNG, the others are empty BITD placeholders our extraction left
   * undecoded (`imagePath === ""`). Only bitmaps have this empty-duplicate
   * problem; every other member type keeps pure lowest-wins.
   */
  private static hasArt(member: CastMember): boolean {
    if (member.kind !== "bitmap") return true;
    return String((member as { imagePath?: string }).imagePath ?? "") !== ""
      || (member as { assignedImage?: unknown }).assignedImage != null;
  }

  private indexName(member: CastMember): void {
    if (member.name === "") return;
    const key = member.name.toLowerCase();
    const existing = this.byName.get(key);
    if (existing === undefined) {
      this.byName.set(key, member);
      return;
    }
    /**
     * ⚠ LOWEST NUMBER, BUT ONLY AMONG MEMBERS THAT HAVE ART.
     *
     * Director resolves a duplicate name to the lowest member number, and that
     * used to be all this did. It broke both ways depending on where the EMPTY
     * duplicate sits:
     *   - Shipwreck `sunken_ship_bg`: real art member 7, empty member 17 —
     *     lowest-wins already picked 7. Fine.
     *   - Nautilus `nautilus_bg`: empty members 187/202/231, real art member 233
     *     — lowest-wins picked the EMPTY 187 and the whole submarine backdrop
     *     rendered black.
     * Preferring the member with art (then the lowest of those) renders the real
     * backdrop in both. The empties are an extraction artifact — Director's own
     * lowest member carries the pixels; ours doesn't decode the duplicate BITDs.
     * See [[member-by-name-lowest-wins]], [[room-sound-wrong-cast-clobber]].
     */
    const mArt = CastLib.hasArt(member);
    const eArt = CastLib.hasArt(existing);
    if (mArt !== eArt) {
      if (mArt) this.byName.set(key, member);
      return;
    }
    if (member._number < existing._number) {
      this.byName.set(key, member);
    }
  }

  /** Keeps the by-name index correct when a member is renamed after insertion. */
  reindex(member: CastMember, from: string): void {
    if (from !== "" && this.byName.get(from.toLowerCase()) === member) {
      this.byName.delete(from.toLowerCase());
      // The name may still belong to another (lower) member; re-pick the lowest.
      for (const other of this.byNumber.values()) {
        if (other !== member && other.name.toLowerCase() === from.toLowerCase()) {
          this.indexName(other);
        }
      }
    }
    this.indexName(member);
  }

  /**
   * Where this lib's global member numbers start. Members are numbered
   * `castLibNum * 100000 + <in-cast id>` (lib 1 keeps the bare id), so the
   * in-cast id — which is what Director calls the member's index within the lib
   * — is the global number minus this. See `createMember` and the loader.
   */
  private get numberBase(): number {
    return this._number === 1 ? 0 : this._number * 100000;
  }

  /**
   * ⚠ A NUMBER SCOPED TO A LIB IS AN INDEX WITHIN IT, not a global number.
   *
   * We number members globally (`castLibNum * 100000 + n`) so that an
   * unqualified `member N` resolves without naming a lib — see `createMember`.
   * But Director's `member(i, castLibNum)` counts from 1 inside that lib, and
   * VMK walks members exactly that way:
   *
   *     repeat with i = 1 to the number of castMembers of castLib tCastNum
   *       tmember = member(i, tCastNum)
   *
   * Matching only the global number meant those loops found NOTHING in any lib
   * past the first, so `preIndexMembers` indexed almost none of an attached
   * cast and `unregisterMembers` unregistered none of it.
   *
   * The two spellings cannot collide: lib 1 numbers its members from 1, where
   * index and number are the same, and every other lib starts at 100000 or
   * above, far past any index it could be asked for.
   */
  find(ref: LingoValue): CastMember | undefined {
    if (typeof ref === "number") return this.byNumber.get(ref);
    if (typeof ref === "string") return this.byName.get(ref.toLowerCase());
    return undefined;
  }

  /**
   * `member(ref, castLibN)` — the SCOPED lookup, where a number is an index.
   *
   * ⚠ Only the scoped form may read a number as an index. The unqualified
   * `member(N)` walks every lib asking `find`, so an index fallback there lets
   * the FIRST lib answer for a global number belonging to a later one — which
   * booted into "Lingo method not found: create on number []", because the
   * message manager's class member resolved to an unrelated member.
   */
  findScoped(ref: LingoValue): CastMember | undefined {
    const direct = this.find(ref);
    if (direct !== undefined) return direct;
    if (typeof ref === "number" && Number.isInteger(ref)) {
      return this.byNumber.get(this.numberBase + ref);
    }
    return undefined;
  }

  get count(): number {
    return this.byNumber.size;
  }

  get members(): CastMember[] {
    return [...this.byNumber.values()];
  }

  /**
   * `the number of castMembers of castLib N` — how many member slots the lib
   * has, which with the index-based `find` above is simply its member count.
   *
   * ⚠ THIS RETURNED THE HIGHEST GLOBAL MEMBER NUMBER, and that number is
   * `castLibNum * 100000 + n`. MEASURED on entering musical_mainstreet:
   *
   *     the number of castMembers of castLib 40   ->  4,000,264   (really 264)
   *
   * so every `repeat with i = 1 to <that>` ran FOUR MILLION times over a lib of
   * a few hundred members. `CMgrResource.unregisterMembers` is called once per
   * clothing cast by `CAvatarClothAssetManager._CastLoadCallback` ->
   * `RemoveCastLib` -> `ResetOneDynamicCast`, and cost 1.17 s each:
   *
   *     CMgrResource.unregisterMembers    8 calls   9,331 ms self
   *
   * Those eight calls were the whole room-load stall — eight ~1.3 s freezes of
   * the main thread, 11 s in total. Every `setInterval` and the frame pump stop
   * dead inside one, which is why the sound tracker's clock ended up ~10 s
   * behind the wall clock and every cue "came in late", and why the avatar's
   * load-in animation appeared frozen and then jerky.
   *
   * Still the HIGHEST index rather than the count, because VMK's loops skip
   * gaps and every extracted cast has them — but expressed relative to the
   * lib's own numbering base, which is what Director reports.
   */
  get numberOfCastMembers(): number {
    let highest = 0;
    const base = this.numberBase;
    for (const number of this.byNumber.keys()) {
      const index = number - base;
      if (index > highest) highest = index;
    }
    return highest;
  }

  /**
   * Director's `new(#bitmap, castLib "bin")` — allocate an empty member.
   *
   * VMK's `CMgrResource` builds every runtime image and text field this way,
   * into the cast its config names (`dynamic.bin.cast = bin`). Without it the
   * resource manager cannot construct, and nothing that draws through
   * `buildVisual` gets a buffer to draw into.
   */
  createMember(kind: MemberType, name = ""): CastMember {
    // ⚠ Director numbers members globally across cast libs, which is why a bare
    // `member N` resolves without naming a lib. Numbering each lib from 1 made
    // the first member minted in `bin` collide with member 1 of the internal
    // cast: `CWindowTextWrapper.initResources` created its text member, looked
    // it back up by number, and got an unrelated internal member whose `.image`
    // is VOID — surfacing four frames later as "reading 'width' of undefined".
    let next = this._number === 1 ? 1 : this._number * 100000;
    while (this.byNumber.has(next)) next++;
    const member = new CastMember(next, kind, this._number);
    member.name = name;
    this.add(member);
    return member;
  }
}

export class SpriteChannel {
  /**
   * ⚠ Director calls a sprite `#sprite`, and VMK branches on it:
   * `Core Thread Class.hideLogo` releases its channel only
   * `if ilk(pLogoSpr) = #sprite`. Answering the generic `#instance` left the
   * boot logo's sprite reserved forever.
   */
  readonly [LINGO_ILK] = "sprite";
  private held: CastMember = EMPTY_MEMBER;

  /**
   * `the scriptInstanceList of sprite` — behaviour instances attached to this
   * channel. A handler call on the sprite that the channel does not implement
   * itself runs on these instead; `callMethod` does that forwarding.
   *
   * `CMgrSprite.setEventBroker` attaches one (`[new(pEventBroker)]`) and
   * `removeEventBroker` clears it, which is how every clickable room element
   * gets its `registerProcedure` / `setID` surface.
   */
  scriptInstanceList: LingoValue = new LingoList([]);

  /**
   * `the member of sprite`. Director lets it be cleared by assigning 0 or VOID,
   * and `CMgrSprite.resetSpriteProps` does so for every channel it recycles —
   * so the slot has to coerce rather than store whatever it is handed.
   * Without this, `channel.member` becomes `undefined` and every later
   * `.isEmpty` read throws far away from the assignment that caused it.
   */
  get member(): CastMember {
    return this.held;
  }

  set member(value: CastMember | LingoValue) {
    /**
     * ⚠ A NUMBER IS A MEMBER NUMBER, as with `castNum`.
     *
     * `CMgrResource.createMember` returns `tmember.number` (the slot number),
     * and `CAvatarAnimator.SetSprite` assigns that straight to
     * `sprite.member`. Dropping it left the sprite on the nameless empty
     * member, `CAvatarFactor.update` exits on `member.name = EMPTY`, and the
     * animator's `repeat while t_Img = VOID` spun forever — the Jungle Cruise
     * froze the tab drawing the skipper into the boat.
     */
    if (typeof value === "number") {
      this.castNum = value;
      return;
    }
    /**
     * ⚠ AND A STRING IS A MEMBER NAME — `member("name")`'s lookup. The Jungle
     * Cruise guide animates Ned with `m_charSprite.member = m_ar_frames[n]`,
     * where the frames are the NAMES from `guide_speaking_frames`
     * ("jungleguide0000"…); dropping them left Ned's head undrawn.
     */
    if (typeof value === "string") {
      this.held = value === "" ? EMPTY_MEMBER : (filmLoopMemberResolver?.(value) ?? EMPTY_MEMBER);
      return;
    }
    this.held = value instanceof CastMember ? value : EMPTY_MEMBER;
  }

  /**
   * `pointToWord(point)` on a SPRITE — the point is in STAGE coordinates.
   *
   * `CComposeCannedMessage.CheckWord` passes `tWordLoc + tOffset`, where
   * `tOffset` is `the loc of sprite`, so the sprite's own position comes back
   * off before the member is asked. See `CastMember.pointToWord`.
   */
  pointToWord(location: LingoValue): number {
    const point = location as unknown as { locH?: number; locV?: number };
    const local = new LingoPoint(
      (Number(point?.locH) || 0) - this.locH,
      (Number(point?.locV) || 0) - this.locV,
    );
    return this.held.pointToWord(local as unknown as LingoValue);
  }

  /**
   * `the castNum of sprite` — the same slot as `member`, addressed by number.
   *
   * ⚠ This is how VMK assigns art. `CWindow.buildVisual` does
   * `the castNum of tSprite = tmember._number`, never `the member of`, so
   * without it every element reserved a channel, laid out correctly, and drew
   * nothing — the channel stayed empty and no error was raised.
   */
  get castNum(): number {
    return this.held.isEmpty ? 0 : this.held._number;
  }

  set castNum(value: LingoValue) {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) {
      this.held = EMPTY_MEMBER;
      return;
    }
    this.held = spriteMemberResolver?.(number) ?? EMPTY_MEMBER;
  }

  locH = 0;
  locV = 0;
  /**
   * `the locZ of sprite` — the DRAWING ORDER, which defaults to the channel
   * number and can be moved independently of it.
   *
   * ⚠ Defaulting this to 0 made every sprite claim the same layer. It matters
   * because VMK does its window stacking entirely through `locZ`:
   * `CMgrWindow.Activate` walks `pItemList` — the window list in activation
   * order — and stamps a running counter onto every sprite of every window:
   *
   *     pAvailableLocZ = pDefaultLocZ
   *     repeat with tCurrID in pItemList
   *       repeat with tSpr in tWndObj.spriteList
   *         tSpr.locZ = pAvailableLocZ
   *         pAvailableLocZ = pAvailableLocZ + 1
   *
   * So the front-to-back order of every dialog, panel and backdrop in the
   * client is carried in this property and nowhere else. Set in the
   * constructor rather than as a field initialiser so it tracks the channel.
   */
  locZ: number;
  puppet = 0;
  visible = 1;
  ink = 0;
  blend = 100;

  get blendLevel(): number {
    return Math.round((this.blend * 255) / 100);
  }

  set blendLevel(value: number) {
    const level = Math.max(0, Math.min(255, Number(value) || 0));
    this.blend = (level * 100) / 255;
  }
  /**
   * `the flipH/flipV of sprite` — mirror the sprite about its own box.
   *
   * ⚠ THE AVATAR'S FACING DEPENDS ON THIS. VMK draws only five of the eight
   * body directions and mirrors the rest rather than shipping the art twice:
   *
   *     CBodypartClass.Define   m_arFlipList = [0, 1, 2, 3, 4, 3, 2, 1]
   *     CAvatarRenderer.update  a_Spr.flipH = m_bFlipped
   *
   * So directions 5, 6 and 7 reuse the art for 3, 2 and 1 turned around. The
   * property was being written by `setThePropOf` and dropped on the floor,
   * which leaves three of the eight facings drawn backwards — and only ever
   * once the avatar TURNS, which is why standing still looked correct.
   *
   * Not avatar-only: `CVisualizer.buildVisual` and `CVisualizerXML.buildVisual`
   * set it from the room's SPRITE tags, and `CMgrSprite.resetSpriteProps`
   * clears it, so room scenery mirrors through the same property.
   */
  flipH = 0;
  flipV = 0;
  color: LingoValue = VOID;
  bgColor: LingoValue = VOID;
  /**
   * `the backColor of sprite` — the PALETTE-INDEX form of `bgColor`.
   *
   * ⚠ Setting it must reset `bgColor`, because that is how VMK clears it.
   * `CMgrSprite.resetSpriteProps` runs on every `reserveSprite` and
   * `releaseSprite` and never touches `bgColor` — it sets `backColor = 0`,
   * index 0 of the system palette, which is WHITE. Stored as a loose property,
   * a recycled channel kept its previous user's `bgColor`: a Pirates sail
   * sprite leaves `#FFEFBE` (ink 41) behind, the next ship's shooting-arrow
   * sprite (ink 36, which keys out `bgColor`) inherits it, and the arrow's
   * white background stops being keyed — "sometimes", whenever the channel had
   * been a sail. VOID is this runtime's white default, so 0 maps to VOID; 255
   * is black. VMK sets no other index on a sprite.
   */
  private backColorIndex = 0;
  get backColor(): number {
    return this.backColorIndex;
  }
  set backColor(index: number) {
    const value = Number(index) || 0;
    this.backColorIndex = value;
    if (value === 0) this.bgColor = VOID;
    else if (value === 255) this.bgColor = new LingoColor(0, 0, 0) as unknown as LingoValue;
  }
  /**
   * Behaviours attached to this channel. Director allows several per sprite and
   * offers each of them an event in turn, so this is a list, not one slot.
   */
  readonly scripts: LingoValue[] = [];
  /** Explicit draw size from a window layout; falls back to the member's own. */
  stretchWidth: number | undefined;
  stretchHeight: number | undefined;
  /**
   * Text styling, when a window layout supplies it. Director keeps this on the
   * member, but a layout can override per placement, so the channel wins.
   */
  font: string | undefined;
  fontSize: number | undefined;
  alignment: string | undefined;
  textColor: string | undefined;
  /**
   * Per-sprite text, overriding the member's.
   *
   * The fireworks HUD points all three score rows at the **same** member
   * (`fw.rankstatus`) and tells them apart by element `id`. Director shares
   * `the text of member`, so per-row content cannot live there — every row
   * would read the same. VMK's UI addresses elements by id, so the override
   * belongs on the sprite.
   */
  text: string | undefined;
  /** The window element's `id`, which is how the game addresses this sprite. */
  elementId: string | undefined;

  get drawWidth(): number {
    return this.stretchWidth ?? this.member.width;
  }

  get drawHeight(): number {
    return this.stretchHeight ?? this.member.height;
  }

  /**
   * `the width/height of sprite` are readable AND writable in Director —
   * assigning stretches the sprite. Backing them with the stretch overrides
   * keeps a plain read reporting the member's own size until something sets it.
   */
  get width(): number {
    return this.drawWidth;
  }

  set width(value: number) {
    this.stretchWidth = Number(value);
  }

  get height(): number {
    return this.drawHeight;
  }

  set height(value: number) {
    this.stretchHeight = Number(value);
  }

  private attachedScripts: LingoValue = VOID;

  /**
   * `the scriptInstanceList of sprite` — the behaviours attached to this channel.
   *
   * ⚠ A BEHAVIOUR MUST KNOW ITS OWN CHANNEL. Inside a sprite behaviour, Director
   * answers `the spriteNum of me` with the channel it is attached to, and VMK
   * reads it the instant the broker is wired up:
   *
   *     CEventBroker.setID   pSprite = sprite(the spriteNum of me)
   *
   * Our instances carried no such property, so that was `sprite(VOID)`, which
   * hands back channel 0 — and EVERY broker in the movie ended up pointing at
   * that one orphan channel.
   *
   * ⚠ THIS IS WHY THE CURSOR NEVER CHANGED OVER A BUTTON.
   * `CWindow.buildVisual` calls `setcursor(tSprite, #arrow)` (and the layout's
   * own cursor) for every element, and `CEventBroker.setcursor` maps the symbol
   * and writes `the cursor of pSprite`. It was writing to channel 0 every time:
   * MEASURED with the navigator open — 99 sprites carrying brokers, and all 121
   * cursors reading 0, while the orphan channel held the value.
   *
   * Stamped on assignment rather than at dispatch, because VMK reads it during
   * `setID`, long before any mouse event arrives.
   */
  get scriptInstanceList(): LingoValue {
    return this.attachedScripts;
  }

  set scriptInstanceList(value: LingoValue) {
    this.attachedScripts = value;
    const items = (value as { toArray?: () => LingoValue[] } | undefined)?.toArray;
    if (typeof items !== "function") return;
    for (const instance of (value as { toArray(): LingoValue[] }).toArray()) {
      if (instance === VOID || instance === null || typeof instance !== "object") continue;
      (instance as Record<string, unknown>)["spriteNum"] = this.spriteNum;
    }
  }

  constructor(readonly spriteNum: number) {
    // Director's default: a sprite's layer IS its channel until something
    // moves it. With this, a client that never touches `locZ` composites in
    // exactly channel order, as before.
    this.locZ = spriteNum;
  }

  /** Screen-space hit test against the drawn size, not the member's own. */
  containsPoint(x: number, y: number): boolean {
    if (!this.visible) return false;
    return (
      x >= this.locH &&
      y >= this.locV &&
      x < this.locH + this.drawWidth &&
      y < this.locV + this.drawHeight
    );
  }

  get _type(): string {
    return this.member === EMPTY_MEMBER ? symbol("empty") : this.member._type;
  }

  /**
   * `the loc of sprite` — a point, not a pair.
   *
   * VMK moves sprites through it: `CVisualizer.moveSprTo` does
   * `setThePropOf(sprite, "loc", point(x, y))`. Without an accessor the write
   * lands on a dead property and the sprite never moves, which is silent.
   */
  get loc(): LingoPoint {
    return new LingoPoint(this.locH, this.locV);
  }

  set loc(value: LingoPoint) {
    this.locH = Number(value?.locH ?? 0);
    this.locV = Number(value?.locV ?? 0);
  }

  /** `the regPoint of sprite` — offsets the art against `loc`. */
  regPoint: LingoPoint = new LingoPoint(0, 0);

  /**
   * `the left/top/right/bottom of sprite` — the DRAWN edges.
   *
   * ⚠ THESE DID NOT EXIST, so they were plain own fields sitting at 0 while the
   * sprite was somewhere else entirely. Nothing errored; every read just got 0.
   *
   * MEASURED on the registration EULA scrollbar, which would not scroll.
   * `CWindowScrollbar.buttonOfClickArea` converts the click into the element's
   * own space with
   *
   *     tpoint = tpoint - point(pSprite.left, pSprite.top)
   *
   * and with left/top reading 0 the point stayed in STAGE space — (587,448)
   * against arrow rects of `rect(0,252,16,267)` — so it matched no region,
   * returned VOID, and `ScrollBarMouseEvent` bailed at its `voidp` guard. The
   * scrollbar was correctly configured the whole time (`pMaxOffset` 466,
   * `pButtonStates` `#top:#passive #bottom:#up`); it simply never learned which
   * part had been clicked.
   *
   * Defined as ACCESSORS rather than fields on purpose: something assigns these,
   * and a prototype setter intercepts that write instead of letting it create a
   * dead own property that shadows the getter forever.
   *
   * Edges are measured from the REGISTRATION POINT, exactly as `Stage.render`
   * draws and as `spriteAt` now hit-tests — the three must not disagree.
   */
  /**
   * ⚠ THE MEMBER'S REGISTRATION POINT, SCALED BY THE STRETCH — what `Stage`
   * actually draws from (`loc - member.regPoint * scale`). These edges used the
   * sprite's own `regPoint` field, which nothing sets, so every sprite's rect was
   * `loc`-anchored while its art sat `regPoint` up and left of it. The Jungle
   * Cruise scores a photo by the distance between the viewfinder's rect centre
   * and each animal's (`CheckFrameHit`), so every shot lost accuracy to the
   * difference in their reg points — most ratings came out "OK". Window buffers
   * are registered at (0,0) by VMK, so they read exactly as before.
   */
  private regOffset(): { x: number; y: number } {
    const member = this.held;
    if (member.isEmpty) return { x: this.regPoint.locH, y: this.regPoint.locV };
    const reg = member.regPoint;
    const scaleX = this.stretchWidth !== undefined && member.width > 0 ? this.drawWidth / member.width : 1;
    const scaleY = this.stretchHeight !== undefined && member.height > 0 ? this.drawHeight / member.height : 1;
    return { x: reg.locH * scaleX, y: reg.locV * scaleY };
  }

  /** The drawn edges, mirrored about `loc` for a flipped sprite as `Stage` mirrors it. */
  get left(): number {
    const unflipped = this.locH - this.regOffset().x;
    return this.flipH ? 2 * this.locH - unflipped - this.drawWidth : unflipped;
  }

  set left(value: number) {
    this.locH = Number(value) + this.regOffset().x;
  }

  get top(): number {
    const unflipped = this.locV - this.regOffset().y;
    return this.flipV ? 2 * this.locV - unflipped - this.drawHeight : unflipped;
  }

  set top(value: number) {
    this.locV = Number(value) + this.regOffset().y;
  }

  get right(): number {
    return this.left + this.drawWidth;
  }

  /** Director resizes when you move the right edge; the left one stays put. */
  set right(value: number) {
    this.stretchWidth = Math.max(0, Number(value) - this.left);
  }

  get bottom(): number {
    return this.top + this.drawHeight;
  }

  set bottom(value: number) {
    this.stretchHeight = Math.max(0, Number(value) - this.top);
  }

  get rect(): LingoRect {
    return new LingoRect(this.left, this.top, this.right, this.bottom);
  }

  /**
   * `sprite(a).intersects(sprite(b))` — TRUE when the two sprites' bounding
   * rects overlap (Director's test for non-matte inks).
   *
   * ⚠ Missing, it threw out of the Jungle Cruise's `CheckFrameHit` — the camera
   * viewfinder against each animal — so `TakePhoto` aborted before sending a
   * single hit and no photo ever scored.
   */
  intersects(other: LingoValue): number {
    const o = other as unknown as SpriteChannel | null;
    if (!o || typeof o !== "object" || !("left" in o)) return 0;
    if (this.held.isEmpty || o.held.isEmpty) return 0;
    const a = this.rect;
    const b = o.rect;
    return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom ? 1 : 0;
  }

  /**
   * `the rect of sprite` is writable in Director — assigning moves and resizes
   * in one go, and `CMgrSprite.resetSpriteProps` does exactly that. A
   * getter-only property throws on assignment in strict mode, which is how the
   * whole window build died before drawing anything.
   */
  set rect(value: LingoRect) {
    if (!value) return;
    // Through the edge accessors, so a sprite with a registration point lands
    // where the rect says rather than half its own size away.
    // Size first: the edges place `loc` by the reg point SCALED to that size.
    this.stretchWidth = Number(value.right) - Number(value.left) || undefined;
    this.stretchHeight = Number(value.bottom) - Number(value.top) || undefined;
    this.left = Number(value.left) || 0;
    this.top = Number(value.top) || 0;
  }

}

export class CastRegistry {
  private readonly libsByNumber = new Map<number, CastLib>();
  private readonly libsByName = new Map<string, CastLib>();
  private readonly sprites = new Map<number, SpriteChannel>();

  /** Keeps the by-name index correct when a lib is renamed after registration. */
  reindexLib(lib: CastLib, from: string): void {
    if (from !== "" && this.libsByName.get(from.toLowerCase()) === lib) {
      this.libsByName.delete(from.toLowerCase());
    }
    if (lib.name !== "") this.libsByName.set(lib.name.toLowerCase(), lib);
  }

  addLib(lib: CastLib): void {
    this.libsByNumber.set(lib._number, lib);
    this.libsByName.set(lib.name.toLowerCase(), lib);
    lib.attachToRegistry(this);
    // `preIndexMembers` bounds its scan with `the number of castLibs`, so the
    // movie property has to track registrations — stale, it scans too few
    // casts and silently indexes nothing from the rest.
    setTheProperty("numberOfCastLibs", this.castLibCount);
  }

  castLib(ref: LingoValue): CastLib | undefined {
    if (typeof ref === "number") return this.libsByNumber.get(ref);
    if (typeof ref === "string") return this.libsByName.get(ref.toLowerCase());
    return undefined;
  }

  /**
   * `member(ref)` searches every cast in order, matching Director's behaviour
   * for an unqualified reference; `member(ref, castRef)` is scoped.
   */
  member(ref: LingoValue, castRef?: LingoValue): CastMember {
    /**
     * ⚠ A member reference may ALREADY be a member.
     *
     * `member(x)` and `field(x)` take a name or a number, but VMK also hands
     * them a member it already holds:
     * `dumpVariableField(member(getmemnum("figureTexts1")))`. Falling through to
     * the by-name/by-number lookup returned the EMPTY member, whose text is "",
     * so `CMgrVariable.dump` parsed nothing and quietly created no variables —
     * the avatar figure sets downloaded (66 KB, correctly, into the right
     * member) and then vanished, leaving "Figure list corrupted!!".
     */
    if (ref instanceof CastMember) return ref;
    if (castRef !== undefined && castRef !== VOID) {
      return this.castLib(castRef)?.findScoped(ref) ?? EMPTY_MEMBER;
    }
    for (const lib of this.libsByNumber.values()) {
      const found = lib.find(ref);
      if (found) return found;
    }
    return EMPTY_MEMBER;
  }

  /**
   * A text member created on demand.
   *
   * Text elements in a window name a member that need not exist as art — the
   * game fills them at runtime. Rather than leaving those slots empty, mint a
   * field member so the row has somewhere to hold its string; a later
   * `member("fw.rankstatus.1").text = …` then just works.
   */
  textMember(name: string, initial = ""): CastMember {
    const existing = name === "" ? undefined : this.textMembers.get(name.toLowerCase());
    if (existing) return existing;

    const member = new CastMember(this.nextTextId--, "field", 0);
    member.name = name;
    member.text = initial;
    if (name !== "") this.textMembers.set(name.toLowerCase(), member);
    return member;
  }

  private readonly textMembers = new Map<string, CastMember>();
  /** Negative ids so runtime-minted members never collide with real cast ids. */
  private nextTextId = -100;

  /**
   * ⚠ A SPRITE REFERENCE MAY ALREADY BE A SPRITE — the same rule `member()` has.
   *
   * `CRoomVisualDefault.getSprite` returns `m_rSprite`, which is a sprite OBJECT
   * (`sprite(0)` or whatever `CMgrSprite.CreateSprite` handed back), and callers
   * feed it straight back through `sprite()`:
   *
   *     tSprite = tNode.GetVisual().getSprite()
   *     t_CashRegisterSprite = sprite(tSprite)
   *     setEventBroker(t_CashRegisterSprite.spriteNum, t_NodeName)
   *
   * `Number(<SpriteChannel>)` is NaN, so this fell to channel 0 and every such
   * call reported "Sprite not marked as usable: 0" out of `setEventBroker` —
   * three times per Emporium load, one per cash register, leaving those props
   * unclickable.
   */
  sprite(channel: LingoValue): SpriteChannel {
    if (channel instanceof SpriteChannel) return channel;
    const index = typeof channel === "number" ? channel : Number(channel) || 0;
    let existing = this.sprites.get(index);
    if (!existing) {
      existing = new SpriteChannel(index);
      this.sprites.set(index, existing);
    }
    return existing;
  }

  get castLibCount(): number {
    return this.libsByNumber.size;
  }
}

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

const MEMBER_TYPES = new Set<string>([
  "empty", "bitmap", "field", "text", "script", "sound",
  "palette", "shape", "digitalVideo", "transition",
  // ⚠ Without this the extractor's `filmLoop` rows fell back to "empty", and an
  // empty member has no image — so a room's animated props resolved to a member
  // that existed and drew nothing.
  "filmLoop",
]);

function toMemberType(raw: string): MemberType {
  return (MEMBER_TYPES.has(raw) ? raw : "empty") as MemberType;
}

/**
 * Loads a cast from `libreshockwave_asset_extractor` output — the
 * `manifest.tsv` plus the `text/` files it points at.
 *
 * Columns: member_id, member_type, member_name, script_id, chunk_id, fourcc,
 * asset_path. One member can own several rows (a script has both LS and LSASM),
 * so members are created once and then enriched per row.
 */
/**
 * Builds a cast from `manifest.tsv` text alone.
 *
 * Split out from the filesystem loader so the browser can use the same parser:
 * it fetches the manifest, and gets dimensions from the decoded images rather
 * than by reading PNG headers. `readText`/`sizeOf` are optional hooks that the
 * Node path supplies.
 */
export function parseCastManifest(
  manifestText: string,
  libName: string,
  libNumber = 1,
  hooks?: {
    readText?: (assetPath: string) => string;
    sizeOf?: (assetPath: string) => { width: number; height: number } | null;
  },
): CastLib {
  const lib = new CastLib(libNumber, libName);
  const lines = manifestText.split(/\r?\n/).slice(1).filter((line) => line.trim() !== "");
  const seen = new Map<number, CastMember>();
  /**
   * ⚠ TEXT-XTRA (XMED) MEMBERS ARE TEXT. The extractor files them as `xtra`
   * with their content in `text/<id>_<name>_xmed.txt`; as "empty" they had no
   * text and no `image`, and a window layout naming one crashed `merge` —
   * `CWindowGroupedElement.Define` reads `member.image.depth`. Seen on the
   * Haunted Mansion Game Over window (`hm.ghosts.hd`, `hm.winner`, …): it
   * opened as an empty frame and could not be closed.
   */
  const xmedText = new Set<number>();
  for (const line of lines) {
    const cols = line.split("\t");
    if (cols[1] === "xtra" && /_xmed\.txt$/i.test(cols[6] ?? "")) xmedText.add(Number(cols[0]));
  }

  for (const line of lines) {
    const [idRaw, typeRaw, nameRaw, , , , assetPath, regXRaw, regYRaw, loopRaw] = line.split("\t");
    const id = Number(idRaw);
    if (!Number.isFinite(id)) continue;

    let member = seen.get(id);
    if (!member) {
      /**
       * ⚠ Member numbers are GLOBAL across casts in Director — that is why a
       * bare `member N` resolves without naming a lib. A manifest carries
       * in-cast ids starting at 1, so an attached cast whose members kept those
       * ids collided with the framework cast: `member(9)` answered with core's
       * member 9 instead. `CMgrThread.initThread` then dumped the wrong member
       * as its thread index and tried to instantiate a class list read out of
       * `System Texts`.
       *
       * Same range convention as `CastLib.createMember`, so runtime-minted and
       * manifest-loaded members in one lib cannot collide either.
       */
      const globalId = libNumber === 1 ? id : libNumber * 100000 + id;
      member = new CastMember(globalId, xmedText.has(id) ? "text" : toMemberType(typeRaw ?? ""), libNumber);
      member.name = nameRaw ?? "";
      /**
       * ⚠ The AUTHORED registration point, when the manifest carries one.
       *
       * Director stores it per member and `the loc of sprite` positions art
       * against it. It is NOT reliably the centre: `field.hlp.selected` is
       * (0,0) while the boot `Logo` is (63,61). Assuming the centre draws
       * correctly sized art half its own size out of place, which is the
       * hardest kind of rendering bug to see — everything looks right except
       * where it is.
       *
       * Older manifests have no `reg_x`/`reg_y` columns; those members fall
       * back to the heuristic in `CastMember.regPoint`.
       */
      if (regXRaw !== undefined && regYRaw !== undefined) {
        const regX = Number(regXRaw);
        const regY = Number(regYRaw);
        if (Number.isFinite(regX) && Number.isFinite(regY)) {
          member.regPoint = new LingoPoint(regX, regY);
        }
      }
      /**
       * ⚠ `the loop of member` — THE ONLY THING THAT MAKES MUSIC REPEAT.
       *
       * `CSoundChannelObject.PlaySound` reads it FIRST and takes a completely
       * different branch when it is set: infinite loop, no duration bookkeeping,
       * no `#loopCount`. Director keeps the flag in the cast info header (bit 4
       * clear = loops) and the extracted .mp3 carries nothing of it, so with no
       * column here every sound member reported `loop = 0`: MEASURED 51 sound
       * members loaded, ZERO looping, including `vmk-map-5` — the navigator's
       * map music. Every room's music and ambience played once and stopped.
       *
       * Older manifests have no column; those members keep the 0 default, which
       * is the same behaviour as before rather than a wrong guess. Re-extract to
       * pick it up (`node tools/extract-casts.mjs <folder> --force`).
       */
      if (loopRaw !== undefined && loopRaw.trim() !== "") {
        member.loop = Number(loopRaw) ? 1 : 0;
      }
      seen.set(id, member);
      lib.add(member);
    }

    if (assetPath && assetPath.startsWith("text/") && hooks?.readText) {
      try {
        member.text = hooks.readText(assetPath);
      } catch {
        // A manifest row can outlive its file; an empty member is the honest
        // result and matches what Director does for a missing asset.
      }
    }

    if (assetPath && assetPath.startsWith("bitmaps/")) {
      member.imagePath = assetPath;
      const size = hooks?.sizeOf?.(assetPath);
      if (size) member.rect = new LingoRect(0, 0, size.width, size.height);
      // The member now has art; re-run name indexing so a real bitmap wins its
      // name over an earlier empty same-named duplicate. See `reconsiderName`.
      lib.reconsiderName(member);
    }

    /**
     * ⚠ A sound member gets one row per FORMAT, and only one of them is audio.
     *
     * The extractor emits both the playable file and the raw Director chunk:
     *
     *   380  sound  MFX-curse-storm  …  sounds/00380_MFX-curse-storm_857.mp3
     *   380  sound  MFX-curse-storm  …  raw_chunks/00380_MFX-curse-storm_857_ediM.bin
     *
     * Both rows enrich the SAME member (see `seen` above), so matching on
     * `sounds/` rather than on the member type is what keeps `soundPath`
     * pointing at the .mp3 instead of whichever row happened to come last.
     */
    /**
     * ⚠ A MEMBER CAN CARRY TWO PLAYABLE ROWS, AND ONE OF THEM IS EMPTY.
     *
     * Older sound casts hold the audio twice — an `ediM` chunk that extracts to
     * `.mp3` and a `snd_` chunk that extracts to `.wav` — and in these casts the
     * PCM chunk has NO SAMPLES. The extractor faithfully writes both, so the
     * manifest reads:
     *
     *   5  sound  GLR-bgloop  sounds/00005_GLR-bgloop_22.mp3   272,064 bytes
     *   5  sound  GLR-bgloop  sounds/00005_GLR-bgloop_24.wav        44 bytes
     *
     * 44 bytes is a bare WAV header. Taking whichever row came LAST therefore
     * pointed the member at silence: the sound "played" with `paused: true` and
     * a duration of 0, and nothing ever came out.
     *
     * MEASURED: 21 members across 9 casts have both, and in every one of them
     * the `.wav` is last and so was winning — vmk_snd_disney_gallery,
     * vmk_snd_VMK_central, vmk_snd_vmk_splashmountain, vmk_snd_storybookland,
     * vmk_snd_castle_entrance, vmk_snd_castle_moneyshot, vmk_snd_horseshoe_shop,
     * vmk_snd_shrinking_machine and vmk_snd_vmk_esplanade.old. That is the whole
     * of "this room has no music" for the VMK Gallery and its seven siblings.
     *
     * Prefer the compressed row, which is the one that actually has audio in it.
     * A cast with only a `.wav` still uses it — plenty are fine — so this only
     * breaks the tie, and it breaks it toward the format that carries samples.
     */
    if (assetPath && assetPath.startsWith("sounds/")) {
      const haveMp3 = member.soundPath.endsWith(".mp3");
      const isWav = assetPath.endsWith(".wav");
      if (!(haveMp3 && isWav)) member.soundPath = assetPath;
    }

    // The score itself; `loadFilmLoops` fetches it and calls `setFilmLoop`.
    if (assetPath && assetPath.startsWith("filmloops/")) {
      member.filmLoopPath = assetPath;
    }
  }

  return lib;
}

// The filesystem loader lives in lingo-cast-node.ts: importing node:fs here
// would break the browser build, since Vite externalises it and the module
// throws on load before any of this code runs.

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

// Cast classes use ordinary TypeScript signatures, not receiver-first.
for (const cls of [CastMember, CastLib, SpriteChannel]) {
  (cls.prototype as unknown as Record<symbol, unknown>)[LINGO_NATIVE] = true;
}

EMPTY_CASTLIB = new CastLib(0, "");

export function registerCastBuiltins(registry: CastRegistry): void {
  // A sprite assigned by `castNum` has to find its member somehow; the registry
  // is the only thing that knows the global numbering.
  spriteMemberResolver = (number) => {
    const found = registry.member(number);
    return found.isEmpty ? undefined : found;
  };

  // A film loop's score names its cells by member name, and those members may
  // live in any attached lib — `registry.member` is the same unqualified lookup
  // Lingo's own `member("name")` performs.
  filmLoopMemberResolver = (name) => {
    const found = registry.member(name);
    return found.isEmpty ? undefined : found;
  };

  // `duplicate(member, destMember)` copies into a member named only by its global
  // number — the same lookup `member N` performs. See `CastMember.duplicate`.
  memberByRefResolver = (ref) => {
    const found = registry.member(ref as unknown as number);
    return found.isEmpty ? undefined : found;
  };

  registerBuiltins({
    member: (ref, castRef) => registry.member(ref, castRef) as unknown as LingoValue,
    /**
     * ⚠ A miss returns an EMPTY cast lib, not VOID, for the same reason a member
     * miss does. `CMgrCastload.FindCastNumber` scans `1..the number of castLibs`
     * and reads `the fileName of castLib j` on every step, so any gap in the
     * numbering — or a count that runs past the registered libs — throws on a
     * property of VOID instead of simply not matching.
     */
    castLib: (ref) => (registry.castLib(ref) ?? EMPTY_CASTLIB) as unknown as LingoValue,
    sprite: (channel) => registry.sprite(channel) as unknown as LingoValue,
    castExists: (ref) => (registry.castLib(ref) ? 1 : 0),
    /** `Layout Parser Class.parse` guards every lookup with this. */
    /**
     * ⚠ Aliases count. VMK's own `memberExists` (core `Resource API`) asks
     * `getResourceManager().exists`, whose name table includes every
     * `memberalias.index` line. The recoloured candlesticks 116-120 have no
     * `item.<N>.ani.xml` of their own and borrow 34's, so a plain registry
     * lookup said no, `CRoomObject.construct` left out `CRoomItemStateAnimator`,
     * and double-clicking them sent nothing. Registry first (boot runs before
     * the resource manager exists), then the manager for alias names.
     */
    memberExists: (ref, castRef) => {
      if (!registry.member(ref, castRef).isEmpty) return 1;
      if ((castRef !== undefined && castRef !== VOID) || typeof ref !== "string" || !hasHandler("getResourceManager")) return 0;
      try {
        const manager = callNamed("getResourceManager");
        return manager && lingoTruthy(callMethod("exists", manager, ref)) ? 1 : 0;
      } catch {
        return 0;
      }
    },
    /** `script "name"` resolves to the member; handler dispatch is the caller's job. */
    script: (ref) => registry.member(ref) as unknown as LingoValue,
    /**
     * `field "name"` is a member reference restricted to text/field members.
     * Distinct from `member` in Lingo, and the emitter now preserves that —
     * previously every `field`, `script` and `castLib` reference was flattened
     * into `member`.
     */
    field: (ref, castRef) => registry.member(ref, castRef) as unknown as LingoValue,
    // `image` is NOT registered here. Director overloads it — one argument is
    // "the image of X", three or four allocate a buffer — and the pure-builtin
    // version handles both. Registering a one-argument-only version here would
    // silently win (cast builtins register later) and break every
    // `image(w, h, depth)` allocation buildVisual makes.
    puppetSprite: (channel, on) => {
      registry.sprite(channel).puppet = Number(on) || 0;
      return VOID;
    },
    /**
     * `new(#bitmap, castLib "bin")` — Director overloads `new` for members.
     * The dispatch builtin handles the script-object form; this one wins when
     * the second argument is a cast library.
     */
    new: (...args) => {
      const [first, second] = args;
      // Two-argument member form: new(#bitmap, castLib "bin").
      if (second instanceof CastLib) {
        return second.createMember(
          String(first).replace(/^#/, "") as MemberType,
        ) as unknown as LingoValue;
      }
      /**
       * ⚠ `new(script "X", a, b, …)` — THE SUBJECT IS THE FIRST ARGUMENT, and
       * everything after it belongs to the class's own `on new`.
       *
       * Only the single-argument form was recognised, so the `(kind, target)`
       * reading below took over the moment a constructor had parameters and
       * handed back ARGUMENT TWO — for
       *
       *   new(script "xml.tokenizer", xmlString, "<>", 1)
       *
       * that is the string being tokenised. It looks like a working call and
       * dies one line later on `hasMoreTokens on string`, which is what stopped
       * the HELP window: `CHelpContent.parseContent` tokenises the help XML
       * before it can build a single page.
       */
      if (first instanceof CastMember && first.kind === "script") {
        return first.new(...args.slice(1));
      }
      // ⚠ Single-argument form: new(xtra "Multiuser"). Assuming (kind, target)
      // here silently returned VOID and CConnection's whole socket path died
      // one call later with "method call on VOID".
      const subject = args.length === 1 ? first : second;
      // ⚠ `new(script "EventBroker")` instantiates the member's CLASS. Falling
      // through to "return the subject" handed back the cast member itself,
      // which looks like a success — `CMgrSprite.setEventBroker` then put a
      // member into the sprite's `scriptInstanceList`, and every message
      // forwarded to that behaviour found no handler.
      if (subject instanceof CastMember && subject.kind === "script") {
        return subject.new();
      }
      if (subject && typeof (subject as { create?: unknown }).create === "function") {
        return callMethod("create", subject as LingoValue);
      }
      return subject ?? VOID;
    },
  });

  // Not implemented. `updateStage` is replaced by a real one when a Stage is
  // registered; `cursor` needs host chrome we do not drive yet.
  registerBuiltins({ updateStage: () => VOID, cursor: () => VOID }, { stub: true });
}

















