// vmk_casual_checkers.cct / CCheckersLobbyInterface / OpenScoreView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenScoreView(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", meProp(_me, "m_kCurView"), symbol("none"))) {
  setMeProp(_me, "m_kCurView", symbol("score"));
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_checkers_highscores.window")
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "tab.highscores.active"), symbol("blend"), 100)
  setMeProp(_me, "m_rScoreList", callNamed("createObject", callNamed("getUniqueID"), "CCasualGameHighScoreInterface", "CCheckersGameHighScoreInterface"));
  callMethod("SetImageElement", meProp(_me, "m_rScoreList"), callMethod("getElement", meProp(_me, "m_rWindow"), "highscores.list"))
  } else {
  callNamed("error", _this, "Window has content already!", symbol("OpenScoreView"))
  }

  } else {
  return callMethod("open", _this, symbol("score"));
  }

}

