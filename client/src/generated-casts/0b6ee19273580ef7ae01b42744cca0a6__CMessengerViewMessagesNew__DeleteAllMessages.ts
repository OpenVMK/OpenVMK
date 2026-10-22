// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesNew / DeleteAllMessages

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DeleteAllMessages(_me: LingoMe) {
  var t_iCount = meProp(_me, "m_ar_inbox").count;
  if (lingoBinary("gt", t_iCount, 0)) {
  for (var i = 1; i <= t_iCount; ++i) {
  callMethod("deleteMessage", callMethod("getComponent", _me))
  }

  callMethod("changeView", callMethod("getInterface", _me), "messagesnone")
  }

}

