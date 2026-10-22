// vmk_hm_lobby_handler.cct / CHMLobbyInterface / HighScoreWndEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HighScoreWndEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", "HMPSHighScore");
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "hm.close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", "HMPSHighScore")
  break;
case "hm.help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.hauntedmansion")
  break;
case "button.today":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("DisplayHighscore", 5, callMethod("getElement", tWndObj, "highscores"), callNamed("rgb", "#eeeeee"), 0)
  break;
case "button.last7days":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("DisplayHighscore", 5, callMethod("getElement", tWndObj, "highscores"), callNamed("rgb", "#eeeeee"), 1)
  break;
case "button.ever":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("DisplayHighscore", 5, callMethod("getElement", tWndObj, "highscores"), callNamed("rgb", "#eeeeee"), 2)
  break;
case "button.ok":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", "HMPSHighScore")
  break;
  }

  }

}

