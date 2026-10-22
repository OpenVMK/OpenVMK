// core.old.cct / CastLoad  API / castExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function castExists(_me: LingoMe, tCastName: LingoValue) {
  return callMethod("exists", callNamed("getCastLoadManager"), tCastName);
}

