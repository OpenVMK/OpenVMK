// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / _EventProc

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
  setMeProp(_me, "m_iDefinedPageToShow", undefined);
  setMeProp(_me, "m_iDefinedSubPageToShow", undefined);
  callMethod("ShowItemInfo", _this, a_vParam)
  break;
case "cat.list":
  setMeProp(_me, "m_iDefinedPageToShow", undefined);
  setMeProp(_me, "m_iDefinedSubPageToShow", undefined);
  var t_mpEvent = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("EventProc", meProp(_me, "m_ar_components")[a_sElem], a_vParam, t_mpEvent)
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWndObj"), a_sElem);
  if (lingoBinary("gt", meProp(_me, "m_iShopsFound"), 0)) {
  var t_rImg = callMethod("render", meProp(_me, "m_ar_components")[a_sElem]);
  callMethod("feedImage", t_rClientElement, t_rImg)
  } else {
  callMethod("FeedShopsMissingTextImage", callMethod("getInterface", callNamed("getThread", "Catalog")), t_rClientElement)
  }

  if (t_mpEvent.found) {
  switch (t_mpEvent.event) {
case "list.page":
  setMeProp(_me, "m_iDefinedPageToShow", callMethod("GetNode", t_mpEvent.client)[symbol("id")]);
  setMeProp(_me, "m_iDefinedSubPageToShow", callMethod("getaProp", callMethod("GetNode", t_mpEvent.client), "Specials!")[symbol("id")]);
  setMeProp(_me, "m_iLand", callMethod("GetNode", t_mpEvent.client)[symbol("id")]);
  setMeProp(_me, "m_sActiveCategory", meProp(_me, "m_sSelectedTab"));
  setMeProp(_me, "m_sSpecialCategory", "Specials!");
  break;
  }

  }

  setMeProp(_me, "m_iGridItemOffset", 0);
  callMethod("select", meProp(_me, "m_rGridRenderer"), 1)
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
  setMeProp(_me, "m_iGridItemOffset", lingoBinary("add", meProp(_me, "m_iGridItemOffset"), 9));
  if (lingoBinary("gte", meProp(_me, "m_iGridItemOffset"), meProp(_me, "m_mpCatalogData")["category"][1].count)) {
  setMeProp(_me, "m_iGridItemOffset", lingoBinary("sub", meProp(_me, "m_iGridItemOffset"), 9));
  }

  callMethod("Unselect", meProp(_me, "m_rGridRenderer"))
  callMethod("ShowThumbs", _this, meProp(_me, "m_mpCatalogData")["category"][1])
  }

  break;
case "cat.previouspage.button":
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mpCatalogData"), "category"))) ? 0 : 1)) {
  setMeProp(_me, "m_iGridItemOffset", lingoBinary("sub", meProp(_me, "m_iGridItemOffset"), 9));
  if (lingoBinary("lt", meProp(_me, "m_iGridItemOffset"), 0)) {
  setMeProp(_me, "m_iGridItemOffset", 0);
  }

  callMethod("Unselect", meProp(_me, "m_rGridRenderer"))
  callMethod("ShowThumbs", _this, meProp(_me, "m_mpCatalogData")["category"][1])
  }

  break;
  }

  }

}

