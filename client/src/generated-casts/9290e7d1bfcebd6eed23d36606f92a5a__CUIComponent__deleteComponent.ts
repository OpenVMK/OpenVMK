// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponent / deleteComponent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deleteComponent(_me: LingoMe, t_rComponent: LingoValue) {
  if (lingoBinary("eq", callMethod("GetActiveComponent", meProp(_me, "m_rParent")), t_rComponent)) {
  callMethod("setActiveComponent", meProp(_me, "m_rParent"), undefined)
  callMethod("setActiveLayout", meProp(_me, "m_rParent"), undefined)
  }

  var t_iPos = callMethod("getOne", meProp(_me, "m_ar_Children"), t_rComponent);
  if (lingoBinary("gt", t_iPos, 0)) {
  callNamed("removeObject", callMethod("getID", t_rComponent))
  callMethod("deleteAt", meProp(_me, "m_ar_Children"), t_iPos)
  }

  var m_bNeedSorting = 1;
}

