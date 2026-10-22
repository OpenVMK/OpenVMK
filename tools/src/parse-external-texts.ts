import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const SHOCKWAVE = process.env.VMK_SHOCKWAVE ?? join(ROOT, "shockwave");
const OUT = join(ROOT, "catalogs", "external_texts.json");
const REGISTRY = join(ROOT, "docs", "original-client-spec", "feature-registry.json");

interface TextEntry {
  key: string;
  value: string;
  category: string;
  subcategory?: string;
}

function categorize(key: string): { category: string; subcategory?: string } {
  const parts = key.split(".");
  const category = parts[0] ?? "misc";
  const subcategory = parts.length > 2 ? parts.slice(1, -1).join(".") : parts[1];
  return { category, subcategory };
}

function parseTexts(content: string): TextEntry[] {
  const entries: TextEntry[] = [];
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1);
    const { category, subcategory } = categorize(key);
    entries.push({ key, value, category, subcategory });
  }
  return entries;
}

function buildRegistry(entries: TextEntry[]) {
  const byCategory: Record<string, TextEntry[]> = {};
  const rooms: Array<{ id: string; name?: string; desc?: string }> = [];
  const roomMap = new Map<string, { id: string; name?: string; desc?: string }>();

  for (const e of entries) {
    byCategory[e.category] ??= [];
    byCategory[e.category].push(e);

    const roomName = e.key.match(/^room\.(\d+)\.name$/);
    const roomDesc = e.key.match(/^room\.(\d+)\.desc$/);
    if (roomName) {
      const id = roomName[1];
      const r = roomMap.get(id) ?? { id };
      r.name = e.value;
      roomMap.set(id, r);
    }
    if (roomDesc) {
      const id = roomDesc[1];
      const r = roomMap.get(id) ?? { id };
      r.desc = e.value;
      roomMap.set(id, r);
    }
  }

  for (const r of roomMap.values()) rooms.push(r);
  rooms.sort((a, b) => Number(a.id) - Number(b.id));

  const categories = Object.fromEntries(
    Object.entries(byCategory).map(([k, v]) => [k, { count: v.length, sampleKeys: v.slice(0, 5).map((x) => x.key) }]),
  );

  return {
    generatedAt: new Date().toISOString(),
    totalKeys: entries.length,
    categoryCount: Object.keys(byCategory).length,
    categories,
    rooms,
    minigameKeys: entries.filter((e) =>
      /^(checkers|junglecruise|fireworks|mixer|haunted|potc|arcade|minigame)/i.test(e.key),
    ).length,
    questKeys: entries.filter((e) => e.key.startsWith("quest.")).length,
    catalogKeys: entries.filter((e) => e.key.startsWith("cat.")).length,
    entries: Object.fromEntries(entries.map((e) => [e.key, e.value])),
  };
}

const src = join(SHOCKWAVE, "external_texts.txt");
const content = readFileSync(src, "utf8");
const entries = parseTexts(content);
const flat = Object.fromEntries(entries.map((e) => [e.key, e.value]));
const registry = buildRegistry(entries);

mkdirSync(dirname(OUT), { recursive: true });
mkdirSync(dirname(REGISTRY), { recursive: true });
writeFileSync(OUT, JSON.stringify(flat, null, 2));
writeFileSync(REGISTRY, JSON.stringify(registry, null, 2));

console.log(`Parsed ${entries.length} keys -> ${OUT}`);
console.log(`Registry: ${registry.categoryCount} categories, ${registry.rooms.length} rooms`);
