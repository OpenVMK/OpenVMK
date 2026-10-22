// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / QuestTerminated

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestTerminated(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("CreateQuestNotification", "QuestNotificationQuestTerminated", _me, new LingoList(["questcancelled"]), "floating", t_ar_data)
  callNamed("executeMessage", "PlayInterfaceSound", "QE_quest_cancelled")
  callMethod("HideFindableItem", _me)
}

