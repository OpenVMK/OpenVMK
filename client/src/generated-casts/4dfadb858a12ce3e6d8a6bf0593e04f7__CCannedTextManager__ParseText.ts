// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / ParseText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseText(_me: LingoMe, a_sText: LingoValue, a_ar_symOptions: LingoValue) {
  if (meProp(_me, "m_bGotRaw")) {
  if ((lingoTruthy(meProp(_me, "m_bDecrunched")) ? 0 : 1)) {
  callNamed("createWindow", "Decrypting_Dictionary", "vmk_basic.window")
  callMethod("merge", callNamed("getWindow", "Decrypting_Dictionary"), "please_wait.window")
  callMethod("center", callNamed("getWindow", "Decrypting_Dictionary"))
  callMethod("show", callNamed("getWindow", "Decrypting_Dictionary"))
  callNamed("updateStage")
  callMethod("DecrunchABunchOfWords", _me, lingoBinary("add", lingoBinary("sub", meProp(_me, "m_ar_rawList").count, meProp(_me, "m_iExpandOffset")), 1))
  callNamed("removeWindow", "Decrypting_Dictionary")
  callNamed("updateStage")
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_dictionary"))) ? 0 : 1)) {
  var tItems = callMethod("SpliceLine", _me, a_sText);
  var t_ar_mp_words = new LingoList([]);
  var t_mp_iWordIndexCount = new LingoPropList([]);
  var tRepeatLimit = callNamed("getVariableValue", "dictionary_word_repeat_limit", 2);
  var tCountLimit = callNamed("getVariableValue", "dictionary_word_total_count_limit", 3);
  for (var t_cCurrWord of tItems.toArray()) {
  var tCapitalized = callMethod("FirstCharIsCapital", _me, t_cCurrWord);
  var tLowerCaseWord = callMethod("FirstCharToLower", _me, t_cCurrWord);
  if (callMethod("isLinefeed", _me, t_cCurrWord)) {
  callMethod("append", t_ar_mp_words, new LingoPropList([symbol("word"), t_cCurrWord, symbol("valid"), 1, symbol("source"), symbol("linefeed"), symbol("code"), -float(1001), symbol("capitalized"), 0]))
  continue;
  }

  var tWordListIndex = callMethod("getIndexOfWord", callMethod("GetWordListObj", meProp(_me, "m_dictionary")), tLowerCaseWord);
  var tCount = callMethod("getaProp", t_mp_iWordIndexCount, t_cCurrWord);
  if (callNamed("voidp", tCount)) {
  callMethod("setaProp", t_mp_iWordIndexCount, t_cCurrWord, 1)
  tCount = 1;
  } else {
  tCount = lingoBinary("add", tCount, 1);
  callMethod("setaProp", t_mp_iWordIndexCount, t_cCurrWord, tCount)
  }

  var tValid = lingoBinary("lte", tCount, tCountLimit);
  if (tValid) {
  if (lingoBinary("gte", t_ar_mp_words.count, lingoBinary("sub", tRepeatLimit, 1))) {
  tCount = 0;
  for (var i = t_ar_mp_words.count; i >= 1; --i) {
  if (lingoBinary("neq", t_ar_mp_words[i].word, t_cCurrWord)) {
  break;
  continue;
  }

  tCount = lingoBinary("add", tCount, 1);
  }

  if (lingoBinary("gt", tCount, tRepeatLimit)) {
  tValid = 0;
  }

  }

  }

  if (lingoBinary("eq", t_cCurrWord, " ")) {
  tValid = 1;
  }

  var t_ar_matchtable = new LingoList([]);
  if (lingoBinary("neq", tWordListIndex, 0)) {
  callMethod("append", t_ar_mp_words, new LingoPropList([symbol("word"), tLowerCaseWord, symbol("valid"), tValid, symbol("source"), symbol("dictionary"), symbol("code"), tWordListIndex, symbol("capitalized"), tCapitalized]))
  continue;
  }

  if (callMethod("ValidateFreeWord", _me, t_cCurrWord, a_ar_symOptions, t_ar_matchtable)) {
  if (lingoBinary("neq", callNamed("getPos", t_ar_matchtable, symbol("ownName")), 0)) {
  callMethod("append", t_ar_mp_words, new LingoPropList([symbol("word"), t_cCurrWord, symbol("valid"), tValid, symbol("source"), symbol("ownName"), symbol("code"), undefined, symbol("capitalized"), tCapitalized]))
  } else {
  if (lingoBinary("neq", callNamed("getPos", t_ar_matchtable, symbol("friend")), 0)) {
  var tFriend = callMethod("getFriend", callMethod("getComponent", callNamed("getThread", "Messenger")), t_cCurrWord);
  if ((lingoTruthy(callNamed("voidp", tFriend)) ? 0 : 1)) {
  var tEntry = new LingoPropList([symbol("word"), t_cCurrWord, symbol("valid"), tValid, symbol("source"), symbol("friend"), symbol("code"), tFriend.id, symbol("capitalized"), tCapitalized, symbol("form"), symbol("nominative")]);
  if (lingoBinary("neq", callMethod("getPos", t_ar_matchtable, symbol("plural")), 0)) {
  callMethod("setaProp", tEntry, symbol("form"), symbol("plural"))
  } else {
  if (lingoBinary("neq", callMethod("getPos", t_ar_matchtable, symbol("genitive")), 0)) {
  callMethod("setaProp", tEntry, symbol("form"), symbol("genitive"))
  }

  }

  callMethod("append", t_ar_mp_words, tEntry)
  } else {
  callNamed("error", _me, "Friend was not actually on friend list!!", symbol("ParseText"))
  }

  } else {
  if (lingoBinary("neq", callNamed("getPos", t_ar_matchtable, symbol("room")), 0)) {
  callMethod("append", t_ar_mp_words, new LingoPropList([symbol("word"), t_cCurrWord, symbol("valid"), tValid, symbol("source"), symbol("room"), symbol("code"), undefined, symbol("capitalized"), tCapitalized]))
  }

  }

  }

  continue;
  }

  callMethod("append", t_ar_mp_words, new LingoPropList([symbol("word"), t_cCurrWord, symbol("valid"), 0, symbol("source"), symbol("ownName"), symbol("code"), undefined, symbol("capitalized"), tCapitalized]))
  }

  return t_ar_mp_words;
  }

  } else {
  callNamed("error", _me, "Dictionary has not loaded correctly!", symbol("ParseText"))
  }

  return new LingoList([]);
}

