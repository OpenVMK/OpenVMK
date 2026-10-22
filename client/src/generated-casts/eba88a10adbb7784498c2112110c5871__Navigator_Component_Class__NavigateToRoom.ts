// eba88a10adbb7784498c2112110c5871.cct / Navigator Component Class / NavigateToRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NavigateToRoom(_me: LingoMe, a_roomTag: LingoValue) {
  var tRoomID = undefined;
  var tRoomName = "";
  var tRoomInstances = new LingoPropList([]);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_NavSubs"))) ? 0 : 1)) {
  for (var tSpace of meProp(_me, "m_ar_NavSubs").toArray()) {
  if (lingoBinary("eq", tSpace.tag, a_roomTag)) {
  tRoomID = tSpace.spaceid;
  if (lingoBinary("eq", tSpace.roomtype, "public")) {
  tRoomName = callNamed("getText", lingoBinary("join", lingoBinary("join", "ROOM.", tSpace.tag), ".NAME"));
  } else {
  tRoomName = tSpace.roomName;
  }

  if (lingoBinary("gt", callMethod("findPos", tSpace, symbol("instances")), 0)) {
  tRoomInstances = tSpace.instances;
  }

  break;
  }

  }

  if ((lingoTruthy(callNamed("voidp", tRoomID)) ? 0 : 1)) {
  if (lingoBinary("and", callMethod("get", callNamed("getObject", symbol("session")), "AdvNavigation"), (lingoTruthy(callNamed("voidp", tRoomInstances)) ? 0 : 1))) {
  callMethod("ShowAdvancedModeWindow", callMethod("getInterface", _me))
  callMethod("SetAdvancedModeWindowData", callMethod("getInterface", _me), tRoomName, tRoomID, tRoomInstances)
  } else {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 31, new LingoPropList([symbol("integer"), tRoomID, symbol("integer"), -float(1)]))
  callNamed("executeMessage", "PlayInterfaceSound", "map-room-selection")
  callMethod("HideNavigator", callMethod("getInterface", _me))
  }

  } else {
  if (callMethod("get", callNamed("getObject", symbol("session")), "AdvNavigation")) {
  callMethod("ShowAdvancedModeWindow", callMethod("getInterface", _me))
  callMethod("SetAdvancedModeWindowData", callMethod("getInterface", _me), "Room not available", -float(1), new LingoPropList([]))
  }

  }

  }

}

