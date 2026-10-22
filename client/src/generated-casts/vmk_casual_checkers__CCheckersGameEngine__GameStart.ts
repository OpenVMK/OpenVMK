// vmk_casual_checkers.cct / CCheckersGameEngine / GameStart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GameStart(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iMaxTricks = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iTimePerTurn = callMethod("GetIntFrom", a_rMsg.connection);
  var t_bIsNewGame = callMethod("GetIntFrom", a_rMsg.connection);
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  if (lingoBinary("gt", meProp(_me, "m_iOwnPlayer"), 0)) {
  callMethod("SetGameMode", meProp(_me, "m_rInterface"), symbol("play"))
  } else {
  callMethod("SetGameMode", meProp(_me, "m_rInterface"), symbol("watch"))
  }

  callMethod("SetMaxTricks", meProp(_me, "m_rInterface"), t_iMaxTricks)
  callMethod("SetTimePerTurn", meProp(_me, "m_rInterface"), t_iTimePerTurn)
  callMethod("NotifyGameStart", meProp(_me, "m_rInterface"), t_bIsNewGame)
  }

}

