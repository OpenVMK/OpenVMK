// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessyCheeseStuff / InstantmessageReceived

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InstantmessageReceived(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("msgid"), symbol("int"), symbol("senderID"), symbol("str"), symbol("date"), symbol("canned"), symbol("content"), symbol("str"), symbol("avatarName")]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  if (meProp(_me, "m_bDebug")) {
  callNamed("put", lingoBinary("joinPad", "Messenger->InstantmessageReceived", t_ar_out))
  }

  callMethod("InstantmessageReceived", callMethod("getComponent", _me), t_ar_out)
}

