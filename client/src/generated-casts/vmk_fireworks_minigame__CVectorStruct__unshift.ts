// vmk_fireworks_minigame.cct / CVectorStruct / unshift

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

// HAND-CORRECTED: `me.ancestor = []` makes the object a list in Director; keep the items in m_ar_vector instead.
export function unshift(_me: LingoMe, t_rdata: LingoValue) {
  var t_list = meProp(_me, "m_ar_vector");
  callMethod("addAt", t_list, 1, t_rdata);
  return t_list.count;
}
