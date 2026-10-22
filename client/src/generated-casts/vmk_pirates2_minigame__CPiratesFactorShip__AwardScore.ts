// vmk_pirates2_minigame.cct / CPiratesFactorShip / AwardScore

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
  if (lingoBinary("neq", a_iAmount, 0)) {
  var tGold = callMethod("GetParam", callMethod("getObject", _me), "Gold");
  tGold = lingoBinary("add", tGold, a_iAmount);
  if (lingoBinary("lt", tGold, 0)) {
  tGold = 0;
  }

  callMethod("SetParam", callMethod("getObject", _me), "Gold", tGold)
  callMethod("SyncGameParameters", _me)
  var tScoreBoard = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 9);
  var t_iGameMode = callMethod("GetGameMode", callMethod("getComponent", callNamed("getThread", "piratesminigame")));
  if (lingoBinary("eq", t_iGameMode, 1)) {
  if (lingoBinary("neq", tScoreBoard.count, 1)) {
  return callNamed("error", _me, "Scoreboard object could not be found!", symbol("AwardScore"));
  }

  callMethod("AddToVault", callMethod("GetFactor", tScoreBoard[1]), callMethod("GetParam", callMethod("getObject", _me), "Team"), a_iAmount)
  }

  }

}

