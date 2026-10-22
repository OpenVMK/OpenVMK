// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / TaskNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskNotification(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("questTemplateId"), symbol("str"), symbol("questName"), symbol("int"), symbol("taskNumber"), symbol("int"), symbol("totalTaskCount"), symbol("int"), symbol("questDurationInSecs"), symbol("int"), symbol("failed"), symbol("int"), symbol("taskType"), symbol("int"), symbol("timedOut"), symbol("int"), symbol("solvedImmediately"), symbol("tasksettings"), symbol("undefined")]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  callMethod("TaskNotification", callMethod("getComponent", _me), t_ar_out)
}

