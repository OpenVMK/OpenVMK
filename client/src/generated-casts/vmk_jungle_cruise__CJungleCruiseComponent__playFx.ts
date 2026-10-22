// vmk_jungle_cruise.cct / CJungleCruiseComponent / playFx

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function playFx(_me: LingoMe, a_sName: LingoValue) {
  callMethod("SoundFX", meProp(_me, "m_rSoundPlayer"), callNamed("getMember", a_sName))
}

