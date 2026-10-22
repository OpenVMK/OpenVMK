// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedText / TestPartialWord

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestPartialWord(_me: LingoMe, a_sWord: LingoValue, a_ar_symOptions: LingoValue, o_ar_matches: LingoValue) {
  return callMethod("TestPartialWord", callMethod("getComponent", callNamed("getThread", "dictionary")), a_sWord, a_ar_symOptions);
}

