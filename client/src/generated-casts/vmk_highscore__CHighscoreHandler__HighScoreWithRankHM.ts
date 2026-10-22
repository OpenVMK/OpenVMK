// vmk_highscore.cct / CHighscoreHandler / HighScoreWithRankHM

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HighScoreWithRankHM(_me: LingoMe, tMsg: LingoValue) {
  var t_iGameID = callMethod("GetIntFrom", tMsg.connection);
  var t_iScoreType = callMethod("GetIntFrom", tMsg.connection);
  var tCount = callMethod("GetIntFrom", tMsg.connection);
  var t_mp_scoretable = new LingoPropList([]);
  for (var i = 1; i <= tCount; ++i) {
  var tRank = callMethod("GetIntFrom", tMsg.connection);
  var tScore = callMethod("GetIntFrom", tMsg.connection);
  var tName = callMethod("GetStrFrom", tMsg.connection);
  callMethod("addProp", t_mp_scoretable, tRank, new LingoPropList([symbol("score"), tScore, symbol("name"), tName]))
  }

  callMethod("SetHighScores", callMethod("getComponent", _me), t_mp_scoretable, 1)
}

