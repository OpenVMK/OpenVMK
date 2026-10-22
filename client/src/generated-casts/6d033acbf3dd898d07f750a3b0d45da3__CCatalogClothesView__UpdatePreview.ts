// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / UpdatePreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdatePreview(_me: LingoMe, _this: LingoValue, a_mpItemList: LingoValue) {
  if (callNamed("listp", a_mpItemList)) {
  var t_iTotalPages = lingoBinary("add", lingoBinary("div", lingoBinary("sub", a_mpItemList[1].count, 1), 9), 1);
  var t_iCurrentPage = lingoBinary("add", lingoBinary("div", meProp(_me, "m_iOffset"), 9), 1);
  var t_iFrom = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iCurrentPage, 1), 9), 1);
  var t_iTo = lingoBinary("mul", t_iCurrentPage, 9);
  if (lingoBinary("lt", t_iFrom, 1)) {
  t_iFrom = 1;
  }

  if (lingoBinary("gt", t_iTo, a_mpItemList[1].count)) {
  t_iTo = a_mpItemList[1].count;
  }

  var t_mp_ThumbData = new LingoPropList([]);
  var t_mp_data = a_mpItemList[1];
  for (var e = t_iFrom; e <= t_iTo; ++e) {
  callMethod("addProp", t_mp_ThumbData, t_mp_data[e].code, undefined)
  }

  setMeProp(_me, "m_bLoadingThumbnails", 1);
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWndObj"), "thumbs.grid.b"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  var t_mp_Data1 = new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("ThumbsLoaded")]);
  callNamed("executeMessage", "GetClothThumbnail", t_mp_ThumbData, t_mp_Data1)
  t_iTotalPages = lingoBinary("add", lingoBinary("div", lingoBinary("sub", a_mpItemList[1].count, 1), 9), 1);
  t_iCurrentPage = lingoBinary("add", lingoBinary("div", meProp(_me, "m_iOffset"), 9), 1);
  var t_sText = callNamed("getText", "cat.page", "");
  t_sText = callNamed("replaceChunks", t_sText, "%P", callNamed("string", t_iCurrentPage));
  t_sText = callNamed("replaceChunks", t_sText, "%C", callNamed("string", t_iTotalPages));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "catalog.itemspage"), t_sText)
  }

}

