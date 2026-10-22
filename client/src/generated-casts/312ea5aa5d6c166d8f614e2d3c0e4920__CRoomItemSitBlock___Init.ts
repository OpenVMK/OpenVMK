// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemSitBlock / _Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Init(_me: LingoMe, _this: LingoValue) {
  var t_rTileStack = callMethod("GetTheTileStack", _this);
  if ((lingoTruthy(callNamed("voidp", t_rTileStack)) ? 0 : 1)) {
  callMethod("SetParam", t_rTileStack, "CLASS", "sit")
  setMeProp(_me, "m_bReady", 1);
  }

}

