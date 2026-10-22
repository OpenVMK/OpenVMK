// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / SpaceListRoomTypeTrigger

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SpaceListRoomTypeTrigger(_me: LingoMe, a_rMsg: LingoValue) {
  var t_iRoomCode = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "GetPopularSpacesByType", new LingoPropList([symbol("integer"), t_iRoomCode]))
}

