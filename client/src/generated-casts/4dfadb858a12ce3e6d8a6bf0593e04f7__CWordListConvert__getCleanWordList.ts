// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CWordListConvert / getCleanWordList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getCleanWordList(_me: LingoMe, input: LingoValue) {
  var t_output = callNamed("replaceChars", input, callNamed("numToChar", 10), callNamed("numToChar", 13));
  return callNamed("convertToLowerCase", t_output);
}

