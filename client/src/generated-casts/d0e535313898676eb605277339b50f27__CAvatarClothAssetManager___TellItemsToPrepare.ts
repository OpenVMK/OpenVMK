// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / _TellItemsToPrepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TellItemsToPrepare(_me: LingoMe, _this: LingoValue, a_ar_iListOfItems: LingoValue) {
  for (var t_iCloth of a_ar_iListOfItems.toArray()) {
  callMethod("deleteOne", meProp(_me, "m_ar_iLoading"), t_iCloth)
  callMethod("deleteOne", meProp(_me, "m_ar_iPending"), t_iCloth)
  var t_rType = callMethod("getaProp", meProp(_me, "m_mp_iCode_rProps"), t_iCloth);
  if (callNamed("voidp", t_rType)) {
  callNamed("error", _this, lingoBinary("join", lingoBinary("joinPad", "Item type properties lost for type", t_iCloth), "!"), symbol("_TellItemsToPrepare"))
  continue;
  }

  callNamed("call", symbol("AssetsLoaded"), t_rType.items, t_iCloth)
  setThePropOf(t_rType, "items", new LingoList([]));
  }

}

