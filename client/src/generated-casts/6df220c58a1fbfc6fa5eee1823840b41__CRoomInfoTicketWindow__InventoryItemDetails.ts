// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / InventoryItemDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InventoryItemDetails(_me: LingoMe) {
  var t_mp_sGroup_rItem = callMethod("GetItemListByCategory", callMethod("GetInventory", callMethod("getComponent", callNamed("getThread", "inventory")), 1), symbol("pins"));
  var t_mp_sGroup_rDetail = callMethod("GetItemDetailsByCategory", callMethod("GetInventory", callMethod("getComponent", callNamed("getThread", "inventory")), 1), symbol("pins"));
  var t_mp_iRef_rTicket = new LingoPropList([]);
  for (var i = 1; i <= t_mp_sGroup_rDetail.count; ++i) {
  var t_rDetail = t_mp_sGroup_rDetail[i];
  if ((lingoTruthy(callNamed("voidp", t_rDetail["goodfor"])) ? 0 : 1)) {
  var t_sGroup = callMethod("getPropAt", t_mp_sGroup_rDetail, i);
  var t_rGroup = t_mp_sGroup_rItem[t_sGroup];
  var t_iRef = t_rGroup.ref;
  callMethod("addProp", t_mp_iRef_rTicket, t_iRef, t_rGroup)
  }

  }

  setMeProp(_me, "m_mp_Tickets", t_mp_iRef_rTicket);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (callNamed("listp", meProp(_me, "m_mp_Tickets"))) {
  callMethod("ShowThumbs", _me, meProp(_me, "m_mp_Tickets"))
  }

  }

}

