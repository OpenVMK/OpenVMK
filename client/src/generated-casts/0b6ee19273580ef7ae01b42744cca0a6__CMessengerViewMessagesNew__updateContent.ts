// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesNew / updateContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateContent(_me: LingoMe) {
  setMeProp(_me, "m_ar_inbox", callMethod("GetInbox", callMethod("getComponent", _me)));
  if (lingoBinary("gt", meProp(_me, "m_ar_inbox").count, 0)) {
  setMeProp(_me, "m_rCurrentMessage", meProp(_me, "m_ar_inbox")[1]);
  }

  if (callNamed("objectp", meProp(_me, "m_rCurrentMessage"))) {
  callMethod("showCurrentMessage", _me)
  } else {
  callMethod("changeView", callMethod("getInterface", _me), "messagesnone")
  return 0;
  }

  if (lingoBinary("gt", meProp(_me, "m_ar_inbox").count, 1)) {
  var t_txt = callNamed("replaceChunks", callNamed("getText", "mes.messages.newamount.many"), "%messageCount%", meProp(_me, "m_ar_inbox").count);
  } else {
  t_txt = callNamed("getText", "mes.messages.newamount.one");
  }

  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.newamount");
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, t_txt)
  }

}

