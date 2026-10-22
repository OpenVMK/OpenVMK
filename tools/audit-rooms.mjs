/**
 * Room health audit — every check that has caught a real bug, in one pass.
 *
 * WHY THIS EXISTS
 *
 * Every failure this covers is SILENT from inside the client. A cast that was
 * never extracted attaches with zero members; a cast without `bitmaps.tsv`
 * renders every bitmap as a 1x1 dot; a member that produced no asset never
 * reaches the manifest so `memberExists` lies about it; a sound cast that lost
 * the `room_ready` race leaves the room quiet forever. None of them throw, and
 * all of them read as "that room looks wrong" rather than as a pipeline gap.
 *
 * Each check below is here because it found something:
 *
 *   casts        vmk_nautilus_private shipped a 46KB stub over the real 429KB room
 *   index        re-extracting 8 space casts silently made every bitmap 1x1
 *   docs         a room with no project doc cannot build at all
 *   members      `noblink_loop` (the squid) was declared by nothing
 *   filmloops    10 animated props across 7 rooms resolved to nothing
 *   audio        ~129 sound casts rely on room_ready and can lose the race
 *   stale        270 stub-derived modules shadowed the core room framework
 *
 *   node tools/audit-rooms.mjs            # summary + failures
 *   node tools/audit-rooms.mjs --verbose  # every room, including clean ones
 *
 * ⚠ VMK STORIES IS NOT REAL CONTENT. Rooms 111-135 and 2000/2001 (`vmks_*`)
 * declare casts that were never extracted and never will be; they are excluded
 * so the real failures are not buried under 51 expected ones.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const CASTS = join(ROOT, "client", "assets", "casts");
const VARS = join(ROOT, "assets", "external_variables_casts.txt");
const GENERATED = join(ROOT, "client", "src", "generated-casts");
const verbose = process.argv.includes("--verbose");

if (!existsSync(VARS)) {
  console.error(`cast map not found: ${VARS}\nrun from the repo root.`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// The cast map: which casts each room loads, and which space cast it IS.
// ---------------------------------------------------------------------------
const baseline = new Set();
const roomCasts = new Map();
const roomCode = new Map();

for (const line of readFileSync(VARS, "utf8").split(/\r?\n/)) {
  let m;
  const name = (v) => v.trim().split("/").pop();
  if ((m = /^cast\.entry\.\d+=(.*)$/.exec(line))) baseline.add(name(m[1]));
  else if ((m = /^room\.cast\.(\d+)\.\d+=(.*)$/.exec(line))) {
    const id = Number(m[1]);
    if (!roomCasts.has(id)) roomCasts.set(id, new Set());
    roomCasts.get(id).add(name(m[2]));
  } else if ((m = /^room\.code\.(\d+)=(.*)$/.exec(line))) roomCode.set(Number(m[1]), m[2].trim());
}

const isStories = (id, space) => (id >= 111 && id <= 135) || id === 2000 || id === 2001
  || /^vmks_/.test(space ?? "");

// ---------------------------------------------------------------------------
// Per-cast facts, read once.
// ---------------------------------------------------------------------------
const castCache = new Map();
const castFacts = (cast) => {
  if (castCache.has(cast)) return castCache.get(cast);
  const dir = join(CASTS, cast);
  const facts = {
    present: existsSync(dir), members: new Set(), memberCount: 0,
    pngs: 0, sounds: 0, hasIndex: false, scripts: 0, scriptFiles: 0,
    docs: [], visualRefs: [], filmLoopRefs: [], texts: new Set(),
  };
  if (facts.present) {
    facts.hasIndex = existsSync(join(dir, "bitmaps.tsv"));
    /**
     * ⚠ COUNT THE EXTRACTOR'S OWN `.ls` OUTPUT, not manifest script rows.
     *
     * A manifest row is only written for a script that has an OWNING MEMBER, so
     * a movie script produces `.ls` files and no rows at all —
     * `vmk_snd_fireworks_preshow` has 2 decompiled scripts, 2 legitimate
     * `CSoundStart` modules, and 0 script rows. Keying staleness on the rows
     * therefore accuses a perfectly good cast.
     */
    const scriptDir = join(dir, "scripts");
    if (existsSync(scriptDir)) facts.scriptFiles = readdirSync(scriptDir).length;
    const mf = join(dir, "manifest.tsv");
    if (existsSync(mf)) {
      const ids = new Set();
      for (const row of readFileSync(mf, "utf8").split(/\r?\n/).slice(1)) {
        if (!row.trim()) continue;
        const c = row.split("\t");
        ids.add(c[0]);
        if (c[2]) facts.members.add(c[2]);
        const asset = c[6] ?? "";
        if (asset.startsWith("bitmaps/")) facts.pngs++;
        if (asset.startsWith("sounds/")) facts.sounds++;
        if (c[1] === "script") facts.scripts++;
      }
      facts.memberCount = ids.size;
    }
    const textDir = join(dir, "text");
    if (existsSync(textDir)) {
      for (const file of readdirSync(textDir)) {
        facts.texts.add(file);
        if (!file.endsWith(".visual.xml_stxt_0.txt")) continue;
        const body = readFileSync(join(textDir, file), "utf8");
        for (const s of body.matchAll(/<SPRITE[^>]*\/>/g)) {
          const mem = /MEMBER="([^"]+)"/.exec(s[0])?.[1];
          if (!mem) continue;
          facts.visualRefs.push(mem);
          if (/TYPE="filmLoop"/.test(s[0])) facts.filmLoopRefs.push(mem);
        }
      }
    }
  }
  castCache.set(cast, facts);
  return facts;
};

// A cast whose modules linger after it was re-extracted with no scripts.
const generatedPrefixes = new Set();
if (existsSync(GENERATED)) {
  for (const file of readdirSync(GENERATED)) {
    const prefix = file.split("__")[0];
    if (prefix) generatedPrefixes.add(prefix);
  }
}

// `t1`..`t8` are 24x28 BLEND=5 authoring markers referenced by ~45 rooms and
// declared by NO cast in the shipped archive — the original could not resolve
// them either. Counted, never failed.
const isMarker = (name) => /^t\d+$/.test(name);

// ---------------------------------------------------------------------------
const results = [];
for (const [id, space] of [...roomCode].sort((a, b) => a[0] - b[0])) {
  if (isStories(id, space)) continue;
  // ⚠ `room.code.<id>` is the room's NAME ("cambodian"), not a cast. Its cast is
  // listed in `room.cast.<id>.*` like every other ("vmk_spaces/vmk_cambodian").
  // Treating the name as a cast reports every room as missing a cast it never
  // had.
  const loaded = new Set([...baseline, ...(roomCasts.get(id) ?? [])]);
  const room = { id, space, problems: [], notes: [], markers: 0 };

  // 1. Every declared cast extracted and non-empty.
  for (const cast of loaded) {
    const f = castFacts(cast);
    if (!f.present) room.problems.push(`cast NOT EXTRACTED: ${cast}`);
    else if (f.memberCount === 0) room.problems.push(`cast EMPTY: ${cast}`);
    else if (f.pngs > 0 && !f.hasIndex) room.problems.push(`no bitmaps.tsv (all art 1x1): ${cast}`);
    // Modules on disk for a cast that decompiled to NOTHING are leftovers from a
    // previous extraction, and they shadow the core framework classes by name —
    // `vmk_nautilus_private` kept 270 of them from a stub and stripped
    // `ShowAvatarName` off `CRoomVisualAvatar` for every room that loaded it.
    if (f.present && f.scriptFiles === 0 && generatedPrefixes.has(cast)) {
      room.problems.push(`stale generated-casts modules: ${cast} (extractor decompiled 0 scripts)`);
    }
  }

  // 2. Some loaded cast must carry the docs the room is built from. Identify it
  //    by the project doc rather than by name — that IS what makes it the space
  //    cast, and `_PrepareRoom` reads the layouts it names.
  const spaceCast = [...loaded].find((c) =>
    [...castFacts(c).texts].some((t) => /project\..*\.xml/.test(t) && !/backup/.test(t)));
  if (!spaceCast) room.problems.push("no cast carries a project doc — room cannot build");
  else {
    const sf = castFacts(spaceCast);
    const has = (re) => [...sf.texts].some((t) => re.test(t) && !/backup/.test(t));
    if (!has(/\.visual\.xml/)) room.problems.push(`no visual score in ${spaceCast}`);
    if (!has(/room\..*\.object\.xml/)) room.problems.push(`no object doc in ${spaceCast}`);
  }

  // 3. Every member the room's scores name must resolve in a cast it loads.
  const known = new Set();
  for (const cast of loaded) for (const n of castFacts(cast).members) known.add(n);
  const unresolved = new Map();
  for (const cast of loaded) {
    for (const ref of castFacts(cast).visualRefs) {
      if (known.has(ref)) continue;
      if (isMarker(ref)) { room.markers++; continue; }
      if (!unresolved.has(ref)) unresolved.set(ref, cast);
    }
  }
  for (const [ref, cast] of unresolved) room.problems.push(`unresolved member "${ref}" (asked by ${cast})`);

  // 4. Film loops — the score names them, something must declare them.
  for (const cast of loaded) {
    for (const ref of castFacts(cast).filmLoopRefs) {
      if (!known.has(ref)) room.problems.push(`filmLoop missing: "${ref}" (${cast})`);
    }
  }

  // 5. Audio, including the room_ready race.
  const soundCasts = [...loaded].filter((c) => /^vmk_snd|_snd_/.test(c));
  if (soundCasts.length === 0) room.notes.push("declares no sound cast");
  for (const cast of soundCasts) {
    const f = castFacts(cast);
    if (!f.present) continue;
    if (f.sounds === 0) room.problems.push(`sound cast has NO audio: ${cast}`);
    const hasDocs = f.members.has("Sound.xml") || f.members.has("Tracker.xml")
      || [...f.members].some((n) => /sound\.xml|tracker\.xml/i.test(n));
    if (!hasDocs) room.notes.push(`${cast}: no Sound.xml/Tracker.xml (nothing to schedule)`);
    else if (!generatedPrefixes.has(cast) || !readdirSync(GENERATED).some((x) => x.startsWith(`${cast}__CSoundStart__`))) {
      /**
       * ⚠ EXPOSURE, NOT A VERDICT. Six sound casts carry a `CSoundStart`, which
       * broadcasts `LoadRoomSound` when that cast attaches — necessarily after
       * it is available, so those rooms cannot lose. Every other room depends on
       * `room_ready`, which `_PrepareRoom` fires without waiting for the sound
       * cast; if it arrives first, `StartRoomSounds` finds no `Sound.xml`, its
       * guard returns, and nothing ever retries.
       *
       * That is a RACE, so listing here does not mean silent. MEASURED: room 6
       * (cambodian) loses it and is silent, while Town Square has no CSoundStart
       * either and wins it — 21 cues, 4 sounds playing. Use this list to know
       * which rooms are AT RISK; confirm a room by reading
       * `core.pObjectList.getaProp('SoundTracker').m_mpSoundData`.
       */
      room.notes.push(`${cast}: no CSoundStart — audio exposed to the room_ready race`);
    }
  }

  results.push(room);
}

// ---------------------------------------------------------------------------
const failed = results.filter((r) => r.problems.length > 0);
const noted = results.filter((r) => r.problems.length === 0 && r.notes.length > 0);

console.log(`rooms audited: ${results.length}   (VMK Stories excluded)`);
console.log(`rooms with PROBLEMS: ${failed.length}`);
console.log(`rooms clean but noted: ${noted.length}`);
console.log(`unresolved t1-t8 marker refs (expected, absent from the archive): ` +
  results.reduce((n, r) => n + r.markers, 0));

if (failed.length) {
  console.log("\n=== PROBLEMS ===");
  for (const r of failed) {
    console.log(`\n  room ${String(r.id).padEnd(5)} ${r.space}`);
    for (const p of r.problems) console.log(`      ✗ ${p}`);
  }
}

const raceRooms = results.filter((r) => r.notes.some((n) => /room_ready race/.test(n)));
console.log(`\n=== AUDIO: rooms exposed to the room_ready race: ${raceRooms.length} ===`);
console.log(`  AT RISK, not confirmed silent — it is a race and some rooms win it.`);
console.log(`  (room 6 loses it and is silent; Town Square wins it and plays 21 cues)`);
if (verbose) for (const r of raceRooms) console.log(`      room ${String(r.id).padEnd(5)} ${r.space}`);

const silent = results.filter((r) => r.notes.some((n) => /declares no sound cast|nothing to schedule/.test(n)));
if (silent.length) {
  console.log(`\n=== rooms with no sound cast or no cue docs: ${silent.length} ===`);
  for (const r of silent) console.log(`      room ${String(r.id).padEnd(5)} ${r.space.padEnd(28)} ${r.notes.join("; ")}`);
}

if (verbose) {
  console.log("\n=== CLEAN ===");
  for (const r of results.filter((x) => x.problems.length === 0)) {
    console.log(`      room ${String(r.id).padEnd(5)} ${r.space}`);
  }
}

process.exitCode = failed.length > 0 ? 1 : 0;
