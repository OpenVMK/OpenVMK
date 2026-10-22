// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / DrawRectInBuffer

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
  if (lingoBinary("gt", a_iSelection, meProp(_me, "m_iSlotCount"))) {
  a_iSelection = meProp(_me, "m_iSlotCount");
  }

  var t_iRow = lingoBinary("add", lingoBinary("div", lingoBinary("sub", a_iSelection, 1), meProp(_me, "m_iSlotsPerRow")), 1);
  var t_iSlot = lingoBinary("add", lingoBinary("mod", lingoBinary("sub", a_iSelection, 1), meProp(_me, "m_iSlotsPerRow")), 1);
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iSlot, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iRow, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").height, meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV"))), meProp(_me, "m_iMarginV"));
  var t_rDestRect = lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize"), new LingoList([-float(1), -float(1), 1, 1])), new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]));
  callMethod("draw", a_rBuffer, t_rDestRect, new LingoPropList([symbol("color"), a_rBorderCol, symbol("shapeType"), meProp(_me, "m_kSlotShapeType"), symbol("lineSize"), meProp(_me, "m_iSlotLineWidth")]))
  }

}

