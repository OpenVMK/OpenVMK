// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _ReceiveWornClothes

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
  var t_mp_iRef_rItem = new LingoPropList([]);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCode = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sGroup = callMethod("GetStrFrom", a_rMsg.connection);
  callMethod("setaProp", t_mp_iRef_rItem, t_sGroup, new LingoPropList([symbol("ref"), t_iRef, symbol("group"), t_sGroup, symbol("items"), 1, symbol("code"), t_iCode, symbol("state"), symbol("normal")]))
  }

  callMethod("UpdateItemList", callMethod("GetInventory", callMethod("getComponent", _this), 2), symbol("clothes"), t_mp_iRef_rItem)
}

