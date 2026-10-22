// fireworks_engine.cct / Matrix Class / getUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getUp(_me: LingoMe) {
  return callNamed("vector", meProp(_me, "vData")[1][2], meProp(_me, "vData")[2][2], meProp(_me, "vData")[3][2]);
}

