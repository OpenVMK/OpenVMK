// 38365562899c7799eeaea4a99041ea57.cct / CUIComponentPage / deleteComponent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deleteComponent(_me: LingoMe, t_rComponent: LingoValue) {
  var t_iPos = callMethod("getOne", meProp(_me, "m_ar_components"), t_rComponent);
  if (lingoBinary("gt", t_iPos, 0)) {
  callNamed("removeObject", callMethod("getID", t_rComponent))
  callMethod("deleteAt", meProp(_me, "m_ar_components"), t_iPos)
  }

  setMeProp(_me, "m_bNeedSorting", 1);
}

