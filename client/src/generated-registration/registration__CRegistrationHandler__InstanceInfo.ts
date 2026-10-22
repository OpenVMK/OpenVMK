// registration.cct / CRegistrationHandler / InstanceInfo

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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

