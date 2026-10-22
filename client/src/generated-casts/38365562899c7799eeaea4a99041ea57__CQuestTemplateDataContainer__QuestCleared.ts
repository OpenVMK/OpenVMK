// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / QuestCleared

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestCleared(_me: LingoMe, t_ar_data: LingoValue) {
  if (t_ar_data[symbol("tasksCleared")]) {
  meProp(_me, "m_ar_data")[symbol("task_count")] = 0;
  meProp(_me, "m_ar_data")[symbol("task_array")] = new LingoList([]);
  }

  if (t_ar_data[symbol("prizesCleared")]) {
  meProp(_me, "m_ar_data")[symbol("prize_count")] = 0;
  meProp(_me, "m_ar_data")[symbol("prize_array")] = new LingoList([]);
  }

  if (t_ar_data[symbol("propertiesCleared")]) {
  meProp(_me, "m_ar_data")[symbol("questName")] = "";
  meProp(_me, "m_ar_data")[symbol("description")] = "";
  meProp(_me, "m_ar_data")[symbol("prizingMode")] = 0;
  meProp(_me, "m_ar_data")[symbol("questDurationInSecs")] = 0;
  }

  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("QuestCleared", t_rCurrentPage, t_ar_data)
  if (lingoBinary("eq", meProp(_me, "m_sCurrentPage"), "step2")) {
  callMethod("updateCurrentCategory", t_rCurrentPage)
  }

  callNamed("createTimeout", callNamed("getUniqueID"), 500, symbol("updateCredits"), callMethod("getID", _me), undefined, 1)
  meProp(_me, "m_ar_data")[symbol("testingRequired")] = 1;
  callMethod("checkTestingStatus", _me)
}

