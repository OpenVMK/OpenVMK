// Smoke test for the faithful compositing core. Run: npx tsx client/src/lingo/lingo-composite.smoke.ts
import {
  blendInkPixel, colorize, matchesKey,
  INK_COPY, INK_MATTE, INK_BACKGROUND_TRANSPARENT, INK_DARKEST, INK_DARKEN, INK_ADD_PIN,
  type RGB,
} from "./lingo-composite.js";

let passed = 0;
let failed = 0;
function eq(name: string, got: unknown, want: unknown): void {
  const g = JSON.stringify(got), w = JSON.stringify(want);
  if (g === w) { passed++; }
  else { failed++; console.error(`FAIL ${name}\n  got  ${g}\n  want ${w}`); }
}
const BLACK: RGB = { r: 0, g: 0, b: 0 };
const WHITE: RGB = { r: 255, g: 255, b: 255 };
const PURPLE: RGB = { r: 128, g: 0, b: 128 };

// 1. THE HALO ROOT: a 50%-coverage purple edge over white must be a clean
//    straight blend (191,127,191) — NOT the double-attenuated wash the
//    premultiplied path produced, and NOT forced to opaque white.
eq("straight source-over edge over white",
  blendInkPixel(255,255,255,255, 128,0,128,128, INK_COPY,255, BLACK,null, false),
  { r: 191, g: 127, b: 191, a: 255 });

// 2. Ink 0 Copy: fully opaque source replaces the destination verbatim.
eq("copy opaque replaces",
  blendInkPixel(10,20,30,255, 200,100,50,255, INK_COPY,255, BLACK,null, false),
  { r: 200, g: 100, b: 50, a: 255 });

// 3. Ink 8 Matte: transparent source leaves dest untouched; opaque draws.
eq("matte transparent -> dest",
  blendInkPixel(9,9,9,255, 200,100,50,0, INK_MATTE,255, BLACK,null, false),
  { r: 9, g: 9, b: 9, a: 255 });
eq("matte opaque -> src",
  blendInkPixel(9,9,9,255, 200,100,50,255, INK_MATTE,255, BLACK,null, false),
  { r: 200, g: 100, b: 50, a: 255 });

// 4. Ink 36 Background-transparent: a keyed pixel drops out; a PARTIAL survivor
//    KEEPS its partial coverage (this is the fix — prepareInk force-opaqued it,
//    which is what turned near-white AA edges into the white halo).
eq("bg-transparent keyed pixel -> dest (transparent)",
  blendInkPixel(0,0,0,0, 255,255,255,255, INK_BACKGROUND_TRANSPARENT,255, BLACK,null, true),
  { r: 0, g: 0, b: 0, a: 0 });
eq("bg-transparent partial survivor keeps partial alpha (no force-opaque)",
  blendInkPixel(0,0,0,0, 100,0,0,128, INK_BACKGROUND_TRANSPARENT,255, BLACK,null, false),
  { r: 50, g: 0, b: 0, a: 128 });

// 5. Ink 41 Darken colorize: src black -> foreColor, src white -> backColor.
//    (The avatar tint. fore=black, back=shirt colour.)
const SHIRT: RGB = { r: 200, g: 40, b: 40 };
eq("darken: black src -> foreColor(black)",
  blendInkPixel(0,0,0,255, 0,0,0,255, INK_DARKEN,255, BLACK, SHIRT, false),
  { r: 0, g: 0, b: 0, a: 255 });
eq("darken: white src -> backColor(shirt)",
  blendInkPixel(0,0,0,255, 255,255,255,255, INK_DARKEN,255, BLACK, SHIRT, false),
  { r: 200, g: 40, b: 40, a: 255 });

// 6. Colorize ramp (ink 0 with back): mid-grey lands halfway fore->back.
eq("colorize mid-grey halfway fore->back",
  colorize(128,128,128, BLACK, WHITE),
  { r: 128, g: 128, b: 128 });
eq("colorize white -> back, ink0",
  colorize(255,255,255, { r:10,g:20,b:30 }, { r:200,g:210,b:220 }),
  { r: 200, g: 210, b: 220 });
// fore-only (ink 8/9): only near-black recoloured, colour art untouched.
eq("colorize fore-only leaves colour art",
  colorize(180,60,60, BLACK, null),
  { r: 180, g: 60, b: 60 });
eq("colorize fore-only stamps near-black",
  colorize(0,0,0, PURPLE, null),
  { r: 128, g: 0, b: 128 });

// 7. Darkest keeps the per-channel minimum (grey-mask union parity with copyIntoLevels).
eq("darkest per-channel min",
  blendInkPixel(100,100,100,255, 40,200,60,255, INK_DARKEST,255, BLACK,null, false),
  { r: 40, g: 100, b: 60, a: 255 });

// 8. Blend param scales coverage: 50% blend of opaque purple over white.
eq("blend param halves coverage",
  blendInkPixel(255,255,255,255, 128,0,128,255, INK_COPY,128, BLACK,null, false),
  { r: 191, g: 127, b: 191, a: 255 });

// 9. matchesKey tolerance + transparent-is-background.
eq("matchesKey exact white", matchesKey(255,255,255,255, WHITE, 0), true);
eq("matchesKey near-white tol 0 misses", matchesKey(248,248,248,255, WHITE, 0), false);
eq("matchesKey near-white tol 8 hits", matchesKey(248,248,248,255, WHITE, 8), true);
eq("matchesKey transparent is background", matchesKey(12,34,56,0, WHITE, 0), true);

console.log(`\nlingo-composite smoke: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
