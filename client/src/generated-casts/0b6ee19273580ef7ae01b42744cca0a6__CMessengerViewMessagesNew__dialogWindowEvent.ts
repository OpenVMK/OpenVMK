// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesNew / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  switch (t_dialogName) {
case "mes.report.dialog":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("ReportMessageAsOffensive", callMethod("getHandler", _me), new LingoList([meProp(_me, "m_rCurrentMessage").msgid]))
  if (callNamed("objectp", callNamed("getThread", "Help"))) {
  var t_sPlayerName = callMethod("get", callNamed("getObject", symbol("session")), "name");
  callMethod("callForHelp", callMethod("getHandler", callNamed("getThread", "Help")), 3, meProp(_me, "m_rCurrentMessage").content, meProp(_me, "m_sSender"))
  }

  callMethod("setButtonState", _me, "mes.report.button", 0)
  break;
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

