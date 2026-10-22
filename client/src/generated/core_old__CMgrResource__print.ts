// core.old.cct / CMgrResource / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe) {
  for (var i = 1; i <= meProp(_me, "pAllMemNumList").count; ++i) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", callMethod("getPropAt", meProp(_me, "pAllMemNumList"), i), "--"), meProp(_me, "pAllMemNumList")[i]))
  }

  return 1;
}

