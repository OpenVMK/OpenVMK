// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / updateContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateContent(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  var tElement = callMethod("getElement", tWndObj, meProp(_me, "m_sClientElement"));
  if (lingoBinary("neq", tElement, 0)) {
  var tTextField = callMethod("getProperty", tElement, symbol("sprite")).member;
  if (meProp(_me, "m_bFlashing")) {
  setThePropOf(tTextField, "color", meProp(_me, "m_colorInput"));
  setMeProp(_me, "m_ar_cWords", new LingoList([]));
  setMeProp(_me, "m_bValidFlag", 0);
  setMeProp(_me, "m_bFlashing", 0);
  setMeProp(_me, "m_bNotified", 0);
  }

  if (meProp(_me, "m_bScrolling")) {
  callMethod("updateText", tElement)
  }

  }

  if (lingoBinary("or", lingoBinary("or", theProperty("commandDown"), theProperty("optionDown")), theProperty("controlDown"))) {
  if (lingoBinary("or", lingoBinary("eq", theProperty("key"), "v"), lingoBinary("eq", theProperty("key"), "V"))) {
  return 0;
  }

  }

  return 1;
}

