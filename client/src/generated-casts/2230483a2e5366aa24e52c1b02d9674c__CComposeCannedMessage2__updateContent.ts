// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / updateContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateContent(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", _me.m_sWndTitle);
  var tElement = callMethod("getElement", tWndObj, _me.m_sClientElement);
  if (lingoBinary("neq", tElement, 0)) {
  var tTextField = callMethod("getProperty", tElement, symbol("sprite")).member;
  if (_me.m_bFlashing) {
  setThePropOf(tTextField, "color", _me.m_colorInput);
  setThePropOf(_me, "m_ar_cWords", new LingoList([]));
  setThePropOf(_me, "m_bValidFlag", 0);
  setThePropOf(_me, "m_bFlashing", 0);
  setThePropOf(_me, "m_bNotified", 0);
  }

  if (_me.m_bScrolling) {
  callMethod("updateText", tElement)
  }

  if (lingoBinary("or", lingoBinary("or", theProperty("optionDown"), theProperty("commandDown")), theProperty("controlDown"))) {
  if (lingoBinary("or", lingoBinary("eq", theProperty("key"), "V"), lingoBinary("eq", theProperty("key"), "v"))) {
  return 0;
  }

  return 1;
  }

  }

}

