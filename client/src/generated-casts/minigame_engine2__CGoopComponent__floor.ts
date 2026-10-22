// minigame_engine2.cct / CGoopComponent / floor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function floor(_me: LingoMe, i_fVal: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  var tInteger = callNamed("integer", i_fVal);
  if (lingoBinary("gt", tInteger, i_fVal)) {
  return callNamed("float", lingoBinary("sub", tInteger, 1));
  } else {
  return callNamed("float", tInteger);
  }

}

