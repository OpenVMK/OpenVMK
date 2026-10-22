// 38365562899c7799eeaea4a99041ea57.cct / CQuestEmoticonGrid / render

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
  var t_iRowCount = lingoBinary("add", lingoBinary("div", t_iItemCount, meProp(_me, "m_iSlotsPerRow")), 1);
  t_iRowCount = callNamed("max", t_iRowCount, 4);
  var t_iCurWidth = lingoBinary("mul", meProp(_me, "m_iSlotsPerRow"), lingoBinary("add", meProp(_me, "m_rcItemSize").width, lingoBinary("add", meProp(_me, "m_iMarginH"), meProp(_me, "m_iMarginH"))));
  var t_iCurHeight = lingoBinary("mul", t_iRowCount, lingoBinary("add", meProp(_me, "m_rcItemSize").height, lingoBinary("add", meProp(_me, "m_iMarginV"), meProp(_me, "m_iMarginV"))));
  var t_iMinWidth = callMethod("getProperty", a_rImgElem, symbol("width"));
  var t_iMinHeight = callMethod("getProperty", a_rImgElem, symbol("height"));
  setMeProp(_me, "m_rBufferImg", callNamed("image", callNamed("max", t_iCurWidth, t_iMinWidth), callNamed("max", t_iCurHeight, t_iMinHeight), 32));
  callMethod("fill", meProp(_me, "m_rBufferImg"), meProp(_me, "m_rBufferImg").rect, callNamed("rgb", "001F55"))
  var t_iCurSlot = 0;
  var t_rFill = callNamed("image", 22, 22, 32);
  callMethod("fill", t_rFill, t_rFill.rect, callNamed("rgb", 39, 86, 146))
  for (var y = 1; y <= t_iRowCount; ++y) {
  var t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", y, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").height, meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV"))), meProp(_me, "m_iMarginV"));
  for (var x = 1; x <= meProp(_me, "m_iSlotsPerRow"); ++x) {
  t_iCurSlot = lingoBinary("add", t_iCurSlot, 1);
  var t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  var t_rcOff = new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY]);
  callMethod("copyPixels", meProp(_me, "m_rBufferImg"), t_rFill, lingoBinary("add", meProp(_me, "m_rcItemSize"), t_rcOff), meProp(_me, "m_rcItemSize"), new LingoPropList([symbol("ink"), 0]))
  }

  }

  var t_mp_iType_rThumb = new LingoPropList([]);
  for (var i = 1; i <= meProp(_me, "m_mp_iRef_rItem").count; ++i) {
  if (callNamed("memberExists", lingoBinary("join", "emoticon_tn_", meProp(_me, "m_mp_iRef_rItem")[i]))) {
  var t_Img = callMethod("duplicate", callNamed("getMember", lingoBinary("join", "emoticon_tn_", meProp(_me, "m_mp_iRef_rItem")[i])).image);
  callMethod("addProp", t_mp_iType_rThumb, meProp(_me, "m_mp_iRef_rItem")[i], t_Img)
  }

  }

  t_iCurSlot = 0;
  for (var y = 1; y <= t_iRowCount; ++y) {
  t_iOffY = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", y, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").height, meProp(_me, "m_iMarginV")), meProp(_me, "m_iMarginV"))), meProp(_me, "m_iMarginV"));
  for (var x = 1; x <= meProp(_me, "m_iSlotsPerRow"); ++x) {
  t_iCurSlot = lingoBinary("add", t_iCurSlot, 1);
  if (lingoBinary("gt", t_iCurSlot, a_mp_iRef_rItem.count)) {
  break;
  }

  var t_rItem = meProp(_me, "m_mp_iRef_rItem")[t_iCurSlot];
  var t_rThumbImg = callMethod("getaProp", t_mp_iType_rThumb, t_rItem);
  t_iOffX = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x, 1), lingoBinary("add", lingoBinary("add", meProp(_me, "m_rcItemSize").width, meProp(_me, "m_iMarginH")), meProp(_me, "m_iMarginH"))), meProp(_me, "m_iMarginH"));
  callMethod("copyPixels", meProp(_me, "m_rBufferImg"), t_rThumbImg, lingoBinary("add", meProp(_me, "m_rcItemSize"), new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), meProp(_me, "m_rcItemSize"), new LingoPropList([symbol("ink"), 36]))
  callMethod("draw", meProp(_me, "m_rBufferImg"), lingoBinary("add", meProp(_me, "m_rcItemSize"), new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), new LingoPropList([symbol("color"), meProp(_me, "m_rBorderCol"), symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  }

  }

  callMethod("feedImage", meProp(_me, "m_rImgElement"), meProp(_me, "m_rBufferImg"))
  return callMethod("select", _this, meProp(_me, "m_iSelected"));
}

