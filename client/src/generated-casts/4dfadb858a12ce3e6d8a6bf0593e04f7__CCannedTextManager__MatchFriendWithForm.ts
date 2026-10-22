// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / MatchFriendWithForm

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MatchFriendWithForm(_me: LingoMe, a_sWord: LingoValue, a_ar_words: LingoValue, o_mp_flags: LingoValue) {
  var tPos = callMethod("getPos", a_ar_words, a_sWord);
  if (lingoBinary("neq", tPos, 0)) {
  var tFriend = callMethod("getFriend", callMethod("getComponent", callNamed("getThread", "Messenger")), a_sWord);
  if (callNamed("voidp", tFriend)) {
  callMethod("setaProp", o_mp_flags, symbol("friend"), 0)
  return;
  }

  var tFriendPos = callMethod("getPos", a_ar_words, tFriend.name);
  var tOffset = lingoBinary("sub", tPos, tFriendPos);
  switch (tOffset) {
case 0:
case 3:
case 6:
  callMethod("setaProp", o_mp_flags, symbol("form"), symbol("nominative"))
  break;
case 1:
case 4:
case 7:
case -float(2):
case -float(1):
  callMethod("setaProp", o_mp_flags, symbol("form"), symbol("plural"))
  break;
case 2:
case 5:
case 8:
case -float(6):
case -float(5):
case -float(4):
case -float(3):
  callMethod("setaProp", o_mp_flags, symbol("form"), symbol("genitive"))
  break;
  default:
  callMethod("setaProp", o_mp_flags, symbol("form"), symbol("nominative"))
  callNamed("error", _me, lingoBinary("joinPad", "Invalid offset in friend name list! Offset: ", tOffset), symbol("MatchFriendWithForm"))
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  callMethod("setaProp", o_mp_flags, symbol("friend"), 1)
  } else {
  callMethod("setaProp", o_mp_flags, symbol("friend"), 0)
  }

}

