// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CCellBlinker / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (callNamed("voidp", meProp(_me, "m_rWindowElement"))) {
  setMeProp(_me, "m_bBlinking", 0);
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iTimer"), 1), meProp(_me, "m_bBlinking"))) {
  setMeProp(_me, "m_bToggle", (lingoTruthy(meProp(_me, "m_bToggle")) ? 0 : 1));
  callMethod("blink", _me)
  }

  setMeProp(_me, "m_iTimer", lingoBinary("add", meProp(_me, "m_iTimer"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iTimer"), meProp(_me, "m_iDelay"))) {
  setMeProp(_me, "m_iTimer", 1);
  }

}

