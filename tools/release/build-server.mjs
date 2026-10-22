// Bundle the two servers into plain JavaScript a stock Node can run.
//
//   node tools/release/build-server.mjs
//
// Writes server/dist/assets.mjs (HTTP, :5199) and server/dist/mus-server.mjs
// (game, :8080). The server has no runtime dependencies — only node: builtins —
// so each bundle is self-contained: a release needs neither node_modules nor
// tsx, just Node 22.5+ (for node:sqlite).
//
// ⚠ The bundles MUST live in server/dist/. Every module finds the install root
// as `<its own folder>/../..`; server/dist/ is the same depth as server/src/,
// so those paths resolve identically. Move the output and they all break.
import { build } from "esbuild";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SRC = join(ROOT, "server", "src");
const OUT = join(ROOT, "server", "dist");

for (const entry of ["assets", "mus-server"]) {
  const result = await build({
    entryPoints: [join(SRC, `${entry}.ts`)],
    outfile: join(OUT, `${entry}.mjs`),
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node22",
    // `node:sqlite` is newer than esbuild's builtin list; keep every node:
    // import external rather than trusting the list to be current.
    external: ["node:*"],
    sourcemap: "linked",
    logLevel: "warning",
    metafile: true,
  });
  const bytes = Object.values(result.metafile.outputs).reduce((n, o) => n + o.bytes, 0);
  console.log(`server/dist/${entry}.mjs  ${(bytes / 1024).toFixed(0)} KB`);
}
