// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser Instance Class / connectionReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function connectionReady(_me: LingoMe) {
  return meProp(_me, "pConnectionOk");
}

