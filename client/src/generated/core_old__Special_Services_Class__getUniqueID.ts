// core.old.cct / Special Services Class / getUniqueID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getUniqueID(_me: LingoMe) {
  setMeProp(_me, "pUniqueSeed", lingoBinary("add", meProp(_me, "pUniqueSeed"), 1));
  return lingoBinary("join", lingoBinary("join", lingoBinary("join", "uid:", meProp(_me, "pUniqueSeed")), ":"), theProperty("milliSeconds"));
}

