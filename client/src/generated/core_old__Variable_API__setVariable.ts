// core.old.cct / Variable API / setVariable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setVariable(_me: LingoMe, a_sID: LingoValue, a_vValue: LingoValue) {
  return callMethod("create", callNamed("getVariableManager"), a_sID, a_vValue);
}

