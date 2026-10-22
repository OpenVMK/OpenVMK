// vmk_fireworks_minigame.cct / CVectorStruct / top

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

// HAND-CORRECTED: `me.ancestor = []` makes the object a list in Director; keep the items in m_ar_vector instead.
export function top(_me: LingoMe) {
  var t_list = meProp(_me, "m_ar_vector");
  return t_list.count > 0 ? callMethod("getAt", t_list, t_list.count) : undefined;
}
