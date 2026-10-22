// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / setAllowFriendNames

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
  if (lingoBinary("eq", callMethod("getPos", meProp(_me, "m_ar_symParseOptions"), symbol("DisAllowFriendNames")), 0)) {
  callMethod("append", meProp(_me, "m_ar_symParseOptions"), symbol("DisAllowFriendNames"))
  }

  } else {
  callMethod("deleteOne", meProp(_me, "m_ar_symParseOptions"), symbol("DisAllowFriendNames"))
  }

}

