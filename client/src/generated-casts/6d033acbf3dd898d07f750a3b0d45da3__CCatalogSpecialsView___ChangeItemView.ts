// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / _ChangeItemView

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
  callMethod("showDefinedCatalogPage", _this, new LingoList([meProp(_me, "m_iDefinedPageToShow"), meProp(_me, "m_iDefinedSubPageToShow")]))
  if (lingoBinary("eq", a_kEvent, "list.page")) {
  }

  callMethod("FindSubPageAndRequest", _this, meProp(_me, "m_iLand"), meProp(_me, "m_mpCatalogData")["index"])
  if (lingoBinary("and", callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.items.preview"), lingoBinary("gt", meProp(_me, "m_iShopsFound"), 0))) {
  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox.b").image);
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.items.preview"), t_rBack)
  }

  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.item.info")) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.item.info"), "")
  }

  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "land.logo")) {
  var t_rImgLogo = callMethod("getElement", meProp(_me, "m_rWndObj"), "land.logo");
  var t_iLand = meProp(_me, "m_iLand");
  if (lingoBinary("eq", t_iLand, 7)) {
  t_iLand = 6;
  }

  var t_rImg = callNamed("member", callNamed("getmemnum", lingoBinary("join", "logo.", t_iLand))).image;
  if (lingoBinary("and", lingoBinary("neq", callMethod("getProperty", t_rImgLogo, symbol("image")), t_rImg), (lingoTruthy(callNamed("voidp", t_rImg)) ? 0 : 1))) {
  callMethod("feedImage", t_rImgLogo, t_rImg)
  }

  }

  }

  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.item.prize"), "")
}

