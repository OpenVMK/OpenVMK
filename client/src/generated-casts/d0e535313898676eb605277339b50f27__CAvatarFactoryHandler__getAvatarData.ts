// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryHandler / getAvatarData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAvatarData(_me: LingoMe, tMsg: LingoValue) {
  var t_sName = callMethod("GetStrFrom", tMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "Name", t_sName)
  var t_iSex = callMethod("GetIntFrom", tMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "Sex", t_iSex)
  var t_sSlogan = callMethod("GetStrFrom", tMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "Slogan", t_sSlogan)
  var t_ar_iFigData = new LingoList([]);
  for (var i = 1; i <= 12; ++i) {
  callMethod("add", t_ar_iFigData, callMethod("GetIntFrom", tMsg.connection))
  }

  callMethod("ParseMyAvatar", callMethod("getComponent", _me), t_ar_iFigData)
  return 1;
}

