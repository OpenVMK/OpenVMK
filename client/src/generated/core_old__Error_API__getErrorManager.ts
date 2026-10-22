// core.old.cct / Error API / getErrorManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getErrorManager(_me: LingoMe) {
  /* global */ var g_rError = globalVar("g_rError");
  if (callNamed("objectp", globalVar("g_rError"))) {
  return globalVar("g_rError");
  } else {
  return callNamed("CreateErrorManager");
  }

}

