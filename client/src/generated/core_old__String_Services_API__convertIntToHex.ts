// core.old.cct / String Services API / convertIntToHex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertIntToHex(_me: LingoMe, a_iInt: LingoValue) {
  return callMethod("convertIntToHex", callNamed("getStringServices"), a_iInt);
}

