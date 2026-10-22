// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvt: LingoValue, a_sElm: LingoValue, a_vPrm: LingoValue, a_sWnd: LingoValue) {
  if (lingoBinary("eq", a_kEvt, symbol("mouseUp"))) {
  var t_iMyRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  switch (a_sElm) {
case "tra.objects":
  if ((lingoTruthy(meProp(_me, "m_bLoadingInvThumbs")) ? 0 : 1)) {
  callMethod("Unselect", meProp(_me, "m_rGridOwnItems"))
  callMethod("Unselect", meProp(_me, "m_rGridHerItems"))
  callMethod("MouseSelection", meProp(_me, "m_rGridInvItems"), a_vPrm)
  callMethod("checkTeleporterSelection", _this, meProp(_me, "m_rGridInvItems"), meProp(_me, "m_mp_iRef_rInvItems"), lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")))
  if (theProperty("doubleClick")) {
  var t_rItem = callMethod("GetSelected", _this, meProp(_me, "m_rGridInvItems"), meProp(_me, "m_mp_iRef_rInvItems"), lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")));
  if (lingoBinary("and", lingoBinary("and", lingoBinary("gt", t_rItem.ref, -float(1)), meProp(_me, "m_bTradeAnyItem")), lingoBinary("neq", callMethod("findPos", meProp(_me, "m_ar_NonTradableItems"), t_rItem.code), undefined))) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "TradeNonTradeable", 2, 1);
  var t_rBtn1 = new LingoPropList([symbol("text"), callNamed("getText", "nav.allrooms.no"), symbol("eventID"), symbol("dialogCancel"), symbol("data"), ""]);
  var t_rBtn2 = new LingoPropList([symbol("text"), callNamed("getText", "nav.allrooms.yes"), symbol("eventID"), symbol("dialogOK"), symbol("data"), new LingoPropList([symbol("int"), 0, symbol("int"), 1, symbol("int"), t_rItem.ref])]);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "inv.trade.non.tradeable"), callNamed("getText", "mods.alert"), t_rBtn1, t_rBtn2)
  return;
  }

  if (lingoBinary("and", lingoBinary("gt", t_rItem.ref, -float(1)), lingoBinary("eq", callMethod("findPos", meProp(_me, "m_ar_NonTradableItems"), t_rItem.code), undefined))) {
  callMethod("send", callNamed("getConnection", "VMK"), 587, new LingoPropList([symbol("int"), 0, symbol("int"), 1, symbol("int"), t_rItem.ref]))
  }

  callMethod("Unselect", meProp(_me, "m_rGridInvItems"))
  setMeProp(_me, "m_iRefJustPlaced", t_rItem.ref);
  } else {
  t_rItem = callMethod("GetSelected", _this, meProp(_me, "m_rGridInvItems"), meProp(_me, "m_mp_iRef_rInvItems"), lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")));
  callMethod("RequestItemInfo", _this, t_rItem, t_iMyRef)
  }

  }

  return 1;
case "tra.mystuff":
  if ((lingoTruthy(meProp(_me, "m_bLoadingOwnThumbs")) ? 0 : 1)) {
  callMethod("Unselect", meProp(_me, "m_rGridInvItems"))
  callMethod("Unselect", meProp(_me, "m_rGridHerItems"))
  callMethod("MouseSelection", meProp(_me, "m_rGridOwnItems"), a_vPrm)
  callMethod("checkTeleporterSelection", _this, meProp(_me, "m_rGridOwnItems"), meProp(_me, "m_mp_iRef_rOwnItems"), 0)
  if (theProperty("doubleClick")) {
  t_rItem = callMethod("GetSelected", _this, meProp(_me, "m_rGridOwnItems"), meProp(_me, "m_mp_iRef_rOwnItems"), 0);
  if (lingoBinary("gt", t_rItem.ref, -float(1))) {
  callMethod("send", callNamed("getConnection", "VMK"), 587, new LingoPropList([symbol("int"), 1, symbol("int"), 1, symbol("int"), t_rItem.ref]))
  callMethod("Unselect", meProp(_me, "m_rGridOwnItems"))
  callMethod("DefineItemInfo", _this, undefined)
  }

  }

  t_rItem = callMethod("GetSelected", _this, meProp(_me, "m_rGridOwnItems"), meProp(_me, "m_mp_iRef_rOwnItems"), 0);
  if (callNamed("listp", t_rItem)) {
  if (lingoBinary("neq", t_rItem[symbol("state")], symbol("invalid"))) {
  var t_iItemRef = callNamed("integer", t_rItem[symbol("ref")]);
  callNamed("put", lingoBinary("joinPad", "Request details", new LingoPropList([symbol("int"), t_iMyRef, symbol("int"), 2, symbol("int"), t_iItemRef])))
  callMethod("send", callNamed("getConnection", "VMK"), "RequestItemDetails", new LingoPropList([symbol("int"), t_iMyRef, symbol("int"), 2, symbol("int"), t_iItemRef]))
  }

  }

  }

  return 1;
case "tra.herstuff":
  if ((lingoTruthy(meProp(_me, "m_bLoadingHerThumbs")) ? 0 : 1)) {
  callMethod("Unselect", meProp(_me, "m_rGridInvItems"))
  callMethod("Unselect", meProp(_me, "m_rGridOwnItems"))
  callMethod("MouseSelection", meProp(_me, "m_rGridHerItems"), a_vPrm)
  callMethod("checkTeleporterSelection", _this, meProp(_me, "m_rGridHerItems"), meProp(_me, "m_mp_iRef_rHerItems"), 0)
  t_rItem = callMethod("GetSelected", _this, meProp(_me, "m_rGridHerItems"), meProp(_me, "m_mp_iRef_rHerItems"), 0);
  if (callNamed("listp", t_rItem)) {
  if (lingoBinary("neq", t_rItem[symbol("state")], symbol("invalid"))) {
  t_iItemRef = callNamed("integer", t_rItem[symbol("ref")]);
  callNamed("put", lingoBinary("joinPad", "Request details", new LingoPropList([symbol("int"), meProp(_me, "m_iPartnerRef"), symbol("int"), 2, symbol("int"), t_iItemRef])))
  callMethod("send", callNamed("getConnection", "VMK"), "RequestItemDetails", new LingoPropList([symbol("int"), meProp(_me, "m_iPartnerRef"), symbol("int"), 2, symbol("int"), t_iItemRef]))
  }

  }

  }

  return 1;
case "tra.youaccept":
  if (lingoBinary("and", (lingoTruthy(meProp(_me, "m_bOwnConfirm")) ? 0 : 1), lingoBinary("eq", meProp(_me, "m_mp_iRef_rHerItems").count, 0))) {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "trade.dialog.empty.trade", 2, 1);
  var t_sTitle = callNamed("getText", "tra.confirm.empty.dialog.title");
  var t_sText = callNamed("getText", "tra.confirm.empty.dialog.text");
  t_rBtn1 = new LingoPropList([symbol("text"), callNamed("getText", "tra.confirm.empty.dialog.btnCancel"), symbol("eventID"), symbol("dialogCancel"), symbol("data"), ""]);
  t_rBtn2 = new LingoPropList([symbol("text"), callNamed("getText", "tra.confirm.empty.dialog.btnOK"), symbol("eventID"), symbol("dialogOK"), symbol("data"), ""]);
  callMethod("setText", t, t_sText, t_sTitle, t_rBtn1, t_rBtn2)
  callMethod("show", t)
  return 1;
  } else {
  if (lingoBinary("gt", meProp(_me, "m_bOwnConfirm"), 0)) {
  callMethod("send", callNamed("getConnection", "VMK"), 586, new LingoPropList([symbol("int"), 0]))
  } else {
  callMethod("send", callNamed("getConnection", "VMK"), 586, new LingoPropList([symbol("int"), 1]))
  }

  }

  var t_rChkBox = callNamed("getMember", lingoBinary("join", "button.checkbox.", (lingoTruthy(meProp(_me, "m_bOwnConfirm")) ? 0 : 1)));
  if (callNamed("ilk", t_rChkBox, symbol("member"))) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.youaccept"), t_rChkBox.image)
  }

  break;
case "tra.tab.posters.passive":
  callMethod("_SwitchPage", _this, symbol("posters"))
  break;
case "tra.tab.clothes.passive":
  if (meProp(_me, "m_bOppositeGender")) {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "trade.dialog.oppositeGender", 1, 1);
  callMethod("setText", t, callNamed("getText", "inv.trade.oppositeGender.dialog.text"), callNamed("getText", "inv.trade.oppositeGender.dialog.title"), callNamed("getText", "inv.trade.oppositeGender.dialog.OK"))
  callMethod("show", t)
  }

  callMethod("_SwitchPage", _this, symbol("clothes"))
  break;
case "tra.tab.pins.passive":
  callMethod("_SwitchPage", _this, symbol("pins"))
  break;
case "tra.tab.furniture.passive":
  callMethod("_SwitchPage", _this, symbol("items"))
  break;
case "tra.askfriend.button":
  callNamed("executeMessage", "ask_friendship", meProp(_me, "m_sPartner"))
  break;
case "tra.stoptrading.button":
  t = callNamed("createDialogWindow", callMethod("getID", _this), "tra.confirm.stop.dialog", 2, 1);
  t_sTitle = callNamed("getText", "tra.confirm.stop.dialog.title");
  t_sText = callNamed("getText", "tra.confirm.stop.dialog.text");
  t_rBtn1 = new LingoPropList([symbol("text"), callNamed("getText", "tra.confirm.stop.dialog.btnCancel"), symbol("eventID"), symbol("dialogCancel"), symbol("data"), ""]);
  t_rBtn2 = new LingoPropList([symbol("text"), callNamed("getText", "tra.confirm.stop.dialog.btnOK"), symbol("eventID"), symbol("dialogOK"), symbol("data"), ""]);
  callMethod("setText", t, t_sText, t_sTitle, t_rBtn1, t_rBtn2)
  callMethod("show", t)
  break;
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  t = callNamed("createDialogWindow", callMethod("getID", _this), "tra.confirm.stop.dialog", 2, 1);
  t_sTitle = callNamed("getText", "tra.confirm.stop.dialog.title");
  t_sText = callNamed("getText", "tra.confirm.stop.dialog.text");
  t_rBtn1 = new LingoPropList([symbol("text"), callNamed("getText", "tra.confirm.stop.dialog.btnCancel"), symbol("eventID"), symbol("dialogCancel"), symbol("data"), ""]);
  t_rBtn2 = new LingoPropList([symbol("text"), callNamed("getText", "tra.confirm.stop.dialog.btnOK"), symbol("eventID"), symbol("dialogOK"), symbol("data"), ""]);
  callMethod("setText", t, t_sText, t_sTitle, t_rBtn1, t_rBtn2)
  callMethod("show", t)
  break;
case "inv.grid.next":
  if (lingoBinary("gt", meProp(_me, "m_mp_iRef_rInvItems").count, lingoBinary("mul", meProp(_me, "m_iCurrentPage"), meProp(_me, "m_iItemsPerPage")))) {
  setMeProp(_me, "m_iCurrentPage", lingoBinary("add", meProp(_me, "m_iCurrentPage"), 1));
  setMeProp(_me, "m_bLoadingInvThumbs", 1);
  callMethod("SetBufferElement", meProp(_me, "m_rInvGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "tra.objects"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rInvGridLoadAnim")))
  var t_mp_iType_rThumb = new LingoPropList([]);
  var t_iCount = meProp(_me, "m_mp_iRef_rInvItems").count;
  if (lingoBinary("gt", meProp(_me, "m_iCurrentPage"), 1)) {
  if (lingoBinary("gt", lingoBinary("add", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")), 1), t_iCount)) {
  setMeProp(_me, "m_iCurrentPage", 1);
  }

  } else {
  if (lingoBinary("lt", meProp(_me, "m_iCurrentPage"), 1)) {
  setMeProp(_me, "m_iCurrentPage", 1);
  }

  }

  var t_iFirst = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")), 1);
  var t_iLast = callNamed("min", lingoBinary("mul", meProp(_me, "m_iCurrentPage"), meProp(_me, "m_iItemsPerPage")), t_iCount);
  for (var i = t_iFirst; i <= t_iLast; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, meProp(_me, "m_mp_iRef_rInvItems")[i].code, undefined)
  }

  setMeProp(_me, "m_iInvGridRequest", lingoBinary("add", meProp(_me, "m_iInvGridRequest"), 1));
  callNamed("executeMessage", "GetMixedThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_RenderInvItems"), symbol("category"), meProp(_me, "m_kCategory"), symbol("request"), meProp(_me, "m_iInvGridRequest")]))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.page.number"), lingoBinary("join", lingoBinary("join", meProp(_me, "m_iCurrentPage"), "/"), callNamed("max", lingoBinary("add", lingoBinary("div", t_iCount, meProp(_me, "m_iItemsPerPage")), lingoBinary("gt", lingoBinary("mod", t_iCount, meProp(_me, "m_iItemsPerPage")), 0)), 1)))
  callMethod("Unselect", meProp(_me, "m_rGridOwnItems"))
  callMethod("Unselect", meProp(_me, "m_rGridHerItems"))
  callMethod("select", meProp(_me, "m_rGridInvItems"), 1)
  t_rItem = callMethod("GetSelected", _this, meProp(_me, "m_rGridInvItems"), meProp(_me, "m_mp_iRef_rInvItems"), lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")));
  callMethod("RequestItemInfo", _this, t_rItem, t_iMyRef)
  callMethod("checkTeleporterSelection", _this, meProp(_me, "m_rGridInvItems"), meProp(_me, "m_mp_iRef_rInvItems"), lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")))
  }

  break;
case "inv.grid.prev":
  if (lingoBinary("gt", meProp(_me, "m_iCurrentPage"), 1)) {
  setMeProp(_me, "m_iCurrentPage", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1));
  setMeProp(_me, "m_bLoadingInvThumbs", 1);
  callMethod("SetBufferElement", meProp(_me, "m_rInvGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "tra.objects"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rInvGridLoadAnim")))
  t_mp_iType_rThumb = new LingoPropList([]);
  t_iCount = meProp(_me, "m_mp_iRef_rInvItems").count;
  if (lingoBinary("gt", meProp(_me, "m_iCurrentPage"), 1)) {
  if (lingoBinary("gt", lingoBinary("add", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")), 1), t_iCount)) {
  setMeProp(_me, "m_iCurrentPage", 1);
  }

  } else {
  if (lingoBinary("lt", meProp(_me, "m_iCurrentPage"), 1)) {
  setMeProp(_me, "m_iCurrentPage", 1);
  }

  }

  t_iFirst = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")), 1);
  t_iLast = callNamed("min", lingoBinary("mul", meProp(_me, "m_iCurrentPage"), meProp(_me, "m_iItemsPerPage")), t_iCount);
  for (var i = t_iFirst; i <= t_iLast; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, meProp(_me, "m_mp_iRef_rInvItems")[i].code, undefined)
  }

  setMeProp(_me, "m_iInvGridRequest", lingoBinary("add", meProp(_me, "m_iInvGridRequest"), 1));
  callNamed("executeMessage", "GetMixedThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_RenderInvItems"), symbol("category"), meProp(_me, "m_kCategory"), symbol("request"), meProp(_me, "m_iInvGridRequest")]))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.page.number"), lingoBinary("join", lingoBinary("join", meProp(_me, "m_iCurrentPage"), "/"), callNamed("max", lingoBinary("add", lingoBinary("div", t_iCount, meProp(_me, "m_iItemsPerPage")), lingoBinary("gt", lingoBinary("mod", t_iCount, meProp(_me, "m_iItemsPerPage")), 0)), 1)))
  callMethod("Unselect", meProp(_me, "m_rGridOwnItems"))
  callMethod("Unselect", meProp(_me, "m_rGridHerItems"))
  callMethod("select", meProp(_me, "m_rGridInvItems"), 1)
  t_rItem = callMethod("GetSelected", _this, meProp(_me, "m_rGridInvItems"), meProp(_me, "m_mp_iRef_rInvItems"), lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")));
  callMethod("RequestItemInfo", _this, t_rItem, t_iMyRef)
  callMethod("checkTeleporterSelection", _this, meProp(_me, "m_rGridInvItems"), meProp(_me, "m_mp_iRef_rInvItems"), lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")))
  }

  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.trading")
  break;
  }

  } else {
  if (lingoBinary("eq", a_kEvt, symbol("keyDown"))) {
  var t_iKeyCode = theProperty("keyCode");
  if (lingoBinary("neq", meProp(_me, "m_mp_CannedField"), 0)) {
  switch (t_iKeyCode) {
case 36:
case 76:
  var t_pass = callMethod("CheckContent", meProp(_me, "m_mp_CannedField"));
  if (t_pass) {
  callMethod("SendMessage", _this, meProp(_me, "m_mp_CannedField").m_ar_cWords)
  callMethod("reset", meProp(_me, "m_mp_CannedField"))
  }

  return 1;
case 49:
  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), "tra.chat.field");
  var tSelection = tElem.pMember.selection;
  var tCharcount = tElem.pMember.text.char.count;
  if (lingoBinary("gt", tCharcount, 0)) {
  if (lingoBinary("eq", tElem.pMember.text.char[tSelection[2]], " ")) {
  return 1;
  }

  if (lingoBinary("lte", lingoBinary("add", tSelection[2], 1), tCharcount)) {
  if (lingoBinary("eq", tElem.pMember.text.char[lingoBinary("add", tSelection[2], 1)], " ")) {
  return 1;
  }

  }

  }

  if (callMethod("CheckContent", meProp(_me, "m_mp_CannedField"))) {
  callMethod("updateContent", meProp(_me, "m_mp_CannedField"))
  }

  callNamed("pass")
  break;
  default:
  callMethod("updateContent", meProp(_me, "m_mp_CannedField"))
  callNamed("pass")
  break;
  }

  }

  } else {
  if (lingoBinary("eq", a_kEvt, symbol("keyUp"))) {
  t_iKeyCode = theProperty("keyCode");
  tElem = callMethod("getElement", meProp(_me, "m_rWindow"), "tra.chat.field");
  if (lingoBinary("neq", meProp(_me, "m_mp_CannedField"), 0)) {
  switch (t_iKeyCode) {
case 36:
case 76:
  if (lingoBinary("eq", callMethod("getProperty", tElem, symbol("sprite")).member.text, "\r")) {
  callMethod("reset", meProp(_me, "m_mp_CannedField"))
  }

  break;
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_mp_CannedField"))
  break;
  }

  }

  }

  }

  }

}

