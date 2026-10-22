// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / createRadioButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createRadioButton(_me: LingoMe) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rRadioButton"))) ? 0 : 1)) {
  setMeProp(_me, "m_rRadioButton", callNamed("createObject", callNamed("getUniqueID"), "CQuestRadioButton"));
  var t_ar_elements = new LingoList([]);
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "ticketpin.expiry1", symbol("description"), "", symbol("value"), 1]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "ticketpin.expiry2", symbol("description"), "", symbol("value"), 2]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "ticketpin.expiry3", symbol("description"), "", symbol("value"), 3]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "ticketpin.expiry4", symbol("description"), "", symbol("value"), 4]))
  callMethod("addElements", meProp(_me, "m_rRadioButton"), t_ar_elements)
  }

  callMethod("setParentWindow", meProp(_me, "m_rRadioButton"), meProp(_me, "m_rWindow"))
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), "ticketpin.expiry1")
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
}

