// vmk_casual.cct / CCasualGameManager / _OnTurnBasedGameEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OnTurnBasedGameEnd(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  if (_this.valid) {
  var t_iGameID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iWinnerRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iGameCode = callMethod("getaProp", meProp(_me, "m_mp_iGameID_iCode"), t_iGameID);
  var t_rModule = callMethod("getaProp", meProp(_me, "m_mp_iCode_rModule"), t_iGameCode);
  if (callNamed("voidp", t_rModule)) {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Module for game ID", t_iGameID), "not found!"), symbol("_OnTurnBasedGameEnd"))
  } else {
  callMethod("OnGameEnd", t_rModule, t_iGameID, t_iWinnerRef, a_rMsg)
  }

  }

}

