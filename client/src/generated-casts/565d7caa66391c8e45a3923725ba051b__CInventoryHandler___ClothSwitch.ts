// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _ClothSwitch

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ClothSwitch(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iInventoryId = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iSrcRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iDstRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sSrcGrp = callMethod("GetStrFrom", a_rMsg.connection);
  var t_sDstGrp = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("CatSwitch", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId), symbol("clothes"), t_iSrcRef, callMethod("GetInventory", callMethod("getComponent", _this), 2), symbol("clothes"), t_iDstRef, t_sSrcGrp, t_sDstGrp)
  }

  t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  for (var i = 1; i <= t_iCount; ++i) {
  t_iSrcRef = callMethod("GetIntFrom", a_rMsg.connection);
  t_iDstRef = callMethod("GetIntFrom", a_rMsg.connection);
  t_sSrcGrp = callMethod("GetStrFrom", a_rMsg.connection);
  t_sDstGrp = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("CatSwitch", callMethod("GetInventory", callMethod("getComponent", _this), 2), symbol("clothes"), t_iSrcRef, callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId), symbol("clothes"), t_iDstRef, t_sSrcGrp, t_sDstGrp)
  }

}

