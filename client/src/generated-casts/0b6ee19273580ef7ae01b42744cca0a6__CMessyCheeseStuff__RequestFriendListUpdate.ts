// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessyCheeseStuff / RequestFriendListUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestFriendListUpdate(_me: LingoMe, t_arg: LingoValue) {
  var t_ar_msgDesc = new LingoList([]);
  var t_ar_Msg = callMethod("createClientCommand", _me, t_arg, t_ar_msgDesc);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 541, t_ar_Msg)
  if (meProp(_me, "m_bDebug")) {
  callNamed("put", lingoBinary("joinPad", "Messenger<-RequestFriendListUpdate", t_ar_Msg))
  }

}

