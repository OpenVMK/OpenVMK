// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAcquireItem / _PinThumbsReadyCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PinThumbsReadyCbk(_me: LingoMe, _this: LingoValue, a_mp_iType_rThumb: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iCount = a_mp_iType_rThumb.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rThumb = a_mp_iType_rThumb[i];
  var t_rItem = meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("pins")][i];
  var t_vParam = callMethod("getaProp", t_rItem, symbol("param"));
  if (callNamed("ilk", t_vParam, symbol("integer"))) {
  if (lingoBinary("gt", t_vParam, 0)) {
  var t_rStar = callNamed("getMember", "inv.pin.star.thumb").image;
  var t_rRect = t_rStar.rect;
  if (callNamed("voidp", t_rThumb)) {
  t_rThumb = callNamed("image", 1, 1, 32);
  } else {
  t_rThumb = callMethod("duplicate", t_rThumb);
  }

  for (var s = 1; s <= t_vParam; ++s) {
  callMethod("copyPixels", t_rThumb, t_rStar, lingoBinary("add", t_rRect, new LingoList([lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31, lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31])), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  }

  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), 100]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWindow"), "tra.objects"))
  callMethod("ShowSelected", _this)
  }

}

