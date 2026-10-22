// vmk_sound.cct / CSoundComponent / setAllSoundsOn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAllSoundsOn(_me: LingoMe) {
  if (callNamed("objectExists", symbol("session"))) {
  callMethod("set", callNamed("getObject", symbol("session")), "music", 1)
  callMethod("set", callNamed("getObject", symbol("session")), "fx", 1)
  callMethod("set", callNamed("getObject", symbol("session")), "ui", 1)
  callMethod("set", callNamed("getObject", symbol("session")), "volume", 240)
  }

}

