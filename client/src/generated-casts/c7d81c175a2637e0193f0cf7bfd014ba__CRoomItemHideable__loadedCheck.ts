// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemHideable / loadedCheck

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function loadedCheck(_me: LingoMe) {
  var t_ar_rBlocks = callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _me)));
  if (lingoBinary("eq", t_ar_rBlocks.count, 0)) {
  return 0;
  }

  for (var t_rBlock of t_ar_rBlocks.toArray()) {
  if ((lingoTruthy(callMethod("IsReady", callMethod("GetVisual", t_rBlock))) ? 0 : 1)) {
  return 0;
  }

  }

  return callMethod("IsItemReady", callNamed("getObject", "RoomItemAssetManager"), callNamed("integer", callMethod("GetParam", callMethod("getObject", _me), "TYPE")));
}

