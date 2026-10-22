// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CCannedField / ParseCannedField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseCannedField(_me: LingoMe, a_rElement: LingoValue, a_ar_symOptions: LingoValue) {
  var tText = callMethod("getText", a_rElement);
  return callMethod("ParseText", callMethod("getComponent", callNamed("getThread", "dictionary")), tText, a_ar_symOptions);
}

