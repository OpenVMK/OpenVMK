// d1ee027a52e24196484455ed8484679f.cct / CUIComponent / getVisible

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getVisible(_me: LingoMe, a_ar_visible: LingoValue) {
  if (meProp(_me, "m_bVisibility")) {
  callMethod("append", a_ar_visible, _me)
  if (callMethod("hasChildren", _me)) {
  for (var t_rChild of callMethod("getChildren", _me).toArray()) {
  callMethod("getVisible", t_rChild, a_ar_visible)
  }

  }

  }

}

