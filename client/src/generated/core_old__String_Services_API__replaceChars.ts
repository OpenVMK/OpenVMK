// core.old.cct / String Services API / replaceChars

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function replaceChars(_me: LingoMe, a_sString: LingoValue, a_cCharA: LingoValue, a_cCharB: LingoValue) {
  return callMethod("replaceChars", callNamed("getStringServices"), a_sString, a_cCharA, a_cCharB);
}

