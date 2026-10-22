/**
 * Patch LibreShockwave WASM worker to rewrite the dead hosts baked into the archived casts to a local origin.
 * beta.myvmk.com/vmk/loading.php -> ${VMK_PUBLIC_ORIGIN}/vmk/loading.php (default: same host as player)
 *
 * Run after npm run tools:shockwave:build-wasm
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerPath = join(__dirname, "wasm", "dist", "libreshockwave-cpp-worker.js");
const playerPath = join(__dirname, "wasm", "dist", "libreshockwave-cpp-player.js");

const ORIGIN_VAR = "let vmkAssetOrigin = null;";
const REWRITE_FN = `function rewriteRemoteFetchUrl(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    const local = vmkAssetOrigin || self.location.origin;
    const deadHosts = new Set([
      "beta.myvmk.com",
      "game.myvmk.com",
      "www.myvmk.com",
      "download.myvmk.com",
      "play.openvmk.com",
      "www.openvmk.com",
      "openvmk.com",
      // Legacy OpenVMK / VMK CDN IPs hardcoded in vmk_8 CInit
      "204.12.248.90",
      "95.47.119.125",
    ]);
    if (!deadHosts.has(host)) return url;
    if (host === "download.myvmk.com") {
      return new URL("/shims/download" + parsed.pathname + parsed.search, local).href;
    }
    return new URL(parsed.pathname + parsed.search, local).href;
  } catch {
    return url;
  }
}`;

const INIT_HOOK = "  vmkAssetOrigin = message.assetOrigin || null;";

function patchWorker(src) {
  if (!src.includes(ORIGIN_VAR)) {
    const anchor = "let fetchCache = new Map();";
    if (!src.includes(anchor)) {
      throw new Error("Worker layout changed — update apply-fetch-rewrite-patch.mjs (fetchCache anchor)");
    }
    src = src.replace(anchor, `${ORIGIN_VAR}\n${anchor}`);
  }

  if (src.includes("function rewriteRemoteFetchUrl(url)")) {
    src = src.replace(/function rewriteRemoteFetchUrl\(url\) \{[\s\S]*?\n\}/, REWRITE_FN);
  } else {
    const anchor = "async function fetchBytes(url, request = {}) {";
    if (!src.includes(anchor)) {
      throw new Error("Worker layout changed — update apply-fetch-rewrite-patch.mjs (fetchBytes anchor)");
    }
    src = src.replace(anchor, `${REWRITE_FN}\n\n${anchor}`);
    src = src.replace(
      "async function fetchBytes(url, request = {}) {",
      "async function fetchBytes(url, request = {}) {\n  url = rewriteRemoteFetchUrl(url);",
    );
  }

  if (!src.includes("url = rewriteRemoteFetchUrl(url);")) {
    src = src.replace(
      "async function fetchBytes(url, request = {}) {",
      "async function fetchBytes(url, request = {}) {\n  url = rewriteRemoteFetchUrl(url);",
    );
  }

  if (!src.includes(INIT_HOOK.trim())) {
    const initAnchor = "async function init(message) {\n  await ensureModule();";
    if (!src.includes(initAnchor)) {
      throw new Error("Worker layout changed — update apply-fetch-rewrite-patch.mjs (init anchor)");
    }
    src = src.replace(initAnchor, `${initAnchor}\n${INIT_HOOK}`);
  }

  return src;
}

function patchPlayer(src) {
  const needle = "websocketSsl: typeof options.websocketSsl === \"boolean\" ? options.websocketSsl : null";
  const replacement =
    "websocketSsl: typeof options.websocketSsl === \"boolean\" ? options.websocketSsl : null,\n      assetOrigin: options.assetOrigin || \"\"";
  if (src.includes("assetOrigin: options.assetOrigin")) {
    return src;
  }
  if (!src.includes(needle)) {
    throw new Error("Player layout changed — update apply-fetch-rewrite-patch.mjs (player init anchor)");
  }
  return src.replace(needle, replacement);
}

let workerSrc = readFileSync(workerPath, "utf8");
workerSrc = patchWorker(workerSrc);
writeFileSync(workerPath, workerSrc, "utf8");
console.log("Patched fetch rewrite:", workerPath);

let playerSrc = readFileSync(playerPath, "utf8");
playerSrc = patchPlayer(playerSrc);
writeFileSync(playerPath, playerSrc, "utf8");
console.log("Patched player assetOrigin:", playerPath);
