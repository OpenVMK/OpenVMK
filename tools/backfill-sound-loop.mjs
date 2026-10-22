/**
 * Add the `loop` column to cast manifests extracted before it existed.
 *
 * WHY: `the loop of member` is what makes a sound repeat —
 * `CSoundChannelObject.PlaySound` takes its infinite-loop branch only when it is
 * set — and manifests older than the column report every sound as one-shot. The
 * Tiki Radio (`VMK-tikiradio`, loop 1 in the cast) played once and stopped.
 *
 * WHY NOT `extract-casts.mjs --force`: a full re-extraction rewrites the folder
 * and drops `bitmaps.tsv` (every bitmap then loads 1x1) and can pick up a
 * different source. This re-extracts into a temp dir and copies ONLY the loop
 * values, matched by member id, into the manifest already on disk.
 *
 *   node tools/backfill-sound-loop.mjs            # dry run: report
 *   node tools/backfill-sound-loop.mjs --write
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const ARCHIVE = process.env.VMK_SHOCKWAVE ?? resolve("shockwave");
const EXTRACTOR = resolve("tools/shockwave/LibreShockwave/cmake-build-native/cpp/libreshockwave_asset_extractor.exe");
const DEST = resolve("client/assets/casts");
const write = process.argv.includes("--write");

// Source file per cast basename, shallowest wins (see extract-casts.mjs on why).
const sources = new Map();
const walk = (dir, depth) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { walk(full, depth + 1); continue; }
    const m = /^(.*)\.(cct|cst|dcr|dxr)$/i.exec(entry.name);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const prev = sources.get(key);
    const rank = entry.name.toLowerCase().endsWith(".cct") ? 0 : 1;
    if (!prev || depth < prev.depth || (depth === prev.depth && rank < prev.rank)) sources.set(key, { path: full, depth, rank });
  }
};
walk(ARCHIVE, 0);

const readTsv = (path) => readFileSync(path, "utf8").split(/\r?\n/).filter((l) => l !== "");
let fixed = 0, looping = 0;
for (const cast of readdirSync(DEST)) {
  const manifestPath = join(DEST, cast, "manifest.tsv");
  if (!existsSync(manifestPath)) continue;
  const lines = readTsv(manifestPath);
  const header = lines[0].split("\t");
  if (header.includes("loop")) continue;
  if (!lines.some((l) => l.split("\t")[1] === "sound")) continue;

  const src = sources.get(cast.toLowerCase());
  if (!src) { console.log(`${cast}: no source in archive, skipped`); continue; }
  const tmp = mkdtempSync(join(tmpdir(), "vmk-loop-"));
  try {
    mkdirSync(join(tmp, "in"));
    const ext = src.path.slice(src.path.lastIndexOf("."));
    copyFileSync(src.path, join(tmp, "in", cast + ext));
    execFileSync(EXTRACTOR, [join(tmp, "in"), join(tmp, "out")], { stdio: "ignore" });
    const fresh = join(tmp, "out", cast, "manifest.tsv");
    if (!existsSync(fresh)) { console.log(`${cast}: extraction produced no manifest, skipped`); continue; }
    const freshLines = readTsv(fresh);
    const fh = freshLines[0].split("\t");
    const loopAt = fh.indexOf("loop");
    if (loopAt < 0) { console.log(`${cast}: extractor has no loop column?`); continue; }
    const loopById = new Map();
    for (const l of freshLines.slice(1)) {
      const c = l.split("\t");
      if (c[1] === "sound") loopById.set(c[0], c[loopAt] ?? "");
    }
    // Pad every row to the header width, then append loop.
    const width = header.length;
    const out = [[...header, "loop"].join("\t")];
    const loops = [];
    for (const l of lines.slice(1)) {
      const c = l.split("\t");
      while (c.length < width) c.push("");
      const v = c[1] === "sound" ? (loopById.get(c[0]) ?? "") : "";
      if (v === "1" && !loops.includes(c[2])) loops.push(c[2]);
      out.push([...c.slice(0, width), v].join("\t"));
    }
    fixed++;
    looping += loops.length;
    console.log(`${cast}: ${loopById.size} sound member(s)${loops.length ? `, looping: ${loops.join(", ")}` : ""}`);
    if (write) writeFileSync(manifestPath, out.join("\n") + "\n");
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}
console.log(`\n${fixed} manifest(s) ${write ? "updated" : "would be updated"}; ${looping} looping sound(s) found.`);
