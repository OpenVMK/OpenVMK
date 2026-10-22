// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CAffixExpanderAndConditionEvaluator / SuffixConditionApplies

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SuffixConditionApplies(_me: LingoMe, i_sWord: LingoValue, i_sCondition: LingoValue) {
  if (lingoBinary("eq", i_sCondition, ".")) {
  return 1;
  } else {
  setMeProp(_me, "m_ar_chars", new LingoList([]));
  callMethod("parse", _me, i_sCondition)
  var t_iLength = i_sWord.length;
  return callMethod("TestString", _me, callNamed("chars", i_sWord, lingoBinary("add", lingoBinary("sub", t_iLength, meProp(_me, "m_ar_chars").count), 1), t_iLength));
  }

  return 0;
}

