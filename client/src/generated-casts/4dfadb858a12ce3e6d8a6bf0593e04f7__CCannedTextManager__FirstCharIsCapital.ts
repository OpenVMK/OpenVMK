// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / FirstCharIsCapital

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FirstCharIsCapital(_me: LingoMe, a_cWord: LingoValue) {
  var tNum = callNamed("charToNum", a_cWord.char[1]);
  if (lingoBinary("and", lingoBinary("gte", tNum, 65), lingoBinary("lte", tNum, 90))) {
  return 1;
  } else {
  return 0;
  }

}

