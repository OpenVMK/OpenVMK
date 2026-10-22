// vmk_fireworks_minigame.cct / FWGlobalMethods / FWMouseDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FWMouseDown(_me: LingoMe) {
  callMethod("mouseDown", callNamed("getObject", symbol("Fireworks_interface")))
  callNamed("pass")
}

