// vmk_pirates_minigame.cct / CPiratesFactorScoreBoard / UpdateTeamScores

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateTeamScores(_me: LingoMe) {
  var t_ar_rShips = callMethod("GetObjectsByCode", callMethod("getComponent", callNamed("getThread", "minigame")), 1);
  var t_team1Score = 0;
  var t_team2Score = 0;
  var t_team1Members = 0;
  var t_team2Members = 0;
  for (var tShip of t_ar_rShips.toArray()) {
  switch (callMethod("GetParam", tShip, "Team")) {
case 1:
  t_team1Score = lingoBinary("add", t_team1Score, callMethod("GetParam", tShip, "Score"));
  t_team1Members = lingoBinary("add", t_team1Members, 1);
  break;
case 2:
  t_team2Score = lingoBinary("add", t_team2Score, callMethod("GetParam", tShip, "Score"));
  t_team2Members = lingoBinary("add", t_team2Members, 1);
  break;
  }

  }

  if (lingoBinary("neq", t_team1Members, 0)) {
  t_team1Score = lingoBinary("div", t_team1Score, t_team1Members);
  }

  if (lingoBinary("neq", t_team2Members, 0)) {
  t_team2Score = lingoBinary("div", t_team2Score, t_team2Members);
  }

  var t_ar_gameParams = new LingoList([]);
  t_ar_gameParams[1] = t_team1Score;
  t_ar_gameParams[2] = t_team2Score;
  callMethod("SetParam", callMethod("getObject", _me), "GameParams", t_ar_gameParams)
}

