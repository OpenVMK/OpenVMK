// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / TaskDescUpdated

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskDescUpdated(_me: LingoMe, t_ar_data: LingoValue) {
  var t_ID = lingoBinary("add", t_ar_data[symbol("taskNumber")], 1);
  meProp(_me, "m_ar_data")[symbol("task_array")][t_ID][symbol("desc")] = t_ar_data[symbol("newDesc")];
  meProp(_me, "m_ar_data")[symbol("task_array")][t_ID][symbol("photoId")] = t_ar_data[symbol("photoId")];
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("updateTaskInfo", t_rCurrentPage)
  meProp(_me, "m_ar_data")[symbol("testingRequired")] = 1;
  callMethod("checkTestingStatus", _me)
}

