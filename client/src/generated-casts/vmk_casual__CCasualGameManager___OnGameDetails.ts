// vmk_casual.cct / CCasualGameManager / _OnGameDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OnGameDetails(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  if (_this.valid) {
  var t_iGameCode = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iGameID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iPlayers = callMethod("GetIntFrom", a_rMsg.connection);
  var t_ar_rPlayers = new LingoList([]);
  for (var i = 1; i <= t_iPlayers; ++i) {
  var t_sName = callMethod("GetStrFrom", a_rMsg.connection);
  var t_iSex = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sSlogan = callMethod("GetStrFrom", a_rMsg.connection);
  var t_ar_iFigure = new LingoList([]);
  for (var j = 1; j <= 12; ++j) {
  callMethod("add", t_ar_iFigure, callMethod("GetIntFrom", a_rMsg.connection))
  }

  callMethod("add", t_ar_rPlayers, new LingoPropList([symbol("name"), t_sName, symbol("sex"), t_iSex, symbol("slogan"), t_sSlogan, symbol("figure"), t_ar_iFigure]))
  }

  var t_rModule = callMethod("getaProp", meProp(_me, "m_mp_iCode_rModule"), t_iGameCode);
  if (callNamed("voidp", t_rModule)) {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Module for game type", t_iGameCode), "not found!"), symbol("_OnGameDetails"))
  } else {
  callMethod("OnGameDetails", t_rModule, t_ar_rPlayers)
  }

  }

}

