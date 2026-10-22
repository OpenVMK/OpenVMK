// item_2355.cct / CCheckersLobbyInterface / CloseScoreView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseScoreView(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rScoreList"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rScoreList")))
  setMeProp(_me, "m_rScoreList", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", meProp(_me, "m_kCurView"), symbol("score"))) {
  if (meProp(_me, "m_rWindow").valid) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "tab.highscores.active"), symbol("blend"), 0)
  callMethod("unmerge", meProp(_me, "m_rWindow"))
  }

  setMeProp(_me, "m_kCurView", symbol("none"));
  }

  }

}

