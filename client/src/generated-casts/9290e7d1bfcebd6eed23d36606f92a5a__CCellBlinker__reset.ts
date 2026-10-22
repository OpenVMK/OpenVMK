// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CCellBlinker / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe) {
  setMeProp(_me, "m_bBlinking", 0);
  if (callNamed("voidp", meProp(_me, "m_rWindowElement"))) {
  return;
  }

  setMeProp(_me, "m_bToggle", 0);
  callMethod("blink", _me)
}

