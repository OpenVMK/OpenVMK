// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / EventProcTickets

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProcTickets(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, a_vParam: LingoValue) {
  var tWndObj = callNamed("getWindow", "RoomTicketWnd");
  if (callNamed("objectp", tWndObj)) {
  switch (tElemID) {
case "ticketpins.sell.button":
  callMethod("send", callNamed("getConnection", "VMK"), "SellItemRequest", new LingoPropList([symbol("int"), callMethod("GetSelected", _me).ref]))
  break;
case "close":
case "mes.accept.button":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sWndName"))
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_mp_TicketInfo", new LingoPropList([]));
  break;
case "ticketpin.expiry1":
case "ticketpin.expiry2":
case "ticketpin.expiry3":
case "ticketpin.expiry4":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), tElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "ticketpins.buy.button":
  callMethod("BuyTickets", _me)
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("executeMessage", symbol("open_help_page"), "help.tickets", 1)
  break;
case "ticketpins.list":
  callMethod("ShowItemInfo", _me, a_vParam)
  break;
case "tickets.amount.up":
  callMethod("ChangeTicketAmount", _me, 1)
  break;
case "tickets.amount.down":
  callMethod("ChangeTicketAmount", _me, -float(1))
  break;
  break;
  break;
  break;
  break;
  }

  }

}

