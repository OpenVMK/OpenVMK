// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / setAllowFriendNames

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAllowFriendNames(_me: LingoMe, t_allowFriendNames: LingoValue) {
  if ((lingoTruthy(t_allowFriendNames) ? 0 : 1)) {
  if (lingoBinary("eq", callMethod("getPos", _me.m_ar_symParseOptions, symbol("DisAllowFriendNames")), 0)) {
  callMethod("append", _me.m_ar_symParseOptions, symbol("DisAllowFriendNames"))
  }

  } else {
  callMethod("deleteOne", _me.m_ar_symParseOptions, symbol("DisAllowFriendNames"))
  }

}

