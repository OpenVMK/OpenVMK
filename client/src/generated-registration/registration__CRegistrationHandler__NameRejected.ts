// registration.cct / CRegistrationHandler / NameRejected

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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

