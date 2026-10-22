// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (callNamed("keyPressed", "\b")) {
  var t_rWindow = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (callNamed("objectp", t_rWindow)) {
  var t_rElement = callMethod("getElement", t_rWindow, "hlp.harrasser.input");
  if (callNamed("objectp", t_rElement)) {
  var t_rSprite = callMethod("getProperty", t_rElement, symbol("sprite"));
  if (lingoBinary("eq", theProperty("keyboardFocusSprite"), t_rSprite.spriteNum)) {
  var t_rField = t_rSprite.member;
  var t_sText = t_rField.text;
  t_sText = deleteStringChunk(t_sText, "char", -30000, 0);
  setThePropOf(t_rField, "text", t_sText);
  }

  }

  }

  }

}

