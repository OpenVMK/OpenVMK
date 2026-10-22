// vmk_hm_minigame.cct / CHMVisualPlayerObject / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rOwner"))) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", callMethod("GetOwner", meProp(_me, "m_rOwner")))) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rStatus"))) ? 0 : 1)) {
  callMethod("updatePosition", meProp(_me, "m_rStatus"), callMethod("GetScrPos", meProp(_me, "m_rOwner")))
  }

  }

  }

}

