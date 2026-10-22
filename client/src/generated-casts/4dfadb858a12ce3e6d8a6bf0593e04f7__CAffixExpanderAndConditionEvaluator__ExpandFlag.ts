// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CAffixExpanderAndConditionEvaluator / ExpandFlag

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ExpandFlag(_me: LingoMe, i_sBareWord: LingoValue, i_cFlag: LingoValue, o_ar_newWords: LingoValue) {
  var tPrefixRules = callMethod("getaProp", meProp(_me, "m_mp_prefixes"), i_cFlag);
  if ((lingoTruthy(callNamed("voidp", tPrefixRules)) ? 0 : 1)) {
  for (var tRule of tPrefixRules.toArray()) {
  var t_bPreCondApplies = 0;
  var t_sCondition = tRule.condition;
  var t_ar_subStrings = new LingoList([]);
  if (lingoBinary("eq", t_sCondition, ".")) {
  t_bPreCondApplies = 1;
  } else {
  setMeProp(_me, "m_ar_chars", new LingoList([]));
  callMethod("parse", _me, t_sCondition)
  t_bPreCondApplies = callMethod("TestString", _me, callNamed("chars", i_sBareWord, 1, meProp(_me, "m_ar_chars").count));
  }

  if (t_bPreCondApplies) {
  var tWord = i_sBareWord;
  if (lingoBinary("neq", tRule.strip, "")) {
  var tBeginning = callNamed("chars", tWord, 1, tRule.strip.length);
  if ((lingoTruthy(lingoBinary("eq", tBeginning, tRule.strip)) ? 0 : 1)) {
  callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", "Word", tWord), "does not begin with the string that is supposed to be stripped of it"), symbol("ExpandFlag"))
  } else {
  tWord = callNamed("chars", tWord, lingoBinary("add", 1, tRule.strip.length), tWord.length);
  }

  }

  if (lingoBinary("neq", tRule.insert, "")) {
  tWord = tWord + tRule.insert;
  }

  callMethod("append", o_ar_newWords, tWord)
  }

  }

  }

  var tSuffixRules = callMethod("getaProp", meProp(_me, "m_mp_suffixes"), i_cFlag);
  if ((lingoTruthy(callNamed("voidp", tSuffixRules)) ? 0 : 1)) {
  for (var tRule of tSuffixRules.toArray()) {
  var t_bSufCondApplies = 0;
  t_sCondition = tRule.condition;
  if (lingoBinary("eq", t_sCondition, ".")) {
  t_bSufCondApplies = 1;
  } else {
  setMeProp(_me, "m_ar_chars", new LingoList([]));
  callMethod("parse", _me, t_sCondition)
  var t_iLength = i_sBareWord.length;
  t_bSufCondApplies = callMethod("TestString", _me, callNamed("chars", i_sBareWord, lingoBinary("add", lingoBinary("sub", t_iLength, meProp(_me, "m_ar_chars").count), 1), t_iLength));
  }

  if (t_bSufCondApplies) {
  tWord = i_sBareWord;
  var t_sStrip = tRule.strip;
  var t_iStrip = callNamed("length", t_sStrip);
  t_iLength = callNamed("length", tWord);
  if (t_iStrip) {
  var tEnding = callNamed("chars", tWord, lingoBinary("add", lingoBinary("sub", t_iLength, t_iStrip), 1), t_iLength);
  if ((lingoTruthy(lingoBinary("eq", tEnding, t_sStrip)) ? 0 : 1)) {
  callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", "Word", tWord), "does not end in the string that is supposed to be stripped of it"), symbol("ExpandFlag"))
  } else {
  tWord = callNamed("chars", tWord, 1, lingoBinary("sub", t_iLength, t_iStrip));
  }

  }

  if (lingoBinary("neq", tRule.append, "")) {
  tWord = tWord + tRule.append;
  }

  callMethod("append", o_ar_newWords, tWord)
  }

  }

  }

}

