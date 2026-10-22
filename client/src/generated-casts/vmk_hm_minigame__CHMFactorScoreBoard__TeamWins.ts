// vmk_hm_minigame.cct / CHMFactorScoreBoard / TeamWins

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TeamWins(_me: LingoMe, i_iTeam: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "HM Scoreboard: updated team-wins: ", i_iTeam))
  switch (i_iTeam) {
case 1:
  callMethod("GetParam", callMethod("getObject", _me), "GameParams")[3] = lingoBinary("add", callMethod("GetParam", callMethod("getObject", _me), "GameParams")[3], 1);
  break;
case 2:
  callMethod("GetParam", callMethod("getObject", _me), "GameParams")[4] = lingoBinary("add", callMethod("GetParam", callMethod("getObject", _me), "GameParams")[4], 1);
  break;
  }

  callMethod("UpdateTeamScores", _me)
}

