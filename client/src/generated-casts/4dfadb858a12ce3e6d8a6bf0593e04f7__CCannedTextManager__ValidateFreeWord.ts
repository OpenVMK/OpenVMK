// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / ValidateFreeWord

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ValidateFreeWord(_me: LingoMe, a_sWord: LingoValue, a_ar_symOptions: LingoValue, o_ar_matches: LingoValue) {
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

  var tOut = 0;
  if (lingoBinary("and", tAllowFreeWords, lingoBinary("neq", callMethod("getPos", meProp(_me, "m_ar_freeWords"), a_sWord), 0))) {
  if ((lingoTruthy(callNamed("voidp", o_ar_matches)) ? 0 : 1)) {
  callMethod("append", o_ar_matches, symbol("room"))
  }

  tOut = 1;
  }

  if (tAllowFriendNames) {
  var tForm = new LingoPropList([]);
  callMethod("MatchFriendWithForm", _me, a_sWord, meProp(_me, "m_ar_friendWords"), tForm)
  if (tForm.friend) {
  if ((lingoTruthy(callNamed("voidp", o_ar_matches)) ? 0 : 1)) {
  callMethod("append", o_ar_matches, symbol("friend"))
  callMethod("append", o_ar_matches, tForm.form)
  }

  tOut = 1;
  }

  }

  if (lingoBinary("and", tAllowOwnName, lingoBinary("neq", callMethod("getPos", meProp(_me, "m_ar_ownWords"), a_sWord), 0))) {
  if ((lingoTruthy(callNamed("voidp", o_ar_matches)) ? 0 : 1)) {
  callMethod("append", o_ar_matches, symbol("ownName"))
  }

  tOut = 1;
  }

  return tOut;
}

