// vmk_dock_handler.cct / CJCPSInterface / SignupEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SignupEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "button.arrownext.active":
  callMethod("ChangePage", _me, symbol("next"))
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "button.arrowprev.active":
  callMethod("ChangePage", _me, symbol("previous"))
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "button.jccancel.active":
case "close":
  callMethod("showSignUpWindow", _me, 0)
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "button.jcstartgame.active":
  callMethod("SetReadyToPlayState", callMethod("getComponent", callNamed("getThread", "lobby")), 1)
  callNamed("executeMessage", "PlayInterfaceSound", "open-popup")
  break;
case "button.jchighscores.active":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_sHighscoreWindowTitle"), "vmk_jc_main.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to create highscore window!", symbol("SignupEventProc"));
  }

  callMethod("fixAntialiasing", _me, meProp(_me, "m_sHighscoreWindowTitle"), "jc.window.hd", 0, callNamed("getText", "junglecruise.highscores.window.title"))
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sHighscoreWindowTitle"));
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_highscores.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to merge highscores window!", symbol("SignupEventProc"));
  }

  callMethod("moveTo", tWndObj, 250, 50)
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("JCHighScoresEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callNamed("DisplayHighscore", 2, callMethod("getElement", tWndObj, "highscores"), callNamed("rgb", 254, 254, 254))
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.jungle")
  break;
  break;
  }

  }

}

