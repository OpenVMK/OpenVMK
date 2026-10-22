// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePosters / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", a_mp_kType_mp_iRef_rItem);
  if (lingoBinary("eq", a_kAlteredCategory, symbol("posters"))) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_mp_iRef_rItem = callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("posters"));
  var t_iCount = t_mp_iRef_rItem.count;
  if (lingoBinary("gt", meProp(_me, "m_iCurrentPage"), 1)) {
  if (lingoBinary("gt", lingoBinary("add", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")), 1), t_iCount)) {
  setMeProp(_me, "m_iCurrentPage", 1);
  }

  } else {
  if (lingoBinary("lt", meProp(_me, "m_iCurrentPage"), 1)) {
  setMeProp(_me, "m_iCurrentPage", 1);
  }

  }

  var t_iFirst = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage")), 1);
  var t_iLast = callNamed("min", lingoBinary("mul", meProp(_me, "m_iCurrentPage"), meProp(_me, "m_iItemsPerPage")), t_iCount);
  var t_mp_iType_rThumb = new LingoPropList([]);
  for (var i = t_iFirst; i <= t_iLast; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, t_mp_iRef_rItem[i].code, undefined)
  }

  var m_bLoadingThumbs = 1;
  setMeProp(_me, "m_iLoadingRequest", lingoBinary("add", meProp(_me, "m_iLoadingRequest"), 1));
  callNamed("executeMessage", "GetPosterThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_PosterThumbsReadyCbk"), symbol("request"), meProp(_me, "m_iLoadingRequest")]))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.page.number"), lingoBinary("join", lingoBinary("join", meProp(_me, "m_iCurrentPage"), "/"), callNamed("max", lingoBinary("add", lingoBinary("div", t_iCount, meProp(_me, "m_iItemsPerPage")), lingoBinary("gt", lingoBinary("mod", t_iCount, meProp(_me, "m_iItemsPerPage")), 0)), 1)))
  }

  }

}

