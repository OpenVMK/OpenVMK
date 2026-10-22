// vmk_fireworks.cct / CFireworksMinigameHandler / OnGameInfoUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnGameInfoUpdate(_me: LingoMe, a_rInput: LingoValue) {
  var t_iScoreCount = callMethod("GetIntFrom", a_rInput);
  var tList = new LingoList([]);
  for (var i = 1; i <= t_iScoreCount; ++i) {
  var t_iAvatarRef = callMethod("GetIntFrom", a_rInput);
  var t_iRank = callMethod("GetIntFrom", a_rInput);
  var t_iScore = callMethod("GetIntFrom", a_rInput);
  var t_ar_score = new LingoPropList([symbol("ref"), t_iAvatarRef, symbol("rank"), t_iRank, symbol("score"), t_iScore]);
  callMethod("append", tList, t_ar_score)
  }

  callMethod("updateScores", callMethod("getInterface", callNamed("getThread", "fireworks")), tList)
  callMethod("SendScore", callMethod("getComponent", callNamed("getThread", "fireworks")))
}

