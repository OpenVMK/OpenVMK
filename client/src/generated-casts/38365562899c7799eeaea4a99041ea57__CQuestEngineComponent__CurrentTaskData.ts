// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / CurrentTaskData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CurrentTaskData(_me: LingoMe, t_ar_data: LingoValue) {
  if (lingoBinary("gt", t_ar_data[symbol("option_count")], 0)) {
  callNamed("CreateQuestNotification", "QuestNotificationMultipleChoice", _me, new LingoList(["multiplechoice"]), "floating", t_ar_data)
  } else {
  callNamed("CreateQuestNotification", "QuestNotificationTaskHint", _me, new LingoList(["taskhint"]), "floating", t_ar_data)
  }

}

