/**
 * The shop catalogue — RECOVERED, not invented.
 *
 * Every shop, page, price and product here comes from `catalogue_index`,
 * `catalogue_children` and `catalogue_items` in an OpenVMK-lineage `vmk.sql`
 * dump, extracted by `tools/extract-catalogue.mjs` into assets/catalogue.json.
 * The three tables map 1:1 onto messages 15 and 16, which is the strongest
 * evidence they are the real thing: `catalogue_children.layout` is exactly the
 * third field `CCatalogHandler.GetCatalogCategory` reads, and the only row that
 * carries layout 3 is Guestrooms — the one page the client routes to
 * `_SaveRoomList` instead of the product grid.
 *
 * ⚠ Provenance: OpenVMK-lineage private-server data, NOT a Disney export. It is
 * the closest surviving thing to real catalogue data, and it is enormously
 * better than name-matching guesswork, but a few rows are demonstrably
 * post-Disney (see `SKIPPED_SHOPS`).
 *
 * This file previously invented both the shop assignment (by regex over item
 * names) and the prices (a footprint-size formula). Both are gone. If a row
 * looks wrong now, the fix is in the data or the extractor, not here.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { previewable, composites } from "./furni-footprint.js";
import { drawableClothingSets } from "./avatar-sets.js";

const here = dirname(fileURLToPath(import.meta.url));

/** `catalogue_items.inventoryType`. */
export const ITEM_FURNITURE = 1;
export const ITEM_CLOTHING = 2;
export const ITEM_POSTER = 3;
export const ITEM_PIN = 4;

export interface CatalogProduct {
  /** Furniture type code — what `2586 CreateElements` places. */
  code: number;
  name: string;
  price: number;
  inventoryType: number;
  /** Who may wear it: 0 male, 1 female, 2 either. Clothing only. */
  level: number;
  /** Guest rooms carry their space name here; everything else is empty. */
  metadata: string;
  singleUse: boolean;
}

export interface CatalogPage {
  /** The id `16 CAT_CATEGORY_REQUEST` asks for. */
  id: number;
  /**
   * ⚠ A CLOSED VOCABULARY, not display text. `CCtlgPageBase.FindPageToShowTab`
   * switches on the literal string to choose a view class, and
   * `CCatalogFurniView.createComponentWindow` treats anything outside
   * {Furniture, Pins, Posters, Specials!} as a promo child row built from a
   * different component XML. Sending "Page 1" here crashed the client while it
   * was still drawing the tab list.
   *
   * The dump's own titles are Furniture / Posters / Pins / Hats / Tops /
   * Bottoms / Shoes / Guestrooms / Spooky Specials / Walkable Pixels — so the
   * vocabulary is confirmed from both sides.
   *
   * Note "Shoes": the client's `FindPageToShowTab` case reads "Shose", a typo
   * that makes its branch dead and falls through to `#furniture`. The DB spells
   * it correctly, and the DB is what the real server sent, so we match the DB.
   */
  title: string;
  /**
   * Third field of the `16` reply. 3 routes the whole reply to `_SaveRoomList`
   * (the guest-room shelf); everything else goes to the product grid.
   */
  layout: number;
  products: CatalogProduct[];
}

export interface CatalogShop {
  /** Text id: the client renders `getText("cat.name." & id)`, not our string. */
  nameId: number;
  /** For logging only — the client never sees this. */
  name: string;
  pages: CatalogPage[];
}

interface CatalogueFile {
  source: string;
  shops: Array<{ id: number; nameId: number }>;
  pages: Array<{ id: number; shop: number; title: string; layout: number }>;
  items: Array<{
    id: number;
    page: number;
    price: number;
    code: number;
    metadata: string;
    inventoryType: number;
    level: number;
    singleUse: boolean;
  }>;
}

/**
 * Shops dropped from the recovered data, with the reason.
 *
 * ⚠ Both are name-resolution failures first and authenticity judgements second,
 * which is why they are safe to drop: a shop whose `cat.name.<n>` does not
 * resolve renders as a blank tab regardless of what is on its shelves.
 *
 *   43 — "Walkable Pixels" and 5-credit filler. There is no `cat.name.43` in
 *        the dump's own `texts` table, so even the source server could not have
 *        named it.
 *   42 — "Spooky Specials", a seasonal Halloween shop. `cat.name.42` DOES exist
 *        in the dump but not in our external_texts, so it would render blank
 *        here. Restoring it is a deliberate choice about seasonal content plus
 *        a text-file edit, not something to do silently.
 */
const SKIPPED_SHOPS = new Map<number, string>([
  [43, "no cat.name.43 exists in any text source"],
  [42, "seasonal 'Spooky Specials'; cat.name.42 absent from our external_texts"],
]);

/**
 * Caps, kept as escape hatches for isolating a rendering fault.
 *
 *   VMK_SHOP_MAX_SHOPS / VMK_SHOP_MAX_PAGES / VMK_SHOP_MAX_ITEMS
 */
const MAX_SHOPS = Number(process.env.VMK_SHOP_MAX_SHOPS ?? Infinity);
const MAX_PAGES = Number(process.env.VMK_SHOP_MAX_PAGES ?? Infinity);
const MAX_ITEMS = Number(process.env.VMK_SHOP_MAX_ITEMS ?? Infinity);

/** Keyed by sex — see `catalog`. */
const cached = new Map<number, CatalogShop[]>();

/**
 * Shops the recovered dump does not have, rebuilt from other evidence. This is
 * the one exception to "recovered, not invented", so each row says where it
 * came from.
 *
 * VMK CENTRAL (`cat.name.7`). The dump has no shop 7, but Disney's texts name
 * it, and the VMK Central room sends players there: its "click here for
 * camera" poster sends `701 [0]`, and the server answers `2702 [shop, page]`
 * (`CVMKCentralHandler.openCatalogPage` -> `showCatalogPage`).
 *
 *   Page "Camera": any title outside Furniture/Pins/Posters/Specials! is listed
 *   as a clickable row under its shop and opens as a furniture shelf
 *   (`CCatalogFurniView.createComponentWindow`, `CCtlgPageBase.FindPageToShowTab`).
 *   The client also treats a page whose name contains "Camera" as special
 *   (`CCatalogFurniView.ls:219`).
 *
 *   31  Photo Album — 100 credits (sells for 20), "VMK Central"
 *       (disneysonlineworlds.com/Photo_Album). Photos published to your album
 *       show in it (photo-server.ts).
 *
 *   7001 "Camera and 3 film" and 6001 "Film (pack of 5)" — Disney's names
 *       (`product.7001` / `product.6001`, external_texts_181_disney.txt,
 *       restored to the overlay; the shelf and purchase dialog both prefer
 *       `product.` over `item.`). Their art is
 *       Disney's as well: members `item_7001` / `item_6001` in the shared cast
 *       6453b36a, which is where the shop renderer finds them. Not inventory
 *       items: see CAMERA_PRODUCTS.
 */
export const VMK_CENTRAL_SHOP = 7;
export const CAMERA_PAGE_ID = 700;
/**
 * Products that grant a camera and/or film instead of an inventory item. The
 * codes are Disney's (`product.7001` / `product.6001`). The PRICES ARE
 * PLACEHOLDERS: no source gives the camera's, and a later fan server sold film for 200.
 * `VMK_CAMERA_PRICE` / `VMK_FILM_PRICE` override them.
 */
export const CAMERA_PRODUCTS = new Map<number, { camera: boolean; film: number }>([
  [7001, { camera: true, film: 3 }],
  [6001, { camera: false, film: 5 }],
]);
const EXTRA_SHOPS: CatalogShop[] = [
  {
    nameId: VMK_CENTRAL_SHOP,
    name: "cat.name.7",
    pages: [
      {
        id: CAMERA_PAGE_ID,
        title: "Camera",
        layout: 1,
        products: [
          {
            code: 31,
            name: "Photo Album",
            price: 100,
            inventoryType: ITEM_FURNITURE,
            level: 0,
            metadata: "",
            singleUse: false,
          },
          {
            code: 7001,
            name: "Camera and 3 film",
            price: Number(process.env.VMK_CAMERA_PRICE ?? 500),
            inventoryType: ITEM_FURNITURE,
            level: 0,
            metadata: "",
            singleUse: false,
          },
          {
            code: 6001,
            name: "Film (pack of 5)",
            price: Number(process.env.VMK_FILM_PRICE ?? 200),
            inventoryType: ITEM_FURNITURE,
            level: 0,
            metadata: "",
            singleUse: false,
          },
        ],
      },
    ],
  },
];
let itemNameCache: Map<number, string> | null = null;
let shopNameCache: Set<number> | null = null;

/** An item's display name from the external texts (`item.<code>`). */
export function itemName(code: number): string {
  return texts().items.get(code) ?? `item.${code}`;
}

function texts(): { items: Map<number, string>; shopNames: Set<number> } {
  if (itemNameCache && shopNameCache) {
    return { items: itemNameCache, shopNames: shopNameCache };
  }
  itemNameCache = new Map();
  shopNameCache = new Set();
  const file = join(here, "..", "..", "assets", "overlay", "external_texts.txt");
  if (existsSync(file)) {
    for (const line of readFileSync(file, "latin1").split(/\r?\n/)) {
      const item = /^\s*item\.(\d+)\s*=\s*(.+?)\s*$/.exec(line);
      if (item && item[2]) itemNameCache.set(Number(item[1]), item[2]);
      const shop = /^\s*cat\.name\.(\d+)\s*=/.exec(line);
      if (shop) shopNameCache.add(Number(shop[1]));
    }
  }
  return { items: itemNameCache, shopNames: shopNameCache };
}

function catalogueFile(): CatalogueFile | null {
  const path = process.env.VMK_CATALOGUE ?? join(here, "..", "..", "assets", "catalogue.json");
  if (!existsSync(path)) {
    console.warn(
      `[catalog] ${path} not found — the shop will be empty.\n` +
        "          Regenerate it with: node tools/extract-catalogue.mjs <vmk.sql>",
    );
    return null;
  }
  return JSON.parse(readFileSync(path, "utf8")) as CatalogueFile;
}

/**
 * Products are NOT filtered on renderability. Recording why, because the
 * obvious-looking filter is wrong and was tried.
 *
 * `CRoomFurniThumbRenderer._RenderFurniPreview` renders DIR 5 only and computes
 * `t_iItemSize = value(t_rStruct.param["TILESIZE"])`, then multiplies block
 * offsets by it with no default anywhere — which reads like a guaranteed fault
 * on the 853 of 1,089 furnimap entries that omit TILESIZE. Filtering on that
 * dropped 149 of the 152 furniture rows in the recovered catalogue.
 *
 * That number is the refutation. These exact rows were served by the real
 * server to this exact client for the life of the game, so the client plainly
 * survives them: either Lingo coerces the VOID to 0 (a squashed thumbnail, not
 * a crash) or the furnimap parser supplies a default the decompiled handlers do
 * not show. Guest rooms settle it from the other side — codes 5003/5006/5008
 * are not furnimap items at all, because `CCatalogRoomsView.ShowRooms` draws
 * them from `rooms.bg.<code>` members instead.
 *
 * `previewable()` survives in furni-footprint.ts as a diagnostic, and the
 * count still prints below, but it must not gate the shelves.
 */
function renderable(code: number, inventoryType: number): boolean {
  // Clothing: a garment with no SetList entry renders as an empty square, and
  // one whose cast is absent hangs the serial cloth loader.
  if (inventoryType === ITEM_CLOTHING) return drawableSets().has(code);
  // Furniture is NOT filtered by default, and the history of trying is worth
  // recording so it is not repeated. Four per-item theories were each supported
  // by a "consistent" reproduction and each then refuted:
  //
  //   missing TILESIZE      — page 1 of Shrunken Ned's is entirely TILESIZE-less
  //                           and renders fine.
  //   BLD compositing       — excluding the four BLD items did not stop Hats
  //                           page 2 crashing, and Hats then stopped crashing
  //                           on its own with nothing changed.
  //   no SetList entry      — real (it is why Mr. Smee Hat was blank) but not a
  //                           crash; fixed by figuresets_29.
  //   cross-band garments   — Hats page 2 is exactly the non-41xxx hats, which
  //                           looked decisive until that page stopped crashing.
  //
  // The common thread is that every reproduction eventually became
  // unreproducible. That is the signature of a TIMING bug, not a data one: the
  // pager in both catalogue views calls the async thumbnail load without the
  // `m_bLoadingThumbnails` guard that sits one branch above it in the same
  // handler. No filter here can fix that.
  if (inventoryType === ITEM_FURNITURE && !ADMIT_COMPOSITES) return !composites(code);
  return true;
}

let drawableCache: Set<number> | null = null;
function drawableSets(): Set<number> {
  if (!drawableCache) {
    drawableCache = drawableClothingSets();
  }
  return drawableCache;
}

/**
 * Pages removed from the recovered data.
 *
 * 31 "Spooky Specials" — seasonal Halloween content under the Clothing shop.
 * Removed at request; it is genuine OpenVMK-era data, so it lives on in
 * assets/catalogue.json and comes back by deleting this entry.
 */
const SKIPPED_PAGES = new Set<number>([31]);

/**
 * Split long clothing categories so none of them needs the page arrows.
 *
 * ⚠ This is a WORKAROUND for a bug in Disney's client, not a data correction.
 * `CCatalogClothesView._EventProc` guards its grid-click branch with
 * `if not m_bLoadingThumbnails then` and then calls `UpdatePreview` from
 * "cat.nextpage.button" and "cat.previouspage.button" WITHOUT that guard. Paging
 * before the previous batch of thumbnails has rendered starts a second load over
 * the first, and the client can die — intermittently, and more often the more
 * pages a category has, which matches what testing showed.
 *
 * The grid is hard-coded to 9 (`t_iTo = t_iCurrentPage * 9`), so a category of
 * 9 or fewer has exactly one page and the arrows have nothing to do. Browsing
 * moves to the left-hand list, which takes a different code path.
 *
 * Safe because the clothes view, unlike the furniture view, applies NO
 * vocabulary check to sub-page titles — `createComponentWindow` simply calls
 * `setText(getPropAt(a))` for each. The recovered data proves it: "Spooky
 * Specials" was a real page under this same shop.
 *
 * `VMK_SHOP_SPLIT=0` turns this off and restores the original four categories.
 */
const SPLIT_AT = Number(process.env.VMK_SHOP_SPLIT ?? 0);
/** Split pages need ids that cannot collide with the recovered ones (1..33). */
const SPLIT_ID_BASE = 1000;

/**
 * The four BLD items are ADMITTED by default; `VMK_SHOP_COMPOSITES=off` drops
 * them again. See `renderable` for why excluding them turned out to buy nothing.
 */
const ADMIT_COMPOSITES = process.env.VMK_SHOP_COMPOSITES !== "off";

function splitPage(page: CatalogPage, nextId: () => number): CatalogPage[] {
  if (SPLIT_AT <= 0 || page.products.length <= SPLIT_AT) return [page];
  const out: CatalogPage[] = [];
  for (let i = 0; i < page.products.length; i += SPLIT_AT) {
    const part = out.length + 1;
    out.push({
      id: part === 1 ? page.id : nextId(),
      // The first part keeps the original title so the category still reads as
      // "Tops"; the rest are numbered.
      title: part === 1 ? page.title : `${page.title} ${part}`,
      layout: page.layout,
      products: page.products.slice(i, i + SPLIT_AT),
    });
  }
  return out;
}

/**
 * The catalogue as a given player sees it.
 *
 * ⚠ Per-sex, and it has to be. `catalogue_items.level` (0 male / 1 female /
 * 2 either) decides which garments a player is offered, and the SPLIT above has
 * to run on the surviving list — splitting first would leave a male player with
 * ragged categories full of gaps where the female items were removed.
 */
export function catalog(sex = 0): CatalogShop[] {
  const hit = cached.get(sex);
  if (hit) return hit;
  const data = catalogueFile();
  if (!data) {
    cached.set(sex, []);
    return [];
  }

  const { items: names, shopNames } = texts();
  const productsByPage = new Map<number, CatalogProduct[]>();
  let noArt = 0;
  let undrawable = 0;
  for (const item of data.items) {
    if (!renderable(item.code, item.inventoryType)) {
      undrawable++;
      continue;
    }
    // Clothing is offered only to the sex that can wear it. The mapping had to
    // be read off the data rather than assumed: every hat is level 2 whether it
    // sits in the male (21003), female (31001) or later (41000) band, while
    // tops split 34xxx=1 against 44xxx=0 — so the shorthand that the 4xxxx band
    // is simply "unisex" is too coarse. Only this column says which.
    if (item.inventoryType === ITEM_CLOTHING && item.level !== 2 && item.level !== sex) {
      continue;
    }
    if (item.inventoryType === ITEM_FURNITURE && !previewable(item.code)) noArt++;
    if (!productsByPage.has(item.page)) productsByPage.set(item.page, []);
    productsByPage.get(item.page)!.push({
      code: item.code,
      // The client resolves `item.<code>` itself; this is for our logs only.
      name: names.get(item.code) ?? `item.${item.code}`,
      price: item.price,
      inventoryType: item.inventoryType,
      level: item.level,
      metadata: item.metadata,
      singleUse: item.singleUse,
    });
  }

  let splitId = SPLIT_ID_BASE;
  const nextSplitId = () => splitId++;
  const pagesByShop = new Map<number, CatalogPage[]>();
  for (const page of data.pages) {
    if (SKIPPED_PAGES.has(page.id)) continue;
    const products = productsByPage.get(page.id) ?? [];
    if (!pagesByShop.has(page.shop)) pagesByShop.set(page.shop, []);
    const built: CatalogPage = {
      id: page.id,
      title: page.title,
      layout: page.layout,
      products: products.slice(0, MAX_ITEMS),
    };
    // Only clothing pages are split — they are the ones with the buggy pager.
    const parts =
      built.products[0]?.inventoryType === ITEM_CLOTHING
        ? splitPage(built, nextSplitId)
        : [built];
    pagesByShop.get(page.shop)!.push(...parts);
  }

  const skipped: string[] = [];
  const shops: CatalogShop[] = [];
  for (const shop of data.shops) {
    const reason = SKIPPED_SHOPS.get(shop.nameId);
    if (reason) {
      skipped.push(`${shop.nameId} (${reason})`);
      continue;
    }
    if (!shopNames.has(shop.nameId)) {
      skipped.push(`${shop.nameId} (no cat.name.${shop.nameId} in external_texts)`);
      continue;
    }
    const pages = (pagesByShop.get(shop.id) ?? []).slice(0, MAX_PAGES);
    if (pages.length === 0) continue;
    shops.push({ nameId: shop.nameId, name: `cat.name.${shop.nameId}`, pages });
  }
  // Shop 7, VMK Central, is absent from the recovered dump; see EXTRA_SHOPS.
  for (const extra of EXTRA_SHOPS) {
    if (!shopNames.has(extra.nameId) || shops.some((s) => s.nameId === extra.nameId)) continue;
    shops.push(extra);
  }
  const result = shops.slice(0, MAX_SHOPS);
  cached.set(sex, result);

  const total = result.reduce(
    (n, s) => n + s.pages.reduce((m, p) => m + p.products.length, 0),
    0,
  );
  const paged = result
    .flatMap((s) => s.pages)
    .filter((p) => p.products.length > 9).length;
  console.log(
    `[catalog] ${sex === 1 ? "female" : "male"}: ${result.length} shops, ` +
      `${result.reduce((n, s) => n + s.pages.length, 0)} pages, ${total} products ` +
      `(recovered from ${data.source.split(" —")[0]})`,
  );
  if (paged > 0) {
    // Any page over 9 still shows the arrows, and the arrows are the crash.
    console.log(`[catalog]   ⚠ ${paged} page(s) still exceed 9 items and keep the pager`);
  }
  if (undrawable > 0) {
    console.log(
      `[catalog]   ${undrawable} clothing item(s) dropped: no SetList entry, or cast absent`,
    );
  }
  if (noArt > 0) {
    // Diagnostic only — see `renderable`. If thumbnails misbehave, this is the
    // population to suspect first; it is deliberately NOT a filter.
    console.log(`[catalog]   ${noArt} furniture item(s) fail the previewable test (shipped anyway)`);
  }
  if (skipped.length > 0) console.log(`[catalog]   shops skipped: ${skipped.join(", ")}`);
  return result;
}

/**
 * Find a page by the id `16 CAT_CATEGORY_REQUEST` sends.
 *
 * ⚠ Needs the same `sex` the index was built with. Page ids for split clothing
 * categories are allocated per catalogue, so looking one up against the other
 * sex's catalogue would serve the wrong shelf.
 */
/**
 * Search `item.<code>` names, for the staff `/find` command.
 *
 * ⚠ Searches the TEXT FILE, not the catalogue, and that is the point. Most
 * items were never sold in a shop — only 152 of ~1,000 furniture codes appear
 * in `catalogue_items`, and event gear like the Herbie set was code-redeemed
 * rather than bought — so searching the shelves would hide exactly the things
 * a staff member needs to look up.
 */
export function searchItemNames(
  query: string,
  limit = 40,
): Array<{ code: number; name: string }> {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const hits: Array<{ code: number; name: string }> = [];
  for (const [code, name] of texts().items) {
    if (name.toLowerCase().includes(needle)) hits.push({ code, name });
  }
  return hits.sort((a, b) => a.code - b.code).slice(0, limit);
}

export function pageById(id: number, sex = 0): CatalogPage | undefined {
  for (const shop of catalog(sex)) {
    const page = shop.pages.find((p) => p.id === id);
    if (page) return page;
  }
  return undefined;
}

/** Find a product by type code, for validating a purchase. */
export function productByCode(code: number, sex = 0): CatalogProduct | undefined {
  for (const shop of catalog(sex)) {
    for (const page of shop.pages) {
      const found = page.products.find((p) => p.code === code);
      if (found) return found;
    }
  }
  return undefined;
}
