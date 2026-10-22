// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponentPage / getLastTask

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getLastTask(_me: LingoMe) {
  return meProp(_me, "m_ar_components")[lingoBinary("sub", meProp(_me, "m_ar_components").count, 1)];
}

