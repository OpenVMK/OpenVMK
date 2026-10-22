// vmk_pirates2_minigame.cct / CPiratesFactorScoreBoard / addTeamWin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addTeamWin(_me: LingoMe, i_team: LingoValue) {
  var t_ar_gameParams = new LingoList([]);
  t_ar_gameParams[1] = callMethod("GetTeam1Gold", _me);
  t_ar_gameParams[2] = callMethod("GetTeam2Gold", _me);
  var tTeam1Wins = callMethod("GetTeam1Wins", _me);
  if (lingoBinary("eq", i_team, 1)) {
  tTeam1Wins = lingoBinary("add", tTeam1Wins, 1);
  }

  t_ar_gameParams[3] = tTeam1Wins;
  var tTeam2Wins = callMethod("GetTeam2Wins", _me);
  if (lingoBinary("eq", i_team, 2)) {
  tTeam2Wins = lingoBinary("add", tTeam2Wins, 1);
  }

  t_ar_gameParams[4] = tTeam2Wins;
  callMethod("SetParam", callMethod("getObject", _me), "GameParams", t_ar_gameParams)
}

