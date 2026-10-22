// core.old.cct / Variable API / getIntVariable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getIntVariable(_me: LingoMe, a_sID: LingoValue, a_iDefault: LingoValue) {
  return callMethod("getInt", callNamed("getVariableManager"), a_sID, a_iDefault);
}

