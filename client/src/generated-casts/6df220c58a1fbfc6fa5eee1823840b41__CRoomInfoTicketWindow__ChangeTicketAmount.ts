// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / ChangeTicketAmount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangeTicketAmount(_me: LingoMe, a_iAmount: LingoValue) {
  setMeProp(_me, "m_iTicketAmout", lingoBinary("add", meProp(_me, "m_iTicketAmout"), a_iAmount));
  if (lingoBinary("lt", meProp(_me, "m_iTicketAmout"), 1)) {
  setMeProp(_me, "m_iTicketAmout", 1);
  }

  if (lingoBinary("gt", meProp(_me, "m_iTicketAmout"), 10)) {
  setMeProp(_me, "m_iTicketAmout", 10);
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_iPrice = callNamed("integer", callNamed("getText", "room.ticket.price", 10));
  var t_sTxt = lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", meProp(_me, "m_iTicketAmout"), callNamed("getText", "room.tickets")), lingoBinary("mul", t_iPrice, meProp(_me, "m_iTicketAmout"))), callNamed("getText", "room.tickets.credits"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "tickets.amount"), t_sTxt)
  }

}

