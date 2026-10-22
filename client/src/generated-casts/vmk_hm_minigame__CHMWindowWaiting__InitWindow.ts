// vmk_hm_minigame.cct / CHMWindowWaiting / InitWindow

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

  callNamed("createWindow", meProp(_me, "m_sWindowName"), "vmk_hm_waiting.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  callMethod("center", tWndObj)
  } else {
  return callNamed("error", _me, "HMGWindow.Waiting: Unable to create window ", symbol("InitWindow"));
  }

  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "bg", callNamed("member", "waiting.bg"))
}

