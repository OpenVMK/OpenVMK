// 2230483a2e5366aa24e52c1b02d9674c.cct / CCannedTextNew / GetCannedWord

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetCannedWord(_me: LingoMe, a_iIndex: LingoValue) {
  return callMethod("getWordOfIndex", callMethod("getComponent", callNamed("getThread", "dictionary")), a_iIndex);
}

