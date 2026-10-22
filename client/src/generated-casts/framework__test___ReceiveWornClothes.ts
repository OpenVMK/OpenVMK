// framework.dcr / test / _ReceiveWornClothes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ReceiveWornClothes(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mp_iRef_rItem = callNamed("propList");
  var i = 1;
  while (lingoBinary("lte", i, t_iCount)) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCode = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sGroup = callMethod("GetStrFrom", a_rMsg.connection);
  i = lingoBinary("add", i, 1);
  }

}

