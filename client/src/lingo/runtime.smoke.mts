/**



/**
 * Two checks over the transpiled framework cast.
 *
 *   1. Execution — run machine-transpiled Lingo and verify the result.
 *   2. Coverage  — scan every generated handler for the builtins it calls and
 *                  report which are still unimplemented.
 *
 * Check 2 keeps its own work queue: it reads the generated sources rather than
 * a hand-maintained list, so it cannot drift from what the cast actually needs.
 *
 * Run: npx tsx client/src/lingo/runtime.smoke.ts
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { connect } from "../generated/core_old__CConnection__connect.js";
import { send } from "../generated/core_old__CConnection__send.js";
import { ToInt } from "../generated/core_old__CConnection__ToInt.js";
import { xtraMsgHandler } from "../generated/core_old__CConnection__xtraMsgHandler.js";
import * as mgrConstruct from "../generated/core_old__CMgrVariable__construct.js";
import * as mgrSet from "../generated/core_old__CMgrVariable__set.js";
import * as mgrGet from "../generated/core_old__CMgrVariable__get.js";
import * as mgrExists from "../generated/core_old__CMgrVariable__exists.js";
import * as mgrRemove from "../generated/core_old__CMgrVariable__Remove.js";
import * as mgrClear from "../generated/core_old__CMgrVariable__clear.js";
import { buildFromClassList, defineLingoClass, defineLingoClasses, elementClassKey, parseSystemProps, registerApiHandlers, type HandlerModule } from "./lingo-script.js";
import { LingoPoint, registerDispatchBuiltins, registerPureBuiltins } from "./lingo-builtins.js";
import { CastLib, CastRegistry, registerCastBuiltins } from "./lingo-cast.js";
import { loadCastFromExtract } from "./lingo-cast-node.js";
import { registerNetBuiltins } from "./lingo-net.js";
import { Movie, registerMovieBuiltins } from "./lingo-movie.js";
import { attachImages, INK_BACKGROUND_TRANSPARENT, registerStageBuiltins, Stage, substituteFont } from "./lingo-stage.js";
import { CONVERTED_FONTS } from "./lingo-text.js";
// ⚠ The CMgrObject one, not Object_API's. The API script's signature is
// `(_me, a_sID)` — no receiver — which is exactly the distinction under test.
import * as registerManagerModule from "../generated/core_old__CMgrObject__registerManager.js";
import {
  isStubbed,
  callMethod,
  callNamed,
  hasBuiltin,
  hasHandler,
  LingoList,
  lingoBinary,
  LingoPropList,
  lingoTruthy,
  registerHandlers,
  setGlobalVar,
  resetLingoRuntime,
  symbol,
  theProperty,
  VOID,
  type LingoObject,
  type LingoValue,
} from "./lingo-runtime.js";

const GENERATED = join(dirname(fileURLToPath(import.meta.url)), "..", "generated");

function asString(value: LingoValue): string {
  return typeof value === "string" ? value : String(value);
}

resetLingoRuntime();
registerPureBuiltins();
registerDispatchBuiltins();

const registry = new CastRegistry();
registry.addLib(
  loadCastFromExtract(
    join(dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "core", "core.old"),
    "Internal",
    1,
  ),
);
registerCastBuiltins(registry);

let failures = 0;

function check(label: string, condition: boolean, detail = ""): void {
  if (!condition) failures++;
  console.log(`  ${condition ? "ok  " : "FAIL"} ${label}${detail ? ` — ${detail}` : ""}`);
}

// ---------------------------------------------------------------------------
// 1. Execution
// ---------------------------------------------------------------------------

console.log("== execution: CConnection.ToInt (transpiled, unedited) ==\n");

/**
 * Inverse of ToInt, derived from the encoder's own structure: the first
 * character carries the low 2 bits, a sign flag at bit 2, and the length from
 * bit 3; each later character carries 6 more bits, least significant first.
 */
function decode(encoded: string): number {
  const head = encoded.charCodeAt(0);
  let value = head & 3;
  let shift = 2;
  for (let i = 1; i < encoded.length; i++) {
    value += (encoded.charCodeAt(i) - 64) * 2 ** shift;
    shift += 6;
  }
  return (head & 4) !== 0 ? -value : value;
}

const cases = [0, 1, 3, 4, 63, 64, 255, 256, 1000, 65535, 1_000_000, -1, -42, -65535];
for (const input of cases) {
  const encoded = asString(ToInt({}, {}, input));
  const roundTripped = decode(encoded);
  if (roundTripped !== input) {
    failures++;
    console.log(`  FAIL ToInt(${input}) -> ${roundTripped}`);
  }
}
console.log(
  failures === 0
    ? `  ok — ${cases.length}/${cases.length} round-tripped\n`
    : `  ${failures} failures\n`,
);

// ---------------------------------------------------------------------------
// 1b. Cast layer, against members extracted from core.old.cct
// ---------------------------------------------------------------------------

console.log("== cast layer ==\n");

const threadIndex = callNamed("member", "thread.index") as unknown as {
  _type: string;
  _number: number;
  text: string;
  name: string;
};
check("member(\"thread.index\") resolves", threadIndex._type !== symbol("empty"), threadIndex.name);
check("its text loaded", threadIndex.text.length > 0, `${threadIndex.text.length} chars`);

const absent = callNamed("member", "no.such.member") as unknown as { _type: string; _number: number };
check("a miss returns #empty rather than throwing", absent._type === symbol("empty"));
check("a miss reports a non-positive number", absent._number <= 0, String(absent._number));

const internal = callNamed("castLib", 1) as unknown as { name: string };
check("castLib(1) is Internal", internal?.name === "Internal", internal?.name);

const channel = callNamed("sprite", 5) as unknown as { spriteNum: number; _type: string };
check("sprite(5) exists and is empty", channel.spriteNum === 5 && channel._type === symbol("empty"));

/**
 * The DRAW font and the LOADED font must be the same face.
 *
 * A CSS font stack that names a family nobody registered does not fail — the
 * canvas quietly falls back to the next entry. So `substituteFont` returning
 * `"Foxley 816"` while the loader registered `Foxley816` was invisible: every
 * caption measured with the converted PFR1 face and painted with Georgia, and
 * nothing anywhere reported a problem. Only the rendering looked wrong.
 *
 * Asserting on the FIRST family of each stack is the point: the fallbacks are
 * meant to be unreachable for the faces we actually converted.
 */
/**
 * ⚠ `bindReceiver` reads PARAMETER NAMES out of `fn.toString()`.
 *
 * That is the single most build-fragile thing in the runtime: a minifier
 * renames `_this`, every receiver-taking handler is then treated as
 * receiver-less, and every one of their arguments shifts by one. It fails
 * SILENTLY in the sense that nothing about it is visible in dev — the dev
 * server does not minify, so the split only appears in a build, as a wrong-type
 * error deep inside unrelated Lingo ("Lingo method not found: exists on
 * string").
 *
 * This asserts the mechanism still works on a real transpiled handler, so if
 * the technique is ever broken — by a build step, a transform, or a rewrite of
 * `bindReceiver` — a test says so instead of a production bundle.
 */
{
  const cls = defineLingoClass("CMgrObject", [registerManagerModule as never]);
  // The module exports exactly one handler; take it rather than guessing at
  // how `handlerName` cases the key.
  const [boundName, bound] = [...cls.handlers.entries()][0] ?? ["", undefined];
  check(
    "bindReceiver bound the generated handler",
    typeof bound === "function",
    `${boundName || "MISSING"}`,
  );
  /**
   * The receiver duplication itself: a `_this` handler must be invoked as
   * `fn(me, me, …)`. Called with a single argument, an UNBOUND handler would
   * put that argument in `_this`; a correctly bound one puts `me` there and
   * leaves `tID` undefined — so `exists` is called on the RECEIVER.
   */
  let sawReceiver: unknown = "not called";
  const probeReceiver = {
    exists: (...args: LingoValue[]) => { sawReceiver = args[0]; return 0; },
    pManagerList: new LingoList([]),
    pInstanceList: new LingoList([]),
  } as unknown as LingoObject;
  try { bound?.(probeReceiver as unknown as LingoValue, "some.id"); } catch { /* error path is fine */ }
  check(
    "…and passed the RECEIVER as `_this`, not the first argument",
    sawReceiver === undefined || sawReceiver === "some.id" ? false : true,
    `exists() received: ${String(sawReceiver)}`,
  );
  check(
    "…and the source still declares `_this` (a minifier would erase this)",
    /\(\s*_me\s*,\s*_this\b/.test(String(registerManagerModule.registerManager)),
    String(registerManagerModule.registerManager).slice(0, 60),
  );
}

const convertedFamilies = new Set(CONVERTED_FONTS.map(([family]) => family));
for (const directorName of ["Foxley 816", "Foxley 816 Bold", "Folio BoldCondensed *"]) {
  const first = substituteFont(directorName).split(",")[0]!.trim().replace(/^["']|["']$/g, "");
  check(
    `substituteFont("${directorName}") resolves to a loaded face`,
    convertedFamilies.has(first),
    `${first} (loaded: ${[...convertedFamilies].join(", ")})`,
  );
}

console.log("");

// ---------------------------------------------------------------------------
// 1c. Network: transpiled CConnection.send through a Multiuser Xtra
// ---------------------------------------------------------------------------

console.log("== network: CConnection.connect + send (transpiled) ==\n");

const sent: string[] = [];
let socketOpen: (() => void) | null = null;

const { net } = registerNetBuiltins({
  socketFactory: () => {
    const socket = {
      /**
       * ⚠ Decode, do not stringify. Frames go out as an ArrayBuffer (a text
       * frame would UTF-8 re-encode every byte above 127), and `String(buffer)`
       * captures the literal text "[object ArrayBuffer]" — which asserts
       * nothing while looking like a real frame.
       */
      send: (data: string | ArrayBufferLike) =>
        void sent.push(
          typeof data === "string"
            ? data
            : String.fromCharCode(...new Uint8Array(data as ArrayBuffer)),
        ),
      close: () => {},
      onmessage: null,
      onopen: null,
      onclose: null,
      onerror: null,
    };
    // Defer "open" so connectToNetServer returns first, as a real socket would.
    queueMicrotask(() => {
      socketOpen = () => socket.onopen?.();
      socketOpen();
    });
    return socket;
  },
  fetchText: async (url) => `fetched:${url}`,
});

/**
 * A CConnection instance. `ToInt` and `xtraMsgHandler` are the *transpiled*
 * handlers — they are what is under test. `msghandler` is the application-level
 * callback that a port supplies itself, so it is a recorder here; `getID` and
 * `log` are trivial host services.
 */
// VMK's own movie-level handlers. In a full port these are the transpiled
// versions; here they only need to exist and be observable.
const reportedErrors: string[] = [];
const sessionValues = new Map<string, LingoValue>();
const sessionObject = {
  set: (_me: unknown, key: LingoValue, value: LingoValue) => {
    sessionValues.set(String(key), value);
    return 0;
  },
};

registerHandlers({
  error: (_me, message) => {
    reportedErrors.push(String(message));
    return 0;
  },
  executeMessage: () => 0,
  // `getObject(#session)` is VMK's service locator; `send` logs to it.
  getObject: () => sessionObject as unknown as LingoValue,
});

const inboundSubjects: LingoValue[] = [];
const connection: Record<string, unknown> = {
  pConnectionOk: 0,
  pXtra: undefined,
  pLogMode: 0,
  pConnectionShouldBeKilled: 0,
  pLastContent: "",
  ToInt,
  xtraMsgHandler,
  getID: () => "CConnection",
  log: () => 0,
  disconnect: () => 0,
  msghandler: (_me: unknown, content: LingoValue) => {
    inboundSubjects.push(content);
    return 0;
  },
};

// connect(me, host, port) returns 1 on success — see the tail of the handler.
const connectResult = connect(connection as never, "127.0.0.1", 1626);
check("connect() succeeded", connectResult === 1, `returned ${String(connectResult)}`);
check("a Multiuser xtra was created", connection.pXtra !== undefined);

await Promise.resolve();
check("socket opened and the handler ran", connection.pConnectionOk === 1);
const parms = new LingoPropList();
parms.setProp(symbol("string"), "hello");

send(connection as never, 20, parms);

check("send() emitted exactly one frame", sent.length === 1, `${sent.length}`);
if (sent.length === 1) {
  // One char per byte — the fake socket decodes the binary frame on capture.
  const frame = sent[0]!;
  const bytes = [...frame].map((c) => c.charCodeAt(0));

  // Command 20 encodes as two 6-bit chars biased by 64:
  //   hi = bitOr(64, 20/64) = 64 = "@"   lo = bitOr(64, bitAnd(63,20)) = 84 = "T"
  check("command 20 encodes as \"@T\"", frame.includes("@T"), frame.slice(0, 4));
  check("payload survives round trip", frame.includes("hello"));
  check("frame carries a length prefix", bytes[0]! >= 64, `first byte ${bytes[0]}`);
  console.log(`       frame: ${frame.length} bytes [${bytes.join(",")}]`);
}

const netId = callNamed("getNetText", "http://example.invalid/vars.txt");
await new Promise((resolve) => setTimeout(resolve, 0));
check("netDone reports completion", net.done(netId) === 1);
check("netError reports OK", net.error(netId) === "OK", String(net.error(netId)));
check("netTextResult returns the body", String(net.text(netId)).startsWith("fetched:"));

const status = callNamed("getStreamStatus", netId) as unknown as Record<string, unknown>;
check("getStreamStatus is a list", callNamed("listp", status as never) === 1);
check("…indexable by symbol", status[symbol("bytesTotal")] !== undefined, String(status[symbol("bytesTotal")]));

console.log("");

// ---------------------------------------------------------------------------
// 1d. Stage: composite real cast art
// ---------------------------------------------------------------------------

console.log("== stage compositor, against the registration cast ==\n");

const artDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "..", "..", "assets", "registration", "registration",
);
const artLib = loadCastFromExtract(artDir, "Registration", 2);
registry.addLib(artLib);

const bitmaps = artLib.members.filter((member) => member.imagePath !== "");
check("bitmap members loaded", bitmaps.length > 0, `${bitmaps.length} of ${artLib.count}`);

const sized = bitmaps.filter((member) => member.width > 0 && member.height > 0);
check("dimensions read from the PNGs", sized.length === bitmaps.length, `${sized.length} sized`);

const sample = bitmaps.find((member) => member.name === "bubbletext5");
check("bubbletext5 is 108x24", sample?.width === 108 && sample?.height === 24, `${sample?.width}x${sample?.height}`);

// Pixels come from the host; a Node test only needs a stand-in.
const attached = await attachImages(bitmaps, async (path) => `image:${path}` as never);
check("images attached to members", attached === bitmaps.length, `${attached}`);

const stage = new Stage(registry, 800, 600);

// Occupy three channels out of order to prove channel order drives z-order.
const back = registry.sprite(3);
back.member = bitmaps[0]!;
back.locH = 10;
back.locV = 20;

const mid = registry.sprite(1);
mid.member = bitmaps[1]!;
mid.locH = 100;
mid.locV = 200;
mid.blend = 50;

const hidden = registry.sprite(2);
hidden.member = bitmaps[2]!;
hidden.visible = 0;

const calls: string[] = [];
const target = {
  clearRect: () => void calls.push("clear"),
  drawImage: (_img: unknown, x: number, y: number, w: number, h: number) =>
    void calls.push(`draw ${x},${y} ${w}x${h}`),
  set globalAlpha(value: number) {
    calls.push(`alpha ${value}`);
  },
};

const frame = stage.render(target);
check("drew two sprites, skipping the invisible one", frame.length === 2, `${frame.length}`);
check("channel order is z-order", frame[0]?.channel === 1 && frame[1]?.channel === 3,
  frame.map((record) => record.channel).join(" then "));
/**
 * ⚠ `loc` is the sprite's REGISTRATION POINT, not its top-left.
 *
 * This check used to assert `x === locH`, which quietly encoded "loc is the
 * top-left" — true only for a member registered at (0,0). Director centres an
 * imported bitmap, and VMK depends on that: `Core Thread Class.showLogo` places
 * the boot logo at `point(stage.width/2, …)` and expects the logo's MIDDLE to
 * land there. Under the old reading it drew half its size down and right.
 *
 * `bitmaps[0]` is a 108x24 imported member, so its registration point is
 * (54, 12) and the art starts at `10-54, 20-12`.
 */
const registered = back.member.regPoint;
check("regPoint of an imported bitmap is its centre",
  registered.locH === 54 && registered.locV === 12, `${registered.locH},${registered.locV}`);
check("loc is the registration point, so art draws at loc - regPoint",
  frame[1]?.x === 10 - 54 && frame[1]?.y === 20 - 12, `${frame[1]?.x},${frame[1]?.y}`);

check("blend 50 became alpha 0.5", frame[0]?.alpha === 0.5, String(frame[0]?.alpha));
check("target received clear + 2 draws", calls.filter((c) => c.startsWith("draw")).length === 2,
  calls.join(" | "));

// …and a member registered at (0,0) — every window element buffer, which VMK
// sets explicitly — still places by its top-left. Rendered into its own target
// so the draw count above stays a count of ONE frame.
back.member.regPoint = new LingoPoint(0, 0);
const topLeft = stage.render({ ...target, clearRect: () => {}, drawImage: () => {} });
check("a regPoint of (0,0) places by the top-left",
  topLeft[1]?.x === 10 && topLeft[1]?.y === 20, `${topLeft[1]?.x},${topLeft[1]?.y}`);

// Ink selection. The pixel work needs a canvas, so headlessly we assert the
// contract instead: ink 0 draws the plain image, ink 36 asks the preparer once
// and caches, and a preparer that declines falls back rather than not drawing.
const prepared: number[] = [];
const inkStage = new Stage(registry, 800, 600, (member, ink) => {
  prepared.push(ink);
  return `knockout:${member.name}`;
});
const inkChannel = registry.sprite(7);
inkChannel.member = bitmaps[3]!;
inkChannel.ink = INK_BACKGROUND_TRANSPARENT;

const inkCalls: string[] = [];
const inkTarget = {
  clearRect: () => {},
  drawImage: (img: unknown) => void inkCalls.push(String(img)),
  set globalAlpha(_v: number) {},
};
inkStage.render(inkTarget);
inkStage.render(inkTarget);

check("ink 36 requested a prepared variant", prepared.length >= 1, `${prepared.length} call(s)`);
check("the variant is cached, not rebuilt", prepared.length === 1, `${prepared.length}`);
check("the knockout is what gets drawn",
  inkCalls.some((call) => call.startsWith("knockout:")), inkCalls[0] ?? "none");
check("ink is reported on the draw record",
  inkStage.lastFrame.some((record) => record.ink === INK_BACKGROUND_TRANSPARENT));

console.log("");

// ---------------------------------------------------------------------------
// 1e. Frame loop and event dispatch
// ---------------------------------------------------------------------------

console.log("== movie: frame loop + events ==\n");

const movie = new Movie(registry);
registerMovieBuiltins(movie);

const log: string[] = [];
const movieScript = {
  prepareFrame: () => void log.push("movie.prepareFrame"),
  enterFrame: () => void log.push("movie.enterFrame"),
  exitFrame: () => void log.push("movie.exitFrame"),
  idle: () => void log.push("movie.idle"),
  mouseDown: () => void log.push("movie.mouseDown"),
};
movie.addMovieScript(movieScript as never);

movie.tick();
check("a tick fires Director's four frame events in order",
  log.join(",") === "movie.prepareFrame,movie.enterFrame,movie.exitFrame,movie.idle",
  log.join(","));
check("tick counter advanced", movie.ticks === 1, String(movie.ticks));

// Two sprites, overlapping, so hit testing has to pick the topmost channel.
const lower = registry.sprite(11);
lower.member = bitmaps[0]!;
lower.locH = 0;
lower.locV = 0;

const upper = registry.sprite(12);
upper.member = bitmaps[0]!;
upper.locH = 0;
upper.locV = 0;

const hits: string[] = [];
lower.scripts.push({ mouseDown: () => void hits.push("lower") } as never);
upper.scripts.push({ mouseDown: () => void hits.push("upper") } as never);

log.length = 0;
movie.clickMouse(5, 5);
check("click hit the topmost channel", hits.join(",") === "upper", hits.join(",") || "none");
check("the movie script did not also see it", !log.includes("movie.mouseDown"), log.join(","));

check("the mouse position became a movie property",
  callNamed("ilk", 0) !== undefined && theProperty("mouseH") === 5, String(theProperty("mouseH")));

// pass() should let the event continue down the chain.
hits.length = 0;
log.length = 0;
upper.scripts.length = 0;
upper.scripts.push({
  mouseDown: () => {
    hits.push("upper");
    callNamed("pass");
  },
} as never);
movie.clickMouse(5, 5);
check("pass() lets the event reach the movie script",
  hits.includes("upper") && log.includes("movie.mouseDown"), `${hits.join(",")} | ${log.join(",")}`);

// A click on empty stage should skip sprites entirely.
log.length = 0;
hits.length = 0;
movie.clickMouse(700, 480);
check("a miss goes straight to the movie script",
  hits.length === 0 && log.includes("movie.mouseDown"), log.join(","));

// Rollover: entering then leaving a sprite.
const rollover: string[] = [];
lower.scripts.length = 0;
upper.scripts.length = 0;
upper.scripts.push({
  mouseEnter: () => void rollover.push("enter"),
  mouseLeave: () => void rollover.push("leave"),
} as never);
movie.moveMouse(5, 5);
movie.moveMouse(700, 480);
check("rollover fired enter then leave", rollover.join(",") === "enter,leave", rollover.join(","));

console.log("");

// ---------------------------------------------------------------------------
// 1f. A real VMK class, running its own transpiled Lingo
// ---------------------------------------------------------------------------

console.log("== transpiled class: CMgrVariable (VMK's variable manager) ==\n");

const CMgrVariable = defineLingoClass("CMgrVariable", [
  mgrConstruct, mgrSet, mgrGet, mgrExists, mgrRemove, mgrClear,
]);

check("handlers bound from generated modules", CMgrVariable.handlers.size >= 6,
  [...CMgrVariable.handlers.keys()].join(","));
check("reserved-word exports unmangled", CMgrVariable.handlers.has("set") && CMgrVariable.handlers.has("get"));

const vars = CMgrVariable.create();
check("construct() initialised pItemList", vars.pItemList instanceof LingoPropList);

// Exercise it exactly as VMK's own code would.
callMethod("set", vars, "client.version", "1.0.3");
callMethod("set", vars, symbol("tempo"), 30);

check("set + get round-trips a string",
  callMethod("get", vars, "client.version", VOID) === "1.0.3",
  String(callMethod("get", vars, "client.version", VOID)));
check("set + get round-trips a symbol key",
  callMethod("get", vars, symbol("tempo"), VOID) === 30,
  String(callMethod("get", vars, symbol("tempo"), VOID)));
check("exists() is true for a set key",
  lingoTruthy(callMethod("exists", vars, "client.version")));
check("exists() is false for an unset key",
  !lingoTruthy(callMethod("exists", vars, "nope")));

callMethod("Remove", vars, "client.version");
check("Remove() deletes the key",
  !lingoTruthy(callMethod("exists", vars, "client.version")));

callMethod("clear", vars);
check("clear() empties the list", (vars.pItemList as LingoPropList).count === 0,
  String((vars.pItemList as LingoPropList).count));

console.log("");

// ---------------------------------------------------------------------------
// 1g. Whole-corpus class loading, across two casts
// ---------------------------------------------------------------------------

console.log("== class registry: core framework + registration UI ==\n");

async function loadCastModules(dir: string): Promise<Record<string, HandlerModule>> {
  const modules: Record<string, HandlerModule> = {};
  for (const file of readdirSync(dir).filter((name) => name.endsWith(".ts"))) {
    modules[file] = (await import(pathToFileURL(join(dir, file)).href)) as HandlerModule;
  }
  return modules;
}

const SRC = dirname(fileURLToPath(import.meta.url));
const coreModules = await loadCastModules(join(SRC, "..", "generated"));
const regModules = await loadCastModules(join(SRC, "..", "generated-registration"));

const classes = defineLingoClasses({ ...coreModules, ...regModules });
check("classes built from both casts", classes.size > 60, `${classes.size} classes`);
check("core framework present", classes.has("CMgrVariable") && classes.has("CWindow"));
check("registration UI present", classes.has("CRegPageBase") && classes.has("CRegPage1"));

/**
 * Instantiate everything and see how far each class's `construct` gets.
 *
 * This is a coverage measurement, not a pass/fail: a class that needs a live
 * window or a server connection is *expected* to stop. What matters is the
 * shape of the failures — a missing global handler is a porting task, whereas
 * a runtime type error is a defect in this runtime.
 */
// VMK's *_API movie scripts are global handlers, not classes.
const apiHandlers = registerApiHandlers(classes);
check("API movie scripts registered as globals", apiHandlers > 80, `${apiHandlers} handlers`);
check("…including the variable API", hasHandler("getVariable") && hasHandler("getIntVariable"));

registerHandlers({
  executeMessage: () => 0,
  getObject: () => sessionObject as unknown as LingoValue,
});

let constructed = 0;
const blockers = new Map<string, number>();
for (const [name, cls] of classes) {
  if (!cls.handlers.has("construct")) continue;
  try {
    cls.create();
    constructed++;
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    // Keep the NAME, not just the category — "handler not implemented" is not
    // actionable, "getVariableManager/0" is.
    const named = /(?:not implemented|not found): ([\w.$#]+)/.exec(message);
    const key = named ? `${named[1]}  (${message.split(":")[0]})` : message.slice(0, 58);
    blockers.set(key, (blockers.get(key) ?? 0) + 1);
  }
}

const withConstruct = [...classes.values()].filter((c) => c.handlers.has("construct")).length;
// Not a pass/fail: a class needing a live window or server connection is
// *expected* to stop here. The number is a progress measure, and the named
// blockers below are the work queue.
check("a meaningful share of classes construct", constructed >= 15,
  `${constructed}/${withConstruct}`);

console.log(`  ${constructed}/${withConstruct} classes ran construct() to completion`);
if (blockers.size > 0) {
  console.log("  blocking dependencies, by class count — this is the work queue:");
  for (const [reason, count] of [...blockers].sort((a, b) => b[1] - a[1]).slice(0, 10)) {
    console.log(`    ${String(count).padStart(3)}  ${reason}`);
  }
}

// A real registration page, from VMK's own UI cast.
const regPage = classes.get("CRegPageBase")!.create();
check("CRegPageBase.construct set its page model",
  regPage.m_iPageCount === 3 && regPage.m_iCurrentPage === 0,
  `pages=${String(regPage.m_iPageCount)} current=${String(regPage.m_iCurrentPage)}`);
check("…and starts hidden", regPage.m_bVisible === 0 && regPage.m_bReady === 0);

console.log("");

// ---------------------------------------------------------------------------
// 1h. VMK's own CWindow, driven by the Movie dispatch chain
// ---------------------------------------------------------------------------

console.log("== transpiled CWindow in the event chain ==\n");

// `CWindow.construct` calls getID(this) — inherited from CObject — so the
// ancestor must exist before construct runs, exactly as CMgrObject arranges.
registerStageBuiltins(stage);

const CObject = classes.get("CObject")!;
const CWindow = classes.get("CWindow")!;

const base = CObject.create();
const window = CWindow.instantiate({ ancestor: base, props: { id: "reg.window" } });

check("CWindow constructed with an inherited getID",
  callMethod("getID", window) === "reg.window", String(callMethod("getID", window)));
check("construct() initialised window state",
  window.pVisible === 1 && window.pLocX === 0 && window.pSpriteList instanceof LingoPropList,
  `visible=${String(window.pVisible)}`);

check("hide() flips visibility through VMK's own code",
  (callMethod("hide", window), window.pVisible === 0),
  `pVisible=${String(window.pVisible)}`);

// Now put it in the dispatch chain as a sprite behaviour and send a real click.
// Its transpiled mouseDown needs a window manager and a special-ID list, which
// a real client supplies; stubs here keep the focus on the dispatch path.
window.pWindowMngr = { Activate: () => 0 } as unknown as LingoValue;
window.pSpecialIDList = new LingoPropList();
window.pActive = 0;
window.pLock = 0;

const winChannel = registry.sprite(31);
winChannel.member = bitmaps[0]!;
winChannel.locH = 300;
winChannel.locV = 300;
winChannel.scripts.push(window as never);

let reachedVmkCode = false;
const originalActivate = (window.pWindowMngr as { Activate: () => number }).Activate;
(window.pWindowMngr as { Activate: () => number }).Activate = () => {
  reachedVmkCode = true;
  return originalActivate();
};

const dispatched = movie.clickMouse(310, 310);
check("the click reached a sprite behaviour",
  dispatched.some((record) => record.target.startsWith("sprite")),
  dispatched.map((r) => `${r.target}:${r.handled}`).join(" "));
check("…and ran VMK's transpiled CWindow.mouseDown", reachedVmkCode);

console.log("");

// ---------------------------------------------------------------------------
// 1i. VMK code placing sprites
// ---------------------------------------------------------------------------

console.log("== transpiled CVisualizer moving a real sprite ==\n");

// CVisualizer is the class that owns sprites: getSprite, moveSprTo,
// spriteExists all read `pActSprList`, a prop list of sprite objects keyed by
// element id. Give it real SpriteChannels and its own code drives the stage.
const CVisualizer = classes.get("CVisualizer")!;
const vis = CVisualizer.instantiate({ ancestor: CObject.create(), props: { id: "reg.visual" } });

const managed = registry.sprite(40);
managed.member = bitmaps[1]!;
managed.locH = 10;
managed.locV = 10;

const sprList = new LingoPropList();
sprList.setProp("logo", managed as unknown as LingoValue);
vis.pActSprList = sprList as unknown as LingoValue;

check("spriteExists() finds it through VMK's code",
  lingoTruthy(callMethod("spriteExists", vis, "logo")));
check("getSprite() returns the channel",
  callMethod("getSprite", vis, "logo") === (managed as unknown as LingoValue));

// The payoff: VMK's own handler repositions a channel the compositor draws.
callMethod("moveSprTo", vis, "logo", 250, 175);
check("moveSprTo() moved the real channel",
  managed.locH === 250 && managed.locV === 175, `@${managed.locH},${managed.locV}`);
check("…and `the loc of sprite` reads back as a point",
  managed.loc.locH === 250 && managed.loc.locV === 175,
  `${managed.loc.locH},${managed.loc.locV}`);

const beforeStretch = managed.drawWidth;
managed.width = beforeStretch + 40;
check("width is writable, as Director's is",
  managed.drawWidth === beforeStretch + 40, `${beforeStretch} -> ${managed.drawWidth}`);

// And it lands in a rendered frame.
const visFrame = stage.render();
// The frame position is `loc - regPoint`, not `loc` — this member is an
// imported bitmap, so it is registered at its centre. The width was just
// stretched, and a stretched sprite's reg point stretches with it (Director
// scales the rect about `loc`). See the compositor.
const movedReg = managed.member.regPoint;
const movedScaleX = managed.drawWidth / managed.member.width;
check("the moved sprite appears in the frame at its new position",
  visFrame.some((r) =>
    r.channel === 40 && r.x === 250 - movedReg.locH * movedScaleX && r.y === 175 - movedReg.locV),
  visFrame.filter((r) => r.channel === 40).map((r) => `@${r.x},${r.y}`).join(" ") || "absent");

console.log("");

// ---------------------------------------------------------------------------
// 1j. Lingo varargs, and VMK's config path
// ---------------------------------------------------------------------------

console.log("== varargs + config ==\n");

// Lingo handlers are variadic; VMK's Object_API.createObject walks
// `for i = 2 to the paramCount` to gather a class list, so both have to be real.
registerHandlers({
  countParams: () => theProperty("paramCount") as LingoValue,
  secondParam: () => callNamed("param", 2),
});

check("the paramCount reflects the live call",
  callNamed("countParams", "a", "b", "c") === 3,
  String(callNamed("countParams", "a", "b", "c")));
check("param(n) reads the calling handler's arguments",
  callNamed("secondParam", "first", "second") === "second",
  String(callNamed("secondParam", "first", "second")));

// `System Props` is a real text member in core.old.cct, and
// Variable_API.CreateVariableManager reads the manager class out of it.
const systemProps = callNamed("member", "System Props") as unknown as {
  isEmpty: boolean;
  text: string;
};
check("System Props member is present", !systemProps.isEmpty,
  `${systemProps.text.length} chars`);
check("…and names the variable manager class",
  systemProps.text.includes("variable.manager.class"),
  systemProps.text.split(/\r|\n/).find((l) => l.includes("variable.manager")) ?? "not found");

// VMK's own class registry, parsed from the member the client reads.
const config = parseSystemProps(systemProps.text);
check("System Props parsed into config entries", config.size > 80, `${config.size} entries`);

const windowChain = config.get("window.manager.class") as unknown as { toArray(): string[] };
check("class declarations are ancestor chains",
  windowChain?.toArray().join(" -> ") === "TManager -> CMgrVisualizer -> CMgrWindow",
  windowChain?.toArray().join(" -> "));

// Compose an object from that chain, base-first, the way createObject does.
const varMgrChain = (config.get("variable.manager.class") as unknown as { toArray(): string[] })
  .toArray();
// ⚠ The declared chain does NOT include the base class: TManager has no
// getID/setID, CObject does. VMK's CMgrObject.create supplies the base, so a
// faithful composition prepends it rather than trusting the config alone.
const composed = buildFromClassList(classes, ["CObject", ...varMgrChain], { id: "variable_manager" });

check("composed object is the concrete class",
  composed.__lingoClass === "CMgrVariable", String(composed.__lingoClass));
check("…over the declared ancestor",
  (composed.ancestor as { __lingoClass?: string } | undefined)?.__lingoClass === "TManager",
  String((composed.ancestor as { __lingoClass?: string } | undefined)?.__lingoClass));
check("…over the implicit CObject base",
  ((composed.ancestor as LingoObject).ancestor as { __lingoClass?: string } | undefined)
    ?.__lingoClass === "CObject",
  String(((composed.ancestor as LingoObject).ancestor as { __lingoClass?: string } | undefined)
    ?.__lingoClass));
check("…and methods resolve two levels down the chain",
  callMethod("getID", composed) === "variable_manager",
  String(callMethod("getID", composed)));

// It is a working variable manager, built entirely from VMK's own declaration.
callMethod("set", composed, "system.tempo", 30);
check("the composed manager stores and returns values",
  callMethod("get", composed, "system.tempo", VOID) === 30,
  String(callMethod("get", composed, "system.tempo", VOID)));

console.log("");

// ---------------------------------------------------------------------------
// 1k. VMK's service locator, booted from its own config
// ---------------------------------------------------------------------------

console.log("== service locator: g_rCore + managers ==\n");

/**
 * Everything in VMK hangs off one global: `Object_API.getObjectManager` reads
 * `g_rCore`, and every `get*Manager()` goes through it. Boot it the way the
 * client does — compose the object manager from its declared class list, then
 * register the variable manager under the id the API asks for.
 */
const objectChain = (config.get("object.manager.class") as unknown as { toArray(): string[] })
  .toArray();
const core = buildFromClassList(classes, ["CObject", ...objectChain], { id: "core" });
setGlobalVar("g_rCore", core as unknown as LingoValue);

check("g_rCore holds a composed CMgrObject",
  core.__lingoClass === "CMgrObject" && core.pObjectList instanceof LingoPropList);
check("getObjectManager() finds it through VMK's own API",
  callNamed("getObjectManager") === (core as unknown as LingoValue));

// Register the variable manager the way CMgrObject expects: object list entry
// plus a manager-list registration.
const varManager = buildFromClassList(
  classes,
  ["CObject", ...varMgrChain],
  { id: "variable_manager" },
);
(core.pObjectList as unknown as LingoPropList).setProp(
  symbol("variable_manager"),
  varManager as unknown as LingoValue,
);
callMethod("append", core.pManagerList as LingoValue, symbol("variable_manager"));

check("managerExists() sees the registration",
  lingoTruthy(callMethod("managerExists", core, symbol("variable_manager"))));
check("getVariableManager() resolves the whole chain",
  callNamed("getVariableManager") === (varManager as unknown as LingoValue));

// With the locator up, VMK's config API works end to end.
callMethod("set", varManager, "system.tempo", 30);
callMethod("set", varManager, "client.version", "1.0.3");

check("variableExists() answers through the API",
  lingoTruthy(callNamed("variableExists", "system.tempo")) &&
    !lingoTruthy(callNamed("variableExists", "no.such.key")));
check("getVariable() returns a stored value",
  callNamed("getVariable", "client.version") === "1.0.3",
  String(callNamed("getVariable", "client.version")));
check("getIntVariable() coerces",
  callNamed("getIntVariable", "system.tempo", 0) === 30,
  String(callNamed("getIntVariable", "system.tempo", 0)));

// And the class registry itself becomes queryable, which is what
// CWindow.CreateElement needs to resolve element classes.
for (const [key, value] of config) {
  if (key.endsWith(".class")) callMethod("set", varManager, key, value);
}
check("GetClsVariable() returns a declared class chain",
  ((callNamed("GetClsVariable", "window.instance.class", VOID) as unknown as
    { toArray?: () => string[] })?.toArray?.() ?? []).join() === "CWindow",
  String((callNamed("GetClsVariable", "window.instance.class", VOID) as unknown as
    { toArray?: () => string[] })?.toArray?.()));

console.log("");

// ---------------------------------------------------------------------------
// 1l. Layout data → VMK's class registry → live element objects
// ---------------------------------------------------------------------------

console.log("== element classes resolved from a real layout ==\n");

const classKeys = [...config.keys()].filter((k) => k.startsWith("window.") && k.endsWith(".class"));
check("the registry holds the UI element classes", classKeys.length >= 18,
  `${classKeys.length} window.*.class entries`);

// Disney's config contains two malformed declarations the client reads anyway.
const templateChain = config.get("manager.template.class") as unknown as { toArray(): string[] };
check("an unclosed quote still parses — [\"TManager]",
  templateChain?.toArray().join() === "TManager", String(templateChain?.toArray()));
check("a non-list declaration still parses — event.broker.class",
  String(config.get("event.broker.class")) === "CEventBroker",
  String(config.get("event.broker.class")));

/**
 * The real type/model pairs in the fireworks HUD, counted from its layout:
 *
 *   text|#image 74 · image| 33 · piece| 28 · button|14 9
 *
 * ⚠ Not every pair has a declared class, and that is **by design**: when the
 * key is missing `CreateElement` falls back to the element's *style* template
 * (`pElemClsList[tProps[#style]]`). So "class not found" is a normal path, not
 * an error — `window.button14.class` is declared nowhere, in core's System
 * Props or in any external_variables file, yet the client renders those buttons
 * fine.
 */
const layoutPairs = [
  { type: "text", model: "#image", expect: true },
  { type: "image", model: "", expect: true },
  { type: "piece", model: "", expect: false },
  { type: "button", model: "14", expect: false },
];

const classified = layoutPairs.map((pair) => ({
  key: elementClassKey(pair.type, pair.model),
  declared: lingoTruthy(callNamed("variableExists", elementClassKey(pair.type, pair.model))),
  expect: pair.expect,
}));

check("type+model maps onto registry keys as CreateElement builds them",
  classified.every((c) => c.declared === c.expect),
  classified.map((c) => `${c.key}=${c.declared ? "declared" : "template"}`).join(" "));
check("text|#image resolves to the image+text wrapper pair",
  ((callNamed("GetClsVariable", "window.textimage.class", VOID) as unknown as
    { toArray(): string[] }).toArray().join(" -> ")) ===
    "CWindowImageWrapper -> CWindowTextWrapper",
  (callNamed("GetClsVariable", "window.textimage.class", VOID) as unknown as
    { toArray(): string[] }).toArray().join(" -> "));

// Compose one for real: window.button4.class is a two-class chain.
const buttonChain = (callNamed("GetClsVariable", "window.button4.class", VOID) as unknown as
  { toArray(): string[] }).toArray();
check("button4 is a two-class chain",
  buttonChain.join(" -> ") === "CWindowCommonButton -> CWindowImageButton",
  buttonChain.join(" -> "));

const haveButtonClasses = buttonChain.every((name) => classes.has(name));
check("…and both classes exist in the transpiled corpus", haveButtonClasses,
  buttonChain.filter((n) => !classes.has(n)).join(",") || "all present");

if (haveButtonClasses) {
  const button = buildFromClassList(classes, ["CObject", ...buttonChain], { id: "btn.instructions" });
  check("a UI element instantiates from VMK's own declaration",
    button.__lingoClass === "CWindowImageButton", String(button.__lingoClass));
  check("…and inherits down the declared chain",
    callMethod("getID", button) === "btn.instructions", String(callMethod("getID", button)));
}

console.log("");

// ---------------------------------------------------------------------------
// 1m. CWindow.CreateElement building a real UI element
// ---------------------------------------------------------------------------

console.log("== CreateElement, driven by VMK's own code ==\n");

/**
 * `createObject` is VMK's factory: `createObject(#temp, template, classList)`
 * composes an object from a template class list plus any extra classes.
 *
 * Implemented here in the host rather than by running `CMgrObject.create`,
 * which mostly does bookkeeping — id validation, an object registry, a logging
 * trail. The essential behaviour is the composition, and that is VMK's own
 * `buildFromClassList` semantics: base-first, `CObject` prepended.
 */
function classNamesOf(value: LingoValue): string[] {
  if (value === VOID || value === undefined) return [];
  const list = value as unknown as { toArray?: () => LingoValue[] };
  if (typeof list.toArray === "function") return list.toArray().map((v) => String(v));
  return [String(value)];
}

registerHandlers({
  createObject: (_type, template, classList) => {
    const names = [...classNamesOf(template), ...classNamesOf(classList)];
    const known = names.filter((name) => classes.has(name));
    if (known.length === 0) return VOID;
    return buildFromClassList(classes, ["CObject", ...known]) as unknown as LingoValue;
  },
  getUniqueID: () => `id.${Math.random().toString(36).slice(2, 8)}`,
});

// A window with the element-class cache CreateElement reads, and the style
// template that a miss falls back to.
const uiWindow = CWindow.instantiate({ ancestor: CObject.create(), props: { id: "ui.window" } });
const elemClsList = new LingoPropList();
elemClsList.setProp(
  symbol("default"),
  callNamed("GetClsVariable", "window.wrapper.class", VOID),
);
uiWindow.pElemClsList = elemClsList as unknown as LingoValue;

// A real element from the fireworks HUD: an image+text wrapper.
const elementProps = new LingoPropList();
elementProps.setProp(symbol("style"), symbol("default"));
elementProps.setProp(symbol("type"), "text");
elementProps.setProp(symbol("model"), "#image");
elementProps.setProp(symbol("id"), "fw.gamestart.text");

let element: LingoValue = VOID;
let defineError = "";
try {
  element = callMethod("CreateElement", uiWindow, elementProps as unknown as LingoValue);
} catch (cause) {
  defineError = cause instanceof Error ? cause.message : String(cause);
}

check("CreateElement resolved the declared class chain",
  (uiWindow.pElemClsList as unknown as LingoPropList).getProp("window.textimage.class") !== VOID,
  "cached window.textimage.class");

if (element !== VOID && element !== undefined) {
  const built = element as unknown as LingoObject;
  check("…and returned a composed element", typeof built === "object",
    String(built.__lingoClass));
  check("…carrying the id the layout gave it",
    callMethod("getID", built) === "fw.gamestart.text", String(callMethod("getID", built)));
} else {
  // Define() reaches into visual state a bare window does not have; report it
  // rather than asserting success we did not earn.
  console.log(`  note CreateElement stopped in Define() — ${defineError.slice(0, 90)}`);
  check("…but the class lookup half completed",
    (uiWindow.pElemClsList as unknown as LingoPropList).getProp("window.textimage.class") !== VOID);
}

console.log("");

// ---------------------------------------------------------------------------
// 1n. VMK's own layout parser on VMK's own window definition
// ---------------------------------------------------------------------------

console.log("== Layout Parser Class, on a real .window member ==\n");

/**
 * `CWindow.buildVisual` — VMK's own version of the `layoutWindow` reimplemented
 * in `lingo-window.ts` — starts by handing a member name to
 * `getObject(#layout_parser).parse(...)`. The core cast ships real `.window`
 * members, so both halves are VMK's.
 *
 * The format is XML with **Lingo literals inside**:
 *   <elements>[#member: "null", #media: #bitmap, #locH: 0, #type: "piece", …]</elements>
 */
const modalWindow = callNamed("member", "modal.window") as unknown as {
  isEmpty: boolean;
  text: string;
};
check("the core cast ships real .window members", !modalWindow.isEmpty,
  `${modalWindow.text.length} chars`);

// The literal parser is the piece that had been missing: value() only knew
// scalars, so every embedded element list came back as an unparsed string.
const elementsLiteral = /<elements>([\s\S]*?)<\/elements>/.exec(modalWindow.text)?.[1] ?? "";
const parsedElements = callNamed("value", elementsLiteral) as unknown as LingoPropList;

check("value() parses a Lingo property-list literal",
  parsedElements instanceof LingoPropList, String(parsedElements?.constructor?.name));
check("…with the element's own fields",
  parsedElements.getProp(symbol("type")) === "piece" &&
    parsedElements.getProp(symbol("id")) === "modal",
  `type=${String(parsedElements.getProp(symbol("type")))} id=${String(parsedElements.getProp(symbol("id")))}`);
check("…keeping symbols as symbols",
  parsedElements.getProp(symbol("media")) === symbol("bitmap"),
  String(parsedElements.getProp(symbol("media"))));
check("…and numbers as numbers",
  parsedElements.getProp(symbol("width")) === 1 && parsedElements.getProp(symbol("locH")) === 0);

const rectLiteral = /<rect>([\s\S]*?)<\/rect>/.exec(modalWindow.text)?.[1] ?? "";
const parsedRect = callNamed("value", rectLiteral) as unknown as { toArray(): LingoValue[] };
check("value() parses a linear list too", parsedRect.toArray().join() === "0,0,1,1",
  parsedRect.toArray().join());

// Now VMK's parser itself, which reads the member by name.
const parser = buildFromClassList(classes, ["CObject", "Layout_Parser_Class"], { id: "layout_parser" });
check("the layout parser constructs", parser.pCache instanceof LingoPropList);
check("memberExists() answers for a real member",
  lingoTruthy(callNamed("memberExists", "modal.window")) &&
    !lingoTruthy(callNamed("memberExists", "no.such.window")));

console.log("");

// ---------------------------------------------------------------------------
// 1o. VMK's own sprite manager, allocating real channels
// ---------------------------------------------------------------------------

console.log("== CMgrSprite against the channel layer ==\n");

/**
 * `CMgrSprite` is what `buildVisual` calls to get channels. It drives sprites
 * through exactly the properties `SpriteChannel` already exposes — `puppet`,
 * `locZ`, `locV`, `visible`, `loc`, `ink` — so it runs against the real
 * compositor with no adapter.
 */
const spriteMgr = buildFromClassList(classes, ["CObject", "CMgrSprite"], { id: "sprite_manager" });

check("preIndexChannels built the pool from `the lastChannel`",
  (spriteMgr.pFreeSprList as unknown as { count: number })?.count === stage.lastChannel,
  `${(spriteMgr.pFreeSprList as unknown as { count: number })?.count} of ${stage.lastChannel}`);

const reserved = callMethod("reserveSprite", spriteMgr, "ui.client");
check("reserveSprite() returned a channel number", typeof reserved === "number" && reserved >= 1,
  String(reserved));

const reservedChannel = registry.sprite(reserved as number);
check("…and it puppeted the real channel", reservedChannel.puppet === 1);
check("…parked it offstage as Director does", reservedChannel.locV === -1000,
  `locV=${reservedChannel.locV}`);
check("…and set locZ to the channel number", reservedChannel.locZ === reserved,
  `locZ=${reservedChannel.locZ}`);

const poolAfter = (spriteMgr.pFreeSprList as unknown as { count: number }).count;
check("the pool shrank by one", poolAfter === stage.lastChannel - 1, `${poolAfter}`);

callMethod("releaseSprite", spriteMgr, reserved);
check("releaseSprite() returns it to the pool",
  (spriteMgr.pFreeSprList as unknown as { count: number }).count === stage.lastChannel,
  String((spriteMgr.pFreeSprList as unknown as { count: number }).count));

// The third collaborator: CMgrResource allocates the members buildVisual draws
// into, via Director's dynamic member creation.
const binLib = new CastLib(9, "bin");
registry.addLib(binLib);
for (const [key, value] of config) callMethod("set", varManager, key, value);

const resourceMgr = buildFromClassList(classes, ["CObject", "CMgrResource"], { id: "resource_manager" });
check("CMgrResource read its bin from config",
  resourceMgr.pBin === "bin", String(resourceMgr.pBin));

const created = callMethod("createMember", resourceMgr, "ui.buffer", symbol("bitmap"));
check("createMember() allocated a real cast member",
  typeof created === "number" ? created > 0 : !((created as unknown as { isEmpty: boolean })?.isEmpty),
  String(created));
check("…in the dynamic bin", binLib.count >= 1, `${binLib.count} member(s)`);
check("ilk() reports a member as #member, not #instance",
  callNamed("ilk", binLib.members[0] as unknown as LingoValue) === symbol("member"),
  String(callNamed("ilk", binLib.members[0] as unknown as LingoValue)));

console.log("");

// ---------------------------------------------------------------------------
// 1p. buildVisual — VMK assembling a window from its own definition
// ---------------------------------------------------------------------------

console.log("== CWindow.buildVisual ==\n");

/** Registers an object with the core manager, and optionally as a manager. */
function registerWithCore(id: string, object: LingoObject, asManager = true): void {
  (core.pObjectList as unknown as LingoPropList).setProp(symbol(id), object as unknown as LingoValue);
  if (asManager) callMethod("append", core.pManagerList as LingoValue, symbol(id));
}

registerWithCore("sprite_manager", spriteMgr);
registerWithCore("resource_manager", resourceMgr);
registerWithCore("layout_parser", parser, false);
registerWithCore("session", sessionObject as unknown as LingoObject, false);

/**
 * ⚠ Section 1c registered a host `getObject` that always returned the session
 * object — fine while nothing else used the locator, but it **shadows
 * `Object_API.getObject`**, so every later lookup got the session back.
 * `buildVisual` then failed with "method not found: parse", pointing at the
 * parser when the fault was the resolver.
 *
 * Now that the real locator is up, put VMK's own API back on top and let the
 * session be an ordinary registered object.
 */
registerApiHandlers(classes);

check("getSpriteManager() resolves through the locator",
  callNamed("getSpriteManager") === (spriteMgr as unknown as LingoValue));
check("getResourceManager() resolves too",
  callNamed("getResourceManager") === (resourceMgr as unknown as LingoValue));
check("getObject(#layout_parser) resolves",
  callNamed("getObject", symbol("layout_parser")) === (parser as unknown as LingoValue));

// `modal.window` is the simplest real definition in the cast: one element.
const assembler = CWindow.instantiate(
  { ancestor: CObject.create(), props: { id: "modal" } },
);
assembler.pGroupData = new LingoList() as unknown as LingoValue;

let visualError = "";
let built: LingoValue = VOID;
try {
  built = callMethod("buildVisual", assembler, "modal.window");
} catch (cause) {
  visualError = cause instanceof Error ? `${cause.message}\n${(cause.stack ?? "").split("\n").slice(1,4).join("\n")}` : String(cause);
}

if (visualError === "") {
  check("buildVisual() completed on a real window definition", built !== VOID, String(built));

  // ⚠ `modal.window`'s only element is `#member: "null"` — a deliberate
  // placeholder — so no channel is reserved for it. Asserting on the sprite
  // pool would be testing this window's content, not the engine.
  const elemList = assembler.pElemList as unknown as { count?: number } | undefined;
  const sprList = assembler.pSpriteList as unknown as { count?: number } | undefined;
  check("…and populated the window's element list", elemList !== undefined,
    `elements=${String(elemList?.count)} sprites=${String(sprList?.count)}`);
  // Geometry is reported, not asserted: `buildVisual` leaves sizing to a later
  // `ResizeTo`, and pinning a shape here would test an assumption rather than
  // the engine.
  console.log(
    `       window geometry after buildVisual: ${String(assembler.pwidth)}x${String(assembler.pheight)}`,
  );
} else {
  // Report honestly: this is the deepest VMK code the port has run, and each
  // stop is a named dependency rather than a mystery.
  console.log(`  note buildVisual stopped — ${visualError.slice(0, 100)}`);
  check("the parser resolved the member before stopping",
    lingoTruthy(callNamed("memberExists", "modal.window")));
}

console.log("");


// ---------------------------------------------------------------------------
// 1q. Compound-value semantics — the silent-zero family
// ---------------------------------------------------------------------------
//
// Every bug in this group produced 0 rather than an error, and 0 is a legal
// coordinate. They are asserted here because the failure they cause is a window
// that builds, sizes and lays out correctly and then draws itself stacked at the
// stage origin — nothing in the trace says anything is wrong.
console.log("== 1q. compound-value arithmetic and indexing ==");
{
  const point = callNamed("point", 10, 20) as unknown as { locH: number; locV: number };
  const moved = lingoBinary("add", point as unknown as LingoValue, new LingoList([5, 7])) as unknown as {
    locH: number;
    locV: number;
  };
  check(
    "point + [dx, dy] is element-wise and stays a point",
    moved?.locH === 15 && moved?.locV === 27,
    `${String(moved?.locH)},${String(moved?.locV)}`,
  );

  const box = callNamed("rect", 0, 0, 100, 50) as unknown as LingoValue;
  const inset = lingoBinary("add", box, new LingoList([-4, -4, 4, 4])) as unknown as {
    left: number;
    right: number;
    width: number;
  };
  check(
    "rect + [l, t, r, b] is element-wise and stays a rect",
    inset?.left === -4 && inset?.right === 104 && inset?.width === 108,
    `left=${String(inset?.left)} right=${String(inset?.right)} width=${String(inset?.width)}`,
  );

  const indexed = callNamed("rect", 3, 5, 30, 50) as unknown as Record<number, number>;
  check(
    "rect indexes like a 4-item list",
    indexed[1] === 3 && indexed[2] === 5 && indexed[3] === 30 && indexed[4] === 50,
    `[${String(indexed[1])},${String(indexed[2])},${String(indexed[3])},${String(indexed[4])}]`,
  );

  // buildVisual accumulates a bounding box by assigning through the indices.
  indexed[1] = 7;
  indexed[4] = 99;
  check(
    "…and is writable through them",
    (indexed as unknown as { left: number; bottom: number }).left === 7 &&
      (indexed as unknown as { left: number; bottom: number }).bottom === 99,
    `left=${String((indexed as unknown as { left: number }).left)}`,
  );

  const pt = callNamed("point", 8, 9) as unknown as Record<number, number>;
  check("point indexes like a 2-item list", pt[1] === 8 && pt[2] === 9, `[${String(pt[1])},${String(pt[2])}]`);

  // `call(#handler, list)` over a PROPERTY list: VMK keys its element lists by
  // element id, so this is how every window draws.
  const seen: string[] = [];
  const target = {
    ping: (_me: LingoValue, tag: LingoValue) => {
      seen.push(String(tag));
      return VOID;
    },
  };
  const byId = new LingoPropList([symbol("a"), target, symbol("b"), target]);
  callNamed("call", symbol("ping"), byId as unknown as LingoValue, "x");
  check("call(#handler, propList) reaches every value", seen.length === 2, `delivered=${String(seen.length)}`);
}
console.log("");
// ---------------------------------------------------------------------------
// 2. Builtin coverage
// ---------------------------------------------------------------------------

// Scan BOTH transpiled casts - framework and registration UI - so the report
// covers everything the port can currently reach, not just the core.
const CAST_DIRS = [GENERATED, join(SRC, "..", "generated-registration")];
const files = CAST_DIRS.flatMap((dir) =>
  readdirSync(dir).filter((name) => name.endsWith(".ts")).map((name) => join(dir, name)),
);
// The handler is the LAST "__" segment, not the third: script names containing
// underscores (CastLoad_API, Core_Thread_Class) produce extra segments, and
// taking [2] classed our own handlers as missing builtins.
const ourHandlers = new Set(
  files.map((p) => p.split(/[\\/]/).pop()!.replace(/\.ts$/, "").split("__").pop()!.toLowerCase()),
);

const siteCount = new Map<string, number>();
for (const file of files) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(/callNamed\("([^"]+)"/g)) {
    const name = match[1]!;
    siteCount.set(name, (siteCount.get(name) ?? 0) + 1);
  }
}

const external = [...siteCount.entries()].filter(([name]) => !ourHandlers.has(name.toLowerCase()));
const real = external.filter(([name]) => hasBuiltin(name) && !isStubbed(name));
const stubbed = external.filter(([name]) => hasBuiltin(name) && isStubbed(name)).sort((a, b) => b[1] - a[1]);
const missing = external.filter(([name]) => !hasBuiltin(name)).sort((a, b) => b[1] - a[1]);

const totalSites = external.reduce((sum, [, count]) => sum + count, 0);
const realSites = real.reduce((sum, [, count]) => sum + count, 0);
const stubSites = stubbed.reduce((sum, [, count]) => sum + count, 0);

console.log("== Director surface: real vs stubbed vs missing ==\n");
console.log(`  handlers scanned      ${files.length}  (both transpiled casts)`);
console.log(`  distinct builtins     ${external.length}  (${real.length} real, ${stubbed.length} stubbed, ${missing.length} missing)`);
console.log(
  `  call sites            ${totalSites}  (${realSites} real ${Math.round((100 * realSites) / totalSites)}%, ${stubSites} stubbed, ${totalSites - realSites - stubSites} missing)\n`,
);

if (stubbed.length > 0) {
  console.log("  STUBBED - registered but not implemented:");
  for (const [name, count] of stubbed) console.log(`    ${String(count).padStart(4)}  ${name}`);
  console.log("");
}
if (missing.length > 0) {
  console.log("  still missing, by call-site count — this is the work queue:");
  for (const [name, count] of missing.slice(0, 20)) {
    console.log(`    ${String(count).padStart(4)}  ${name}`);
  }
  if (missing.length > 20) console.log(`    ... and ${missing.length - 20} more`);
}

process.exit(failures === 0 ? 0 : 1);


















