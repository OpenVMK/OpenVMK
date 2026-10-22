// vmk_casual.cct / CCasualGameHighScoreInterface / RequireScoreList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequireScoreList(_me: LingoMe, _this: LingoValue, a_iFirst: LingoValue, a_iLast: LingoValue) {
  callMethod("add", meProp(_me, "m_ar_rQueryStack"), new LingoPropList([symbol("first"), a_iFirst, symbol("last"), a_iLast, symbol("scores"), new LingoList([])]))
  callMethod("send", callNamed("getConnection", "VMK"), "GetHighScores", new LingoPropList([symbol("integer"), meProp(_me, "m_iGameCode"), symbol("integer"), a_iFirst, symbol("integer"), a_iLast]))
}

