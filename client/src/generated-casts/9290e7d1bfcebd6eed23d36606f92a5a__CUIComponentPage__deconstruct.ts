// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponentPage / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rBlinker"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rBlinker")))
  }

  setMeProp(_me, "m_rImgElement", undefined);
  callNamed("removeMember", meProp(_me, "m_rWriter").name)
  for (var t_rComponent of meProp(_me, "m_ar_components").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rComponent))
  }

  setMeProp(_me, "m_rImg", undefined);
  setMeProp(_me, "m_iWidth", undefined);
  setMeProp(_me, "m_iHeight", undefined);
  setMeProp(_me, "m_rBgColor", undefined);
  setMeProp(_me, "m_iMinWidth", undefined);
  setMeProp(_me, "m_iMinHeight", undefined);
  setMeProp(_me, "m_ar_components", undefined);
  setMeProp(_me, "m_rWriter", undefined);
  setMeProp(_me, "m_rActiveComponent", undefined);
  setMeProp(_me, "m_rActive", undefined);
  setMeProp(_me, "m_iSortingOrder", undefined);
  setMeProp(_me, "m_bHasController", undefined);
  setMeProp(_me, "m_bNeedSorting", undefined);
  return 1;
}

