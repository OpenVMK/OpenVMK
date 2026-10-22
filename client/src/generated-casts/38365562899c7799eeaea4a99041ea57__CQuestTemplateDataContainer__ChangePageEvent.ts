// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / ChangePageEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangePageEvent(_me: LingoMe, t_iManagerID: LingoValue, t_sPageName: LingoValue) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Quest Template Change Page Event Received", t_iManagerID), t_sPageName))
  setMeProp(_me, "m_sCurrentPage", t_sPageName);
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  switch (t_sPageName) {
case "step1":
  if (callNamed("objectp", t_rCurrentPage)) {
  for (var t_ar_taskData of meProp(_me, "m_ar_data")[symbol("task_array")].toArray()) {
  callMethod("AddTask", t_rCurrentPage, t_ar_taskData)
  }

  callMethod("checkTestingStatus", _me)
  }

  break;
case "step2":
  if ((lingoTruthy(callMethod("getInventoryLoaded", callMethod("getComponent", callNamed("getThread", "inventory")))) ? 0 : 1)) {
  callNamed("put", "ERROR, inventory has not been loaded")
  callMethod("_LoadInventory", callMethod("getComponent", callNamed("getThread", "inventory")))
  }

  if (callNamed("objectp", t_rCurrentPage)) {
  callMethod("setCredits", t_rCurrentPage, callMethod("get", callNamed("getObject", symbol("session")), "user_credits"))
  callMethod("setPrize", t_rCurrentPage, 0)
  for (var i = 1; i <= meProp(_me, "m_ar_data")[symbol("prize_array")].count; ++i) {
  var t_ar_prizeData = meProp(_me, "m_ar_data")[symbol("prize_array")][i];
  callMethod("updatePrizeRank", t_rCurrentPage, t_ar_prizeData, i)
  }

  callMethod("checkTestingStatus", _me)
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_data")[symbol("prize_array")].count, 0)) {
  callMethod("AddPrizeCredits", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([meProp(_me, "m_ar_data")[symbol("questTemplateId")], 0, 0]))
  }

  break;
case "step3":
  if (callNamed("objectp", t_rCurrentPage)) {
  callMethod("setPrizingMode", t_rCurrentPage, meProp(_me, "m_ar_data")[symbol("prizingMode")])
  callMethod("SetName", t_rCurrentPage, meProp(_me, "m_ar_data")[symbol("questName")])
  callMethod("setDuration", t_rCurrentPage, meProp(_me, "m_ar_data")[symbol("questDurationInSecs")])
  callMethod("setDescription", t_rCurrentPage, meProp(_me, "m_ar_data")[symbol("description")])
  callMethod("checkTestingStatus", _me)
  }

  break;
case "startquest":
  if (callNamed("objectp", t_rCurrentPage)) {
  callMethod("rawData", t_rCurrentPage, meProp(_me, "m_ar_data"))
  }

  break;
  default:
  callNamed("put", "Unknown page")
  }

}

