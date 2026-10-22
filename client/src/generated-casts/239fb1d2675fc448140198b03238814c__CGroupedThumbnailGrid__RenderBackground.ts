// 239fb1d2675fc448140198b03238814c.cct / CGroupedThumbnailGrid / RenderBackground

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RenderBackground(_me: LingoMe, _this: LingoValue) {
  var t_iRowCount = lingoBinary("add", lingoBinary("div", _this.m_iSlotCount, _this.m_iSlotsPerRow), lingoBinary("gt", lingoBinary("mod", _this.m_iSlotCount, _this.m_iSlotsPerRow), 0));
  var t_iMinRowCount = lingoBinary("div", lingoBinary("sub", lingoBinary("sub", callMethod("getProperty", _this.m_rImgElement, symbol("height")), _this.m_iMarginV), _this.m_iMarginV), _this.m_rcItemSize.height);
  if (lingoBinary("lt", t_iRowCount, t_iMinRowCount)) {
  t_iRowCount = t_iMinRowCount;
  }

  callMethod("fill", _this.m_rBufferImg, _this.m_rBufferImg.rect, _this.m_rGridBgCol)
  var t_iCurSlot = 0;
  for (var y = 1; y <= t_iRowCount; ++y) {
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", y, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.height, _this.m_iMarginV), _this.m_iMarginV)), _this.m_iMarginV);
  for (var x = 1; x <= _this.m_iSlotsPerRow; ++x) {
  t_iCurSlot = lingoBinary("add", t_iCurSlot, 1);
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.width, _this.m_iMarginH), _this.m_iMarginH)), _this.m_iMarginH);
  var t_rcOff = new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]);
  var t_rcRect = lingoBinary("sub", lingoBinary("add", _this.m_rcItemSize, t_rcOff), new LingoList([0, 0, 2, 0]));
  callMethod("fill", _this.m_rBufferImg, t_rcRect, new LingoPropList([symbol("color"), _this.m_rBorderCol, symbol("shapeType"), symbol("rect")]))
  callMethod("draw", _this.m_rBufferImg, callNamed("point", lingoBinary("add", t_rcRect.right, 0), lingoBinary("add", t_rcRect.top, 1)), callNamed("point", lingoBinary("add", t_rcRect.right, 0), lingoBinary("sub", t_rcRect.bottom, 1)), _this.m_rBorderCol)
  callMethod("draw", _this.m_rBufferImg, callNamed("point", lingoBinary("add", t_rcRect.right, 1), lingoBinary("add", t_rcRect.top, 2)), callNamed("point", lingoBinary("add", t_rcRect.right, 1), lingoBinary("sub", t_rcRect.bottom, 2)), _this.m_rBorderCol)
  }

  }

}

