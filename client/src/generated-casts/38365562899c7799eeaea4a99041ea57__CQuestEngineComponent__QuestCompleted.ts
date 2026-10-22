// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / QuestCompleted

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestCompleted(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("CreateQuestNotification", "QuestNotificationQuestCompleted", _me, new LingoList(["questcompleted"]), "floating", t_ar_data)
  callNamed("executeMessage", "PlayInterfaceSound", "QE_quest_completed")
  callMethod("HideFindableItem", _me)
}

