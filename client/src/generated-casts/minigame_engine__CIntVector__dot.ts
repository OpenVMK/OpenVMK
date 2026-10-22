// minigame_engine.cct / CIntVector / dot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dot(_me: LingoMe, a_rVec: LingoValue) {
  return lingoBinary("add", lingoBinary("add", lingoBinary("mul", meProp(_me, "x"), a_rVec.x), lingoBinary("mul", meProp(_me, "y"), a_rVec.y)), lingoBinary("mul", meProp(_me, "z"), a_rVec.z));
}

