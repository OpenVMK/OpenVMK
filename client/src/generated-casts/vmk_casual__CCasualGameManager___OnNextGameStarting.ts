// vmk_casual.cct / CCasualGameManager / _OnNextGameStarting

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OnNextGameStarting(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  if (_this.valid) {
  var t_iGameCode = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iSeconds = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rModule = callMethod("getaProp", meProp(_me, "m_mp_iCode_rModule"), t_iGameCode);
  if (callNamed("voidp", t_rModule)) {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Module for game type", t_iGameCode), "not found!"), symbol("_OnNextGameStarting"))
  } else {
  callMethod("OnNextGameStarting", t_rModule, t_iSeconds)
  }

  }

}

