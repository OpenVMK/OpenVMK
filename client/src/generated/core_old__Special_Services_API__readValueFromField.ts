// core.old.cct / Special Services API / readValueFromField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function readValueFromField(_me: LingoMe, a_sFieldName: LingoValue, a_cDelimiter: LingoValue, a_sSearchedKey: LingoValue) {
  return callMethod("readValueFromField", callNamed("getSpecialServices"), a_sFieldName, a_cDelimiter, a_sSearchedKey);
}

