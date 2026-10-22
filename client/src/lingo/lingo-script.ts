/**
 * Turns transpiled handler modules into live Lingo script instances.
 *
 * Each generated file exports one handler as a free function whose first
 * parameter is the receiver:
 *
 *   export function _set(_me, _this, a_sKey, a_vValue) { … }
 *
 * `callMethod` already injects the receiver, so binding a module's exports onto
 * a plain object is enough to make `callMethod("set", obj, k, v)` run VMK's
 * actual code. This module handles the two things that are not that simple:
 * the emitter's name mangling, and Director's `construct` convention.
 */
import {
  callMethod,
  LINGO_NATIVE,
  LingoList,
  LingoPropList,
  registerHandlers,
  setMeProp,
  VOID,
  LINGO_HANDLER_KEYS,
  type LingoObject,
  type LingoValue,
} from "./lingo-runtime.js";
import { setScriptClassResolver } from "./lingo-cast.js";
import { parseValue } from "./lingo-builtins.js";

/** A generated module: handler name → function. */
export type HandlerModule = Record<string, unknown>;

/**
 * The emitter prefixes JS reserved words with `_`, so Lingo's `set` becomes
 * `_set` and `get` becomes `_get`. Strip a single leading underscore when the
 * rest is a plausible handler name, so Lingo call sites keep working.
 *
 * ⚠ Only strip for reserved words. `_me`/`_this` are parameters, never exports,
 * but a blanket strip would also rename a genuine handler beginning with "_".
 */
const RESERVED = new Set([
  "set", "get", "new", "delete", "in", "class", "this", "return", "case",
  "default", "void", "with", "do", "if", "for", "function", "var", "let",
  "const", "switch", "try", "catch", "throw", "typeof", "instanceof",
]);

export function handlerName(exportName: string): string {
  if (!exportName.startsWith("_")) return exportName;
  const stripped = exportName.slice(1);
  return RESERVED.has(stripped.toLowerCase()) ? stripped : exportName;
}

type HandlerFn = (...args: LingoValue[]) => LingoValue;

/**
 * Director passes the receiver to a handler's **declared** first parameter:
 * `on open this` called as `obj.open()` gives `this = obj`. The emitter also
 * injects its own `_me`, so such a handler transpiles to `open(_me, _this)` and
 * needs the receiver **twice** — while a handler that declared no receiver
 * (`on send me, tCmd`) transpiles to `send(_me, tCmd)` and needs it once.
 *
 * Callers cannot be expected to know which shape they are invoking, and VMK's
 * own code certainly does not: `CWindow.construct` calls
 * `callMethod("createProcListTemplate", _me)` with no extra argument, and that
 * handler declares `this` — so it received `undefined` and every downstream
 * call on it failed with "method call on VOID".
 *
 * Detect the shape from the emitter's own parameter naming and fill the gap.
 */
/**
 * The property names a class declares, recovered from its handlers' source.
 *
 * Lingo can only assign to a DECLARED property, so every name the class writes
 * through `setMeProp(_me, "x", …)` is one it declared — which is precisely the
 * set that must exist as own VOID slots on a new instance so it shadows any
 * ancestor. See the call site in `instantiate`.
 *
 * ⚠ Reads are deliberately NOT collected. `meProp(_me, "x")` on a name the class
 * never writes is exactly the inherited-property case that ancestors exist to
 * serve; declaring it would shadow the ancestor's value with VOID and break it.
 *
 * Cached per handler table: this parses source text and runs once per class.
 */
const declaredCache = new WeakMap<ReadonlyMap<string, HandlerFn>, string[]>();

/** Where `bindReceiver` parks the handler it wrapped, so its source stays readable. */
const ORIGINAL = Symbol("lingo.originalHandler");

function declaredProperties(handlers: ReadonlyMap<string, HandlerFn>): string[] {
  const cached = declaredCache.get(handlers);
  if (cached) return cached;

  const names = new Set<string>();
  for (const wrapped of handlers.values()) {
    // Unwrap first — see `bindReceiver`.
    const fn = (wrapped as HandlerFn & { [ORIGINAL]?: HandlerFn })[ORIGINAL] ?? wrapped;
    let source: string;
    try {
      source = fn.toString();
    } catch {
      continue;
    }
    const writes = /\bsetMeProp\(\s*_me\s*,\s*"([^"]+)"/g;
    let match: RegExpExecArray | null;
    while ((match = writes.exec(source)) !== null) {
      const name = match[1];
      // `ancestor` has its own accessor pair; overwriting it with a plain VOID
      // slot would drop the prototype wiring it performs.
      if (name && name !== "ancestor" && name !== "#ancestor") names.add(name);
    }
  }

  const list = [...names];
  declaredCache.set(handlers, list);
  return list;
}

function bindReceiver(fn: HandlerFn): HandlerFn {
  const params = /^[^(]*\(([^)]*)\)/.exec(fn.toString())?.[1] ?? "";
  const declaresThis = params
    .split(",")
    .map((part) => part.trim().split(/[:=\s]/)[0])
    .at(1) === "_this";

  if (!declaresThis) return fn;
  const wrapper = (me: LingoValue, ...rest: LingoValue[]) => fn(me, me, ...rest);
  // ⚠ Keep the wrapped handler reachable. `declaredProperties` reads handler
  // SOURCE to recover a class's `property` declarations, and a wrapper's source
  // is `(me, ...rest) => fn(me, me, ...rest)` — none of the original body. Every
  // receiver-taking handler is wrapped, which is most of them, so without this
  // the declaration list comes back empty and nothing shadows the ancestor.
  (wrapper as HandlerFn & { [ORIGINAL]?: HandlerFn })[ORIGINAL] = fn;
  return wrapper;
}

export interface LingoClass {
  readonly name: string;
  readonly handlers: Map<string, (...args: LingoValue[]) => LingoValue>;
  /** Creates an instance and runs `construct` if the class defines one. */
  create(...args: LingoValue[]): LingoObject;
  /**
   * Creates an instance with an explicit ancestor and/or preset properties,
   * the way `CMgrObject.create` does at runtime.
   *
   * Needed because several classes call inherited methods *inside* `construct`
   * — `CWindow.construct` starts with `getID(this)`, which lives on `CObject` —
   * so the ancestor has to exist before construct runs, not after.
   */
  instantiate(options: InstanceOptions, ...args: LingoValue[]): LingoObject;
  /**
   * Creates an instance and does NOT run `construct` — Director's `rawNew`.
   *
   * ⚠ Load-bearing. `CMgrObject.create` allocates every class in a chain, links
   * them with `#ancestor`, and constructs afterwards. Constructing at allocation
   * time means each `construct` runs before its ancestors are attached, so an
   * inherited call inside it fails — `CMgrWindow.construct` calls `setProperty`,
   * which lives on `TManager`, and died with the chain still one link long.
   */
  allocate(): LingoObject;
}

export interface InstanceOptions {
  ancestor?: LingoObject;
  /** Properties set before `construct`, e.g. the `id` that `getID` returns. */
  props?: Record<string, LingoValue>;
  /** `false` allocates only — see `LingoClass.allocate`. */
  construct?: boolean;
}

/**
 * Builds a class from generated modules.
 *
 * `modules` is a list of `{ exports }` — one per generated file — so a caller
 * can gather them however it likes: `import.meta.glob` in the browser, explicit
 * imports in a test.
 */
/** Stand-in for a Director instance address — see `_string` below. */
let nextInstanceAddress = 0x1000;

export function defineLingoClass(name: string, modules: HandlerModule[]): LingoClass {
  const handlers = new Map<string, (...args: LingoValue[]) => LingoValue>();

  /** What `the script of <instance>` answers with; see the accessor below. */
  const scriptRef: LingoObject = {
    __lingoScript: name,
    rawNew: () => defined.allocate() as unknown as LingoValue,
    new: (...args: LingoValue[]) => {
      const instance = defined.allocate();
      if (typeof instance.new === "function") callMethod("new", instance, ...args);
      return instance as unknown as LingoValue;
    },
  };
  (scriptRef as Record<symbol, unknown>)[LINGO_NATIVE] = true;

  for (const module of modules) {
    for (const [exportName, value] of Object.entries(module)) {
      if (typeof value !== "function") continue;
      handlers.set(handlerName(exportName), bindReceiver(value as HandlerFn));
    }
  }

  /** Shared by every instance of this class — see `LINGO_HANDLER_KEYS`. */
  let handlerKeys: Map<string, string> | null = null;
  const build = (options: InstanceOptions, args: LingoValue[]): LingoObject => {
    const instance: LingoObject = { __lingoClass: name };
    /**
     * Director's `the string of` a script instance: `<offspring "Class" 2 3ab4>`.
     *
     * ⚠ Not cosmetic — VMK PARSES it to recover an object's class at runtime.
     * `CVMKAnimationManager.RemoveAnimation` does `t_rAnimation._string.word[2]`
     * and switches on the result to decide how to dispose of the animation, so
     * without this the loading window could not be torn down.
     *
     * Non-enumerable so it cannot be mistaken for a Lingo property by anything
     * that walks the instance (`setaProp` slots, the object manager's dumps).
     */
    // The trailing hex is the instance's address in Director — unique per
    // instance, and VMK builds per-instance names from it (`"HighlighterFor" &
    // this`), so a constant here made every such name collide.
    const address = (nextInstanceAddress++).toString(16);
    Object.defineProperty(instance, "_string", {
      get: () => `<offspring "${name}" 2 ${address}>`,
      enumerable: false,
      configurable: true,
    });
      for (const [handler, fn] of handlers) {
        instance[handler] = fn;
      }

      /**
       * ⚠ A CLASS'S OWN PROPERTIES MUST SHADOW ITS ANCESTOR'S, as VOID.
       *
       * Director gives every `property x` declaration an OWN slot on the
       * instance, initialised to VOID, so a lookup finds the instance's own
       * (empty) slot rather than an ancestor's value. Without that, linking the
       * ancestor as a prototype makes every inherited value visible where
       * Director would have shown VOID.
       *
       * `CObject` declares `property id` and `CObject.setID` is guarded by it:
       *
       *     if voidp(me.id) then me.id = a_sID
       *     else error("Attempted to redefine object's ID: …")
       *
       * `CMgrThread.buildThreadObj` builds a FRESH base object per module and
       * points it at the thread, which already has an id — so every module read
       * the thread's id, took the else branch, and failed to get an id of its
       * own. MEASURED: 201 errors and no login at all, every one of the shape
       * "Attempted to redefine object's ID: main -> main_interface".
       *
       * The declaration list is recovered from the handlers' own source: Lingo
       * can only assign to a DECLARED property, so the set of names the class
       * writes through `setMeProp` is exactly what it declared. Cached per class
       * — this parses source text, which is also why `vite.config.ts` keeps
       * `minify: false` (see `bindReceiver`).
       */
      for (const name of declaredProperties(handlers)) {
        if (!Object.prototype.hasOwnProperty.call(instance, name)) {
          instance[name] = VOID;
        }
      }

      // Director treats a script instance as a property container, and VMK
      // relies on it — `CMgrObject.create` assigns inheritance with
      // `setaProp(obj, #ancestor, base)`. Symbol keys arrive as "#name", so
      // both spellings normalise to the same slot.
      const slot = (key: LingoValue): string => String(key).replace(/^#/, "");
      /**
       * ⚠ Also publish `_name` for `name`, because that is how the emitter
       * spells a Director property read.
       *
       * `the interface of me` is emitted as `me._interface`, the same convention
       * `containerProxy` already strips for property LISTS. Script instances got
       * no such fallback, so a property set as `interface` was unreachable as
       * `_interface` and read VOID.
       *
       * `CMgrThread.initThread` assigns the three modules exactly this way —
       * `setaProp(tThreadObj, tModule, tObject)` for #interface, #component and
       * #handler — and 32 call sites read them back through `._interface`.
       *
       * Defined as an alias rather than a copy so later writes stay visible, and
       * never over an existing `_name`: cast members carry real `_string`,
       * `_type` and `_number` fields that must win.
       */
      const alias = (me: LingoObject, name: string): void => {
        if (name.startsWith("_") || `_${name}` in me) return;
        try {
          Object.defineProperty(me, `_${name}`, {
            enumerable: false,
            configurable: true,
            get: () => me[name],
          });
        } catch {
          // Frozen or exotic target — the plain slot below still works.
        }
      };
      /**
       * ⚠ A SYMBOL KEY IS LOWERCASE; THE PROPERTY IS NOT.
       *
       * Lingo symbols are case-insensitive and ours render lowercased —
       * `#pImage` is "#pimage" — while declared properties keep their spelling
       * (`pImage`). So `getaProp(obj, #pImage)` read `obj.pimage`: VOID, for
       * every mixed-case property. MEASURED on the music mixer's song list:
       * `tElem.ancestor.getaProp(#pImage)` was VOID beside a real image, so
       * `CMusicMixerSongList.Init` never sized or drew the list (a white box;
       * OG shows four purple rows). Director's property names are
       * case-insensitive too: fall back to a case-insensitive match, anywhere
       * up the chain, when the exact name misses.
       */
      const resolve = (me: LingoObject, key: LingoValue): string => {
        const name = slot(key);
        if (name in me) return name;
        const lower = name.toLowerCase();
        for (const candidate in me) {
          if (candidate.toLowerCase() === lower) return candidate;
        }
        return name;
      };
      instance.setaProp = (me: LingoObject, key: LingoValue, value: LingoValue): LingoValue => {
        const name = resolve(me, key);
        // Onto whichever link DECLARES it — see `propertyHolder`.
        setMeProp(me, name, value);
        alias(me, name);
        return value;
      };
      instance.getaProp = (me: LingoObject, key: LingoValue): LingoValue =>
        (me[resolve(me, key)] as LingoValue) ?? VOID;

      // Every function this instance will ever carry is in place now, so the
      // class's lowercase-name -> key table can be shared by all its instances.
      // See `LINGO_HANDLER_KEYS` — it replaces a per-call scan of every own
      // property, which the profiler measured at a quarter of all CPU.
      if (!handlerKeys) {
        handlerKeys = new Map();
        for (const key of Object.getOwnPropertyNames(instance)) {
          const descriptor = Object.getOwnPropertyDescriptor(instance, key);
          if (descriptor && typeof descriptor.value === "function" && !handlerKeys.has(key.toLowerCase())) {
            handlerKeys.set(key.toLowerCase(), key);
          }
        }
      }
      Object.defineProperty(instance, LINGO_HANDLER_KEYS, { value: handlerKeys, enumerable: false });

    /**
     * ⚠ In Director an ancestor is inherited for PROPERTIES, not just handlers.
     * `Text_API.textExists` calls `exists` on the outermost link (`CMgrText`),
     * and that handler reads `_this.pItemList` — a property `CMgrVariable.construct`
     * set on a *different object* further down the chain. Plain own-property
     * lookup returns undefined and the call dies with a bare TypeError naming
     * the key it was after ("error_title") and nothing else.
     *
     * Making the ancestor the instance's prototype gets both kinds of lookup
     * right at once, and keeps `findMethod`'s existing prototype walk working.
     */
    let ancestorValue: LingoValue = VOID;
    const setAncestor = (value: LingoValue): void => {
      ancestorValue = value;
      if (value !== VOID && typeof value === "object" && value !== null) {
        Object.setPrototypeOf(instance, value as object);
      }
    };
    Object.defineProperty(instance, "ancestor", {
      enumerable: true,
      configurable: true,
      get: () => ancestorValue,
      set: setAncestor,
    });

    /**
     * ⚠ `#ancestor` IS THE SAME SLOT — assignment must reach the setter above.
     *
     * `setaProp` normalises the two spellings, but VMK does not always go
     * through it. `CMgrThread.buildThreadObj` wires the whole thread with plain
     * bracket assignment:
     *
     *     tBase[symbol("ancestor")] = tThreadObj      -- base's ancestor is the thread
     *     tObject[symbol("ancestor")] = tTemp         -- then each class in turn
     *
     * A symbol renders as the string "#ancestor", so that was an ordinary own
     * property write: it never reached the setter, the PROTOTYPE was never
     * linked, and the chain existed while inheriting nothing. Measured on the
     * registration handler: `rh['#ancestor']` was an object and `rh.ancestor`
     * was VOID.
     *
     * The cost of that was silent. `CRegistrationHandler.HandleLogin` case 1 is
     *
     *     setMeProp(_me, "m_bRegistrationGoingOn", 1)
     *     callMethod("CreateAvatar", _this._interface)
     *
     * and `interface` is a property of the THREAD, reachable only through the
     * chain. So it set the flag, threw on the next line, and message dispatch
     * swallowed the throw — leaving `m_bRegistrationGoingOn = 1` to suggest the
     * case had run while avatar creation never started and the stage stayed
     * black.
     */
    Object.defineProperty(instance, "#ancestor", {
      enumerable: false,
      configurable: true,
      get: () => ancestorValue,
      set: setAncestor,
    });

    /**
     * `the script of <script instance>` — the script that created it.
     *
     * ⚠ Director uses this to clone: `CCoreThreadXML.CreateXML` keeps one
     * prototype instance in `m_rXMLObjSrc` and then does
     * `rawNew(m_rXMLObjSrc.script)` for every XML document it parses. Without
     * it that read is VOID and the call dies as "method call on VOID: rawNew".
     *
     * Exposed as the class itself rather than the cast member: `rawNew` and
     * `new` are the only things Lingo does with it, and the class can answer
     * both without a lookup that could miss.
     */
    Object.defineProperty(instance, "script", {
      enumerable: false,
      configurable: true,
      get: () => scriptRef,
    });

    if (options.ancestor) instance.ancestor = options.ancestor;
    for (const [key, value] of Object.entries(options.props ?? {})) {
      instance[key] = value;
    }

    // Director's convention: `on construct this` initialises the instance and
    // is passed the instance itself. `callMethod` supplies the receiver as
    // `_me`; the declared `this` parameter has to be passed explicitly, which
    // is why it appears twice in the transpiled signature.
    // The receiver is supplied by callMethod, and bindReceiver fills the
    // declared `this` for handlers that want it — so no duplicate here.

    /**
     * ⚠ `obj[n]` ON A SCRIPT INSTANCE CALLS ITS `getAt` HANDLER.
     *
     * Director dispatches a subscript on a script object to `on getAt me, i`;
     * the emitter renders it as plain JS indexing, which finds no such property
     * and answers VOID. `CCoreXMLDoc` defines `getAt`, and `CRoomHandler.
     * _EnterRoom` subscripts a document to clone its `<FILE>` node:
     *
     *     if count(t_rXML) < t_ar_sCasts.count then
     *       repeat while …
     *         t_rXML.SetChild(string(the milliSeconds), t_rXML[1].duplicate())
     *
     * ⚠ THIS IS WHAT STOPPED EVERY ROOM FROM LOADING. Town Square lists THREE
     * casts against the one `<FILE>` in `room.files.xml`, so the widening loop
     * runs, `t_rXML[1]` was VOID, and `_EnterRoom` died on
     * "Lingo method call on VOID: duplicate" — three lines before
     * `_CreateRoom`. The room request had already reached the server and
     * `EnterRoom` had already come back, so the failure looked like the room
     * build hanging rather than a subscript returning nothing.
     *
     * Scoped to classes that actually declare `getAt`, so nothing else pays for
     * a proxy, and applied BEFORE `construct` so the object VMK stores is the
     * one that dispatches. Only integer-like keys that are not real properties
     * are forwarded; every other read passes straight through.
     */
    // ⚠ `handlerName` PRESERVES CASE, so the key is `getAt`, not `getat` —
    // match case-insensitively the way Lingo resolves handlers.
    const definesGetAt = [...handlers.keys()].some((key) => key.toLowerCase() === "getat");
    const exposed: LingoObject = definesGetAt
      ? (new Proxy(instance, {
          get(target, property, receiver) {
            if (typeof property === "symbol" || Reflect.has(target, property)) {
              return Reflect.get(target, property, receiver);
            }
            const index = Number(property);
            if (Number.isInteger(index) && String(index) === property) {
              return callMethod("getAt", receiver as LingoObject, index);
            }
            return Reflect.get(target, property, receiver);
          },
        }) as LingoObject)
      : instance;

    if (options.construct !== false && handlers.has("construct")) {
      callMethod("construct", exposed, ...args);
    }
    return exposed;
  };

  const defined: LingoClass = {
    name,
    handlers,
    create: (...args: LingoValue[]) => build({}, args),
    instantiate: (options: InstanceOptions, ...args: LingoValue[]) => build(options, args),
    allocate: () => build({ construct: false }, []),
  };
  return defined;
}

/**
 * Groups generated modules by class from their file names.
 *
 * Generated files are `<cast>__<Script>__<handler>.ts`, and the script name can
 * itself contain underscores (`Core_Thread_Class`), so the handler is the LAST
 * segment and the class is everything between the cast and it.
 */
export function groupModulesByClass(
  modules: Record<string, HandlerModule>,
): Map<string, HandlerModule[]> {
  const byClass = new Map<string, HandlerModule[]>();

  for (const [path, module] of Object.entries(modules)) {
    const base = path.split(/[\\/]/).pop()?.replace(/\.(ts|js)$/, "") ?? "";
    const parts = base.split("__");
    if (parts.length < 3) continue;
    const className = parts.slice(1, -1).join("__");
    const bucket = byClass.get(className);
    if (bucket) bucket.push(module);
    else byClass.set(className, [module]);
  }

  return byClass;
}

/** Convenience for hosts that hold a whole cast's modules. */
export function defineLingoClasses(
  modules: Record<string, HandlerModule>,
  /**
   * An existing map to merge into, for classes that arrive later.
   *
   * ⚠ Casts load at RUNTIME in VMK — `CMgrCastload` downloads one, attaches it,
   * and `initThread` immediately instantiates the classes it declares. So the
   * class registry has to grow as casts arrive; it cannot be a single snapshot
   * taken at boot.
   */
  into?: Map<string, LingoClass>,
): Map<string, LingoClass> {
  const classes = into ?? new Map<string, LingoClass>();
  for (const [name, group] of groupModulesByClass(modules)) {
    classes.set(name, defineLingoClass(name, group));
  }

  // Let `rawNew(script "CObject")` reach these classes. VMK's own object
  // factory — `CMgrObject.create` — allocates every object this way, so
  // without the link the framework cannot build a single instance.
  // ⚠ Cast members carry their real names — "Layout Parser XML Class" — but the
  // emitter turns spaces into underscores for the filename, so the class is
  // registered as `Layout_Parser_XML_Class`. Match on the name with separators
  // and case removed, or every space-named script in the cast fails to resolve.
  //
  // ⚠ A DOT IS ONE OF THOSE SEPARATORS. The emitter flattens it exactly like a
  // space (`xml.parser` -> `xml_parser`, see the header of every generated file),
  // and folding only spaces left every dotted script unreachable:
  //
  //   input: mouseUp failed — rawNew: no transpiled class for script member
  //   "xml.parser"
  //
  // which is the HELP window. `CHelpContent.parseContent` allocates the parser
  // before it can read the help XML, so clicking HELP threw mid-build and left
  // the interface half torn down — the "closing Help takes the navigator with
  // it" report. The class was transpiled and present the whole time.
  const fold = (name: string): string => name.toLowerCase().replace(/[\s_.]+/g, "");
  const folded = new Map<string, LingoClass>();
  for (const [key, cls] of classes) folded.set(fold(key), cls);

  /**
   * ⚠ A SCRIPT WITH NO HANDLERS IS STILL A CLASS, and Director instantiates it.
   *
   * A parent script that declares no handlers decompiles to nothing, so the
   * emitter writes no modules and the registry has no entry — but VMK still
   * builds an object from it, and `rawNew` THREW:
   *
   *     rawNew: no transpiled class for script member
   *     "CTomorrowlandRocketRideInterface"
   *       at buildThreadObj
   *
   * That throw takes the whole thread's construction with it, so a script whose
   * only crime is being empty disabled the ride it belongs to. Director would
   * have handed back an object with nothing on it but its ancestor.
   *
   * MEASURED across every cast: of the script members with no registered class,
   * exactly ONE decompiles to a bare `-- Script` (this one). So synthesising an
   * empty class here cannot paper over much — and it is still reported, because
   * a name arriving here that ISN'T empty upstream is a genuine transpile gap
   * worth seeing.
   */
  const synthesised = new Map<string, LingoClass>();
  setScriptClassResolver((name) => {
    const known = classes.get(name) ?? folded.get(fold(name));
    if (known) return known;

    const already = synthesised.get(fold(name));
    if (already) return already;

    const blank = defineLingoClass(name, []);
    synthesised.set(fold(name), blank);
    // Once per name: this is a real finding, not per-instance noise.
    console.warn(
      `lingo: script member "${name}" has no transpiled class — allocating an ` +
        `empty instance. Expected only for scripts that declare no handlers; ` +
        `anything else here is a missing transpile.`,
    );
    return blank;
  });
  return classes;
}

/**
 * Builds an object from a VMK class list.
 *
 * VMK declares every class in `System Props` as an **ancestor chain**, not a
 * single name:
 *
 *   object.manager.class  = ["CMgrObject"]
 *   variable.manager.class = ["TManager","CMgrVariable"]
 *   window.manager.class  = ["TManager","CMgrVisualizer","CMgrWindow"]
 *
 * The list reads base-first, so the **last** entry is the concrete class and
 * each earlier one becomes its ancestor. `createObject` composes objects this
 * way at runtime, which is why inheritance cannot be resolved statically.
 *
 * Constructing base-to-derived matters: a derived `construct` routinely calls
 * inherited methods (`CWindow.construct` calls `getID` on its first line), so
 * the ancestor has to be finished before the child runs.
 */
export function buildFromClassList(
  classes: Map<string, LingoClass>,
  classNames: string[],
  props: Record<string, LingoValue> = {},
  ...args: LingoValue[]
): LingoObject {
  const missing = classNames.filter((name) => !classes.has(name));
  if (missing.length > 0) {
    throw new Error(`Lingo class not found: ${missing.join(", ")}`);
  }

  let ancestor: LingoObject | undefined;
  let instance: LingoObject | undefined;
  for (const className of classNames) {
    instance = classes.get(className)!.instantiate({ ancestor, props }, ...args);
    ancestor = instance;
  }
  return instance!;
}

/**
 * Parses VMK's `System Props` style config into plain entries.
 *
 * Lines are `key = value`, where a value may be a Lingo list literal
 * (`["TManager","CMgrVariable"]`), a number, or a bare string. Comments and
 * blanks are skipped.
 */
export function parseSystemProps(text: string): Map<string, LingoValue> {
  const entries = new Map<string, LingoValue>();

  for (const raw of text.split(/\r\n|\r|\n/)) {
    const line = raw.trim();
    if (line === "" || line.startsWith("--") || line.startsWith("#")) continue;
    const split = line.indexOf("=");
    if (split < 0) continue;

    const key = line.slice(0, split).trim();
    const value = line.slice(split + 1).trim();
    if (key === "") continue;

    // ⚠ Disney's own config is not uniformly well-formed. Two real entries:
    //   manager.template.class = ["TManager]     ← unclosed quote
    //   event.broker.class     = CEventBroker    ← not a list at all
    // Both are class declarations the client reads happily, so the parser has
    // to be lenient: accept a bracketed list whether or not it closes cleanly,
    // and strip stray quotes per item rather than requiring a matched pair.
    if (value.startsWith("[")) {
      // ⚠ Use the real Lingo literal parser first. Splitting on commas cannot
      // see `["&AUML;":"f", 140:229]` for what it is — a PROPERTY list — and
      // produced a linear list of "key:value" strings instead, so
      // `String Services Class.initConvList` called `getPropAt` on a linear list
      // and the boot died inside the character-conversion table.
      // ⚠ Only when it yields a PROPERTY list. The strict parser has no
      // tolerance for Disney's malformed entries — it turns `["TManager]` into
      // the item `TManager]`, keeping the stray bracket — so a linear result is
      // left to the lenient split below, which strips it.
      const parsed = parseValue(value);
      if (parsed instanceof LingoPropList) {
        entries.set(key, parsed as unknown as LingoValue);
        continue;
      }
      // Fall back to the lenient split for the malformed entries above.
      const inner = value.replace(/^\[/, "").replace(/\]$/, "").trim();
      const items = inner === ""
        ? []
        : inner.split(",").map((part) => part.trim().replace(/^"+|"+$/g, ""));
      entries.set(key, new LingoList(items as LingoValue[]) as unknown as LingoValue);
      continue;
    }
    if (/^-?\d+$/.test(value)) {
      entries.set(key, parseInt(value, 10));
      continue;
    }
    entries.set(key, value.replace(/^"(.*)"$/, "$1"));
  }

  return entries;
}

/**
 * The class-registry key `CWindow.CreateElement` builds for a UI element.
 *
 * VMK's window layouts describe elements with a `type` and a `model`
 * (`{"type":"button","model":"#image"}`), and `CreateElement` composes
 * `"window." & type & model & ".class"` to look the class up. The registry
 * holds the matching entries:
 *
 *   window.button4.class   = ["CWindowCommonButton","CWindowImageButton"]
 *   window.textedit.class  = ["CWindowFieldWrapper"]
 *   window.scrollbarv0.class = ["CWindowScrollbar"]
 *
 * A `#`-prefixed model is a Lingo symbol in the data; the key uses the bare
 * name, and a missing model means the type alone carries the key.
 */
export function elementClassKey(type: LingoValue, model: LingoValue = VOID): string {
  const typeName = String(type ?? "").replace(/^#/, "");
  const modelName = model === VOID || model === undefined ? "" : String(model).replace(/^#/, "");
  return `window.${typeName}${modelName}.class`;
}

/** Reads a property off a script instance, VOID when absent. */
export function instanceProp(instance: LingoObject, name: string): LingoValue {
  return (instance[name] as LingoValue) ?? VOID;
}

/**
 * Registers the movie-level handlers a cast exposes as globals.
 *
 * ⚠ Not every transpiled script is a class. VMK's core cast has 17 `*_API`
 * movie scripts — `Variable_API`, `Window_API`, `Text_API`, `Object_API`, … —
 * whose handlers are **global**, reached by bare name (`getVariable(...)`),
 * not as methods on an instance. Treating them as classes leaves those calls
 * unresolved, which is what stopped half the corpus from constructing.
 *
 * They take no receiver, so the injected `_me` is dropped.
 */
export function registerApiHandlers(
  classes: Map<string, LingoClass>,
  isApi: (className: string) => boolean = (name) => /_API$/i.test(name),
): number {
  let registered = 0;
  const table: Record<string, (...args: LingoValue[]) => LingoValue> = {};

  for (const [className, cls] of classes) {
    if (!isApi(className)) continue;
    for (const [handler, fn] of cls.handlers) {
      table[handler] = (...args: LingoValue[]) => fn(VOID as LingoValue, ...args);
      registered++;
    }
  }

  registerHandlers(table);
  return registered;
}




