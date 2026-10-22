// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / RenderBackground

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RenderBackground(_me: LingoMe, _this: LingoValue) {
  var t_iRowCount = lingoBinary("add", lingoBinary("div", meProp(_me, "m_iSlotCount"), meProp(_me, "m_iSlotsPerRow")), lingoBinary("gt", lingoBinary("mod", meProp(_me, "m_iSlotCount"), meProp(_me, "m_iSlotsPerRow")), 0));
  var t_iMinRowCount = lingoBinary("div", lingoBinary("sub", lingoBinary("sub", callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("height")), meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV")), meProp(_me, "m_rcItemSize").height);
  if (lingoBinary("lt", t_iRowCount, t_iMinRowCount)) {
  t_iRowCount = t_iMinRowCount;
  }

  callMethod("fill", meProp(_me, "m_rBufferImg"), meProp(_me, "m_rBufferImg").rect, meProp(_me, "m_rSolidCol"))
  var t_iCurSlot = 0;
  for (var y = 1; y <= t_iRowCount; ++y) {
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", y, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").height, meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV"))), meProp(_me, "m_iMarginV"));
  for (var x = 1; x <= meProp(_me, "m_iSlotsPerRow"); ++x) {
  t_iCurSlot = lingoBinary("add", t_iCurSlot, 1);
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  var t_rcOff = new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]);
  callMethod("draw", meProp(_me, "m_rBufferImg"), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize"), new LingoList([-float(1), -float(1), 1, 1])), t_rcOff), new LingoPropList([symbol("color"), meProp(_me, "m_rBorderCol"), symbol("shapeType"), meProp(_me, "m_kSlotShapeType"), symbol("lineSize"), meProp(_me, "m_iSlotLineWidth")]))
  }

  }

}

