// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / PrizeCreditsRemoved

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrizeCreditsRemoved(_me: LingoMe, t_ar_data: LingoValue) {
  var t_iPrizeRank = lingoBinary("add", t_ar_data[symbol("rank")], 1);
  meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank][symbol("credits")] = 0;
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("updatePrizeRank", t_rCurrentPage, meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank], t_iPrizeRank)
  callNamed("createTimeout", callNamed("getUniqueID"), 500, symbol("updateCredits"), callMethod("getID", _me), undefined, 1)
  callMethod("checkTestingStatus", _me)
}

