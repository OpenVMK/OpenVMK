// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var t_rLayout of meProp(_me, "m_ar_layouts").toArray()) {
  callMethod("deconstruct", t_rLayout)
  t_rLayout = undefined;
  }

  for (var t_rComponent of meProp(_me, "m_ar_Children").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rComponent))
  }

  setMeProp(_me, "m_ar_layouts", new LingoList([]));
  setMeProp(_me, "m_ar_Children", new LingoList([]));
  setMeProp(_me, "m_rParent", undefined);
  setMeProp(_me, "m_rImg", undefined);
  if (callNamed("objectp", meProp(_me, "m_rBackground"))) {
  switch (callNamed("ilk", meProp(_me, "m_rBackground"))) {
case symbol("instance"):
  callMethod("deconstruct", meProp(_me, "m_rBackground"))
  setMeProp(_me, "m_rBackground", undefined);
  break;
  }

  }

  setMeProp(_me, "m_rImg", undefined);
  setMeProp(_me, "m_iWidth", undefined);
  setMeProp(_me, "m_iHeight", undefined);
  setMeProp(_me, "m_pOffset", undefined);
  setMeProp(_me, "m_rBgColor", undefined);
  setMeProp(_me, "m_rBackground", undefined);
  setMeProp(_me, "m_sEvent", undefined);
  setMeProp(_me, "m_iPad", undefined);
  setMeProp(_me, "m_bClickable", undefined);
  setMeProp(_me, "m_ar_layouts", undefined);
  setMeProp(_me, "m_ar_Children", undefined);
  setMeProp(_me, "m_bShowChildren", undefined);
  setMeProp(_me, "m_bActive", undefined);
  setMeProp(_me, "m_bShowAsActive", undefined);
  setMeProp(_me, "m_rActiveColor", undefined);
  return 1;
}

