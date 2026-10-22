// registration.cct / CRegistrationHandler / changeFigure

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeFigure(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_ar_FigData = new LingoList([]);
  var t_iID = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= 10; ++i) {
  var t_iData = callMethod("GetIntFrom", tMsg.connection);
  callMethod("add", t_ar_FigData, t_iData)
  }

  return callMethod("_UpdateRegData", callMethod("getComponent", _this), t_ar_FigData, "ChangeAvatar");
}

