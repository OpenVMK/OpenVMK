// 38365562899c7799eeaea4a99041ea57.cct / CQuestInstanceDataContainer / ChangePageEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangePageEvent(_me: LingoMe, t_iManagerID: LingoValue, t_sPageName: LingoValue) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Quest Instance Change Page Event Received", t_iManagerID), t_sPageName))
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  switch (t_sPageName) {
case "info.staff.order":
case "info.staff.timerace":
case "info.player.order":
case "info.player.timerace":
case "join.staff.order":
case "join.staff.timerace":
case "join.player.order":
case "join.player.timerace":
  if (callNamed("objectp", t_rCurrentPage)) {
  for (var i = 1; i <= meProp(_me, "m_ar_data")[symbol("remaining_prize_array")].count; ++i) {
  var t_ar_prizeData = meProp(_me, "m_ar_data")[symbol("remaining_prize_array")][i];
  callMethod("updatePrizeRank", t_rCurrentPage, t_ar_prizeData, i, meProp(_me, "m_ar_data")[symbol("taken_prize_count")])
  }

  callMethod("QuestInstanceData", t_rCurrentPage, meProp(_me, "m_ar_data"))
  }

  break;
  default:
  callNamed("put", "Unknown page...")
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

}

