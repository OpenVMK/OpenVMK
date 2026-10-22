// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomItemAssetManager / _TellItemsToPrepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TellItemsToPrepare(_me: LingoMe, _this: LingoValue, a_ar_iListOfItems: LingoValue) {
  for (var t_iType of a_ar_iListOfItems.toArray()) {
  callMethod("deleteOne", meProp(_me, "m_ar_iLoading"), t_iType)
  callMethod("deleteOne", meProp(_me, "m_ar_iPending"), t_iType)
  var t_rType = callMethod("getaProp", meProp(_me, "m_mp_iType_rProps"), t_iType);
  if (callNamed("voidp", t_rType)) {
  callNamed("error", _this, lingoBinary("join", lingoBinary("joinPad", "Item type properties lost for type", t_iType), "!"), symbol("_TellItemsToPrepare"))
  continue;
  }

  callNamed("call", symbol("TellVisual"), t_rType.items, symbol("AssetsLoaded"))
  setThePropOf(t_rType, "items", new LingoList([]));
  }

}

