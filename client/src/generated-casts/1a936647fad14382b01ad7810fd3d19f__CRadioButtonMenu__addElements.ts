// 1a936647fad14382b01ad7810fd3d19f.cct / CRadioButtonMenu / addElements

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
  t_new[symbol("element")] = t_Elem.element;
  t_new[symbol("description")] = callMethod("getaProp", t_Elem, symbol("description"));
  t_new[symbol("needupdate")] = 1;
  t_new[symbol("Active")] = 0;
  callMethod("append", meProp(_me, "m_pElements"), t_new)
  }

  return 1;
}

