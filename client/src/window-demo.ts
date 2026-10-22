/**
 * A window drawn by VMK's own layout engine.
 *
 * The framework comes up through `bootClient` â†’ `startClient`, exactly as the
 * boot page does; this page then asks VMK to open a window and renders whatever
 * its engine put in the sprite channels. Nothing here lays anything out.
 *
 * âš  Uses `createWindow`, VMK's own API â€” not `CWindow.buildVisual` directly. An
 * earlier version of this page hand-built the window and spent several rounds
 * discovering that `CMgrWindow.create` does the setup (`Define`, which installs
 * `pElemClsList`, then `merge`) that a direct `buildVisual` skips.
 */
import { bootClient } from "./lingo/boot-client.js";
import { Movie, registerMovieBuiltins } from "./lingo/lingo-movie.js";
import { callMethod, callNamed, symbol, VOID, type LingoObject, type LingoValue } from "./lingo/lingo-runtime.js";
import type { HandlerModule } from "./lingo/lingo-script.js";

const CORE = "/core/core.old";
const WINDOW = "error.window";

/**
 * Every transpiled handler: the framework cast plus all 40 game casts.
 *
 * ⚠ The game casts are needed at boot, not later. Each cast declares its own
 * threads in its `thread.index`, and `CMgrThread.initThread` instantiates those
 * classes the moment the cast attaches — so `CCoreThreadXML` has to exist before
 * `load_casts` finishes, not by the time something draws.
 */
/** The framework cast: always needed, so eager. */
const coreModules = import.meta.glob("./generated/*.ts", { eager: true }) as Record<
  string,
  HandlerModule
>;

/**
 * The 40 game casts: 5,079 modules, loaded per cast as it attaches.
 *
 * ⚠ Lazy, not eager. Eager made the dev server issue 5,079 requests at page load
 * and hang. It is also the faithful shape — VMK loads casts at runtime, so a
 * cast's Lingo should arrive when the cast does.
 */
const castModules = import.meta.glob("./generated-casts/*.ts") as Record<
  string,
  () => Promise<unknown>
>;

function status(message: string): void {
  const el = document.getElementById("status");
  if (el) el.textContent = message;
}

function log(line: string): void {
  const el = document.getElementById("trace");
  if (el) el.textContent += `${line}\n`;
}

async function main(): Promise<void> {
  const canvas = document.getElementById("stage") as HTMLCanvasElement;
  const context = canvas.getContext("2d")!;

  const client = await bootClient({ coreUrl: CORE, canvas, modules: coreModules, castModules, log });
  log(`startClient() -> ${String(client.started)}`);

  // ---- let VMK open the window -------------------------------------------
  const opened = callNamed("createWindow", symbol("error"), WINDOW, 120, 120, VOID);
  const win = callNamed("getWindow", symbol("error")) as unknown as LingoObject;
  const elements = (win?.pElemList as unknown as { count?: number })?.count ?? 0;
  log(`createWindow("${WINDOW}") -> ${String(opened)}, ${String(elements)} elements`);

  /**
   * âš  The element offsets from the layout (`#locH 12, #locV 30`) are applied on
   * the move, and `render` is what blits each caption from its text member into
   * the element's buffer â€” the thing the compositor actually draws. `render`
   * lives on the element wrappers, not on `CWindow`, so it is sent to the
   * element list.
   */
  for (const step of ["show", "prepare", "draw"]) {
    try {
      callMethod(step, win);
    } catch (cause) {
      log(`  ${step}: ${cause instanceof Error ? cause.message : String(cause)}`);
    }
  }
  // ⚠ No moveBy here: `createWindow` already placed the window at 120,120 and
  // the element offsets are applied relative to that. Moving again double-counts.
  callNamed("call", symbol("render"), win.pElemList as LingoValue);

  const movie = new Movie(client.registry);
  registerMovieBuiltins(movie);
  movie.addMovieScript({ exitFrame: () => void client.stage.render(context as never) } as never);
  movie.start();
  client.stage.render(context as never);

  const frame = client.stage.lastFrame;
  status(`${WINDOW}: ${String(elements)} elements, ${String(frame.length)} sprites drawn`);
  for (const record of frame) {
    log(
      `ch${String(record.channel)} ${record.member || "(runtime)"}` +
        ` @${String(record.x)},${String(record.y)} ${String(record.width)}x${String(record.height)}` +
        `${record.fill ? ` fill ${record.fill}` : ""}${record.text ? ` "${record.text}"` : ""}`,
    );
  }

  Object.assign(globalThis, { vmk: client });
}

main().catch((cause: unknown) => {
  status(`failed: ${cause instanceof Error ? cause.message : String(cause)}`);
  log(`failed: ${cause instanceof Error ? cause.message : String(cause)}`);
  console.error(cause);
});



