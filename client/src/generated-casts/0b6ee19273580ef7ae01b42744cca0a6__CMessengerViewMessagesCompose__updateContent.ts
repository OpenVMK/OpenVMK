// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesCompose / updateContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateContent(_me: LingoMe) {
  setMeProp(_me, "m_rRecipient", callMethod("getRecipient", callMethod("getComponent", _me)));
  if (callNamed("objectp", meProp(_me, "m_rRecipient"))) {
  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.recipient");
  if (callNamed("objectp", tElem)) {
  callMethod("setText", tElem, meProp(_me, "m_rRecipient").buddyname)
  }

  tElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput");
  if (callNamed("objectp", tElem)) {
  callMethod("setMaxChars", tElem, 0)
  }

  callNamed("createTimeout", callNamed("getUniqueID"), 500, symbol("setEditFocus"), callMethod("getID", _me), undefined, 1)
  } else {
  callMethod("changeView", callMethod("getInterface", _me), "friendlist")
  }

}

