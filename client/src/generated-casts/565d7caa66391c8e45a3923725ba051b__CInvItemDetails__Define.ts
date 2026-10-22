// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemDetails / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, _this: LingoValue, a_ar_props: LingoValue) {
  setMeProp(_me, "m_sWndID", "ItemDetailsWindow");
  if (callNamed("windowExists", meProp(_me, "m_sWndID"))) {
  callNamed("removeWindow", meProp(_me, "m_sWndID"))
  }

  var t_kSpecial = undefined;
  if (callNamed("value", callMethod("get", callNamed("getObject", symbol("session")), "IsTrading"))) {
  t_kSpecial = symbol("modal");
  }

  if (callNamed("createWindow", meProp(_me, "m_sWndID"), undefined, 0, 0, t_kSpecial)) {
  var t_rWindow = callNamed("getWindow", meProp(_me, "m_sWndID"));
  var t_ar_windowDescriptions = new LingoList(["vmk_basic.window", "vmk_item_info.window"]);
  for (var t_sWinDesc of t_ar_windowDescriptions.toArray()) {
  var t_bSuccess = callMethod("merge", t_rWindow, t_sWinDesc);
  }

  callMethod("center", t_rWindow)
  setMeProp(_me, "m_rWindow", t_rWindow);
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "basic.window.title", callNamed("getText", "iteminfo.title.hd", "Item Info"))
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "roominfog.owner", a_ar_props[symbol("owner")])
  callMethod("ShowSelected", _this, a_ar_props[symbol("code")])
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.item", callNamed("getText", lingoBinary("join", "item.", a_ar_props[symbol("code")])))
  var t_sItemType = "";
  var t_bTradeable = 1;
  if (lingoBinary("neq", callMethod("findPos", meProp(_me, "m_ar_NonTradableItems"), a_ar_props[symbol("code")]), undefined)) {
  t_bTradeable = 0;
  }

  var t_sExpireTime = callNamed("getText", "iteminfo.expires", "This expires in %days% day(s)");
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.check.guestsmove"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.text.guestsmove"))
  setMeProp(_me, "m_mp_props", a_ar_props);
  switch (a_ar_props[symbol("type")]) {
case 1:
  t_sItemType = callNamed("getText", "iteminfo.1.type", "Furniture");
  var t_bMeOwner = 0;
  if (lingoBinary("eq", meProp(_me, "m_mp_props")[symbol("owner")], callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  t_bMeOwner = 1;
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_props")[symbol("xtra")], symbol("ref")))) ? 0 : 1), t_bMeOwner)) {
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.check.guestsmove"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.text.guestsmove"))
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_rItem = callMethod("_AccessIndexed", t_rContext, meProp(_me, "m_mp_props")[symbol("xtra")][symbol("ref")], "element");
  if (callNamed("voidp", t_rItem)) {
  return callNamed("error", _this, "Could not find element in room", symbol("Define"));
  }

  var tStatus = callNamed("integer", callMethod("GetParam", callMethod("getObject", t_rItem), "GUESTMOVE"));
  if (tStatus) {
  callMethod("changeImageInElement", _this, meProp(_me, "m_rWindow"), "iteminfo.check.guestsmove", callNamed("member", callNamed("getmemnum", "button.checkbox.1")))
  } else {
  callMethod("changeImageInElement", _this, meProp(_me, "m_rWindow"), "iteminfo.check.guestsmove", callNamed("member", callNamed("getmemnum", "button.checkbox.0")))
  }

  }

  break;
case 2:
  t_sItemType = callNamed("getText", "iteminfo.2.type", "Poster");
  t_bMeOwner = 0;
  if (lingoBinary("eq", meProp(_me, "m_mp_props")[symbol("owner")], callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  t_bMeOwner = 1;
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_props")[symbol("xtra")], symbol("ref")))) ? 0 : 1), t_bMeOwner)) {
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.check.guestsmove"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), "iteminfo.text.guestsmove"))
  t_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  t_rItem = callMethod("_AccessIndexed", t_rContext, meProp(_me, "m_mp_props")[symbol("xtra")][symbol("ref")], "poster");
  if (callNamed("voidp", t_rItem)) {
  return callNamed("error", _this, "Could not find element in room", symbol("Define"));
  }

  tStatus = callNamed("integer", callMethod("GetParam", callMethod("getObject", t_rItem), "GUESTMOVE"));
  if (tStatus) {
  callMethod("changeImageInElement", _this, meProp(_me, "m_rWindow"), "iteminfo.check.guestsmove", callNamed("member", callNamed("getmemnum", "button.checkbox.1")))
  } else {
  callMethod("changeImageInElement", _this, meProp(_me, "m_rWindow"), "iteminfo.check.guestsmove", callNamed("member", callNamed("getmemnum", "button.checkbox.0")))
  }

  }

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
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "magics.word", a_ar_props[symbol("xtra")][symbol("magiword")])
  break;
case 8:
  t_sItemType = callNamed("getText", "iteminfo.8.type", "Single Use Magic Pin");
  var t_ar_Time = callMethod("seconds2time", _this, a_ar_props[symbol("xtra")][symbol("timeToExpire")]);
  var t_IDaysLeft = lingoBinary("div", callNamed("integer", t_ar_Time[symbol("h")]), 24);
  t_sExpireTime = callNamed("replaceChunks", t_sExpireTime, "%days%", t_IDaysLeft);
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "expiredate.info", t_sExpireTime)
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "magics.word", a_ar_props[symbol("xtra")][symbol("magiword")])
  callMethod("changeImageInElement", _this, meProp(_me, "m_rWindow"), "singleuse", callNamed("member", "icon.singleuse"))
  break;
case 9:
  t_sItemType = callNamed("getText", "iteminfo.9.type", "Ticket Pin");
  t_ar_Time = callMethod("seconds2time", _this, a_ar_props[symbol("xtra")][symbol("timeToExpire")]);
  t_IDaysLeft = lingoBinary("div", callNamed("integer", t_ar_Time[symbol("h")]), 24);
  t_sExpireTime = callNamed("replaceChunks", t_sExpireTime, "%days%", t_IDaysLeft);
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "expiredate.info", t_sExpireTime)
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.type.hd", callNamed("getText", "iteminfo.goodfor.hd", "Good For:"))
  t_sItemType = a_ar_props[symbol("xtra")][symbol("validForRooms")];
  break;
  }

  if (lingoBinary("and", lingoBinary("neq", a_ar_props[symbol("type")], 7), lingoBinary("neq", a_ar_props[symbol("type")], 8))) {
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.magicword.hd", "")
  }

  var t_sTradeable = callNamed("getText", "iteminfo.tradeable", "Tradeable");
  if (lingoBinary("or", (lingoTruthy(t_bTradeable) ? 0 : 1), lingoBinary("eq", a_ar_props[symbol("type")], 8))) {
  t_sTradeable = callNamed("getText", "iteminfo.nontradeable", "Nontradeable");
  }

  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.tradeable.off", t_sTradeable)
  callMethod("setField", _this, meProp(_me, "m_rWindow"), "iteminfo.type", t_sItemType)
  return 1;
  } else {
  return callNamed("error", _this, "Failed to open item details!", symbol("update"));
  }

}

