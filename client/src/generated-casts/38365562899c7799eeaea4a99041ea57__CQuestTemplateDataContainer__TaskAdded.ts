// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / TaskAdded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskAdded(_me: LingoMe, t_ar_data: LingoValue) {
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("TaskAdded", t_rCurrentPage, t_ar_data)
  var t_ar_taskData = new LingoPropList([symbol("taskType"), t_ar_data[symbol("taskType")], symbol("desc"), t_ar_data[symbol("description")], symbol("photoId"), t_ar_data[symbol("photoId")], symbol("timeLimitInSecs"), 0]);
  callMethod("deleteProp", t_ar_data, symbol("taskNumber"))
  callMethod("deleteProp", t_ar_data, symbol("taskType"))
  callMethod("deleteProp", t_ar_data, symbol("photoId"))
  callMethod("deleteProp", t_ar_data, symbol("description"))
  for (var i = 1; i <= t_ar_data.count; ++i) {
  var t_sProp = callMethod("getPropAt", t_ar_data, i);
  var t_iValue = t_ar_data[i];
  callMethod("addProp", t_ar_taskData, t_sProp, t_iValue)
  }

  callMethod("append", meProp(_me, "m_ar_data")[symbol("task_array")], t_ar_taskData)
  meProp(_me, "m_ar_data")[symbol("testingRequired")] = 1;
  callMethod("checkTestingStatus", _me)
}

