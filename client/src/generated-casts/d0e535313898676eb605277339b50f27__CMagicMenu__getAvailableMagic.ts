// d0e535313898676eb605277339b50f27.cct / CMagicMenu / getAvailableMagic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAvailableMagic(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_iFxCount = callMethod("GetIntFrom", tMsg.connection);
  setMeProp(_me, "m_arAvailableTimes", new LingoPropList([]));
  setMeProp(_me, "m_mp_FxList", new LingoPropList([]));
  setMeProp(_me, "m_iTelePortFxId", undefined);
  setMeProp(_me, "m_iActiveFx", -float(1));
  for (var i = 1; i <= t_iFxCount; ++i) {
  var t_iID = callMethod("GetIntFrom", tMsg.connection);
  var t_sID = callNamed("string", t_iID);
  var t_iItemId = callMethod("GetIntFrom", tMsg.connection);
  var t_iFxCode = callMethod("GetIntFrom", tMsg.connection);
  var t_sFxName = callMethod("GetStrFrom", tMsg.connection);
  var t_sTrigger = callMethod("GetStrFrom", tMsg.connection);
  var t_iAvailable = callMethod("GetIntFrom", tMsg.connection);
  var t_iLevel = callMethod("GetIntFrom", tMsg.connection);
  var t_bActive = callMethod("GetIntFrom", tMsg.connection);
  var t_bSingleUse = callMethod("GetIntFrom", tMsg.connection);
  var t_sExpiryDate = callMethod("GetIntFrom", tMsg.connection);
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_FxList"), t_sID);
  if (lingoBinary("eq", t_iPos, 0)) {
  callMethod("addProp", meProp(_me, "m_mp_FxList"), t_sID, new LingoPropList([]))
  }

  if (lingoBinary("gt", t_iAvailable, 0)) {
  callMethod("addProp", meProp(_me, "m_arAvailableTimes"), t_iID, t_iAvailable)
  }

  if (t_bActive) {
  setMeProp(_me, "m_iActiveFx", t_iID);
  }

  if (lingoBinary("eq", t_iFxCode, 4)) {
  setMeProp(_me, "m_iTelePortFxId", t_iID);
  }

  callMethod("addProp", meProp(_me, "m_mp_FxList")[t_sID], symbol("FxId"), t_iID)
  callMethod("addProp", meProp(_me, "m_mp_FxList")[t_sID], symbol("code"), t_iFxCode)
  callMethod("addProp", meProp(_me, "m_mp_FxList")[t_sID], symbol("ItemId"), t_iItemId)
  callMethod("addProp", meProp(_me, "m_mp_FxList")[t_sID], symbol("name"), t_sFxName)
  callMethod("addProp", meProp(_me, "m_mp_FxList")[t_sID], symbol("trigger"), t_sTrigger)
  callMethod("addProp", meProp(_me, "m_mp_FxList")[t_sID], symbol("available"), t_iAvailable)
  callMethod("addProp", meProp(_me, "m_mp_FxList")[t_sID], symbol("level"), t_iLevel)
  callMethod("addProp", meProp(_me, "m_mp_FxList")[t_sID], symbol("Active"), t_bActive)
  callMethod("addProp", meProp(_me, "m_mp_FxList")[t_sID], symbol("singleuse"), t_bSingleUse)
  callMethod("addProp", meProp(_me, "m_mp_FxList")[t_sID], symbol("expirydate"), t_sExpiryDate)
  }

  callNamed("executeMessage", "close_Emoticons")
  callNamed("executeMessage", symbol("hide_roominfo"))
  callNamed("executeMessage", symbol("hide_camera"))
  if (lingoBinary("and", callNamed("windowExists", meProp(_me, "m_sWindowID")), meProp(_me, "m_bMagicMenuOpened"))) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("show", t_rWnd)
  setMeProp(_me, "m_bMagicMenuOpened", 0);
  } else {
  if (meProp(_me, "m_bMagicMenuOpened")) {
  callNamed("createWindow", meProp(_me, "m_sWindowID"), "vmk_popup.window")
  t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("merge", t_rWnd, "vmk_popup_magics.window")
  var tW = callMethod("getProperty", t_rWnd, symbol("width"));
  var tH = callMethod("getProperty", t_rWnd, symbol("height"));
  callMethod("moveTo", t_rWnd, lingoBinary("sub", 663, tW), lingoBinary("sub", 572, tH))
  callMethod("registerClient", t_rWnd, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWnd, symbol("_EventProcMagic"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("registerProcedure", t_rWnd, symbol("_EventProcMagic"), callMethod("getID", _this), symbol("mouseDown"))
  setMeProp(_me, "m_bMagicMenuOpened", 0);
  }

  }

  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("elementExists", t_rWnd, "popup.hd")) {
  var t_sTxt = callNamed("getText", "magic.wnd.name");
  callMethod("setText", callMethod("getElement", t_rWnd, "popup.hd"), t_sTxt)
  }

  var t_mp_iType_rThumb = new LingoPropList([]);
  for (var i = 1; i <= meProp(_me, "m_mp_FxList").count; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, meProp(_me, "m_mp_FxList")[i].ItemId, undefined)
  }

  callNamed("executeMessage", "GetPinThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_ThumbsRenderedCbk")]))
  if (meProp(_me, "m_mp_FxList").count) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.stop.button"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word.hd"), symbol("visible"), 1)
  } else {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.stop.button"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word.hd"), symbol("visible"), 0)
  }

  if (lingoBinary("gt", meProp(_me, "m_arAvailableTimes").count, 0)) {
  var t_mpDelays = new LingoPropList([]);
  t_mpDelays = _this.delays;
  for (var g = 1; g <= t_mpDelays.count; ++g) {
  if (lingoBinary("eq", t_mpDelays[g].method, symbol("_CheckFxTimers"))) {
  callMethod("cancel", _this, callMethod("getPropAt", t_mpDelays, g))
  }

  }

  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 0)
  callMethod("_CheckFxTimers", _this)
  }

  var t_mpList = callMethod("GetSelected", _this);
  if (callNamed("listp", t_mpList)) {
  setMeProp(_me, "m_iSelectedFx", callMethod("GetSelected", _this).FxId);
  if (callMethod("elementExists", t_rWnd, "magics.word")) {
  t_sTxt = callMethod("GetSelected", _this).trigger;
  callMethod("setText", callMethod("getElement", t_rWnd, "magics.word"), t_sTxt)
  }

  if (callMethod("elementExists", t_rWnd, "magics.name")) {
  var t_sName = callMethod("GetSelected", _this).name;
  callMethod("setText", callMethod("getElement", t_rWnd, "magics.name"), t_sName)
  }

  var t_iExpiryDate = t_mpList.expirydate;
  if (lingoBinary("eq", t_iExpiryDate, -float(1))) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "pin.expirydate"), symbol("visible"), 0)
  } else {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "pin.expirydate"), symbol("visible"), 1)
  var t_iHours = lingoBinary("div", t_iExpiryDate, 3600);
  var t_IDaysLeft = lingoBinary("div", t_iHours, 24);
  t_sTxt = lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "singleuse.expiry.info.text"), t_IDaysLeft), callNamed("getText", "days.left.text"));
  callMethod("setText", callMethod("getElement", t_rWnd, "pin.expirydate"), t_sTxt)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  }

  if (callMethod("elementExists", t_rWnd, "magics.timeout")) {
  t_sTxt = "";
  callMethod("setText", callMethod("getElement", t_rWnd, "magics.timeout"), t_sTxt)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iActiveFx"), meProp(_me, "m_iSelectedFx")), lingoBinary("gt", meProp(_me, "m_iActiveFx"), -float(1)))) {
  callMethod("_ShowStopMagic", _this)
  }

  } else {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word.hd"), symbol("visible"), 0)
  if (callMethod("elementExists", t_rWnd, "magics.name")) {
  callMethod("setText", callMethod("getElement", t_rWnd, "magics.name"), callNamed("getText", "magics.nomagic"))
  }

  }

  }

}

