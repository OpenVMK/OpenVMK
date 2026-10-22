// framework.dcr / MainEvents / handlers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handlers(_me: LingoMe) {
  /* global */ var g_rInitializer = globalVar("g_rInitializer");
  /* global */ var tErrorCount = globalVar("tErrorCount");
  return new LingoList([]);
}

