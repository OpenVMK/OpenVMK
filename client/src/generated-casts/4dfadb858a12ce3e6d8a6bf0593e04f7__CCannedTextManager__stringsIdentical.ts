// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / stringsIdentical

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stringsIdentical(_me: LingoMe, a_string1: LingoValue, a_string2: LingoValue) {
  if (lingoBinary("neq", a_string1.length, a_string2.length)) {
  return 0;
  }

  for (var i = 1; i <= a_string1.length; ++i) {
  if (lingoBinary("neq", callNamed("charToNum", a_string1.char[i]), callNamed("charToNum", a_string2.char[i]))) {
  return 0;
  }

  }

  return 1;
}

