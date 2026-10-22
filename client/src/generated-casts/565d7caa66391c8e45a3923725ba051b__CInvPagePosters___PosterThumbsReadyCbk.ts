// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePosters / _PosterThumbsReadyCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PosterThumbsReadyCbk(_me: LingoMe, _this: LingoValue, a_mp_iType_rThumb: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iCount = a_mp_iType_rThumb.count;
  var t_iOffset = lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage"));
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rThumb = a_mp_iType_rThumb[i];
  var t_rItem = meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("posters")][lingoBinary("add", t_iOffset, i)];
  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), 100, symbol("items"), t_rItem[symbol("items")], symbol("group"), t_rItem[symbol("group")]]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWindow"), "thumbs.grid.b"))
  callMethod("ShowSelected", _this)
  }

}

