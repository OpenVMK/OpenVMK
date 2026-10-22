import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import type { ServerResponse } from "node:http";
import { defineConfig, type Plugin } from "vite";

const REPO_ASSETS = resolve(__dirname, "..", "assets");

const MIME: Record<string, string> = {
  ".json": "application/json",
  ".png": "image/png",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".txt": "text/plain",
  ".tsv": "text/tab-separated-values",
  ".xml": "application/xml",
};

/**
 * Serves the repo's converted asset mirror (`assets/`) alongside the client.
 *
 * The mirror is the game's real data — window layouts, atlases, room and
 * minigame definitions — and it is deliberately not copied into the client:
 * the browser must read exactly the same bytes the Node tests do, or the two
 * can drift without anyone noticing.
 */
const CLIENT_ASSETS = resolve(__dirname, "assets");

/** Where the asset server lives; the same origin the client fetches casts from. */
const ASSET_ORIGIN = process.env.VMK_ASSET_ORIGIN ?? "http://127.0.0.1:5199";

/**
 * `external_variables.txt` MUST come from the asset server, not from disk.
 *
 * ⚠ THE FILE ON DISK IS A CHRISTMAS CAPTURE. `assets/external_variables_casts.txt`
 * points rooms 2, 3, 4, 35 and 48 at `vmk_spaces/vmk_holiday_overlays/…` and
 * adds `vmk_holiday_animation` as an extra cast — 9 of its 428 `room.cast`
 * entries. Serving it raw is why Town Square came up decorated for Christmas,
 * snowfall and all, when the Shockwave client shows the undecorated park.
 *
 * The asset server already fixes this in `applySeasonToVariables` (strip the
 * `vmk_holiday_overlays/` and `holiday/` path segments, drop holiday-only
 * layers, swap to the plain cast when one exists, honour `VMK_HOLIDAY=1`), and
 * it also drops `room.cast` entries whose file is missing from the archive.
 * Streaming the file from disk here bypassed ALL of that.
 *
 * ⚠ AND THIS IS WHAT THE REAL CLIENT DOES. `assets.ts` hands Shockwave
 * `external.variables.txt=${PUBLIC_ORIGIN}/external_variables.txt?t=…`, so the
 * config has always come from the asset server over HTTP. Reading the repo file
 * was our shortcut, and it quietly served different bytes.
 */
async function proxyExternalVariables(url: string, res: ServerResponse): Promise<boolean> {
  try {
    const upstream = await fetch(`${ASSET_ORIGIN}${url}`);
    if (!upstream.ok) return false;
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-store");
    res.end(Buffer.from(await upstream.arrayBuffer()));
    return true;
  } catch {
    // Asset server down — fall through to the on-disk copy so the client still
    // boots, decorated or not, rather than failing to start at all.
    return false;
  }
}

/**
 * Serves one directory as static files, containing the path to it.
 *
 * Shared by the dev and PREVIEW servers so a built client is exercised against
 * byte-identical game data. Returns false when the request is not for a file
 * under `root`, so the caller can fall through.
 */
function serveStatic(root: string, url: string, res: ServerResponse): boolean {
  const relative = normalize(decodeURIComponent(url)).replace(/^([/\\])+/, "");
  const file = join(root, relative);
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) return false;
  res.setHeader("Content-Type", MIME[extname(file).toLowerCase()] ?? "application/octet-stream");
  createReadStream(file).pipe(res);
  return true;
}

function repoAssets(): Plugin {
  return {
    name: "vmk-repo-assets",
    /**
     * ⚠ The PREVIEW server needs the game data too.
     *
     * `publicDir` is dev-only (see below) because `client/assets` is 126 MB and
     * must not be copied into a bundle. That leaves a BUILT client with no
     * `/casts`, `/core` or `/fonts` at all — it boots, finds nothing, and walks
     * down its failure branches. Serving the same two roots here is what makes
     * `vite preview` a usable measurement of the real thing rather than a
     * differently-broken one.
     */
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        void (async () => {
        const url = (req.url ?? "").split("?")[0] ?? "";
        if (url.endsWith(".html") && /[?&]perf/.test(req.url ?? "")) res.setHeader("Document-Policy", "js-profiling");
        if (url === "/external_variables.txt") {
          // The asset server is the source of truth — see the note above.
          if (await proxyExternalVariables(req.url ?? url, res)) return;
          const config = join(REPO_ASSETS, "external_variables_casts.txt");
          if (existsSync(config)) {
            res.setHeader("Content-Type", "text/plain");
            res.setHeader("Cache-Control", "no-store");
            createReadStream(config).pipe(res);
            return;
          }
        }
        if (serveStatic(CLIENT_ASSETS, url, res)) return;
        if (serveStatic(REPO_ASSETS, url, res)) return;
        next();
        })();
      });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0] ?? "";

        /**
         * ⚠ The client's bootstrap config, under the name the client asks for.
         *
         * `Core Thread Class` fetches `external.variables.txt` as its very first
         * act. Without this route Vite answered with its SPA fallback — an HTML
         * page, status 200 — and the client parsed that as its configuration.
         * Nothing errored: the boot walked on into `load_params` and `load_texts`
         * running entirely on markup. A missing config has to 404, not succeed.
         */
        if (url === "/external_variables.txt") {
          // ⚠ The `_casts` variant, not `_931`. `_931` is the 2008 Wayback
          // capture: its `cast.entry.N` are names (`vmk_avatar/vmk_avatar`) that
          // resolve to nothing here, and its endpoints point at the dead
          // virtualmagickingdom.com. `_casts` points every entry at
          // `7a684fb5-…/<md5>`, which exists under `assets/overlay/`, and its
          // connection settings are already local (127.0.0.1).
          //
          // ⚠ The two files are NOT parallel — 37 entries against 36 — so their
          // `cast.entry.N` cannot be paired to recover a name↔hash mapping. An
          // attempt to do that mislabelled a navigator cast as `vmk_interface`.
          const config = join(REPO_ASSETS, "external_variables_casts.txt");
          if (!existsSync(config)) {
            res.statusCode = 404;
            res.end("external_variables_931.txt not found in assets/");
            return;
          }
          res.setHeader("Content-Type", "text/plain");
          res.setHeader("Cache-Control", "no-store");
          createReadStream(config).pipe(res);
          return;
        }

        // Contain the path: a request must not escape the assets root.
        const relative = normalize(decodeURIComponent(url)).replace(/^([/\\])+/, "");
        const file = join(REPO_ASSETS, relative);
        if (!file.startsWith(REPO_ASSETS) || !existsSync(file) || !statSync(file).isFile()) {
          next();
          return;
        }
        res.setHeader("Content-Type", MIME[extname(file).toLowerCase()] ?? "application/octet-stream");
        createReadStream(file).pipe(res);
      });
    },
  };
}

export default defineConfig(({ command }) => ({
  root: __dirname,
  /**
   * ⚠ Dev only. `client/assets` holds the extracted casts — 126 MB — and
   * copying that into a bundle would make every build minutes long and the
   * output unusable. In a build the game data is served by the HTTP server from
   * the same directories, so the bundle carries only code.
   */
  publicDir: command === "serve" ? "assets" : false,
  plugins: [repoAssets()],
  server: { port: 5180, strictPort: true },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    /**
     * ⚠ NO MINIFICATION — the runtime reads PARAMETER NAMES.
     *
     * `bindReceiver` (lingo-script.ts) decides whether a transpiled handler
     * takes a Lingo receiver by parsing `fn.toString()` and checking whether the
     * SECOND parameter is literally named `_this`:
     *
     *     export function registerManager(_me, _this, tID) { … }
     *
     * A minifier renames parameters, so `_this` disappears, every handler is
     * treated as receiver-less, and each one's arguments shift by one. The
     * built client failed on its first such call — `registerManager` got the id
     * in the receiver slot and died with "Lingo method not found: exists on
     * string" — while the dev server, which does not minify, ran fine. A
     * dev/prod split like that is far more expensive than the bytes.
     *
     * This is a WORKAROUND, not the fix. The real fix is for the emitter to
     * mark receiver-taking handlers explicitly (a side-table or an extra
     * export) so nothing depends on source text surviving a build. Until then
     * minification must stay off, or the two environments disagree silently.
     */
    minify: false,
    rollupOptions: {
      // Every page is an entry point. `client.html` is the real client,
      // `window.html` is a focused test page for the window engine, and
      // `index.html` is just the root redirect onto `client.html` — kept as an
      // entry so `/` behaves the same in a built preview as it does in dev.
      input: {
        client: resolve(__dirname, "client.html"),
        window: resolve(__dirname, "window.html"),
        index: resolve(__dirname, "index.html"),
      },
      /**
       * ⚠ ONE CHUNK PER CAST, not one per handler.
       *
       * `client.ts` reaches the 40 game casts through a lazy
       * `import.meta.glob`, and Rollup's default is to give every dynamically
       * imported module its own chunk — 5,000+ of them. That is the same
       * request-per-handler shape as the dev server, so a build "succeeded"
       * while still issuing 223 JS requests and taking a minute to boot.
       *
       * Grouping by cast key matches how the client actually consumes them:
       * `prefetchCast` loads a whole cast's handlers together before attaching
       * it, so a per-cast chunk is fetched exactly once, in one request, at the
       * moment it is needed — and nothing is loaded for casts a session never
       * touches.
       */
      output: {
        manualChunks(id: string) {
          /**
           * ⚠ MATCH ANY CAST KEY, not just the 32-hex overlay ones.
           *
           * The download casts are named by md5, but plenty are named plainly —
           * `vmk_emporium_handler`, `vmk_snd_main_street2`, `vmk_jungle_cruise`.
           * A hex-only pattern left every one of those falling through to
           * Rollup's default of one chunk per module, which is exactly the
           * per-handler shape this rule exists to prevent. It went unnoticed
           * while only 6 named casts had TypeScript; transpiling the room and
           * handler casts took it to 7,608 modules and the build died outright.
           *
           * The key is whatever precedes the first `__`; a movie script has an
           * empty class name (`vmk_3____oErrorType`) and still keys correctly.
           */
          const cast = /[\\/]generated-casts[\\/]([^\\/]+?)__/.exec(id);
          if (cast) return `cast-${cast[1].replace(/[^A-Za-z0-9_-]/g, "-")}`;
          if (/[\\/]generated[\\/]/.test(id)) return "cast-core";
          return undefined;
        },
      },
    },
  },
}));

