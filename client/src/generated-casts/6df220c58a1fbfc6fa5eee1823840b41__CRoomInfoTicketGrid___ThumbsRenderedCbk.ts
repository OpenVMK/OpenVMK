// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketGrid / _ThumbsRenderedCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ThumbsRenderedCbk(_me: LingoMe, _this: LingoValue, a_mp_iType_rThumb: LingoValue, a_rCallback: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_iItemCount = meProp(_me, "m_mp_iRef_rItem").count;
  var t_iRowCount = lingoBinary("add", lingoBinary("div", t_iItemCount, meProp(_me, "m_iSlotsPerRow")), 1);
  var t_iCurWidth = lingoBinary("mul", meProp(_me, "m_iSlotsPerRow"), lingoBinary("add", meProp(_me, "m_rcItemSize").width, lingoBinary("add", meProp(_me, "m_iMarginH"), meProp(_me, "m_iMarginH"))));
  var t_iCurHeight = lingoBinary("mul", t_iRowCount, lingoBinary("add", meProp(_me, "m_rcItemSize").height, lingoBinary("add", meProp(_me, "m_iMarginV"), meProp(_me, "m_iMarginV"))));
  var t_iMinWidth = callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("width"));
  var t_iMinHeight = callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("height"));
  setMeProp(_me, "m_rBufferImg", callNamed("image", callNamed("max", t_iCurWidth, t_iMinWidth), callNamed("max", t_iCurHeight, t_iMinHeight), 32));
  setMeProp(_me, "m_iSlotsPerRow", lingoBinary("div", callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("width")), lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH"))));
  callMethod("fill", meProp(_me, "m_rBufferImg"), meProp(_me, "m_rBufferImg").rect, callNamed("rgb", 39, 86, 146))
  var t_iCurSlot = 0;
  for (var y = 1; y <= t_iRowCount; ++y) {
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", y, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").height, meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV"))), meProp(_me, "m_iMarginV"));
  for (var x = 1; x <= meProp(_me, "m_iSlotsPerRow"); ++x) {
  t_iCurSlot = lingoBinary("add", t_iCurSlot, 1);
  if (lingoBinary("lte", t_iCurSlot, a_mp_iType_rThumb.count)) {
  var t_rItem = meProp(_me, "m_mp_iRef_rItem")[t_iCurSlot];
  var t_rThumbImg = a_mp_iType_rThumb[t_iCurSlot];
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  var t_rcOff = new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]);
  callMethod("copyPixels", meProp(_me, "m_rBufferImg"), t_rThumbImg, lingoBinary("add", meProp(_me, "m_rcItemSize"), t_rcOff), meProp(_me, "m_rcItemSize"), new LingoPropList([symbol("ink"), 36]))
  callMethod("draw", meProp(_me, "m_rBufferImg"), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize"), new LingoList([-float(1), -float(1), 1, 1])), t_rcOff), new LingoPropList([symbol("color"), meProp(_me, "m_rBorderCol"), symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  continue;
  }

  t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  t_rcOff = new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]);
  callMethod("draw", meProp(_me, "m_rBufferImg"), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize"), new LingoList([-float(1), -float(1), 1, 1])), t_rcOff), new LingoPropList([symbol("color"), meProp(_me, "m_rBorderCol"), symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  }

  }

  callMethod("feedImage", meProp(_me, "m_rImgElement"), meProp(_me, "m_rBufferImg"))
  return callMethod("select", _this, meProp(_me, "m_iSelected"));
  }

}

