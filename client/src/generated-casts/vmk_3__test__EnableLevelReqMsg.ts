// vmk_3.dcr / test / EnableLevelReqMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EnableLevelReqMsg(_me: LingoMe, _this: LingoValue) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var t_rList = callNamed("propList");
  callNamed("registerListener", t_sID, callMethod("getID", _this), t_rList)
  setThePropOf(_this, "m_bLevelReqMsgEnabled", 1);
}

