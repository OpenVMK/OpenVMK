// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / _ThumbsRenderedCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ThumbsRenderedCbk(_me: LingoMe, _this: LingoValue, a_mp_iCode_rThumb: LingoValue) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  setMeProp(_me, "m_bLoadingThumbnails", 0);
  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iCount = a_mp_iCode_rThumb.count;
  var m_mpThumbCache = callMethod("duplicate", a_mp_iCode_rThumb);
  for (var t_rThumb of a_mp_iCode_rThumb.toArray()) {
  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), 100]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWndObj"), "thumbs.grid.b"))
  setMeProp(_me, "m_bGridRendered", 1);
  var t_iTotalPages = lingoBinary("add", lingoBinary("div", lingoBinary("sub", meProp(_me, "m_iGridItemCount"), 1), 9), 1);
  var t_iCurrentPage = lingoBinary("add", lingoBinary("div", meProp(_me, "m_iGridItemOffset"), 9), 1);
  var t_sText = callNamed("getText", "cat.page", "");
  t_sText = callNamed("replaceChunks", t_sText, "%P", callNamed("string", t_iCurrentPage));
  t_sText = callNamed("replaceChunks", t_sText, "%C", callNamed("string", t_iTotalPages));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWndObj"), "catalog.itemspage"), t_sText)
  }

}

