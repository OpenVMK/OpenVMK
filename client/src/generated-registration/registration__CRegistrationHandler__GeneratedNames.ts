// registration.cct / CRegistrationHandler / GeneratedNames

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GeneratedNames(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_iNameCount = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_nameList = new LingoList([]);
  for (var i = 1; i <= 5; ++i) {
  callMethod("add", t_ar_nameList, callMethod("GetStrFrom", tMsg.connection))
  }

  return callMethod("_UpdateRegData", callMethod("getComponent", _this), t_ar_nameList, "GeneratedNames");
}

