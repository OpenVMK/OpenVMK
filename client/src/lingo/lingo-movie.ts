/**
 * The frame loop and event dispatch — the machinery that turns a runtime plus a
 * compositor into a running program.
 *
 * Director's model: a playback head sits on a frame and ticks at `the tempo`.
 * Each tick fires `prepareFrame`, `enterFrame`, `exitFrame`, then `idle`. Mouse
 * input is hit-tested against sprite channels and offered to that sprite's
 * behaviours before anything else sees it.
 *
 * Dispatch order matters and is Director's, not ours:
 *
 *   sprite behaviours (topmost channel first) → frame script → movie scripts
 *
 * A handler that exists stops the chain, unless it calls `pass()`. That is why
 * `pass` cannot be the no-op stub the runtime shipped with — it is the only way
 * a behaviour lets an event through.
 */
import type { CastRegistry, SpriteChannel } from "./lingo-cast.js";
import {
  callMethod,
  registerBuiltins,
  setTheProperty,
  VOID,
  type LingoValue,
} from "./lingo-runtime.js";

export type FrameEvent =
  | "prepareFrame"
  | "enterFrame"
  | "exitFrame"
  | "idle"
  | "stepFrame";

export type MouseEvent = "mouseDown" | "mouseUp" | "mouseEnter" | "mouseLeave" | "mouseWithin";

/** One entry in a dispatch, recorded so ordering can be asserted without a UI. */
export interface DispatchRecord {
  event: string;
  target: string;
  handled: boolean;
}

/** Set by the `pass` builtin; read and cleared by the dispatcher. */
let passRequested = false;

export function installPassBuiltin(): void {
  registerBuiltins({
    pass: () => {
      passRequested = true;
      return VOID;
    },
  });
}

export class Movie {
  /** 1-based, like Director's frame numbers. */
  frame = 1;
  tempo = 30;
  private running = false;
  private timer: ReturnType<typeof setInterval> | null = null;
  private readonly movieScripts: LingoValue[] = [];
  private frameScript: LingoValue = VOID;
  private readonly lastDispatch: DispatchRecord[] = [];
  private hovered: SpriteChannel | null = null;

  /** Ticks completed. Cheap way to prove the loop actually ran. */
  ticks = 0;

  /**
   * Called when a handler existed but threw partway through. Ported Lingo is
   * full of calls into subsystems that are not built yet, so this is expected
   * during a port — but it must be visible, not swallowed.
   */
  onHandlerError: ((event: string, target: string, cause: unknown) => void) | null = null;

  constructor(private readonly registry: CastRegistry) {}

  addMovieScript(script: LingoValue): void {
    this.movieScripts.push(script);
  }

  setFrameScript(script: LingoValue): void {
    this.frameScript = script;
  }

  /**
   * Offers `event` along Director's chain, stopping at the first handler unless
   * it passes. `targets` is the head of the chain — sprite behaviours for a
   * mouse event, empty for a frame event.
   */
  dispatch(event: string, targets: LingoValue[] = [], ...args: LingoValue[]): DispatchRecord[] {
    this.lastDispatch.length = 0;
    const chain: Array<{ label: string; script: LingoValue }> = [
      ...targets.map((script, index) => ({ label: `sprite#${index}`, script })),
    ];
    if (this.frameScript !== VOID) chain.push({ label: "frame", script: this.frameScript });
    chain.push(...this.movieScripts.map((script, index) => ({ label: `movie#${index}`, script })));

    for (const link of chain) {
      passRequested = false;
      let handled = false;
      try {
        callMethod(event, link.script, ...args);
        handled = true;
      } catch (cause) {
        // "not found" is the normal case — most objects handle few events, and
        // Director simply moves on.
        //
        // ⚠ But only when it is THIS event that is missing. A handler that ran
        // and then called something unimplemented also throws "not found", and
        // treating that as unhandled silently continues the chain after the
        // event was already consumed — the movie script then sees a click the
        // sprite had taken. Match the event name to tell the two apart.
        const missing =
          cause instanceof Error &&
          new RegExp(`^Lingo method not found: ${event}\\b`, "i").test(cause.message);
        if (!missing) {
          // The handler existed and failed partway. Record it as handled and
          // surface the reason rather than pretending nothing happened.
          this.lastDispatch.push({ event, target: link.label, handled: true });
          if (this.onHandlerError) this.onHandlerError(event, link.label, cause);
          break;
        }
      }
      this.lastDispatch.push({ event, target: link.label, handled });
      if (handled && !passRequested) break;
    }
    return [...this.lastDispatch];
  }

  /** One frame: Director's event order, then the head advances. */
  tick(): void {
    this.dispatch("prepareFrame");
    this.dispatch("enterFrame");
    this.dispatch("exitFrame");
    this.dispatch("idle");
    this.ticks++;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.timer = setInterval(() => this.tick(), Math.max(1, Math.round(1000 / this.tempo)));
  }

  stop(): void {
    this.running = false;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  get isRunning(): boolean {
    return this.running;
  }

  /** `go(n)` — move the playback head. */
  go(frame: number): void {
    this.frame = Math.max(1, Math.floor(frame));
  }

  // -------------------------------------------------------------------------
  // Mouse
  // -------------------------------------------------------------------------

  /**
   * The topmost occupied channel under a point.
   *
   * ⚠ Topmost means *highest channel number*, because channel order is z-order
   * and the compositor draws ascending. Hit testing has to walk the other way
   * or clicks land on whatever is underneath.
   */
  spriteAt(x: number, y: number): SpriteChannel | null {
    let found: SpriteChannel | null = null;
    for (let index = 1; index <= 1000; index++) {
      const channel = this.registry.sprite(index) as SpriteChannel;
      if (!channel.member.isEmpty && channel.containsPoint(x, y)) found = channel;
    }
    return found;
  }

  /** Updates `the mouseH`/`mouseV` and fires enter/leave as the sprite changes. */
  moveMouse(x: number, y: number): void {
    setTheProperty("mouseH", x);
    setTheProperty("mouseV", y);

    const under = this.spriteAt(x, y);
    if (under !== this.hovered) {
      if (this.hovered) this.dispatch("mouseLeave", this.hovered.scripts);
      this.hovered = under;
      if (under) this.dispatch("mouseEnter", under.scripts);
    } else if (under) {
      this.dispatch("mouseWithin", under.scripts);
    }
  }

  clickMouse(x: number, y: number, event: MouseEvent = "mouseDown"): DispatchRecord[] {
    setTheProperty("mouseH", x);
    setTheProperty("mouseV", y);
    const under = this.spriteAt(x, y);
    return this.dispatch(event, under ? under.scripts : []);
  }

  get hoveredSprite(): SpriteChannel | null {
    return this.hovered;
  }
}

export function registerMovieBuiltins(movie: Movie): void {
  installPassBuiltin();
  registerBuiltins({
    go: (frame) => {
      movie.go(Number(frame) || 1);
      return VOID;
    },
    puppetTempo: (tempo) => {
      movie.tempo = Math.max(1, Number(tempo) || 30);
      return VOID;
    },
    stopEvent: () => VOID,
  });
}
