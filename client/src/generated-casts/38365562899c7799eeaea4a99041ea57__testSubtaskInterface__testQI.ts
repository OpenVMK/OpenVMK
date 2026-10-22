// 38365562899c7799eeaea4a99041ea57.cct / testSubtaskInterface / testQI

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function testQI(_me: LingoMe) {
  var t = new LingoPropList([symbol("questTemplateId"), 33, symbol("official"), 1, symbol("owner"), 0, symbol("questOwnerName"), "wille", symbol("questName"), "Sitting Quest", symbol("description"), "This is my first hello again", symbol("prizingMode"), 1, symbol("visibility"), 3, symbol("taskCount"), 6, symbol("remainingQuestDurationInSecs"), 887, symbol("rating"), 0, symbol("authorRating"), 0, symbol("playerJoinCount"), 1, symbol("playerCompleteCount"), 0, symbol("taken_prize_count"), 0, symbol("remaining_prize_count"), 2, symbol("remaining_prize_array"), new LingoList([new LingoPropList([symbol("credits"), 50, symbol("categoryTime"), 0, symbol("item_count"), 2, symbol("item_array"), new LingoList([new LingoPropList([symbol("itemCode"), 190]), new LingoPropList([symbol("itemCode"), 1])])]), new LingoPropList([symbol("credits"), 30, symbol("categoryTime"), 0, symbol("item_count"), 2, symbol("item_array"), new LingoList([new LingoPropList([symbol("itemCode"), 305]), new LingoPropList([symbol("itemCode"), 5])])])]), symbol("player_count"), 0, symbol("player_array"), new LingoList([]), symbol("officialQuestCount"), 1, symbol("officialQuestIndex"), 0]);
  t[symbol("player_count")] = 10;
  var t_player = new LingoPropList([symbol("player_name"), "test", symbol("completionTimeIsSecs"), 100]);
  for (var i = 1; i <= t[symbol("player_count")]; ++i) {
  callMethod("append", t[symbol("player_array")], callMethod("duplicate", t_player))
  }

  callMethod("QuestInstanceData", callMethod("getComponent", callNamed("getThread", symbol("QuestEngine"))), t)
}

