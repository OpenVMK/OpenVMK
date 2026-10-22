// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CAffixExpanderAndConditionEvaluator / ExpandListToList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ExpandListToList(_me: LingoMe, a_ar_input: LingoValue, o_ar_output: LingoValue) {
  for (var t_sWord of a_ar_input.toArray()) {
  var t_ar_cFlags = new LingoList([]);
  var t_sBareWord = t_sWord;
  var t_iSlicePoint = callNamed("offset", "/", t_sWord);
  if (lingoBinary("gt", t_iSlicePoint, 0)) {
  t_sBareWord = callNamed("chars", t_sWord, 1, lingoBinary("sub", t_iSlicePoint, 1));
  var t_iLen = t_sWord.length;
  for (var i = lingoBinary("add", t_iSlicePoint, 1); i <= t_iLen; ++i) {
  var tChar = callNamed("chars", t_sWord, i, i);
  if (lingoBinary("gt", callMethod("getPos", meProp(_me, "m_ar_validFlags"), tChar), 0)) {
  callMethod("append", t_ar_cFlags, tChar)
  continue;
  }

  return callNamed("error", _me, "Invalid flag! Dictionary may be corrupt!", symbol("ExpandListToList"));
  }

  }

  callMethod("append", o_ar_output, t_sBareWord)
  for (var tFlag of t_ar_cFlags.toArray()) {
  callMethod("ExpandFlag", _me, t_sBareWord, tFlag, o_ar_output)
  }

  }

  return 1;
}

