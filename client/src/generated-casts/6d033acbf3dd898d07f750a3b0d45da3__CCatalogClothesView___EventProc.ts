// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElem) {
case "thumbs.grid.b":
  if ((lingoTruthy(meProp(_me, "m_bLoadingThumbnails")) ? 0 : 1)) {
  setMeProp(_me, "m_iDefinedPageToShow", undefined);
  setMeProp(_me, "m_iDefinedSubPageToShow", undefined);
  callMethod("MouseSelection", meProp(_me, "m_rGridRenderer"), a_vParam)
  callMethod("ShowItemInfo", _this)
  }

  break;
case "cat.list":
  setMeProp(_me, "m_iDefinedPageToShow", undefined);
  setMeProp(_me, "m_iDefinedSubPageToShow", undefined);
  callMethod("showAsActive", callMethod("GetComponents", meProp(_me, "m_ar_components")["cat.list"])[1], 0)
  var t_mpEvent = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("EventProc", meProp(_me, "m_ar_components")[a_sElem], a_vParam, t_mpEvent)
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWndObj"), a_sElem);
  var t_rImg = callMethod("render", meProp(_me, "m_ar_components")[a_sElem]);
  callMethod("feedImage", t_rClientElement, t_rImg)
  if (t_mpEvent.found) {
  switch (t_mpEvent.event) {
case "list.page":
  setMeProp(_me, "m_iDefinedPageToShow", callMethod("GetNode", t_mpEvent.client)[symbol("id")]);
  setMeProp(_me, "m_sActiveCategory", meProp(_me, "m_sSelectedTab"));
  break;
case "list.special":
  break;
  }

  setMeProp(_me, "m_iOffset", 0);
  }

  callMethod("_ChangeItemView", _this, undefined, t_mpEvent.event)
  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "cat.scrollbar")) {
  callMethod("setScrollOffset", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.scrollbar"), 0)
  }

  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "cat.buy.button":
  callMethod("BuyItems", _this)
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "cat.nextpage.button":
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mpCatalogData"), "category"))) ? 0 : 1)) {
  var t_iOffset = lingoBinary("add", meProp(_me, "m_iOffset"), 9);
  if (lingoBinary("gte", t_iOffset, meProp(_me, "m_mpCatalogData")["category"][1].count)) {
  t_iOffset = lingoBinary("sub", t_iOffset, 9);
  }

  setMeProp(_me, "m_iOffset", t_iOffset);
  callMethod("UpdatePreview", _this, meProp(_me, "m_mpCatalogData")["category"])
  }

  break;
case "cat.previouspage.button":
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mpCatalogData"), "category"))) ? 0 : 1)) {
  t_iOffset = lingoBinary("sub", meProp(_me, "m_iOffset"), 9);
  if (lingoBinary("lt", t_iOffset, 0)) {
  t_iOffset = 0;
  }

  setMeProp(_me, "m_iOffset", t_iOffset);
  callMethod("UpdatePreview", _this, meProp(_me, "m_mpCatalogData")["category"])
  }

  break;
  }

  }

}

