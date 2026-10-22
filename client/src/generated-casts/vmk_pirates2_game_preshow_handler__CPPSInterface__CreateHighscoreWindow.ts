// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / CreateHighscoreWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateHighscoreWindow(_me: LingoMe) {
  if (callNamed("windowExists", "PPSHighScore")) {
  callNamed("removeWindow", "PPSHighScore")
  }

  callNamed("createWindow", "PPSHighScore", "vmk_pirates_window.window")
  var tWndObj = callNamed("getWindow", "PPSHighScore");
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  if (callMethod("merge", tWndObj, "vmk_pirates_highscores.window")) {
  callMethod("setText", callMethod("getElement", tWndObj, "pirates.dialog.hd"), callNamed("getText", "pps_highscores"))
  callNamed("DisplayHighscore", 7, callMethod("getElement", tWndObj, "highscores.lms"))
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("HighScoreWndEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  }

  } else {
  return callNamed("error", _me, "Unable to create highscore display", symbol("HighScoreEventProc"));
  }

}

