/**
 * The VMK client.
 *
 * `bootClient` wires the host side and hands over to
 * `Client_Initialization_Script.startClient` â€” VMK's own bootstrap. This page
 * only pumps frames and reports what the state machine does, because the boot is
 * polled: `CDownload.update` and `CMgrCastload.prepare` ask `netDone` each frame
 * and only then advance.
 */
import { DEBUG } from "./debug.js";
import { setUpPage } from "./page.js";
import { bootClient } from "./lingo/boot-client.js";
import { advanceFilmLoops } from "./lingo/lingo-cast.js";
import { Movie, registerMovieBuiltins } from "./lingo/lingo-movie.js";
import * as lingo from "./lingo/lingo-runtime.js";
import {
  callMethod,
  callNamed,
  registerHostHandlers,
  symbol,
  theProperty,
  type LingoValue,
} from "./lingo/lingo-runtime.js";
import type { HandlerModule } from "./lingo/lingo-script.js";

const CORE = "/core/core.old";

/** Vite inlines every transpiled handler; they are plain ES modules. */
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
  if (!DEBUG) return;
  const el = document.getElementById("status");
  if (el) el.textContent = message;
}

/**
 * The last lines of the trace, kept even when the panel is hidden, so a tester
 * who hits a bug can hand it over: Ctrl+Shift+L copies it to the clipboard.
 */
const TAIL_LINES = 400;
const tail: string[] = [];

/**
 * ⚠ APPEND A NODE, never `textContent +=`. That re-copied the whole trace on
 * every line — quadratic, and the trace grows all session (every broadcast,
 * every cast attach) — so the page got slower the longer it ran.
 */
function log(line: string): void {
  tail.push(line);
  if (tail.length > TAIL_LINES) tail.splice(0, tail.length - TAIL_LINES);
  if (!DEBUG) return;
  const el = document.getElementById("trace");
  if (el) el.appendChild(document.createTextNode(`${line}\n`));
}

window.addEventListener("keydown", (event) => {
  if (!(event.ctrlKey && event.shiftKey && event.code === "KeyL")) return;
  event.preventDefault();
  void navigator.clipboard?.writeText(tail.join("\n")).then(
    () => console.info(`[vmk] copied the last ${String(tail.length)} log lines`),
    () => console.info(tail.join("\n")),
  );
});

setUpPage(DEBUG);

/**
 * Frames to pump before giving up, at roughly 60fps.
 *
 * ⚠ Sized for the real workload, not a round number: `load_casts` fetches and
 * attaches 37 casts one at a time, each taking a handful of frames, so a
 * 240-frame cap stopped the boot mid-queue and made a working load look stalled.
 */
const MAX_FRAMES = 200000;

/**
 * Frames after `init_threads` before the page stops WAITING on the boot and
 * starts rendering. The loop itself keeps running past this — see the tick.
 */
const SETTLE_FRAMES = 180;

async function main(): Promise<void> {
  const canvas = document.getElementById("stage") as HTMLCanvasElement;
  const context = canvas.getContext("2d")!;
  /**
   * ⚠ NO SMOOTHING. Director art is pixel art authored at 1:1, and the canvas
   * default is bilinear filtering — every blit comes out softened, and any blit
   * that is not perfectly pixel-aligned bleeds a half-pixel of its neighbour.
   * The `mycoke-shockwave-port` renderer sets this for the same reason.
   */
  context.imageSmoothingEnabled = false;

  const client = await bootClient({ coreUrl: CORE, canvas, modules: coreModules, castModules, log, debug: DEBUG });
  log(`startClient() -> ${String(client.started)}, pState=${String(client.bootThread.pState)}`);

  /**
   * TEMPORARY diagnostic. `CMgrBroker.Execute` silently unregisters any
   * subscriber whose id does not resolve, and removes the broker once its list
   * empties — so a broadcast that reaches nobody looks identical to one that
   * was never registered. Log what it sees, at the moment it sees it.
   *
   * ⚠ `registerHostHandlers`, not `registerHandlers`. Every cast attach re-runs
   * `registerApiHandlers`, which used to overwrite this wrapper at the first of
   * 37 casts — which is the whole reason it "never fired".
   *
   * ⚠ It logs FIRST. The previous version did three calls that can throw
   * (`getBrokerManager`, `getProp`, `get`) before its only `log`, so a wrapper
   * that ran and threw was indistinguishable from one that never ran.
   */
  /**
   * ⚠ Exposed HERE, before the boot loop, not after it.
   *
   * The loading screen exists only DURING the boot, so a `vmk` published once
   * the loop resolves cannot be used to inspect it — every probe of the loading
   * window came back empty simply because it had already been torn down.
   */
  if (DEBUG) Object.assign(globalThis, { vmk: { ...client, lingo } });

  const realExecuteMessage = client.classes
    .get("Broker_Manager_API")
    ?.handlers.get("executeMessage");
  // Debug only: it logs every broadcast the game makes, twice.
  if (DEBUG) registerHostHandlers({
    executeMessage: (message, argA, argB, argC) => {
      log(`executeMessage(${String(message)}) entered`);
      try {
        const broker = callNamed("getBrokerManager") as unknown as {
          pItemList?: { getProp: (k: LingoValue) => LingoValue };
        };
        const clients = broker?.pItemList?.getProp(message) as unknown as {
          count?: number;
          getPropAt?: (i: number) => LingoValue;
        };
        const rows: string[] = [];
        for (let i = 1; i <= (clients?.count ?? 0); i++) {
          const id = clients.getPropAt?.(i) as LingoValue;
          const resolved = callMethod("get", client.core, id);
          rows.push(`${String(id)}${resolved ? "" : " UNRESOLVED"}`);
        }
        log(
          `  ${String(clients?.count ?? 0)} subscriber(s)` +
            (rows.length > 0 ? ` [${rows.join(", ")}]` : ""),
        );
      } catch (cause) {
        log(`  subscriber probe threw: ${cause instanceof Error ? cause.message : String(cause)}`);
      }
      return realExecuteMessage ? realExecuteMessage(undefined, message, argA, argB, argC) : 0;
    },
  });


  const states: string[] = [String(client.bootThread.pState)];
  await new Promise<void>((resolve) => {
    let frames = 0;
    let last = states[0];
    let settleFrames = 0;
    /**
     * ⚠ THE LOOP MUST SURVIVE ITS OWN ERRORS.
     *
     * A dead frame loop is indistinguishable from a frozen client: the last
     * composited frame stays on screen, so the page looks like it rendered
     * something and stopped. That is exactly what "nothing animates" was — the
     * loading screen was a CORPSE, not a still frame, and it stayed up because
     * nothing was left to clear it.
     *
     * Two separate faults kept it dying:
     *
     *  1. The `try` covered only `prepareFrame`/`render`. Everything after it —
     *     reading `pState`, the state bookkeeping — ran UNPROTECTED inside a
     *     `setTimeout` callback, so a throw there escaped as an uncaught error
     *     and the loop simply never rescheduled. Silently: no trace line, no
     *     status change, nothing to distinguish it from a client at rest.
     *  2. The `catch` called `resolve(); return;` — ending the loop on the
     *     FIRST error ever seen. Director does not stop the movie because one
     *     handler threw, and neither can this.
     *
     * So: wrap the whole body, log, and KEEP GOING. Errors are rate-limited
     * because a fault that recurs every frame would otherwise push megabytes of
     * identical text into the trace and hang the page for real.
     */
    const errorCounts = new Map<string, number>();
    const REPEATS_LOGGED = 3;
    /**
     * ⚠ PACED BY `requestAnimationFrame`, NOT BY `setTimeout`.
     *
     * `setTimeout` cannot hold a tempo. Its delay is a MINIMUM, it is clamped and
     * coalesced by the browser, and it knows nothing about when the display
     * actually refreshes — so even a tick that costs nothing lands late and
     * lands unevenly. MEASURED in musical_mainstreet at `the frameTempo` 24
     * (41.7ms):
     *
     *     achieved      21.8 frames/s      <- 9% slow
     *     gap median    46.0 ms
     *     gap p90       50.2 ms            <- and uneven, which is what is SEEN
     *     gap max       55.9 ms
     *     prepareFrame   5.9 ms avg        <- the work was never the problem
     *
     * Everything VMK animates counts FRAMES, not milliseconds
     * (`CFactorVmkAnimation.update` adds 1 to FRAMECOUNTER per call and compares
     * it against the `.ani`'s LASTFRAME), so a 46ms frame is an animation
     * running 9% slow, and a gap wandering between 46 and 56ms is one that
     * visibly stutters. Reported as the avatar load-in being jerky and
     * everything feeling weirdly timed.
     *
     * An accumulator over rAF fixes both halves: frames are presented in step
     * with the display, and the LEFTOVER time carries to the next callback, so
     * the long-run rate is the tempo exactly rather than drifting by whatever
     * each frame overran.
     *
     * ⚠ The remainder is CLAMPED to one period. Without that, a tab that was
     * hidden (rAF stops entirely) or a long stall would come back owing hundreds
     * of frames and try to run them all in one callback.
     */
    let accumulated = 0;
    let lastFrameAt = performance.now();

    /**
     * ⚠ A HIDDEN TAB GETS NO `requestAnimationFrame` AT ALL, and this client has
     * a live connection to service — `prepareFrame` is what drains it. Browsers
     * throttle background `setTimeout` to about 1Hz, which is slow but is not
     * zero, so a hidden tab falls back to it and keeps talking to the server.
     */
    const schedule = (): void => {
      const canRaf = typeof requestAnimationFrame === "function"
        && !(typeof document !== "undefined" && document.hidden);
      if (canRaf) requestAnimationFrame(pump);
      else setTimeout(pump, 16);
    };

    const pump = (): void => {
      const nowMs = performance.now();
      accumulated += nowMs - lastFrameAt;
      lastFrameAt = nowMs;

      const tempo = Number(theProperty("frameTempo"));
      const period = Number.isFinite(tempo) && tempo > 0 ? 1000 / tempo : 16;
      if (accumulated < period) {
        schedule();
        return;
      }
      accumulated = Math.min(accumulated - period, period);
      tick();
    };

    const tick = (): void => {
      frames++;
      // Hoisted: the reschedule below paces off the boot state, and must still
      // pick a delay on the frames where the body threw before reaching it.
      let now = last;
      try {
        callMethod("prepareFrame", client.core);
        /**
         * ⚠ RENDER EVERY FRAME, including during the boot.
         *
         * This loop used to only pump `prepareFrame` and leave drawing until
         * after it resolved — so the whole loading sequence ran with nothing
         * painting. The client built its loading window, showed the VMK logo
         * and progress bar, and tore them back down against a canvas that was
         * never drawn to: sampling it through a boot found ZERO non-transparent
         * pixels across 17 seconds.
         *
         * That is why "it boots but draws nothing" survived so long — the
         * drawing was real and simply never reached the canvas. Director
         * composites every frame; so must this.
         */
        /**
         * Film loops advance on the MOVIE's frame, which is this loop.
         *
         * Director plays a film loop off the playhead, not off a timer of its
         * own, so a loop keeps the tempo the rest of the movie keeps — and one
         * paced independently would drift against everything around it. Placed
         * before the render so the frame just advanced to is the frame drawn.
         */
        advanceFilmLoops();
        client.stage.render(context as never);

        now = String(client.bootThread.pState);
        if (now !== last) {
          states.push(now);
          log(`frame ${String(frames)}: -> ${now}`);
          last = now;
        }
      /**
       * ⚠ Do not stop the moment `init_threads` appears.
       *
       * That state ends with `initAll(getThreadManager())` and then broadcasts
       * `Initialize` — which is what actually starts the UI. Stopping on arrival
       * rendered a frame from before anything had been built, so a client that
       * boots looked like a client that draws nothing.
       */
        if (now === "init_threads" && settleFrames === 0) {
          log(`frame ${String(frames)}: boot complete, client running`);
        }
        if (now === "init_threads") settleFrames++;

      /**
       * ⚠ Hand control back once the boot has settled, but KEEP PUMPING.
       *
       * This loop is what calls `prepareFrame`, so stopping it stops the
       * client. VMK's startup does not end at `init_threads`: the dictionary,
       * the furnimap and the avatar data are parsed by per-frame processes
       * afterwards (`furnimap parsed in 32451 ms`), and the login window is
       * raised at the end of that. A 180-frame cap stopped the client several
       * seconds before its own UI appeared, which looked exactly like a client
       * that boots and draws nothing.
       */
        if (settleFrames === SETTLE_FRAMES) resolve();

        if (frames > MAX_FRAMES) {
          log(`client loop ended after ${String(frames)} frames at "${now}"`);
          resolve();
          return;
        }
      } catch (cause) {
        const message = cause instanceof Error ? cause.message : String(cause);
        const seen = (errorCounts.get(message) ?? 0) + 1;
        errorCounts.set(message, seen);
        if (seen <= REPEATS_LOGGED) {
          log(`frame ${String(frames)}: ${message}${seen === REPEATS_LOGGED ? " (further repeats suppressed)" : ""}`);
          // ⚠ Do not filter to `generated/` only: a throw from the runtime
          // itself has no generated frame near the top, and filtering left the
          // trace showing a bare message with no location at all.
          for (const line of (cause instanceof Error ? cause.stack ?? "" : "")
            .split("\n")
            .slice(1, 7)) {
            log(`      ${line.trim().replace(/https?:\/\/[^/]+\/src\//, "").replace(/\?[a-z0-9=&]+/gi, "")}`);
          }
        }
        // ⚠ NO `resolve(); return;` HERE. Falling through to the reschedule
        // below is the entire point: the client keeps running.
      }
      /**
       * ⚠ THE BOOT IS NOT PACED, and must not be.
       *
       * Each cast costs a network round trip and the queue is 37 long, so pacing
       * `load_casts` made a working load take a minute and look stalled. Nothing
       * is animating yet, so it runs as fast as the event loop allows and only
       * hands over to the tempo-paced rAF loop once the state machine moves on.
       *
       * ⚠ `the frameTempo` is read in `pump`, EVERY frame. `Core Thread Class`
       * sets it from `system.tempo` during `load_params` and `puppetTempo` can
       * change it later, so a value captured once would be the pre-boot default
       * forever. It is 24 for the client, and the tick rate has to BE that —
       * Director advances one frame per tempo tick.
       */
      if (now === "load_casts") {
        setTimeout(tick, 0);
        return;
      }
      // Work done inside this frame is already accounted for: `pump` measures
      // from its own previous callback, so the cost of the body comes out of the
      // next interval rather than being added to it.
      schedule();
    };
    tick();
  });

  /**
   * TEMPORARY control for the wrapper above, and a valid one.
   *
   * ⚠ The previous control (`probeWiring`, a name no cast defines) could not
   * fail: nothing ever re-registered it, so it "proved" the wrapper technique
   * worked while the real wrapper was being overwritten on every cast attach.
   * A control has to use a name the casts DO define. This fires after all 37
   * attaches, so a log line here means the host registration survived them.
   */
  if (DEBUG) {
    log("--- host-override control, after 37 cast attaches ---");
    callNamed("executeMessage", symbol("hostProbe"), "probe");
  }

  const movie = new Movie(client.registry);
  registerMovieBuiltins(movie);
  movie.addMovieScript({ exitFrame: () => void client.stage.render(context as never) } as never);
  movie.start();
  client.stage.render(context as never);

  status(`boot reached: ${states.join(" -> ")}`);
  /**
   * ⚠ Expose the runtime MODULE, not just the booted state.
   *
   * A console `import("/src/lingo/lingo-runtime.js")` resolves to a second
   * module instance with an empty builtin registry, so every probe through it
   * reports "handler not implemented" for handlers that are in fact registered.
   * That wasted several diagnostic rounds. Reaching the live instance has to go
   * through the page.
   */
  if (DEBUG) Object.assign(globalThis, { vmk: { ...client, lingo } });
}

main().catch((cause: unknown) => {
  // A boot that dies must not leave a player on a silent black page: show the
  // panel, with whatever the hidden trace collected, whatever the flag says.
  if (!DEBUG) {
    document.body.classList.add("debug");
    const trace = document.getElementById("trace");
    if (trace) trace.textContent = tail.map((line) => `${line}\n`).join("");
    const el = document.getElementById("status");
    if (el) el.textContent = `failed: ${cause instanceof Error ? cause.message : String(cause)}`;
  }
  status(`failed: ${cause instanceof Error ? cause.message : String(cause)}`);
  log(`failed: ${cause instanceof Error ? cause.message : String(cause)}`);
  for (const line of (cause instanceof Error ? cause.stack ?? "" : "").split("\n").slice(1, 6)) {
    log(`      ${line.trim().replace(/\?[a-z0-9=&]+/gi, "")}`);
  }
  console.error(cause);
});













