// vmk_minigame.cct / CIntVector / divide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function divide(_me: LingoMe, a_rScalar: LingoValue) {
  return callNamed("intvector", lingoBinary("div", meProp(_me, "x"), a_rScalar), lingoBinary("div", meProp(_me, "y"), a_rScalar), lingoBinary("div", meProp(_me, "z"), a_rScalar));
}

