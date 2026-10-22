// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / recycleConnection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function recycleConnection(_me: LingoMe) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "MUSConnectionError", 1, 1);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "phototransfer.error.in.operation"), callNamed("getText", "phototransfer.error.title"), "OK")
  if ((lingoTruthy(callMethod("checkRecycleCount", _me)) ? 0 : 1)) {
  return 0;
  }

  setMeProp(_me, "pRecycleCount", lingoBinary("add", meProp(_me, "pRecycleCount"), 1));
  callNamed("put", "Recycle Connection")
  setMeProp(_me, "pQueue", new LingoList([]));
  callMethod("next", _me)
}

