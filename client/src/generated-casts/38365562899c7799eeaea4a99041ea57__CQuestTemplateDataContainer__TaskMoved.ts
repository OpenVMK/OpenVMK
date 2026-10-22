// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / TaskMoved

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskMoved(_me: LingoMe, t_ar_data: LingoValue) {
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("TaskMoved", t_rCurrentPage, t_ar_data)
  if (t_ar_data[symbol("up")]) {
  var t_iDirection = -float(1);
  } else {
  t_iDirection = 1;
  }

  meProp(_me, "m_ar_data")[symbol("testingRequired")] = 1;
  var t_iPos = lingoBinary("add", t_ar_data[symbol("taskNumber")], 1);
  if (lingoBinary("gt", t_iPos, 0)) {
  var t_iNewPos = lingoBinary("add", t_iPos, t_iDirection);
  if (lingoBinary("and", lingoBinary("gt", t_iNewPos, 0), lingoBinary("lte", t_iNewPos, meProp(_me, "m_ar_data")[symbol("task_array")].count))) {
  var t_rTask = meProp(_me, "m_ar_data")[symbol("task_array")][t_iPos];
  callMethod("deleteAt", meProp(_me, "m_ar_data")[symbol("task_array")], t_iPos)
  callMethod("addAt", meProp(_me, "m_ar_data")[symbol("task_array")], t_iNewPos, t_rTask)
  }

  }

}

