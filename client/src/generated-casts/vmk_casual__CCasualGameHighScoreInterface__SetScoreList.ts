// vmk_casual.cct / CCasualGameHighScoreInterface / SetScoreList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetScoreList(_me: LingoMe, _this: LingoValue, a_ar_rScore: LingoValue) {
  if (meProp(_me, "m_ar_rQueryStack").count) {
  var t_rQuery = meProp(_me, "m_ar_rQueryStack")[1];
  setThePropOf(t_rQuery, "scores", a_ar_rScore);
  callMethod("deleteAt", meProp(_me, "m_ar_rQueryStack"), 1)
  } else {
  t_rQuery = new LingoPropList([symbol("first"), 1, symbol("last"), a_ar_rScore.count, symbol("scores"), a_ar_rScore]);
  }

  callMethod("add", meProp(_me, "m_ar_rScore"), t_rQuery)
}

