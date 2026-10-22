// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rGridRenderer"))) {
  var t_iSlot = callMethod("GetSelected", meProp(_me, "m_rGridRenderer"));
  if (lingoBinary("and", lingoBinary("gt", t_iSlot, 0), lingoBinary("lte", t_iSlot, meProp(_me, "m_mp_Tickets").count))) {
  return meProp(_me, "m_mp_Tickets")[t_iSlot];
  }

  }

  return new LingoPropList([symbol("ref"), -float(1), symbol("code"), -float(1), symbol("param"), -float(1), symbol("state"), symbol("invalid")]);
}

