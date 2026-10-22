// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomItemAssetManager / IsItemLoading

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsItemLoading(_me: LingoMe, _this: LingoValue, a_iItemTypeCode: LingoValue) {
  var t_rType = callMethod("getaProp", meProp(_me, "m_mp_iType_rProps"), callNamed("integer", a_iItemTypeCode));
  if (callNamed("voidp", t_rType)) {
  return lingoBinary("gt", callMethod("getOne", meProp(_me, "m_ar_iPending"), a_iItemTypeCode), 0);
  } else {
  return lingoBinary("eq", t_rType.status, symbol("LOADING"));
  }

}

