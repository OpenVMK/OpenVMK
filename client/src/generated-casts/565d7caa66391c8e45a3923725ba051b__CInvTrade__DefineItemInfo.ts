// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / DefineItemInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DefineItemInfo(_me: LingoMe, _this: LingoValue, a_ar_rProps: LingoValue) {
  if ((lingoTruthy(callNamed("listp", a_ar_rProps)) ? 0 : 1)) {
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.tradeable.off"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.magicword.hd"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.owner.hd"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.type.hd"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.type"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.item"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "roominfog.owner"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "magics.word"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "expiredate.info"))
  callMethod("changeImageInElement", _this, meProp(_me, "m_rWindow"), "singleuse", callNamed("member", "null"))
  callMethod("ShowSelected", _this, -float(1), undefined)
  return 0;
  } else {
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.tradeable.off"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.magicword.hd"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.owner.hd"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.type.hd"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.type"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.item"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "roominfog.owner"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "magics.word"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "expiredate.info"))
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.magicword.hd", callNamed("getText", "magics.word.hd", "Magic word:"))
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.type.hd", callNamed("getText", "iteminfo.type.hd", "Type"))
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "expiredate.info", "")
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "magics.word", "")
  callMethod("changeImageInElement", _this, meProp(_me, "m_rWindow"), "singleuse", callNamed("member", "null"))
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "roominfog.owner", a_ar_rProps[symbol("owner")])
  if (lingoBinary("or", lingoBinary("eq", a_ar_rProps[symbol("type")], 7), lingoBinary("eq", a_ar_rProps[symbol("type")], 8))) {
  callMethod("ShowSelected", _this, a_ar_rProps[symbol("code")], callMethod("getaProp", callMethod("getaProp", a_ar_rProps, symbol("xtra")), symbol("pinlevel")))
  } else {
  callMethod("ShowSelected", _this, a_ar_rProps[symbol("code")], 0)
  }

  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.item", callNamed("getText", lingoBinary("join", "item.", a_ar_rProps[symbol("code")])))
  var t_sItemType = "";
  var t_bTradeable = 1;
  if (lingoBinary("neq", callMethod("findPos", meProp(_me, "m_ar_NonTradableItems"), a_ar_rProps[symbol("code")]), undefined)) {
  t_bTradeable = 0;
  }

  var t_sExpireTime = callNamed("getText", "iteminfo.expires", "This expires in %days% day(s)");
  switch (a_ar_rProps[symbol("type")]) {
case 1:
  t_sItemType = callNamed("getText", "iteminfo.1.type", "Furniture");
  break;
case 2:
  t_sItemType = callNamed("getText", "iteminfo.2.type", "Poster");
  break;
case 3:
  t_sItemType = callNamed("getText", "iteminfo.3.type", "Unisex Clothing");
  break;
case 4:
  t_sItemType = callNamed("getText", "iteminfo.4.type", "Male Clothing");
  break;
case 5:
  t_sItemType = callNamed("getText", "iteminfo.5.type", "Female Clothing");
  break;
case 6:
  t_sItemType = callNamed("getText", "iteminfo.6.type", "Normal Pin");
  break;
case 7:
  t_sItemType = callNamed("getText", "iteminfo.7.type", "Magic Pin");
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "magics.word", a_ar_rProps[symbol("xtra")][symbol("magiword")])
  break;
case 8:
  t_sItemType = callNamed("getText", "iteminfo.8.type", "Single Use Magic Pin");
  var t_ar_Time = callMethod("seconds2time", _this, a_ar_rProps[symbol("xtra")][symbol("timeToExpire")]);
  var t_IDaysLeft = lingoBinary("div", callNamed("integer", t_ar_Time[symbol("h")]), 24);
  t_sExpireTime = callNamed("replaceChunks", t_sExpireTime, "%days%", t_IDaysLeft);
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "expiredate.info", t_sExpireTime)
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "magics.word", a_ar_rProps[symbol("xtra")][symbol("magiword")])
  callMethod("changeImageInElement", _this, meProp(_me, "m_rWindow"), "singleuse", callNamed("member", "icon.singleuse"))
  break;
case 9:
  t_sItemType = callNamed("getText", "iteminfo.9.type", "Ticket Pin");
  t_ar_Time = callMethod("seconds2time", _this, a_ar_rProps[symbol("xtra")][symbol("timeToExpire")]);
  t_IDaysLeft = lingoBinary("div", callNamed("integer", t_ar_Time[symbol("h")]), 24);
  t_sExpireTime = callNamed("replaceChunks", t_sExpireTime, "%days%", t_IDaysLeft);
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "expiredate.info", t_sExpireTime)
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.type.hd", callNamed("getText", "iteminfo.goodfor.hd", "Good For:"))
  t_sItemType = a_ar_rProps[symbol("xtra")][symbol("validForRooms")];
  break;
  }

  if (lingoBinary("and", lingoBinary("neq", a_ar_rProps[symbol("type")], 7), lingoBinary("neq", a_ar_rProps[symbol("type")], 8))) {
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.magicword.hd", "")
  }

  var t_sTradeable = callNamed("getText", "iteminfo.tradeable", "Tradeable");
  if (lingoBinary("or", (lingoTruthy(t_bTradeable) ? 0 : 1), lingoBinary("eq", a_ar_rProps[symbol("type")], 8))) {
  t_sTradeable = callNamed("getText", "iteminfo.nontradeable", "Nontradeable");
  }

  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.tradeable.off", t_sTradeable)
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.type", t_sItemType)
  return 1;
  }

}

