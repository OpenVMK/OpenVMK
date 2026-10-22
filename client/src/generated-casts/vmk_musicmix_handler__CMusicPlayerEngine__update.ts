// vmk_musicmix_handler.cct / CMusicPlayerEngine / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_kNextState"))) ? 0 : 1)) {
  callMethod("SetTrackerState", _me, meProp(_me, "m_kNextState"))
  }

}

