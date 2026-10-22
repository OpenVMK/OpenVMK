// fireworks_engine.cct / Matrix Class / getRight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRight(_me: LingoMe) {
  return callNamed("vector", meProp(_me, "vData")[1][1], meProp(_me, "vData")[2][1], meProp(_me, "vData")[3][1]);
}

