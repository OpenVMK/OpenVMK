// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatPinThumbnailGrid / RenderForeGround

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RenderForeGround(_me: LingoMe, _this: LingoValue, a_ar_items: LingoValue) {
  setMeProp(_me, "m_mp_iRef_rItem", a_ar_items);
  var t_iRowCount = lingoBinary("add", lingoBinary("div", _this.m_iSlotCount, _this.m_iSlotsPerRow), lingoBinary("gt", lingoBinary("mod", _this.m_iSlotCount, _this.m_iSlotsPerRow), 0));
  var t_iMinRowCount = lingoBinary("div", lingoBinary("sub", lingoBinary("sub", callMethod("getProperty", _this.m_rImgElement, symbol("height")), _this.m_iMarginV), _this.m_iMarginV), _this.m_rcItemSize.height);
  if (lingoBinary("lt", t_iRowCount, t_iMinRowCount)) {
  t_iRowCount = t_iMinRowCount;
  }

  var t_iCurSlot = 0;
  for (var y = 1; y <= t_iRowCount; ++y) {
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", y, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.height, _this.m_iMarginV), _this.m_iMarginV)), _this.m_iMarginV);
  for (var x = 1; x <= _this.m_iSlotsPerRow; ++x) {
  t_iCurSlot = lingoBinary("add", t_iCurSlot, 1);
  if (lingoBinary("lte", t_iCurSlot, _this.m_mp_iRef_rItem.count)) {
  var t_rItem = _this.m_mp_iRef_rItem[t_iCurSlot];
  var t_rThumbImg = t_rItem.thumbnail;
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.width, _this.m_iMarginH), _this.m_iMarginH)), _this.m_iMarginH);
  var t_rcOff = new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]);
  if (callNamed("ilk", t_rItem.params, symbol("propList"))) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_rItem.params, "pl"))) ? 0 : 1)) {
  var t_rStar = callMethod("RenderShadow", _this, t_rItem.params["pl"]);
  var t_rRect = t_rStar.rect;
  var t_rcRightCorner = lingoBinary("add", t_rcOff, new LingoList([lingoBinary("add", _this.m_rcItemSize[3], 6), lingoBinary("sub", _this.m_rcItemSize[4], 1), lingoBinary("add", _this.m_rcItemSize[3], 6), lingoBinary("sub", _this.m_rcItemSize[4], 1)]));
  var t_rcStarCorner = new LingoList([-float(t_rRect[3]), -float(t_rRect[4]), -float(t_rRect[3]), -float(t_rRect[4])]);
  callMethod("copyPixels", _this.m_rBufferImg, t_rStar, lingoBinary("add", lingoBinary("add", t_rRect, t_rcRightCorner), t_rcStarCorner), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  t_rStar = callMethod("RenderText", _this, t_rItem.params["pl"]);
  t_rRect = t_rStar.rect;
  callMethod("copyPixels", _this.m_rBufferImg, t_rStar, lingoBinary("add", lingoBinary("add", t_rRect, t_rcRightCorner), t_rcStarCorner), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  }

  }

  }

}

