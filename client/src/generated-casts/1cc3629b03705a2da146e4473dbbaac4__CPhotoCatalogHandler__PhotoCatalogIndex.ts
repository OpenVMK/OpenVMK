// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogHandler / PhotoCatalogIndex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PhotoCatalogIndex(_me: LingoMe, tMsg: LingoValue) {
  var tCount = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_indexes = new LingoList([]);
  for (var i = 1; i <= tCount; ++i) {
  callMethod("append", t_ar_indexes, callMethod("GetIntFrom", tMsg.connection))
  }

  callMethod("SetIDList", callMethod("getComponent", _me), t_ar_indexes)
}

