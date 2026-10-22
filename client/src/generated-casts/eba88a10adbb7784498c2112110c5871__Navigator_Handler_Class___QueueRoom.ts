// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / _QueueRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _QueueRoom(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_sRoomName = callMethod("GetStrFrom", a_rMsg.connection);
  var t_iQueueNumber = callMethod("GetIntFrom", a_rMsg.connection);
  var tRoomQueue = callMethod("getRoomQueueWindow", callMethod("getInterface", _this));
  if (callNamed("objectp", tRoomQueue)) {
  callMethod("ShowQueue", tRoomQueue, t_sRoomName, t_iQueueNumber)
  }

}

