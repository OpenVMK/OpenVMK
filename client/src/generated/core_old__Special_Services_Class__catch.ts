// core.old.cct / Special Services Class / catch

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _catch(_me: LingoMe, a_cErrStr: LingoValue) {
  setTheProperty("alertHook", meProp(_me, "pSavedHook"));
  if (meProp(_me, "pCatchFlag")) {
  if (callNamed("stringp", a_cErrStr)) {
  if (lingoBinary("eq", meProp(_me, "pLastErrStr"), a_cErrStr)) {
  setMeProp(_me, "pCatchFlag", 0);
  var t_bValue = 1;
  } else {
  t_bValue = 0;
  }

  } else {
  setMeProp(_me, "pCatchFlag", 0);
  t_bValue = 1;
  }

  } else {
  t_bValue = 0;
  }

  return t_bValue;
}

