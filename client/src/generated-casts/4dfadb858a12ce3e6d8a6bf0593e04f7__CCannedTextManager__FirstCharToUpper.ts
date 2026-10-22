// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / FirstCharToUpper

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FirstCharToUpper(_me: LingoMe, a_cWord: LingoValue) {
  var tNum = callNamed("charToNum", a_cWord.char[1]);
  if (lingoBinary("and", lingoBinary("gte", tNum, 97), lingoBinary("lte", tNum, 122))) {
  return lingoBinary("join", callNamed("string", callNamed("numToChar", lingoBinary("sub", tNum, 32))), callNamed("chars", a_cWord, 2, a_cWord.length));
  } else {
  return a_cWord;
  }

}

