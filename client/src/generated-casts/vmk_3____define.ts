// vmk_3.dcr /  / define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function define(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_iResponse = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_ar_CustomBtn = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_sTraderName = callMethod("t_kCat", GetInventory.ClearItems);
  var t_dialogEvent = callMethod("t_kCat", GetInventory.ClearItems);
  callMethod("t_iTraderGender", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 1), symbol("t_mp_iRef_rItem"), t_iResponse, callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 3), symbol("t_mp_iRef_rItem"), t_ar_CustomBtn, t_sTraderName, t_dialogEvent)
}

