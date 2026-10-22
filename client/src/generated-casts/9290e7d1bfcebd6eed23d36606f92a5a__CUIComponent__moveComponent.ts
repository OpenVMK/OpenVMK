// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponent / moveComponent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveComponent(_me: LingoMe, t_rComponent: LingoValue, t_iDirection: LingoValue) {
  var t_iPos = callMethod("getOne", meProp(_me, "m_ar_Children"), t_rComponent);
  if (lingoBinary("gt", t_iPos, 0)) {
  var t_iNewPos = lingoBinary("add", t_iPos, t_iDirection);
  if (lingoBinary("and", lingoBinary("gt", t_iNewPos, 0), lingoBinary("lt", t_iNewPos, meProp(_me, "m_ar_Children").count))) {
  callMethod("deleteAt", meProp(_me, "m_ar_Children"), t_iPos)
  callMethod("addAt", meProp(_me, "m_ar_Children"), t_iNewPos, t_rComponent)
  }

  }

}

