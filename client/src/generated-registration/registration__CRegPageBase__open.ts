// registration.cct / CRegPageBase / open

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function open(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  setMeProp(_me, "m_bVisible", callMethod("show", meProp(_me, "m_rWindow")));
  return meProp(_me, "m_bVisible");
  } else {
  return callNamed("error", _this, "Inventory not ready yet!", symbol("open"));
  }

}

