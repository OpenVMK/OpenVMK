// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / QuestDialogBroadcastEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestDialogBroadcastEvent(_me: LingoMe, t_iManagerID: LingoValue, t_ar_results: LingoValue) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "QuestTemplate.DataContainer->BroadCastEvent results:", t_iManagerID), t_ar_results))
  if (t_ar_results[symbol("releaseQuest")]) {
  var t_ar_cmd = new LingoList([]);
  callMethod("append", t_ar_cmd, meProp(_me, "m_ar_data")[symbol("questTemplateId")])
  callMethod("PublishQuest", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  } else {
  if (t_ar_results[symbol("StartQuest")]) {
  }

  t_ar_cmd = new LingoList([]);
  callMethod("append", t_ar_cmd, meProp(_me, "m_ar_data")[symbol("questTemplateId")])
  callMethod("append", t_ar_cmd, t_ar_results[symbol("StartQuest")])
  callMethod("append", t_ar_cmd, meProp(_me, "m_ar_data")[symbol("prizingMode")])
  callMethod("append", t_ar_cmd, meProp(_me, "m_ar_data")[symbol("questDurationInSecs")])
  callMethod("append", t_ar_cmd, callNamed("ParseCannedText", meProp(_me, "m_ar_data")[symbol("questName")], new LingoList([])))
  callMethod("append", t_ar_cmd, callNamed("ParseCannedText", meProp(_me, "m_ar_data")[symbol("description")], new LingoList([])))
  callMethod("SaveQuest", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  }

}

