// 2230483a2e5366aa24e52c1b02d9674c.cct / CMessengerHandler / AcceptFriendRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AcceptFriendRequest(_me: LingoMe, t_arg: LingoValue) {
  var t_ar_msgDesc = callNamed("propList", symbol("int"), symbol("user_id"));
  var t_ar_Msg = callMethod("createClientCommand", _me, t_arg, t_ar_msgDesc);
  callNamed("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 546, t_ar_Msg)
  if (_me.m_bDebug) {
  callNamed("put", lingoBinary("join", "Messenger<-AcceptFriendRequest", t_ar_Msg))
  }

}

