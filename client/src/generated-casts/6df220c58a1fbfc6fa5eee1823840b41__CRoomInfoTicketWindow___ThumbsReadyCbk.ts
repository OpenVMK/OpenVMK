// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / _ThumbsReadyCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ThumbsReadyCbk(_me: LingoMe, _this: LingoValue, a_mp_iType_rThumb: LingoValue, a_rCallback: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iCount = a_mp_iType_rThumb.count;
  for (var i = 1; i <= t_iCount; ++i) {
  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), a_mp_iType_rThumb[i], symbol("blend"), 100, symbol("items"), meProp(_me, "m_mp_Tickets")[i][symbol("items")]]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWindow"), "ticketpins.list"))
  callMethod("ShowItemInfo", _this)
  if (lingoBinary("eq", a_mp_iType_rThumb.count, 0)) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "ticketpins.sell.button"), symbol("blend"), 50)
  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "ticketpins.sell.button"), symbol("blend"), 100)
  }

  }

}

