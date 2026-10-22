// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / TaskUpdated

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskUpdated(_me: LingoMe, t_ar_data: LingoValue) {
  var t_iTaskIndex = lingoBinary("add", t_ar_data[symbol("taskNumber")], 1);
  if (lingoBinary("lte", t_iTaskIndex, meProp(_me, "m_ar_data")[symbol("task_array")].count)) {
  callMethod("deleteProp", t_ar_data, symbol("taskNumber"))
  callMethod("deleteProp", t_ar_data, symbol("taskType"))
  for (var i = 1; i <= t_ar_data.count; ++i) {
  var t_sProp = callMethod("getPropAt", t_ar_data, i);
  var t_iValue = t_ar_data[i];
  meProp(_me, "m_ar_data")[symbol("task_array")][t_iTaskIndex][t_sProp] = t_iValue;
  }

  }

  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("updateTaskInfo", t_rCurrentPage)
  meProp(_me, "m_ar_data")[symbol("testingRequired")] = 1;
  callMethod("checkTestingStatus", _me)
}

