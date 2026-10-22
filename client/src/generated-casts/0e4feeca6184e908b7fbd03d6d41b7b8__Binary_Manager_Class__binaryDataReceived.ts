// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / binaryDataReceived

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function binaryDataReceived(_me: LingoMe, tdata: LingoValue) {
  var tTask = meProp(_me, "pQueue")[1];
  callMethod("deleteAt", meProp(_me, "pQueue"), 1)
  if (lingoBinary("neq", tTask[symbol("callback")], undefined)) {
  var tObject = callNamed("getObject", tTask[symbol("callback")]);
  if (lingoBinary("eq", callNamed("ilk", tObject), symbol("instance"))) {
  callNamed("call", symbol("binaryDataReceived"), tObject, tdata, tTask[symbol("id")])
  }

  }

  callMethod("next", _me)
}

