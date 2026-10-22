// core.old.cct / String Services API / convertHexToInt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertHexToInt(_me: LingoMe, a_sHex: LingoValue) {
  return callMethod("convertHexToInt", callNamed("getStringServices"), a_sHex);
}

