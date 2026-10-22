// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponentPage / setSortingOrder

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSortingOrder(_me: LingoMe, a_iSortingType: LingoValue) {
  switch (a_iSortingType) {
case symbol("alphabetical"):
  setMeProp(_me, "m_iSortingOrder", a_iSortingType);
  callMethod("sortComponentsAlphabetically", _me)
  break;
case symbol("fifo"):
case symbol("normal"):
  setMeProp(_me, "m_iSortingOrder", a_iSortingType);
  break;
case symbol("key"):
  setMeProp(_me, "m_iSortingOrder", a_iSortingType);
  callMethod("sortComponentsByKey", _me)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown sorting order", a_iSortingType))
  break;
  }

}

