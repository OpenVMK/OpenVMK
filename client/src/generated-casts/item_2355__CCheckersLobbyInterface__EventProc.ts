// item_2355.cct / CCheckersLobbyInterface / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElement: LingoValue, a_ptOffset: LingoValue, a_sWindow: LingoValue) {
  callNamed("put", a_sElement)
  switch (a_sElement) {
case "checkers.play":
  callMethod("send", callNamed("getConnection", "VMK"), "PlayNow", new LingoPropList([symbol("integer"), meProp(_me, "m_iGameCode")]))
  callMethod("close", _this)
  break;
case "checkers.watch":
  if (callNamed("objectp", meProp(_me, "m_rGameList"))) {
  callMethod("WatchGame", meProp(_me, "m_rGameList"))
  callMethod("close", _this)
  }

  break;
case "checkers.challenge":
  if (callNamed("objectp", meProp(_me, "m_rScoreList"))) {
  callMethod("StartGame", meProp(_me, "m_rScoreList"))
  callMethod("close", _this)
  }

  break;
case "games.list":
  if (callNamed("objectp", meProp(_me, "m_rGameList"))) {
  callMethod("EventProc", meProp(_me, "m_rGameList"), a_kEvent, a_sElement, a_ptOffset, a_sWindow)
  var t_rGame = callMethod("GetSelectedGame", meProp(_me, "m_rGameList"));
  if (lingoBinary("gt", t_rGame.players.count, 0)) {
  callMethod("_ShowGameDetails", _this, t_rGame.instance, t_rGame.players[1][symbol("name")], t_rGame.players[2][symbol("name")])
  }

  }

  break;
case "highscores.list":
  if (callNamed("objectp", meProp(_me, "m_rScoreList"))) {
  callMethod("EventProc", meProp(_me, "m_rScoreList"), a_kEvent, a_sElement, a_ptOffset, a_sWindow)
  var t_rScore = callMethod("GetSelectedScore", meProp(_me, "m_rScoreList"));
  if (lingoBinary("gt", t_rScore.player, -float(1))) {
  callMethod("_ShowAvatarFigure", _this, t_rScore.name, t_rScore.player, callMethod("getElement", meProp(_me, "m_rWindow"), "human.preview.img"))
  }

  }

  break;
case "tab.watch.active":
case "tab.watch.passive":
  if (lingoBinary("neq", meProp(_me, "m_kCurView"), symbol("watch"))) {
  callMethod("CloseCurrentView", _this)
  callMethod("OpenWatchView", _this)
  }

  break;
case "tab.checkers.active":
case "tab.checkers.passive":
  if (lingoBinary("neq", meProp(_me, "m_kCurView"), symbol("play"))) {
  callMethod("CloseCurrentView", _this)
  callMethod("OpenPlayView", _this)
  }

  break;
case "tab.highscores.active":
case "tab.highscores.passive":
  if (lingoBinary("neq", meProp(_me, "m_kCurView"), symbol("score"))) {
  callMethod("CloseCurrentView", _this)
  callMethod("OpenScoreView", _this)
  }

  break;
case "help":
  switch (meProp(_me, "m_kCurView")) {
case symbol("play"):
  callNamed("executeMessage", symbol("open_help_page"), "help.checkers.play")
  break;
case symbol("view"):
  callNamed("executeMessage", symbol("open_help_page"), "help.checkers.view")
  break;
case symbol("score"):
  callNamed("executeMessage", symbol("open_help_page"), "help.checkers.score")
  break;
  }

  break;
case "close":
  callNamed("removeObject", callMethod("getID", _this))
  break;
  break;
  break;
  break;
  }

  return 1;
}

