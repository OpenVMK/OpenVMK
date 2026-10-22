// 3f02613936ba018480acffaf92dd883a.cct / CAnimation / resetSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetSounds(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "m_ar_soundList").count, 0)) {
  for (var snd of meProp(_me, "m_ar_soundList").toArray()) {
  snd[symbol("playcount")] = 0;
  }

  }

}

