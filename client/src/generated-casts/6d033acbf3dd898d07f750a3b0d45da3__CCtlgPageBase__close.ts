// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCtlgPageBase / close

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function close(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  setMeProp(_me, "m_bVisible", (lingoTruthy(callMethod("hide", meProp(_me, "m_rWindow"))) ? 0 : 1));
  return meProp(_me, "m_bVisible");
  } else {
  return callNamed("error", _this, "Inventory not ready yet!", symbol("close"));
  }

}

