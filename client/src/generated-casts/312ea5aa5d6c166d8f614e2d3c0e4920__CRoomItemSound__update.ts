// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemSound / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("or", callNamed("voidp", meProp(_me, "m_iType")), lingoBinary("eq", meProp(_me, "m_sSoundName"), ""))) {
  setMeProp(_me, "m_iType", callNamed("value", callMethod("GetParam", callMethod("getObject", _this), "TYPE")));
  callMethod("PlaySound", _this)
  }

}

