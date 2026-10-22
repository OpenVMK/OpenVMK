// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", _me.m_sWndTitle);
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElement = callMethod("getElement", tWndObj, _me.m_sClientElement);
  if (lingoBinary("neq", tElement, 0)) {
  var tTextField = callMethod("getProperty", tElement, symbol("sprite")).member;
  setThePropOf(tTextField, "color", _me.m_colorInput);
  callMethod("setText", tElement, "")
  }

  setThePropOf(_me, "m_ar_cWords", new LingoList([]));
  }

  setThePropOf(_me, "m_bValidFlag", 0);
  setThePropOf(_me, "m_bFlashing", 0);
  setThePropOf(_me, "m_bNotified", 0);
}

