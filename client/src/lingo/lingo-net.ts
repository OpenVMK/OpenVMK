/**
 * Network layer — the last subsystem the transpiled framework cast needs.
 *
 * Two unrelated mechanisms, both reached from the same cast:
 *
 *   1. The **Multiuser Xtra** — VMK's game socket. `CConnection` builds it with
 *      `new(xtra("Multiuser"))` and drives it through six methods. This is the
 *      path `CConnection.send` feeds, so wiring it to our own MUS server makes
 *      transpiled Lingo talk to `server/src/mus-server.ts`.
 *
 *   2. **netLingo** — id-based async HTTP (`getNetText`, `preloadNetThing`,
 *      `netDone`, `netTextResult`, `getStreamStatus`). Used by `CDownload` and
 *      `CCastLoadInstance` to fetch variables, texts and casts.
 *
 * Both interfaces were read off the generated handlers rather than Director
 * docs — see the call sites quoted at each method.
 */
import {
  callMethod,
  LingoFloat,
  LingoList,
  LingoPropList,
  registerBuiltins,
  symbol,
  VOID,
  type LingoValue,
} from "./lingo-runtime.js";
// `lingo-builtins` imports only `lingo-runtime`, so this direction is safe.
import { LingoImage } from "./lingo-builtins.js";
import { LingoMedia } from "./lingo-photo.js";

/**
 * A Lingo value on the photo socket (MUS mode, see `MultiuserXtra`). The real
 * Multiuser Xtra serialises values in Macromedia's binary format; we own both
 * ends, so this is JSON: `s` string, `n` number, `y` symbol, `l` list,
 * `p` property list, `m` media (a photo's palette indices, base64), `v` VOID.
 */
type WireValue =
  | { t: "s"; v: string }
  | { t: "n"; v: number }
  | { t: "y"; v: string }
  | { t: "l"; v: WireValue[] }
  | { t: "p"; v: Array<[WireValue, WireValue]> }
  | { t: "m"; w: number; h: number; d: string }
  | { t: "v" };

function toBase64(bytes: Uint8Array): string {
  let text = "";
  for (let i = 0; i < bytes.length; i += 0x8000) text += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(text);
}

function fromBase64(text: string): Uint8Array {
  const raw = atob(text);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export function encodeWireValue(value: LingoValue): WireValue {
  if (value === VOID || value === null) return { t: "v" };
  if (value instanceof LingoMedia) return { t: "m", w: value.width, h: value.height, d: toBase64(value.indices) };
  if (value instanceof LingoFloat) return { t: "n", v: value.value };
  if (typeof value === "number") return { t: "n", v: value };
  if (typeof value === "string") return value.startsWith("#") ? { t: "y", v: value.slice(1) } : { t: "s", v: value };
  if (value instanceof LingoPropList) {
    const pairs: Array<[WireValue, WireValue]> = [];
    for (let i = 1; i <= value.count; i++) pairs.push([encodeWireValue(value.getPropAt(i)), encodeWireValue(value.getAt(i))]);
    return { t: "p", v: pairs };
  }
  if (value instanceof LingoList) {
    const items: WireValue[] = [];
    for (let i = 1; i <= value.count; i++) items.push(encodeWireValue(value.getAt(i)));
    return { t: "l", v: items };
  }
  return { t: "s", v: String(value) };
}

export function decodeWireValue(wire: WireValue): LingoValue {
  switch (wire.t) {
    case "s":
      return wire.v;
    case "n":
      return wire.v;
    case "y":
      return symbol(wire.v);
    case "l":
      return new LingoList(wire.v.map(decodeWireValue)) as unknown as LingoValue;
    case "p": {
      const list = new LingoPropList();
      for (const [k, v] of wire.v) list.setProp(decodeWireValue(k), decodeWireValue(v));
      return list as unknown as LingoValue;
    }
    case "m":
      return new LingoMedia(wire.w, wire.h, fromBase64(wire.d)) as unknown as LingoValue;
    default:
      return VOID;
  }
}

// ---------------------------------------------------------------------------
// Multiuser Xtra
// ---------------------------------------------------------------------------

/** Injected so Node tests and the browser can share this file. */
export type SocketFactory = (url: string) => {
  send(data: string | ArrayBufferLike): void;
  close(): void;
  onmessage: ((event: { data: unknown }) => void) | null;
  onopen: (() => void) | null;
  onclose: (() => void) | null;
  onerror: ((error: unknown) => void) | null;
};

/**
 * Director's Multiuser Xtra instance.
 *
 * Every method takes the receiver as its first argument, because `callMethod`
 * passes `me` the way transpiled Lingo expects:
 *   `callMethod("sendNetMessage", meProp(_me, "pXtra"), 0, 0, tMsg)`
 */
export class MultiuserXtra {
  private socket: ReturnType<SocketFactory> | null = null;
  private handlerName = "";
  private handlerTarget: LingoValue = VOID;
  private readonly inbox: LingoPropList[] = [];
  private connected = false;
  /**
   * MUS mode: `connectToNetServer(..., mode 0)`. The game connection uses mode 1
   * (raw text: VMK packs its own messages), but the photo transfer
   * (`Multiuser_Instance_Class`, cast 0e4fee) uses the Xtra's own messages: a
   * SUBJECT plus a CONTENT that may be a property list carrying `media`. Those
   * travel as JSON on `/photo` (see `WireValue`) to the game server's photo
   * handler.
   */
  private structured = false;

  constructor(
    private readonly openSocket: SocketFactory,
    private readonly urlFor: (host: string, port: number) => string,
    /**
     * Every MUS frame, in and out, before VMK sees it.
     *
     * ⚠ This is the ONE place the whole protocol funnels through, which is why
     * the trace belongs here and not in a probe. The login handshake is a
     * SEQUENCE — `2001 connectionReady` -> client declines encryption ->
     * `2002 _Hello` -> `login` — and a broken login is a sequence that stopped,
     * not a value that is wrong. Sampling the client at an arbitrary instant
     * cannot tell those apart, and repeatedly trying to has been the single
     * biggest waste of effort on this port.
     */
    private readonly onProtocol?: (direction: "in" | "out", content: string) => void,
  ) {}

  /** `setNetBufferLimits(pXtra, 16*1024, 100*1024, 100)` — advisory only here. */
  setNetBufferLimits(_me: unknown, _min: LingoValue, _max: LingoValue, _count: LingoValue): LingoValue {
    return 0;
  }

  /** `setNetMessageHandler(pXtra, #xtraMsgHandler, _me)`; VOID args clear it. */
  setNetMessageHandler(_me: unknown, handler: LingoValue, target: LingoValue): LingoValue {
    this.handlerName = handler === VOID ? "" : String(handler).replace(/^#/, "");
    this.handlerTarget = target;
    return 0;
  }

  /**
   * `connectToNetServer(pXtra, "*", "*", pHost, pPort, "*", 1)`.
   * Returns 0 on success — the caller treats non-zero as a connect failure.
   */
  connectToNetServer(
    _me: unknown,
    _user: LingoValue,
    _password: LingoValue,
    host: LingoValue,
    port: LingoValue,
    _movie: LingoValue,
    mode: LingoValue,
  ): LingoValue {
    this.structured = Number(mode) === 0 && mode !== VOID;
    try {
      const base = this.urlFor(String(host), Number(port) || 0);
      this.socket = this.openSocket(this.structured ? `${base.replace(/\/$/, "")}/photo` : base);
    } catch {
      return 4155; // Director's "connection failed"
    }

    this.socket.onopen = () => {
      this.connected = true;
      // ⚠ MUS mode needs a message on connect: `Multiuser_Instance_Class`
      // only marks itself ready (`pConnectionOk = 1`) when one ARRIVES, and the
      // binary manager polls that before it will send anything. `HELLO` is a
      // subject it already listens for (and ignores).
      this.deliver(this.structured ? this.message(0, "HELLO", "") : this.message(0, "connectToNetServer", ""));
    };
    this.socket.onmessage = (event) => {
      const content = this.decode(event.data);
      this.onProtocol?.("in", this.structured ? content.slice(0, 200) : content);
      if (this.structured) {
        try {
          const frame = JSON.parse(content) as { subject?: string; errorCode?: number; content: WireValue };
          this.deliver(this.message(frame.errorCode ?? 0, frame.subject ?? "", decodeWireValue(frame.content)));
        } catch {
          /* not a frame we understand — drop it rather than hand VMK garbage */
        }
        return;
      }
      this.deliver(this.message(0, "", content));
    };
    this.socket.onclose = () => {
      this.connected = false;
      this.deliver(this.message(4165, "", ""));
    };
    this.socket.onerror = () => {
      this.deliver(this.message(4155, "connectToNetServer", ""));
    };
    return 0;
  }

  /**
   * `sendNetMessage(pXtra, 0, 0, tMsg)` — subject and recipient are unused by VMK.
   *
   * ⚠ Sent as BYTES, not as a string. VMK packs a message into a Lingo string
   * whose characters are byte values 0–255; handing that to `socket.send` as a
   * string transmits a TEXT frame encoded as UTF-8, which silently re-encodes
   * every character above 127 into two bytes. Lengths and opcodes then disagree
   * with what the server reads, and the corruption is invisible on this side.
   */
  sendNetMessage(_me: unknown, _recipient: LingoValue, subject: LingoValue, content: LingoValue): LingoValue {
    if (!this.socket || !this.connected) return 4155;
    if (this.structured) {
      const frame = JSON.stringify({ subject: String(subject ?? ""), content: encodeWireValue(content) });
      this.onProtocol?.("out", frame.slice(0, 200));
      this.socket.send(frame);
      return 0;
    }
    const text = String(content);
    this.onProtocol?.("out", text);
    const bytes = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) bytes[i] = text.charCodeAt(i) & 0xff;
    this.socket.send(bytes.buffer);
    return 0;
  }

  /**
   * `getNetErrorString(pXtra, code)` — the Multiuser Xtra's human-readable
   * text for an error code.
   *
   * ⚠ Load-bearing for the UI, not a debugging nicety. `CConnection.xtraMsgHandler`
   * builds its dialog like this:
   *
   *     t = createDialogWindow(…, "ErrorInConnection", 1, 1)
   *     show(t)
   *     t_sText = getNetErrorString(pXtra, tErrCode) & RETURN & RETURN & \
   *               "Connection was disconnected."
   *     setText(t, t_sText, "Connection Error Message", "OK")
   *
   * The window is SHOWN first and its text set afterwards, so a missing method
   * here threw between the two: the dialog appeared, correctly built and
   * correctly drawn, with every string empty. It looked like broken text
   * rendering and was a missing builtin one call earlier.
   *
   * Only the codes this port actually produces are named. Anything else is
   * reported as its number rather than invented — a wrong-but-plausible
   * message would be worse than an honest one, because it would send the next
   * reader after the wrong fault.
   */
  getNetErrorString(_me: unknown, code: LingoValue): LingoValue {
    const value = Number(code) || 0;
    switch (value) {
      case 0:
        return "";
      case 4155:
        return "Could not connect to the server.";
      case 4165:
        return "The connection to the server was closed.";
      default:
        return `Network error ${String(value)}.`;
    }
  }

  getNumberWaitingNetMessages(_me: unknown): LingoValue {
    return this.inbox.length;
  }

  /**
   * `checkNetMessages(pXtra, 1)` drains up to `count` queued messages, invoking
   * the registered handler for each. The handler then calls `getNetMessage`,
   * so the current message has to stay at the head until it is taken.
   */
  checkNetMessages(_me: unknown, count: LingoValue): LingoValue {
    const limit = Math.max(1, Number(count) || 1);
    let handled = 0;
    while (handled < limit && this.inbox.length > 0) {
      this.invokeHandler();
      handled++;
    }
    return handled;
  }

  getNetMessage(_me: unknown): LingoValue {
    return this.inbox.shift() ?? this.message(0, "", "");
  }

  private message(errorCode: number, subject: string, content: LingoValue): LingoPropList {
    const list = new LingoPropList();
    list.setProp(symbol("errorCode"), errorCode);
    list.setProp(symbol("senderID"), "");
    list.setProp(symbol("subject"), subject);
    list.setProp(symbol("content"), content);
    return list;
  }

  private decode(data: unknown): string {
    if (typeof data === "string") return data;
    if (data instanceof ArrayBuffer) return String.fromCharCode(...new Uint8Array(data));
    return String(data);
  }

  private deliver(message: LingoPropList): void {
    this.inbox.push(message);
    // Director calls the handler as messages arrive; CConnection also polls via
    // processWaitingMessages, so pushing AND notifying matches both paths.
    if (this.handlerName !== "" && this.handlerTarget !== VOID) {
      this.invokeHandler();
    }
  }

  private invokeHandler(): void {
    if (this.handlerName === "" || this.handlerTarget === VOID) return;
    if (this.inbox.length === 0) return;
    callMethod(this.handlerName, this.handlerTarget);
  }
}

// ---------------------------------------------------------------------------
// netLingo
// ---------------------------------------------------------------------------

interface NetOperation {
  url: string;
  done: boolean;
  error: string;
  text: string;
  bytesSoFar: number;
  bytesTotal: number;
}

/**
 * Fetches a URL as text, reporting progress as it goes.
 *
 * `report` is optional for the caller to USE but always supplied, so a host can
 * ignore it (a Node test) without the download appearing stalled.
 */
export type FetchText = (
  url: string,
  report?: (bytesSoFar: number, bytesTotal: number) => void,
) => Promise<string>;

export class NetLingo {
  private readonly operations = new Map<number, NetOperation>();
  private nextId = 1;

  constructor(private readonly fetchText: FetchText) {}

  start(url: string): number {
    const id = this.nextId++;
    const operation: NetOperation = {
      url,
      done: false,
      error: "",
      text: "",
      bytesSoFar: 0,
      bytesTotal: 0,
    };
    this.operations.set(id, operation);

    /**
     * ⚠ Progress has to arrive DURING the download, not only at the end.
     *
     * `CCastLoadInstance.update` reads `getStreamStatus(...).bytesSoFar` every
     * frame and only calls `TellStreamState` when it is above zero — that is
     * the sole feed for `UpdateTaskPercent` -> `getLoadPercent` -> the loading
     * bar. Reporting 0 until the fetch resolved and then the whole size meant
     * the call never happened at all: the bar had nothing to animate and sat at
     * its background colour for the entire load.
     */
    this.fetchText(url, (soFar, total) => {
      operation.bytesSoFar = soFar;
      operation.bytesTotal = total;
    }).then(
      (text) => {
        operation.text = text;
        operation.bytesSoFar = text.length;
        operation.bytesTotal = text.length;
        operation.error = "OK";
        operation.done = true;
      },
      (cause: unknown) => {
        operation.error = cause instanceof Error ? cause.message : String(cause);
        operation.done = true;
      },
    );
    return id;
  }

  /** `netDone(id)` — 1 once the operation has settled, success or failure. */
  done(id: LingoValue): number {
    return this.operations.get(Number(id))?.done ? 1 : 0;
  }

  /**
   * `netError(id)` — the literal string "OK" on success. `CDownload.update`
   * does `if netError(pNetId) = "OK"`, so any other value reads as a failure.
   * An operation still in flight reports "" rather than "OK".
   */
  error(id: LingoValue): LingoValue {
    const operation = this.operations.get(Number(id));
    if (!operation) return "Net ID not found";
    return operation.done ? operation.error : "";
  }

  text(id: LingoValue): LingoValue {
    return this.operations.get(Number(id))?.text ?? "";
  }

  /** `getStreamStatus(id)` — a prop list read with `status[#bytesSoFar]`. */
  status(id: LingoValue): LingoValue {
    const operation = this.operations.get(Number(id));
    if (!operation) return VOID;
    const list = new LingoPropList();
    list.setProp(symbol("URL"), operation.url);
    list.setProp(symbol("state"), operation.done ? "Complete" : "InProgress");
    list.setProp(symbol("bytesSoFar"), operation.bytesSoFar);
    list.setProp(symbol("bytesTotal"), operation.bytesTotal);
    list.setProp(symbol("error"), operation.done ? operation.error : "");
    return list;
  }

  abort(id: LingoValue): LingoValue {
    this.operations.delete(Number(id));
    return VOID;
  }
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

export interface NetHost {
  socketFactory: SocketFactory;
  /** Every MUS frame, in and out — see `MultiuserXtra`'s constructor. */
  onProtocol?: (direction: "in" | "out", content: string) => void;
  /** Maps VMK's host/port to a transport URL — a WebSocket bridge in the browser. */
  urlFor?: (host: string, port: number) => string;
  fetchText: FetchText;
  /** Called for `gotoNetPage`. Defaults to a log, never a real navigation. */
  navigate?: (url: string) => void;
  /**
   * Shockwave's embed parameters, `sw1`…`sw9`.
   *
   * The client's whole bootstrap hangs off these: `Core Thread Class.updateState`
   * reads `sw5` to find `external.variables.txt`, and the server already emits
   * the full `sw1`-`sw7` set. Returning VOID for every name — which is what the
   * stub did — makes `load_variables` fetch an empty URL and the boot stalls
   * before it has loaded a single variable.
   */
  externalParam?: (name: string) => string | undefined;
}

export function registerNetBuiltins(host: NetHost): { net: NetLingo } {
  const net = new NetLingo(host.fetchText);
  // The server hands /play the game socket's PUBLIC address as
  // `window.__VMK_GAME_URL` (server/src/public-url.ts) — a host:port pair from
  // the config cannot express `wss://vmk.example.com/game` behind a proxy.
  // Without it, the config's host/port, over wss when the page itself is https
  // (browsers refuse a plain ws:// socket from an https page).
  const injected = (globalThis as { __VMK_GAME_URL?: unknown }).__VMK_GAME_URL;
  const secure = (globalThis as { location?: { protocol?: string } }).location?.protocol === "https:";
  const urlFor =
    host.urlFor ??
    ((h, p) => (typeof injected === "string" && injected ? injected : `${secure ? "wss" : "ws"}://${h}:${p}`));

  registerBuiltins({
    xtra: (name) =>
      String(name).toLowerCase() === "multiuser"
        ? ({
            // `new(xtra("Multiuser"))` — our `new` builtin calls `create`.
            create: () =>
              new MultiuserXtra(host.socketFactory, urlFor, host.onProtocol) as unknown as LingoValue,
          } as unknown as LingoValue)
        : VOID,

    getNetText: (url) => net.start(String(url)),
    preloadNetThing: (url) => net.start(String(url)),
    netDone: (id) => net.done(id),
    netError: (id) => net.error(id),
    netTextResult: (id) => net.text(id),
    getStreamStatus: (id) => net.status(id),
    netAbort: (id) => net.abort(id),
    gotoNetPage: (url) => {
      if (host.navigate) host.navigate(String(url));
      else console.log("[lingo gotoNetPage]", String(url));
      return VOID;
    },

  });

  /**
   * `importFileInto(member, url, [params])` — Director's "load this file into
   * that cast member", and the ONLY way downloaded art becomes a picture.
   *
   * ⚠ This is the front of the loading screen. `CDownload.importFileToCast`
   * routes every non-text download through it, and
   * `CCustomLoadingScreen.FeedImageSlot` then does
   * `feedImage(slot, getMember(conf.img).image)`. While it was a stub returning
   * VOID the JPEGs downloaded fine (`image_98_0.jpg`, 114 KB) and then went
   * nowhere, so every image slot on the loading screen fed a VOID and drew
   * blank — the VMK logo among them.
   *
   * The member's image is installed SYNCHRONOUSLY, empty, and its pixels land
   * later: `feedImage` type-checks with `ilk(...) = #image` and must see an
   * image object right now, while `copyPixels` replays itself when the art
   * arrives (see `LingoImage.whenSourceReady`).
   */
  registerBuiltins({
    importFileInto: (member, url) => {
      if (member === VOID || member === null || typeof member !== "object") return VOID;
      const target = member as { image?: LingoValue; rect?: LingoValue };
      const placeholder = new LingoImage(1, 1, 32);
      target.image = placeholder as unknown as LingoValue;
      /**
       * ⚠ RESIZE WHAT THE MEMBER ACTUALLY HOLDS, NOT THE PLACEHOLDER.
       *
       * `CastMember.set image` stores `value.duplicate()` — Director copies an
       * assigned image rather than aliasing it — so the member ends up holding
       * a COPY and the placeholder is orphaned the moment it is assigned. The
       * copy reads pixels through `copiedFrom`, so the art shows up as present,
       * but the size assigned to the placeholder afterwards never reaches it.
       *
       * MEASURED on the boot loading screen: `image_98_0.jpg` decoded at its
       * true 800x600 (`source.width` was right) while the member reported 1x1,
       * so the full-screen "thanks for playing" artwork was drawn as a single
       * pixel. Nothing errored — the member had art, it was just one pixel of
       * it.
       */
      const installed = target.image;
      const held = installed instanceof LingoImage ? installed : placeholder;
      void (async () => {
        try {
          const response = await fetch(String(url));
          if (!response.ok) throw new Error(`HTTP ${String(response.status)}`);
          const bitmap = await createImageBitmap(await response.blob());
          /**
           * Director's `importFileInto` adopts the imported file's dimensions,
           * and VMK relies on that — nothing tells it the size separately, the
           * way an extracted cast's `bitmaps.tsv` does.
           *
           * Both images are sized: `held` is what the member answers with, and
           * `placeholder` stays consistent because anything that duplicated it
           * before the fetch resolved reads its size.
           */
          for (const image of new Set([held, placeholder])) {
            image.width = bitmap.width;
            image.height = bitmap.height;
          }
          // The member's own rect is what VMK measures for layout.
          const rect = target.rect as { right?: number; bottom?: number } | undefined;
          if (rect && typeof rect.right === "number" && rect.right === 0) {
            rect.right = bitmap.width;
            rect.bottom = bitmap.height;
          }
          // Assigning `source` is what replays any copy that waited on it.
          for (const image of new Set([held, placeholder])) image.source = bitmap;
        } catch {
          // Director leaves the member empty when an import fails, and the
          // element simply draws nothing.
        }
      })();
      return VOID;
    },
  });

  /**
   * ⚠ `createDialogWindow` is NOT a Director builtin — it is VMK's own handler,
   * on `CDialogWindow`, forwarding to the `#dialogwindow` thread's component.
   *
   * It used to be stubbed here, and a stub goes into `builtins`, which
   * `callNamed` consults BEFORE the cast's own handlers. So the stub shadowed
   * the real implementation at all 29 call sites and every dialog in the game
   * returned VOID — the connection-failure dialog, the dictionary error, the
   * moderation prompts. Nothing was missing; it was being intercepted.
   *
   * Registering nothing here lets `GLOBAL_WRAPPER_SCRIPTS` in `boot-client.ts`
   * put VMK's own version in place.
   */

  // Real when the host supplies the embed parameters, stubbed when it cannot —
  // tracked separately so the coverage report never claims the bootstrap works
  // on a host that has no `sw1`…`sw9` to give.
  if (host.externalParam) {
    const lookup = host.externalParam;
    registerBuiltins({
      externalParamValue: (name) => lookup(String(name)) ?? VOID,
    });
  } else {
    registerBuiltins({ externalParamValue: () => VOID }, { stub: true });
  }

  return { net };
}
