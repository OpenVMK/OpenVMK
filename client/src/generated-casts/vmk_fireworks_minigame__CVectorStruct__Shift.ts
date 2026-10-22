// vmk_fireworks_minigame.cct / CVectorStruct / Shift

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

// HAND-CORRECTED: `me.ancestor = []` makes the object a list in Director; keep the items in m_ar_vector instead.
export function Shift(_me: LingoMe) {
  var t_list = meProp(_me, "m_ar_vector");
  if (t_list.count === 0) return undefined;
  var t_rdata = callMethod("getAt", t_list, 1);
  callMethod("deleteAt", t_list, 1);
  return t_rdata;
}
