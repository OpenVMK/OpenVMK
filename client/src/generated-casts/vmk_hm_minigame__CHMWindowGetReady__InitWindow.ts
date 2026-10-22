// vmk_hm_minigame.cct / CHMWindowGetReady / InitWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitWindow(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_sWindowName")), 0)) {
  callNamed("removeWindow", meProp(_me, "m_sWindowName"))
  }

  callNamed("createWindow", meProp(_me, "m_sWindowName"), "vmk_hm_getready.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  callMethod("center", tWndObj)
  } else {
  return callNamed("error", _me, "HMGWindow.GetReady: Unable to create window ", symbol("InitWindow"));
  }

  var t_iRound = callMethod("getRounds", callMethod("getComponent", meProp(_me, "m_rClient")));
  callMethod("fixAntialisingTextElement", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "hm.roundnumber", 1, lingoBinary("joinPad", "ROUND", t_iRound), 0)
  var t_ar_roundResults = callMethod("GetRoundResults", meProp(_me, "m_rClient"));
  if (lingoBinary("gt", t_ar_roundResults.count, 0)) {
  switch (t_ar_roundResults[5]) {
case 0:
  callMethod("setText", callMethod("getElement", tWndObj, "hm.startingteam"), callNamed("getText", "hmg.getready.startingteam0"))
  break;
case 1:
  callMethod("setText", callMethod("getElement", tWndObj, "hm.startingteam"), callNamed("getText", "hmg.getready.startingteam1"))
  break;
case 2:
  callMethod("setText", callMethod("getElement", tWndObj, "hm.startingteam"), callNamed("getText", "hmg.getready.startingteam2"))
  break;
  default:
  callMethod("setText", callMethod("getElement", tWndObj, "hm.startingteam"), callNamed("getText", "hmg.getready.startingteam0"))
  }

  } else {
  callMethod("setText", callMethod("getElement", tWndObj, "hm.startingteam"), callNamed("getText", "hmg.getready.startingteam0"))
  }

  var t_rGameEngine = callMethod("GetGameEngine", meProp(_me, "m_rClient"));
  if ((lingoTruthy(callNamed("voidp", t_rGameEngine)) ? 0 : 1)) {
  var tScoreBoard = new LingoList([]);
  } else {
  tScoreBoard = new LingoList([]);
  }

  if (lingoBinary("eq", tScoreBoard.count, 1)) {
  callMethod("setGetReadyTeamScore", _me, symbol("purple"), callMethod("GetTeam1Wins", callMethod("GetFactor", tScoreBoard[1])))
  callMethod("setGetReadyTeamScore", _me, symbol("green"), callMethod("GetTeam2Wins", callMethod("GetFactor", tScoreBoard[1])))
  } else {
  callMethod("setGetReadyTeamScore", _me, symbol("purple"), 0)
  callMethod("setGetReadyTeamScore", _me, symbol("green"), 0)
  }

  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "bg", callNamed("member", "hm.getready.bg"))
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "getready.countdown", callNamed("member", "hmb_5"))
  callNamed("createTimeout", "hmGetReadyCounter", 1000, symbol("GetReadyCountdown"), callMethod("getID", _me), 5, 1)
  var m_bActive = 0;
}

