/**
 * Item pictures for Housekeeping, built from the extracted casts.
 *
 * There are no ready-made inventory icons for most things, so this resolves an
 * item code to the SPRITE LAYERS the game itself would draw, and the portal's
 * page composes them on a canvas:
 *
 *   pins / posters  one bitmap, `item_<code>` (shared pin/poster casts)
 *   furniture       the furnimap's sprites for one facing, each placed at its
 *                   block's isometric offset plus the SPR's own X/Y — exactly
 *                   what `CRoomFurniThumbRenderer` composes (DIR 5 first)
 *   clothing        `CClothesPreviewRenderer.RenderClothesPreview`: every part
 *                   of the set, `std_<part>_<model>_<dir>_0` (dir 4 for tops,
 *                   3 otherwise, falling back to 3), tinted by the set's first
 *                   colour — the art is pale greyscale meant for ink 41
 *
 * Built lazily on first request: one pass over ~4,300 manifests (~1 s), then
 * cached for the life of the process.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { figureSetsFile } from "./avatar-sets.js";
import { downloadFile } from "./paths.js";

const here = dirname(fileURLToPath(import.meta.url));
const REPO = join(here, "..", "..");
const CASTS = join(REPO, "client", "assets", "casts");

interface Member {
  cast: string;
  png: string;
  regX: number;
  regY: number;
}

export interface IconLayer {
  /** Served by the asset server's /casts/ route. */
  url: string;
  regX: number;
  regY: number;
  /** Where the registration point lands, relative to the item's anchor. */
  x: number;
  y: number;
  flip?: boolean;
  /** Ink 41 colour for clothing, `#rrggbb`. */
  tint?: string;
  /** Director ink; 8/36 key out a white background on art without alpha. */
  ink?: number;
}

export interface IconSpec {
  code: number;
  kind: "single" | "furni" | "clothing" | "none";
  layers: IconLayer[];
}

let members: Map<string, Member[]> | null = null;

/** One cast's manifest into the index. */
function addManifest(into: Map<string, Member[]>, cast: string, text: string): void {
  for (const line of text.split("\n")) {
    const c = line.split("\t");
    // member_id, member_type, member_name, script_id, chunk_id, fourcc, asset_path, reg_x, reg_y
    if (c[1] !== "bitmap" || !c[6]?.endsWith(".png")) continue;
    const name = c[2];
    // rooms.bg.<code>: the guest-room pictures in the shop (`roomIconFor`).
    if (!name || !/^(item_|std_|poster_|rooms\.bg\.)/.test(name)) continue;
    let list = into.get(name);
    if (!list) into.set(name, (list = []));
    list.push({ cast, png: c[6], regX: Number(c[7]) || 0, regY: Number(c[8]) || 0 });
  }
}

/**
 * ⚠ Reads EVERY cast's manifest — 4,300+ files, ~3.5 s warm and longer from a
 * cold disk. Done synchronously on first use (as it once was), that froze the
 * WHOLE web server — logins, the game client, its art — and was why the first
 * /hk profile load always hung. `warmIcons()` now builds it in the background
 * at startup and /hk awaits it; this synchronous path is only the fallback for
 * a caller that skipped the await.
 */
function index(): Map<string, Member[]> {
  if (members) return members;
  const built = new Map<string, Member[]>();
  if (existsSync(CASTS)) {
    for (const cast of readdirSync(CASTS)) {
      const file = join(CASTS, cast, "manifest.tsv");
      if (existsSync(file)) addManifest(built, cast, readFileSync(file, "latin1"));
    }
  }
  console.log(`[hk-icons] indexed ${built.size} item/clothing/room bitmaps (blocking fallback)`);
  return (members = built);
}

let warming: Promise<void> | null = null;

/**
 * Build the bitmap index without blocking: manifests are read concurrently off
 * the main thread, and each is parsed between reads, so requests keep being
 * served. Safe to call repeatedly; resolves once the index is ready.
 */
export function warmIcons(): Promise<void> {
  if (members) return Promise.resolve();
  warming ??= (async () => {
    const started = Date.now();
    const built = new Map<string, Member[]>();
    let casts: string[] = [];
    try {
      casts = await readdir(CASTS);
    } catch {
      /* no extracted casts — an empty index, as the sync path gives */
    }
    let next = 0;
    const worker = async () => {
      while (next < casts.length) {
        const cast = casts[next++];
        try {
          addManifest(built, cast, await readFile(join(CASTS, cast, "manifest.tsv"), "latin1"));
        } catch {
          /* not a cast folder, or no manifest */
        }
      }
    };
    await Promise.all(Array.from({ length: 16 }, worker));
    // A blocking caller may have raced us; keep whichever finished first.
    members ??= built;
    console.log(`[hk-icons] indexed ${members.size} item/clothing/room bitmaps in ${Date.now() - started} ms (background)`);
  })();
  return warming;
}

/** The copy of a member to use: from a preferred cast if one has it. */
function member(name: string, prefer: (cast: string) => boolean = () => false): Member | undefined {
  const list = index().get(name);
  if (!list || list.length === 0) return undefined;
  return list.find((m) => prefer(m.cast)) ?? list[0];
}

const urlOf = (m: Member) => `/casts/${m.cast}/${m.png}`;

/* ---------------------------------------------------------------- furnimap */

interface FurniSprite {
  gfx: string;
  bx: number;
  by: number;
  x: number;
  y: number;
  z: number;
  flip: boolean;
  ink: number;
  /** `BGC` — the Darken (ink 41) colour that makes "Color Black" black. */
  bgc?: string;
}

let furnimap: Map<number, { tileSize: number; dirs: Map<number, FurniSprite[]> }> | null = null;

function furni() {
  if (furnimap) return furnimap;
  furnimap = new Map();
  // ⚠ Same pages, same order, as furni-footprint.ts — first definition wins.
  // Overlay first via `downloadFile`: a release ships no archive, so reading
  // the archive path left every furniture picture blank there.
  const files = [
    process.env.VMK_FURNIMAP,
    downloadFile("furnituremaps.0-99_2"),
    join(REPO, "assets", "furnimaps", "furnimaps_consolidated.xml"),
  ].filter((p): p is string => Boolean(p) && existsSync(p!));
  const xml = files.map((f) => readFileSync(f, "latin1")).join("\n");
  for (const item of xml.matchAll(/<ITEM\s([^>]*)>([\s\S]*?)<\/ITEM>/g)) {
    const code = Number(/CODE="(\d+)"/.exec(item[1])?.[1]);
    if (!Number.isInteger(code) || furnimap.has(code)) continue;
    const dirs = new Map<number, FurniSprite[]>();
    for (const dir of item[2].matchAll(/<DIR\s+NUM="(\d+)"\s*>([\s\S]*?)(?=<DIR\s|$)/g)) {
      const sprites: FurniSprite[] = [];
      for (const blk of dir[2].matchAll(/<BLK((?:\s[^>]*?)?)\/?>([\s\S]*?)(?=<BLK|<\/DIR|$)/g)) {
        const battr = (n: string) => Number(new RegExp(`\\b${n}="([^"]*)"`).exec(blk[1] ?? "")?.[1] ?? 0);
        for (const spr of blk[2].matchAll(/<SPR\s([^>]*)>/g)) {
          const a = (n: string) => new RegExp(`\\b${n}="([^"]*)"`).exec(spr[1])?.[1];
          const gfx = a("GFX");
          if (!gfx) continue;
          sprites.push({
            gfx,
            bx: battr("X"),
            by: battr("Y"),
            x: Number(a("X") ?? 0),
            y: Number(a("Y") ?? 0),
            z: Number(a("Z") ?? 0),
            flip: a("FLP") === "1",
            ink: Number(a("INK") ?? 0),
            bgc: /^[0-9a-f]{6}$/i.test(a("BGC") ?? "") ? `#${a("BGC")!.toLowerCase()}` : undefined,
          });
        }
      }
      if (sprites.length) dirs.set(Number(dir[1]), sprites);
    }
    if (dirs.size) {
      furnimap.set(code, { tileSize: Number(/\bTILESIZE="(\d+)"/.exec(item[1])?.[1] ?? 0), dirs });
    }
  }
  return furnimap;
}

function furniIcon(code: number): IconLayer[] {
  const item = furni().get(code);
  if (!item) return [];
  // DIR 5 is what the shop thumbnail draws; fall back through the others.
  const order = [5, 3, 1, 7, ...item.dirs.keys()];
  const dir = order.find((d) => item.dirs.has(d));
  if (dir === undefined) return [];
  const sprites = [...item.dirs.get(dir)!].map((s, i) => ({ s, i }));
  sprites.sort((p, q) => p.s.z - q.s.z || p.i - q.i);
  const layers: IconLayer[] = [];
  for (const { s } of sprites) {
    const m = member(s.gfx, (cast) => cast === `item_${code}`);
    if (!m) continue;
    // A block's tile offset in screen space; the SPR X/Y then shifts from
    // there. For the common case they cancel exactly (item 717: block 1,0
    // carries SPR -32,-16), which is what places every piece at one anchor.
    layers.push({
      url: urlOf(m),
      regX: m.regX,
      regY: m.regY,
      x: (s.bx - s.by) * 32 + s.x,
      y: (s.bx + s.by) * 16 + s.y,
      flip: s.flip || undefined,
      ink: s.ink || undefined,
      // VMK colours furniture with Darken: a pale tint layer multiplied by the
      // sprite's bgColor. Without it every colour variant draws the same grey.
      tint: s.ink === 41 ? s.bgc : undefined,
    });
  }
  return layers;
}

/* ---------------------------------------------------------------- clothing */

interface Figure {
  setList: Map<number, { parts: number[]; colours: number[] }>;
  contents: Map<string, string[]>;
  colours: Map<number, string>;
  casts: Map<number, string[]>;
}
let figure: Figure | null = null;

function figureSets(): Figure {
  if (figure) return figure;
  figure = { setList: new Map(), contents: new Map(), colours: new Map(), casts: new Map() };
  // ⚠ The SAME file the game reads — overlay before archive, via `downloadFile`
  // (see avatar-sets.ts). A bespoke list here once put the archive first, so
  // edits made only to the overlay copy (the surf-shirt SetList entries) were
  // invisible to Housekeeping while the game drew them fine.
  const source = figureSetsFile();
  if (!source) return figure;
  const text = readFileSync(source, "latin1");
  const line = (key: string) => new RegExp(`^${key}\\s*=(.*)$`, "m").exec(text)?.[1] ?? "";
  for (const e of line("SetList").matchAll(/"(\d+)":\s*\[\[([^\]]*)\],\s*\[([^\]]*)\]\]/g)) {
    const nums = (s: string) => s.split(",").map((n) => Number(n.trim())).filter(Number.isFinite);
    figure.setList.set(Number(e[1]), { parts: nums(e[2]), colours: nums(e[3]) });
  }
  for (const e of line("SetContents").matchAll(/"(\w+)":\s*\[([^\]]*)\]/g)) {
    figure.contents.set(e[1], [...e[2].matchAll(/"(\w+)"/g)].map((m) => m[1]));
  }
  // ⚠ `ColorList=[1:"EEEEEE",…]` — the keys are BARE numbers, unlike every
  // other list in the file. Requiring quotes matched nothing, and every
  // garment drew in its untinted greyscale.
  for (const e of line("ColorList").matchAll(/"?(\d+)"?\s*:\s*"#?([0-9A-Fa-f]{6})"/g)) {
    figure.colours.set(Number(e[1]), `#${e[2].toLowerCase()}`);
  }
  for (const e of line("CastList").matchAll(/"(\d+)":\s*\[([^\]]*)\]/g)) {
    figure.casts.set(Number(e[1]), [...e[2].matchAll(/"([^"]+)"/g)].map((m) => m[1]));
  }
  return figure;
}

/** `CClothesPreviewRenderer.GetSetName`. */
function setType(id: number): string | undefined {
  const band = Math.floor(((id - 20000) % 10000) / 1000);
  if (id < 20000 || id >= 50000) return undefined;
  return ({ 0: "hr", 1: "ht", 2: "hd", 3: "hd", 4: "ch", 5: "ch", 6: "pn", 7: "pn", 8: "sh", 9: "sh" } as Record<number, string>)[band];
}

function clothingIcon(id: number): IconLayer[] {
  const fig = figureSets();
  const set = fig.setList.get(id);
  const type = setType(id);
  if (!set || !type) return [];
  const partNames = fig.contents.get(type) ?? [type];
  const dir = type === "ch" ? 4 : 3;
  const tint = fig.colours.get(set.colours[0] ?? -1);
  const casts = new Set((fig.casts.get(id) ?? []).map((c) => `vmk_avatar_${c}`));
  const layers: IconLayer[] = [];
  partNames.forEach((part, i) => {
    const model = set.parts[i];
    if (model === undefined) return;
    const m =
      member(`std_${part}_${model}_${dir}_0`, (c) => casts.has(c)) ??
      member(`std_${part}_${model}_3_0`, (c) => casts.has(c));
    if (!m) return;
    // `CBodypartClass.setColor` forces `ch2` (a top's printed detail) to
    // white: it keeps its own colours whatever the garment's tint.
    layers.push({ url: urlOf(m), regX: m.regX, regY: m.regY, x: 0, y: 0, tint: part === "ch2" ? undefined : tint });
  });
  return layers;
}

/* ------------------------------------------------------------------ avatar */

/**
 * `CAvatarRenderer.arrangeParts`, standing still (`m_bActMv = 0 and
 * m_bActSit = 0`) — back to front. Every part registers to one anchor
 * (`copyPicture`: x = 25 - regX, y = h - 15 - regY), so no per-part offsets.
 */
const AVATAR_ORDER = [
  "tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "ls", "ch", "ch2", "rh", "rs", "hd", "fc", "ey", "hr", "ht",
];

/**
 * A whole avatar from its stored figure — six (set, colour) pairs, as
 * `507 CreateAvatar` delivered them (`StoredOutfit.figure`). `dir` 3 faces the
 * viewer, as the profile panel shows a player.
 */
export function avatarFor(figure: number[], dir = 3): IconLayer[] {
  const fig = figureSets();
  const parts = new Map<string, { model: number; tint?: string; casts: Set<string> }>();
  for (let i = 0; i + 1 < figure.length; i += 2) {
    const id = figure[i];
    const type = setType(id);
    const set = fig.setList.get(id);
    if (!type || !set) continue; // -1 is "no hat"
    const tint = fig.colours.get(figure[i + 1]) ?? fig.colours.get(set.colours[0] ?? -1);
    const casts = new Set((fig.casts.get(id) ?? []).map((c) => `vmk_avatar_${c}`));
    (fig.contents.get(type) ?? [type]).forEach((part, j) => {
      const model = set.parts[j];
      if (model !== undefined) parts.set(part, { model, tint, casts });
    });
  }
  const layers: IconLayer[] = [];
  for (const part of AVATAR_ORDER) {
    const p = parts.get(part);
    if (!p) continue;
    const m =
      member(`std_${part}_${p.model}_${dir}_0`, (c) => p.casts.has(c)) ??
      member(`std_${part}_${p.model}_3_0`, (c) => p.casts.has(c));
    if (!m) continue;
    // `CBodypartClass.defineInk`/`setColor`: eyes draw with ink 36 (keyed,
    // untinted), a top's `ch2` detail is forced to white; the rest is ink 41.
    const tint = part === "ey" || part === "ch2" ? undefined : p.tint;
    layers.push({ url: urlOf(m), regX: m.regX, regY: m.regY, x: 0, y: 0, tint, ink: part === "ey" ? 36 : undefined });
  }
  return layers;
}

/* ------------------------------------------------------------------- entry */

const cache = new Map<string, IconSpec>();

/**
 * `category` is the inventory category when known (2 clothing); without it the
 * code's own range decides, which is right for every code the game uses.
 */
export function iconFor(code: number, category?: number): IconSpec {
  const key = `${code}:${category ?? ""}`;
  const hit = cache.get(key);
  if (hit) return hit;
  let spec: IconSpec = { code, kind: "none", layers: [] };
  const isClothing = category === 2 || (category === undefined && code >= 20000 && code < 50000);
  if (isClothing) {
    const layers = clothingIcon(code);
    if (layers.length) spec = { code, kind: "clothing", layers };
  }
  if (spec.kind === "none") {
    const single = member(`item_${code}`) ?? member(`poster_${code}`);
    if (single && category !== 1) {
      spec = { code, kind: "single", layers: [{ url: urlOf(single), regX: single.regX, regY: single.regY, x: 0, y: 0 }] };
    } else {
      const layers = furniIcon(code);
      if (layers.length) spec = { code, kind: "furni", layers };
      else if (single) {
        spec = { code, kind: "single", layers: [{ url: urlOf(single), regX: single.regX, regY: single.regY, x: 0, y: 0 }] };
      }
    }
  }
  cache.set(key, spec);
  return spec;
}

/**
 * A guest room as the shop shows it: the `rooms.bg.<code>` picture
 * `CCatalogRoomsView` feeds into its preview.
 */
export function roomIconFor(code: number): IconSpec {
  const bg = member(`rooms.bg.${code}`);
  return bg
    ? { code, kind: "single", layers: [{ url: urlOf(bg), regX: bg.regX, regY: bg.regY, x: 0, y: 0 }] }
    : { code, kind: "none", layers: [] };
}

/** Is this code drawable furniture per the furnimap? (Give-item category guess.) */
export function isFurniCode(code: number): boolean {
  return furni().has(code);
}
