// core.old.cct / Variable API / getVariable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getVariable(_me: LingoMe, a_sID: LingoValue, a_vDefault: LingoValue) {
  return callMethod("get", callNamed("getVariableManager"), a_sID, a_vDefault);
}

