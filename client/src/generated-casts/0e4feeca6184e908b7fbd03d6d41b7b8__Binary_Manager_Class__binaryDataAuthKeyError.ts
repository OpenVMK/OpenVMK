// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / binaryDataAuthKeyError

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function binaryDataAuthKeyError(_me: LingoMe) {
  callMethod("deleteAt", meProp(_me, "pQueue"), 1)
  callMethod("next", _me)
}

