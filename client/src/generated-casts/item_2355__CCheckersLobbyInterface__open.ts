// item_2355.cct / CCheckersLobbyInterface / open

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function open(_me: LingoMe, _this: LingoValue, a_kPage: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rWindow"))) {
  var t_sWnd = callNamed("getUniqueID");
  if (callNamed("createWindow", t_sWnd, "vmk_checkers_lobby.window")) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", t_sWnd));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  } else {
  callNamed("error", _this, "Failed to create window!", symbol("open"))
  }

  } else {
  callMethod("CloseCurrentView", _this)
  }

  switch (a_kPage) {
case symbol("play"):
  callMethod("OpenPlayView", _this, meProp(_me, "m_rWindow"))
  break;
case symbol("watch"):
  callMethod("OpenWatchView", _this, meProp(_me, "m_rWindow"))
  break;
case symbol("score"):
  callMethod("OpenScoreView", _this, meProp(_me, "m_rWindow"))
  break;
  }

}

