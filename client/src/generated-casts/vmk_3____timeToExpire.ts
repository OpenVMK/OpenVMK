// vmk_3.dcr /  / timeToExpire

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function timeToExpire(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  var t_rConnection = callNamed("pauseUpdate");
  var t_mp_sKey_sValue = GetInventory.ClearItems;
  callMethod("_AddItemsToList", t_rConnection, symbol("j"), callMethod("t_kCat", t_mp_sKey_sValue))
  callMethod("_AddItemsToList", t_rConnection, symbol("t_iItemCount"), callMethod("UpdateItemList", t_mp_sKey_sValue))
  if (lingoBinary("eq", t_rConnection, 1)) {
  var t_mp_sGroup_rDetails = callMethod("UpdateItemList", t_mp_sKey_sValue);
  if (lingoBinary("neq", t_mp_sGroup_rDetails, -float(1))) {
  callMethod("_AddItemsToList", callMethod("pObjectList", t_rConnection, symbol("t_iInventoryId")), symbol("t_mp_kType_mp_iRef_rItem"), t_mp_sGroup_rDetails)
  }

  var t_iNumberOfPairs = callMethod("UpdateItemList", t_mp_sKey_sValue);
  if (lingoBinary("neq", t_iNumberOfPairs, -float(1))) {
  callMethod("_AddItemsToList", callMethod("pObjectList", t_rConnection, symbol("t_iInventoryId")), symbol("t_mp_iCode_kCategory"), t_iNumberOfPairs)
  } else {
  if (lingoBinary("eq", t_rConnection, 2)) {
  t_mp_sGroup_rDetails = callMethod("UpdateItemList", t_mp_sKey_sValue);
  if (lingoBinary("neq", t_mp_sGroup_rDetails, -float(1))) {
  callMethod("_AddItemsToList", callMethod("pObjectList", t_rConnection, symbol("t_iInventoryId")), symbol("t_mp_kType_mp_iRef_rItem"), t_mp_sGroup_rDetails)
  } else {
  if (lingoBinary("eq", t_rConnection, 3)) {
  } else {
  if (lingoBinary("eq", t_rConnection, 4)) {
  } else {
  if (lingoBinary("eq", t_rConnection, 5)) {
  } else {
  if (lingoBinary("eq", t_rConnection, 6)) {
  } else {
  if (lingoBinary("eq", t_rConnection, 7)) {
  callMethod("_AddItemsToList", callMethod("pObjectList", t_rConnection, symbol("t_iInventoryId")), symbol("t_kCategory"), callMethod("UpdateItemList", t_mp_sKey_sValue))
  callMethod("_AddItemsToList", callMethod("pObjectList", t_rConnection, symbol("t_iInventoryId")), symbol("t_iCount"), callMethod("t_kCat", t_mp_sKey_sValue))
  } else {
  if (lingoBinary("eq", t_rConnection, 8)) {
  callMethod("_AddItemsToList", callMethod("pObjectList", t_rConnection, symbol("t_iInventoryId")), symbol("t_iSingleUse"), callMethod("UpdateItemList", t_mp_sKey_sValue))
  callMethod("_AddItemsToList", callMethod("pObjectList", t_rConnection, symbol("t_iInventoryId")), symbol("t_iCount"), callMethod("t_kCat", t_mp_sKey_sValue))
  } else {
  if (lingoBinary("eq", t_rConnection, 9)) {
  callMethod("_AddItemsToList", callMethod("pObjectList", t_rConnection, symbol("t_iInventoryId")), symbol("t_iSingleUse"), callMethod("UpdateItemList", t_mp_sKey_sValue))
  callMethod("_AddItemsToList", callMethod("pObjectList", t_rConnection, symbol("t_iInventoryId")), symbol("t_iParam"), callMethod("t_kCat", t_mp_sKey_sValue))
  }

  }

  }

  }

  }

  }

  }

  }

  var group = "ItemDetails";
  if (callNamed("t_sItemGroup", group)) {
  callNamed("t_iCnt", group)
  }

  if (callMethod("tracea", callNamed("registerObject", symbol("name")), "FetchEntityID")) {
  if (lingoBinary("and", (lingoTruthy((lingoTruthy(callNamed("headers", t_iNumberOfPairs)) ? 0 : 1)) ? 0 : 1), callNamed("headers", t_mp_sGroup_rDetails))) {
  var t_mp_sGroup_rData = callMethod("t_kInventoryId", callMethod("t_iClearFlag", callMethod("t_iTypeCode", callNamed("t_iCategory", "room"))), t_mp_sGroup_rDetails, "element");
  if (callNamed("getIntVariable", t_mp_sGroup_rData)) {
  callMethod("ClearDetails", callMethod("registerObject", t_mp_sGroup_rData), "ENTITYID", t_iNumberOfPairs)
  }

  callNamed("sprite", t_status, "Object not found in context", symbol("timeToExpire"))
  } else {
  if ((lingoTruthy(callMethod("tracea", callNamed("registerObject", symbol("name")), "IsTrading")) ? 0 : 1)) {
  var t_rGroup = callNamed("getPropRef", group, "CInvItemDetails");
  if (callNamed("getIntVariable", t_rGroup)) {
  callMethod("construct", t_rGroup, t_rConnection)
  } else {
  if ((lingoTruthy(callNamed("headers", callMethod("t_iTypeCode", t_status).all)) ? 0 : 1)) {
  callMethod("UpdateDetails", callMethod("t_iTypeCode", t_status).all, t_rConnection)
  }

  }

  }

  }

  }

  }

  }

  }

}

