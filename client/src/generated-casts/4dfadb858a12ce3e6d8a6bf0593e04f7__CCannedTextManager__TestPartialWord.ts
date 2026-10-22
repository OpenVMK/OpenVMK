// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / TestPartialWord

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestPartialWord(_me: LingoMe, a_sWord: LingoValue, a_ar_symOptions: LingoValue, o_ar_matches: LingoValue) {
  var tAllowFriendNames = 1;
  var tAllowOwnName = 1;
  var tAllowFreeWords = 1;
  if ((lingoTruthy(callNamed("voidp", a_ar_symOptions)) ? 0 : 1)) {
  if (lingoBinary("neq", callMethod("getPos", a_ar_symOptions, symbol("DisAllowFriendNames")), 0)) {
  tAllowFriendNames = 0;
  }

  if (lingoBinary("neq", callMethod("getPos", a_ar_symOptions, symbol("DisAllowOwnName")), 0)) {
  tAllowOwnName = 0;
  }

  if (lingoBinary("neq", callMethod("getPos", a_ar_symOptions, symbol("DisAllowFreeWords")), 0)) {
  tAllowFreeWords = 0;
  }

  }

  var tDictMatch = callMethod("FindWord", callMethod("GetDictionaryWordTree", meProp(_me, "m_dictionary")), callMethod("FirstCharToLower", _me, a_sWord));
  if (tAllowFreeWords) {
  var tFreeMatch = callMethod("FindWord", callMethod("GetFreeWordTree", meProp(_me, "m_dictionary")), callMethod("FirstCharToLower", _me, a_sWord));
  } else {
  tFreeMatch = "";
  }

  if (tAllowFriendNames) {
  var tFriendMatch = callMethod("FindWord", callMethod("GetFriendListWordTree", meProp(_me, "m_dictionary")), callMethod("FirstCharToLower", _me, a_sWord));
  } else {
  tFriendMatch = "";
  }

  if (tAllowOwnName) {
  var tOwnMatch = callMethod("FindWord", callMethod("GetOwnNameWordTree", meProp(_me, "m_dictionary")), callMethod("FirstCharToLower", _me, a_sWord));
  } else {
  tOwnMatch = "";
  }

  if ((lingoTruthy(callNamed("voidp", o_ar_matches)) ? 0 : 1)) {
  o_ar_matches = new LingoList([]);
  if (lingoBinary("eq", tFreeMatch, a_sWord)) {
  callMethod("append", o_ar_matches, symbol("room"))
  }

  if (lingoBinary("eq", tFriendMatch, a_sWord)) {
  callMethod("append", o_ar_matches, symbol("friend"))
  }

  if (lingoBinary("eq", tOwnMatch, a_sWord)) {
  callMethod("append", o_ar_matches, symbol("ownName"))
  }

  }

  var tLongestMatch = 0;
  if (lingoBinary("gt", tFreeMatch.length, tLongestMatch)) {
  tLongestMatch = tFreeMatch.length;
  }

  if (lingoBinary("gt", tFriendMatch.length, tLongestMatch)) {
  tFreeMatch = tFriendMatch;
  tLongestMatch = tFriendMatch.length;
  }

  if (lingoBinary("gt", tOwnMatch.length, tLongestMatch)) {
  tFreeMatch = tOwnMatch;
  tLongestMatch = tOwnMatch.length;
  }

  return (lingoTruthy(lingoBinary("and", lingoBinary("lt", tDictMatch.length, a_sWord.length), lingoBinary("lt", tFreeMatch.length, a_sWord.length))) ? 0 : 1);
}

