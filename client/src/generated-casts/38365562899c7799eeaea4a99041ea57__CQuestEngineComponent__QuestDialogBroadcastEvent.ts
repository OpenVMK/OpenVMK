// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / QuestDialogBroadcastEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestDialogBroadcastEvent(_me: LingoMe, t_iManagerID: LingoValue, t_ar_results: LingoValue) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "QuestEngineComponent.QuestDialogBroadcastEvent: ", t_iManagerID), t_ar_results))
  switch (t_iManagerID) {
case "QuestPlaceItem":
  var t_ar_cmd = new LingoList([t_ar_results[symbol("questTemplateId")], 2, t_ar_results[symbol("photo")], t_ar_results[symbol("hint")], t_ar_results[symbol("tileReference")], t_ar_results[symbol("findableItemCode")]]);
  callMethod("AddTask", callMethod("getHandler", _me), t_ar_cmd)
  var t_ID = t_ar_results[symbol("questTemplateId")];
  callMethod("GotoQuestEngineItem", callMethod("getHandler", _me), new LingoList([t_ID]))
  break;
case "QuestPlaceItemUpdate":
  t_ar_cmd = new LingoList([t_ar_results[symbol("questTemplateId")], 2, t_ar_results[symbol("activeTaskRank")], t_ar_results[symbol("tileReference")], t_ar_results[symbol("findableItemCode")]]);
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  t_ID = t_ar_results[symbol("questTemplateId")];
  callMethod("GotoQuestEngineItem", callMethod("getHandler", _me), new LingoList([t_ID]))
  break;
case "QuestPlaceMulti":
  t_ar_cmd = new LingoList([t_ar_results[symbol("questTemplateId")], 19, t_ar_results[symbol("photo")], t_ar_results[symbol("hint")], t_ar_results[symbol("required")], t_ar_results[symbol("itemsData")]]);
  callMethod("AddTask", callMethod("getHandler", _me), t_ar_cmd)
  t_ID = t_ar_results[symbol("questTemplateId")];
  callMethod("GotoQuestEngineItem", callMethod("getHandler", _me), new LingoList([t_ID]))
  break;
case "QuestPlaceMultiUpdate":
  t_ar_cmd = new LingoList([t_ar_results[symbol("questTemplateId")], 19, t_ar_results[symbol("activeTaskRank")], t_ar_results[symbol("required")], t_ar_results[symbol("itemsData")]]);
  callMethod("UpdateTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  t_ID = t_ar_results[symbol("questTemplateId")];
  callMethod("GotoQuestEngineItem", callMethod("getHandler", _me), new LingoList([t_ID]))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Quest.Component.QuestDialogBroadCastEvent.Unknown manager", t_iManagerID))
  }

}

