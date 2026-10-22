// core.old.cct / Error API / error

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function error(_me: LingoMe, a_rObject: LingoValue, a_sMsg: LingoValue, a_kMethod: LingoValue) {
  /* global */ var g_rError = globalVar("g_rError");
  return callMethod("error", callNamed("getErrorManager"), a_rObject, a_sMsg, a_kMethod);
}

