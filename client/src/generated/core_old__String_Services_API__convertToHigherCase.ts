// core.old.cct / String Services API / convertToHigherCase

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertToHigherCase(_me: LingoMe, a_sString: LingoValue) {
  return callMethod("convertToHigherCase", callNamed("getStringServices"), a_sString);
}

