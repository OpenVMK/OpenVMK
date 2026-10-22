// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / show

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function show(_me: LingoMe) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rWindow"))) ? 0 : 1)) {
  callNamed("createWindow", meProp(_me, "m_sWndName"), "vmk_create_tickets.window", 0, 0)
  setMeProp(_me, "m_rWindow", callNamed("getWindow", meProp(_me, "m_sWndName")));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _me))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("EventProcTickets"), callMethod("getID", _me), symbol("mouseDown"))
  callMethod("center", meProp(_me, "m_rWindow"))
  callMethod("createRadioButton", _me)
  setMeProp(_me, "m_iTicketAmout", 0);
  callMethod("ChangeTicketAmount", _me, 1)
  var t_mp_DataList = callMethod("GetItemListByCategory", callMethod("GetInventory", callMethod("getComponent", callNamed("getThread", "inventory")), 1), symbol("pins"));
  if (lingoBinary("eq", t_mp_DataList.count, 0)) {
  callMethod("_LoadInventory", callNamed("getThread", "inventory").component)
  }

  callMethod("InventoryItemDetails", _me)
  }

}

