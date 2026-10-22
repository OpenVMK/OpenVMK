// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CScale9Grid / showAsActive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showAsActive(_me: LingoMe, a_bShowAsActive: LingoValue) {
  if (callNamed("voidp", a_bShowAsActive)) {
  a_bShowAsActive = 0;
  }

  setMeProp(_me, "m_bShowAsActive", a_bShowAsActive);
  setMeProp(_me, "m_bNeedUpdate", 1);
  if ((lingoTruthy(a_bShowAsActive) ? 0 : 1)) {
  setMeProp(_me, "m_bActive", 0);
  }

}

