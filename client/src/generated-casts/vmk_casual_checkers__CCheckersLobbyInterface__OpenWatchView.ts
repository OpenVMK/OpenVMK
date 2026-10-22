// vmk_casual_checkers.cct / CCheckersLobbyInterface / OpenWatchView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenWatchView(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", meProp(_me, "m_kCurView"), symbol("none"))) {
  setMeProp(_me, "m_kCurView", symbol("watch"));
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_checkers_watch.window")
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "tab.watch.active"), symbol("blend"), 100)
  setMeProp(_me, "m_rGameList", callNamed("createObject", callNamed("getUniqueID"), "CCasualGameListInterface", "CCheckersGameList"));
  callMethod("SetImageElement", meProp(_me, "m_rGameList"), callMethod("getElement", meProp(_me, "m_rWindow"), "games.list"))
  } else {
  callNamed("error", _this, "Window has content already!", symbol("OpenWatchView"))
  }

  } else {
  return callMethod("open", _this, symbol("watch"));
  }

}

