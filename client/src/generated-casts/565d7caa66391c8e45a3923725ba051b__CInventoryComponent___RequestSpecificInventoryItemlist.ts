// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / _RequestSpecificInventoryItemlist

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RequestSpecificInventoryItemlist(_me: LingoMe, _this: LingoValue, a_arInventories: LingoValue) {
  var t_mpMsg = new LingoPropList([symbol("int"), a_arInventories.count]);
  for (var i = 1; i <= a_arInventories.count; ++i) {
  var t_kInventory = a_arInventories[i];
  switch (t_kInventory) {
case symbol("items"):
  callMethod("addProp", t_mpMsg, symbol("int"), 1)
  break;
case symbol("clothes"):
  callMethod("addProp", t_mpMsg, symbol("int"), 2)
  break;
case symbol("pins"):
  callMethod("addProp", t_mpMsg, symbol("int"), 3)
  break;
case symbol("quest"):
  callMethod("addProp", t_mpMsg, symbol("int"), 4)
  break;
case symbol("vmks"):
  callMethod("addProp", t_mpMsg, symbol("int"), 5)
  break;
  }

  }

  if (callNamed("connectionExists", "VMK")) {
  callMethod("send", callNamed("getConnection", "VMK"), "GetItemList", t_mpMsg)
  } else {
  callNamed("error", _this, "Failed to request item list!", symbol("_RequestItemList"))
  }

}

