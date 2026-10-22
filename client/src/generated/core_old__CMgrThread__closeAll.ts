// core.old.cct / CMgrThread / closeAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function closeAll(_me: LingoMe, _this: LingoValue) {
  for (var i = meProp(_me, "pThreadList").count; i >= 1; --i) {
  callMethod("closeThread", _this, callMethod("getPropAt", meProp(_me, "pThreadList"), i))
  }

  return 1;
}

