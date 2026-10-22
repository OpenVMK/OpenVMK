// d0e535313898676eb605277339b50f27.cct / CMagicMenu / _ThumbsRenderedCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ThumbsRenderedCbk(_me: LingoMe, _this: LingoValue, a_mp_iRef_rThumb: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  var t_iCount = a_mp_iRef_rThumb.count;
  var t_mp_iRef_rThumb = new LingoPropList([]);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rThumb = a_mp_iRef_rThumb[i];
  if (callNamed("voidp", t_rThumb)) {
  t_rThumb = callNamed("image", 1, 1, 32);
  } else {
  t_rThumb = callMethod("duplicate", a_mp_iRef_rThumb[i]);
  }

  var t_rItem = meProp(_me, "m_mp_FxList")[i];
  var t_iLevel = t_rItem.level;
  var t_rcOff = callNamed("rect", 0, 0, 0, 0);
  if (lingoBinary("gt", t_iLevel, 0)) {
  var t_rStar = callNamed("getMember", "inv.pin.star.thumb").image;
  var t_rRect = t_rStar.rect;
  for (var s = 1; s <= t_iLevel; ++s) {
  callMethod("copyPixels", t_rThumb, t_rStar, lingoBinary("add", lingoBinary("add", t_rRect, t_rcOff), new LingoList([lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31, lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31])), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  t_rItem = meProp(_me, "m_mp_FxList")[i];
  if (lingoBinary("gt", t_rItem.available, 0)) {
  var t_rImg = callMethod("duplicate", t_rThumb);
  var t_iSourceImgH = t_rImg.height;
  var t_iDestImgH = t_rImg.height;
  var t_iMArgin = lingoBinary("div", lingoBinary("sub", t_rImg.height, meProp(_me, "m_rWaitImage").height), 2);
  callMethod("copyPixels", t_rImg, meProp(_me, "m_rWaitImage"), callNamed("rect", t_iMArgin, t_iMArgin, lingoBinary("sub", t_iDestImgH, t_iMArgin), lingoBinary("sub", t_iDestImgH, t_iMArgin)), meProp(_me, "m_rWaitImage").rect, new LingoPropList([symbol("ink"), 0]))
  t_rThumb = t_rImg;
  }

  callMethod("addProp", t_mp_iRef_rThumb, t_rItem.ItemId, new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), 100]))
  }

  callMethod("render", meProp(_me, "m_rGrid"), t_mp_iRef_rThumb, callMethod("getElement", t_rWnd, "magics.grid"))
  }

}

