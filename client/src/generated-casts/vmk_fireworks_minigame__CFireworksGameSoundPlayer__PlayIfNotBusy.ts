// vmk_fireworks_minigame.cct / CFireworksGameSoundPlayer / PlayIfNotBusy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayIfNotBusy(_me: LingoMe, a_rChannel: LingoValue, a_rSound: LingoValue, a_fPitch: LingoValue) {
  if ((lingoTruthy(callMethod("isBusy", a_rChannel)) ? 0 : 1)) {
  if (callNamed("voidp", a_fPitch)) {
  callNamed("call", symbol("queue"), new LingoList([a_rChannel]), new LingoPropList([symbol("member"), a_rSound]))
  } else {
  callNamed("call", symbol("queue"), new LingoList([a_rChannel]), new LingoPropList([symbol("member"), a_rSound, symbol("rateShift"), a_fPitch]))
  }

  callNamed("call", symbol("play"), new LingoList([a_rChannel]))
  }

}

