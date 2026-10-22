// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / PublicRoomInfoMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PublicRoomInfoMessage(_me: LingoMe, tMsg: LingoValue) {
  var t_ar_Msg = new LingoPropList([]);
  t_ar_Msg[symbol("roomTag")] = callMethod("GetIntFrom", tMsg.connection);
  t_ar_Msg[symbol("instanceID")] = lingoBinary("add", callMethod("GetIntFrom", tMsg.connection), 1);
  callMethod("setPublicInfo", callMethod("getComponent", _me), t_ar_Msg)
  callMethod("setPublic", callMethod("getComponent", _me))
  callMethod("enterRoom", callMethod("getComponent", _me))
  callMethod("set", callNamed("getObject", symbol("session")), "RoomType", symbol("public"))
  if (callMethod("exists", callNamed("getObject", symbol("session")), "permissions")) {
  var t_ar_PermissionList = callMethod("get", callNamed("getObject", symbol("session")), "permissions");
  if (callNamed("listp", t_ar_PermissionList)) {
  if (lingoBinary("gt", callMethod("findPos", t_ar_PermissionList, 2), 0)) {
  callMethod("set", callNamed("getObject", symbol("session")), "ControlRoom", 1)
  }

  }

  } else {
  callMethod("set", callNamed("getObject", symbol("session")), "ControlRoom", 0)
  }

}

