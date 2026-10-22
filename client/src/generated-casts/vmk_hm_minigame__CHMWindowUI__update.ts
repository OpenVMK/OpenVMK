// vmk_hm_minigame.cct / CHMWindowUI / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (meProp(_me, "m_bActive")) {
  var t_rGameEngine = callMethod("GetGameEngine", meProp(_me, "m_rClient"));
  var tScoreBoard = callMethod("GetObjectsByCode", t_rGameEngine, 5);
  if (lingoBinary("eq", tScoreBoard.count, 1)) {
  var tGreenScore = callMethod("GetTeam1Score", callMethod("GetFactor", tScoreBoard[1]));
  var tPurpleScore = callMethod("GetTeam2Score", callMethod("GetFactor", tScoreBoard[1]));
  var tGreenWins = callMethod("GetTeam1Wins", callMethod("GetFactor", tScoreBoard[1]));
  var tPurpleWins = callMethod("GetTeam2Wins", callMethod("GetFactor", tScoreBoard[1]));
  if (lingoBinary("neq", tPurpleScore, meProp(_me, "m_iLastPurpleScore"))) {
  callMethod("setTeamScore", _me, symbol("purple"), tPurpleScore)
  }

  if (lingoBinary("neq", tGreenScore, meProp(_me, "m_iLastGreenScore"))) {
  callMethod("setTeamScore", _me, symbol("green"), tGreenScore)
  }

  if (lingoBinary("neq", tPurpleWins, meProp(_me, "m_iLastPurpleWins"))) {
  callMethod("SetTeamWins", _me, symbol("purple"), tPurpleWins)
  }

  if (lingoBinary("neq", tGreenWins, meProp(_me, "m_iLastGreenWins"))) {
  callMethod("SetTeamWins", _me, symbol("green"), tGreenWins)
  }

  setMeProp(_me, "m_iLastPurpleScore", tPurpleScore);
  setMeProp(_me, "m_iLastGreenScore", tGreenScore);
  setMeProp(_me, "m_iLastPurpleWins", tPurpleWins);
  setMeProp(_me, "m_iLastGreenWins", tGreenWins);
  }

  }

}

