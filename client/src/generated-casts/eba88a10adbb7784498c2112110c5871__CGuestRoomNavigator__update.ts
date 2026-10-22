// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / update

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
  if (callNamed("windowExists", meProp(_me, "m_sWindowTitle"))) {
  var t_rWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  var t_rElement = callMethod("getElement", t_rWndObj, "nav.roomsearch.field");
  if (callNamed("objectp", t_rElement)) {
  if (lingoBinary("eq", theProperty("keyboardFocusSprite"), callMethod("getProperty", t_rElement, symbol("sprite")).spriteNum)) {
  if (lingoBinary("eq", theProperty("environment").productVersion, "10.2")) {
  if (lingoBinary("eq", theProperty("environment").productBuildVersion, "21")) {
  var t_rTextField = callMethod("getProperty", t_rElement, symbol("sprite")).member;
  var t_sText = t_rTextField.text;
  t_sText = deleteStringChunk(t_sText, "char", -30000, 0);
  setThePropOf(t_rTextField, "text", t_sText);
  }

  }

  }

  }

  }

  }

}

