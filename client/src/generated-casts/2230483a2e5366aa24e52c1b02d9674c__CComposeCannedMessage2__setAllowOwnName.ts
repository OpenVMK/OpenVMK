// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / setAllowOwnName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAllowOwnName(_me: LingoMe, t_allowOwnName: LingoValue) {
  if ((lingoTruthy(t_allowOwnName) ? 0 : 1)) {
  if (lingoBinary("eq", callMethod("getPos", _me.m_ar_symParseOptions, symbol("DisAllowOwnName")), 0)) {
  callMethod("append", _me.m_ar_symParseOptions, symbol("DisAllowOwnName"))
  }

  } else {
  callMethod("deleteOne", _me.m_ar_symParseOptions, symbol("DisAllowOwnName"))
  }

}

