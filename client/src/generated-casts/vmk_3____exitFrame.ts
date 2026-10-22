// vmk_3.dcr /  / exitFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function exitFrame(_me: LingoMe, foo: LingoValue) {
  /* global */ var g_rInitializer = globalVar("g_rInitializer");
  /* global */ var tErrorCount = globalVar("tErrorCount");
  if (callNamed("voidp", foo)) {
  callNamed("go", theProperty("frame"))
  }

  setThePropOf(_player, "alertHook", callNamed("script", "MainEvents"));
}

