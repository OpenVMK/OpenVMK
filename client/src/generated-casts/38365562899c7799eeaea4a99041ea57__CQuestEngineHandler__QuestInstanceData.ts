// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / QuestInstanceData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestInstanceData(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("questTemplateId"), symbol("int"), symbol("official"), symbol("int"), symbol("owner"), symbol("str"), symbol("questOwnerName"), symbol("str"), symbol("questName"), symbol("str"), symbol("description"), symbol("int"), symbol("prizingMode"), symbol("int"), symbol("visibility"), symbol("int"), symbol("taskCount"), symbol("int"), symbol("remainingQuestDurationInSecs"), symbol("int"), symbol("rating"), symbol("int"), symbol("authorRating"), symbol("int"), symbol("playerJoinCount"), symbol("int"), symbol("playerCompleteCount"), symbol("int"), symbol("taken_prize_count"), symbol("int"), symbol("remaining_prize_count"), symbol("Array"), new LingoPropList([symbol("int"), symbol("credits"), symbol("int"), symbol("categoryTime"), symbol("int"), symbol("item_count"), symbol("Array"), new LingoPropList([symbol("int"), symbol("itemCode")])]), symbol("int"), symbol("player_count"), symbol("Array"), new LingoPropList([symbol("str"), symbol("player_name"), symbol("int"), symbol("completionTimeIsSecs")]), symbol("int"), symbol("officialQuestCount"), symbol("int"), symbol("officialQuestIndex"), symbol("int"), symbol("spaceSpecific"), symbol("int"), symbol("expired"), symbol("bool"), symbol("avatarOnQuest")]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  callMethod("QuestInstanceData", callMethod("getComponent", _me), t_ar_out)
}

