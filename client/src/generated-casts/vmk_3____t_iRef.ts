// vmk_3.dcr /  / t_iRef

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_iRef(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_iRemovedPinRef = callMethod("UpdateItemList", GetInventory.ClearItems);
  var t_rCon = callMethod("UpdateItemList", GetInventory.ClearItems);
  if (lingoBinary("eq", t_rCon, 1)) {
  var ShowLevelRequiredScreen = callMethod("t_kInventoryId", callMethod("t_iClearFlag", callNamed("t_iCategory", symbol("t_sUpdatedPinNewGroup")).t_mp_sGroup_rItem), t_iRemovedPinRef, "avatar");
  var t_chatMsg = callNamed("t_sUpdatedPinOldGroup", ShowLevelRequiredScreen, "SEX");
  var t_rAvatar = callMethod("tracea", callNamed("registerObject", symbol("name")), "name");
  var t_sMsg = callNamed("pauseUpdate");
  var tConn = "";
  if (callNamed("getIntVariable", ShowLevelRequiredScreen)) {
  tConn = callNamed("t_sUpdatedPinOldGroup", ShowLevelRequiredScreen, "NAME");
  }

  callMethod("t_iUpdatedPinRef", callNamed("pBaseClsMem", symbol("t_rItem"), t_rAvatar, t_sMsg), t_status.t_mp_sGroup_rItem, t_iRemovedPinRef)
  if (lingoBinary("neq", t_chatMsg, callMethod("t_sTrgGrp", t_sMsg, "SEX"))) {
  var GetItemDetails = callNamed("removeWindow", callMethod("any_md5", t_status), "trade.dialog.oppositeGender", 1, 1);
  var say = callNamed("pauseUpdate", symbol("t_rDetails"), callNamed("getWindow", "inv.trade.oppositeGender.dialog.OK"), symbol("TransformCannedMsgToString"), symbol("_AvatarChat"), symbol("message"), t_iRemovedPinRef);
  callMethod("mode", GetItemDetails)
  } else {
  if (lingoBinary("eq", t_rCon, 0)) {
  GetItemDetails = callNamed("removeWindow", callMethod("any_md5", t_status), "trade.dialog.trade.declined", 1, 1);
  say = callNamed("pauseUpdate", symbol("t_rDetails"), callNamed("getWindow", "inv.trade.declined.dialog.OK"), symbol("TransformCannedMsgToString"), symbol("_AvatarChat"), symbol("message"), tConn);
  callMethod("mode", GetItemDetails)
  }

  }

  }

}

