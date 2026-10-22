// 2230483a2e5366aa24e52c1b02d9674c.cct / CMessengerHandler / friendlist

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function friendlist(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = callNamed("propList", symbol("int"), symbol("friend_count"), symbol("Array"), callNamed("propList", symbol("int"), symbol("userID"), symbol("str"), symbol("buddyname"), symbol("canned"), symbol("slogan"), symbol("condition"), symbol("online"), symbol("Array"), callNamed("propList", symbol("str"), symbol("usersRoom"), symbol("int"), symbol("locationAccessible")), symbol("Array"), callNamed("propList", symbol("str"), symbol("lastAccessTime"))));
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  if (_me.m_bDebug) {
  callNamed("put", lingoBinary("join", "Messenger->Friendlist", t_ar_out))
  }

  callMethod("friendlist", callMethod("getComponent", _me), t_ar_out.friend_array)
}

