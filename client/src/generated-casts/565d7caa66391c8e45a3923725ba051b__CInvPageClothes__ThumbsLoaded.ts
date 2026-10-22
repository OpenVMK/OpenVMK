// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageClothes / ThumbsLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ThumbsLoaded(_me: LingoMe, _this: LingoValue, a_mp_iType_rThumb: LingoValue, a_rCallback: LingoValue) {
  if (_this.valid) {
  if (lingoBinary("eq", meProp(_me, "m_iLoadingRequest"), a_rCallback[symbol("request")])) {
  if (callNamed("objectp", meProp(_me, "m_rGridLoadAnimator"))) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnimator"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnimator")))
  }

  setMeProp(_me, "m_bLoadingThumbs", 0);
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_rWindow")), callNamed("listp", a_mp_iType_rThumb))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iCount = a_mp_iType_rThumb.count;
  var t_iOffset = lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage"));
  var t_ar_rItems = callMethod("GetItemListByCategory", callMethod("GetInventory", callNamed("getThread", "inventory").component, 1), symbol("clothes"));
  var t_ar_rDetails = callMethod("GetItemDetailsByCategory", callMethod("GetInventory", callNamed("getThread", "inventory").component, 1), symbol("clothes"));
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iID = callNamed("string", callMethod("getPropAt", a_mp_iType_rThumb, i));
  var t_rThumb = a_mp_iType_rThumb[i];
  if (callNamed("voidp", t_rThumb)) {
  if (callNamed("objectExists", "ClothesThumbCache")) {
  var t_mp_rData = callMethod("GetCachedItem", callNamed("getObject", "ClothesThumbCache"), t_iID);
  if (callNamed("listp", t_mp_rData)) {
  if (lingoBinary("gt", callMethod("findPos", t_mp_rData, symbol("thumb")), 0)) {
  t_rThumb = t_mp_rData.thumb;
  }

  }

  }

  }

  var t_rItem = t_ar_rItems[i];
  var t_rDetail = t_ar_rDetails[t_rItem[symbol("group")]];
  if ((lingoTruthy(callNamed("voidp", t_rThumb)) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", t_rDetail)) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", t_rDetail["lvl"])) ? 0 : 1)) {
  t_rThumb = callMethod("duplicate", t_rThumb);
  setThePropOf(t_rThumb, "useAlpha", 0);
  var t_sLevel = lingoBinary("joinPad", callNamed("getText", "vmks.thumb.lvl", "LVL"), t_rDetail["lvl"]);
  var t_rText = callMethod("render", callNamed("getWriter", meProp(_me, "m_sWriter2Id")), t_sLevel);
  var t_rRect = t_rText.rect;
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

  t_rItem = meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("clothes")][lingoBinary("add", t_iOffset, i)];
  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), 100, symbol("items"), t_rItem[symbol("items")], symbol("group"), t_rItem[symbol("group")]]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWindow"), "thumbs.grid.b"))
  callMethod("ShowSelected", _this)
  }

  }

  }

}

