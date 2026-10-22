// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / _PreviewReadyCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PreviewReadyCbk(_me: LingoMe, _this: LingoValue, a_mp_iRef_rImage: LingoValue, a_rCallback: LingoValue) {
  var t_rPrev = a_mp_iRef_rImage[1];
  if (callNamed("voidp", t_rPrev)) {
  t_rPrev = callNamed("image", 1, 1, 32);
  }

  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox").image);
  var t_iOffX = lingoBinary("div", lingoBinary("sub", t_rBack.width, t_rPrev.width), 2);
  var t_iOffY = lingoBinary("div", lingoBinary("sub", t_rBack.height, t_rPrev.height), 2);
  var t_rcDest = lingoBinary("add", t_rPrev.rect, new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]));
  if (lingoBinary("or", lingoBinary("gt", lingoBinary("sub", t_rcDest.bottom, t_rcDest.top), lingoBinary("sub", t_rBack.rect.bottom, t_rBack.rect.top)), lingoBinary("gt", lingoBinary("sub", t_rcDest.right, t_rcDest.left), lingoBinary("sub", t_rBack.rect.right, t_rBack.rect.left)))) {
  var tHeightOverflow = lingoBinary("sub", lingoBinary("sub", t_rcDest.bottom, t_rcDest.top), lingoBinary("sub", t_rBack.rect.bottom, t_rBack.rect.top));
  var tWidthOverflow = lingoBinary("sub", lingoBinary("sub", t_rcDest.right, t_rcDest.left), lingoBinary("sub", t_rBack.rect.right, t_rBack.rect.left));
  if (lingoBinary("gt", tWidthOverflow, 0)) {
  var tScale = lingoBinary("div", callNamed("float", lingoBinary("sub", t_rBack.rect.right, t_rBack.rect.left)), callNamed("float", lingoBinary("sub", t_rcDest.right, t_rcDest.left)));
  var tOffsetLeftCorner = new LingoList([t_rcDest.left, t_rcDest.top, t_rcDest.left, t_rcDest.top]);
  t_rcDest = lingoBinary("sub", t_rcDest, tOffsetLeftCorner);
  setThePropOf(t_rcDest, "top", callNamed("integer", lingoBinary("mul", t_rcDest.top, tScale)));
  setThePropOf(t_rcDest, "bottom", callNamed("integer", lingoBinary("mul", t_rcDest.bottom, tScale)));
  setThePropOf(t_rcDest, "left", callNamed("integer", lingoBinary("mul", t_rcDest.left, tScale)));
  setThePropOf(t_rcDest, "right", callNamed("integer", lingoBinary("mul", t_rcDest.right, tScale)));
  }

  tHeightOverflow = lingoBinary("sub", lingoBinary("sub", t_rcDest.bottom, t_rcDest.top), lingoBinary("sub", t_rBack.rect.bottom, t_rBack.rect.top));
  if (lingoBinary("gt", tHeightOverflow, 0)) {
  tScale = lingoBinary("div", callNamed("float", lingoBinary("sub", t_rBack.rect.bottom, t_rBack.rect.top)), callNamed("float", lingoBinary("sub", t_rcDest.bottom, t_rcDest.top)));
  tOffsetLeftCorner = new LingoList([t_rcDest.left, t_rcDest.top, t_rcDest.left, t_rcDest.top]);
  t_rcDest = lingoBinary("sub", t_rcDest, tOffsetLeftCorner);
  setThePropOf(t_rcDest, "top", callNamed("integer", lingoBinary("mul", t_rcDest.top, tScale)));
  setThePropOf(t_rcDest, "bottom", callNamed("integer", lingoBinary("mul", t_rcDest.bottom, tScale)));
  setThePropOf(t_rcDest, "left", callNamed("integer", lingoBinary("mul", t_rcDest.left, tScale)));
  setThePropOf(t_rcDest, "right", callNamed("integer", lingoBinary("mul", t_rcDest.right, tScale)));
  }

  var t_iDestMidX = lingoBinary("div", t_rBack.width, 2);
  var t_iDestMidY = lingoBinary("div", t_rBack.height, 2);
  var t_rcMove = new LingoList([lingoBinary("sub", t_iDestMidX, lingoBinary("div", t_rcDest.right, 2)), lingoBinary("sub", t_iDestMidY, lingoBinary("div", t_rcDest.bottom, 2)), lingoBinary("sub", t_iDestMidX, lingoBinary("div", t_rcDest.right, 2)), lingoBinary("sub", t_iDestMidY, lingoBinary("div", t_rcDest.bottom, 2))]);
  t_rcDest = lingoBinary("add", t_rcDest, t_rcMove);
  }

  setThePropOf(t_rBack, "useAlpha", 0);
  callMethod("copyPixels", t_rBack, t_rPrev, t_rcDest, t_rPrev.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  var t_iStars = callMethod("getaProp", a_rCallback, symbol("param"));
  if (t_iStars) {
  var t_rStar = callNamed("getMember", "inv.pin.star.prev").image;
  var t_rRect = t_rStar.rect;
  var t_rcOff = new LingoList([20, 115, 20, 115]);
  for (var s = 1; s <= t_iStars; ++s) {
  callMethod("copyPixels", t_rBack, t_rStar, lingoBinary("add", lingoBinary("add", t_rRect, t_rcOff), new LingoList([lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 2)), 3), 0, lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 2)), 3), 0])), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.preview"), t_rBack)
}

