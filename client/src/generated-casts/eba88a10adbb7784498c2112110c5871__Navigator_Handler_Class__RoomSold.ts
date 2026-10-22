// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / RoomSold

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoomSold(_me: LingoMe, a_rMsg: LingoValue) {
  var t_iSpaceID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iRefund = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _me), "RoomSold", 1, 1);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "nav.roomsold.desc1"), t_iRefund), callNamed("getText", "nav.roomsold.desc2")), callNamed("getText", "nav.roomsold.title"), callNamed("getText", "nav.roomsold.ok"))
  callMethod("GetContent", callMethod("GetGuestRoomNavigator", callMethod("getInterface", _me)))
}

