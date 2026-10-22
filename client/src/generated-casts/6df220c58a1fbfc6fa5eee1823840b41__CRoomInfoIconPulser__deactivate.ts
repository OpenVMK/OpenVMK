// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoIconPulser / deactivate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deactivate(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  if (lingoBinary("gt", callMethod("count", meProp(_me, "m_pElements")), 0)) {
  var tElem = callMethod("getElement", tWndObj, meProp(_me, "m_pElements")[1].element);
  if (lingoBinary("neq", tElem, 0)) {
  setThePropOf(tElem, "pImage", meProp(_me, "m_gNormal"));
  callMethod("render", tElem)
  }

  }

  }

  setMeProp(_me, "m_bActive", 0);
}

