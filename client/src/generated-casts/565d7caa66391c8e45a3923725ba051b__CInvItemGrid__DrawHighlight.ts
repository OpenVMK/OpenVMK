// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemGrid / DrawHighlight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawHighlight(_me: LingoMe, _this: LingoValue, a_iSelected: LingoValue) {
  var t_rBuffer = callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("image"));
  var t_iItemCount = meProp(_me, "m_mp_iRef_rItem").count;
  if (lingoBinary("lt", a_iSelected, 0)) {
  a_iSelected = 0;
  }

  if (lingoBinary("gt", t_iItemCount, 0)) {
  if (lingoBinary("and", lingoBinary("gte", t_iItemCount, meProp(_me, "m_iHighlighted")), lingoBinary("gt", meProp(_me, "m_iHighlighted"), 0))) {
  var t_iRow = lingoBinary("add", lingoBinary("div", lingoBinary("sub", meProp(_me, "m_iHighlighted"), 1), meProp(_me, "m_iSlotsPerRow")), 1);
  var t_iSlot = lingoBinary("add", lingoBinary("mod", lingoBinary("sub", meProp(_me, "m_iHighlighted"), 1), meProp(_me, "m_iSlotsPerRow")), 1);
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iSlot, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iRow, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").height, meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV"))), meProp(_me, "m_iMarginV"));
  callMethod("draw", t_rBuffer, lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize"), new LingoList([-float(1), -float(1), 1, 1])), new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), new LingoPropList([symbol("color"), meProp(_me, "m_rBorderCol"), symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  }

  setMeProp(_me, "m_iHighlighted", a_iSelected);
  if (lingoBinary("gt", meProp(_me, "m_iHighlighted"), t_iItemCount)) {
  return callMethod("Unhighlight", _this);
  }

  if (lingoBinary("gt", meProp(_me, "m_iHighlighted"), 0)) {
  t_iRow = lingoBinary("add", lingoBinary("div", lingoBinary("sub", meProp(_me, "m_iHighlighted"), 1), meProp(_me, "m_iSlotsPerRow")), 1);
  t_iSlot = lingoBinary("add", lingoBinary("mod", lingoBinary("sub", meProp(_me, "m_iHighlighted"), 1), meProp(_me, "m_iSlotsPerRow")), 1);
  t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iSlot, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iRow, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").height, meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV"))), meProp(_me, "m_iMarginV"));
  callMethod("draw", t_rBuffer, lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize"), new LingoList([-float(1), -float(1), 1, 1])), new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), new LingoPropList([symbol("color"), meProp(_me, "m_rSecondaryCol"), symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  }

  }

  callMethod("setProperty", meProp(_me, "m_rImgElement"), symbol("image"), t_rBuffer)
  return 1;
}

