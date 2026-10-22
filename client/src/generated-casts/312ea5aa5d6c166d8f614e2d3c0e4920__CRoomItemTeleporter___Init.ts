// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemTeleporter / _Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Init(_me: LingoMe, _this: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  callMethod("SetParam", t_rObj, "TELEPORTER", 1)
  callMethod("SetParam", callMethod("GetTheTileStack", _this), "CLASS", "teleport")
  setMeProp(_me, "m_bReady", 1);
}

