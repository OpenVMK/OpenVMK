// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / _PinThumbsReadyCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PinThumbsReadyCbk(_me: LingoMe, _this: LingoValue, a_mp_iType_rThumb: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iCount = a_mp_iType_rThumb.count;
  var t_rStar = callNamed("getMember", "inv.pin.star.thumb").image;
  var t_rRect = t_rStar.rect;
  var t_iOffset = lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage"));
  var t_rDetails = callMethod("GetItemDetailsByCategory", callMethod("GetInventory", callNamed("getThread", "inventory").component, 1), symbol("pins"));
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rThumb = a_mp_iType_rThumb[i];
  var t_rItem = meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("pins")][lingoBinary("add", t_iOffset, i)];
  var t_vParam = callMethod("getaProp", t_rItem, symbol("param"));
  if (callNamed("ilk", t_vParam, symbol("integer"))) {
  if (lingoBinary("gt", t_vParam, 0)) {
  if ((lingoTruthy(callNamed("voidp", t_rThumb)) ? 0 : 1)) {
  t_rThumb = callMethod("duplicate", t_rThumb);
  for (var s = 1; s <= t_vParam; ++s) {
  callMethod("copyPixels", t_rThumb, t_rStar, lingoBinary("add", t_rRect, new LingoList([lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31, lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 1)), 3), 31])), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  }

  }

  var t_rDetail = t_rDetails[t_rItem[symbol("group")]];
  if ((lingoTruthy(callNamed("voidp", t_rThumb)) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", t_rDetail)) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", t_rDetail["lvl"])) ? 0 : 1)) {
  t_rThumb = callMethod("duplicate", t_rThumb);
  setThePropOf(t_rThumb, "useAlpha", 0);
  var t_sLevel = lingoBinary("joinPad", callNamed("getText", "vmks.thumb.lvl", "LVL"), t_rDetail["lvl"]);
  var t_rText = callMethod("render", callNamed("getWriter", meProp(_me, "m_sWriter2Id")), t_sLevel);
  t_rRect = t_rText.rect;
  var t_rcItemSize = t_rThumb.rect;
  var t_rcOff = callNamed("rect", 0, 0, 0, 0);
  var t_rcRightCorner = lingoBinary("add", t_rcOff, new LingoList([lingoBinary("add", t_rcItemSize[3], 7), t_rcItemSize[4], lingoBinary("add", t_rcItemSize[3], 7), t_rcItemSize[4]]));
  var t_rcTextCorner = new LingoList([-float(t_rRect[3]), -float(t_rRect[4]), -float(t_rRect[3]), -float(t_rRect[4])]);
  callMethod("copyPixels", t_rThumb, t_rText, lingoBinary("add", lingoBinary("add", t_rRect, t_rcRightCorner), t_rcTextCorner), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  t_rText = callMethod("render", callNamed("getWriter", meProp(_me, "m_sWriterID")), t_sLevel);
  t_rRect = t_rText.rect;
  t_rcTextCorner = lingoBinary("add", t_rcTextCorner, new LingoList([-float(1), -float(1), -float(1), -float(1)]));
  callMethod("copyPixels", t_rThumb, t_rText, lingoBinary("add", lingoBinary("add", t_rRect, t_rcRightCorner), t_rcTextCorner), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  }

  if (lingoBinary("eq", t_rItem.state, symbol("normal"))) {
  var t_iBlend = 100;
  } else {
  t_iBlend = 50;
  }

  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), t_iBlend, symbol("items"), t_rItem[symbol("items")], symbol("group"), t_rItem[symbol("group")]]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWindow"), "thumbs.grid.b"))
  callMethod("ShowSelected", _this)
  }

}

