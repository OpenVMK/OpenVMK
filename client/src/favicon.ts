/**
 * The tab icon is the player's own avatar head while they are logged in.
 *
 * The head is drawn by VMK's own avatar code, not by a renderer of ours:
 * `CAvatarAnimator` is the class the boat rides and the checkers lobby use for a
 * one-off avatar picture, and its renderer already knows how to draw only the
 * head (`DrawOnlyHead` keeps hd/fc/ey/hr/ht and crops to the top 100px).
 *
 * ⚠ `SetAction(#onlyhead: 1)` cannot be used as-is: it calls `DrawOnlyHead()`
 * with NO argument, which sets the flag to VOID, so the renderer draws the whole
 * body and `SetAction` then crops a head-and-shoulders strip. The steps of
 * `SetAction` are done here instead, with `DrawOnlyHead(1)`.
 *
 * The figure comes from two places. `/play` injects the one stored in the
 * database as `window.__VMK_FIGURE`, so the icon appears at login, on the park
 * map, before any room. Once the player is in a room, the room's own avatar —
 * `GetVisual().GetOutlook()` of the one the session names as `room_own_avatar`
 * — takes over, so the icon follows outfit changes made this session.
 */
import { LingoImage } from "./lingo/lingo-builtins.js";
import {
  callMethod,
  callNamed,
  LingoList,
  LingoPropList,
  meProp,
  setMeProp,
  symbol,
  type LingoValue,
} from "./lingo/lingo-runtime.js";

const POLL_MS = 2000;
/** Head and body facing the viewer, as the boat rides render their riders. */
const FACING = 3;

type Pending = { key: string; animator: LingoValue; since: number };

let link: HTMLLinkElement | null = null;
let shownKey = "";
let pending: Pending | null = null;
/** The last figure the room showed; newer than the database's once set. */
let roomFigure: number[] | null = null;

declare global {
  interface Window {
    __VMK_FIGURE?: number[];
  }
}

/** What `/play` read from the database for this account, if anything. */
function storedFigure(): number[] | null {
  const figure = window.__VMK_FIGURE;
  return Array.isArray(figure) && figure.length > 0 ? figure.map(Number) : null;
}

/** `handle_userdata` names the session once the server has accepted the login. */
function loggedIn(): boolean {
  try {
    const session = callNamed("getObject", symbol("session"));
    if (!callNamed("objectp", session)) return false;
    const name = callMethod("get", session, "name");
    return typeof name === "string" && name !== "";
  } catch {
    return false;
  }
}

function roomOutlook(): number[] | null {
  try {
    const session = callNamed("getObject", symbol("session"));
    if (!callNamed("objectp", session)) return null;
    const ref = callMethod("get", session, "room_own_avatar");
    if (ref === undefined || ref === null) return null;
    const room = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
    if (!callNamed("objectp", room)) return null;
    const avatar = callMethod("_AccessIndexed", room, ref, "avatar");
    if (!callNamed("objectp", avatar)) return null;
    const outlook = callMethod("GetOutlook", callMethod("GetVisual", avatar)) as unknown;
    if (!(outlook instanceof LingoList) || outlook.count === 0) return null;
    return outlook.toArray().map(Number);
  } catch {
    return null;
  }
}

function startRender(outlook: number[]): Pending | null {
  try {
    // ⚠ `CAvatarAnimator.Define` only asks for clothes, never the hair/head
    // sets — it relies on a room's `SetOutlook` having loaded them. On the park
    // map nothing has, and the head waits forever; so load them the same way.
    const assets = callMethod(
      "GetClothAssetManager",
      (callNamed("getThread", symbol("AvatarFactory")) as { component?: LingoValue }).component,
    );
    for (const cloth of outlook) callMethod("LoadCastLibsForCloth", assets, undefined, cloth);
    const animator = callNamed("createObject", symbol("temp"), "CAvatarAnimator");
    if (!callNamed("objectp", animator)) return null;
    callMethod(
      "Define",
      animator,
      new LingoPropList([symbol("outlook"), new LingoList(outlook), symbol("tilesize"), 32]),
    );
    return { key: outlook.join(","), animator, since: Date.now() };
  } catch {
    return null;
  }
}

/**
 * `CAvatarAnimator.SetAction`, head only. Null until the clothes are in.
 *
 * ⚠ The head-only crop exists ONLY in `CAvatarAnimatorRenderer.render`'s return
 * value. `update` throws that away and paints the whole body into the sprite
 * (into a fresh blank `image(80, 160)` first — reading the member too early
 * gives a white block), so `render` is called directly. `update`'s other half,
 * `prepare`, only animates (and blinks at random), so it is skipped.
 */
function finishRender(animator: LingoValue): LingoImage | null {
  if (!meProp(animator as never, "m_bAllClothesLoaded")) return null;
  const factor = meProp(animator as never, "m_ObjRenderer");
  if (!meProp(factor as never, "m_bNeededClothesLoaded")) {
    callMethod("CheckClothesLoaded", factor);
    if (!meProp(factor as never, "m_bNeededClothesLoaded")) return null;
  }
  callMethod("Action", factor, new LingoList([FACING, FACING, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  callMethod("DrawOnlyHead", factor, 1);
  const renderer = meProp(factor as never, "m_ObjRenderer");
  setMeProp(renderer as never, "m_bChanges", 1);
  const image = callMethod("render", renderer);
  return image instanceof LingoImage ? image : null;
}

/** Release the reserved sprite and the registration `Define` made. */
function dispose(animator: LingoValue): void {
  try {
    callMethod("deconstruct", meProp(animator as never, "m_ObjRenderer"));
    callMethod("deconstruct", animator);
    callNamed("unregisterObject", callMethod("getID", animator));
  } catch {
    // Best effort: a leaked temp object is harmless, a throw here is not.
  }
}

/** The opaque pixels, trimmed and centred on a square. */
function toIcon(image: LingoImage): string | null {
  const rgba = image.readRgba();
  if (!rgba) return null;
  const { width, height } = image;
  let top = height, left = width, bottom = -1, right = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] === 0) continue;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }
  if (bottom < 0) return null;
  const w = right - left + 1;
  const h = bottom - top + 1;
  const size = Math.max(w, h);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return null;
  const pixels = context.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const from = ((top + y) * width + left) * 4;
    pixels.data.set(rgba.subarray(from, from + w * 4), y * w * 4);
  }
  context.putImageData(pixels, Math.floor((size - w) / 2), size - h);
  return canvas.toDataURL("image/png");
}

function show(href: string | null): void {
  if (href === null) {
    link?.remove();
    link = null;
    return;
  }
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    document.head.appendChild(link);
  }
  link.href = href;
}

function poll(): void {
  const now = Date.now();
  if (!loggedIn()) {
    if (shownKey) show(null);
    roomFigure = null;
    shownKey = "";
    return;
  }
  roomFigure = roomOutlook() ?? roomFigure;
  const outlook = roomFigure ?? storedFigure();
  if (!outlook) return;
  const key = outlook.join(",");

  if (pending && pending.key !== key) {
    dispose(pending.animator);
    pending = null;
  }
  if (key === shownKey && !pending) return;
  pending ??= startRender(outlook);
  if (!pending) return;

  try {
    const image = finishRender(pending.animator);
    if (!image) {
      // Clothes that never arrive must not pin a temp object forever.
      if (now - pending.since > 60000) {
        dispose(pending.animator);
        pending = null;
      }
      return;
    }
    const href = toIcon(image);
    if (href) {
      show(href);
      shownKey = key;
    }
  } catch {
    // Retried on the next poll with a fresh animator.
  }
  dispose(pending.animator);
  pending = null;
}

export function startAvatarFavicon(): void {
  setInterval(poll, POLL_MS);
}
