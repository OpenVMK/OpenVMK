// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / getAvatarData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
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

