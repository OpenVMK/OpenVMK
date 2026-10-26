/**
 * Stage compositor — draws Director's sprite channels.
 *
 * Director's model is a fixed set of numbered channels, each holding a member
 * plus placement and blend state. `updateStage` composites them in channel
 * order, which doubles as z-order. That is all this file does; it does not
 * decode images, and it does not own a canvas.
 *
 * The draw surface is an interface rather than a `CanvasRenderingContext2D` so
 * the same compositor runs in the browser and headless. Verifying draw *calls*
 * catches the things that actually go wrong in a port — z-order, 1-based
 * channel numbering, `ink` handling, invisible sprites still occupying a
 * channel — none of which need real pixels to check, and all of which are
 * invisible in a screenshot diff until they are badly wrong.
 */
import { LingoColor, LingoImage, LingoRect } from "./lingo-builtins.js";
import type { CastMember, CastRegistry, SpriteChannel } from "./lingo-cast.js";
import {
  registerBuiltins, setTheProperty, theProperty, VOID, type LingoValue,
} from "./lingo-runtime.js";
import { atlasFor, drawAtlasText } from "./lingo-glyph-atlas.js";

/** A Lingo colour as the renderer reads it (`LingoColor` or a lookalike). */
type ColorLike = { red?: unknown; green?: unknown; blue?: unknown };

/** The subset of Canvas 2D the compositor uses. */
export interface RenderTarget {
  clearRect(x: number, y: number, width: number, height: number): void;
  /** Both Canvas overloads: whole-image, and atlas sub-rect (9 args). */
  drawImage(image: unknown, ...rest: number[]): void;
  save?(): void;
  restore?(): void;
  translate?(x: number, y: number): void;
  rotate?(radians: number): void;
  fillText?(text: string, x: number, y: number): void;
  fillRect?(x: number, y: number, w: number, h: number): void;
  /**
   * The ascent fields are optional because the headless target (the Node smoke
   * test) supplies width only. Baseline placement falls back to the font size
   * when they are absent — see the baseline notes below.
   */
  measureText?(text: string): {
    width: number;
    fontBoundingBoxAscent?: number;
    fontBoundingBoxDescent?: number;
    actualBoundingBoxAscent?: number;
  };
  scale?(x: number, y: number): void;
  // Clipping a text element to its box — see the field-drawing path.
  beginPath?(): void;
  rect?(x: number, y: number, w: number, h: number): void;
  clip?(): void;
  set globalAlpha(value: number);
  /**
   * Additive inks need a real composite mode — see the ink 33/34 branch in the
   * draw loop. Optional because the headless smoke-test target does not have one.
   */
  globalCompositeOperation?: string;
  set font(value: string);
  set fillStyle(value: string);
  set textAlign(value: string);
}

/**
 * Director font names are era faces no browser ships — the fireworks HUD asks
 * for "Folio BoldCondensed *".
 *
 * ⭐ These are not substitutions any more where we have the real thing.
 * Director embeds the face as PFR1 data, LibreShockwave parses it, and
 * `libreshockwave_pfr_to_ttf` synthesises a TTF the page loads via @font-face.
 * The real family therefore comes FIRST in each stack, with a web-safe fallback
 * behind it for anything not yet converted. That matters beyond looks: glyph
 * widths decide whether a string fits the box its window layout declares.
 */
/**
 * ⚠ The converted families are named WITHOUT SPACES — `Foxley816`, not
 * `"Foxley 816"`. That is the name `FontFace` registers, so it is the only name
 * that resolves. This list used to carry the spaced spelling, which resolves to
 * nothing: the canvas fell through to the web-safe fallback and painted every
 * caption in Georgia or Arial, while the MEASURER (which strips spaces before
 * looking the family up) sized the same string with the real face. Text was
 * therefore laid out to one metric and drawn to another.
 *
 * A CSS font stack fails silently, so this cannot be caught by a thrown error —
 * see the smoke assertion that every substitute's first family is one this page
 * actually loads.
 */
const FONT_SUBSTITUTES: Array<[RegExp, string]> = [
  // Order matters: "Foxley 816 Bold" must match before the plain "Foxley 816".
  [/folio\s*boldcondensed/i, 'FolioBoldCondensed, "Arial Narrow", sans-serif'],
  [/foxley\s*816\s*bold/i, "Foxley816Bold, Georgia, serif"],
  [/foxley/i, "Foxley816, Georgia, serif"],
  [/folio/i, "FolioBoldCondensed, Arial, sans-serif"],
  [/courier/i, '"Courier New", Courier, monospace'],
  [/arial/i, "Arial, Helvetica, sans-serif"],
];

/**
 * A Director colour as CSS. `the color of member` is an `rgb()` object; a
 * caption whose colour is VOID falls to the caller''s default rather than
 * silently painting black on black.
 */
export function cssColour(value: LingoValue): string | undefined {
  if (value === VOID || value === undefined || value === null) return undefined;
  const c = value as { red?: number; green?: number; blue?: number };
  if (typeof c.red === "number" && typeof c.green === "number" && typeof c.blue === "number") {
    return `rgb(${String(c.red)},${String(c.green)},${String(c.blue)})`;
  }
  const text = String(value);
  return /^#[0-9a-f]{3,8}$/i.test(text) ? text : undefined;
}

/**
 * Where to put the pen so aligned text lands inside its box.
 *
 * ⚠ Canvas `textAlign` anchors the string AT the x you pass — it does not
 * align within a rectangle, because it has no idea one exists. Setting
 * `textAlign = "center"` while still passing the box's LEFT edge therefore
 * centres the caption on that edge and hangs half of it outside the panel to
 * the left. Director aligns within the member's box, so the anchor has to move
 * to the edge the alignment names.
 */
function textAnchorX(align: string, left: number, width: number): number {
  if (align === "center") return left + width / 2;
  if (align === "right") return left + width;
  return left;
}

/**
 * ⚠ A GLOBAL points-to-pixels conversion (x 72/96) was TRIED and REVERTED.
 *
 * The theory: Director sizes text in POINTS and canvas `Npx` is PIXELS, so
 * every caption would be drawn ~33% too large. The arithmetic looked
 * persuasive — the name list authors `TXTSIZE="15"` into a 19px row, 15px Arial
 * gives cap-height 11 and 126px of width in a 135px list, and the original
 * shows the same names with clear margin at roughly cap-height 8. 11/15 is
 * 0.73; 72/96 is 0.75.
 *
 * Applied globally it made EVERY caption in the client visibly too small. So
 * whatever the name list's discrepancy is, it is NOT a units error running
 * through all text — the other elements were already correct at 1:1, and
 * scaling them broke what was right.
 *
 * Do not re-apply this globally. If the name list alone is wrong, look at that
 * path: the writer is configured `font "Arial", fontSize 12` in
 * `CUIComponentPage.construct` and then `CScale9Grid.render` overwrites the
 * size with the layout's `TXTSIZE` (15). Whether Director honoured that
 * override for a shared writer member is the question worth answering, and it
 * is answerable from the shipped Lingo rather than by guessing at units.
 */
/** Director stores alignment as `#left` / `"center"`; canvas wants the bare word. */
function canvasAlign(value: string | undefined): "left" | "center" | "right" {
  const name = String(value ?? "left").replace("#", "").toLowerCase();
  return name === "center" || name === "right" ? name : "left";
}

/**
 * Draw one line the way Director draws text with `the antiAlias` OFF: binary
 * coverage, no partial pixels.
 *
 * ⚠ THIS IS NOT THE REMOVED "SHARPENING PASS", and the difference matters.
 * That one thresholded EVERY caption, inventing a transform Director has no
 * equivalent of, and it visibly boldened the buttons. This runs only for a run
 * whose member actually has `antiAlias` cleared — which VMK does per element
 * from the component XML's ANTIALIAS attribute (absent = VOID = off). The
 * registration name rows are that case; the Folio buttons are NOT, so they keep
 * their smooth edges.
 *
 * A half-covered pixel is either in or out, which is what a non-antialiasing
 * rasteriser produces; 128 is the midpoint of the coverage range.
 */
function fillTextAliased(
  target: RenderTarget,
  text: string,
  x: number,
  y: number,
  font?: string,
  size?: number,
  /**
   * Whether the run is genuinely aliased. When an atlas is unavailable, an
   * ANTIALIASED run must fall back to ordinary `fillText` — sending it through
   * the supersampled binary path below would strip smoothing Director keeps.
   */
  aliased = true,
): void {
  /**
   * ⚠ A HINTED ATLAS FIRST, when one exists for this face and size.
   *
   * Everything below reproduces the WEIGHT of an aliased rasteriser but not the
   * SHAPES, because canvas cannot grid-fit. `lingo-glyph-atlas` supplies glyphs
   * rasterised through the same GDI Director used; this path stays as the
   * fallback for faces with no atlas.
   */
  const atlas = size ? atlasFor(font, size) : null;
  if (atlas) {
    const holder = target as unknown as { fillStyle?: string; textAlign?: string; font?: string };
    const drawn = drawAtlasText(
      target as { drawImage(image: unknown, ...rest: number[]): void },
      atlas, text, x, y,
      holder.fillStyle ?? "#000000",
      holder.textAlign ?? "left",
      (ch) => target.measureText?.(ch)?.width ?? 0,
      holder.font,
    );
    if (drawn) return;
  }
  if (!aliased) { target.fillText?.(text, x, y); return; }

  const measured = target.measureText?.(text);
  const width = Math.ceil(measured?.width ?? 0);
  if (!target.fillText || width <= 0) {
    target.fillText?.(text, x, y);
    return;
  }
  const ascent = Math.ceil(measured?.fontBoundingBoxAscent ?? 0) || 0;
  const descent = Math.ceil(measured?.fontBoundingBoxDescent ?? 0) || 0;
  // A margin so an overhanging glyph edge is not clipped by the scratch itself.
  const pad = 2;
  const w = width + pad * 2;
  const h = ascent + descent + pad * 2;
  if (h <= 0) { target.fillText(text, x, y); return; }

  /**
   * ⚠ SAMPLE THE PIXEL CENTRE — do NOT threshold coverage at 50%.
   *
   * A non-antialiasing rasteriser asks "is the centre of this pixel inside the
   * outline", which is what the even-odd scanline filler in
   * `tools/shockwave/pfr-testbed/pfr_full.py` does. Thresholding canvas'
   * COVERAGE instead makes text visibly BOLDER, because at 15px most partial
   * pixels sit above half coverage and every one of them rounds up — measured
   * as 2px stems where the original has 1px. That is the same bolding the
   * removed sharpening pass produced, arriving by a different route.
   *
   * Rendering at SUPERSAMPLE x and reading the middle subpixel of each output
   * pixel's block IS the centre test, with the glyph rasterised once by the
   * font engine rather than re-implemented here.
   */
  const SUPERSAMPLE = 8;
  const scratch = document.createElement("canvas");
  scratch.width = w * SUPERSAMPLE;
  scratch.height = h * SUPERSAMPLE;
  const sx = scratch.getContext("2d");
  if (!sx) { target.fillText(text, x, y); return; }
  const holder = target as unknown as { font?: string; fillStyle?: string; textAlign?: string };
  sx.scale(SUPERSAMPLE, SUPERSAMPLE);
  sx.font = holder.font ?? "";
  sx.fillStyle = holder.fillStyle ?? "#000000";
  // Anchoring is done by the BLIT below, so the scratch always draws left-aligned.
  sx.textAlign = "left";
  /**
   * ⚠ ONE GLYPH AT A TIME, EACH ON AN INTEGER PEN POSITION.
   *
   * Handing the whole string to `fillText` lets every glyph after the first sit
   * at a FRACTIONAL x, so the centre test above samples a different sub-position
   * per glyph and stems come out 1px here and 2px there — letterforms that look
   * hand-mangled even though the weight is right on average.
   *
   * Director advances the pen in whole pixels (DirPlayer sums advances `as i32`
   * in `rendering.rs`), so every glyph is rasterised on the same pixel phase.
   * The advance is ACCUMULATED unrounded and only the draw position is rounded,
   * which keeps the string's total width identical to `measureText` — the
   * button boxes are authored against that width and must not overflow.
   */
  let pen = pad;
  for (const ch of text) {
    sx.fillText(ch, Math.round(pen), ascent + pad);
    pen += sx.measureText(ch).width;
  }

  let hi: ImageData;
  try {
    hi = sx.getImageData(0, 0, w * SUPERSAMPLE, h * SUPERSAMPLE);
  } catch {
    target.fillText(text, x, y);
    return;
  }
  const flat = document.createElement("canvas");
  flat.width = w;
  flat.height = h;
  const fx = flat.getContext("2d");
  if (!fx) { target.fillText(text, x, y); return; }
  const out = fx.createImageData(w, h);
  const half = SUPERSAMPLE >> 1;
  for (let py = 0; py < h; py++) {
    for (let pxi = 0; pxi < w; pxi++) {
      const srcX = pxi * SUPERSAMPLE + half;
      const srcY = py * SUPERSAMPLE + half;
      const s = (srcY * w * SUPERSAMPLE + srcX) * 4;
      const t = (py * w + pxi) * 4;
      /**
       * ⚠ THE CENTRE SUBPIXEL MUST BE FULLY COVERED, not merely half.
       *
       * "Is the pixel CENTRE inside the outline" is a point test. Discretised
       * onto a subpixel, a PARTIALLY covered centre means the outline runs
       * through the centre region — ambiguous — and counting those as ink makes
       * every stem fatter, so neighbouring letters merge. Measured against a
       * native-res capture of the original, ink pixels per character (reference
       * 14.1):
       *
       *     S=4  >=128   19.3   +36.4%   <- letters bled together
       *     S=4  >=250   13.1    -7.5%
       *     S=8  >=250   14.8    +4.7%   <- this
       *     S=16 >=250   15.6   +10.3%
       */
      const inside = hi.data[s + 3] >= 250;
      out.data[t] = hi.data[s];
      out.data[t + 1] = hi.data[s + 1];
      out.data[t + 2] = hi.data[s + 2];
      out.data[t + 3] = inside ? 255 : 0;
    }
  }
  fx.putImageData(out, 0, 0);

  // Put the line back where `fillText(text, x, y)` would have placed it.
  const align = holder.textAlign ?? "left";
  // Floor, matching Director's integer division — see the note in
  // `lingo-glyph-atlas`'s `drawAtlasText`.
  const left = align === "center" ? x - width / 2 : align === "right" ? x - width : x;
  target.drawImage(flat, Math.floor(left) - pad, Math.round(y) - ascent - pad);
}

export function substituteFont(directorFont: string | undefined): string {
  const name = (directorFont ?? "").replace(/\s*\*\s*$/, "").trim();
  for (const [pattern, stack] of FONT_SUBSTITUTES) {
    if (pattern.test(name)) return stack;
  }
  return name === "" ? "sans-serif" : `"${name}", sans-serif`;
}

/**
 * ⚠ TEXT IS DRAWN WITH A PLAIN `fillText`, AND A "SHARPENING" PASS WAS TRIED
 * HERE AND REMOVED. Do not add another one.
 *
 * Our faces are unhinted — PFR's `orus` control values ARE the stem edges and
 * the PFR->TTF conversion drops them, so at UI sizes most of the ink is
 * partial-coverage grey (measured: 58% at 15px Folio, 23% at 54px). That is a
 * real difference from Shockwave, but pushing glyph COVERAGE toward solid is
 * NOT what Director does — it invents a transform Director has no equivalent
 * of, and it visibly BOLDENS small text, because at 15px most partial pixels
 * sit above half coverage and all round up.
 *
 * The faithful fix is to rasterise glyphs the way Director did, from the PFR
 * outlines with its own grid-fitting: `tools/shockwave/pfr-testbed` already
 * decodes and rasterises them (run it as `PFR_VARIANT=snap`, the shipped
 * behaviour and the only variant that passes the x-extent invariant). Generate
 * a glyph atlas at the sizes VMK uses and blit it. Source of truth first.
 */

/** How a sprite was drawn. Recorded headlessly so ordering can be asserted. */
export interface DrawRecord {
  channel: number;
  member: string;
  x: number;
  y: number;
  width: number;
  height: number;
  alpha: number;
  ink: number;
  /** Mirror flags — see `SpriteChannel.flipH`. Applied in `paint`. */
  flipH?: boolean;
  flipV?: boolean;
  /**
   * The registration point in SCREEN coordinates (`x + regPoint`), i.e. where
   * `loc` landed. `flipH`/`flipV` mirror about THIS point, not the box centre —
   * see `blitMirrored`.
   */
  pivotX?: number;
  pivotY?: number;
  /** Set when the sprite drew a flat-filled buffer. */
  fill?: string;
  /** Set when the sprite drew a text member rather than a bitmap. */
  text?: string;
}

/**
 * Director ink modes. Only the ones the framework casts actually set are
 * mapped; anything else falls back to `copy` rather than guessing, because a
 * wrong ink is a subtle visual bug rather than a crash.
 */
export const INK_COPY = 0;
export const INK_MATTE = 8;
export const INK_BACKGROUND_TRANSPARENT = 36;
export const INK_DARKEN = 41;

/**
 * Builds an ink-adjusted drawable for a member.
 *
 * Injected because the transform needs pixel access — `OffscreenCanvas` in the
 * browser — which the compositor deliberately does not depend on. Returning
 * `undefined` means "no variant available"; the member's plain image is used,
 * which degrades to `copy` ink rather than failing to draw.
 */
export type InkPreparer = (member: CastMember, ink: number) => unknown | undefined;

export class Stage {
  private readonly drawn: DrawRecord[] = [];
  /**
   * Where each editable field's text ENDED this frame, as the draw laid it out
   * (wrap included) — the caret's position. See `drawCaret`.
   */
  private readonly textEnds = new Map<number, { x: number; baseline: number; ascent: number; descent: number }>();

  /**
   * `the bgColor of the stage`. Black is Director's default and VMK's: the game
   * window is black behind everything the movie draws.
   */
  bgColor = "#000000";

  /**
   * Diagnostic hook, called for every occupied channel each frame.
   *
   * Exists so a probe can be armed IN SOURCE, before the first frame — see the
   * note in `boot-client.ts`. Left undefined in normal operation, so it costs
   * one property read per channel.
   */
  onFirstDraw?: (channel: SpriteChannel, member: CastMember) => void;

  constructor(
    private readonly registry: CastRegistry,
    readonly width = 800,
    readonly height = 600,
    private readonly prepareInk?: InkPreparer,
    /**
     * `the lastChannel` — how many sprite channels the score has.
     *
     * Not declared anywhere in VMK's config, so it comes from the movie itself.
     * `CMgrSprite.preIndexChannels` walks `1..the lastChannel` to build its
     * free-channel pool, so with the property unset it builds an empty pool and
     * `reserveSprite` fails with "Out of free sprite channels!" — a real error,
     * but one that reads like a resource leak rather than a missing property.
     *
     * ⚠ 150 WAS TOO SMALL, and the symptom was not "out of sprites" where you
     * would look for it. A busy room legitimately holds most of the pool, so the
     * NEXT thing to ask for channels failed instead:
     *
     *     error: Out of free sprite channels! (#reserveSprite)
     *     error: Failed to build window. System out of sprites! (#buildVisual)
     *
     * which is the navigator opening as an empty blue panel — chrome and tabs
     * already allocated, content unable to get channels. It then surfaced a
     * SECOND time in disguise: `reserveSprite` answers 0 when the pool is dry,
     * so `CRegPageBase.SetTabs` received 0 where a sprite belonged and threw
     * "Lingo method not found: hide on number" one call later.
     *
     * MEASURED in the Esplanade: 150 total with only 7 free while the room was
     * idle, and toggling the navigator returned 18 — so the release path was
     * working correctly the whole time and this was never a leak.
     *
     * 1000 is Director's maximum channel count and what LibreShockwave's own
     * reader answers for a movie with no explicit config (`DirectorFile::
     * channelCount`). Channels are created lazily by `CastRegistry.sprite`, so
     * this sizes the POOL, not an allocation — an unused channel costs nothing.
     */
    readonly lastChannel = 1000,
  ) {}

  /**
   * The drawable for a channel, honouring its ink.
   *
   * ⚠ Director bitmaps carry no alpha — the extracted PNGs are RGBA with every
   * pixel opaque — so `backgroundTransparent` is not a blend mode we can hand
   * to the canvas. It has to knock out the background colour in the pixels,
   * which is why this goes through a preparer and a cache rather than a
   * `globalCompositeOperation`.
   */
  /** Cached stencil recolour: `key` is colour + revision + size, `image` the result. */
  private readonly tintCache = new WeakMap<object, { key: string; image: unknown }>();

  /**
   * `the bgColor of sprite` RECOLOURS A STENCIL — Director's colourise.
   *
   * ⚠ VMK's chat bubble is drawn this way and nothing else supplies its colour.
   * `CRoomChatOutputMgr._RenderChat` (and `CAvatarRenderer.ShowName`) do exactly
   * one thing to tint a bubble:
   *
   *     setThePropOf(getProperty(getElement(bubble,"bubble.color"), #sprite),
   *                  "bgColor", a_rChat.color)
   *
   * The `bubble.color` element is the OUTLINE layer — `bubble.tile.outline`,
   * the left/right caps, and `bubble.spike.outline`, which is the TAIL. Decoded
   * from the extracted PNGs, that art is a STENCIL: every shape pixel is
   * 254,254,254 against pure 255, with a few anti-aliased greys at the rounded
   * corners. Drawn as-is it is near-white on a cream bubble
   * (`bubble.tile` is 239,240,226) and simply disappears, tail included.
   *
   * Two independent ports of this same engine agree on the rule:
   *
   *   DirPlayer (`vm-rust/src/player/bitmap/drawing.rs`)
   *     "Director tints source-white pixels with bg_color on copy ink"
   *   MyCoke (`src/scenes/ChatScene.ts`), on the identical Coke Studios bubble
   *     "Legacy copyPixels(..., [#bgColor: cColor]) effectively *recolors* the
   *      segment to a flat RGB while preserving the source alpha shape"
   *
   * so this is the flat recolour-through-the-shape both describe, which is
   * MyCoke's `colorizeImageBitmapByAlpha`.
   *
   * ⚠ GATED ON THE ART BEING A STENCIL, because VMK sets `bgColor` all over the
   * UI on sprites that carry real artwork (see the swatch note in `render`) and
   * flat-filling those would repaint the interface. A stencil is the one case
   * where the source RGB carries no information: every opaque pixel near-white.
   * Real art never satisfies that, so it cannot be reached by accident.
   */
  private tintedStencil(
    member: CastMember,
    drawable: unknown,
    bg: { red?: unknown; green?: unknown; blue?: unknown } | undefined,
  ): unknown {
    if (!bg || typeof bg.red !== "number" || typeof bg.green !== "number" ||
        typeof bg.blue !== "number") {
      return drawable;
    }
    const { red, green, blue } = bg;
    // White is VMK's "no colour"; black is the unset default. Neither tints.
    if (red === 255 && green === 255 && blue === 255) return drawable;
    if (red === 0 && green === 0 && blue === 0) return drawable;

    const src = drawable as CanvasImageSource & { width?: number; height?: number };
    const width = Number(src?.width);
    const height = Number(src?.height);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) {
      return drawable;
    }
    if (typeof OffscreenCanvas === "undefined") return drawable;

    const revision = member.image instanceof LingoImage ? member.image.revision : 0;
    const key = `${String(red)},${String(green)},${String(blue)}|${String(revision)}|${String(width)}x${String(height)}`;
    const cached = this.tintCache.get(member);
    if (cached?.key === key) return cached.image;

    let result: unknown = drawable;
    try {
      const probe = new OffscreenCanvas(width, height);
      const pctx = probe.getContext("2d");
      if (!pctx) return drawable;
      pctx.drawImage(src, 0, 0);
      const image = pctx.getImageData(0, 0, width, height);
      const pixels = image.data;
      /**
       * ⚠ THE GATE MUST TOLERATE ANTI-ALIASING. The caps are not flat 254 —
       * `bubble.left.outline` decodes to 254 / 253 / 236 / 230 / 197 / 255, the
       * rounded corner's ramp. Requiring every pixel near-white rejected the
       * very art this exists for. What actually distinguishes a stencil is that
       * it is NEUTRAL GREY and near-white on AVERAGE; real UI art has colour.
       */
      let opaque = 0;
      let total = 0;
      let neutral = true;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3]! < 8) continue;
        const r = pixels[i]!;
        const g = pixels[i + 1]!;
        const b = pixels[i + 2]!;
        if (Math.abs(r - g) > 6 || Math.abs(g - b) > 6 || Math.abs(r - b) > 6) {
          neutral = false;
          break;
        }
        total += (r + g + b) / 3;
        opaque++;
      }
      if (neutral && opaque > 0 && total / opaque >= 235) {
        /**
         * DirPlayer's ramp, verbatim in effect: treat the source as greyscale
         * intensity and remap along fg -> bg. Only `bgColor` is set here, so the
         * implicit counterpart is black, which is what makes the anti-aliased
         * corner pixels come out as a DARKER shade of the same colour instead
         * of a hard edge.
         *
         *     t = gray / 255
         *     out = (1 - t) * fg + t * bg
         */
        for (let i = 0; i < pixels.length; i += 4) {
          if (pixels[i + 3]! < 8) continue;
          const t = ((pixels[i]! + pixels[i + 1]! + pixels[i + 2]!) / 3) / 255;
          pixels[i] = Math.round(t * red);
          pixels[i + 1] = Math.round(t * green);
          pixels[i + 2] = Math.round(t * blue);
        }
        const out = new OffscreenCanvas(width, height);
        const octx = out.getContext("2d");
        if (octx) {
          octx.putImageData(image, 0, 0);
          result = out;
        }
      }
    } catch {
      // A tainted or zero-sized buffer: leave the art alone.
      return drawable;
    }
    // Cache the decision either way, so a non-stencil is analysed once.
    this.tintCache.set(member, { key, image: result });
    return result;
  }

  /** Separate cache: a member can be darkened in one channel and colourised in another. */
  private readonly colorizeCache = new WeakMap<object, { key: string; image: unknown }>();

  /**
   * `the color of sprite` — Director's COLOURISE: the art is remapped along the
   * ramp foreground → background, dark pixels toward `color`, light toward
   * `bgColor` (white when unset). Black foreground + white background is the
   * identity, which is every sprite that never sets a colour.
   *
   * ⚠ NOTHING DREW IT BEFORE. Seen on the Haunted Mansion door race:
   * `CHMDoor.activateVortex` sets `m_rVortex.color = rgb("#40FF31")` (green
   * team) / `#FF5AB7` (purple) with blend 80, ink 33, so the team that found
   * the right door sees its vortex change colour — the game's only clue which
   * door to take ("it changes color and you should enter that door", help
   * page 7). The sprite carried the colour; every vortex still drew purple.
   *
   * Only bitmap sprites with an explicit non-black colour take this path.
   */
  private colorizeSprite(
    member: CastMember,
    drawable: unknown,
    fg: ColorLike | undefined,
    bg: ColorLike | undefined,
  ): unknown {
    if (!fg || typeof fg.red !== "number" || typeof fg.green !== "number" || typeof fg.blue !== "number") {
      return drawable;
    }
    if (fg.red === 0 && fg.green === 0 && fg.blue === 0) return drawable;
    const hasBg = !!bg && typeof bg.red === "number" && typeof bg.green === "number" && typeof bg.blue === "number";
    const [br, bgG, bb] = hasBg ? [bg!.red as number, bg!.green as number, bg!.blue as number] : [255, 255, 255];
    // Director's default sprite bgColor is white; VMK's unset one reads black — treat both as white here.
    const [r1, g1, b1] = br === 0 && bgG === 0 && bb === 0 ? [255, 255, 255] : [br, bgG, bb];

    const src = drawable as CanvasImageSource & { width?: number; height?: number };
    const width = Number(src?.width);
    const height = Number(src?.height);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) return drawable;
    if (typeof OffscreenCanvas === "undefined") return drawable;

    const revision = member.image instanceof LingoImage ? member.image.revision : 0;
    const key = `${fg.red},${fg.green},${fg.blue}|${r1},${g1},${b1}|${revision}|${width}x${height}`;
    const cached = this.colorizeCache.get(member);
    if (cached?.key === key) return cached.image;

    let result: unknown = drawable;
    try {
      const out = new OffscreenCanvas(width, height);
      const ctx = out.getContext("2d");
      if (!ctx) return drawable;
      ctx.drawImage(src, 0, 0);
      const image = ctx.getImageData(0, 0, width, height);
      const p = image.data;
      for (let i = 0; i < p.length; i += 4) {
        const t = (p[i]! * 0.299 + p[i + 1]! * 0.587 + p[i + 2]! * 0.114) / 255;
        p[i] = Math.round(fg.red + (r1 - fg.red) * t);
        p[i + 1] = Math.round(fg.green + (g1 - fg.green) * t);
        p[i + 2] = Math.round(fg.blue + (b1 - fg.blue) * t);
      }
      ctx.putImageData(image, 0, 0);
      result = out;
    } catch {
      return drawable;
    }
    this.colorizeCache.set(member, { key, image: result });
    return result;
  }

  /**
   * DARKEN (ink 41) on a BITMAP sprite — tint the source by its `bgColor`,
   * exactly as image-to-image `copyPixels` does (lingo-builtins `darkenTint`).
   *
   * ⚠ THIS IS HOW VMK COLOURS FURNITURE. A colour furni layers a grayscale tint
   * sprite in Darken over the base — e.g. the guest-room green item_41 has a
   * second `_2_0` sprite at INK 41, BGC 2AFF1B. The room compositor only ever
   * applied `bgColor` as a tint in the window-BUFFER branch (`tintedStencil`);
   * the BITMAP branch that draws furni skipped it, so the tint layer fell through
   * to a plain blit — the item lost its colour and, on the dark space room, the
   * uncoloured grey layer looked missing/transparent.
   *
   * Unlike `tintedStencil` this is NOT gated on the source being a neutral, light
   * stencil: Darken always means "multiply the source by this colour" and
   * `copyPixels` applies it unconditionally, so a darker or already-tinted mask
   * still tints correctly. Multiply = per-channel source*bg/255 (white→bg,
   * black→black, greys ramp between), then `destination-in` re-masks by the
   * source's own alpha so the fillRect does not square off the sprite.
   */
  private darkenSprite(
    member: CastMember,
    drawable: unknown,
    bg: { red?: unknown; green?: unknown; blue?: unknown } | undefined,
  ): unknown {
    if (!bg || typeof bg.red !== "number" || typeof bg.green !== "number" ||
        typeof bg.blue !== "number") {
      return drawable;
    }
    const { red, green, blue } = bg;
    // White is Director's multiply identity; black is VMK's unset default. Skip both.
    if (red === 255 && green === 255 && blue === 255) return drawable;
    if (red === 0 && green === 0 && blue === 0) return drawable;

    const src = drawable as CanvasImageSource & { width?: number; height?: number };
    const width = Number(src?.width);
    const height = Number(src?.height);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) {
      return drawable;
    }
    if (typeof OffscreenCanvas === "undefined") return drawable;

    const revision = member.image instanceof LingoImage ? member.image.revision : 0;
    const key = `darken|${String(red)},${String(green)},${String(blue)}|${String(revision)}|${String(width)}x${String(height)}`;
    const cached = this.tintCache.get(member);
    if (cached?.key === key) return cached.image;

    let result: unknown = drawable;
    try {
      const out = new OffscreenCanvas(width, height);
      const octx = out.getContext("2d");
      if (!octx) return drawable;
      octx.drawImage(src, 0, 0);
      octx.globalCompositeOperation = "multiply";
      octx.fillStyle = `rgb(${String(red)},${String(green)},${String(blue)})`;
      octx.fillRect(0, 0, width, height);
      octx.globalCompositeOperation = "destination-in";
      octx.drawImage(src, 0, 0);
      result = out;
    } catch {
      return drawable;
    }
    this.tintCache.set(member, { key, image: result });
    return result;
  }

  private drawableFor(member: CastMember, ink: number): { image: unknown; cropped: boolean } {
    /**
     * ⚠ BEFORE the copy-ink shortcut, not after.
     *
     * `refreshFromSources` re-runs any copy whose source has changed since it
     * was made, which is how a partially-composed element finishes itself once
     * the rest of its art downloads. Plenty of elements draw with COPY ink —
     * `human.preview.img` and `reg.namelist` among them — so putting this after
     * the early return would leave exactly those stuck at their first frame.
     */
    if (member.image instanceof LingoImage) {
      // About to be drawn, so its art is genuinely wanted — see
      // `LingoImage.needSource`. Cast art is fetched on demand, and a sprite
      // pointed straight at a member (rather than at a composed buffer) is the
      // one path that never issues a `copyPixels` to ask for it.
      member.image.requestSource();
      member.image.refreshFromSources();
    }

    if (ink === INK_COPY || member.image === VOID) {
      return { image: member.image, cropped: false };
    }

    /**
     * ⚠ A CACHED VARIANT IS ONLY VALID FOR THE PIXELS IT WAS MADE FROM.
     *
     * Window element buffers are written long after they are first drawn —
     * `CWindowCommonButton.render` fills the buffer and then copies the button
     * art into it — so caching by `ink` alone served the first result forever.
     *
     * MEASURED: the arrows' cached variant was a 355x191 fully-transparent
     * canvas (the group-sized blank `buildVisual` allocates) while the member
     * had long since become the real 14x16 arrow. The sprite faithfully drew a
     * cached nothing, and no count or visibility flag showed anything wrong.
     *
     * `LingoImage.revision` counts writes; a mismatch means recompute.
     */
    // Already refreshed above, so this revision is the settled one.
    const source = member.image;
    const revision = source instanceof LingoImage ? source.revision : 0;
    const cached = member.inkVariants.get(ink);
    /**
     * ⚠ THE SOURCE OBJECT MUST MATCH TOO, not just the revision.
     *
     * `revision` counts writes within ONE `LingoImage`; `feedImage` replaces a
     * member's image with a different object entirely, and the new object's
     * counter can land on the same number the cache recorded. See
     * `CastMember.inkVariantSource` for the measured case — a 224x36
     * transparent variant served against a 14x16 arrow, both at revision 4.
     */
    if (
      cached !== undefined &&
      member.inkVariantRevision.get(ink) === revision &&
      member.inkVariantSource.get(ink) === source
    ) {
      return { image: cached, cropped: cached !== member.image };
    }

    const prepared = this.prepareInk?.(member, ink);
    const drawable = prepared ?? member.image;
    /**
     * ⚠ Only cache a variant we actually PRODUCED.
     *
     * Cast art loads asynchronously, so a preparer asked before the pixels
     * arrive can only answer "not yet". Caching that answer freezes the sprite
     * as un-inked for the rest of the session — it would draw its background
     * box forever, having been one frame early.
     */
    if (prepared !== undefined) {
      member.inkVariants.set(ink, drawable);
      member.inkVariantRevision.set(ink, revision);
      member.inkVariantSource.set(ink, source);
    } else if (source instanceof LingoImage && source.hasRaster) {
      /**
       * ⚠ CACHE "NO INK VARIANT NEEDED" TOO — the decisive perf fix for the
       * shop, catalogue and any matte/background-transparent chrome.
       *
       * `prepareInk` returns undefined for TWO different reasons: the art has
       * not been fetched yet (must retry next frame), OR the art is present but
       * this member needs no keying (ink 8/36 whose border carries no key — an
       * already-transparent matte piece). Only the FIRST was ever cached, so
       * every no-keying sprite re-ran `prepareInk` every frame — and each run is
       * a `getImageData`, a GPU→CPU readback. MEASURED opening the shop: 8019
       * `prepareInk` calls in one open, ALL undefined, ≈11.5s of `getImageData`.
       *
       * Cache the decision as "draw the member's image raw" (identity), keyed on
       * the SAME revision/source as a real variant, so it invalidates the moment
       * the image changes and recomputes exactly once. Gated on `hasRaster` so a
       * not-yet-loaded member (`source === null`) is NOT cached and still retries
       * when its pixels arrive — the async-load guard the comment above relies on.
       */
      member.inkVariants.set(ink, member.image);
      member.inkVariantRevision.set(ink, revision);
      member.inkVariantSource.set(ink, source);
    }
    // ⚠ A prepared variant is already cut down to the member's frame, so it
    // must NOT then be sampled at the atlas's coordinates. Getting this wrong
    // reads empty pixels from outside the small canvas and the sprite vanishes
    // while every count still says it drew.
    return { image: drawable, cropped: prepared !== undefined };
  }

  /** Channels that currently hold a member, in ascending channel order. */
  /**
   * Occupied channels, in DRAWING order.
   *
   * ⚠ Ordered by `locZ`, not by channel number. Director composites in locZ
   * order — the channel is only where a sprite lives, not what covers what —
   * and VMK expresses ALL of its window stacking through it:
   * `CMgrWindow.Activate` stamps a running counter onto every sprite of every
   * window, in `pItemList` (activation) order, every time any window is
   * created, removed or raised.
   *
   * Compositing in channel order instead meant that ordering was simply
   * discarded, and windows layered by whatever channels `CMgrSprite` happened
   * to hand out — which is allocation order, not activation order, and diverges
   * as soon as a window is closed and its channels recycled.
   *
   * `locZ` defaults to the channel number (see `SpriteChannel`), so a movie
   * that never assigns it draws exactly as it did before. The channel number
   * breaks ties, keeping the sort stable and deterministic.
   */
  activeChannels(): SpriteChannel[] {
    const channels: SpriteChannel[] = [];
    for (let index = 1; index <= 1000; index++) {
      const channel = this.registry.sprite(index) as SpriteChannel;
      if (channel.member && !channel.member.isEmpty) channels.push(channel);
    }
    return channels.sort((a, b) => a.locZ - b.locZ || a.spriteNum - b.spriteNum);
  }

  /**
   * The channel Director would send keystrokes to.
   *
   * ⚠ `the keyboardFocusSprite` HAS THREE STATES, NOT TWO, and the third is the
   * DEFAULT:
   *
   *      n   that sprite holds focus
   *      0   nothing holds focus — typing goes nowhere
   *     -1   AUTOMATIC (Director's default): the lowest-numbered editable
   *          field on the stage takes the keys
   *
   * Treating -1 the same as 0 made the in-room chat bar completely dead. VMK
   * never focuses it on room entry — `CMessageBar.setEditable(1)` only calls
   * `setEdit`, which sets `the editable of member/sprite` and nothing else —
   * because Director's automatic mode already routes to it. VMK writes the
   * property only to REVOKE and RESTORE around modal UI:
   *
   *     CMessageBar.setEditable(0)          setFocus(chat.field, 0)
   *     CSettingsPageBase.CloseSettings     setFocus(chat.field, 1)
   *     CQuestTemplateDataContainer         0 on construct, 1 on deconstruct
   *
   * so with -1 collapsed to "no focus" the player could type only after
   * clicking the bar, and never at all on entering a room.
   */
  keyboardFocusChannel(): SpriteChannel | null {
    const focus = Number(theProperty("keyboardFocusSprite"));
    if (!Number.isFinite(focus) || focus === 0) return null;
    if (focus > 0) {
      for (const channel of this.activeChannels()) {
        if (Number(channel.spriteNum) === focus) return channel;
      }
      return null;
    }
    let best: SpriteChannel | null = null;
    for (const channel of this.activeChannels()) {
      const member = channel.member;
      if (!member || member.kind !== "field" || !member.editable) continue;
      /**
       * ⚠ A HIDDEN field must not auto-grab focus. `visible = 0` keeps the
       * channel occupied (see render()), so a field the page has hidden — e.g.
       * the Guest-Rooms search box on the Friends'/Own tabs, which
       * SetVisibleElements hides — is still an active channel. Without this
       * guard it becomes the lowest editable field and draws a blinking caret
       * on a tab that has no search box. Keys route, and the caret shows, only
       * for a field actually on screen.
       */
      if (!channel.visible) continue;
      if (!best || Number(channel.spriteNum) < Number(best.spriteNum)) best = channel;
    }
    return best;
  }

  /**
   * Composites every occupied channel. Returns what was drawn, in order, so a
   * caller can assert on it without inspecting pixels.
   *
   * ⚠ `visible = 0` skips drawing but keeps the channel occupied — Director
   * treats visibility and occupancy separately, and code that counts sprites
   * relies on that.
   */
  /** The canvas context the page last painted into — see `the stage.image`. */
  lastTarget?: RenderTarget;

  render(target?: RenderTarget): DrawRecord[] {
    if (target) this.lastTarget = target;
    this.drawn.length = 0;
    this.textEnds.clear();
    target?.clearRect(0, 0, this.width, this.height);
    /**
     * ⚠ Paint the stage's own background, do not just clear to transparent.
     *
     * Director's stage HAS a colour and VMK's is black; clearing alone let
     * whatever the page put behind the canvas show through, so the game window
     * came out the host page's grey instead of black. `the stage.bgColor` is
     * also read by VMK itself (`Loading_Bar_Class.construct` seeds its
     * background from it), so this is the same value in both directions.
     */
    if (target?.fillRect) {
      target.globalAlpha = 1;
      target.fillStyle = this.bgColor;
      target.fillRect(0, 0, this.width, this.height);
    }

    for (const channel of this.activeChannels()) {
      /**
       * ⚠ Called for every occupied channel, BEFORE the `visible` test.
       *
       * A member that is placed but invisible has still been "drawn" as far as
       * the window engine is concerned, and telling that apart from a member
       * that never reached a channel at all is exactly the distinction this
       * hook exists for. Skipping invisible sprites here would collapse the two
       * cases the probe is meant to separate.
       */
      if (this.onFirstDraw && channel.member) this.onFirstDraw(channel, channel.member);
      if (!channel.visible) continue;

      const member = channel.member;
      const alpha = Math.max(0, Math.min(100, channel.blend)) / 100;
      /**
       * ⚠ `the loc of sprite` is its REGISTRATION POINT, not its top-left.
       *
       * Director registers an imported bitmap at its CENTRE, so a sprite placed
       * at the middle of the stage draws from `loc - regPoint`. Treating `loc`
       * as the top-left offsets every such sprite by half its own size — the
       * boot logo, which `showLogo` centres explicitly with
       * `point(stage.width/2, …)`, landed half its width right and half its
       * height low.
       *
       * Window element buffers are the other case and must keep working: VMK
       * sets `regPoint = point(0, 0)` on them (`CWindowImageWrapper.ResizeBy`),
       * which is exactly top-left placement and falls out of the same formula.
       */
      const registration = member.regPoint;
      /**
       * ⚠ A STRETCHED SPRITE STRETCHES ITS REGISTRATION POINT TOO.
       *
       * Director scales the sprite rect about `loc`: setting `width`/`height`
       * moves the reg point proportionally. Using the member's unscaled reg
       * point shifted every shrunk sprite toward its reg corner — magic effects
       * are resized by the room's tile scale (`CMagicFactor.SetMagicLocation`:
       * `width = member.width * m_iTileSize / 32`), so in far-away rooms the
       * pirate sparkles (70x134, reg 35,114) rode up to the avatar's waist
       * while close-up rooms looked right.
       */
      const scaleX = channel.stretchWidth !== undefined && member.width > 0
        ? channel.drawWidth / member.width : 1;
      const scaleY = channel.stretchHeight !== undefined && member.height > 0
        ? channel.drawHeight / member.height : 1;
      const record: DrawRecord = {
        channel: channel.spriteNum,
        member: member.name,
        x: channel.locH - registration.locH * scaleX,
        y: channel.locV - registration.locV * scaleY,
        width: channel.drawWidth,
        height: channel.drawHeight,
        alpha,
        ink: channel.ink,
        flipH: !!channel.flipH,
        flipV: !!channel.flipV,
        // `loc` in screen space — the point `flipH`/`flipV` mirror about. Equals
        // `x + regPoint` (x is already `loc - regPoint`). See `blitMirrored`.
        pivotX: channel.locH,
        pivotY: channel.locV,
      };
      this.drawn.push(record);

      /**
       * `the bgColor of sprite` — a flat fill behind the sprite's art.
       *
       * ⚠ This is not decoration; for some elements it IS the content. VMK's
       * colour swatches carry no artwork at all and are painted purely by
       * assigning the sprite a colour:
       *
       *   CRegPage1.updatePartColorPreview
       *     setThePropOf(getProperty(getElement(wnd, "part.color.hr.preview"),
       *                              #sprite), "bgColor", tColor)
       *
       * The channel property existed and nothing ever read it, so the hair and
       * skin colour swatches on the registration page drew nothing whatsoever —
       * measured as `hasSrc: false` with no text, a 36x36 hole.
       *
       * Painted BEFORE the art so a sprite that has both gets the fill as a
       * background. VOID is the default, so only sprites VMK explicitly
       * coloured are touched and nothing else changes.
       */
      const spriteBg = channel.bgColor as { red?: unknown; green?: unknown; blue?: unknown } | undefined;
      /**
       * ⚠ ONLY WHEN THE SPRITE HAS NOTHING ELSE TO DRAW.
       *
       * For a BITMAP sprite `bgColor` is not a fill at all — it is the colour
       * that background-transparent ink (36) knocks out, and VMK sets it all
       * over the UI. Painting it unconditionally covered the panel in white
       * rectangles: over the avatar, the slot previews, the name field and the
       * GIRL/BOY rows, all of which carry real art and merely declare a
       * background.
       *
       * The swatch case is the one where the fill IS the content: no pixels and
       * no text, so nothing else would ever be drawn.
       */
      /**
       * ⚠ "Has text" must include the BUFFER's text, not just the member's.
       *
       * A composed window caption carries its string on the element's image
       * buffer (`copyPixels` moves it there — see `LingoImage.isTextRender`),
       * and `member.text` for those elements is empty. Checking only the member
       * treated every such caption as contentless and painted a white rectangle
       * behind it — "Type a name", "Or choose below" and the customize hint all
       * gained a white box on the orange panel.
       */
      const bufferText = member.image instanceof LingoImage ? member.image.text : "";
      /**
       * ⚠ WHITE IS NOT CONTENT — it is VMK's "nothing special" sentinel, and
       * treating it as a fill greys out the entire game.
       *
       * MEASURED during the clothes load, three sprites match "no art, no
       * text, has a bgColor":
       *
       *     modal_modal   800x600 at 0,0   bgColor 255,255,255   <- the modal scrim
       *     bar           328x20           bgColor 255,255,255
       *     animation     338x20           bgColor 255,255,255
       *
       * `modal_modal` is the full-stage click blocker behind a modal dialog. It
       * is meant to be invisible; painting its white through the sprite's blend
       * turned the whole stage grey.
       *
       * The real swatches carry real colours — `part.color.hr.preview` is
       * 67,55,33 and `part.color.hd.preview` is 240,196,116 — so skipping white
       * separates them cleanly. This is the same convention `CBodypartClass.
       * setColor` uses, where `rgb(255,255,255)` means "do not tint this part":
       * white is how VMK spells "no colour", not a colour.
       */
      const bgIsWhite =
        spriteBg !== undefined && spriteBg.red === 255 && spriteBg.green === 255 &&
        spriteBg.blue === 255;
      /**
       * ⚠ TWO KINDS OF SPRITE HAVE NO PIXELS AND ARE STILL NOT SWATCHES.
       *
       * Both appear only when a room is torn down, which is why the swatch rule
       * stood for so long, and both paint a solid rectangle over the new room.
       *
       * 1. `member("null")` — VMK's blanking target. `CMgrSprite.
       *    unregisterMembers` points every sprite still holding an unloaded
       *    cast's member at it:
       *
       *        if member("null").number > 0 then
       *          sprite(tNum).member = member("null")
       *
       *    The sprite keeps the geometry and `bgColor` of the room being torn
       *    down — black — so it matched "no pixels, no text, has a bgColor".
       *
       * 2. File-backed art that has not loaded. A member with an `imagePath`
       *    owns real pixels; "no source right now" means the PNG is in flight
       *    or its cast was unloaded under a sprite that outlived the room.
       *    `CRoomVisualDefault._Open` gives every room element its node's
       *    BGCOLOR, so each stale element painted a hole — measured on
       *    `emporium_1`, 221x150, `imagePath` set, `hasSrc: false`, bg 0,0,0.
       *
       * A/B CONFIRMED: with only the 1x1 guard below in place, reverting these
       * two brought the black rectangles straight back on the next room change.
       * The genuine swatches are procedural window elements with no
       * `imagePath`, so they are untouched.
       */
      const isBlankedSprite = String(member.name ?? "") === "null";
      const isFileBackedArt = String(member.imagePath ?? "") !== "";
      const bgIsTheOnlyContent =
        !bgIsWhite && !isBlankedSprite && !isFileBackedArt &&
        !(member.image instanceof LingoImage && member.image.source) &&
        (channel.text ?? member.text ?? "") === "" && bufferText === "";
      if (
        bgIsTheOnlyContent &&
        target?.fillRect && spriteBg && typeof spriteBg === "object" &&
        typeof spriteBg.red === "number" && typeof spriteBg.green === "number" &&
        typeof spriteBg.blue === "number"
      ) {
        target.globalAlpha = alpha;
        target.fillStyle = `rgb(${String(spriteBg.red)},${String(spriteBg.green)},${String(spriteBg.blue)})`;
        target.fillRect(record.x, record.y, record.width, record.height);
      }

      // Text members carry a string, not pixels. Director draws the field's
      // text in its own box, so this is a separate path — there is no bitmap
      // to ink or crop.
      const shown = channel.text ?? member.text;
      if (member.image === VOID && shown !== "") {
        record.text = shown;
        if (target?.fillText) {
          const size = channel.fontSize ?? member.fontSize ?? 12;
          target.globalAlpha = alpha;
          target.font = `${size}px ${substituteFont(channel.font ?? member.font)}`;
          target.fillStyle = channel.textColor ?? "#ffffff";
          const align = canvasAlign(channel.alignment ?? member.alignment);
          target.textAlign = align;
          const penX = textAnchorX(align, record.x, record.width);

          /**
           * Canvas positions text on its BASELINE; Director positions the BOX.
           *
           * ⚠ The step down is the font's ASCENT, not its point size. Using the
           * size pushes every caption below where Director puts it, by however
           * much the face's ascent falls short of its em — and in a tight box
           * that difference is the whole visible difference.
           *
           * MEASURED on `reg.roomstyle.hd` ("Splash Mountain Bayou"), a 215x11
           * element at 16px: ascent 8, descent 2, so the glyphs are 10px tall
           * and FIT. Drawing at `y + 16` put the baseline 5px below the box
           * bottom, so the caption was clipped through its middle and read as
           * "the text is too big for its box" when it was simply too low.
           *
           * `fontBoundingBoxAscent` is the face's own metric and is what
           * Director's leading is based on; `actualBoundingBoxAscent` measures
           * only the glyphs actually present, which would make the baseline
           * jitter as the string changes. Falls back to the old behaviour when
           * neither is available.
           */
          const metrics = target.measureText(shown);
          const ascent = metrics.fontBoundingBoxAscent || metrics.actualBoundingBoxAscent || size;
          const baseline = record.y + ascent;

          // ⚠ Director's faces are narrower than any web substitute —
          // "2. BaseballStarz" at 14px Arial Narrow is 102px against the 94px
          // box the layout declares. Rather than let a substituted font
          // overflow and collide with the next element, condense it to the
          // authored width. The layout stays authoritative; only the glyph
          // shapes are approximate.
          const boxWidth = channel.stretchWidth;
          const measured = target.measureText?.(shown)?.width ?? 0;
          if (boxWidth && measured > boxWidth && target.save && target.restore && target.scale) {
            target.save();
            target.translate?.(record.x, 0);
            target.scale(boxWidth / measured, 1);
            target.fillText(shown, 0, baseline);
            target.restore();
          } else {
            /**
             * ⚠ BREAK ON CR. Director separates lines with `\r`, and this path
             * used to hand the whole string to one `fillText` — which renders
             * the carriage return as nothing, so `"Updating\rl00%"` came out as
             * the single run `"Updating100%"`. Real strings hit it: the
             * dictionary progress panel is exactly that value.
             *
             * The wrapping sibling path below already did this; only the direct
             * text-member path did not.
             */
            let line = baseline;
            for (const paragraph of shown.split(/\r\n|\r|\n/)) {
              target.fillText(paragraph, penX, line);
              line += Math.ceil(size * 1.3);
            }
          }
        }
        continue;
      }

      // A runtime-allocated buffer: VMK builds every window panel this way, so
      // without this branch a dialog assembled by buildVisual draws nothing.
      //
      // ⚠ A buffer can carry BOTH art and a caption, and the two are not
      // alternatives. `copyPixels` composes cast art into the buffer's raster
      // (that is how the VMK logo and the loading bar are built) while the
      // caption arrives separately as text. Treating "has a source" as a reason
      // to skip the text, or "has text" as a reason to skip the blit, loses one
      // of them every time.
      if (member.image instanceof LingoImage) {
        const buffer = member.image;
        /**
         * ⚠ ASK FOR THE ART BEFORE THE `buffer.source` GUARD BELOW, NOT INSIDE IT.
         *
         * `drawableFor` also requests, but it is only reached once the buffer
         * ALREADY has pixels — which made the two conditions circular for any
         * member that had never fetched: no art, so no draw; no draw, so nobody
         * asks for the art; so no art. The buffer sat `armed: true,
         * hasSource: false` forever.
         *
         * MEASURED: that is what stopped the boot logo (`core`/`Logo`,
         * `00053_Logo.png`) appearing above the loading bar. The member existed,
         * the sprite was in its channel, and the request was simply never made.
         *
         * Fetching cast art on demand (see `LingoImage.needSource`) is what put
         * a request on this path at all; while every `.image` read fetched
         * eagerly, the guard was harmless.
         */
        buffer.requestSource();
        const colour = buffer.fillColor;
        /**
         * ⚠ A 1x1 BUFFER IS A PLACEHOLDER, NOT A COLOUR TO STRETCH.
         *
         * The flat fill stands in for a buffer's own raster, so it may only
         * cover a buffer that is actually the sprite's size. A 1x1 image
         * carries no area to speak of, and painting its colour across the
         * sprite's rect invents a solid rectangle out of one pixel.
         *
         * ⚠ THIS IS WHAT BLACKED OUT THE ROOM ON EVERY ROOM CHANGE.
         * `CMgrSprite.unregisterMembers` blanks a sprite whose cast is being
         * unloaded by pointing it at `member("null")` — a 1x1, 8-bit, sourceless
         * image whose `fillColor` is rgb(0,0,0). Director draws nothing for it.
         * We stretched that black pixel over whatever the sprite used to be:
         *
         *     sprite 38   null   800x600   <- the whole stage, over the new
         *                                     room's background, which had
         *                                     loaded and drew underneath it
         *
         * and it lands ABOVE the background because the blanked sprite keeps its
         * old `locZ` (-5006000, tied with the room bg) and loses the tie on
         * sprite number. Smaller stale sprites became the scattered black holes.
         */
        const bufferHasArea = buffer.width > 1 || buffer.height > 1;
        record.fill =
          colour && buffer.source === null && bufferHasArea
            ? `rgb(${colour.red},${colour.green},${colour.blue})`
            : undefined;
        if (target && record.fill && target.fillRect) {
          target.globalAlpha = alpha;
          target.fillStyle = record.fill;
          target.fillRect(record.x, record.y, record.width, record.height);
        }
        if (target && buffer.source !== null && buffer.source !== undefined) {
          target.globalAlpha = alpha;
          /**
           * ⚠ Window buffers get INK too.
           *
           * This branch used to paint `buffer.source` straight to the canvas,
           * so `drawableFor` — and with it every ink mode — was skipped for
           * every window element in the game. That matters because VMK CLEARS a
           * text element's buffer to white on purpose
           * (`CWindowTextWrapper.setText` fills `rgb(255,255,255)`) and relies
           * on ink 36 to knock the white back out. Without the ink those fills
           * stayed opaque: three white slabs across the custom loading screen's
           * artwork, and a white box behind every caption.
           */
          const { image: inked, cropped } = this.drawableFor(member, channel.ink);
          const drawable = inked instanceof LingoImage ? inked.source : inked;
          const source = cropped ? null : member.sourceRect;
          // `the bgColor of sprite` recolours a stencil — see `tintedStencil`.
          // ⚠ DARKEN (ink 41) instead MULTIPLIES the source by `bgColor` — the
          // colour-furniture mechanism. A furni bitmap member's `.image` is a
          // LingoImage, so it comes through THIS buffer branch, not the bitmap one;
          // `tintedStencil` is gated on a neutral near-white stencil and rejects a
          // furni tint layer (a dark grey mask, avg ~90), which left colour furni
          // grey. `darkenSprite` applies the tint unconditionally, matching
          // image-to-image copyPixels. See `darkenSprite`.
          //
          // ⚠ SOME FURNI TINT LAYERS ARE INK 8 (MATTE), NOT 41 — e.g. the
          // Tangaroa-Ru Tiki Idol (item_56) has a `_2_0` layer at INK 8, BGC
          // FF05C9. The bgColor still colourises (ink only governs keying: matte
          // keys white first via `drawableFor`, then this multiplies). Scoped to
          // furni members (`item_`) so real UI stencils keep `tintedStencil`'s
          // ramp; a colourless (white/black) bgColor is a no-op inside
          // `darkenSprite`, so item bases are untouched.
          const isFurniTint =
            channel.ink === INK_DARKEN ||
            (channel.ink === INK_MATTE && String(member.name).startsWith("item_"));
          const painted = isFurniTint
            ? this.darkenSprite(member, drawable ?? buffer.source, spriteBg)
            : this.tintedStencil(member, drawable ?? buffer.source, spriteBg);
          this.paint(
            target,
            painted,
            source,
            member.rotated,
            record,
          );
        }
        // A buffer can carry a caption as well as a fill: `copyPixels` brings
        // the string across from the text member VMK rendered it into. Draw it
        // over the fill, which is the element's background.
        /**
         * ⚠ EACH CAPTION IN THE RECT IT WAS COPIED INTO — see
         * `LingoImage.textRuns`.
         *
         * Director positions composed text by RECTANGLE, and one buffer often
         * holds several captions. Drawing `buffer.text` once at the element
         * origin got both wrong: every button label sat at the left edge
         * (`createButtonImg` centres by computing `tDstRect`), and the
         * registration name list showed only its last row of five.
         *
         * A buffer with no recorded runs falls back to the old single-caption
         * behaviour, which is what the loading dialog and other one-line
         * elements rely on.
         */
        const runs = buffer.textRuns.length > 0
          ? buffer.textRuns
          : (buffer.text !== ""
            ? [{
              text: buffer.text, x: 0, y: 0,
              width: record.width, height: record.height,
              font: buffer.textFont, size: buffer.textSize,
              antialias: buffer.textAntialias,
              lineHeight: buffer.textLineHeight, topSpacing: buffer.textTopSpacing,
              wordWrap: buffer.textWordWrap,
              color: buffer.textColor,
              align: buffer.textAlign,
            }]
            : []);

        for (const run of runs) {
          if (!target?.fillText) break;
          record.text = run.text;
          const size = run.size || 12;
          // The run's own box, offset from the element's origin.
          const boxX = record.x + run.x;
          const boxY = record.y + run.y;
          /**
           * The run's own size — its CONTENT, which for a `#text` member grows
           * vertically to fit. It lays the text out and drives the wrap; what
           * stops it painting outside the element is the CLIP below, bounded to
           * the sprite's own rect. Clamping these instead was tried and is
           * wrong: it shrinks the wrap width and cannot express a scrolled run,
           * whose `y` is negative.
           */
          const boxW = run.width || record.width;
          const boxH = run.height || record.height;
          target.globalAlpha = alpha;
          /**
           * The run's own face, falling back to the buffer's. A run composed
           * through `CUIComponent`'s writer can arrive without a font, and
           * `substituteFont("")` answers "sans-serif" — which measures WIDER
           * than the authored face and makes text wrap that Director fits.
           */
          target.font = `${size}px ${substituteFont(run.font || buffer.textFont)}`;
          target.fillStyle = cssColour(run.color) ?? "#000000";
          /**
           * ⚠ The BUFFER's alignment, not a hardcoded left.
           *
           * Every caption VMK composes through `copyPixels` arrives here, which
           * is most of the UI: dialog titles, button labels, panel headings.
           * Pinning them all to the left edge is why the loading dialog's
           * "Loading furniture data" sat against the panel border while the
           * original centres it.
           */
          const align = canvasAlign(run.align);
          target.textAlign = align;
          const penX = textAnchorX(align, boxX, boxW);

          /**
           * Aliased or antialiased, per the member's own `the antiAlias` — see
           * `fillTextAliased`. A run recorded before this property existed has
           * `antialias` undefined, which keeps Director's default (on).
           */
          const aliased = run.antialias === 0;
          /**
           * ⚠ THE ATLAS IS TRIED FOR BOTH, aliased and antialiased — where one
           * exists. Hinting is not an aliasing question, so a face that needs
           * grid-fitting gets its atlas either way. Folio deliberately has none;
           * see the note in `lingo-glyph-atlas`'s REGISTRY.
           */
          const runFont = run.font || buffer.textFont;
          let lastEnd: { x: number; baseline: number } | null = null;
          const writeLine = (line: string, atX: number, atY: number): void => {
            /**
             * ⚠ A CENTRED LINE WIDER THAN ITS BOX STARTS AT THE LEFT EDGE.
             * Director does not centre an overflowing non-wrapping line (which
             * would push it off BOTH sides); it lays it from the left and clips
             * the right. MEASURED against Shockwave on the Haunted Mansion
             * results window: "NO WINNER, THE OTHER TEAM LEFT THE GAME" in a
             * 314px box shows "NO WINNER, THE OTHER TEAM LEFT", flush left —
             * we showed "VINNER, … THE G", cut on both ends.
             */
            const overflowing =
              align !== "left" && (target.measureText?.(line).width ?? 0) > boxW;
            const x = overflowing ? boxX : atX;
            if (overflowing) target.textAlign = "left";
            if (aliased || atlasFor(runFont, size)) {
              fillTextAliased(target, line, x, atY, runFont, size, aliased);
            } else {
              target.fillText?.(line, x, atY);
            }
            const lineAlign = overflowing ? "left" : align;
            const lineWidth = target.measureText?.(line)?.width ?? 0;
            lastEnd = {
              x: lineAlign === "center" ? x + lineWidth / 2 : lineAlign === "right" ? x : x + lineWidth,
              baseline: atY,
            };
            if (overflowing) target.textAlign = align;
          };

          // Director fields wrap to their box and break on CR. Drawing the whole
          // string with one fillText put a two-line message on one line and let
          // it run past the panel — the layout is authored assuming the wrap.
          /**
           * ⚠ THE FONT SIZE, not a guessed multiple of it.
           *
           * Director takes the baseline step from `the fixedLineSpace`, and
           * `CWindowTextWrapper.prepare` DEFAULTS that to the font size:
           *
           *     else pFontData[#fixedLineSpace] = pProps[#fontSize]
           *
           * `ceil(size * 1.3)` was 31% too tall, so every wrapped block needed
           * more room than the layout gives it and authored boxes overflowed.
           * `"Updating\r0%"` wants 2 x 21 = 42px in a 32px box; at the real step
           * 2 x 16 = 32 fits exactly, which is why that caption was cut in half.
           */
          /**
           * ⚠ PORTED FROM LibreShockwave `SimpleTextRenderer` (drawStyledText
           * line ~824, drawBuiltinText line ~910), the reference implementation:
           *
           *     lineHeight = fixedLineSpace > 0 ? fixedLineSpace : font.getLineHeight()
           *
           * A member left at `fixedLineSpace 0` is a RAW/HTML text member — the
           * help answer, item descriptions — which Director lays out at the face's
           * NATURAL line box (ascent+descent), NOT the bare point size. Stepping
           * by the point size ran multi-line blocks ~2-3px too tight per line,
           * which is the "cramped vs the original" look.
           *
           * ⚠ LINE-STEP ONLY, so this is safe for everything single-line: a caption
           * or button label has no second line to advance to, so its baseline does
           * not move. Members that set `fixedLineSpace` (every CWriter / window
           * wrapper / button caption — it defaults to `fontSize`) are untouched;
           * only the genuinely-unset raw-text case changes. The baseline/topSpacing
           * placement is a SEPARATE change and is not touched here.
           */
          const stepMetrics = target.measureText?.(run.text);
          const stepNatural = Math.round(
            ((stepMetrics?.fontBoundingBoxAscent) || size) + (stepMetrics?.fontBoundingBoxDescent ?? 0),
          );
          const lineHeight = run.lineHeight > 0 ? run.lineHeight : Math.max(size, stepNatural);

          /**
           * ⚠ CLIPPED TO THE ELEMENT'S BOX, because Director clips a field to
           * its rect and this text does not fit on purpose.
           *
           * `reg.entervmk.info` is 290 characters in a 163x82 box: it wraps to
           * about 15 lines and the box has room for four. Unclipped, the rest
           * carried on down the stage and drew straight over the NEXT button
           * and the panel border below it — which reads as "the layout is
           * wrong" when the layout is right and the overflow is ours.
           *
           * ⚠ The WRAP already had to be there for the same authored reason; it
           * is the vertical half that was missing. A previous overflow check
           * missed this by counting CR-separated lines, which for this string is
           * one — the lines that overflow are the WRAPPED ones.
           *
           * Clipping rather than stopping the loop keeps a partially visible
           * line showing its top half, as Director does. Falls back to a plain
           * cutoff where the target cannot clip (the Node smoke test).
           */
          const canClip =
            !!target.save && !!target.restore && !!target.beginPath &&
            !!target.rect && !!target.clip;
          if (canClip) {
            /**
             * ⚠ CLIP TO THE INTERSECTION WITH THE SPRITE, not to the run box.
             *
             * A scrolled run has a NEGATIVE `y` — that is how scrolling arrives
             * once `copyPixels` shifts runs by the source window — so clipping
             * to the run's own box put the clip ABOVE the element and the
             * licence heading painted over the page title. Bounding only the
             * bottom edge (the first attempt at the overflow) fixed one
             * direction and left the other.
             *
             * The run box still POSITIONS the text — alignment and the baseline
             * are measured from it. Only the clip is bounded.
             */
            // …and to the rect the run was COPIED into, when it has one: a
            // scrolled list's rows must not paint outside the list itself.
            const copied = (run as { clip?: { left: number; top: number; right: number; bottom: number } }).clip;
            const clipX = Math.max(boxX, record.x, copied ? record.x + copied.left : -Infinity);
            const clipY = Math.max(boxY, record.y, copied ? record.y + copied.top : -Infinity);
            const clipRight = Math.min(boxX + boxW, record.x + record.width, copied ? record.x + copied.right : Infinity);
            const clipBottom = Math.min(boxY + boxH, record.y + record.height, copied ? record.y + copied.bottom : Infinity);
            target.save();
            target.beginPath();
            target.rect(clipX, clipY, Math.max(0, clipRight - clipX), Math.max(0, clipBottom - clipY));
            target.clip();
          }
          const bottom = boxY + boxH;
          /**
           * ⚠ First baseline sits at the ASCENT, not the point size — the same
           * correction as the member-text path above, and for the same reason:
           * `y + size` drops every composed caption below where Director puts
           * it, which in a tight box clips it. See the note there for the
           * measured `reg.roomstyle.hd` case.
           */
          /**
           * ⚠ CLAMPED TO THE RUN'S BOX. A substituted face is taller than the
           * one Director measured, and a single-line run's box is exactly the
           * height Director needed — so the ascent can exceed the whole box and
           * put the baseline BELOW the clip, drawing nothing at all.
           *
           * MEASURED on the registration name list: rows are 12px tall, the
           * substituted face's ascent at 15px is ~14, so every name was drawn
           * at a baseline 2px past the bottom of its own row and clipped away
           * entirely. Five correctly positioned runs, five invisible names.
           *
           * The codebase already condenses text HORIZONTALLY to the authored
           * width for the same reason (see the member-text path); this is the
           * vertical half of that compromise. Multi-line blocks are unaffected:
           * their boxes are far taller than one ascent, so the min is the
           * ascent and nothing changes.
           */
          /**
           * ⚠ THE CLAMP `Math.min(rawAscent, boxH)` WAS REMOVED. Do not restore
           * it without re-reading this.
           *
           * It was added when a SUBSTITUTED face was taller than the one
           * Director measured, to stop a single-line run's baseline landing
           * below its own box and clipping the caption away entirely. That
           * situation no longer exists: the real Foxley/Folio faces load, so the
           * ascent is the ascent Director had.
           *
           * What the clamp then did instead was pin the baseline AT the box
           * bottom whenever the ascent exceeded a tight box — which pushes
           * DESCENDERS outside the clip. MEASURED on `reg.roomstyle.hd`
           * ("Splash Mountain Bayou"), `#height: 11` at `#fontSize: 16`: the "y"
           * of "Bayou" was cut off, where the original shows it whole.
           *
           * Director places the first baseline at the face's ASCENT and lets the
           * member's rect clip whatever does not fit. That is the rule, and the
           * clipping below already implements the second half of it.
           */
          /**
           * ⚠ WITH `the fixedLineSpace` SET, THE BASELINE COMES FROM IT — NOT
           * FROM THE FONT'S ASCENT.
           *
           * Director gives each line exactly `fixedLineSpace` pixels and sits
           * the baseline one DESCENT above the bottom of that band, so the
           * descenders land inside it. Placing the baseline at the ascent
           * instead pushes them out of a band tighter than the face.
           *
           * MEASURED on `reg.roomstyle.hd` ("Splash Mountain Bayou"), which is
           * `#height: 11` with `#fixedLineSpace: 11` at `#fontSize: 16`:
           *
           *     our ascent 14, descent 2  ->  baseline 14, glyph bottom 16
           *     the box clips at 11       ->  the "y" of "Bayou" is cut off
           *     Director: 11 - 2 = 9      ->  glyph bottom 11, the "y" fits
           *
           * ⚠ AND THIS IS NOT A GLOBAL SCALE PROBLEM — that was tried and
           * reverted, correctly. Measuring what scale each authored element
           * would need to fit its own box gives 0.688, 1.063, 1.063, 0.938,
           * 1.0, 1.118: no systematic error, just this one element, because it
           * is the only one whose `fixedLineSpace` is tighter than its font.
           *
           * `fixedLineSpace` of 0 means Director was not asked to fix the line,
           * so the ascent is right there — see `CWindowTextWrapper.prepare`,
           * which defaults it to the font size.
           */
          const firstMetrics = target.measureText(run.text);
          const ascent = firstMetrics.fontBoundingBoxAscent || size;
          const descent = firstMetrics.fontBoundingBoxDescent ?? 0;
          /**
           * ⚠ `the topSpacing of member` WINS when the member declares one.
           *
           * Director puts the first baseline at `topSpacing + ascent`;
           * `fixedLineSpace` steps the lines AFTER it. VMK's `CWriter.Define`
           * sets a NEGATIVE topSpacing (`fixedLineSpace - fontSize`) precisely to
           * pull a caption up inside a tight box, so every caption composed
           * through a writer needs it.
           *
           * MEASURED on the chat bubble — text element 14px, glyphs 8px:
           *
           *     lineHeight path   16 - 3  = 13  ->  ink at row 5   (too low)
           *     topSpacing path   14 - 3  = 11  ->  ink at row 3   (centred)
           *
           * Members that never set one keep the existing behaviour exactly, so
           * this cannot move the captions the `lineHeight` rule was tuned for
           * (see the `reg.roomstyle.hd` note above).
           */
          const topSpacing = run.topSpacing ?? 0;
          const firstBaseline = topSpacing !== 0
            ? Math.max(0, ascent + topSpacing)
            : run.lineHeight > 0 ? Math.max(0, run.lineHeight - descent) : ascent;
          let line = boxY + firstBaseline;
          for (const paragraph of run.text.split(/\r\n|\r|\n/)) {
            /**
             * ⚠ `null` = nothing on this line yet; `""` is a REAL empty word.
             *
             * `" Test".split(" ")` is `["", "Test"]`. Testing `current === ""`
             * treated the leading empty word as "line not started", so the
             * rebuild came out "Test" and every leading (or doubled) space was
             * dropped. The avatar name tag renders `SPACE & name` and sizes its
             * bubble for that space, so the name sat 4px left of centre — MEASURED
             * against Shockwave: T at bubble column 9, original 13. A wrap still
             * starts the next line at the word, dropping the break's space, as
             * Director does.
             */
            let current: string | null = null;
            for (const word of paragraph.split(" ")) {
              const candidate = current === null ? word : `${current} ${word}`;
              /**
               * ⚠ `#wordWrap: 0` NEVER BREAKS — the line runs on and the clip
               * cuts it at the box edge, as Director does. See
               * `CastMember.wordWrap`; the Fireworks scoreboard lost every long
               * name to a break here.
               */
              const fits =
                !boxW ||
                run.wordWrap === false ||
                (target.measureText?.(candidate)?.width ?? 0) <= boxW;
              /**
               * ⚠ A WORD THAT DOES NOT FIT AN EMPTY LINE STAYS ON IT.
               *
               * Wrapping unconditionally flushed an EMPTY `current`, advanced
               * the baseline, and put the word on the next line down. For a
               * one-line box that pushes the only content clean out of its own
               * clip, so nothing is drawn at all — and the taller the
               * substituted font, the more often it happens.
               *
               * MEASURED on the registration name list: each 85px row emitted
               * `fillText("", 57, 305)` followed by the name at y=320, 15px
               * below a box only 12px tall. Five names, all drawn, none
               * visible. Director clips an over-wide word; it does not move it.
               */
              if (fits || current === null || current.trim() === "") {
                current = candidate;
                continue;
              }
              // Without a clip, stop at the box edge rather than overdraw.
              if (!canClip && line > bottom) break;
              writeLine(current, penX, line);
              line += lineHeight;
              current = word;
            }
            if (canClip || line <= bottom) writeLine(current ?? "", penX, line);
            line += lineHeight;
          }
          if (canClip) target.restore();
          const end = lastEnd as { x: number; baseline: number } | null;
          if (end && member.kind === "field" && member.editable) {
            this.textEnds.set(channel.spriteNum, { ...end, ascent, descent });
          }
        }
        continue;
      }

      const { image: wrapped, cropped } = this.drawableFor(member, channel.ink);
      /**
       * ⚠ Unwrap the Lingo buffer to the thing the canvas can actually blit.
       *
       * A bitmap member's `.image` is a `LingoImage` (so VMK can read `.depth`
       * and call `duplicate` on it) carrying the decoded `ImageBitmap` in
       * `source`. Handing the wrapper straight to `drawImage` throws.
       *
       * `source` is null while the PNG is still downloading, which is a skip,
       * not an error — the next frame draws it.
       */
      const image =
        wrapped instanceof LingoImage ? wrapped.source : wrapped;
      if (target && image !== VOID && image !== undefined && image !== null) {
        target.globalAlpha = alpha;
        const source = cropped
          ? (member.sourceRect ? { x: 0, y: 0, w: member.sourceRect.w, h: member.sourceRect.h } : null)
          : member.sourceRect;
        // DARKEN (ink 41), and MATTE (ink 8) on a furni member, tint a furni's
        // grayscale layer by its `bgColor` — the colour-furniture mechanism (see the
        // buffer branch above and `darkenSprite`). A colourless bgColor is a no-op,
        // so item bases are untouched; scoped to `item_` so UI matte art is not.
        const isFurniTint =
          channel.ink === INK_DARKEN ||
          (channel.ink === INK_MATTE && String(member.name).startsWith("item_"));
        let painted = isFurniTint ? this.darkenSprite(member, image, spriteBg) : image;
        // `the color of sprite` (foreground) colourises — see `colorizeSprite`.
        if (!isFurniTint) {
          painted = this.colorizeSprite(member, painted, channel.color as ColorLike | undefined, spriteBg);
        }
        this.paint(target, painted, source, member.rotated, record);
      }
    }

    this.drawCaret(target);
    return [...this.drawn];
  }

  /**
   * The blinking insertion point in the focused editable field.
   *
   * ⚠ WITHOUT THIS THE FIELD LOOKS DEAD. Clicking it focuses it and typing does
   * reach the member — but the field is the only control with no pressed state
   * and no caret, so there is NOTHING on screen saying it is live. It reads as
   * "the click didn't work" when the click worked fine.
   *
   * Drawn LAST, over everything, because it is not a sprite: Director's caret
   * belongs to the field with `the keyboardFocusSprite`, not to the cast.
   *
   * ⚠ It must BLINK, and the blink is what reads as "you can type here" — a
   * static bar looks like part of the art. ~530ms is the Windows caret rate
   * Director inherited.
   */
  private drawCaret(target?: RenderTarget): void {
    if (!target?.fillRect) return;
    if (Math.floor(Date.now() / 530) % 2 !== 0) return;

    // The caret belongs wherever the keys are going, automatic focus included.
    const focused = this.keyboardFocusChannel();
    for (const channel of focused ? [focused] : []) {
      const member = channel.member;
      if (!member || member.kind !== "field" || !member.editable) return;
      // Never paint a caret on a hidden field (an explicitly-focused sprite can
      // still be visible = 0); the caret must track what's actually on screen.
      if (!channel.visible) return;

      /**
       * ⚠ THE CARET FOLLOWS THE TEXT'S OWN GEOMETRY — see the direct text-member
       * branch in the draw loop, which is what paints an editable field.
       *
       * It used to measure from `loc + 3` in `member.font`, on the first line,
       * left-aligned. The text is drawn from the sprite's BOX (`loc - regPoint`,
       * no inset), in `channel.font ?? member.font`, at the field's alignment,
       * squeezed to `stretchWidth` when it overflows, one `ceil(size*1.3)` per
       * line. Every one of those differences put the caret somewhere the text
       * isn't: off by the reg point, a few px right of an empty field, at the
       * left edge of a centred field, past the end of a squeezed one.
       */
      const size = channel.fontSize ?? member.fontSize ?? 12;
      const text = String(channel.text ?? member.text ?? "");
      const lines = text.split(/\r\n|\r|\n/);
      const last = lines[lines.length - 1] ?? "";
      const registration = member.regPoint;
      const boxX = channel.locH - registration.locH *
        (channel.stretchWidth !== undefined && member.width > 0 ? channel.drawWidth / member.width : 1);
      const boxY = channel.locV - registration.locV *
        (channel.stretchHeight !== undefined && member.height > 0 ? channel.drawHeight / member.height : 1);
      const boxW = channel.drawWidth;
      let advance = 0;
      let ascent = size;
      let descent = Math.ceil(size * 0.25);
      if (target.measureText) {
        const holder = target as unknown as { font?: string };
        const previous = holder.font;
        target.font = `${size}px ${substituteFont(channel.font ?? member.font)}`;
        const metrics = target.measureText(last);
        advance = metrics?.width ?? 0;
        ascent = metrics?.fontBoundingBoxAscent || metrics?.actualBoundingBoxAscent || size;
        descent = metrics?.fontBoundingBoxDescent || descent;
        // Same squeeze the draw applies (it measures the whole string).
        const whole = lines.length === 1 ? advance : (target.measureText(text)?.width ?? 0);
        const boxWidth = channel.stretchWidth;
        if (lines.length === 1 && boxWidth && whole > boxWidth) advance *= boxWidth / whole;
        if (previous !== undefined) holder.font = previous;
      }
      const align = canvasAlign(channel.alignment ?? member.alignment);
      const anchor = textAnchorX(align, boxX, boxW);
      const lineStart = align === "center" ? anchor - advance / 2
        : align === "right" ? anchor - advance
        : anchor;
      /**
       * ⚠ A FIELD DRAWN THIS FRAME TELLS US WHERE ITS TEXT ENDED. Fields render
       * through the buffer path, which WORD-WRAPS; the measurement above only
       * breaks on CR and squeezes one long line into the box. MEASURED on the
       * Edit Room description: a two-line wrapped description put the caret at
       * the right edge of line 1. The draw's own last line is authoritative;
       * the measurement remains for an empty field, which draws no line.
       */
      const end = this.textEnds.get(channel.spriteNum);
      const x = end ? Math.round(end.x) : Math.round(lineStart + advance);
      const lineTop = end
        ? end.baseline - end.ascent
        : boxY + (lines.length - 1) * Math.ceil(size * 1.3);
      const top = Math.round(lineTop);
      const height = end
        ? Math.max(4, Math.round(end.ascent + end.descent))
        : Math.max(4, Math.min(Math.round(ascent + descent), channel.drawHeight - 1));

      /**
       * ⚠ A COVERED FIELD HAS NO VISIBLE CARET. Director's caret is part of the
       * field sprite, so anything drawn above the field paints over it; ours is
       * drawn last, over everything. MEASURED in the music mixer: its 800x600
       * window sits over the message bar, the chat input keeps keyboard focus
       * (nothing in VMK revokes it), and the caret blinked on top of the mixer.
       * Skip it when a sprite drawn AFTER the field this frame covers it.
       */
      const own = this.drawn.findIndex((r) => r.channel === channel.spriteNum);
      const cx = x;
      const cy = top + height / 2;
      for (let i = own + 1; own >= 0 && i < this.drawn.length; i++) {
        const r = this.drawn[i];
        if (r.alpha > 0 && cx >= r.x && cx < r.x + r.width && cy >= r.y && cy < r.y + r.height) return;
      }

      target.globalAlpha = 1;
      target.fillStyle = cssColour(member.color) ?? "#000000";
      target.fillRect(x, top, 1, height);
      return;
    }
  }

  /** The one point every sprite blit passes through — see the ink note inside. */
  private paint(
    target: RenderTarget,
    drawable: unknown,
    source: { x: number; y: number; w: number; h: number } | null,
    rotated: boolean,
    record: DrawRecord,
  ): void {
    /**
     * ⚠ ADD PIN (33) / ADD (34) ARE A COMPOSITE MODE, NOT A PIXEL RECIPE.
     *
     * Every other ink goes through `prepareInk`, which rewrites the SOURCE
     * pixels — that cannot express "add me to what is underneath", so an
     * additive sprite fell through and was blitted opaque.
     *
     * `NavigatorInterface_Class.eventProcNavigator` highlights a land by setting
     * `the ink of <sprite>` to 33 and showing the `highlight_<land>` art. Drawn
     * as Copy that art is an opaque olive plaque and it REPLACED the label —
     * hovering a land blanked it out. Additively it is the glow the original
     * shows.
     *
     * ⚠ IT BELONGS HERE, NOT AT A CALL SITE. It was first written into the
     * bitmap branch of the draw loop, and window ELEMENT buffers never reach
     * that branch — a member whose `.image` is a `LingoImage` is drawn by the
     * buffer branch above, which has a `paint` call of its own. Every navigator
     * highlight is such a buffer, so the fix sat in the one branch its own case
     * could not take: MEASURED `record.ink 33` arriving at `paint` with the
     * context still on `source-over`, frame after frame. `paint` is the single
     * point every blit passes through, so keying off `record.ink` here cannot
     * miss a path.
     *
     * Canvas `lighter` adds and clamps, which is Add Pin; Add's wraparound has
     * no canvas equivalent and does not occur in VMK's art. Restored straight
     * after so the mode cannot leak into the next sprite.
     */
    const additive = record.ink === 33 || record.ink === 34;
    /**
     * ⚠ LIGHTEST (37) / LIGHTEN (40) are a COMPOSITE MODE too, not a pixel recipe.
     *
     * Like Add (33/34), these keep the LIGHTER of source and destination —
     * canvas `lighten` is per-channel max, which is what Director's LIGHTEST does
     * for the "light art on a BLACK background" sprites the parks use for water,
     * glows and light shafts (`prepareInk` only rewrites 8/36, so 37/40 reached
     * here and fell through to an OPAQUE blit — the black background then showed
     * as a solid black blob). MEASURED on Room 98 (Epcot Entrance): the fountain
     * spray is `epcot_w_1`/`epcot_w_3` at ink 37, drawn opaque = a black column.
     * With `lighten` the black (0) never beats the scene behind it and only the
     * bright water survives, matching the original. See [[film-loops-render-from-scvw]].
     */
    const lighten = record.ink === 37 || record.ink === 40;
    /**
     * ⚠ DARKEST (39) is the mirror of LIGHTEST — a COMPOSITE, not a pixel recipe.
     *
     * Same failure mode as ink 37: `prepareInk` only rewrites 8/36, and a direct
     * DARKEST sprite otherwise fell through to an OPAQUE blit, so its background
     * (white/light) painted over the scene. Canvas `darken` (per-channel min) is
     * what Director's DARKEST does for the "dark art on a WHITE/transparent
     * background" sprites the parks use — the avatar drop-shadow (`room_avatar_
     * shadow`, ink 39) is the live case: min against the floor darkens only where
     * the shadow art is dark and leaves white (255) as a no-op. (Per-channel min
     * differs from DirPlayer's whole-pixel luminance-select on CHROMATIC content,
     * but VMK's ink-39 art is grayscale, so this matches — the same basis as the
     * image-to-image `INK_DARKEST` path.) See [[film-loops-render-from-scvw]].
     */
    const darken = record.ink === 39;
    /**
     * ⚠ SUBTRACT PIN (35) has no canvas composite mode at all, so it is built
     * from two that exist: invert the box, ADD the sprite, invert back.
     * 255 − min(255, (255 − dst) + src) = max(0, dst − src), which is exactly
     * Subtract Pin per channel. "difference" against white is the inversion,
     * and two of them are the identity wherever the sprite did not land.
     *
     * Before this it fell through to an opaque blit. MEASURED on Room 32 (Spell
     * Room): the sky vortex `spellroom_sky_anim` is eight 800×71 near-black
     * frames (`magickeff_v1_*`, swirl ≤ 25 grey) at ink 35 — Copy pasted a black
     * band over the top of the sky; subtracted, it carves a faint dark swirl.
     */
    if (record.ink === 35 && target.fillRect) {
      this.paintSubtractPin(target, drawable, source, rotated, record);
      return;
    }
    if (!additive && !lighten && !darken) {
      this.blitMirrored(target, drawable, source, rotated, record);
      return;
    }
    target.globalCompositeOperation = additive ? "lighter" : darken ? "darken" : "lighten";
    this.blitMirrored(target, drawable, source, rotated, record);
    target.globalCompositeOperation = "source-over";
  }

  /** Subtract Pin as invert → add → invert — see the ink 35 note in `paint`. */
  private paintSubtractPin(
    target: RenderTarget,
    drawable: unknown,
    source: { x: number; y: number; w: number; h: number } | null,
    rotated: boolean,
    record: DrawRecord,
  ): void {
    // The box the sprite actually lands in, after `blitMirrored` flips it.
    let { x, y } = record;
    if (record.flipH) x = 2 * (record.pivotX ?? record.x + record.width / 2) - x - record.width;
    if (record.flipV) y = 2 * (record.pivotY ?? record.y + record.height / 2) - y - record.height;
    const holder = target as unknown as { globalAlpha: number; fillStyle: string };
    const spriteAlpha = holder.globalAlpha;
    const invert = (): void => {
      target.globalAlpha = 1;
      target.globalCompositeOperation = "difference";
      target.fillStyle = "#ffffff";
      target.fillRect!(x, y, record.width, record.height);
    };
    invert();
    target.globalAlpha = spriteAlpha;
    target.globalCompositeOperation = "lighter";
    this.blitMirrored(target, drawable, source, rotated, record);
    invert();
    target.globalAlpha = spriteAlpha;
    target.globalCompositeOperation = "source-over";
  }


  /**
   * `the flipH/flipV of sprite` — mirror about the sprite's OWN box, then blit.
   *
   * ⚠ HERE FOR THE SAME REASON THE ADDITIVE INK IS: `paint` is the one point
   * every blit passes through. Mirroring inside `blit` would have to be written
   * three times (plain, atlas sub-rect, rotated atlas) and window ELEMENT
   * buffers take a different branch again — the mistake the additive-ink note
   * above records. Doing it here cannot miss a path.
   *
   * ⚠ MIRRORED ABOUT THE REGISTRATION POINT (`loc`), NOT the box centre.
   *
   * Director flips a sprite about its registration point, and that only equals
   * the box centre when the art is registered dead-centre. Furniture is not:
   * the rope-divider rope (`item_81_1_0_5_1_0`) has regPoint.locH 26 on a 34px
   * member (centre 17), so mirroring about the box centre put the flipped rope
   * ~18px off its pole — the "rope is a stub beside the post" look on every
   * FLP=1 multi-part item. `pivotX/pivotY` are `loc` in screen space, which is
   * the fixed point of the mirror; a sprite registered at its centre is
   * unchanged because there `pivot == x + width/2`.
   *
   * The transform methods are optional on `RenderTarget` because the headless
   * smoke-test target implements only what it needs; without them the sprite is
   * drawn UNMIRRORED rather than not at all, which keeps that target working.
   */
  private blitMirrored(
    target: RenderTarget,
    drawable: unknown,
    source: { x: number; y: number; w: number; h: number } | null,
    rotated: boolean,
    record: DrawRecord,
  ): void {
    const mirrored = record.flipH || record.flipV;
    const canTransform = target.save && target.restore && target.translate && target.scale;
    if (!mirrored || !canTransform) {
      this.blit(target, drawable, source, rotated, record);
      return;
    }
    const cx = record.pivotX ?? record.x + record.width / 2;
    const cy = record.pivotY ?? record.y + record.height / 2;
    target.save!();
    target.translate!(cx, cy);
    target.scale!(record.flipH ? -1 : 1, record.flipV ? -1 : 1);
    target.translate!(-cx, -cy);
    this.blit(target, drawable, source, rotated, record);
    target.restore!();
  }

  /**
   * Three draw paths, in increasing awkwardness:
   *
   *   plain image        drawImage(img, dx, dy, dw, dh)
   *   atlas sub-rect     drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
   *   rotated atlas      the frame is packed turned 90° clockwise, so the
   *                      canvas is rotated back before the blit
   *
   * Rotation is handled here rather than by pre-slicing every frame into its
   * own bitmap: an atlas is one decoded image shared by dozens of members, and
   * slicing would multiply memory for no gain.
   */
  private blit(
    target: RenderTarget,
    drawable: unknown,
    source: { x: number; y: number; w: number; h: number } | null,
    rotated: boolean,
    record: DrawRecord,
  ): void {
    if (!source) {
      target.drawImage(drawable, record.x, record.y, record.width, record.height);
      return;
    }

    if (!rotated) {
      target.drawImage(
        drawable,
        source.x, source.y, source.w, source.h,
        record.x, record.y, record.width, record.height,
      );
      return;
    }

    // Undo the pack rotation. The frame sits in the sheet turned 90° clockwise,
    // so `source` is already the transposed region. Translating to the sprite's
    // BOTTOM-left and turning -90° maps the packed rect back onto the sprite's
    // box; anchoring at the top-left instead shifts it up by its own height.
    if (!target.save || !target.restore || !target.translate || !target.rotate) {
      target.drawImage(
        drawable,
        source.x, source.y, source.w, source.h,
        record.x, record.y, record.width, record.height,
      );
      return;
    }
    target.save();
    target.translate(record.x, record.y + record.height);
    target.rotate(-Math.PI / 2);
    target.drawImage(drawable, source.x, source.y, source.w, source.h, 0, 0, source.w, source.h);
    target.restore();
  }

  get lastFrame(): DrawRecord[] {
    return [...this.drawn];
  }
}

/**
 * Attaches decoded images to bitmap members.
 *
 * `load` is injected because decoding differs per host: the browser uses
 * `createImageBitmap`, a Node test can hand back a placeholder. The cast layer
 * already knows each member's `imagePath` and real pixel dimensions, so this
 * only supplies the pixels.
 */
export async function attachImages(
  members: CastMember[],
  load: (imagePath: string) => Promise<LingoValue>,
): Promise<number> {
  let attached = 0;
  for (const member of members) {
    if (member.imagePath === "") continue;
    try {
      member.image = await load(member.imagePath);
      attached++;
    } catch {
      // A member whose art fails to load stays VOID and simply does not draw,
      // which is what Director does with a missing cast member.
    }
  }
  return attached;
}

export function registerStageBuiltins(stage: Stage): void {
  registerBuiltins({
    /**
     * `updateStage` REPAINTS, now, as in Director. It used to only rebuild the
     * draw list, which was harmless until something read the screen straight
     * after: the camera hides its own windows, calls `updateStage`, then grabs
     * `(the stage).image` (`CCameraInterface.TakePhoto`), and without the
     * repaint it photographed its own viewfinder.
     */
    updateStage: () => {
      stage.render(stage.lastTarget);
      return VOID;
    },
  });

  // `the stage` is a real movie property in Director, and VMK reads its rect
  // during construction — `CWindow.construct` sizes its boundary from
  // `the stage.rect`, so without this every window class throws before it
  // finishes initialising.
  // `the stage.image.depth` decides whether buildVisual allocates alpha
  // buffers, so the stage needs a real image, not just a rect.
  const blankStageImage = new LingoImage(stage.width, stage.height, 32);
  setTheProperty("stage", {
    rect: new LingoRect(0, 0, stage.width, stage.height),
    width: stage.width,
    height: stage.height,
    /**
     * `(the stage).image` — what is on screen. Read THROUGH to the page's
     * canvas, so `copyPixels` from it grabs the current frame (the camera's
     * photo). A fresh wrapper per read costs no pixels: nothing is copied until
     * someone copies from it. Before the first paint it is the old blank image.
     */
    get image(): LingoValue {
      const canvas = (stage.lastTarget as unknown as { canvas?: unknown } | undefined)?.canvas;
      if (!canvas) return blankStageImage as unknown as LingoValue;
      const live = new LingoImage(stage.width, stage.height, 32);
      (live as unknown as { ownSource: unknown }).ownSource = canvas;
      return live as unknown as LingoValue;
    },
    // VMK reads this back — `Loading_Bar_Class.construct` defaults its bar
    // background to `the stage.bgColor`, so a missing one left it VOID.
    bgColor: new LingoColor(0, 0, 0) as unknown as LingoValue,
  } as unknown as LingoValue);
  setTheProperty("lastChannel", stage.lastChannel);
}






