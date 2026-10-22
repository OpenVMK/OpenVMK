// item_2355.cct / CCheckersLobbyInterface / SetGameList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetGameList(_me: LingoMe, _this: LingoValue, a_ar_rGames: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", meProp(_me, "m_kCurView"), symbol("watch"))) {
  if (callNamed("objectp", meProp(_me, "m_rGameList"))) {
  callMethod("SetGameList", meProp(_me, "m_rGameList"), a_ar_rGames)
  }

  }

  }

}

