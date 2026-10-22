// core.old.cct / String Services API / convertToLowerCase

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertToLowerCase(_me: LingoMe, a_sString: LingoValue) {
  return callMethod("convertToLowerCase", callNamed("getStringServices"), a_sString);
}

