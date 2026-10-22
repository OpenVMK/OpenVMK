// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemHomeEntertainmentTriggableSound / _Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Init(_me: LingoMe, _this: LingoValue) {
  var tItemType = callMethod("GetParam", callMethod("getObject", _this), "TYPE");
  setMeProp(_me, "m_rSound", callNamed("getVariable", lingoBinary("join", lingoBinary("join", "item.", tItemType), ".state.1")));
  callMethod("SetBlockVisualCursors", callMethod("GetVisual", callMethod("getObject", _this)), new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]), new LingoList([new LingoList([1])]))
  setMeProp(_me, "m_bReady", 1);
}

