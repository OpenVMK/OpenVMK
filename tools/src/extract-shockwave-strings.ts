import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const SHOCKWAVE = process.env.VMK_SHOCKWAVE ?? join(ROOT, "shockwave");
const OUT = join(ROOT, "docs", "original-client-spec", "shockwave-strings.json");

function extractStrings(buffer: Buffer, minLen = 5): string[] {
  const results = new Set<string>();
  let current = "";
  for (let i = 0; i < buffer.length; i++) {
    const b = buffer[i];
    if (b >= 0x20 && b <= 0x7e) {
      current += String.fromCharCode(b);
    } else {
      if (current.length >= minLen) results.add(current);
      current = "";
    }
  }
  if (current.length >= minLen) results.add(current);
  return [...results].sort();
}

const targets = [
  { name: "vmk_8.dcr", path: join(SHOCKWAVE, "vmk_8.dcr") },
  { name: "core.cct", path: join(SHOCKWAVE, "vmk_core", "core.cct") },
  { name: "vmk_central.cct", path: join(SHOCKWAVE, "vmk_spaces", "vmk_central.cct") },
  { name: "framework.dcr", path: join(SHOCKWAVE, "vmk_spaces", "framework.dcr") },
];

const output: Record<string, { size: number; strings: string[]; networkHints: string[]; urlHints: string[] }> = {};

for (const t of targets) {
  const buf = readFileSync(t.path);
  const strings = extractStrings(buf);
  output[t.name] = {
    size: buf.length,
    strings,
    networkHints: strings.filter((s) =>
      /socket|connect|login|packet|message|room|walk|chat|server|http|\.cct|\.dcr|external/i.test(s),
    ),
    urlHints: strings.filter((s) => /https?:\/\/|\.com|\.php|openvmk|vmk/i.test(s)),
  };
  console.log(`${t.name}: ${strings.length} strings, ${output[t.name].networkHints.length} network hints`);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(output, null, 2));
console.log(`Wrote ${OUT}`);
