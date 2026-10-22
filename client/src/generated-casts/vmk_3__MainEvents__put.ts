// vmk_3.dcr / MainEvents / put

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function put(_me: LingoMe, a: LingoValue, b: LingoValue, c: LingoValue, d: LingoValue, e: LingoValue) {
  /* global */ var g_rInitializer = globalVar("g_rInitializer");
  /* global */ var tErrorCount = globalVar("tErrorCount");
  if (lingoBinary("contains", a, "Avatar data parsed")) {
  callMethod("send", callNamed("getObject", "VMK"), 1049, callNamed("propList", symbol("str"), _player.productVersion, symbol("str"), _player.productName))
  }

  callNamed("trace", lingoBinary("joinPad", lingoBinary("joinPad", a, b), c))
}

