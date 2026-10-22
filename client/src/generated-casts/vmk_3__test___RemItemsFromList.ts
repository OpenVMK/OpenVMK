// vmk_3.dcr / test / _RemItemsFromList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RemItemsFromList(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iInventoryId = callMethod("GetIntFrom", a_rMsg.connection);
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

  var t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  var i = 1;
  while (lingoBinary("lte", i, t_iCount)) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCat = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sGrp = callMethod("GetStrFrom", a_rMsg.connection);
  if (lingoBinary("eq", t_iInventoryId, 1)) {
  var t_kCat = symbol("items");
  } else {
  if (lingoBinary("eq", t_iInventoryId, 2)) {
  t_kCat = symbol("clothes");
  } else {
  if (lingoBinary("eq", t_iInventoryId, 3)) {
  t_kCat = symbol("posters");
  } else {
  if (lingoBinary("eq", t_iInventoryId, 4)) {
  t_kCat = symbol("pins");
  }

  }

  }

  }

  callNamed("error", _this, lingoBinary("join", "Unknown category:", t_iCat), symbol("_RemItemsFromList"))
  t_kCat = symbol("null");
  callMethod("RemItem", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId), t_kCat, t_iRef, t_sGrp)
  i = lingoBinary("add", i, 1);
  }

}

