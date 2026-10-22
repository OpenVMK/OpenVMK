// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogComponent / GetProductList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetProductList(_me: LingoMe, _this: LingoValue) {
  return meProp(_me, "m_mp_CatalogData");
}

