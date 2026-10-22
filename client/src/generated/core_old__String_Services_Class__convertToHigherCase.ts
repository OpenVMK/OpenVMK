// core.old.cct / String Services Class / convertToHigherCase

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertToHigherCase(_me: LingoMe, tString: LingoValue) {
  var tValueStr = "";
  for (var i = 1; i <= callNamed("length", tString); ++i) {
  var tChar = tString.char[i];
  var tNum = callNamed("charToNum", tChar);
  if (lingoBinary("and", lingoBinary("gte", tNum, 97), lingoBinary("lte", tNum, 122))) {
  tChar = callNamed("numToChar", lingoBinary("sub", tNum, 32));
  }

  tValueStr = lingoBinary("join", tValueStr, tChar);
  }

  return tValueStr;
}

