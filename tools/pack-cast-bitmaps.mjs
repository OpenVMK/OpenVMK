/**
 * Bundle each extracted cast's bitmaps into ONE file: `bitmaps.pack`.
 *
 *   node tools/pack-cast-bitmaps.mjs            # every cast, incremental
 *   node tools/pack-cast-bitmaps.mjs --force    # rebuild all
 *   node tools/pack-cast-bitmaps.mjs vmk_avatar_sh_1_2 gfx_avatar_bodyparts
 *
 * WHY: the original client downloaded a cast as ONE `.cct`. Our extraction
 * splits a cast into one PNG per member, so an outfit cast is up to 123
 * requests. VMK loads casts strictly one at a time (`net.operation.count=1`,
 * faithful), and the browser allows six connections per host, so the Character
 * window + first avatar spent ~12 of ~17 seconds waiting on round-trips with
 * the CPU idle (MEASURED, `?perf=sample`). One request per cast again.
 *
 * FORMAT (little-endian):
 *   "VPK1"                  4 bytes, magic
 *   headerLength            uint32
 *   header                  UTF-8 JSON: { "files": { "bitmaps/<file>.png": [offset, length] } }
 *   data                    the PNGs back to back; offsets are from the start of data
 *
 * The PNG files stay where they are: the client falls back to them for any
 * cast without a pack, so this is purely an accelerator. Packs live next to the
 * extraction under client/assets/casts/, which is already gitignored.
 */
import { existsSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * ⚠ ONLY CASTS THE CLIENT DOWNLOADS IN FULL ANYWAY. Clothing and body parts
 * (every part is made resident), furniture items and NPCs (resident in full)
 * gain; a ROOM or core UI cast would lose — the client fetches only the few
 * bitmaps it needs from those (the magic-effects cast alone is 22 MB), and a
 * pack would drag the whole cast down for one frame. Keep in step with
 * `castHasPack` in client/src/lingo/boot-client.ts.
 */
export const castHasPack = (cast) => /^(vmk_avatar_|gfx_avatar_|item_\d+$|vmk_npc_)/.test(cast);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// `--root <castsDir>`: make-release.mjs packs the release copy, whose PNGs it
// has just recompressed (tools/release/optimize-pngs.mjs).
const rootAt = process.argv.indexOf("--root");
const CASTS = rootAt >= 0 ? resolve(process.argv[rootAt + 1]) : join(ROOT, "client", "assets", "casts");
const force = process.argv.includes("--force");
const only = process.argv.slice(2).filter((a, i, all) => !a.startsWith("--") && all[i - 1] !== "--root");

let built = 0;
let skipped = 0;
let bytesOut = 0;
const casts = (only.length ? only : readdirSync(CASTS)).filter(castHasPack);
// A pack for any other cast is a leftover that would slow that cast down.
let removed = 0;
for (const cast of readdirSync(CASTS)) {
  const stale = join(CASTS, cast, "bitmaps.pack");
  if (!castHasPack(cast) && existsSync(stale)) { unlinkSync(stale); removed++; }
}
if (removed) console.log(`removed ${removed} pack(s) from casts that must not have one`);
for (const cast of casts) {
  const dir = join(CASTS, cast, "bitmaps");
  if (!existsSync(dir)) continue;
  const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".png")).sort();
  if (files.length === 0) continue;
  const out = join(CASTS, cast, "bitmaps.pack");

  if (!force && existsSync(out)) {
    const packed = statSync(out).mtimeMs;
    const newest = Math.max(...files.map((f) => statSync(join(dir, f)).mtimeMs), statSync(dir).mtimeMs);
    if (newest <= packed) { skipped++; continue; }
  }

  const index = {};
  const chunks = [];
  let offset = 0;
  for (const file of files) {
    const bytes = readFileSync(join(dir, file));
    index[`bitmaps/${file}`] = [offset, bytes.length];
    chunks.push(bytes);
    offset += bytes.length;
  }
  const header = Buffer.from(JSON.stringify({ files: index }), "utf8");
  const prefix = Buffer.alloc(8);
  prefix.write("VPK1", 0, "ascii");
  prefix.writeUInt32LE(header.length, 4);
  const pack = Buffer.concat([prefix, header, ...chunks]);
  writeFileSync(out, pack);
  built++;
  bytesOut += pack.length;
}
console.log(`packed ${built} cast(s), ${(bytesOut / 1048576).toFixed(1)} MB; ${skipped} already current`);
