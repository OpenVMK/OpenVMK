// vmk_sound.cct / CSoundObjectBU / updateSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateSound(_me: LingoMe) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_mpSndProps"))) ? 0 : 1), (lingoTruthy(callNamed("voidp", meProp(_me, "m_iSoundChannel"))) ? 0 : 1))) {
  callMethod("stop", callNamed("sound", meProp(_me, "m_iSoundChannel")))
  callMethod("setPlayList", callNamed("sound", meProp(_me, "m_iSoundChannel")), new LingoList([]))
  }

}

