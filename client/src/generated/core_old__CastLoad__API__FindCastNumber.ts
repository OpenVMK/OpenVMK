// core.old.cct / CastLoad  API / FindCastNumber

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FindCastNumber(_me: LingoMe, tCastName: LingoValue) {
  return callMethod("FindCastNumber", callNamed("getCastLoadManager"), tCastName);
}

