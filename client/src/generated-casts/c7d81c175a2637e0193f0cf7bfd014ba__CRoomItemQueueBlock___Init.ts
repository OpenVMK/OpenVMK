// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemQueueBlock / _Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Init(_me: LingoMe, _this: LingoValue) {
  callMethod("SetParam", callMethod("GetTheTileStack", _this), "CLASS", "queue")
  setMeProp(_me, "m_bReady", 1);
}

