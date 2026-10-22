// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / QuestCompleted

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestCompleted(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("questTemplateId"), symbol("int"), symbol("avatarQuestId"), symbol("str"), symbol("questName"), symbol("int"), symbol("questDurationInSecs"), symbol("int"), symbol("prizingMode"), symbol("int"), symbol("rank"), symbol("int"), symbol("credits"), symbol("int"), symbol("item_count"), symbol("Array"), new LingoPropList([symbol("int"), symbol("itemCode")]), symbol("int"), symbol("remainingQuestDurationInSecs")]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  callMethod("QuestCompleted", callMethod("getComponent", _me), t_ar_out)
}

