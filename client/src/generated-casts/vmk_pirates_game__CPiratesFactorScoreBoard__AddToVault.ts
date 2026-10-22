// vmk_pirates_game.cct / CPiratesFactorScoreBoard / AddToVault

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddToVault(_me: LingoMe, i_team: LingoValue, i_Amount: LingoValue) {
  if (lingoBinary("lt", i_Amount, 1)) {
  return;
  }

  var t_team1Gold = callMethod("GetTeam1Gold", _me);
  var t_team2Gold = callMethod("GetTeam2Gold", _me);
  switch (i_team) {
case 1:
  t_team1Gold = lingoBinary("add", t_team1Gold, i_Amount);
  break;
case 2:
  t_team2Gold = lingoBinary("add", t_team2Gold, i_Amount);
  break;
  }

  return;
  var t_ar_gameParams = new LingoList([]);
  t_ar_gameParams[1] = t_team1Gold;
  t_ar_gameParams[2] = t_team2Gold;
  t_ar_gameParams[3] = callMethod("GetTeam1Wins", _me);
  t_ar_gameParams[4] = callMethod("GetTeam2Wins", _me);
  callMethod("SetParam", callMethod("getObject", _me), "GameParams", t_ar_gameParams)
}

