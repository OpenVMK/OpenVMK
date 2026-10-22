// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  var t_iSelected = lingoBinary("add", callMethod("GetSelected", meProp(_me, "m_rGridRenderer")), meProp(_me, "m_iGridItemOffset"));
  if (lingoBinary("and", lingoBinary("gt", t_iSelected, 0), lingoBinary("lte", t_iSelected, meProp(_me, "m_mpCatalogData")["category"][1].count))) {
  return meProp(_me, "m_mpCatalogData")["category"][1][t_iSelected];
  } else {
  return new LingoPropList([symbol("code"), -float(1), symbol("price"), -float(1), symbol("categoryId"), -float(1)]);
  }

}

