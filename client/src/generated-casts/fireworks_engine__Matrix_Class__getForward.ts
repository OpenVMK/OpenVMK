// fireworks_engine.cct / Matrix Class / getForward

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getForward(_me: LingoMe) {
  return callNamed("vector", meProp(_me, "vData")[1][3], meProp(_me, "vData")[2][3], meProp(_me, "vData")[3][3]);
}

