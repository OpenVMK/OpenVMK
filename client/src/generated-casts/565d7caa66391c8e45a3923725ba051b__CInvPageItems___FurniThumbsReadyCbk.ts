// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageItems / _FurniThumbsReadyCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FurniThumbsReadyCbk(_me: LingoMe, _this: LingoValue, a_mp_iType_rThumb: LingoValue, a_rCallback: LingoValue) {
  if (_this.valid) {
  if (lingoBinary("eq", meProp(_me, "m_iLoadingRequest"), a_rCallback[symbol("request")])) {
  if (callNamed("objectp", meProp(_me, "m_rGridLoadAnim"))) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  }

  setMeProp(_me, "m_bLoadingThumbs", 0);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iCount = a_mp_iType_rThumb.count;
  var t_iOffset = lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1), meProp(_me, "m_iItemsPerPage"));
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rItem = meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("items")][lingoBinary("add", t_iOffset, i)];
  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), a_mp_iType_rThumb[i], symbol("blend"), 100, symbol("items"), t_rItem[symbol("items")], symbol("group"), t_rItem[symbol("group")]]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWindow"), "thumbs.grid.b"))
  if (_this.m_rWindow.pVisible) {
  callMethod("checkTeleporterSelection", _this)
  }

  callMethod("ShowSelected", _this)
  }

  }

  }

}

