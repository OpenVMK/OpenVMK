// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemGrid / Unselect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Unselect(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rImgElement"))) ? 0 : 1)) {
  var t_rBuffer = callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("image"));
  var t_iItemCount = meProp(_me, "m_mp_iRef_rItem").count;
  if (lingoBinary("gt", t_iItemCount, 0)) {
  if (lingoBinary("and", lingoBinary("gte", t_iItemCount, meProp(_me, "m_iSelected")), lingoBinary("gt", meProp(_me, "m_iSelected"), 0))) {
  var t_iRow = lingoBinary("add", lingoBinary("div", lingoBinary("sub", meProp(_me, "m_iSelected"), 1), meProp(_me, "m_iSlotsPerRow")), 1);
  var t_iSlot = lingoBinary("add", lingoBinary("mod", lingoBinary("sub", meProp(_me, "m_iSelected"), 1), meProp(_me, "m_iSlotsPerRow")), 1);
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iSlot, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", t_iRow, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").height, meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV"))), meProp(_me, "m_iMarginV"));
  callMethod("draw", t_rBuffer, lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize"), new LingoList([-float(1), -float(1), 1, 1])), new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), new LingoPropList([symbol("color"), meProp(_me, "m_rBorderCol"), symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  callMethod("setProperty", meProp(_me, "m_rImgElement"), symbol("image"), t_rBuffer)
  setMeProp(_me, "m_iSelected", 0);
  }

  }

  } else {
  setMeProp(_me, "m_iSelected", 0);
  }

}

