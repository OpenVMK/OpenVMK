// vmk_hm_minigame.cct / CHMFactorScoreBoard / UpdateTeamScores

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateTeamScores(_me: LingoMe) {
  var t_ar_rShips = callMethod("GetObjectsByCode", callMethod("getComponent", callNamed("getThread", "minigame")), 3);
  var t_team1Score = 0;
  var t_team2Score = 0;
  var t_team1Members = 0;
  var t_team2Members = 0;
  for (var tPlayer of t_ar_rShips.toArray()) {
  switch (callMethod("GetParam", tPlayer, "Team")) {
case 1:
  t_team1Score = lingoBinary("add", t_team1Score, callMethod("GetParam", tPlayer, "Score"));
  t_team1Members = lingoBinary("add", t_team1Members, 1);
  break;
case 2:
  t_team2Score = lingoBinary("add", t_team2Score, callMethod("GetParam", tPlayer, "Score"));
  t_team2Members = lingoBinary("add", t_team2Members, 1);
  break;
  }

  }

  if (lingoBinary("neq", t_team1Members, 0)) {
  t_team1Score = t_team1Score;
  }

  if (lingoBinary("neq", t_team2Members, 0)) {
  t_team2Score = t_team2Score;
  }

  var t_ar_gameParams = new LingoList([]);
  t_ar_gameParams[1] = t_team1Score;
  t_ar_gameParams[2] = t_team2Score;
  t_ar_gameParams[3] = callMethod("GetParam", callMethod("getObject", _me), "GameParams")[3];
  t_ar_gameParams[4] = callMethod("GetParam", callMethod("getObject", _me), "GameParams")[4];
  callMethod("SetParam", callMethod("getObject", _me), "GameParams", t_ar_gameParams)
}

