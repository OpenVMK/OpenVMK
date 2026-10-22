// item_2355.cct / CCheckersLobbyInterface / CloseCurrentView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseCurrentView(_me: LingoMe, _this: LingoValue) {
  switch (meProp(_me, "m_kCurView")) {
case symbol("play"):
  callMethod("ClosePlayView", _this)
  break;
case symbol("watch"):
  callMethod("CloseWatchView", _this)
  break;
case symbol("score"):
  callMethod("CloseScoreView", _this)
  break;
  }

  setMeProp(_me, "m_kCurView", symbol("none"));
}

