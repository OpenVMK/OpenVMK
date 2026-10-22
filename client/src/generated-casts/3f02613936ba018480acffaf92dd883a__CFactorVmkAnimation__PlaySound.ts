// 3f02613936ba018480acffaf92dd883a.cct / CFactorVmkAnimation / PlaySound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySound(_me: LingoMe, t_iFrameCounter: LingoValue) {
  var t_ar_CurrentSounds = callMethod("getaProp", meProp(_me, "m_ar_rSounds"), callNamed("string", t_iFrameCounter));
  if (callNamed("listp", t_ar_CurrentSounds)) {
  for (var t_sCurrentSound of t_ar_CurrentSounds.toArray()) {
  callNamed("executeMessage", "PlayFxSound", t_sCurrentSound)
  }

  }

}

