// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoIconPulser / addElements

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addElements(_me: LingoMe, i_lElements: LingoValue) {
  if ((lingoTruthy(lingoBinary("eq", callNamed("ilk", i_lElements), symbol("list"))) ? 0 : 1)) {
  return 0;
  }

  for (var t_Elem of i_lElements.toArray()) {
  var t_new = new LingoPropList([]);
  t_new[symbol("element")] = t_Elem;
  t_new[symbol("needupdate")] = 1;
  callMethod("append", meProp(_me, "m_pElements"), t_new)
  }

  return 1;
}

