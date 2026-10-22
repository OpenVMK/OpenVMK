// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemProximityConfig / initTiles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initTiles(_me: LingoMe) {
  var t_rItem = callMethod("getObject", _me);
  if (callNamed("objectp", t_rItem)) {
  setMeProp(_me, "m_iDir", callMethod("GetParam", t_rItem, "DIR"));
  var t_ar_directions = callMethod("getCurrentDirections", _me);
  callMethod("showTiles", _me, callMethod("GetSurroundingBlocks", _me, t_ar_directions))
  setMeProp(_me, "m_bReady", 1);
  }

}

