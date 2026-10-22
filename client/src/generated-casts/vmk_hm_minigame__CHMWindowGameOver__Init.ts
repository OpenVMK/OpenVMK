// vmk_hm_minigame.cct / CHMWindowGameOver / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, a_rClient: LingoValue) {
  setMeProp(_me, "m_rClient", a_rClient);
  setMeProp(_me, "m_ar_roundResults", callMethod("GetRoundResults", meProp(_me, "m_rClient")));
  var t_rGameEngine = callMethod("GetGameEngine", meProp(_me, "m_rClient"));
  var tScoreBoard = callMethod("GetObjectsByCode", t_rGameEngine, 5);
  if (lingoBinary("eq", tScoreBoard.count, 1)) {
  setMeProp(_me, "m_iLastGreenWins", callMethod("GetTeam1Wins", callMethod("GetFactor", tScoreBoard[1])));
  setMeProp(_me, "m_iLastPurpleWins", callMethod("GetTeam2Wins", callMethod("GetFactor", tScoreBoard[1])));
  }

}

