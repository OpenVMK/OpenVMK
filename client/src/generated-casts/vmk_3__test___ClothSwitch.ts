// vmk_3.dcr / test / _ClothSwitch

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
  var i = 1;
  while (lingoBinary("lte", i, t_iCount)) {
  var t_iSrcRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iDstRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sSrcGrp = callMethod("GetStrFrom", a_rMsg.connection);
  var t_sDstGrp = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("CatSwitch", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId), symbol("clothes"), t_iSrcRef, callMethod("GetInventory", callMethod("getComponent", _this), 2), symbol("clothes"), t_iDstRef, t_sSrcGrp, t_sDstGrp)
  i = lingoBinary("add", i, 1);
  }

  t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  i = 1;
  while (lingoBinary("lte", i, t_iCount)) {
  t_iSrcRef = callMethod("GetIntFrom", a_rMsg.connection);
  t_iDstRef = callMethod("GetIntFrom", a_rMsg.connection);
  t_sSrcGrp = callMethod("GetStrFrom", a_rMsg.connection);
  t_sDstGrp = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("CatSwitch", callMethod("GetInventory", callMethod("getComponent", _this), 2), symbol("clothes"), t_iSrcRef, callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId), symbol("clothes"), t_iDstRef, t_sSrcGrp, t_sDstGrp)
  i = lingoBinary("add", i, 1);
  }

}

