// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / getCachedData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getCachedData(_me: LingoMe, a_iTaskType: LingoValue, a_sCallbackID: LingoValue, a_bClientData: LingoValue) {
  var t_ar_cachedata = meProp(_me, "m_ar_cache")[a_iTaskType._string];
  if (callNamed("voidp", t_ar_cachedata)) {
  t_ar_cachedata = callMethod("createEmptyCacheItem", _me, a_iTaskType);
  }

  t_ar_cachedata[symbol("callback")] = a_sCallbackID;
  if (callNamed("voidp", t_ar_cachedata[symbol("data")])) {
  if ((lingoTruthy(a_bClientData) ? 0 : 1)) {
  callMethod("PrepareTask", callMethod("getHandler", _me), new LingoList([0, 1, a_iTaskType, 0]))
  } else {
  }

  } else {
  callMethod("notifyCacheObject", _me, a_iTaskType)
  }

}

