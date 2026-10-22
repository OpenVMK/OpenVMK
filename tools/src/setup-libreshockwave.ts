/**
 * Download latest LibreShockwave debugger (Windows) + WASM nightly builds.
 * Run once: npm run tools:shockwave:setup
 */
import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const BASE = join(ROOT, "tools", "shockwave");
const DEBUGGER = join(BASE, "debugger");
const WASM = join(BASE, "wasm");

const DEBUGGER_URL =
  "https://github.com/LibreShockwave/LibreShockwave/releases/download/debugger-20260810-034731/libreshockwave-debugger-windows-x86_64.zip";

function run(cmd: string, cwd?: string) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd });
}

mkdirSync(DEBUGGER, { recursive: true });
mkdirSync(WASM, { recursive: true });

const dbgZip = join(DEBUGGER, "libreshockwave-debugger-windows-x86_64.zip");
if (!existsSync(join(DEBUGGER, "win", "windows-x86_64", "libreshockwave_debugger.exe"))) {
  if (!existsSync(dbgZip)) {
    run(`curl -L -o "${dbgZip}" "${DEBUGGER_URL}"`);
  }
  run(`powershell -NoProfile -Command "Expand-Archive -Path '${dbgZip}' -DestinationPath '${join(DEBUGGER, "win")}' -Force"`);
} else {
  console.log("Debugger already extracted.");
}

const wasmDist = join(WASM, "dist", "libreshockwave-cpp-wasm.wasm");
if (!existsSync(wasmDist)) {
  run("gh release download nightly --repo LibreShockwave/LibreShockwave --pattern libreshockwave-cpp-wasm-*.zip --dir .", WASM);
  const zip = execSync(`powershell -NoProfile -Command "Get-ChildItem '${WASM}' -Filter 'libreshockwave-cpp-wasm-*.zip' | Select-Object -First 1 -ExpandProperty FullName"`)
    .toString()
    .trim();
  if (!zip) throw new Error("WASM zip not found after gh download");
  run(`powershell -NoProfile -Command "Expand-Archive -Path '${zip}' -DestinationPath '${join(WASM, "dist")}' -Force"`);
  const playerSrc = join(ROOT, "tools", "shockwave", "vmk-player.html");
  if (existsSync(playerSrc)) {
    copyFileSync(playerSrc, join(WASM, "dist", "vmk-player.html"));
  }
} else {
  console.log("WASM dist already present.");
}

console.log("\nSetup complete.");
console.log("  Debugger: tools/shockwave/debugger/win/windows-x86_64/libreshockwave_debugger.exe");
console.log("  Player:   npm run tools:shockwave:serve → http://127.0.0.1:5199/player/vmk-player.html");
