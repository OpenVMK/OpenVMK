// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / UpdateIndex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateIndex(_me: LingoMe, _this: LingoValue, a_mpItemList: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_ar_components").count, 0)) {
  callMethod("createComponentWindow", _this, a_mpItemList)
  }

  if (callNamed("listp", a_mpItemList)) {
  var t_bStateOn = 0;
  for (var h = 4; h <= a_mpItemList["Clothing"].count; ++h) {
  if (a_mpItemList["Clothing"][h].state) {
  t_bStateOn = 1;
  }

  }

  callMethod("ShowLandLogo", _this)
  if ((lingoTruthy(t_bStateOn) ? 0 : 1)) {
  setMeProp(_me, "m_iDefinedPageToShow", a_mpItemList["Clothing"][4][symbol("id")]);
  callMethod("_ChangeItemView", _this, undefined, "list.page")
  callMethod("showAsActive", callMethod("GetComponents", meProp(_me, "m_ar_components")["cat.list"])[1], 1)
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.list");
  var t_rImg = callMethod("render", meProp(_me, "m_ar_components")["cat.list"]);
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  }

  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.items.preview")) {
  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox.b").image);
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.items.preview"), t_rBack)
  }

}

