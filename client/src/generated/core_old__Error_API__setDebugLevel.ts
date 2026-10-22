// core.old.cct / Error API / setDebugLevel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDebugLevel(_me: LingoMe, a_iLevel: LingoValue) {
  /* global */ var g_rError = globalVar("g_rError");
  return callMethod("setDebugLevel", callNamed("getErrorManager"), a_iLevel);
}

