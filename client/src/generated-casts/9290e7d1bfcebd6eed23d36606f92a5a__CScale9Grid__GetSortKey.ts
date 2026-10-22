// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CScale9Grid / GetSortKey

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSortKey(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_sSortKey"), "")) {
  return callMethod("getText", _me);
  }

  return meProp(_me, "m_sSortKey");
}

