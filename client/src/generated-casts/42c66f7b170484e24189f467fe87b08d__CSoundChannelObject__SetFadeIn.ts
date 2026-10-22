// 42c66f7b170484e24189f467fe87b08d.cct / CSoundChannelObject / SetFadeIn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFadeIn(_me: LingoMe, _this: LingoValue, a_iFadeTime: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_r_SndChannel"))) {
  callMethod("fadeIn", meProp(_me, "m_r_SndChannel"), a_iFadeTime)
  }

}

