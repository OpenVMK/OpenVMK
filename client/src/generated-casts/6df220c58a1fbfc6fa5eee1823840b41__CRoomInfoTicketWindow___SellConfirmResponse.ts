// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / _SellConfirmResponse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SellConfirmResponse(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_mp_iCode_kCategory = new LingoPropList([1, symbol("items"), 2, symbol("clothes"), 3, symbol("posters"), 4, symbol("pins")]);
  var t_bFromHK = callMethod("GetIntFrom", a_rMsg.connection);
  var t_bShowAlert = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iPrc = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iItemCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iTyp = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  for (var t_rTicket of meProp(_me, "m_mp_Tickets").toArray()) {
  if (lingoBinary("eq", t_rTicket.ref, t_iRef)) {
  if (lingoBinary("lt", t_rTicket.items, 1)) {
  callMethod("deleteProp", meProp(_me, "m_mp_Tickets"), t_iRef)
  }

  break;
  }

  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("ShowThumbs", _this, meProp(_me, "m_mp_Tickets"))
  }

}

