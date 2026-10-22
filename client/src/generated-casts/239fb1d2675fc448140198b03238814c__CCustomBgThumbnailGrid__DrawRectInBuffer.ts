// 239fb1d2675fc448140198b03238814c.cct / CCustomBgThumbnailGrid / DrawRectInBuffer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawRectInBuffer(_me: LingoMe, _this: LingoValue, a_rBuffer: LingoValue, a_iSelection: LingoValue, a_rBorderCol: LingoValue) {
  var t_iRow = lingoBinary("add", lingoBinary("div", lingoBinary("sub", a_iSelection, 1), _this.m_iSlotsPerRow), 1);
  var t_iSlot = lingoBinary("add", lingoBinary("mod", lingoBinary("sub", a_iSelection, 1), _this.m_iSlotsPerRow), 1);
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iSlot, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.width, _this.m_iMarginH), _this.m_iMarginH)), _this.m_iMarginH);
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iRow, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.height, _this.m_iMarginV), _this.m_iMarginV)), _this.m_iMarginV);
  switch (1) {
case lingoBinary("eq", a_rBorderCol, _this.m_rBorderCol):
  var t_kBorder = symbol("border");
  break;
case lingoBinary("eq", a_rBorderCol, _this.m_rHiliterCol):
  t_kBorder = symbol("hiliter");
  break;
case lingoBinary("eq", a_rBorderCol, _this.m_rSecondaryCol):
  t_kBorder = symbol("secondary");
  break;
  }

  var t_rBorder = meProp(_me, "m_ar_graphics")[t_kBorder];
  if (callNamed("objectp", t_rBorder)) {
  var t_iW = lingoBinary("div", lingoBinary("sub", meProp(_me, "m_ar_graphics")[t_kBorder].width, meProp(_me, "m_ar_graphics")[symbol("bg")].width), 2);
  var t_iH = lingoBinary("div", lingoBinary("sub", meProp(_me, "m_ar_graphics")[t_kBorder].height, meProp(_me, "m_ar_graphics")[symbol("bg")].height), 2);
  var t_rcOff = new LingoList([lingoBinary("add", t_iOffX, t_iW), lingoBinary("add", t_iOffY, t_iH), lingoBinary("add", t_iOffX, t_iW), lingoBinary("add", t_iOffY, t_iH)]);
  callMethod("copyPixels", _this.m_rBufferImg, t_rBorder, lingoBinary("add", t_rBorder.rect, t_rcOff), t_rBorder.rect)
  }

}

