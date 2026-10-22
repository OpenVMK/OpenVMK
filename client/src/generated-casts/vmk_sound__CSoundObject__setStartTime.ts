// vmk_sound.cct / CSoundObject / setStartTime

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setStartTime(_me: LingoMe, a_iTime: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_mpSndProps"))) ? 0 : 1)) {
  meProp(_me, "m_mpSndProps")[symbol("startTime")] = a_iTime;
  callMethod("updateSound", _me)
  }

}

