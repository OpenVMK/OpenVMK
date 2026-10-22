// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / getCTFHighScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getCTFHighScore(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", "PPSHighScore");
  if (callNamed("objectp", tWndObj)) {
  callNamed("DisplayHighscore", 6, callMethod("getElement", tWndObj, "highscores.ctf"))
  }

}

