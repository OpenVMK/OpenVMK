// vmk_casual.cct / CCasualGameHighScoreInterface / GetSelectedScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelectedScore(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("gt", meProp(_me, "m_iSelected"), 0)) {
  for (var i = 1; i <= meProp(_me, "m_ar_rScore").count; ++i) {
  if (lingoBinary("gte", meProp(_me, "m_iSelected"), meProp(_me, "m_ar_rScore")[i].first)) {
  if (lingoBinary("lte", meProp(_me, "m_iSelected"), meProp(_me, "m_ar_rScore")[i].last)) {
  return meProp(_me, "m_ar_rScore")[i].scores[lingoBinary("add", lingoBinary("sub", meProp(_me, "m_iSelected"), meProp(_me, "m_ar_rScore")[i].first), 1)];
  }

  }

  }

  }

  return new LingoPropList([symbol("player"), -float(1), symbol("name"), "", symbol("score"), 0]);
}

