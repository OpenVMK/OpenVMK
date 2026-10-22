// vmk_casual.cct / CCasualGameManager / _OnTurnBasedGameEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OnTurnBasedGameEvent(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  if (_this.valid) {
  var t_iGameID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iEventType = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iGameCode = callMethod("getaProp", meProp(_me, "m_mp_iGameID_iCode"), t_iGameID);
  var t_rModule = callMethod("getaProp", meProp(_me, "m_mp_iCode_rModule"), t_iGameCode);
  if (callNamed("voidp", t_rModule)) {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Module for game ID", t_iGameID), "not found!"), symbol("_OnTurnBasedGameEvent"))
  } else {
  callMethod("OnGameEvent", t_rModule, t_iGameID, t_iEventType, a_rMsg)
  }

  }

}

