// vmk_hm_minigame.cct / CHMWindowResults / InitWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitWindow(_me: LingoMe) {
  callNamed("executeMessage", "StopRoomSound")
  var m_bActive = 0;
  var t_ar_roundResults = callMethod("GetRoundResults", meProp(_me, "m_rClient"));
  var t_iWinningTeam = t_ar_roundResults[1];
  var t_iTeam1Score = t_ar_roundResults[2];
  var t_iTeam2Score = t_ar_roundResults[3];
  var t_bIsLastStage = t_ar_roundResults[4];
  var t_iDoorRaceWinner = t_ar_roundResults[5];
  var t_bGameIsCancelled = t_ar_roundResults[6];
  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_sWindowName")), 0)) {
  callNamed("removeWindow", meProp(_me, "m_sWindowName"))
  }

  var t_bGameWasCancelled = 0;
  if (lingoBinary("gte", t_ar_roundResults.count, 6)) {
  t_bGameWasCancelled = t_ar_roundResults[6];
  }

  callNamed("createWindow", meProp(_me, "m_sWindowName"), "vmk_hm_modal.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  callMethod("center", tWndObj)
  } else {
  return callNamed("error", _me, "HMGWindow.Results: Unable to create window ", symbol("InitWindow"));
  }

  callMethod("merge", tWndObj, "vmk_hm_results.window")
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("EventProc"), callMethod("getID", _me), symbol("mouseUp"))
  var t_iRound = callMethod("getRounds", callMethod("getComponent", meProp(_me, "m_rClient")));
  var t_rOwnPlayer = callMethod("getOwnPlayer", callMethod("getComponent", meProp(_me, "m_rClient")));
  if (callNamed("objectp", t_rOwnPlayer)) {
  if (lingoBinary("eq", callMethod("GetParam", t_rOwnPlayer, "Team"), t_ar_roundResults[1])) {
  callNamed("executeMessage", "PlayInterfaceSound", "HMG-win")
  } else {
  callNamed("executeMessage", "PlayInterfaceSound", "HMG-loose")
  }

  }

  callMethod("setResultTeamScore", _me, symbol("green"), t_ar_roundResults[2])
  callMethod("setResultTeamScore", _me, symbol("purple"), t_ar_roundResults[3])
  var t_rGameEngine = callMethod("GetGameEngine", meProp(_me, "m_rClient"));
  var tScoreBoard = callMethod("GetObjectsByCode", t_rGameEngine, 5);
  if (lingoBinary("eq", tScoreBoard.count, 1)) {
  callMethod("setResultTeamWins", _me, symbol("green"), callMethod("GetTeam1Wins", callMethod("GetFactor", tScoreBoard[1])))
  callMethod("setResultTeamWins", _me, symbol("purple"), callMethod("GetTeam2Wins", callMethod("GetFactor", tScoreBoard[1])))
  } else {
  callMethod("setResultTeamWins", _me, symbol("green"), 0)
  callMethod("setResultTeamWins", _me, symbol("purple"), 0)
  }

  for (var i = 1; i <= 4; ++i) {
  callMethod("hide", callMethod("getElement", tWndObj, lingoBinary("join", "green.doorwinner", i)))
  callMethod("hide", callMethod("getElement", tWndObj, lingoBinary("join", "purple.doorwinner", i)))
  }

  var t_ar_Players = callMethod("GetObjectsByCode", t_rGameEngine, 3);
  var t_ar_purple = new LingoList([]);
  var t_ar_Green = new LingoList([]);
  callMethod("sort", t_ar_purple)
  callMethod("sort", t_ar_Green)
  for (var t_rPlayer of t_ar_Players.toArray()) {
  var t_iTeam = callMethod("GetParam", t_rPlayer, "Team");
  var t_iScore = callMethod("GetParam", t_rPlayer, "GameParams")[1];
  var t_sName = callMethod("GetName", callMethod("GetFactor", t_rPlayer));
  var t_bExit = callMethod("getFoundExit", callMethod("GetFactor", t_rPlayer));
  var t_bCaught = callMethod("getCaughtBySuperGhost", callMethod("GetFactor", t_rPlayer));
  switch (t_iTeam) {
case 1:
  callMethod("append", t_ar_Green, new LingoList([t_iScore, t_sName, t_bExit, t_bCaught]))
  break;
case 2:
  callMethod("append", t_ar_purple, new LingoList([t_iScore, t_sName, t_bExit, t_bCaught]))
  break;
  }

  }

  for (var i = 1; i <= t_ar_Green.count; ++i) {
  var t_rScore = t_ar_Green[i];
  callMethod("setText", callMethod("getElement", tWndObj, lingoBinary("join", "green.player", i)), t_rScore[2])
  callMethod("setText", callMethod("getElement", tWndObj, lingoBinary("join", lingoBinary("join", "green.player", i), ".score")), t_rScore[1])
  if (t_rScore[3]) {
  callMethod("show", callMethod("getElement", tWndObj, lingoBinary("join", "green.doorwinner", i)))
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), lingoBinary("join", "green.doorwinner", i), "racewinner.green")
  continue;
  }

  if (t_rScore[4]) {
  callMethod("show", callMethod("getElement", tWndObj, lingoBinary("join", "green.doorwinner", i)))
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), lingoBinary("join", "green.doorwinner", i), "ghostcatch")
  }

  }

  for (var i = 1; i <= t_ar_purple.count; ++i) {
  t_rScore = t_ar_purple[i];
  callMethod("setText", callMethod("getElement", tWndObj, lingoBinary("join", "purple.player", i)), t_rScore[2])
  callMethod("setText", callMethod("getElement", tWndObj, lingoBinary("join", lingoBinary("join", "purple.player", i), ".score")), t_rScore[1])
  if (t_rScore[3]) {
  callMethod("show", callMethod("getElement", tWndObj, lingoBinary("join", "purple.doorwinner", i)))
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), lingoBinary("join", "purple.doorwinner", i), "racewinner.purple")
  continue;
  }

  if (t_rScore[4]) {
  callMethod("show", callMethod("getElement", tWndObj, lingoBinary("join", "purple.doorwinner", i)))
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), lingoBinary("join", "purple.doorwinner", i), "ghostcatch")
  }

  }

  callMethod("fixAntialisingTextElement", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "hm.dialog.hd", 1, lingoBinary("joinPad", callNamed("getText", "hmg.results.title"), t_iRound), 0)
  switch (t_ar_roundResults[5]) {
case 0:
  callMethod("setText", callMethod("getElement", tWndObj, "hm.startstatus"), callNamed("getText", "hmg.results.startstatus0"))
  callMethod("hide", callMethod("getElement", tWndObj, "team.doorwinner"))
  break;
case 1:
  callMethod("setText", callMethod("getElement", tWndObj, "hm.startstatus"), callNamed("getText", "hmg.results.startstatus1"))
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "team.doorwinner", "racewinner.green")
  break;
case 2:
  callMethod("setText", callMethod("getElement", tWndObj, "hm.startstatus"), callNamed("getText", "hmg.results.startstatus2"))
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "team.doorwinner", "racewinner.purple")
  break;
  }

  if (t_bGameWasCancelled) {
  var t_sWinner = callNamed("getText", "hmg.results.winner.cancel");
  var t_rColor = undefined;
  } else {
  switch (t_ar_roundResults[1]) {
case 1:
  t_sWinner = lingoBinary("joinPad", callNamed("getText", "hmg.results.winner1"), t_iRound);
  t_rColor = callNamed("rgb", "#B1ED35");
  break;
case 2:
  t_sWinner = lingoBinary("joinPad", callNamed("getText", "hmg.results.winner2"), t_iRound);
  t_rColor = callNamed("rgb", "#ED3599");
  break;
  default:
  t_sWinner = lingoBinary("joinPad", callNamed("getText", "hmg.results.winner0"), t_iRound);
  t_rColor = undefined;
  }

  }

  callMethod("fixAntialisingTextElement", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "hm.winner", 1, t_sWinner, 0, t_rColor)
  if ((lingoTruthy(t_bGameWasCancelled) ? 0 : 1)) {
  if ((lingoTruthy(t_ar_roundResults[4]) ? 0 : 1)) {
  callNamed("put", lingoBinary("joinPad", "LAST STAGE", t_ar_roundResults))
  callNamed("createTimeout", "hmShowGameEnd", 3000, symbol("ShowWindow"), callMethod("getID", meProp(_me, "m_rClient")), "GameOver", 1)
  }

  }

}

