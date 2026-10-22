// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / deleteMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deleteMessage(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "m_ar_inbox").count, 0)) {
  callMethod("MarkReadInstantMessage", callMethod("getHandler", _me), new LingoList([meProp(_me, "m_ar_inbox")[1].msgid]))
  callMethod("deleteAt", meProp(_me, "m_ar_inbox"), 1)
  return 1;
  } else {
  return 0;
  }

}

