// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / _RequestItemList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RequestItemList(_me: LingoMe, _this: LingoValue) {
  if (callNamed("connectionExists", "VMK")) {
  callMethod("send", callNamed("getConnection", "VMK"), "GetItemList", new LingoPropList([symbol("int"), 0]))
  } else {
  callNamed("error", _this, "Failed to request item list!", symbol("_RequestItemList"))
  }

}

