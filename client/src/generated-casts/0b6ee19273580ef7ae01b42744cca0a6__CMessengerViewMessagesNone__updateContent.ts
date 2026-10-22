// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesNone / updateContent

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
  callMethod("changeView", callMethod("getInterface", _me), "messagesnew")
  } else {
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.newamount");
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, callNamed("getText", "mes.messages.newamount"))
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.info");
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, callNamed("getText", "mes.messages.info"))
  }

  }

}

