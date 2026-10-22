// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesCompose / HandleKeyPressed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleKeyPressed(_me: LingoMe, _this: LingoValue, a_iKey: LingoValue) {
  var t_rField = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput").pMember;
  if (t_rField.editable) {
  if (callNamed("objectp", meProp(_me, "m_pComposeMessage"))) {
  switch (a_iKey) {
case "\b":
  var t_sText = t_rField.text;
  t_sText = deleteStringChunk(t_sText, "char", -30000, 0);
  setThePropOf(t_rField, "text", t_sText);
  callMethod("updateContent", meProp(_me, "m_pComposeMessage"))
  break;
case 123:
  callMethod("updateContent", meProp(_me, "m_pComposeMessage"))
  break;
case 124:
  callMethod("updateContent", meProp(_me, "m_pComposeMessage"))
  break;
case 125:
  callMethod("updateContent", meProp(_me, "m_pComposeMessage"))
  break;
case 126:
  callMethod("updateContent", meProp(_me, "m_pComposeMessage"))
  break;
  }

  }

  }

}

