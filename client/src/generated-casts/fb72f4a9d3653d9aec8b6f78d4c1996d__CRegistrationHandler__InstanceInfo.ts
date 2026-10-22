// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / InstanceInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InstanceInfo(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  if (meProp(_me, "m_bRegistrationGoingOn")) {
  setMeProp(_me, "m_bRegistrationGoingOn", 0);
  callMethod("regMsgList", _this, 0)
  var t_iRoomId = callMethod("GetIntFrom", tMsg.connection);
  return callMethod("_UpdateRegData", callMethod("getComponent", _this), t_iRoomId, "LandingRoomRealID");
  }

}

