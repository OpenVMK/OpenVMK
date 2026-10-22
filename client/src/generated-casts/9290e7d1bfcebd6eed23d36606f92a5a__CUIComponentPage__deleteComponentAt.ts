// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponentPage / deleteComponentAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deleteComponentAt(_me: LingoMe, t_iPos: LingoValue) {
  if (lingoBinary("and", lingoBinary("gt", t_iPos, 0), lingoBinary("lte", t_iPos, meProp(_me, "m_ar_components").count))) {
  var t_rComponent = meProp(_me, "m_ar_components")[t_iPos];
  if (lingoBinary("eq", meProp(_me, "m_rActiveComponent"), t_rComponent)) {
  setMeProp(_me, "m_rActiveComponent", undefined);
  setMeProp(_me, "m_rActive", undefined);
  }

  callNamed("removeObject", callMethod("getID", t_rComponent))
  callMethod("deleteAt", meProp(_me, "m_ar_components"), t_iPos)
  }

  setMeProp(_me, "m_bNeedSorting", 1);
}

