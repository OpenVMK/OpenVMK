// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / close

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
  callMethod("hide", meProp(_me, "m_rWindow"))
  setMeProp(_me, "m_bVisible", 0);
  return meProp(_me, "m_bVisible");
  } else {
  setMeProp(_me, "m_bVisible", 0);
  return callNamed("error", _this, "Inventory not ready yet!", symbol("close"));
  }

}

