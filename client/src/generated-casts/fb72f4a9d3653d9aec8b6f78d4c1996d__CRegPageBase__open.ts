// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPageBase / open

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
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

