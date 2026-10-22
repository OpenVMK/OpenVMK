// vmk_3.dcr /  / _ReceiveItemList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ReceiveItemList(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_mp_iCode_kCategory = callNamed("propList", 1, symbol("items"), 2, symbol("clothes"), 3, symbol("posters"), 4, symbol("pins"));
  var t_mp_kType_mp_iRef_rItem = callNamed("propList");
  var t_iInventoryId = callMethod("GetIntFrom", t_rInput);
  if (lingoBinary("eq", t_rInput, 1)) {
  var t_kInventoryId = symbol("itemInventory");
  } else {
  if (lingoBinary("eq", t_rInput, 3)) {
  t_kInventoryId = symbol("wornPins");
  } else {
  if (lingoBinary("eq", t_rInput, 5)) {
  t_kInventoryId = symbol("vmks");
  }

  }

  }

  var t_iClearFlag = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCount = callMethod("GetIntFrom", t_rInput);
  var i = 1;
  while (lingoBinary("lte", i, t_iCount)) {
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iTypeCode = callMethod("GetIntFrom", t_rInput);
  var t_iCategory = callMethod("GetIntFrom", t_rInput);
  var t_sItemGroup = callMethod("GetStrFrom", t_rInput);
  var t_iItemCount = callMethod("GetIntFrom", t_rInput);
  if (lingoBinary("eq", t_rInput, 1)) {
  var t_kCat = symbol("items");
  var t_iCnt = callMethod("GetIntFrom", t_rInput);
  if (lingoBinary("eq", t_iCnt, 0)) {
  var t_iParam = 0;
  }

  t_iParam = new LingoList([]);
  var j = 1;
  while (lingoBinary("lte", j, t_iCnt)) {
  j = lingoBinary("add", j, 1);
  }

  } else {
  if (lingoBinary("eq", t_rInput, 2)) {
  t_kCat = symbol("clothes");
  t_iParam = 0;
  } else {
  if (lingoBinary("eq", t_rInput, 3)) {
  t_kCat = symbol("posters");
  t_iParam = 0;
  } else {
  if (lingoBinary("eq", t_rInput, 4)) {
  t_kCat = symbol("pins");
  t_iParam = callMethod("GetIntFrom", t_rInput);
  var t_iSingleUse = callMethod("GetIntFrom", t_rInput);
  var t_sExpiryDate = callMethod("GetIntFrom", t_rInput);
  }

  }

  }

  }

  var t_rTargetMap = callMethod("getaProp", t_mp_kType_mp_iRef_rItem, callMethod("getaProp", t_mp_iCode_kCategory, t_iCategory));
  if (lingoBinary("eq", t_iCategory, 4)) {
  }

  i = lingoBinary("add", i, 1);
  }

  if (t_iClearFlag) {
  callMethod("ClearItems", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId))
  }

  i = 1;
  while (lingoBinary("lte", i, t_mp_kType_mp_iRef_rItem.count)) {
  var t_kCategory = callMethod("getPropAt", t_mp_kType_mp_iRef_rItem, i);
  var t_mp_sGroup_rItem = t_mp_kType_mp_iRef_rItem[i];
  callMethod("UpdateItemList", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId), t_kCategory, t_mp_sGroup_rItem)
  i = lingoBinary("add", i, 1);
  }

}

