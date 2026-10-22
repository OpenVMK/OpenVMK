// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / _RenderPinThumbnailDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RenderPinThumbnailDetails(_me: LingoMe, _this: LingoValue, a_rProps: LingoValue, a_rThumb: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_rThumb)) ? 0 : 1)) {
  var t_iLevel = a_rProps[symbol("level")];
  if (lingoBinary("gt", t_iLevel, 0)) {
  var t_rStar = callNamed("getMember", "inv.pin.star.thumb").image;
  var t_rRect = t_rStar.rect;
  for (var s = 1; s <= t_iLevel; ++s) {
  callMethod("copyPixels", a_rThumb, t_rStar, lingoBinary("add", t_rRect, new LingoList([lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31, lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31])), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  } else {
  if (lingoBinary("lt", t_iLevel, 0)) {
  setThePropOf(a_rThumb, "useAlpha", 0);
  var t_sLevel = callNamed("string", callNamed("abs", t_iLevel));
  var t_rText = callMethod("render", callNamed("getWriter", meProp(_me, "m_sWriterB")), t_sLevel);
  t_rRect = t_rText.rect;
  var t_rcItemSize = a_rThumb.rect;
  var t_rcOff = callNamed("rect", 0, 0, 0, 0);
  var t_rcRightCorner = lingoBinary("add", t_rcOff, new LingoList([lingoBinary("add", t_rcItemSize[3], 7), t_rcItemSize[4], lingoBinary("add", t_rcItemSize[3], 7), t_rcItemSize[4]]));
  var t_rcTextCorner = new LingoList([-float(t_rRect[3]), -float(t_rRect[4]), -float(t_rRect[3]), -float(t_rRect[4])]);
  callMethod("copyPixels", a_rThumb, t_rText, lingoBinary("add", lingoBinary("add", t_rRect, t_rcRightCorner), t_rcTextCorner), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  t_rText = callMethod("render", callNamed("getWriter", meProp(_me, "m_sWriterA")), t_sLevel);
  t_rRect = t_rText.rect;
  t_rcTextCorner = lingoBinary("add", t_rcTextCorner, new LingoList([-float(1), -float(1), -float(1), -float(1)]));
  callMethod("copyPixels", a_rThumb, t_rText, lingoBinary("add", lingoBinary("add", t_rRect, t_rcRightCorner), t_rcTextCorner), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  }

}

