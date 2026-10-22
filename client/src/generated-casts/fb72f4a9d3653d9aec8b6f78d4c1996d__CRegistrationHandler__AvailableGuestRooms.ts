// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / AvailableGuestRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AvailableGuestRooms(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_iLength = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_RoomList = new LingoList([]);
  for (var i = 1; i <= t_iLength; ++i) {
  callMethod("add", t_ar_RoomList, callMethod("GetIntFrom", tMsg.connection))
  }

  return callMethod("_UpdateRegData", callMethod("getComponent", _this), t_ar_RoomList, "GuestRoomList");
}

