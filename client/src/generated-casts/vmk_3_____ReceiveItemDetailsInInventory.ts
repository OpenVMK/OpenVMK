// vmk_3.dcr /  / _ReceiveItemDetailsInInventory

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
  var t_mp_sGroup_rDetails = callNamed("propList");
  if (lingoBinary("gt", t_iItemCount, 0)) {
  var i = 1;
  while (lingoBinary("lte", i, t_iItemCount)) {
  var t_sItemGroup = callMethod("GetStrFrom", t_rConnection);
  var t_iNumberOfPairs = callMethod("GetIntFrom", t_rConnection);
  var t_mp_sKey_sValue = callNamed("propList");
  var e = 1;
  while (lingoBinary("lte", e, t_iNumberOfPairs)) {
  e = lingoBinary("add", e, 1);
  }

  i = lingoBinary("add", i, 1);
  }

  if (t_iClearFlag) {
  callMethod("ClearDetails", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId))
  }

  callMethod("UpdateDetails", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId), symbol("all"), t_mp_sGroup_rDetails)
  }

}

