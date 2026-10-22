// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogOK"))) {
  var t_iValue = callMethod("getValue", meProp(_me, "m_rRadioButton"));
  var t_iAmount = meProp(_me, "m_iTicketAmout");
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "CreateRoomTicket", new LingoPropList([symbol("int"), t_iValue, symbol("int"), t_iAmount]))
  }

}

