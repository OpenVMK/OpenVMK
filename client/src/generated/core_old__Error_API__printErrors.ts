// core.old.cct / Error API / printErrors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function printErrors(_me: LingoMe) {
  /* global */ var g_rError = globalVar("g_rError");
  return callMethod("print", callNamed("getErrorManager"));
}

