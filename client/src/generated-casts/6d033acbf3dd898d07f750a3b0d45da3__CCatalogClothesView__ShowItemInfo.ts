// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / ShowItemInfo

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
  var t_sItemId = callMethod("GetSelected", _this).code;
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
  var t_sPrice = callMethod("GetSelected", _this).price;
  t_sTxt = lingoBinary("joinPad", t_sPrice, callNamed("getText", "cat.credits"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.item.prize"), t_sTxt)
  if (lingoBinary("gte", lingoBinary("sub", meProp(_me, "m_iBalance"), t_sPrice), 0)) {
  setMeProp(_me, "m_bEnoughCredits", 1);
  } else {
  setMeProp(_me, "m_bEnoughCredits", 0);
  }

  }

  var t_iPos = callMethod("findPos", callMethod("GetSelected", _this), symbol("param"));
  if (lingoBinary("gt", t_iPos, 0)) {
  var t_mp_Params = callMethod("GetSelected", _this).param;
  var t_iPos2 = callMethod("findPos", t_mp_Params, symbol("e"));
  if (lingoBinary("gt", t_iPos2, 0)) {
  var t_sExpiryDate = t_mp_Params.e;
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "singleuse"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "singleuse1"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "pintype.hd"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "pin.expirydate"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "expires.hd"), symbol("visible"), 1)
  var t_Img = callNamed("getMember", "icon.singleuse").image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "singleuse"), t_Img)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "pin.expirydate"), t_sExpiryDate)
  }

  } else {
  }

  var t_iCode = callMethod("GetSelected", _this).code;
  var t_rInput = new LingoPropList([]);
  callMethod("setaProp", t_rInput, t_iCode, undefined)
  var t_mp_Data1 = new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("ShowSelected")]);
  callNamed("executeMessage", "GetClothPreview", t_rInput, t_mp_Data1)
  }

  }

}

