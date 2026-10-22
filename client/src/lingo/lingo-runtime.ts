/**
 * Runtime for Lingo transpiled to TypeScript by LibreShockwave's
 * `LingoNodeTypeScript.cpp` (`LSW_EMIT_TS=1`).
 *
 * The surface here is not invented — it is exactly the set of helpers the
 * emitter produces, measured across all 987 handlers of `core.old.cct`:
 *
 *   symbol 2799 · lingoBinary 2665 · meProp 2652 · callNamed 2314
 *   callMethod 1882 · setMeProp 895 · setThePropOf 611 · lingoTruthy 264
 *   theProperty 166 · float 48 · globalVar 48 · setTheProperty 44 · chunkOf 36
 *
 * Semantics follow Director's Lingo, not JavaScript. The differences that bite
 * are called out at each function; the big three are integer division,
 * case-insensitive string comparison, and 1-based indexing.
 */

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------

/** Lingo's VOID. Distinct from JS null: `voidP(VOID)` is true, `voidP(0)` is not. */
export const VOID = undefined;

export type LingoSymbol = string; // interned as "#name", lowercased
export type LingoValue =
  | undefined
  | number
  | string
  | boolean
  | LingoList
  | LingoPropList
  | LingoObject
  | LingoValue[];

/** A transpiled script instance: properties plus a handler table. */
export interface LingoObject {
  [key: string]: unknown;
}

export type LingoMe = LingoObject;

/**
 * Lingo symbols are case-insensitive and compare by identity. Emitting them as
 * a canonical string makes `switch (x) { case symbol("string"): }` work under
 * JS strict equality, and makes `list[symbol("Active")]` a valid property key —
 * both shapes the emitter produces.
 */
export function symbol(name: string): LingoSymbol {
  const text = String(name);
  /**
   * ⚠ Idempotent. Director's `symbol(#left)` is `#left`, not `##left`, and the
   * distinction is load-bearing: `CWindowCommonButton.UpdateImageObjects` loops
   * `[#left, #middle, #right]` and stores each image under `symbol(f)` where `f`
   * is ALREADY a symbol, while `createButtonImg` reads them back with
   * `getProp(…, #left)`. Double-prefixing wrote three keys nothing could find,
   * so every button image came back VOID and the login window died reading
   * `.width` of nothing.
   */
  return text.startsWith("#") ? text.toLowerCase() : `#${text.toLowerCase()}`;
}

// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------

/**
 * Bracket access on Lingo containers is not JS property access.
 *
 * Transpiled code reaches lists both ways, and the two mean different things:
 *
 *   `tParmArr[i]`        → the value at 1-based POSITION i
 *   `pItemList[a_sKey]`  → the value under KEY a_sKey
 *   `pItemList[k] = v`   → assignment under that key
 *
 * Mirroring keys onto the instance covered reads of keys that had been set
 * through `setProp`, but not arbitrary writes, and `CMgrVariable.set` does
 * exactly `_this.pItemList[a_sKey] = a_vValue`. A proxy is the honest model:
 * numeric subscripts go positional, everything else goes by key, and real
 * methods and fields still resolve normally.
 */
/**
 * Is `property` something this object can actually be ASSIGNED?
 *
 * ⚠ `count` is a getter with no setter, and a Lingo property list may hold a
 * KEY of that name. `CSoundTracker.EventTimer` does exactly that:
 *
 *     a_mpSoundData["count"] = 0
 *     createTimeout(t_sID, t_iTime, #SoundEvent, me.getID(), a_mpSoundData, 50)
 *
 * and `SoundEvent` then steps it with `a_mpSoundData["count"] + 1`. Routing
 * that to the accessor threw "'set' on proxy: trap returned falsish for
 * property 'count'" out of an uncaught timeout callback, so EVERY volume fade
 * and pan sweep in every room died on its first tick — `PREF="[0,255,13000]"`
 * on Main Street's music channel never ramped.
 *
 * Only read-only members are re-read as keys. The class's own writable fields
 * (`items`, `keys`, `values`, `keyIndex`, `hashable`) must keep reaching the
 * object, because a container's methods write them through `this`, which IS
 * this proxy — the constructor returns it.
 */
/**
 * Inherited answers are fixed per class, so they are cached per prototype: this
 * runs on EVERY property read of a prop list (methods included), and walking
 * the descriptors each time was ~5% of the post-login freeze on its own.
 */
const inheritedAssignable = new WeakMap<object, Map<string, boolean>>();
function isAssignable(object: object, property: string): boolean {
  if (!Object.prototype.hasOwnProperty.call(object, property)) {
    const proto = Reflect.getPrototypeOf(object);
    if (!proto) return true;
    let cache = inheritedAssignable.get(proto);
    if (!cache) inheritedAssignable.set(proto, (cache = new Map()));
    let known = cache.get(property);
    if (known === undefined) {
      known = isAssignableWalk(proto, property);
      cache.set(property, known);
    }
    return known;
  }
  return isAssignableWalk(object, property);
}
function isAssignableWalk(object: object, property: string): boolean {
  for (let level: object | null = object; level; level = Reflect.getPrototypeOf(level)) {
    const descriptor = Reflect.getOwnPropertyDescriptor(level, property);
    if (!descriptor) continue;
    return descriptor.set !== undefined || (descriptor.get === undefined && descriptor.writable !== false);
  }
  return true;
}

/**
 * The containers' own instance fields (`items`, `keys`, `values`, `keyIndex`…),
 * filled in once both classes exist — see the end of `LingoPropList`.
 *
 * ⚠ EVERY METHOD READS THESE THROUGH THE PROXY. A method called on a list runs
 * with `this` = the proxy the constructor returned, so `this.keys` inside
 * `indexOfKey` went through the full `get` trap — `isAssignable` (an uncached
 * descriptor walk, since the field is OWN), then `Reflect.has`, then
 * `Reflect.get` — several times per lookup. MEASURED with the sampling
 * profiler over the post-login freeze: `isAssignable` + `isAssignableWalk`
 * 8.5% of busy time, nearly all of it these reads.
 *
 * The answer never varies: an own, writable data field is assignable, so the
 * trap always ended at `Reflect.get`. Going there directly changes nothing a
 * Lingo key could see — such a key was already shadowed by the field.
 */
const CONTAINER_FIELDS = new Set<string>();

/**
 * ⚠ OWN, NOT MERELY NAMED. The set pools BOTH classes' fields, and a name that
 * is a field of the OTHER class is an ordinary Lingo key here: a prop list has
 * no `items` field, so `tGroupData.items` must reach the key. Answering it from
 * the (absent) field read VOID and wrote a stray JS property instead — avatars
 * appeared mid-room with their entry animation stuck.
 */
function isOwnField(object: object, property: string): boolean {
  return CONTAINER_FIELDS.has(property) && Object.prototype.hasOwnProperty.call(object, property);
}

function containerProxy<T extends object>(target: T): T {
  return new Proxy(target, {
    get(object, property, receiver) {
      if (typeof property === "string" && isOwnField(object, property)) {
        return (object as Record<string, unknown>)[property];
      }
      /**
       * ⚠ A read-only member name that the list ALSO holds as a key is the key.
       * See `isAssignable` — `EventTimer`'s counter is stored under "count", and
       * reading the list's length instead made `SoundEvent` count from 5.
       */
      if (
        typeof property === "string" &&
        object instanceof LingoPropList &&
        !isAssignable(object, property) &&
        (object.findPos(property) ?? 0) > 0
      ) {
        return object.getProp(property);
      }
      if (typeof property === "symbol" || Reflect.has(object, property)) {
        return Reflect.get(object, property, receiver);
      }
      const container = object as unknown as LingoList | LingoPropList;
      const index = Number(property);
      const looksPositional = Number.isInteger(index) && String(index) === property;

      /**
       * ⚠ ON A PROPERTY LIST, A NUMERIC-LOOKING NAME IS A KEY FIRST.
       *
       * Lingo tells `pList[key]` from `pList[n]` by the TYPE of the index —
       * string means key, integer means position. JavaScript stringifies every
       * property name, so that distinction is gone by the time it reaches here,
       * and reading it as a position unconditionally was wrong for every prop
       * list whose keys happen to be digits.
       *
       * VMK has exactly that: `SetList` is keyed "20000", "22000", "44263" …,
       * and `CAvatarFactoryComponent.parseAllFigureData` builds its output with
       *
       *     t_ar_FigureParts2[t_sSetName][t_iSetNum]
       *
       * where `t_iSetNum` came from `getPropAt`, i.e. the STRING "20000". That
       * read position 20000 of a 3-entry list, got VOID, and threw
       * "Lingo method call on VOID: add" — so `AllAvailableSets` was never
       * created, `CRegistrationInterface.CreateAvatar` failed its
       * `variableExists` gate forever and re-armed a 1-second timeout instead of
       * sending GetNewAvatarSets. Registration sat on a black stage with no
       * error, because retrying quietly is what that handler is written to do.
       *
       * The colour list hid it: key "3" also happens to live at position 3, so
       * small ids agreed and only ids past ~180 diverged.
       *
       * A list has no keys, so it keeps reading positionally.
       */
      if (looksPositional && !(container instanceof LingoPropList)) {
        return container.getAt(index);
      }
      /**
       * ⚠ A FLOAT SUBSCRIPT IS A POSITION TOO, rounded as `integer()` rounds.
       * JavaScript turns `list[3.5]` into the name "3.5", which matched nothing,
       * so the Jungle Cruise's photo rating (`CScoreFeedback.display`:
       * `m_ar_members[5 * quality]`) got VOID and "PERFECT!" / "GOOD" and the
       * rest never showed.
       */
      if (!(container instanceof LingoPropList) && typeof property === "string" &&
        Number.isFinite(index) && !Number.isInteger(index) && property.trim() !== "") {
        return container.getAt(Math.round(index));
      }
      if (!(container instanceof LingoPropList)) return VOID;

      /**
       * ⚠ IN POSITIONAL RANGE, A NUMERIC NAME IS A POSITION AGAIN.
       *
       * Key-first alone was too strong. Lingo's own rule is that an INTEGER
       * subscript is positional on a property list — `getaProp` is how you ask
       * for a key — so a read that lands inside `1..count` must answer the
       * position, and only a numeric name too large to BE a position falls
       * through to the key. That keeps the `SetList` case above working (keys
       * "20000"/"22000"/"44263" in a 3-entry list are all out of range) while
       * restoring the ordinary `list[i]` walk, and it is the same rule the
       * `set` trap below already uses — reads and writes disagreeing about
       * what `[444]` means was itself the defect.
       *
       * ⚠ THIS IS WHY 68 ROOM TILES WENT MISSING even after `duplicate` was
       * fixed. `CCoreXMLTreeRealize` stores children in a prop list keyed by
       * the factory's minted key, and Main Street's floor holds 451 of them
       * under keys "444".."894". `CRoomContext._RecursiveListing` walks
       * `a_rObj[i]` for i in 1..451, so positions 444..451 collided with the
       * keys "444".."451" and handed back the objects from positions 1..8.
       * Those eight re-visits tripped the handler's own "Object already
       * listed" guard, which returns 0 and ABORTS the rest of the walk — so
       * the index came up 383 tiles instead of 451.
       */
      if (looksPositional && index >= 1 && index <= container.count) {
        return container.getAt(index);
      }

      const direct = container.getProp(property);
      if (direct !== VOID) return direct;
      // No such key — only now is a numeric name a position.
      if (looksPositional) return container.getAt(index);
      const named = container as LingoPropList;
      /**
       * ⚠ `propList.name` is sugar for `propList[#name]` in Lingo, and keys are
       * usually stored as symbols. Without this fallback, `tSupportedTags[x].open`
       * looked for the key `"open"` while the list held `#open`, returned VOID,
       * and `Layout Parser Class` matched no tags at all — producing an empty
       * element list from a window definition it had read perfectly.
       */
      const asSymbol = named.getPropAsSymbol(property);
      if (asSymbol !== VOID) return asSymbol;
      /**
       * ⚠ The emitter PREFIXES Director's built-in property names with `_`, so
       * `the type of x` is written `x._type` and `the string of x` is
       * `x._string`. On a cast member those are real fields, but on a property
       * list Lingo reads them as ordinary keys: `[#type:"BLK", …]._type` is
       * `"BLK"`.
       *
       * `CCoreXMLParser.ParseXML` compares every closing tag against
       * `t_rNode._type`. Reading VOID made every node's type empty, so EVERY tag
       * in EVERY document mismatched — 6,382 of the boot's 6,412 errors were
       * this one line, reported as `Wrong or missing closing tag: <> --> </BLK>`,
       * where the `<>` is the empty type it read back.
       */
      if (property.startsWith("_") && property.length > 1) {
        return named.getPropByName(property.slice(1));
      }
      return VOID;
    },
    set(object, property, value, receiver) {
      if (typeof property === "symbol") {
        return Reflect.set(object, property, value, receiver);
      }
      // A container's own field (`this.keyIndex = …` inside a method): always
      // assignable, so this is where the checks below ended up. See `get`.
      if (isOwnField(object, property)) {
        (object as Record<string, unknown>)[property] = value;
        return true;
      }
      // A name the object cannot be assigned — `count` — can only be a Lingo
      // key, so fall through to the container logic. See `isAssignable`.
      if (Reflect.has(object, property) && isAssignable(object, property)) {
        return Reflect.set(object, property, value, receiver);
      }
      const container = object as unknown as LingoList | LingoPropList;
      const index = Number(property);
      const looksPositional = Number.isInteger(index) && String(index) === property;
      /**
       * ⚠ IN POSITIONAL RANGE, A NUMERIC NAME IS A POSITION — the SAME rule the
       * `get` trap uses, and reads and writes disagreeing about what `[n]` means
       * is itself a defect. An integer subscript is positional on a property list
       * (`getaProp` is how you ask for a key), so a write landing inside `1..count`
       * updates that POSITION; only a numeric name too large to BE a position
       * falls through to a key.
       *
       * ⚠ THIS TRAP USED TO CHECK THE KEY FIRST — "an existing key wins over a
       * positional reading" — which was wrong whenever an integer subscript
       * coincided with an integer KEY. `_ReturnFurniThumbnail` fills
       * `a_mp_iType_rOutput[i] = t_rThumb` over a prop list KEYED BY FURNI CODES
       * (`[2, 39, 126, …]`); at `i = 2` the key-first path wrote the value keyed
       * 2 (position 1) instead of position 2, so the inventory Furnishings grid
       * showed item 1's thumbnail as item 2's and left item 2 blank (only the one
       * item whose code equalled its own index was hit — every other slot was
       * fine, which is exactly the reported symptom). The `get` trap already
       * answers position for an in-range integer, so key-first on `set` also made
       * reads and writes disagree.
       */
      if (container instanceof LingoPropList) {
        if (looksPositional && index >= 1 && index <= container.count) {
          container.setAt(index, value as LingoValue);
          return true;
        }
        /**
         * ⚠ OUT OF POSITIONAL RANGE, A NUMERIC NAME IS A KEY. `setAt` past the end
         * of a list does nothing, so a numeric name too large to be a position must
         * add (or update) a key — otherwise the write vanishes silently:
         *
         *     propList["330"] = "gotoframe 60"   ->  keys stay [] (WRONG)
         *
         * MEASURED as two user-visible faults. `CVMKAnimationManager.parseAnimation`
         * keys BOTH outputs by frame number (`t_ar_Events[t_sEventID]` and
         * `t_ar_Sounds[t_sSoundID]`), so the registration tip page animated "fast
         * and looping" (its `<EVENT FRAME="330" NAME="gotoframe 60"/>` was dropped,
         * and `CFactorVmkAnimation.update` fell through to its `frame > lastFrame`
         * reset, replaying the intro forever) and its sounds never played. Director
         * tells position from key by the index's TYPE and JavaScript cannot, so the
         * positional RANGE is the discriminator: `propList[n] = x` past the end is
         * an index error in Director, while `propList["330"] = x` adds a key.
         */
        container.setProp(property, value as LingoValue);
        return true;
      }
      if (looksPositional) {
        container.setAt(index, value as LingoValue);
        return true;
      }
      // A linear list has no keys, so a name it cannot be assigned has nowhere
      // to go. Director errors; dropping it keeps the handler running rather
      // than throwing out of whatever timeout is driving it.
      if (!isAssignable(object, property)) return true;
      return Reflect.set(object, property, value, receiver);
    },
  });
}

/** Linear list — `[1, 2, 3]`. 1-based, like every index in Lingo. */
/**
 * A value as Director prints it inside a list: `[1, "a", #b, [2, 3], [#k: 4]]`.
 *
 * ⚠ `string(aList)` and `aList.string` ARE DATA, NOT DEBUG OUTPUT. The music
 * mixer saves a song as `replaceChunks(t_shortData.string, " ", EMPTY)` and
 * every client plays it back with `.value`; ours printed "[object Object]" (and
 * `.string` read VOID), so the server got no song at all. Symbols are interned
 * as "#name", so a string with a leading `#` prints bare, as the symbol it is.
 */
function lingoLiteral(value: LingoValue, depth = 0): string {
  if (depth > 32) return "[...]";
  if (value === VOID) return "<Void>";
  if (value instanceof LingoFloat) return formatLingoFloat(value.value);
  if (typeof value === "number") return formatLingoNumber(value);
  if (typeof value === "string") return value.startsWith("#") ? value : `"${value}"`;
  if (value instanceof LingoList) return `[${value.items.map((v) => lingoLiteral(v, depth + 1)).join(", ")}]`;
  if (value instanceof LingoPropList) return value.literal(depth);
  return toStringValue(value);
}

export class LingoList {
  readonly items: LingoValue[] = [];

  constructor(initial: LingoValue[] = []) {
    this.items.push(...initial);
    return containerProxy(this);
  }

  /** `string(list)` — the Lingo literal. See `lingoLiteral`. */
  toString(): string {
    return lingoLiteral(this as unknown as LingoValue);
  }

  /** `list.string` — same thing, the property form. */
  get string(): string {
    return this.toString();
  }

  /**
   * ⚠ …and as the emitter SPELLS it: a property read `x.string` is emitted as
   * `x._string` (the `_name` convention — see lingo-script `alias`). Without
   * this the mixer's `t_shortData._string` read VOID and every song saved as
   * "undefined".
   */
  get _string(): string {
    return this.toString();
  }

  get count(): number {
    return this.items.length;
  }

  /**
   * `getAt(list, n)` — the value at a position.
   *
   * ⚠ A NON-NUMERIC INDEX IS A KEY HELD BY A CONTAINED PROPERTY LIST — see
   * `positionOfWrappedKey`. `getAt([[#volume: 64]], #volume)` is 64 in Director,
   * and ours answered VOID.
   */
  getAt(index: LingoValue): LingoValue {
    const position = Number(index);
    if (!Number.isFinite(position) || String(index).startsWith("#")) {
      const at = this.positionOfWrappedKey(index);
      if (at === 0) return VOID;
      const holder = this.items[at - 1];
      return holder instanceof LingoPropList ? holder.getProp(index) : VOID;
    }
    return this.items[position - 1];
  }

  setAt(index: number, value: LingoValue): void {
    this.items[index - 1] = value;
  }

  add(value: LingoValue): void {
    this.items.push(value);
  }

  deleteAt(index: number): void {
    this.items.splice(index - 1, 1);
  }

  /** `list.deleteAll()` — empty it in place, keeping the same list object. */
  deleteAll(): void {
    this.items.length = 0;
  }

  sort(): void {
    this.items.sort((a, b) => compare(a, b));
  }

  /** `repeat with x in list` — the emitter renders it as `.toArray()`. */
  toArray(): LingoValue[] {
    return [...this.items];
  }

  // -- the rest of Director's linear-list surface, measured from the corpus:
  //    add 92 · getPos 33 · deleteOne 22 · duplicate 22 · getOne 19 · sort 15
  //    count 12 · deleteAt 11 · append 9
  //
  // ⚠ Every position is 1-based and **0 means "not found"**, not -1. VMK tests
  // `getOne(list, id) <> 0`, so returning -1 would read as present.

  append(value: LingoValue): void {
    this.items.push(value);
  }

  /** `getFirst(list)` / `getLast(list)` — Director's ends. */
  getFirst(): LingoValue {
    return this.items.length > 0 ? this.items[0]! : VOID;
  }

  /**
   * `join(list, delimiter)` — Director flattens a list to a string.
   *
   * Symbols render without their `#`, which is what makes
   * `join(["a", #b, 3], "-")` come out as `a-b-3` (LibreShockwave's
   * `sdk_foundation_test.cpp` asserts exactly that).
   */
  join(delimiter: LingoValue = ""): string {
    const sep = delimiter === VOID || delimiter === undefined ? "" : String(delimiter);
    return this.items
      .map((item) => String(item ?? "").replace(/^#/, ""))
      .join(sep);
  }

  /**
   * ⚠ LIST MEMBERSHIP MATCHES LIKE A PROPERTY KEY: a symbol and an equal-named
   * string are the same value, and strings compare CASE-INSENSITIVELY.
   *
   * LibreShockwave's conformance suite pins it — `getOne(list, "TAIL")` finds
   * the `#tail` appended earlier and answers its POSITION (6). Ours used
   * `looseEquals`, which is case-sensitive and keeps `#tail` distinct from
   * `"tail"`, so `getOne` returned 0 and `deleteOne` removed nothing.
   *
   * That silently changes control flow rather than erroring: VMK writes
   * `if getOne(list, id) <> 0`, so a miss reads as "not present" and the
   * handler takes the wrong branch with no error anywhere.
   */
  private static memberEquals(item: LingoValue, value: LingoValue): boolean {
    /**
     * ⚠ STRING AGAINST STRING IS CASE-SENSITIVE — only a SYMBOL folds case.
     *
     * VMK's chat dictionary depends on it. All-caps words are stored with the
     * first letter lowered (`"lOL"`, `"oK"`, `"vMK"`) right beside the plain
     * word (`"lol"`, `"ok"`), and `CCannedTextManager.ParseText` lowers only
     * the first char before `CWordIndexList.getIndexOfWord` → `getPos`. Folding
     * case made typed "lol" hit `"lOL"` (listed first), so chat came out "lOL".
     */
    const itemText = unboxString(item);
    const valueText = unboxString(value);
    if (
      typeof itemText === "string" && typeof valueText === "string" &&
      !itemText.startsWith("#") && !valueText.startsWith("#")
    ) {
      return itemText === valueText;
    }
    if (looseEquals(item, value)) return true;
    const canonical = (v: LingoValue): string | null => {
      if (typeof v === "string") return v.replace(/^#/, "").toLowerCase();
      if (typeof v === "number" || typeof v === "boolean") return null;
      if (v === VOID || v === null || v === undefined) return null;
      /**
       * ⚠ A non-string, non-number VALUE HERE IS A LINGO OBJECT, and an object
       * is never a symbol (`symbol()` returns a STRING, caught above). So the
       * only reason to stringify is to catch a symbol that arrived boxed — and
       * `String(v)` on a real object instead invokes that object's Lingo
       * `toString` handler, which is both expensive (e.g. a full XML-tree
       * serialization) and CRASH-PRONE.
       *
       * MEASURED (guest-room furni, first load): `getOne(list, node)` over a
       * list of XML nodes stringified each NON-matching element (the match is
       * found by `looseEquals` identity FIRST, so only misses reach here). One
       * node was a shell whose `_me` was undefined, so
       * `CCoreXMLTreeRealize.toString` threw `Cannot read properties of
       * undefined (reading 'm_sType')` out of the comparison — aborting the
       * room's furni-load loop, so only the furni before the bad node appeared
       * and the rest stayed unrendered until a reload. A comparison must never
       * throw: if stringifying fails, the element is simply not a symbol match.
       */
      let text: string;
      try {
        text = String(v);
      } catch {
        return null;
      }
      return text.startsWith("#") ? text.slice(1).toLowerCase() : null;
    };
    const a = canonical(item);
    const b = canonical(value);
    return a !== null && b !== null && a === b;
  }

  /** Position of the first element equal to `value`, or 0. */
  getOne(value: LingoValue): number {
    return this.items.findIndex((item) => LingoList.memberEquals(item, value)) + 1;
  }

  /** Same as getOne for a linear list; Lingo offers both names. */
  getPos(value: LingoValue): number {
    return this.getOne(value);
  }

  /**
   * `findPos(list, value)`. On a linear list Director answers the position or 0.
   *
   * ⚠ `CMgrCastload.resetCastLibs` compares the result against 0 to decide
   * whether a cast lib is one it was asked to keep, so "not found" has to be 0
   * and not VOID — the comparison is `= 0`, and VOID would fail it and make the
   * client close threads for casts it should have left alone.
   */
  findPos(value: LingoValue): number {
    const direct = this.getOne(value);
    if (direct !== 0) return direct;
    return this.positionOfWrappedKey(value);
  }

  /**
   * ⚠ A LIST OF PROPERTY LISTS ANSWERS FOR ITS CONTENTS' KEYS.
   *
   * Director lets `findPos` and `getAt` reach a key held by a prop list INSIDE
   * the list, which is how a list-of-settings is queried without unwrapping it.
   * LibreShockwave's suite pins both:
   *
   *     wrappedList = [ [#volume: 64] ]
   *     findPos(wrappedList, #volume)  ->  1
   *     getAt(wrappedList, #volume)    ->  64
   *
   * Ours answered 0 and VOID, so any VMK code reading a setting this way took
   * the "absent" branch.
   */
  private positionOfWrappedKey(key: LingoValue): number {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item instanceof LingoPropList && item.findPos(key) !== VOID) return i + 1;
    }
    return 0;
  }

  deleteOne(value: LingoValue): number {
    const index = this.items.findIndex((item) => LingoList.memberEquals(item, value));
    if (index < 0) return 0;
    this.items.splice(index, 1);
    return index + 1;
  }

  addAt(index: number, value: LingoValue): void {
    this.items.splice(Math.max(0, index - 1), 0, value);
  }

  getLast(): LingoValue {
    return this.items[this.items.length - 1];
  }

  /**
   * Lingo allows `getaProp` on a **linear** list, where it means "the value at
   * this position" — the same call works on both list kinds, and the parser
   * relies on that when walking a tag's contents.
   */
  getaProp(index: LingoValue): LingoValue {
    return this.getAt(Number(index));
  }

  setaProp(index: LingoValue, value: LingoValue): void {
    this.setAt(Number(index), value);
  }

  /**
   * `duplicate()` — a DEEP copy, as Director's is for nested lists.
   *
   * ⚠ SHALLOW WAS A REAL BUG, not a nicety. `Layout Parser Class.parse` caches
   * each parsed window layout and hands callers `duplicate(tdata)` precisely so
   * they can mutate it freely — and `CWindow.buildVisual` DOES mutate it, making
   * every piece's position relative to its group in place:
   *
   *     tItem[#locH] = tItem[#locH] - tElemRect[1]
   *
   * With a shallow copy the nested per-piece prop lists stayed SHARED with the
   * cache, so the first window built from a layout rewrote the cached
   * coordinates and every later window from that same layout saw them already
   * relative.
   *
   * MEASURED on the two connection dialogs, same `vmk_modal.window` layout: the
   * first got `back.pLoc 10,13` (correct — the group's pieces sit at 10,13 /
   * 14,13 / 236,13) and the second got `0,0`, so its title bar drew flush with
   * the window corner instead of inset.
   *
   * Only nested LISTS are copied. Object references — images, instances — stay
   * references, which is also what Director does.
   */
  duplicate(): LingoList {
    return new LingoList(this.items.map((item) => deepCopy(item)));
  }

  max(): LingoValue {
    return this.items.reduce((best, item) => (compare(item, best) > 0 ? item : best), this.items[0]);
  }

  min(): LingoValue {
    return this.items.reduce((best, item) => (compare(item, best) < 0 ? item : best), this.items[0]);
  }
}

/**
 * One level of `duplicate()`'s deep copy.
 *
 * Nested LISTS are copied because Director copies them; anything else — images,
 * class instances, plain values — is carried by reference, which is also what
 * Director does. Recursion terminates on the first non-list.
 */
function deepCopy(value: LingoValue): LingoValue {
  if (value instanceof LingoList || value instanceof LingoPropList) {
    return value.duplicate() as unknown as LingoValue;
  }
  return value;
}

/** Property list — `[#a: 1, #b: 2]`. Insertion-ordered; keys compare case-insensitively. */
export class LingoPropList {
  private readonly keys: LingoValue[] = [];
  private readonly values: LingoValue[] = [];

  /**
   * ⚠ The emitter writes a **flat alternating** key/value array, not pairs:
   *
   *   [#open: "<x>", #close: "</x>"]
   *     → new LingoPropList([symbol("open"), "<x>", symbol("close"), "</x>"])
   *
   * Expecting `Array<[k, v]>` here destructured each *string* into characters,
   * which is why a literal prop list inside `Layout Parser Class` blew up
   * somewhere unrelated with ".for is not iterable". Pairs are still accepted,
   * since a caller in this codebase may reasonably build them.
   */
  constructor(initial: LingoValue[] | Array<[LingoValue, LingoValue]> = []) {
    const flat = !initial.some((entry) => Array.isArray(entry));
    if (flat) {
      for (let i = 0; i + 1 < initial.length; i += 2) {
        this.keys.push(initial[i] as LingoValue);
        this.values.push(initial[i + 1] as LingoValue);
      }
    } else {
      for (const entry of initial as Array<[LingoValue, LingoValue]>) {
        this.keys.push(entry[0]);
        this.values.push(entry[1]);
      }
    }
    return containerProxy(this);
  }

  /** The Lingo literal, `[#a: 1, "b": 2]`, or `[:]` when empty. */
  literal(depth = 0): string {
    if (this.keys.length === 0) return "[:]";
    const pairs = this.keys.map((k, i) => `${lingoLiteral(k, depth + 1)}: ${lingoLiteral(this.values[i], depth + 1)}`);
    return `[${pairs.join(", ")}]`;
  }

  /**
   * `string(propList)` — the Lingo literal.
   *
   * ⚠ NO `.string` / `._string` PROPERTY HERE, unlike `LingoList`: on a
   * property list that is a KEY LOOKUP. `CCannedTextManager.SpliceLine` builds
   * `[#string: "cool", #dest: #splicer]` blocks and reads `tBlock._string`; a
   * getter shadowed the key, every word parsed as the list's literal, and the
   * mixer refused "cool" as a song name (chat would have broken the same way).
   */
  toString(): string {
    return this.literal();
  }

  get count(): number {
    return this.keys.length;
  }

  /**
   * ⚠ A SYMBOL KEY AND AN EQUAL-NAMED STRING ARE THE SAME KEY.
   *
   * Director lets a property list be written with symbol keys and read with
   * strings, and VMK's own shipped Lingo depends on it across class boundaries:
   *
   *   CMainHandler.construct        registerMessage(#furnimap_ready, …)
   *   CRoomFurnitureMap._FileLoad…  executeMessage("furnimap_ready")
   *
   * Symbols are canonicalised here as `"#name"`, so a plain `looseEquals` sees
   * `"#furnimap_ready"` against `"furnimap_ready"` and reports a miss. The
   * broker then broadcast to ZERO subscribers — `furnimap_ready` fired with no
   * listeners while `#dictionary_ready` (registered and broadcast both as
   * symbols) found its two — and the client sat at `init_threads` forever with
   * an empty stage, because the handler that advances past the furnimap never
   * ran. No error: a broadcast that reaches nobody is not a failure.
   *
   * Deliberately scoped to KEY lookup rather than widened into `looseEquals`
   * itself: this is the documented property-list behaviour, and changing what
   * `=` means between a symbol and a string would reach every comparison in
   * 6,000 generated files at once.
   */
  private static keyEquals(candidate: LingoValue, key: LingoValue): boolean {
    if (typeof candidate === "string" && typeof key === "string") {
      const a = candidate.startsWith("#") ? candidate.slice(1) : candidate;
      const b = key.startsWith("#") ? key.slice(1) : key;
      return a.toLowerCase() === b.toLowerCase();
    }
    return looseEquals(candidate, key);
  }

  /**
   * `keyEquals` as a hash, for the fast path. Null when `key` is not a string,
   * which is the only case the map cannot represent faithfully — `looseEquals`
   * matches a numeric key against `"5"`, and no single normalisation captures
   * that. Those lists fall back to the scan.
   */
  private static hashKey(key: LingoValue): string | null {
    if (typeof key !== "string") return null;
    return (key.startsWith("#") ? key.slice(1) : key).toLowerCase();
  }

  /**
   * Key -> position, built on demand. Null means "not built yet".
   *
   * ⚠ THIS EXISTS BECAUSE THE SCAN MADE INDEX-BUILDING QUADRATIC — and that
   * hung the client outright, it is not a micro-optimisation. `indexOfKey` was
   * a `findIndex` whose comparator lowercases BOTH sides on every candidate, so
   * each insert cost O(n) string allocations and filling a list cost O(n²).
   *
   * VMK builds exactly that shape on the registration route:
   *
   *     CAvatarClothAssetManager.AddCastContentsToImageCache(cast)
   *       m_mp_sName_rStruct[member.name] = …    -- once per member, per cast
   *
   * One cast is survivable (834 members ≈ 350k comparisons). The clothes loader
   * walks many casts into the SAME list, and tens of thousands of entries turns
   * that into billions of lowercase allocations — a main thread that never comes
   * back. MEASURED: the tab stopped answering CDP entirely, screenshots
   * included, which is what a synchronous loop looks like from outside.
   *
   * Insertion order is still what `keys`/`values` say; this only answers "where
   * is it", so `getPropAt`, `sort` and iteration are unaffected.
   */
  private keyIndex: Map<string, number> | null = null;
  /** False once a non-string key appears — see `hashKey`. Then always scan. */
  private hashable = true;
  /**
   * Whether two keys in this list hash the same. Only then does removing one
   * key change where ANOTHER key is found, which is what `deleteProp` needs to
   * know to repair the index in place instead of dropping it.
   */
  private hasDuplicateKeys = false;

  /** Called by anything that MOVES a key. `deleteProp` repairs instead. */
  private invalidateIndex(): void {
    this.keyIndex = null;
  }

  /**
   * ⚠ A DELETE MUST NOT THROW THE INDEX AWAY, or a delete-in-a-loop is quadratic
   * again — with a much worse constant than the scan it replaced, because
   * rebuilding rehashes (and lowercases) EVERY key.
   *
   * MEASURED entering musical_mainstreet. `CMgrResource.unregisterMembers` walks
   * a retired cast's members and, per member, reads `pAllMemNumList[name]` and
   * may `deleteProp` it. That list holds every member name in the movie — 5,156
   * entries. Each delete invalidated, and the very next lookup rebuilt, so one
   * cast cost roughly members x 2 x 5,156 lowercase allocations:
   *
   *     CMgrResource.unregisterMembers    8 calls   9,331 ms self   (1.17 s each)
   *
   * reached through `CAvatarClothAssetManager._CastLoadCallback` ->
   * `RemoveCastLib` -> `ResetOneDynamicCast`, once per clothing cast. Those eight
   * calls WERE the room-load stall: eight ~1.3 s freezes of the main thread,
   * 11 s in total, during which the frame pump and every `setInterval` stopped.
   * That is why the sound tracker's clock ran ~10 s behind the wall clock for
   * the rest of the session and every cue "came in late", and why the avatar's
   * load-in animation looked frozen then jerky.
   *
   * ⚠ Director does not have this problem, and VMK's own Lingo says why:
   * `construct` calls `pAllMemNumList.sort()`, and a SORTED Director list is
   * looked up by binary search. The list being hot is not an accident — it is
   * the one VMK deliberately sorted.
   *
   * Repairing costs one integer walk of the map, with no string work at all.
   */
  private removeKeyFromIndex(key: LingoValue, position: number): void {
    if (this.keyIndex === null) return;
    // With duplicate keys the removed entry may be shadowing a sibling that
    // should now answer for it; finding that is a scan, so drop the index.
    const hash = this.hasDuplicateKeys ? null : LingoPropList.hashKey(key);
    if (hash === null) {
      this.keyIndex = null;
      return;
    }
    this.keyIndex.delete(hash);
    for (const [other, at] of this.keyIndex) {
      if (at > position) this.keyIndex.set(other, at - 1);
    }
  }

  private buildIndex(): void {
    const map = new Map<string, number>();
    this.hasDuplicateKeys = false;
    for (let i = 0; i < this.keys.length; i++) {
      const hash = LingoPropList.hashKey(this.keys[i]);
      if (hash === null) {
        // One unhashable key and the whole list has to keep scanning, or a
        // numeric key would stop matching its string spelling.
        this.hashable = false;
        this.keyIndex = null;
        return;
      }
      // FIRST occurrence wins, matching what `findIndex` returned.
      if (map.has(hash)) this.hasDuplicateKeys = true;
      else map.set(hash, i);
    }
    this.keyIndex = map;
  }

  private indexOfKey(key: LingoValue): number {
    if (this.hashable) {
      const hash = LingoPropList.hashKey(key);
      if (hash !== null) {
        if (this.keyIndex === null) this.buildIndex();
        if (this.keyIndex !== null) {
          const at = this.keyIndex.get(hash);
          return at === undefined ? -1 : at;
        }
      }
    }
    return this.keys.findIndex((candidate) => LingoPropList.keyEquals(candidate, key));
  }

  getProp(key: LingoValue): LingoValue {
    const index = this.indexOfKey(key);
    return index < 0 ? VOID : this.values[index];
  }

  /**
   * `getProp(name)`, then `getProp(symbol(name))` — the proxy's `list.name`
   * read, which accepts either spelling of the key.
   *
   * On an indexed list the second lookup cannot find anything the first
   * missed: `hashKey` drops the `#` and lowercases, so both spellings hash to
   * the same slot. Skipping it saves building the symbol string and hashing it
   * again on every miss — and the proxy misses constantly, since
   * `node._type` tries `_type` both ways before the bare `type`. Unindexed
   * lists (a non-string key) still compare both spellings.
   */
  getPropByName(name: string): LingoValue {
    const direct = this.getProp(name);
    if (direct !== VOID) return direct;
    return this.getPropAsSymbol(name);
  }

  /** The `symbol(name)` half of `getPropByName`, for a caller that already missed on `name`. */
  getPropAsSymbol(name: string): LingoValue {
    // `hashable` still true after a string lookup means the index answered it.
    if (this.hashable && this.keyIndex !== null) return VOID;
    return this.getProp(symbol(name));
  }

  setProp(key: LingoValue, value: LingoValue): void {
    const index = this.indexOfKey(key);
    if (index < 0 && this.sorted) {
      this.insertSorted(key, value);
    } else if (index < 0) {
      // An append can extend the index in place rather than discard it — that
      // is the whole point, since appending is what filling a list does.
      const hash = LingoPropList.hashKey(key);
      if (hash === null) {
        this.hashable = false;
        this.keyIndex = null;
      } else if (this.keyIndex !== null) {
        this.keyIndex.set(hash, this.keys.length);
      }
      this.keys.push(key);
      this.values.push(value);
    } else {
      this.values[index] = value;
    }
  }

  /**
   * Lingo prop lists can be sorted by key; several managers rely on it.
   *
   * ⚠ A SORTED LIST STAYS SORTED. Director marks the list, and every later
   * `addProp`/`setaProp` of a new key INSERTS in key order instead of
   * appending. The minigame engine depends on it: `CGameComponent` sorts
   * `m_mp_objects` once (on its first object) and then `addProp`s every object
   * by ref, so `repeat with tObject in m_mp_objects` moves objects in REF
   * order — the order the server's lockstep simulation must match, because a
   * ship collides against the others' positions as of that moment. Appending
   * moved them in arrival order instead.
   */
  private sorted = false;

  sort(): void {
    const order = this.keys.map((_, index) => index);
    order.sort((a, b) => compare(this.keys[a], this.keys[b]));
    const sortedKeys = order.map((index) => this.keys[index]);
    const sortedValues = order.map((index) => this.values[index]);
    this.keys.length = 0;
    this.values.length = 0;
    this.keys.push(...sortedKeys);
    this.values.push(...sortedValues);
    this.invalidateIndex();
    this.sorted = true;
  }

  /** Insert into a sorted list after any equal keys. */
  private insertSorted(key: LingoValue, value: LingoValue): void {
    let lo = 0;
    let hi = this.keys.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (compare(this.keys[mid], key) <= 0) lo = mid + 1;
      else hi = mid;
    }
    this.keys.splice(lo, 0, key);
    this.values.splice(lo, 0, value);
    this.insertKeyIntoIndex(key, lo);
  }

  /**
   * ⚠ A SORTED INSERT MUST NOT THROW THE INDEX AWAY either — the same trap as
   * `removeKeyFromIndex`, from the other side. Invalidating here made filling a
   * sorted list quadratic in lowercased strings: every insert dropped the index
   * and the very next lookup rehashed every key.
   *
   * VMK fills two sorted lists hard on the login path:
   *
   *   CWordTree.AppendWords        the chat dictionary is a trie of sorted prop
   *                                lists, `sort()`ed empty and then filled one
   *                                `getaProp` + `setaProp` per character
   *   CMgrResource.preIndexMembers `pAllMemNumList`, sorted, one insert per
   *                                member name — 5,000+ of them
   *
   * Shifting the positions at or after the insertion point is one integer walk
   * of the map, with no string work at all.
   */
  private insertKeyIntoIndex(key: LingoValue, position: number): void {
    if (this.keyIndex === null) return;
    const hash = LingoPropList.hashKey(key);
    if (hash === null) {
      this.hashable = false;
      this.keyIndex = null;
      return;
    }
    for (const [other, at] of this.keyIndex) {
      if (at >= position) this.keyIndex.set(other, at + 1);
    }
    const existing = this.keyIndex.get(hash);
    if (existing !== undefined) {
      // FIRST occurrence wins, as in `buildIndex`: the new key takes over only
      // if it landed in front of its twin.
      this.hasDuplicateKeys = true;
      if (position < existing) this.keyIndex.set(hash, position);
    } else {
      this.keyIndex.set(hash, position);
    }
  }

  /**
   * `addProp` ALWAYS APPENDS — Lingo prop lists allow DUPLICATE KEYS.
   *
   * ⚠ This is the difference between `addProp` and `setaProp`, and delegating
   * one to the other silently discards siblings. `CCoreXMLParser.ParseXML`
   * files every child under the node's ID attribute:
   *
   *     addProp(t_rNode.child, t_sID, t_rTemp)
   *
   * and most VMK elements have no ID, so `t_sID` is EMPTY for all of them.
   * Overwriting meant a node kept only its LAST child under the key "".
   *
   * ⚠ THIS IS WHY NO ROOM WOULD BUILD. `room.classes.xml` declares four
   * `<TAG>` elements — ROOM, NODE, ELEMS, LINKS — and `LoadTagDef` walked
   * `child[1..count]` to fill the factory's tag map. `count` was 1 and only
   * LINKS survived, so the ROOM tag had no class mapping, `_BuildObj` fell
   * through to its `class: ""` default, skipped the
   * `CRoomRoot -> CRoomObject -> CRoomContext` chaining entirely, and returned
   * the bare prototype. `_PrepareRoom` then died on
   * "Lingo method not found: _IndexObjects on [CCoreXMLTreeRealize -> CObject]"
   * — never reaching the `send("start")` that asks the server for the room's
   * avatars and elements.
   *
   * It stayed invisible until now because nearly every other document in the
   * game has a single child per node.
   *
   * `getProp` keeps returning the FIRST match, which is Director's behaviour,
   * so the key index must not be repointed at the duplicate.
   */
  addProp(key: LingoValue, value: LingoValue): void {
    if (this.sorted) {
      this.insertSorted(key, value);
      return;
    }
    const hash = LingoPropList.hashKey(key);
    if (hash === null) {
      this.hashable = false;
      this.keyIndex = null;
    } else if (this.keyIndex !== null) {
      // A second key with the same hash makes removal ambiguous — record it so
      // `removeKeyFromIndex` knows it cannot repair the index in place.
      if (this.keyIndex.has(hash)) this.hasDuplicateKeys = true;
      else this.keyIndex.set(hash, this.keys.length);
    }
    this.keys.push(key);
    this.values.push(value);
  }

  /** Director spells the setter `setaProp` too; both reach the same slot. */
  setaProp(key: LingoValue, value: LingoValue): void {
    this.setProp(key, value);
  }

  /**
   * Position of a KEY, 1-based — and VOID when absent, NOT 0.
   *
   * ⚠ This is where a property list differs from a linear list (which does
   * answer 0; see `LingoList.findPos`). LibreShockwave's
   * `PropListMethodDispatcher` and DirPlayer's `prop_list.rs` both return VOID,
   * and VMK leans on it as its "not added yet" test:
   *
   *   t_iPos = m_ar_BodyPartObjects.findPos(tPart)
   *   if voidp(t_iPos) then ...create the part...
   *   else tTempPartObj = m_ar_BodyPartObjects[t_iPos]
   *
   * (`CProjectionImage.CreateFigure`). Answering 0 took the else branch for
   * every part, read `[0]` = VOID and threw "method call on VOID: Define" — the
   * Steamboat stage never projected anyone. Code that compares the result with
   * 0 is unaffected: `VOID = 0` is TRUE and `VOID > 0` false, as in Director.
   */
  findPos(key: LingoValue): number | typeof VOID {
    const index = this.indexOfKey(key);
    return index < 0 ? VOID : index + 1;
  }

  /** Position of a VALUE, 1-based, 0 when absent. */
  getPos(value: LingoValue): number {
    return this.values.findIndex((item) => looseEquals(item, value)) + 1;
  }

  /**
   * ⚠ ON A PROPERTY LIST, `getOne` ANSWERS THE KEY — NOT THE POSITION.
   *
   * That is the whole difference from `getPos`, and Director is explicit about
   * it: `getOne(propList, value)` returns the PROPERTY under which the value is
   * filed. Returning a position made every caller that feeds the result
   * straight back into `deleteProp` a silent no-op, because `deleteProp` looks
   * the argument up as a KEY and a number matches nothing.
   *
   * ⚠ THIS IS WHY THE NAVIGATOR'S LAND LABELS CAME BACK AS SOLID BLOCKS.
   * `CWindow.unmerge` tears the previous page down with
   *
   *     repeat with tItem in tGroupData[#items]
   *       pElemList.deleteProp(pElemList.getOne(tItem))
   *
   * so nothing was ever removed. `NavigatorInterface_Class.RefreshContent`
   * unmerges and re-merges on every tab switch, the surviving ids collided, and
   * the new copies were filed as `nav.<land>.active1`. RefreshContent then ends
   * by hiding each highlighter by its authored name —
   * `nav.<land>.active` — so the `…active1` twin was never hidden and its
   * `highlight_<land>` art sat on the map as an opaque plaque. Hovering only
   * SEEMED to repair it: the hover arm sets ink 33 first, and an additive blit
   * of that art reads as a highlight rather than a block.
   *
   * The same no-op left the page's sprites and members un-released, which is
   * the other half of the "Attempting to release free sprite!" noise.
   *
   * 0 for "not found", matching the linear-list convention above — VMK tests
   * the result against 0.
   */
  getOne(value: LingoValue): LingoValue {
    const index = this.values.findIndex((item) => looseEquals(item, value));
    return index < 0 ? 0 : this.keys[index]!;
  }

  /**
   * `duplicate()` — DEEP, for the reason spelled out on `LingoList.duplicate`.
   *
   * ⚠ IT MUST APPEND, NOT `setProp`. Duplicate keys are legal in a Lingo prop
   * list (see `addProp`), so rebuilding the copy key-by-key COLLAPSES every
   * repeated key down to one entry — a copy shorter than its original.
   *
   * ⚠ THIS IS WHY ROOMS HAD ALMOST NO TILES. `CCoreXMLParser.ParseXML` files
   * each child under its ID attribute, and `CCoreXMLDoc.copy` clones a node
   * with `duplicate`:
   *
   *     addProp(m_rRef.child, getaProp(t_rSrc.param, "ID"), duplicate(t_rSrc))
   *
   * Room tiles carry no ID, so all of them sit under the same empty key. Main
   * Street's floor has 451 children — 79 exits, each with a distinct ID, and
   * 372 `CLASS="tile"` nodes sharing one. The copy came back with 80: every
   * exit, and a single tile. `CCoreXMLTreeFactory._BuildObj` then built objects
   * only for what survived, so `CRoomContext`'s tile index held the 79 exits
   * (which `_RecursiveListing` re-classes to "tile") and nothing else.
   *
   * The visible symptom was the avatar: the server names a spawn tile out of
   * the full 1820-tile geometry, the client could not find it
   * ("Referred tile not found: 17"), and the avatar fell back to the wrong
   * tile. Walking, seating and exits were all working off the same 80 nodes.
   */
  duplicate(): LingoPropList {
    const copy = new LingoPropList();
    for (let i = 0; i < this.keys.length; i++) {
      copy.addProp(this.keys[i], deepCopy(this.values[i]));
    }
    return copy;
  }

  deleteAt(index: number): void {
    if (index < 1 || index > this.keys.length) return;
    const key = this.keys[index - 1];
    this.keys.splice(index - 1, 1);
    this.values.splice(index - 1, 1);
    // Every position after the hole shifted down — repaired, not discarded, for
    // the reason spelled out on `removeKeyFromIndex`.
    this.removeKeyFromIndex(key, index - 1);
  }

  setAt(index: number, value: LingoValue): void {
    if (index >= 1 && index <= this.values.length) this.values[index - 1] = value;
  }

  /**
   * `propList.deleteAll()` — empty it in place, keeping the same object.
   *
   * ⚠ Missing until a numeric-keyed list actually held something. While
   * `propList["330"] = …` was silently dropped (see the container proxy's `set`),
   * the lists this is called on were always empty and nothing ever reached the
   * call; fixing the write surfaced it immediately as a boot-stopping
   * "Lingo method not found: deleteAll on propList".
   */
  deleteAll(): void {
    this.keys.length = 0;
    this.values.length = 0;
    this.invalidateIndex();
  }

  /**
   * `repeat with x in propList` iterates VALUES, not keys — the emitter renders
   * it as `.toArray()`. Returning keys here would silently iterate the wrong
   * thing everywhere the pattern appears.
   */
  toArray(): LingoValue[] {
    return [...this.values];
  }

  /** Director spells it `getaProp`; kept as an alias so `callMethod` finds it. */
  getaProp(key: LingoValue): LingoValue {
    return this.getProp(key);
  }

  getPropAt(index: number): LingoValue {
    return this.keys[index - 1];
  }

  /**
   * `getLast(propList)` — the last VALUE, not the last key.
   * `CMgrCastload.getAvailableEmptyCast` pops the pool with
   * `getLast` + `deleteAt`, and it wants the cast NUMBER that the slot name maps
   * to.
   */
  getLast(): LingoValue {
    return this.values[this.values.length - 1];
  }

  getAt(index: number): LingoValue {
    return this.values[index - 1];
  }

  deleteProp(key: LingoValue): void {
    const index = this.indexOfKey(key);
    if (index < 0) return;
    this.keys.splice(index, 1);
    this.values.splice(index, 1);
    this.removeKeyFromIndex(key, index);
  }

  /**
   * `deleteOne(list, value)` — remove the first entry whose VALUE matches.
   *
   * ⚠ DIRECTOR DEFINES THIS FOR PROPERTY LISTS TOO, not just linear ones, and
   * it deletes by value while `deleteProp` deletes by key. Only `LingoList` had
   * it, so a `deleteOne` against a prop list raised
   *
   *     Uncaught Error: Lingo method not found: deleteOne on propList
   *
   * UNCAUGHT — which aborts whatever was mid-execution rather than degrading.
   * MEASURED in a live session: the room still rendered and the UI still drew,
   * but clicking sent NOTHING (`mus` frames frozen at 43 across a click), so it
   * read as "the session timed out" when the socket was never the problem.
   *
   * Matching uses the same `memberEquals` as the linear list, so the two agree
   * on Director's case-insensitive string/symbol equality — see the note there
   * about `getOne(list, "TAIL")` finding `#tail`.
   *
   * Returns the 1-based position removed, 0 for no match, exactly like
   * `LingoList.deleteOne` — VMK tests the result against 0.
   */
  deleteOne(value: LingoValue): number {
    const index = this.values.findIndex((item) => LingoList.memberEquals(item, value));
    if (index < 0) return 0;
    const key = this.keys[index];
    this.keys.splice(index, 1);
    this.values.splice(index, 1);
    this.removeKeyFromIndex(key, index);
    return index + 1;
  }
}

// Read off fresh instances rather than listed by hand, so a field added to
// either class is covered. A proxy without an `ownKeys` trap reports its
// target's own names.
for (const sample of [new LingoList(), new LingoPropList()]) {
  for (const name of Object.getOwnPropertyNames(sample)) CONTAINER_FIELDS.add(name);
}

// ---------------------------------------------------------------------------
// Coercion and truth
// ---------------------------------------------------------------------------

/**
 * ⚠ A BOXED `String` IS A STRING — unwrap before any coercion.
 *
 * `member.char[n]` answers a boxed String so the character can carry a `color`
 * setter (see `CastMember.char`). Everything downstream must keep treating it as
 * its own character: `typeof` says "object", so without this every comparison,
 * concatenation and numeric read would take the object path instead.
 */
function unboxString(value: LingoValue): LingoValue {
  return value instanceof String ? value.valueOf() : value;
}

function toNumber(input: LingoValue): number {
  const value = unboxString(input);
  if (typeof value === "number") return value;
  if (isFloatBox(value)) return value.value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

/**
 * `the floatPrecision` — the number of decimals a FLOAT shows when it turns
 * into a string. Director's default is 4, so `put string(1.45)` is "1.4500".
 *
 * ⚠ This is load-bearing, not cosmetic. `CSoundTracker.TrackerEvent` matches
 * the playhead against the cue table BY STRING:
 *
 *     set the floatPrecision to 1
 *     m_CurrentTime = m_CurrentTime + 1.44999992847443
 *     t_iPos = m_mpSoundData.findPos(string(m_CurrentTime))
 *
 * The keys come from the room's Tracker.xml START attributes and look like
 * "0.1", "1.0", "20.5" — exactly floatPrecision-1 output. Without this, the
 * lookup asks for "34.79999828338632", never matches a key, and the room plays
 * in silence with a fully parsed and correctly ticking tracker. `setLoopFrequent`
 * builds its keys the same way, so loops died with it.
 */
let floatPrecision = 4;

export function theFloatPrecision(): number {
  return floatPrecision;
}

export function setFloatPrecision(value: LingoValue): void {
  const n = Math.trunc(toNumber(value));
  floatPrecision = Number.isFinite(n) ? Math.max(0, Math.min(15, n)) : 4;
}

/** Format a float the way Director's `string()` and `&` do. */
export function formatLingoFloat(value: number): string {
  return value.toFixed(floatPrecision);
}

/**
 * Format a number that may be either of Lingo's two numeric types.
 *
 * ⚠ Only floats honour `the floatPrecision`; integers print bare. A JS number
 * carries no such tag, so an integral one is read as Lingo's integer — the same
 * call that keeps `string(451)` from becoming "451.0000". A float that lands on
 * a whole value is the one case this cannot represent; `LingoFloat` exists for
 * the places where the distinction was worth keeping, and it routes to
 * `formatLingoFloat` unconditionally.
 */
export function formatLingoNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : formatLingoFloat(value);
}

/**
 * ⚠ STRING OPERATORS MUST NOT STRIP A LEADING `#`.
 *
 * `toStringValue` removes a leading `#` because a symbol is interned as its
 * "#name" string and `string(#image)` is "image" (see below). But `starts` and
 * `contains` are STRING operators, and a literal `"#"` in the Lingo source is
 * the character, not a symbol — `CCoreXMLParser._DTD_ParseAttributes` recognises
 * DTD keywords with `t_sData starts "#"`. Passed through `toStringValue`, that
 * `"#"` became `""`, so `starts`/`contains` matched EVERY string: every DTD
 * attribute default (`SPR BLD "100"`, `ITEM TILESIZE "32"`, …) was misread as a
 * `#REQUIRED`/`#IMPLIED` keyword and its value dropped, so `_XML_ValidateNode`
 * filled nodes with `""` — furniture thumbnails composited nothing (BLD 0) and
 * came up blank/black. Comparing the raw string keeps the `#` where it belongs.
 */
function toComparableString(input: LingoValue): string {
  const value = unboxString(input);
  return typeof value === "string" ? value : toStringValue(value);
}

function toStringValue(input: LingoValue): string {
  const value = unboxString(input);
  if (value === VOID) return "";
  /**
   * ⚠ A Lingo class may define a handler literally named `toString`, and
   * `CCoreXMLTreeRealize` does. That shadows `Object.prototype.toString`, so a
   * plain `String(instance)` anywhere in the runtime invokes VMK's handler with
   * NO receiver — `_me` arrives undefined and it dies reading a property of it.
   *
   * Dispatching properly is also what Director does: `string(obj)` calls the
   * object's own `toString`, passing the instance.
   */
  if (value !== null && typeof value === "object" && "__lingoClass" in (value as LingoObject)) {
    const own = (value as LingoObject).toString;
    if (typeof own === "function" && own !== Object.prototype.toString) {
      return String(callMethod("toString", value));
    }
    /**
     * ⚠ NO `toString` HANDLER: Director's `<offspring "Class" 2 3ab4>`, not
     * "[object Object]". Every instance inherits `Object.prototype.toString`, so
     * the branch above used to fire for ALL of them and return "[object Object]".
     *
     * That collapsed per-instance keys: `CRoomVisualBlock.CreateHighlighter`
     * names its member `"HighlighterFor" & this`, so every block's highlighter
     * shared ONE name, `member(name)` resolved to the lowest-numbered one, and a
     * multi-tile item's blocks all drew the SAME image (one of them stretched).
     */
    const described = (value as { _string?: unknown })._string;
    if (typeof described === "string") return described;
  }
  if (typeof value === "string") {
    // ⚠ A symbol stringifies WITHOUT its sigil: in Lingo `string(#image)` is
    // "image" and `"window." & #image` is "window.image". Symbols are interned
    // as "#name" here, so the sigil has to come off on conversion — otherwise
    // `CreateElement`, which builds its registry key by concatenating type and
    // model, looks up "window.text#image.class" and never finds it.
    return value.startsWith("#") ? value.slice(1) : value;
  }
  if (isFloatBox(value)) return formatLingoFloat(value.value);
  if (typeof value === "number") return formatLingoNumber(value);
  if (typeof value === "boolean") return value ? "1" : "0";
  return String(value);
}

/**
 * A Lingo FLOAT whose value happens to be whole, e.g. `1.0`.
 *
 * ⚠ Lingo divides two INTEGERS with integer division, and VMK forces float
 * division by multiplying by `1.0` first:
 *
 *   tTemp = 1.0 * (pTempPercent + pLoadedSoFar) / pCastcount
 *
 * JavaScript cannot tell `1.0` from `1`, so that idiom collapsed: the runtime
 * saw two integers and truncated `22 / 37` to **0**. That is why the loading bar
 * never moved — `CCastLoadTask.UpdateTaskPercent` committed a percentage of
 * zero on every frame, having computed the right numbers to divide.
 *
 * Boxing keeps the distinction that the JS number lost. It is deliberately
 * narrow: `valueOf`/`toString` make it behave like its number nearly
 * everywhere, `toNumber` unwraps it, and the arithmetic below propagates it so
 * `float * int` stays a float exactly as Director does.
 */
export class LingoFloat {
  constructor(readonly value: number) {}
  valueOf(): number {
    return this.value;
  }
  toString(): string {
    return String(this.value);
  }
}

function isFloatBox(value: unknown): value is LingoFloat {
  return value instanceof LingoFloat;
}

/** Result of an arithmetic op: a float if either side was one, as in Lingo. */
function arithmetic(left: LingoValue, right: LingoValue, result: number): LingoValue {
  return isFloatBox(left) || isFloatBox(right)
    ? (new LingoFloat(result) as unknown as LingoValue)
    : result;
}

function isIntegerValue(value: LingoValue): boolean {
  if (isFloatBox(value)) return false;
  return typeof value === "number" && Number.isInteger(value);
}

/** Lingo truth: 0 and VOID are false, every other number is true. */
export function lingoTruthy(value: LingoValue): boolean {
  if (value === VOID) return false;
  if (isFloatBox(value)) return value.value !== 0;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") return value !== "" && value !== "0";
  return true;
}

/** Lingo `=` — numbers numerically, strings case-insensitively. */
function looseEquals(leftInput: LingoValue, rightInput: LingoValue): boolean {
  // A styled character compares as its character — see `unboxString`.
  const left = unboxString(leftInput);
  const right = unboxString(rightInput);
  // A boxed float compares as its number — `pPercent = 0.0` against 0 is true.
  if (isFloatBox(left) || isFloatBox(right)) {
    const other = isFloatBox(left) ? right : left;
    if (other === VOID || typeof other === "object") return false;
    return toNumber(left) === toNumber(right);
  }
  if (typeof left === "string" && typeof right === "string") {
    return left.toLowerCase() === right.toLowerCase();
  }

  /**
   * ⚠ A COLOUR, POINT OR RECT COMPARES BY VALUE, not by identity.
   *
   * Director's `rgb(255,255,255) = rgb(255,255,255)` is TRUE; two freshly built
   * colours are the same colour. Comparing by object identity made every such
   * test false, and VMK uses exactly this shape to decide whether a text
   * element needs an opaque backdrop:
   *
   *   if pFontData[#bgColor] <> rgb(255,255,255) then pNeedFill = 1
   *
   * (`CWindowTextWrapper.createImgFromTxt`). White never equalled white, so
   * EVERY text element painted a filled rectangle behind itself — three of them
   * sat as white slabs across the custom loading screen's artwork, and the same
   * went for captions everywhere else.
   *
   * `components()` already knows the field order for these value types, so the
   * comparison stays structural rather than special-casing each class.
   */
  const leftParts = valueFields(left);
  const rightParts = valueFields(right);
  if (leftParts && rightParts) {
    if (leftParts.join() !== rightParts.join()) return false;
    const a = left as unknown as Record<string, unknown>;
    const b = right as unknown as Record<string, unknown>;
    return leftParts.every((field) => a[field] === b[field]);
  }

  /**
   * ⚠ A LIST COMPARES BY VALUE, not by identity — `[] = []` is TRUE in Director,
   * and so is `[1, 2] = [1, 2]`.
   *
   * MEASURED on room ambience. `CSoundTracker.TrackerEvent` decides how to start
   * a cue by asking whether the channel is already busy:
   *
   *     if sound(t_iChannel).getPlaylist() <> [] then   -- stop, replace, play
   *     else                                            -- queue, play
   *
   * An idle channel answers `[]`, so the else arm is the one that starts a
   * room's sounds. Comparing by identity made `<> []` true for every channel,
   * including empty ones, so the tracker always took the "already playing"
   * branch: it called `stop()` on a silent channel and then `setPlayList` with a
   * single property list where Director wants a list of them. Nothing ever
   * played, on any channel, in any room.
   *
   * Recursive, because Director's is: a list of lists compares element-wise.
   */
  if (left instanceof LingoList && right instanceof LingoList) {
    if (left.count !== right.count) return false;
    for (let i = 1; i <= left.count; i += 1) {
      if (!looseEquals(left.getAt(i), right.getAt(i))) return false;
    }
    return true;
  }
  if (left instanceof LingoPropList && right instanceof LingoPropList) {
    if (left.count !== right.count) return false;
    for (let i = 1; i <= left.count; i += 1) {
      if (!looseEquals(left.getPropAt(i), right.getPropAt(i))) return false;
      if (!looseEquals(left.getAt(i), right.getAt(i))) return false;
    }
    return true;
  }

  /**
   * ⚠ An OBJECT IS NEVER EQUAL TO A NUMBER.
   *
   * `toNumber` answers 0 for anything it cannot read as a number, so an object
   * compared against 0 used to come out EQUAL — and `if tObject = 0 then error`
   * is how VMK asks "did that lookup find anything?" everywhere. Every
   * successful `getObject` was therefore reported as a miss: all 19
   * `registerListener` calls of the boot failed with "Object not found" for
   * objects that were sitting in the object manager the whole time.
   *
   * It fails in the most misleading possible direction, because the guard's
   * error message names the id it just found, so the object looks absent.
   *
   * ⚠ Only against a NUMBER. VOID is `undefined`, not an object, so `VOID = 0`
   * keeps answering as before — that is a separate question from this one.
   */
  const leftIsObject = left !== null && typeof left === "object";
  const rightIsObject = right !== null && typeof right === "object";
  if (leftIsObject !== rightIsObject) {
    if (typeof left === "number" || typeof right === "number") return false;
  }

  /**
   * ⚠ A NON-NUMERIC STRING IS NEVER EQUAL TO A NUMBER, for the same reason.
   *
   * `toNumber` answers 0 for a string it cannot parse, so `"http://…" = 0` came
   * out true — and VMK writes `if tURL = 0` to mean "the variable was not set",
   * because `getVariable` answers integer 0 on a miss. `Core Thread
   * Class.updateState`'s `load_texts` case therefore skipped straight to
   * `load_casts` on a URL that was present and correct, `external_texts.txt` was
   * never downloaded, `session.ExternalTexts` stayed 0, and `CMainHandler.
   * OpenConnection` refused to connect and tried to raise a dictionary-error
   * dialog instead. A boot that looked like it had simply never reached the
   * login screen.
   *
   * A string that DOES parse still compares numerically, which is what keeps
   * `getVariable` results usable as numbers everywhere else.
   */
  if (typeof left === "string" && typeof right === "number") {
    return numericValue(left) === right;
  }
  if (typeof left === "number" && typeof right === "string") {
    return left === numericValue(right);
  }

  /**
   * ⚠ `VOID = 0` STAYS TRUE. Tried making VOID equal only to VOID — DirPlayer's
   * `(Void|Null, x)` arm — and it broke the registration name list: the five
   * components were still built and positioned, but the list rendered EMPTY.
   * Too much of the drawing code reads an unset property and compares it to 0.
   * DirPlayer's `(Int(i), other) => Void => *i == 0` is the behaviour to keep.
   *
   * The keyboard routing this was meant to unblock is handled in `call()`
   * instead — see the no-responder note there.
   */
  if (typeof left === "number" || typeof right === "number") {
    return toNumber(left) === toNumber(right);
  }
  return left === right;
}

/** A string's numeric value, or NaN when it is not a number at all. */
function numericValue(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") return Number.NaN;
  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? Number.NaN : parsed;
}

// ---------------------------------------------------------------------------
// Operators
// ---------------------------------------------------------------------------

export type LingoBinaryOp =
  | "add" | "sub" | "mul" | "div" | "mod"
  | "eq" | "neq" | "lt" | "lte" | "gt" | "gte"
  | "and" | "or" | "contains" | "starts" | "join" | "joinPad";

/**
 * ⚠ `div` is integer division when BOTH operands are integers — `3 / 2` is 1 in
 * Lingo, not 1.5. Getting this wrong is silent and corrupts arithmetic
 * everywhere; the emitter relies on us to model it.
 *
 * Comparisons return 1/0 rather than true/false, because transpiled code feeds
 * them straight back into arithmetic (`t_iLen + 1 + (t_iNum > 255)` is real
 * code from CConnection::send).
 */
/**
 * The component fields of a point, rect or list — in Director's index order.
 *
 * Structural rather than `instanceof`, because `LingoPoint`/`LingoRect` live in
 * `lingo-builtins.ts`, which imports this module.
 */
/**
 * The fields that make a Director VALUE type equal to another of its kind.
 *
 * ⚠ Separate from `components()` on purpose. That one drives element-wise
 * ARITHMETIC and deliberately covers only points and rects; colours are
 * compared but never added, and widening it would quietly turn
 * `colour + colour` into a vector operation.
 */
function valueFields(value: LingoValue): string[] | null {
  if (value === VOID || typeof value !== "object" || value === null) return null;
  const o = value as Record<string, unknown>;
  if (
    typeof o.red === "number" && typeof o.green === "number" && typeof o.blue === "number"
  ) {
    return ["red", "green", "blue"];
  }
  return components(value);
}

/** A Director vector — `x`/`y`/`z` and nothing else. See the `mul` note. */
function isVector(value: LingoValue): boolean {
  if (value === VOID || typeof value !== "object" || value === null) return false;
  const o = value as Record<string, unknown>;
  return typeof o.x === "number" && typeof o.y === "number" && typeof o.z === "number";
}

function components(value: LingoValue): string[] | null {
  if (value === VOID || typeof value !== "object" || value === null) return null;
  const o = value as Record<string, unknown>;
  /**
   * ⚠ A FIELD MAY HOLD A `LingoFloat`, not a bare number — whatever float
   * arithmetic last wrote it. Requiring `typeof === "number"` made such a
   * vector fall through to `toNumber(object)` = 0, so the Jungle Cruise boat
   * (its bounding circle's `origin`, built from `velocity * drag + force`)
   * computed `origin - ownerAbsPos` as vector(0,0,0) every frame: the boat
   * moved in the physics but was drawn pinned to the view centre, and the
   * dock pickup (a screen-distance test) could never fire.
   */
  const num = (v: unknown): boolean => typeof v === "number" || isFloatBox(v as LingoValue);
  if (num(o.locH) && num(o.locV)) return ["locH", "locV"];
  if (num(o.left) && num(o.top) && num(o.right) && num(o.bottom)) {
    return ["left", "top", "right", "bottom"];
  }
  /**
   * ⚠ VECTORS TOO — AND THIS IS THE WHOLE ROOM LAYOUT.
   *
   * The same failure the note above records for points, one type later.
   * `CRoomAnchor.GetAbsPos` is
   *
   *     GetAbsPos(GetOwner(this)) + GetRelPos(this)
   *
   * so with vectors falling through to `toNumber` — which is 0 for an object —
   * every anchor's absolute position was 0, and `GetScrPos` projected that 0
   * and added the room's view centre. MEASURED in Main Street: every static
   * prop at `loc [400, 300]` with `locZ -5000000`, which is exactly
   * `m_veViewCenter`. The layout that showed on screen was not a layout at all,
   * it was each member's registration point subtracting off one shared point.
   *
   * `GetRelPos` was returning perfectly good vectors the whole time — (-302,14,0),
   * (-252,62,72) — which is why this looked like a room-geometry bug for so
   * long. It was two lines below that.
   */
  if (num(o.x) && num(o.y) && num(o.z)) {
    return ["x", "y", "z"];
  }
  return null;
}

/**
 * ⚠ Director's arithmetic operators are element-wise over points, rects and
 * lists: `the loc of sprite + [dx, dy]` is how VMK moves everything it draws,
 * and `rect(0,0,w,h) + [-28,-28,28,28]` is how it insets a boundary.
 *
 * Treating those as scalars did not fail — `toNumber` of an object is 0, so
 * every such expression evaluated to 0. Sprites all took position (0,0) and the
 * entire window drew stacked at the stage origin, correctly sized and laid out.
 *
 * Returns null when neither side is a compound value, so the caller falls back
 * to ordinary numeric arithmetic.
 */
function elementWise(
  left: LingoValue,
  right: LingoValue,
  combine: (a: number, b: number) => number,
): LingoValue | null {
  const leftFields = components(left);
  const rightFields = components(right);
  const leftList = left instanceof LingoList ? left.items : null;
  const rightList = right instanceof LingoList ? right.items : null;
  if (!leftFields && !rightFields && !leftList && !rightList) return null;

  // Reading the operands by position lets a point meet a 2-item list, and a
  // rect meet a 4-item list — both of which VMK relies on.
  const at = (
    value: LingoValue,
    fields: string[] | null,
    list: LingoValue[] | null,
    index: number,
  ): number => {
    if (fields) return toNumber((value as Record<string, LingoValue>)[fields[index]]);
    if (list) return toNumber(list[index]);
    return toNumber(value);
  };

  const size = leftFields?.length ?? leftList?.length ?? rightFields?.length ?? rightList?.length ?? 0;
  const values: number[] = [];
  for (let i = 0; i < size; i++) {
    values.push(combine(at(left, leftFields, leftList, i), at(right, rightFields, rightList, i)));
  }

  // Preserve the left operand's type: a point plus a list is a point, and code
  // downstream reads `.locH` off the result.
  if (leftFields) {
    const result = Object.create(Object.getPrototypeOf(left as object)) as Record<string, number>;
    leftFields.forEach((field, i) => (result[field] = values[i]));
    return result as unknown as LingoValue;
  }
  if (!leftList && rightFields) {
    const result = Object.create(Object.getPrototypeOf(right as object)) as Record<string, number>;
    rightFields.forEach((field, i) => (result[field] = values[i]));
    return result as unknown as LingoValue;
  }
  return new LingoList(values);
}

export function lingoBinary(op: LingoBinaryOp, left: LingoValue, right: LingoValue): LingoValue {
  switch (op) {
    case "add":
      return elementWise(left, right, (a, b) => a + b)
        ?? arithmetic(left, right, toNumber(left) + toNumber(right));
    case "sub":
      return elementWise(left, right, (a, b) => a - b)
        ?? arithmetic(left, right, toNumber(left) - toNumber(right));
    case "mul": {
      /**
       * ⚠ VECTOR TIMES VECTOR IS THE DOT PRODUCT, not an element-wise multiply.
       * Director scales a vector by a NUMBER and dots it with another VECTOR,
       * and the two return different types — a vector and a float. VMK's
       * projection only ever scales (`t_fX * 10`), so element-wise would look
       * right here and be silently wrong the first time something dots.
       */
      if (isVector(left) && isVector(right)) {
        const a = left as unknown as { x: number; y: number; z: number };
        const b = right as unknown as { x: number; y: number; z: number };
        return new LingoFloat(a.x * b.x + a.y * b.y + a.z * b.z);
      }
      return elementWise(left, right, (a, b) => a * b)
        ?? arithmetic(left, right, toNumber(left) * toNumber(right));
    }
    case "div": {
      const divisor = toNumber(right);
      if (divisor === 0) return 0;
      const quotient = toNumber(left) / divisor;
      // Integer division ONLY when both sides really are integers; a `1.0`
      // anywhere upstream makes this a float divide, which is the whole point
      // of VMK's `1.0 *` idiom.
      return isIntegerValue(left) && isIntegerValue(right)
        ? Math.trunc(quotient)
        : arithmetic(left, right, quotient);
    }
    case "mod": {
      const divisor = toNumber(right);
      return divisor === 0 ? 0 : Math.trunc(toNumber(left)) % Math.trunc(divisor);
    }
    case "eq": return looseEquals(left, right) ? 1 : 0;
    case "neq": return looseEquals(left, right) ? 0 : 1;
    /**
     * ⚠ AN ORDER COMPARISON AGAINST VOID IS FALSE, ALL FOUR WAYS.
     *
     * Equality keeps treating VOID as 0 — that is deliberate and load-bearing,
     * see `looseEquals` — but ORDER is a different question. Coercing VOID to 0
     * made `anything >= VOID` true, which is not a harmless rounding: it is the
     * branch VMK takes when a value has not been set yet.
     *
     * MEASURED on room ambience, which never played. `CSoundTracker.TrackerEvent`
     * advances its clock and then asks
     *
     *     if m_CurrentTime >= m_mpEndTime then ResetTracker(me)
     *
     * and `m_mpEndTime` is legitimately VOID for Main Street — its
     * `main_street_Tracker.xml` is `<CHANNELS>` with per-sound `START` times and
     * carries no top-level `TIME`, so `parseTrackerData` prints its own
     * "EndTime Not Set for sounds!" and CARRIES ON. With `>= VOID` true the
     * tracker reset on every single tick: the timer fired 1,978 times and
     * `m_CurrentTime` was still 0, so no scheduled sound was ever reached.
     *
     * ⚠ THAT VMK SHIPS THAT PATH IS THE PROOF. The real client had working room
     * ambience with the same data, so Director cannot have taken the reset
     * branch — a number is simply not ordered against VOID.
     */
    case "lt":
    case "lte":
    case "gt":
    case "gte": {
      if (left === VOID || right === VOID || left === undefined || right === undefined) return 0;
      const ordering = compare(left, right);
      if (op === "lt") return ordering < 0 ? 1 : 0;
      if (op === "lte") return ordering <= 0 ? 1 : 0;
      if (op === "gt") return ordering > 0 ? 1 : 0;
      return ordering >= 0 ? 1 : 0;
    }
    case "and": return lingoTruthy(left) && lingoTruthy(right) ? 1 : 0;
    case "or": return lingoTruthy(left) || lingoTruthy(right) ? 1 : 0;
    case "contains":
      return toComparableString(left).toLowerCase().includes(toComparableString(right).toLowerCase()) ? 1 : 0;
    /**
     * Lingo's `starts` — prefix test, case-insensitive like every Lingo string
     * comparison. `CCoreXMLParser` uses it to recognise tags, so the client's
     * XML parser cannot run a single document without it.
     */
    case "starts":
      return toComparableString(left).toLowerCase().startsWith(toComparableString(right).toLowerCase())
        ? 1
        : 0;
    case "join": return toStringValue(left) + toStringValue(right);
    case "joinPad": return `${toStringValue(left)} ${toStringValue(right)}`;
    default: {
      const exhaustive: never = op;
      throw new Error(`lingoBinary: unhandled op ${String(exhaustive)}`);
    }
  }
}

function compare(left: LingoValue, right: LingoValue): number {
  if (isFloatBox(left) || isFloatBox(right)) {
    const a = toNumber(left);
    const b = toNumber(right);
    return a < b ? -1 : a > b ? 1 : 0;
  }
  if (typeof left === "string" && typeof right === "string") {
    const a = left.toLowerCase();
    const b = right.toLowerCase();
    return a < b ? -1 : a > b ? 1 : 0;
  }
  const a = toNumber(left);
  const b = toNumber(right);
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Lingo `float()` — and the emitter's rendering of a float LITERAL.
 *
 * Returns a boxed float so integer division does not silently apply; see
 * `LingoFloat`. A bare `1.0` in the generated source is indistinguishable from
 * `1` once JavaScript has parsed it, so those literals are emitted through here.
 */
export function float(value: LingoValue): LingoValue {
  return new LingoFloat(toNumber(value)) as unknown as LingoValue;
}

// ---------------------------------------------------------------------------
// Chunk expressions
// ---------------------------------------------------------------------------

export type ChunkKind = "char" | "word" | "item" | "line";

/** The delimiter for `item` chunks. Lingo exposes it as `the itemDelimiter`. */
let itemDelimiter = ",";

/**
 * Split `text` into chunks, REUSING the last few results.
 *
 * ⚠ THIS MEMO IS A BOOT-TIME FIX, not a micro-optimisation.
 *
 * Lingo indexes chunks as `tStr.item[i]`, and every such access re-split the
 * entire string from scratch. That is quadratic the moment a loop walks a
 * string, and VMK's boot path does exactly that over its biggest inputs:
 *
 *   CMgrVariable.dump       t_iItems = tStr.item.count, then tStr.item[i] for
 *                           each — ~1,700 items over a 57 KB field, so ~97 MB
 *                           of re-splitting for ONE call.  MEASURED: 8,030 ms.
 *   CCoreXMLParser.ParseXML the same shape over each XML document.
 *                           MEASURED: 20,990 ms across 5 calls.
 *
 * Together those two were 29 of the boot's 38 seconds, and they showed up as
 * the main thread simply stopping — an 8.1 s freeze then a 21.1 s freeze, with
 * no frames drawn in between.
 *
 * Strings are immutable, so a split is valid for as long as the string exists;
 * the only thing that can invalidate one is `the itemDelimiter` changing, which
 * is why it is part of the key (`CMgrVariable.dump` flips it to "=" and back on
 * every iteration).
 *
 * ⚠ The returned array is SHARED. Read it, never mutate it — `deleteStringChunk`
 * takes a copy before splicing for exactly this reason.
 *
 * Matched by identity-first comparison rather than hashing: the access pattern
 * is one big string hammered in a loop, so `e.text === text` hits V8's pointer
 * fast path, and differing lengths settle the rest without a scan. A handful of
 * entries covers the nested loops that do this.
 */
const SPLIT_CACHE_MAX = 8;
const splitCache: Array<{ text: string; kind: ChunkKind; delim: string; parts: string[] }> = [];

/** Peek at a cached split without disturbing the ordering. */
function cachedSplit(text: string, kind: ChunkKind): string[] | null {
  const delim = kind === "item" ? itemDelimiter : "";
  for (const entry of splitCache) {
    if (entry.kind === kind && entry.delim === delim && entry.text === text) return entry.parts;
  }
  return null;
}

function isSpaceAt(text: string, at: number): boolean {
  const code = text.charCodeAt(at);
  if (code === 32 || (code >= 9 && code <= 13)) return true;
  return code > 127 && /\s/.test(text.charAt(at));
}

/**
 * The first `count` chunks, scanned rather than split.
 *
 * ⚠ WHY THIS EXISTS: `word 1 of <a 100 KB string>` must not cost 100 KB.
 *
 * `CCoreXMLParser._ListItems` walks a document by consuming it from the front —
 * `t_sDoc = chars(t_sDoc, t_iClose + 1, length(t_sDoc))` — so `t_sDoc` is a NEW
 * string on every iteration and the `splitChunks` memo can never hit. Each
 * iteration then asks `chunkOf(t_sDoc, "word", 1, 0)` merely to test whether the
 * next token starts with "<", and materialising every word of the remaining
 * document to answer that made XML parsing quadratic: MEASURED at 23,482 ms
 * across 5 documents, the single largest cost in the whole boot.
 *
 * Director answers `word 1 of` by scanning to the first delimiter, so this
 * restores its cost model rather than inventing a faster one. Bounded by
 * `PREFIX_SCAN_MAX` so a genuinely large range still takes the split path,
 * where the memo can amortise it.
 */
const PREFIX_SCAN_MAX = 64;

function chunkPrefix(text: string, kind: ChunkKind, count: number): string[] {
  const out: string[] = [];
  const length = text.length;

  if (kind === "char") {
    // Iterated by code point, matching `[...text]`.
    for (const character of text) {
      out.push(character);
      if (out.length >= count) break;
    }
    return out;
  }

  if (kind === "word") {
    let at = 0;
    while (out.length < count) {
      while (at < length && isSpaceAt(text, at)) at++;
      if (at >= length) break;
      const from = at;
      while (at < length && !isSpaceAt(text, at)) at++;
      out.push(text.slice(from, at));
    }
    return out;
  }

  if (kind === "item") {
    const delim = itemDelimiter;
    if (delim === "") return [text];
    let at = 0;
    while (out.length < count) {
      const next = text.indexOf(delim, at);
      if (next < 0) {
        out.push(text.slice(at));
        break;
      }
      out.push(text.slice(at, next));
      at = next + delim.length;
    }
    return out;
  }

  let at = 0;
  while (out.length < count) {
    let breakAt = -1;
    let advance = 1;
    for (let scan = at; scan < length; scan++) {
      const code = text.charCodeAt(scan);
      if (code === 13) {
        breakAt = scan;
        advance = text.charCodeAt(scan + 1) === 10 ? 2 : 1;
        break;
      }
      if (code === 10) {
        breakAt = scan;
        break;
      }
    }
    if (breakAt < 0) {
      out.push(text.slice(at));
      break;
    }
    out.push(text.slice(at, breakAt));
    at = breakAt + advance;
  }
  return out;
}

function splitChunks(text: string, kind: ChunkKind): string[] {
  const delim = kind === "item" ? itemDelimiter : "";
  for (let i = 0; i < splitCache.length; i++) {
    const entry = splitCache[i]!;
    if (entry.kind !== kind || entry.delim !== delim || entry.text !== text) continue;
    // Move to front: the innermost loop's string should stay cheapest to find.
    if (i > 0) splitCache.splice(i, 1), splitCache.unshift(entry);
    return entry.parts;
  }

  const parts =
    kind === "char" ? [...text]
    : kind === "word" ? text.split(/\s+/).filter((part) => part !== "")
    : kind === "item" ? text.split(delim)
    : text.split(/\r\n|\r|\n/);

  splitCache.unshift({ text, kind, delim, parts });
  if (splitCache.length > SPLIT_CACHE_MAX) splitCache.length = SPLIT_CACHE_MAX;
  return parts;
}

/**
 * `char 3 of s`, `line 1 to 4 of s`, … 1-based and inclusive.
 * `end === 0` means "just the one chunk at `start`", which is how the emitter
 * encodes a non-ranged chunk expression.
 */
export function chunkOf(value: LingoValue, kind: ChunkKind, start: number, end: number): string {
  const text = toStringValue(value);
  const from = Math.max(1, start);
  const wanted = end === 0 ? from : end;

  // A short prefix range is scanned, not split — see `chunkPrefix`. Skipped when
  // the full split is already cached, since that is cheaper still.
  const parts = wanted > 0 && wanted <= PREFIX_SCAN_MAX && cachedSplit(text, kind) === null
    ? chunkPrefix(text, kind, wanted)
    : splitChunks(text, kind);

  const to = Math.min(parts.length, wanted);
  if (from > parts.length) return "";

  const slice = parts.slice(from - 1, to);
  return kind === "char" ? slice.join("") : slice.join(chunkJoiner(kind));
}

/**
 * `the number of <chunk>s in <string>` — emitted by `StringChunkCountExprNode`.
 *
 * ⚠ Splits exactly as `chunkOf` does, so a count and an index never disagree.
 * `CCoreXMLParser._ListItems` walks a document with `chunkCount(text, "char")`
 * and then indexes it, so a different split here would parse every XML file the
 * client loads slightly wrongly rather than failing.
 */
export function chunkCount(value: LingoValue, kind: ChunkKind): number {
  return splitChunks(toStringValue(value), kind).length;
}

/**
 * `the last <chunk> in <string>` — emitted by `LastStringChunkExprNode`.
 *
 * ⚠ Empty string for an empty input, not VOID: `CMgrResource.preIndexMembers`
 * does `lastChunk(tName, "char") = "*"` to spot wildcard members, and a VOID
 * there would compare unequal in a way that quietly skips the check.
 */
export function lastChunk(value: LingoValue, kind: ChunkKind): string {
  const text = toStringValue(value);
  /**
   * `the last char` is the last CODE POINT — what `[...text]` would end with —
   * read off the end instead of spreading the whole string into an array (and
   * evicting a real entry from the split memo). `CCoreXMLParser.ParseXML` asks
   * it of every element tag to spot `<x/>`.
   */
  if (kind === "char") {
    const length = text.length;
    if (length === 0) return "";
    const low = text.charCodeAt(length - 1);
    if (low >= 0xdc00 && low <= 0xdfff && length >= 2) {
      const high = text.charCodeAt(length - 2);
      if (high >= 0xd800 && high <= 0xdbff) return text.slice(length - 2);
    }
    return text.charAt(length - 1);
  }
  const parts = splitChunks(text, kind);
  return parts.length === 0 ? "" : (parts[parts.length - 1] ?? "");
}

function chunkJoiner(kind: ChunkKind): string {
  return kind === "word" ? " " : kind === "item" ? itemDelimiter : "\r";
}

/**
 * `delete <kind> first to last of <string>` — the emitter renders it as
 * `source = deleteStringChunk(source, kind, first, last)`.
 *
 * The counterpart to `chunkOf`, and it shares its conventions: 1-based,
 * inclusive, and `last === 0` means "just the one at `first`".
 *
 * ⚠ Deleting a chunk removes its separator too, which is why this rebuilds from
 * the surviving parts rather than splicing the string. `String Services
 * Class.replaceChunks` — reached from `dumpTextField("System Texts")`, so on the
 * client's boot path — relies on the joiner being reapplied.
 */
const LAST_CHUNK = -30000;

export function deleteStringChunk(
  value: LingoValue,
  kind: ChunkKind,
  first: number,
  last: number,
): string {
  const text = toStringValue(value);
  /**
   * `delete item 1 of s` is everything after the first delimiter — exactly what
   * splitting, dropping part 1 and re-joining with the same delimiter produces,
   * and "" when there is no delimiter. `CCoreXMLParser._XML_ParseAttributes`
   * consumes every attribute string this way, three times per attribute, and
   * each one split (and cached) a string that was never seen again.
   */
  if (kind === "item" && first === 1 && last === 0 && itemDelimiter !== "") {
    const at = text.indexOf(itemDelimiter);
    return at < 0 ? "" : text.slice(at + itemDelimiter.length);
  }
  // ⚠ A COPY: `splitChunks` hands back its cached array, and the `splice` below
  // would otherwise corrupt the entry for every later reader of this string.
  const parts = splitChunks(text, kind).slice();
  if (first === LAST_CHUNK) first = parts.length;
  if (last === LAST_CHUNK) last = parts.length;

  const from = Math.max(1, Math.floor(first));
  const to = last === 0 ? from : Math.min(parts.length, Math.floor(last));
  if (from > parts.length || to < from) return text;

  parts.splice(from - 1, to - from + 1);
  return kind === "char" ? parts.join("") : parts.join(chunkJoiner(kind));
}

// ---------------------------------------------------------------------------
// Host bindings
// ---------------------------------------------------------------------------

/**
 * Builtins (`callNamed`) and movie properties (`theProperty`) are supplied by
 * the host, not by this file. Transpiled Lingo names thousands of them; the
 * port registers the ones it actually reaches and gets a loud, named error for
 * the rest rather than a silent `undefined`.
 */
export type LingoBuiltin = (...args: LingoValue[]) => LingoValue;

const builtins = new Map<string, LingoBuiltin>();
const globals = new Map<string, LingoValue>();
const movieProperties = new Map<string, LingoValue>();

/**
 * Names registered as placeholders rather than real behaviour.
 *
 * "100% of called builtins are implemented" is misleading if a third of them
 * return VOID and do nothing. A stub is a deliberate decision — the subsystem
 * is not built yet — but it has to stay visible, because a stub is exactly the
 * kind of thing that produces plausible wrong output instead of an error.
 */
const stubbedBuiltins = new Set<string>();

export function registerBuiltin(name: string, fn: LingoBuiltin, options?: { stub?: boolean }): void {
  const key = name.toLowerCase();
  builtins.set(key, fn);
  if (options?.stub) stubbedBuiltins.add(key);
  else stubbedBuiltins.delete(key);
}

export function registerBuiltins(
  table: Record<string, LingoBuiltin>,
  options?: { stub?: boolean },
): void {
  for (const [name, fn] of Object.entries(table)) registerBuiltin(name, fn, options);
}

export function isStubbed(name: string): boolean {
  return stubbedBuiltins.has(name.toLowerCase());
}

/** Names reached at runtime with no registered implementation. Drives porting order. */
export const missingBuiltins = new Set<string>();

export function hasBuiltin(name: string): boolean {
  return builtins.has(name.toLowerCase());
}

/**
 * Movie-level handlers defined by the cast itself.
 *
 * `callNamed` covers two different things that Lingo does not distinguish: 162
 * distinct names in the framework cast, of which 101 are VMK's *own* global
 * handlers (`error`, `getVariableManager`, `executeMessage`, …) and only 61 are
 * Director builtins. Transpiled handlers are registered here; builtins win on a
 * name clash because Director's are not overridable from a movie script.
 */
const globalHandlers = new Map<string, LingoBuiltin>();

/**
 * Names the HOST has deliberately taken over, which a later registration must
 * not silently undo.
 *
 * ⚠ `registerApiHandlers` rebuilds the table of every `_API` / `_Script`
 * handler and re-registers it EACH TIME A CAST ATTACHES — it has to, because a
 * cast can bring new global scripts. That rebuild also re-registers the ones
 * the framework cast already had, so any host override installed earlier was
 * overwritten by the first of 37 cast attaches, long before the boot finished.
 *
 * It fails silently and looks like the override was never installed: a wrapper
 * registered after `startClient` simply never fires. That cost several rounds
 * of diagnosis, and it is why `probeWiring` "proved" the technique works — no
 * cast defines a `probeWiring`, so nothing ever overwrote it.
 */
const hostHandlers = new Set<string>();

export function registerHandlers(table: Record<string, LingoBuiltin>): void {
  for (const [name, fn] of Object.entries(table)) {
    const key = name.toLowerCase();
    // A host override wins permanently; see `hostHandlers`.
    if (hostHandlers.has(key)) continue;
    globalHandlers.set(key, fn);
  }
}

/**
 * Register handlers that outrank the cast's own and are never overwritten by a
 * later `registerHandlers` — host implementations and diagnostic wrappers.
 */
export function registerHostHandlers(table: Record<string, LingoBuiltin>): void {
  for (const [name, fn] of Object.entries(table)) {
    const key = name.toLowerCase();
    globalHandlers.set(key, fn);
    hostHandlers.add(key);
  }
}

/**
 * Register handlers ONLY under names nothing has claimed. Returns how many.
 *
 * For scripts that are known to expose global wrappers but also carry ordinary
 * instance methods, so registering the whole class would shadow real globals:
 * `CDialogWindow` provides `DialogWindowExists` (a global wrapper reading `the
 * paramCount`) alongside a `setText` that would otherwise displace
 * `Text_API.setText`.
 *
 * ⚠ Fill-only, never replace. That is what makes it safe to point at a class
 * whose membership in "the global namespace" is only partly true.
 */
export function registerFallbackHandlers(table: Record<string, LingoBuiltin>): number {
  let filled = 0;
  for (const [name, fn] of Object.entries(table)) {
    const key = name.toLowerCase();
    if (builtins.has(key) || globalHandlers.has(key)) continue;
    globalHandlers.set(key, fn);
    filled++;
  }
  return filled;
}

export function hasHandler(name: string): boolean {
  return globalHandlers.has(name.toLowerCase());
}

/**
 * Arguments of the call currently executing.
 *
 * Lingo handlers are variadic: `the paramCount` and `param(i)` read whatever
 * the caller passed, and VMK relies on it — `Object_API.createObject` walks
 * `for i = 2 to the paramCount` to collect a class list. Without a real stack
 * both read as empty and every such handler quietly does nothing.
 */
const callArgs: LingoValue[][] = [];

export function currentParams(): LingoValue[] {
  return callArgs.length > 0 ? callArgs[callArgs.length - 1]! : [];
}

/** The whole call stack's argument lists, so `param()` can step out a frame. */
export function callFrames(): readonly LingoValue[][] {
  return callArgs;
}

/**
 * Optional per-handler timing (`?perf=1`, see boot-client's `vmkPerf`). Null in
 * normal play, so the only cost on the hot path is this one check.
 */
export interface HandlerProfiler {
  enter(label: string): void;
  exit(): void;
}
let handlerProfiler: HandlerProfiler | null = null;
export function setHandlerProfiler(profiler: HandlerProfiler | null): void {
  handlerProfiler = profiler;
}
/** A readable class name for a receiver, for profiling labels. */
function profileClassOf(holder: unknown): string {
  if (!holder || typeof holder !== "object") return typeof holder;
  const named = (holder as { __lingoClass?: unknown }).__lingoClass;
  if (typeof named === "string") return named;
  return (holder as object).constructor?.name ?? "object";
}

export function callNamed(name: string, ...args: LingoValue[]): LingoValue {
  const key = name.toLowerCase();
  /**
   * ⚠ `handlerName(anObject, …)` IS A METHOD CALL ON THAT OBJECT.
   *
   * Director's documented syntax for reaching a handler in a script instance —
   * `deconstruct(m_rVisual)` means exactly `m_rVisual.deconstruct()` — and VMK
   * writes teardown that way throughout. The emitter renders it as `callNamed`
   * because it cannot tell the two apart syntactically, so the runtime has to.
   *
   * ⚠ THIS IS WHY NOTHING WAS EVER TORN DOWN. `CRoomObject.deconstruct` is
   *
   *     if objectp(m_rVisual) then deconstruct(m_rVisual)
   *     if objectp(m_rFactor) then deconstruct(m_rFactor)
   *
   * and `deconstruct` also exists as a GLOBAL (a class handler registered by
   * the API pass), so the call resolved to that instead and the visual's own
   * handler never ran — silently, with no error. MEASURED on a live
   * `CRoomVisualAvatar`: `callNamed("deconstruct", visual)` reached it 0 times
   * while `callMethod` reached it once.
   *
   * The visible cost was every leak on a room change — avatars still drawn
   * after their room was gone, the music-mixer animation still running, the
   * shadow sprites accumulating one set per room entered — because
   * `CRoomVisualAvatar.deconstruct` is what calls `RemoveSprite` on the canvas
   * and shadow sprites. `_ClearObj` walks all 474 objects correctly; it just
   * never reached anything hanging off them.
   *
   * BUILTINS KEEP PRIORITY, so `objectp(x)` / `ilk(x)` / `voidp(x)` are
   * untouched; only a name that would otherwise fall through to a class handler
   * registered globally is redirected, and only when the first argument is an
   * object that actually defines it.
   */
  if (!builtins.has(key) && args.length > 0) {
    const first = args[0];
    if (first !== VOID && first !== null && typeof first === "object") {
      const owner = findHandlerOwner(first as LingoObject, name);
      if (typeof owner?.fn === "function") {
        return callMethod(name, first, ...args.slice(1));
      }
    }
  }
  const fn = builtins.get(key) ?? globalHandlers.get(key);
  if (!fn) {
    /**
     * ⚠ AN UNQUALIFIED CALL REACHES THE CALLING SCRIPT'S OWN HANDLERS.
     *
     * Director resolves `foo(x)` against the running script before failing, and
     * the first argument then fills the `me` slot. `CLobbyInterface.deconstruct`
     * is `ShowDefaultLobbyWindow(0)` — i.e. `me = 0, i_bVisibility = VOID`, the
     * close branch, a no-op with no window open. Throwing here instead aborted
     * the Dock's teardown on START GAME, so the Jungle Cruise room never loaded
     * (black screen). `me` is bound to the running instance rather than the
     * literal first argument so the handler can still read its properties.
     */
    const frame = executingLink[executingLink.length - 1];
    const own = frame ? ownHandler(frame.node, key) : undefined;
    if (own) {
      const rest = args.slice(1);
      callArgs.push([frame.target as LingoValue, ...rest]);
      try {
        return own(frame.target as LingoValue, ...rest);
      } finally {
        callArgs.pop();
      }
    }
    missingBuiltins.add(name);
    throw new Error(`Lingo handler not implemented: ${name}/${args.length}`);
  }
  callArgs.push(args);
  const profiler = handlerProfiler;
  profiler?.enter(builtins.has(key) ? `builtin ${name}` : `global ${name}`);
  try {
    return fn(...args);
  } finally {
    profiler?.exit();
    callArgs.pop();
  }
}

/** Method dispatch on a script instance: `obj.name(args)`, receiver passed as `me`. */
export function callMethod(name: string, target: LingoValue, ...args: LingoValue[]): LingoValue {
  if (target === VOID || target === null) {
    throw new Error(`Lingo method call on VOID: ${name}`);
  }
  const holder = target as LingoObject;
  // ⚠ Remember WHICH LINK defines the handler, so a `callAncestor` inside it
  // starts above that link rather than above the object — see `executingLink`.
  const owner = findHandlerOwner(holder, name);
  let fn: unknown = owner?.fn;
  if (typeof fn !== "function") fn = genericObjectMethod(holder, name, args);

  // Director forwards any message a sprite does not answer itself to the
  // behaviours attached to it. VMK depends on this: `CMgrSprite.setEventBroker`
  // puts an event broker in the sprite's `scriptInstanceList` and then calls
  // `setID` on the *sprite* — expecting the broker to receive it.
  if (typeof fn !== "function") {
    const behaviours = (holder as { scriptInstanceList?: unknown }).scriptInstanceList;
    if (behaviours instanceof LingoList) {
      const targets = behaviours
        .toArray()
        .filter((b) => b !== VOID && typeof b === "object");
      let last: LingoValue = VOID;
      let delivered = false;
      for (const target of targets) {
        if (typeof findMethod(target as LingoObject, name) !== "function") continue;
        last = callMethod(name, target, ...args);
        delivered = true;
      }
      if (delivered) return last;
    }
  }

  /**
   * ⚠ `count(list)` AND `list.count` ARE THE SAME THING IN LINGO.
   *
   * A no-argument call whose name resolves to a VALUE rather than a handler is
   * a property read. `findMethod` deliberately skips accessors (see the note
   * there), so `count`, `ilk`, `length` and friends arrive here — and lists are
   * LINGO_NATIVE, so `genericObjectMethod` refuses them by design.
   *
   * Read on the OBJECT, so an accessor runs with the right `this`, and match
   * case-insensitively the way Lingo resolves everything else.
   */
  if (typeof fn !== "function" && args.length === 0 && typeof holder === "object") {
    const key = name in holder ? name : findKeyIgnoringCase(holder, name);
    if (key !== undefined && key !== null) {
      const value = holder[key];
      if (value !== undefined && typeof value !== "function") return value as LingoValue;
    }
  }

  /**
   * ⚠ A SPRITE FORWARDS TO ITS BEHAVIOURS — `the scriptInstanceList of sprite`.
   *
   * Director attaches behaviour INSTANCES to a sprite channel, and a handler
   * call on the sprite runs on those instances. `CMgrSprite.setEventBroker` is
   * built entirely on it:
   *
   *     tSprite.scriptInstanceList = [new(pEventBroker)]
   *     tSprite.setID(tID)
   *
   * and callers then do `sprite(n).registerProcedure(#handler, id, #mouseUp)`.
   *
   * ⚠ THIS IS WHY ROOMS OUTSIDE MAIN STREET HAD NO AUDIO. Without forwarding,
   * `CVMKEmporiumHandler.createProcedure` threw "Lingo method not found:
   * registerProcedure on SpriteChannel" while handling `room_ready`. That
   * message is a BROADCAST — `CSoundTracker` registers `#StartRoomSounds` on it
   * — so one throwing subscriber aborted the chain before the tracker was
   * reached and the room stayed silent. Main Street was unaffected only because
   * its sound cast is one of six carrying a `CSoundStart`, which broadcasts
   * `LoadRoomSound` on a chain with a single subscriber.
   */
  if (typeof fn !== "function" && holder && typeof holder === "object") {
    const attached = (holder as LingoObject).scriptInstanceList;
    const behaviours =
      attached instanceof LingoList ? attached.toArray()
      : Array.isArray(attached) ? (attached as LingoValue[])
      : [];
    for (const behaviour of behaviours) {
      if (!behaviour || typeof behaviour !== "object") continue;
      if (typeof findMethod(behaviour as LingoObject, name) !== "function") continue;
      return callMethod(name, behaviour, ...args);
    }

    /**
     * ⚠ AND A SPRITE WITH NO RESPONDER ANSWERS VOID — it does not error.
     *
     * Sprite messaging is broadcast-style in Director (the same model as
     * `sendSprite`): the call goes to the channel's behaviours, and no behaviour
     * handling it is simply nothing happening.
     *
     * VMK leans on that. `CVMKEmporiumHandler.createProcedure` guards only that
     * the room NODE exists, then does
     *
     *     setEventBroker(t_CashRegisterSprite.spriteNum, t_NodeName)
     *     t_CashRegisterSprite.registerProcedure(t_eventProc, me.getID(), #mouseUp)
     *
     * and `setEventBroker` is a `error()`-and-return-0 call, not a throw — so
     * when the node has no sprite yet (`getSprite()` answers 0, logged as
     * "Sprite not marked as usable: 0") the second line still runs against a
     * channel carrying no behaviour. Throwing there aborted the `room_ready`
     * broadcast and took `CSoundTracker.StartRoomSounds` with it.
     */
    if ((holder as LingoObject)[LINGO_ILK] === "sprite") return VOID;
  }

  if (typeof fn !== "function") {
    // Name the ancestor chain. "method not found on object" is unactionable —
    // in a framework that assembles objects by chaining classes at runtime, the
    // question is always *which* classes got chained.
    const chain: string[] = [];
    for (let o = holder as LingoObject | undefined; o && chain.length < 12; ) {
      chain.push(String(o.__lingoClass ?? "?"));
      o = o.ancestor as LingoObject | undefined;
    }
    throw new Error(
      `Lingo method not found: ${name} on ${describe(target)} [${chain.join(" -> ")}]`,
    );
  }
  // Two calling conventions meet here. Transpiled handlers are free functions
  // whose first parameter is the receiver (`function send(_me, tCmd, …)`), so
  // it has to be injected. Runtime classes are ordinary TypeScript with `this`,
  // and injecting there shifts every argument by one — which is silent, not
  // fatal: `getPropAt` read the receiver as its index and returned undefined,
  // so `CConnection.send` emitted a frame with an empty payload.
  // Inside a method, Lingo's param(1) is the receiver, so the recorded list
  // starts with it — matching what handlers written as `on x me, a, b` expect.
  callArgs.push([holder as LingoValue, ...args]);
  if (owner) executingLink.push({ target: holder as object, node: owner.node });
  const profiler = handlerProfiler;
  profiler?.enter(`${profileClassOf(holder)}.${name}`);
  try {
    if ((holder as Record<symbol, unknown>)[LINGO_NATIVE] === true) {
      return (fn as (...rest: LingoValue[]) => LingoValue).apply(holder, args);
    }
    return (fn as (...rest: LingoValue[]) => LingoValue).call(holder, holder, ...args);
  } finally {
    profiler?.exit();
    if (owner) executingLink.pop();
    callArgs.pop();
  }
}

/**
 * Marks a class whose methods use normal TypeScript signatures rather than the
 * transpiled-handler convention of taking the receiver first. Set it on the
 * prototype: `(MyClass.prototype as any)[LINGO_NATIVE] = true;`
 */
export const LINGO_NATIVE = Symbol.for("lingo.nativeMethods");

/**
 * A host object's own Lingo type name, for `ilk`.
 *
 * ⚠ Without it every host object answers `#instance`, and VMK branches on the
 * difference: `CMgrObject.create` only chains an `#ancestor` onto something that
 * IS an instance, so a `timeout` object reporting `#instance` got `setaProp`
 * called on it and the boot died registering a timer. Director calls that object
 * `#timeout`; say so rather than letting the generic answer stand.
 */
export const LINGO_ILK = Symbol.for("lingo.ilk");

/**
 * Lingo handler names are case-insensitive, and dispatch frequently arrives via
 * a symbol — `setNetMessageHandler(pXtra, #xtraMsgHandler, me)` — which `symbol()`
 * has already lowercased. An exact-match lookup therefore misses every
 * symbol-dispatched handler, so fall back to a case-insensitive scan that also
 * walks the prototype chain (transpiled handlers may live on a class).
 */
/** Walks own+inherited keys looking for one that differs only by case. */
function findKeyIgnoringCase(holder: LingoObject, name: string): string | undefined {
  const wanted = name.toLowerCase();
  for (let o: object | null = holder; o && o !== Object.prototype; o = Object.getPrototypeOf(o)) {
    for (const k of Object.getOwnPropertyNames(o)) {
      if (k.toLowerCase() === wanted) return k;
    }
  }
  return undefined;
}

/**
 * Every Director script instance answers the property-list calls, because an
 * instance IS a property list of its own variables — `setaProp(me, #ancestor, x)`
 * is the documented way to chain inheritance at runtime, and `CMgrObject.create`
 * builds every VMK object with it.
 *
 * These are only consulted after `findMethod` misses, so a class that defines
 * its own `getaProp` still wins.
 */
function genericObjectMethod(
  holder: LingoObject,
  name: string,
  args: LingoValue[],
): unknown {
  // Applies to script instances only. Runtime classes (lists, members, sprites)
  // implement these themselves, and lists must NOT fall through to here — a
  // missing method on a list is a real bug worth surfacing.
  if ((holder as Record<symbol, unknown>)[LINGO_NATIVE] === true) return undefined;
  // ⚠ A failed VMK call returns 0, not VOID — `CMgrObject.create` answers
  // `error(...)` which yields 0 — so a method call on the result lands here with
  // a number as the holder. `in` on a primitive throws a TypeError that buries
  // the actual cause several frames up.
  if (typeof holder !== "object" || holder === null) return undefined;

  // ⚠ `symbol()` lowercases, so `#pElemList` arrives as `#pelemlist` while the
  // instance stores `pElemList`. Match an existing property case-insensitively
  // before falling back to the bare name, or `setaProp` silently creates a
  // second, shadow property and every later read sees the stale one.
  const bare = String(args[0] ?? "").replace(/^#/, "");
  const key =
    bare in holder
      ? bare
      : (findKeyIgnoringCase(holder, bare) ?? bare);

  switch (name.toLowerCase()) {
    case "setaprop":
    case "setprop":
      return () => {
        holder[key] = args[1];
        return VOID;
      };
    case "getaprop":
    case "getprop":
      return () => holder[key] ?? VOID;
    // `handler(obj, #construct)` asks whether the object responds to a message
    // WITHOUT sending it. `CMgrObject.create` uses the answer to decide which
    // links in a freshly chained object need constructing.
    // ⚠ The argument is a symbol, so it arrives as "#construct" while the
    // handler is named "construct". Matching the raw string answered 0 for
    // every class, `CMgrObject.create` skipped every `construct`, and managers
    // came back fully chained but with none of their tables allocated.
    case "handler":
      return () => (typeof findMethod(holder, bare) === "function" ? 1 : 0);
    /**
     * `handlers(obj)` — every message the object responds to, as symbols.
     *
     * ⚠ NOT THE SAME AS `handler`, and its absence is why NO DIALOG BUTTON
     * WORKED. `CDialogWindow.eventProcMessenger` gates the whole dialog on it:
     *
     *     if getOne(handlers(tObject), #dialogWindowEvent) = 0 then
     *       put "[DialogWindow Notice] … Missing #dialogWindowEvent-handler"
     *       passEvent = 0
     *
     * With `handlers` missing, `callMethod` threw "method not found" instead,
     * which killed the click mid-chain — so OK and Cancel did nothing at all.
     * Everything upstream was already correct: the sprite was hit, the broker
     * redirected, `CWindowCommonButton.mouseUp` returned 1. It died on the last
     * hop. The game calls this 14 times, so other paths were losing too.
     *
     * The whole ancestor chain counts: VMK assembles objects by chaining
     * classes at runtime, and a handler inherited from an ancestor is one the
     * object genuinely responds to.
     */
    case "handlers": {
      return () => {
        const names: LingoValue[] = [];
        const seen = new Set<string>();
        for (let o = holder as LingoObject | undefined; o; o = o.ancestor as LingoObject | undefined) {
          for (const key of Object.keys(o)) {
            if (seen.has(key)) continue;
            if (typeof (o as Record<string, unknown>)[key] !== "function") continue;
            seen.add(key);
            names.push(symbol(key));
          }
          // Methods can also live on the prototype rather than the instance.
          const proto = Object.getPrototypeOf(o) as object | null;
          if (proto && proto !== Object.prototype) {
            for (const key of Object.getOwnPropertyNames(proto)) {
              if (key === "constructor" || seen.has(key)) continue;
              if (typeof (proto as Record<string, unknown>)[key] !== "function") continue;
              seen.add(key);
              names.push(symbol(key));
            }
          }
        }
        return new LingoList(names);
      };
    }
    default:
      return undefined;
  }
}

/**
 * Does this object handle `name`, itself or anywhere up its ancestor chain?
 *
 * ⚠ FOR BROADCASTS ONLY. `call(#handler, <list>, …)` sends to every object in
 * the list and SKIPS the ones that do not respond — Director's behaviour, and
 * something VMK depends on rather than tolerates. `CWindow.redirectEvent`
 * wraps a SINGLE element in a list precisely to get it:
 *
 *     tParam = call(tEvent, [pElemList[tSprID]], tSprID)
 *
 * Every window event asks the element for the event's parameter this way. Most
 * elements implement `mouseUp` (it returns the click point) and almost none
 * implement `keyDown`, so a strict dispatch turns ordinary typing into
 * "Lingo method not found: keydown on … [CWindowFieldWrapper …]" and the whole
 * keyboard chain — `InactivateNameSelector`, the invalid-character dialog, the
 * 18-character cap — never runs.
 *
 * A DIRECT `call(#handler, anObject)` still throws, so a genuinely missing
 * handler on a single target stays loud.
 */
export function objectRespondsTo(target: LingoValue, name: string): boolean {
  if (target === VOID || target === null || typeof target !== "object") return false;
  return findMethod(target as LingoObject, name) !== undefined;
}

function findMethod(holder: LingoObject, name: string): unknown {
  const direct = holder[name];
  if (typeof direct === "function") return direct;

  /**
   * ⚠ SEARCHING FOR A METHOD MUST NOT INVOKE AN ACCESSOR.
   *
   * Reading `scope[key]` runs a getter, and once the walk reaches a PROTOTYPE
   * that getter runs with `this` bound to the prototype — which has none of the
   * instance's fields. `LingoList.prototype.count` is `this.items.length`, so
   * looking up the method `count` on a list threw
   *
   *     Cannot read properties of undefined (reading 'length')
   *       at get count → findMethod → callMethod
   *
   * every single frame, out of `CRoomInfoIconPulser.update`'s
   * `callMethod("count", m_pElements)` — while the list itself was perfectly
   * healthy and `m_pElements.count` read back 1. That is why the object under
   * suspicion kept looking innocent: the fault was in the SEARCH, not the data.
   *
   * A Lingo handler is always a data property, so match on the descriptor and
   * skip accessors entirely. `callMethod`'s own property fallback still answers
   * `count(list)` with the number.
   */
  const wanted = name.toLowerCase();
  for (let scope: object | null = holder; scope !== null; scope = Object.getPrototypeOf(scope)) {
    for (const key of Object.getOwnPropertyNames(scope)) {
      if (key.toLowerCase() !== wanted) continue;
      const descriptor = Object.getOwnPropertyDescriptor(scope, key);
      if (!descriptor || typeof descriptor.value !== "function") continue;
      return descriptor.value as unknown;
    }
  }

  // Director inheritance: an instance delegates to its `ancestor`. VMK sets it
  // at runtime — `CMgrObject.create` does `setaProp(obj, #ancestor, base)` —
  // so it cannot be resolved when the class is defined, only when called.
  const ancestor = (holder.ancestor ?? holder["#ancestor"]) as LingoObject | undefined;
  if (ancestor && typeof ancestor === "object") {
    return findMethod(ancestor, name);
  }
  return undefined;
}

/** How far `callAncestor` will walk before giving up; mirrors MAX_ANCESTOR_DEPTH. */
const MAX_ANCESTOR_DEPTH = 32;

/** The next link up, however this object spells it. See `containerProxy`/`instantiate`. */
function ancestorOf(node: LingoObject): LingoObject | undefined {
  const named = (node.ancestor ?? node["#ancestor"]) as LingoObject | undefined;
  if (named && typeof named === "object") return named;
  const proto = Object.getPrototypeOf(node) as LingoObject | null;
  return proto && typeof proto === "object" ? proto : undefined;
}

/**
 * A handler defined ON this link, not inherited — the chain walk supplies the rest.
 *
 * "This link" means the object plus its JS prototypes, stopping BEFORE the next
 * ancestor: `setAncestor` installs the ancestor as the instance's prototype, so
 * the two chains are the same objects and the walk has to know where one link
 * ends. Native classes (lists, members, sprites) keep their methods on a real JS
 * prototype, which is why this cannot just scan own properties.
 *
 * Descriptor-based for the same reason as `findMethod`: reading a property runs
 * an accessor, and on a prototype that accessor sees none of the instance state.
 */
/**
 * ⚠ PROTOTYPE LOOKUPS ARE CACHED — instance lookups are not.
 *
 * Every Lingo call resolves its handler by name, case-insensitively, which
 * means listing a scope's property names and lowercasing each one. On a NATIVE
 * receiver (`LingoPropList`, `LingoList`, images…) the handlers live on the
 * class PROTOTYPE, and every `list.findPos(...)` re-scanned all of its methods.
 * MEASURED: `CAnimationSprite.GetParam` — one findPos and one read — cost 4.1 µs,
 * and room animation calls it millions of times a session (~1,300 per frame).
 *
 * A prototype's set of method NAMES is fixed once its class is defined, so which
 * key answers (or that none does) can be remembered. The cache holds the KEY,
 * not the function, and reads the method live through it: `vmkPerf` swaps
 * `LingoImage.prototype` methods for timed wrappers and back, and a cached
 * function would keep calling whichever it saw first. An INSTANCE is never
 * cached: Lingo script instances carry their handlers and data as own
 * properties that change while they live.
 */
const prototypeHandlerKeys = new WeakMap<object, Map<string, string | null>>();

/**
 * A script instance's handler table: lowercase handler name -> its own key.
 *
 * ⚠ THE INSTANCE SCAN WAS A QUARTER OF ALL CPU. A script instance carries its
 * handlers AND its data as own properties, so resolving `obj.handler()` listed
 * every one of them and lowercased each, on every call. MEASURED with the
 * sampling profiler in the Steamboat: `scanScope` 27.8% of busy time, self.
 *
 * `lingo-script`'s `build` installs every function an instance will ever have
 * (the class's handlers, then `setaProp`/`getaProp`) before `construct` runs,
 * and afterwards only DATA is added — so one table per class answers for every
 * instance. It is attached as an own, non-enumerable symbol property; objects
 * without one (runtime classes, natives) keep the scan.
 */
export const LINGO_HANDLER_KEYS = Symbol("lingo.handlerKeys");
function scanScope(scope: object, wanted: string): string | undefined {
  for (const key of Object.getOwnPropertyNames(scope)) {
    if (key.toLowerCase() !== wanted) continue;
    const descriptor = Object.getOwnPropertyDescriptor(scope, key);
    if (descriptor && typeof descriptor.value === "function") return key;
  }
  return undefined;
}
/**
 * ⚠ LISTS WERE SCANNED TWICE PER CALL, UNCACHED. MEASURED over one boot:
 * ~994k handler lookups on `LingoPropList` and ~189k on `LingoList`, each
 * listing and lowercasing (a) the proxy's own fields and (b) the class
 * prototype's ~28 method names. (b) is the prototype the cache above exists
 * for, but the walk reaches it as the next ANCESTOR LINK (`ancestorOf` falls
 * back to the JS prototype), where `ownHandler` passes it as an instance — so
 * the cache never applied. Together with `isAssignable` this was a quarter of
 * the post-login freeze (Lingo XML parse + dictionary build are list-heavy).
 *
 * A class prototype is recognised as such and always cached. A list's own
 * fields (`items`, `keys`, `values`, …) are data, never handlers — Lingo
 * cannot put a function there — so they are not scanned at all.
 */
function isClassPrototype(scope: object): boolean {
  const ctor = Object.prototype.hasOwnProperty.call(scope, "constructor")
    ? (scope as { constructor?: unknown }).constructor
    : undefined;
  return typeof ctor === "function" && (ctor as { prototype?: unknown }).prototype === scope;
}
function handlerInScope(scope: object, wanted: string, isInstance: boolean): ((...args: LingoValue[]) => LingoValue) | undefined {
  let key: string | undefined;
  if (isInstance && (scope instanceof LingoList || scope instanceof LingoPropList)) return undefined;
  if (isInstance && !isClassPrototype(scope)) {
    const table = Object.prototype.hasOwnProperty.call(scope, LINGO_HANDLER_KEYS)
      ? (scope as Record<symbol, unknown>)[LINGO_HANDLER_KEYS] as Map<string, string>
      : undefined;
    key = table ? table.get(wanted) : scanScope(scope, wanted);
  } else {
    let cache = prototypeHandlerKeys.get(scope);
    if (!cache) {
      cache = new Map();
      prototypeHandlerKeys.set(scope, cache);
    }
    const cached = cache.get(wanted);
    if (cached === undefined) {
      key = scanScope(scope, wanted);
      cache.set(wanted, key ?? null);
    } else {
      key = cached ?? undefined;
    }
  }
  if (key === undefined) return undefined;
  const descriptor = Object.getOwnPropertyDescriptor(scope, key);
  return descriptor && typeof descriptor.value === "function"
    ? descriptor.value as (...args: LingoValue[]) => LingoValue
    : undefined;
}

function ownHandler(node: LingoObject, wanted: string): ((...args: LingoValue[]) => LingoValue) | undefined {
  const stop = ancestorOf(node) as object | undefined;
  for (
    let scope: object | null = node;
    scope !== null && scope !== stop && scope !== Object.prototype;
    scope = Object.getPrototypeOf(scope) as object | null
  ) {
    const fn = handlerInScope(scope, wanted, scope === node);
    if (fn) return fn;
  }
  return undefined;
}

/** The handler AND the link that defines it, which `callAncestor` needs. */
function findHandlerOwner(
  holder: LingoObject,
  name: string,
): { fn: (...args: LingoValue[]) => LingoValue; node: LingoObject } | undefined {
  const wanted = name.toLowerCase();

  /**
   * ⚠ A LIST'S OWN METHODS ARE ANSWERED FROM THE CLASS, BEFORE THE CHAIN WALK.
   *
   * The walk below asks every link for its ancestor, and on a list that is two
   * Lingo KEY lookups through the proxy — `ancestor` and `#ancestor`, each
   * missing as a string, then as a symbol, then `_`-stripped — before it ever
   * reaches `LingoPropList.prototype`, where the method is. Every
   * `getaProp`/`setaProp`/`append`/`count` call paid that. MEASURED over the
   * post-login freeze: `findHandlerOwner` 17.6% inclusive, `ancestorOf` 4% self.
   *
   * The walk finds a method on the list's own prototype chain first anyway
   * (that is the first link it scans), so looking there directly — through
   * the per-prototype cache — returns the same handler. Only a name the class
   * does NOT define still takes the walk, which is where a list carrying an
   * `#ancestor` key would delegate.
   */
  if (holder instanceof LingoPropList || holder instanceof LingoList) {
    for (
      let scope: object | null = Object.getPrototypeOf(holder) as object | null;
      scope !== null && scope !== Object.prototype;
      scope = Object.getPrototypeOf(scope) as object | null
    ) {
      const fn = handlerInScope(scope, wanted, false);
      if (fn) return { fn, node: scope as LingoObject };
    }
  }

  let node: LingoObject | undefined = holder;
  for (let depth = 0; node && depth < MAX_ANCESTOR_DEPTH; depth++) {
    const fn = ownHandler(node, wanted);
    if (fn) return { fn, node };
    node = ancestorOf(node);
  }

  /**
   * ⚠ FALL BACK TO THE FULL JS PROTOTYPE CHAIN, `Object.prototype` INCLUDED.
   *
   * `ownHandler` deliberately stops before `Object.prototype` so it can tell one
   * ancestor LINK from the next — but that also hides the builtins the runtime
   * genuinely uses. `str()` calls `toString`, and with this fallback missing the
   * boot died at frame 4 on
   *
   *     Lingo method not found: toString on … [CMgrVariable -> TManager -> CObject]
   *
   * The link is reported as the holder, which is right: a builtin belongs to no
   * ancestor, so `callAncestor` from inside one should behave as it always did.
   */
  for (
    let scope: object | null = holder;
    scope !== null;
    scope = Object.getPrototypeOf(scope) as object | null
  ) {
    const fn = handlerInScope(scope, wanted, scope === holder);
    if (fn) return { fn, node: holder };
  }
  return undefined;
}

/**
 * The link whose handler is currently running, per object.
 *
 * ⚠ `callAncestor` MUST START ABOVE THE SCRIPT THAT CONTAINS THE CALL, not
 * above the object. With a two-link chain those coincide, which is why this
 * went unnoticed; with three they do not. `CRoomObject.update` ends with
 *
 *     callAncestor(#update, _this)
 *
 * and `_this` is the OUTERMOST instance. Once rooms started building their real
 * `CRoomContext -> CRoomObject -> CRoomRoot` chain, `ancestorOf(target)` was
 * `CRoomObject` — the very script making the call — so it invoked itself and
 * every frame died with "Maximum call stack size exceeded".
 */
const executingLink: Array<{ target: object; node: LingoObject }> = [];

/**
 * `callAncestor(#handler, object [, args…])` — Lingo's `super.method()`.
 *
 * ⚠ 56 CALL SITES, and they are all subclass overrides reaching up: `deconstruct`,
 * `update`, `select`, `blinkHighlights`. Unimplemented, every one of those
 * overrides silently did its own body and dropped the parent's behaviour — no
 * error, just half the work.
 *
 * ⚠ THE RECEIVER IS THE ORIGINAL OBJECT, not the ancestor. Read from
 * `LingoVM::callAncestor`, which ends
 *
 *     return executeHandler(HandlerRef{…}, callArgs, args[1]);
 *                                                    ^^^^^^^ the object passed in
 *
 * The obvious-looking alternative — run the handler ON the ancestor — splits the
 * instance's state in two, because the ancestor's writes would land on a
 * different object from the one the caller is using.
 *
 * The search starts at the object's ANCESTOR (never the object itself, or
 * `deconstruct` calling `callAncestor(#deconstruct)` recurses forever) and walks
 * up, first definition wins.
 *
 * ⚠ The second argument may be a LIST, in which case this broadcasts to every
 * object in it — the same shape `call(#handler, list)` has. Easy to miss; taken
 * from `TypeBuiltins::callAncestor`, which recurses over `args[1].listValue()`.
 */
export function callAncestor(
  handlerName: LingoValue,
  target: LingoValue,
  ...args: LingoValue[]
): LingoValue {
  if (target instanceof LingoList) {
    let last: LingoValue = VOID;
    for (const item of target.toArray()) {
      if (item !== VOID && item !== null && typeof item === "object") {
        last = callAncestor(handlerName, item, ...args);
      }
    }
    return last;
  }

  if (target === VOID || target === null || typeof target !== "object") return VOID;
  const wanted = String(handlerName).replace(/^#/, "").toLowerCase();

  /**
   * Start above the link whose handler is RUNNING, falling back to the object's
   * own ancestor when this object is not the one currently executing (a plain
   * `callAncestor` from outside any handler of `target`).
   */
  const frame = executingLink[executingLink.length - 1];
  const from = frame && frame.target === target ? frame.node : (target as LingoObject);
  let node = ancestorOf(from);
  for (let depth = 0; node && depth < MAX_ANCESTOR_DEPTH; depth++) {
    const found = ownHandler(node, wanted);
    if (found) {
      executingLink.push({ target: target as object, node });
      try {
        return found(target, ...args);
      } finally {
        executingLink.pop();
      }
    }
    node = ancestorOf(node);
  }
  return VOID;
}

function describe(value: LingoValue): string {
  if (value === VOID) return "VOID";
  if (value instanceof LingoList) return "list";
  if (value instanceof LingoPropList) return "propList";
  if (typeof value === "object") {
    const ctor = (value as object).constructor?.name;
    const keys = Object.keys(value as object).slice(0, 5).join(",");
    return `${ctor && ctor !== "Object" ? ctor : "object"}{${keys}}`;
  }
  return typeof value;
}

// ---------------------------------------------------------------------------
// Properties
// ---------------------------------------------------------------------------

export function meProp(me: LingoMe, name: string): LingoValue {
  return me[name] as LingoValue;
}

/**
 * ⚠ A PROPERTY LIVES ON THE OBJECT THAT DECLARES IT — the ancestor included.
 *
 * An ancestor is the instance's JS prototype (lingo-script `setAncestor`), so
 * READS already walk the chain like Director. A plain write did not: `me.x = v`
 * made an own `x` on the child even when only an ANCESTOR declares `x`, leaving
 * the ancestor's copy VOID. That is invisible while everything reads through
 * the child, and wrong the moment Lingo reads the ancestor directly.
 *
 * MEASURED on the music mixer's song list: `CWindowUniqueElement` declares
 * `pImage`/`pwidth`/`pheight`; its `Define` and `CWindowImageWrapper.prepare`
 * (both running with `me` = the wrapper) wrote them onto the wrapper, and
 * `CMusicMixerSongList.Init` asks `tElem.ancestor.getaProp(#pImage)` — VOID —
 * so it never drew and the list stayed a white box (OG: four purple rows).
 *
 * So: own property -> write here; else the nearest ancestor INSTANCE holding it
 * as a data property; else here (an undeclared property, as before).
 */
function propertyHolder(me: LingoObject, name: string): LingoObject {
  if (Object.prototype.hasOwnProperty.call(me, name)) return me;
  for (let o = Object.getPrototypeOf(me) as LingoObject | null; o && o !== Object.prototype; o = Object.getPrototypeOf(o)) {
    const d = Object.getOwnPropertyDescriptor(o, name);
    if (!d) continue;
    const isInstance = Object.prototype.hasOwnProperty.call(o, LINGO_HANDLER_KEYS);
    return isInstance && "value" in d && typeof d.value !== "function" && d.writable ? o : me;
  }
  return me;
}

export function setMeProp(me: LingoMe, name: string, value: LingoValue): LingoValue {
  propertyHolder(me as LingoObject, name)[name] = value;
  return value;
}

/** `the <name> of <target>` — property access against an arbitrary object. */
export function setThePropOf(target: LingoValue, name: string, value: LingoValue): LingoValue {
  if (target === VOID || target === null) {
    throw new Error(`Lingo property set on VOID: ${name}`);
  }
  /**
   * ⚠ ASSIGNING VOID OVER A NUMBER LEAVES THE PROPERTY ALONE.
   *
   * VMK writes optional attributes through unconditionally and expects the
   * authored default to survive when the document does not supply one —
   * `CRoomVisualDefault._Open` sets blend, ink, flipH, skew and rotation from
   * `integer(param[…])` whether or not the SPRITE tag carries them. With
   * `integer()` now correctly answering VOID (see its note), letting that VOID
   * land would replace `blend = 100` with nothing and the sprite would still
   * not draw.
   *
   * Narrow on purpose: only VOID, and only over a property that currently holds
   * a NUMBER, so clearing an object/string reference still works — VMK does
   * that deliberately (`m_rContext = VOID`, `pFontData[#text] = VOID`).
   */
  /**
   * ⚠ A CHUNK OF TEXT IS A REFERENCE IN DIRECTOR, AND A PLAIN STRING HERE.
   *
   * `member.char[n]`, `.word[n]`, `.line[n]` are addressable in Director — you
   * can style them: `tTextField.char[c].color = m_colorNonMatch`. Our chunk
   * expressions evaluate to ordinary JS strings, so that assignment threw
   * "Cannot create property 'color' on string 'h'".
   *
   * VMK does it once, in `CComposeCannedMessage.update`, to flash a chat word
   * red when it is not in the dictionary — and it does it from an `update`
   * handler that runs EVERY FRAME while `m_bFlashing` is set, so the throw
   * repeated per frame until the user typed again.
   *
   * ⚠ PER-CHUNK STYLING IS NOT IMPLEMENTED — this only stops the crash, and the
   * word will not turn red. Implementing it means making chunk expressions
   * return a reference that records style runs on the member and having the
   * text renderer honour them; the whole-member `tTextField.color = …` in the
   * same handler already works.
   */
  if (typeof target === "string" || typeof target === "number" || typeof target === "boolean") {
    return value;
  }
  const holder = target as LingoObject;
  if (value === VOID && typeof holder[name] === "number") return value;
  // `me.x = v` for an x an ancestor declares — see `propertyHolder`.
  propertyHolder(holder, name)[name] = value;
  return value;
}

/**
 * `the <name> of <target>` as an r-value. The emitter calls this `thePropOf`
 * (see `ThePropExprNode::toTypeScript`), so that is the exported name —
 * an alias mismatch here is a ReferenceError at module load, not a test failure.
 */
/**
 * Director property names contain spaces — `the number of castMembers of
 * castLib N`, `the long time`. The emitter passes them through verbatim, so a
 * lookup has to try the spaced form first and then a camelCase equivalent,
 * which is how such a property can actually be named in TypeScript.
 *
 * ⚠ Without this, `thePropOf(castLib(N), "number of castMembers")` reads
 * `undefined`, `preIndexMembers` scans nothing, and every member lookup after
 * it quietly returns 0.
 */
function camelCaseProperty(name: string): string {
  return name
    .split(/\s+/)
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join("");
}

export function thePropOf(target: LingoValue, name: string): LingoValue {
  if (target === VOID || target === null) return VOID;
  const holder = target as LingoObject;
  const direct = holder[name];
  if (direct !== undefined) return direct as LingoValue;
  return holder[camelCaseProperty(name)] as LingoValue;
}

/** @deprecated use {@link thePropOf} — kept so older call sites keep compiling. */
export const getThePropOf = thePropOf;

/** `the <name>` — movie/system property. `the itemDelimiter` is special-cased. */
/**
 * Movie property names are spelled inconsistently across Lingo and any host
 * that registers them — `the number of castLibs` vs `numberOfCastLibs`.
 * Normalising to lowercase-without-spaces makes both spellings the same key.
 *
 * ⚠ Lowercasing *before* camel-casing does not work: `number of castLibs`
 * becomes `numberOfCastlibs`, which matches nothing, and the property reads
 * `undefined` while looking correct at the call site.
 */
function normalizeProperty(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "");
}

/**
 * Movie properties the host computes fresh on every read.
 *
 * ⚠ Several of Director's properties are inherently live — `the milliSeconds`
 * (33 reads across the cast), `the mouseH`/`mouseV`/`mouseLoc`, `the key`. A
 * stored value for those is not merely stale, it is wrong in a way that reads as
 * working: timers never advance and every drag lands at the same point.
 */
const dynamicProperties = new Map<string, () => LingoValue>();

export function registerProperties(sources: Record<string, () => LingoValue>): void {
  for (const [name, get] of Object.entries(sources)) {
    dynamicProperties.set(normalizeProperty(name), get);
  }
}

export function theProperty(name: string): LingoValue {
  const key = normalizeProperty(name);
  if (key === "itemdelimiter") return itemDelimiter;
  if (key === "floatprecision") return floatPrecision;
  // `the paramCount` is per-call, not a stored movie property.
  if (key === "paramcount") return currentParams().length;
  // A value written with `setTheProperty` wins: VMK assigns `the itemDelimiter`,
  // `the debugPlaybackEnabled` and others at runtime and expects them to stick.
  if (movieProperties.has(key)) return movieProperties.get(key);
  return dynamicProperties.get(key)?.() ?? VOID;
}

export function setTheProperty(name: string, value: LingoValue): LingoValue {
  const key = normalizeProperty(name);
  if (key === "itemdelimiter") {
    itemDelimiter = toStringValue(value) || ",";
    return value;
  }
  if (key === "floatprecision") {
    setFloatPrecision(value);
    return value;
  }
  movieProperties.set(key, value);
  return value;
}

export function globalVar(name: string): LingoValue {
  return globals.get(name);
}

/**
 * Director's `the player` — the host application object.
 *
 * The emitter prefixes JS reserved words with `_`, which is why handler
 * parameters arrive as `_me` and `_this`. `_player` is the one such name that
 * is NOT a parameter: it is a global, referenced bare in 5 handlers
 * (`if (lingoBinary("neq", _player, undefined))`), so without an export here
 * those modules throw ReferenceError before running a single statement.
 *
 * `traceScript` is the only member the framework cast reads; a projector
 * would set it when script tracing is on, and we never do.
 */
export const _player: LingoObject = {
  traceScript: 0,
  productVersion: "10.1",
  cursor(_me: LingoValue, shape: LingoValue): LingoValue {
    return callNamed("cursor", shape);
  },
};

/**
 * Lingo's `the key` object, which the emitter renders as `_key`.
 *
 * Used two ways in the casts: `_key.keyCode` and `keyPressed(_key, n)`. Reads
 * through `theProperty` so it tracks whatever the host installed as the live key
 * state rather than holding a stale copy.
 *
 * ⚠ Like `setGlobal` and `deleteStringChunk`, this is emitted as a bare
 * identifier — so a missing definition is a ReferenceError that only fires when
 * that one handler runs, which is how it survived until a cast loaded at boot.
 */
export const _key: LingoObject = {
  get key(): LingoValue {
    return theProperty("key");
  },
  get keyCode(): LingoValue {
    return theProperty("keyCode");
  },
  // `the controlDown of _key` etc. — HM's vacuum reads them this way.
  get shiftDown(): LingoValue {
    return theProperty("shiftDown");
  },
  get controlDown(): LingoValue {
    return theProperty("controlDown");
  },
  get optionDown(): LingoValue {
    return theProperty("optionDown");
  },
  get commandDown(): LingoValue {
    return theProperty("commandDown");
  },
  /**
   * ⚠ Same question as the global `keyPressed(x)`: is that key held NOW — and
   * several can be. It used to compare against `the key` / `the keyCode`
   * (the LAST keyDown, never cleared), so two held arrows read as one and
   * Haunted Mansion's diagonals (`CHMGameInterface.ReadKeys` sums four
   * `_key.keyPressed` calls) were impossible.
   */
  keyPressed(_me: LingoValue, which: LingoValue): LingoValue {
    const held = builtins.get("keypressed"); // the table is keyed lower-case
    if (held) return held(which);
    const wanted = String(which);
    return String(theProperty("key") ?? "") === wanted || String(theProperty("keyCode") ?? "") === wanted ? 1 : 0;
  },
};

/**
 * Director's `the sound` object, which the emitter renders as `_sound`.
 *
 * `_sound.channel(n)` is the modern spelling of `sound(n)` and must hand back
 * the SAME channel object, or a channel configured through one spelling reads
 * back unconfigured through the other. `CSoundChannelObject.DefineChannel`
 * takes its channel this way while `CSoundTracker.resetSettings` uses `sound(i)`
 * — the same eight channels, reached two ways.
 *
 * ⚠ Fourth instance of the emitted-bare-identifier shape, after `setGlobal`,
 * `deleteStringChunk` and `_key`: it is a ReferenceError that fires only when
 * its one handler runs. `generated-imports.check.mts` exists to find these by
 * inspection instead of one boot at a time.
 */
/**
 * Lingo's `_mouse` object — `_mouse.clickLoc`, `_mouse.mouseLoc`, …
 *
 * ⚠ THE EMITTER NEVER IMPORTS IT: generated files import `_player`, `_key` and
 * `_sound`, but `_mouse` is left a bare identifier, so every read was a
 * ReferenceError thrown out of the handler. MEASURED on the stage song picker:
 * `CMusicPlayerSongList.eventProcInternal` dies on `_mouse.clickLoc`, the row
 * is never selected and PLAY never enables. Published on `globalThis` so the
 * bare name resolves; reads go through `theProperty` like `_key`.
 */
export const _mouse: LingoObject = {
  get clickLoc(): LingoValue {
    return theProperty("clickLoc");
  },
  get mouseLoc(): LingoValue {
    return theProperty("mouseLoc");
  },
  get mouseH(): LingoValue {
    return theProperty("mouseH");
  },
  get mouseV(): LingoValue {
    return theProperty("mouseV");
  },
  get mouseDown(): LingoValue {
    return theProperty("mouseDown");
  },
  get mouseUp(): LingoValue {
    return theProperty("mouseUp");
  },
  get clickOn(): LingoValue {
    return theProperty("clickOn");
  },
  get doubleClick(): LingoValue {
    return theProperty("doubleClick");
  },
  get stillDown(): LingoValue {
    return theProperty("stillDown");
  },
};
(globalThis as unknown as { _mouse: LingoObject })._mouse = _mouse;

export const _sound: LingoObject = {
  channel(_me: LingoValue, index: LingoValue): LingoValue {
    return callNamed("sound", index);
  },
};

export function setGlobalVar(name: string, value: LingoValue): LingoValue {
  globals.set(name, value);
  return value;
}

/**
 * The name the emitter uses for a write to a `global` variable — it reads
 * through `globalVar` and writes through `setGlobal`. Four *_API bootstraps
 * depend on it (`CreateErrorManager`, `CreateObjectManager` and friends), and
 * because a bare identifier only fails when that handler actually runs, the gap
 * survived until the boot thread reached it.
 */
export const setGlobal = setGlobalVar;

// Both list classes use ordinary TypeScript signatures.
(LingoList.prototype as unknown as Record<symbol, unknown>)[LINGO_NATIVE] = true;
(LingoPropList.prototype as unknown as Record<symbol, unknown>)[LINGO_NATIVE] = true;

/**
 * Director chunk expressions, as properties on strings.
 *
 * Lingo treats `line`, `word`, `item` and `char` as navigable chunks of any
 * string, and VMK's own parser leans on it hard:
 *
 *   tdata.line.count            number of lines
 *   tdata.line[i]               the i-th line
 *   tdata.line[i].word[1]       first word of that line
 *
 * The emitter renders these as plain property access, so they have to exist on
 * strings themselves. Extending `String.prototype` is a deliberate choice: the
 * alternative is wrapping every string in an object, which breaks equality and
 * every comparison in the corpus. The properties are non-enumerable, so they do
 * not show up in iteration or serialisation.
 *
 * ⚠ Indices are 1-based, and `[0]` is empty — Lingo has no zeroth chunk.
 */
export type ChunkAccessor = { count: number } & Record<number, string>;

function makeChunkAccessor(parts: string[], separator = " "): ChunkAccessor {
  const target = { count: parts.length } as ChunkAccessor;
  return new Proxy(target, {
    get(object, property) {
      if (property === "count") return parts.length;
      if (typeof property === "string" && /^\d+$/.test(property)) {
        return parts[Number(property) - 1] ?? "";
      }
      /**
       * ⚠ `word.range(a, b)` is Director's `word a to b` — a contiguous slice
       * re-joined with the chunk's own separator, not a list. `String Services
       * Class.convertToPropList` uses it to trim a key, and it runs on the very
       * first config file the client downloads, so its absence stops the boot.
       *
       * Bounds are clamped rather than validated: Director returns the empty
       * string for an out-of-range chunk instead of erroring, and the callers
       * here pass `1, word.count` on strings that may be empty.
       */
      if (property === "range") {
        return (from: LingoValue, to: LingoValue): string => {
          const start = Math.max(1, Math.floor(Number(from) || 1));
          const end = Math.min(parts.length, Math.floor(Number(to) || 0));
          if (end < start) return "";
          return parts.slice(start - 1, end).join(separator);
        };
      }
      return Reflect.get(object, property);
    },
  });
}

let chunksInstalled = false;

export function installStringChunks(): void {
  if (chunksInstalled) return;
  chunksInstalled = true;

  /**
   * ⚠ SPLITS THROUGH THE MEMO — this getter is the hot path, not `chunkOf`.
   *
   * The emitter renders `item i of tStr` as `tStr.item[i]`, so a loop over a
   * string's items lands HERE once per iteration. Splitting inside the getter
   * therefore re-split the whole string on every single access, which is what
   * made `CMgrVariable.dump` cost 8.0 s and `CCoreXMLParser.ParseXML` 21.0 s.
   *
   * `makeChunkAccessor` only ever reads `parts` (index, `count`, `range`), so
   * handing it the shared cached array is safe. See `splitChunks`.
   */
  const define = (
    name: string,
    kind: ChunkKind,
    // Director re-joins a chunk range with that chunk's own separator, so each
    // kind has to carry it: words by space, lines by CR, chars by nothing, and
    // items by the live itemDelimiter.
    separator: () => string,
  ): void => {
    Object.defineProperty(String.prototype, name, {
      get(this: string) {
        return makeChunkAccessor(splitChunks(String(this), kind), separator());
      },
      enumerable: false,
      configurable: true,
    });
  };

  define("line", "line", () => "\r");
  define("word", "word", () => " ");
  define("char", "char", () => "");
  // `item` follows the live itemDelimiter, which Lingo code reassigns freely.
  define("item", "item", () => itemDelimiter);

  /**
   * `the ref of <chunk>` — Director's handle for styling a slice of rich text.
   *
   * ⚠ IT HAS TO EXIST OR THE ASSIGNMENT THROUGH IT DIES. `CHelpContent.setStyle`
   * colours each hyperlink with
   *
   *     linkRef = pViewMem.char.range(i[1], i[2]).ref
   *     the color of linkRef = rgb(255,255,255)
   *
   * and with no `ref` that is `the color of VOID` — a throw that aborts the help
   * window mid-build, after its text is already set.
   *
   * ⚠ WHAT IT IS NOT: per-character formatting. A chunk taken off a string has
   * no way back to the member it came from, and nothing in the compositor draws
   * per-character styles yet — every run takes the member's own font, size and
   * colour. So this ACCEPTS the assignments and records them on the reference,
   * which is where a real implementation would read them from. The visible
   * difference today is that a help link is drawn in the body colour rather than
   * white and underlined.
   */
  Object.defineProperty(String.prototype, "ref", {
    get(this: string) {
      return { text: String(this) } as Record<string, unknown>;
    },
    enumerable: false,
    configurable: true,
  });

  /**
   * ⚠ DIRECTOR VALUE ACCESSORS — `the integer/float/string of <value>`.
   *
   * The emitter renders `the integer of x` as PLAIN PROPERTY ACCESS `x.integer`
   * (only `integer(x)` becomes a `callNamed`), so these must live on the values
   * themselves — exactly the same reasoning as the chunk accessors above. Our
   * integers are bare JS numbers, so without this `(2).integer` is `undefined`,
   * and the two spellings of the same Lingo cast silently disagree.
   *
   * ⚠ WHAT THIS COST: `CRoomItemAssetManager.LoadCastLibsForType` opens with
   * `a_iTypeCode = a_iTypeCode.integer`. The furniture type codes arrive as bare
   * numbers (prop-list keys), so every one became VOID, `getaProp` collapsed the
   * lot onto a single VOID entry, and its cast list came up empty — GetByTypeCode
   * logged "Unknown object type code:" and the inventory Furnishings grid span
   * forever. `LoadCastLibsForItem` used `integer(...)` and was fine, which is why
   * the same screen sometimes worked: it depended on which spelling ran.
   *
   * Each getter delegates to the SAME builtin the call form uses (unboxing the
   * primitive first so the builtin sees a real number/string, not a wrapper), so
   * `x.integer` and `integer(x)` can never diverge again. Non-enumerable, so they
   * stay out of iteration and serialisation.
   */
  const defineValueAccessor = (
    proto: object,
    name: "integer" | "float" | "string" | "value",
    /** The property name, when the emitter spells it differently. */
    as: string = name,
  ): void => {
    Object.defineProperty(proto, as, {
      get(this: { valueOf(): LingoValue }) {
        // Unbox the Number/String WRAPPER that property access boxed the
        // primitive into, so the builtin sees a real number/string. A LingoFloat
        // is already the value the builtin wants (it carries its own precision),
        // so hand that through untouched.
        const value = this instanceof LingoFloat ? this : this.valueOf();
        return callNamed(name, value as LingoValue);
      },
      enumerable: false,
      configurable: true,
    });
  };
  for (const name of ["integer", "float", "string"] as const) {
    defineValueAccessor(Number.prototype, name);
    defineValueAccessor(String.prototype, name);
    defineValueAccessor(LingoFloat.prototype, name);
  }
  /**
   * ⚠ THE EMITTER WRITES `the string of x` AS `x._string` — it escapes the
   * name as if it were reserved — so the `.string` accessor above was never
   * reached from generated code: every one of the 46 `._string` sites read
   * `undefined`. The one that surfaced: the messenger's `parseServerMessage`
   * names each array from the preceding count key (`#friend_count` ->
   * `"friend_" & "array"`), got `undefined`, filed the friend list under
   * `#array`, and set the address book to VOID — so clicking any avatar crashed
   * `CRoomAvatarProfile.select` in `isFriend` ("can't access property toArray").
   * The quest engine parses its messages the same way.
   */
  defineValueAccessor(Number.prototype, "string", "_string");
  defineValueAccessor(String.prototype, "string", "_string");
  defineValueAccessor(LingoFloat.prototype, "string", "_string");
  /**
   * ⚠ `aString.value` — the property form of `value(aString)`, i.e. PARSE it.
   * Read VOID, so every received music-mixer song (`PlaySongResult`,
   * `SetTrackData`: `t_songData = t_data.value`) failed its `ilk = #list` test:
   * PLAY on the stage played nothing and the "Playing X, mixed by Y" ticker
   * never showed. Strings only — a number's `.value` is not Lingo.
   */
  defineValueAccessor(String.prototype, "value");
}

/** Test/boot helper — clears every host binding. */
export function resetLingoRuntime(): void {
  builtins.clear();
  stubbedBuiltins.clear();
  globalHandlers.clear();
  hostHandlers.clear();
  globals.clear();
  movieProperties.clear();
  dynamicProperties.clear();
  missingBuiltins.clear();
  itemDelimiter = ",";
  // Not for correctness — the delimiter is part of each key — but so a reset
  // does not keep the boot's largest strings alive behind the memo.
  splitCache.length = 0;
}








