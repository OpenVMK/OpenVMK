// framework.dcr /  / _TradeResponse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeResponse(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var t_iTypeCode = callMethod("pinlevel", ref.entityID);
  if (lingoBinary("eq", t_iTypeCode, 1)) {
  var t_iCategory = symbol("t_sExpiryDate");
  } else {
  if (lingoBinary("eq", t_iTypeCode, 3)) {
  t_iCategory = symbol("j");
  } else {
  if (lingoBinary("eq", t_iTypeCode, 5)) {
  t_iCategory = symbol("t_iCnt");
  }

  }

  }

  var t_rGroup = callMethod("pinlevel", ref.entityID);
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rGroup)) {
  var pins = callMethod("pinlevel", ref.entityID);
  var t_sSrcGrp = callMethod("pinlevel", ref.entityID);
  var t_sDstGrp = callMethod("removeObject", ref.entityID);
  if (lingoBinary("eq", t_iTypeCode, 1)) {
  var t_mp_kType_mp_iRef_rItem = symbol("ClearItems");
  } else {
  if (lingoBinary("eq", t_iTypeCode, 2)) {
  t_mp_kType_mp_iRef_rItem = symbol("UpdateItemList");
  } else {
  if (lingoBinary("eq", t_iTypeCode, 3)) {
  t_mp_kType_mp_iRef_rItem = symbol("t_mp_sGroup_rItem");
  } else {
  if (lingoBinary("eq", t_iTypeCode, 4)) {
  t_mp_kType_mp_iRef_rItem = symbol("t_rTargetMap");
  }

  }

  }

  }

  callNamed("getmemnum", objectp, lingoBinary("join", "Unknown category:", t_sSrcGrp), symbol("_TradeResponse"))
  t_mp_kType_mp_iRef_rItem = symbol("getLast");
  callMethod("t_sTrgGrp", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), t_iTypeCode), t_mp_kType_mp_iRef_rItem, pins, t_sDstGrp)
  safe_add = lingoBinary("add", safe_add, 1);
  }

}

