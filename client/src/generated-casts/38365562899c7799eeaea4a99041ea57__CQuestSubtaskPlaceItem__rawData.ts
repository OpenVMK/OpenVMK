// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceItem / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Update Task Place Item", t_ar_data))
  setMeProp(_me, "m_ar_data", t_ar_data);
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("taskType")] = t_ar_data[symbol("taskType")];
  t_ar_results[symbol("questTemplateId")] = t_ar_data[symbol("questTemplateId")];
  t_ar_results[symbol("activeTaskRank")] = t_ar_data[symbol("activeTaskRank")];
  callMethod("appendSubResult", t_rManager, t_ar_results)
  }

}

