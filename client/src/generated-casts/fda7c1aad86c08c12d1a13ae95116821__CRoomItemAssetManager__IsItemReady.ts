// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomItemAssetManager / IsItemReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsItemReady(_me: LingoMe, _this: LingoValue, a_iItemTypeCode: LingoValue) {
  var t_rType = callMethod("getaProp", meProp(_me, "m_mp_iType_rProps"), callNamed("integer", a_iItemTypeCode));
  if (callNamed("voidp", t_rType)) {
  var t_rStruct = callMethod("GetByTypeCode", meProp(_me, "m_rFurnitureMap"), a_iItemTypeCode);
  if (callNamed("voidp", t_rStruct)) {
  callNamed("error", _this, lingoBinary("join", lingoBinary("joinPad", "Item description not found in furnimap:", a_iItemTypeCode), "!"), symbol("IsItemReady"))
  return 1;
  } else {
  return lingoBinary("or", lingoBinary("eq", t_rStruct.param["CASTS"], ""), lingoBinary("eq", t_rStruct.param["CASTS"], undefined));
  }

  } else {
  return lingoBinary("eq", t_rType.status, symbol("ready"));
  }

}

