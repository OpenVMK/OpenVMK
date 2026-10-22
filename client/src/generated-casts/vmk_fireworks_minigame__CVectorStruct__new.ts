// vmk_fireworks_minigame.cct / CVectorStruct / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

// HAND-CORRECTED: `me.ancestor = []` makes the object a list in Director; keep the items in m_ar_vector instead.
export function _new(_me: LingoMe, a_ar_list: LingoValue) {
  setMeProp(_me, "m_ar_vector", new LingoList([]));
  if (callNamed("listp", a_ar_list)) {
  for (var i = 1; i <= a_ar_list.count; ++i) {
  callMethod("append", meProp(_me, "m_ar_vector"), a_ar_list[i])
  }
  }
  return _me;
}
