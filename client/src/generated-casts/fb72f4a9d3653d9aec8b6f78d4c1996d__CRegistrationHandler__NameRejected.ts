// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / NameRejected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NameRejected(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_iReason = callMethod("GetIntFrom", tMsg.connection);
  var t_sInfo = undefined;
  if (lingoBinary("and", lingoBinary("gt", t_iReason, 0), lingoBinary("lt", t_iReason, 5))) {
  t_sInfo = callMethod("GetStrFrom", tMsg.connection);
  }

  callMethod("AlertNameRejection", _this._interface, t_iReason, t_sInfo)
}

