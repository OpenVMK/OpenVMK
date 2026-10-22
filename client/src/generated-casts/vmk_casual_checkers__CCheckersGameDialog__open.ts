// vmk_casual_checkers.cct / CCheckersGameDialog / open

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function open(_me: LingoMe, _this: LingoValue, a_sWindow: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWindow"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindow"))
  }

  if (callNamed("createWindow", meProp(_me, "m_sWindow"))) {
  var t_rWindow = callNamed("getWindow", meProp(_me, "m_sWindow"));
  callMethod("merge", t_rWindow, a_sWindow)
  callMethod("center", t_rWindow)
  }

}

