// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / update

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
  if (lingoBinary("eq", theProperty("environment").productVersion, "10.2")) {
  if (lingoBinary("eq", theProperty("environment").productBuildVersion, "21")) {
  var t_rWindow = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callNamed("objectp", t_rWindow)) {
  var t_rElement = callMethod("getElement", t_rWindow, "mods.target.input");
  if (callNamed("objectp", t_rElement)) {
  if (lingoBinary("eq", theProperty("keyboardFocusSprite"), callMethod("getProperty", t_rElement, symbol("sprite")).spriteNum)) {
  var t_sText = callMethod("getProperty", t_rElement, symbol("sprite")).member.text;
  t_sText = deleteStringChunk(t_sText, "char", -30000, 0);
  setThePropOf(callMethod("getProperty", t_rElement, symbol("sprite")).member, "text", t_sText);
  }

  }

  }

  }

  }

  }

}

