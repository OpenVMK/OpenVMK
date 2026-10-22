// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / PrizeCreditsAdded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrizeCreditsAdded(_me: LingoMe, t_ar_data: LingoValue) {
  var t_iPrizeRank = lingoBinary("add", t_ar_data[symbol("rank")], 1);
  if (lingoBinary("gt", t_iPrizeRank, lingoBinary("add", meProp(_me, "m_ar_data")[symbol("prize_array")].count, 1))) {
  callNamed("put", "Prize rank out of boundaries...")
  return 0;
  }

  if (lingoBinary("eq", t_iPrizeRank, lingoBinary("add", meProp(_me, "m_ar_data")[symbol("prize_array")].count, 1))) {
  var t_ar_prizeArray = new LingoPropList([symbol("credits"), 0, symbol("item_count"), 0, symbol("item_array"), new LingoList([])]);
  callMethod("append", meProp(_me, "m_ar_data")[symbol("prize_array")], t_ar_prizeArray)
  }

  meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank][symbol("credits")] = t_ar_data[symbol("credits")];
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("PrizeCreditsAdded", t_rCurrentPage, t_ar_data)
  callMethod("checkTestingStatus", _me)
}

