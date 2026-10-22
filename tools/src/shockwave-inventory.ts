import { readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const SHOCKWAVE = process.env.VMK_SHOCKWAVE ?? join(ROOT, "shockwave");
const OUT = join(ROOT, "docs", "original-client-spec", "shockwave-inventory.json");

function walk(dir: string): Array<{ path: string; size: number; ext: string }> {
  const out: Array<{ path: string; size: number; ext: string }> = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else {
      const ext = entry.name.includes(".") ? entry.name.split(".").pop()! : "";
      out.push({ path: relative(SHOCKWAVE, p).replace(/\\/g, "/"), size: statSync(p).size, ext });
    }
  }
  return out;
}

const files = walk(SHOCKWAVE);
const byExt: Record<string, { count: number; bytes: number }> = {};
for (const f of files) {
  byExt[f.ext] ??= { count: 0, bytes: 0 };
  byExt[f.ext].count++;
  byExt[f.ext].bytes += f.size;
}

const report = {
  generatedAt: new Date().toISOString(),
  root: SHOCKWAVE,
  totalFiles: files.length,
  byExtension: byExt,
  dcrVersions: files.filter((f) => f.ext === "dcr").map((f) => ({ path: f.path, size: f.size })),
  coreCasts: files.filter((f) => f.path.startsWith("vmk_core/")),
  spaceCastCount: files.filter((f) => f.path.startsWith("vmk_spaces/") && f.ext === "cct").length,
  furniCastCount: files.filter((f) => f.path.startsWith("hof_furni/") && f.ext === "cct").length,
  clothesCastCount: files.filter((f) => f.path.startsWith("vmk_clothes/") && f.ext === "cct").length,
  libreShockwaveSetup: {
    repo: "https://github.com/LibreShockwave/LibreShockwave",
    demo: "https://libre.oldskooler.org/",
    priorityExtract: ["vmk_core/core.cct", "vmk_spaces/vmk_central.cct", "vmk_8.dcr"],
  },
  openShockwaveSetup: {
    repo: "https://github.com/Brian151/OpenShockwave",
    purpose: "Lingo bytecode disassembly reference",
  },
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(report, null, 2));
console.log(`Shockwave inventory: ${files.length} files`);
console.log(JSON.stringify(byExt, null, 2));
