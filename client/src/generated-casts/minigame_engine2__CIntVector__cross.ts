// minigame_engine2.cct / CIntVector / cross

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function cross(_me: LingoMe, a_rVec: LingoValue) {
  return callNamed("intvector", lingoBinary("sub", lingoBinary("mul", meProp(_me, "y"), a_rVec.z), lingoBinary("mul", meProp(_me, "z"), a_rVec.y)), lingoBinary("sub", lingoBinary("mul", meProp(_me, "z"), a_rVec.x), lingoBinary("mul", meProp(_me, "x"), a_rVec.z)), lingoBinary("sub", lingoBinary("mul", meProp(_me, "x"), a_rVec.y), lingoBinary("mul", meProp(_me, "y"), a_rVec.x)));
}

