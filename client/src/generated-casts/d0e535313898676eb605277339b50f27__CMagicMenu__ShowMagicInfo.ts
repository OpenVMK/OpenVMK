// d0e535313898676eb605277339b50f27.cct / CMagicMenu / ShowMagicInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowMagicInfo(_me: LingoMe, _this: LingoValue, a_vParam: LingoValue, a_bDoubleClick: LingoValue) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (lingoBinary("and", callNamed("listp", meProp(_me, "m_mp_FxList")), lingoBinary("gt", meProp(_me, "m_mp_FxList").count, 0))) {
  if ((lingoTruthy(callNamed("voidp", a_vParam)) ? 0 : 1)) {
  callMethod("MouseSelection", meProp(_me, "m_rGrid"), a_vParam)
  setMeProp(_me, "m_iItemId", callMethod("GetSelected", _this).FxId);
  var t_FxID = callMethod("GetSelected", _this).code;
  } else {
  setMeProp(_me, "m_iItemId", meProp(_me, "m_mp_FxList")[1].FxId);
  t_FxID = meProp(_me, "m_mp_FxList")[1].code;
  callMethod("select", meProp(_me, "m_rGrid"), meProp(_me, "m_iItemId"))
  }

  setMeProp(_me, "m_iSelectedFx", meProp(_me, "m_iItemId"));
  var t_rItem = callMethod("getaProp", meProp(_me, "m_mp_FxList"), meProp(_me, "m_iItemId"));
  if (lingoBinary("eq", meProp(_me, "m_iItemId"), -float(1))) {
  return;
  }

  if (a_bDoubleClick) {
  if (lingoBinary("gt", meProp(_me, "m_iItemId"), -float(1))) {
  if (lingoBinary("eq", meProp(_me, "m_iMagicStatus"), 0)) {
  if (lingoBinary("neq", t_FxID, 4)) {
  setMeProp(_me, "m_iActiveFx", meProp(_me, "m_iItemId"));
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "ActivataMagicFx", new LingoPropList([symbol("int"), meProp(_me, "m_iItemId")]))
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "QueryMagicFx")
  if ((lingoTruthy(t_rItem.singleuse) ? 0 : 1)) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.stop.button"), symbol("visible"), 1)
  }

  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word.hd"), symbol("visible"), 0)
  callMethod("_Close", _this)
  } else {
  callMethod("HandleTeleportFx", _this)
  callMethod("_Close", _this)
  }

  }

  }

  } else {
  if (lingoBinary("eq", meProp(_me, "m_iActiveFx"), meProp(_me, "m_iSelectedFx"))) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.stop.button"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word.hd"), symbol("visible"), 0)
  if (callMethod("elementExists", t_rWnd, "magics.name")) {
  var t_sName = callMethod("GetSelected", _this).name;
  callMethod("setText", callMethod("getElement", t_rWnd, "magics.name"), t_sName)
  }

  var t_iExpiryDate = callMethod("GetSelected", _this).expirydate;
  if (lingoBinary("eq", t_iExpiryDate, -float(1))) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "pin.expirydate"), symbol("visible"), 0)
  } else {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "pin.expirydate"), symbol("visible"), 1)
  var t_iHours = lingoBinary("div", t_iExpiryDate, 3600);
  var t_IDaysLeft = lingoBinary("div", t_iHours, 24);
  var t_sTxt = lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "singleuse.expiry.info.text"), t_IDaysLeft), callNamed("getText", "days.left.text"));
  callMethod("setText", callMethod("getElement", t_rWnd, "pin.expirydate"), t_sTxt)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.stop.button"), symbol("visible"), 0)
  }

  } else {
  if (callMethod("elementExists", t_rWnd, "magics.word")) {
  t_sTxt = callMethod("GetSelected", _this).trigger;
  callMethod("setText", callMethod("getElement", t_rWnd, "magics.word"), t_sTxt)
  }

  if (callMethod("elementExists", t_rWnd, "magics.name")) {
  t_sName = callMethod("GetSelected", _this).name;
  callMethod("setText", callMethod("getElement", t_rWnd, "magics.name"), t_sName)
  }

  if (callMethod("elementExists", t_rWnd, "magics.timeout")) {
  t_sTxt = "";
  callMethod("setText", callMethod("getElement", t_rWnd, "magics.timeout"), t_sTxt)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  }

  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.stop.button"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word.hd"), symbol("visible"), 1)
  t_iExpiryDate = callMethod("GetSelected", _this).expirydate;
  if (lingoBinary("eq", t_iExpiryDate, -float(1))) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "pin.expirydate"), symbol("visible"), 0)
  } else {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "pin.expirydate"), symbol("visible"), 1)
  t_iHours = lingoBinary("div", t_iExpiryDate, 3600);
  t_IDaysLeft = lingoBinary("div", t_iHours, 24);
  t_sTxt = lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "singleuse.expiry.info.text"), t_IDaysLeft), callNamed("getText", "days.left.text"));
  callMethod("setText", callMethod("getElement", t_rWnd, "pin.expirydate"), t_sTxt)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  }

  if (t_rItem.singleuse) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.stop.button"), symbol("visible"), 0)
  }

  }

  }

  }

}

