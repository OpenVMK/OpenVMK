// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / QuestDialogBroadcastEvent

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
  if (callNamed("objectp", t_rManager)) {
  var t_rOwner = callMethod("GetOwner", t_rManager);
  }

  var t_ar_questData = callMethod("getData", t_rOwner);
  switch (t_iManagerID) {
case "QuestDialogManagerAddTask":
  if (lingoBinary("contains", t_ar_results[symbol("task")], "addtask.")) {
  var t_oldDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ".");
  var t_iTaskID = callNamed("integer", t_ar_results[symbol("task")].item[2]);
  setTheProperty("itemDelimiter", t_oldDelim);
  var t_ar_cmd = new LingoList([t_ar_questData[symbol("questTemplateId")], t_iTaskID, t_ar_results[symbol("photo")], t_ar_results[symbol("hint")]]);
  switch (t_ar_results[symbol("task")]) {
case "addtask.1":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("npc")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.2":
  var t_ar_data = new LingoPropList([]);
  t_ar_data[symbol("taskType")] = 2;
  t_ar_data[symbol("questTemplateId")] = t_ar_questData[symbol("questTemplateId")];
  t_ar_data[symbol("activeTaskRank")] = 1;
  t_ar_data[symbol("required")] = 0;
  t_ar_data[symbol("item_count")] = 0;
  t_ar_data[symbol("item_array")] = new LingoList([]);
  callNamed("CreateQuestNotification", "QuestPlaceItem", callMethod("getComponent", callNamed("getThread", symbol("QuestEngine"))), new LingoList(["placeitem", "writehint"]), "floating", t_ar_data)
  callMethod("hide", t_rOwner)
  break;
case "addtask.3":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("room")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.4":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("GameID")])
  callMethod("append", t_ar_cmd, t_ar_results[symbol("score")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.5":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("magicEffectCode")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.6":
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.7":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("phrase")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.8":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("amount")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.9":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("amount")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.10":
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.11":
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.12":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("emoticon")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.13":
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.14":
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.15":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("itemCode")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.16":
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.17":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("correctAnswerID")])
  callMethod("append", t_ar_cmd, t_ar_results[symbol("answers")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.18":
  callMethod("append", t_ar_cmd, t_ar_results[symbol("itemCode")])
  callMethod("append", t_ar_cmd, t_ar_results[symbol("amount")])
  callMethod("AddTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "addtask.19":
  t_ar_data = new LingoPropList([]);
  t_ar_data[symbol("taskType")] = 2;
  t_ar_data[symbol("questTemplateId")] = t_ar_questData[symbol("questTemplateId")];
  t_ar_data[symbol("activeTaskRank")] = 1;
  t_ar_data[symbol("required")] = 0;
  t_ar_data[symbol("item_count")] = 0;
  t_ar_data[symbol("item_array")] = new LingoList([]);
  callNamed("CreateQuestNotification", "QuestPlaceMulti", callMethod("getComponent", callNamed("getThread", symbol("QuestEngine"))), new LingoList(["placemulti", "writehint"]), "floating", t_ar_data)
  callMethod("hide", t_rOwner)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Quest Step1, problem with subtask", t_ar_results[symbol("task")]))
  }

  }

  break;
case "QuestNotificationStep1TaskHint":
  t_ar_cmd = new LingoList([t_ar_questData[symbol("questTemplateId")], lingoBinary("sub", meProp(_me, "m_iActiveTaskID"), 1), t_ar_results[symbol("photo")], t_ar_results[symbol("hint")]]);
  callMethod("UpdateTaskDesc", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "QuestNotificationStep1TaskTimeLimit":
  t_ar_cmd = new LingoList([t_ar_questData[symbol("questTemplateId")], lingoBinary("sub", meProp(_me, "m_iActiveTaskID"), 1), t_ar_results[symbol("timeLimitInSecs")]]);
  callMethod("UpdateTaskTimeLimit", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case "QuestNotificationUpdateTask":
  t_ar_cmd = new LingoList([t_ar_questData[symbol("questTemplateId")], t_ar_results[symbol("taskType")], lingoBinary("sub", meProp(_me, "m_iActiveTaskID"), 1)]);
  switch (t_ar_results[symbol("taskType")]) {
case 1:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("npc")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 2:
  callNamed("put", "TO DO")
  break;
case 3:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("room")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 4:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("GameID")])
  callMethod("append", t_ar_cmd, t_ar_results[symbol("score")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 5:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("magicEffectCode")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 6:
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 7:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("phrase")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 8:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("amount")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 9:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("amount")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 10:
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 11:
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 12:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("emoticon")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 13:
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 14:
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 15:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("itemCode")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 16:
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 17:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("correctAnswerID")])
  callMethod("append", t_ar_cmd, t_ar_results[symbol("answers")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 18:
  callMethod("append", t_ar_cmd, t_ar_results[symbol("itemCode")])
  callMethod("append", t_ar_cmd, t_ar_results[symbol("amount")])
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  break;
case 19:
  callNamed("put", "Just hide the Multi-window?")
  break;
  default:
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Quest Step1, problem with UPDATING subtask", t_ar_results[symbol("taskType")]), t_ar_results))
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Quest Step1: Unknown manager", t_iManagerID), t_ar_results))
  }

}

