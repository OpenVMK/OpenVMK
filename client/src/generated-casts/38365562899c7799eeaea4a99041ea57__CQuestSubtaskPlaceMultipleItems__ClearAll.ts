// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / ClearAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearAll(_me: LingoMe) {
  setMeProp(_me, "m_ar_items", new LingoList([]));
  var t_ar_ItemData = new LingoPropList([symbol("item_count"), meProp(_me, "m_ar_items").count, symbol("item_array"), meProp(_me, "m_ar_items")]);
  callMethod("ViewFindableItems", callMethod("getComponent", callNamed("getThread", symbol("QuestEngine"))), t_ar_ItemData)
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.place.continue", 0)
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.items.dropped", meProp(_me, "m_ar_items").count._string)
  meProp(_me, "m_ar_defaults")[symbol("max")] = 1;
  setMeProp(_me, "m_iCurrentScore", 1);
  callMethod("setAmount", _me, meProp(_me, "m_iCurrentScore"))
}

