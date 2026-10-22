// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / IsClothLoading

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsClothLoading(_me: LingoMe, _this: LingoValue, a_iClothTypeCode: LingoValue) {
  var t_rType = callMethod("getaProp", meProp(_me, "m_mp_iCode_rProps"), callNamed("integer", a_iClothTypeCode));
  if (callNamed("voidp", t_rType)) {
  return lingoBinary("gt", callMethod("getOne", meProp(_me, "m_ar_iPending"), a_iClothTypeCode), 0);
  } else {
  return lingoBinary("eq", t_rType.status, symbol("LOADING"));
  }

}

