// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElement = callMethod("getElement", tWndObj, meProp(_me, "m_sClientElement"));
  if (lingoBinary("neq", tElement, 0)) {
  var tTextField = callMethod("getProperty", tElement, symbol("sprite")).member;
  setThePropOf(tTextField, "color", meProp(_me, "m_colorInput"));
  callMethod("setText", tElement, "")
  }

  }

  setMeProp(_me, "m_ar_cWords", new LingoList([]));
  setMeProp(_me, "m_bValidFlag", 0);
  setMeProp(_me, "m_bFlashing", 0);
  setMeProp(_me, "m_bNotified", 0);
  setTheProperty("selStart", 1);
  setTheProperty("selEnd", 1);
}

