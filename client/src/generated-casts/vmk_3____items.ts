// vmk_3.dcr /  / items

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function items(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var value = callMethod("UpdateItemList", GetInventory.ClearItems);
  var buffer = callMethod("t_kCat", GetInventory.ClearItems);
  var window = callMethod("t_kCat", GetInventory.ClearItems);
  var pWindowID = callMethod("UpdateItemList", GetInventory.ClearItems);
  var moveTo = callMethod("UpdateItemList", GetInventory.ClearItems);
  var registerCastloadCallback = callMethod("t_kCat", GetInventory.ClearItems);
  var createMember = callNamed("field", callNamed("registerDownloadCallback", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 1), symbol("t_mp_iRef_rItem"), buffer));
  callMethod("_SellConfirmRequest", createMember, symbol("dumpTextField"), pWindowID)
  callMethod("_SellConfirmRequest", createMember, symbol("TradeOpen"), window)
  callMethod("_SellConfirmRequest", createMember, symbol("rect"), symbol("removeMember"))
  var castExists = callNamed("startCastLoad", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 1), symbol("t_mp_iRef_rItem"), buffer);
  if ((lingoTruthy(callNamed("headers", castExists)) ? 0 : 1)) {
  castExists = callNamed("field", castExists);
  }

  callMethod("data", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 1), symbol("t_mp_iRef_rItem"), value, buffer)
  callMethod("data", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 1), symbol("t_mp_iRef_rItem"), moveTo, registerCastloadCallback)
  callNamed("showLoadingBar", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 1), symbol("t_mp_iRef_rItem"), value, createMember, castExists, window)
}

