// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / ReceivedChatMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ReceivedChatMessage(_me: LingoMe, _this: LingoValue, a_sChatMessage: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "tra.messages");
  if (lingoBinary("neq", t_rElem, 0)) {
  var t_sMessages = callMethod("getText", t_rElem);
  var t_sMsg = lingoBinary("join", lingoBinary("join", lingoBinary("join", a_sChatMessage.name, ": "), a_sChatMessage.message), "\r");
  callMethod("setText", t_rElem, lingoBinary("join", t_sMessages, t_sMsg))
  callMethod("updateChatScrollbar", _this, t_rElem.pTextMem.rect.height)
  }

  }

}

