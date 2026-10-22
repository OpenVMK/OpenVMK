// item_2355.cct / CCheckersGameInterface / ShowInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowInterface(_me: LingoMe, _this: LingoValue) {
  var t_sWnd = callNamed("getUniqueID");
  if (callNamed("createWindow", t_sWnd, "vmk_checkers_ingame.window")) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", t_sWnd));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("moveTo", meProp(_me, "m_rWindow"), 0, 0)
  } else {
  callNamed("error", _this, "Failed to create window!", symbol("ShowInterface"))
  return;
  }

  for (var i = 1; i <= 2; ++i) {
  var t_rPlayer = callMethod("GetPlayerDataByIndex", meProp(_me, "m_rEngine"), i);
  if ((lingoTruthy(callNamed("voidp", t_rPlayer)) ? 0 : 1)) {
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", "player", i));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, t_rPlayer[symbol("name")])
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", i), ".level"));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, t_rPlayer[symbol("level")])
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", i), ".score"));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, t_rPlayer[symbol("score")])
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "player", i), ".giveup"));
  if (callNamed("objectp", t_rElem)) {
  callMethod("setProperty", t_rElem, symbol("visible"), 0)
  }

  for (var j = 1; j <= 12; ++j) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", lingoBinary("join", "player", i), ".piece"), j)), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", lingoBinary("join", "player", i), ".piece"), j)), symbol("blend"), 100)
  }

  if (lingoBinary("eq", t_rPlayer[symbol("name")], callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  setMeProp(_me, "m_iOwnPlayer", i);
  }

  }

  }

}

