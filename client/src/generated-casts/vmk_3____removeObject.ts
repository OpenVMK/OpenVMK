// vmk_3.dcr /  / removeObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeObject(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var getText = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_s_Title = callMethod("UpdateItemList", GetInventory.ClearItems);
  var text = callNamed("pauseUpdate");
  var stringp = 1;
  while (lingoBinary("lte", stringp, t_s_Title)) {
  var eventID = callNamed("pauseUpdate");
  callMethod("_AddItemsToList", eventID, symbol("t_mp_kType_mp_iRef_rItem"), callMethod("UpdateItemList", GetInventory.ClearItems))
  callMethod("_AddItemsToList", text, callMethod("pObjectList", eventID, symbol("TradeOpen")), eventID)
  stringp = lingoBinary("add", stringp, 1);
  }

  callMethod("t_iSrc", callMethod("t_sSrcGrp", callMethod("t_iTypeCode", t_status), getText), symbol("t_iReqRef"), text)
}

