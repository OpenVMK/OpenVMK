// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / CurrentTaskData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CurrentTaskData(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("questTemplateId"), symbol("str"), symbol("questName"), symbol("int"), symbol("taskNumber"), symbol("int"), symbol("totalTaskCount"), symbol("int"), symbol("remainingTaskDurationInSecs"), symbol("int"), symbol("questDurationInSecs"), symbol("str"), symbol("description"), symbol("int"), symbol("photoId"), symbol("int"), symbol("option_count"), symbol("Array"), new LingoPropList([symbol("str"), symbol("optionText")]), symbol("int"), symbol("foundMickeyColor_count"), symbol("Array"), new LingoPropList([symbol("int"), symbol("mickeyColor"), symbol("int"), symbol("mickeyCount")])]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  if (meProp(_me, "m_bDebug")) {
  callNamed("put", lingoBinary("joinPad", "QuestEngine->CurrentTaskData", t_ar_out))
  }

  callMethod("CurrentTaskData", callMethod("getComponent", _me), t_ar_out)
}

