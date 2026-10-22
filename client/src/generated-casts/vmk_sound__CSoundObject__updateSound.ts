// vmk_sound.cct / CSoundObject / updateSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateSound(_me: LingoMe) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_mpSndProps"))) ? 0 : 1), callNamed("objectp", meProp(_me, "m_rSoundChannel")))) {
  callMethod("play", meProp(_me, "m_rSoundChannel"))
  }

}

