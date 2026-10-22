// vmk_hm_overrides.cct /  / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (_me.m_bActive) {
  var tGreenWins = callMethod("GetGameEngine", _me.m_rClient);
  var tPurpleWins = callMethod("GetObjectsByCode", tGreenWins, 5);
  if (lingoBinary("eq", tPurpleWins.count, 1)) {
  var t_rGameEngine = callMethod("GetTeam1Score", callMethod("GetFactor", tPurpleWins[1]));
  var tScoreBoard = callMethod("GetTeam2Score", callMethod("GetFactor", tPurpleWins[1]));
  var tGreenScore = callMethod("GetTeam1Wins", callMethod("GetFactor", tPurpleWins[1]));
  var tPurpleScore = callMethod("GetTeam2Wins", callMethod("GetFactor", tPurpleWins[1]));
  if (lingoBinary("neq", tScoreBoard, _me.m_iLastPurpleScore)) {
  callMethod("setTeamScore", _me, symbol("purple"), tScoreBoard)
  }

  if (lingoBinary("neq", t_rGameEngine, _me.m_iLastGreenScore)) {
  callMethod("setTeamScore", _me, symbol("green"), t_rGameEngine)
  }

  if (lingoBinary("neq", tPurpleScore, _me.m_iLastPurpleWins)) {
  callMethod("SetTeamWins", _me, symbol("purple"), tPurpleScore)
  }

  if (lingoBinary("neq", tGreenScore, _me.m_iLastGreenWins)) {
  callMethod("SetTeamWins", _me, symbol("green"), tGreenScore)
  }

  setMeProp(_me, "m_iLastPurpleScore", tScoreBoard);
  setMeProp(_me, "m_iLastGreenScore", t_rGameEngine);
  setMeProp(_me, "m_iLastPurpleWins", tPurpleScore);
  setMeProp(_me, "m_iLastGreenWins", tGreenScore);
  }

  }

}

