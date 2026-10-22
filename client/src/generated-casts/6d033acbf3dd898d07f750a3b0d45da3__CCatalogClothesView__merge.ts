// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWndObj", a_rWindow);
  callMethod("merge", meProp(_me, "m_rWndObj"), "vmk_cat_items.window")
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "singleuse"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "singleuse1"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "pintype.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "pin.expirydate"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "expires.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWndObj"), "pintype.regular"), symbol("visible"), 0)
  if (lingoBinary("gt", meProp(_me, "m_ar_components").count, 0)) {
  var t_rImg = callMethod("render", meProp(_me, "m_ar_components")["cat.list"]);
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.list"), t_rImg)
  }

  if (lingoBinary("neq", meProp(_me, "m_mpThumbCache"), undefined)) {
  callMethod("ThumbsLoaded", _this, meProp(_me, "m_mpThumbCache"))
  var t_iCode = callMethod("GetSelected", _this).code;
  var t_rInput = new LingoPropList([]);
  callMethod("setaProp", t_rInput, t_iCode, undefined)
  var t_mp_Data1 = new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("ShowSelected")]);
  callNamed("executeMessage", "GetClothPreview", t_rInput, t_mp_Data1)
  }

  callMethod("ShowLandLogo", _this)
  return;
}

