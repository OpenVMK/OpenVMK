/**
 * Director builtins reachable from the transpiled framework cast.
 *
 * Scope was measured, not guessed. Across all 987 handlers of `core.old.cct`
 * there are 2,314 `callNamed` sites hitting 162 distinct names — but 97 of
 * those (896 sites) resolve to VMK's own transpiled handlers. Only **65
 * distinct names (1,418 sites) are actual Director builtins**, and they fall
 * into three groups:
 *
 *   pure value ops   — implemented here, need nothing from the host
 *   value types      — point / rect / rgb / image, small classes
 *   engine surface   — member / sprite / castLib / net*, deliberately absent
 *
 * The engine group is left unregistered on purpose: `callNamed` throws a named
 * error and records the name in `missingBuiltins`, so the renderer work list
 * builds itself instead of the port silently reading `undefined`.
 */
import {
  LINGO_ILK,
  LINGO_NATIVE,
  LingoFloat,
  formatLingoFloat,
  formatLingoNumber,
  installStringChunks,
  callAncestor,
  callFrames,
  callMethod,
  LingoList,
  LingoPropList,
  objectRespondsTo,
  registerBuiltins,
  symbol,
  VOID,
  type LingoValue,
} from "./lingo-runtime.js";
import { soundChannelFor } from "./lingo-sound.js";

function num(value: LingoValue): number {
  if (typeof value === "number") return value;
  /**
   * ⚠ A boxed float is a NUMBER. Missing this reads it as 0, and the failure is
   * remote from the cause: `CCastLoadTask.OneCastDone` counts with
   * `pLoadedSoFar = pLoadedSoFar + 1.0` — a float — and the queue finishes when
   * `integer(pLoadedSoFar) = pCastcount`. Answering 0 meant the comparison never
   * held, `load_casts` never completed, and the boot sat on the logo forever
   * with all 37 casts attached. See `LingoFloat`.
   */
  if (value instanceof LingoFloat) return value.value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function str(value: LingoValue): string {
  if (value === VOID) return "";
  if (typeof value === "string") return value;
  // A boxed float prints as its number, not as "[object Object]" — to `the
  // floatPrecision` decimals, which is how Director writes every float.
  if (value instanceof LingoFloat) return formatLingoFloat(value.value);
  if (typeof value === "number") return formatLingoNumber(value);
  // ⚠ Same reason as `toStringValue`: a Lingo class can define its own
  // `toString` handler, which needs the instance as its receiver.
  if (
    value !== null &&
    typeof value === "object" &&
    typeof (value as { toString?: unknown }).toString === "function" &&
    "__lingoClass" in (value as object)
  ) {
    return String(callMethod("toString", value));
  }
  return String(value);
}

function bool(value: boolean): number {
  return value ? 1 : 0;
}

// ---------------------------------------------------------------------------
// Value types
// ---------------------------------------------------------------------------

export class LingoPoint {
  constructor(public locH: number, public locV: number) {}

  /** A point indexes like a 2-item list, the same way a rect does. */
  get 1(): number {
    return this.locH;
  }
  set 1(value: number) {
    this.locH = Number(value);
  }
  get 2(): number {
    return this.locV;
  }
  set 2(value: number) {
    this.locV = Number(value);
  }

  /**
   * `inside(point, rect)` — Director's hit test, which the emitter renders as a
   * METHOD on the point (`callMethod("inside", pt, rect)`).
   *
   * ⚠ Without it the call silently answers nothing, and a silent false here
   * means "the user clicked nowhere". `CUIComponentPage.EventProc` picks the
   * row under the cursor with exactly this call:
   *
   *     if inside(t_pForward, getRect(t_rComponent)) then …
   *
   * so every component list in the game was unclickable. MEASURED on the
   * registration name list: the click routed correctly all the way to
   * `CRegPage1._EventProc` as `#mouseup / "reg.namelist" / point(48,9)`, and
   * then found no component, so `m_rActiveComponent` stayed null and no name
   * could ever be chosen.
   *
   * Half-open on the right and bottom edges, as Director is: a point on the
   * right edge belongs to the NEXT rect, which is what keeps adjacent rows from
   * both claiming the boundary pixel.
   */
  inside(rect: LingoValue): number {
    const r = rect as { left?: unknown; top?: unknown; right?: unknown; bottom?: unknown } | null;
    if (!r || typeof r.left !== "number" || typeof r.top !== "number" ||
      typeof r.right !== "number" || typeof r.bottom !== "number") {
      return 0;
    }
    return this.locH >= r.left && this.locH < r.right &&
      this.locV >= r.top && this.locV < r.bottom
      ? 1
      : 0;
  }

  /**
   * `point.duplicate()` — a value copy. Unimplemented, it threw out of the
   * Jungle Cruise's `CCatmullRom.eval` while the stage built its collision
   * spline, and the game room never came up.
   */
  duplicate(): LingoPoint {
    return new LingoPoint(this.locH, this.locV);
  }

  toString(): string {
    return `point(${this.locH}, ${this.locV})`;
  }
}

export class LingoRect {
  constructor(
    public left: number,
    public top: number,
    public right: number,
    public bottom: number,
  ) {}
  get width(): number {
    return this.right - this.left;
  }
  get height(): number {
    return this.bottom - this.top;
  }

  /** `rect.duplicate()` — a value copy, as for `point`. */
  duplicate(): LingoRect {
    return new LingoRect(this.left, this.top, this.right, this.bottom);
  }

  /**
   * `rect.union(other)` / `rect.intersect(other)` — Director's rect algebra.
   *
   * ⚠ `union` is how VMK SIZES a composed image, so a missing one is not a
   * cosmetic gap. `CMagicFactor.createUnionImageFromMemberList` measures every
   * contributing member and allocates from the result:
   *
   *     tUnion = rect(0, 0, 0, 0)
   *     repeat with tImage in tUnionList
   *       tOffsetRect = tMem.rect - rect(tMem.regPoint, tMem.regPoint)
   *       tUnion = tUnion.union(tOffsetRect)
   *     tMaskImg = image(tUnion.width, tUnion.height, 8, #grayscale)
   *
   * Without it the call threw "Lingo method not found: union on LingoRect" out
   * of `DrawLoader`, so the avatar's loading spinner produced nothing.
   *
   * Director's union is the bounding box of both rects — it does NOT special-case
   * an empty rect, which is why starting from `rect(0,0,0,0)` deliberately keeps
   * the origin inside the result and anchors the composite.
   */
  union(other: LingoRect): LingoRect {
    return new LingoRect(
      Math.min(this.left, other.left),
      Math.min(this.top, other.top),
      Math.max(this.right, other.right),
      Math.max(this.bottom, other.bottom),
    );
  }

  intersect(other: LingoRect): LingoRect {
    const left = Math.max(this.left, other.left);
    const top = Math.max(this.top, other.top);
    const right = Math.min(this.right, other.right);
    const bottom = Math.min(this.bottom, other.bottom);
    // Director reports a non-overlapping intersection as an empty rect.
    return right <= left || bottom <= top
      ? new LingoRect(0, 0, 0, 0)
      : new LingoRect(left, top, right, bottom);
  }

  /** `inside(point)` — Director's containment test, right/bottom exclusive. */
  inside(point: { locH?: number; locV?: number }): number {
    const x = Number(point?.locH);
    const y = Number(point?.locV);
    return x >= this.left && x < this.right && y >= this.top && y < this.bottom ? 1 : 0;
  }

  /**
   * ⚠ Director indexes a rect like a 4-item list: `tRect[1]` is left, `[2]` top,
   * `[3]` right, `[4]` bottom. `CWindow.buildVisual` positions every sprite with
   * `the locH of tSprite = tElemRect[1] + pClientRect[1]`, so without these the
   * addition read `undefined`, coerced to 0, and the whole window stacked at the
   * stage origin — laid out correctly, drawn on top of itself.
   */
  get 1(): number {
    return this.left;
  }
  set 1(value: number) {
    this.left = Number(value);
  }
  get 2(): number {
    return this.top;
  }
  set 2(value: number) {
    this.top = Number(value);
  }
  get 3(): number {
    return this.right;
  }
  set 3(value: number) {
    this.right = Number(value);
  }
  get 4(): number {
    return this.bottom;
  }
  set 4(value: number) {
    this.bottom = Number(value);
  }

  toString(): string {
    return `rect(${this.left}, ${this.top}, ${this.right}, ${this.bottom})`;
  }
}

/**
 * Director's 3D vector. VMK uses it for firework launch positions — the stage
 * records store `POS="vector( 260.0000, 20.0000, 0.0000 )"` — and the
 * registration cast constructs one directly.
 */
/**
 * Director's 3D vector.
 *
 * ⚠ THIS WAS A BARE DATA HOLDER, and every operation on it threw. VMK does real
 * vector maths — MEASURED across the generated casts: `duplicate` 296 uses,
 * `dot` 85, `normalize` 68, `cross` 13, `distanceTo` 3, `angleBetween` 1 — and
 * with no methods here the first one reached killed whatever was running:
 *
 *     Lingo method not found: normalize on LingoVector{x…}
 *       [executeMessage(room_ready) -> #tikihandler_component.#roomready]
 *
 * which cost the jungle rooms their ambience, their animation and their avatar,
 * because that throw aborts `CMgrBroker.Execute` before it reaches
 * `AnimationManager` and `SoundTracker`.
 *
 * ⚠ `normalize` MUTATES IN PLACE and Director's does too — `CSpline3D.TangentAt`
 * is `normalize(tSample)` on its own line followed by `return tSample`, so a
 * copy-returning version would hand back the un-normalised sample.
 *
 * `length` is a PROPERTY (`t_vDirection.length` in `CHMGameInterface.ReadMouse`)
 * that is ALSO called as a method (`callMethod("length", …)` in
 * `MathMethods.AngleBetweenVectors`). A getter serves both: `callMethod` falls
 * back to a property read for a no-argument call, and `findMethod` skips
 * accessors by design.
 *
 * `angleBetween` answers in DEGREES, matching VMK's own equivalent —
 * `MathMethods.AngleBetweenVectors` computes `arcCos(dot / (len*len)) * 180/pi`
 * for the same job, and `CHMGameInterface.ReadMouse` uses the built-in against a
 * `cross` product to recover the sign.
 */
export class LingoVector {
  constructor(public x: number, public y: number, public z: number) {}

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /** Director spells the same quantity both ways. */
  get magnitude(): number {
    return this.length;
  }

  /** In place, and returns itself — see the note above. */
  normalize(): LingoVector {
    const len = this.length;
    // A zero vector has no direction; Director leaves it alone rather than
    // producing NaNs that then poison every later frame.
    if (len > 0) {
      this.x /= len;
      this.y /= len;
      this.z /= len;
    }
    return this;
  }

  getNormalized(): LingoVector {
    return new LingoVector(this.x, this.y, this.z).normalize();
  }

  duplicate(): LingoVector {
    return new LingoVector(this.x, this.y, this.z);
  }

  dot(other: LingoValue): number {
    const v = other as LingoVector;
    if (!(v instanceof LingoVector)) return 0;
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(other: LingoValue): LingoVector {
    const v = other as LingoVector;
    if (!(v instanceof LingoVector)) return new LingoVector(0, 0, 0);
    return new LingoVector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x,
    );
  }

  distanceTo(other: LingoValue): number {
    const v = other as LingoVector;
    if (!(v instanceof LingoVector)) return 0;
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  angleBetween(other: LingoValue): number {
    const v = other as LingoVector;
    if (!(v instanceof LingoVector)) return 0;
    const scale = this.length * v.length;
    if (scale === 0) return 0;
    // Clamp: rounding can push the cosine a hair outside [-1, 1] and NaN the
    // whole result for two vectors that are merely parallel.
    const cos = Math.max(-1, Math.min(1, this.dot(v) / scale));
    return Math.acos(cos) * (180 / Math.PI);
  }

  toString(): string {
    return `vector(${this.x}, ${this.y}, ${this.z})`;
  }
}

/**
 * Director's image buffer.
 *
 * `CWindow.buildVisual` builds every window background this way: allocate a
 * member, give it `image(width, height, depth)`, then `fill(rect, rgb)`. So a
 * window's panels are not art from the cast — they are filled buffers created
 * at runtime, which is why a port that only draws cast bitmaps renders a
 * VMK dialog as nothing at all.
 *
 * Only flat fills are modelled: that is what the framework casts actually do.
 * A real paint surface can replace it without changing callers.
 */
/** The 2D context of a raster buffer — the browser's, or nothing off-DOM. */
type RasterContext = {
  drawImage(image: CanvasImageSource, ...rest: number[]): void;
  fillRect(x: number, y: number, w: number, h: number): void;
  fillStyle: string;
  globalAlpha: number;
  globalCompositeOperation: string;
  save(): void;
  restore(): void;
  /**
   * Per-pixel access, for `extractAlpha` / `setAlpha` — the only two operations
   * that read or write the alpha CHANNEL rather than compositing through it.
   * Optional because the headless target has no canvas at all.
   */
  getImageData?(x: number, y: number, w: number, h: number): { data: Uint8ClampedArray };
  putImageData?(image: { data: Uint8ClampedArray }, x: number, y: number): void;
};

/**
 * Allocates a raster for a `LingoImage`.
 *
 * ⚠ Returns null under Node. `runtime.smoke.mts` exercises the same code with
 * no DOM, and a copy that merely records itself there is the honest result — it
 * is the browser that has to produce pixels.
 */
function createRaster(
  width: number,
  height: number,
  /**
   * The caller is about to READ this raster's pixels back (`getImageData`).
   *
   * ⚠ A default 2D context is GPU-backed, so every `getImageData` is a GPU ->
   * CPU readback — the dominant cost of `setAlpha` / `extractAlpha`, which run
   * ~1,150 and ~2,000 times on one avatar + room load (`vmkPerf`, MEASURED).
   * `willReadFrequently` keeps the raster in main memory: 1.6x faster per call
   * on a 200x300 draw/read/write, identical pixels. It costs one upload when the
   * result is next drawn, which the browser caches — fine for images composed
   * once and drawn many times, which is what these are.
   */
  readback = false,
): { canvas: unknown; context: RasterContext } | null {
  const w = Math.max(1, Math.floor(width));
  const h = Math.max(1, Math.floor(height));
  const globals = globalThis as {
    OffscreenCanvas?: new (w: number, h: number) => { getContext(id: "2d"): unknown };
    document?: { createElement(tag: "canvas"): HTMLCanvasElement };
  };
  /**
   * ⚠ NEAREST-NEIGHBOUR, NOT SMOOTHED.
   *
   * Director resamples `copyPixels` without interpolation, and VMK's art is
   * hand-drawn pixel art authored for that. Canvas smooths by default, so every
   * resample softens the image — and the avatar is resampled REPEATEDLY:
   * `updateFigurePreview` blits the 120x300 figure into a 240x600 rect and then
   * `feedImage` scales that down again to the element's 120x273. Two smoothed
   * passes is why the avatar reads as blurry beside the original.
   *
   * Applied at creation so every buffer inherits it; the flag is per-context,
   * and the prefixed spellings are still what some engines honour.
   */
  const crisp = (context: unknown): unknown => {
    const ctx = context as Record<string, unknown> | null;
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
    }
    return context;
  };

  const options = readback ? { willReadFrequently: true } : undefined;
  if (typeof globals.OffscreenCanvas === "function") {
    const canvas = new globals.OffscreenCanvas(w, h) as unknown as {
      getContext(id: "2d", options?: { willReadFrequently: boolean }): unknown;
    };
    const context = crisp(canvas.getContext("2d", options));
    return context ? { canvas, context: context as RasterContext } : null;
  }
  if (globals.document) {
    const canvas = globals.document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const context = crisp(canvas.getContext("2d", options));
    return context ? { canvas, context: context as unknown as RasterContext } : null;
  }
  return null;
}

/**
 * The `copyPixels` parameter list, which is NOT decoration.
 *
 * ⚠ `#color` is how VMK paints nearly every flat surface in the UI. Its window
 * layouts do not carry a coloured bitmap per panel — they point the element at
 * `shadow.pixel`, a ONE-PIXEL cast member, stretch it across the element's rect
 * and tint it through this parameter:
 *
 *     member="shadow.pixel"  →  pImage 1x1  →  copyPixels(dest, src, rect, rect,
 *                                                 [#color: rgb(0,62,114), …])
 *
 * Dropping the parameters therefore painted every dialog background, title bar,
 * shadow and progress bar with `shadow.pixel`'s own pixel instead of its
 * authored colour — which is why dialogs came out as nothing but their captions
 * while being perfectly sized and placed. Nothing errors: the blit succeeds, it
 * just carries the wrong colour.
 *
 * `#blend` is the same story for translucent panels (0-100, Director's scale).
 */
/**
 * Director's DARKEN ink, which `copyPixels` tints by `#bgColor`.
 *
 * Declared here rather than imported from `lingo-stage`: the stage imports this
 * module, and the other `INK_*` constants live there because only the
 * compositor uses them. This one is needed inside the blit itself.
 */
const INK_DARKEN = 41;

/**
 * Director's BACKGROUND TRANSPARENT — a source pixel equal to the background
 * colour (white by default; `#bgColor` overrides) drops out; every other pixel
 * copies through. The sprite compositor keys this in `prepareInk`; it is ALSO
 * needed inside the blit, because VMK composes a window background by
 * copyPixels-ing each piece into one shared buffer WITH THE PIECE'S OWN INK —
 * see the ink-36 branch in `copyPixels`.
 */
const INK_BACKGROUND_TRANSPARENT = 36;

/**
 * Director's DARKEST — the per-channel MINIMUM of source and destination.
 *
 * ⚠ THIS IS THE INK THE AVATAR'S ALPHA PASS IS BUILT WITH, and it was not
 * implemented at all: only 0 (Copy), 8 (Matte), 36 (Background Transparent) and
 * 41 (Darken) were, so `#ink: 39` fell through to a plain draw.
 *
 *     CBodypartClass.copyAlpha:
 *         copyPixels(tImg, tImage, tRect, tImage.rect, [#ink: 39])
 *
 * `getPartAlpha` calls that for every part to build `t_ImgAlpha`, which
 * `setAlpha` then applies to the figure — so with the wrong operator the whole
 * mask was wrong, which is why faint face detail never survived.
 *
 * Canvas `darken` is the same operation per channel, so the mapping is direct.
 */
const INK_DARKEST = 39;

/**
 * ⚠ OFF. The level-plane representation for 8-bit `#grayscale` images is
 * IMPLEMENTED BELOW but not switched on — read this before flipping it.
 *
 * It is the right model and the diagnosis behind it holds: a canvas is always
 * RGBA and always blends through an alpha channel that Director's 8-bit images
 * DO NOT HAVE, which is why seven separate patches to `setAlpha` /
 * `extractAlpha` / the 32->8 conversion each fixed one symptom and broke
 * another. Holding levels directly makes `#ink: 39` a plain minimum, `setAlpha`
 * a direct read, and index-0-is-white initialisation fall out naturally.
 *
 * WITH IT ON, MEASURED: the avatar and the name list render CORRECTLY — the
 * first time both survived the alpha pass — but the clothing thumbnails come
 * out as solid black 36x36 squares (`0,0,0/a255` x1296). Their mask IS
 * composited (so the untouched-allocation guard does not catch it) while the
 * colour buffer beneath it is still empty, so an opaque mask reveals black
 * instead of leaving the slot transparent.
 *
 * ⚠ NEXT STEP IS THE THUMBNAIL PATH, NOT ANOTHER GUARD. Find where
 * `updatePartPreview` composes `part.*.preview` and why its 36x36 buffer is
 * empty at the moment its mask is applied — the same "composed before the art
 * arrived" shape already fixed for body parts by prefetching them by name.
 * Turning this on before that is understood just moves the breakage again.
 */
const LEVEL_PLANE_IMAGES = true;

/**
 * ⚠ VMK BUILDS THE FIGURE IN TWO PASSES AND WE COLLAPSE THEM INTO ONE.
 *
 *     getPartImg    -> t_HumanImg   COLOUR only
 *     getPartAlpha  -> t_ImgAlpha   ALPHA only
 *     setAlpha(t_HumanImg, t_ImgAlpha)
 *
 * `updateFigurePreview` FILLS t_HumanImg opaque before composing, so Director's
 * colour pass never modulates by a part's own alpha — the silhouette arrives
 * later from the separate alpha pass. We blend colour by each part's alpha
 * instead, which erases anything faint.
 *
 * MEASURED on the avatar's face: `std_fc_1_3_0` is a near-white template whose
 * facial detail sits at ALPHA 48. Blended at 19% over skin it is invisible —
 * the reported "missing mouth", and the reason our faces are flat where
 * Shockwave's have contours. Director multiplies that pixel by the skin colour
 * at FULL strength and lets the head underneath supply the opacity.
 *
 * ⚠ A FULL FIX MEANS RESTORING THE SECOND PASS. It cannot be done by hardening
 * alpha to 255 here: our `#alpha` part images have no raster, so `setAlpha` is
 * inert, and the figure's transparency currently comes from exactly this alpha.
 * Forcing it opaque turns the avatar into the orange fill rectangle.
 *
 * ⚠ DISABLED (set to 1), AND IT SHOULD STAY THAT WAY UNLESS THE SECOND PASS IS
 * ACTUALLY RESTORED. Boosting partial alpha here was tried and made the avatar
 * WORSE on inspection. It is also contradicted by the reference implementation:
 * for a 32-bit source LibreShockwave's `imageDarkenBgTintPixel` /
 * `imageMultiplyDarkenPixel` are a plain per-channel multiply by the tint with
 * ALPHA PRESERVED, and `Drawing.cpp` then composites
 *
 *     if (ink == LIGHTEN || ink == DARKEN)
 *         return srcAlpha == 0 ? dest
 *                              : alphaBlend(src, dest, combineAlpha(srcAlpha, blend));
 *
 * i.e. Darken IS alpha-blended by source alpha — exactly what this code does
 * with the boost off. The two-pass reasoning above explains why VMK's own
 * output differs, but the fix belongs in restoring `getPartAlpha` (populate the
 * `#alpha` part images, which currently have no raster), NOT in re-weighting
 * this blit.
 *
 * ⚠ AND IF IT IS EVER RE-ENABLED, INK 41 ONLY. An earlier experiment boosted
 * every ink and put a WHITE DOT on the face: the eyes are ink 36, which does no
 * tinting, so their anti-aliased fringe went straight to opaque white.
 */
const DARKEN_ALPHA_BOOST = 1;

/**
 * Make every pixel that has ANY coverage fully opaque, in place.
 *
 * Director's colour pass does not modulate by the source's alpha — the separate
 * alpha pass does — so a part contributes its full multiplied colour wherever it
 * has ink at all. Fully-clear pixels stay clear.
 */
function hardenAlpha(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
): void {
  if (width <= 0 || height <= 0) return;
  let image: ImageData;
  try {
    image = context.getImageData(0, 0, width, height);
  } catch {
    return;
  }
  const pixels = image.data;
  let changed = false;
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] !== 0 && pixels[i] !== 255) { pixels[i] = 255; changed = true; }
  }
  if (changed) context.putImageData(image, 0, 0);
}

/** Scale partial alpha in place, leaving fully-clear and fully-opaque pixels. */
function boostDarkenAlpha(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
): void {
  if (DARKEN_ALPHA_BOOST <= 1 || width <= 0 || height <= 0) return;
  let image: ImageData;
  try {
    image = context.getImageData(0, 0, width, height);
  } catch {
    return; // tainted or zero-sized canvas — leave the blit untouched
  }
  const pixels = image.data;
  let changed = false;
  for (let i = 3; i < pixels.length; i += 4) {
    const alpha = pixels[i];
    if (alpha === 0 || alpha === 255) continue;
    const boosted = alpha * DARKEN_ALPHA_BOOST;
    pixels[i] = boosted > 255 ? 255 : boosted;
    changed = true;
  }
  if (changed) context.putImageData(image, 0, 0);
}

function copyParams(
  value: LingoValue,
): { color?: string; blend?: number; bgColor?: string; ink?: number; smooth?: boolean } {
  if (value === VOID || value === null || typeof value !== "object") return {};
  const list = value as { getProp?: (key: LingoValue) => LingoValue };
  if (typeof list.getProp !== "function") return {};
  const out: { color?: string; blend?: number; bgColor?: string; ink?: number; smooth?: boolean } = {};

  /**
   * `#ink` and `#bgColor` — how VMK colours an avatar.
   *
   * ⚠ These were both IGNORED, which is why skin, hair and clothing all drew in
   * the artwork's own flat grey. `CBodypartClass` passes
   * `[#maskImage: 0, #ink: 41, #bgColor: <colour>]` on every part blit
   * (`defineInk` defaults to 41, `setColor` fills in the colour), so dropping
   * them meant the tint never happened at all.
   *
   * Ink 41 is Director's DARKEN, which tints the source by `bgColor`. That it
   * means MULTIPLY here is confirmed by VMK's own code rather than guessed:
   * `setColor` writes `rgb(255,255,255)` for exactly the parts that must NOT be
   * recoloured — `ch2`, and `lsh`/`rsh`/`ey` when their colour is 0 — and white
   * is the identity of a multiply. Any other reading would have to explain why
   * "no tint" is spelled "white".
   */
  const ink = list.getProp(symbol("ink"));
  if (typeof ink === "number") out.ink = ink;

  const bg = list.getProp(symbol("bgColor"));
  if (bg !== VOID && bg !== null && typeof bg === "object") {
    const rgb = bg as { red?: unknown; green?: unknown; blue?: unknown };
    if (
      typeof rgb.red === "number" && typeof rgb.green === "number" &&
      typeof rgb.blue === "number"
    ) {
      out.bgColor = `rgb(${String(rgb.red)},${String(rgb.green)},${String(rgb.blue)})`;
    }
  }

  const color = list.getProp(symbol("color"));
  if (color !== VOID && color !== null && typeof color === "object") {
    const rgb = color as { red?: unknown; green?: unknown; blue?: unknown };
    if (
      typeof rgb.red === "number" && typeof rgb.green === "number" &&
      typeof rgb.blue === "number"
    ) {
      out.color = `rgb(${String(rgb.red)},${String(rgb.green)},${String(rgb.blue)})`;
    }
  }

  /**
   * `#blend` is 0-100; `#blendLevel` is the same on Director's 0-255 scale.
   *
   * ⚠ Both via `num`, because a computed blend is usually a FLOAT — boxed as a
   * `LingoFloat`, not a JS number — and `typeof === "number"` skipped it. And
   * `#blendLevel` was not read at all. `CMessengerIconPulser` pulses the
   * chat-bar icon with exactly that: `copyPixels(pressed, …, [#blendLevel:
   * sin(t) * 127 + 127])` every frame. Ignored, the composite never changed and
   * the "new message" pulse was invisible.
   */
  const blend = list.getProp(symbol("blend"));
  if (blend !== VOID && blend !== null) {
    const v = num(blend);
    if (Number.isFinite(v) && v < 100) out.blend = Math.max(0, v) / 100;
  }
  const blendLevel = list.getProp(symbol("blendLevel"));
  if (blendLevel !== VOID && blendLevel !== null) {
    const v = num(blendLevel);
    if (Number.isFinite(v) && v < 255) out.blend = Math.max(0, v) / 255;
  }

  /**
   * `#smooth` — request bilinear resampling for a SCALED blit.
   *
   * Director's own `copyPixels` smooths a scaled copy UNLESS `#useFastQuads` is
   * TRUE (fast quads = the low-quality nearest path). The port keeps every
   * context `crisp()` (nearest) by default because that is right for 1:1 UI
   * pixel-art, but the avatar is DOWN-SCALED by room perspective
   * (`CAvatarRenderer.update`, ratio = tileSize/32) and real Director smoothed
   * that — VMK's `copyPixels(..., #useFastQuads = 1)` is a `=`/`:` typo that
   * evaluates to the boolean 0, so fast-quads never actually engaged and the OG
   * client used the smoothed default. This flag opts a specific blit back into
   * that smoothed default; it is a no-op for a 1:1 blit. See
   * [[avatar-scaling-nearest-is-faithful]].
   */
  const smooth = list.getProp(symbol("smooth"));
  if (smooth === 1 || smooth === true) out.smooth = true;

  return out;
}

/** Director rect -> plain edges, for blits. VOID means "the whole image". */
/**
 * A QUAD destination for `copyPixels` — Director accepts a list of four points
 * (top-left, top-right, bottom-right, bottom-left) instead of a rect, and
 * transforms the source into it.
 *
 * ⚠ VMK MIRRORS ITS BUTTON ART THIS WAY, so ignoring quads is not a cosmetic
 * shortfall. `CWindowCommonButton.flipH` is the whole implementation of "flip":
 *
 *     tQuad = [point(w,0), point(0,0), point(0,h), point(w,h)]
 *     copyPixels(tImage, tImg, tQuad, tImg.rect)
 *
 * — the first two corners are swapped, which is a horizontal mirror. `asRect`
 * answers null for a list, so the destination fell back to "the whole image"
 * and the copy came out UNFLIPPED. The button's right-hand cap then kept the
 * left cap's orientation: its white bevel landed two pixels INSIDE the button
 * and the frame sat on the outer edge. With ink 36 keying white, that punched a
 * hole through to the dialog behind it — the blue notch at the top-right corner
 * of every OK button.
 *
 * Only the axis flips are honoured, not arbitrary rotation or shear. That is
 * what VMK uses (`flipH`, `flipV`), and a wrong affine transform would be
 * harder to spot than an unhandled one.
 */
function asQuad(
  value: LingoValue,
): { left: number; top: number; right: number; bottom: number; flipX: boolean; flipY: boolean } | null {
  const list = value as { toArray?: () => LingoValue[] } | null;
  if (!list || typeof list.toArray !== "function") return null;
  const points = list.toArray();
  if (points.length !== 4) return null;
  const xs: number[] = [];
  const ys: number[] = [];
  for (const p of points) {
    const point = p as { locH?: unknown; locV?: unknown } | null;
    if (!point || typeof point.locH !== "number" || typeof point.locV !== "number") return null;
    xs.push(point.locH);
    ys.push(point.locV);
  }
  return {
    left: Math.min(...xs),
    top: Math.min(...ys),
    right: Math.max(...xs),
    bottom: Math.max(...ys),
    // Corner 0 is the top-LEFT of an unflipped quad; if it sits to the right of
    // corner 1, the horizontal axis is reversed. Same idea vertically against
    // corner 3, the bottom-left.
    flipX: xs[0] > xs[1],
    flipY: ys[0] > ys[3],
  };
}

function asRect(
  value: LingoValue,
): { left: number; top: number; right: number; bottom: number } | null {
  if (value === VOID || value === null || typeof value !== "object") return null;
  const r = value as { left?: unknown; top?: unknown; right?: unknown; bottom?: unknown };
  if (
    typeof r.left !== "number" || typeof r.top !== "number" ||
    typeof r.right !== "number" || typeof r.bottom !== "number"
  ) {
    return null;
  }
  return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
}

/**
 * How far an over-sized-window copy shifts right: `copyPixels(source, dest,
 * srcRect)` where `srcRect` runs off a NARROWER source and the blit is 1:1.
 * The part that exists is centred horizontally (see the note in
 * `copyPixels`). Shared by the pixel path and the text-run path so a caption
 * cannot drift from the pixels it belongs to. 0 when it does not apply.
 */
function oversizeCentreX(sourceWidth: number, rest: LingoValue[]): number {
  const dest = asRect(rest[0]);
  const asked = asRect(rest[1]);
  if (!dest || !asked) return 0;
  const askedW = Math.max(asked.right - asked.left, 0);
  const askedH = Math.max(asked.bottom - asked.top, 0);
  const dw = Math.round(dest.right) - Math.round(dest.left);
  const dh = Math.round(dest.bottom) - Math.round(dest.top);
  const sw = Math.max(Math.min(asked.right, sourceWidth) - Math.max(asked.left, 0), 0);
  if (sw === askedW || dw !== askedW || dh !== askedH) return 0;
  /**
   * ⚠ ONLY A WINDOW READ FROM THE IMAGE'S ORIGIN. The case this exists for is
   * `CWindowImageWrapper` at `pOffX` 0 (no scroll yet). A window that starts
   * INSIDE the image was placed there on purpose and maps 1:1, as in Director:
   * `CFilmStrip` builds its background with
   * `copyPixels(ui, ui.rect, ui.rect + rect(151,0,151,0))` — source 151..800
   * onto dest 0..649 — and centring pushed it right, leaving the first three
   * film frames on bare white (the Jungle Cruise's pale film strip).
   */
  if (asked.left > 0) return 0;
  return Math.floor((dw - sw) / 2);
}

export class LingoImage {
  useAlpha = 0;
  /**
   * Bumped on every write to these pixels.
   *
   * ⚠ The compositor CACHES the ink-processed copy of a buffer
   * (`CastMember.inkVariants`), and a window element's buffer is written long
   * after it is first drawn — `CWindowCommonButton.render` fills it and then
   * copies the button art in. Without a version to compare, the cache served
   * the first result forever.
   *
   * That is what kept the navigation arrows invisible even once their pixels
   * were correct: the cached variant was a 355x191 fully-transparent canvas —
   * the group-sized blank buffer `buildVisual` allocates — while the member had
   * since become the real 14x16 arrow. Nothing looked wrong; the sprite drew a
   * cached nothing.
   */
  revision = 0;
  /**
   * Bumped ONLY by `fill` — "this buffer was cleared and started over".
   *
   * ⚠ Distinct from `revision` on purpose. `revision` counts every write and is
   * what the ink cache compares. Replay invalidation must NOT use it: composing
   * a nine-slice button is several `copyPixels` into one buffer, each bumping
   * `revision`, so keying off it marked every pending replay stale and the
   * button never drew at all. A CLEAR is the event that really abandons queued
   * work, and `feedImage` performs one before each new image.
   */
  clearRevision = 0;
  /** Last flat fill, which is what the compositor paints. */
  fillColor: LingoColor | null = null;

  /**
   * Set when this buffer came from rendering a text member. The compositor draws
   * live text rather than blitting glyphs, so it needs the string and its face —
   * without them a caption becomes an empty rectangle of the right size, which
   * lays out correctly and shows nothing.
   */
  text = "";
  /**
   * True when this buffer came from rendering a TEXT member (see
   * `CastMember.image`), which is what lets `copyPixels` treat an empty string
   * as "clear the caption" rather than "this source has no text".
   */
  isTextRender = false;
  /**
   * Every caption blitted into this buffer, WITH THE RECT IT LANDED IN.
   *
   * ⚠ Director positions composed text by RECTANGLE, not by an alignment
   * property, and a buffer routinely holds SEVERAL captions. Carrying only
   * `text` — one string, drawn at the element's origin — gets both wrong:
   *
   *   CWindowCommonButton.createButtonImg composes the button from its three
   *   slices, computes `tDstRect` from `#alignment` (the `#center` branch
   *   offsets by half the button minus half the text) and copies the label
   *   image THERE. Redrawing at the origin pinned every button label to the
   *   left edge.
   *
   *   The registration name list copies FIVE rows into one buffer at five
   *   different y offsets. With a single `text` field each row overwrote the
   *   last, so the list showed only the fifth name — measured, while all five
   *   arrived from the server correctly.
   *
   * `text` is kept alongside as the last run, because plenty of code still
   * asks a buffer whether it has a caption at all.
   */
  textRuns: Array<{
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
    font: string;
    size: number;
    lineHeight: number;
    /** `the topSpacing of member` — see `textTopSpacing`. Optional on old runs. */
    topSpacing?: number;
    /** `the wordWrap of member` — see `textWordWrap`. Absent means wrap. */
    wordWrap?: boolean;
    color: LingoValue;
    align: string;
    /** `the antiAlias of member` — 0 draws the run aliased. See `textAntialias`. */
    antialias: number;
    /**
     * The rect (buffer coords) this run may paint in — the destination of the
     * `copyPixels` that put it here. A scrolled run's box pokes out of the
     * window it was copied into; pixels would be cropped there, so the run is
     * too. See the transfer in `copyPixels`.
     */
    clip?: { left: number; top: number; right: number; bottom: number };
  }> = [];
  textFont = "";
  /**
   * `the antiAlias of member` for this buffer's caption.
   *
   * 1 is Director's default; VMK clears it per element from the component XML's
   * ANTIALIAS attribute, and an ABSENT attribute reads as VOID, i.e. OFF. The
   * registration name rows are exactly that case — see `CastMember.image`.
   */
  textAntialias = 1;
  textSize = 12;
  /**
   * `the fixedLineSpace` — the baseline-to-baseline distance.
   *
   * ⚠ 0 means "not set"; the compositor then falls back to the FONT SIZE, which
   * is what Director does here. `CWindowTextWrapper.prepare`:
   *
   *     if integerp(pProps[#fixedLineSpace]) then
   *       pFontData[#fixedLineSpace] = pProps[#fixedLineSpace]
   *     else
   *       pFontData[#fixedLineSpace] = pProps[#fontSize]
   *
   * The compositor used to guess `ceil(size * 1.3)`, which is 31% too tall on
   * every wrapped line and made authored boxes overflow — `"Updating\r0%"` needs
   * 2 x 21 = 42px in its 32px box, where 2 x 16 = 32 fits exactly.
   */
  textLineHeight = 0;
  /**
   * `the topSpacing of member` — space above the FIRST line, negative to pull it
   * up. `CWriter.Define` sets it to `fixedLineSpace - fontSize`, so every caption
   * composed through a writer carries one. See `CastMember`'s note.
   */
  textTopSpacing = 0;
  /**
   * `the wordWrap of member` — false keeps the caption on ONE line, clipped at
   * the box edge, instead of breaking it at spaces.
   *
   * ⚠ True unless the member was EXPLICITLY told 0. See `CastMember.wordWrap`.
   */
  textWordWrap = true;
  textColor: LingoValue = VOID;
  /**
   * The member's `the alignment` — `left`, `center` or `right`.
   *
   * ⚠ Carried with the string, not left behind. VMK centres most captions in
   * their box (a dialog title, a button label), and the compositor drew every
   * one of them hard against the box's left edge because this never made it
   * across the `copyPixels` that moves a rendered text member into an element's
   * buffer. Nothing looks broken — the text is legible and inside its panel —
   * it is simply in the wrong place, which is most of what "the text looks
   * wrong" was.
   */
  textAlign = "left";

  /**
   * The decoded pixels behind this buffer — an `ImageBitmap` in the browser.
   *
   * ⚠ Kept BESIDE the Lingo image rather than used in place of it. VMK reads
   * `.depth`, `.paletteRef` and `.useAlpha` off an image and calls `duplicate`
   * on it (`CWindowUniqueElement.Define` does all four), none of which an
   * `ImageBitmap` answers — so attaching the raw bitmap to a member trades a
   * VOID for a "method not found: duplicate" one line later.
   *
   * It may be null while the art is still downloading; the size is known from
   * the cast's bitmap index up front, so layout is right before pixels arrive.
   *
   * ⚠ A DUPLICATE falls back to the buffer it was copied from. VMK duplicates a
   * member's image while building a window (`duplicate(tmember.image)`) and
   * draws the copy — and it does that on the very frame the member is first
   * touched, which is exactly when the PNG is still in flight. Copying `source`
   * by value handed the copy a permanent null while the pixels landed in the
   * original, so the login window laid out correctly and drew no art at all.
   */
  private ownSource: unknown = null;
  private copiedFrom: LingoImage | null = null;

  /**
   * This image's revision INCLUDING the chain it reads through.
   *
   * ⚠ A DUPLICATE NEVER BUMPS ITS OWN REVISION. `duplicate()` carries art by
   * reference — the copy has no `ownSource` and reads through `copiedFrom` —
   * so when the pixels finally arrive they land on the ORIGINAL and the copy's
   * `revision` stays where it started. Anything tracking the copy therefore
   * sees "unchanged" forever, however much the underlying art has moved.
   *
   * MEASURED on the GET MORE NAMES button: its three slices are duplicates of
   * cast art, and after the art loaded they still read `rev0`, `rev0`, `rev1`
   * with `src=true`. The composed button's dependencies all showed
   * `rev == seen`, so `refreshFromSources` correctly concluded there was
   * nothing to redo — and the button kept the incomplete composition it was
   * built with, missing its 4px right cap.
   *
   * Deliberately SEPARATE from `revision`, which the ink-variant cache compares
   * and which must keep meaning "writes to this buffer".
   */
  /*
   * ⚠ ONLY WHILE THE COPY STILL READS THROUGH. Once copy-on-write (`raster()`)
   * or a materialised level plane gives the duplicate its own pixels, `source`
   * stops consulting `copiedFrom` — so the parent's revision must stop counting
   * too, or every write to the PARENT reads as a change to the copy.
   *
   * ⚠ THAT WAS THE FURNI-MODE WHITE BOX. `CRoomVisualBlock.CreateHighlighter`
   * does `t_rFillImage = m_rHighLight.member.image.duplicate()`, fills it
   * #EFEFEF, copies it BACK into the member image and then `setAlpha`s the
   * member image. The setAlpha bumped the member image's revision → the fill
   * copy's chainRevision moved → the member image's dependency on it looked
   * stale → `refreshFromSources` replayed the opaque fill over the carve on the
   * next draw. MEASURED: carve op 0.408 / tr 0.498, then one refresh → op 1.0.
   */
  get chainRevision(): number {
    const readsThrough = !this.ownSource && !(this.levels && this.levelsDirty);
    return this.revision + (readsThrough && this.copiedFrom ? this.copiedFrom.chainRevision : 0);
  }
  private context2d: RasterContext | null = null;

  /**
   * How this buffer gets its art, if it has to go and fetch it.
   *
   * ⚠ FETCH ON DEMAND, NOT ON ACCESS. Set by the cast layer instead of starting
   * the request the moment `member.image` is read — because reading a member's
   * image is not the same as wanting its pixels, and VMK reads a LOT of them it
   * never draws:
   *
   *     AddCastContentsToImageCache(cast)   -- for every member of the cast:
   *       t_rImage = duplicate(member.image)  -- by reference, costs nothing
   *       t_rAlpha = extractAlpha(t_rImage)   -- no raster, costs nothing
   *       m_mp_sName_rStruct[member.name] = …  -- just filed under its name
   *
   * That builds a name→image INDEX. Only the handful of entries the avatar
   * actually wears are ever drawn. In Shockwave the whole cast was already in
   * RAM (the `.cct` arrived as one file), so walking it was free; here every
   * `.image` read used to start its own HTTP request and decode — 834 of them
   * for `gfx_avatar_bodyparts` alone, and again per clothing cast. With 4,322
   * casts installed that is what locked the client up.
   *
   * Requested at most once, and only from the places that genuinely need
   * pixels: `whenSourceReady` (a pending `copyPixels`) and `raster()`.
   */
  needSource: (() => void) | undefined;
  private requested = false;

  /**
   * Ask for this buffer's art, once.
   *
   * Delegates up the `duplicate` chain for the same reason `whenSourceReady`
   * does: a duplicate has no art of its own and reads through `copiedFrom`, so
   * the ORIGINAL is what has to fetch. VMK composes every window element as
   * `duplicate(tmember.image)`, so the duplicate is almost always what gets
   * asked.
   */
  requestSource(): void {
    if (this.copiedFrom) {
      this.copiedFrom.requestSource();
      return;
    }
    if (this.requested || this.needSource === undefined) return;
    this.requested = true;
    this.needSource();
  }

  /**
   * This buffer as a real raster, created on first write.
   *
   * Lazy because most `LingoImage`s are never drawn into — allocating a canvas
   * per image would cost one per cast member. Returns null off-DOM (the Node
   * smoke test), where recording the copy is all that is wanted.
   */
  private raster(): RasterContext | null {
    if (this.context2d) return this.context2d;
    // In main memory (`readback`), because a composed image is almost always
    // masked or read next: `setAlpha` draws it into a scratch and reads it back,
    // and from a GPU canvas that draw IS a GPU->CPU readback. MEASURED in the
    // client: 1.40 ms per `setAlpha` from a GPU source, 0.23 ms from a
    // main-memory one; plain copies cost the same either way (~0.002 ms).
    const made = createRaster(this.width, this.height, true);
    if (!made) return null;
    this.context2d = made.context;
    // The canvas IS the drawable from here on, so the compositor blits it.
    this.ownSource = made.canvas;

    /**
     * ⚠ COPY-ON-WRITE FOR A DUPLICATE. A `duplicate()` carries its art BY
     * REFERENCE (`copiedFrom`, no `ownSource`) and reads through it — but the
     * MOMENT it is written to, this `raster()` gives it its own canvas and it
     * stops reading through `copiedFrom`. Without seeding that canvas from the
     * reference first, the write lands on a BLANK/white buffer and the referenced
     * art is LOST.
     *
     * ⚠ THIS IS THE WHITE OUTLINE / WHITE BOTTOM on catalog previews, clothing
     * previews and the item-info panel. VMK builds every such preview as
     * `t = duplicate(member("previewbox.b").image); t.useAlpha = 0;
     * copyPixels(t, itemImage, …)` — draw the item onto a COPY of the panel.
     * With the panel lost, the item composited onto blank white, so its
     * antialiased edges and base blended to NEAR-white and survived the exact
     * ink-36 white key (which force-opaques survivors) as a white halo/pedestal.
     * Seeding the copy from `copiedFrom` here makes the item blend against the
     * real panel, and leaves the panel colour (not white) in the margins so the
     * ink-36 gate copies it through. Read-only duplicates never reach `raster()`,
     * so the by-reference fast path for window-chrome chains is unaffected.
     * MEASURED: cat.items.preview came back 17289 exact-white / 720 near-white;
     * with the panel seeded it composites on the blue panel instead.
     */
    if (this.copiedFrom) {
      this.copiedFrom.refreshFromSources();
      const waiting = this.copiedFrom.awaitingArt();
      const inherited = waiting ? null : this.copiedFrom.source;
      if (inherited) {
        try {
          made.context.drawImage(inherited as CanvasImageSource, 0, 0);
        } catch {
          // Off-DOM (Node smoke test) has no drawable; recording the copy is enough.
        }
      }
      /**
       * ⚠ A SEED TAKEN BEFORE THE ART LANDED IS PARKED, NOT FINAL. From here on
       * this copy stops reading through `copiedFrom`, so art that arrives later
       * would never reach it. That happened to every levelled pin thumbnail on
       * the first inventory open: `_PinThumbsReadyCbk` duplicates the thumb and
       * stamps the level badge (the write that lands here) while the pin's own
       * PNG is still in flight. The badge showed and the pin never did.
       * `refreshFromSources` draws the seed UNDER this copy's own writes once
       * it has pixels. Only when the original was genuinely waiting: a
       * loaded original seeds correctly above and must not be re-drawn (see
       * the furni-mode white box under `chainRevision`).
       */
      if (waiting) this.pendingSeed = this.copiedFrom;
    }

    /**
     * ⚠ AN 8-BIT `#grayscale` IMAGE STARTS **WHITE**, NOT BLACK.
     *
     * Director's grayscale CLUT is REVERSED — index 0 is WHITE (DirPlayer notes
     * the same thing: "the reversed Mac grayscale CLUT (white glyph -> index
     * 0)"). A freshly allocated 8-bit grayscale image is therefore fully OPAQUE
     * as a mask, not fully transparent.
     *
     * This is why every attempt to switch VMK's alpha pass on erased the avatar.
     * `updateFigurePreview` does
     *
     *     t_ImgAlpha = image(120, 300, 8, #grayscale)     <- opaque WHITE
     *     getPartAlpha(...)                               <- ink 39, DARKEST
     *     setAlpha(t_HumanImg, t_ImgAlpha)
     *
     * and DARKEST is a MINIMUM. Accumulated onto a black canvas the minimum can
     * only ever stay black, so every part came out transparent — measured at
     * `nonZeroLevel 145/36000, mean 1`. Starting white, each part writes its own
     * coverage and everything untouched stays opaque.
     *
     * ⚠ AND OPAQUE IS CORRECT HERE. `updateFigurePreview` fills the COLOUR
     * buffer with `rgb(255,175,0)` — the registration panel's own orange — so
     * the untouched background is invisible against the panel it sits on. That
     * is why VMK can afford a mask that defaults to opaque.
     */
    // Director's `image()` hands back a WHITE buffer — see `markFreshAllocation`.
    // Scoped to that allocation: buffers created internally keep what they had.
    if (this.freshAllocation && LEVEL_PLANE_IMAGES) {
      made.context.fillStyle = "#ffffff";
      made.context.fillRect(0, 0, this.width, this.height);
    }
    /**
     * ⚠ GAINING A RASTER IS A CHANGE, and dependents have to be told.
     *
     * This assigns `ownSource` directly, bypassing `set source` — and that
     * setter is the only other thing that bumps the revision. So a buffer that
     * goes from "no pixels at all" to "a canvas being drawn into" did so
     * INVISIBLY, and anything tracking it kept comparing equal.
     *
     * MEASURED on the GET MORE NAMES button: its composite had copied the
     * flipped right-hand cap while that slice was still blank, recorded
     * `seen: 2`, and the slice's later content never moved its revision past 2.
     * The composite therefore reported itself up to date with a transparent
     * hole where the cap belonged, and the element's own white fill showed
     * through it as a 4px cut-off edge. Forcing that one dependency to re-run
     * by hand produced the correct cap immediately, which is how we know the
     * copy was right and only the signal was missing.
     *
     * Bumped BEFORE `flushWaiting` so a replay woken below already sees the new
     * revision. Costs one bump per buffer — `context2d` short-circuits every
     * later call.
     */
    this.revision++;
    /**
     * ⚠ WAKE ANYTHING WAITING ON THIS BUFFER.
     *
     * This assigns `ownSource` directly, which bypasses `set source` — and that
     * setter was the ONLY thing draining the replay queue. So a buffer that
     * gained its pixels by being DRAWN INTO (rather than by having art assigned)
     * never woke its waiters.
     *
     * That breaks chains, and VMK's window chrome is nothing but chains: the
     * nine slice pieces copy into a panel buffer, the panel copies into the
     * element, the element into the window. The first link to gain pixels this
     * way stalled every link above it, so the panel kept its correct size and
     * position and never received a single pixel — an invisible dialog with a
     * perfectly placed caption floating where its title bar should be.
     */
    this.flushWaiting();
    return made.context;
  }

  /** Run and clear everything queued by `whenSourceReady`. */
  private flushWaiting(): void {
    if (this.waiting.length === 0) return;
    const waiting = this.waiting;
    // Cleared BEFORE running: a replay can queue itself again (its own source
    // may still be in flight), and reusing the same array would drop that.
    this.waiting = [];
    for (const redo of waiting) redo();
  }

  get source(): unknown {
    // A level plane only becomes a canvas when something wants to DRAW it.
    if (this.levels && this.levelsDirty) this.materialiseLevels();
    return this.ownSource ?? this.copiedFrom?.source ?? null;
  }

  /**
   * Whether there is anything at all to copy from — used ONLY to notice that a
   * dependency has gained pixels since it was copied. See `sourceDeps`.
   *
   * ⚠ THIS IS NOT THE "has content" FLAG WARNED ABOUT BELOW, and must not grow
   * into it. That one GATED `copyPixels` and `whenSourceReady`, making copies
   * WAIT, which left the avatar, room preview, name list and every thumbnail
   * empty. This one gates nothing: it can only cause an extra replay of a copy
   * that already happened, so its failure mode is a redundant blit, not a
   * missing one.
   *
   * It is deliberately "has a raster" and NOT "has been drawn into" — an
   * allocated-but-blank buffer from `raster()` reports true here, which is
   * correct for this purpose. The case it exists for is on-demand CAST ART,
   * whose `source` is genuinely null until the PNG arrives.
   */
  get hasRaster(): boolean {
    /**
     * ⚠ A LEVEL-PLANE IMAGE ALWAYS HAS ITS PIXELS — answer without `source`.
     * Reading `source` MATERIALISES the plane into a canvas (read back, rewrite
     * every pixel, write back), and `copyPixels` asks this of every copy's
     * source to track dependencies. MEASURED (`?perf=sample`): that path was
     * 30% of all CPU on an avatar + Character-window load, re-converting the
     * same masks on every copy.
     */
    if (this.levels) return true;
    return this.source !== null && this.source !== undefined;
  }

  /**
   * Is every opaque pixel of this image (near-)gray (r≈g≈b)? Memoised on
   * `revision`, so a live image that changes recomputes exactly once.
   *
   * WHY: Director's copy-ink `#bgColor` colorize is meant for GRAYSCALE/1-bit
   * stencils (recolour by luminance ramp: white->bgColor). Our extraction made
   * everything 32-bit, so a naive colorize also tinted full-colour icons (the
   * register/Character regression). Gating the colorize on this predicate keeps
   * the arrow stencil tinting while leaving colour art untouched. One
   * getImageData per source on first ask, then cached — never per frame.
   */
  private grayscaleRevision = -1;
  private grayscaleValue = false;
  get isGrayscale(): boolean {
    if (this.grayscaleRevision === this.revision) return this.grayscaleValue;
    let gray = false;
    const src = this.source;
    if (src && this.width > 0 && this.height > 0) {
      try {
        const probe = document.createElement("canvas");
        probe.width = this.width;
        probe.height = this.height;
        const ctx = probe.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(src as CanvasImageSource, 0, 0);
          const data = ctx.getImageData(0, 0, this.width, this.height).data;
          gray = true;
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] === 0) continue; // transparent pixels don't count
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            if (Math.abs(r - g) > 4 || Math.abs(g - b) > 4 || Math.abs(r - b) > 4) {
              gray = false;
              break;
            }
          }
        }
      } catch {
        gray = false;
      }
    }
    this.grayscaleRevision = this.revision;
    this.grayscaleValue = gray;
    return gray;
  }

  /**
   * ⚠ A "has this buffer actually been drawn into" flag was TRIED here and
   * REVERTED — it broke the registration page outright.
   *
   * The reasoning was sound on paper: `raster()` creates a canvas EMPTY, so
   * between that call and the first draw a buffer reports a non-null `source`
   * while being blank, and a copy taken in that window deposits nothing yet
   * records its dependency as satisfied. Distinguishing "has a canvas" from
   * "has content" would make such a copy wait instead.
   *
   * In practice, gating `copyPixels` and `whenSourceReady` on that flag left the
   * avatar, the room preview, the name list and every slot thumbnail EMPTY —
   * far more of the UI depends on copying from a not-yet-filled buffer than the
   * model allowed for, and making those copies wait means they never happen.
   *
   * If this is attempted again, do it one call site at a time with a screenshot
   * after each, not as a single sweep across the blit and both readiness
   * checks. The GET MORE NAMES right cap is NOT worth a change of this blast
   * radius.
   */
  set source(value: unknown) {
    this.ownSource = value;
    this.revision++;
    // Anything that tried to copy from this buffer before its art arrived gets
    // to run now. See `whenSourceReady`. `raster()` does the same, because a
    // buffer can gain pixels either way.
    this.flushWaiting();
  }

  private waiting: Array<() => void> = [];

  /**
   * Run `redo` once this buffer actually has pixels.
   *
   * ⚠ The race this exists for: cast art is fetched lazily and arrives a moment
   * after a member is first read, but VMK composes a window element ONCE —
   * `copyPixels` into a buffer, then never again. A copy issued before the PNG
   * landed drew nothing and nothing ever redrew it, which is precisely why the
   * VMK logo and the loading bar came out as blank white rectangles while every
   * count reported them drawn.
   */
  whenSourceReady(redo: () => void): void {
    if (this.source !== null && this.source !== undefined) {
      redo();
      return;
    }

    /**
     * Somebody wants these pixels, so now it is worth fetching them. See
     * `needSource` — cast art is requested here rather than when the member's
     * image was first read.
     *
     * ⚠ RE-TEST AFTER ASKING. The request can be answered SYNCHRONOUSLY when the
     * cast's art is already decoded and resident (see `setBitmapLoader`), and
     * that assignment drains the replay queue on its way through `set source`.
     * Queuing `redo` after that point would park it behind a flush that has
     * already happened, and nothing would ever run it — art present, copy never
     * replayed, element permanently blank.
     */
    this.requestSource();
    if (this.source !== null && this.source !== undefined) {
      redo();
      return;
    }

    /**
     * ⚠ A DUPLICATE MUST WAIT ON THE BUFFER THAT WILL ACTUALLY GET PIXELS.
     *
     * `duplicate()` carries the art BY REFERENCE — the copy has no `ownSource`
     * and reads through `copiedFrom` (see the `source` getter). But pixels
     * arrive on the ORIGINAL, so it is the ORIGINAL's `set source` that runs,
     * and it flushes the ORIGINAL's queue. A replay parked on the duplicate was
     * therefore never woken by anything, ever.
     *
     * That is the whole race behind the blank window chrome. VMK builds every
     * element as `pImage = duplicate(tmember.image)` and then copies THAT into
     * the panel buffer, so the copy is always issued against a duplicate. If
     * the PNG happened to land before the copy, the blit succeeded and the
     * panel appeared; if it landed after, the replay was queued on the wrong
     * object and the panel stayed empty forever. Same layout, same members,
     * same code path, opposite outcomes in one boot:
     *
     *     uid:34:24729_back   hasSource TRUE
     *     uid:20:16481_back   hasSource FALSE
     *
     * Delegating up the chain puts the waiter where the wake-up will happen.
     * `flushWaiting` reaches it because the original owns the queue it drains.
     */
    if (this.copiedFrom) {
      this.copiedFrom.whenSourceReady(redo);
      return;
    }
    /**
     * ⚠ EVERY waiting copy is kept. This queue used to stop at 8.
     *
     * One source image feeds MANY copies. A nine-slice window panel is nine on
     * its own, and every window that shares the same chrome art queues nine
     * more against the same member — so the ninth copy onwards was discarded
     * before the PNG had landed, and nothing ever redrew it. The element kept
     * its correct size and position and simply had no pixels, which is why
     * dialogs came out as invisible rectangles with only their captions
     * showing: text rasterises synchronously, the panel behind it did not.
     *
     * It also made the fault RACE-DEPENDENT and so look intermittent — whichever
     * window happened to compose first got its art and the rest got nothing, and
     * a reload could reshuffle which was which.
     *
     * The list is emptied by `set source`, so it only grows while art is
     * genuinely in flight. The cap that remains is a leak guard for art that
     * NEVER arrives, and it complains rather than discarding in silence.
     */
    if (this.waiting.length < 4096) {
      this.waiting.push(redo);
      return;
    }
    console.warn(
      `[lingo image] over 4096 copies waiting on a ${String(this.width)}x${String(this.height)} ` +
        `buffer whose art never arrived; dropping the copy`,
    );
  }

  /**
   * ⚠ Set only for `image(w, h, 8, #grayscale)` — the ALLOCATION VMK makes for a
   * mask. Such an image starts WHITE, i.e. fully opaque as a mask, because
   * Director's grayscale CLUT is REVERSED: index 0 is white. DirPlayer records
   * the same thing — "the reversed Mac grayscale CLUT (white glyph -> index 0)".
   *
   * This is why VMK's alpha pass kept erasing the avatar here.
   * `updateFigurePreview` allocates `t_ImgAlpha` this way and `getPartAlpha`
   * accumulates into it with ink 39 (DARKEST = MINIMUM); a minimum over a black
   * start can only stay black, so every part came out transparent — measured at
   * `nonZeroLevel 145/36000, mean 1`. Starting white, each part writes its own
   * coverage and everything untouched stays opaque, which is correct: the colour
   * buffer is filled with `rgb(255,175,0)`, the registration panel's own orange,
   * so an opaque background is invisible against the panel behind it.
   *
   * ⚠ IT IS A PROPERTY OF THE ALLOCATION, NOT OF EVERY 8-BIT RASTER. Whitening
   * every lazily-created 8-bit raster instead was tried: the preview background
   * went opaque WHITE and the clothing thumbnails went BLACK, because other
   * 8-bit images here are built assuming an empty start.
   */
  private readonly grayscaleMask: boolean;

  /**
   * ⚠ AN 8-BIT `#grayscale` IMAGE IS A PLANE OF LEVELS, NOT AN RGBA CANVAS.
   *
   * This is the representation the whole masked-rendering path needs, and
   * getting it wrong is what made seven separate attempts at VMK's alpha pass
   * each fix one symptom and break another. Director's model:
   *
   *   - an 8-bit image has NO ALPHA CHANNEL; the pixel VALUE is the level
   *   - the grayscale CLUT is REVERSED, so a fresh image (index 0) is WHITE
   *   - inks operate on those values, not on premultiplied RGBA
   *
   * A canvas is always RGBA, always carries alpha, and always blends through
   * it — so every 8-bit image backed by one was a fiction. Holding the levels
   * directly makes the awkward cases fall out instead of needing heuristics:
   * `#ink: 39` (DARKEST) is a plain minimum, `setAlpha` reads levels with no
   * polarity to guess at, and "does this mask have transparency" stops being a
   * question a mask can even answer.
   *
   * The canvas is then only a DISPLAY form, materialised on demand.
   */
  private levels: Uint8Array | null = null;
  private levelsDirty = false;
  /**
   * ⚠ Whether anything has actually been composited into the level plane.
   *
   * A fresh mask is all-255 (index 0 of the reversed CLUT is WHITE), which is
   * indistinguishable from a deliberately opaque mask by value alone — so an
   * allocation nothing ever drew into would read as "fully opaque" and make its
   * target opaque. MEASURED: that is exactly what turned the clothing
   * thumbnails into solid black 36x36 squares (`0,0,0/a255` x1296), because the
   * buffer under the mask was still empty.
   *
   * Director cannot hit this: its masks are built from media already in memory.
   * Ours can be built before the art arrives, so "never written" is a state we
   * have and it must not be mistaken for coverage.
   */
  private levelsWritten = false;

  constructor(
    public width: number,
    public height: number,
    public depth = 32,
    public paletteRef: LingoValue = VOID,
  ) {
    this.grayscaleMask =
      LEVEL_PLANE_IMAGES && depth <= 8 && /gray ?scale|grey ?scale/i.test(String(paletteRef));
    if (this.grayscaleMask) {
      const count = Math.max(1, Math.floor(width)) * Math.max(1, Math.floor(height));
      /**
       * ⚠ THE PLANE HOLDS INDICES, AND A FRESH ONE IS 0.
       *
       * Director's grayscale CLUT is REVERSED — index 0 is WHITE — so a higher
       * index is DARKER, and `setAlpha` reads the index directly as coverage.
       * A new mask is therefore index 0: EMPTY, contributing nothing.
       *
       * MEASURED when this was filled with 255 instead: the figure's mask came
       * out 32,905 opaque of 36,000 — a filled rectangle with holes rather than
       * a silhouette — because `copyAlpha` accumulates with DARKEST and every
       * untouched pixel stayed at maximum coverage.
       */
      this.levels = new Uint8Array(count);
      this.levelsDirty = true;
    }
  }

  /**
   * ⚠ THE SAME ART WITH ALPHA FORCED OPAQUE — the colour a canvas would destroy.
   *
   * A canvas stores PREMULTIPLIED alpha, so a fully-transparent pixel loses its
   * RGB the moment the art is drawn into one. Director does not ignore that
   * colour: body parts carry `useAlpha: 0`, so `getPartImg` composites a part's
   * colour regardless of its own alpha and `getPartAlpha` supplies the
   * silhouette separately.
   *
   * MEASURED — the avatar's MOUTH is entirely in those pixels. `std_fc_1_3_0`
   * row 9 holds `234,219,190/a0` and `167,153,124/a0` in the FILE; through a
   * canvas both read `0,0,0/a0`. Multiplied by the skin tint the recovered
   * colour is an unmistakable mouth: 38 strong pixels against 2.
   *
   * Built by decoding the PNG ourselves and setting alpha to 255 BEFORE the
   * pixels ever reach a canvas — see `lingo-png.ts` and the bitmap loader.
   */
  private ownOpaqueSource: unknown = null;

  /**
   * ⚠ THE COLOUR UNDER PIXELS A RUNTIME `setAlpha` MADE TRANSPARENT — RGBA, one
   * entry per pixel, alpha 255 where the colour is known and 0 where it is not.
   *
   * `opaqueSource` does this for art loaded from a PNG; this is the same loss
   * happening at run time. A canvas stores premultiplied alpha, so the moment
   * `setAlpha` writes alpha 0 the pixel's colour is gone. Director keeps it, and
   * VMK relies on that: `CScale9Grid` fills a row background LIGHT GREEN and
   * masks its rounded corners transparent; `CUIComponent.render` copies it into
   * the row (a replace — see copyPixels' three-way rule) and then
   * `setAlpha(black mask)` makes the whole row opaque again. In Director the
   * corners come back light green. Ours came back BLACK — the black specks on
   * the registration name list.
   *
   * Consulted only where the canvas pixel is fully transparent, so anything
   * drawn since (a row's text) always wins over it.
   */
  private hiddenColour: Uint8ClampedArray | null = null;

  /**
   * ⚠ FOLLOWS `copiedFrom`, exactly as `source` does. The avatar's image cache
   * holds `duplicate(member.image)`, so a duplicate must be able to reach the
   * recovered colour of the image it came from — otherwise every body part
   * reports none and the whole rescue is inert (measured: 0 of 17 loaded parts).
   */
  get opaqueSource(): unknown {
    return this.ownOpaqueSource ?? this.copiedFrom?.opaqueSource ?? null;
  }

  set opaqueSource(value: unknown) {
    this.ownOpaqueSource = value;
    this.revision++;
  }

  /** True while this image is a level plane rather than an RGBA raster. */
  get isLevelPlane(): boolean {
    return this.levels !== null;
  }

  /**
   * ⚠ DIRECTOR'S `image(w, h, d)` RETURNS A **WHITE** IMAGE, not a transparent
   * one — and `trimWhiteSpace` is the proof, because trimming "white space" only
   * means anything if white is what a fresh buffer is made of.
   *
   * `CRegPage1.updatePartPreview` is the case that needs it:
   *
   *     tTempPartImg = image(200, 200, 32)        <- NEVER filled
   *     getPartImg / getPartAlpha / setAlpha
   *     tTempPartImg = trimWhiteSpace(tTempPartImg)
   *     feedImage(tElem, tTempPartImg)
   *
   * Note it does NOT fill, where `updateFigurePreview` explicitly fills orange —
   * because that one WANTS something other than the default. Ours started
   * transparent, so once the alpha pass made the untouched margin OPAQUE it was
   * opaque BLACK: neither white nor transparent, so `trimWhiteSpace` kept it and
   * every clothing thumbnail rendered as a solid black 36x36 square.
   *
   * Set only for the `image()` BUILTIN — Director's allocation — never for the
   * buffers this file creates internally (`duplicate`, crops, scratch rasters),
   * which must keep whatever their source had.
   */
  markFreshAllocation(): void {
    this.freshAllocation = true;
  }

  private freshAllocation = false;

  /** The level plane, for callers that composite over it (`setAlpha`). */
  get levelPlane(): Uint8Array | null {
    return this.levels;
  }

  /** Whether anything was composited into the plane — see `levelsWritten`. */
  get levelsComposited(): boolean {
    return this.levelsWritten;
  }

  /**
   * Paint the level plane into a canvas so the compositor can blit it. Grey RGB,
   * fully OPAQUE — an 8-bit image has no alpha of its own.
   */
  /**
   * Read a source's pixels as LEVELS, the way Director converts into an 8-bit
   * `#grayscale` destination.
   *
   * ⚠ A 32-BIT SOURCE THAT CARRIES TRANSPARENCY CONTRIBUTES ITS **ALPHA**; an
   * opaque one contributes its LUMINANCE. This is Director's
   * text -> alpha-mask -> texture rule (DirPlayer states it explicitly), and it
   * is the whole reason masks work: `CScale9Grid.render` and `getPartAlpha` both
   * want COVERAGE, and reading luminance instead gives them the artwork's
   * brightness. An opaque source has alpha 255 everywhere, so the alpha rule
   * would make it a blank mask — hence the split.
   */
  /**
   * A camera photo's 8-bit sepia palette INDICES, width x height, when this
   * image was made from or into one. `member.media` carries these (see
   * `LingoMedia`), so a photo round-trips exactly without ever encoding the
   * canvas. Set by the camera's hand-corrected `processImage`/`createThumb`
   * and by `member.media = …`.
   */
  photoIndices?: Uint8Array;

  /** All pixels as RGBA, read back in one go. Null off-DOM or before any art. */
  readRgba(): Uint8ClampedArray | null {
    if (this.levels && this.levelsDirty) this.materialiseLevels();
    const drawable = this.source;
    if (!drawable) return null;
    const made = createRaster(this.width, this.height, true);
    const context = made?.context;
    if (!made || !context?.getImageData) return null;
    try {
      context.drawImage(drawable as CanvasImageSource, 0, 0);
    } catch {
      return null;
    }
    return context.getImageData(0, 0, this.width, this.height).data;
  }

  /**
   * Replace every pixel from an RGBA buffer, in one write — `setPixel` here
   * cannot touch a real raster (it only records colours for the compositor's
   * flat-fill case), so bulk pixel work goes through this instead.
   */
  writeRgba(data: Uint8ClampedArray): boolean {
    const made = this.raster();
    const context = made as unknown as {
      createImageData?(w: number, h: number): { data: Uint8ClampedArray };
      putImageData?(image: { data: Uint8ClampedArray }, x: number, y: number): void;
    } | null;
    if (!context?.createImageData || !context.putImageData) return false;
    const image = context.createImageData(this.width, this.height);
    image.data.set(data.subarray(0, image.data.length));
    context.putImageData(image, 0, 0);
    this.revision++;
    return true;
  }

  /** True when a 32-bit source has no transparency — `readSourceLevels` then used brightness. */
  private sourceIsOpaque(source: LingoImage): boolean {
    const drawable = source.source;
    if (!drawable) return false;
    const made = createRaster(source.width, source.height, true);
    const context = made?.context;
    if (!made || !context?.getImageData) return false;
    context.drawImage(drawable as CanvasImageSource, 0, 0);
    const data = context.getImageData(0, 0, source.width, source.height).data;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 255) return false;
    return true;
  }

  private readSourceLevels(source: LingoImage): Uint8Array | null {
    if (source.levels) return source.levels;
    const drawable = source.source;
    if (!drawable) return null;
    const made = createRaster(source.width, source.height, true);
    const context = made?.context;
    if (!made || !context?.getImageData) return null;
    context.drawImage(drawable as CanvasImageSource, 0, 0);
    const data = context.getImageData(0, 0, source.width, source.height).data;

    let hasTransparency = false;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 255) { hasTransparency = true; break; }
    }
    const out = new Uint8Array(source.width * source.height);
    for (let i = 0, p = 0; i < out.length; i++, p += 4) {
      out[i] = hasTransparency
        ? data[p + 3]
        : (77 * data[p] + 150 * data[p + 1] + 29 * data[p + 2] + 128) >> 8;
    }
    return out;
  }

  /**
   * `copyPixels` into an 8-bit level plane. Nearest-neighbour, and the ink is
   * applied to the LEVELS — which is what makes `#ink: 39` a plain minimum.
   */
  private copyIntoLevels(source: LingoImage, rest: LingoValue[]): void {
    const levels = this.levels;
    if (!levels) return;
    let srcLevels = this.readSourceLevels(source);
    if (!srcLevels) return;
    /**
     * ⚠ A MASKED STAMP OF AN OPAQUE SOURCE USES DIRECTOR'S INDEX POLARITY —
     * black is 255, i.e. opaque to `setAlpha`, as `fill` already has it.
     * VMK builds silhouettes exactly so: copy solid BLACK into a fresh
     * (transparent) grayscale mask through each layer's alpha
     * (`createUnionImageFromMemberList`, `#createMask`). By brightness, black
     * stamped 0 and the mask stayed empty, so the Jungle Cruise boat's hit
     * flash drew as a solid red box.
     *
     * Scoped to `#maskImage` copies ON PURPOSE: an unmasked opaque 32->8 copy
     * (a grayscale photo of the stage) keeps the brightness mapping, which the
     * level plane's brightness display (`materialiseLevels`) relies on.
     */
    {
      const list = rest[2] as { getProp?: (key: LingoValue) => LingoValue } | undefined;
      const masked = typeof list?.getProp === "function" && list.getProp(symbol("maskImage")) instanceof LingoImage;
      if (masked && !source.levels && srcLevels !== source.levels) {
        const opaque = this.sourceIsOpaque(source);
        if (opaque) srcLevels = srcLevels.map((v) => 255 - v);
      }
    }

    /**
     * ⚠ A QUAD DESTINATION CARRIES AXIS FLIPS — resolve it exactly as the 32-bit
     * canvas path does (`asQuad`, then mirror the source sampling), because
     * `asRect` SILENTLY REJECTS a quad (a quad is a list) and this path would
     * otherwise fall back to the full-image rect and copy the levels UNFLIPPED.
     *
     * MEASURED: `CRoomFurniThumbRenderer._RenderFurniPreview` flips every FLP=1
     * furniture sprite with `copyPixels(dst, src, [point(w,0), point(0,0),
     * point(0,h), point(w,h)], ...)`. The 32-bit COLOUR half of a piece flipped
     * correctly through the canvas branch, but its 8-bit ALPHA half came through
     * here and did NOT flip — so colour and alpha ended up mirror images of each
     * other, and multi-tile items (the High School Piano) composited to
     * opaque-black wherever the two disagreed (the "split piano"). This mirrors
     * the `quad.flipX || quad.flipY` block in the canvas branch; a non-quad copy
     * (the avatar mask union, name rows, ink-39 accumulation) is unchanged, since
     * `quad` is null and `srcDx === dx`.
     */
    // A plain rect still resolves through `asRect` exactly as before, so rect
    // callers (scale-9 grid masks, the avatar mask union, name rows) are
    // unchanged; only quad destinations now take their own bounds. VERIFIED
    // earlier: the flip handling did NOT cause the shop-list / Help-panel
    // regressions, so those are a separate (colorize/mask) divergence.
    //
    // ⚠ AND A NON-FLIPPED QUAD MUST BE HONOURED TOO. `asRect` rejects every quad,
    // so an unflipped one used to fall back to the FULL image and STRETCH the
    // source across the whole mask. `CRoomVisualBlock.CreateHighlighter` unions
    // each sprite's clipped alpha into the highlight mask with
    // `copyPixels(alpha, rectToQuad(tdestrect), …, [#ink: 39])` — MEASURED on the
    // flying carpet chair: the 66x63 body layer (1,794 px) was stretched over the
    // 111x95 mask, which came out 4,678 px instead of 2,450, so the furni-mode
    // highlight sat larger than and off the item.
    const quad = asQuad(rest[0]);
    /**
     * ⚠ DIRECTOR RECTS ARE WHOLE PIXELS — round, or the plane is indexed by a
     * FRACTION. The room avatar's downscale rect is `(W - W*r)/2, H - H*r, …`
     * (e.g. 15, 41.5, 105, 166 for a 120x166 car union at tile 24), and
     * `levels[41.5 * width + x]` is a no-op property write on a typed array:
     * mask rows vanished while the canvas drew the colour at the sub-pixel
     * spot, so colour and mask disagreed and magic cars (and other composited
     * effects) came out as black silhouettes in far-away rooms. The canvas
     * branch rounds the same way so the two stay on the same pixels.
     */
    const rawDest = (quad ?? asRect(rest[0])) ?? { left: 0, top: 0, right: this.width, bottom: this.height };
    const dest = {
      ...rawDest,
      left: Math.round(rawDest.left), top: Math.round(rawDest.top),
      right: Math.round(rawDest.right), bottom: Math.round(rawDest.bottom),
    };
    const from = asRect(rest[1]) ?? { left: 0, top: 0, right: source.width, bottom: source.height };
    const params = copyParams(rest[2]);
    const ink = params.ink ?? 0;

    const dw = dest.right - dest.left;
    const dh = dest.bottom - dest.top;
    const sw = from.right - from.left;
    const sh = from.bottom - from.top;
    if (dw <= 0 || dh <= 0 || sw <= 0 || sh <= 0) return;

    /**
     * ⚠ `#smooth` MUST RESAMPLE THE MASK THE WAY THE CANVAS RESAMPLES THE COLOUR.
     *
     * The room avatar is shrunk twice with the same rects — colour through the
     * canvas (smoothed, `imageSmoothingQuality = "high"`) and its 8-bit mask
     * through here. Nearest-sampling only the mask left thin art misaligned: the
     * colour of a 2px confetti piece was blurred into the black backing the
     * renderer fills first, while the mask kept a hard, fully opaque pixel, so
     * every piece wore a black block — "stacking" confetti in far-away rooms
     * (Drive-In, tile 24) and clean in close-up ones (tile 32, no scale).
     *
     * Area-average the source footprint of each destination pixel, which is
     * what a high-quality downscale does. Plain copies only: the ink-39/37
     * unions compare levels and must keep hard pixels.
     */
    if (params.smooth && ink !== 39 && ink !== 37 && !quad && (sw !== dw || sh !== dh)) {
      const sx0 = from.left, sy0 = from.top;
      const fx = sw / dw, fy = sh / dh;
      for (let dy = 0; dy < dh; dy++) {
        const ty = dest.top + dy;
        if (ty < 0 || ty >= this.height) continue;
        const ya = sy0 + dy * fy, yb = ya + fy;
        for (let dx = 0; dx < dw; dx++) {
          const tx = dest.left + dx;
          if (tx < 0 || tx >= this.width) continue;
          const xa = sx0 + dx * fx, xb = xa + fx;
          let sum = 0, weight = 0;
          for (let sy = Math.floor(ya); sy < yb; sy++) {
            if (sy < 0 || sy >= source.height) continue;
            const wy = Math.min(sy + 1, yb) - Math.max(sy, ya);
            if (wy <= 0) continue;
            for (let sx = Math.floor(xa); sx < xb; sx++) {
              if (sx < 0 || sx >= source.width) continue;
              const wx = Math.min(sx + 1, xb) - Math.max(sx, xa);
              if (wx <= 0) continue;
              sum += srcLevels[sy * source.width + sx] * wx * wy;
              weight += wx * wy;
            }
          }
          if (weight > 0) levels[ty * this.width + tx] = Math.round(sum / weight);
        }
      }
      this.levelsDirty = true;
      this.levelsWritten = true;
      this.revision++;
      return;
    }

    /**
     * ⚠ SAMPLE THE PIXEL CENTRE, as the canvas does. A nearest-neighbour
     * `drawImage` scale reads source pixel `floor((d + 0.5) * s / dd)`; sampling
     * `floor(d * s / dd)` (the footprint's top-left corner) picks a DIFFERENT
     * source pixel on most rows of a downscale, so colour and mask disagreed at
     * every edge. `CClothesPreviewRenderer` shrinks the preview (~80px) into a
     * 38px thumb this way — colour and mask separately, then `setAlpha` — and
     * where the mask took a solid pixel while the colour took the whitish,
     * mostly-transparent edge beside it, that edge came out OPAQUE near-white:
     * the fringe round clothing thumbnails (the Bandana showed it worst,
     * MEASURED 18 opaque near-white px in its thumb, 0 in the preview it came
     * from). An unscaled copy is unaffected: the two formulas agree at 1:1.
     */
    /**
     * ⚠ `#maskImage` / `#maskOffset` — only write where the mask covers, the
     * mask's level (white = opaque, as `extractAlpha` gives it) weighting the
     * write, the mask placed at the destination rect's top-left plus the offset.
     *
     * Ignored, a masked copy wrote the whole rect: the Jungle Cruise builds its
     * boat's red hit-flash silhouette by copying black through each hull
     * layer's alpha (`createUnionImageFromMemberList`, `#createMask`) and got a
     * solid red box instead. `#maskImage: 0` (the avatar parts) means no mask.
     */
    const maskList = rest[2] as { getProp?: (key: LingoValue) => LingoValue } | undefined;
    const maskValue = typeof maskList?.getProp === "function" ? maskList.getProp(symbol("maskImage")) : VOID;
    const mask = maskValue instanceof LingoImage ? maskValue : null;
    const maskLevels = mask ? this.readSourceLevels(mask) : null;
    const maskOffsetValue = mask && typeof maskList?.getProp === "function" ? maskList.getProp(symbol("maskOffset")) : VOID;
    const maskOffset = maskOffsetValue instanceof LingoPoint ? maskOffsetValue : null;
    const maskOffX = maskOffset ? Math.round(num(maskOffset.locH)) : 0;
    const maskOffY = maskOffset ? Math.round(num(maskOffset.locV)) : 0;
    /**
     * A mask DERIVED from art that has not arrived (`extractAlpha` of a lazily
     * loaded member) reads empty now. Ask for the art and redo this copy when it
     * lands — the copy-replay machinery only watches the SOURCE, not the mask.
     */
    const maskFrom = mask?.recomputeFrom?.source;
    if (mask && maskFrom && !maskFrom.hasRaster) {
      maskFrom.requestSource();
      const queuedAt = this.clearRevision;
      maskFrom.whenSourceReady(() => {
        if (this.clearRevision !== queuedAt) return;
        mask.recomputeFrom?.run();
        this.copyPixels(source as unknown as LingoValue, ...rest);
      });
    }

    for (let dy = 0; dy < dh; dy++) {
      const ty = dest.top + dy;
      if (ty < 0 || ty >= this.height) continue;
      const srcDy = quad?.flipY ? (dh - 1 - dy) : dy;
      const sy = from.top + Math.floor(((srcDy + 0.5) * sh) / dh);
      if (sy < 0 || sy >= source.height) continue;
      for (let dx = 0; dx < dw; dx++) {
        const tx = dest.left + dx;
        if (tx < 0 || tx >= this.width) continue;
        const srcDx = quad?.flipX ? (dw - 1 - dx) : dx;
        const sx = from.left + Math.floor(((srcDx + 0.5) * sw) / dw);
        if (sx < 0 || sx >= source.width) continue;

        const incoming = srcLevels[sy * source.width + sx];
        const at = ty * this.width + tx;
        const current = levels[at];
        /**
         * ⚠ IN INDEX SPACE, DARKEST IS A MAXIMUM. The grayscale CLUT is
         * reversed (index 0 = white), so a higher index is a darker pixel —
         * DARKEST therefore keeps the LARGER index, and LIGHTEST the smaller.
         *
         * This is what makes `getPartAlpha` a UNION: each part contributes its
         * own coverage and nothing erases what another part already claimed.
         * Implemented as a minimum, the mask came out inverted — 91% opaque —
         * and the avatar rendered as a filled block.
         */
        const result =
          ink === 39 ? Math.max(current, incoming)
          : ink === 37 ? Math.min(current, incoming)
          : incoming;
        if (mask && maskLevels) {
          const mx = dx - maskOffX;
          const my = dy - maskOffY;
          const cover = mx >= 0 && my >= 0 && mx < mask.width && my < mask.height
            ? maskLevels[my * mask.width + mx] : 0;
          if (cover <= 0) continue;
          levels[at] = cover >= 255 ? result : Math.round(current + ((result - current) * cover) / 255);
          continue;
        }
        levels[at] = result;
      }
    }
    this.levelsDirty = true;
    this.levelsWritten = true;
    this.revision++;
    // Wake any `setAlpha` that skipped this mask while it was empty.
    const waiters = this.alphaWaiters;
    if (waiters?.length) {
      this.alphaWaiters = undefined;
      for (const wake of waiters) wake();
    }
  }

  private materialiseLevels(): void {
    const levels = this.levels;
    if (!levels || !this.levelsDirty) return;
    // A 0-wide/0-high image has no pixels to write, and `getImageData` THROWS
    // on a zero dimension (Director just does nothing) — see `setAlpha`.
    if (this.width <= 0 || this.height <= 0) {
      this.levelsDirty = false;
      return;
    }
    const made = this.context2d
      ? { context: this.context2d, canvas: this.ownSource }
      : createRaster(this.width, this.height, true);
    const context = made?.context;
    if (!made || !context?.getImageData || !context.putImageData) return;
    const image = context.getImageData(0, 0, this.width, this.height);
    const data = image.data;
    for (let i = 0, p = 0; i < levels.length; i++, p += 4) {
      data[p] = levels[i];
      data[p + 1] = levels[i];
      data[p + 2] = levels[i];
      data[p + 3] = 255;
    }
    context.putImageData(image, 0, 0);
    this.context2d = context;
    this.ownSource = made.canvas;
    this.levelsDirty = false;
  }

  get rect(): LingoRect {
    return new LingoRect(0, 0, this.width, this.height);
  }

  fill(rect: LingoValue, color: LingoValue, ...rest: LingoValue[]): LingoValue {
    if (typeof rect === "number" && typeof color === "number" && rest.length >= 3) {
      return this.fill(
        new LingoRect(rect, color, Number(rest[0]), Number(rest[1])) as unknown as LingoValue,
        rest[2],
      );
    }
    /**
     * ⚠ THE COLOUR MAY ARRIVE AS A PROPERTY LIST, and VMK's UI always sends one:
     *
     *     fill(m_rImg, m_rImg.rect,
     *          [#shapeType: #rect, #lineSize: 0, #color: m_rBgColor])
     *
     * Director's `fill` takes either a colour or the same parameter list `draw`
     * uses; `#lineSize: 0` is what makes it a solid fill rather than an outline.
     * Accepting only a bare `LingoColor` meant every one of those calls did
     * NOTHING — no raster, no pixels — so `CUIComponentPage.render` produced an
     * image with no source and the entire UI-component system drew blank.
     *
     * That is what left the generated-name list empty: all five rows existed
     * (`m_ar_components` count=5) and were being composed onto a surface that
     * had never been created.
     */
    const asList = color as { getProp?: (key: LingoValue) => LingoValue } | null;
    if (
      color !== null && typeof color === "object" && !(color instanceof LingoColor) &&
      typeof asList?.getProp === "function"
    ) {
      const named = asList.getProp(symbol("color"));
      if (named instanceof LingoColor) color = named;
    }

    this.revision++;
    this.clearRevision++;
    /**
     * A cleared buffer has lost its captions along with its pixels; keeping the
     * runs would redraw text over the fresh fill.
     *
     * ⚠ BUT A FILL CAN BE PARTIAL, so only drop runs the fill actually paints
     * over. `CGroupedThumbnailGrid.render` fills EACH cell's background rect in
     * turn, then blits that cell's thumbnail and count into it; an unconditional
     * clear wiped every earlier cell's count run, so only the LAST item in the
     * grid kept its quantity number (measured: the inventory Furnishings buffer
     * ended with a single run "1" instead of one per item). A run whose origin
     * lies outside the filled rect is untouched, so a full-image fill (the avatar
     * alpha clear, a caption clear via `setText(elem, "")`) still drops them all.
     */
    const clearBox = asRect(rect) ?? { left: 0, top: 0, right: this.width, bottom: this.height };
    this.textRuns = this.textRuns.filter((run) => {
      // A run whose origin is inside the filled rect is painted over.
      const originInside =
        run.x >= clearBox.left && run.x < clearBox.right &&
        run.y >= clearBox.top && run.y < clearBox.bottom;
      // So is one whose VISIBLE area (its clip) lies wholly inside it — a
      // scrolled run's origin sits above the list it is cropped to, and
      // keeping it stacked a copy per scroll step. See `clip`.
      const clipInside =
        run.clip !== undefined &&
        run.clip.left >= clearBox.left && run.clip.right <= clearBox.right &&
        run.clip.top >= clearBox.top && run.clip.bottom <= clearBox.bottom;
      return !originInside && !clipInside;
    });
    /**
     * ⚠ A CLEAR ABANDONS what this buffer was composed from.
     *
     * `feedImage` fills before every new image, so keeping the old dependencies
     * would let a superseded source paint itself back in at the next refresh —
     * the guest-room preview bug, arriving by a different route.
     *
     * ⚠ BUT ONLY WHAT THE FILL COVERS, like the text runs above. A thumbnail
     * grid fills each SLOT just before copying its thumbnail in
     * (`CGroupedThumbnailGrid.render`), and clearing every dependency there
     * forgot all the slots already drawn: only the last copy could ever
     * replay. MEASURED on the Pins tab's first open: 3 slots copied, 2 deps
     * left, and the two pins whose art landed late stayed blank for good
     * although their cached thumbnails held 1,132 opaque pixels. A copy whose
     * destination lies wholly inside the filled rect is painted over and goes;
     * any other stays.
     */
    for (const [key, dep] of [...this.sourceDeps]) {
      const dest = asRect(dep.rest[0]) ?? { left: 0, top: 0, right: this.width, bottom: this.height };
      const covered =
        dest.left >= clearBox.left && dest.right <= clearBox.right &&
        dest.top >= clearBox.top && dest.bottom <= clearBox.bottom;
      if (covered) this.sourceDeps.delete(key);
    }
    if (color instanceof LingoColor) this.fillColor = color;
    // The fill is the colour there now; nothing is hidden under it any more.
    this.forgetHiddenColour(clearBox);
    /**
     * ⚠ Paint it into the raster, CREATING one if needed.
     *
     * A partial fill is a real picture, not a flat colour: the loading bar
     * grows by filling a sub-rect that widens with the download percentage
     * (`Loading_Bar_Class.prepare`). Recording only `fillColor` made the
     * compositor paint the WHOLE element in that colour, so the bar appeared
     * instantly full and never animated. Rasterising here is what lets a
     * partial rect look partial.
     */
    /**
     * ⚠ A FILL MUST RESET THE LEVEL PLANE TOO, NOT JUST THE RASTER.
     *
     * This is how the avatar's alpha accumulator is cleared between frames:
     *
     *     CAvatarRenderer.update
     *       m_rAlpha.fill(m_rAlpha.rect, rgb(255, 255, 255))
     *
     * and VMK treats that fill as INTERCHANGEABLE with allocating a new plane —
     * the very next line of its `else` branch is
     * `m_rAlpha = image(w, h, 8, #grayscale)`. So the fill has to leave the
     * plane in the same state a fresh one would be in.
     *
     * Painting only the canvas left `levels` holding the PREVIOUS frame, and
     * because `#ink: 39` is a union in index space (see `copyIntoLevels`),
     * nothing ever erased it: the mask grew into the union of every pose the
     * avatar had ever held. The colour buffer IS cleared each frame
     * (`t_Img.fill(rgb(0,0,0))`), so wherever the stale mask reached past the
     * current pose the figure showed that black fill — a halo hugging the
     * avatar that got worse the more he moved, and was absent on a fresh spawn.
     *
     * Index space is reversed (index 0 = white), so white fills to 0 — matching
     * `copyIntoLevels`, where DARKEST keeps the LARGER index.
     */
    const levels = this.levels;
    if (levels && color instanceof LingoColor) {
      const box = asRect(rect) ?? { left: 0, top: 0, right: this.width, bottom: this.height };
      const luma = (77 * color.red + 150 * color.green + 29 * color.blue + 128) >> 8;
      const index = 255 - Math.max(0, Math.min(255, luma));
      const left = Math.max(0, box.left);
      const top = Math.max(0, box.top);
      const right = Math.min(this.width, box.right);
      const bottom = Math.min(this.height, box.bottom);
      for (let y = top; y < bottom; y++) {
        levels.fill(index, y * this.width + left, y * this.width + right);
      }
      this.levelsDirty = true;
      /**
       * ⚠ A FILL IS A DELIBERATE WRITE — the mask means what it was filled with.
       * `levelsWritten` guards against a mask read before art COPIED into it has
       * arrived; a fill depends on no art. Without this `setAlpha` skipped every
       * filled mask: `CUIComponentPage.render` ends with
       * `fill(t_rMask, black); setAlpha(m_rImg, t_rMask)` to make the whole page
       * opaque, so the friend list kept the rows' transparent rounded corners,
       * which the element's white buffer then showed as white specks round
       * every name (ink 36 keys only exact white, not the anti-aliased edge).
       */
      this.levelsWritten = true;
    }

    const context = color instanceof LingoColor ? this.raster() : null;
    if (context && color instanceof LingoColor) {
      const box = asRect(rect) ?? { left: 0, top: 0, right: this.width, bottom: this.height };
      context.fillStyle = `rgb(${color.red},${color.green},${color.blue})`;
      context.fillRect(
        box.left,
        box.top,
        Math.max(box.right - box.left, 0),
        Math.max(box.bottom - box.top, 0),
      );
    } else if (color === VOID || color === null) {
      /**
       * ⚠ A FILL WITH NO COLOUR STILL CLEARS.
       *
       * `CWindowImageWrapper` clears its area before every scroll redraw with
       * `fill(tTargetRect, me.pProps[#bgColor])`, and most image elements —
       * the guest-room navigator's `nav.roomlist` among them — declare no
       * `#bgColor`, so the colour is VOID. Doing nothing here left each scroll
       * position under the next: the list's opaque rows hid it, but the column
       * header's transparent pixels showed every previous position, "smearing
       * the top bit" as you dragged. Back to transparent is exactly the state a
       * fresh element buffer starts in, so the first frame and every scrolled
       * frame now look the same.
       */
      const raster = this.raster();
      if (raster) {
        const box = asRect(rect) ?? { left: 0, top: 0, right: this.width, bottom: this.height };
        raster.clearRect(box.left, box.top, Math.max(box.right - box.left, 0), Math.max(box.bottom - box.top, 0));
      }
    }
    return VOID;
  }

  /**
   * Clears every pixel to TRANSPARENT rather than to a colour.
   *
   * `fill` paints an opaque rectangle — correct for Director's `fill`, wrong for
   * recomposing a film loop frame. A loop's cells rarely cover its whole rect,
   * so anything the previous frame drew outside the new frame's cells would stay
   * on screen and the animation would smear into the union of its own frames.
   *
   * This is the "start from nothing" a freshly allocated buffer would give,
   * WITHOUT replacing the instance — the stage caches ink variants against
   * `revision`, and a new instance per frame would defeat that cache while
   * leaving anything holding the old buffer frozen on frame 0.
   */
  clearToTransparent(): void {
    this.revision++;
    this.clearRevision++;
    this.textRuns = [];
    this.sourceDeps.clear();
    this.pixels.clear();
    this.hiddenColour = null;
    const context = this.raster();
    if (context) context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * A replacing `copyPixels` moves `source`'s hidden colour into this image with
   * its pixels — or, when the source has none (or the copy scales), forgets
   * this image's hidden colour under the rect, since those pixels are new.
   */
  carryHiddenColour(
    source: LingoImage,
    from: { left: number; top: number },
    dest: { left: number; top: number; right?: number; bottom?: number },
    sw: number, sh: number, dw: number, dh: number,
  ): void {
    const box = { left: dest.left, top: dest.top, right: dest.left + dw, bottom: dest.top + dh };
    const incoming = source.hiddenColour;
    if (!incoming || sw !== dw || sh !== dh) {
      this.forgetHiddenColour(box);
      return;
    }
    const hidden = (this.hiddenColour ??= new Uint8ClampedArray(this.width * this.height * 4));
    for (let y = 0; y < dh; y++) {
      const ty = Math.floor(dest.top) + y;
      const sy = Math.floor(from.top) + y;
      if (ty < 0 || ty >= this.height || sy < 0 || sy >= source.height) continue;
      for (let x = 0; x < dw; x++) {
        const tx = Math.floor(dest.left) + x;
        const sx = Math.floor(from.left) + x;
        if (tx < 0 || tx >= this.width || sx < 0 || sx >= source.width) continue;
        const t = (ty * this.width + tx) * 4;
        const s = (sy * source.width + sx) * 4;
        hidden[t] = incoming[s];
        hidden[t + 1] = incoming[s + 1];
        hidden[t + 2] = incoming[s + 2];
        hidden[t + 3] = incoming[s + 3];
      }
    }
  }

  /** Forget the hidden colour inside `box` — something replaced those pixels outright. */
  private forgetHiddenColour(box: { left: number; top: number; right: number; bottom: number }): void {
    const hidden = this.hiddenColour;
    if (!hidden) return;
    const left = Math.max(0, Math.floor(box.left));
    const top = Math.max(0, Math.floor(box.top));
    const right = Math.min(this.width, Math.ceil(box.right));
    const bottom = Math.min(this.height, Math.ceil(box.bottom));
    for (let y = top; y < bottom; y++) {
      for (let x = left; x < right; x++) hidden[(y * this.width + x) * 4 + 3] = 0;
    }
  }

  /**
   * Layers `source` over this image at `(x, y)` the way the STAGE layers a Copy
   * sprite — source-over, so the source's transparent pixels leave what is
   * underneath alone.
   *
   * ⚠ NOT `copyPixels`. Lingo's image-to-image Copy onto a 32-bit alpha buffer
   * is a REPLACE (see the three-way rule in `copyPixels`), so a transparent
   * pixel ERASES. That is right for Lingo, and wrong for a film loop, whose
   * cells are score sprites. The SpaceRocket rocket cell's transparent bounding
   * box wiped out the flame cell drawn under it. MEASURED on frame 0 at the
   * extracted positions: 13 flame pixels in the nozzle band under copyPixels,
   * 1777 with source-over.
   *
   * Nothing is recorded in `sourceDeps`: the caller repaints every tick, so art
   * that lands late is picked up on the next frame anyway.
   */
  drawSpriteOver(source: LingoImage, x: number, y: number, opacity = 1): void {
    const drawable = source.source;
    if (drawable === null || drawable === undefined) return;
    const context = this.raster();
    if (!context) return;
    this.revision++;
    const previous = context.globalAlpha;
    context.globalAlpha = opacity;
    context.drawImage(drawable as CanvasImageSource, x, y);
    context.globalAlpha = previous;
  }

  /**
   * Sparse pixel overrides, keyed `x,y`. A full buffer is not allocated because
   * almost every image here is either flat-filled or backed by real art; the
   * only per-pixel writes VMK makes are one-pixel sentinels like the `null`
   * member that `CMgrWindow.construct` builds to stand in for "no image".
   */
  readonly pixels = new Map<string, LingoColor>();

  /**
   * `setAlpha` accepts either a flat 0-255 value or an 8-bit alpha image.
   * Recorded rather than applied: the compositor paints flat fills and blits
   * whole frames, so per-pixel alpha has nowhere to land yet — but dropping the
   * call would let a transparent element render fully opaque with no warning.
   */
  alpha: LingoValue = VOID;

  /**
   * `setAlpha(mask)` — REPLACE this image's alpha channel with the mask's
   * greyscale value, per pixel.
   *
   * ⚠ THIS USED TO ONLY STORE THE REFERENCE, which made VMK's whole second pass
   * inert. `updateFigurePreview` is two passes:
   *
   *     getPartImg    -> t_HumanImg   colour
   *     getPartAlpha  -> t_ImgAlpha   alpha
   *     setAlpha(t_HumanImg, t_ImgAlpha)
   *
   * so the figure's transparency is meant to come from HERE. With this a no-op
   * and `extractAlpha` returning a blank image, the alpha pass composed nothing
   * and the silhouette instead fell out of the colour pass blending each part
   * by its own alpha — which is not what Director does, and is why faint parts
   * (the face tiles, whose detail sits at alpha 48) were washed out.
   */
  /**
   * `setAlpha(mask)` — REPLACE this image's alpha channel with the mask's
   * level, per pixel.
   *
   * ⚠ THIS USED TO ONLY STORE THE REFERENCE, which left VMK's second pass
   * inert. `updateFigurePreview` is two passes —
   *
   *     getPartImg    -> t_HumanImg   colour
   *     getPartAlpha  -> t_ImgAlpha   alpha
   *     setAlpha(t_HumanImg, t_ImgAlpha)
   *
   * — so the figure's transparency is meant to come from here, which is also
   * why every body part carries `useAlpha: 0`.
   *
   * ⚠ REQUIRES `flattenToGrayscale`. An earlier attempt at this ALONE emptied
   * the name list: `CScale9Grid.render` builds its mask with
   * `image(w,h,8,#grayscale)` + `copyPixels`, and while that kept full RGB the
   * mask read back as the artwork's red channel. Grayscale depth had to be
   * honoured first.
   */
  /**
   * ⚠ APPLYING THE MASK HERE HAS NOW BEEN TRIED TWICE AND EMPTIED THE NAME LIST
   * BOTH TIMES. Read this before a third attempt.
   *
   * VMK's second pass genuinely does depend on it —
   *
   *     getPartImg    -> t_HumanImg   colour
   *     getPartAlpha  -> t_ImgAlpha   alpha
   *     setAlpha(t_HumanImg, t_ImgAlpha)
   *
   * — and every body part carrying `useAlpha: 0` says the same thing: Director
   * composites their colour opaquely and takes transparency from here. While
   * this only stores the reference, that pass composes nothing and the
   * silhouette falls out of the colour pass instead, which is why faint face
   * tiles (detail at alpha 48) wash out and some avatars show no lips.
   *
   * ATTEMPT 1 failed because `image(w,h,8,#grayscale)` kept full RGB, so the
   * mask was the artwork's red channel. That prerequisite IS now fixed —
   * `flattenToGrayscale` converts on copy, verified: 174,215,59 -> 185,185,185.
   *
   * ATTEMPT 2, on top of that fix, STILL emptied the list. So the remaining
   * fault is in how `CScale9Grid.render`'s mask is built or read, NOT in the
   * grayscale depth:
   *
   *     t_mask = image(w, h, 8, #grayscale)
   *     copyPixels(t_mask, t_Img, t_Img.rect, t_Img.rect)
   *     fill(t_Img, t_Img.rect, t_rColor)
   *     setAlpha(t_Img, t_mask)
   *
   * ⚠ NEXT TIME, MEASURE THE MASK ITSELF FIRST — dump `t_mask`'s pixels for one
   * name row at that point and confirm it is non-black where the row should be
   * opaque. Do not enable this and judge by the screenshot; that is what both
   * attempts did.
   */
  setAlpha(source: LingoValue): LingoValue {
    this.alpha = source;
    this.useAlpha = 1;

    if (!(source instanceof LingoImage)) return VOID;
    /**
     * ⚠ AN EMPTY IMAGE IS A NO-OP, NOT AN ERROR. Director's `image(0, 0, 32)`
     * is legal and `setAlpha` on it does nothing; `getImageData` THROWS on a
     * zero dimension. `CRoomVisualBlock.CreateHighlighter` builds one for every
     * furnimap block that carries no SPR (its sprite union stays rect(0,0,0,0)).
     * MEASURED on the Tea Cup Teleporter (item 53, several empty BLKs): the throw
     * aborted `CRoomMouseEventProcessor.Process` mid-select, so clicking the
     * item in furnishing mode never opened ROTATE/MOVE/TAKE AWAY. Shockwave
     * selects it fine.
     */
    if (this.width <= 0 || this.height <= 0 || source.width <= 0 || source.height <= 0) return VOID;

    const target = this.source;
    /**
     * ⚠ READ THE LEVEL PLANE DIRECTLY when the mask has one — no canvas, and so
     * no polarity to guess at. A ported `imageHasMattePolarity` heuristic
     * inverted the name rows here, because it asks "does any pixel have alpha
     * < 255" of an 8-bit mask that, correctly represented, HAS NO ALPHA AT ALL.
     */
    const plane = source.levelPlane;
    const planeFits = plane !== null && plane.length === this.width * this.height;
    /**
     * ⚠ AND DO NOT TOUCH `source.source` THEN. Reading it MATERIALISES the level
     * plane into a canvas (read back, rewrite every pixel, write back) — which
     * this path never looks at. That wasted conversion, once per `setAlpha`,
     * was the top CPU cost of an avatar + Character-window load (MEASURED,
     * `?perf=sample`: `materialiseLevels` 23% self). Only the fallback below,
     * for a mask WITHOUT a plane, draws the mask as an image.
     */
    const mask = planeFits ? null : source.source;
    if (!target || (!planeFits && !mask)) return VOID;
    /**
     * ⚠ A MASK THAT IS NOT READY YET IS WAITED FOR, not dropped. It may be
     * composited from art still downloading (the Jungle Cruise boat's red
     * hit-flash silhouette is masked by the hull layers' alpha, built before the
     * hull bitmaps arrive). Skipping once left the image opaque for good — a
     * solid red box on every bump. Re-apply when the mask next gets written.
     */
    const waitForMask = (): LingoValue => {
      if (plane) (source.alphaWaiters ??= []).push(() => { this.setAlpha(source); });
      return VOID;
    };
    // An allocation nothing composited into is not a mask — see `levelsWritten`.
    if (plane && !source.levelsComposited) return waitForMask();
    // A scratch, NOT `raster()`: that hands back a BLANK canvas for an image
    // whose pixels live in a fetched `ImageBitmap`, discarding the art.
    const made = createRaster(this.width, this.height, true);
    const context = made?.context;
    if (!made || !context?.getImageData || !context.putImageData) return VOID;
    context.drawImage(target as CanvasImageSource, 0, 0);
    const composed = context.getImageData(0, 0, this.width, this.height);

    let maskPixels: Uint8Array | Uint8ClampedArray;
    if (planeFits && plane) {
      maskPixels = plane;
    } else {
      const maskRaster = createRaster(this.width, this.height, true);
      const maskContext = maskRaster?.context;
      if (!maskRaster || !maskContext?.getImageData) return VOID;
      maskContext.drawImage(mask as CanvasImageSource, 0, 0);
      const rgba = maskContext.getImageData(0, 0, this.width, this.height).data;
      const flat = new Uint8Array(this.width * this.height);
      for (let i = 0, p = 0; i < flat.length; i++, p += 4) {
        flat[i] = (77 * rgba[p] + 150 * rgba[p + 1] + 29 * rgba[p + 2] + 128) >> 8;
      }
      maskPixels = flat;
    }

    /**
     * ⚠ AN EMPTY MASK MEANS "NOT COMPOSED YET", NOT "FULLY TRANSPARENT".
     *
     * A mask can be built by copying a buffer that art has not reached yet, and
     * applying it literally erases the element for good — these buffers are
     * cached and never recomposed. MEASURED: without this guard the name list's
     * 135x105 container went fully transparent (a0 across all 14,175 px) while
     * the ROWS were correct (green 136,186,63 at alpha 255).
     */
    let anyCoverage = false;
    for (let i = 0; i < maskPixels.length; i++) {
      if (maskPixels[i] !== 0) { anyCoverage = true; break; }
    }
    if (!anyCoverage) return waitForMask();

    /**
     * The mask's LEVEL becomes the alpha — 0 transparent, 255 opaque.
     *
     * ⚠ NO POLARITY HEURISTIC. One was tried, ported from LibreShockwave's
     * `imageHasMattePolarity`, and it INVERTED the name rows — because that test
     * asks "does any pixel have alpha < 255" of an 8-bit mask that, in a correct
     * implementation, HAS NO ALPHA CHANNEL AT ALL. Ours used to carry one, so it
     * fired on masks that were never matte. `flattenToGrayscale` now writes a
     * genuinely opaque single-channel mask, which removes the ambiguity the
     * heuristic existed to paper over.
     *
     * Read as LUMINANCE with the reference's weights so that
     * `setAlpha(extractAlpha(x))` is the identity it is required to be; for a
     * grey mask r == g == b, so this is just the level.
     */
    const pixels = composed.data;
    /**
     * Colour first: where the canvas pixel is fully transparent its RGB was
     * lost, so take the colour remembered from an earlier `setAlpha` (possibly
     * via a copy — see `hiddenColour`). Then remember this image's colour for
     * the pixels THIS pass is about to hide.
     */
    const hidden = this.hiddenColour;
    let hides = false;
    for (let i = 0, p = 0; i < maskPixels.length; i++, p += 4) {
      if (pixels[p + 3] === 0 && hidden && hidden[p + 3] !== 0) {
        pixels[p] = hidden[p];
        pixels[p + 1] = hidden[p + 1];
        pixels[p + 2] = hidden[p + 2];
        pixels[p + 3] = 255;
      }
      if (maskPixels[i] === 0 && pixels[p + 3] !== 0) hides = true;
    }
    if (hides || hidden) {
      const colour = new Uint8ClampedArray(pixels);
      for (let p = 3; p < colour.length; p += 4) colour[p] = colour[p] === 0 ? 0 : 255;
      this.hiddenColour = colour;
    }
    for (let i = 0, p = 0; i < maskPixels.length; i++, p += 4) {
      pixels[p + 3] = maskPixels[i];
    }
    context.putImageData(composed, 0, 0);
    this.context2d = context;
    this.ownSource = made.canvas;
    this.revision++;
    return VOID;
  }

  /**
   * `extractAlpha` returns the alpha channel as its own 8-bit image.
   *
   * ⚠ IT USED TO RETURN A BLANK IMAGE. `AddCastContentsToImageCache` caches
   * `#alpha: extractAlpha(duplicate(member.image))` for every body part, and
   * `getPartAlpha` composes those into the mask `setAlpha` applies — so a blank
   * answer here silently emptied the entire alpha pass.
   */
  extractAlpha(): LingoImage {
    if (this.alpha instanceof LingoImage) return this.alpha;
    // A LEVEL PLANE, like every other 8-bit `#grayscale` image — see `levels`.
    const out = new LingoImage(this.width, this.height, 8, "grayscale");

    const extract = (): void => {
      const src = this.source;
      if (!src) return;
      const made = createRaster(this.width, this.height, true);
      const context = made?.context;
      if (!made || !context?.getImageData) return;
      context.drawImage(src as CanvasImageSource, 0, 0);
      const data = context.getImageData(0, 0, this.width, this.height).data;
      const plane = out.levels;
      if (!plane) return;
      // Director's `extractAlpha`: the alpha channel AS the level, white opaque.
      for (let i = 0, p = 0; i < plane.length; i++, p += 4) plane[i] = data[p + 3];
      out.levelsDirty = true;
      out.levelsWritten = true;
      out.revision++;
    };

    extract();

    /**
     * ⚠ DERIVED, NOT SNAPSHOTTED — the cache is built BEFORE the art exists.
     *
     * `AddCastContentsToImageCache` stores `#alpha: extractAlpha(duplicate(
     * member.image))` the moment a cast is added, and our bitmaps load on
     * demand. MEASURED: of 3,748 cached parts, ZERO `#alpha` entries had a
     * raster — so `copyAlpha` copied nothing for every part and `t_ImgAlpha`
     * was never drawn into at all. Re-running the extraction when the source's
     * revision moves is what `recomputeFrom` is for.
     *
     * ⚠ AND DO NOT `requestSource()` HERE. Doing so took cached images from 17
     * to 3,748 — the fetch storm the lazy design exists to avoid. The alpha
     * fills in when something actually wears the part and its art arrives.
     */
    out.recomputeFrom = { source: this, seen: this.chainRevision, run: extract };
    return out;
  }


  /**
   * `image.crop(rect)` — a NEW image holding the source region inside `rect`.
   *
   * Director's `crop` copies the pixels within `rect` into a fresh image sized to
   * that rect. VMK builds every furniture inventory THUMBNAIL this way:
   * `CRoomFurniThumbRenderer._RenderFurniPreview` composites the item into a
   * 256x256 scratch, tracks the drawn bounds in `t_rcDirty`, and ends with
   * `t_rImage = t_rImage.crop(t_rcDirty)`. Without it every furni thumbnail threw
   * "Lingo method not found: crop" and the Furnishings grid never resolved.
   *
   * Implemented in terms of `copyPixels` so ink/alpha behave exactly as a normal
   * blit: make a same-depth destination the size of the rect and copy the region
   * into it at the origin. Carries `useAlpha` so a 32-bit crop keeps transparency.
   */
  crop(rect: LingoValue): LingoImage {
    const r = asRect(rect) ?? { left: 0, top: 0, right: this.width, bottom: this.height };
    const w = Math.max(1, Math.round(r.right - r.left));
    const h = Math.max(1, Math.round(r.bottom - r.top));
    const out = new LingoImage(w, h, this.depth, this.paletteRef);
    if (this.depth === 32 && this.useAlpha) out.useAlpha = true;
    out.copyPixels(this, out.rect, rect);
    return out;
  }

  /** `createMatte` returns a mask; VMK only ever passes it back to `copyPixels`. */
  createMatte(): LingoImage {
    return new LingoImage(this.width, this.height, 1);
  }

  /**
   * `copyPixels(source, destRect, sourceRect, [params])` — the workhorse, 43
   * call sites. The real blit belongs to the compositor, which works from the
   * sprite list; recording the last source keeps a chain of copies traceable
   * instead of silently producing an empty buffer.
   */
  /**
   * Copies this buffer is composed FROM, so it can be rebuilt when they change.
   *
   * ⚠ PULL, NOT PUSH. Refreshing at DRAW time — see `refreshFromSources` — means
   * a write never triggers a cascade of other writes, so there is no loop to
   * guard against and no ordering to get wrong. The ink-variant cache already
   * works this way; this is the same idea one level down.
   *
   * Keyed by source image AND destination, so re-copying the same source to
   * the same place replaces its entry rather than growing the list.
   *
   * ⚠ NOT BY SOURCE ALONE. One image copied to two places is two copies. Two
   * identical single-use tickets share ONE cached thumbnail, and the pin grid
   * copies it into slot 2 and then slot 3: keyed by source, slot 3's record
   * replaced slot 2's, so when the art landed only slot 3 replayed and the
   * first ticket stayed blank for good.
   */
  private readonly sourceDeps = new Map<
    string,
    { source: LingoImage; rest: LingoValue[]; seen: number; hadRaster: boolean }
  >();

  /** Identity for `sourceDeps` keys. */
  private static nextUid = 1;
  readonly uid = LingoImage.nextUid++;

  /**
   * Re-run any copy whose source has changed since it was made.
   *
   * ⚠ THIS IS WHAT MAKES PARTIALLY-COMPOSED ART FINISH ITSELF.
   *
   * `copyPixels` only queues a `whenSourceReady` replay when the source has NO
   * pixels at all. Once the FIRST piece of a multi-part image lands, the source
   * has a raster, so the copy into the element buffer succeeds and queues
   * nothing — and the pieces that arrive afterwards update the source while the
   * buffer keeps the partial result forever.
   *
   * That is exactly how `GET MORE NAMES` stayed white: its three button slices
   * downloaded at different times, and the buffer captured whatever existed at
   * `prepare`. Rebuilding by hand produced the correct 125x19 teal image, which
   * is how we know the composition logic was never wrong — only its timing.
   *
   * Re-entrancy is blocked with a flag rather than a depth counter: a refresh
   * re-runs `copyPixels`, which would otherwise try to refresh again.
   */
  private refreshing = false;

  /** The original a copy-on-write seeded from while its art was in flight. See `raster()`. */
  private pendingSeed: LingoImage | undefined;

  /**
   * Is this image still missing art it is going to get? True for cast art not
   * yet fetched, a duplicate reading through such art, or a buffer composed
   * by copying from one.
   */
  awaitingArt(seen: Set<LingoImage> = new Set()): boolean {
    if (seen.has(this)) return false;
    seen.add(this);
    if (this.pendingSeed) return true;
    if (!this.ownSource && this.copiedFrom) return this.copiedFrom.awaitingArt(seen);
    if (this.ownSource === null && this.needSource !== undefined) return true;
    // Recurse rather than trust `hadRaster`: a scratch buffer that is never
    // drawn has no raster and never will, and must not hold a seed back forever.
    for (const { source } of this.sourceDeps.values()) {
      if (source.awaitingArt(seen)) return true;
    }
    return false;
  }

  /**
   * How a DERIVED image (currently a crop) tracks the image it came from. See
   * `trimWhiteSpace` — `sourceDeps` cannot express this, because replaying a
   * dependency re-runs a COPY and a crop is a different operation.
   */
  recomputeFrom: { source: LingoImage; seen: number; run: () => void } | undefined;

  /**
   * `setAlpha` calls that were skipped because THIS mask was still empty —
   * re-run the next time something composites into it. See `setAlpha`.
   */
  alphaWaiters: Array<() => void> | undefined;

  refreshFromSources(): void {
    if (this.refreshing) return;

    /**
     * ⚠ A DUPLICATE THAT STILL READS THROUGH ITS ORIGINAL SETTLES THE ORIGINAL.
     *
     * A duplicate has no `sourceDeps` of its own, so without this hop the
     * refresh stopped dead at every `duplicate()` in a chain. The avatar
     * profile's lanyard is two duplicates deep: grid buffer <- `_PinsRenderedCbk`
     * duplicate <- `_FetchPinThumbnail` duplicate <- cached 38x38 thumb <- pin
     * art. The cached thumb was never told its art had landed, so pins whose
     * art was still downloading stayed blank in the open profile (only the
     * already-loaded pin drew) until it was closed and reopened.
     */
    if (!this.ownSource && this.copiedFrom) {
      this.refreshing = true;
      try {
        this.copiedFrom.refreshFromSources();
      } finally {
        this.refreshing = false;
      }
    }

    // Copy-on-write happened while the original was still waiting on its art —
    // see `pendingSeed`. Lay it under our own writes once it has arrived.
    if (this.pendingSeed && this.context2d) {
      const seed = this.pendingSeed;
      this.refreshing = true;
      try {
        seed.refreshFromSources();
      } finally {
        this.refreshing = false;
      }
      const art = seed.source;
      if (art && !seed.awaitingArt()) {
        this.pendingSeed = undefined;
        const ctx = this.context2d;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        try {
          ctx.drawImage(art as CanvasImageSource, 0, 0);
        } catch {
          // Off-DOM: nothing to draw.
        }
        ctx.restore();
        this.revision++;
      }
    }

    // A derived image refreshes even with no copy dependencies of its own.
    if (this.recomputeFrom) {
      const derived = this.recomputeFrom;
      this.refreshing = true;
      try {
        derived.source.refreshFromSources();
        /**
         * ⚠ `revision`, NOT `chainRevision`. Widening this to the chain WAS
         * TRIED, to make the cached `extractAlpha` results recompute once their
         * art arrived (a duplicate never bumps its own revision, so they never
         * did). It works — and it turns the avatar's alpha pass ON, which is
         * WRONG in a way that is now measured twice: the clothing thumbnails
         * render as BLACK BOXES and the hair loses its colour.
         *
         * The mask `getPartAlpha` builds is still not right, so do not re-widen
         * this until that is understood. See `extractAlpha` / `setAlpha`.
         */
        // `chainRevision`, not `revision` — the cache holds a `duplicate()`,
        // which keeps its pixels up the `copiedFrom` chain and never bumps its
        // own revision, so a derived alpha would otherwise never recompute.
        /**
         * ⚠ `chainRevision`, NOT `revision` — a DUPLICATE never bumps its own.
         *
         * `AddCastContentsToImageCache` caches `extractAlpha(duplicate(
         * member.image))`, and a duplicate keeps its pixels up the `copiedFrom`
         * chain. Comparing the duplicate's own revision therefore never fired,
         * and no cached alpha ever recomputed once its art arrived — measured at
         * 0 of 3,748.
         */
        if (derived.source.chainRevision !== derived.seen) {
          derived.seen = derived.source.chainRevision;
          derived.run();
        }
      } finally {
        this.refreshing = false;
      }
    }

    if (this.sourceDeps.size === 0) return;
    this.refreshing = true;
    try {
      for (const { source } of [...this.sourceDeps.values()]) {
        /**
         * ⚠ SETTLE THE SOURCE **BEFORE** COMPARING REVISIONS.
         *
         * This call used to sit AFTER the `continue` below, which meant a source
         * that had not changed *itself* was skipped without ever being asked
         * whether ITS sources had changed. Staleness then could not travel up a
         * chain more than one link long, and every composition VMK builds is a
         * chain.
         *
         * MEASURED on the registration avatar, which is three links deep —
         * element <- t_PrewImg <- t_HumanImg <- 16 body parts:
         *
         *     t_HumanImg   revision 33   (fill + 32 part copies, art had landed)
         *     t_PrewImg    revision  1   dep on t_HumanImg recorded seen: 17
         *     element      revision  7   dep on t_PrewImg  recorded seen:  1
         *
         * The element compared `t_PrewImg.revision === 1` against `seen: 1`,
         * skipped it, and never recursed — so the 16 body parts that arrived
         * afterwards sat in `t_HumanImg` and never reached the screen. The
         * preview stayed the flat orange that `updateFigurePreview` fills before
         * compositing, which is why the avatar was invisible while every part
         * was present, correctly sized and correctly positioned.
         *
         * Settling first lets the source bump its own revision, so the
         * comparison below sees the change that actually happened.
         */
        source.refreshFromSources();
      }

      /**
       * ⚠ IF ANYTHING IS STALE, REDO **EVERY** COPY IN ORIGINAL ORDER.
       *
       * Re-copying only the changed dependency loses Z-ORDER. `sourceDeps` is
       * insertion-ordered and that order IS the stacking order VMK composed in,
       * so stamping one layer again puts it on top of everything that was
       * originally drawn after it.
       *
       * MEASURED effect on the avatar: `getPartImg` composes strictly
       * leg -> shoe -> trousers per side ("llg", "lsh", "lpn", …), so a shoe
       * must cover the foot. Body-part art arrives asynchronously and in no
       * particular order, so whenever a LEG's PNG landed after its SHOE's, the
       * leg was re-stamped over the shoe — a bare foot drawn on top of the boot.
       * The same reordering explains parts appearing over others generally when
       * clicking through the customise arrows, which rebuilds the figure while
       * art is still settling.
       *
       * Redoing the whole list is cheap — these are a handful of small blits —
       * and it is the only thing that restores the authored order, because the
       * arrival order carries no information about it.
       */
      /**
       * ⚠ A SOURCE THAT HAS GAINED PIXELS IS STALE EVEN IF ITS REVISION DID NOT
       * MOVE — see the `hadRaster` note in `copyPixels`. Copying an empty part
       * and copying a loaded one are indistinguishable by revision, so without
       * this a figure composed while its art was still downloading stays wrong
       * for good.
       *
       * This can only ADD refreshes, never remove them: it fires exactly once
       * per dependency, on the transition from no raster to raster, and the
       * replay re-records `hadRaster` as true.
       */
      /**
       * ⚠ A SOURCE THAT HAS GAINED PIXELS IS STALE EVEN IF ITS REVISION DID NOT
       * MOVE — see the `hadRaster` note in `copyPixels`. Copying an empty part
       * and copying a loaded one are indistinguishable by revision, so without
       * this a figure composed while its art was still downloading stays wrong
       * for good.
       *
       * OBSERVED: with this in place a mis-stacked figure (shoe over trousers)
       * CORRECTS ITSELF once the late art lands, where before it stayed wrong.
       * The replay redoes every copy in insertion order, which is the authored
       * z-order — see the note below.
       *
       * This can only ADD refreshes, never remove them: it fires exactly once
       * per dependency, on the transition from no raster to raster, and the
       * replay re-records `hadRaster` as true.
       */
      const stale = [...this.sourceDeps.values()].some(
        (dep) =>
          dep.source.chainRevision !== dep.seen || (!dep.hadRaster && dep.source.hasRaster),
      );
      if (stale) {
        for (const dep of [...this.sourceDeps.values()]) {
          this.copyPixels(dep.source, ...dep.rest);
        }
      }
    } finally {
      this.refreshing = false;
    }
  }

  copyPixels(source: LingoValue, ...rest: LingoValue[]): LingoValue {
    this.revision++;
    if (!(source instanceof LingoImage)) return VOID;

    /**
     * ⚠ A COPY IS A REQUEST FOR THE SOURCE'S ART. `copyPixels` reads pixels that
     * exist NOW, and a cast member loaded on demand only fetches its bytes once
     * something asks. Art used SOLELY inside a composite — a furniture thumbnail's
     * GFX blocks, for one — is asked by nothing else, so the copy read a blank
     * buffer; where the result is then cropped and cached (the thumbnail path),
     * the blank was locked in and the tile came out black. Asking here starts that
     * fetch, and if the art is already resident (an item cast is made resident on
     * download) it fills SYNCHRONOUSLY, so this very copy blits real pixels.
     *
     * A no-op on a buffer with nothing to fetch — a runtime-allocated element has
     * no `needSource` — and idempotent (`requested` guards re-entry), so it only
     * ever starts a fetch that had to happen for the copy to mean anything.
     */
    source.requestSource();

    /**
     * ⚠ SETTLE A DERIVED SOURCE FIRST. An `extractAlpha` result is computed from
     * an image whose art may not have arrived when it was created, so it has to
     * be given the chance to catch up before it is blitted — otherwise the copy
     * silently deposits nothing. Cheap: only images that ARE derived carry
     * `recomputeFrom`, and the refresh is guarded against re-entry.
     */
    if (source.recomputeFrom) source.refreshFromSources();
    /**
     * Remember where this came from, so a later change to it can be picked up.
     *
     * ⚠ `hadRaster` RECORDS WHETHER THERE WERE ACTUALLY PIXELS TO COPY, because
     * the revision alone cannot distinguish "copied an EMPTY source" from
     * "copied a ready one".
     *
     * Cast art is fetched on demand, so a composition routinely runs against
     * parts whose PNG is still in flight. When such a part's raster lands, its
     * revision may already hold the value the copy recorded — the bump happened
     * when the source was armed, not when the bytes arrived — so `seen` matches
     * `chainRevision` forever and the copy is never replayed.
     *
     * MEASURED on the avatar, captured at the moment of a bad first draw: the
     * whole chain reported not-stale — element <- t_PrewImg <- t_HumanImg <- 17
     * parts, every part `seen: 1` against `chainRevision: 1` and every part
     * holding a raster — while the figure on screen was 68px wrong against a
     * clean recompose. Nothing was stale because nothing had changed SINCE the
     * copy; the copy simply happened too early.
     *
     * That is the "an item renders improper on first draw" report, and why it
     * got worse once the avatar catalogue went from 6 sets to 75: far more first
     * draws now hit art that has never been fetched.
     */
    const destBox = asRect(rest[0]);
    const destKey = destBox
      ? `${destBox.left},${destBox.top},${destBox.right},${destBox.bottom}`
      : String(rest[0]);
    this.sourceDeps.set(`${source.uid}|${destKey}`, {
      source,
      rest,
      seen: source.chainRevision,
      hadRaster: source.hasRaster,
    });

    /**
     * The real blit, when there is real art to blit.
     *
     * ⚠ VMK composes a window element by ALLOCATING a buffer (`image(w,h,d)`)
     * and copying cast art into it — the element's member has no `imagePath` of
     * its own, so the compositor has nothing to draw unless the copy actually
     * happens. Recording the source's fill colour was enough while every member
     * was a flat panel; with cast bitmaps loading it produced correctly sized,
     * correctly placed WHITE rectangles where the art should be.
     *
     * `destRect`/`sourceRect` are Director rects; a missing one means the whole
     * image, which is what `copyPixels(img, img.rect, img.rect)` amounts to.
     */
    const drawable = source.source;
    if (drawable === null || drawable === undefined) {
      /**
       * Art still in flight — replay this exact copy when it lands.
       *
       * ⚠ BUT ONLY IF THIS BUFFER HAS NOT MOVED ON. Replays fire in ART-ARRIVAL
       * order, which is not the order they were queued in, so a late image from
       * an ABANDONED state would land on top of the current one.
       *
       * That is what showed the wrong guest room on registration page 1: each
       * `ChangeRoomSelection` calls `feedImage`, which fills the element and
       * copies the new preview in. Cycling 17 -> 53 -> 54 -> 67 queued a replay
       * per room, and whichever PNG arrived last won. MEASURED with 67
       * ("Splash Mountain Bayou") selected: the caption read correctly while the
       * element showed room 54's teal pixels (39,127,129) instead of 67's brown
       * (53,41,25).
       *
       * ⚠ Keyed on `clearRevision`, NOT `revision`. An earlier version used
       * `revision` — every write — which also cancelled the perfectly valid
       * replays that build a nine-slice button, since that is three or four
       * `copyPixels` into one buffer. The button then never drew at all
       * (`pImage.hasSource === false` with `revision === 4`). Only a FILL means
       * the buffer was cleared and the queued work abandoned, and `feedImage`
       * fills before every new image, so the room case is still caught.
       */
      const queuedAt = this.clearRevision;
      source.whenSourceReady(() => {
        if (this.clearRevision !== queuedAt) return;
        this.copyPixels(source, ...rest);
      });
    }
    if (drawable !== null && drawable !== undefined) {
      /**
       * ⚠ AN 8-BIT DESTINATION IS COMPOSITED AS LEVELS, NOT THROUGH A CANVAS.
       * See `levels`. Canvas would blend through an alpha channel Director's
       * 8-bit images do not have, which is what made every mask wrong.
       */
      if (this.levels) {
        this.copyIntoLevels(source, rest);
        return VOID;
      }
      const context = this.raster();
      if (context) {
        // A quad destination carries the same bounds plus the axis flips — see
        // `asQuad`. Checked FIRST because a quad is a list, which `asRect`
        // silently rejects.
        const quad = asQuad(rest[0]);
        let dest = quad ?? asRect(rest[0]) ??
          { left: 0, top: 0, right: this.width, bottom: this.height };
        // Whole pixels, like Director — and like `copyIntoLevels`, so a colour
        // copy and its mask copy with the same rect land on the same pixels.
        dest = {
          ...dest,
          left: Math.round(dest.left), top: Math.round(dest.top),
          right: Math.round(dest.right), bottom: Math.round(dest.bottom),
        };
        const asked = asRect(rest[1]) ?? { left: 0, top: 0, right: source.width, bottom: source.height };

        /**
         * ⚠ A SOURCE RECT LARGER THAN THE SOURCE — clamp it, and CENTRE what is
         * left in the destination.
         *
         * `CWindowImageWrapper.render` always asks for a `pOwnW x pOwnH` window
         * of `pImage` at `pOffX/pOffY`, and those offsets are 0 until something
         * SCROLLS. When the image fed in is smaller than the element — which is
         * every registration slot thumbnail, since `updatePartPreview` trims the
         * part down first — the requested window runs off the edge of the image.
         *
         * MEASURED: `part.ch.preview` is a 36x36 element fed a 23x36 trim, and
         * the art sat at x 0..22 with 13px of empty tile to its right.
         *
         * ⚠ THE CENTRING IS A DELIBERATE DEVIATION. VMK never centres: `pOffX`
         * and `pOffY` start at 0 and only `adjustOffsetBy`/`adjustOffsetTo` (the
         * scroll path) ever move them, so the shipped code genuinely draws these
         * top-left. Centring is what matches the original client visually, and
         * it is scoped to the over-sized-window case so an exact-fit blit — the
         * button slices, the avatar composite, every ordinary copy — is
         * untouched.
         */
        const from = {
          left: Math.max(asked.left, 0),
          top: Math.max(asked.top, 0),
          right: Math.min(asked.right, source.width),
          bottom: Math.min(asked.bottom, source.height),
        };
        const askedW = Math.max(asked.right - asked.left, 0);
        const askedH = Math.max(asked.bottom - asked.top, 0);

        const sw = Math.max(from.right - from.left, 0);
        const sh = Math.max(from.bottom - from.top, 0);
        let dw = Math.max(dest.right - dest.left, 0);
        let dh = Math.max(dest.bottom - dest.top, 0);

        // Only when the window really was cut down, and the blit is 1:1 (so
        // this cannot disturb a deliberate scale).
        //
        // ⚠ HORIZONTAL ONLY. The case measured above is a narrow image (23 of
        // 36 wide). Centring vertically too broke the advanced-mode room list:
        // `CAdvancedNavItemList` builds one short image (16 px for one
        // instance) and the 94-px element shows it through this same
        // over-sized window. Director draws it at the TOP (the original shows
        // the "North" row there); centring dropped the bar to y 39, while the
        // name's text run correctly stayed at y 4, splitting the row apart.
        // Vertically the copy is Director's 1:1 again: the top rows of
        // the window hold the image, and the rest has nothing to copy.
        if ((sw !== askedW || sh !== askedH) && dw === askedW && dh === askedH) {
          dest = { ...dest, left: dest.left + oversizeCentreX(source.width, rest) };
          dw = sw;
          dh = sh;
        }
        if (sw > 0 && sh > 0 && dw > 0 && dh > 0) {
          try {
            const params = copyParams(rest[2]);
            context.save();
            if (params.blend !== undefined) context.globalAlpha = params.blend;
            /**
             * `#smooth` on a genuinely scaled blit → bilinear resample, matching
             * Director's non-fast-quads default (see copyParams). Contexts are
             * born `crisp()` (nearest), so this opts just this draw back into
             * smoothing; save/restore around it keeps it from leaking. A 1:1 blit
             * is left crisp. Used by the avatar's perspective downscale.
             */
            if (params.smooth && (sw !== dw || sh !== dh)) {
              context.imageSmoothingEnabled = true;
              (context as unknown as { imageSmoothingQuality?: string }).imageSmoothingQuality = "high";
            }

            /**
             * ⚠ NO SMOOTHING, EVEN WHEN THE BLIT RESCALES — `#useFastQuads`.
             *
             * VMK passes `#useFastQuads: 1` on exactly the blits that resize,
             * including the avatar's own downscale in `CAvatarRenderer.update`
             * (`t_iRatio = float(m_iTileSize) / 32.0`, so a 24-tile room copies
             * the 80x160 figure into `rect(10, 40, 70, 160)`). "Fast quads" IS
             * the no-interpolation path, so a scaled copy stays nearest.
             *
             * ⚠ TRIED AND REVERTED: smoothing scaled blits only
             * (`imageSmoothingEnabled = dw !== sw || dh !== sh`), on the theory
             * that nearest-neighbour on a 0.75 downscale was discarding the
             * anti-aliased silhouette. A screenshot of the REAL client at this
             * size settles it — its avatar has hard pixel edges, not softened
             * ones. The contexts stay `crisp()` for scaled and 1:1 alike.
             */

            /**
             * Mirror in place for a flipped quad destination.
             *
             * Reflecting about the destination rect's own centre line means the
             * draw calls below stay in unflipped coordinates — translate by the
             * two edges summed, then scale by -1, and a blit at `left` lands at
             * `right` growing back toward `left`.
             */
            if (quad && (quad.flipX || quad.flipY)) {
              if (quad.flipX) {
                context.translate(dest.left + dest.right, 0);
                context.scale(-1, 1);
              }
              if (quad.flipY) {
                context.translate(0, dest.top + dest.bottom);
                context.scale(1, -1);
              }
            }

            /**
             * DARKEN (ink 41) — tint the source by `bgColor`, keeping its alpha.
             *
             * This is the avatar's whole colour scheme: every body part and
             * garment is drawn through it (`CBodypartClass.defineInk` defaults
             * to 41), so without it an avatar renders in the artwork's flat grey
             * no matter what the player picks.
             *
             * Multiply is applied on an ISOLATED scratch copy for the same
             * reason the `#color` branch below uses one — compositing straight
             * onto the destination would recolour everything already under the
             * blit rect, and these parts are stacked into one shared canvas.
             *
             * `destination-in` at the end restores the source's own alpha, which
             * the `fillRect` would otherwise have made fully opaque — that would
             * paint a solid rectangle around every limb.
             *
             * White is skipped as a no-op: it is the identity of a multiply, and
             * VMK uses it to mean "leave this part alone".
             */
            const darkenTint =
              params.ink === INK_DARKEN && params.bgColor !== undefined &&
                params.bgColor !== "rgb(255,255,255)"
                ? params.bgColor
                : undefined;

            if (darkenTint !== undefined) {
              const scratch = createRaster(sw, sh);
              if (scratch) {
                /**
                 * ⚠ TINT THE RECOVERED COLOUR WHERE WE HAVE IT — see
                 * `opaqueSource`. The ordinary drawable has already been through
                 * a canvas, so every transparent pixel's RGB is gone; for body
                 * parts that is precisely where the facial features live.
                 */
                const colourSource = (source.opaqueSource ?? drawable) as CanvasImageSource;
                scratch.context.drawImage(
                  colourSource,
                  from.left, from.top, sw, sh,
                  0, 0, sw, sh,
                );
                scratch.context.globalCompositeOperation = "multiply";
                scratch.context.fillStyle = darkenTint;
                scratch.context.fillRect(0, 0, sw, sh);
                /**
                 * ⚠ THE COLOUR PASS IS MASKED BY THE SOURCE'S OWN ALPHA. Do not
                 * remove this again — it was tried, and MEASURED to be wrong.
                 *
                 * The theory for removing it was that body parts carry
                 * `useAlpha: 0`, so Director would draw their colour ignoring
                 * alpha and let `setAlpha` supply the shape. TWO THINGS KILL IT:
                 *
                 *  1. NOTHING SETS `useAlpha` ON A BODY PART. No Lingo does
                 *     (only thumbnails, backgrounds and `CScale9Grid`), and our
                 *     extraction records only path/width/height, so the flag was
                 *     never observed — it was assumed.
                 *
                 *  2. WITHOUT THE MASK EVERY PART PAINTS ITS FULL BOUNDING RECT.
                 *     Captured per blit, changed-pixels vs rect area:
                 *
                 *         tr  714/714   hd 1184/1184   fc 160/160   hr 1558/1558
                 *
                 *     i.e. the hair's 38x41 rect paints over the head and face,
                 *     the head's over the torso. The figure becomes a stack of
                 *     opaque rectangles that only `setAlpha` rescues into an
                 *     outline, which is the blocky avatar that regression showed.
                 *
                 * `std_hd_1_3_0` is the positive proof that alpha IS respected
                 * here: it is a clean head silhouette (771px at alpha 255, 246 at
                 * 0, anti-aliased between) whose INTERIOR is near-white, authored
                 * to be tinted by the skin colour. Ignoring its alpha would paint
                 * a 31x36 block.
                 *
                 * Matches the reference — LibreShockwave `Drawing::applyInk`:
                 *     if (ink == LIGHTEN || ink == DARKEN)
                 *         return srcAlpha == 0 ? dest : alphaBlend(...);
                 */
                scratch.context.globalCompositeOperation = "destination-in";
                scratch.context.drawImage(
                  drawable as CanvasImageSource,
                  from.left, from.top, sw, sh,
                  0, 0, sw, sh,
                );
                boostDarkenAlpha(scratch.context, sw, sh);
                /**
                 * ⚠ THE COLOUR PASS COMPOSITES AT FULL STRENGTH — the SECOND
                 * pass supplies the silhouette.
                 *
                 * This is why every body part carries `useAlpha: 0`:
                 * `getPartImg` builds colour, `getPartAlpha` builds alpha, and
                 * `setAlpha` joins them. Blending colour by each part's own
                 * alpha as well applies it TWICE, and erases anything faint —
                 * the face tiles' detail sits at alpha 48, so it vanished.
                 *
                 * ⚠ ONLY SAFE NOW THAT `setAlpha` IS REAL. Tried early on
                 * (`DARKEN_ALPHA_BOOST`) it erased the figure outright, because
                 * the part's own alpha was the ONLY thing giving the avatar a
                 * silhouette. With the level-plane alpha pass live, it is not.
                 */
                // ⚠ TRIED AND REVERTED: `hardenAlpha(scratch.context, sw, sh)`.
                // The reasoning above is sound, but the visible result is a
                // CHUNKY, aliased figure — the part's own alpha is still what
                // gives our avatar its soft edges, because `getPartAlpha`'s mask
                // is not yet reproducing them. Restore the colour pass to full
                // strength only once the alpha pass demonstrably carries the
                // anti-aliased silhouette itself.
                context.drawImage(
                  scratch.canvas as CanvasImageSource,
                  0, 0, sw, sh,
                  dest.left, dest.top, dw, dh,
                );
              } else {
                context.drawImage(
                  drawable as CanvasImageSource,
                  from.left, from.top, sw, sh,
                  dest.left, dest.top, dw, dh,
                );
              }
            } else if (params.ink === 33 || params.ink === 34) {
              /**
               * ⚠ ADD PIN (33) / ADD (34) — ADDITIVE, NOT A COPY.
               *
               * Unimplemented, these fell through to a plain blit and painted an
               * OPAQUE RECTANGLE where the original shows a glow.
               *
               * `NavigatorInterface_Class.eventProcNavigator` highlights a land
               * by taking its `<land>.active` element, setting
               *
               *     the ink of <sprite> = 33
               *
               * and showing it — so every land label on the park map came back
               * from a tab switch as a solid colour block (dark green, purple,
               * orange…), which is what "the land highlights are bugged" was.
               * The same ink drives the room's light and snowfall overlays.
               *
               * Canvas `lighter` adds and CLAMPS at 255, which IS Add Pin. Plain
               * Add's wraparound has no canvas equivalent and does not appear in
               * VMK's art, so both map here rather than leaving 34 broken.
               *
               * save/restore for the same reason as DARKEST below: the composite
               * mode must not leak into the next blit into this buffer.
               */
              context.save();
              context.globalCompositeOperation = "lighter";
              context.drawImage(
                drawable as CanvasImageSource,
                from.left, from.top, sw, sh,
                dest.left, dest.top, dw, dh,
              );
              context.restore();
            } else if (params.ink === INK_DARKEST) {
              // Per-channel minimum — see `INK_DARKEST`. Isolated with
              // save/restore so the composite mode cannot leak into the next
              // blit into this same buffer.
              context.save();
              context.globalCompositeOperation = "darken";
              context.drawImage(
                drawable as CanvasImageSource,
                from.left, from.top, sw, sh,
                dest.left, dest.top, dw, dh,
              );
              context.restore();
            } else if (params.ink === INK_BACKGROUND_TRANSPARENT && !source.isTextRender) {
              /**
               * BACKGROUND TRANSPARENT (ink 36) — key the source's background
               * colour (white by default for window buffers; `#bgColor`
               * overrides) to transparent so the destination shows through.
               * Ported from Director/DirPlayer `copy_pixels` ink 36: a source
               * pixel equal to the resolved background colour is skipped, every
               * other pixel copies through.
               *
               * ⚠ NOT FOR TEXT RENDERS. A rendered text member already carries
               * its glyphs on a transparent background (the text renderer keys
               * the member's own bgColor), so it composites correctly with a
               * plain source-over draw — and its glyphs are frequently WHITE.
               * `CWindowCommonButton.createButtonImg` composes a button's label
               * (the "?" on a help button included) with `copyPixels(tTextImg,
               * …, [#ink: 36])`; keying white here ERASED the white glyph, which
               * is why composed help "?" buttons rendered hollow. The exclusion
               * keeps this to opaque bitmap pieces (the title-band caps this
               * branch was added for), which is where an unkeyed white must drop
               * out. Text falls through to the plain draw below.
               *
               * ⚠ THE IMAGE-TO-IMAGE PATH, which had no ink-36 handling and fell
               * through to a plain opaque draw. VMK composes a window background
               * by copyPixels-ing each `#type: "piece"` into one buffer with the
               * piece's declared ink; the rounded title-band caps
               * (`field.h.left`/`field.h.right`, ink 36) carry WHITE in their
               * corner triangles that must drop out to reveal the frame behind.
               * Copied opaque, they left a 2px white seam at every panel's
               * title-bar corners. `prepareInk` already keys ink 36 for the
               * SPRITE draw; this is the same rule for the copy path.
               *
               * ⚠ EXACT match (tolerance 0), like `prepareInk` and
               * LibreShockwave `applyBackgroundTransparent`, so a near-white
               * glyph or antialias edge is NOT eaten — only the true background.
               */
              const scratch = createRaster(sw, sh);
              if (scratch) {
                scratch.context.drawImage(
                  drawable as CanvasImageSource,
                  from.left, from.top, sw, sh,
                  0, 0, sw, sh,
                );
                /**
                 * ⚠ A `#color` PIECE UNDER INK 36 IS A COLORIZED FILL — tint it
                 * BEFORE the key, or a grayscale stencil stays its own colour and
                 * the white key removes nothing.
                 *
                 * VMK paints its flat panels this way: a 1x1 `shadow.pixel`
                 * (black, depth 8) stretched to the panel size and coloured by the
                 * piece's `#color`, drawn with the piece's ink. The "Call For Help"
                 * body (`vmk_hlp_askmods.window`'s back panel:
                 * `shadow.pixel … #ink 36 #color "#275692"`) rendered OPAQUE BLACK
                 * because this branch keyed white on the untinted black pixel —
                 * nothing matched, so the black filled the whole panel and buried
                 * the blue window frame behind it.
                 *
                 * Same `source.isGrayscale` gate as the copy-ink `#color` branch
                 * below (and `#bgColor` above): colour art is left verbatim, so the
                 * register / avatar-builder icons are untouched. Pieces with no
                 * `#color` (the title-band caps, `field.h.*`) skip this and key
                 * white as before. source-in keeps the source's own alpha, so a
                 * stencil with transparent regions stays transparent.
                 */
                if (params.color !== undefined && source.isGrayscale) {
                  scratch.context.globalCompositeOperation = "source-in";
                  scratch.context.fillStyle = params.color;
                  scratch.context.fillRect(0, 0, sw, sh);
                  scratch.context.globalCompositeOperation = "source-over";
                }
                const key = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(params.bgColor ?? "rgb(255,255,255)");
                const kr = key ? Number(key[1]) : 255;
                const kg = key ? Number(key[2]) : 255;
                const kb = key ? Number(key[3]) : 255;
                const frame = scratch.context.getImageData(0, 0, sw, sh);
                const px = frame.data;
                let soft = false;
                for (let i = 0; i < px.length; i += 4) {
                  if (px[i] === kr && px[i + 1] === kg && px[i + 2] === kb && px[i + 3] === 255) {
                    px[i + 3] = 0;
                  } else if (px[i + 3] > 0 && px[i + 3] < 255) {
                    soft = true;
                  }
                }
                let root: LingoImage = source;
                while (root.copiedFrom) root = root.copiedFrom;
                const castArt = root.needSource !== undefined && root.textRuns.length === 0;
                const dx = Math.round(dest.left);
                const dy = Math.round(dest.top);
                if (soft && castArt && dw === sw && dh === sh && dx >= 0 && dy >= 0 && dx + sw <= this.width && dy + sh <= this.height) {
                  const under = context.getImageData(dx, dy, sw, sh);
                  const out = under.data;
                  for (let i = 0; i < px.length; i += 4) {
                    const a = px[i + 3];
                    if (a === 0) continue;
                    const backing = out[i] === kr && out[i + 1] === kg && out[i + 2] === kb && out[i + 3] === 255;
                    if (backing) {
                      if (a < 128) continue;
                      out[i] = px[i];
                      out[i + 1] = px[i + 1];
                      out[i + 2] = px[i + 2];
                      out[i + 3] = 255;
                      continue;
                    }
                    const f = a / 255;
                    const da = out[i + 3] / 255;
                    const oa = f + da * (1 - f);
                    out[i] = Math.round((px[i] * f + out[i] * da * (1 - f)) / oa);
                    out[i + 1] = Math.round((px[i + 1] * f + out[i + 1] * da * (1 - f)) / oa);
                    out[i + 2] = Math.round((px[i + 2] * f + out[i + 2] * da * (1 - f)) / oa);
                    out[i + 3] = Math.round(oa * 255);
                  }
                  context.putImageData(under, dx, dy);
                } else {
                  scratch.context.putImageData(frame, 0, 0);
                  context.drawImage(
                    scratch.canvas as CanvasImageSource,
                    0, 0, sw, sh,
                    dest.left, dest.top, dw, dh,
                  );
                }
              } else {
                context.drawImage(
                  drawable as CanvasImageSource,
                  from.left, from.top, sw, sh,
                  dest.left, dest.top, dw, dh,
                );
              }
            } else if (
              /**
               * COPY-INK `#bgColor` COLORIZE — scoped to GRAYSCALE stencils.
               *
               * Director remaps a 32-bit source along `lerp(black -> bgColor,
               * gray/255)` under copy ink with a back colour (DirPlayer's
               * `allows_colorize`/`uses_back_color` for depth 32, ink 0) — white
               * becomes bgColor. That is exactly what tints the white avatar arrow
               * (`avatar.arrow.32.inside`) to the shirt colour.
               *
               * ⚠ SCOPED TO `source.isGrayscale`. An EARLIER unscoped version of
               * this branch also tinted full-colour window IMAGE elements — the
               * avatar-builder / register clothing icons (`feedImage` into a slot
               * whose `#bgColor` is the panel colour) — toward the panel colour
               * (MEASURED: a red 200,40,40 icon came out 200,27,0 orange), because
               * those are drawn with the same copy ink + `#bgColor`. The reference
               * only colorizes grayscale/1-bit stencils this way; on full-colour
               * art the bgColor merely FILLS the slot background. Gating on
               * `isGrayscale` (memoised, one getImageData per source) keeps the
               * arrow/chat-bubble stencils tinting while colour icons fall through
               * to the plain copy below untouched. See
               * [[avatar-arrow-two-render-gaps]].
               */
              params.bgColor !== undefined && params.color === undefined &&
              (params.ink ?? 0) === 0 && source.depth === 32 && source.isGrayscale
            ) {
              const scratch = createRaster(sw, sh);
              if (scratch) {
                // Draw the source, multiply the bgColor fill over it (black stays
                // black, white -> bgColor, grays ramp between), then re-mask by the
                // source's own alpha so transparent pixels stay transparent.
                scratch.context.drawImage(
                  drawable as CanvasImageSource,
                  from.left, from.top, sw, sh,
                  0, 0, sw, sh,
                );
                scratch.context.save();
                scratch.context.globalCompositeOperation = "multiply";
                scratch.context.fillStyle = params.bgColor;
                scratch.context.fillRect(0, 0, sw, sh);
                scratch.context.globalCompositeOperation = "destination-in";
                scratch.context.drawImage(
                  drawable as CanvasImageSource,
                  from.left, from.top, sw, sh,
                  0, 0, sw, sh,
                );
                scratch.context.restore();
                context.drawImage(
                  scratch.canvas as CanvasImageSource,
                  0, 0, sw, sh,
                  dest.left, dest.top, dw, dh,
                );
              } else {
                context.drawImage(
                  drawable as CanvasImageSource,
                  from.left, from.top, sw, sh,
                  dest.left, dest.top, dw, dh,
                );
              }
            } else if (
              params.color === undefined && (params.ink ?? 0) === 0 &&
              /**
               * ⚠ NOT WITH A BLEND. `#blend`/`#blendLevel` MIX the source over
               * what is there; a replace at partial alpha instead punches the
               * destination semi-transparent. `CMessengerIconPulser` cross-fades
               * the pressed icon over the normal one this way, and the replace
               * made the chat-bar icon blink out to see-through instead.
               */
              params.blend === undefined &&
              /**
               * ⚠ DIRECTOR'S COPY IS A THREE-WAY DECISION ON THE ALPHA FLAGS,
               * not an unconditional replace. Ported from DirPlayer's
               * `copy_pixels_with_params` (vm-rust/src/player/bitmap/drawing.rs),
               * 32-bit source under ink 0:
               *
               *     if !src.use_alpha                    -> sa = 255, opaque replace
               *     else if dst is 32-bit && dst.use_alpha -> verbatim RGBA;
               *                                             transparent src ERASES
               *     else                                 -> normal alpha blend
               *
               * Both of the first two are a replace; only the third composites.
               *
               * ⚠ THIS REPLACES TWO EARLIER PATCHES. The first was an
               * unconditional `"copy"` for ink 0, added because
               * `updateFigurePreview` came out as a white box; the second was a
               * `revision`/`clearRevision` "is the destination pristine" test I
               * added to stop the avatar's loading spinner being erased. Both
               * were heuristics standing in for this rule.
               *
               * ⚠ THE REAL DIVERGENCE IS UPSTREAM AND IS STILL OPEN: Director
               * allocates a fresh 32-bit image as OPAQUE WHITE (DirPlayer's
               * `Bitmap::new`: `initial_color = 255` for 16|32) while ours has no
               * source at all until something writes to it. The white box was a
               * symptom of that, and the unconditional copy hid it. With an
               * empty fresh buffer the blend branch yields the same silhouette,
               * so this rule is correct for us either way — but if fresh 32-bit
               * images are ever made opaque white to match Director, the
               * preview will rely on its SPRITE ink (36, background
               * transparent) to knock the white out, exactly as Director does.
               *
               * ⚠ LibreShockwave's `applyInk` warns that changing Copy there
               * breaks SPRITE compositing. That does not apply here: this is
               * `copyPixels`, image-to-image only; sprite ink lives in
               * lingo-stage. This is the "separate image-to-image path" that
               * comment asks for.
               */
              (!source.useAlpha || (this.depth === 32 && Boolean(this.useAlpha)))
            ) {
              /**
               * ⚠ DIRECTOR'S COPY INK REPLACES THE DESTINATION — ALPHA INCLUDED.
               *
               * A plain `drawImage` is source-OVER, which leaves the destination
               * showing wherever the source is transparent. That silently threw
               * away `setAlpha`'s work in `updateFigurePreview`:
               *
               *     setAlpha(t_HumanImg, t_ImgAlpha)      <- carves the silhouette
               *     t_PrewImg = image(120, 300, 32)       <- OPAQUE WHITE
               *     copyPixels(t_PrewImg, t_HumanImg, tdestrect, t_HumanImg.rect)
               *
               * With source-over the silhouette composited ONTO opaque white and
               * the preview came out a solid white box on the orange panel —
               * which also makes the preceding `setAlpha` pointless, and that is
               * the tell that the copy, not the alpha pass, was wrong.
               *
               * A fresh 32-bit buffer really is opaque white; DirPlayer's
               * `Bitmap::new` says so outright:
               *     let initial_color = match bit_depth { 16 | 32 => 255, _ => 0 };
               * It is meant to be OVERWRITTEN by this copy, not blended onto.
               *
               * Scoped to ink 0 so ink 36 (background transparent) and ink 8
               * (matte) keep falling through to the ordinary blit below — those
               * genuinely do composite rather than replace. Clipped to the
               * destination rect, because canvas `copy` otherwise clears the
               * whole buffer and would erase everything drawn before it.
               */
              context.beginPath();
              context.rect(dest.left, dest.top, dw, dh);
              context.clip();
              context.globalCompositeOperation = "copy";
              context.drawImage(
                drawable as CanvasImageSource,
                from.left, from.top, sw, sh,
                dest.left, dest.top, dw, dh,
              );
              // A replace carries the source's colour-under-alpha with its pixels.
              this.carryHiddenColour(source, from, dest, sw, sh, dw, dh);
            } else if (params.color === undefined || !source.isGrayscale) {
              /**
               * ⚠ `#color` COLORIZES 1-BIT/GRAYSCALE STENCILS ONLY — a full-colour
               * source ignores it, exactly as `#bgColor` does above (same
               * `isGrayscale` gate, same register/Character regression behind it).
               *
               * Director's copy `#color` is the foreground colour a 1-bit or
               * grayscale source is stamped in; a 32-bit colour bitmap keeps its
               * own pixels. Our extraction makes everything 32-bit, so without this
               * gate the tint fired on colour art too. It went unnoticed until the
               * furnimap DTD defaults were honoured: `<!ATTLIST SPR COL "000000">`
               * means every furniture sprite that omits COL now carries black, and
               * `_RenderFurniPreview` passes it as `#color` — so every matte
               * (ink 8) furniture thumbnail composited to a SOLID BLACK silhouette
               * while its source was full colour. Colour art now draws verbatim.
               */
              context.drawImage(
                drawable as CanvasImageSource,
                from.left, from.top, sw, sh,
                dest.left, dest.top, dw, dh,
              );
            } else {
              /**
               * ⚠ Tint through a SCRATCH canvas, not with `source-atop` on the
               * destination.
               *
               * `source-atop` would recolour everything already sitting under
               * the destination rect, and window chrome is assembled by copying
               * NINE pieces into one buffer — so each tinted piece would repaint
               * the ones before it. Tinting an isolated copy of the source keeps
               * the operation local to this blit, which is what Director does.
               *
               * `source-in` keeps the source's own alpha as the mask, so a
               * tinted piece with transparent corners stays transparent.
               */
              const scratch = createRaster(sw, sh);
              if (scratch) {
                scratch.context.drawImage(
                  drawable as CanvasImageSource,
                  from.left, from.top, sw, sh,
                  0, 0, sw, sh,
                );
                scratch.context.globalCompositeOperation = "source-in";
                scratch.context.fillStyle = params.color;
                scratch.context.fillRect(0, 0, sw, sh);
                context.drawImage(
                  scratch.canvas as CanvasImageSource,
                  0, 0, sw, sh,
                  dest.left, dest.top, dw, dh,
                );
              } else {
                context.drawImage(
                  drawable as CanvasImageSource,
                  from.left, from.top, sw, sh,
                  dest.left, dest.top, dw, dh,
                );
              }
            }
            context.restore();
          } catch {
            // A drawable that is not yet decodable is a skip, not a failure —
            // the next copy redraws it.
          }
        }
      }
    }

    if (source.fillColor && !this.fillColor) this.fillColor = source.fillColor;
    // ⚠ Carry the text through the blit. VMK renders a caption into a text
    // member's image and then `copyPixels` it into the element's buffer, so the
    // buffer is what the compositor eventually draws. Copying only the fill
    // colour produced a correctly sized, correctly placed, blank rectangle.
    /**
     * ⚠ AN EMPTY TEXT RENDER MUST CLEAR, NOT BE IGNORED.
     *
     * This used to be `if (source.text !== "")`, which made a caption
     * impossible to erase: `CWindowTextWrapper.setText(elem, "")` empties the
     * text member, `render` copies that empty result into the element buffer,
     * and the copy was skipped — so the buffer kept painting whatever string it
     * last held.
     *
     * MEASURED: that is why "Connection to the server failed, press the button
     * to try again." sat under "Loading avatar's clothes" on a perfectly healthy
     * connection. `CLoadingWindow.DefineWindow` DOES clear it — the live element
     * read `pFontData[#text] = ""` and `pTextMem.text = ""` — but the pixels
     * never changed. The element renders its `#key`
     * (`roomqueue.preloadfailed.info`) once at creation, and nothing could ever
     * take it back down.
     *
     * The guard could not simply be dropped: a plain bitmap has `text === ""`
     * too, and window chrome is blitted over captions constantly, so removing it
     * would erase every caption instead. `isTextRender` is what separates
     * "a bitmap carrying no text" from "a text member that is deliberately
     * empty" — see `CastMember.image` where it is set.
     */
    if (source.isTextRender || source.text !== "") {
      /**
       * ⚠ THE MARKER TRAVELS WITH THE TEXT, because the caption reaches the
       * screen through an INTERMEDIATE buffer, not in one hop.
       * `createImgFromTxt` builds a fresh `pImage`, copies the text member into
       * it, and the ancestor's `render` then copies `pImage` into the element's
       * drawn buffer. `pImage` is a plain image, so without carrying the flag
       * the second hop saw `isTextRender false` and `text ""` and skipped —
       * leaving the stale caption in place even though the first hop cleared
       * correctly.
       */
      this.isTextRender = source.isTextRender || this.isTextRender;
      this.text = source.text;
      this.textFont = source.textFont;
      this.textSize = source.textSize;
      this.textLineHeight = source.textLineHeight;
      this.textTopSpacing = source.textTopSpacing;
      this.textWordWrap = source.textWordWrap;
      this.textColor = source.textColor;
      this.textAlign = source.textAlign;
      this.textAntialias = source.textAntialias;

      /**
       * Record WHERE this caption landed, so the compositor can draw it there
       * rather than at the buffer's origin. See `textRuns`.
       *
       * An empty string is a CLEAR, not a run: `setText(elem, "")` has to be
       * able to take a caption back down, so it drops any run already occupying
       * that rect instead of adding a blank one.
       */
      const runRect = asRect(rest[0]);
      const runX = runRect ? runRect.left : 0;
      const runY = runRect ? runRect.top : 0;
      const runW = runRect ? runRect.right - runRect.left : this.width;
      const runH = runRect ? runRect.bottom - runRect.top : this.height;
      /**
       * ⚠ THE SOURCE RECT IS WHERE SCROLLING LIVES, so it has to shift the runs.
       *
       * `copyPixels(source, destRect, sourceRect)` takes a WINDOW of the source,
       * and `CWindowImageWrapper.render` scrolls by moving that window:
       *
       *     tSourceRect = rect(pOffX, pOffY, pOffX + pOwnW, pOffY + pOwnH)
       *
       * For pixels that crops naturally. Text runs were copied to the
       * DESTINATION offset alone, so the source window was ignored and a
       * scrolled buffer redrew its text in exactly the same place.
       *
       * MEASURED on the registration EULA: clicking the down arrow advanced
       * `pScrollOffset` 0 -> 36 and `pOffY` followed, `render` ran, and the run
       * stayed at `y: 0` every time. A run at source `y` belongs at
       * `destTop + (y - srcTop)`, which is what a pixel at that position does.
       */
      const srcRect = asRect(rest[1]);
      // The pixels of an over-sized-window copy are centred horizontally
      // (`oversizeCentreX`); the runs must move with them.
      const srcX = (srcRect ? srcRect.left : 0) - oversizeCentreX(source.width, rest);
      const srcY = srcRect ? srcRect.top : 0;
      this.textRuns = this.textRuns.filter((run) => run.x !== runX || run.y !== runY);

      /**
       * ⚠ CARRY THE SOURCE'S OWN RUNS, TRANSLATED — do not collapse them.
       *
       * Composition is at least two hops, and the positions live in the FIRST
       * one. `createButtonImg` blits the label at its computed `tDstRect` into
       * an intermediate `tNewImg`, and only then is `tNewImg` copied whole into
       * the element buffer at 0,0. Building a single run from `source.text`
       * here recorded just that outer copy, so every caption came back as one
       * run at 0,0 and the inner offsets — the centring, and the five separate
       * name rows — were lost exactly as before.
       *
       * Offsetting the source's runs by this blit's destination keeps them in
       * the destination's coordinates, however many hops deep they started.
       */
      if (source.textRuns.length > 0) {
        /**
         * ⚠ CROP RUNS TO THE DESTINATION, as the pixels are.
         *
         * A scrolled copy (`CWindowImageWrapper.render`) moves the source
         * window, so a run near the top of the source lands partly or wholly
         * ABOVE the destination rect. Pixels there are cropped by the copy;
         * the run used to be kept whole, drawn outside the list, and never
         * dropped by the next scroll's `fill` (its origin sat outside the
         * cleared rect). Held-dragging a list therefore stacked one more copy
         * of the header text per step above it — the smear.
         *
         * So: a run wholly outside the destination is not carried; one partly
         * inside carries the destination as its `clip`.
         */
        const dest = { left: runX, top: runY, right: runX + runW, bottom: runY + runH };
        for (const inner of source.textRuns) {
          const x = runX + inner.x - srcX;
          const y = runY + inner.y - srcY;
          const innerClip = inner.clip
            ? {
                left: runX + inner.clip.left - srcX,
                top: runY + inner.clip.top - srcY,
                right: runX + inner.clip.right - srcX,
                bottom: runY + inner.clip.bottom - srcY,
              }
            : { left: x, top: y, right: x + (inner.width || runW), bottom: y + (inner.height || runH) };
          const clip = {
            left: Math.max(dest.left, innerClip.left),
            top: Math.max(dest.top, innerClip.top),
            right: Math.min(dest.right, innerClip.right),
            bottom: Math.min(dest.bottom, innerClip.bottom),
          };
          this.textRuns = this.textRuns.filter((run) => run.x !== x || run.y !== y);
          if (clip.right <= clip.left || clip.bottom <= clip.top) continue;
          this.textRuns.push({ ...inner, x, y, clip });
        }
      } else if (source.text !== "") {
        this.textRuns.push({
          text: source.text,
          // Same source-window shift as the branch above.
          x: runX - srcX, y: runY - srcY, width: runW, height: runH,
          font: source.textFont, size: source.textSize,
          lineHeight: source.textLineHeight, topSpacing: source.textTopSpacing,
          wordWrap: source.textWordWrap,
          color: source.textColor,
          align: source.textAlign, antialias: source.textAntialias,
        });
      }
    }
    this.flattenToGrayscale(source.depth);
    return VOID;
  }

  /**
   * An 8-bit `#grayscale` destination holds ONE channel, so a colour copied
   * into it becomes luminance. Canvas has no such depth, so without this a
   * "grayscale" image keeps full RGB and every mask built from one carries
   * colour instead of coverage.
   *
   * ⚠ THIS IS THE PREREQUISITE FOR VMK'S ALPHA PASS. Two places depend on it:
   *
   *   CScale9Grid.render   t_mask = image(w, h, 8, #grayscale)
   *                        copyPixels(t_mask, t_Img, …)
   *                        setAlpha(t_Img, t_mask)
   *   getPartAlpha         composes the parts' #alpha into t_ImgAlpha, which
   *                        setAlpha then applies to the figure
   *
   * MEASURED before this existed: copying a green button slice into an 8-bit
   * image produced `174,215,59` verbatim rather than its luminance, so a mask
   * read back through any single channel was the RED channel of the artwork.
   * Restoring `setAlpha` on top of that emptied the name list outright.
   *
   * Luminance uses the Rec.601 weights Director's own grayscale conversion
   * uses. Alpha is untouched — coverage is what the mask is FOR.
   */
  private flattenToGrayscale(sourceDepth: number): void {
    if (this.depth > 8) return;
    /**
     * ⚠ 8-BIT MEANS PALETTED, NOT GREY. Only an image Director was asked to make
     * `#grayscale` is a level plane; a plain `image(w, h, 8)` is 256 COLOURS out
     * of its palette, and desaturating one throws its colour away.
     *
     * MEASURED on the registration EULA scrollbar, reported as "still showing
     * grey; I think that's the disabled state, it's usually blue". Its art is
     * depth 32 and BLUE — `top_up`, `lift_up` and `bottom_up` all average
     * rgb(70,150,200) — while its destination buffers are depth 8 with
     * `paletteRef #systemmac`. Every blit was flattened on arrival and the bar
     * composited to rgb(131,131,130): a perfect desaturation, which is why it
     * read as VMK's disabled art when the states were in fact all `#up`.
     *
     * ⚠ THE MASK PATH IS UNAFFECTED and must stay so — the alpha masks this
     * routine exists for are created as `image(w, h, 8, #grayscale)`, which
     * still matches here. See the note above `levels`.
     */
    if (!/gray ?scale|grey ?scale/i.test(String(this.paletteRef))) return;
    const context = this.context2d;
    if (!context?.getImageData || !context.putImageData) return;
    const pixels = context.getImageData(0, 0, this.width, this.height);
    const data = pixels.data;

    /**
     * ⚠ A 32-BIT SOURCE THAT CARRIES TRANSPARENCY WRITES ITS **ALPHA** AS THE
     * LEVEL, not its luminance.
     *
     * This is Director's text -> alpha-mask -> texture pattern, and VMK uses it
     * for every masked element:
     *
     *     t_mask = image(w, h, 8, #grayscale)
     *     copyPixels(t_mask, t_Img, …)      <- coverage, NOT brightness
     *     setAlpha(t_Img, t_mask)
     *
     * Converting by luminance instead makes the mask the ARTWORK'S BRIGHTNESS,
     * which is why applying it emptied the name list and why a polarity
     * heuristic then seemed necessary — it was patching the wrong conversion.
     *
     * ⚠ AN OPAQUE SOURCE STILL TAKES THE COLOUR PATH. With alpha 255 everywhere
     * the alpha rule would make the whole image 255 — a blank mask. Director
     * maps an opaque 32->8 grayscale copy to the nearest grey instead, which is
     * what makes a captured photo of the stage look like the stage.
     */
    let sourceHadTransparency = false;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 255) { sourceHadTransparency = true; break; }
    }
    const useAlphaAsLevel = sourceDepth === 32 && sourceHadTransparency;

    for (let i = 0; i < data.length; i += 4) {
      const level = useAlphaAsLevel
        ? data[i + 3]
        : (77 * data[i] + 150 * data[i + 1] + 29 * data[i + 2] + 128) >> 8;
      data[i] = level;
      data[i + 1] = level;
      data[i + 2] = level;
      // ⚠ A real 8-bit image HAS NO ALPHA CHANNEL. Leaving one here is what let
      // the ported polarity test fire on masks that were never matte.
      data[i + 3] = 255;
    }
    context.putImageData(pixels, 0, 0);
  }

  /**
   * `draw(rect, [#shapeType:…, #color:…, #lineSize:…])` — an OUTLINE.
   *
   * ⚠ Was a stub returning VOID, which is why framed things had no frame.
   * `Loading Bar Class.Define` builds a progress bar as three steps:
   *
   *     fill(pBuffer, pBarRect, pBgColor)                    the empty trough
   *     draw(pBuffer, pBarRect, [#shapeType:#rect, #color:…]) the BORDER
   *     fill(pBuffer, growing, pcolor)                        the progress
   *
   * The fills landed and the border did not, so every loading bar came out as a
   * flat trough with no edge. Same for anything else drawing a box outline.
   *
   * Only `#rect` and `#oval` are modelled — the shapes VMK actually asks for —
   * and an unknown `#shapeType` deliberately draws NOTHING rather than guessing
   * a rectangle, so a gap stays visible instead of becoming a plausible wrong
   * frame.
   */
  draw(rect: LingoValue, params: LingoValue): LingoValue {
    this.revision++;
    const context = this.raster();
    const box = asRect(rect);
    if (!context || !box) return VOID;

    const list = params as { getProp?: (key: LingoValue) => LingoValue } | null;
    const read = (key: string): LingoValue =>
      list && typeof list.getProp === "function" ? list.getProp(symbol(key)) : VOID;

    const colour = read("color");
    const stroke =
      colour instanceof LingoColor
        ? `rgb(${colour.red},${colour.green},${colour.blue})`
        : "rgb(0,0,0)";
    const lineSize = read("lineSize");
    const thickness = typeof lineSize === "number" && lineSize > 0 ? lineSize : 1;

    const shape = String(read("shapeType") ?? "#rect").replace(/^#/, "").toLowerCase();
    const width = Math.max(0, box.right - box.left);
    const height = Math.max(0, box.bottom - box.top);

    const target = context as RasterContext & {
      strokeStyle: string;
      lineWidth: number;
      strokeRect(x: number, y: number, w: number, h: number): void;
      beginPath(): void;
      ellipse(
        x: number, y: number, rx: number, ry: number,
        rotation: number, start: number, end: number,
      ): void;
      stroke(): void;
    };

    target.save();
    target.strokeStyle = stroke;
    target.lineWidth = thickness;
    // Director's outline sits INSIDE the rect; canvas centres a stroke on the
    // path, so inset by half the width or the frame straddles the edge.
    const inset = thickness / 2;
    if (shape === "rect") {
      target.strokeRect(box.left + inset, box.top + inset, width - thickness, height - thickness);
    } else if (shape === "oval" && typeof target.ellipse === "function") {
      target.beginPath();
      target.ellipse(
        box.left + width / 2, box.top + height / 2,
        Math.max(0, width / 2 - inset), Math.max(0, height / 2 - inset),
        0, 0, Math.PI * 2,
      );
      target.stroke();
    }
    target.restore();
    return VOID;
  }

  /**
   * ⚠ ON A LEVEL PLANE THE PIXEL IS AN INTEGER, and it must really be read and
   * written — 0-based, like Director.
   *
   * This used to be a sparse `pixels` map only, so on an 8-bit `#grayscale` mask
   * `getPixel(x, y, #integer)` returned VOID and `setPixel(x, y, n)` did nothing.
   * That made VMK's `ClipAlphaLowValues(alpha, 150)` — which
   * `CRoomVisualBlock.CreateHighlighter` runs on every sprite's `extractAlpha()`
   * before unioning it into the highlight mask — a silent no-op. MEASURED on the
   * flying carpet chair: 1,970 soft pixels (alpha 1-149) of its 111x95 layer
   * stayed in the mask, which came out 50% coverage instead of ~23%, so the
   * furni-mode highlight spread off the item onto its soft surround.
   *
   * The plane holds the value `setAlpha` reads as coverage (0 transparent, 255
   * opaque), which is exactly the scale `ClipAlphaLowValues` compares against.
   * Out of range reads VOID and writes are ignored — VMK's clip loops run
   * 1..width, so they touch one pixel past the edge on every row.
   */
  private levelIndex(x: LingoValue, y: LingoValue): number {
    const px = Math.floor(Number(x));
    const py = Math.floor(Number(y));
    if (!(px >= 0 && px < this.width && py >= 0 && py < this.height)) return -1;
    return py * this.width + px;
  }

  setPixel(x: LingoValue, y: LingoValue, color: LingoValue): LingoValue {
    if (this.levels && typeof color === "number") {
      const at = this.levelIndex(x, y);
      if (at < 0) return VOID;
      const value = Math.max(0, Math.min(255, Math.round(color)));
      if (this.levels[at] !== value) {
        this.levels[at] = value;
        this.levelsDirty = true;
        this.revision++;
      }
      this.levelsWritten = true;
      return VOID;
    }
    if (color instanceof LingoColor) {
      this.pixels.set(`${String(x)},${String(y)}`, color);
      // A 1x1 image written this way is indistinguishable from a flat fill, and
      // the compositor only understands fills.
      if (this.width === 1 && this.height === 1) this.fillColor = color;
    }
    return VOID;
  }

  getPixel(x: LingoValue, y: LingoValue): LingoValue {
    if (this.levels) {
      const at = this.levelIndex(x, y);
      return at < 0 ? VOID : this.levels[at];
    }
    return this.pixels.get(`${String(x)},${String(y)}`) ?? this.fillColor ?? VOID;
  }

  /**
   * `trimWhiteSpace()` — a copy cropped to its content.
   *
   * ⚠ NOT cosmetic. `CRegPage1.updatePartPreview` composites a body part into a
   * 200x200 scratch buffer, sets its alpha, then trims it down to feed a 36x36
   * preview element. Without this the call died with "method not found:
   * trimWhiteSpace", and because that throw escapes through `updateAllPrewIcons`
   * and `CreateFigure`, ALL EIGHT avatar part previews on registration page 1
   * stayed blank — the panels drew, the thumbnails were simply never produced.
   *
   * Director trims surrounding WHITE. VMK reaches here having just called
   * `setAlpha`, so transparency is the real boundary for these buffers and both
   * have to count as empty — a part trimmed only on white would keep the whole
   * transparent margin and scale down to a speck inside its 36x36 box.
   *
   * Returns a COPY, as Director does; the caller keeps using the original.
   * Off-DOM (the Node smoke test) there are no pixels to measure, so the honest
   * answer is an unmodified duplicate.
   */
  trimWhiteSpace(): LingoImage {
    /**
     * A crop that follows its source. Used for every early return as well as
     * the real crop below — see the note at the end of this method.
     *
     * ⚠ THE EARLY RETURNS ARE THE COMMON CASE ON FIRST PASS, not an edge case.
     * `updatePartPreview` composites body parts whose art is still downloading,
     * so every `copyPixels` only QUEUES itself and the scratch buffer never
     * gains a raster. `this.source` is therefore null, and the unhooked
     * duplicate returned here is what the preview element ended up copying:
     * MEASURED as a 200x200 at revision 0 feeding a 36x36 slot, which is
     * exactly the flat white thumbnail.
     */
    const track = (result: LingoImage): LingoImage => {
      result.recomputeFrom = {
        source: this,
        seen: this.revision,
        run: () => {
          const fresh = this.trimWhiteSpace();
          result.width = fresh.width;
          result.height = fresh.height;
          result.source = fresh.source;
        },
      };
      return result;
    };

    const source = this.source;
    if (source === null || source === undefined) return track(this.duplicate());

    const width = Math.max(1, Math.floor(this.width));
    const height = Math.max(1, Math.floor(this.height));
    const made = createRaster(width, height, true);
    if (!made) return track(this.duplicate());

    const context = made.context as RasterContext & {
      drawImage(image: CanvasImageSource, x: number, y: number): void;
      getImageData(x: number, y: number, w: number, h: number): { data: Uint8ClampedArray };
    };
    try {
      context.drawImage(source as CanvasImageSource, 0, 0);
    } catch {
      // Not decodable yet; tracked so the crop is retried once it is.
      return track(this.duplicate());
    }

    const pixels = context.getImageData(0, 0, width, height).data;
    let left = width;
    let top = height;
    let right = -1;
    let bottom = -1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const at = (y * width + x) * 4;
        const transparent = pixels[at + 3]! < 8;
        const white =
          pixels[at]! >= 248 && pixels[at + 1]! >= 248 && pixels[at + 2]! >= 248;
        if (transparent || white) continue;
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }

    // Entirely blank: Director gives back a 1x1 rather than a zero-sized image.
    // Entirely blank NOW, but the source may still be filling in.
    if (right < left || bottom < top) return track(new LingoImage(1, 1, this.depth, this.paletteRef));

    const cropWidth = right - left + 1;
    const cropHeight = bottom - top + 1;
    const cropped = new LingoImage(cropWidth, cropHeight, this.depth, this.paletteRef);
    cropped.useAlpha = this.useAlpha;
    const target = createRaster(cropWidth, cropHeight);
    if (target) {
      (target.context as RasterContext & {
        drawImage(image: CanvasImageSource, ...rest: number[]): void;
      }).drawImage(
        source as CanvasImageSource,
        left, top, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight,
      );
      cropped.source = target.canvas;
    }

    /**
     * ⚠ A CROP IS DERIVED, SO IT HAS TO FOLLOW ITS SOURCE.
     *
     * `copyPixels` records a `sourceDeps` entry so a copy re-runs when its
     * source changes, but a crop cannot use that: the dependency replays a COPY,
     * and re-copying the whole 200x200 scratch buffer is not the same operation
     * as re-cropping it. Without a link of its own the crop is a SNAPSHOT of
     * whatever pixels existed at the instant it was taken.
     *
     * MEASURED on the registration slot thumbnails: `updatePartPreview`
     * composites into a 200x200 buffer and trims it, and on the first pass only
     * 12 of 24 body-part copies had art yet. The parts that arrived afterwards
     * updated the scratch buffer, the crop never heard about it, and five of the
     * six slots stayed flat white — 1 distinct colour — while the sixth (the
     * hat, which uses a prepared image and never goes through here) was fine.
     * Calling `updateAllPrewIcons` by hand afterwards produced all six
     * correctly, which is how we know only the timing was wrong.
     */
    // Assigning `source` in `run` bumps the revision and flushes waiters, so
    // anything that copied FROM the crop re-runs in turn.
    return track(cropped);
  }

  duplicate(): LingoImage {
    const copy = new LingoImage(this.width, this.height, this.depth, this.paletteRef);
    for (const [at, color] of this.pixels) copy.pixels.set(at, color);
    copy.useAlpha = this.useAlpha;
    /**
     * ⚠ THE ALPHA CHANNEL COMES WITH THE COPY. Director's `duplicate()` copies
     * the whole image, and `useAlpha` without the mask it refers to is a promise
     * the copy cannot keep.
     *
     * ⚠ THIS IS THE BLACK BOX AROUND THE AVATAR. `CAvatarRenderer.update` builds
     * the figure over an OPAQUE BLACK fill and cuts it out with a separate
     * 8-bit mask, then hands the result to the sprite:
     *
     *     t_Img.fill(t_Img.rect, rgb(0, 0, 0))
     *     …
     *     t_Img.setAlpha(t_rAlpha)
     *     t_Img.useAlpha = 1
     *     a_Spr.member.image = t_Img
     *
     * `CastMember`'s image SETTER stores `value.duplicate()`, so the mask was
     * dropped on the way in — MEASURED on the live avatar: the member's image
     * came back `useAlpha 1`, `fillColor rgb(0, 0, 0)` and `alpha` UNDEFINED,
     * while `setAlpha` was demonstrably being called on the pre-duplicate image
     * (80x160 target, 80x160 depth-8 source, four times per walk).
     *
     * The same shape applies to `grayscaleMask` and to `textRuns`, which a
     * styled caption needs on the other side of a duplicate.
     */
    copy.alpha = this.alpha;
    copy.grayscaleMask = this.grayscaleMask;
    /**
     * ⚠ A MASK'S PIXELS ARE ITS LEVEL PLANE, so that is what has to be copied.
     * The canvas is only a display form (see `levels`), so reading through
     * `copiedFrom` gave the copy a fresh, all-zero plane — an EMPTY mask.
     * MEASURED on the Haunted Mansion avatar: `CAvatarClassHauntedMansion.
     * RenderFaces` keeps `m_rAlpha.duplicate()` per direction; the live plane
     * had 3,284 covered pixels, every duplicate had 0, and the head drew
     * fully transparent under the suit.
     */
    if (this.levels && copy.levels && this.levelsWritten && copy.levels.length === this.levels.length) {
      copy.levels.set(this.levels);
      copy.levelsWritten = true;
      copy.levelsDirty = true;
    }
    copy.textRuns = this.textRuns.map((run) => ({ ...run }));
    copy.fillColor = this.fillColor;
    // ⚠ Carry the art BY REFERENCE, not by value — see `source`. VMK duplicates
    // a member's image and draws the COPY (`Define` sets `pImage` from
    // `duplicate(tmember.image)`), typically before the PNG has arrived.
    copy.copiedFrom = this;
    /**
     * ⚠ A DUPLICATE MUST ACTUALLY ACQUIRE ITS PIXELS. Director's `duplicate()`
     * is an EAGER copy; ours reads through `copiedFrom` and only pulls the art
     * when something first draws it. That difference is invisible until the
     * source goes away or the copy is drawn on the very frame it is made — and
     * VMK does both.
     *
     * ⚠ THIS IS THE BLACK AVATAR WHILE WALKING.
     * `CAvatarClothAssetManager._CastLoadCallback` caches every part as
     * `t_rMember.image.duplicate()` and then calls `RemoveCastLib`, so in
     * Director the cache holds real, self-contained pixels. Ours held references
     * that resolve on first draw. Standing reuses a handful of already-resident
     * frames; WALKING cycles four frames across eight directions, so nearly every
     * step drew a part whose raster did not exist yet — the colour pass drew
     * nothing and `CAvatarRenderer`'s opaque black fill showed through.
     *
     * MEASURED on the live cache: only 199 of 1,333 cached parts had a raster
     * (`std` 46/678, `wlk` 150/360), and requesting six unresolved walk frames
     * resolved ALL of them in 404 ms with ZERO new network requests — the art was
     * already decoded by `loadCastArt`'s body-part prefetch and simply never
     * bound.
     *
     * ⚠ THIS IS NOT THE OLD "fetch storm". That warning (on `extractAlpha`) is
     * from before body-part art was prefetched by name; the bytes are already in
     * hand now, so this binds what exists rather than issuing requests. Check the
     * network panel if boot ever slows: the number to watch is requests, not
     * cached images.
     */
    copy.requestSource();
    copy.text = this.text;
    copy.textFont = this.textFont;
    copy.textSize = this.textSize;
    copy.textLineHeight = this.textLineHeight;
    copy.textTopSpacing = this.textTopSpacing;
    copy.textWordWrap = this.textWordWrap;
    copy.textColor = this.textColor;
    copy.textAlign = this.textAlign;
    copy.textAntialias = this.textAntialias;
    return copy;
  }
}

export class LingoColor {
  constructor(public red: number, public green: number, public blue: number) {}
  toString(): string {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }
}

/**
 * Lingo's `ilk`. One argument returns the type symbol; two compare against it.
 * ⚠ Integers and floats are distinct types in Lingo — `ilk(1)` is `#integer`,
 * `ilk(1.0)` is `#float` — and VMK's wire code branches on the difference.
 */
/**
 * Structural test rather than an import of CastMember — `lingo-cast.ts` imports
 * this module, so depending on it here would be a cycle.
 */
function isCastMemberLike(value: LingoValue): boolean {
  if (value === VOID || typeof value !== "object") return false;
  const candidate = value as { _number?: unknown; _type?: unknown; isEmpty?: unknown };
  return typeof candidate._number === "number" && typeof candidate._type === "string";
}

function ilk(value: LingoValue, wanted?: LingoValue): LingoValue {
  let kind: string;

  /**
   * ⚠ A PROPERTY LIST CARRYING AN `#ilk` KEY REPORTS THAT KEY.
   *
   * `ilk(x)` is `the ilk of x`, and reading a property off a prop list yields
   * that key's value — so VMK gives its structures a type by storing one:
   *
   *   struct.pointer    = [#value:VOID, #ilk:#struct]
   *   struct.font.plain = [#font:"Foxley 816 *", …, #ilk:#struct, …]
   *
   * Answering `#propList` instead breaks every guard written against it, and
   * they fail SILENTLY by returning 0: `CConnection.setProperty` refused the
   * listener pointer the connection manager handed it, so the connection kept
   * the empty pointer from its own `construct` and `forwardMsg` threw on every
   * inbound message — inside the socket callback, where nothing catches it. The
   * client connected, the server sent `2001 connectionReady`, and the client
   * simply never answered. `CWriter.setFont` fails the same way, which is what
   * "Font struct expected!" was.
   */
  if (value instanceof LingoPropList) {
    const declared = value.getProp(symbol("ilk"));
    if (typeof declared === "string" && declared.startsWith("#")) {
      // Case-insensitive for the same reason as the family test below: the
      // declared value is whatever the Lingo wrote (`#struct`), and the caller
      // may ask in another casing.
      if (wanted === undefined) return declared;
      if (declared.toLowerCase() === String(wanted).toLowerCase()) return bool(true);
    }
  }

  // A host object that names its own Lingo type wins over the structural
  // guesses below; see `LINGO_ILK`.
  const declared =
    value !== null && typeof value === "object"
      ? (value as Record<symbol, unknown>)[LINGO_ILK]
      : undefined;
  if (typeof declared === "string") kind = declared;
  else if (value === VOID) kind = "void";
  // A boxed float is `#float` even when its value is whole — that is the entire
  // reason it is boxed. See `LingoFloat`.
  else if (value instanceof LingoFloat) kind = "float";
  else if (typeof value === "number") kind = Number.isInteger(value) ? "integer" : "float";
  else if (typeof value === "string") kind = value.startsWith("#") ? "symbol" : "string";
  else if (value instanceof LingoList) kind = "list";
  else if (value instanceof LingoPropList) kind = "propList";
  else if (value instanceof LingoPoint) kind = "point";
  else if (value instanceof LingoRect) kind = "rect";
  else if (value instanceof LingoColor) kind = "color";
  else if (value instanceof LingoVector) kind = "vector";
  /**
   * ⚠ Director calls an image object `#image`, and VMK checks for it before
   * accepting one: `CWindowImageWrapper.feedImage` rejects anything else with
   * "Image object expected!" and returns without rendering. Answering
   * `#instance` therefore refused every picture handed to a window element —
   * the elements laid out at the right size and stayed blank.
   */
  else if (value instanceof LingoImage) kind = "image";
  // `CMgrResource.createMember` guards with `ilk(tmember, #member)` before
  // trusting what `new` returned, so a cast member must report as #member
  // rather than the generic #instance — otherwise it treats every freshly
  // created member as a failure.
  else if (isCastMemberLike(value)) kind = "member";
  else if (typeof value === "object") kind = "instance";
  else kind = "void";

  const asSymbol = symbol(kind);
  if (wanted === undefined) return asSymbol;

  /**
   * ⚠ `ilk(value, wanted)` IS NOT AN EQUALITY TEST — it is a type HIERARCHY.
   *
   * Director answers TRUE for a family, not just an exact match, and comparing
   * the two symbols directly quietly failed every family test. Read from
   * `TypeBuiltins::ilk` in LibreShockwave rather than guessed:
   *
   *   #list        list, propList, rect, point
   *   #linearList  list
   *   #number      integer, float
   *   #object      instance, member, xtra, xtraInstance, script, castLib,
   *                sprite, stage, sound, image
   *
   * `#list` is the one that bites: 26 call sites in the generated casts, and a
   * prop list is the usual thing being tested. `CRegPage1.getPartImg` opens with
   *
   *     if ilk(tPartList) <> #list then tPartList = [tPartList]
   *
   * — the single-argument form, which was fine — but the two-argument guards
   * elsewhere were all answering "not a list" for prop lists, rects and points.
   *
   * The comparison is case-insensitive because the type name is generated
   * lowercase here (`#proplist`) while VMK writes `#propList`.
   */
  const FAMILIES: Record<string, readonly string[]> = {
    list: ["list", "proplist", "rect", "point"],
    linearlist: ["list"],
    number: ["integer", "float"],
    object: [
      "instance", "member", "xtra", "xtrainstance", "script",
      "castlib", "sprite", "stage", "sound", "image",
    ],
  };

  const actual = kind.toLowerCase();
  const asked = String(wanted).replace(/^#/, "").toLowerCase();
  if (actual === asked) return bool(true);
  return bool((FAMILIES[asked] ?? []).includes(actual));
}

/**
 * `value("...")` — a real Lingo literal parser.
 *
 * VMK's data is Lingo source, not JSON. A window definition embeds its element
 * list as a literal:
 *
 *   [#member: "null", #media: #bitmap, #locH: 0, #type: "piece", #id: "modal"]
 *
 * and `Layout Parser Class` reaches it by handing that text to `value()`. So
 * this has to handle lists, property lists, symbols, strings and numbers, with
 * nesting — a scalar-only version silently returned the raw string and every
 * layout came back unparsed.
 */
export function parseValue(input: LingoValue): LingoValue {
  if (typeof input !== "string") return input;
  const text = input.trim();
  if (text === "") return VOID;

  const reader = { source: text, at: 0 };
  const parsed = readLiteral(reader);
  skipSpace(reader);
  /**
   * ⚠ A list followed only by STRAY `]`s is still that list. Disney's own data
   * has the typo: `vmk_junglecruise_animals`' `animal.list` gives
   * `Animal.snake_straight_a.frames.entry = [ … "snake_straight_loop_1"]]`.
   * Handed back as a string, every snake spawn threw in
   * `CAnimalManager.CreateMemberListFromLoop` and froze the Jungle Cruise at
   * its first Cambodian stage. Narrow on purpose: only brackets, only after a
   * bracketed literal.
   */
  if (text[0] === "[" && /^\]+$/.test(text.slice(reader.at).replace(/\s/g, ""))) return parsed;
  // Trailing junk means this was not a literal after all; hand back the string.
  return reader.at >= reader.source.length ? parsed : input;
}

interface LiteralReader {
  source: string;
  at: number;
}

function skipSpace(reader: LiteralReader): void {
  while (reader.at < reader.source.length && /\s/.test(reader.source[reader.at]!)) reader.at++;
}

function readLiteral(reader: LiteralReader): LingoValue {
  skipSpace(reader);
  const ch = reader.source[reader.at];
  if (ch === undefined) return VOID;
  if (ch === "[") return readBracketed(reader);
  if (ch === '"') return readString(reader);
  if (ch === "#") return readSymbol(reader);
  return readScalar(reader);
}

function readString(reader: LiteralReader): string {
  reader.at++; // opening quote
  let out = "";
  while (reader.at < reader.source.length && reader.source[reader.at] !== '"') {
    out += reader.source[reader.at++];
  }
  reader.at++; // closing quote
  return out;
}

function readSymbol(reader: LiteralReader): string {
  reader.at++; // '#'
  let name = "";
  while (reader.at < reader.source.length && /[\w.]/.test(reader.source[reader.at]!)) {
    name += reader.source[reader.at++];
  }
  return symbol(name);
}

function readScalar(reader: LiteralReader): LingoValue {
  let raw = "";
  /**
   * ⚠ A comma INSIDE parentheses does not end the entry.
   *
   * VMK's config is full of constructor calls, and they contain commas:
   *
   *   loading.bar.props = [#color:rgb(0,62,114), …, #width:128, #height:16]
   *
   * Splitting on every comma tore that into `#color=rgb(0`, `#bgColor=62`,
   * `#width=114)`, `#height=rgb(0` — so the loading bar's width became the
   * string "114)" and its height "rgb(0". That is exactly the 114x1 element the
   * boot has been drawing since the window engine landed. Every
   * `struct.font.*` entry has the same shape.
   */
  let depth = 0;
  while (reader.at < reader.source.length) {
    const ch = reader.source[reader.at]!;
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (depth === 0 && /[,\]:]/.test(ch)) break;
    raw += ch;
    reader.at++;
  }
  const trimmed = raw.trim();
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  if (/^-?\d*\.\d+$/.test(trimmed)) return parseFloat(trimmed);

  /**
   * ⚠ `TRUE` AND `FALSE` ARE LINGO CONSTANTS, NOT TEXT.
   *
   * `value()` compiles its argument as a Lingo EXPRESSION, so `value("FALSE")`
   * is the constant 0 — while returning the bare string "FALSE" makes it
   * TRUTHY, the exact opposite of what the data says.
   *
   * This is not hypothetical. Of the 32 `component.*.xml` members in the game,
   * exactly ONE sets CLICKABLE, and it sets it to disable a row:
   *
   *     component.navigator.roomlist.title.xml   CLICKABLE="FALSE"
   *
   * read by `CUIComponent.readDefinition` as
   * `m_bClickable = value(tDoc.GetParam("CLICKABLE"))`. Without this, the one
   * component authored to be UNCLICKABLE is the one that answers clicks.
   */
  if (/^true$/i.test(trimmed)) return 1;
  if (/^false$/i.test(trimmed)) return 0;

  /**
   * `rgb(…)`, `point(…)`, `rect(…)`, `vector(…)` are VALUES in Lingo source,
   * not text.
   *
   * ⚠ `vector` WAS MISSING HERE, AND IT COST THE JUNGLE ROOMS THEIR AUDIO,
   * THEIR ANIMATION AND THEIR AVATAR.
   *
   * The boat splines are authored as XML attributes and read straight through
   * `value()`:
   *
   *     <KNOT POS="vector( 27.0000, 125.0000, 0.0000 )"/>
   *     CStage.LoadXML:  addControlPoint(m_splines[1], value(tKnot.param["POS"]))
   *
   * Falling through to `return trimmed` made every control point a STRING, so
   * `CSpline3D.InterpolateAt` did vector arithmetic on strings, the result
   * decayed to a float, and `TangentAt` called `normalize` on it:
   *
   *     Lingo method not found: normalize on LingoFloat{value}
   *       [executeMessage(room_ready) -> #tikihandler_component.#roomready]
   *
   * That throw escapes `CMgrBroker.Execute`, which walks its subscribers in
   * REVERSE with no per-subscriber guard — and at `room_ready` the room handlers
   * are registered LAST, so they run FIRST and take `AnimationManager` (8) and
   * `SoundTracker` (9) down with them. Hence a silent, static room whose avatar
   * never appears, with nothing in the log naming the cause.
   *
   * MEASURED before this fix: `value("point(3, 4)")` -> LingoPoint, but
   * `value("vector(10, 20, 30)")` -> the string. Vector ARITHMETIC was fine all
   * along — `interpolateCatmullRom` on real vectors returns `vector(1.5, 0.5, 0)`
   * — so nothing downstream needed changing once the points parse.
   */
  const call = /^(rgb|point|rect|vector)\s*\(([\s\S]*)\)$/i.exec(trimmed);
  if (call) return evaluateCall(call[1]!.toLowerCase(), call[2]!);

  return trimmed;
}

/** Builds the value for a `name(args)` literal found inside config data. */
function evaluateCall(name: string, argText: string): LingoValue {
  const args: LingoValue[] = [];
  const reader: LiteralReader = { source: argText, at: 0 };
  while (reader.at < reader.source.length) {
    skipSpace(reader);
    if (reader.at >= reader.source.length) break;
    args.push(readLiteral(reader));
    skipSpace(reader);
    if (reader.source[reader.at] === ",") reader.at++;
  }

  if (name === "rgb") {
    // `rgb("#RRGGBB")` is as common in this data as `rgb(r, g, b)` — every
    // `struct.font.*` entry uses the hex form.
    if (args.length === 1 && typeof args[0] === "string") {
      const hex = /^#?([0-9a-f]{6})$/i.exec(args[0].trim());
      if (!hex) return new LingoColor(0, 0, 0) as unknown as LingoValue;
      const packed = parseInt(hex[1]!, 16);
      return new LingoColor(
        (packed >> 16) & 255,
        (packed >> 8) & 255,
        packed & 255,
      ) as unknown as LingoValue;
    }
    return new LingoColor(num(args[0]), num(args[1]), num(args[2])) as unknown as LingoValue;
  }
  if (name === "point") {
    return new LingoPoint(num(args[0]), num(args[1])) as unknown as LingoValue;
  }
  if (name === "vector") {
    return new LingoVector(num(args[0]), num(args[1]), num(args[2])) as unknown as LingoValue;
  }
  return new LingoRect(
    num(args[0]),
    num(args[1]),
    num(args[2]),
    num(args[3]),
  ) as unknown as LingoValue;
}

/**
 * `[…]` is either a linear list or a property list, told apart by a `:` after
 * the first key. `[:]` is Lingo's empty property list.
 */
function readBracketed(reader: LiteralReader): LingoValue {
  reader.at++; // '['
  skipSpace(reader);

  if (reader.source[reader.at] === ":") {
    reader.at++;
    skipSpace(reader);
    if (reader.source[reader.at] === "]") reader.at++;
    return new LingoPropList() as unknown as LingoValue;
  }
  if (reader.source[reader.at] === "]") {
    reader.at++;
    return new LingoList() as unknown as LingoValue;
  }

  const keys: LingoValue[] = [];
  const values: LingoValue[] = [];
  let isPropList = false;

  for (;;) {
    skipSpace(reader);
    const first = readLiteral(reader);
    skipSpace(reader);

    if (reader.source[reader.at] === ":") {
      reader.at++;
      isPropList = true;
      keys.push(first);
      values.push(readLiteral(reader));
    } else {
      values.push(first);
    }

    skipSpace(reader);
    if (reader.source[reader.at] === ",") {
      reader.at++;
      continue;
    }
    if (reader.source[reader.at] === "]") reader.at++;
    break;
  }

  if (isPropList) {
    const list = new LingoPropList();
    for (let i = 0; i < keys.length; i++) list.setProp(keys[i], values[i]);
    return list as unknown as LingoValue;
  }
  return new LingoList(values) as unknown as LingoValue;
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

// ill etc. are ordinary TS methods, not receiver-first Lingo handlers.
(LingoImage.prototype as unknown as Record<symbol, unknown>)[LINGO_NATIVE] = true;
(LingoRect.prototype as unknown as Record<symbol, unknown>)[LINGO_NATIVE] = true;
/**
 * ⚠ `LingoPoint` was missing from this list, and the symptom was not an error.
 *
 * Without the marker `callMethod` uses the TRANSPILED-HANDLER convention and
 * injects the receiver as the first argument, so `callMethod("inside", pt, rect)`
 * invoked `inside(pt)` — the point arrived where the rect was expected, the
 * type guard rejected it, and the answer was a confident FALSE.
 *
 * MEASURED: `pt.inside(r)` returned 1 and `callNamed("inside", pt, r)` returned
 * 1 while `callMethod("inside", pt, r)` returned 0 for the same values. Since
 * `CUIComponentPage.EventProc` picks the row under the cursor with exactly that
 * call, every component list in the game was unclickable — the click routed all
 * the way through (`#mouseup / "reg.namelist" / point(48,9)`) and then hit a
 * hit-test that always said no.
 */
(LingoPoint.prototype as unknown as Record<symbol, unknown>)[LINGO_NATIVE] = true;
/**
 * Same reasoning for vectors, and just as load-bearing: `callMethod("dot", v, w)`
 * and `callMethod("cross", v, w)` both take the OTHER vector as their argument,
 * so without the marker the receiver would be injected first and `w` would be
 * silently dropped — a wrong number rather than an error.
 */
(LingoVector.prototype as unknown as Record<symbol, unknown>)[LINGO_NATIVE] = true;

/**
 * The global command spelling of every list/property-list operation.
 *
 * Each one forwards to the identically named method, so the two spellings can
 * never diverge. Guarded on the container types: Lingo's `add` is only a list
 * command, and forwarding a non-list would turn a typo into a method-not-found
 * error somewhere far away.
 *
 * `count` and `getaProp` are deliberately absent — they are defined separately
 * because they answer for strings and non-lists too.
 */
const LIST_COMMANDS = [
  "add", "addAt", "addProp", "append",
  "deleteAt", "deleteOne", "deleteProp",
  "setAt", "setaProp", "sort",
  "getAt", "getLast", "getOne", "getPos", "getProp", "getPropAt", "findPos",
] as const;

function listCommandBuiltins(): Record<string, (...args: LingoValue[]) => LingoValue> {
  const table: Record<string, (...args: LingoValue[]) => LingoValue> = {};
  for (const name of LIST_COMMANDS) {
    table[name] = (target, ...rest) =>
      target instanceof LingoList || target instanceof LingoPropList
        ? callMethod(name, target, ...rest)
        : VOID;
  }
  return table;
}

/** Registers every builtin that needs no engine. Call once at boot. */
export function registerPureBuiltins(): void {
  // Director chunk expressions are property access on strings, so they have to
  // be available before any transpiled code runs.
  installStringChunks();

  registerBuiltins({
    // -- type predicates. voidp alone is 276 of the 1,418 builtin call sites.
    voidp: (v) => bool(v === VOID),
    stringp: (v) => bool(typeof v === "string" && !v.startsWith("#")),
    integerp: (v) => bool(typeof v === "number" && Number.isInteger(v)),
    /**
     * A TYPE test, as Director's is — `TypeBuiltins::floatp` is just `isFloat()`.
     *
     * ⚠ This only became safe once `float` stopped inventing a number for
     * unparseable strings; see the comment there. An earlier version tested the
     * boxed VALUE (`!Number.isInteger`) to compensate for that, which made
     * `floatp(float(1.0))` answer false — wrong, and the opposite mistake.
     */
    floatp: (v) => bool(v instanceof LingoFloat || (typeof v === "number" && !Number.isInteger(v))),
    symbolp: (v) => bool(typeof v === "string" && v.startsWith("#")),
    listp: (v) => bool(v instanceof LingoList || v instanceof LingoPropList),
    /**
     * `!(void | number | symbol | string)` — read from `TypeBuiltins::objectp`.
     * ⚠ A boxed float is a NUMBER, so it must not answer true here just because
     * the box happens to be a JS object.
     */
    objectp: (v) =>
      bool(v !== VOID && typeof v === "object" && !(v instanceof LingoFloat)),
    ilk,

    // -- conversion
    /**
     * ⚠ `integer()` ANSWERS VOID WHEN THE VALUE IS NOT A NUMBER, not 0.
     *
     * Director returns VOID for `integer(VOID)` / `integer("abc")`, and VMK
     * leans on it to mean "the XML did not specify this". `CRoomVisualDefault.
     * _Open` writes every sprite property straight from the room's score
     * document:
     *
     *     sprite.blend = integer(a_rNode.param["BLEND"])
     *     sprite.ink   = integer(a_rNode.param["INK"])
     *
     * and `mainstreet_square.visual.xml` omits BLEND on nearly every SPRITE:
     *
     *     <SPRITE ID="mainstreer_sq_bg" MEMBER="mainstreer_sq_bg"
     *             X="400" Y="0" Z="1" W="800" H="576" />
     *
     * Returning 0 set `the blend of sprite` to 0 — FULLY TRANSPARENT — on the
     * background, the trees, the benches, the cannon, the entrance and the
     * balcony. Every one was on stage, visible, correctly sized, and painted
     * nothing. Paired with the VOID guard in `setThePropOf`, the authored
     * default (100) now survives.
     *
     * ⚠ The same holds for a NON-NUMERIC string, and `num` cannot tell: it
     * answers 0 for "IDLE". `CFactorVmkAnimation.playEvent` handles an `.ani`
     * `GOTO IDLE` event with `t_iFrame = integer("IDLE")`, falling back to
     * `gotomarker` only when that is not an integer. Answering 0 set
     * FRAMECOUNTER to 0 — a frame no sprite span covers — so every NPC
     * animation (the Matterhorn Yeti) blinked out for one tick per loop.
     */
    integer: (v) => {
      if (v === VOID || v === null) return VOID;
      if (typeof v === "string" && Number.isNaN(parseFloat(v))) return VOID;
      const n = num(v);
      return Number.isFinite(n) ? Math.round(n) : VOID;
    },
    /**
     * ⚠ RETURNS A BOXED FLOAT, not a bare number.
     *
     * `LingoFloat` exists because Lingo divides two INTEGERS with integer
     * division, and JavaScript cannot tell `1.0` from `1`. The emitter already
     * routes float LITERALS through `float()` for exactly that reason — but a
     * Lingo `float(x)` CALL lands here instead, and returning `num(v)` threw the
     * box away at the one moment the code was explicitly asking for a float.
     *
     * The cost of getting it wrong, measured on the dictionary progress bar:
     *
     *   DecrunchABunchOfWords   return float(m_iExpandOffset) / float(count)
     *
     * Both sides came back as whole JS numbers, so `div` took the integer path
     * and truncated `101 / 3374` to **0**. `getLoadPercent` then reported 0 on
     * every tick, so `Loading_Bar_Class.prepare` failed its
     * `pDrawPoint <= pPercent * width` gate and never painted a column, and the
     * caption formatted `integer(0 * 100)` as "Updating 0%" for the whole parse.
     * Both then jumped straight to done. The bar was rendering CORRECTLY the
     * entire time — it was being told the load was 0% complete.
     *
     * This is the same failure `LingoFloat`'s own doc comment describes, reached
     * through the builtin path rather than the literal one, so it went on
     * biasing every ratio in the transpiled casts toward zero.
     *
     * ⚠ AN UNPARSEABLE STRING COMES BACK UNCHANGED, not as 0. From
     * `MathBuiltins::toFloat`:
     *
     *     if (args[0].isString()) {
     *         if (const auto parsed = parseDoubleStrict(...)) return Datum::of(*parsed);
     *         return args[0];        // <- the string itself
     *     }
     *
     * That is what makes `CMgrText.dump` / `CMgrVariable.dump` work, since both
     * decide whether a config value is numeric with
     * `if floatp(float(tvalue)) then tvalue = float(tvalue)`. Returning 0 for
     * "some text" made that guard true for EVERY string and converted the lot —
     * the boot died on `convertSpecialChars on LingoFloat{0}`. The strictness
     * matters: a partial parse ("12abc" -> 12) would reintroduce it.
     */
    float: (v) => {
      if (typeof v === "string") {
        const text = v.trim();
        const parsed = text === "" ? Number.NaN : Number(text);
        // Not a number in full (symbols like "#name" land here too) — hand it back.
        if (!Number.isFinite(parsed)) return v;
        return new LingoFloat(parsed) as unknown as LingoValue;
      }
      return new LingoFloat(num(v)) as unknown as LingoValue;
    },
    string: (v) => str(v),
    symbol: (v) => symbol(str(v)),
    value: parseValue,

    // -- strings. 1-based and inclusive, like every Lingo index.
    length: (v) => str(v).length,
    chars: (v, from, to) => str(v).slice(num(from) - 1, num(to)),
    /**
     * Lingo's `offset` is case-INSENSITIVE, but folding the whole haystack to
     * do it is what made XML parsing slow.
     *
     * ⚠ `str(haystack).toLowerCase()` allocates a full copy of the haystack on
     * every call AND flattens V8's O(1) sliced string, so the `chars()` slicing
     * that `CCoreXMLParser._ListItems` does to consume a document stopped being
     * free. The parser calls `offset` several times per item over a document
     * that may be hundreds of KB, which made it quadratic in the document size.
     *
     * A needle with no ASCII letter cannot be affected by case folding — every
     * needle the XML parser searches for is punctuation (`<`, `>`, `<!--`,
     * `-->`, `]]>`, `]`) — so it can search the original string directly. That
     * is also strictly MORE correct: the folded path returns an index into the
     * folded copy, which is wrong for any character whose lowercase form has a
     * different length. Needles containing letters keep the original behaviour.
     */
    offset: (needle, haystack) => {
      const text = str(haystack);
      const term = str(needle);
      if (!/[A-Za-z]/.test(term)) return text.indexOf(term) + 1;
      return text.toLowerCase().indexOf(term.toLowerCase()) + 1;
    },
    numToChar: (code) => String.fromCharCode(num(code)),
    charToNum: (text) => str(text).charCodeAt(0) || 0,
    space: () => " ",

    /**
     * Gaps found by diffing against LibreShockwave's `BuiltinRegistry`, then
     * filtered to what VMK's own Lingo actually calls — see the call counts in
     * `docs/LINGO-EXPORT-STATUS.md`. Everything here had real call sites and was
     * silently unreachable.
     */
    callAncestor,
    /** ⚠ Director's bitNot is 32-bit two's complement; JS `~` already is. */
    bitNot: (v) => ~num(v),
    /** `power(base, exponent)` — used by the wire codec's `power(2, s)`. */
    power: (base, exponent) => Math.pow(num(base), num(exponent)),
    sin: (v) => new LingoFloat(Math.sin(num(v))) as unknown as LingoValue,
    cos: (v) => new LingoFloat(Math.cos(num(v))) as unknown as LingoValue,
    sqrt: (v) => new LingoFloat(Math.sqrt(num(v))) as unknown as LingoValue,
    /**
     * ⚠ `atan` WAS MISSING, and Pirates calls it EVERY FRAME: `CPiratesInterface.update`
     * -> `IsShootable` -> `AngleBetweenVectors` -> `arcCos` -> `atan`. The throw
     * killed the update loop behind it, so `#room_component` never updated and
     * no ship was ever drawn. Director's `atan(x)` takes one number (radians out).
     */
    atan: (v) => new LingoFloat(Math.atan(num(v))) as unknown as LingoValue,
    tan: (v) => new LingoFloat(Math.tan(num(v))) as unknown as LingoValue,
    exp: (v) => new LingoFloat(Math.exp(num(v))) as unknown as LingoValue,
    /**
     * `union(rectA, rectB)` / `intersect(rectA, rectB)`.
     *
     * ⚠ `union` is how dirty rectangles accumulate — `pUpdateRect = union(
     * pUpdateRect, m_rCacheRect)`. Missing, that read VOID and the damage region
     * was lost, so anything relying on it to schedule a redraw simply did not.
     * An empty intersection is Director's `rect(0,0,0,0)`, not VOID.
     */
    union: (a, b) => {
      const left = asRect(a);
      const right = asRect(b);
      if (!left) return (right ? b : VOID);
      if (!right) return a;
      return new LingoRect(
        Math.min(left.left, right.left), Math.min(left.top, right.top),
        Math.max(left.right, right.right), Math.max(left.bottom, right.bottom),
      ) as unknown as LingoValue;
    },
    intersect: (a, b) => {
      const left = asRect(a);
      const right = asRect(b);
      if (!left || !right) return new LingoRect(0, 0, 0, 0) as unknown as LingoValue;
      const box = new LingoRect(
        Math.max(left.left, right.left), Math.max(left.top, right.top),
        Math.min(left.right, right.right), Math.min(left.bottom, right.bottom),
      );
      return (box.right <= box.left || box.bottom <= box.top
        ? new LingoRect(0, 0, 0, 0)
        : box) as unknown as LingoValue;
    },
    /**
     * `duplicate(list)` — a COPY, and shallow, as Director's is. The method form
     * already exists on images and lists; only the global spelling was missing,
     * and `CCoreXMLNode` uses it to fork an attribute list before editing.
     */
    duplicate: (v) => {
      if (v instanceof LingoList) return new LingoList(v.toArray());
      if (v instanceof LingoPropList || v instanceof LingoImage) {
        return callMethod("duplicate", v);
      }
      return v;
    },
    /** `alert "text"` — the host's modal. Logged: a blocking dialog would stall the frame loop. */
    alert: (message) => {
      console.warn("[lingo alert]", str(message));
      return VOID;
    },

    // -- maths
    abs: (v) => Math.abs(num(v)),
    /**
     * `min`/`max` take either a LIST or loose arguments in Lingo, and VMK uses
     * both spellings. `CAnimationSprite.getFrameData` clamps a frame index with
     * `min(a, b)`, so an animating sprite dies on the first frame without it.
     */
    min: (...args) => {
      const values = args.length === 1 && args[0] instanceof LingoList
        ? (args[0] as LingoList).toArray()
        : args;
      return values.length === 0 ? 0 : Math.min(...values.map(num));
    },
    max: (...args) => {
      const values = args.length === 1 && args[0] instanceof LingoList
        ? (args[0] as LingoList).toArray()
        : args;
      return values.length === 0 ? 0 : Math.max(...values.map(num));
    },
    random: (n) => Math.floor(Math.random() * Math.max(1, num(n))) + 1,
    bitAnd: (a, b) => num(a) & num(b),
    bitOr: (a, b) => num(a) | num(b),
    bitXor: (a, b) => num(a) ^ num(b),

    // -- containers
    list: (...items) => {
      const result = new LingoList();
      for (const item of items) result.add(item);
      return result;
    },
    count: (v) => {
      if (v instanceof LingoList || v instanceof LingoPropList) return v.count;
      if (typeof v === "string") return v.length;
      return 0;
    },
    getaProp: (target, key) =>
      target instanceof LingoPropList ? target.getProp(key) : VOID,

    /**
     * ⚠ EVERY LIST OPERATION ALSO HAS A GLOBAL COMMAND FORM.
     *
     * Lingo spells these two ways, and they mean the same thing:
     *
     *   add tBytes, a        -- command form  -> callNamed("add", list, value)
     *   tBytes.add(a)        -- method form   -> callMethod("add", list, value)
     *
     * Only the method form was reachable, so any handler written in the command
     * form died on "Lingo handler not implemented: add/2". That is not a rare
     * spelling — it sits directly on the login path:
     *
     *   DoTheLogin -> getMachineID -> CDecoderRC4.Encipher -> add tBytes, a
     *
     * `_Hello` schedules DoTheLogin on a 500 ms timeout, the timeout fired, and
     * the handler threw before reaching its `send(…, "login", …)`. Nothing was
     * reported, because a throw inside a timeout callback is not a protocol
     * error — the connection just sat there with the handshake complete and no
     * login frame ever sent, which reads exactly like a server that stopped
     * answering.
     *
     * Delegating rather than reimplementing keeps the two spellings from ever
     * drifting apart.
     */
    ...listCommandBuiltins(),

    // -- value types
    point: (h, v) => new LingoPoint(num(h), num(v)),
    /**
     * `rect(left, top, right, bottom)` — and `rect(pointA, pointB)`, which
     * Director also accepts: two points meaning top-left and bottom-right.
     *
     * ⚠ THE TWO-POINT FORM IS HOW VMK PLACES EVERY UI COMPONENT ROW.
     * `CUIComponentPage.render` positions each child with
     *
     *     copyPixels(m_rImg, t_rImg, rect(t_pLoc, t_pLoc) + t_rImg.rect, …)
     *
     * Handling only the four-number form made `num(point)` NaN, so the whole
     * destination rect was NaN. That does not throw and does not warn: the
     * blit's `dw > 0` test is simply false for NaN, so the copy is SKIPPED.
     * Every row of every component page silently failed to draw, leaving just
     * the page's background colour.
     *
     * MEASURED on the registration name list: all five names arrive, five
     * components are built and each renders its own image, and none of them
     * reached the page — the list showed one stale caption on an amber slab.
     */
    /**
     * `propList(#k, v, #k2, v2, …)` — a property list from alternating pairs.
     *
     * 105 call sites, none of them reached during boot, which is why this was
     * never noticed: `callNamed` THROWS for an unregistered builtin, so every
     * one of them would have died the moment its screen opened. The chunk
     * scanner builds words this way — `propList(#word, tMem.word[i], #valid, 1)`
     * — so chat, name checking and the canned-text paths all depend on it.
     */
    propList: (...pairs) => new LingoPropList(pairs) as unknown as LingoValue,

    /**
     * `trace(…)` — Director's debug print. VMK leaves 46 of these in shipped
     * code paths, so it has to EXIST even though its output is incidental;
     * an unregistered builtin throws and takes the handler down with it.
     */
    trace: (...parts) => {
      // Routed through the same console the boot log uses, tagged so it is
      // clearly the game talking and not the port.
      console.log("[lingo trace]", ...parts.map((p) => str(p)));
      return VOID;
    },

    /**
     * `getPropRef(list, #key, index)` — a REFERENCE into a nested list, so that
     * mutating the result mutates the original:
     *
     *     addProp(getPropRef(m_mp_Framelist, #front, 1), #frames, …)
     *
     * Returning the stored value gives reference semantics for free, because
     * our lists and prop lists are objects. `index` selects among repeated
     * keys; 1 (or absent) means the first, which is every VMK call site.
     */
    getPropRef: (list, key, index) => {
      const container = list as {
        getProp?: (k: LingoValue) => LingoValue;
        getAt?: (i: number) => LingoValue;
      } | null;
      if (!container) return VOID;
      const at = num(index);
      if (typeof container.getProp === "function" && (at <= 1 || Number.isNaN(at))) {
        return container.getProp(key);
      }
      // A repeated key: walk positions and take the nth match.
      const asProps = list as unknown as LingoPropList;
      if (asProps instanceof LingoPropList) {
        let seen = 0;
        for (let i = 1; i <= asProps.count; i++) {
          if (String(asProps.getPropAt(i)) !== String(key)) continue;
          seen++;
          if (seen >= at) return asProps.getAt(i);
        }
      }
      return typeof container.getProp === "function" ? container.getProp(key) : VOID;
    },

    /** `pi` — Director's constant. */
    pi: () => Math.PI,
    /** `floor(x)`. Director rounds toward negative infinity, as JS does. */
    floor: (value) => Math.floor(num(value)),
    /** `log(x)` — Director's NATURAL log, not base 10. */
    log: (value) => Math.log(num(value)),
    /** `stopMovie` — the movie is the page here, so there is nothing to halt. */
    stopMovie: () => VOID,
    /** `urlEncode(s)` — percent-encoding for the query strings VMK builds. */
    urlEncode: (value) => encodeURIComponent(str(value)),
    /**
     * `offsetCaseSensitive(find, inside)` — like `offset` but exact-case.
     * Director returns the 1-based position, 0 when absent.
     */
    offsetCaseSensitive: (needle, haystack) =>
      str(haystack).indexOf(str(needle)) + 1,

    /**
     * `inside(point, rect)` in its FUNCTION form. The emitter usually renders
     * this as a method on the point (see `LingoPoint.inside`), but Director
     * spells it as a plain function and some call sites survive that way.
     */
    inside: (point, rect) => {
      const p = point as { inside?: (r: LingoValue) => number } | null;
      return typeof p?.inside === "function" ? p.inside(rect) : 0;
    },
    rect: (left, top, right, bottom) => {
      const asPoint = (value: LingoValue): { locH: number; locV: number } | null => {
        if (value === VOID || value === null || typeof value !== "object") return null;
        const p = value as { locH?: unknown; locV?: unknown };
        return typeof p.locH === "number" && typeof p.locV === "number"
          ? { locH: p.locH, locV: p.locV }
          : null;
      };
      const topLeft = asPoint(left);
      const bottomRight = asPoint(top);
      if (topLeft && bottomRight && right === undefined && bottom === undefined) {
        return new LingoRect(
          topLeft.locH, topLeft.locV, bottomRight.locH, bottomRight.locV,
        ) as unknown as LingoValue;
      }
      return new LingoRect(num(left), num(top), num(right), num(bottom)) as unknown as LingoValue;
    },
    /**
     * `rgb(r, g, b)` — and `rgb("#RRGGBB")`, which is the form VMK's UI uses.
     *
     * ⚠ Director accepts a HEX STRING as a single argument, and the component
     * definitions are written that way:
     *
     *     <COMPONENT … BGCOLOR="#001F56" COLOR="#001F56" ACTIVE="…">
     *
     * `CUIComponent.readDefinition` passes those straight to `rgb(t_sBgColor)`.
     * Handling only the three-number form meant `num("#001F56")` was NaN for
     * each channel and every such colour came back BLACK — which is why the
     * generated-name list rendered as a black slab. The five name rows were
     * built correctly the whole time (`m_ar_components` count=5); they were
     * drawn on black, in black.
     *
     * Also accepts "r,g,b" — `CMgrVariable.dump` can hand back a colour that way
     * — and clamps, because a malformed value should degrade to a visible colour
     * rather than to NaN, which paints as nothing at all.
     */
    rgb: (r, g, b) => {
      const channel = (value: LingoValue): number => {
        const parsed = num(value);
        return Number.isFinite(parsed) ? Math.min(255, Math.max(0, Math.round(parsed))) : 0;
      };
      if (typeof r === "string" && g === undefined) {
        const text = r.trim().replace(/^#/, "");
        if (/^[0-9a-f]{6}$/i.test(text)) {
          return new LingoColor(
            parseInt(text.slice(0, 2), 16),
            parseInt(text.slice(2, 4), 16),
            parseInt(text.slice(4, 6), 16),
          );
        }
        if (/^[0-9a-f]{3}$/i.test(text)) {
          const double = (hex: string): number => parseInt(hex + hex, 16);
          return new LingoColor(double(text[0]!), double(text[1]!), double(text[2]!));
        }
        const parts = text.split(",");
        if (parts.length === 3) {
          return new LingoColor(channel(parts[0]!), channel(parts[1]!), channel(parts[2]!));
        }
      }
      return new LingoColor(channel(r), channel(g), channel(b));
    },
    color: (a, b, c, d) => {
      const channel = (value: LingoValue): number => {
        const parsed = num(value);
        return Number.isFinite(parsed) ? Math.min(255, Math.max(0, Math.round(parsed))) : 0;
      };
      const kind = typeof a === "string" ? a.toLowerCase() : "";
      if (kind === "#rgb") return new LingoColor(channel(b), channel(c), channel(d));
      const index = kind === "#paletteindex" ? b : b === undefined ? a : undefined;
      if (index !== undefined) {
        const gray = 255 - channel(index);
        return new LingoColor(gray, gray, gray);
      }
      return new LingoColor(channel(a), channel(b), channel(c));
    },
    vector: (x, y, z) => new LingoVector(num(x), num(y), num(z)),
    /**
     * `image(w, h, depth[, palette])` allocates a buffer. ⚠ Director also uses
     * `the image of member` as a getter, so a single argument means "give me
     * that member's image", not "make one".
     */
    image: (...args) => {
      const [first, second, third, fourth] = args;
      if (args.length <= 1) {
        const holder = first as { image?: LingoValue } | undefined;
        return holder?.image ?? VOID;
      }
      {
        const made = new LingoImage(
          num(first), num(second), args.length > 2 ? num(third) : 32, fourth,
        );
        // Director's `image()` returns a WHITE buffer — see `markFreshAllocation`.
        made.markFreshAllocation();
        return made;
      }
    },

    /**
     * `artResident(member)` — 1 when the member's bitmap art is actually LOADED
     * (its image has a resident `source`), else 0, and kicks off the fetch so a
     * later call can succeed.
     *
     * ⚠ NOT a Director builtin. It exists so `CRoomFurniThumbRenderer._RenderFurniPreview`
     * can refuse to composite a furni/poster thumbnail or preview from art that
     * has not arrived yet. A cast bitmap's `.image` is a correctly-SIZED
     * placeholder whose `source` stays null until its PNG loads, so `extractAlpha`
     * on it returns a fully-OPAQUE plane — which bakes the renderer's black
     * backing buffer into an opaque black box (the "black around shop posters")
     * or a wrong/blank furni thumbnail, and the result is then CACHED and never
     * heals. `source` is the residency signal; `requestSource()` arms the load.
     * MEASURED: poster 3002 composited pre-residency = 2449 black / 0 transparent;
     * the same render once resident = 39 black / 2438 transparent (correct).
     */
    artResident: (member) => {
      const holder = member as { image?: unknown } | null;
      if (holder === null || holder === undefined || typeof holder !== "object") return 0;
      let img: unknown;
      try {
        img = holder.image;
      } catch {
        return 0;
      }
      if (!(img instanceof LingoImage)) return img === null || img === undefined ? 0 : 1;
      if (img.source !== null && img.source !== undefined) return 1;
      img.requestSource();
      return 0;
    },

    /**
     * `clearTransparent(image)` — clear a 32-bit image to fully TRANSPARENT.
     *
     * ⚠ Director's `_ShrinkToThumbnail` starts its thumb transparent with
     *
     *     t_rThumb = image(w, h, 32)                       -- fresh WHITE
     *     t_rBlack = image(w, h, 8, #grayscale)
     *     t_rBlack.fill(t_rBlack.rect, rgb(0, 0, 0))       -- display BLACK = alpha 0
     *     t_rThumb.setAlpha(t_rBlack)                      -- => fully transparent
     *
     * Our engine cannot express that: `setAlpha` reads the mask's reversed-CLUT
     * INDEX as coverage, and `fill(rgb(0,0,0))` writes index 255 (opaque), while
     * `fill(white)` writes index 0 which then trips the empty-mask bail — so a
     * uniform fill can only yield opaque-white or a no-op, never transparent.
     * (The index-space model is load-bearing for the avatar alpha pass, so it
     * must not be flipped.) The thumb therefore kept its fresh WHITE margins and
     * every furni thumbnail showed two vertical white lines flanking the item
     * (and empty-preview items came out solid white). This exposes the existing
     * `clearToTransparent` so the hand-corrected `_ShrinkToThumbnail` gets the
     * faithful transparent start. See [[member-duplicate-not-implemented]].
     */
    clearTransparent: (image) => {
      if (image instanceof LingoImage) image.clearToTransparent();
      return VOID;
    },

    // -- misc with no side effect worth modelling
    nothing: () => VOID,
    /**
     * `pass` — hand the event on to the next object in the message hierarchy.
     *
     * ⚠ It is the OPPOSITE of claiming an event, and our input plumbing reads a
     * truthy return as "the handler consumed this" (see
     * `dispatchToFocusedSprite`). Returning VOID is therefore the faithful
     * result: the handler explicitly declines, and the key or click carries on.
     *
     * 48 call sites, and it fired on ordinary clicks — every mouseDown/mouseUp
     * that reached a handler ending in `pass` threw
     * "Lingo handler not implemented: pass/0" and aborted the REST of that
     * handler, so whatever ran after the `pass` was silently lost.
     *
     * Director also walks on to the next object; we do not model that hierarchy,
     * and no VMK site depends on the continuation — they use `pass` to decline,
     * which is what this gives them.
     */
    pass: () => VOID,
    put: (...args) => {
      console.log("[lingo put]", ...args.map((a) => str(a)));
      return VOID;
    },
  });
}

// ---------------------------------------------------------------------------
// Dispatch, timers and preferences
// ---------------------------------------------------------------------------

/** Pending `timeout` objects, keyed by name. Exposed so a host can tick or clear them. */
export const lingoTimeouts = new Map<string, ReturnType<typeof setInterval>>();

/**
 * The sound channels handed out by `sound(n)`, one object per channel.
 *
 * Kept module-level so a channel keeps its volume/pan across calls; see the
 * `sound` builtin.
 */
const soundChannels = new Map<number, LingoValue>();

/**
 * The rest of the non-renderer surface: Lingo's dynamic dispatch (`call`,
 * `pass`, `param`), timer objects, and preference storage.
 *
 * These are separate from `registerPureBuiltins` because they are stateful —
 * timers schedule real work and preferences touch storage — so a test or a
 * headless tool can take the pure half alone.
 */
export function registerDispatchBuiltins(options?: {
  storage?: { getItem(key: string): string | null; setItem(key: string, value: string): void };
}): void {
  const storage = options?.storage ?? new Map<string, string>() as unknown as {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
  };
  const memory = new Map<string, string>();
  const get = (key: string): string | null =>
    typeof storage.getItem === "function" ? storage.getItem(key) : memory.get(key) ?? null;
  const set = (key: string, value: string): void => {
    if (typeof storage.setItem === "function") storage.setItem(key, value);
    else memory.set(key, value);
  };

  registerBuiltins({
    /**
     * `call(#handler, target, args...)` — the handler name arrives as a symbol
     * ("#foo" from our interning), so strip the sigil before dispatch. A list
     * target broadcasts to every element, which is how Lingo drives actorList.
     */
    call: (handlerSymbol, target, ...args) => {
      /**
       * ⚠ A MISSING HANDLER NAME IS A NO-OP, not an error.
       *
       * `CWindow.buildVisual` registers every element's procedure with the
       * handler left out — `registerProcedure(tSprite, VOID, getID(me), VOID)` —
       * so `CEventBroker.redirectEvent` ends up at
       *
       *     call(pProcList[tEvent][1], getObject(…), tEvent, id)
       *
       * with `[1]` VOID. It guards the TARGET on the line above but not the
       * name, which only makes sense if Director treats the call as harmless.
       *
       * Throwing instead meant every click on a sprite with no registered
       * procedure raised "method not found: null" — noise from ordinary clicks
       * on decorative elements.
       */
      if (handlerSymbol === VOID || handlerSymbol === null || handlerSymbol === undefined) {
        return VOID;
      }
      const name = str(handlerSymbol).replace(/^#/, "");
      if (name === "" || name === "null" || name === "undefined") return VOID;
      /**
       * ⚠ A BROADCAST SKIPS OBJECTS THAT DO NOT RESPOND — see
       * `objectRespondsTo`. VMK wraps a single element in a list exactly to get
       * this (`CWindow.redirectEvent`), so treating it as a strict call broke
       * every keystroke.
       */
      if (target instanceof LingoList) {
        let last: LingoValue = VOID;
        let answered = false;
        for (const item of target.items) {
          if (!objectRespondsTo(item, name)) continue;
          answered = true;
          last = callMethod(name, item, ...args);
        }
        /**
         * ⚠ NOBODY ANSWERING IS NOT A REFUSAL. A broadcast that reached no
         * responder returns 1, not VOID.
         *
         * `CWindow.redirectEvent` asks the element for the event's parameter
         * and treats the answer as a VETO check:
         *
         *     tParam = call(tEvent, [pElemList[tSprID]], tSprID)
         *     if tParam = 0 then return 0
         *
         * `CWindowImageWrapper` is the ONLY element class implementing
         * `mouseUp`/`mouseDown`; it answers with the click point, which is why
         * mouse events route at all. NOTHING in the game implements `keyDown`,
         * so this returned VOID, `VOID = 0` is true, and every keystroke was
         * refused — making the whole `#keyDown` arm registered by
         * `CRegPageBase.update` unreachable:
         *
         *     registerProcedure(m_rWindow, #_EventProc, getID(me), #keyDown)
         *
         * and with it `InactivateNameSelector` (typing clears a name picked
         * from the list), the `reg.char.not.allowed` dialog and the 18-char cap.
         * An element that does not implement the handler has not refused
         * anything, so it must not read as an explicit 0.
         *
         * ⚠ Deliberately narrow. Changing `VOID = 0` globally instead was TRIED
         * and reverted: the name list rendered empty, because the drawing code
         * leans on unset properties comparing equal to 0. This affects only a
         * list broadcast that reached nobody, which for every mouse path is
         * never the case.
         */
        return answered ? last : 1;
      }
      // ⚠ A property list is a valid target too, and Director sends to its
      // VALUES. VMK keys its element lists by element id — `CWindow.draw` is
      // `call(#draw, pElemList, tRGB)` — so without this the message went to the
      // list itself and every window failed to draw with "draw on propList".
      if (target instanceof LingoPropList) {
        let last: LingoValue = VOID;
        for (let i = 1; i <= target.count; i++) {
          const item = target.getAt(i);
          if (!objectRespondsTo(item, name)) continue;
          last = callMethod(name, item, ...args);
        }
        return last;
      }
      return callMethod(name, target, ...args);
    },

    stopEvent: () => VOID,

    /** `param(n)` is 1-based over the *calling* handler's arguments. */
    param: (index) => {
      // currentParams() while inside `param` itself is param's own argument
      // list, so step out one frame to reach the handler that asked.
      const frames = callFrames();
      const caller = frames[frames.length - 2] ?? [];
      return caller[num(index) - 1] ?? VOID;
    },

    /** `new(script "X")` / `new(#type)`. Script objects come from the host registry. */
    new: (target, ...args) => {
      if (target && typeof (target as { create?: unknown }).create === "function") {
        return callMethod("create", target, ...args);
      }
      return target;
    },

    timeout: (name) => {
      const key = str(name);
      /**
       * ⚠ THE HANDLER RECEIVES THE TIMEOUT OBJECT. This is not optional.
       *
       * Director invokes a timeout's handler as `handler(theTimeoutObject)`,
       * and VMK's dispatcher is built entirely around that argument:
       *
       *     CMgrTimeout.executeTimeOut(_me, tTimeout)
       *       repeat with i = 1 to pItemList.count
       *         if pItemList[i][#uniqueid] = tTimeout.name then …
       *
       * Calling the handler with NO argument made `tTimeout` VOID, so nothing
       * ever matched, `tID` stayed VOID, and every single firing fell into the
       * `forget(tTimeout)` branch and cancelled itself. The effect is that NO
       * Director timeout in the client ever ran its callback — not one, in the
       * whole boot — while `timeoutExists()` cheerfully answered true.
       *
       * That is why login never happened: `_Hello` creates `login_starter` to
       * retry `DoTheLogin` every 500 ms until the furnimaps land, and the retry
       * simply never ran. `login_starter` still existing AFTER
       * `m_bFurniMapsLoaded` reached 1 is the tell — `DoTheLogin` removes it on
       * success, so a surviving timeout proves the callback never fired.
       *
       * The object handed back is the SAME one `timeout(name)` returns, because
       * the dispatcher reads `.name` off it and may call `.forget()` on it.
       */
      const self = {
        // Director's type for this is `#timeout`. Answering `#instance` makes
        // `CMgrObject.create` chain an ancestor onto it; see `LINGO_ILK`.
        [LINGO_ILK]: "timeout",
        name: key,
        period: 0,
        persistent: 1,
        target: VOID as LingoValue,
        timeoutHandler: "" as LingoValue,
        new: (period: LingoValue, handler: LingoValue, target: LingoValue) => {
          const handlerName = str(handler).replace(/^#/, "");
          self.period = Math.max(1, num(period));
          self.target = target;
          self.timeoutHandler = handler;
          // Replace rather than stack: `timeout("x").new(…)` twice is one timer
          // in Director, and a leaked interval here fires forever against an
          // object VMK has already forgotten.
          const existing = lingoTimeouts.get(key);
          if (existing) clearInterval(existing);
          const timer = setInterval(
            () => callMethod(handlerName, target, self as unknown as LingoValue),
            self.period,
          );
          lingoTimeouts.set(key, timer);
          return self as unknown as LingoValue;
        },
        forget: () => {
          const timer = lingoTimeouts.get(key);
          if (timer) clearInterval(timer);
          lingoTimeouts.delete(key);
          return VOID;
        },
      };
      return self as unknown as LingoValue;
    },

    /**
     * Director's sound channels — `sound(1)` … `sound(8)`.
     *
     * ⚠ The SAME object per channel, every call. VMK stores channel references
     * (`CSoundChannelObject.m_r_SndChannel`) and compares them with `objectp`,
     * so a fresh object per lookup would lose every setting and make those
     * comparisons meaningless. `lingo-sound` keeps the state; this only tags it
     * as a native Lingo value and caches the wrapper.
     *
     * These used to be state-only stubs that played nothing. They now drive
     * real audio — see `lingo-sound.ts`, and note the autoplay caveat there.
     */
    sound: (channel) => {
      const index = num(channel);
      const existing = soundChannels.get(index);
      if (existing) return existing;
      const created = soundChannelFor(index);
      Object.defineProperty(created, LINGO_NATIVE, { value: true });
      Object.defineProperty(created, LINGO_ILK, { value: "soundChannel" });
      soundChannels.set(index, created);
      return created;
    },

    getPref: (name) => {
      const value = get(str(name));
      return value === null ? VOID : value;
    },
    setPref: (name, value) => {
      set(str(name), str(value));
      return VOID;
    },
  });
}







