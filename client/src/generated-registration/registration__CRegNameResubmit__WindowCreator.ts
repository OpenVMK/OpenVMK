// registration.cct / CRegNameResubmit / WindowCreator

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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

