// vmk_furniture_code.cct / CRoomItemEntranceFeeTurnStile / AreWeReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AreWeReady(_me: LingoMe, _this: LingoValue) {
  var t_ar_rBlocks = callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _this)));
  if (lingoBinary("eq", t_ar_rBlocks.count, 0)) {
  return 0;
  }

  for (var t_rBlock of t_ar_rBlocks.toArray()) {
  if ((lingoTruthy(callMethod("IsReady", callMethod("GetVisual", t_rBlock))) ? 0 : 1)) {
  return 0;
  }

  }

  return callMethod("IsItemReady", callNamed("getObject", "RoomItemAssetManager"), callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "TYPE")));
}

