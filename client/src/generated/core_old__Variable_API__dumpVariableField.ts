// core.old.cct / Variable API / dumpVariableField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dumpVariableField(_me: LingoMe, a_sField: LingoValue, a_cDelimiter: LingoValue) {
  return callMethod("dump", callNamed("getVariableManager"), a_sField, a_cDelimiter);
}

