// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / notifyCacheObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function notifyCacheObject(_me: LingoMe, t_iTaskType: LingoValue) {
  var t_ar_cachedata = meProp(_me, "m_ar_cache")[t_iTaskType._string];
  if (callNamed("voidp", t_ar_cachedata)) {
  callNamed("put", lingoBinary("joinPad", "No such cache-entry", t_iTaskType))
  return 0;
  }

  if (callNamed("voidp", t_ar_cachedata[symbol("data")])) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "No data for entry", t_iTaskType), t_ar_cachedata))
  return 0;
  }

  if (callNamed("voidp", t_ar_cachedata[symbol("callback")])) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "No callback-item for entry", t_iTaskType), t_ar_cachedata))
  return 0;
  }

  var t_rCallback = callNamed("getObject", t_ar_cachedata[symbol("callback")]);
  if (lingoBinary("neq", t_rCallback, 0)) {
  callNamed("call", symbol("cachedData"), new LingoList([t_rCallback]), t_ar_cachedata[symbol("data")])
  }

}

