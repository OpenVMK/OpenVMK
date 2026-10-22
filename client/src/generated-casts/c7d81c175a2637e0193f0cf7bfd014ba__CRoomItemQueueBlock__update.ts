// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemQueueBlock / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bReady")) ? 0 : 1)) {
  callMethod("_Init", _this)
  }

}

