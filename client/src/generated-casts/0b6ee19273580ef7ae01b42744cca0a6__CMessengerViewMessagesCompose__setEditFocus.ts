// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesCompose / setEditFocus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setEditFocus(_me: LingoMe) {
  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput");
  if (callNamed("objectp", tElem)) {
  callMethod("setFocus", tElem, 1)
  }

}

