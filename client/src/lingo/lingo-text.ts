/**
 * Text measurement for text and field cast members.
 *
 * VMK's layout engine measures before it draws. `CWindowTextWrapper` asks a text
 * member for `the image`, `the height` and `charPosToLoc(...)` to size and centre
 * every caption, so the whole window geometry is downstream of these numbers —
 * a wrong width does not raise anything, it just puts every element in the wrong
 * place.
 *
 * The measurer is pluggable because the two hosts differ: the browser has the
 * converted PFR1 fonts and a real canvas, while the Node smoke suite has
 * neither. The fallback is deliberately marked as an estimate (see
 * `isEstimated`) rather than quietly pretending to be authoritative.
 */

/**
 * The PFR1 faces LibreShockwave converted, as `[cssFamily, file]`.
 *
 * ⚠ ONE SPELLING, USED EVERYWHERE. These names are what `FontFace` registers
 * the faces under, so they are also the only names a `context.font` string can
 * successfully ask for.
 *
 * This existed twice before, spelled differently: the loader registered
 * `Foxley816` while the DRAW path asked for `"Foxley 816"`. Nothing errors when
 * a CSS font-family does not resolve — the canvas silently falls back — so text
 * was MEASURED with the real converted face and PAINTED with Georgia. Every
 * caption in the client came out in the wrong face at a width its layout had
 * not reserved, which is the "text looks wrong" that survived every other
 * rendering fix. Keep the list here and import it; do not re-spell it.
 */
export const CONVERTED_FONTS: ReadonlyArray<readonly [string, string]> = [
  ["Foxley816", "Foxley816.ttf"],
  ["Foxley816Bold", "Foxley816Bold.ttf"],
  ["FolioBoldCondensed", "FolioBoldCondensed.ttf"],
];

/**
 * ⚠ DIRECTOR FONT SIZES ARE POINTS. Windows rendered them through GDI at 96 DPI,
 * so a point is 96/72 of a pixel and `fontSize 12` draws at 16px. Every pixel
 * operation — measuring a caption's box, sizing a text member's image, laying
 * out a wrap, and the glyph raster in `lingo-stage` — converts here first, so
 * the image a member reports is as wide as the glyphs that will be drawn into it
 * (otherwise the last letter overflows the buffer and is clipped). See the same
 * note in `lingo-stage`, which imports this.
 */
export function ptToPx(pt: number): number {
  return Math.round(pt * 96 / 72);
}

export interface MeasuredText {
  /** Widest line, in pixels. */
  width: number;
  /** Total height of all lines. */
  height: number;
  /** Distance between baselines. */
  lineHeight: number;
  /** Baseline offset of the first line from the top. */
  ascent: number;
  /** Cumulative x for each character index; `advances[i]` is the x AFTER i chars. */
  advances: number[];
  /** False only when a real font was consulted. */
  estimated: boolean;
}

export interface TextRequest {
  text: string;
  font: string;
  fontSize: number;
  /** Director style symbols, already stripped of their `#`. */
  fontStyle: string[];
  /** 0 disables wrapping. */
  wrapWidth: number;
  /** Director's `fixedLineSpace`; 0 means "use the font's natural leading". */
  fixedLineSpace: number;
}

export type TextMeasurer = (request: TextRequest) => MeasuredText;

/**
 * ⚠ A guess, not a measurement. Director's own metrics come from the embedded
 * PFR1 fonts; without them every advance here is a ratio of the point size.
 * Anything laid out from these numbers is approximately, not correctly, placed.
 */
function estimate(request: TextRequest): MeasuredText {
  const size = request.fontSize || 12;
  const bold = request.fontStyle.includes("bold");
  // Condensed pixel faces of this era run narrow; 0.5em is closer than the 0.6em
  // a modern proportional font would suggest.
  const perChar = size * (bold ? 0.54 : 0.5);
  const lines = request.text.split(/\r\n|\r|\n/);
  const lineHeight = request.fixedLineSpace || Math.round(size * 1.25);

  const advances: number[] = [0];
  let x = 0;
  for (const char of request.text) {
    x += char === "\r" || char === "\n" ? 0 : perChar;
    advances.push(x);
  }

  return {
    width: Math.ceil(Math.max(...lines.map((line) => line.length * perChar), 0)),
    height: lineHeight * Math.max(lines.length, 1),
    lineHeight,
    ascent: Math.round(size * 0.8),
    advances,
    estimated: true,
  };
}

let measurer: TextMeasurer = estimate;
let measurements = 0;
let estimated = 0;

export function setTextMeasurer(fn: TextMeasurer): void {
  measurer = fn;
}

export function measureText(request: TextRequest): MeasuredText {
  const result = measurer(request);
  measurements++;
  if (result.estimated) estimated++;
  return result;
}

/**
 * How much of the layout rests on guessed metrics. Reported rather than
 * inferred, because estimated text produces a window that looks plausible and
 * is wrong — the same failure mode as every other defect in this port.
 */
export function textMeasurementReport(): { total: number; estimated: number } {
  return { total: measurements, estimated };
}

export function resetTextMeasurement(): void {
  measurements = 0;
  estimated = 0;
}

/**
 * Builds a canvas-backed measurer. The caller supplies a 2D context factory so
 * this module stays free of DOM types; `document.createElement("canvas")` and
 * `OffscreenCanvas` both work.
 */
export function canvasMeasurer(
  context: {
    font: string;
    measureText: (text: string) => {
      width: number;
      actualBoundingBoxAscent?: number;
      actualBoundingBoxDescent?: number;
    };
  },
  /** Maps a Director font name to a CSS family that is actually loaded. */
  resolveFamily: (name: string) => string,
): TextMeasurer {
  return (request) => {
    const style = request.fontStyle.includes("bold") ? "bold " : "";
    const slant = request.fontStyle.includes("italic") ? "italic " : "";
    const size = request.fontSize || 12;
    context.font = `${slant}${style}${size}px "${resolveFamily(request.font)}"`;

    const lines = request.text.split(/\r\n|\r|\n/);
    const advances: number[] = [0];
    let x = 0;
    // Cumulative measurement rather than per-character widths: it is the only
    // way to pick up kerning, and charPosToLoc is a cumulative query anyway.
    let seen = "";
    for (const char of request.text) {
      seen += char;
      x = context.measureText(seen.split(/\r\n|\r|\n/).pop() ?? "").width;
      advances.push(x);
    }

    const sample = context.measureText("Hg");
    const ascent = sample.actualBoundingBoxAscent ?? size * 0.8;
    const descent = sample.actualBoundingBoxDescent ?? size * 0.2;
    const lineHeight = request.fixedLineSpace || Math.ceil(ascent + descent + 2);

    return {
      width: Math.ceil(Math.max(...lines.map((line) => context.measureText(line).width), 0)),
      height: lineHeight * Math.max(lines.length, 1),
      lineHeight,
      ascent: Math.round(ascent),
      advances,
      estimated: false,
    };
  };
}
