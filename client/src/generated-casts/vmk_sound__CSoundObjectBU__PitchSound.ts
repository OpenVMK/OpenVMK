// vmk_sound.cct / CSoundObjectBU / PitchSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PitchSound(_me: LingoMe, a_iAmount: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_mpSndProps"))) ? 0 : 1)) {
  meProp(_me, "m_mpSndProps")[symbol("rateShift")] = a_iAmount;
  callMethod("updateSound", _me)
  }

}

