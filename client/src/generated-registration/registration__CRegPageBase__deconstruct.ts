// registration.cct / CRegPageBase / deconstruct

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  callNamed("unregisterMessage", symbol("ui_registration"))
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("Purge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj")))
  setMeProp(_me, "m_rCurPageObj", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rWindow")))
  setMeProp(_me, "m_rWindow", undefined);
  }

  }

  setMeProp(_me, "m_iCurrentPage", 0);
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_bVisible", 0);
  return 1;
}

