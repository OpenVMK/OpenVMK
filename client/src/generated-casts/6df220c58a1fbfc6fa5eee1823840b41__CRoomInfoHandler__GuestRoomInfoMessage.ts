// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / GuestRoomInfoMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GuestRoomInfoMessage(_me: LingoMe, tMsg: LingoValue) {
  var t_ar_Msg = new LingoPropList([]);
  t_ar_Msg[symbol("roomName")] = callNamed("TransformCannedMsgToString", tMsg);
  t_ar_Msg[symbol("roomOwner")] = callMethod("GetStrFrom", tMsg.connection);
  t_ar_Msg[symbol("roomDescription")] = callNamed("TransformCannedMsgToString", tMsg);
  t_ar_Msg[symbol("controlRoom")] = callMethod("GetIntFrom", tMsg.connection);
  t_ar_Msg[symbol("friendsOnly")] = callMethod("GetIntFrom", tMsg.connection);
  callMethod("setGuestInfo", callMethod("getComponent", _me), t_ar_Msg)
  callMethod("setPrivate", callMethod("getComponent", _me))
  callMethod("SaveOriginalData", _me._interface, t_ar_Msg[symbol("roomName")], t_ar_Msg[symbol("roomDescription")])
  callMethod("set", callNamed("getObject", symbol("session")), "RoomType", symbol("private"))
  callMethod("set", callNamed("getObject", symbol("session")), "ControlRoom", t_ar_Msg.controlRoom)
}

