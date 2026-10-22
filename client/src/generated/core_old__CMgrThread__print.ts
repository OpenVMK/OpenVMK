// core.old.cct / CMgrThread / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe, _this: LingoValue) {
  for (var i = 1; i <= meProp(_me, "pThreadList").count; ++i) {
  callNamed("put", callMethod("getPropAt", meProp(_me, "pThreadList"), i))
  }

}

