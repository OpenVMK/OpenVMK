// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / FriendlistUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FriendlistUpdate(_me: LingoMe, a_ar_friends: LingoValue) {
  for (var t_ar_friend of a_ar_friends.toArray()) {
  var t_ar_search = new LingoPropList([symbol("index"), -float(1), symbol("entry"), undefined]);
  if (callMethod("findAddressbookEntry", _me, t_ar_friend.userID, t_ar_search)) {
  var t_ar_entry = t_ar_search.entry;
  for (var i = 1; i <= t_ar_friend.count; ++i) {
  var t_kProp = callMethod("getPropAt", t_ar_friend, i);
  var t_kValue = t_ar_friend[i];
  t_ar_entry[t_kProp] = t_kValue;
  }

  callMethod("updateAddressbookEntry", callMethod("getInterface", _me), t_ar_entry)
  continue;
  }

  callMethod("AddFriend", _me, t_ar_friend)
  }

  callMethod("updateCurrentView", callMethod("getInterface", _me))
  callMethod("updateCannedFriendList", _me)
}

