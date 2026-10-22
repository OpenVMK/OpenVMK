// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CAffixExpanderAndConditionEvaluator / SliceWord

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SliceWord(_me: LingoMe, i_sDictionaryWord: LingoValue, o_ar_cFlags: LingoValue) {
  var t_sBareWord = i_sDictionaryWord;
  var tSlicePoint = callNamed("offset", "/", i_sDictionaryWord);
  if (lingoBinary("gt", tSlicePoint, 0)) {
  t_sBareWord = callNamed("chars", i_sDictionaryWord, 1, lingoBinary("sub", tSlicePoint, 1));
  var t_iLen = i_sDictionaryWord.length;
  for (var i = lingoBinary("add", tSlicePoint, 1); i <= t_iLen; ++i) {
  callMethod("append", o_ar_cFlags, callNamed("chars", i_sDictionaryWord, i, i))
  }

  }

  return t_sBareWord;
}

