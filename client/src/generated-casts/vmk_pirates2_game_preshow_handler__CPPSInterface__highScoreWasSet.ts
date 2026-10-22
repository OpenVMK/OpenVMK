// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / highScoreWasSet

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function highScoreWasSet(_me: LingoMe, t_rElement: LingoValue) {
  var tWndObj = callNamed("getWindow", "PPSHighScore");
  var t_rElem = undefined;
  if (callNamed("objectp", tWndObj)) {
  t_rElem = callMethod("getElement", tWndObj, "highscores.lms");
  if (lingoBinary("eq", t_rElement, t_rElem)) {
  callNamed("DisplayHighscore", 6, callMethod("getElement", tWndObj, "highscores.ctf"))
  }

  }

}

