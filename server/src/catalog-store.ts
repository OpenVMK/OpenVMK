/**
 * Where the shop catalogue lives once staff can edit it: three tables in the
 * shared database, seeded once from the recovered data (catalog.ts `seedRows`).
 *
 * This file only stores and loads rows. What the rows mean — the per-sex
 * filter, the drawable filter, the page split, the client's vocabulary rules —
 * stays in catalog.ts, which builds what players are sent from these rows.
 *
 * ⚠ Both servers open this database. The game server serves the shop; the
 * asset server's /hk portal edits it. A save bumps `catalog_meta.version` and
 * the game server compares that on every index request (`catalogVersion`),
 * so an edit reaches the next player who opens the shop with no restart and
 * no bridge call — and still does if the game server was down during the save.
 *
 * ⚠ Same cross-process race as staff-db.ts: both processes run the CREATEs at
 * import, and both may try to seed. Seeding re-checks emptiness inside
 * `BEGIN IMMEDIATE`, so the loser finds rows and does nothing.
 */
import { db } from "./db.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS catalog_shops (
    name_id INTEGER PRIMARY KEY,           -- cat.name.<id>; the only shop key the client knows
    sort    INTEGER NOT NULL,
    hidden  INTEGER NOT NULL DEFAULT 0,
    note    TEXT    NOT NULL DEFAULT '',
    origin  TEXT    NOT NULL DEFAULT 'staff' -- 'recovered' | 'rebuilt' | 'staff'
  );
  CREATE TABLE IF NOT EXISTS catalog_pages (
    id      INTEGER PRIMARY KEY,           -- what 16 CAT_CATEGORY_REQUEST and 17 BUY send
    shop_id INTEGER NOT NULL,
    title   TEXT    NOT NULL,
    layout  INTEGER NOT NULL DEFAULT 1,
    sort    INTEGER NOT NULL,
    hidden  INTEGER NOT NULL DEFAULT 0,
    note    TEXT    NOT NULL DEFAULT '',
    origin  TEXT    NOT NULL DEFAULT 'staff'
  );
  CREATE TABLE IF NOT EXISTS catalog_items (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    page_id        INTEGER NOT NULL,
    code           INTEGER NOT NULL,
    price          INTEGER NOT NULL,
    inventory_type INTEGER NOT NULL,
    level          INTEGER NOT NULL DEFAULT 2,
    metadata       TEXT    NOT NULL DEFAULT '',
    single_use     INTEGER NOT NULL DEFAULT 0,
    sort           INTEGER NOT NULL,
    origin         TEXT    NOT NULL DEFAULT 'staff'
  );
  CREATE INDEX IF NOT EXISTS idx_catalog_items_page ON catalog_items(page_id, sort);
  CREATE TABLE IF NOT EXISTS catalog_meta (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

export interface StoredProduct {
  code: number;
  price: number;
  inventoryType: number;
  level: number;
  metadata: string;
  singleUse: boolean;
  origin: string;
}

export interface StoredPage {
  id: number;
  title: string;
  layout: number;
  hidden: boolean;
  note: string;
  origin: string;
  products: StoredProduct[];
}

export interface StoredShop {
  nameId: number;
  hidden: boolean;
  note: string;
  origin: string;
  pages: StoredPage[];
}

/** Ids for pages staff create: clear of the recovered 1..33, 700 and the split range 1000+. */
export const STAFF_PAGE_ID_BASE = 2000;

export class CatalogConflict extends Error {}

type Row = Record<string, unknown>;

function transaction<T>(fn: () => T): T {
  db.exec("BEGIN IMMEDIATE");
  try {
    const out = fn();
    db.exec("COMMIT");
    return out;
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}

/** Bumped by every save; 0 before the first seed. */
export function catalogVersion(): number {
  const row = db.prepare("SELECT value FROM catalog_meta WHERE key = 'version'").get() as Row | undefined;
  return row ? Number(row.value) : 0;
}

/** Everything stored, hidden rows included, in shelf order; null if never seeded. */
export function loadStoredCatalog(): StoredShop[] | null {
  const shops = db.prepare("SELECT * FROM catalog_shops ORDER BY sort, name_id").all() as Row[];
  if (shops.length === 0) return null;
  const pages = db.prepare("SELECT * FROM catalog_pages ORDER BY sort, id").all() as Row[];
  const items = db.prepare("SELECT * FROM catalog_items ORDER BY page_id, sort, id").all() as Row[];

  const productsByPage = new Map<number, StoredProduct[]>();
  for (const r of items) {
    const page = Number(r.page_id);
    if (!productsByPage.has(page)) productsByPage.set(page, []);
    productsByPage.get(page)!.push({
      code: Number(r.code),
      price: Number(r.price),
      inventoryType: Number(r.inventory_type),
      level: Number(r.level),
      metadata: String(r.metadata),
      singleUse: Number(r.single_use) === 1,
      origin: String(r.origin),
    });
  }
  const pagesByShop = new Map<number, StoredPage[]>();
  for (const r of pages) {
    const shop = Number(r.shop_id);
    if (!pagesByShop.has(shop)) pagesByShop.set(shop, []);
    pagesByShop.get(shop)!.push({
      id: Number(r.id),
      title: String(r.title),
      layout: Number(r.layout),
      hidden: Number(r.hidden) === 1,
      note: String(r.note),
      origin: String(r.origin),
      products: productsByPage.get(Number(r.id)) ?? [],
    });
  }
  return shops.map((r) => ({
    nameId: Number(r.name_id),
    hidden: Number(r.hidden) === 1,
    note: String(r.note),
    origin: String(r.origin),
    pages: pagesByShop.get(Number(r.name_id)) ?? [],
  }));
}

function writeAll(shops: StoredShop[]): void {
  db.exec("DELETE FROM catalog_items; DELETE FROM catalog_pages; DELETE FROM catalog_shops;");
  const insShop = db.prepare("INSERT INTO catalog_shops (name_id, sort, hidden, note, origin) VALUES (?, ?, ?, ?, ?)");
  const insPage = db.prepare(
    "INSERT INTO catalog_pages (id, shop_id, title, layout, sort, hidden, note, origin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  );
  const insItem = db.prepare(
    "INSERT INTO catalog_items (page_id, code, price, inventory_type, level, metadata, single_use, sort, origin) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
  );
  shops.forEach((shop, s) => {
    insShop.run(shop.nameId, s, shop.hidden ? 1 : 0, shop.note, shop.origin);
    shop.pages.forEach((page, p) => {
      insPage.run(page.id, shop.nameId, page.title, page.layout, p, page.hidden ? 1 : 0, page.note, page.origin);
      page.products.forEach((item, i) => {
        insItem.run(page.id, item.code, item.price, item.inventoryType, item.level, item.metadata, item.singleUse ? 1 : 0, i, item.origin);
      });
    });
  });
  db.prepare(
    "INSERT INTO catalog_meta (key, value) VALUES ('version', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
  ).run(String(catalogVersion() + 1));
}

/** First start only: fill the tables from `build()`. True if this call seeded. */
export function seedStoredCatalog(build: () => StoredShop[] | null): boolean {
  if (Number((db.prepare("SELECT COUNT(*) n FROM catalog_shops").get() as Row).n) !== 0) return false;
  const shops = build();
  if (!shops || shops.length === 0) return false;
  return transaction(() => {
    // Re-check under the write lock: the other server may have seeded meanwhile.
    if (Number((db.prepare("SELECT COUNT(*) n FROM catalog_shops").get() as Row).n) !== 0) return false;
    writeAll(shops);
    return true;
  });
}

/**
 * Replace the whole catalogue in one transaction, so players never see half an
 * edit. `expectedVersion` is the version the editor loaded; a mismatch means
 * someone else saved in between, and their work would be overwritten.
 */
export function saveStoredCatalog(shops: StoredShop[], expectedVersion: number): number {
  return transaction(() => {
    if (catalogVersion() !== expectedVersion) {
      throw new CatalogConflict("The catalogue changed since you opened it. Reload to see the other edit.");
    }
    writeAll(shops);
    return catalogVersion();
  });
}

/** Back to the recovered data. Keeps counting versions so open editors see the change. */
export function resetStoredCatalog(build: () => StoredShop[] | null): number {
  const shops = build();
  if (!shops || shops.length === 0) throw new Error("No recovered catalogue to reset to.");
  return transaction(() => {
    writeAll(shops);
    return catalogVersion();
  });
}
