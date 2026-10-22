// vmk_furniture_code.cct / CRoomItemProximityConfig / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callMethod("hideTiles", _this)
  callNamed("unregisterObject", callMethod("getID", _this))
  return callNamed("callAncestor", symbol("deconstruct"), _this);
}

