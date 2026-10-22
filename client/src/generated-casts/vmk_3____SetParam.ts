// vmk_3.dcr /  / SetParam

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetParam(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_iResponse = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_ar_CustomBtn = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_sTraderName = callMethod("t_kCat", GetInventory.ClearItems);
  var t_dialogEvent = callMethod("t_kCat", GetInventory.ClearItems);
  if (lingoBinary("eq", t_ar_CustomBtn, -float(1))) {
  callMethod("data", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 3), symbol("t_mp_iRef_rItem"), t_iResponse, t_sTraderName)
  }

  callMethod("t_iTraderGender", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 3), symbol("t_mp_iRef_rItem"), t_iResponse, callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 1), symbol("t_mp_iRef_rItem"), t_ar_CustomBtn, t_sTraderName, t_dialogEvent)
}

