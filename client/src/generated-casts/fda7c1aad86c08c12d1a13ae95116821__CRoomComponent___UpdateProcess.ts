// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomComponent / _UpdateProcess

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UpdateProcess(_me: LingoMe, _this: LingoValue, a_sState: LingoValue) {
  /*
   * ⚠ HAND-CORRECTED DECOMPILER BUG — the `otherwise:` branch was LOST.
   * ⚠ RE-APPLY THIS AFTER ANY REGENERATION of client/src/generated-casts.
   *
   * The decompiled Lingo reads
   *
   *     case a_sState of
   *       "casts_ready": … "files_ready": … "logic_ready": …
   *     end case
   *     return error(this, "Unknown step:" && a_sState, #_UpdateProcess)
   *
   * which puts the error AFTER the case, so it runs unconditionally and every
   * line below it is dead. The room build could then never advance a single
   * step — `_CreateRoom` ran, `m_sActive` became the room name, and then every
   * `files_ready` / `casts_ready` callback logged "Unknown step" and returned,
   * leaving the "Entering …" bar at 0% forever.
   *
   * ⚠ THE BYTECODE IS THE AUTHORITY, and it is unambiguous — all three matching
   * cases jump PAST the error block, only the fall-through reaches it:
   *
   *     [0016] jmp 56   ─┐  0016+56 = 0072
   *     [0033] jmp 39   ─┤  0033+39 = 0072
   *     [0050] jmp 22   ─┘  0050+22 = 0072
   *     [0053] pop 1        ← no case matched: falls into…
   *     [0055]…[0070]       …getParam/pushCons "Unknown step:"/joinPadStr/error
   *     [0072] pop 1        ← the three jumps land HERE, after the error
   *     [0074] pushInt8 1   ← the repeat loop starts
   *
   * So it is `otherwise:`, and a matched step continues into the loop.
   */
  switch (a_sState) {
case "casts_ready":
  var t_rTask = meProp(_me, "m_rProcess").casts;
  break;
case "files_ready":
  t_rTask = meProp(_me, "m_rProcess").Files;
  break;
case "logic_ready":
  t_rTask = meProp(_me, "m_rProcess").logic;
  break;
  default:
  return callNamed("error", _this, lingoBinary("joinPad", "Unknown step:", a_sState), symbol("_UpdateProcess"));
  }

  for (var i = 1; i <= t_rTask.count; ++i) {
  if (lingoBinary("eq", t_rTask[i], 0)) {
  t_rTask[i] = 1;
  break;
  }

  }

  var t_iReady = 0;
  var t_iTotal = 0;
  for (var t_rStep of meProp(_me, "m_rProcess").toArray()) {
  for (var i = 1; i <= t_rStep.count; ++i) {
  t_iTotal = lingoBinary("add", t_iTotal, 1);
  if (lingoBinary("eq", t_rStep[i], 1)) {
  t_iReady = lingoBinary("add", t_iReady, 1);
  }

  }

  }

  if (lingoBinary("eq", t_iReady, 0)) {
  setMeProp(_me, "m_fPercent", float(0));
  } else {
  setMeProp(_me, "m_fPercent", lingoBinary("div", callNamed("float", t_iReady), callNamed("float", t_iTotal)));
  }

  var t_bReady = 1;
  for (var t_rStep of meProp(_me, "m_rProcess").toArray()) {
  for (var i = 1; i <= t_rStep.count; ++i) {
  if (lingoBinary("eq", t_rStep[i], 0)) {
  t_bReady = 0;
  break;
  }

  }

  }

  if (meProp(_me, "m_bCancelled")) {
  setMeProp(_me, "m_bCancelled", 0);
  } else {
  if (t_bReady) {
  if (callNamed("voidp", meProp(_me, "m_rFurniMap"))) {
  callNamed("error", _this, "Room thread isn't initialized properly!!!", symbol("_UpdateProcess"))
  callMethod("delay", _this, 1000, symbol("_UpdateProcess"), "files_ready")
  return;
  }

  if ((lingoTruthy(callMethod("IsReady", meProp(_me, "m_rFurniMap"))) ? 0 : 1)) {
  callNamed("error", _this, "Furniture map no ready!!!", symbol("_UpdateProcess"))
  callMethod("delay", _this, 1000, symbol("_UpdateProcess"), "files_ready")
  return;
  }

  if ((lingoTruthy(meProp(_me, "m_bProcessInitialized")) ? 0 : 1)) {
  setMeProp(_me, "m_bProcessInitialized", 1);
  callMethod("delay", _this, 500, symbol("_PrepareRoom"), meProp(_me, "m_sActive"))
  }

  }

  }

}

