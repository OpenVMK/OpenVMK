// vmk_sound.cct / CSoundChannelObject / SetFadeOut

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFadeOut(_me: LingoMe, _this: LingoValue, a_iFadeTime: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_r_SndChannel"))) {
  callMethod("fadeOut", meProp(_me, "m_r_SndChannel"), a_iFadeTime)
  }

}

