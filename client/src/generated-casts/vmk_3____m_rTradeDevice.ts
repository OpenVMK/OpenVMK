// vmk_3.dcr /  / m_rTradeDevice

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_rTradeDevice(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var getText = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_s_Title = callMethod("UpdateItemList", GetInventory.ClearItems);
  var stringp = 1;
  while (lingoBinary("lte", stringp, t_s_Title)) {
  var confirm = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_rParameter = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_sTraderName = callMethod("t_kCat", GetInventory.ClearItems);
  var t_dialogName = callMethod("t_kCat", GetInventory.ClearItems);
  callMethod("t_iTraderGender", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), getText), symbol("RemItem"), confirm, callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 2), symbol("RemItem"), t_rParameter, t_sTraderName, t_dialogName)
  stringp = lingoBinary("add", stringp, 1);
  }

  t_s_Title = callMethod("UpdateItemList", GetInventory.ClearItems);
  stringp = 1;
  while (lingoBinary("lte", stringp, t_s_Title)) {
  confirm = callMethod("UpdateItemList", GetInventory.ClearItems);
  t_rParameter = callMethod("UpdateItemList", GetInventory.ClearItems);
  t_sTraderName = callMethod("t_kCat", GetInventory.ClearItems);
  t_dialogName = callMethod("t_kCat", GetInventory.ClearItems);
  callMethod("t_iTraderGender", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 2), symbol("RemItem"), confirm, callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), getText), symbol("RemItem"), t_rParameter, t_sTraderName, t_dialogName)
  stringp = lingoBinary("add", stringp, 1);
  }

}

