// registration.cct / CRegistrationHandler / SaveSessionId

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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

