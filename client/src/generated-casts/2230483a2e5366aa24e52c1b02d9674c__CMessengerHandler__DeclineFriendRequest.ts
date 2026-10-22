// 2230483a2e5366aa24e52c1b02d9674c.cct / CMessengerHandler / DeclineFriendRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DeclineFriendRequest(_me: LingoMe, t_arg: LingoValue) {
  var t_ar_msgDesc = callNamed("propList", symbol("int"), symbol("user_id"));
  var t_ar_Msg = callMethod("createClientCommand", _me, t_arg, t_ar_msgDesc);
  callNamed("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 547, t_ar_Msg)
  if (_me.m_bDebug) {
  callNamed("put", lingoBinary("join", "Messenger<-DeclineFriendRequest", t_ar_Msg))
  }

}

