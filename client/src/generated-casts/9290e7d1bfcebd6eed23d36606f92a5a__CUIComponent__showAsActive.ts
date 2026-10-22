// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponent / showAsActive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showAsActive(_me: LingoMe, a_bShowAsActive: LingoValue) {
  if (callNamed("voidp", a_bShowAsActive)) {
  a_bShowAsActive = 0;
  }

  setMeProp(_me, "m_bShowAsActive", a_bShowAsActive);
  for (var t_rLayout of meProp(_me, "m_ar_layouts").toArray()) {
  callMethod("showAsActive", t_rLayout, a_bShowAsActive)
  }

  if (callNamed("objectp", meProp(_me, "m_rBackground"))) {
  switch (callNamed("ilk", meProp(_me, "m_rBackground"))) {
case symbol("instance"):
  callMethod("showAsActive", meProp(_me, "m_rBackground"), a_bShowAsActive)
  break;
  default:
  callNamed("nothing")
  }

  }

}

