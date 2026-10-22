// core.old.cct / CMgrWriter / get

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _get(_me: LingoMe, _this: LingoValue, a_sID: LingoValue) {
  var tObj = meProp(_me, "pItemList")[a_sID];
  if (callNamed("voidp", tObj)) {
  return 0;
  }

  return tObj;
}

