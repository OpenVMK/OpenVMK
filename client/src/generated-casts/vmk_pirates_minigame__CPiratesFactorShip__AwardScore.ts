// vmk_pirates_minigame.cct / CPiratesFactorShip / AwardScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AwardScore(_me: LingoMe, a_iAmount: LingoValue) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tScore = callMethod("GetParam", callMethod("getObject", _me), "Score");
  tScore = lingoBinary("add", tScore, a_iAmount);
  if (lingoBinary("lt", tScore, 0)) {
  tScore = 0;
  }

  callMethod("SetParam", callMethod("getObject", _me), "Score", tScore)
  callMethod("SyncGameParameters", _me)
  var tScoreBoard = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 9);
  if (lingoBinary("neq", tScoreBoard.count, 1)) {
  return callNamed("error", _me, "Scoreboard object could not be found!", symbol("AwardScore"));
  }

  callMethod("UpdateTeamScores", callMethod("GetFactor", tScoreBoard[1]))
}

