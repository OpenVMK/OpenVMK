// 42c66f7b170484e24189f467fe87b08d.cct / CSoundChannelObject / SetFadeTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFadeTo(_me: LingoMe, _this: LingoValue, a_iVolume: LingoValue, a_iFadeTime: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_r_SndChannel"))) {
  callMethod("fadeTo", meProp(_me, "m_r_SndChannel"), a_iVolume, a_iFadeTime)
  }

}

