// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / CatSwitch

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CatSwitch(_me: LingoMe, _this: LingoValue, a_kSrcCat: LingoValue, a_iRef: LingoValue, a_rDestInventory: LingoValue, a_kDestCat: LingoValue, a_iNewRef: LingoValue, a_sGroup: LingoValue, a_sNewGroup: LingoValue) {
  if ((lingoTruthy(callNamed("stringp", a_sNewGroup)) ? 0 : 1)) {
  a_sNewGroup = a_sGroup;
  }

  var t_rItem = callMethod("GetItem", _this, a_kSrcCat, a_sGroup);
  if ((lingoTruthy(callNamed("voidp", t_rItem)) ? 0 : 1)) {
  var t_rDetails = callMethod("GetItemDetails", _this, a_kSrcCat, callMethod("getaProp", t_rItem, symbol("group")));
  callMethod("RemItem", _this, a_kSrcCat, a_iRef, a_sGroup)
  callMethod("addItem", a_rDestInventory, a_kDestCat, a_iNewRef, t_rItem, t_rDetails, a_sNewGroup)
  } else {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Item with group id", a_sGroup), "not found!"), symbol("CatSwitch"))
  }

}

