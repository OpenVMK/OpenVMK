// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / BuyTickets

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function BuyTickets(_me: LingoMe) {
  var t_iValue = callMethod("getValue", meProp(_me, "m_rRadioButton"));
  var t_iAmount = meProp(_me, "m_iTicketAmout");
  var t_iPrice = callNamed("integer", callNamed("getText", "room.ticket.price", 10));
  var t_sMsg = lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", callNamed("getText", "tickets.confirm.buy"), "\r"), t_iAmount), callNamed("getText", "room.tickets")), lingoBinary("mul", t_iPrice, meProp(_me, "m_iTicketAmout"))), callNamed("getText", "room.tickets.credits"));
  var t_wnd = callNamed("createDialogWindow", callMethod("getID", _me), "BuyTickets", 2, 1);
  callMethod("show", t_wnd)
  var t_sDialogHd = callNamed("getText", "tickets.buy.hd");
  var t_sOk = callNamed("getText", "tickets.buy.ok");
  var t_sCancel = callNamed("getText", "tickets.buy.cancel");
  callMethod("setText", t_wnd, t_sMsg, t_sDialogHd, t_sCancel, t_sOk)
}

