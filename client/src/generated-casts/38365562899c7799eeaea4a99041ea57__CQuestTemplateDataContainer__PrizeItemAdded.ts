// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / PrizeItemAdded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrizeItemAdded(_me: LingoMe, t_ar_data: LingoValue) {
  var t_iPrizeRank = lingoBinary("add", t_ar_data[symbol("rank")], 1);
  if (lingoBinary("gt", t_iPrizeRank, lingoBinary("add", meProp(_me, "m_ar_data")[symbol("prize_array")].count, 1))) {
  callNamed("put", lingoBinary("joinPad", "Prize rank is out of boundaries", t_iPrizeRank))
  return 0;
  }

  if (lingoBinary("eq", t_iPrizeRank, lingoBinary("add", meProp(_me, "m_ar_data")[symbol("prize_array")].count, 1))) {
  var t_ar_prizeArray = new LingoPropList([symbol("credits"), 0, symbol("item_count"), 1, symbol("item_array"), new LingoList([])]);
  callMethod("append", meProp(_me, "m_ar_data")[symbol("prize_array")], t_ar_prizeArray)
  }

  var t_ar_newItem = new LingoPropList([]);
  t_ar_newItem[symbol("itemReference")] = t_ar_data[symbol("itemReference")];
  t_ar_newItem[symbol("itemCode")] = t_ar_data[symbol("itemCode")];
  callMethod("append", meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank][symbol("item_array")], t_ar_newItem)
  var t_iPrizeCount = meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank][symbol("item_array")].count;
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("updatePrizeRank", t_rCurrentPage, meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank], t_iPrizeRank)
  callNamed("put", "Stop and show what's going on...")
  callMethod("checkTestingStatus", _me)
}

