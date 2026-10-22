// vmk_hm_minigame.cct / CHMFactorPlayerObject / AwardScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AwardScore(_me: LingoMe, a_iAmount: LingoValue) {
  setMeProp(_me, "m_score", lingoBinary("add", meProp(_me, "m_score"), a_iAmount));
  var tScore = callMethod("GetParam", callMethod("getObject", _me), "Score");
  tScore = lingoBinary("add", tScore, a_iAmount);
  if (lingoBinary("lt", tScore, 0)) {
  tScore = 0;
  }

  callMethod("SetParam", callMethod("getObject", _me), "Score", tScore)
  var tScoreBoard = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 5);
  if (lingoBinary("neq", tScoreBoard.count, 1)) {
  return callNamed("error", _me, "HM Scoreboard object could not be found!", symbol("AwardScore"));
  }

  callMethod("UpdateTeamScores", callMethod("GetFactor", tScoreBoard[1]))
  callMethod("SyncGameParameters", _me)
}

