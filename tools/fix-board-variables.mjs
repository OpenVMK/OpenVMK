// Repair the `room.<code>.board.<n>` lines in the served external_texts.
//
// WHAT WENT WRONG: a find/replace pointed the billboard image URLs at this
// server but ate the rest of each URL along with its closing quote, turning
//
//   #content: "http://www2.virtualmagickingdom.com/homepage/download/image_59_0.jpg",
// into
//   #content: "http://127.0.0.1:5199/ #space: ...
//
// an unterminated string. `CBillBoardManager.InitBillBoard` parses the prop
// list and calls `queueDownload(tContent.content, ...)`, so a malformed entry
// means no download and the board keeps its `shadow.pixel` placeholder — the
// black rectangle.
//
// The path was the important half: the archive mirrors those images under
// `siteref/homepage/download/`, and assets.ts already serves that tree at
// `/homepage/download/`. So the correct rewrite changes ONLY the host.
//
//   node tools/fix-board-variables.mjs [--origin http://127.0.0.1:5199] [--check]
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const origin = (() => {
  const i = args.indexOf("--origin");
  return i >= 0 ? args[i + 1] : (process.env.VMK_PUBLIC_ORIGIN ?? "http://127.0.0.1:5199");
})();
const checkOnly = args.includes("--check");

const SERVED = "assets/overlay/external_texts.txt";
const ORIGINAL = "docs/original-client-spec/enchanter/decrypted_texts_208.txt";
const IMAGE_DIRS = [
  join(process.env.VMK_SHOCKWAVE ?? join(import.meta.dirname, "..", "shockwave"), "siteref/homepage/download"),
  "assets/overlay/siteref/homepage/download",
];

// The archive is not consistent about case (`Image_86_0.jpg`), so match loosely.
const available = new Map();
for (const dir of IMAGE_DIRS) {
  if (!existsSync(dir)) continue;
  for (const name of readdirSync(dir)) available.set(name.toLowerCase(), join(dir, name));
}

const boardLine = /^(room\.\d+\.board\.\d+)=(.*)$/;
const originals = new Map();
for (const line of readFileSync(ORIGINAL, "latin1").split(/\r?\n/)) {
  const m = boardLine.exec(line);
  if (m) originals.set(m[1], m[2]);
}

const served = readFileSync(SERVED, "latin1").split(/\r?\n/);
let repaired = 0, alreadyOk = 0, noSource = 0, missingImage = 0;
const notes = [];

const out = served.map((line) => {
  const m = boardLine.exec(line);
  if (!m) return line;
  const [, key] = m;
  const source = originals.get(key);
  if (!source) {
    noSource++;
    return line;
  }
  // Only the host changes; the path is what resolves to the archived image.
  const fixed = source.replace(
    /https?:\/\/www2\.virtualmagickingdom\.com/g,
    origin,
  );
  for (const url of fixed.matchAll(/#content:\s*"([^"]*)"/g)) {
    const file = url[1].split("/").pop();
    if (file && !available.has(file.toLowerCase())) {
      missingImage++;
      notes.push(`  ${key}: image not in archive — ${file}`);
    }
  }
  if (line === `${key}=${fixed}`) {
    alreadyOk++;
    return line;
  }
  repaired++;
  return `${key}=${fixed}`;
});

const balanced = (s) => (s.match(/"/g)?.length ?? 0) % 2 === 0;
const stillBroken = out.filter((l) => boardLine.test(l) && !balanced(l));

console.log(`origin: ${origin}`);
console.log(`board lines repaired: ${repaired}, already correct: ${alreadyOk}, no archived source: ${noSource}`);
console.log(`board lines with unbalanced quotes after repair: ${stillBroken.length}`);
if (missingImage) {
  console.log(`\n${missingImage} board(s) reference an image the archive does not have:`);
  console.log(notes.join("\n"));
  console.log("  (those boards stay blank; everything else will render)");
}
if (checkOnly) {
  console.log("\n--check: nothing written");
} else if (repaired > 0) {
  // ⚠ CRLF, NOT "\n". The shipped texts are 100% CRLF (the archive's own copies
  // have 4749 CRLF and zero bare LF), and reading with /\r?\n/ then joining
  // with "\n" silently rewrote all ~4700 lines of an otherwise untouched file.
  writeFileSync(SERVED, out.join("\r\n"), "latin1");
  console.log(`\nwrote ${SERVED}`);
} else {
  console.log("\nnothing to change");
}
