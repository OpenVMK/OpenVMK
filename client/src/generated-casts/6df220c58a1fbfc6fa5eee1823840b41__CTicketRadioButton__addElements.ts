// 6df220c58a1fbfc6fa5eee1823840b41.cct / CTicketRadioButton / addElements

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addElements(_me: LingoMe, a_ar_Elements: LingoValue) {
  if ((lingoTruthy(lingoBinary("eq", callNamed("ilk", a_ar_Elements), symbol("list"))) ? 0 : 1)) {
  return 0;
  }

  for (var t_Elem of a_ar_Elements.toArray()) {
  var t_new = new LingoPropList([]);
  t_new[symbol("element")] = t_Elem.element;
  t_new[symbol("description")] = callMethod("getaProp", t_Elem, symbol("description"));
  t_new[symbol("needupdate")] = 1;
  t_new[symbol("Active")] = 0;
  t_new[symbol("type")] = callMethod("getaProp", t_Elem, symbol("type"));
  t_new[symbol("value")] = callMethod("getaProp", t_Elem, symbol("value"));
  callMethod("append", meProp(_me, "m_ar_Elements"), t_new)
  }

  return 1;
}

