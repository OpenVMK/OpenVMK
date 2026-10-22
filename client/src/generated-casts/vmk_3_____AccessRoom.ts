// vmk_3.dcr /  / _AccessRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AccessRoom(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_s_Title = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_rTrader = callNamed("pauseUpdate");
  var stringp = 1;
  while (lingoBinary("lte", stringp, t_s_Title)) {
  var t_mp_sGroup_rDetails = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_info = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_bFromHK = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_bShowAlert = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_ar_ItemList = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_sTxt = callMethod("t_kCat", GetInventory.ClearItems);
  stringp = lingoBinary("add", stringp, 1);
  }

}

