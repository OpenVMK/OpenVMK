// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rGridRenderer"))) {
  var t_mp_data = meProp(_me, "m_mpCatalogData")["category"][1];
  var t_iSlot = callMethod("GetSelected", meProp(_me, "m_rGridRenderer"));
  var t_iPos = lingoBinary("add", t_iSlot, meProp(_me, "m_iOffset"));
  if (lingoBinary("and", lingoBinary("gt", t_iPos, 0), lingoBinary("lte", t_iPos, t_mp_data.count))) {
  var t_mp_DataList = t_mp_data[t_iPos];
  t_mp_DataList[symbol("pos")] = t_iPos;
  return t_mp_DataList;
  }

  }

  return new LingoPropList([symbol("categoryId"), -float(1), symbol("code"), -float(1), symbol("param"), -float(1), symbol("price"), 0]);
}

