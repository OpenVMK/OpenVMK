// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, tBool: LingoValue) {
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2850, symbol("QuestTemplateData"))
  callMethod("setaProp", tMsgs, 2851, symbol("TaskPrepareData"))
  callMethod("setaProp", tMsgs, 2852, symbol("QuestInstanceData"))
  callMethod("setaProp", tMsgs, 2853, symbol("CurrentTaskData"))
  callMethod("setaProp", tMsgs, 2854, symbol("TaskNotification"))
  callMethod("setaProp", tMsgs, 2855, symbol("QuestCompleted"))
  callMethod("setaProp", tMsgs, 2856, symbol("QuestTerminated"))
  callMethod("setaProp", tMsgs, 2857, symbol("PrizeItemAdded"))
  callMethod("setaProp", tMsgs, 2858, symbol("PrizeCreditsAdded"))
  callMethod("setaProp", tMsgs, 2859, symbol("PrizeItemRemoved"))
  callMethod("setaProp", tMsgs, 2860, symbol("TaskAdded"))
  callMethod("setaProp", tMsgs, 2861, symbol("TaskUpdated"))
  callMethod("setaProp", tMsgs, 2862, symbol("TaskDeleted"))
  callMethod("setaProp", tMsgs, 2863, symbol("TaskMoved"))
  callMethod("setaProp", tMsgs, 2864, symbol("TaskDescUpdated"))
  callMethod("setaProp", tMsgs, 2866, symbol("PrizeCreditsRemoved"))
  callMethod("setaProp", tMsgs, 2867, symbol("CannedTextParsingFailed"))
  callMethod("setaProp", tMsgs, 2868, symbol("QuestSaved"))
  callMethod("setaProp", tMsgs, 2869, symbol("ShowFindableItem"))
  callMethod("setaProp", tMsgs, 2870, symbol("HideFindableItem"))
  callMethod("setaProp", tMsgs, 2871, symbol("QuestCleared"))
  callMethod("setaProp", tMsgs, 2872, symbol("TaskTimeLimitSet"))
  callMethod("setaProp", tMsgs, 2873, symbol("QuestTestSuccess"))
  callMethod("setaProp", tMsgs, 2874, symbol("PrizeCleared"))
  callMethod("setaProp", tMsgs, 2875, symbol("QuestAuthorHallOfFame"))
  callMethod("setaProp", tMsgs, 2876, symbol("QuestPrizeData"))
  var tCmds = new LingoPropList([]);
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}

