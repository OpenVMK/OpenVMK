// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / MoveItemIndex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MoveItemIndex(_me: LingoMe, t_iRank: LingoValue, t_iDirection: LingoValue, t_iMaxItems: LingoValue) {
  if (callNamed("voidp", t_iMaxItems)) {
  t_iMaxItems = 3;
  }

  var t_iPrizeRank = lingoBinary("add", t_iRank, 1);
  if (lingoBinary("gt", t_iPrizeRank, meProp(_me, "m_ar_data")[symbol("prize_array")].count)) {
  callNamed("put", lingoBinary("joinPad", "Prize rank is out of boundaries", t_iPrizeRank))
  return 0;
  }

  var t_iItemCount = meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank][symbol("item_array")].count;
  if (lingoBinary("lt", t_iItemCount, t_iMaxItems)) {
  var t_iNewIndex = 1;
  } else {
  var t_iOldIndex = meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank][symbol("item_index")];
  t_iNewIndex = lingoBinary("add", t_iOldIndex, t_iDirection);
  }

  if (lingoBinary("lt", t_iNewIndex, 1)) {
  t_iNewIndex = 1;
  }

  if (lingoBinary("gt", t_iNewIndex, lingoBinary("sub", t_iItemCount, lingoBinary("sub", t_iMaxItems, 1)))) {
  t_iNewIndex = lingoBinary("sub", t_iItemCount, lingoBinary("sub", t_iMaxItems, 1));
  }

  meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank][symbol("item_index")] = t_iNewIndex;
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("updatePrizeRank", t_rCurrentPage, meProp(_me, "m_ar_data")[symbol("prize_array")][t_iPrizeRank], t_iPrizeRank)
}

