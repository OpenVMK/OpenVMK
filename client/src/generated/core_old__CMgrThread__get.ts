// core.old.cct / CMgrThread / get

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _get(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  var tThreadObj = meProp(_me, "pThreadList")[tID];
  if (callNamed("voidp", tThreadObj)) {
  if (callNamed("stringp", tID)) {
  tThreadObj = meProp(_me, "pThreadList")[callNamed("symbol", tID)];
  }

  }

  if (callNamed("voidp", tThreadObj)) {
  return 0;
  } else {
  return tThreadObj;
  }

}

