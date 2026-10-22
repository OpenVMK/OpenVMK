// core.old.cct / Error API / RemoveErrorManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveErrorManager(_me: LingoMe) {
  /* global */ var g_rError = globalVar("g_rError");
  if (!lingoTruthy(callNamed("objectp", globalVar("g_rError")))) {
  return 0;
  } else {
  callMethod("deconstruct", globalVar("g_rError"))
  setGlobal("g_rError", undefined);
  return 1;
  }

}

