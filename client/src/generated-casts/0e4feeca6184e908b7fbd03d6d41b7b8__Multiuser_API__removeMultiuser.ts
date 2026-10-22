// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser API / removeMultiuser

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeMultiuser(_me: LingoMe, tID: LingoValue) {
  return callMethod("Remove", callNamed("getMultiuserManager"), tID);
}

