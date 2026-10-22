// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / ShowItemInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowItemInfo(_me: LingoMe, _this: LingoValue, a_vParam: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "expiredate.info"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "singleuse"), symbol("visible"), 0)
  if (callNamed("listp", meProp(_me, "m_mp_Tickets"))) {
  if ((lingoTruthy(callNamed("voidp", a_vParam)) ? 0 : 1)) {
  callMethod("MouseSelection", meProp(_me, "m_rGridRenderer"), a_vParam)
  var t_sItemId = callMethod("GetSelected", _this).code;
  } else {
  t_sItemId = callMethod("GetSelected", _this).code;
  }

  if (lingoBinary("gt", t_sItemId, -float(1))) {
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "cat.item.info")) {
  if (callNamed("textExists", lingoBinary("join", "product.", t_sItemId))) {
  var t_sTxt = callNamed("getText", lingoBinary("join", "product.", t_sItemId));
  } else {
  t_sTxt = callNamed("getText", lingoBinary("join", "item.", t_sItemId));
  }

  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "cat.item.info"), t_sTxt)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "cat.item.prize")) {
  var t_sPrice = callMethod("GetSelected", _this).price;
  t_sTxt = lingoBinary("joinPad", t_sPrice, callNamed("getText", "cat.credits"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "cat.item.prize"), t_sTxt)
  }

  var t_iPos = callMethod("findPos", callMethod("GetSelected", _this), symbol("expirydate"));
  if (lingoBinary("gt", t_iPos, 0)) {
  var t_sExpireTime = callNamed("getText", "ticket.expires", "This expires in %days% day(s)");
  var t_iExpiryDate = callMethod("seconds2time", _this, callMethod("GetSelected", _this).expirydate);
  t_sExpireTime = callNamed("replaceChunks", t_sExpireTime, "%days%", lingoBinary("div", t_iExpiryDate[symbol("h")], 24));
  var t_Img = callNamed("getMember", "icon.singleuse").image;
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "singleuse"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "expiredate.info"), symbol("visible"), 1)
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "singleuse"), t_Img)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "expiredate.info"), t_sExpireTime)
  }

  }

  callMethod("ShowSelected", _this)
  }

  }

}

