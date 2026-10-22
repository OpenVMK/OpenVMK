// vmk_sound.cct / CSoundObjectBU / SetFadeOut

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFadeOut(_me: LingoMe, a_iFadeTime: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iSoundChannel"))) ? 0 : 1)) {
  callMethod("fadeOut", callNamed("sound", meProp(_me, "m_iSoundChannel")), a_iFadeTime)
  }

}

