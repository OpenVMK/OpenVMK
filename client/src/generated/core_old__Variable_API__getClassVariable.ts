// core.old.cct / Variable API / getClassVariable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getClassVariable(_me: LingoMe, a_sID: LingoValue, a_rDefault: LingoValue) {
  return callMethod("getValue", callNamed("getVariableManager"), a_sID, a_rDefault);
}

