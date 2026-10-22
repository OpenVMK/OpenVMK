// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CScale9Grid / searchCellForData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function searchCellForData(_me: LingoMe, t_ar_searchData: LingoValue) {
  var t_rdata = t_ar_searchData[symbol("data")];
  var t_rCell = t_ar_searchData[symbol("cell")];
  if (callNamed("listp", meProp(_me, "m_rNode"))) {
  var t_iPos = callMethod("findPos", meProp(_me, "m_rNode"), t_rCell);
  if (lingoBinary("gt", t_iPos, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_rNode")[t_iPos], t_rdata)) {
  callMethod("append", t_ar_searchData[symbol("found")], _me)
  }

  }

  }

}

