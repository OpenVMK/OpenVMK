// vmk_sound.cct / CSoundObjectBU / SetFadeIn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFadeIn(_me: LingoMe, a_iFadeTime: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iSoundChannel"))) ? 0 : 1)) {
  callMethod("fadeIn", callNamed("sound", meProp(_me, "m_iSoundChannel")), a_iFadeTime)
  }

}

