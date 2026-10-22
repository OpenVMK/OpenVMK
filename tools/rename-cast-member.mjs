/**
 * Rename a cast member inside an Afterburner cast (.cct), for Shockwave.
 *
 *   node tools/rename-cast-member.mjs <in.cct> <from> <to> <out.cct>
 *
 * The TS client fixes a misnamed member at load time (`MEMBER_RENAMES` in
 * boot-client.ts); the real Shockwave player reads the cast as shipped, so the
 * same fix has to be written into a patched copy under assets/patches/.
 * MEASURED: the messenger cast 0b6ee192 names its handler `CMessyCheeseStuff`
 * while thread.index asks for `CMessengerHandler`, so Shockwave never built the
 * messenger, never sent MESSENGER_INIT, and never received staff mail.
 *
 * Only same-length names are supported: the name is rewritten in place inside
 * the CASt chunk, so no info-table offset moves.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { read, chunkData, write } from "./shockwave/afterburner.mjs";

const [, , inPath, from, to, outPath] = process.argv;
if (!inPath || !from || !to || !outPath) {
  console.error("usage: node tools/rename-cast-member.mjs <in.cct> <from> <to> <out.cct>");
  process.exit(2);
}
if (from.length !== to.length) throw new Error(`"${from}" and "${to}" differ in length`);

const cast = read(readFileSync(inPath));
const needle = Buffer.concat([Buffer.from([from.length]), Buffer.from(from, "latin1")]);
const replacement = Buffer.concat([Buffer.from([to.length]), Buffer.from(to, "latin1")]);
const replacements = new Map();
for (const entry of cast.entries) {
  if (entry.tag !== "CASt") continue;
  const data = chunkData(cast, entry);
  const at = data.indexOf(needle);
  if (at < 0) continue;
  if (data.indexOf(needle, at + 1) >= 0) throw new Error(`"${from}" appears twice in CASt ${entry.resId}`);
  const patched = Buffer.from(data);
  replacement.copy(patched, at);
  replacements.set(entry.resId, patched);
}
if (replacements.size !== 1) throw new Error(`expected one CASt named "${from}", found ${replacements.size}`);

writeFileSync(outPath, write(cast, replacements));
const check = read(readFileSync(outPath));
const renamed = check.entries.filter((e) => e.tag === "CASt" && chunkData(check, e).includes(replacement));
console.log(`renamed "${from}" -> "${to}" in CASt ${[...replacements.keys()][0]}; re-read finds ${renamed.length}`);
