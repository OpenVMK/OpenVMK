// vmk_hm_minigame.cct / CHMWindowKeys / InitWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitWindow(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_sWindowName")), 0)) {
  callNamed("removeWindow", meProp(_me, "m_sWindowName"))
  }

  callNamed("createWindow", meProp(_me, "m_sWindowName"), "vmk_modal.window", 0, 0, symbol("modal"))
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  callMethod("center", tWndObj)
  } else {
  return callNamed("error", _me, "HMGWindow.Keys: Unable to create window ", symbol("InitWindow"));
  }

  callMethod("merge", tWndObj, "vmk_hm_keyoptions.window")
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("EventProc"), callMethod("getID", _me), symbol("mouseUp"))
  var t_Elem = callMethod("getElement", tWndObj, "basic.window.title");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callNamed("getText", "hmg.keys.title"))
  }

  callMethod("hide", callMethod("getElement", tWndObj, "select.default"))
  callMethod("hide", callMethod("getElement", tWndObj, "select.alternative"))
  var t_ar_directions = callMethod("GetMoveDirections", meProp(_me, "m_rClient"));
  switch (t_ar_directions) {
case new LingoList([0, 1, 2, 3, 4, 5, 6, 7]):
  callMethod("show", callMethod("getElement", tWndObj, "select.default"))
  break;
case new LingoList([7, 0, 1, 2, 3, 4, 5, 6, 7]):
  callMethod("show", callMethod("getElement", tWndObj, "select.alternative"))
  break;
  }

}

