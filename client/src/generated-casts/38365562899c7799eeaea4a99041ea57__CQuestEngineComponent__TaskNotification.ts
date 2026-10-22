// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / TaskNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskNotification(_me: LingoMe, t_ar_data: LingoValue) {
  if (t_ar_data[symbol("failed")]) {
  callNamed("CreateQuestNotification", "QuestNotificationTaskFailed", _me, new LingoList(["taskfailed"]), "floating", t_ar_data)
  callNamed("executeMessage", "PlayInterfaceSound", "QE_task_failed")
  callMethod("removeHints", _me)
  callMethod("HideFindableItem", _me)
  } else {
  callNamed("CreateQuestNotification", "QuestNotificationTaskCompleted", _me, new LingoList(["taskcompleted"]), "floating", t_ar_data)
  callNamed("executeMessage", "PlayInterfaceSound", "QE_task_completed")
  callMethod("removeHints", _me)
  callMethod("HideFindableItem", _me)
  }

}

