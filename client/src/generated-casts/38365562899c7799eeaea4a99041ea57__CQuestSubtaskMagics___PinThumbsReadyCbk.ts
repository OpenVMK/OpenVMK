// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMagics / _PinThumbsReadyCbk

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
  var t_rStar = callNamed("getMember", "inv.pin.star.thumb").image;
  var t_rRect = t_rStar.rect;
  if (callNamed("voidp", t_rThumb)) {
  t_rThumb = callNamed("image", 1, 1, 32);
  } else {
  t_rThumb = callMethod("duplicate", t_rThumb);
  }

  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), 100]))
  }

  callMethod("render", meProp(_me, "m_rGrid"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWindow"), "quest.magics"))
  }

}

