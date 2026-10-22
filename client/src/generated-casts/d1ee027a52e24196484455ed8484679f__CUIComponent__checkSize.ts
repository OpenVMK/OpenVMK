// d1ee027a52e24196484455ed8484679f.cct / CUIComponent / checkSize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkSize(_me: LingoMe, t_iWidth: LingoValue, t_iHeight: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_iWidth"), 0)) {
  setMeProp(_me, "m_iWidth", t_iWidth);
  }

  if (lingoBinary("eq", meProp(_me, "m_iHeight"), 0)) {
  setMeProp(_me, "m_iHeight", t_iHeight);
  }

  var t_xOffset = 0;
  for (var t_rLayout of meProp(_me, "m_ar_layouts").toArray()) {
  callMethod("checkSize", t_rLayout, meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"), lingoBinary("add", t_xOffset, meProp(_me, "m_pOffset").locH))
  t_xOffset = lingoBinary("add", lingoBinary("add", t_xOffset, callMethod("getWidth", t_rLayout)), meProp(_me, "m_iPad"));
  }

}

