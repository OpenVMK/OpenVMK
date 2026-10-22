// vmk_sound.cct / CSoundObject / SetParameter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetParameter(_me: LingoMe, a_sSndParameter: LingoValue) {
  setMeProp(_me, "m_sSndParameter", a_sSndParameter);
}

