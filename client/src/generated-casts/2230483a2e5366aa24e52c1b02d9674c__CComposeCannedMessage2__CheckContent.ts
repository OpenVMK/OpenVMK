// 2230483a2e5366aa24e52c1b02d9674c.cct / CComposeCannedMessage2 / CheckContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CheckContent(_me: LingoMe, i_KeyCode: LingoValue) {
  var tWndObj = callNamed("getWindow", _me.m_sWndTitle);
  var tElement = callMethod("getElement", tWndObj, _me.m_sClientElement);
  if (lingoBinary("neq", tElement, 0)) {
  if ((lingoTruthy(_me.m_bAllowEmpty) ? 0 : 1)) {
  if (lingoBinary("eq", callMethod("getProperty", tElement, symbol("sprite")).member.text.length, 0)) {
  return 0;
  }

  setThePropOf(_me, "m_ar_cWords", new LingoList([]));
  }

  setThePropOf(_me, "m_ar_cWords", callNamed("ParseCannedField", tElement, _me.m_ar_symParseOptions));
  setThePropOf(_me, "m_bValidFlag", 0);
  var tInvalids = 0;
  while (lingoBinary("lte", tWndObj, tInvalids)) {
  var tWord = callNamed("getAt", tInvalids, tElement);
  if ((lingoTruthy(tWord.valid) ? 0 : 1)) {
  tInvalids = 1;
  }

  }

  for (var i = 1; i <= _me.m_ar_cWords.count; ++i) {
  if (lingoBinary("gt", i, 1)) {
  if (lingoBinary("and", lingoBinary("eq", _me.m_ar_cWords[lingoBinary("sub", i, 1)].word, " "), lingoBinary("eq", _me.m_ar_cWords[i].word, " "))) {
  return 0;
  }

  }

  }

  if ((lingoTruthy(tInvalids) ? 0 : 1)) {
  setThePropOf(_me, "m_bValidFlag", 1);
  } else {
  if (_me.m_bFlashing) {
  if (lingoBinary("eq", theProperty("keyCode"), 36)) {
  if (_me.m_bNotified) {
  if (_me.m_bAllowErrors) {
  setThePropOf(_me, "m_bValidFlag", 1);
  }

  setThePropOf(_me, "m_bNotified", 0);
  } else {
  setThePropOf(_me, "m_bNotified", 1);
  }

  }

  setThePropOf(_me, "m_bFlashing", 1);
  }

  }

  if (_me.m_bValidFlag) {
  var t_txt = callMethod("getProperty", tElement, symbol("sprite")).member.text;
  if (_me.m_bAllowEmpty) {
  if (lingoBinary("eq", t_txt.length, 0)) {
  return 1;
  }

  if (callMethod("isEmpty", _me, t_txt)) {
  return 0;
  }

  return 1;
  }

  return 0;
  }

  }

}

