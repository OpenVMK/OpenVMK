// vmk_fireworks.cct / CVectorStruct / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe, a_ar_list: LingoValue) {
  setThePropOf(_me, "ancestor", new LingoList([]));
  if (callNamed("listp", a_ar_list)) {
  for (var i = 1; i <= a_ar_list.count; ++i) {
  callMethod("push", _me, a_ar_list[i])
  }

  }

  return _me;
}

