// core.old.cct / CMgrObject / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe, _this: LingoValue) {
  for (var i = 1; i <= meProp(_me, "pObjectList").count; ++i) {
  var tProp = callMethod("getPropAt", meProp(_me, "pObjectList"), i);
  if (callNamed("symbolp", tProp)) {
  tProp = lingoBinary("join", "#", tProp);
  }

  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", tProp, ":"), meProp(_me, "pObjectList")[i]))
  }

  return 1;
}

