// vmk_casual.cct / CCasualGameManager / _OnTurnBasedGameStart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OnTurnBasedGameStart(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  if (_this.valid) {
  var t_iGameCode = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iGameID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iPlayers = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rModule = callMethod("getaProp", meProp(_me, "m_mp_iCode_rModule"), t_iGameCode);
  if (callNamed("voidp", t_rModule)) {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Module for game type", t_iGameCode), "not found!"), symbol("_OnTurnBasedGameStart"))
  } else {
  callMethod("OnCreateGame", t_rModule, t_iGameID, a_rMsg)
  callMethod("setaProp", meProp(_me, "m_mp_iGameID_iCode"), t_iGameID, t_iGameCode)
  for (var i = 1; i <= t_iPlayers; ++i) {
  var t_iAvatarRef = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("OnAddPlayer", t_rModule, t_iGameID, t_iAvatarRef, a_rMsg)
  }

  callMethod("OnGameStart", t_rModule, t_iGameID, a_rMsg)
  }

  }

}

