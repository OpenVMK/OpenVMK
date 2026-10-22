// framework.dcr / MainEvents / alertHook

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function alertHook(_me: LingoMe, a: LingoValue, b: LingoValue, c: LingoValue, d: LingoValue, e: LingoValue) {
  /* global */ var g_rInitializer = globalVar("g_rInitializer");
  /* global */ var tErrorCount = globalVar("tErrorCount");
  setGlobal("tErrorCount", lingoBinary("add", globalVar("tErrorCount"), 1));
  setTheProperty("trace", 0);
  return 1;
}

