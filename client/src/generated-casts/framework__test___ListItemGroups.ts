// framework.dcr / test / _ListItemGroups

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ListItemGroups(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iInventoryId = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mp_sGroup_rData = callNamed("propList");
  var i = 1;
  while (lingoBinary("lte", i, t_iCount)) {
  var t_rGroup = callNamed("propList");
  t_rGroup[symbol("ref")] = callMethod("GetIntFrom", a_rMsg.connection);
  t_mp_sGroup_rData[t_rGroup[symbol("group")]] = t_rGroup;
  i = lingoBinary("add", i, 1);
  }

  callMethod("UpdateItemList", callMethod("GetInventory", callMethod("getComponent", _this), t_iInventoryId), symbol("all"), t_mp_sGroup_rData)
}

