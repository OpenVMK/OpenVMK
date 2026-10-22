// 38365562899c7799eeaea4a99041ea57.cct / CQuestInvItemGrid / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, _this: LingoValue, a_mp_iRef_rItem: LingoValue, a_rImgElem: LingoValue) {
  setMeProp(_me, "m_mp_iRef_rItem", a_mp_iRef_rItem);
  setMeProp(_me, "m_rImgElement", a_rImgElem);
  var t_iItemCount = meProp(_me, "m_mp_iRef_rItem").count;
  var t_iRowCount = lingoBinary("add", lingoBinary("div", t_iItemCount, meProp(_me, "m_iSlotsPerRow")), lingoBinary("gt", lingoBinary("mod", t_iItemCount, meProp(_me, "m_iSlotsPerRow")), 0));
  var tMinRowCount = lingoBinary("div", lingoBinary("sub", lingoBinary("sub", callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("height")), meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV")), meProp(_me, "m_rcItemSize").height);
  if (lingoBinary("lt", t_iRowCount, tMinRowCount)) {
  t_iRowCount = tMinRowCount;
  }

  var t_iCurWidth = lingoBinary("mul", meProp(_me, "m_iSlotsPerRow"), lingoBinary("add", meProp(_me, "m_rcItemSize").width, lingoBinary("add", meProp(_me, "m_iMarginH"), meProp(_me, "m_iMarginH"))));
  var t_iCurHeight = lingoBinary("mul", t_iRowCount, lingoBinary("add", meProp(_me, "m_rcItemSize").height, lingoBinary("add", meProp(_me, "m_iMarginV"), meProp(_me, "m_iMarginV"))));
  var t_iMinWidth = callMethod("getProperty", a_rImgElem, symbol("width"));
  var t_iMinHeight = callMethod("getProperty", a_rImgElem, symbol("height"));
  setMeProp(_me, "m_rBufferImg", callNamed("image", callNamed("max", t_iCurWidth, t_iMinWidth), callNamed("max", t_iCurHeight, t_iMinHeight), 32));
  setMeProp(_me, "m_iSlotsPerRow", lingoBinary("div", callMethod("getProperty", a_rImgElem, symbol("width")), lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH"))));
  callMethod("fill", meProp(_me, "m_rBufferImg"), meProp(_me, "m_rBufferImg").rect, callNamed("rgb", "#001F55"))
  var t_mp_iType_rThumb = new LingoPropList([]);
  for (var t_rItem of meProp(_me, "m_mp_iRef_rItem").toArray()) {
  callMethod("setaProp", t_mp_iType_rThumb, t_rItem.code, undefined)
  }

  callNamed("executeMessage", "GetItemThumbnail", t_mp_iType_rThumb)
  var t_iCurSlot = 0;
  for (var y = 1; y <= t_iRowCount; ++y) {
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", y, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").height, meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV"))), meProp(_me, "m_iMarginV"));
  for (var x = 1; x <= meProp(_me, "m_iSlotsPerRow"); ++x) {
  t_iCurSlot = lingoBinary("add", t_iCurSlot, 1);
  if (lingoBinary("lte", t_iCurSlot, a_mp_iRef_rItem.count)) {
  t_rItem = meProp(_me, "m_mp_iRef_rItem")[t_iCurSlot];
  var t_rThumbImg = callMethod("getaProp", t_mp_iType_rThumb, t_rItem.code);
  if (lingoBinary("and", meProp(_me, "m_bTradeOpen"), lingoBinary("neq", callMethod("findPos", meProp(_me, "m_ar_NonTradableItems"), t_rItem.code), undefined))) {
  var t_iBlend = 50;
  } else {
  if (lingoBinary("eq", callMethod("getaProp", t_rItem, symbol("state")), symbol("normal"))) {
  t_iBlend = 100;
  } else {
  t_iBlend = 50;
  }

  }

  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  var t_rcOff = new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]);
  callMethod("copyPixels", meProp(_me, "m_rBufferImg"), t_rThumbImg, lingoBinary("add", meProp(_me, "m_rcItemSize"), t_rcOff), meProp(_me, "m_rcItemSize"), new LingoPropList([symbol("ink"), 36, symbol("blend"), t_iBlend, symbol("useFastQuads"), 1]))
  callMethod("draw", meProp(_me, "m_rBufferImg"), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize"), new LingoList([-float(1), -float(1), 1, 1])), t_rcOff), new LingoPropList([symbol("color"), meProp(_me, "m_rBorderCol"), symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  if (lingoBinary("and", lingoBinary("gt", callMethod("getaProp", t_rItem, symbol("param")), 0), lingoBinary("or", lingoBinary("and", lingoBinary("gt", t_rItem.code, 2000), lingoBinary("lt", t_rItem.code, 3001)), lingoBinary("and", lingoBinary("gt", t_rItem.code, 12000), lingoBinary("lt", t_rItem.code, 13001))))) {
  var t_rStar = callNamed("getMember", "inv.pin.star.thumb").image;
  var t_rRect = t_rStar.rect;
  for (var s = 1; s <= callMethod("getaProp", t_rItem, symbol("param")); ++s) {
  callMethod("copyPixels", meProp(_me, "m_rBufferImg"), t_rStar, lingoBinary("add", lingoBinary("add", t_rRect, t_rcOff), new LingoList([lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31, lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31])), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

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

