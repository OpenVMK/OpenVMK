// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / PrizeItemRemoved

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrizeItemRemoved(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Manager.PrizeItemRemoved TODO", t_ar_data))
  var t_iPrizeRank = lingoBinary("add", t_ar_data[symbol("rank")], 1);
  var t_ar_items = meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank][symbol("item_array")];
  for (var i = 1; i <= t_ar_items.count; ++i) {
  var t_rItem = t_ar_items[i];
  if (lingoBinary("eq", t_rItem[symbol("itemReference")], t_ar_data[symbol("itemReference")])) {
  callMethod("deleteAt", meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank][symbol("item_array")], i)
  break;
  }

  }

  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("updatePrizeRank", t_rCurrentPage, meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank], t_iPrizeRank)
  callMethod("checkTestingStatus", _me)
}

