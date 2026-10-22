import { readdirSync, statSync, writeFileSync, mkdirSync, cpSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const SHOCKWAVE = process.env.VMK_SHOCKWAVE ?? join(ROOT, "shockwave");
// Optional: a directory of already-converted web assets / JSON catalogues to
// seed assets/ and catalogs/ from. Unset, only the inventory is written.
const REFERENCE_CDN = process.env.VMK_REFERENCE_CDN;
const REFERENCE_API = process.env.VMK_REFERENCE_API;
const ASSETS = join(ROOT, "assets");
const CATALOGS = join(ROOT, "catalogs");

function walk(dir: string, ext: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p, ext));
    else if (entry.name.endsWith(ext)) out.push(p);
  }
  return out;
}

function inventoryShockwave() {
  const modules = ["vmk_core", "vmk_spaces", "vmk_clothes", "hof_furni", "vmk_sound", "vmk_minigame", "vmk_npc", "vmk_space_extensions"];
  const inv: Record<string, { cct: number; dcr: number; totalBytes: number }> = {};
  for (const mod of modules) {
    const dir = join(SHOCKWAVE, mod);
    if (!existsSync(dir)) continue;
    const ccts = walk(dir, ".cct");
    const dcrs = walk(dir, ".dcr");
    inv[mod] = {
      cct: ccts.length,
      dcr: dcrs.length,
      totalBytes: [...ccts, ...dcrs].reduce((s, f) => s + statSync(f).size, 0),
    };
  }
  return inv;
}

if (REFERENCE_CDN && existsSync(REFERENCE_CDN)) {
  console.log(`Syncing converted assets from ${REFERENCE_CDN}...`);
  cpSync(REFERENCE_CDN, ASSETS, { recursive: true, force: true });
  console.log(`Copied CDN -> ${ASSETS}`);
} else {
  if (REFERENCE_CDN) console.warn(`VMK_REFERENCE_CDN not found at ${REFERENCE_CDN}; skipping`);
  mkdirSync(ASSETS, { recursive: true });
}

if (REFERENCE_API && existsSync(REFERENCE_API)) {
  mkdirSync(CATALOGS, { recursive: true });
  for (const f of readdirSync(REFERENCE_API)) {
    if (f.endsWith(".json")) {
      cpSync(join(REFERENCE_API, f), join(CATALOGS, f));
    }
  }
  console.log(`Copied API catalogs -> ${CATALOGS}`);
}

const shockwaveInventory = inventoryShockwave();
const cctFiles = walk(SHOCKWAVE, ".cct");
const manifest = {
  generatedAt: new Date().toISOString(),
  shockwaveRoot: SHOCKWAVE,
  shockwaveModules: shockwaveInventory,
  totalCctFiles: cctFiles.length,
  priorityCasts: [
    "vmk_core/core.cct",
    "vmk_spaces/vmk_central.cct",
    "vmk_spaces/framework.dcr",
    "vmk_8.dcr",
  ].map((p) => ({ path: p, exists: existsSync(join(SHOCKWAVE, ...p.split("/"))) })),
  convertedAssetRoot: ASSETS,
  extractionNote:
    "Bitmap extraction is tools/extract-casts.mjs (LibreShockwave). VMK_REFERENCE_CDN, when set, seeds assets/ from pre-converted output.",
};

const outPath = join(ROOT, "docs", "original-client-spec", "asset-manifest.json");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(manifest, null, 2));
console.log(`Asset manifest: ${cctFiles.length} CCT files inventoried`);
