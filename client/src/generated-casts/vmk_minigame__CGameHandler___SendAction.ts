// vmk_minigame.cct / CGameHandler / _SendAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SendAction(_me: LingoMe, _this: LingoValue, a_mp_Msg: LingoValue) {
  var tConnection = callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK"));
  if (lingoBinary("neq", tConnection, 0)) {
  callMethod("send", tConnection, 601, a_mp_Msg)
  }

}

