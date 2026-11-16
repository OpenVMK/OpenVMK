// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAcquireItem / _FurniThumbsReadyCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FurniThumbsReadyCbk(_me: LingoMe, _this: LingoValue, a_mp_iType_rThumb: LingoValue) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_ar_rThumbs = new LingoList([]);
  var t_iCount = a_mp_iType_rThumb.count;
  for (var i = 1; i <= t_iCount; ++i) {
  callMethod("add", t_ar_rThumbs, new LingoPropList([symbol("thumbnail"), a_mp_iType_rThumb[i], symbol("blend"), 100]))
  }

  callMethod("render", meProp(_me, "m_rGridRenderer"), t_ar_rThumbs, callMethod("getElement", meProp(_me, "m_rWindow"), "tra.objects"))
  }

}

