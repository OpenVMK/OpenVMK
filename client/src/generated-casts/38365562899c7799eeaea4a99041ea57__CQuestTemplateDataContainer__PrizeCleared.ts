// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / PrizeCleared

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrizeCleared(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", "TODO PrizeCleared!!! Should all prizes be updated....?? Or just delete one and update others....?")
  callMethod("deleteAt", meProp(_me, "m_ar_data")[symbol("prize_array")], lingoBinary("add", t_ar_data[symbol("rank")], 1))
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("PrizeCleared", t_rCurrentPage, t_ar_data)
  callMethod("updateRanks", t_rCurrentPage)
  if (lingoBinary("eq", meProp(_me, "m_sCurrentPage"), "step2")) {
  callMethod("updateCurrentCategory", t_rCurrentPage)
  }

  callNamed("createTimeout", callNamed("getUniqueID"), 500, symbol("updateCredits"), callMethod("getID", _me), undefined, 1)
  callMethod("checkTestingStatus", _me)
}

