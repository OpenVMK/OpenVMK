// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _ReceiveWornPins

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ReceiveWornPins(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mp_iRef_rItem = new LingoPropList([]);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCode = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iParam = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iSingleUse = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sExpiryDate = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sItemGroup = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("setaProp", t_mp_iRef_rItem, t_sItemGroup, new LingoPropList([symbol("group"), t_sItemGroup, symbol("items"), 1, symbol("ref"), t_iRef, symbol("code"), t_iCode, symbol("param"), t_iParam, symbol("state"), symbol("normal"), symbol("singleuse"), t_iSingleUse, symbol("expirydate"), t_sExpiryDate]))
  }

  callMethod("UpdateItemList", callMethod("GetInventory", callMethod("getComponent", _this), 3), symbol("pins"), t_mp_iRef_rItem)
}

