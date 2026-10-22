/**
 * HINTED glyph atlases, so text can be blitted rather than drawn by canvas.
 *
 * WHY THIS EXISTS
 *
 * Director on Windows rasterised text through GDI, which GRID-FITS glyphs with
 * the font's hinting bytecode before rasterising. Canvas has no equivalent:
 * its own rasteriser is only lightly hinted (too heavy — measured 20.9-30.9 ink
 * px per character against the original's 14.7, with stems flickering between
 * 1px and 2px), and supersampling the outline and point-sampling it skips
 * hinting altogether (right weight, wrong letterforms). No threshold bridges
 * that, because grid-fitting happens BEFORE rasterisation.
 *
 * `tools/build-glyph-atlas.ps1` rasterises through the SAME GDI, with
 * `SingleBitPerPixelGridFit` — hinted and aliased, exactly what Director used.
 * MEASURED on the registration name list against a native-resolution capture,
 * rendering "SparkleComet185":
 *
 *     reference        inkPx 220   ink/char 14.7   S 8 rows   o 6 rows
 *     Arial 11px GDI   inkPx 221   ink/char 14.7   S 8 rows   o 6 rows
 *
 * ⚠ THE ATLAS SUPPLIES BITMAPS, NOT ADVANCES. The same reference spans 95px
 * where GDI's own 11px advances give 83px, while the 12px advances the client
 * already measures give 96px — the original rasterises glyphs at one ppem and
 * spaces them on another. So positioning stays with `measureText` and only the
 * glyph IMAGES come from here. Do not "simplify" that by baking in advances.
 */

interface GlyphBox {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Bearings from the pen origin and the BASELINE, as GDI laid the glyph out. */
  left: number;
  top: number;
  /** The reference's EXACT integer pen advance for this glyph — see `adv` note. */
  adv: number;
}

export interface GlyphAtlas {
  family: string;
  renderSize: number;
  ascent: number;
  lineHeight: number;
  sheet: HTMLCanvasElement;
  glyphs: Map<number, GlyphBox>;
}

interface AtlasFile {
  family: string;
  style: string;
  renderSize: number;
  antiAliased: boolean;
  ascent: number;
  descent: number;
  lineHeight?: number;
  first: number;
  last: number;
  glyphs: Record<string, { w: number; h: number; left: number; top: number; adv?: number; rows?: string[] }>;
}

/**
 * Which run gets which atlas.
 *
 * ⚠ Keyed on the DIRECTOR font name and the run's size — the size the client
 * measures advances at, NOT the atlas's render size. See the note above about
 * the two differing.
 */
const REGISTRY: Array<{ match: RegExp; size: number; file: string }> = [
  { match: /^arial$/i, size: 12, file: "arial-11" },
  /**
   * ⚠ FOLIO'S ATLAS IS GREYSCALE, AND THAT IS THE WHOLE POINT.
   *
   * "Atlas" does not mean "aliased". The `folio-aa-14.json` that shipped was
   * binary — MEASURED at 2 distinct coverage levels across the entire sheet —
   * and a native capture of the navigator shows those captions SMOOTH, so it
   * looked wrong on the map. That was a property of that FILE, not of this
   * mechanism: `libreshockwave_pfr_to_atlas` rasterises the PFR's own outlines
   * with sub-pixel coverage.
   *
   * ⚠ AND THE WEIGHT IS WHY IT IS WORTH HAVING AT ALL. Three rasterisers of the
   * same face at the same nominal size, coverage ink for "THE HAUNTED MANSION":
   *
   *     PFR outlines (pfr_to_atlas, ppem 14)    681
   *     canvas, converted TTF at 14px           814   <- +20%, "a bit bolded"
   *     font_probe renderText at 14            1036   <- synthetic bold on top
   *                                                      of an already-bold
   *                                                      face; not a reference
   *
   * Plain `fillText` on the converted TTF is the 814 — heavier than the PFR it
   * came from, and a pixel taller (12 rows against the PFR's 11). No font size
   * fixes both: 13px matches the height and loses 6px of width.
   *
   * ⚠ AND YET FOLIO IS NOT REGISTERED, because the atlas TRADES the weight
   * error for a worse one. `pfr_to_atlas` grid-fits every glyph onto the pixel
   * grid, and at these sizes that visibly deforms the letters — the `M` and `W`
   * lose their diagonals — while its 4x sub-sampling gives only 5 coverage
   * levels, which reads as chunky next to canvas's smooth edges. Judged side by
   * side against the capture at 5x, the 20% overweight is the smaller error.
   *
   * ⚠ SO THE REAL FIX IS UPSTREAM, IN `libreshockwave_pfr_to_ttf`. The
   * converted TTF is simply fatter than the PFR it was made from; nothing the
   * renderer does can take weight out of an outline it is handed. Compare the
   * TTF's stem widths against the PFR's `orus` control values before touching
   * this file again — and do NOT reach for a font size, which changes width and
   * weight together and can only match one of them.
   *
   * `folio-15.json` is kept next to the others as the reference rasterisation to
   * measure against.
   */
  { match: /^foxley\s*816$/i, size: 16, file: "foxley816-16" },
  { match: /^foxley\s*816\s*bold$/i, size: 16, file: "foxley816bold-16" },
  /**
   * ⚠ FOXLEY AT 12px — the catalog shop list (and every other aliased Foxley run
   * measured at 12) had NO atlas here, so it fell to the supersample centre-test
   * in `fillTextAliased`. Foxley's converted TTF at 12px point-samples to almost
   * nothing there (MEASURED: "Hats" reduced to sparse fragments — the garbled
   * shop categories). GDI `SingleBitPerPixelGridFit` at 12px hints it cleanly,
   * exactly as the 16px atlas does. Built by `build-glyph-atlas.ps1 -Family
   * Foxley816 -RenderSize 12 -Name foxley816-12 -FontFile Foxley816.ttf`.
   */
  { match: /^foxley\s*816$/i, size: 12, file: "foxley816-12" },
  /**
   * FOXLEY AT 15px — the Jungle Cruise sign-up instructions
   * (`vmk_jc_instructions.window`, `#fontSize: 15`, `#antialias: 0`) fell to
   * the centre-test and came out warped, the same way 12px did. Same build:
   * `build-glyph-atlas.ps1 -Family Foxley816 -RenderSize 15 -Name foxley816-15`.
   */
  { match: /^foxley\s*816$/i, size: 15, file: "foxley816-15" },
];

const loaded = new Map<string, GlyphAtlas>();

/** Strip Director's trailing `*` and surrounding space, as `substituteFont` does. */
function normaliseFontName(font: string | undefined): string {
  return (font ?? "").replace(/\s*\*\s*$/, "").trim();
}

function buildSheet(file: AtlasFile): GlyphAtlas | null {
  const entries: Array<[number, { w: number; h: number; left: number; top: number; rows?: string[] }]> = [];
  for (const [code, glyph] of Object.entries(file.glyphs)) {
    entries.push([Number(code), glyph]);
  }
  let width = 0;
  let height = 1;
  for (const [, glyph] of entries) {
    if (!glyph.rows || glyph.w <= 0) continue;
    width += glyph.w + 1;
    if (glyph.h > height) height = glyph.h;
  }
  if (width <= 0) return null;

  const sheet = document.createElement("canvas");
  sheet.width = width;
  sheet.height = height;
  const context = sheet.getContext("2d");
  if (!context) return null;

  const glyphs = new Map<number, GlyphBox>();
  let penX = 0;
  for (const [code, glyph] of entries) {
    if (!glyph.rows || glyph.w <= 0) {
      glyphs.set(code, { x: 0, y: 0, w: 0, h: 0, left: glyph.left, top: glyph.top, adv: glyph.adv ?? 0 });
      continue;
    }
    const image = context.createImageData(glyph.w, glyph.h);
    for (let row = 0; row < glyph.rows.length; row++) {
      const hex = glyph.rows[row]!;
      for (let col = 0; col < glyph.w; col++) {
        // Coverage is stored as one hex byte per pixel; the glyph is a MASK, so
        // the colour is supplied later by the tint pass.
        const value = parseInt(hex.slice(col * 2, col * 2 + 2), 16) || 0;
        const at = (row * glyph.w + col) * 4;
        image.data[at] = 255;
        image.data[at + 1] = 255;
        image.data[at + 2] = 255;
        image.data[at + 3] = value;
      }
    }
    context.putImageData(image, penX, 0);
    glyphs.set(code, { x: penX, y: 0, w: glyph.w, h: glyph.h, left: glyph.left, top: glyph.top, adv: glyph.adv ?? 0 });
    penX += glyph.w + 1;
  }
  return {
    family: file.family,
    renderSize: file.renderSize,
    ascent: file.ascent,
    lineHeight: file.lineHeight ?? file.ascent + file.descent,
    sheet,
    glyphs,
  };
}

/**
 * Fetch every registered atlas. Called once at boot, BEFORE the first frame —
 * the compositor draws synchronously and cannot wait for a fetch, so an atlas
 * that arrives late would simply never be used for the text already composed.
 */
export async function loadGlyphAtlases(base = "fonts/atlas"): Promise<number> {
  let ready = 0;
  await Promise.all(REGISTRY.map(async (entry) => {
    if (loaded.has(entry.file)) { ready++; return; }
    try {
      const response = await fetch(`${base}/${entry.file}.json`);
      if (!response.ok) return;
      const built = buildSheet((await response.json()) as AtlasFile);
      if (built) { loaded.set(entry.file, built); ready++; }
    } catch {
      // A missing atlas is not fatal — the caller falls back to drawing text.
    }
  }));
  return ready;
}

/** The atlas for this run, or null to fall back to canvas text. */
export function atlasFor(font: string | undefined, size: number): GlyphAtlas | null {
  const name = normaliseFontName(font);
  for (const entry of REGISTRY) {
    if (entry.size === size && entry.match.test(name)) {
      return loaded.get(entry.file) ?? null;
    }
  }
  return null;
}

/**
 * Measure a text member THE WAY THE REFERENCE DID, from the atlas's exact
 * integer advances — the completion of the pt→px work. When a face has an atlas
 * (Foxley), the member's image size, wrap, and `charPosToLoc` centring all come
 * from the same advances the glyphs are drawn with, so `measureText`'s fractional
 * drift never enters the layout. Returns null (→ caller uses canvas measure) for
 * a face with no atlas. Advances are cumulative on the CURRENT line, matching
 * `canvasMeasurer`. See [[font-size-points-vs-pixels]].
 */
export function measureAtlasText(
  font: string | undefined,
  size: number,
  text: string,
  fixedLineSpace: number,
): { width: number; height: number; lineHeight: number; ascent: number; advances: number[] } | null {
  const atlas = atlasFor(font, size);
  if (!atlas) return null;
  /**
   * ⚠ ONLY atlases that carry advances can drive measurement. The PFR atlases
   * (BitmapFontToAtlas) do; the older GDI-built ones (arial-11, folio-15) do
   * NOT, and reading their absent `adv` as 0 measured every string to width 0 —
   * which made the help topics (Arial) VANISH. Bail to the canvas measurer when
   * a representative glyph has no advance.
   */
  const probe = atlas.glyphs.get(0x4D /* 'M' */) ?? atlas.glyphs.get(0x61 /* 'a' */);
  if (!probe || probe.adv <= 0) return null;
  const advOf = (ch: string): number => {
    const box = atlas.glyphs.get(ch.codePointAt(0) ?? 0);
    return box ? box.adv : 0;
  };
  const lines = text.split(/\r\n|\r|\n/);
  const advances: number[] = [0];
  let x = 0;
  for (const ch of text) {
    x = (ch === "\r" || ch === "\n") ? 0 : x + advOf(ch);
    advances.push(x);
  }
  let width = 0;
  for (const line of lines) {
    let w = 0;
    for (const ch of line) w += advOf(ch);
    if (w > width) width = w;
  }
  const lineHeight = fixedLineSpace || atlas.lineHeight;
  return {
    width: Math.ceil(width),
    height: lineHeight * Math.max(lines.length, 1),
    lineHeight,
    ascent: atlas.ascent,
    advances,
  };
}

/**
 * Blit one line from the atlas, tinted, anchored exactly where `fillText` would
 * have put it.
 *
 * `advanceOf` supplies the per-character advance — deliberately the CALLER's
 * measurement rather than the atlas's own, see the note at the top.
 */
/**
 * ⚠ RENDERED-LINE CACHE — the decisive text-perf fix.
 *
 * `Stage.render` is immediate-mode: it redraws every text sprite glyph-by-glyph
 * EVERY FRAME, even when the string never changes. Each draw allocated a canvas,
 * called `measureText` twice per character, and did a `drawImage` per glyph —
 * MEASURED on a shop tab: 431k `drawImage` + 685k `measureText` for one switch,
 * because ~1.5k glyphs re-rendered ~290 frames. Caching the finished (tinted)
 * line canvas turns every repeat frame into a single blit.
 *
 * Keyed on everything that changes the BITMAP — atlas (font+size), colour, and
 * the text — but NOT `align`/position, which is applied at blit time. Bounded
 * with insertion-order eviction; a evicted hot line just re-renders once.
 */
interface CachedLine { canvas: HTMLCanvasElement; maxTop: number; total: number; }
const lineCache = new Map<string, CachedLine>();
const LINE_CACHE_MAX = 4000;

/** Ink extent of one off-atlas character in `font`, from a shared canvas. */
let inkProbe: CanvasRenderingContext2D | null = null;
function fallbackInk(ch: string, font: string): { ascent: number; descent: number } {
  inkProbe ??= document.createElement("canvas").getContext("2d");
  if (!inkProbe) return { ascent: 0, descent: 0 };
  inkProbe.font = font;
  const m = inkProbe.measureText(ch);
  return {
    ascent: Math.ceil(m.actualBoundingBoxAscent),
    descent: Math.ceil(m.actualBoundingBoxDescent),
  };
}

export function drawAtlasText(
  target: { drawImage(image: unknown, ...rest: number[]): void },
  atlas: GlyphAtlas,
  text: string,
  x: number,
  y: number,
  colour: string,
  align: string,
  advanceOf: (ch: string) => number,
  /**
   * The run's CSS font, for characters the atlas does not have.
   *
   * ⚠ The atlases are baked for printable ASCII (32-126) only, and a missing
   * glyph used to advance the pen and draw NOTHING: "Disneyland®" rendered as
   * "Disneyland  " in every room description, and likewise ©, é, ç, §. The
   * faces themselves all carry those glyphs, so an off-atlas character is
   * drawn from the real font; ASCII keeps its hinted atlas bitmap.
   */
  fallbackFont?: string,
): boolean {
  if (text === "") return true;

  const key = `${atlas.family} ${String(atlas.renderSize)} ${colour} ${fallbackFont ?? ""} ${text}`;
  let entry = lineCache.get(key);
  if (entry === undefined) {
    // Pen advance from the atlas's OWN exact integer (what the reference
    // rasteriser used); fall back to the caller's measure only for a glyph the
    // atlas has no advance for. Removes canvas measureText drift from the line.
    const advOf = (ch: string): number => {
      const box = atlas.glyphs.get(ch.codePointAt(0) ?? 0);
      return box && box.adv > 0 ? box.adv : advanceOf(ch);
    };
    let total = 0;
    for (const ch of text) total += advOf(ch);

    let maxTop = 0;
    let maxBottom = 0;
    for (const ch of text) {
      const box = atlas.glyphs.get(ch.codePointAt(0) ?? 0);
      if (!box && fallbackFont) {
        const ink = fallbackInk(ch, fallbackFont);
        if (ink.ascent > maxTop) maxTop = ink.ascent;
        if (ink.descent > maxBottom) maxBottom = ink.descent;
        continue;
      }
      if (!box || box.w <= 0) continue;
      if (-box.top > maxTop) maxTop = -box.top;
      if (box.top + box.h > maxBottom) maxBottom = box.top + box.h;
    }
    const width = Math.ceil(total) + 4;
    const height = maxTop + maxBottom + 2;
    if (width <= 0 || height <= 0) return true;

    const scratch = document.createElement("canvas");
    scratch.width = width;
    scratch.height = height;
    const context = scratch.getContext("2d");
    if (!context) return false;

    // Glyphs land on whole pixels — GDI advanced the pen in whole pixels, and a
    // fractional blit would resample the hinted bitmap and undo the point of it.
    let pen = 0;
    for (const ch of text) {
      const box = atlas.glyphs.get(ch.codePointAt(0) ?? 0);
      if (!box && fallbackFont) {
        context.font = fallbackFont;
        context.textAlign = "left";
        context.textBaseline = "alphabetic";
        context.fillStyle = "#ffffff";
        context.fillText(ch, Math.round(pen), maxTop);
      } else if (box && box.w > 0) {
        context.drawImage(
          atlas.sheet,
          box.x, box.y, box.w, box.h,
          Math.round(pen) + box.left, maxTop + box.top, box.w, box.h,
        );
      }
      pen += advOf(ch);
    }

    // The sheet is a white mask; take the run's colour through it.
    context.globalCompositeOperation = "source-in";
    context.fillStyle = colour;
    context.fillRect(0, 0, width, height);

    entry = { canvas: scratch, maxTop, total };
    if (lineCache.size >= LINE_CACHE_MAX) {
      const oldest = lineCache.keys().next().value;
      if (oldest !== undefined) lineCache.delete(oldest);
    }
    lineCache.set(key, entry);
  }

  /**
   * ⚠ FLOOR, NOT ROUND — Lingo's `/` on integers TRUNCATES.
   *
   * Director centres with integer arithmetic:
   *
   *     CScale9Grid.render   t_w = (t_Img.rect.width - t_iTxtWidth) / 2
   *
   * so a half-pixel lands one pixel LEFT of where rounding puts it. MEASURED on
   * "Splash Mountain Bayou" (`reg.roomstyle.hd`, align #center): the original
   * starts at x 597 and rounding put us at 598, while every LEFT-aligned line in
   * the same block matched exactly — which is what identified the anchor rather
   * than the glyphs as the culprit.
   *
   * Left-aligned runs are unaffected: `x` is already an integer there, so floor
   * and round agree.
   */
  const left = align === "center" ? x - entry.total / 2 : align === "right" ? x - entry.total : x;
  target.drawImage(entry.canvas, Math.floor(left), Math.round(y) - entry.maxTop);
  return true;
}
