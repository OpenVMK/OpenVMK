// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CAffixExpanderAndConditionEvaluator / PrefixConditionApplies

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrefixConditionApplies(_me: LingoMe, i_sWord: LingoValue, i_sCondition: LingoValue) {
  var t_ar_subStrings = new LingoList([]);
  if (lingoBinary("eq", i_sCondition, ".")) {
  return 1;
  } else {
  setMeProp(_me, "m_ar_chars", new LingoList([]));
  callMethod("parse", _me, i_sCondition)
  return callMethod("TestString", _me, callNamed("chars", i_sWord, 1, meProp(_me, "m_ar_chars").count));
  }

  return 0;
}

