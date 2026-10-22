// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogFurniView / _ThumbsRenderedCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ThumbsRenderedCbk(_me: LingoMe, _this: LingoValue, a_mp_iCode_rThumb: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  if (callNamed("objectp", callNamed("getWindow", callMethod("getID", meProp(_me, "m_rWndObj"))))) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  setMeProp(_me, "m_bLoadingThumbnails", 0);
  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iCount = a_mp_iCode_rThumb.count;
  var m_mpThumbCache = callMethod("duplicate", a_mp_iCode_rThumb);
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mpCatalogData"), "category"))) ? 0 : 1)) {
  var t_mpCategory = meProp(_me, "m_mpCatalogData")["category"][1];
  } else {
  t_mpCategory = new LingoPropList([]);
  }

  var t_mpParams = new LingoPropList([]);
  for (var t_mpItem of t_mpCategory.toArray()) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_mpItem, symbol("param")))) ? 0 : 1)) {
  var t_iCode = t_mpItem[symbol("code")];
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_mpItem[symbol("param")], "ic"))) ? 0 : 1)) {
  t_iCode = callMethod("getaProp", t_mpItem[symbol("param")], "ic");
  }

  callMethod("addProp", t_mpParams, callNamed("integer", t_iCode), callMethod("duplicate", t_mpItem[symbol("param")]))
  }

  }

  for (var i = 1; i <= a_mp_iCode_rThumb.count; ++i) {
  var t_rThumb = a_mp_iCode_rThumb[i];
  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), 100, symbol("params"), callMethod("getaProp", t_mpParams, callMethod("getPropAt", a_mp_iCode_rThumb, i))]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWndObj"), "thumbs.grid.b"))
  setMeProp(_me, "m_bGridRendered", 1);
  }

  }

  }

}

