// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / TaskDeleted

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskDeleted(_me: LingoMe, t_ar_data: LingoValue) {
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("TaskDeleted", t_rCurrentPage, t_ar_data)
  callMethod("deleteAt", meProp(_me, "m_ar_data")[symbol("task_array")], lingoBinary("add", t_ar_data[symbol("taskNumber")], 1))
  callMethod("checkTestingStatus", _me)
}

