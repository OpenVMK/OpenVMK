// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / _RefreshItemList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RefreshItemList(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", a_mp_kType_mp_iRef_rItem);
  for (var t_rItem of meProp(_me, "m_mp_iRef_rOwnItems").toArray()) {
  var t_iRef = t_rItem.ref;
  var t_iCat = t_rItem.cat;
  var t_iCode = t_rItem.code;
  switch (t_iCat) {
case 1:
  var t_kType = symbol("items");
  break;
case 2:
  t_kType = symbol("clothes");
  break;
case 3:
  t_kType = symbol("posters");
  break;
case 4:
  t_kType = symbol("pins");
  break;
  }

  continue;
  var t_rItemsByType = callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem"), t_kType);
  callMethod("deleteProp", t_rItemsByType, t_iRef)
  t_rItemsByType = callMethod("getaProp", a_mp_kType_mp_iRef_rItem, t_kType);
  callMethod("deleteProp", t_rItemsByType, t_iRef)
  }

  if (lingoBinary("eq", a_kAlteredCategory, meProp(_me, "m_kCategory"))) {
  setMeProp(_me, "m_mp_iRef_rInvItems", callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem"), meProp(_me, "m_kCategory")));
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  setMeProp(_me, "m_bLoadingInvThumbs", 1);
  callMethod("SetBufferElement", meProp(_me, "m_rInvGridLoadAnim"), callMethod("getElement", meProp(_me, "m_rWindow"), "tra.objects"))
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rInvGridLoadAnim")))
  var t_mp_iType_rThumb = new LingoPropList([]);
  var t_iCount = meProp(_me, "m_mp_iRef_rInvItems").count;
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
  for (var i = t_iFirst; i <= t_iLast; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, meProp(_me, "m_mp_iRef_rInvItems")[i].code, undefined)
  }

  setMeProp(_me, "m_iInvGridRequest", lingoBinary("add", meProp(_me, "m_iInvGridRequest"), 1));
  callNamed("executeMessage", "GetMixedThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_RenderInvItems"), symbol("category"), meProp(_me, "m_kCategory"), symbol("request"), meProp(_me, "m_iInvGridRequest")]))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.page.number"), lingoBinary("join", lingoBinary("join", meProp(_me, "m_iCurrentPage"), "/"), callNamed("max", lingoBinary("add", lingoBinary("div", t_iCount, meProp(_me, "m_iItemsPerPage")), lingoBinary("gt", lingoBinary("mod", t_iCount, meProp(_me, "m_iItemsPerPage")), 0)), 1)))
  }

  }

}

