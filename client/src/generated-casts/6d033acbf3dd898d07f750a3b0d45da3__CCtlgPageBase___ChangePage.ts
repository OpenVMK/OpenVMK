// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCtlgPageBase / _ChangePage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChangePage(_me: LingoMe, _this: LingoValue, a_kPage: LingoValue, a_sPageToShow: LingoValue, a_arExtra: LingoValue) {
  setMeProp(_me, "m_iCurPageName", a_kPage);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("Purge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  }

  switch (a_kPage) {
case symbol("furniture"):
  var t_rCls = new LingoList(["CCatalogFurniView"]);
  var t_sTab = "furniture";
  break;
case symbol("rooms"):
  t_rCls = new LingoList(["CCatalogRoomsView"]);
  t_sTab = "rooms";
  break;
case symbol("pins"):
  t_rCls = new LingoList(["CCatalogFurniView", "CCatalogPinsView"]);
  t_sTab = "pins";
  break;
case symbol("clothes"):
  t_rCls = new LingoList(["CCatalogClothesView"]);
  t_sTab = "clothes";
  break;
case symbol("posters"):
  t_rCls = new LingoList(["CCatalogFurniView"]);
  t_sTab = "posters";
  break;
case symbol("specials"):
  t_rCls = new LingoList(["CCatalogSpecialsView"]);
  t_sTab = "specials";
  break;
  // HAND-CORRECTED: decompiler turned the case's `otherwise:` error into an
  // UNCONDITIONAL `return error(...)` before the page-build, leaving the Shop
  // panel blank (see CInvPageBase._ChangePage for the full analysis and the
  // .lsasm evidence). Restored as the default case; execution continues.
  // ⚠ RE-APPLY AFTER ANY REGENERATION of client/src/generated-casts.
default:
  callNamed("error", _this, "Unknown Catalog page!", symbol("_ChangePage"))
  break;
  }

  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "cat.tab.furniture.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "cat.tab.rooms.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "cat.tab.pins.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "cat.tab.clothes.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "cat.tab.posters.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "cat.tab.specials.active"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "cat.tab.", t_sTab), ".active")))
  if (lingoBinary("eq", callMethod("getaProp", meProp(_me, "m_mp_rPageObjects"), a_kPage), undefined)) {
  setMeProp(_me, "m_rCurPageObj", callNamed("createObject", callNamed("getUniqueID"), t_rCls));
  callMethod("SetCategory", meProp(_me, "m_rCurPageObj"), t_sTab)
  callMethod("setaProp", meProp(_me, "m_mp_rPageObjects"), a_kPage, meProp(_me, "m_rCurPageObj"))
  } else {
  setMeProp(_me, "m_rCurPageObj", meProp(_me, "m_mp_rPageObjects")[a_kPage]);
  }

  }

  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  setMeProp(_me, "m_kCurPage", a_kPage);
  callMethod("merge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  var tCursors = new LingoPropList([]);
  callMethod("getRollOverCursors", _this, meProp(_me, "m_rCurPageObj").m_rWndObj, tCursors)
  callMethod("forceRollOverCursors", _this, meProp(_me, "m_rCurPageObj").m_rWndObj, 4)
  if (lingoBinary("eq", a_kPage, symbol("rooms"))) {
  callMethod("SaveRooms", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_mp_RoomDataList"))
  callNamed("call", symbol("update"), new LingoList([meProp(_me, "m_rCurPageObj")]), meProp(_me, "m_mp_CatalogData"))
  } else {
  if (callNamed("voidp", a_sPageToShow)) {
  setThePropOf(meProp(_me, "m_rCurPageObj"), "m_iDefinedPageToShow", undefined);
  callNamed("call", symbol("update"), new LingoList([meProp(_me, "m_rCurPageObj")]), meProp(_me, "m_mp_CatalogData"))
  } else {
  callNamed("call", symbol("update"), new LingoList([meProp(_me, "m_rCurPageObj")]), a_arExtra, a_sPageToShow)
  callNamed("call", symbol("update"), new LingoList([meProp(_me, "m_rCurPageObj")]), meProp(_me, "m_mp_CatalogData"))
  }

  }

  callMethod("setRollOverCursors", _this, meProp(_me, "m_rCurPageObj").m_rWndObj, tCursors)
  setMeProp(_me, "m_bReady", 1);
  } else {
  setMeProp(_me, "m_kCurPage", symbol("closed"));
  return callNamed("error", _this, "Failed to initialize inventory page!", symbol("_ChangePage"));
  }

}

