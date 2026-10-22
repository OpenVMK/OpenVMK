// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _RemItemsFromList

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
  switch (t_iInventoryId) {
case 1:
  var t_kInventoryId = symbol("itemInventory");
  break;
case 3:
  t_kInventoryId = symbol("wornPins");
  break;
case 5:
  t_kInventoryId = symbol("vmks");
  break;
  }

  var t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCat = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sGrp = callMethod("GetStrFrom", a_rMsg.connection);
  switch (t_iCat) {
case 1:
  var t_kCat = symbol("items");
  break;
case 2:
  t_kCat = symbol("clothes");
  break;
case 3:
  t_kCat = symbol("posters");
  break;
case 4:
  t_kCat = symbol("pins");
  break;
  default:
  callNamed("error", _this, lingoBinary("joinPad", "Unknown category:", t_iCat), symbol("_RemItemsFromList"))
  t_kCat = symbol("null");
  }

  callMethod("RemItem", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId), t_kCat, t_iRef, t_sGrp)
  }

}

