// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedText / TransformCannedToMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TransformCannedToMsg(_me: LingoMe, a_ar_mp_cannedMap: LingoValue, a_bNoPhraseLength: LingoValue) {
  return callMethod("TransformCannedToMsg", callMethod("getComponent", callNamed("getThread", "dictionary")), a_ar_mp_cannedMap, a_bNoPhraseLength);
}

