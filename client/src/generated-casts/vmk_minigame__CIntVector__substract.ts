// vmk_minigame.cct / CIntVector / substract

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function substract(_me: LingoMe, a_rVec: LingoValue) {
  return callNamed("intvector", lingoBinary("sub", meProp(_me, "x"), a_rVec.x), lingoBinary("sub", meProp(_me, "y"), a_rVec.y), lingoBinary("sub", meProp(_me, "z"), a_rVec.z));
}

