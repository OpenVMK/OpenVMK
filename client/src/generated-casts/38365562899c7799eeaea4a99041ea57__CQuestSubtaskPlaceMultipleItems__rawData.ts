// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  setMeProp(_me, "m_ar_data", t_ar_data);
  setMeProp(_me, "m_ar_items", t_ar_data[symbol("item_array")]);
  meProp(_me, "m_ar_defaults")[symbol("max")] = t_ar_data[symbol("item_array")].count;
  callMethod("setAmount", _me, t_ar_data[symbol("required")])
  var t_ar_ItemData = new LingoPropList([symbol("item_count"), meProp(_me, "m_ar_items").count, symbol("item_array"), meProp(_me, "m_ar_items")]);
  callMethod("ViewFindableItems", callMethod("getComponent", callNamed("getThread", symbol("QuestEngine"))), t_ar_ItemData)
  if (lingoBinary("gt", meProp(_me, "m_ar_items").count, 0)) {
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.place.continue", 1)
  } else {
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.place.continue", 0)
  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.items.dropped", t_ar_data[symbol("item_count")]._string)
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("taskType")] = t_ar_data[symbol("taskType")];
  t_ar_results[symbol("questTemplateId")] = t_ar_data[symbol("questTemplateId")];
  t_ar_results[symbol("activeTaskRank")] = t_ar_data[symbol("activeTaskRank")];
  callMethod("appendSubResult", t_rManager, t_ar_results)
  }

}

