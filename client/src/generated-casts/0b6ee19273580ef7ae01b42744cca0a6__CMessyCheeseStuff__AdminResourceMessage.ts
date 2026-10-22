// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessyCheeseStuff / AdminResourceMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AdminResourceMessage(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("msgid"), symbol("int"), symbol("flash"), symbol("str"), symbol("date"), symbol("str"), symbol("content"), symbol("str"), symbol("url"), symbol("str"), symbol("Caption")]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  if (meProp(_me, "m_bDebug")) {
  callNamed("put", lingoBinary("joinPad", "Messenger->AdminResourceMessage", t_ar_out))
  }

  callMethod("AdminResourceMessage", callMethod("getComponent", _me), t_ar_out)
}

