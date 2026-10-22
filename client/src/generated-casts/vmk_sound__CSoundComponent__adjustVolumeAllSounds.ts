// vmk_sound.cct / CSoundComponent / adjustVolumeAllSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function adjustVolumeAllSounds(_me: LingoMe, a_iAmount: LingoValue) {
  callMethod("set", callNamed("getObject", symbol("session")), "volume", a_iAmount)
}

