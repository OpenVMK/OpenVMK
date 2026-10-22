// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _ReceiveItemDetailsInInventory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ReceiveItemDetailsInInventory(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rConnection = a_rMsg.connection;
  var t_iInventoryId = callMethod("GetIntFrom", t_rConnection);
  var t_iClearFlag = callMethod("GetIntFrom", t_rConnection);
  var t_iItemCount = callMethod("GetIntFrom", t_rConnection);
  var t_mp_sGroup_rDetails = new LingoPropList([]);
  if (lingoBinary("gt", t_iItemCount, 0)) {
  for (var i = 1; i <= t_iItemCount; ++i) {
  var t_sItemGroup = callMethod("GetStrFrom", t_rConnection);
  var t_iNumberOfPairs = callMethod("GetIntFrom", t_rConnection);
  var t_mp_sKey_sValue = new LingoPropList([]);
  for (var e = 1; e <= t_iNumberOfPairs; ++e) {
  callMethod("addProp", t_mp_sKey_sValue, callMethod("GetStrFrom", t_rConnection), callMethod("GetStrFrom", t_rConnection))
  }

  callMethod("addProp", t_mp_sGroup_rDetails, t_sItemGroup, t_mp_sKey_sValue)
  }

  if (t_iClearFlag) {
  callMethod("ClearDetails", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId))
  }

  callMethod("UpdateDetails", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId), symbol("all"), t_mp_sGroup_rDetails)
  }

}

