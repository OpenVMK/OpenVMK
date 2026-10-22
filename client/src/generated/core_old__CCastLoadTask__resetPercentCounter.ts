// core.old.cct / CCastLoadTask / resetPercentCounter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetPercentCounter(_me: LingoMe) {
  setMeProp(_me, "pTempPercent", 0);
  setMeProp(_me, "pTmpLoadCount", 0);
  return 1;
}

