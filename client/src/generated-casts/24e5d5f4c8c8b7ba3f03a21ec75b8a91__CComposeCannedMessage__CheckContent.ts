// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CComposeCannedMessage / CheckContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CheckContent(_me: LingoMe, i_KeyCode: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  var tElement = callMethod("getElement", tWndObj, meProp(_me, "m_sClientElement"));
  if (lingoBinary("neq", tElement, 0)) {
  if ((lingoTruthy(meProp(_me, "m_bAllowEmpty")) ? 0 : 1)) {
  if (lingoBinary("eq", callMethod("getProperty", tElement, symbol("sprite")).member.text.length, 0)) {
  return 0;
  }

  }

  setMeProp(_me, "m_ar_cWords", new LingoList([]));
  setMeProp(_me, "m_ar_cWords", callNamed("ParseCannedField", tElement, meProp(_me, "m_ar_symParseOptions")));
  setMeProp(_me, "m_bValidFlag", 0);
  var tInvalids = 0;
  for (var tWord of meProp(_me, "m_ar_cWords").toArray()) {
  if ((lingoTruthy(tWord.valid) ? 0 : 1)) {
  tInvalids = 1;
  break;
  }

  }

  for (var i = 1; i <= meProp(_me, "m_ar_cWords").count; ++i) {
  if (lingoBinary("gt", i, 1)) {
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_ar_cWords")[i].word, " "), lingoBinary("eq", meProp(_me, "m_ar_cWords")[lingoBinary("sub", i, 1)].word, " "))) {
  return 0;
  }

  }

  }

  if ((lingoTruthy(tInvalids) ? 0 : 1)) {
  setMeProp(_me, "m_bValidFlag", 1);
  } else {
  if (meProp(_me, "m_bFlashing")) {
  if (lingoBinary("eq", theProperty("keyCode"), 36)) {
  if (meProp(_me, "m_bNotified")) {
  if (meProp(_me, "m_bAllowErrors")) {
  setMeProp(_me, "m_bValidFlag", 1);
  }

  setMeProp(_me, "m_bNotified", 0);
  } else {
  setMeProp(_me, "m_bNotified", 1);
  }

  }

  } else {
  setMeProp(_me, "m_bFlashing", 1);
  }

  }

  if (meProp(_me, "m_bValidFlag")) {
  var t_txt = callMethod("getProperty", tElement, symbol("sprite")).member.text;
  if (meProp(_me, "m_bAllowEmpty")) {
  if (lingoBinary("eq", t_txt.length, 0)) {
  return 1;
  }

  }

  if (callMethod("isEmpty", _me, t_txt)) {
  return 0;
  }

  return 1;
  }

  }

  return 0;
}

