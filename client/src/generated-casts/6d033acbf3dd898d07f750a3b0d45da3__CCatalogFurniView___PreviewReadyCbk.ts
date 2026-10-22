// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogFurniView / _PreviewReadyCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PreviewReadyCbk(_me: LingoMe, _this: LingoValue, a_iCode_rThumb: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  var t_rPrev = a_iCode_rThumb[1];
  if ((lingoTruthy(callNamed("voidp", t_rPrev)) ? 0 : 1)) {
  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox.b").image);
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
  callMethod("copyPixels", t_rBack, t_rPrev, t_rcDest, t_rPrev.rect)
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.items.preview"), t_rBack)
  } else {
  t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox.b").image);
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWndObj"), "cat.items.preview"), t_rBack)
  }

  }

}

