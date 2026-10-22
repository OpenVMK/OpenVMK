// core.old.cct / CastLoad  API / startCastLoad

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startCastLoad(_me: LingoMe, tCastLibs: LingoValue, tPermanentOrNot: LingoValue, tAddFlag: LingoValue) {
  return callMethod("startCastLoad", callNamed("getCastLoadManager"), tCastLibs, tPermanentOrNot, tAddFlag);
}

