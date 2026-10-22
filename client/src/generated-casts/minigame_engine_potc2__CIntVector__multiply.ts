// minigame_engine_potc2.cct / CIntVector / multiply

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function multiply(_me: LingoMe, a_rScalar: LingoValue) {
  return callNamed("intvector", lingoBinary("mul", meProp(_me, "x"), a_rScalar), lingoBinary("mul", meProp(_me, "y"), a_rScalar), lingoBinary("mul", meProp(_me, "z"), a_rScalar));
}

