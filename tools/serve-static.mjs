// Minimal read-only static server over the repo, for viewing generated
// galleries (e.g. logs/room-doorways.html) in a browser. No watching, no
// reloads — Vite's dev server full-reloads whenever logs/ is written, which
// the running servers do constantly.
//
//   node tools/serve-static.mjs [port]      (default 5190)
import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { join, normalize, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.argv[2] ?? 5190);
const TYPES = { ".html": "text/html; charset=utf-8", ".png": "image/png", ".json": "application/json", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".txt": "text/plain; charset=utf-8" };

createServer((req, res) => {
  const path = normalize(join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname)));
  if (!path.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  try {
    if (!statSync(path).isFile()) throw new Error("not a file");
  } catch {
    res.writeHead(404).end("not found");
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream", "cache-control": "no-store" });
  createReadStream(path).pipe(res);
}).listen(PORT, "localhost", () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
