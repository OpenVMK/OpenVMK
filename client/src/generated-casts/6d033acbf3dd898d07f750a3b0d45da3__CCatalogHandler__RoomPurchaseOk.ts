// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogHandler / RoomPurchaseOk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoomPurchaseOk(_me: LingoMe, a_rMsg: LingoValue) {
  var t_mp_RoomIds = new LingoPropList([]);
  callMethod("addProp", t_mp_RoomIds, symbol("code"), callMethod("GetIntFrom", a_rMsg.connection))
  callMethod("addProp", t_mp_RoomIds, symbol("id"), callMethod("GetIntFrom", a_rMsg.connection))
  callMethod("_UpdateProductList", callMethod("getComponent", _me), t_mp_RoomIds, "roomId")
}

