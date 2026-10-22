// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / QuestTemplateData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestTemplateData(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("questTemplateId"), symbol("str"), symbol("questName"), symbol("str"), symbol("description"), symbol("int"), symbol("prizingMode"), symbol("int"), symbol("status"), symbol("int"), symbol("questDurationInSecs"), symbol("int"), symbol("task_count"), symbol("Array"), new LingoPropList([symbol("int"), symbol("taskType"), symbol("str"), symbol("desc"), symbol("int"), symbol("photoId"), symbol("int"), symbol("timeLimitInSecs"), symbol("tasksettings"), symbol("undefined")]), symbol("int"), symbol("prize_count"), symbol("Array"), new LingoPropList([symbol("int"), symbol("credits"), symbol("int"), symbol("item_count"), symbol("Array"), new LingoPropList([symbol("int"), symbol("itemReference"), symbol("int"), symbol("itemCode")])]), symbol("int"), symbol("testingRequired")]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  callNamed("put", lingoBinary("joinPad", "QuestEngine->QuestTemplateData", t_ar_out))
  callMethod("QuestTemplateData", callMethod("getComponent", _me), t_ar_out)
}

