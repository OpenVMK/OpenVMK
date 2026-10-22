// 2230483a2e5366aa24e52c1b02d9674c.cct / CMessengerHandler / RequestCompleteFriendlist

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestCompleteFriendlist(_me: LingoMe, t_arg: LingoValue) {
  var t_ar_msgDesc = new LingoList([]);
  var t_ar_Msg = callMethod("createClientCommand", _me, t_arg, t_ar_msgDesc);
  callNamed("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 542, t_ar_Msg)
  if (_me.m_bDebug) {
  callNamed("put", lingoBinary("join", "Messenger<-RequestCompleteFriendlist", t_ar_Msg))
  }

}

