// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / isLinefeed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function isLinefeed(_me: LingoMe, a_sWord: LingoValue) {
  if (lingoBinary("or", lingoBinary("eq", a_sWord.char[1], "\x03"), lingoBinary("eq", a_sWord.char[1], "\r"))) {
  return 1;
  } else {
  return 0;
  }

}

