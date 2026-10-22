// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / removeMessagesByFriend

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeMessagesByFriend(_me: LingoMe, a_iUserID: LingoValue) {
  var t_ar_found = new LingoList([]);
  for (var t_rMessage of meProp(_me, "m_ar_inbox").toArray()) {
  if (lingoBinary("eq", t_rMessage.senderID, a_iUserID)) {
  callMethod("MarkReadInstantMessage", callMethod("getHandler", _me), new LingoList([t_rMessage.msgid]))
  callMethod("append", t_ar_found, t_rMessage)
  }

  }

  for (var t_rDelete of t_ar_found.toArray()) {
  var i = callMethod("getOne", meProp(_me, "m_ar_inbox"), t_rDelete);
  if (lingoBinary("gt", i, 0)) {
  callMethod("deleteAt", meProp(_me, "m_ar_inbox"), i)
  }

  }

}

