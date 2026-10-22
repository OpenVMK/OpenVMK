// core.old.cct / Special Services Class / alertHook

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function alertHook(_me: LingoMe) {
  setMeProp(_me, "pCatchFlag", 1);
  setMeProp(_me, "pLastErrStr", "Script error");
  setTheProperty("alertHook", meProp(_me, "pSavedHook"));
  return 1;
}

