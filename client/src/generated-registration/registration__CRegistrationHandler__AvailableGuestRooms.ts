// registration.cct / CRegistrationHandler / AvailableGuestRooms

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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

