// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary API / deconstructBinaryManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstructBinaryManager(_me: LingoMe) {
  return callNamed("removeManager", symbol("binary_data_manager"));
}

