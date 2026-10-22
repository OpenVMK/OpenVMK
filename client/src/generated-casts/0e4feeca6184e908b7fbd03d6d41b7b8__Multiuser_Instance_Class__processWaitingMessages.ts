// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser Instance Class / processWaitingMessages

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function processWaitingMessages(_me: LingoMe, tCount: LingoValue) {
  if (callNamed("voidp", tCount)) {
  tCount = 1;
  }

  return callMethod("checkNetMessages", meProp(_me, "pXtra"), tCount);
}

