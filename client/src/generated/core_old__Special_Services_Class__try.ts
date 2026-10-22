// core.old.cct / Special Services Class / try

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _try(_me: LingoMe) {
  setMeProp(_me, "pCatchFlag", 0);
  if (lingoBinary("neq", theProperty("alertHook"), _me)) {
  setMeProp(_me, "pSavedHook", theProperty("alertHook"));
  setTheProperty("alertHook", _me);
  }

  return 1;
}

