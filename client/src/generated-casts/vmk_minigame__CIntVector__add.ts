// vmk_minigame.cct / CIntVector / add

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function add(_me: LingoMe, a_rVec: LingoValue) {
  return callNamed("intvector", lingoBinary("add", meProp(_me, "x"), a_rVec.x), lingoBinary("add", meProp(_me, "y"), a_rVec.y), lingoBinary("add", meProp(_me, "z"), a_rVec.z));
}

