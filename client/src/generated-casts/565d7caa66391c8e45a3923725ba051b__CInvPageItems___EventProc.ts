// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageItems / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  switch (a_sElem) {
case "thumbs.grid.b":
  if ((lingoTruthy(meProp(_me, "m_bLoadingThumbs")) ? 0 : 1)) {
  callMethod("MouseSelection", meProp(_me, "m_rGridRenderer"), a_vParam)
  callMethod("checkTeleporterSelection", _this)
  callMethod("ShowSelected", _this)
  }

  break;
case "inv.sell.button":
  callMethod("send", callNamed("getConnection", "VMK"), "SellItemRequest", new LingoPropList([symbol("int"), callMethod("GetSelected", _this).ref]))
  break;
case "inv.place.button":
  if (lingoBinary("gt", meProp(_me, "m_iSelected"), -float(1))) {
  callNamed("registerMessage", "place_element_end", callMethod("getID", _this), symbol("_PlaceElementCbk"))
  callNamed("registerMessage", "place_element_failed", callMethod("getID", _this), symbol("_PlaceElementCbk"))
  callNamed("executeMessage", "place_element_start", callMethod("GetSelected", _this).code)
  callNamed("executeMessage", "hide_inventory")
  }

  break;
case "inv.grid.next":
  if (lingoBinary("gt", meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("items")].count, lingoBinary("mul", meProp(_me, "m_iCurrentPage"), meProp(_me, "m_iItemsPerPage")))) {
  setMeProp(_me, "m_iCurrentPage", lingoBinary("add", meProp(_me, "m_iCurrentPage"), 1));
  callMethod("update", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("items"))
  }

  break;
case "inv.grid.prev":
  if (lingoBinary("gt", meProp(_me, "m_iCurrentPage"), 1)) {
  setMeProp(_me, "m_iCurrentPage", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1));
  callMethod("update", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("items"))
  }

  break;
case "help":
  callNamed("executeMessage", "ui_help", "help.inventory.items")
  break;
  }

}

