// core.old.cct / CastLoad  API / getCastLoadPercent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getCastLoadPercent(_me: LingoMe, tID: LingoValue) {
  return callMethod("getLoadPercent", callNamed("getCastLoadManager"), tID);
}

