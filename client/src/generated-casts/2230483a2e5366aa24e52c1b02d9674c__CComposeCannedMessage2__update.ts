// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var t_error = 1;
  var tWndObj = callNamed("getWindow", _me.m_sWndTitle);
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElement = callMethod("getElement", tWndObj, _me.m_sClientElement);
  if (lingoBinary("neq", tElement, 0)) {
  var tTextField = callMethod("getProperty", tElement, symbol("sprite")).member;
  t_error = 0;
  }

  if ((lingoTruthy(t_error) ? 0 : 1)) {
  if (lingoBinary("eq", tTextField.text, "")) {
  } else {
  if (callNamed("keyPressed", "\b")) {
  if (lingoBinary("eq", theProperty("keyboardFocusSprite"), callMethod("getProperty", tElement, symbol("sprite")).spriteNum)) {
  if (lingoBinary("eq", theProperty("environment").productVersion, "10.2")) {
  if (lingoBinary("eq", theProperty("environment").productBuildVersion, "21")) {
  var t_sText = tTextField.text;
  var c = 4;
  setThePropOf(tTextField, "text", t_sText);
  callMethod("updateContent", _me)
  }

  if (_me.m_bFlashing) {
  if (lingoBinary("eq", _me.m_iFlashCounter, 0)) {
  setThePropOf(_me, "m_iFlashCounter", _me.m_iFLASHDELAY);
  if (lingoBinary("eq", _me.m_iLastFrameFlashColor, symbol("red"))) {
  setThePropOf(tTextField, "color", _me.m_colorInput);
  setThePropOf(_me, "m_iLastFrameFlashColor", symbol("white"));
  } else {
  setThePropOf(_me, "m_iLastFrameFlashColor", symbol("red"));
  }

  c = 1;
  for (var i = 1; i <= _me.m_ar_cWords.count; ++i) {
  var w = _me.m_ar_cWords[i];
  for (var ch = 1; ch <= w.word.length; ++ch) {
  if ((lingoTruthy(w.valid) ? 0 : 1)) {
  setThePropOf(tTextField.char[c], "color", _me.m_colorNonMatch);
  }

  c = lingoBinary("add", c, 1);
  }

  }

  } else {
  setThePropOf(_me, "m_iFlashCounter", lingoBinary("sub", _me.m_iFlashCounter, 1));
  }

  }

  }

  }

  }

  }

  }

  }

}

