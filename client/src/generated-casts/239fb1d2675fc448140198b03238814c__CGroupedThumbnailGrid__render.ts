// 239fb1d2675fc448140198b03238814c.cct / CGroupedThumbnailGrid / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, _this: LingoValue, a_ar_rThumbs: LingoValue, a_rImgElem: LingoValue) {
  setThePropOf(_this, "m_rImgElement", a_rImgElem);
  setThePropOf(_this, "m_iSlotCount", a_ar_rThumbs.count);
  var t_iRowCount = lingoBinary("add", lingoBinary("div", _this.m_iSlotCount, _this.m_iSlotsPerRow), lingoBinary("gt", lingoBinary("mod", _this.m_iSlotCount, _this.m_iSlotsPerRow), 0));
  var t_iMinRowCount = lingoBinary("div", lingoBinary("sub", lingoBinary("sub", callMethod("getProperty", _this.m_rImgElement, symbol("height")), _this.m_iMarginV), _this.m_iMarginV), _this.m_rcItemSize.height);
  if (lingoBinary("lt", t_iRowCount, t_iMinRowCount)) {
  t_iRowCount = t_iMinRowCount;
  }

  var t_iCurWidth = lingoBinary("mul", _this.m_iSlotsPerRow, lingoBinary("add", _this.m_rcItemSize.width, lingoBinary("add", _this.m_iMarginH, _this.m_iMarginH)));
  var t_iCurHeight = lingoBinary("mul", t_iRowCount, lingoBinary("add", _this.m_rcItemSize.height, lingoBinary("add", _this.m_iMarginV, _this.m_iMarginV)));
  var t_iMinWidth = callMethod("getProperty", _this.m_rImgElement, symbol("width"));
  var t_iMinHeight = callMethod("getProperty", _this.m_rImgElement, symbol("height"));
  setThePropOf(_this, "m_rBufferImg", callNamed("image", callNamed("max", t_iCurWidth, t_iMinWidth), callNamed("max", t_iCurHeight, t_iMinHeight), 32));
  setThePropOf(_this, "m_iSlotsPerRow", lingoBinary("div", callMethod("getProperty", _this.m_rImgElement, symbol("width")), lingoBinary("add", _this.m_rcItemSize.width, _this.m_iMarginH)));
  callMethod("RenderBackground", _this)
  var t_iCurSlot = 0;
  for (var y = 1; y <= t_iRowCount; ++y) {
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", y, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.height, _this.m_iMarginV), _this.m_iMarginV)), _this.m_iMarginV);
  for (var x = 1; x <= _this.m_iSlotsPerRow; ++x) {
  t_iCurSlot = lingoBinary("add", t_iCurSlot, 1);
  if (lingoBinary("lte", t_iCurSlot, _this.m_iSlotCount)) {
  var t_rItem = a_ar_rThumbs[t_iCurSlot];
  var t_rThumb = t_rItem[symbol("thumbnail")];
  var t_iBlend = t_rItem[symbol("blend")];
  var t_iCount = t_rItem[symbol("items")];
  if ((lingoTruthy(callNamed("voidp", t_rThumb)) ? 0 : 1)) {
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.width, _this.m_iMarginH), _this.m_iMarginH)), _this.m_iMarginH);
  var t_rcOff = new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]);
  var t_rcTarget = lingoBinary("add", lingoBinary("add", t_rThumb.rect, t_rcOff), new LingoList([2, 2, 2, 2]));
  callMethod("fill", _this.m_rBufferImg, t_rcTarget, _this.m_rSolidCol)
  setThePropOf(t_rThumb, "useAlpha", 1);
  callMethod("copyPixels", _this.m_rBufferImg, t_rThumb, t_rcTarget, t_rThumb.rect, new LingoPropList([symbol("ink"), 36, symbol("blend"), t_iBlend, symbol("useFastQuads"), 1]))
  var t_rCount = callMethod("render", meProp(_me, "m_rCountWriter"), callNamed("string", t_iCount));
  callMethod("copyPixels", _this.m_rBufferImg, t_rCount, lingoBinary("add", lingoBinary("add", t_rCount.rect, t_rcOff), new LingoList([45, 28, 45, 28])), t_rCount.rect)
  }

  continue;
  }

  }

  }

  callMethod("RenderForeGround", _this, a_ar_rThumbs)
  callMethod("feedImage", _this.m_rImgElement, _this.m_rBufferImg)
  return callMethod("select", _this, _this.m_iSelected);
}

