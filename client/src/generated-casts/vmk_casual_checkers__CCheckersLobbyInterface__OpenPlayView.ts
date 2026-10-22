// vmk_casual_checkers.cct / CCheckersLobbyInterface / OpenPlayView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenPlayView(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", meProp(_me, "m_kCurView"), symbol("none"))) {
  setMeProp(_me, "m_kCurView", symbol("play"));
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_checkers_play.window")
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "tab.checkers.active"), symbol("blend"), 100)
  } else {
  callNamed("error", _this, "Window has content already!", symbol("OpenPlayView"))
  }

  } else {
  return callMethod("open", _this, symbol("play"));
  }

}

