// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedText / SetCannedFreeWordList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetCannedFreeWordList(_me: LingoMe, a_ar_words: LingoValue) {
  callMethod("SetFreeWordList", callMethod("getComponent", callNamed("getThread", "dictionary")), a_ar_words)
}

