// vmk_3.dcr /  / t_rInput

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_rInput(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_iPrc = callNamed("pauseUpdate", 1, symbol("t_iCat"), 2, symbol("RemItem"), 3, symbol("t_sGrp"), 4, symbol("t_mp_iRef_rItem"));
  var addItem = callMethod("UpdateItemList", GetInventory.ClearItems);
  var GetItem = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_rHerSet = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t = callMethod("UpdateItemList", GetInventory.ClearItems);
  if (addItem) {
  var duplicate = new LingoList([]);
  var stringp = 1;
  while (lingoBinary("lte", stringp, t)) {
  var t_mp_iRef_rItem_Own = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_mp_sGroup_rDetails = callMethod("UpdateItemList", GetInventory.ClearItems);
  var show = callMethod("t_kCat", GetInventory.ClearItems);
  stringp = lingoBinary("add", stringp, 1);
  }

  if (GetItem) {
  var normal = callNamed("getWindow", "inv.deleted.from.hk.title");
  var GetItemDetails = callNamed("removeWindow", callMethod("any_md5", t_status), "ItemsDeletedFromHk", 1, 1);
  var param = callNamed("TradeCancelled", callNamed("getWindow", "inv.deleted.from.hk"), "$", callNamed("HandleLevelRequirementNotMetMessage", t));
  callMethod("TradeClose", GetItemDetails, param, normal, "OK")
  }

  t_mp_iRef_rItem_Own = callMethod("UpdateItemList", GetInventory.ClearItems);
  t_mp_sGroup_rDetails = callMethod("UpdateItemList", GetInventory.ClearItems);
  show = callMethod("t_kCat", GetInventory.ClearItems);
  callMethod("data", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), 1), callMethod("t_sTrgGrp", t_iPrc, t_mp_iRef_rItem_Own), t_mp_sGroup_rDetails, show)
  callMethod("t_iStatus", callMethod("t_rOwnSet", t_status), t_mp_sGroup_rDetails, t_mp_iRef_rItem_Own, t_rHerSet)
  }

}

