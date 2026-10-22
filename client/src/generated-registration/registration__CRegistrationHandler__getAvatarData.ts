// registration.cct / CRegistrationHandler / getAvatarData

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAvatarData(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_sName = callMethod("GetStrFrom", tMsg.connection);
  var t_iSex = callMethod("GetIntFrom", tMsg.connection);
  var t_sSlogan = callMethod("GetStrFrom", tMsg.connection);
  var t_ar_FigData = new LingoList([]);
  for (var i = 1; i <= 10; ++i) {
  var t_iData = callMethod("GetIntFrom", tMsg.connection);
  callMethod("add", t_ar_FigData, t_iData)
  }

  var t_ar_FigureData = new LingoList([t_sName, t_iSex, t_sSlogan]);
  return callMethod("_UpdateRegData", callMethod("getComponent", _this), t_ar_FigData, "AvatarData");
  return 1;
}

