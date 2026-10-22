// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / _ChangeItemView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChangeItemView(_me: LingoMe, _this: LingoValue, a_Pnt: LingoValue, a_kEvent: LingoValue) {
  var t_Img = undefined;
  if (lingoBinary("eq", a_kEvent, "list.page")) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 16, new LingoPropList([symbol("int"), meProp(_me, "m_iDefinedPageToShow")]))
  }

  callMethod("construct", meProp(_me, "m_rGridRenderer"))
  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.items.preview")) {
  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox.b").image);
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.items.preview"), t_rBack)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.item.info")) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.item.info"), "")
  }

  callMethod("ShowLandLogo", _this)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.item.prize"), "")
}

