// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / ShowItemInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowItemInfo(_me: LingoMe, _this: LingoValue, a_vParam: LingoValue) {
  var t_mpItemList = meProp(_me, "m_mpCatalogData")["category"];
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "singleuse"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "singleuse1"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "pintype.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "pin.expirydate"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "expires.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "pintype.regular"), symbol("visible"), 0)
  if (callNamed("listp", t_mpItemList)) {
  if ((lingoTruthy(callNamed("voidp", a_vParam)) ? 0 : 1)) {
  callMethod("MouseSelection", meProp(_me, "m_rGridRenderer"), a_vParam)
  }

  var t_rSelected = callMethod("GetSelected", _this);
  var t_sItemId = t_rSelected.code;
  if (lingoBinary("gt", t_sItemId, -float(1))) {
  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.item.info")) {
  if (callNamed("textExists", lingoBinary("join", "product.", t_sItemId))) {
  var t_sTxt = callNamed("getText", lingoBinary("join", "product.", t_sItemId));
  } else {
  t_sTxt = callNamed("getText", lingoBinary("join", "item.", t_sItemId));
  }

  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.item.info"), t_sTxt)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.item.prize")) {
  var t_sPrice = t_rSelected.price;
  t_sTxt = lingoBinary("joinPad", t_sPrice, callNamed("getText", "cat.credits"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.item.prize"), t_sTxt)
  if (lingoBinary("gte", lingoBinary("sub", meProp(_me, "m_iBalance"), t_sPrice), 0)) {
  setMeProp(_me, "m_bEnoughCredits", 1);
  } else {
  setMeProp(_me, "m_bEnoughCredits", 0);
  }

  }

  var t_iPos = callMethod("findPos", t_rSelected, symbol("param"));
  if (lingoBinary("gt", t_iPos, 0)) {
  var t_mp_Params = t_rSelected.param;
  var t_iPos2 = callMethod("findPos", t_mp_Params, symbol("e"));
  if (lingoBinary("gt", t_iPos2, 0)) {
  var t_sExpiryDate = t_mp_Params.e;
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "singleuse"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "singleuse1"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "pintype.hd"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "pin.expirydate"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "expires.hd"), symbol("visible"), 1)
  var t_rImg = callNamed("getMember", "icon.singleuse").image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "singleuse"), t_rImg)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "pin.expirydate"), t_sExpiryDate)
  }

  } else {
  }

  callMethod("ShowSelected", _this)
  }

  }

}

