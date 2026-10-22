// Straight-alpha, integer, single-pass ink compositing — the faithful core.
//
// WHY THIS EXISTS
// The port grew two separate compositors (`copyPixels` image-to-image and
// `prepareInk` for sprites), each a stack of local canvas patches that composite
// in the browser's PREMULTIPLIED colour space and special-case inks one at a
// time. That diverges from Director, which does ONE straight-alpha integer pass:
// resolve a matte/colorize, fold source alpha and #blend into one coverage, then
// blend per channel. Premultiplied round-trips lighten anti-aliased edges (white
// halos) and the per-ink shortcuts drift (missing matte, over-gated colorize).
//
// This module is that one faithful pass, ported from the two references:
//   DirPlayer  vm-rust/src/player/bitmap/drawing.rs  (blend_pixel, :130-321)
//   LibreShock cpp/src/bitmap/Drawing.cpp            (applyInk, :799-909)
//              cpp/src/bitmap/BitmapColorizer.cpp     (colorize, :43-178)
//
// It is PURE (no canvas, no DOM) and unit-tested (lingo-composite.smoke.ts), so
// it can be validated in isolation before the live paths are routed through it.
// Nothing imports it yet — wiring is a later, separately-validated step.

export const INK_COPY = 0;
export const INK_MATTE = 8;
export const INK_MASK = 9;
export const INK_ADD_PIN = 33;
export const INK_ADD = 34;
export const INK_SUBTRACT_PIN = 35;
export const INK_BACKGROUND_TRANSPARENT = 36;
export const INK_LIGHTEST = 37;
export const INK_DARKEST = 39;
export const INK_LIGHTEN = 40;
export const INK_DARKEN = 41;

export interface RGB {
  r: number;
  g: number;
  b: number;
}

const clamp8 = (v: number): number => (v < 0 ? 0 : v > 255 ? 255 : v);

/**
 * Director colorize — the intensity ramp both references share.
 *   DirPlayer drawing.rs:3210-3225 · LibreShockwave BitmapColorizer.cpp:43-55
 *
 * A source pixel's grey INTENSITY selects a point on the fore→back ramp:
 * intensity 0 (black) → foreColor, intensity 255 (white) → backColor. With no
 * back colour (inks 8/9, which take foreColor ONLY) a pixel is recoloured to
 * foreColor solely when it is essentially black (intensity <= 1); every other
 * pixel keeps its own colour, so colour art is untouched and only a 1-bit/grey
 * stencil is stamped. `useBack` is true for ink 0 (Copy) only.
 */
export function colorize(r: number, g: number, b: number, fore: RGB, back: RGB | null): RGB {
  const intensity = (r + g + b) / 3;
  if (back) {
    const t = intensity / 255;
    return {
      r: Math.round(fore.r + (back.r - fore.r) * t),
      g: Math.round(fore.g + (back.g - fore.g) * t),
      b: Math.round(fore.b + (back.b - fore.b) * t),
    };
  }
  if (intensity <= 1) return { r: fore.r, g: fore.g, b: fore.b };
  return { r, g, b };
}

/** Whether an ink is allowed to colorize at all (0/8/9), and whether it uses backColor (0 only). */
export function inkColorizes(ink: number): boolean {
  return ink === INK_COPY || ink === INK_MATTE || ink === INK_MASK;
}
export function inkUsesBackColor(ink: number): boolean {
  return ink === INK_COPY;
}

/** Rec.601 luma, the reference's "which pixel is darker/lighter" measure (drawing.rs:238-285). */
const luma = (r: number, g: number, b: number): number => 299 * r + 587 * g + 114 * b;

export interface BlendResult {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Composite ONE straight-alpha source pixel over ONE straight-alpha dest pixel
 * under the given ink. `srcA` is 0-255; `blend` is 0-255 (the #blend param, 255 =
 * opaque). `fore`/`back` are the resolved sprite fore/back colours; `keyMatched`
 * is true when this pixel equals the background key for the bg-sensitive inks
 * (33/35/36/37/39/40) — the caller computes it once with the right tolerance.
 *
 * Returns the new straight-alpha dest pixel. Colorize is applied to the source
 * FIRST (drawing.rs does it in copy_pixels_with_params before blend_pixel).
 *
 * Ports blend_pixel (drawing.rs:130-321) with LibreShockwave (Drawing.cpp:799-909)
 * cross-checked; per-channel Darkest/Lightest follows LibreShockwave (:882-887),
 * documented divergence from DirPlayer's whole-pixel-by-luma, because our grey
 * alpha masks are equal-channel so the two agree there and per-channel is what
 * copyIntoLevels already does.
 */
export function blendInkPixel(
  dstR: number, dstG: number, dstB: number, dstA: number,
  srcR: number, srcG: number, srcB: number, srcA: number,
  ink: number, blend: number,
  fore: RGB, back: RGB | null,
  keyMatched: boolean,
): BlendResult {
  // 1. Colorize the source (inks 0/8/9 only; back only for ink 0).
  if (inkColorizes(ink)) {
    const c = colorize(srcR, srcG, srcB, fore, inkUsesBackColor(ink) ? back : null);
    srcR = c.r; srcG = c.g; srcB = c.b;
  }

  // 2. Effective coverage folds source alpha and #blend into one (drawing.rs:141).
  const blendF = blend / 255;
  const eff = (srcA / 255) * blendF;

  // straight-alpha source-over of RGB, and of the alpha channel, at coverage `k`.
  const over = (k: number): BlendResult => ({
    r: clamp8(Math.round(srcR * k + dstR * (1 - k))),
    g: clamp8(Math.round(srcG * k + dstG * (1 - k))),
    b: clamp8(Math.round(srcB * k + dstB * (1 - k))),
    a: clamp8(Math.round(255 * k + dstA * (1 - k))),
  });

  switch (ink) {
    case INK_MATTE:
    case INK_MASK:
      if (srcA <= 0) return { r: dstR, g: dstG, b: dstB, a: dstA };
      return over(eff);

    case INK_BACKGROUND_TRANSPARENT:
      // Background pixels drop out entirely; survivors composite normally.
      if (keyMatched || srcA <= 0) return { r: dstR, g: dstG, b: dstB, a: dstA };
      return over(eff);

    case INK_ADD_PIN:
    case INK_ADD: {
      if (keyMatched) return { r: dstR, g: dstG, b: dstB, a: dstA };
      const aR = clamp8(dstR + srcR), aG = clamp8(dstG + srcG), aB = clamp8(dstB + srcB);
      return {
        r: clamp8(Math.round(aR * eff + dstR * (1 - eff))),
        g: clamp8(Math.round(aG * eff + dstG * (1 - eff))),
        b: clamp8(Math.round(aB * eff + dstB * (1 - eff))),
        a: clamp8(Math.round(255 * eff + dstA * (1 - eff))),
      };
    }

    case INK_SUBTRACT_PIN: {
      if (keyMatched) return { r: dstR, g: dstG, b: dstB, a: dstA };
      const sR = clamp8(dstR - srcR), sG = clamp8(dstG - srcG), sB = clamp8(dstB - srcB);
      return {
        r: clamp8(Math.round(sR * eff + dstR * (1 - eff))),
        g: clamp8(Math.round(sG * eff + dstG * (1 - eff))),
        b: clamp8(Math.round(sB * eff + dstB * (1 - eff))),
        a: clamp8(Math.round(255 * eff + dstA * (1 - eff))),
      };
    }

    case INK_DARKEST: {
      if (keyMatched) return { r: dstR, g: dstG, b: dstB, a: dstA };
      const dR = Math.min(dstR, srcR), dG = Math.min(dstG, srcG), dB = Math.min(dstB, srcB);
      return {
        r: clamp8(Math.round(dR * eff + dstR * (1 - eff))),
        g: clamp8(Math.round(dG * eff + dstG * (1 - eff))),
        b: clamp8(Math.round(dB * eff + dstB * (1 - eff))),
        a: clamp8(Math.round(255 * eff + dstA * (1 - eff))),
      };
    }

    case INK_LIGHTEST: {
      if (keyMatched) return { r: dstR, g: dstG, b: dstB, a: dstA };
      const lR = Math.max(dstR, srcR), lG = Math.max(dstG, srcG), lB = Math.max(dstB, srcB);
      return {
        r: clamp8(Math.round(lR * eff + dstR * (1 - eff))),
        g: clamp8(Math.round(lG * eff + dstG * (1 - eff))),
        b: clamp8(Math.round(lB * eff + dstB * (1 - eff))),
        a: clamp8(Math.round(255 * eff + dstA * (1 - eff))),
      };
    }

    case INK_DARKEN: {
      // Per-channel mix(src, fore, back): src=black→foreColor, src=white→backColor
      // (drawing.rs:307-318). This is the avatar's whole colour scheme; back
      // defaults to the sprite bgColor, fore to foreColor.
      const f = fore, k = back ?? { r: 255, g: 255, b: 255 };
      const mix = (s: number, fc: number, bc: number): number => Math.round(fc + (bc - fc) * (s / 255));
      const mR = mix(srcR, f.r, k.r), mG = mix(srcG, f.g, k.g), mB = mix(srcB, f.b, k.b);
      return {
        r: clamp8(Math.round(mR * eff + dstR * (1 - eff))),
        g: clamp8(Math.round(mG * eff + dstG * (1 - eff))),
        b: clamp8(Math.round(mB * eff + dstB * (1 - eff))),
        a: clamp8(Math.round(255 * eff + dstA * (1 - eff))),
      };
    }

    case INK_COPY:
    default:
      // Copy: opaque source replaces; partial source is straight source-over.
      if (blend >= 255 && srcA >= 255) return { r: srcR, g: srcG, b: srcB, a: 255 };
      return over(eff);
  }
}

/** For inks that key a background colour, whether a pixel matches the key within tolerance. */
export function matchesKey(
  r: number, g: number, b: number, a: number,
  key: RGB, tolerance: number,
): boolean {
  if (a === 0) return true; // already transparent counts as background
  return (
    Math.abs(r - key.r) <= tolerance &&
    Math.abs(g - key.g) <= tolerance &&
    Math.abs(b - key.b) <= tolerance
  );
}

export { luma };
