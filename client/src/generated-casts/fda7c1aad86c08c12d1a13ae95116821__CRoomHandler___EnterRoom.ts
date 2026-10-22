// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _EnterRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EnterRoom(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRoomCode = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iRoomVer = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sRoomText = callMethod("GetStrFrom", a_rMsg.connection);
  var t_iRoomRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rLoader = callNamed("getObject", "RoomItemAssetManager");
  callMethod("FlushQueue", t_rLoader)
  if (callNamed("variableExists", lingoBinary("join", "preload.", t_iRoomRef))) {
  var t_ar_iItems = callNamed("getVariableValue", lingoBinary("join", "preload.", t_iRoomRef));
  if (callNamed("listp", t_ar_iItems)) {
  for (var t_iType of t_ar_iItems.toArray()) {
  if ((lingoTruthy(callMethod("IsItemReady", t_rLoader, t_iType)) ? 0 : 1)) {
  callMethod("LoadCastLibsForType", t_rLoader, t_iType)
  }

  }

  } else {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "List of preloaded items for room", t_iRoomRef), "is corrupted!"), symbol("_EnterRoom"))
  }

  }

  if (callNamed("variableExists", lingoBinary("join", "room.code.", t_iRoomCode))) {
  var t_sRoomName = callNamed("getVariable", lingoBinary("join", "room.code.", t_iRoomCode));
  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Room name not defined:", t_iRoomCode), symbol("_EnterRoom"))
  t_sRoomName = callNamed("string", t_iRoomCode);
  }

  var t_ar_sCasts = new LingoList([]);
  if (callNamed("variableExists", lingoBinary("join", lingoBinary("join", "room.cast.", t_iRoomCode), ".1"))) {
  var i = 1;
  while (1) {
  callMethod("add", t_ar_sCasts, callNamed("getVariable", lingoBinary("join", lingoBinary("join", lingoBinary("join", "room.cast.", t_iRoomCode), "."), i)))
  i = lingoBinary("add", i, 1);
  if ((lingoTruthy(callNamed("variableExists", lingoBinary("join", lingoBinary("join", lingoBinary("join", "room.cast.", t_iRoomCode), "."), i))) ? 0 : 1)) {
  break;
  }

  }

  } else {
  if (callNamed("variableExists", lingoBinary("join", "room.cast.", t_iRoomCode))) {
  t_ar_sCasts = new LingoList([callNamed("getVariable", lingoBinary("join", "room.cast.", t_iRoomCode))]);
  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Room casts not defined:", t_iRoomCode), symbol("_EnterRoom"))
  t_ar_sCasts = new LingoList([]);
  }

  }

  var t_rXML = callNamed("CreateXML", callNamed("getMember", "room.files.xml").text);
  if (callMethod("Search", t_rXML, "type", "FILES")) {
  callMethod("SetParam", t_rXML, "ID", t_sRoomName)
  callMethod("SetParam", t_rXML, "CODE", t_iRoomCode)
  if (callMethod("Search", t_rXML, "type", "CASTS")) {
  if (lingoBinary("lt", callMethod("count", t_rXML), t_ar_sCasts.count)) {
  while (1) {
  callMethod("SetChild", t_rXML, callNamed("string", theProperty("milliSeconds")), callMethod("duplicate", t_rXML[1]))
  if (lingoBinary("gte", callMethod("count", t_rXML), t_ar_sCasts.count)) {
  break;
  }

  }

  }

  for (var i = 1; i <= t_ar_sCasts.count; ++i) {
  callMethod("setaProp", t_rXML[i].param, "URL", t_ar_sCasts[i])
  }

  }

  }

  /*
   * ⚠ HAND-CORRECTED — CANCEL AN IN-FLIGHT LOAD BEFORE STARTING ANOTHER.
   * ⚠ RE-APPLY THIS AFTER ANY REGENERATION of client/src/generated-casts.
   *
   * `_CreateRoom` only knows how to displace a room that FINISHED building — it
   * does `if objectp(m_rContext) then _RemoveRoom`. A load still in flight has
   * no context yet, so a second 2590 sails straight past that guard: it resets
   * the step lists while the FIRST load's castload callbacks are still
   * outstanding, and those stale callbacks then tick the new, shorter process to
   * ready. `_PrepareRoom` fires early, and again when the real casts land.
   *
   * MEASURED: `room_ready` broadcast 3x for one cambodian entry and 2x for a
   * tiki entry while moving quickly, against exactly 1x for an unhurried one.
   *
   * ⚠ THAT DUPLICATE IS THE FIRST DOMINO OF A SESSION-WIDE FAILURE, and the
   * whole chain was measured:
   *
   *   1. `CTikiHandlerComponent.RoomReady` is unguarded —
   *      `m_stage = createObject("tiki_boats", "CStage")` then `LoadXML(m_stage…)`.
   *      On the second run `CMgrObject.create` returns 0 ("Object already
   *      exists"), so `m_stage` becomes the NUMBER 0.
   *   2. On room leave `deconstruct` runs
   *      `if not voidp(m_stage) then removeObject(getID(m_stage))`. `voidp(0)`
   *      is FALSE, so it calls `getID(0)` and throws.
   *   3. That throw escapes `closeThread` -> `ResetOneDynamicCast` ->
   *      `RemoveCastLib`, ABORTING `_UnloadRoom`'s removal loop, so the handler
   *      cast is never unloaded. MEASURED standing in cambodian:
   *      `vmk_space_extensions/vmk_tiki_handler` still attached, `#tikihandler`
   *      thread still open, `tiki_boats` still alive — while tiki's space and
   *      sound casts unloaded correctly.
   *   4. The orphaned `#tikihandler_component` stays subscribed to `room_ready`,
   *      and `CMgrBroker.Execute` walks subscribers IN REVERSE with no
   *      per-subscriber guard — so the orphan runs FIRST, throws again, and
   *      `SoundTracker` and `AnimationManager` are NEVER REACHED.
   *
   * The visible result is that every room entered after visiting tiki is silent
   * AND static, for the rest of the session, which is why it read as random.
   *
   * `_CancelRoom` is VMK's own answer and needs no new machinery: with no
   * context it sets `m_bCancelled`, which `_UpdateProcess` already honours by
   * skipping the prepare. It is the same call the server drives through message
   * 2042 (`_CancelRoomLoad`), so this only makes the client do for itself what
   * the server would have told it to do.
   */
  var t_rRoomComponent = callMethod("getComponent", _this);
  if (
    lingoBinary("neq", t_rRoomComponent.m_sActive, "")
    && !lingoTruthy(callNamed("objectp", t_rRoomComponent.m_rContext))
  ) {
    callMethod("_CancelRoom", t_rRoomComponent)
  }

  callMethod("_CreateRoom", t_rRoomComponent, t_rXML, t_iRoomVer, t_iRoomRef)
  callMethod("ShowLoadBar", callMethod("getInterface", _this), t_sRoomText, t_iRoomCode)
}

