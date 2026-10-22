// vmk_hm_lobby_handler.cct / CHMLobbyInterface / CreateHighscoreWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateHighscoreWindow(_me: LingoMe) {
  var t_sHighScoreWindow = "HMPSHighScore";
  if (callNamed("windowExists", t_sHighScoreWindow)) {
  callNamed("removeWindow", t_sHighScoreWindow)
  }

  callNamed("createWindow", t_sHighScoreWindow, "vmk_hm_simple.window")
  var tWndObj = callNamed("getWindow", t_sHighScoreWindow);
  if (lingoBinary("neq", tWndObj, 0)) {
  if (callMethod("merge", tWndObj, "vmk_hm_highscores.window")) {
  callMethod("fixAntialisingTextElement", _me, t_sHighScoreWindow, "hm.dialog.hd", 1, callNamed("getText", "hmg.ps.highscores.title"))
  callNamed("DisplayHighscore", 5, callMethod("getElement", tWndObj, "highscores"), callNamed("rgb", "#eeeeee"), 0)
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("HighScoreWndEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  }

  } else {
  return callNamed("error", _me, "Unable to create highscore display", symbol("HighScoreEventProc"));
  }

}

