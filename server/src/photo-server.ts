/**
 * THE PHOTO SOCKET. VMK moves pictures over a SECOND connection, not the game
 * one: `Binary_Manager_Class` (cast 0e4fee) opens the Multiuser Xtra in MUS
 * mode at `connection.mus.host:port` and exchanges subject + content messages,
 * the content being a string or a Lingo value (a property list carrying a
 * photo as `media`). Disney ran it as its own server on port 30001.
 *
 * Here it is `/photo` on the game server's WebSocket. We own both ends, so
 * the frames are JSON (client/src/lingo/lingo-net.ts `WireValue`), and a
 * photo is its 8-bit sepia palette indices, which we store and return as they
 * came. Real Shockwave speaks the binary MUS format and cannot use this.
 *
 * What the client sends, and what each step needs back (subject, content):
 *
 *   LOGIN <token>                   (no reply; token from `2010` at game login)
 *   SAVE_PICTURE_CAPTION "/"        PICTURE_CAPTION_RECEIVED "1"
 *   SAVE_THUMBNAIL [#image, …]      THUMBNAIL_RECEIVED "<id> <cs>"
 *   SAVE_PICTURE   [#image, …]      PICTURE_SAVED "<id> <cs>"   (film -1)
 *   REQUEST_THUMBNAIL <id>          THUMBNAIL_INFO "<id>", THUMBNAIL [#image]
 *   REQUEST_CATALOG_PHOTO <id>      CATALOG_PHOTO_INFO "<id> <inAlbum> <caption>",
 *   REQUEST_QUEST_PHOTO <id>          then CATALOG_PHOTO [#image]
 *   REQUEST_NEXT_ALBUM_PHOTO <id>   ALBUM_PHOTO_INFO "<id> 0 <caption>", ALBUM_PHOTO
 *   REQUEST_PREVIOUS_ALBUM_PHOTO    …or ALBUM_EMPTY
 *   REQUEST_WALL_PHOTO <id>         WALL_PHOTO_INFO "<id> 0 <caption>", WALL_PHOTO
 *
 * ⚠ ORDER MATTERS. The client's queue ties each reply to the request at its
 * head: an *_INFO keeps the task, the data (or EMPTY) removes it. Send INFO
 * then data, always both.
 */
import { randomBytes } from "node:crypto";
import {
  createPendingPhoto,
  getCamera,
  getPhoto,
  getPhotos,
  setPhotoPixels,
  setPhotoThumb,
  useFilm,
  type Photo,
} from "./db.js";

type WireValue =
  | { t: "s"; v: string }
  | { t: "n"; v: number }
  | { t: "y"; v: string }
  | { t: "l"; v: WireValue[] }
  | { t: "p"; v: Array<[WireValue, WireValue]> }
  | { t: "m"; w: number; h: number; d: string }
  | { t: "v" };

/** Photo-socket login tokens -> user. Minted per game login (`2010 SaveSessionId`). */
const tokens = new Map<string, number>();

export function issuePhotoToken(userId: number): string {
  for (const [token, owner] of tokens) if (owner === userId) tokens.delete(token);
  const token = randomBytes(12).toString("hex");
  tokens.set(token, userId);
  return token;
}

export interface PhotoSocketDeps {
  /** Whose album a Photo Album in this player's current room shows: the room owner. */
  albumOwnerFor(userId: number): number | null;
  /** The player's film changed (their camera window shows it). */
  filmChanged(userId: number, film: number): void;
  log(line: string): void;
}

const str = (v: string): WireValue => ({ t: "s", v });
const media = (w: number, h: number, bytes: Uint8Array): WireValue => ({
  t: "m",
  w,
  h,
  d: Buffer.from(bytes).toString("base64"),
});
const imageList = (value: WireValue): WireValue => ({ t: "p", v: [[{ t: "y", v: "image" }, value]] });

/** The `#image` media out of a `[#image: …, #time: …, #cs: …]` upload. */
function uploadedImage(content: WireValue): { w: number; h: number; bytes: Uint8Array } | null {
  if (content.t !== "p") return null;
  for (const [k, v] of content.v) {
    if (k.t === "y" && k.v.toLowerCase() === "image" && v.t === "m") {
      const bytes = new Uint8Array(Buffer.from(v.d, "base64"));
      // The camera only ever makes indices 1..64 (`(255 - avg) / 4 + 1`), so
      // a 0 or anything above 64 is a broken capture, not a photo. The first
      // test shot, taken before the stage could be read, was all 0: pure white,
      // which the catalog's thumbnail ink draws as nothing at all, leaving an
      // invisible photo nobody could click to delete.
      const valid = bytes.every((b) => b >= 1 && b <= 64);
      if (valid && v.w > 0 && v.h > 0 && v.w <= 1024 && v.h <= 1024 && bytes.length === v.w * v.h) {
        return { w: v.w, h: v.h, bytes };
      }
    }
  }
  return null;
}

const text = (content: WireValue): string =>
  content.t === "s" ? content.v : content.t === "n" ? String(content.v) : "";

/** One photo-socket connection. `send` writes a JSON text frame. */
export function createPhotoSession(send: (json: string) => void, remote: string, deps: PhotoSocketDeps) {
  let userId: number | null = null;
  let caption = "";
  /** The photo row the THUMBNAIL created, which the PICTURE then fills. */
  let pending: number | null = null;

  const reply = (subject: string, content: WireValue) => send(JSON.stringify({ subject, content }));
  const info = (subject: string, photo: Photo, second: number) =>
    reply(subject, str(`${photo.id} ${second} ${photo.caption}`.trimEnd()));

  const handle = (subject: string, content: WireValue): void => {
    const verb = subject.toUpperCase();
    if (verb === "LOGIN") {
      userId = tokens.get(text(content).trim()) ?? null;
      deps.log(`[photo] ${remote} login ${userId === null ? "REFUSED (unknown token)" : `user ${userId}`}`);
      if (userId === null) reply("BINDATA_AUTHKEYERROR", str("0"));
      return;
    }
    if (userId === null) {
      reply("BINDATA_AUTHKEYERROR", str("0"));
      return;
    }
    const me = userId;
    const id = Number(text(content).trim());

    switch (verb) {
      case "SAVE_PICTURE_CAPTION": {
        // `storePicture` sends "SAVE_PICTURE_CAPTION /<text>"; the camera
        // always passes EMPTY, so this is "/". The real caption comes by 766.
        caption = text(content).replace(/^\s*\//, "").trim();
        reply("PICTURE_CAPTION_RECEIVED", str("1"));
        return;
      }
      case "SAVE_THUMBNAIL": {
        const image = uploadedImage(content);
        if (!image || getCamera(me).film <= 0) {
          deps.log(`[photo] user ${me}: thumbnail refused (${image ? "no film" : "bad image"})`);
          reply("BINDATA_AUTHKEYERROR", str("0"));
          return;
        }
        pending = createPendingPhoto(me, caption);
        setPhotoThumb(pending, image.w, image.h, image.bytes);
        reply("THUMBNAIL_RECEIVED", str(`${pending} 0`));
        return;
      }
      case "SAVE_PICTURE": {
        const image = uploadedImage(content);
        if (!image || pending === null || !useFilm(me)) {
          deps.log(`[photo] user ${me}: picture refused (${!image ? "bad image" : pending === null ? "no thumbnail first" : "no film"})`);
          reply("BINDATA_AUTHKEYERROR", str("0"));
          return;
        }
        setPhotoPixels(pending, image.w, image.h, image.bytes);
        reply("PICTURE_SAVED", str(`${pending} 0`));
        deps.log(`[photo] user ${me}: saved photo ${pending} (${image.w}x${image.h})`);
        deps.filmChanged(me, getCamera(me).film);
        pending = null;
        return;
      }
      case "REQUEST_THUMBNAIL": {
        const photo = getPhoto(id);
        if (!photo || photo.ownerId !== me || !photo.thumb) {
          reply("THUMBNAIL_INFO", str(String(id)));
          reply("THUMBNAIL", imageList(media(1, 1, new Uint8Array([0]))));
          return;
        }
        reply("THUMBNAIL_INFO", str(String(photo.id)));
        reply("THUMBNAIL", imageList(media(photo.thumbWidth, photo.thumbHeight, photo.thumb)));
        return;
      }
      case "REQUEST_CATALOG_PHOTO":
      case "REQUEST_QUEST_PHOTO": {
        const photo = getPhoto(id);
        if (!photo || photo.ownerId !== me || photo.width === 0) {
          reply("CATALOG_PHOTO_INFO", str(`${id} 0`));
          reply("CATALOG_PHOTO", imageList(media(1, 1, new Uint8Array([0]))));
          return;
        }
        info("CATALOG_PHOTO_INFO", photo, photo.place === "album" ? 1 : 0);
        reply("CATALOG_PHOTO", imageList(media(photo.width, photo.height, photo.pixels)));
        return;
      }
      case "REQUEST_NEXT_ALBUM_PHOTO":
      case "REQUEST_PREVIOUS_ALBUM_PHOTO": {
        // The album item never sends its ref: the album shown is the one
        // belonging to the owner of the room it stands in.
        const owner = deps.albumOwnerFor(me);
        const album = owner === null ? [] : getPhotos(owner, "album").filter((p) => p.width > 0);
        if (album.length === 0) {
          reply("ALBUM_EMPTY", str("0"));
          return;
        }
        const at = album.findIndex((p) => p.id === id);
        const forward = verb === "REQUEST_NEXT_ALBUM_PHOTO";
        // -1 (just opened) starts at the first; both ends wrap around.
        const next =
          at < 0 ? 0 : forward ? (at + 1) % album.length : (at - 1 + album.length) % album.length;
        const photo = album[next];
        info("ALBUM_PHOTO_INFO", photo, 0);
        reply("ALBUM_PHOTO", imageList(media(photo.width, photo.height, photo.pixels)));
        return;
      }
      case "REQUEST_WALL_PHOTO": {
        const photo = getPhoto(id);
        if (!photo || photo.place !== "wall" || photo.width === 0) {
          reply("WALL_PHOTO_INFO", str(`${id} 0`));
          reply("WALL_PHOTO", imageList(media(1, 1, new Uint8Array([0]))));
          return;
        }
        info("WALL_PHOTO_INFO", photo, 0);
        reply("WALL_PHOTO", imageList(media(photo.width, photo.height, photo.pixels)));
        return;
      }
      default:
        deps.log(`[photo] user ${me}: unhandled ${subject}`);
    }
  };

  return {
    feed(textFrame: string): void {
      let frame: { subject?: string; content?: WireValue };
      try {
        frame = JSON.parse(textFrame);
      } catch {
        return;
      }
      handle(String(frame.subject ?? ""), frame.content ?? { t: "v" });
    },
  };
}
