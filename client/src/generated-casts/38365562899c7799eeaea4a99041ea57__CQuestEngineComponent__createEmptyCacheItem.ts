// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / createEmptyCacheItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createEmptyCacheItem(_me: LingoMe, t_iTaskType: LingoValue) {
  var t_ar_cachedata = new LingoPropList([symbol("callback"), undefined, symbol("data"), undefined]);
  meProp(_me, "m_ar_cache")[t_iTaskType._string] = t_ar_cachedata;
  return t_ar_cachedata;
}

