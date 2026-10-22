// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / InventoryItemDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InventoryItemDetails(_me: LingoMe, tMsg: LingoValue) {
  var t_rConnection = tMsg.connection;
  var t_iInventoryId = callMethod("GetIntFrom", t_rConnection);
  var t_iClearFlag = callMethod("GetIntFrom", t_rConnection);
  var t_iItemCount = callMethod("GetIntFrom", t_rConnection);
  if (lingoBinary("gt", t_iItemCount, 0)) {
  var t_mp_ItemData = new LingoPropList([]);
  for (var i = 1; i <= t_iItemCount; ++i) {
  var t_sItemGroup = callMethod("GetStrFrom", t_rConnection);
  var t_iNumberOfValuePairs = callMethod("GetIntFrom", t_rConnection);
  for (var e = 1; e <= t_iNumberOfValuePairs; ++e) {
  var t_mp_ValuePairs = new LingoPropList([]);
  var t_sValueName = callMethod("GetStrFrom", t_rConnection);
  var t_iValue = callMethod("GetStrFrom", t_rConnection);
  callMethod("addProp", t_mp_ValuePairs, t_sValueName, t_iValue)
  callMethod("addProp", t_mp_ItemData, t_sItemGroup, t_mp_ValuePairs)
  }

  }

  }

}

