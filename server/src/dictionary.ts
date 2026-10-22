/**
 * The client's EXPANDED word list.
 *
 * `dictionary_177` is "crunched": an entry may carry ispell-style affix flags
 * after a slash (`"ability/MS"`). The client expands each entry into the bare
 * word plus one derived form per flag, and every derived form takes its own
 * index. So the list the client indexes against is far longer than the file,
 * and a raw index into the file resolves to the wrong word or none at all.
 *
 * That mismatch is why chat tokens were treated as opaque for so long: the
 * server could not turn index 9416 back into "badges". This module reproduces
 * `CAffixExpanderAndConditionEvaluator` exactly so it can.
 *
 * ⚠ ORDER IS THE CONTRACT. The index is a position, so any difference in how
 * many forms a flag produces — or the order they are appended — silently shifts
 * every later word. `verifyDictionary` pins it against indices observed on the
 * wire; run it if you touch anything here.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ARCHIVE } from "./paths.js";

const here = dirname(fileURLToPath(import.meta.url));

interface Rule {
  /** A sequence of single-character classes, already valid regex syntax. */
  condition: string;
  /** Removed from the word before the affix is attached. */
  strip: string;
  /** Attached to the front (prefix rules) or the back (suffix rules). */
  add: string;
}

/**
 * Transcribed verbatim from `CAffixExpanderAndConditionEvaluator.construct`.
 * Each flag exists in both cases and maps to identical rules; the client stores
 * them as separate entries, so both are kept rather than lower-casing lookups.
 */
const PREFIXES: Record<string, Rule[]> = {
  A: [{ condition: ".", strip: "", add: "re" }],
  I: [{ condition: ".", strip: "", add: "in" }],
  U: [{ condition: ".", strip: "", add: "un" }],
};

const SUFFIXES: Record<string, Rule[]> = {
  V: [
    { condition: "E", strip: "E", add: "ive" },
    { condition: "[^E]", strip: "", add: "ive" },
  ],
  N: [
    { condition: "E", strip: "E", add: "ion" },
    { condition: "Y", strip: "Y", add: "ication" },
    { condition: "[^EY]", strip: "", add: "en" },
  ],
  X: [
    { condition: "E", strip: "E", add: "ions" },
    { condition: "Y", strip: "Y", add: "ications" },
    { condition: "[^EY]", strip: "", add: "ens" },
  ],
  H: [
    { condition: "Y", strip: "Y", add: "ieth" },
    { condition: "[^Y]", strip: "", add: "th" },
  ],
  Y: [{ condition: ".", strip: "", add: "ly" }],
  G: [
    { condition: "E", strip: "E", add: "ing" },
    { condition: "[^E]", strip: "", add: "ing" },
  ],
  J: [
    { condition: "E", strip: "E", add: "ings" },
    { condition: "[^E]", strip: "", add: "ings" },
  ],
  D: [
    { condition: "E", strip: "", add: "d" },
    { condition: "[^AEIOU]Y", strip: "Y", add: "ied" },
    { condition: "[^EY]", strip: "", add: "ed" },
    { condition: "[AEIOU]Y", strip: "Y", add: "ed" },
  ],
  T: [
    { condition: "E", strip: "", add: "st" },
    { condition: "[^AEIOU]Y", strip: "Y", add: "iest" },
    { condition: "[AEIOU]Y", strip: "", add: "est" },
    { condition: "[^EY]", strip: "", add: "est" },
  ],
  R: [
    { condition: "E", strip: "", add: "r" },
    { condition: "[^AEIOU]Y", strip: "Y", add: "ier" },
    { condition: "[AEIOU]Y", strip: "", add: "er" },
    { condition: "[^EY]", strip: "", add: "er" },
  ],
  Z: [
    { condition: "E", strip: "", add: "rs" },
    { condition: "[^AEIOU]Y", strip: "Y", add: "iers" },
    { condition: "[AEIOU]Y", strip: "", add: "ers" },
    { condition: "[^EY]", strip: "", add: "ers" },
  ],
  S: [
    { condition: "[^AEIOU]Y", strip: "Y", add: "ies" },
    { condition: "[AEIOU]Y", strip: "", add: "s" },
    { condition: "[SXZH]", strip: "", add: "es" },
    { condition: "[^SXZHY]", strip: "", add: "s" },
  ],
  P: [
    { condition: "[^AEIOU]Y", strip: "Y", add: "iness" },
    { condition: "[AEIOU]Y", strip: "", add: "ness" },
    { condition: "[^Y]", strip: "", add: "ness" },
  ],
  M: [{ condition: ".", strip: "", add: "'s" }],
};

/** Exactly `m_ar_validFlags`. A flag outside this set means a corrupt file. */
const VALID_FLAGS = new Set(
  "AaIiUuVvNnXxHhYyGgJjDdTtRrZzSsPpMm".split(""),
);

/**
 * ⚠ Case-insensitive ON PURPOSE. Lingo's `=` on strings ignores case, so
 * `TestString` matches the uppercase conditions against lowercase dictionary
 * words. A case-sensitive port silently produces fewer forms and shifts every
 * index after the first affected word.
 */
const conditionMatches = (word: string, condition: string, atEnd: boolean): boolean => {
  if (condition === ".") return true;
  const re = new RegExp(atEnd ? `(?:${condition})$` : `^(?:${condition})`, "i");
  return re.test(word);
};

function applyFlag(bare: string, flag: string, out: string[]): void {
  const upper = flag.toUpperCase();
  for (const rule of PREFIXES[upper] ?? []) {
    if (!conditionMatches(bare, rule.condition, false)) continue;
    let word = bare;
    if (rule.strip && word.toLowerCase().startsWith(rule.strip.toLowerCase())) {
      word = word.slice(rule.strip.length);
    }
    out.push(rule.add + word);
  }
  for (const rule of SUFFIXES[upper] ?? []) {
    if (!conditionMatches(bare, rule.condition, true)) continue;
    let word = bare;
    if (rule.strip && word.toLowerCase().endsWith(rule.strip.toLowerCase())) {
      word = word.slice(0, word.length - rule.strip.length);
    }
    out.push(word + rule.add);
  }
}

/** `ExpandListToList`: bare word first, then each flag's forms, in file order. */
export function expandDictionary(raw: string[]): string[] {
  const out: string[] = [];
  for (const entry of raw) {
    const slash = entry.indexOf("/");
    const bare = slash > 0 ? entry.slice(0, slash) : entry;
    out.push(bare);
    if (slash <= 0) continue;
    for (const flag of entry.slice(slash + 1)) {
      // The client errors out here; we skip, so one odd entry cannot take the
      // whole dictionary down. It would shift indices, which `verifyDictionary`
      // is there to catch.
      if (VALID_FLAGS.has(flag)) applyFlag(bare, flag, out);
    }
  }
  return out;
}

function findDictionaryFile(): string | null {
  const candidates = [
    process.env.VMK_DICTIONARY,
    join(here, "..", "..", "assets", "overlay", "siteref", "homepage", "download", "dictionary_177"),
    join(
      ARCHIVE,
      "siteref",
      "homepage",
      "download",
      "dictionary_177",
    ),
  ].filter((p): p is string => Boolean(p));
  return candidates.find((p) => existsSync(p)) ?? null;
}

let expanded: string[] | null = null;

/** The expanded list, loaded once. Empty if the dictionary file is missing. */
export function expandedWords(): string[] {
  if (expanded) return expanded;
  const source = findDictionaryFile();
  if (!source) {
    expanded = [];
    return expanded;
  }
  const text = readFileSync(source, "latin1");
  const raw = [...text.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  expanded = expandDictionary(raw);
  console.log(
    `[chat] dictionary: ${raw.length} crunched entries -> ${expanded.length} expanded words`,
  );
  return expanded;
}

/** Resolve a client token index (1-based) to its word, or null. */
export function wordAt(index: number): string | null {
  const words = expandedWords();
  return index >= 1 && index <= words.length ? words[index - 1] : null;
}

/**
 * Pin the expansion against indices actually seen on the wire.
 *
 * These came from real chat traffic: typing `! badges 6` logged
 * `<word:9338><word:9416> 6`, so 9338 is "!" and 9416 is "badges". If either
 * fails, the expansion has drifted and every token index is suspect.
 */
export function verifyDictionary(): { ok: boolean; details: string[] } {
  const checks: Array<[number, string]> = [
    [9338, "!"],
    [9416, "badges"],
  ];
  const details: string[] = [];
  let ok = true;
  for (const [index, want] of checks) {
    const got = wordAt(index);
    const pass = got === want;
    if (!pass) ok = false;
    details.push(`${pass ? "ok  " : "FAIL"} index ${index}: expected "${want}", got "${got ?? "(none)"}"`);
  }
  return { ok, details };
}
