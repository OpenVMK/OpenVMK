// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageItems / _FurniPreviewReadyCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FurniPreviewReadyCbk(_me: LingoMe, _this: LingoValue, a_mp_iType_rThumb: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_rPrev = a_mp_iType_rThumb[1];
  if ((lingoTruthy(callNamed("voidp", t_rPrev)) ? 0 : 1)) {
  var t_iOffX = lingoBinary("div", lingoBinary("sub", meProp(_me, "m_rPrevBackImage").width, t_rPrev.width), 2);
  var t_iOffY = lingoBinary("div", lingoBinary("sub", meProp(_me, "m_rPrevBackImage").height, t_rPrev.height), 2);
  var t_rcDest = lingoBinary("add", t_rPrev.rect, new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]));
  if (lingoBinary("or", lingoBinary("gt", lingoBinary("sub", t_rcDest.bottom, t_rcDest.top), lingoBinary("sub", meProp(_me, "m_rPrevBackImage").rect.bottom, meProp(_me, "m_rPrevBackImage").rect.top)), lingoBinary("gt", lingoBinary("sub", t_rcDest.right, t_rcDest.left), lingoBinary("sub", meProp(_me, "m_rPrevBackImage").rect.right, meProp(_me, "m_rPrevBackImage").rect.left)))) {
  var t_iWidthOverflow = lingoBinary("sub", lingoBinary("sub", t_rcDest.right, t_rcDest.left), lingoBinary("sub", meProp(_me, "m_rPrevBackImage").rect.right, meProp(_me, "m_rPrevBackImage").rect.left));
  if (lingoBinary("gt", t_iWidthOverflow, 0)) {
  var tScale = lingoBinary("div", callNamed("float", lingoBinary("sub", meProp(_me, "m_rPrevBackImage").rect.right, meProp(_me, "m_rPrevBackImage").rect.left)), callNamed("float", lingoBinary("sub", t_rcDest.right, t_rcDest.left)));
  var t_rOffsetLeftCorner = new LingoList([t_rcDest.left, t_rcDest.top, t_rcDest.left, t_rcDest.top]);
  t_rcDest = lingoBinary("sub", t_rcDest, t_rOffsetLeftCorner);
  setThePropOf(t_rcDest, "top", callNamed("integer", lingoBinary("mul", t_rcDest.top, tScale)));
  setThePropOf(t_rcDest, "bottom", callNamed("integer", lingoBinary("mul", t_rcDest.bottom, tScale)));
  setThePropOf(t_rcDest, "left", callNamed("integer", lingoBinary("mul", t_rcDest.left, tScale)));
  setThePropOf(t_rcDest, "right", callNamed("integer", lingoBinary("mul", t_rcDest.right, tScale)));
  }

  var t_iHeightOverflow = lingoBinary("sub", lingoBinary("sub", t_rcDest.bottom, t_rcDest.top), lingoBinary("sub", meProp(_me, "m_rPrevBackImage").rect.bottom, meProp(_me, "m_rPrevBackImage").rect.top));
  if (lingoBinary("gt", t_iHeightOverflow, 0)) {
  tScale = lingoBinary("div", callNamed("float", lingoBinary("sub", meProp(_me, "m_rPrevBackImage").rect.bottom, meProp(_me, "m_rPrevBackImage").rect.top)), callNamed("float", lingoBinary("sub", t_rcDest.bottom, t_rcDest.top)));
  t_rOffsetLeftCorner = new LingoList([t_rcDest.left, t_rcDest.top, t_rcDest.left, t_rcDest.top]);
  t_rcDest = lingoBinary("sub", t_rcDest, t_rOffsetLeftCorner);
  setThePropOf(t_rcDest, "top", callNamed("integer", lingoBinary("mul", t_rcDest.top, tScale)));
  setThePropOf(t_rcDest, "bottom", callNamed("integer", lingoBinary("mul", t_rcDest.bottom, tScale)));
  setThePropOf(t_rcDest, "left", callNamed("integer", lingoBinary("mul", t_rcDest.left, tScale)));
  setThePropOf(t_rcDest, "right", callNamed("integer", lingoBinary("mul", t_rcDest.right, tScale)));
  }

  var t_iDestMidX = lingoBinary("div", meProp(_me, "m_rPrevBackImage").width, 2);
  var t_iDestMidY = lingoBinary("div", meProp(_me, "m_rPrevBackImage").height, 2);
  var t_rcMove = new LingoList([lingoBinary("sub", t_iDestMidX, lingoBinary("div", t_rcDest.right, 2)), lingoBinary("sub", t_iDestMidY, lingoBinary("div", t_rcDest.bottom, 2)), lingoBinary("sub", t_iDestMidX, lingoBinary("div", t_rcDest.right, 2)), lingoBinary("sub", t_iDestMidY, lingoBinary("div", t_rcDest.bottom, 2))]);
  t_rcDest = lingoBinary("add", t_rcDest, t_rcMove);
  }

  var t_rBack = callMethod("duplicate", meProp(_me, "m_rPrevBackImage"));
  setThePropOf(t_rBack, "useAlpha", 0);
  callMethod("copyPixels", t_rBack, t_rPrev, t_rcDest, t_rPrev.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.preview"), t_rBack)
  }

  }

}

