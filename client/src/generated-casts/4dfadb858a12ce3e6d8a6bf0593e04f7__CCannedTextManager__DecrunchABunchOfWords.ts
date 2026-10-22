// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / DecrunchABunchOfWords

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DecrunchABunchOfWords(_me: LingoMe, a_iCount: LingoValue) {
  var t_ar_range = new LingoList([]);
  var tRangeEnd = lingoBinary("add", meProp(_me, "m_iExpandOffset"), a_iCount);
  if ((lingoTruthy(callNamed("listp", meProp(_me, "m_ar_rawList"))) ? 0 : 1)) {
  return 0;
  }

  if (lingoBinary("gte", tRangeEnd, meProp(_me, "m_ar_rawList").count)) {
  tRangeEnd = meProp(_me, "m_ar_rawList").count;
  setMeProp(_me, "m_bDecrunched", 1);
  }

  for (var i = meProp(_me, "m_iExpandOffset"); i <= tRangeEnd; ++i) {
  callMethod("append", t_ar_range, meProp(_me, "m_ar_rawList")[i])
  }

  setMeProp(_me, "m_iExpandOffset", lingoBinary("add", lingoBinary("add", meProp(_me, "m_iExpandOffset"), a_iCount), 1));
  callMethod("add", meProp(_me, "m_dictionary"), t_ar_range)
  if (lingoBinary("gt", meProp(_me, "m_ar_rawList").count, 0)) {
  return lingoBinary("div", callNamed("float", meProp(_me, "m_iExpandOffset")), callNamed("float", meProp(_me, "m_ar_rawList").count));
  } else {
  return 0;
  }

}

