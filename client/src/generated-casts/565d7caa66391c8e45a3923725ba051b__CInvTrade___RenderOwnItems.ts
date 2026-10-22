// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / _RenderOwnItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RenderOwnItems(_me: LingoMe, _this: LingoValue, a_mp_iType_rImage: LingoValue, a_rCallback: LingoValue) {
  if (_this.valid) {
  if (lingoBinary("eq", a_rCallback[symbol("request")], meProp(_me, "m_iOwnGridRequest"))) {
  callMethod("SetBufferElement", meProp(_me, "m_rOwnGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rOwnGridLoadAnim")))
  setMeProp(_me, "m_bLoadingOwnThumbs", 0);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iCount = a_mp_iType_rImage.count;
  var t_rStar = callNamed("getMember", "inv.pin.star.thumb").image;
  var t_rRect = t_rStar.rect;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rThumb = a_mp_iType_rImage[i];
  var t_rItem = meProp(_me, "m_mp_iRef_rOwnItems")[i];
  var t_iType = t_rItem.code;
  switch (1) {
case lingoBinary("lt", t_iType, 1001):
  var t_kCategory = symbol("item");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 2000), lingoBinary("lt", t_iType, 3001)):
  t_kCategory = symbol("pin");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 3000), lingoBinary("lt", t_iType, 4001)):
  t_kCategory = symbol("poster");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 20000), lingoBinary("lt", t_iType, 50000)):
  t_kCategory = symbol("cloth");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 5000), lingoBinary("lt", t_iType, 6000)):
  t_kCategory = symbol("room");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 6000), lingoBinary("lt", t_iType, 8000)):
  t_kCategory = symbol("pin");
  break;
case lingoBinary("and", lingoBinary("gt", t_iType, 12000), lingoBinary("lt", t_iType, 13001)):
  t_kCategory = symbol("pin");
  break;
  default:
  callNamed("error", _this, lingoBinary("join", lingoBinary("joinPad", "Unknow item category for item number", t_iType), "!"), symbol("_RenderOwnItems"))
  t_kCategory = symbol("unknown");
  }

  if (lingoBinary("eq", t_kCategory, symbol("pin"))) {
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

  }

  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), 100]))
  }

  callMethod("render", meProp(_me, "m_rGridOwnItems"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWindow"), "tra.mystuff"))
  }

  }

  }

}

