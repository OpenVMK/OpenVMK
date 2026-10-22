// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / _RenderInvItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RenderInvItems(_me: LingoMe, _this: LingoValue, a_mp_iType_rImage: LingoValue, a_rCallback: LingoValue) {
  if (_this.valid) {
  if (lingoBinary("eq", a_rCallback[symbol("request")], meProp(_me, "m_iInvGridRequest"))) {
  callMethod("SetBufferElement", meProp(_me, "m_rInvGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rInvGridLoadAnim")))
  setMeProp(_me, "m_bLoadingInvThumbs", 0);
  if (lingoBinary("eq", callMethod("getaProp", a_rCallback, symbol("category")), meProp(_me, "m_kCategory"))) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iOffset = lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage"));
  var t_iCount = a_mp_iType_rImage.count;
  if (lingoBinary("eq", meProp(_me, "m_kCategory"), symbol("pins"))) {
  var t_rStar = callNamed("getMember", "inv.pin.star.thumb").image;
  var t_rRect = t_rStar.rect;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rThumb = a_mp_iType_rImage[i];
  var t_vParam = callMethod("getaProp", meProp(_me, "m_mp_iRef_rInvItems")[lingoBinary("add", t_iOffset, i)], symbol("param"));
  if (callNamed("ilk", t_vParam, symbol("integer"))) {
  if (lingoBinary("gt", t_vParam, 0)) {
  if ((lingoTruthy(callNamed("voidp", t_rThumb)) ? 0 : 1)) {
  t_rThumb = callMethod("duplicate", t_rThumb);
  for (var s = 1; s <= t_vParam; ++s) {
  callMethod("copyPixels", t_rThumb, t_rStar, lingoBinary("add", t_rRect, new LingoList([lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31, lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31])), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  }

  }

  if (callMethod("findPos", meProp(_me, "m_ar_NonTradableItems"), callMethod("getPropAt", a_mp_iType_rImage, i))) {
  var t_iBlend = 50;
  } else {
  t_iBlend = 100;
  }

  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), t_iBlend, symbol("items"), meProp(_me, "m_mp_iRef_rInvItems")[lingoBinary("add", t_iOffset, i)][symbol("items")]]))
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "m_kCategory"), symbol("clothes"))) {
  if (meProp(_me, "m_bOppositeGender")) {
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iType = callMethod("getPropAt", a_mp_iType_rImage, i);
  if (lingoBinary("or", callMethod("findPos", meProp(_me, "m_ar_NonTradableItems"), t_iType), lingoBinary("lt", t_iType, 40000))) {
  t_iBlend = 50;
  } else {
  t_iBlend = 100;
  }

  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), a_mp_iType_rImage[i], symbol("blend"), t_iBlend, symbol("items"), meProp(_me, "m_mp_iRef_rInvItems")[lingoBinary("add", t_iOffset, i)][symbol("items")]]))
  }

  } else {
  for (var i = 1; i <= t_iCount; ++i) {
  if (callMethod("findPos", meProp(_me, "m_ar_NonTradableItems"), callMethod("getPropAt", a_mp_iType_rImage, i))) {
  t_iBlend = 50;
  } else {
  t_iBlend = 100;
  }

  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), a_mp_iType_rImage[i], symbol("blend"), t_iBlend, symbol("items"), meProp(_me, "m_mp_iRef_rInvItems")[lingoBinary("add", t_iOffset, i)][symbol("items")]]))
  }

  }

  } else {
  for (var i = 1; i <= t_iCount; ++i) {
  if (callMethod("findPos", meProp(_me, "m_ar_NonTradableItems"), callMethod("getPropAt", a_mp_iType_rImage, i))) {
  t_iBlend = 50;
  } else {
  t_iBlend = 100;
  }

  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), a_mp_iType_rImage[i], symbol("blend"), t_iBlend, symbol("items"), meProp(_me, "m_mp_iRef_rInvItems")[lingoBinary("add", t_iOffset, i)][symbol("items")]]))
  }

  }

  }

  callMethod("render", meProp(_me, "m_rGridInvItems"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWindow"), "tra.objects"))
  }

  }

  }

  }

}

