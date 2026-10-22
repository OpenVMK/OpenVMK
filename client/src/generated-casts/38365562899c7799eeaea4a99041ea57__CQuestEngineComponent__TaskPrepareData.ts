// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / TaskPrepareData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskPrepareData(_me: LingoMe, t_ar_data: LingoValue) {
  var t_iTaskType = t_ar_data[symbol("taskType")];
  var t_ar_cachedata = meProp(_me, "m_ar_cache")[t_iTaskType._string];
  if (callNamed("voidp", t_ar_cachedata)) {
  t_ar_cachedata = callMethod("createEmptyCacheItem", _me, t_iTaskType);
  }

  t_ar_cachedata[symbol("data")] = t_ar_data[symbol("item_array")];
  callMethod("notifyCacheObject", _me, t_iTaskType)
}

