// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / ShowThumbs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowThumbs(_me: LingoMe, _this: LingoValue, a_mp_rItems: LingoValue) {
  setMeProp(_me, "m_iGridItemCount", a_mp_rItems.count);
  var t_mp_iType_rThumb = new LingoPropList([]);
  var t_iOffset = lingoBinary("add", meProp(_me, "m_iGridItemOffset"), 1);
  var t_iLast = callNamed("min", lingoBinary("add", t_iOffset, 9), a_mp_rItems.count);
  for (var i = t_iOffset; i <= t_iLast; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, a_mp_rItems[i].code, undefined)
  }

  setMeProp(_me, "m_bLoadingThumbnails", 1);
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWndObj"), "thumbs.grid.b"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  callNamed("executeMessage", meProp(_me, "m_sThumbRenderMessage"), t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_ThumbsRenderedCbk")]))
}

