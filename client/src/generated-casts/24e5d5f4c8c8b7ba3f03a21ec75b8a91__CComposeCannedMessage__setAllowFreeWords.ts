// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / setAllowFreeWords

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAllowFreeWords(_me: LingoMe, t_allowFreeWords: LingoValue) {
  if ((lingoTruthy(t_allowFreeWords) ? 0 : 1)) {
  if (lingoBinary("eq", callMethod("getPos", meProp(_me, "m_ar_symParseOptions"), symbol("DisAllowFreeWords")), 0)) {
  callMethod("append", meProp(_me, "m_ar_symParseOptions"), symbol("DisAllowFreeWords"))
  }

  } else {
  callMethod("deleteOne", meProp(_me, "m_ar_symParseOptions"), symbol("DisAllowFreeWords"))
  }

}

