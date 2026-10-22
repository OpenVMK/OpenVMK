// vmk_hm_minigame.cct / CHMGameHandler / _Config

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Config(_me: LingoMe, _this: LingoValue, a_bBool: LingoValue) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var t_rList = new LingoPropList([]);
  callMethod("setaProp", t_rList, 2591, symbol("_LeaveRoom"))
  if (a_bBool) {
  callNamed("registerListener", t_sID, callMethod("getID", _this), t_rList)
  } else {
  callNamed("unregisterListener", t_sID, callMethod("getID", _this), t_rList)
  }

  return 1;
}

