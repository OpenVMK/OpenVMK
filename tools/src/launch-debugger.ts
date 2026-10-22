/**
 * Launch LibreShockwave Qt debugger with a VMK Shockwave file.
 * Usage: npm run tools:shockwave:debug -- vmk_8.dcr
 *        npm run tools:shockwave:debug -- vmk_core/core.cct
 */
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const DEBUGGER = join(ROOT, "tools", "shockwave", "debugger", "win", "windows-x86_64", "libreshockwave_debugger.exe");
const SHOCKWAVE = process.env.VMK_SHOCKWAVE ?? join(ROOT, "shockwave");

const arg = process.argv[2] ?? "vmk_core/core.cct";
const movie = arg.includes(":") || arg.startsWith("\\") ? arg : join(SHOCKWAVE, arg.replace(/^\//, ""));

if (!existsSync(DEBUGGER)) {
  console.error(`Debugger not found. Run: npm run tools:shockwave:setup`);
  process.exit(1);
}
if (!existsSync(movie)) {
  console.error(`Movie not found: ${movie}`);
  process.exit(1);
}

console.log(`Opening ${movie}`);
console.log(`Working directory: ${SHOCKWAVE}`);
console.log(`\nBefore Play:`);
console.log(`  1. Start: npm run tools:shockwave:serve`);
console.log(`  2. Debugger → Parameters → paste tools/shockwave/debugger-params.local.txt`);
console.log(`  3. Only vmk_8.dcr / vmk_14.dcr are entry points (.cct libraries look black)`);
console.log(`  See tools/shockwave/DEBUGGING.md\n`);

const child = spawn(DEBUGGER, ["--play", movie], {
  detached: true,
  stdio: "ignore",
  cwd: SHOCKWAVE,
});
child.unref();
