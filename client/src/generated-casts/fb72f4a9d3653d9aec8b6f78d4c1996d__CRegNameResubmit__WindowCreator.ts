// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegNameResubmit / WindowCreator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function WindowCreator(_me: LingoMe, _this: LingoValue) {
  if (callNamed("createWindow", "NameRejected", "vmk_reg_refused.window")) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", "NameRejected"));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("keyDown"))
  callMethod("center", meProp(_me, "m_rWindow"))
  }

}

