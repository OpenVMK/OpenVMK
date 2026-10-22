// 239fb1d2675fc448140198b03238814c.cct / CCustomBgThumbnailGrid / RenderBackground

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

  callMethod("fill", _this.m_rBufferImg, _this.m_rBufferImg.rect, _this.m_rSolidCol)
  var t_iCurSlot = 0;
  var t_rBg = meProp(_me, "m_ar_graphics")[symbol("bg")];
  for (var y = 1; y <= t_iRowCount; ++y) {
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", y, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.height, _this.m_iMarginV), _this.m_iMarginV)), _this.m_iMarginV);
  for (var x = 1; x <= _this.m_iSlotsPerRow; ++x) {
  t_iCurSlot = lingoBinary("add", t_iCurSlot, 1);
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.width, _this.m_iMarginH), _this.m_iMarginH)), _this.m_iMarginH);
  var t_rcOff = new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]);
  setThePropOf(t_rBg, "useAlpha", 0);
  callMethod("copyPixels", _this.m_rBufferImg, t_rBg, lingoBinary("add", t_rBg.rect, t_rcOff), t_rBg.rect)
  }

  }

}

