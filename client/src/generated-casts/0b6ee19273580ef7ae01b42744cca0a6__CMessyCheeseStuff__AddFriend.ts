// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessyCheeseStuff / AddFriend

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddFriend(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("userID"), symbol("str"), symbol("buddyname"), symbol("canned"), symbol("slogan"), symbol("condition"), symbol("online"), symbol("Array"), new LingoPropList([symbol("str"), symbol("usersRoom"), symbol("int"), symbol("locationAccessible")]), symbol("Array"), new LingoPropList([symbol("str"), symbol("lastAccessTime")])]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  if (meProp(_me, "m_bDebug")) {
  callNamed("put", lingoBinary("joinPad", "Messenger->AddFriend", t_ar_out))
  }

  callMethod("AddFriend", callMethod("getComponent", _me), t_ar_out)
}

