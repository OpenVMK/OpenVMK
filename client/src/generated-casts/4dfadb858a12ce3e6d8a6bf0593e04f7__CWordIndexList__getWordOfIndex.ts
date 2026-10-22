// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CWordIndexList / getWordOfIndex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getWordOfIndex(_me: LingoMe, i_iIndex: LingoValue) {
  if (lingoBinary("and", lingoBinary("lte", i_iIndex, meProp(_me, "m_ar_list").count), lingoBinary("gte", i_iIndex, 1))) {
  return meProp(_me, "m_ar_list")[i_iIndex];
  } else {
  }

  return "";
}

