// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _AddItemsToList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AddItemsToList(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  callNamed("error", _this, "Unimplemented method!", symbol("_AddItemsToList"))
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iCat = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  }

}

