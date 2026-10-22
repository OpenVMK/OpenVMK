// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogFurniView / _ChangeItemView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChangeItemView(_me: LingoMe, _this: LingoValue, a_Pnt: LingoValue, a_kEvent: LingoValue) {
  setMeProp(_me, "m_iGridItemOffset", 0);
  if (lingoBinary("eq", a_kEvent, "list.special")) {
  callMethod("showDefinedCatalogPage", _this, new LingoList([meProp(_me, "m_iDefinedPageToShow"), meProp(_me, "m_iDefinedSubPageToShow")]))
  }

  if (lingoBinary("eq", a_kEvent, "list.page")) {
  setMeProp(_me, "m_iDefinedSubPageToShow", undefined);
  }

  callMethod("FindSubPageAndRequest", _this, meProp(_me, "m_iLand"), meProp(_me, "m_mpCatalogData")["index"])
  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.items.preview")) {
  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox.b").image);
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.items.preview"), t_rBack)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.item.info")) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.item.info"), "")
  }

  if (lingoBinary("gt", meProp(_me, "m_iShopsFound"), 0)) {
  callMethod("ShowLandLogo", _this)
  }

  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.item.prize"), "")
}

