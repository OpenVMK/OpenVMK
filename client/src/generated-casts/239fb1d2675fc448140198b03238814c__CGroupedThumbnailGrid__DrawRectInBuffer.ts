// 239fb1d2675fc448140198b03238814c.cct / CGroupedThumbnailGrid / DrawRectInBuffer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawRectInBuffer(_me: LingoMe, _this: LingoValue, a_rBuffer: LingoValue, a_iSelection: LingoValue, a_rBorderCol: LingoValue) {
  if (lingoBinary("gt", a_iSelection, 0)) {
  if (lingoBinary("gt", a_iSelection, _this.m_iSlotCount)) {
  a_iSelection = _this.m_iSlotCount;
  }

  var t_iRow = lingoBinary("add", lingoBinary("div", lingoBinary("sub", a_iSelection, 1), _this.m_iSlotsPerRow), 1);
  var t_iSlot = lingoBinary("add", lingoBinary("mod", lingoBinary("sub", a_iSelection, 1), _this.m_iSlotsPerRow), 1);
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iSlot, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.width, _this.m_iMarginH), _this.m_iMarginH)), _this.m_iMarginH);
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iRow, 1), lingoBinary("add", lingoBinary("add", _this.m_rcItemSize.height, _this.m_iMarginV), _this.m_iMarginV)), _this.m_iMarginV);
  var t_rDestRect = lingoBinary("add", meProp(_me, "m_rcThumbSize"), new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]));
  callMethod("draw", a_rBuffer, t_rDestRect, new LingoPropList([symbol("color"), a_rBorderCol, symbol("shapeType"), _this.m_kSlotShapeType, symbol("lineSize"), _this.m_iSlotLineWidth]))
  }

}

