// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / removeSelectedItemFromPrize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeSelectedItemFromPrize(_me: LingoMe) {
  var t_rComponentPage = meProp(_me, "m_ar_components")["quest.prizes"];
  if (callNamed("objectp", t_rComponentPage)) {
  var t_rActiveLayout = callMethod("GetActive", t_rComponentPage);
  if (callNamed("objectp", t_rActiveLayout)) {
  var t_sEvent = callMethod("getEvent", t_rActiveLayout);
  var t_iRank = lingoBinary("sub", callMethod("getComponentID", t_rComponentPage, callMethod("GetActiveComponent", t_rComponentPage)), 1);
  var t_ar_questData = callMethod("getData", callMethod("GetOwner", callMethod("getManager", _me)));
  switch (t_sEvent) {
case "quest.step2.credits":
  callMethod("RemovePrizeCredits", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ar_questData[symbol("questTemplateId")], t_iRank]))
  break;
case "quest.step2.icon1":
case "quest.step2.icon2":
case "quest.step2.icon3":
  var t_ar_data = callMethod("GetNode", t_rActiveLayout);
  if (lingoBinary("gt", t_ar_data[symbol("itemCode")], -float(1))) {
  callMethod("RemovePrizeItem", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ar_questData[symbol("questTemplateId")], t_iRank, t_ar_data[symbol("itemReference")]]))
  }

  break;
  break;
  break;
  }

  }

  }

}

