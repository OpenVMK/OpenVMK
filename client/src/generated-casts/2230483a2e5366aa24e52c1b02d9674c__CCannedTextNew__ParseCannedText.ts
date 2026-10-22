// 2230483a2e5366aa24e52c1b02d9674c.cct / CCannedTextNew / ParseCannedText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseCannedText(_me: LingoMe, a_sText: LingoValue, a_ar_symOptions: LingoValue) {
  return callMethod("ParseText", callMethod("getComponent", callNamed("getThread", "dictionary")), a_sText, a_ar_symOptions);
}

