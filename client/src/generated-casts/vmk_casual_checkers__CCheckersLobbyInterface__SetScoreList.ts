// vmk_casual_checkers.cct / CCheckersLobbyInterface / SetScoreList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetScoreList(_me: LingoMe, _this: LingoValue, a_ar_rScores: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", meProp(_me, "m_kCurView"), symbol("score"))) {
  if (callNamed("objectp", meProp(_me, "m_rScoreList"))) {
  callMethod("SetScoreList", meProp(_me, "m_rScoreList"), a_ar_rScores)
  }

  }

  }

}

