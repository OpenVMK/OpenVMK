// vmk_hm_minigame.cct / CHMWindowGameOver / InitWindow

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

  callNamed("createWindow", meProp(_me, "m_sWindowName"), "vmk_hm_simple.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  callMethod("center", tWndObj)
  } else {
  return callNamed("error", _me, "HMGWindow.GameOver: Unable to create window ", symbol("InitWindow"));
  }

  callMethod("merge", tWndObj, "vmk_hm_stageend.window")
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("EventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("fixAntialisingTextElement", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "hm.dialog.hd", 1, callNamed("getText", "hmg.gameresults.title"), 0)
  var t_bInit = 1;
  if ((lingoTruthy(callNamed("listp", meProp(_me, "m_ar_roundResults"))) ? 0 : 1)) {
  t_bInit = 0;
  }

  if (lingoBinary("lt", meProp(_me, "m_ar_roundResults").count, 1)) {
  t_bInit = 0;
  }

  callMethod("hide", callMethod("getElement", tWndObj, "hm.startstatus.red"))
  callMethod("hide", callMethod("getElement", tWndObj, "hm.startstatus.green"))
  if (t_bInit) {
  switch (meProp(_me, "m_ar_roundResults")[1]) {
case 1:
  var t_sWinner = callNamed("getText", "hmg.gameresults.winner1");
  break;
case 2:
  t_sWinner = callNamed("getText", "hmg.gameresults.winner2");
  break;
  default:
  t_sWinner = callNamed("getText", "hmg.gameresults.winner0");
  }

  var t_iScore1 = callMethod("GetTotalGhosts", meProp(_me, "m_rClient"), 1);
  var t_iScore2 = callMethod("GetTotalGhosts", meProp(_me, "m_rClient"), 2);
  var t_iWins1 = meProp(_me, "m_iLastGreenWins");
  var t_iWins2 = meProp(_me, "m_iLastPurpleWins");
  } else {
  t_sWinner = "";
  t_iScore1 = 0;
  t_iScore2 = 0;
  t_iWins1 = 0;
  t_iWins2 = 0;
  }

  callMethod("fixAntialisingTextElement", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "hm.roundwinner", 1, t_sWinner, 0)
  callMethod("setGameResultTeamScore", _me, symbol("green"), t_iScore1)
  callMethod("setGameResultTeamScore", _me, symbol("purple"), t_iScore2)
  callMethod("setGameResultTeamWins", _me, symbol("green"), t_iWins1)
  callMethod("setGameResultTeamWins", _me, symbol("purple"), t_iWins2)
}

