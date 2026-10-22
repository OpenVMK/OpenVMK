// core.old.cct / CastLoad  API / resetCastLibs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetCastLibs(_me: LingoMe, tClean: LingoValue, tForced: LingoValue) {
  return callMethod("resetCastLibs", callNamed("getCastLoadManager"), tClean, tForced);
}

