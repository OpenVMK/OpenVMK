/**
 * Director's movie environment, as a browser provides it.
 *
 * These are `the <name>` properties that come from the player rather than from
 * the movie: the clock, the mouse, the stage rectangle, the host identity. The
 * set is measured, not guessed — across both transpiled casts the client reads
 *
 *   milliSeconds 33 · stage 27 · long time 12 · mouseLoc 12 · mouseV 11
 *   moviePath 10 · mouseH 10 · runMode 8 · key 6 · keyCode 3 · lastChannel 3
 *   stageTop/Bottom/Left/Right 8 · platform 1 · productVersion 1 · date 1
 *
 * ⚠ Most of these must be read fresh. A stored `milliSeconds` makes every timer
 * in the client stop without erroring, and a stored `mouseH` puts every drag at
 * the same point — both of which look like working code.
 */
import {
  callMethod,
  callNamed,
  LINGO_ILK,
  LINGO_NATIVE,
  LingoList,
  LingoPropList,
  registerBuiltins,
  registerProperties,
  symbol,
  theProperty,
  VOID,
  type LingoValue,
} from "./lingo-runtime.js";
import { LingoPoint } from "./lingo-builtins.js";

/**
 * `_movie.castLib` — indexable by number OR name, and answering `count`.
 *
 * `QuestNotificationsAPI.findTextFromFiles` walks `1..castLib.count` while
 * `CFigureSetSplitterTool.SplitItems` asks for `castLib["vmk_furni_exporter"]`,
 * so both spellings have to work. Delegates to the registered `castLib` builtin
 * rather than reaching into the registry itself.
 */
function castLibIndex(): LingoValue {
  return new Proxy(
    {},
    {
      get(_target, property) {
        if (typeof property === "symbol") return undefined;
        if (property === "count") return theProperty("number of castLibs");
        return callNamed("castLib", /^\d+$/.test(property) ? Number(property) : property);
      },
    },
  ) as unknown as LingoValue;
}

export interface EnvironmentOptions {
  /** The canvas the movie draws into; supplies the stage rectangle. */
  canvas: { width: number; height: number };
  /**
   * `the runMode`. VMK branches on `contains(runMode, "Plugin")` to decide
   * whether to read its `sw1`…`sw9` embed parameters, so a page that was handed
   * those parameters has to report itself as a plugin host.
   */
  runMode?: string;
  /** `the moviePath` — the base the client resolves relative URLs against. */
  moviePath?: string;
  /**
   * `the productVersion`. `CMgrError.setDebugLevel` does
   * `float(productVersion.char[1..3]) >= 8.5` to decide whether debug playback
   * exists, so this has to look like a Director version, not a browser one.
   */
  productVersion?: string;
}

/** Director's `the long time`: "10:30:45 AM" on Windows. */
function longTime(now: Date): string {
  return now.toLocaleTimeString("en-US", { hour12: true });
}

/** Director's `the date`: the host's short date. */
function shortDate(now: Date): string {
  return now.toLocaleDateString("en-US");
}

/** Windows' default double-click time and SM_CXDOUBLECLK/2 tolerance. */
const DOUBLE_CLICK_MS = 500;
const DOUBLE_CLICK_SLOP = 4;

export function installMovieEnvironment(options: EnvironmentOptions): {
  /** Call from pointer handlers so `the mouseH`/`mouseV` track the canvas. */
  setMouse: (x: number, y: number) => void;
  /** Press/release, plus the sprite the press landed on for `the clickOn`. */
  setMouseButton: (down: boolean, spriteNum: number) => void;
  /** Call from key handlers; `the key` is the character, `keyCode` the code. */
  setKey: (key: string, code: number) => void;
  /** Key released — clears its held state for `keyPressed()`. No code = all keys (focus lost). */
  releaseKey: (code?: number) => void;
  /** Modifier keys as of the latest keyboard/mouse event (`event.shiftKey` etc.). */
  setModifiers: (shift: boolean, control: boolean, option: boolean, command: boolean) => void;
} {
  const started = performance.now();
  let mouseX = 0;
  let mouseY = 0;
  let mouseIsDown = false;
  /** `the clickOn` — the sprite number the current press landed on, 0 for none. */
  let clickOnSprite = 0;
  /**
   * `the clickLoc` — where the latest press landed. Never registered, so it read
   * VOID: the stage song picker (`CMusicPlayerSongList.eventProcInternal`)
   * computes the clicked row from `_mouse.clickLoc` and threw on it, so a song
   * could never be selected and PLAY stayed disabled. The room's NOCLK path
   * (`CRoomMouseEventProcessor`) walks to `GetTileAtScrPos(the clickLoc)` too.
   */
  let clickX = 0;
  let clickY = 0;
  /**
   * `the doubleClick` — whether the latest press completed a double-click.
   *
   * ⚠ It was never registered, so it read as VOID (false) and every furni
   * `select` (`if the doubleClick then send UseItem`) silently did nothing:
   * lamps wouldn't switch, RNGs wouldn't roll. Set on press and held through the
   * release, as Director does, because VMK reads it from mouseUp handlers too.
   */
  let doubleClick = false;
  let lastPressAt = -Infinity;
  let lastPressX = 0;
  let lastPressY = 0;
  let lastPressWasDouble = false;
  let key = "";
  let keyCode = 0;
  /**
   * The key currently down, for `keyPressed()`.
   *
   * ⚠ Distinct from `the key`, which is "the key of the LAST keyDown" and stays
   * set after release. `keyPressed(x)` asks whether x is held RIGHT NOW, and
   * VMK's text entry branches on it — `if keyPressed("\b")` for backspace,
   * `if keyPressed(123)` / `(124)` for the arrow keys. Answering from `the key`
   * would report a key as held forever after one press.
   *
   * ⚠ A SET, keyed by code: several keys can be down at once. A single slot
   * made two held arrows read as whichever repeated last — Haunted Mansion
   * walks diagonally on two arrows (`CHMGameInterface.ReadKeys`).
   */
  const held = new Map<number, string>();
  /** `the shiftDown` / `controlDown` / `optionDown` / `commandDown`, from the latest key or mouse event. */
  const modifiers = { shift: false, control: false, option: false, command: false };
  let tempo = 30;

  // Player controls. `puppetTempo` is the frame rate the movie asks for —
  // `Core Thread Class` sets it from `system.tempo` during `load_params`, so the
  // boot cannot finish without it. It is recorded rather than ignored: the frame
  // loop should honour it, and a silently discarded tempo is the kind of thing
  // that turns into "the client runs at the wrong speed" much later.
  /**
   * Director's timeout objects: `new(timeout("name"), period, #handler, target)`.
   *
   * ⚠ Load-bearing for the boot, not a nicety. `CObject.delay` is built on this,
   * and `CMgrCastload.DoneCurrentDownLoad` uses `delay` to retire a finished
   * download. Without it the completed instance stayed in `pCurrentDownLoads`
   * forever, so the cast queue loaded exactly one cast and then sat with 37 more
   * waiting — and nothing reported an error.
   *
   * Director timeouts REPEAT until forgotten, which is why `forget` matters:
   * modelling them as one-shot leaks a handler VMK expects to be able to cancel.
   */
  const timeouts = new Map<string, { handle: number; period: number }>();

  const makeTimeout = (name: string): LingoValue => {
    const ref: Record<string, unknown> = {
      name,
      forget(): LingoValue {
        const existing = timeouts.get(name);
        if (existing) window.clearInterval(existing.handle);
        timeouts.delete(name);
        return VOID;
      },
    };
    ref[LINGO_NATIVE] = true;
    /**
     * ⚠ Director calls this `#timeout`, and `CMgrObject.create` branches on it:
     * it chains an `#ancestor` onto anything reporting `#instance`, which a
     * timeout object cannot take. `CMgrTimeout.create` registers every timer
     * through that path, so answering `#instance` killed the boot with
     * "setaProp on object{name,forget,new}".
     */
    ref[LINGO_ILK] = "timeout";
    ref.new = (period: LingoValue, handler: LingoValue, target: LingoValue): LingoValue => {
      (ref.forget as () => void)();
      const ms = Math.max(1, Number(period) || 0);
      const method = String(handler).replace(/^#/, "");
      const handle = window.setInterval(() => {
        if (target !== VOID && target !== null) {
          callMethod(method, target, ref as unknown as LingoValue);
        }
      }, ms);
      timeouts.set(name, { handle, period: ms });
      return ref as unknown as LingoValue;
    };
    return ref as unknown as LingoValue;
  };

  registerBuiltins({
    timeout: (name) => makeTimeout(String(name)),
    /** `the timeoutList` — VMK reads it to find live timeouts by name. */
    timeoutList: () => new LingoList([...timeouts.keys()]) as unknown as LingoValue,
  });

  registerBuiltins({
    puppetTempo: (rate) => {
      tempo = Number(rate) || tempo;
      return VOID;
    },

    /**
     * `keyPressed(x)` — is that key held right now?
     *
     * Director accepts EITHER a character or a key CODE, and VMK uses both in
     * the same handler:
     *
     *     if keyPressed("\b")  then …   -- backspace
     *     if keyPressed(123)   then …   -- left arrow
     *     if keyPressed(124)   then …   -- right arrow
     *
     * ⚠ This is what text entry is built on, so without it a field can be
     * focused and still refuse every keystroke — no error, just nothing.
     *
     * A number argument is a code; anything else compares as a character, and
     * the comparison is case-insensitive because Director's is.
     */
    keyPressed: (which) => {
      if (held.size === 0) return 0;
      if (typeof which === "number") return held.has(which) ? 1 : 0;
      const wanted = String(which);
      if (wanted === "") return [...held.values()].some((k) => k !== "") ? 1 : 0;
      // A numeric STRING is still a code — VMK builds these from variables.
      if (/^\d+$/.test(wanted)) return held.has(Number(wanted)) ? 1 : 0;
      const lower = wanted.toLowerCase();
      return [...held.values()].some((k) => k.toLowerCase() === lower) ? 1 : 0;
    },
    // `cursor n` — the hourglass during loading. Mapped to the CSS cursor so the
    // page actually reflects it rather than pretending.
    cursor: (shape) => {
      const code = Number(shape);
      document.body.style.cursor = code === 4 ? "progress" : code === 200 ? "none" : code === -1 ? "default" : "auto";
      return VOID;
    },
  });

  /**
   * `_movie` — Director's movie object, as a GLOBAL.
   *
   * ⚠ The emitter never imports it. Generated files import `_player`, `_key`
   * and `_sound` by name, but `_movie` is absent from that list, so six files
   * reference a bare identifier that resolves to nothing and die with the
   * unhelpful `_movie is not defined`.
   *
   * That is why it is installed on `globalThis` rather than exported: an
   * UNDECLARED identifier still resolves through the global scope chain, so this
   * fixes all six without editing emitter output. (An ES import would have to be
   * added to each file, which the next re-export would drop.)
   *
   * The cost of the gap was badly disguised. `ShowSpriteLimitCounter` builds a
   * `CTempViewSprCount`, whose `update` reads `_movie.lastChannel`; the throw
   * escaped through `CMgrObject.create` into `CRegPage1.merge` and
   * `CRegPageBase._ChangePage`, so the whole registration page failed to build
   * and the screen showed window chrome with nothing on it. A debug HUD took the
   * avatar-creation UI down with it, and reported someone else's error while
   * doing it.
   *
   * Only what the six call sites actually read is modelled — `lastChannel`,
   * `stage` and `castLib` — each delegating to the registered movie property so
   * there is one source of truth rather than a parallel implementation.
   */
  (globalThis as Record<string, unknown>)["_movie"] = {
    get lastChannel(): LingoValue {
      return theProperty("lastChannel");
    },
    get stage(): LingoValue {
      return theProperty("stage");
    },
    get castLib(): LingoValue {
      return castLibIndex();
    },
  };

  registerProperties({
    // ⚠ Elapsed since the movie started, not a wall clock. VMK compares
    // differences, so an absolute epoch would still "work" until something
    // overflowed or a delta was compared against a small constant.
    milliSeconds: () => Math.round(performance.now() - started),
    ticks: () => Math.round((performance.now() - started) / (1000 / 60)),
    "long time": () => longTime(new Date()),
    "short time": () => longTime(new Date()),
    time: () => longTime(new Date()),
    date: () => shortDate(new Date()),
    "long date": () => shortDate(new Date()),
    "short date": () => shortDate(new Date()),

    mouseH: () => mouseX,
    mouseV: () => mouseY,
    mouseLoc: () => new LingoPoint(mouseX, mouseY) as unknown as LingoValue,
    /**
     * ⚠ LIVE button state, not constants.
     *
     * These were hardcoded `0` and `1`, which reads as "the button is never
     * down" — so any Lingo that waits on `the mouseDown` (drag loops, press
     * states) could never advance. `the clickOn` is the sprite the press landed
     * on, which Director sets and VMK reads to identify what was hit.
     */
    mouseDown: () => (mouseIsDown ? 1 : 0),
    mouseUp: () => (mouseIsDown ? 0 : 1),
    clickOn: () => clickOnSprite,
    clickLoc: () => new LingoPoint(clickX, clickY) as unknown as LingoValue,
    stillDown: () => (mouseIsDown ? 1 : 0),
    doubleClick: () => (doubleClick ? 1 : 0),

    key: () => key,
    keyCode: () => keyCode,
    /**
     * ⚠ LIVE modifier state, not constants — same story as `mouseDown` above.
     * Hardcoded 0 meant Ctrl/Shift never registered: Haunted Mansion's vacuum
     * (`CHMGameInterface.ReadKeys`: `the controlDown of _key or the shiftDown
     * of _key`) could never switch on.
     */
    shiftDown: () => (modifiers.shift ? 1 : 0),
    commandDown: () => (modifiers.command ? 1 : 0),
    controlDown: () => (modifiers.control ? 1 : 0),
    optionDown: () => (modifiers.option ? 1 : 0),

    // The stage rect in screen space. The canvas is the stage, so it starts at
    // the origin; VMK only ever uses the width and height.
    stageLeft: () => 0,
    stageTop: () => 0,
    stageRight: () => options.canvas.width,
    stageBottom: () => options.canvas.height,

    /**
     * `the environment` — Director's player-description property list.
     *
     * ⚠ Read as `the environment.productVersion`, so it must be a LIST, not a
     * string. `CModeratorAKB.construct` branches on it, and an undefined value
     * there is a TypeError inside a cast's constructor rather than a missed
     * branch.
     */
    environment: () =>
      new LingoPropList([
        symbol("platform"), "Windows,32",
        symbol("runMode"), options.runMode ?? "Plugin",
        symbol("productVersion"), options.productVersion ?? "10.1",
        symbol("productBuildVersion"), "0",
        symbol("osVersion"), "Windows XP",
        symbol("colorDepth"), 32,
      ]) as unknown as LingoValue,

    platform: () => "Windows,32",
    // Director 10 — the last version VMK shipped against.
    productVersion: () => options.productVersion ?? "10.1",
    runMode: () => options.runMode ?? "Plugin",
    moviePath: () => options.moviePath ?? `${location.origin}/`,
    movieName: () => "vmk",
    randomSeed: () => Math.floor(Math.random() * 0x7fffffff),
    frameTempo: () => tempo,
    selStart: () => 0,
    selEnd: () => 0,
    colorDepth: () => 32,
  });

  return {
    setMouse: (x, y) => {
      mouseX = Math.round(x);
      mouseY = Math.round(y);
    },
    setMouseButton: (down, spriteNum) => {
      mouseIsDown = down;
      // Director keeps `the clickOn` after release — it is "what was last
      // clicked", not "what is held" — so only a press updates it.
      if (down) clickOnSprite = spriteNum;
      if (down) {
        clickX = mouseX;
        clickY = mouseY;
        // Windows' rule: within the double-click time and a 4px box of the
        // previous press, and a double consumes the pair (a third click is a
        // fresh single, not another double).
        const now = performance.now();
        const isDouble =
          !lastPressWasDouble &&
          now - lastPressAt <= DOUBLE_CLICK_MS &&
          Math.abs(mouseX - lastPressX) <= DOUBLE_CLICK_SLOP &&
          Math.abs(mouseY - lastPressY) <= DOUBLE_CLICK_SLOP;
        doubleClick = isDouble;
        lastPressWasDouble = isDouble;
        lastPressAt = now;
        lastPressX = mouseX;
        lastPressY = mouseY;
      }
    },
    setKey: (value, code) => {
      key = value;
      keyCode = code;
      held.set(code, value);
    },
    /**
     * Key released. Clears only the HELD state — `the key` and `the keyCode`
     * keep the last keystroke, which is what Director does and what VMK reads
     * after the fact.
     */
    releaseKey: (code) => {
      if (code === undefined) {
        held.clear();
        modifiers.shift = modifiers.control = modifiers.option = modifiers.command = false;
      } else held.delete(code);
    },
    setModifiers: (shift, control, option, command) => {
      modifiers.shift = shift;
      modifiers.control = control;
      modifiers.option = option;
      modifiers.command = command;
    },
  };
}



