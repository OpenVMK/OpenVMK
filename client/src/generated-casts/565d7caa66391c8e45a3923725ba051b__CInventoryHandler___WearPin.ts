// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _WearPin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _WearPin(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iSrc = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iDest = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sSrcGrp = callMethod("GetStrFrom", a_rMsg.connection);
  var t_sTrgGrp = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("CatSwitch", callMethod("GetInventory", callMethod("getComponent", _this), 1), symbol("pins"), t_iSrc, callMethod("GetInventory", callMethod("getComponent", _this), 3), symbol("pins"), t_iDest, t_sSrcGrp, t_sTrgGrp)
}

