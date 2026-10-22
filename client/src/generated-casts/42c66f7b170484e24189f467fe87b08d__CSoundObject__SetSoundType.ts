// 42c66f7b170484e24189f467fe87b08d.cct / CSoundObject / SetSoundType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSoundType(_me: LingoMe, a_sType: LingoValue) {
  setMeProp(_me, "m_sSoundType", a_sType);
}

