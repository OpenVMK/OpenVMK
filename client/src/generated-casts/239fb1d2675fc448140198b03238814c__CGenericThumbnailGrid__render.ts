// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, _this: LingoValue, a_ar_rThumbs: LingoValue, a_rImgElem: LingoValue) {
  setMeProp(_me, "m_rImgElement", a_rImgElem);
  setMeProp(_me, "m_iSlotCount", a_ar_rThumbs.count);
  var t_iRowCount = lingoBinary("add", lingoBinary("div", meProp(_me, "m_iSlotCount"), meProp(_me, "m_iSlotsPerRow")), lingoBinary("gt", lingoBinary("mod", meProp(_me, "m_iSlotCount"), meProp(_me, "m_iSlotsPerRow")), 0));
  var t_iMinRowCount = lingoBinary("div", lingoBinary("sub", lingoBinary("sub", callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("height")), meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV")), meProp(_me, "m_rcItemSize").height);
  if (lingoBinary("lt", t_iRowCount, t_iMinRowCount)) {
  t_iRowCount = t_iMinRowCount;
  }

  var t_iCurWidth = lingoBinary("mul", meProp(_me, "m_iSlotsPerRow"), lingoBinary("add", meProp(_me, "m_rcItemSize").width, lingoBinary("add", meProp(_me, "m_iMarginH"), meProp(_me, "m_iMarginH"))));
  var t_iCurHeight = lingoBinary("mul", t_iRowCount, lingoBinary("add", meProp(_me, "m_rcItemSize").height, lingoBinary("add", meProp(_me, "m_iMarginV"), meProp(_me, "m_iMarginV"))));
  var t_iMinWidth = callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("width"));
  var t_iMinHeight = callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("height"));
  setMeProp(_me, "m_rBufferImg", callNamed("image", callNamed("max", t_iCurWidth, t_iMinWidth), callNamed("max", t_iCurHeight, t_iMinHeight), 32));
  setMeProp(_me, "m_iSlotsPerRow", lingoBinary("div", callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("width")), lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH"))));
  callMethod("fill", meProp(_me, "m_rBufferImg"), meProp(_me, "m_rBufferImg").rect, meProp(_me, "m_rGridBgCol"))
  callMethod("RenderBackground", _this)
  var t_iCurSlot = 0;
  for (var y = 1; y <= t_iRowCount; ++y) {
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", y, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").height, meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV"))), meProp(_me, "m_iMarginV"));
  for (var x = 1; x <= meProp(_me, "m_iSlotsPerRow"); ++x) {
  t_iCurSlot = lingoBinary("add", t_iCurSlot, 1);
  if (lingoBinary("lte", t_iCurSlot, meProp(_me, "m_iSlotCount"))) {
  var t_rItem = a_ar_rThumbs[t_iCurSlot];
  var t_rThumb = t_rItem[symbol("thumbnail")];
  var t_iBlend = t_rItem[symbol("blend")];
  if ((lingoTruthy(callNamed("voidp", t_rThumb)) ? 0 : 1)) {
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  var t_rcOff = new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]);
  var t_rcTarget = lingoBinary("add", callMethod("centerInRect", _this, t_rThumb.rect, lingoBinary("add", meProp(_me, "m_rcItemSize"), t_rcOff)), meProp(_me, "m_rcThumbOffset"));
  setThePropOf(t_rThumb, "useAlpha", 1);
  callMethod("copyPixels", meProp(_me, "m_rBufferImg"), t_rThumb, t_rcTarget, meProp(_me, "m_rcItemSize"), new LingoPropList([symbol("ink"), 36, symbol("blend"), t_iBlend, symbol("useFastQuads"), 1]))
  }

  continue;
  }

  }

  }

  callMethod("RenderForeGround", _this, a_ar_rThumbs)
  callMethod("feedImage", meProp(_me, "m_rImgElement"), meProp(_me, "m_rBufferImg"))
  return callMethod("select", _this, meProp(_me, "m_iSelected"));
}

