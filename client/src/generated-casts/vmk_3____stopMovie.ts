// vmk_3.dcr /  / stopMovie

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stopMovie(_me: LingoMe) {
  /* global */ var g_rInitializer = globalVar("g_rInitializer");
  /* global */ var tErrorCount = globalVar("tErrorCount");
  if (callNamed("objectp", globalVar("g_rInitializer"))) {
  callMethod("DTOR", globalVar("g_rInitializer"))
  setGlobal("g_rInitializer", undefined);
  }

  callNamed("clearGlobals")
}

