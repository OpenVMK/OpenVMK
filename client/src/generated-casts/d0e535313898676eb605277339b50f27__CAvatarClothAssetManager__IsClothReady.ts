// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / IsClothReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsClothReady(_me: LingoMe, _this: LingoValue, a_iClothTypeCode: LingoValue) {
  var t_rType = callMethod("getaProp", meProp(_me, "m_mp_iCode_rProps"), callNamed("integer", a_iClothTypeCode));
  if (callNamed("voidp", t_rType)) {
  var t_rStruct = callMethod("GetByTypeCode", meProp(_me, "m_rClothingMap"), a_iClothTypeCode);
  if (callNamed("voidp", t_rStruct)) {
  callNamed("error", _this, lingoBinary("join", lingoBinary("joinPad", "Cloth description not found in clothing map:", a_iClothTypeCode), "!"), symbol("IsItemReady"))
  return 1;
  } else {
  return lingoBinary("or", lingoBinary("eq", t_rStruct.param["CASTS"], ""), lingoBinary("eq", t_rStruct.param["CASTS"], undefined));
  }

  } else {
  return lingoBinary("eq", t_rType.status, symbol("ready"));
  }

}

