// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / SaveSessionId

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SaveSessionId(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_iParam = callMethod("GetIntFrom", tMsg.connection);
  var t_sSessionID = callMethod("GetStrFrom", tMsg.connection);
  if (callNamed("objectExists", symbol("session"))) {
  callMethod("set", callNamed("getObject", symbol("session")), "sessionID", t_sSessionID)
  }

  var t_sLoginFailure = callMethod("GetStrFrom", tMsg.connection);
  switch (t_iParam) {
case -float(1):
case 2:
case 11:
case 3:
case 4:
case 5:
case 6:
case 7:
case 8:
case 9:
case 10:
case 12:
  callMethod("showErrorDialog", _this, t_iParam, t_sLoginFailure)
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

}

