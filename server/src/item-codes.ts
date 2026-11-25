/**
 * What a type code IS, from its number block. No imports: db.ts uses this.
 *
 * ⚠ Never decide "furniture" by asking whether the furnimap defines the code.
 * The furnimap also draws every POSTER (3001-3056: one block offset onto a wall,
 * facings 3 and 5) and one pin (2048, the Best Music Mix Award). Asking it first
 * filed posters under Furniture in the inventory, where they can only be put on
 * the floor.
 */
const CLOTHES = 2;
const POSTERS = 3;
const PINS = 4;
const ITEMS = 1;

/** The 3000 block: posters and other wall pieces (flags, wreaths, maps, photos). */
export function isPosterCode(code: number): boolean {
  return code >= 3000 && code < 4000;
}

/** Pins, and their single-use 12000 twins. */
export function isPinCode(code: number): boolean {
  return (code >= 2000 && code < 3000) || (code >= 12000 && code < 13000);
}

/** Inventory category (`2532` numbering) for a code nobody classified. */
export function guessCategory(code: number): number {
  if (code >= 20000 && code < 50000) return CLOTHES;
  if (isPosterCode(code)) return POSTERS;
  if (isPinCode(code)) return PINS;
  return ITEMS;
}

/** `category`, corrected when it files a poster under Furniture. */
export function inventoryCategory(code: number, category: number): number {
  return category === ITEMS && isPosterCode(code) ? POSTERS : category;
}
