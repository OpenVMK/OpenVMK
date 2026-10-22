// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CTryComponents / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  callMethod("sort", meProp(_me, "m_ar_components"))
  setMeProp(_me, "m_rWindow", undefined);
  callNamed("createWindow", "comptester")
  setMeProp(_me, "m_rWindow", callNamed("getWindow", "comptester"));
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_nav_guestrooms.window");
  callMethod("center", meProp(_me, "m_rWindow"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("createComponentWindow", _me)
  return 1;
}

