// core.old.cct / String Services Class / convertToLowerCase

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertToLowerCase(_me: LingoMe, tString: LingoValue) {
  var tValueStr = "";
  for (var i = 1; i <= callNamed("length", tString); ++i) {
  var tChar = tString.char[i];
  var tNum = callNamed("charToNum", tChar);
  if (lingoBinary("and", lingoBinary("gte", tNum, 65), lingoBinary("lte", tNum, 90))) {
  tChar = callNamed("numToChar", lingoBinary("add", tNum, 32));
  }

  tValueStr = lingoBinary("join", tValueStr, tChar);
  }

  return tValueStr;
}

