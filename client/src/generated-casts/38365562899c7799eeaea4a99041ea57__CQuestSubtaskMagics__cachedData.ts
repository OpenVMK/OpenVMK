// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMagics / cachedData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function cachedData(_me: LingoMe, t_ar_data: LingoValue) {
  setMeProp(_me, "m_ar_magics", callNamed("getAvailableMagics"));
  var t_mp_ThumbsData = new LingoPropList([]);
  if (callNamed("listp", meProp(_me, "m_ar_magics"))) {
  for (var i = 1; i <= meProp(_me, "m_ar_magics").count; ++i) {
  callMethod("addProp", t_mp_ThumbsData, meProp(_me, "m_ar_magics")[i].id, undefined)
  }

  }

  callNamed("executeMessage", "GetPinThumbnail", t_mp_ThumbsData, new LingoPropList([symbol("client"), callMethod("getID", _me), symbol("method"), symbol("_PinThumbsReadyCbk")]))
}

