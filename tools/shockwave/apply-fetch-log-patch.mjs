/**
 * Patch LibreShockwave WASM worker to log successful fetches to the player debug log.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerPath = join(__dirname, "wasm", "dist", "libreshockwave-cpp-worker.js");

const MARKER = "Fetch OK ${request.url}";
const anchor =
  "      const bytes = await fetchCandidateBytes(candidate, request);\n      withBytes(bytes, (ptr, length) => bridgeCall(\"fetch complete\", () => api.fetchComplete(handle, request.taskId, ptr, length)));";
const replacement =
  "      const bytes = await fetchCandidateBytes(candidate, request);\n      post(\"debug\", { level: \"network\", message: `Fetch OK ${request.url} (${bytes.byteLength ?? bytes.length ?? 0}b via ${candidate})` });\n      withBytes(bytes, (ptr, length) => bridgeCall(\"fetch complete\", () => api.fetchComplete(handle, request.taskId, ptr, length)));";

let src = readFileSync(workerPath, "utf8");
if (src.includes(MARKER)) {
  console.log("Fetch log already patched:", workerPath);
  process.exit(0);
}

if (!src.includes(anchor)) {
  console.error("Worker layout changed — update apply-fetch-log-patch.mjs");
  process.exit(1);
}

src = src.replace(anchor, replacement);
writeFileSync(workerPath, src, "utf8");
console.log("Patched fetch logging:", workerPath);
