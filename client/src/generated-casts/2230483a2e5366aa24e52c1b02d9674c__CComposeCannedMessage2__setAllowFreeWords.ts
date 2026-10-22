// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / setAllowFreeWords

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
  if (lingoBinary("eq", callMethod("getPos", _me.m_ar_symParseOptions, symbol("DisAllowFreeWords")), 0)) {
  callMethod("append", _me.m_ar_symParseOptions, symbol("DisAllowFreeWords"))
  }

  } else {
  callMethod("deleteOne", _me.m_ar_symParseOptions, symbol("DisAllowFreeWords"))
  }

}

