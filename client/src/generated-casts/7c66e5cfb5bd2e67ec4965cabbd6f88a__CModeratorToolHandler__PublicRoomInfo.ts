// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolHandler / PublicRoomInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PublicRoomInfo(_me: LingoMe, _this: LingoValue, a_mpMsg: LingoValue) {
  var t_mp_RoomInfo = new LingoPropList([]);
  callMethod("addProp", t_mp_RoomInfo, "tag", callMethod("GetIntFrom", a_mpMsg.connection))
  callMethod("addProp", t_mp_RoomInfo, "instance", callMethod("GetIntFrom", a_mpMsg.connection))
}

