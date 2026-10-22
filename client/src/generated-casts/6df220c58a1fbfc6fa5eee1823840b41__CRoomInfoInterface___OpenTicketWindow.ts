// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / _OpenTicketWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OpenTicketWindow(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_obj_TicketWindow"))) {
  callMethod("show", meProp(_me, "m_obj_TicketWindow"))
  } else {
  setMeProp(_me, "m_obj_TicketWindow", callNamed("createObject", "roomTicket", "CRoomInfoTicketWindow"));
  callMethod("show", meProp(_me, "m_obj_TicketWindow"))
  }

}

