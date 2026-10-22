// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / setAllowOwnName

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
  if (lingoBinary("eq", callMethod("getPos", meProp(_me, "m_ar_symParseOptions"), symbol("DisAllowOwnName")), 0)) {
  callMethod("append", meProp(_me, "m_ar_symParseOptions"), symbol("DisAllowOwnName"))
  }

  } else {
  callMethod("deleteOne", meProp(_me, "m_ar_symParseOptions"), symbol("DisAllowOwnName"))
  }

}

