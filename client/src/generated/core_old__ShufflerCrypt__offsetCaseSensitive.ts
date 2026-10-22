// core.old.cct / ShufflerCrypt / offsetCaseSensitive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function offsetCaseSensitive(_me: LingoMe, a_sChar: LingoValue, a_sString: LingoValue) {
  var tNum = callNamed("charToNum", a_sChar.char[1]);
  for (var i = 1; i <= a_sString.length; ++i) {
  if (lingoBinary("eq", tNum, callNamed("charToNum", a_sString.char[i]))) {
  return i;
  }

  }

  return undefined;
}

