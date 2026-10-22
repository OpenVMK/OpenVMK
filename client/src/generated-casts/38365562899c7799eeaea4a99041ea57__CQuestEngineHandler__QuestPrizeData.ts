// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / QuestPrizeData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestPrizeData(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("taken_prize_count"), symbol("int"), symbol("remaining_prize_count"), symbol("Array"), new LingoPropList([symbol("int"), symbol("credits"), symbol("int"), symbol("categoryTime"), symbol("int"), symbol("item_count"), symbol("Array"), new LingoPropList([symbol("int"), symbol("itemCode")])])]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  callMethod("QuestPrizeData", callMethod("getComponent", _me), t_ar_out)
}

