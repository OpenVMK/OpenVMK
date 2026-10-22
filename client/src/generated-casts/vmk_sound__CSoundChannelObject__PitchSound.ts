// vmk_sound.cct / CSoundChannelObject / PitchSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PitchSound(_me: LingoMe, _this: LingoValue, a_rSndObj: LingoValue, a_sSndParameter: LingoValue) {
  callMethod("PlaySound", _this, a_rSndObj, a_sSndParameter)
}

