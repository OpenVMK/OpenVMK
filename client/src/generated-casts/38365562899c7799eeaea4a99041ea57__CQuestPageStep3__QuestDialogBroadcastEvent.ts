// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / QuestDialogBroadcastEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestDialogBroadcastEvent(_me: LingoMe, t_iManagerID: LingoValue, t_ar_results: LingoValue) {
  var t_rManager = callMethod("getManager", _me);
  switch (t_iManagerID) {
case "QuestNotificationStartQuest":
  var t_ar_data = new LingoPropList([]);
  t_ar_data[symbol("StartQuest")] = t_ar_results[symbol("testQuest")];
  t_ar_data[symbol("releaseQuest")] = t_ar_results[symbol("releaseQuest")];
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_data)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "QuestNotificationStep3SetTime":
  callMethod("setDuration", _me, t_ar_results[symbol("duration")])
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "CQuestPageStep3. Unknown Quest Dialog", t_iManagerID))
  }

}

