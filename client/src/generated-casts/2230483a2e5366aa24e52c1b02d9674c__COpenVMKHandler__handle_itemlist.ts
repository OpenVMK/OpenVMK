// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_itemlist

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_itemlist(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_rInput = a_rMsg.connection;
  var t_mp_iCode_kCategory = callNamed("propList", 1, symbol("items"), 2, symbol("clothes"), 3, symbol("posters"), 4, symbol("pins"));
  var t_mp_kType_mp_iRef_rItem = callNamed("propList");
  callMethod("setaProp", t_mp_kType_mp_iRef_rItem, symbol("items"), callNamed("propList"))
  callMethod("setaProp", t_mp_kType_mp_iRef_rItem, symbol("posters"), callNamed("propList"))
  callMethod("setaProp", t_mp_kType_mp_iRef_rItem, symbol("clothes"), callNamed("propList"))
  callMethod("setaProp", t_mp_kType_mp_iRef_rItem, symbol("pins"), callNamed("propList"))
  var t_iInventoryId = callMethod("GetIntFrom", t_rInput);
  if (lingoBinary("eq", t_iInventoryId, 1)) {
  var t_kInventoryId = symbol("itemInventory");
  } else {
  if (lingoBinary("eq", t_iInventoryId, 3)) {
  t_kInventoryId = symbol("wornPins");
  } else {
  if (lingoBinary("eq", t_iInventoryId, 5)) {
  t_kInventoryId = symbol("vmks");
  }

  }

  }

  var t_iClearFlag = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCount = callMethod("GetIntFrom", t_rInput);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iTypeCode = callMethod("GetIntFrom", t_rInput);
  var t_iCategory = callMethod("GetIntFrom", t_rInput);
  var t_sItemGroup = callMethod("GetStrFrom", t_rInput);
  var t_iItemCount = callMethod("GetIntFrom", t_rInput);
  if (lingoBinary("eq", t_iCategory, 1)) {
  var t_kCat = symbol("items");
  var t_iCnt = callMethod("GetIntFrom", t_rInput);
  if (lingoBinary("eq", t_iCnt, 0)) {
  var t_iParam = 0;
  }

  t_iParam = new LingoList([]);
  for (var j = 1; j <= t_iCnt; ++j) {
  callMethod("append", t_iParam, callMethod("GetIntFrom", t_rInput))
  }

  } else {
  if (lingoBinary("eq", t_iCategory, 2)) {
  t_kCat = symbol("clothes");
  t_iParam = 0;
  } else {
  if (lingoBinary("eq", t_iCategory, 3)) {
  t_kCat = symbol("posters");
  t_iParam = 0;
  } else {
  if (lingoBinary("eq", t_iCategory, 4)) {
  t_kCat = symbol("pins");
  t_iParam = callMethod("GetIntFrom", t_rInput);
  var t_iSingleUse = callMethod("GetIntFrom", t_rInput);
  var t_sExpiryDate = callMethod("GetIntFrom", t_rInput);
  }

  }

  }

  }

  var t_rTargetMap = callMethod("getaProp", t_mp_kType_mp_iRef_rItem, callMethod("getaProp", t_mp_iCode_kCategory, t_iCategory));
  callMethod("setaProp", t_rTargetMap, t_sItemGroup, callNamed("propList", symbol("group"), t_sItemGroup, symbol("items"), t_iItemCount, symbol("ref"), t_iRef, symbol("code"), t_iTypeCode, symbol("param"), t_iParam, symbol("state"), symbol("normal"), symbol("category"), t_kCat))
  if (lingoBinary("eq", t_iCategory, 4)) {
  callMethod("addProp", t_rTargetMap[t_sItemGroup], symbol("singleuse"), t_iSingleUse)
  callMethod("addProp", t_rTargetMap[t_sItemGroup], symbol("expirydate"), t_sExpiryDate)
  }

  }

  callNamed("trace", t_mp_kType_mp_iRef_rItem)
  if (t_iClearFlag) {
  callMethod("ClearItems", callMethod("GetInventory", callNamed("getObject", symbol("inventory_component")), t_iInventoryId))
  }

  for (var i = 1; i <= t_mp_kType_mp_iRef_rItem.count; ++i) {
  var t_kCategory = callMethod("getPropAt", t_mp_kType_mp_iRef_rItem, i);
  var t_mp_sGroup_rItem = t_mp_kType_mp_iRef_rItem[i];
  callMethod("UpdateItemList", callMethod("GetInventory", callNamed("getObject", symbol("inventory_component")), t_iInventoryId), t_kCategory, t_mp_sGroup_rItem)
  }

}

