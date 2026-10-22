// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / _CancelRoomLoad

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CancelRoomLoad(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var tThread = callNamed("getThread", "room");
  if (lingoBinary("neq", tThread, 0)) {
  callMethod("_CancelRoom", callMethod("getComponent", tThread))
  }

  if (callNamed("objectExists", "Navigation.Room.Queue")) {
  callMethod("hideLoadBar", callNamed("getObject", "Navigation.Room.Queue"))
  }

  callMethod("ShowNavigator", callMethod("getInterface", _this))
}

