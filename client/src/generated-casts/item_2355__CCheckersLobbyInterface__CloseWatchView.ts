// item_2355.cct / CCheckersLobbyInterface / CloseWatchView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseWatchView(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rGameList"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGameList")))
  setMeProp(_me, "m_rGameList", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", meProp(_me, "m_kCurView"), symbol("watch"))) {
  if (meProp(_me, "m_rWindow").valid) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "tab.watch.active"), symbol("blend"), 0)
  callMethod("unmerge", meProp(_me, "m_rWindow"))
  }

  setMeProp(_me, "m_kCurView", symbol("none"));
  }

  }

}

