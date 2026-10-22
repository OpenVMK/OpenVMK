// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CAffixExpanderAndConditionEvaluator / TestString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestString(_me: LingoMe, i_sString: LingoValue) {
  var t_iCount = meProp(_me, "m_ar_chars").count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_sTest = callNamed("chars", i_sString, i, i);
  var t_ar_sNoChr = callMethod("getaProp", meProp(_me, "m_ar_chars")[i], symbol("no"));
  if (callNamed("listp", t_ar_sNoChr)) {
  for (var t_sNo of t_ar_sNoChr.toArray()) {
  if (lingoBinary("eq", t_sTest, t_sNo)) {
  return 0;
  }

  }

  }

  var t_ar_sYesChr = callMethod("getaProp", meProp(_me, "m_ar_chars")[i], symbol("yes"));
  var t_bYesMatch = 1;
  if (callNamed("listp", t_ar_sYesChr)) {
  t_bYesMatch = 0;
  for (var t_sYes of t_ar_sYesChr.toArray()) {
  if (lingoBinary("eq", t_sTest, t_sYes)) {
  t_bYesMatch = 1;
  }

  }

  }

  if ((lingoTruthy(t_bYesMatch) ? 0 : 1)) {
  return 0;
  }

  }

  return 1;
}

